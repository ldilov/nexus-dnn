//! Host-shell "Runs & Traces" surface for the deployment detail tab.
//!
//! The host fetches `/api/v1/extensions/{ext-id}/deployments/{dep}/runs`
//! through the generic extension mount — this handler maps faceavatar's
//! generation-job history into the shell's generic `RunRow` shape. Generation
//! jobs are not deployment-scoped in v1, so the `{deployment_id}` segment is
//! accepted and ignored (mirrors svi2-pro).

use axum::extract::{Path, Query, State};
use axum::response::{IntoResponse, Json, Response};
use axum::routing::get;
use axum::Router;
use serde::{Deserialize, Serialize};
use serde_json::Value as JsonValue;

use crate::router::AppState;
use crate::storage::GenerationJobRow;

const DEFAULT_LIMIT: i64 = 50;

#[must_use]
pub fn router() -> Router<AppState> {
    Router::new().route("/deployments/{deployment_id}/runs", get(list_runs))
}

/// Generic run row consumed by `apps/web/.../runs/runs.view.tsx`. Timestamps are
/// epoch MILLISECONDS (the view calls `new Date(ms)`); `durationMs` is the
/// running-to-terminal span. `status` uses the shell's vocabulary
/// (`succeeded`/`running`/`queued`/`failed`/`cancelled`).
#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct RunRow {
    id: String,
    label: String,
    status: String,
    started_at: Option<i64>,
    finished_at: Option<i64>,
    duration_ms: Option<i64>,
    detail: Option<String>,
}

#[derive(Debug, Serialize)]
struct RunsResponse {
    runs: Vec<RunRow>,
    total: usize,
}

#[derive(Debug, Deserialize)]
struct ListQuery {
    #[serde(default = "default_limit")]
    limit: i64,
}

const fn default_limit() -> i64 {
    DEFAULT_LIMIT
}

async fn list_runs(
    State(state): State<AppState>,
    Path(_deployment_id): Path<String>,
    Query(q): Query<ListQuery>,
) -> Response {
    let rows = match state.store.list_jobs(q.limit).await {
        Ok(rows) => rows,
        Err(err) => return err.into_response(),
    };
    let runs: Vec<RunRow> = rows.iter().map(map_run).collect();
    let total = runs.len();
    Json(RunsResponse { runs, total }).into_response()
}

/// Map a stored generation job to the shell `RunRow`. Pure — no I/O — so the
/// status/label/duration/detail derivation is unit-testable in isolation.
fn map_run(row: &GenerationJobRow) -> RunRow {
    RunRow {
        id: row.job_id.clone(),
        label: run_label(&row.operation).to_string(),
        status: run_status(&row.status).to_string(),
        started_at: row.started_at.or(Some(row.created_at)).map(|s| s * 1000),
        finished_at: row.finished_at.map(|s| s * 1000),
        duration_ms: duration_ms(row.started_at, row.finished_at),
        detail: run_detail(row),
    }
}

/// Human label per operation. Unknown ops fall back to a generic label.
fn run_label(operation: &str) -> &str {
    match operation {
        "graft" => "Identity graft",
        "generate" => "Identity head",
        _ => "Face avatar",
    }
}

/// faceavatar persists `completed`; the shell vocabulary calls it `succeeded`.
/// Every other state (`queued`/`running`/`failed`/`cancelled`) passes through.
fn run_status(status: &str) -> &str {
    match status {
        "completed" => "succeeded",
        other => other,
    }
}

fn duration_ms(started_at: Option<i64>, finished_at: Option<i64>) -> Option<i64> {
    match (started_at, finished_at) {
        (Some(start), Some(end)) if end >= start => Some((end - start) * 1000),
        _ => None,
    }
}

/// Detail column: the failure message for failed jobs, otherwise a one-line mesh
/// summary parsed from the completion metadata (vertex/face counts when present).
fn run_detail(row: &GenerationJobRow) -> Option<String> {
    if row.status == "failed" {
        return Some(error_message(row.error_detail.as_deref()));
    }
    row.metadata_json.as_deref().and_then(mesh_summary)
}

/// The dispatcher persists worker failures as `"<code>|<message>"`; surface the
/// human message only. A plain string passes through unchanged.
fn error_message(detail: Option<&str>) -> String {
    let raw = detail.unwrap_or_default();
    raw.split_once('|')
        .filter(|(code, _)| code.trim().parse::<i64>().is_ok())
        .map_or_else(|| raw.to_string(), |(_, msg)| msg.to_string())
}

/// Build a `"12,000 verts · 24,000 faces"` style summary from completion
/// metadata. Returns `None` when the metadata carries no recognised counts.
fn mesh_summary(metadata_json: &str) -> Option<String> {
    let metadata: JsonValue = serde_json::from_str(metadata_json).ok()?;
    let verts = count_field(&metadata, &["vertices", "num_vertices", "vertex_count"]);
    let faces = count_field(&metadata, &["faces", "num_faces", "triangles", "face_count"]);
    let mut parts: Vec<String> = Vec::new();
    if let Some(v) = verts {
        parts.push(format!("{} verts", thousands(v)));
    }
    if let Some(f) = faces {
        parts.push(format!("{} faces", thousands(f)));
    }
    if parts.is_empty() {
        None
    } else {
        Some(parts.join(" · "))
    }
}

fn count_field(metadata: &JsonValue, keys: &[&str]) -> Option<i64> {
    keys.iter()
        .find_map(|k| metadata.get(*k).and_then(JsonValue::as_i64))
}

/// Group an integer with thousands separators (`12000 -> "12,000"`).
fn thousands(n: i64) -> String {
    let neg = n < 0;
    let digits = n.unsigned_abs().to_string();
    let mut out = String::with_capacity(digits.len() + digits.len() / 3 + 1);
    let bytes = digits.as_bytes();
    for (idx, byte) in bytes.iter().enumerate() {
        if idx > 0 && (bytes.len() - idx) % 3 == 0 {
            out.push(',');
        }
        out.push(*byte as char);
    }
    if neg {
        format!("-{out}")
    } else {
        out
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn row(status: &str) -> GenerationJobRow {
        GenerationJobRow {
            job_id: "job-1".into(),
            operation: "generate".into(),
            input_image_ref: "uploads/a.png".into(),
            params_json: "{}".into(),
            status: status.into(),
            output_glb_ref: None,
            metadata_json: None,
            error_detail: None,
            created_at: 1_000,
            started_at: None,
            finished_at: None,
        }
    }

    #[test]
    fn completed_status_maps_to_succeeded() {
        assert_eq!(run_status("completed"), "succeeded");
        assert_eq!(run_status("running"), "running");
        assert_eq!(run_status("failed"), "failed");
        assert_eq!(run_status("queued"), "queued");
        assert_eq!(run_status("cancelled"), "cancelled");
    }

    #[test]
    fn duration_is_running_to_terminal_span_in_ms() {
        assert_eq!(duration_ms(Some(100), Some(130)), Some(30_000));
        assert_eq!(duration_ms(Some(100), None), None);
        assert_eq!(duration_ms(None, Some(130)), None);
        assert_eq!(duration_ms(Some(200), Some(100)), None);
    }

    #[test]
    fn started_at_falls_back_to_created_at() {
        let mut r = row("running");
        r.created_at = 7;
        let mapped = map_run(&r);
        assert_eq!(mapped.started_at, Some(7_000));
        r.started_at = Some(9);
        let mapped = map_run(&r);
        assert_eq!(mapped.started_at, Some(9_000));
    }

    #[test]
    fn failed_detail_is_human_message_without_code() {
        let mut r = row("failed");
        r.error_detail = Some("-32101|MODEL_MISSING: weights gone".into());
        assert_eq!(
            run_detail(&r).as_deref(),
            Some("MODEL_MISSING: weights gone")
        );
        r.error_detail = Some("plain failure".into());
        assert_eq!(run_detail(&r).as_deref(), Some("plain failure"));
    }

    #[test]
    fn completed_detail_is_mesh_summary() {
        let mut r = row("completed");
        r.metadata_json = Some(r#"{"vertices":12000,"faces":24000}"#.into());
        assert_eq!(run_detail(&r).as_deref(), Some("12,000 verts · 24,000 faces"));
    }

    #[test]
    fn completed_detail_handles_alt_keys_and_partial() {
        let mut r = row("completed");
        r.metadata_json = Some(r#"{"num_vertices":500}"#.into());
        assert_eq!(run_detail(&r).as_deref(), Some("500 verts"));
        r.metadata_json = Some(r#"{"sha256":"abc"}"#.into());
        assert_eq!(run_detail(&r), None);
    }

    #[test]
    fn label_reflects_operation() {
        let mut r = row("queued");
        r.operation = "generate".into();
        assert_eq!(map_run(&r).label, "Identity head");
        r.operation = "graft".into();
        assert_eq!(map_run(&r).label, "Identity graft");
    }

    #[test]
    fn thousands_groups_digits() {
        assert_eq!(thousands(0), "0");
        assert_eq!(thousands(999), "999");
        assert_eq!(thousands(1_000), "1,000");
        assert_eq!(thousands(1_234_567), "1,234,567");
    }
}
