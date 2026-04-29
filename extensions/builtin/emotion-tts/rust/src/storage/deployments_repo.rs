use async_trait::async_trait;
use sqlx::{Row, SqlitePool};

use crate::domain::{DeploymentId, RunId, VoiceAssetId};
use crate::storage::repo_traits::{
    DeploymentRow, DeploymentsRepo, RepoResult, DEFAULT_MODEL_FAMILY,
};

pub const DEFAULT_OAS_LITERATURE_THRESHOLD: f64 = 0.45;

pub struct SqliteDeploymentsRepo {
    pool: SqlitePool,
}

impl SqliteDeploymentsRepo {
    #[must_use]
    pub const fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }
}

fn map_row(row: &sqlx::sqlite::SqliteRow) -> RepoResult<DeploymentRow> {
    let id_s: String = row.try_get("deployment_id").map_err(sqlx_to_err)?;
    let most_recent: Option<String> = row.try_get("most_recent_run_id").map_err(sqlx_to_err)?;
    let partial_run: Option<String> = row.try_get("partial_run_id").map_err(sqlx_to_err)?;

    let ref_pp_raw: Option<i64> = row
        .try_get("reference_preprocess_enabled")
        .map_err(sqlx_to_err)?;
    let oas_raw: Option<i64> = row.try_get("oas_enabled").map_err(sqlx_to_err)?;
    let compile_raw: Option<i64> = row.try_get("compile_gpt_enabled").map_err(sqlx_to_err)?;
    let model_family: Option<String> = row.try_get("model_family").map_err(sqlx_to_err)?;
    let default_voice_raw: Option<String> =
        row.try_get("default_voice_asset_id").map_err(sqlx_to_err)?;

    Ok(DeploymentRow {
        deployment_id: DeploymentId::try_from(id_s.as_str())?,
        host_extension_instance_ref: row
            .try_get("host_extension_instance_ref")
            .map_err(sqlx_to_err)?,
        display_name: row.try_get("display_name").map_err(sqlx_to_err)?,
        backend_runtime_preference: row
            .try_get("backend_runtime_preference")
            .map_err(sqlx_to_err)?,
        default_output_format: row.try_get("default_output_format").map_err(sqlx_to_err)?,
        default_speed_factor: row.try_get("default_speed_factor").map_err(sqlx_to_err)?,
        default_generation_overrides_json: row
            .try_get("default_generation_overrides_json")
            .map_err(sqlx_to_err)?,
        most_recent_run_id: most_recent
            .map(|s| RunId::try_from(s.as_str()))
            .transpose()?,
        partial_run_id: partial_run
            .map(|s| RunId::try_from(s.as_str()))
            .transpose()?,
        reference_preprocess_enabled: ref_pp_raw.map_or(true, |v| v != 0),
        oas_enabled: oas_raw.map_or(true, |v| v != 0),
        compile_gpt_enabled: compile_raw.map_or(false, |v| v != 0),
        model_family: model_family.unwrap_or_else(|| DEFAULT_MODEL_FAMILY.to_string()),
        oas_threshold_learned: row.try_get("oas_threshold_learned").map_err(sqlx_to_err)?,
        oas_samples_seen: row.try_get("oas_samples_seen").map_err(sqlx_to_err)?,
        default_voice_asset_id: default_voice_raw
            .map(|s| VoiceAssetId::try_from(s.as_str()))
            .transpose()?,
        created_at: row.try_get("created_at").map_err(sqlx_to_err)?,
        updated_at: row.try_get("updated_at").map_err(sqlx_to_err)?,
    })
}

fn sqlx_to_err(e: sqlx::Error) -> crate::domain::EmotionTtsError {
    e.into()
}

#[async_trait]
impl DeploymentsRepo for SqliteDeploymentsRepo {
    async fn insert(&self, row: &DeploymentRow) -> RepoResult<()> {
        sqlx::query(
            "INSERT INTO ext_emotion_tts__deployments \
             (deployment_id, host_extension_instance_ref, display_name, backend_runtime_preference, \
              default_output_format, default_speed_factor, default_generation_overrides_json, \
              most_recent_run_id, default_voice_asset_id, created_at, updated_at) \
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(row.deployment_id.as_str())
        .bind(&row.host_extension_instance_ref)
        .bind(&row.display_name)
        .bind(&row.backend_runtime_preference)
        .bind(&row.default_output_format)
        .bind(row.default_speed_factor)
        .bind(&row.default_generation_overrides_json)
        .bind(row.most_recent_run_id.as_ref().map(RunId::as_str))
        .bind(row.default_voice_asset_id.as_ref().map(VoiceAssetId::as_str))
        .bind(row.created_at)
        .bind(row.updated_at)
        .execute(&self.pool)
        .await
        .map_err(sqlx_to_err)?;
        Ok(())
    }

    async fn get(&self, id: &DeploymentId) -> RepoResult<Option<DeploymentRow>> {
        let row = sqlx::query("SELECT * FROM ext_emotion_tts__deployments WHERE deployment_id = ?")
            .bind(id.as_str())
            .fetch_optional(&self.pool)
            .await
            .map_err(sqlx_to_err)?;
        row.as_ref().map(map_row).transpose()
    }

    async fn list(&self) -> RepoResult<Vec<DeploymentRow>> {
        let rows =
            sqlx::query("SELECT * FROM ext_emotion_tts__deployments ORDER BY updated_at DESC")
                .fetch_all(&self.pool)
                .await
                .map_err(sqlx_to_err)?;
        rows.iter().map(map_row).collect()
    }

    async fn update(&self, row: &DeploymentRow) -> RepoResult<()> {
        sqlx::query(
            "UPDATE ext_emotion_tts__deployments SET \
               host_extension_instance_ref = ?, display_name = ?, backend_runtime_preference = ?, \
               default_output_format = ?, default_speed_factor = ?, default_generation_overrides_json = ?, \
               most_recent_run_id = ?, default_voice_asset_id = ?, updated_at = ? \
             WHERE deployment_id = ?",
        )
        .bind(&row.host_extension_instance_ref)
        .bind(&row.display_name)
        .bind(&row.backend_runtime_preference)
        .bind(&row.default_output_format)
        .bind(row.default_speed_factor)
        .bind(&row.default_generation_overrides_json)
        .bind(row.most_recent_run_id.as_ref().map(RunId::as_str))
        .bind(row.default_voice_asset_id.as_ref().map(VoiceAssetId::as_str))
        .bind(row.updated_at)
        .bind(row.deployment_id.as_str())
        .execute(&self.pool)
        .await
        .map_err(sqlx_to_err)?;
        Ok(())
    }

    async fn delete(&self, id: &DeploymentId) -> RepoResult<()> {
        sqlx::query("DELETE FROM ext_emotion_tts__deployments WHERE deployment_id = ?")
            .bind(id.as_str())
            .execute(&self.pool)
            .await
            .map_err(sqlx_to_err)?;
        Ok(())
    }

    async fn set_most_recent_run(&self, id: &DeploymentId, run_id: &RunId) -> RepoResult<()> {
        sqlx::query(
            "UPDATE ext_emotion_tts__deployments SET most_recent_run_id = ?, updated_at = strftime('%s', 'now') WHERE deployment_id = ?",
        )
        .bind(run_id.as_str())
        .bind(id.as_str())
        .execute(&self.pool)
        .await
        .map_err(sqlx_to_err)?;
        Ok(())
    }

    async fn set_partial_run(&self, id: &DeploymentId, run_id: Option<&RunId>) -> RepoResult<()> {
        sqlx::query(
            "UPDATE ext_emotion_tts__deployments SET partial_run_id = ?, updated_at = strftime('%s', 'now') WHERE deployment_id = ?",
        )
        .bind(run_id.map(RunId::as_str))
        .bind(id.as_str())
        .execute(&self.pool)
        .await
        .map_err(sqlx_to_err)?;
        Ok(())
    }

    async fn set_oas_threshold(
        &self,
        id: &DeploymentId,
        threshold_learned: Option<f64>,
        samples_seen: i64,
    ) -> RepoResult<()> {
        sqlx::query(
            "UPDATE ext_emotion_tts__deployments \
             SET oas_threshold_learned = ?, oas_samples_seen = ?, updated_at = strftime('%s', 'now') \
             WHERE deployment_id = ?",
        )
        .bind(threshold_learned)
        .bind(samples_seen)
        .bind(id.as_str())
        .execute(&self.pool)
        .await
        .map_err(sqlx_to_err)?;
        Ok(())
    }

    async fn patch_engine_settings(
        &self,
        id: &DeploymentId,
        reference_preprocess_enabled: Option<bool>,
        oas_enabled: Option<bool>,
        compile_gpt_enabled: Option<bool>,
        model_family: Option<&str>,
    ) -> RepoResult<()> {
        sqlx::query(
            "UPDATE ext_emotion_tts__deployments \
             SET reference_preprocess_enabled = COALESCE(?, reference_preprocess_enabled), \
                 oas_enabled = COALESCE(?, oas_enabled), \
                 compile_gpt_enabled = COALESCE(?, compile_gpt_enabled), \
                 model_family = COALESCE(?, model_family), \
                 updated_at = strftime('%s', 'now') \
             WHERE deployment_id = ?",
        )
        .bind(reference_preprocess_enabled.map(i64::from))
        .bind(oas_enabled.map(i64::from))
        .bind(compile_gpt_enabled.map(i64::from))
        .bind(model_family)
        .bind(id.as_str())
        .execute(&self.pool)
        .await
        .map_err(sqlx_to_err)?;
        Ok(())
    }

    async fn set_default_voice(
        &self,
        dep: &DeploymentId,
        voice: Option<&VoiceAssetId>,
    ) -> RepoResult<()> {
        sqlx::query(
            "UPDATE ext_emotion_tts__deployments \
             SET default_voice_asset_id = ?, updated_at = strftime('%s', 'now') \
             WHERE deployment_id = ?",
        )
        .bind(voice.map(VoiceAssetId::as_str))
        .bind(dep.as_str())
        .execute(&self.pool)
        .await
        .map_err(sqlx_to_err)?;
        Ok(())
    }
}
