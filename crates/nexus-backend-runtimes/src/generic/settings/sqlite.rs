//! SQLite-backed [`BackendRuntimeSettingsRepo`] impl.

use async_trait::async_trait;
use serde_json::Value;
use sqlx::Row;
use sqlx::sqlite::SqlitePool;
use ulid::Ulid;

use super::{RuntimeSettings, repo::BackendRuntimeSettingsRepo};
use crate::generic::errors::GenericRepoError;
use crate::generic::ids::RuntimeId;

#[derive(Clone)]
pub struct SqliteSettingsRepo {
    pool: SqlitePool,
}

impl SqliteSettingsRepo {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }

    fn row_to_settings(row: sqlx::sqlite::SqliteRow) -> Result<RuntimeSettings, GenericRepoError> {
        let runtime_id_raw: String = row.try_get("runtime_id")?;
        let runtime_id = RuntimeId::try_from(runtime_id_raw.as_str())
            .map_err(|e| GenericRepoError::Serialization(e.to_string()))?;

        let env_overrides_json: String = row.try_get("env_overrides_json")?;
        let env_overrides: Value = serde_json::from_str(&env_overrides_json)?;

        Ok(RuntimeSettings {
            runtime_settings_id: row.try_get("runtime_settings_id")?,
            runtime_id,
            default_device: row.try_get("default_device")?,
            default_model_family_id: row.try_get("default_model_family_id")?,
            keep_warm_default: row.try_get("keep_warm_default")?,
            idle_timeout_seconds: row.try_get("idle_timeout_seconds")?,
            env_overrides,
            created_at: row.try_get("created_at")?,
            updated_at: row.try_get("updated_at")?,
        })
    }
}

#[async_trait]
impl BackendRuntimeSettingsRepo for SqliteSettingsRepo {
    async fn get(
        &self,
        runtime_id: &RuntimeId,
    ) -> Result<Option<RuntimeSettings>, GenericRepoError> {
        let row = sqlx::query("SELECT * FROM backend_runtime_settings WHERE runtime_id = ?")
            .bind(runtime_id.as_str())
            .fetch_optional(&self.pool)
            .await?;
        row.map(Self::row_to_settings).transpose()
    }

    async fn upsert(
        &self,
        runtime_id: &RuntimeId,
        default_device: Option<&str>,
        default_model_family_id: Option<&str>,
        env_overrides: Value,
    ) -> Result<RuntimeSettings, GenericRepoError> {
        let env_json = serde_json::to_string(&env_overrides)?;
        let now = chrono::Utc::now().timestamp();
        let new_id = Ulid::new().to_string();

        sqlx::query(
            r#"
            INSERT INTO backend_runtime_settings (
                runtime_settings_id, runtime_id,
                default_device, default_model_family_id,
                keep_warm_default, idle_timeout_seconds,
                env_overrides_json, created_at, updated_at
            ) VALUES (?, ?, ?, ?, 1, 0, ?, ?, ?)
            ON CONFLICT(runtime_id) DO UPDATE SET
                default_device          = excluded.default_device,
                default_model_family_id = excluded.default_model_family_id,
                env_overrides_json      = excluded.env_overrides_json,
                updated_at              = excluded.updated_at
            "#,
        )
        .bind(&new_id)
        .bind(runtime_id.as_str())
        .bind(default_device)
        .bind(default_model_family_id)
        .bind(&env_json)
        .bind(now)
        .bind(now)
        .execute(&self.pool)
        .await?;

        self.get(runtime_id)
            .await?
            .ok_or(GenericRepoError::NotFound)
    }

    async fn delete(&self, runtime_id: &RuntimeId) -> Result<(), GenericRepoError> {
        let result = sqlx::query("DELETE FROM backend_runtime_settings WHERE runtime_id = ?")
            .bind(runtime_id.as_str())
            .execute(&self.pool)
            .await?;
        if result.rows_affected() == 0 {
            return Err(GenericRepoError::NotFound);
        }
        Ok(())
    }
}
