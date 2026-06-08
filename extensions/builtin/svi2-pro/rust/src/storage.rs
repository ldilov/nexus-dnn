use serde::Serialize;
use serde_json::Value as JsonValue;
use sqlx::{Row, SqlitePool};

use crate::domain::{JobId, Result, Svi2Error};

pub const DEFAULT_SETTINGS_JSON: &str = r#"{"modelsDir":"","attentionBackend":"flash2","fp8Compute":"bf16","blocksToSwap":40,"interpolateMethod":"rife","interpolateFps":48,"outputDir":""}"#;

#[derive(Clone)]
pub struct Store {
    pool: SqlitePool,
}

#[derive(Debug, Clone)]
pub struct RenderJobRow {
    pub job_id: String,
    pub preset_id: Option<String>,
    pub params_json: String,
    pub status: String,
    pub output_path: Option<String>,
    pub render_report_json: Option<String>,
    pub error_category: Option<String>,
    pub error_detail: Option<String>,
    pub created_at: i64,
    pub started_at: Option<i64>,
    pub finished_at: Option<i64>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct RenderJobDto {
    pub id: String,
    pub preset_id: Option<String>,
    pub params: JsonValue,
    pub status: String,
    pub output_path: Option<String>,
    pub render_report: Option<JsonValue>,
    pub error_code: Option<i64>,
    pub error_message: Option<String>,
    pub created_at: String,
    pub updated_at: String,
}

fn status_to_wire(status: &str) -> &str {
    match status {
        "completed" => "succeeded",
        other => other,
    }
}

fn epoch_to_iso(secs: i64) -> String {
    let secs = secs.max(0);
    let days = secs / 86_400;
    let rem = secs % 86_400;
    let (hh, mm, ss) = (rem / 3600, (rem % 3600) / 60, rem % 60);
    let (year, month, day) = civil_from_days(days);
    format!("{year:04}-{month:02}-{day:02}T{hh:02}:{mm:02}:{ss:02}Z")
}

fn civil_from_days(z: i64) -> (i64, i64, i64) {
    let z = z + 719_468;
    let era = if z >= 0 { z } else { z - 146_096 } / 146_097;
    let doe = z - era * 146_097;
    let yoe = (doe - doe / 1460 + doe / 36_524 - doe / 146_096) / 365;
    let y = yoe + era * 400;
    let doy = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp = (5 * doy + 2) / 153;
    let d = doy - (153 * mp + 2) / 5 + 1;
    let m = if mp < 10 { mp + 3 } else { mp - 9 };
    (if m <= 2 { y + 1 } else { y }, m, d)
}

impl RenderJobRow {
    pub fn into_dto(self) -> RenderJobDto {
        let params = serde_json::from_str(&self.params_json).unwrap_or(JsonValue::Null);
        let render_report = self
            .render_report_json
            .as_deref()
            .and_then(|s| serde_json::from_str(s).ok());
        let error_code = self
            .error_category
            .as_deref()
            .and_then(|c| c.parse::<i64>().ok());
        let updated = self
            .finished_at
            .or(self.started_at)
            .unwrap_or(self.created_at);
        RenderJobDto {
            id: self.job_id,
            preset_id: self.preset_id,
            params,
            status: status_to_wire(&self.status).to_string(),
            output_path: self.output_path,
            render_report,
            error_code,
            error_message: self.error_detail,
            created_at: epoch_to_iso(self.created_at),
            updated_at: epoch_to_iso(updated),
        }
    }
}

fn now_secs() -> i64 {
    use std::time::{SystemTime, UNIX_EPOCH};
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_secs() as i64)
        .unwrap_or(0)
}

impl Store {
    #[must_use]
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }

    #[must_use]
    pub fn pool(&self) -> &SqlitePool {
        &self.pool
    }

    pub async fn create_job(
        &self,
        job_id: &JobId,
        preset_id: Option<&str>,
        params_json: &str,
        extension_version: &str,
    ) -> Result<()> {
        sqlx::query(
            "INSERT INTO ext_svi2_pro__render_jobs \
             (job_id, preset_id, params_json, status, extension_version, created_at) \
             VALUES (?, ?, ?, 'queued', ?, ?)",
        )
        .bind(job_id.as_str())
        .bind(preset_id)
        .bind(params_json)
        .bind(extension_version)
        .bind(now_secs())
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn mark_running(&self, job_id: &JobId) -> Result<()> {
        sqlx::query(
            "UPDATE ext_svi2_pro__render_jobs SET status = 'running', started_at = ? \
             WHERE job_id = ? AND status = 'queued'",
        )
        .bind(now_secs())
        .bind(job_id.as_str())
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn mark_completed(
        &self,
        job_id: &JobId,
        output_path: Option<&str>,
        render_report_json: Option<&str>,
    ) -> Result<()> {
        sqlx::query(
            "UPDATE ext_svi2_pro__render_jobs \
             SET status = 'completed', output_path = ?, render_report_json = ?, finished_at = ? \
             WHERE job_id = ?",
        )
        .bind(output_path)
        .bind(render_report_json)
        .bind(now_secs())
        .bind(job_id.as_str())
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn mark_failed(
        &self,
        job_id: &JobId,
        error_category: Option<&str>,
        error_detail: &str,
    ) -> Result<()> {
        sqlx::query(
            "UPDATE ext_svi2_pro__render_jobs \
             SET status = 'failed', error_category = ?, error_detail = ?, finished_at = ? \
             WHERE job_id = ?",
        )
        .bind(error_category)
        .bind(error_detail)
        .bind(now_secs())
        .bind(job_id.as_str())
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn mark_cancelled(&self, job_id: &JobId) -> Result<()> {
        sqlx::query(
            "UPDATE ext_svi2_pro__render_jobs SET status = 'cancelled', finished_at = ? \
             WHERE job_id = ? AND status IN ('queued', 'running')",
        )
        .bind(now_secs())
        .bind(job_id.as_str())
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn get_job(&self, job_id: &str) -> Result<RenderJobRow> {
        self.get_job_opt(job_id)
            .await?
            .ok_or_else(|| Svi2Error::not_found(format!("render job {job_id} not found")))
    }

    pub async fn get_job_opt(&self, job_id: &str) -> Result<Option<RenderJobRow>> {
        let row = sqlx::query(
            "SELECT job_id, preset_id, params_json, status, output_path, render_report_json, \
             error_category, error_detail, created_at, started_at, finished_at \
             FROM ext_svi2_pro__render_jobs WHERE job_id = ?",
        )
        .bind(job_id)
        .fetch_optional(&self.pool)
        .await?;
        Ok(row.map(map_job_row))
    }

    pub async fn list_jobs(&self, limit: i64) -> Result<Vec<RenderJobRow>> {
        let rows = sqlx::query(
            "SELECT job_id, preset_id, params_json, status, output_path, render_report_json, \
             error_category, error_detail, created_at, started_at, finished_at \
             FROM ext_svi2_pro__render_jobs ORDER BY created_at DESC LIMIT ?",
        )
        .bind(limit.clamp(1, 500))
        .fetch_all(&self.pool)
        .await?;
        Ok(rows.into_iter().map(map_job_row).collect())
    }

    pub async fn get_settings(&self) -> Result<JsonValue> {
        let row = sqlx::query("SELECT settings_json FROM ext_svi2_pro__settings WHERE id = 1")
            .fetch_optional(&self.pool)
            .await?;
        let raw = match row {
            Some(r) => r.get::<String, _>("settings_json"),
            None => DEFAULT_SETTINGS_JSON.to_string(),
        };
        Ok(serde_json::from_str(&raw).unwrap_or(JsonValue::Null))
    }

    pub async fn put_settings(&self, settings: &JsonValue) -> Result<JsonValue> {
        let raw = serde_json::to_string(settings)?;
        sqlx::query(
            "INSERT INTO ext_svi2_pro__settings (id, settings_json, updated_at) \
             VALUES (1, ?, ?) \
             ON CONFLICT(id) DO UPDATE SET settings_json = excluded.settings_json, \
             updated_at = excluded.updated_at",
        )
        .bind(&raw)
        .bind(now_secs())
        .execute(&self.pool)
        .await?;
        self.get_settings().await
    }
}

fn map_job_row(row: sqlx::sqlite::SqliteRow) -> RenderJobRow {
    RenderJobRow {
        job_id: row.get("job_id"),
        preset_id: row.get("preset_id"),
        params_json: row.get("params_json"),
        status: row.get("status"),
        output_path: row.get("output_path"),
        render_report_json: row.get("render_report_json"),
        error_category: row.get("error_category"),
        error_detail: row.get("error_detail"),
        created_at: row.get("created_at"),
        started_at: row.get("started_at"),
        finished_at: row.get("finished_at"),
    }
}
