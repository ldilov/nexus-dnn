use std::path::Path as FsPath;

use axum::body::Body;
use axum::extract::{Path, Query, State};
use axum::http::{header, StatusCode};
use axum::response::{IntoResponse, Response};
use axum::routing::get;
use axum::Router;
use serde::Deserialize;
use tokio_util::io::ReaderStream;

use crate::domain::{Result, Svi2Error};
use crate::router::AppState;

#[must_use]
pub fn router() -> Router<AppState> {
    Router::new()
        .route("/media", get(media))
        .route("/render/jobs/{job_id}/output", get(job_output))
}

#[derive(Debug, Deserialize)]
struct MediaQuery {
    path: String,
}

async fn media(State(state): State<AppState>, Query(q): Query<MediaQuery>) -> Response {
    match serve_file(&state, &q.path).await {
        Ok(resp) => resp,
        Err(err) => err.into_response(),
    }
}

async fn job_output(State(state): State<AppState>, Path(job_id): Path<String>) -> Response {
    let row = match state.store.get_job(&job_id).await {
        Ok(r) => r,
        Err(err) => return err.into_response(),
    };
    let Some(output) = row.output_path else {
        return Svi2Error::not_found(format!("job {job_id} has no output yet")).into_response();
    };
    match serve_file(&state, &output).await {
        Ok(resp) => resp,
        Err(err) => err.into_response(),
    }
}

/// Serve a file, refusing any path that escapes the extension workspace
/// once canonicalized. Mirrors the emotion-tts media guard: resolve the
/// real path, ensure it stays under `workspace_dir`, stream the bytes.
async fn serve_file(state: &AppState, requested: &str) -> Result<Response> {
    let canonical_root = tokio::fs::canonicalize(&state.workspace_dir)
        .await
        .map_err(|e| Svi2Error::internal(format!("workspace dir unresolved: {e}")))?;

    let candidate = FsPath::new(requested);
    let resolved = tokio::fs::canonicalize(candidate)
        .await
        .map_err(|_| Svi2Error::not_found(format!("media not found: {requested}")))?;

    if !resolved.starts_with(&canonical_root) {
        return Err(Svi2Error::not_found(format!(
            "media not found: {requested}"
        )));
    }

    let file = tokio::fs::File::open(&resolved)
        .await
        .map_err(|_| Svi2Error::not_found(format!("media not found: {requested}")))?;
    let stream = ReaderStream::new(file);
    let content_type = guess_content_type(&resolved);

    Ok((
        StatusCode::OK,
        [(header::CONTENT_TYPE, content_type)],
        Body::from_stream(stream),
    )
        .into_response())
}

fn guess_content_type(path: &FsPath) -> &'static str {
    match path.extension().and_then(|e| e.to_str()) {
        Some("mp4") => "video/mp4",
        Some("webm") => "video/webm",
        Some("png") => "image/png",
        Some("jpg" | "jpeg") => "image/jpeg",
        Some("json") => "application/json",
        _ => "application/octet-stream",
    }
}
