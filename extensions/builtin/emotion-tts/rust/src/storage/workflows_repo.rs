use async_trait::async_trait;
use sqlx::{Row, SqlitePool};

use crate::domain::{DeploymentId, EmotionTtsError};
use crate::storage::repo_traits::{RepoResult, WorkflowRow, WorkflowsRepo};

pub struct SqliteWorkflowsRepo {
    pool: SqlitePool,
}

impl SqliteWorkflowsRepo {
    #[must_use]
    pub const fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }
}

fn to_err(e: sqlx::Error) -> EmotionTtsError {
    e.into()
}

fn map_row(row: &sqlx::sqlite::SqliteRow) -> RepoResult<WorkflowRow> {
    let dep: String = row.try_get("deployment_id").map_err(to_err)?;
    let customised: i64 = row.try_get("customised").map_err(to_err)?;
    Ok(WorkflowRow {
        deployment_id: DeploymentId::try_from(dep.as_str())?,
        document_json: row.try_get("document_json").map_err(to_err)?,
        customised: customised != 0,
        updated_at: row.try_get("updated_at").map_err(to_err)?,
    })
}

#[async_trait]
impl WorkflowsRepo for SqliteWorkflowsRepo {
    async fn get(&self, dep: &DeploymentId) -> RepoResult<Option<WorkflowRow>> {
        let row = sqlx::query(
            "SELECT deployment_id, document_json, customised, updated_at \
             FROM ext_emotion_tts__workflows WHERE deployment_id = ?",
        )
        .bind(dep.as_str())
        .fetch_optional(&self.pool)
        .await
        .map_err(to_err)?;
        row.as_ref().map(map_row).transpose()
    }

    async fn upsert(&self, row: &WorkflowRow) -> RepoResult<()> {
        sqlx::query(
            "INSERT INTO ext_emotion_tts__workflows \
                 (deployment_id, document_json, customised, updated_at) \
             VALUES (?, ?, ?, ?) \
             ON CONFLICT(deployment_id) DO UPDATE SET \
                 document_json = excluded.document_json, \
                 customised    = excluded.customised, \
                 updated_at    = excluded.updated_at",
        )
        .bind(row.deployment_id.as_str())
        .bind(&row.document_json)
        .bind(if row.customised { 1_i64 } else { 0_i64 })
        .bind(row.updated_at)
        .execute(&self.pool)
        .await
        .map_err(to_err)?;
        Ok(())
    }

    async fn delete(&self, dep: &DeploymentId) -> RepoResult<()> {
        sqlx::query("DELETE FROM ext_emotion_tts__workflows WHERE deployment_id = ?")
            .bind(dep.as_str())
            .execute(&self.pool)
            .await
            .map_err(to_err)?;
        Ok(())
    }
}
