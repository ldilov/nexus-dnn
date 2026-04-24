use async_trait::async_trait;
use sqlx::{Row, SqlitePool};

use crate::domain::{DeploymentId, EmotionTtsError, VoiceAssetId};
use crate::storage::repo_traits::{RepoResult, VoiceAssetRow, VoiceAssetsRepo};

pub struct SqliteVoiceAssetsRepo {
    pool: SqlitePool,
}

impl SqliteVoiceAssetsRepo {
    #[must_use]
    pub const fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }
}

fn to_err(e: sqlx::Error) -> EmotionTtsError {
    e.into()
}

fn map_row(row: &sqlx::sqlite::SqliteRow) -> RepoResult<VoiceAssetRow> {
    let id: String = row.try_get("voice_asset_id").map_err(to_err)?;
    let dep: String = row.try_get("deployment_id").map_err(to_err)?;
    let is_active: i64 = row.try_get("is_active").map_err(to_err)?;
    Ok(VoiceAssetRow {
        voice_asset_id: VoiceAssetId::try_from(id.as_str())?,
        deployment_id: DeploymentId::try_from(dep.as_str())?,
        display_name: row.try_get("display_name").map_err(to_err)?,
        kind: row.try_get("kind").map_err(to_err)?,
        audio_artifact_ref: row.try_get("audio_artifact_ref").map_err(to_err)?,
        content_sha256: row.try_get("content_sha256").map_err(to_err)?,
        reference_text: row.try_get("reference_text").map_err(to_err)?,
        sample_rate: row.try_get("sample_rate").map_err(to_err)?,
        duration_ms: row.try_get("duration_ms").map_err(to_err)?,
        source_type: row.try_get("source_type").map_err(to_err)?,
        notes: row.try_get("notes").map_err(to_err)?,
        is_active: is_active != 0,
        preprocessed_artifact_ref: row.try_get("preprocessed_artifact_ref").map_err(to_err)?,
        preprocessing_report_json: row.try_get("preprocessing_report_json").map_err(to_err)?,
        created_at: row.try_get("created_at").map_err(to_err)?,
        updated_at: row.try_get("updated_at").map_err(to_err)?,
    })
}

#[async_trait]
impl VoiceAssetsRepo for SqliteVoiceAssetsRepo {
    async fn insert(&self, row: &VoiceAssetRow) -> RepoResult<()> {
        sqlx::query(
            "INSERT INTO ext_emotion_tts__voice_assets \
             (voice_asset_id, deployment_id, display_name, kind, audio_artifact_ref, content_sha256, \
              reference_text, sample_rate, duration_ms, source_type, notes, is_active, created_at, updated_at) \
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(row.voice_asset_id.as_str())
        .bind(row.deployment_id.as_str())
        .bind(&row.display_name)
        .bind(&row.kind)
        .bind(&row.audio_artifact_ref)
        .bind(&row.content_sha256)
        .bind(&row.reference_text)
        .bind(row.sample_rate)
        .bind(row.duration_ms)
        .bind(&row.source_type)
        .bind(&row.notes)
        .bind(i64::from(row.is_active))
        .bind(row.created_at)
        .bind(row.updated_at)
        .execute(&self.pool)
        .await
        .map_err(to_err)?;
        Ok(())
    }

    async fn get(&self, id: &VoiceAssetId) -> RepoResult<Option<VoiceAssetRow>> {
        let row = sqlx::query("SELECT * FROM ext_emotion_tts__voice_assets WHERE voice_asset_id = ?")
            .bind(id.as_str())
            .fetch_optional(&self.pool)
            .await
            .map_err(to_err)?;
        row.as_ref().map(map_row).transpose()
    }

    async fn list_by_deployment(&self, dep: &DeploymentId) -> RepoResult<Vec<VoiceAssetRow>> {
        let rows = sqlx::query(
            "SELECT * FROM ext_emotion_tts__voice_assets WHERE deployment_id = ? AND is_active = 1 ORDER BY created_at DESC",
        )
        .bind(dep.as_str())
        .fetch_all(&self.pool)
        .await
        .map_err(to_err)?;
        rows.iter().map(map_row).collect()
    }

    async fn deactivate(&self, id: &VoiceAssetId) -> RepoResult<()> {
        sqlx::query(
            "UPDATE ext_emotion_tts__voice_assets SET is_active = 0, updated_at = strftime('%s', 'now') WHERE voice_asset_id = ?",
        )
        .bind(id.as_str())
        .execute(&self.pool)
        .await
        .map_err(to_err)?;
        Ok(())
    }
}
