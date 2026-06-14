//! Host-shell Artifacts + Runs surfaces for the deployment detail tabs.
//!
//! The host fetches `/api/v1/extensions/{ext-id}/deployments/{dep}/artifacts`
//! and `/runs` through the generic extension mount — these handlers serve
//! the svi2 render-job history in the shell's generic row shapes. Render
//! jobs are not deployment-scoped in v1, so the `{deployment_id}` segment is
//! accepted and ignored.

use std::path::{Path as FsPath, PathBuf};

use axum::body::Body;
use axum::extract::{Path, Query, State};
use axum::http::{header, StatusCode};
use axum::response::{IntoResponse, Json, Response};
use axum::routing::{delete, get};
use axum::Router;
use serde::{Deserialize, Serialize};
use serde_json::Value as JsonValue;
use tokio_util::io::ReaderStream;

use crate::domain::Svi2Error;
use crate::router::AppState;
use crate::storage::RenderJobRow;

const LIST_LIMIT: i64 = 500;

#[must_use]
pub fn router() -> Router<AppState> {
    Router::new()
        .route(
            "/deployments/{deployment_id}/artifacts",
            get(list_artifacts).delete(delete_artifacts),
        )
        .route(
            "/deployments/{deployment_id}/artifacts.zip",
            get(download_zip),
        )
        .route(
            "/deployments/{deployment_id}/artifacts/{job_id}/download",
            get(download_artifact),
        )
        .route(
            "/deployments/{deployment_id}/artifacts/{job_id}",
            delete(delete_artifact),
        )
        .route("/deployments/{deployment_id}/runs", get(list_runs))
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct ArtifactRow {
    utterance_id: String,
    run_id: String,
    global_index: u64,
    character_display: String,
    text: String,
    output_format: String,
    duration_ms: Option<i64>,
    finished_at: Option<i64>,
    filename: String,
    edited: bool,
}

#[derive(Debug, Serialize)]
struct ArtifactsResponse {
    artifacts: Vec<ArtifactRow>,
    total: usize,
}

#[derive(Debug, Deserialize)]
struct IdsQuery {
    #[serde(rename = "utteranceIds")]
    utterance_ids: Option<String>,
}

fn parse_ids(raw: &Option<String>) -> Option<Vec<String>> {
    let raw = raw.as_deref()?.trim();
    if raw.is_empty() {
        return None;
    }
    let valid = |id: &str| {
        !id.is_empty()
            && id
                .chars()
                .all(|c| c.is_ascii_alphanumeric() || matches!(c, '-' | '_'))
    };
    Some(
        raw.split(',')
            .map(str::trim)
            .filter(|id| valid(id))
            .map(str::to_owned)
            .collect(),
    )
}

fn first_prompt(params_json: &str) -> String {
    serde_json::from_str::<JsonValue>(params_json)
        .ok()
        .and_then(|p| {
            p.get("prompts")
                .and_then(JsonValue::as_array)
                .and_then(|a| a.first())
                .and_then(JsonValue::as_str)
                .map(str::to_owned)
        })
        .unwrap_or_default()
}

fn report_duration_ms(report_json: Option<&str>) -> Option<i64> {
    let report: JsonValue = serde_json::from_str(report_json?).ok()?;
    let frames = report.get("frames")?.as_f64()?;
    let fps = report.get("fps")?.as_f64().filter(|f| *f > 0.0)?;
    let interp = report
        .get("interpolated_fps")
        .and_then(JsonValue::as_f64)
        .unwrap_or(0.0);
    let effective_fps = if interp > fps { interp } else { fps };
    let effective_frames = if interp > fps {
        frames * (interp / fps)
    } else {
        frames
    };
    Some(((effective_frames / effective_fps) * 1000.0) as i64)
}

fn artifact_file(row: &RenderJobRow) -> Option<PathBuf> {
    let path = PathBuf::from(row.output_path.as_deref()?);
    path.is_file().then_some(path)
}

async fn completed_with_output(state: &AppState) -> Result<Vec<RenderJobRow>, Svi2Error> {
    let rows = state.store.list_jobs(LIST_LIMIT).await?;
    Ok(rows
        .into_iter()
        .filter(|r| r.status == "completed" && artifact_file(r).is_some())
        .collect())
}

async fn list_artifacts(
    State(state): State<AppState>,
    Path(_deployment_id): Path<String>,
) -> Response {
    let rows = match completed_with_output(&state).await {
        Ok(rows) => rows,
        Err(err) => return err.into_response(),
    };
    let artifacts: Vec<ArtifactRow> = rows
        .iter()
        .enumerate()
        .map(|(idx, row)| {
            let path = artifact_file(row).unwrap_or_default();
            ArtifactRow {
                utterance_id: row.job_id.clone(),
                run_id: row.job_id.clone(),
                global_index: idx as u64,
                character_display: row.preset_id.clone().unwrap_or_else(|| "custom".into()),
                text: first_prompt(&row.params_json),
                output_format: path
                    .extension()
                    .and_then(|e| e.to_str())
                    .unwrap_or("mp4")
                    .to_owned(),
                duration_ms: report_duration_ms(row.render_report_json.as_deref()),
                finished_at: row.finished_at.map(|s| s * 1000),
                filename: path
                    .file_name()
                    .map(|n| n.to_string_lossy().into_owned())
                    .unwrap_or_default(),
                edited: false,
            }
        })
        .collect();
    let total = artifacts.len();
    Json(ArtifactsResponse { artifacts, total }).into_response()
}

async fn download_artifact(
    State(state): State<AppState>,
    Path((_deployment_id, job_id)): Path<(String, String)>,
) -> Response {
    let row = match state.store.get_job(&job_id).await {
        Ok(row) => row,
        Err(err) => return err.into_response(),
    };
    let Some(path) = artifact_file(&row) else {
        return Svi2Error::not_found(format!("job {job_id} has no artifact")).into_response();
    };
    let file = match tokio::fs::File::open(&path).await {
        Ok(file) => file,
        Err(_) => {
            return Svi2Error::not_found(format!("artifact file missing for {job_id}"))
                .into_response()
        }
    };
    let filename = path
        .file_name()
        .map(|n| n.to_string_lossy().into_owned())
        .unwrap_or_else(|| format!("{job_id}.mp4"));
    (
        StatusCode::OK,
        [
            (header::CONTENT_TYPE, content_type_for(&path).to_owned()),
            (
                header::CONTENT_DISPOSITION,
                format!("attachment; filename=\"{filename}\""),
            ),
        ],
        Body::from_stream(ReaderStream::new(file)),
    )
        .into_response()
}

fn content_type_for(path: &FsPath) -> &'static str {
    match path.extension().and_then(|e| e.to_str()) {
        Some("mp4") => "video/mp4",
        Some("webm") => "video/webm",
        _ => "application/octet-stream",
    }
}

#[derive(Debug, Serialize)]
struct DeleteResponse {
    deleted: u64,
}

async fn delete_artifact(
    State(state): State<AppState>,
    Path((_deployment_id, job_id)): Path<(String, String)>,
) -> Response {
    match remove_artifact(&state, &job_id).await {
        Ok(true) => StatusCode::NO_CONTENT.into_response(),
        Ok(false) => Svi2Error::not_found(format!("job {job_id} has no artifact")).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn delete_artifacts(
    State(state): State<AppState>,
    Path(_deployment_id): Path<String>,
    Query(q): Query<IdsQuery>,
) -> Response {
    let rows = match completed_with_output(&state).await {
        Ok(rows) => rows,
        Err(err) => return err.into_response(),
    };
    let filter = parse_ids(&q.utterance_ids);
    let mut deleted = 0u64;
    for row in rows {
        if let Some(ids) = &filter {
            if !ids.iter().any(|id| id == &row.job_id) {
                continue;
            }
        }
        match remove_artifact(&state, &row.job_id).await {
            Ok(true) => deleted += 1,
            Ok(false) => {}
            Err(err) => return err.into_response(),
        }
    }
    Json(DeleteResponse { deleted }).into_response()
}

async fn remove_artifact(state: &AppState, job_id: &str) -> Result<bool, Svi2Error> {
    let row = state.store.get_job(job_id).await?;
    if let Some(path) = artifact_file(&row) {
        let _ = tokio::fs::remove_file(&path).await;
    }
    state.store.clear_output(job_id).await
}

async fn download_zip(
    State(state): State<AppState>,
    Path(_deployment_id): Path<String>,
    Query(q): Query<IdsQuery>,
) -> Response {
    let rows = match completed_with_output(&state).await {
        Ok(rows) => rows,
        Err(err) => return err.into_response(),
    };
    let filter = parse_ids(&q.utterance_ids);
    let mut entries: Vec<(String, Vec<u8>)> = Vec::new();
    for row in rows {
        if let Some(ids) = &filter {
            if !ids.iter().any(|id| id == &row.job_id) {
                continue;
            }
        }
        let Some(path) = artifact_file(&row) else {
            continue;
        };
        let Ok(bytes) = tokio::fs::read(&path).await else {
            continue;
        };
        let name = path
            .file_name()
            .map(|n| n.to_string_lossy().into_owned())
            .unwrap_or_else(|| format!("{}.mp4", row.job_id));
        entries.push((format!("{}_{}", row.job_id, name), bytes));
    }
    if entries.is_empty() {
        return Svi2Error::not_found("no artifacts to download").into_response();
    }
    let zip = build_stored_zip(&entries);
    (
        StatusCode::OK,
        [
            (header::CONTENT_TYPE, "application/zip".to_owned()),
            (
                header::CONTENT_DISPOSITION,
                "attachment; filename=\"svi2-renders.zip\"".to_owned(),
            ),
        ],
        Body::from(zip),
    )
        .into_response()
}

/// Minimal STORE-method ZIP writer (mp4 is already compressed, so deflate
/// would only burn CPU). Local headers + central directory per APPNOTE.
fn build_stored_zip(entries: &[(String, Vec<u8>)]) -> Vec<u8> {
    let mut out: Vec<u8> = Vec::new();
    let mut central: Vec<u8> = Vec::new();
    for (name, data) in entries {
        let name_bytes = name.as_bytes();
        let crc = crc32(data);
        let offset = out.len() as u32;
        out.extend_from_slice(&[0x50, 0x4b, 0x03, 0x04]);
        out.extend_from_slice(&20u16.to_le_bytes());
        out.extend_from_slice(&0u16.to_le_bytes());
        out.extend_from_slice(&0u16.to_le_bytes());
        out.extend_from_slice(&0u16.to_le_bytes());
        out.extend_from_slice(&0u16.to_le_bytes());
        out.extend_from_slice(&crc.to_le_bytes());
        out.extend_from_slice(&(data.len() as u32).to_le_bytes());
        out.extend_from_slice(&(data.len() as u32).to_le_bytes());
        out.extend_from_slice(&(name_bytes.len() as u16).to_le_bytes());
        out.extend_from_slice(&0u16.to_le_bytes());
        out.extend_from_slice(name_bytes);
        out.extend_from_slice(data);

        central.extend_from_slice(&[0x50, 0x4b, 0x01, 0x02]);
        central.extend_from_slice(&20u16.to_le_bytes());
        central.extend_from_slice(&20u16.to_le_bytes());
        central.extend_from_slice(&0u16.to_le_bytes());
        central.extend_from_slice(&0u16.to_le_bytes());
        central.extend_from_slice(&0u16.to_le_bytes());
        central.extend_from_slice(&0u16.to_le_bytes());
        central.extend_from_slice(&crc.to_le_bytes());
        central.extend_from_slice(&(data.len() as u32).to_le_bytes());
        central.extend_from_slice(&(data.len() as u32).to_le_bytes());
        central.extend_from_slice(&(name_bytes.len() as u16).to_le_bytes());
        central.extend_from_slice(&0u16.to_le_bytes());
        central.extend_from_slice(&0u16.to_le_bytes());
        central.extend_from_slice(&0u16.to_le_bytes());
        central.extend_from_slice(&0u16.to_le_bytes());
        central.extend_from_slice(&0u32.to_le_bytes());
        central.extend_from_slice(&offset.to_le_bytes());
        central.extend_from_slice(name_bytes);
    }
    let central_offset = out.len() as u32;
    let central_size = central.len() as u32;
    out.extend_from_slice(&central);
    out.extend_from_slice(&[0x50, 0x4b, 0x05, 0x06]);
    out.extend_from_slice(&0u16.to_le_bytes());
    out.extend_from_slice(&0u16.to_le_bytes());
    out.extend_from_slice(&(entries.len() as u16).to_le_bytes());
    out.extend_from_slice(&(entries.len() as u16).to_le_bytes());
    out.extend_from_slice(&central_size.to_le_bytes());
    out.extend_from_slice(&central_offset.to_le_bytes());
    out.extend_from_slice(&0u16.to_le_bytes());
    out
}

fn crc32(data: &[u8]) -> u32 {
    let mut crc = !0u32;
    for &byte in data {
        crc ^= u32::from(byte);
        for _ in 0..8 {
            let mask = (crc & 1).wrapping_neg();
            crc = (crc >> 1) ^ (0xEDB8_8320 & mask);
        }
    }
    !crc
}

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

fn run_status(status: &str) -> &str {
    match status {
        "completed" => "succeeded",
        other => other,
    }
}

fn run_label(row: &RenderJobRow) -> String {
    let params: JsonValue = serde_json::from_str(&row.params_json).unwrap_or(JsonValue::Null);
    let width = params.get("width").and_then(JsonValue::as_i64).unwrap_or(0);
    let height = params
        .get("height")
        .and_then(JsonValue::as_i64)
        .unwrap_or(0);
    let clips = params
        .get("num_clips")
        .and_then(JsonValue::as_i64)
        .unwrap_or(1);
    let preset = row.preset_id.as_deref().unwrap_or("custom");
    format!(
        "{preset} · {width}×{height} · {clips} clip{}",
        if clips == 1 { "" } else { "s" }
    )
}

async fn list_runs(State(state): State<AppState>, Path(_deployment_id): Path<String>) -> Response {
    let rows = match state.store.list_jobs(LIST_LIMIT).await {
        Ok(rows) => rows,
        Err(err) => return err.into_response(),
    };
    let runs: Vec<RunRow> = rows
        .iter()
        .map(|row| {
            let duration_ms = match (row.started_at, row.finished_at) {
                (Some(start), Some(end)) if end >= start => Some((end - start) * 1000),
                _ => None,
            };
            let detail = row.error_detail.clone().or_else(|| {
                artifact_file(row).map(|p| {
                    p.file_name()
                        .map(|n| n.to_string_lossy().into_owned())
                        .unwrap_or_default()
                })
            });
            RunRow {
                id: row.job_id.clone(),
                label: run_label(row),
                status: run_status(&row.status).to_owned(),
                started_at: row.started_at.or(Some(row.created_at)).map(|s| s * 1000),
                finished_at: row.finished_at.map(|s| s * 1000),
                duration_ms,
                detail,
            }
        })
        .collect();
    let total = runs.len();
    Json(RunsResponse { runs, total }).into_response()
}
