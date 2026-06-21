use std::path::{Path as FsPath, PathBuf};

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
        .route("/media", get(media).head(media_head))
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

/// Existence probe for the same in-workspace media path that `media` serves.
/// Runs the identical path-traversal guard as `serve_file` and replies
/// `200`/`404` with no body so the UI can cheaply check whether a historical
/// input image is still on disk before restoring a past run.
async fn media_head(State(state): State<AppState>, Query(q): Query<MediaQuery>) -> Response {
    match resolve_in_workspace(&state, &q.path).await {
        Ok(_) => StatusCode::OK.into_response(),
        Err(err) => StatusCode::from_u16(err.status_code())
            .unwrap_or(StatusCode::INTERNAL_SERVER_ERROR)
            .into_response(),
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

/// Resolve a requested media path to its canonical location, refusing any path
/// that escapes the extension workspace once canonicalized. The single
/// chokepoint shared by `serve_file` (GET) and `media_head` (HEAD) so the
/// security guard is identical for both verbs.
async fn resolve_in_workspace(state: &AppState, requested: &str) -> Result<PathBuf> {
    resolve_under_root(&state.workspace_dir, requested).await
}

/// Pure path-traversal guard: canonicalize `workspace_dir` and the requested
/// path, then ensure the resolved path stays under the workspace root. Mirrors
/// the emotion-tts media guard. Kept independent of `AppState` so the guard is
/// directly unit-testable for both the GET and HEAD verbs that share it.
async fn resolve_under_root(workspace_dir: &FsPath, requested: &str) -> Result<PathBuf> {
    let canonical_root = tokio::fs::canonicalize(workspace_dir)
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

    Ok(resolved)
}

/// Serve a file from the extension workspace as a streamed body. Reuses
/// `resolve_in_workspace` for the path-traversal guard, then streams the bytes.
async fn serve_file(state: &AppState, requested: &str) -> Result<Response> {
    let resolved = resolve_in_workspace(state, requested).await?;

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

#[cfg(test)]
mod tests {
    use super::*;

    /// The HEAD existence probe (`media_head`) and the GET stream (`serve_file`)
    /// both route through `resolve_under_root`, so testing the guard directly
    /// validates the 200/404/traversal behaviour for both verbs.
    #[tokio::test]
    async fn head_probe_resolves_in_workspace_file() {
        let root = tempfile::tempdir().unwrap();
        let file = root.path().join("anchor.png");
        tokio::fs::write(&file, b"png-bytes").await.unwrap();

        let resolved = resolve_under_root(root.path(), file.to_str().unwrap())
            .await
            .expect("in-workspace file resolves -> HEAD 200");
        assert!(resolved.ends_with("anchor.png"));
    }

    #[tokio::test]
    async fn head_probe_404_for_missing_file() {
        let root = tempfile::tempdir().unwrap();
        let missing = root.path().join("gone.png");

        let err = resolve_under_root(root.path(), missing.to_str().unwrap())
            .await
            .expect_err("missing file -> HEAD 404");
        assert_eq!(err.status_code(), 404);
    }

    #[tokio::test]
    async fn head_probe_rejects_traversal_outside_workspace() {
        let root = tempfile::tempdir().unwrap();
        let outside = tempfile::tempdir().unwrap();
        let secret = outside.path().join("secret.png");
        tokio::fs::write(&secret, b"secret").await.unwrap();

        // An existing file that canonicalizes outside the workspace must be
        // refused as not-found, not served — same guard for HEAD and GET.
        let err = resolve_under_root(root.path(), secret.to_str().unwrap())
            .await
            .expect_err("file outside workspace -> rejected");
        assert_eq!(err.status_code(), 404);
    }
}
