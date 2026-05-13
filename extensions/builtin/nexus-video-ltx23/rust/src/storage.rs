use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::SqlitePool;

use crate::errors::{ExtensionError, Result};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RenderRunRow {
    pub id: String,
    pub project_id: String,
    pub status: String,
    pub runtime_profile: Option<String>,
    pub requested_duration_seconds: f64,
    pub planned_duration_seconds: Option<f64>,
    pub width: i64,
    pub height: i64,
    pub base_fps: i64,
    pub output_fps: i64,
    pub segment_count: i64,
    pub seed: Option<i64>,
    pub quality_preset: String,
    pub render_mode: String,
    pub request_json: String,
    pub plan_json: Option<String>,
    pub error_code: Option<String>,
    pub error_message: Option<String>,
    pub final_artifact_id: Option<String>,
    pub created_at: DateTime<Utc>,
    pub started_at: Option<DateTime<Utc>>,
    pub completed_at: Option<DateTime<Utc>>,
    pub cancelled_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RenderSegmentRow {
    pub id: String,
    pub run_id: String,
    pub segment_index: i64,
    pub status: String,
    pub start_time_seconds: f64,
    pub duration_seconds: f64,
    pub overlap_seconds: f64,
    pub frame_count: i64,
    pub seed: Option<i64>,
    pub prompt: Option<String>,
    pub negative_prompt: Option<String>,
    pub preview_artifact_id: Option<String>,
    pub raw_video_artifact_id: Option<String>,
    pub error_code: Option<String>,
    pub error_message: Option<String>,
    pub started_at: Option<DateTime<Utc>>,
    pub completed_at: Option<DateTime<Utc>>,
}

#[derive(Clone)]
pub struct Repos {
    pool: SqlitePool,
}

impl Repos {
    #[must_use]
    pub const fn from_pool(pool: SqlitePool) -> Self {
        Self { pool }
    }

    #[must_use]
    pub const fn pool(&self) -> &SqlitePool {
        &self.pool
    }

    pub async fn insert_run(&self, run: &RenderRunRow) -> Result<()> {
        sqlx::query(
            "INSERT INTO ext_nexus_video_ltx23__runs (\
                id, project_id, status, runtime_profile, runtime_id, runtime_install_id, \
                runtime_lease_id, requested_duration_seconds, planned_duration_seconds, \
                width, height, base_fps, output_fps, segment_count, seed, quality_preset, \
                render_mode, request_json, plan_json, error_code, error_message, \
                final_artifact_id, created_at, started_at, completed_at, cancelled_at\
             ) VALUES (\
                ?, ?, ?, ?, NULL, NULL, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?\
             )",
        )
        .bind(&run.id)
        .bind(&run.project_id)
        .bind(&run.status)
        .bind(&run.runtime_profile)
        .bind(run.requested_duration_seconds)
        .bind(run.planned_duration_seconds)
        .bind(run.width)
        .bind(run.height)
        .bind(run.base_fps)
        .bind(run.output_fps)
        .bind(run.segment_count)
        .bind(run.seed)
        .bind(&run.quality_preset)
        .bind(&run.render_mode)
        .bind(&run.request_json)
        .bind(&run.plan_json)
        .bind(&run.error_code)
        .bind(&run.error_message)
        .bind(&run.final_artifact_id)
        .bind(run.created_at.to_rfc3339())
        .bind(run.started_at.map(|t| t.to_rfc3339()))
        .bind(run.completed_at.map(|t| t.to_rfc3339()))
        .bind(run.cancelled_at.map(|t| t.to_rfc3339()))
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn get_run(&self, run_id: &str) -> Result<RenderRunRow> {
        let row = sqlx::query_as::<_, RenderRunRowRaw>(
            "SELECT id, project_id, status, runtime_profile, requested_duration_seconds, \
                 planned_duration_seconds, width, height, base_fps, output_fps, segment_count, \
                 seed, quality_preset, render_mode, request_json, plan_json, error_code, \
                 error_message, final_artifact_id, created_at, started_at, completed_at, \
                 cancelled_at \
             FROM ext_nexus_video_ltx23__runs WHERE id = ?",
        )
        .bind(run_id)
        .fetch_optional(&self.pool)
        .await?
        .ok_or_else(|| ExtensionError::NotFound(format!("run {run_id}")))?;
        row.try_into()
    }

    pub async fn update_run_status(
        &self,
        run_id: &str,
        status: &str,
        final_artifact_id: Option<&str>,
        error_code: Option<&str>,
        error_message: Option<&str>,
    ) -> Result<()> {
        let now = Utc::now().to_rfc3339();
        let started = matches!(status, "rendering" | "joining" | "encoding").then(|| now.clone());
        let completed = matches!(status, "completed" | "failed").then(|| now.clone());
        let cancelled = (status == "cancelled").then(|| now.clone());

        sqlx::query(
            "UPDATE ext_nexus_video_ltx23__runs \
             SET status = ?, \
                 final_artifact_id = COALESCE(?, final_artifact_id), \
                 error_code = COALESCE(?, error_code), \
                 error_message = COALESCE(?, error_message), \
                 started_at = COALESCE(started_at, ?), \
                 completed_at = COALESCE(completed_at, ?), \
                 cancelled_at = COALESCE(cancelled_at, ?) \
             WHERE id = ?",
        )
        .bind(status)
        .bind(final_artifact_id)
        .bind(error_code)
        .bind(error_message)
        .bind(started)
        .bind(completed)
        .bind(cancelled)
        .bind(run_id)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    /// Race-safe terminal-status guard: refuses to overwrite a row that
    /// already terminated. Used by `cancel_render` so a cancel that
    /// lands between `get_run` + this write can't clobber a `completed`
    /// row. Returns the number of rows actually updated; 0 means the
    /// row was already terminal, which is a noop, not an error.
    pub async fn update_run_status_if_not_terminal(
        &self,
        run_id: &str,
        new_status: &str,
    ) -> Result<u64> {
        let now = Utc::now().to_rfc3339();
        let cancelled = (new_status == "cancelled").then(|| now.clone());
        let result = sqlx::query(
            "UPDATE ext_nexus_video_ltx23__runs \
             SET status = ?, \
                 cancelled_at = COALESCE(cancelled_at, ?) \
             WHERE id = ? AND status NOT IN ('completed', 'failed', 'cancelled')",
        )
        .bind(new_status)
        .bind(cancelled)
        .bind(run_id)
        .execute(&self.pool)
        .await?;
        Ok(result.rows_affected())
    }

    /// Atomic multi-row insert via a single sqlx transaction. Avoids the
    /// N+1 round-trip pattern of the old loop-based insert + makes
    /// partial-failure invisible to readers (either all segments land
    /// or none do).
    pub async fn insert_segments(&self, segments: &[RenderSegmentRow]) -> Result<()> {
        if segments.is_empty() {
            return Ok(());
        }
        let mut tx = self.pool.begin().await?;
        for seg in segments {
            sqlx::query(
                "INSERT INTO ext_nexus_video_ltx23__segments (\
                    id, run_id, segment_index, status, start_time_seconds, duration_seconds, \
                    overlap_seconds, frame_count, seed, prompt, negative_prompt, \
                    input_start_frame_artifact_id, raw_video_artifact_id, last_frame_artifact_id, \
                    preview_artifact_id, log_artifact_id, error_code, error_message, \
                    started_at, completed_at\
                 ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, ?, NULL, ?, NULL, ?, ?, ?, ?)",
            )
            .bind(&seg.id)
            .bind(&seg.run_id)
            .bind(seg.segment_index)
            .bind(&seg.status)
            .bind(seg.start_time_seconds)
            .bind(seg.duration_seconds)
            .bind(seg.overlap_seconds)
            .bind(seg.frame_count)
            .bind(seg.seed)
            .bind(&seg.prompt)
            .bind(&seg.negative_prompt)
            .bind(&seg.raw_video_artifact_id)
            .bind(&seg.preview_artifact_id)
            .bind(&seg.error_code)
            .bind(&seg.error_message)
            .bind(seg.started_at.map(|t| t.to_rfc3339()))
            .bind(seg.completed_at.map(|t| t.to_rfc3339()))
            .execute(&mut *tx)
            .await?;
        }
        tx.commit().await?;
        Ok(())
    }

    pub async fn list_segments(&self, run_id: &str) -> Result<Vec<RenderSegmentRow>> {
        let rows = sqlx::query_as::<_, RenderSegmentRowRaw>(
            "SELECT id, run_id, segment_index, status, start_time_seconds, duration_seconds, \
                 overlap_seconds, frame_count, seed, prompt, negative_prompt, \
                 raw_video_artifact_id, preview_artifact_id, error_code, error_message, \
                 started_at, completed_at \
             FROM ext_nexus_video_ltx23__segments \
             WHERE run_id = ? \
             ORDER BY segment_index ASC",
        )
        .bind(run_id)
        .fetch_all(&self.pool)
        .await?;
        rows.into_iter().map(TryInto::try_into).collect()
    }

    pub async fn update_segment_status(
        &self,
        run_id: &str,
        index: i64,
        status: &str,
        preview_artifact_id: Option<&str>,
    ) -> Result<()> {
        let now = Utc::now().to_rfc3339();
        let started = (status == "rendering").then(|| now.clone());
        let completed = matches!(status, "completed" | "failed").then(|| now.clone());

        sqlx::query(
            "UPDATE ext_nexus_video_ltx23__segments \
             SET status = ?, \
                 preview_artifact_id = COALESCE(?, preview_artifact_id), \
                 started_at = COALESCE(started_at, ?), \
                 completed_at = COALESCE(completed_at, ?) \
             WHERE run_id = ? AND segment_index = ?",
        )
        .bind(status)
        .bind(preview_artifact_id)
        .bind(started)
        .bind(completed)
        .bind(run_id)
        .bind(index)
        .execute(&self.pool)
        .await?;
        Ok(())
    }
}

#[derive(sqlx::FromRow)]
struct RenderRunRowRaw {
    id: String,
    project_id: String,
    status: String,
    runtime_profile: Option<String>,
    requested_duration_seconds: f64,
    planned_duration_seconds: Option<f64>,
    width: i64,
    height: i64,
    base_fps: i64,
    output_fps: i64,
    segment_count: i64,
    seed: Option<i64>,
    quality_preset: String,
    render_mode: String,
    request_json: String,
    plan_json: Option<String>,
    error_code: Option<String>,
    error_message: Option<String>,
    final_artifact_id: Option<String>,
    created_at: String,
    started_at: Option<String>,
    completed_at: Option<String>,
    cancelled_at: Option<String>,
}

fn parse_dt(raw: &str) -> Result<DateTime<Utc>> {
    DateTime::parse_from_rfc3339(raw)
        .map(|t| t.with_timezone(&Utc))
        .map_err(|e| ExtensionError::Storage(format!("bad timestamp '{raw}': {e}")))
}

fn parse_dt_opt(raw: Option<&str>) -> Result<Option<DateTime<Utc>>> {
    raw.map(parse_dt).transpose()
}

impl TryFrom<RenderRunRowRaw> for RenderRunRow {
    type Error = ExtensionError;

    fn try_from(r: RenderRunRowRaw) -> Result<Self> {
        Ok(Self {
            id: r.id,
            project_id: r.project_id,
            status: r.status,
            runtime_profile: r.runtime_profile,
            requested_duration_seconds: r.requested_duration_seconds,
            planned_duration_seconds: r.planned_duration_seconds,
            width: r.width,
            height: r.height,
            base_fps: r.base_fps,
            output_fps: r.output_fps,
            segment_count: r.segment_count,
            seed: r.seed,
            quality_preset: r.quality_preset,
            render_mode: r.render_mode,
            request_json: r.request_json,
            plan_json: r.plan_json,
            error_code: r.error_code,
            error_message: r.error_message,
            final_artifact_id: r.final_artifact_id,
            created_at: parse_dt(&r.created_at)?,
            started_at: parse_dt_opt(r.started_at.as_deref())?,
            completed_at: parse_dt_opt(r.completed_at.as_deref())?,
            cancelled_at: parse_dt_opt(r.cancelled_at.as_deref())?,
        })
    }
}

#[derive(sqlx::FromRow)]
struct RenderSegmentRowRaw {
    id: String,
    run_id: String,
    segment_index: i64,
    status: String,
    start_time_seconds: f64,
    duration_seconds: f64,
    overlap_seconds: f64,
    frame_count: i64,
    seed: Option<i64>,
    prompt: Option<String>,
    negative_prompt: Option<String>,
    raw_video_artifact_id: Option<String>,
    preview_artifact_id: Option<String>,
    error_code: Option<String>,
    error_message: Option<String>,
    started_at: Option<String>,
    completed_at: Option<String>,
}

impl TryFrom<RenderSegmentRowRaw> for RenderSegmentRow {
    type Error = ExtensionError;

    fn try_from(r: RenderSegmentRowRaw) -> Result<Self> {
        Ok(Self {
            id: r.id,
            run_id: r.run_id,
            segment_index: r.segment_index,
            status: r.status,
            start_time_seconds: r.start_time_seconds,
            duration_seconds: r.duration_seconds,
            overlap_seconds: r.overlap_seconds,
            frame_count: r.frame_count,
            seed: r.seed,
            prompt: r.prompt,
            negative_prompt: r.negative_prompt,
            preview_artifact_id: r.preview_artifact_id,
            raw_video_artifact_id: r.raw_video_artifact_id,
            error_code: r.error_code,
            error_message: r.error_message,
            started_at: parse_dt_opt(r.started_at.as_deref())?,
            completed_at: parse_dt_opt(r.completed_at.as_deref())?,
        })
    }
}
