//! Exports router — surfaces the persisted ZIP bundle from a synthesis run
//! as a streaming download. Frontend's `downloadExportBlob` calls
//! `GET /api/v1/extensions/nexus.audio.emotiontts/exports/:export_id/download`
//! after a `run_terminal` event arrives carrying an `exportArtifactRef`.
//!
//! Lookup chain:
//!   1. `repos.exports.get(export_id)` → `ExportHistoryRow`
//!   2. `artifact_store.resolve_path(zip_artifact_ref)` → absolute filesystem path
//!   3. stream the file to the client with the right `content-type` and
//!      `content-disposition` headers
//!
//! When the host did not pass a `HostArtifactStore` (early boot, certain
//! test paths), the download endpoint returns a `not_configured` envelope
//! at 503 — same shape as the voice-assets stub — so the frontend's
//! `apiFetch` error handler can surface a useful message.

use std::sync::Arc;

use axum::body::Body;
use axum::extract::{Path, State};
use axum::http::{header, StatusCode};
use axum::response::{IntoResponse, Json, Response};
use axum::routing::get;
use axum::Router;
use serde_json::json;
use tokio::fs::File;
use tokio_util::io::ReaderStream;

use crate::domain::{EmotionTtsError, ExportId};
use crate::host_contract::HostArtifactStore;
use crate::storage::Repos;

#[derive(Clone)]
pub struct ExportsState {
    repos: Repos,
    artifact_store: Option<Arc<dyn HostArtifactStore>>,
}

#[must_use]
pub fn router(repos: Repos, artifact_store: Option<Arc<dyn HostArtifactStore>>) -> Router {
    Router::new()
        .route("/{export_id}/download", get(download_export))
        .with_state(ExportsState {
            repos,
            artifact_store,
        })
}

async fn download_export(
    State(state): State<ExportsState>,
    Path(raw_export_id): Path<String>,
) -> Response {
    let store = match state.artifact_store.as_ref() {
        Some(s) => s,
        None => {
            let body = json!({
                "status": "error",
                "category": "not_configured",
                "message": "artifact store not configured by host — \
                            ensure HostArtifactStore is wired into \
                            build_router_with_artifact_store at extension load time",
                "request_id": null,
            });
            return (StatusCode::SERVICE_UNAVAILABLE, Json(body)).into_response();
        }
    };

    let export_id = match ExportId::try_from(raw_export_id.as_str()) {
        Ok(v) => v,
        Err(err) => return EmotionTtsError::from(err).into_response(),
    };
    let row = match state.repos.exports.get(&export_id).await {
        Ok(Some(r)) => r,
        Ok(None) => {
            return EmotionTtsError::not_found(format!("export {export_id}")).into_response()
        }
        Err(err) => return err.into_response(),
    };

    let abs_path = match store.resolve_path(&row.zip_artifact_ref).await {
        Ok(p) => p,
        Err(err) => return EmotionTtsError::from(err).into_response(),
    };

    let file = match File::open(&abs_path).await {
        Ok(f) => f,
        Err(err) => {
            return EmotionTtsError::internal(format!(
                "failed to open export file '{abs_path}': {err}"
            ))
            .into_response();
        }
    };

    // Derive a user-facing download filename. The export id is already a
    // stable, slug-safe ULID-like string; suffix with `.zip` so the
    // browser saves it sensibly.
    let download_filename = format!("emotion-tts-export-{export_id}.zip");
    let stream = ReaderStream::new(file);
    let body = Body::from_stream(stream);

    Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "application/zip")
        .header(
            header::CONTENT_DISPOSITION,
            format!("attachment; filename=\"{download_filename}\""),
        )
        .body(body)
        .unwrap_or_else(|err| {
            EmotionTtsError::internal(format!("response builder: {err}")).into_response()
        })
}
