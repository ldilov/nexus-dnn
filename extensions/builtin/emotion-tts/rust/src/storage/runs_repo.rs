use async_trait::async_trait;
use sqlx::{Row, SqlitePool};

use crate::domain::{DeploymentId, EmotionTtsError, RunId};
use crate::storage::repo_traits::{RepoResult, RunRow, RunsRepo};

pub struct SqliteRunsRepo {
    pool: SqlitePool,
}

impl SqliteRunsRepo {
    #[must_use]
    pub const fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }
}

fn to_err(e: sqlx::Error) -> EmotionTtsError {
    e.into()
}

fn map_row(row: &sqlx::sqlite::SqliteRow) -> RepoResult<RunRow> {
    let id: String = row.try_get("run_id").map_err(to_err)?;
    let dep: String = row.try_get("deployment_id").map_err(to_err)?;
    let original: Option<String> = row.try_get("original_run_id").map_err(to_err)?;
    Ok(RunRow {
        run_id: RunId::try_from(id.as_str())?,
        deployment_id: DeploymentId::try_from(dep.as_str())?,
        kind: row.try_get("kind").map_err(to_err)?,
        status: row.try_get("status").map_err(to_err)?,
        script_snapshot: row.try_get("script_snapshot").map_err(to_err)?,
        parser_mode: row.try_get("parser_mode").map_err(to_err)?,
        generation_settings_json: row.try_get("generation_settings_json").map_err(to_err)?,
        global_emotion_snapshot_json: row.try_get("global_emotion_snapshot_json").map_err(to_err)?,
        output_format: row.try_get("output_format").map_err(to_err)?,
        speed_factor: row.try_get("speed_factor").map_err(to_err)?,
        speed_mode: row.try_get("speed_mode").map_err(to_err)?,
        cache_policy: row.try_get("cache_policy").map_err(to_err)?,
        seed_strategy: row.try_get("seed_strategy").map_err(to_err)?,
        base_seed: row.try_get("base_seed").map_err(to_err)?,
        original_run_id: original.map(|s| RunId::try_from(s.as_str())).transpose()?,
        runtime_install_id: row.try_get("runtime_install_id").map_err(to_err)?,
        runtime_version: row.try_get("runtime_version").map_err(to_err)?,
        model_version: row.try_get("model_version").map_err(to_err)?,
        extension_version: row.try_get("extension_version").map_err(to_err)?,
        queued_at: row.try_get("queued_at").map_err(to_err)?,
        started_at: row.try_get("started_at").map_err(to_err)?,
        finished_at: row.try_get("finished_at").map_err(to_err)?,
        error_category: row.try_get("error_category").map_err(to_err)?,
        error_detail: row.try_get("error_detail").map_err(to_err)?,
    })
}

#[async_trait]
impl RunsRepo for SqliteRunsRepo {
    async fn insert(&self, row: &RunRow) -> RepoResult<()> {
        sqlx::query(
            "INSERT INTO ext_emotion_tts__runs \
             (run_id, deployment_id, kind, status, script_snapshot, parser_mode, generation_settings_json, \
              global_emotion_snapshot_json, output_format, speed_factor, speed_mode, cache_policy, \
              seed_strategy, base_seed, original_run_id, runtime_install_id, runtime_version, model_version, \
              extension_version, queued_at, started_at, finished_at, error_category, error_detail) \
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(row.run_id.as_str())
        .bind(row.deployment_id.as_str())
        .bind(&row.kind)
        .bind(&row.status)
        .bind(&row.script_snapshot)
        .bind(&row.parser_mode)
        .bind(&row.generation_settings_json)
        .bind(&row.global_emotion_snapshot_json)
        .bind(&row.output_format)
        .bind(row.speed_factor)
        .bind(&row.speed_mode)
        .bind(&row.cache_policy)
        .bind(&row.seed_strategy)
        .bind(row.base_seed)
        .bind(row.original_run_id.as_ref().map(RunId::as_str))
        .bind(&row.runtime_install_id)
        .bind(&row.runtime_version)
        .bind(&row.model_version)
        .bind(&row.extension_version)
        .bind(row.queued_at)
        .bind(row.started_at)
        .bind(row.finished_at)
        .bind(&row.error_category)
        .bind(&row.error_detail)
        .execute(&self.pool)
        .await
        .map_err(to_err)?;
        Ok(())
    }

    async fn get(&self, id: &RunId) -> RepoResult<Option<RunRow>> {
        let row = sqlx::query("SELECT * FROM ext_emotion_tts__runs WHERE run_id = ?")
            .bind(id.as_str())
            .fetch_optional(&self.pool)
            .await
            .map_err(to_err)?;
        row.as_ref().map(map_row).transpose()
    }

    async fn list_by_deployment(&self, dep: &DeploymentId, limit: i64) -> RepoResult<Vec<RunRow>> {
        let rows = sqlx::query(
            "SELECT * FROM ext_emotion_tts__runs WHERE deployment_id = ? ORDER BY queued_at DESC LIMIT ?",
        )
        .bind(dep.as_str())
        .bind(limit)
        .fetch_all(&self.pool)
        .await
        .map_err(to_err)?;
        rows.iter().map(map_row).collect()
    }

    async fn update_status(&self, id: &RunId, status: &str, finished_at: Option<i64>) -> RepoResult<()> {
        sqlx::query("UPDATE ext_emotion_tts__runs SET status = ?, finished_at = ? WHERE run_id = ?")
            .bind(status)
            .bind(finished_at)
            .bind(id.as_str())
            .execute(&self.pool)
            .await
            .map_err(to_err)?;
        Ok(())
    }

    async fn update_status_guarded(
        &self,
        id: &RunId,
        status: &str,
        finished_at: Option<i64>,
        from_any: &[&str],
    ) -> RepoResult<bool> {
        if from_any.is_empty() {
            return Ok(false);
        }
        let placeholders = vec!["?"; from_any.len()].join(",");
        let sql = format!(
            "UPDATE ext_emotion_tts__runs SET status = ?, finished_at = ? \
             WHERE run_id = ? AND status IN ({placeholders})"
        );
        let mut query = sqlx::query(&sql)
            .bind(status)
            .bind(finished_at)
            .bind(id.as_str());
        for s in from_any {
            query = query.bind(*s);
        }
        let result = query.execute(&self.pool).await.map_err(to_err)?;
        Ok(result.rows_affected() > 0)
    }

    async fn set_started_guarded(&self, id: &RunId, at: i64) -> RepoResult<bool> {
        let result = sqlx::query(
            "UPDATE ext_emotion_tts__runs SET status = 'running', started_at = ? \
             WHERE run_id = ? AND status = 'queued'",
        )
        .bind(at)
        .bind(id.as_str())
        .execute(&self.pool)
        .await
        .map_err(to_err)?;
        Ok(result.rows_affected() > 0)
    }
}
