//! SQLite-backed [`BackendRuntimeInstallsRepo`] impl.

use std::str::FromStr;

use async_trait::async_trait;
use sqlx::Row;
use sqlx::sqlite::SqlitePool;

use super::{InstallRecord, repo::BackendRuntimeInstallsRepo};
use crate::generic::enums::{InstallStatus, PipelineFailureCategory};
use crate::generic::errors::GenericRepoError;
use crate::generic::ids::{AcceleratorProfile, PlatformId, ReleaseId, RuntimeId, RuntimeInstallId};

#[derive(Clone)]
pub struct SqliteInstallsRepo {
    pool: SqlitePool,
}

impl SqliteInstallsRepo {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }

    fn row_to_record(row: sqlx::sqlite::SqliteRow) -> Result<InstallRecord, GenericRepoError> {
        let install_id_raw: String = row.try_get("runtime_install_id")?;
        let runtime_install_id = RuntimeInstallId::from_str(&install_id_raw)
            .map_err(|e| GenericRepoError::Serialization(e.to_string()))?;

        let runtime_id_raw: String = row.try_get("runtime_id")?;
        let runtime_id = RuntimeId::try_from(runtime_id_raw.as_str())
            .map_err(|e| GenericRepoError::Serialization(e.to_string()))?;

        let release_id_raw: String = row.try_get("release_id")?;
        let release_id = ReleaseId::try_from(release_id_raw.as_str())
            .map_err(|e| GenericRepoError::Serialization(e.to_string()))?;

        let platform_raw: String = row.try_get("platform")?;
        let platform = PlatformId::try_from(platform_raw.as_str())
            .map_err(|e| GenericRepoError::Serialization(e.to_string()))?;

        let profile_raw: String = row.try_get("accelerator_profile")?;
        let accelerator_profile = AcceleratorProfile::try_from(profile_raw.as_str())
            .map_err(|e| GenericRepoError::Serialization(e.to_string()))?;

        let status_raw: String = row.try_get("status")?;
        let status = parse_install_status(&status_raw)?;

        let last_failure_category: Option<String> = row.try_get("last_failure_category")?;
        let last_failure_category = last_failure_category
            .map(|raw| {
                PipelineFailureCategory::from_wire(&raw).map_err(|other| {
                    GenericRepoError::Serialization(format!("unknown failure category: {other}"))
                })
            })
            .transpose()?;

        Ok(InstallRecord {
            runtime_install_id,
            runtime_id,
            release_id,
            platform,
            accelerator_profile,
            install_path: row.try_get("install_path")?,
            entrypoint_path: row.try_get("entrypoint_path")?,
            artifact_hash: row.try_get("artifact_hash")?,
            status,
            current_phase: row.try_get("current_phase")?,
            validated_at: row.try_get("validated_at")?,
            last_failure_category,
            last_failure_detail: row.try_get("last_failure_detail")?,
            created_at: row.try_get("created_at")?,
            updated_at: row.try_get("updated_at")?,
        })
    }
}

fn parse_install_status(raw: &str) -> Result<InstallStatus, GenericRepoError> {
    Ok(match raw {
        "pending" => InstallStatus::Pending,
        "downloading" => InstallStatus::Downloading,
        "validating" => InstallStatus::Validating,
        "validated" => InstallStatus::Validated,
        "failed" => InstallStatus::Failed,
        "abandoned" => InstallStatus::Abandoned,
        other => {
            return Err(GenericRepoError::Serialization(format!(
                "unknown install status: {other}"
            )));
        }
    })
}

#[async_trait]
impl BackendRuntimeInstallsRepo for SqliteInstallsRepo {
    async fn insert(&self, r: &InstallRecord) -> Result<(), GenericRepoError> {
        sqlx::query(
            r#"
            INSERT INTO backend_runtime_installs (
                runtime_install_id, runtime_id, release_id, platform,
                accelerator_profile, install_path, entrypoint_path,
                artifact_hash, status, current_phase, validated_at,
                last_failure_category, last_failure_detail,
                created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            "#,
        )
        .bind(r.runtime_install_id.to_string())
        .bind(r.runtime_id.as_str())
        .bind(r.release_id.as_str())
        .bind(r.platform.as_str())
        .bind(r.accelerator_profile.as_str())
        .bind(&r.install_path)
        .bind(r.entrypoint_path.as_deref())
        .bind(r.artifact_hash.as_deref())
        .bind(r.status.as_str())
        .bind(r.current_phase.as_deref())
        .bind(r.validated_at)
        .bind(r.last_failure_category.as_ref().map(|c| c.to_wire()))
        .bind(r.last_failure_detail.as_deref())
        .bind(r.created_at)
        .bind(r.updated_at)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    async fn get(
        &self,
        install_id: &RuntimeInstallId,
    ) -> Result<Option<InstallRecord>, GenericRepoError> {
        let row =
            sqlx::query("SELECT * FROM backend_runtime_installs WHERE runtime_install_id = ?")
                .bind(install_id.to_string())
                .fetch_optional(&self.pool)
                .await?;
        row.map(Self::row_to_record).transpose()
    }

    async fn list_by_runtime(
        &self,
        runtime_id: &RuntimeId,
    ) -> Result<Vec<InstallRecord>, GenericRepoError> {
        let rows = sqlx::query(
            "SELECT * FROM backend_runtime_installs
             WHERE runtime_id = ?
             ORDER BY created_at ASC",
        )
        .bind(runtime_id.as_str())
        .fetch_all(&self.pool)
        .await?;
        rows.into_iter().map(Self::row_to_record).collect()
    }

    async fn find_validated(
        &self,
        runtime_id: &RuntimeId,
        release_id: &ReleaseId,
        platform: &PlatformId,
        accelerator_profile: &AcceleratorProfile,
    ) -> Result<Option<InstallRecord>, GenericRepoError> {
        let row = sqlx::query(
            "SELECT * FROM backend_runtime_installs
             WHERE runtime_id = ? AND release_id = ? AND platform = ?
               AND accelerator_profile = ? AND status = 'validated'
             LIMIT 1",
        )
        .bind(runtime_id.as_str())
        .bind(release_id.as_str())
        .bind(platform.as_str())
        .bind(accelerator_profile.as_str())
        .fetch_optional(&self.pool)
        .await?;
        row.map(Self::row_to_record).transpose()
    }

    async fn update_status(
        &self,
        install_id: &RuntimeInstallId,
        status: InstallStatus,
        current_phase: Option<&str>,
    ) -> Result<(), GenericRepoError> {
        let now = chrono::Utc::now().timestamp();
        let result = sqlx::query(
            "UPDATE backend_runtime_installs
             SET status = ?, current_phase = ?, updated_at = ?
             WHERE runtime_install_id = ?",
        )
        .bind(status.as_str())
        .bind(current_phase)
        .bind(now)
        .bind(install_id.to_string())
        .execute(&self.pool)
        .await?;
        if result.rows_affected() == 0 {
            return Err(GenericRepoError::NotFound);
        }
        Ok(())
    }

    async fn record_success(
        &self,
        install_id: &RuntimeInstallId,
        entrypoint_path: Option<&str>,
        artifact_hash: Option<&str>,
        validated_at: i64,
    ) -> Result<(), GenericRepoError> {
        let now = chrono::Utc::now().timestamp();
        let result = sqlx::query(
            "UPDATE backend_runtime_installs
             SET status = 'validated', current_phase = NULL,
                 entrypoint_path = ?, artifact_hash = ?,
                 validated_at = ?,
                 last_failure_category = NULL, last_failure_detail = NULL,
                 updated_at = ?
             WHERE runtime_install_id = ?",
        )
        .bind(entrypoint_path)
        .bind(artifact_hash)
        .bind(validated_at)
        .bind(now)
        .bind(install_id.to_string())
        .execute(&self.pool)
        .await?;
        if result.rows_affected() == 0 {
            return Err(GenericRepoError::NotFound);
        }
        Ok(())
    }

    async fn record_failure(
        &self,
        install_id: &RuntimeInstallId,
        category: PipelineFailureCategory,
        detail: &str,
    ) -> Result<(), GenericRepoError> {
        let now = chrono::Utc::now().timestamp();
        let result = sqlx::query(
            "UPDATE backend_runtime_installs
             SET status = 'failed', current_phase = NULL,
                 last_failure_category = ?, last_failure_detail = ?,
                 updated_at = ?
             WHERE runtime_install_id = ?",
        )
        .bind(category.to_wire())
        .bind(detail)
        .bind(now)
        .bind(install_id.to_string())
        .execute(&self.pool)
        .await?;
        if result.rows_affected() == 0 {
            return Err(GenericRepoError::NotFound);
        }
        Ok(())
    }

    async fn mark_abandoned_for_runtime(
        &self,
        runtime_id: &RuntimeId,
    ) -> Result<(), GenericRepoError> {
        let now = chrono::Utc::now().timestamp();
        sqlx::query(
            "UPDATE backend_runtime_installs
             SET status = 'abandoned', current_phase = NULL, updated_at = ?
             WHERE runtime_id = ?
               AND status NOT IN ('abandoned','validated','failed')",
        )
        .bind(now)
        .bind(runtime_id.as_str())
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    async fn delete(&self, install_id: &RuntimeInstallId) -> Result<(), GenericRepoError> {
        let result =
            sqlx::query("DELETE FROM backend_runtime_installs WHERE runtime_install_id = ?")
                .bind(install_id.to_string())
                .execute(&self.pool)
                .await?;
        if result.rows_affected() == 0 {
            return Err(GenericRepoError::NotFound);
        }
        Ok(())
    }
}
