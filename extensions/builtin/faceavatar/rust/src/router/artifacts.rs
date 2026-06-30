//! Host-shell "Artifacts" surface for the deployment detail tab.
//!
//! The host fetches `/api/v1/extensions/{ext-id}/deployments/{dep}/artifacts`
//! through the generic extension mount — these handlers map each SUCCEEDED
//! generation job's GLB into the shell's generic `ArtifactRow` shape and serve
//! the verbs the host tab calls (list, per-job download, per-job + bulk delete,
//! and a `.zip` bundle). Generation jobs are not deployment-scoped in v1, so the
//! `{deployment_id}` segment is accepted and ignored (mirrors svi2-pro).
//!
//! Every byte-serving path resolves the workspace-RELATIVE `output_glb_ref`
//! through [`crate::router::media::resolve_under_root`] (canonicalize +
//! `starts_with` guard) so a crafted ref can never escape the extension
//! workspace, and download filenames are basename-sanitised.

use axum::body::Body;
use axum::extract::{Path, Query, State};
use axum::http::{header, StatusCode};
use axum::response::{IntoResponse, Json, Response};
use axum::routing::{delete, get};
use axum::Router;
use serde::{Deserialize, Serialize};
use tokio_util::io::ReaderStream;

use crate::domain::FaceAvatarError;
use crate::router::media::resolve_under_root;
use crate::router::AppState;
use crate::storage::GenerationJobRow;

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
}

/// Generic artifact row consumed by `apps/web/.../artifacts/artifacts.ui.tsx`.
/// `finishedAt` is epoch SECONDS (the view multiplies by 1000); `durationMs` is
/// the running-to-terminal span. faceavatar has no per-utterance concept, so
/// `utteranceId`/`runId` both carry the job id and `globalIndex` is the
/// list position.
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

#[derive(Debug, Serialize)]
struct DeleteResponse {
    deleted: u64,
}

#[derive(Debug, Deserialize)]
struct IdsQuery {
    #[serde(rename = "utteranceIds")]
    utterance_ids: Option<String>,
}

/// Parse the opt-in `utteranceIds=a,b,c` bulk filter. Returns `None` when the
/// param is absent/blank (operate on the whole deployment). IDs are constrained
/// to `[A-Za-z0-9\-_]` so the `,`-split is injection-safe.
fn parse_ids(raw: Option<&str>) -> Option<Vec<String>> {
    let raw = raw?.trim();
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

/// Wire-format the GLB ref's basename. `output_glb_ref` is workspace-relative
/// (`meshes/<id>/out.glb`); the artifact row + download surface only the last
/// segment, basename-sanitised so a crafted name can't inject header bytes.
fn ref_filename(glb_ref: &str) -> String {
    let base = glb_ref.rsplit(['/', '\\']).next().unwrap_or(glb_ref);
    sanitize_filename(base)
}

/// Restrict a download filename to `[A-Za-z0-9._-]` (no CR/LF/quote/slash) so a
/// crafted ref can't inject a `Content-Disposition` header or a path. Falls back
/// to `model.glb`.
fn sanitize_filename(name: &str) -> String {
    let cleaned: String = name
        .chars()
        .filter(|c| c.is_ascii_alphanumeric() || matches!(c, '.' | '_' | '-'))
        .collect();
    if cleaned.is_empty() {
        "model.glb".to_string()
    } else {
        cleaned
    }
}

fn duration_ms(row: &GenerationJobRow) -> Option<i64> {
    match (row.started_at, row.finished_at) {
        (Some(start), Some(end)) if end >= start => Some((end - start) * 1000),
        _ => None,
    }
}

/// Succeeded jobs that still carry a GLB ref, newest-first (the store already
/// orders by `created_at DESC`).
async fn completed_with_output(state: &AppState) -> Result<Vec<GenerationJobRow>, FaceAvatarError> {
    let rows = state.store.list_jobs(LIST_LIMIT).await?;
    Ok(rows
        .into_iter()
        .filter(|r| r.status == "completed" && r.output_glb_ref.is_some())
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
            let glb_ref = row.output_glb_ref.as_deref().unwrap_or_default();
            ArtifactRow {
                utterance_id: row.job_id.clone(),
                run_id: row.job_id.clone(),
                global_index: idx as u64,
                character_display: "Face avatar".to_string(),
                text: row.input_image_ref.clone(),
                output_format: "glb".to_string(),
                duration_ms: duration_ms(row),
                finished_at: row.finished_at,
                filename: ref_filename(glb_ref),
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
    let Some(glb_ref) = row.output_glb_ref.as_deref() else {
        return FaceAvatarError::not_found(format!("job {job_id} has no artifact")).into_response();
    };
    let resolved = match resolve_under_root(&state.workspace_dir, glb_ref).await {
        Ok(path) => path,
        Err(err) => return err.into_response(),
    };
    let file = match tokio::fs::File::open(&resolved).await {
        Ok(file) => file,
        Err(_) => {
            return FaceAvatarError::not_found(format!("artifact file missing for {job_id}"))
                .into_response()
        }
    };
    let filename = ref_filename(glb_ref);
    (
        StatusCode::OK,
        [
            (header::CONTENT_TYPE, "model/gltf-binary".to_owned()),
            (
                header::CONTENT_DISPOSITION,
                format!("attachment; filename=\"{filename}\""),
            ),
        ],
        Body::from_stream(ReaderStream::new(file)),
    )
        .into_response()
}

async fn delete_artifact(
    State(state): State<AppState>,
    Path((_deployment_id, job_id)): Path<(String, String)>,
) -> Response {
    match remove_artifact(&state, &job_id).await {
        Ok(true) => StatusCode::NO_CONTENT.into_response(),
        Ok(false) => {
            FaceAvatarError::not_found(format!("job {job_id} has no artifact")).into_response()
        }
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
    let filter = parse_ids(q.utterance_ids.as_deref());
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

/// Detach a job's GLB: delete the file on disk (best-effort, traversal-safe) and
/// null its `output_glb_ref` so it leaves the artifacts listing. The history row
/// stays so the run still appears under Runs.
async fn remove_artifact(state: &AppState, job_id: &str) -> Result<bool, FaceAvatarError> {
    let row = state.store.get_job(job_id).await?;
    if let Some(glb_ref) = row.output_glb_ref.as_deref() {
        if let Ok(path) = resolve_under_root(&state.workspace_dir, glb_ref).await {
            let _ = tokio::fs::remove_file(&path).await;
        }
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
    let filter = parse_ids(q.utterance_ids.as_deref());
    let mut entries: Vec<(String, Vec<u8>)> = Vec::new();
    for row in rows {
        if let Some(ids) = &filter {
            if !ids.iter().any(|id| id == &row.job_id) {
                continue;
            }
        }
        let Some(glb_ref) = row.output_glb_ref.as_deref() else {
            continue;
        };
        let Ok(path) = resolve_under_root(&state.workspace_dir, glb_ref).await else {
            continue;
        };
        let Ok(bytes) = tokio::fs::read(&path).await else {
            continue;
        };
        entries.push((format!("{}_{}", row.job_id, ref_filename(glb_ref)), bytes));
    }
    if entries.is_empty() {
        return FaceAvatarError::not_found("no artifacts to download").into_response();
    }
    let zip = build_stored_zip(&entries);
    (
        StatusCode::OK,
        [
            (header::CONTENT_TYPE, "application/zip".to_owned()),
            (
                header::CONTENT_DISPOSITION,
                "attachment; filename=\"faceavatar-meshes.zip\"".to_owned(),
            ),
        ],
        Body::from(zip),
    )
        .into_response()
}

/// Minimal STORE-method ZIP writer (GLB is already binary, so deflate would only
/// burn CPU). Local headers + central directory per APPNOTE.
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

#[cfg(test)]
mod tests {
    use super::*;

    fn completed_row(job_id: &str, glb_ref: Option<&str>) -> GenerationJobRow {
        GenerationJobRow {
            job_id: job_id.into(),
            operation: "generate".into(),
            input_image_ref: "uploads/a.png".into(),
            params_json: "{}".into(),
            status: "completed".into(),
            output_glb_ref: glb_ref.map(str::to_owned),
            metadata_json: None,
            error_detail: None,
            created_at: 1_000,
            started_at: Some(1_010),
            finished_at: Some(1_040),
        }
    }

    #[test]
    fn parse_ids_opt_in_filter() {
        assert_eq!(parse_ids(None), None);
        assert_eq!(parse_ids(Some("   ")), None);
        assert_eq!(
            parse_ids(Some("a,b,c")),
            Some(vec!["a".into(), "b".into(), "c".into()])
        );
    }

    #[test]
    fn parse_ids_drops_injection_attempts() {
        assert_eq!(
            parse_ids(Some("ok-1,../etc,good_2,bad/slash")),
            Some(vec!["ok-1".into(), "good_2".into()])
        );
    }

    #[test]
    fn ref_filename_takes_basename_and_sanitises() {
        assert_eq!(ref_filename("meshes/job-1/out.glb"), "out.glb");
        assert_eq!(ref_filename("meshes\\job-1\\out.glb"), "out.glb");
        assert_eq!(ref_filename("a\r\nb\"c.glb"), "abc.glb");
        assert_eq!(ref_filename(""), "model.glb");
    }

    #[test]
    fn duration_is_running_to_terminal_span() {
        let row = completed_row("job-1", Some("meshes/job-1/out.glb"));
        assert_eq!(duration_ms(&row), Some(30_000));
    }

    #[test]
    fn stored_zip_has_signature_and_eocd() {
        let zip = build_stored_zip(&[("a.glb".into(), b"hello".to_vec())]);
        assert_eq!(&zip[0..4], &[0x50, 0x4b, 0x03, 0x04]);
        assert!(zip.len() > 22);
        let eocd = &zip[zip.len() - 22..zip.len() - 18];
        assert_eq!(eocd, &[0x50, 0x4b, 0x05, 0x06]);
    }

    #[test]
    fn crc32_matches_known_vector() {
        assert_eq!(crc32(b"123456789"), 0xCBF4_3926);
    }
}
