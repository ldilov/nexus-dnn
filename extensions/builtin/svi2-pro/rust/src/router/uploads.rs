use axum::extract::{Multipart, State};
use axum::response::{IntoResponse, Json, Response};
use axum::routing::post;
use axum::Router;
use serde_json::json;
use sha2::{Digest, Sha256};

use crate::domain::{Result, Svi2Error};
use crate::router::AppState;

#[must_use]
pub fn router() -> Router<AppState> {
    Router::new().route("/uploads", post(upload))
}

/// Accept a multipart `file` field, persist it into the extension
/// workspace under a content-addressed name, and return the absolute
/// workspace path. The render request then points `ref_image_path` /
/// `last_image_path` at this path. The media route's traversal guard
/// keeps reads inside the same workspace dir.
async fn upload(State(state): State<AppState>, multipart: Multipart) -> Response {
    match upload_impl(&state, multipart).await {
        Ok(path) => Json(json!({ "path": path })).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn upload_impl(state: &AppState, mut multipart: Multipart) -> Result<String> {
    let uploads_dir = state.workspace_dir.join("uploads");
    tokio::fs::create_dir_all(&uploads_dir)
        .await
        .map_err(|e| Svi2Error::internal(format!("create uploads dir: {e}")))?;

    while let Some(field) = multipart
        .next_field()
        .await
        .map_err(|e| Svi2Error::validation(format!("malformed multipart: {e}")))?
    {
        if field.name() != Some("file") {
            continue;
        }
        let filename = field.file_name().map(str::to_string);
        let bytes = field
            .bytes()
            .await
            .map_err(|e| Svi2Error::validation(format!("read upload bytes: {e}")))?;
        if bytes.is_empty() {
            return Err(Svi2Error::validation("uploaded file is empty"));
        }

        let mut hasher = Sha256::new();
        hasher.update(&bytes);
        let digest = format!("{:x}", hasher.finalize());
        let ext = filename
            .as_deref()
            .and_then(|n| n.rsplit('.').next())
            .filter(|e| e.chars().all(|c| c.is_ascii_alphanumeric()) && e.len() <= 8)
            .unwrap_or("bin");
        let target = uploads_dir.join(format!("{digest}.{ext}"));
        tokio::fs::write(&target, &bytes)
            .await
            .map_err(|e| Svi2Error::internal(format!("write upload: {e}")))?;
        return Ok(target.to_string_lossy().to_string());
    }

    Err(Svi2Error::validation("no `file` field in multipart upload"))
}
