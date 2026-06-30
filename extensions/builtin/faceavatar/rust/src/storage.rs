use serde::Serialize;
use serde_json::Value as JsonValue;
use sqlx::{Row, SqlitePool};

use crate::domain::{FaceAvatarError, JobId, Result};

#[derive(Clone)]
pub struct Store {
    pool: SqlitePool,
}

#[derive(Debug, Clone)]
pub struct GenerationJobRow {
    pub job_id: String,
    pub operation: String,
    pub input_image_ref: String,
    pub params_json: String,
    pub status: String,
    pub output_glb_ref: Option<String>,
    pub metadata_json: Option<String>,
    pub error_detail: Option<String>,
    pub created_at: i64,
    pub started_at: Option<i64>,
    pub finished_at: Option<i64>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct GenerationJobDto {
    pub id: String,
    /// Stored in the `operation` column (`'generate'` | `'graft'`); the wire
    /// DTO exposes it as JSON key `kind` (frozen contract — web reads `job.kind`).
    #[serde(rename = "kind")]
    pub operation: String,
    pub input_image_ref: String,
    pub params: JsonValue,
    pub status: String,
    pub glb_ref: Option<String>,
    pub metadata: Option<JsonValue>,
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

const fn civil_from_days(z: i64) -> (i64, i64, i64) {
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

impl GenerationJobRow {
    #[must_use]
    pub fn into_dto(self) -> GenerationJobDto {
        let params = serde_json::from_str(&self.params_json).unwrap_or(JsonValue::Null);
        let metadata = self
            .metadata_json
            .as_deref()
            .and_then(|s| serde_json::from_str(s).ok());
        let updated = self
            .finished_at
            .or(self.started_at)
            .unwrap_or(self.created_at);
        let (error_code, error_message) = split_error(self.error_detail.as_deref());
        GenerationJobDto {
            id: self.job_id,
            operation: self.operation,
            input_image_ref: self.input_image_ref,
            params,
            status: status_to_wire(&self.status).to_string(),
            glb_ref: self.output_glb_ref,
            metadata,
            error_code,
            error_message,
            created_at: epoch_to_iso(self.created_at),
            updated_at: epoch_to_iso(updated),
        }
    }
}

/// The dispatcher persists worker failures as `"<code>|<message>"`. Split that
/// back into `(errorCode, errorMessage)`; plain strings carry no code.
fn split_error(detail: Option<&str>) -> (Option<i64>, Option<String>) {
    let Some(raw) = detail else {
        return (None, None);
    };
    if let Some((code, msg)) = raw.split_once('|') {
        if let Ok(code) = code.trim().parse::<i64>() {
            return (Some(code), Some(msg.to_string()));
        }
    }
    (None, Some(raw.to_string()))
}

fn now_secs() -> i64 {
    use std::time::{SystemTime, UNIX_EPOCH};
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_secs().cast_signed())
        .unwrap_or(0)
}

impl Store {
    #[must_use]
    pub const fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }

    #[must_use]
    pub const fn pool(&self) -> &SqlitePool {
        &self.pool
    }

    pub async fn create_job(
        &self,
        job_id: &JobId,
        operation: &str,
        input_image_ref: &str,
        params_json: &str,
    ) -> Result<()> {
        sqlx::query(
            "INSERT INTO ext_faceavatar__jobs \
             (job_id, operation, input_image_ref, params_json, status, created_at) \
             VALUES (?, ?, ?, ?, 'queued', ?)",
        )
        .bind(job_id.as_str())
        .bind(operation)
        .bind(input_image_ref)
        .bind(params_json)
        .bind(now_secs())
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn mark_running(&self, job_id: &JobId) -> Result<()> {
        sqlx::query(
            "UPDATE ext_faceavatar__jobs SET status = 'running', started_at = ? \
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
        output_glb_ref: Option<&str>,
        metadata_json: Option<&str>,
    ) -> Result<()> {
        sqlx::query(
            "UPDATE ext_faceavatar__jobs \
             SET status = 'completed', output_glb_ref = ?, metadata_json = ?, finished_at = ? \
             WHERE job_id = ?",
        )
        .bind(output_glb_ref)
        .bind(metadata_json)
        .bind(now_secs())
        .bind(job_id.as_str())
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn mark_failed(&self, job_id: &JobId, error_detail: &str) -> Result<()> {
        sqlx::query(
            "UPDATE ext_faceavatar__jobs \
             SET status = 'failed', error_detail = ?, finished_at = ? \
             WHERE job_id = ?",
        )
        .bind(error_detail)
        .bind(now_secs())
        .bind(job_id.as_str())
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn mark_cancelled(&self, job_id: &JobId) -> Result<()> {
        sqlx::query(
            "UPDATE ext_faceavatar__jobs SET status = 'cancelled', finished_at = ? \
             WHERE job_id = ? AND status IN ('queued', 'running')",
        )
        .bind(now_secs())
        .bind(job_id.as_str())
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn get_job(&self, job_id: &str) -> Result<GenerationJobRow> {
        self.get_job_opt(job_id)
            .await?
            .ok_or_else(|| FaceAvatarError::not_found(format!("generation job {job_id} not found")))
    }

    pub async fn get_job_opt(&self, job_id: &str) -> Result<Option<GenerationJobRow>> {
        let row = sqlx::query(
            "SELECT job_id, operation, input_image_ref, params_json, status, output_glb_ref, \
             metadata_json, error_detail, created_at, started_at, finished_at \
             FROM ext_faceavatar__jobs WHERE job_id = ?",
        )
        .bind(job_id)
        .fetch_optional(&self.pool)
        .await?;
        Ok(row.as_ref().map(map_job_row))
    }

    pub async fn list_jobs(&self, limit: i64) -> Result<Vec<GenerationJobRow>> {
        let rows = sqlx::query(
            "SELECT job_id, operation, input_image_ref, params_json, status, output_glb_ref, \
             metadata_json, error_detail, created_at, started_at, finished_at \
             FROM ext_faceavatar__jobs ORDER BY created_at DESC LIMIT ?",
        )
        .bind(limit.clamp(1, 500))
        .fetch_all(&self.pool)
        .await?;
        Ok(rows.iter().map(map_job_row).collect())
    }

    /// Detach a job's produced GLB from the artifacts listing by nulling its
    /// `output_glb_ref`. Returns `true` when a ref was cleared. The history row
    /// (and its status/timestamps) is kept so the run still shows in Runs.
    pub async fn clear_output(&self, job_id: &str) -> Result<bool> {
        let result = sqlx::query(
            "UPDATE ext_faceavatar__jobs SET output_glb_ref = NULL \
             WHERE job_id = ? AND output_glb_ref IS NOT NULL",
        )
        .bind(job_id)
        .execute(&self.pool)
        .await?;
        Ok(result.rows_affected() > 0)
    }

    /// Remove a generation job row from history. Returns `true` when a row was
    /// deleted. The produced GLB (if any) is left on disk — this only drops the
    /// history entry.
    pub async fn delete_job(&self, job_id: &str) -> Result<bool> {
        let result = sqlx::query("DELETE FROM ext_faceavatar__jobs WHERE job_id = ?")
            .bind(job_id)
            .execute(&self.pool)
            .await?;
        Ok(result.rows_affected() > 0)
    }
}

fn map_job_row(row: &sqlx::sqlite::SqliteRow) -> GenerationJobRow {
    GenerationJobRow {
        job_id: row.get("job_id"),
        operation: row.get("operation"),
        input_image_ref: row.get("input_image_ref"),
        params_json: row.get("params_json"),
        status: row.get("status"),
        output_glb_ref: row.get("output_glb_ref"),
        metadata_json: row.get("metadata_json"),
        error_detail: row.get("error_detail"),
        created_at: row.get("created_at"),
        started_at: row.get("started_at"),
        finished_at: row.get("finished_at"),
    }
}
