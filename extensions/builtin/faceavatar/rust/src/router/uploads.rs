use axum::extract::{DefaultBodyLimit, Multipart, State};
use axum::response::{IntoResponse, Json, Response};
use axum::routing::post;
use axum::Router;
use serde_json::json;
use sha2::{Digest, Sha256};

use crate::domain::{FaceAvatarError, Result};
use crate::router::AppState;

/// Max accepted upload size. Covers both small identity photos AND head-refine
/// base-mesh GLBs, which run tens of MB (a TRELLIS export is ~38 MB); 256 MiB
/// leaves headroom while bounding memory per request.
const MAX_UPLOAD_BYTES: usize = 256 * 1024 * 1024;

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/uploads", post(upload))
        .layer(DefaultBodyLimit::max(MAX_UPLOAD_BYTES))
}

/// Accept a multipart `file` field, persist it into the extension workspace
/// under a content-addressed name, and return `{"ref": "uploads/<digest>.<ext>"}`.
/// The returned `ref` is a workspace-RELATIVE opaque token accepted by
/// `POST /generate/start`'s `image` field and served by `GET /media/{ref}`.
async fn upload(State(state): State<AppState>, multipart: Multipart) -> Response {
    match upload_impl(&state, multipart).await {
        Ok(media_ref) => Json(json!({ "ref": media_ref })).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn upload_impl(state: &AppState, mut multipart: Multipart) -> Result<String> {
    let uploads_dir = state.workspace_dir.join("uploads");
    tokio::fs::create_dir_all(&uploads_dir)
        .await
        .map_err(|e| FaceAvatarError::internal(format!("create uploads dir: {e}")))?;

    while let Some(field) = multipart
        .next_field()
        .await
        .map_err(|e| FaceAvatarError::validation(format!("malformed multipart: {e}")))?
    {
        if field.name() != Some("file") {
            continue;
        }
        let filename = field.file_name().map(str::to_string);
        let bytes = field
            .bytes()
            .await
            .map_err(|e| FaceAvatarError::validation(format!("read upload bytes: {e}")))?;
        if bytes.is_empty() {
            return Err(FaceAvatarError::validation("uploaded file is empty"));
        }
        if bytes.len() > MAX_UPLOAD_BYTES {
            return Err(FaceAvatarError::validation("uploaded file too large"));
        }

        let mut hasher = Sha256::new();
        hasher.update(&bytes);
        let digest = format!("{:x}", hasher.finalize());
        let ext = filename
            .as_deref()
            .and_then(|n| n.rsplit('.').next())
            .filter(|e| e.chars().all(|c| c.is_ascii_alphanumeric()) && e.len() <= 8)
            .unwrap_or("bin");
        let rel = format!("uploads/{digest}.{ext}");
        let target = uploads_dir.join(format!("{digest}.{ext}"));
        tokio::fs::write(&target, &bytes)
            .await
            .map_err(|e| FaceAvatarError::internal(format!("write upload: {e}")))?;
        return Ok(rel);
    }

    Err(FaceAvatarError::validation(
        "no `file` field in multipart upload",
    ))
}
