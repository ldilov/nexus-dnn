use async_trait::async_trait;
use sqlx::{Row, SqlitePool};

use crate::domain::{DeploymentId, EmotionTtsError, PresetId};
use crate::storage::repo_traits::{PresetsRepo, RepoResult, VectorPresetRow};

pub struct SqlitePresetsRepo {
    pool: SqlitePool,
}

impl SqlitePresetsRepo {
    #[must_use]
    pub const fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }
}

fn to_err(e: sqlx::Error) -> EmotionTtsError {
    e.into()
}

fn map_row(row: &sqlx::sqlite::SqliteRow) -> RepoResult<VectorPresetRow> {
    let id: String = row.try_get("preset_id").map_err(to_err)?;
    let dep: String = row.try_get("deployment_id").map_err(to_err)?;
    Ok(VectorPresetRow {
        preset_id: PresetId::try_from(id.as_str())?,
        deployment_id: DeploymentId::try_from(dep.as_str())?,
        preset_name: row.try_get("preset_name").map_err(to_err)?,
        vector_json: row.try_get("vector_json").map_err(to_err)?,
        created_at: row.try_get("created_at").map_err(to_err)?,
        updated_at: row.try_get("updated_at").map_err(to_err)?,
    })
}

#[async_trait]
impl PresetsRepo for SqlitePresetsRepo {
    async fn insert(&self, row: &VectorPresetRow) -> RepoResult<()> {
        sqlx::query(
            "INSERT INTO ext_emotion_tts__vector_presets \
             (preset_id, deployment_id, preset_name, vector_json, created_at, updated_at) \
             VALUES (?, ?, ?, ?, ?, ?)",
        )
        .bind(row.preset_id.as_str())
        .bind(row.deployment_id.as_str())
        .bind(&row.preset_name)
        .bind(&row.vector_json)
        .bind(row.created_at)
        .bind(row.updated_at)
        .execute(&self.pool)
        .await
        .map_err(to_err)?;
        Ok(())
    }

    async fn get(&self, id: &PresetId) -> RepoResult<Option<VectorPresetRow>> {
        let row = sqlx::query("SELECT * FROM ext_emotion_tts__vector_presets WHERE preset_id = ?")
            .bind(id.as_str())
            .fetch_optional(&self.pool)
            .await
            .map_err(to_err)?;
        row.as_ref().map(map_row).transpose()
    }

    async fn list_by_deployment(&self, dep: &DeploymentId) -> RepoResult<Vec<VectorPresetRow>> {
        let rows = sqlx::query(
            "SELECT * FROM ext_emotion_tts__vector_presets WHERE deployment_id = ? ORDER BY preset_name ASC",
        )
        .bind(dep.as_str())
        .fetch_all(&self.pool)
        .await
        .map_err(to_err)?;
        rows.iter().map(map_row).collect()
    }

    async fn update(&self, row: &VectorPresetRow) -> RepoResult<()> {
        let result = sqlx::query(
            "UPDATE ext_emotion_tts__vector_presets \
             SET preset_name = ?, vector_json = ?, updated_at = ? \
             WHERE preset_id = ?",
        )
        .bind(&row.preset_name)
        .bind(&row.vector_json)
        .bind(row.updated_at)
        .bind(row.preset_id.as_str())
        .execute(&self.pool)
        .await
        .map_err(to_err)?;
        if result.rows_affected() == 0 {
            return Err(EmotionTtsError::not_found(format!(
                "preset {}",
                row.preset_id
            )));
        }
        Ok(())
    }

    async fn delete(&self, id: &PresetId) -> RepoResult<()> {
        sqlx::query("DELETE FROM ext_emotion_tts__vector_presets WHERE preset_id = ?")
            .bind(id.as_str())
            .execute(&self.pool)
            .await
            .map_err(to_err)?;
        Ok(())
    }
}
