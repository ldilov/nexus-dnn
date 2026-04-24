use async_trait::async_trait;
use sqlx::{Row, SqlitePool};

use crate::domain::{DeploymentId, EmotionTtsError, ExportId, RunId};
use crate::storage::repo_traits::{ExportHistoryRepo, ExportHistoryRow, RepoResult};

pub struct SqliteExportHistoryRepo {
    pool: SqlitePool,
}

impl SqliteExportHistoryRepo {
    #[must_use]
    pub const fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }
}

fn to_err(e: sqlx::Error) -> EmotionTtsError {
    e.into()
}

fn map_row(row: &sqlx::sqlite::SqliteRow) -> RepoResult<ExportHistoryRow> {
    let id: String = row.try_get("export_id").map_err(to_err)?;
    let dep: String = row.try_get("deployment_id").map_err(to_err)?;
    let run: Option<String> = row.try_get("run_id").map_err(to_err)?;
    let partial: i64 = row.try_get("partial").map_err(to_err)?;
    Ok(ExportHistoryRow {
        export_id: ExportId::try_from(id.as_str())?,
        deployment_id: DeploymentId::try_from(dep.as_str())?,
        run_id: run.map(|s| RunId::try_from(s.as_str())).transpose()?,
        zip_artifact_ref: row.try_get("zip_artifact_ref").map_err(to_err)?,
        manifest_artifact_ref: row.try_get("manifest_artifact_ref").map_err(to_err)?,
        preview_artifact_ref: row.try_get("preview_artifact_ref").map_err(to_err)?,
        output_format: row.try_get("output_format").map_err(to_err)?,
        utterance_count: row.try_get("utterance_count").map_err(to_err)?,
        partial: partial != 0,
        created_at: row.try_get("created_at").map_err(to_err)?,
    })
}

#[async_trait]
impl ExportHistoryRepo for SqliteExportHistoryRepo {
    async fn insert(&self, row: &ExportHistoryRow) -> RepoResult<()> {
        sqlx::query(
            "INSERT INTO ext_emotion_tts__export_history \
             (export_id, deployment_id, run_id, zip_artifact_ref, manifest_artifact_ref, preview_artifact_ref, \
              output_format, utterance_count, partial, created_at) \
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(row.export_id.as_str())
        .bind(row.deployment_id.as_str())
        .bind(row.run_id.as_ref().map(RunId::as_str))
        .bind(&row.zip_artifact_ref)
        .bind(&row.manifest_artifact_ref)
        .bind(&row.preview_artifact_ref)
        .bind(&row.output_format)
        .bind(row.utterance_count)
        .bind(i64::from(row.partial))
        .bind(row.created_at)
        .execute(&self.pool)
        .await
        .map_err(to_err)?;
        Ok(())
    }

    async fn list_by_deployment(
        &self,
        dep: &DeploymentId,
        limit: i64,
    ) -> RepoResult<Vec<ExportHistoryRow>> {
        let rows = sqlx::query(
            "SELECT * FROM ext_emotion_tts__export_history WHERE deployment_id = ? ORDER BY created_at DESC LIMIT ?",
        )
        .bind(dep.as_str())
        .bind(limit)
        .fetch_all(&self.pool)
        .await
        .map_err(to_err)?;
        rows.iter().map(map_row).collect()
    }

    async fn get(&self, id: &ExportId) -> RepoResult<Option<ExportHistoryRow>> {
        let row = sqlx::query("SELECT * FROM ext_emotion_tts__export_history WHERE export_id = ?")
            .bind(id.as_str())
            .fetch_optional(&self.pool)
            .await
            .map_err(to_err)?;
        row.as_ref().map(map_row).transpose()
    }
}
