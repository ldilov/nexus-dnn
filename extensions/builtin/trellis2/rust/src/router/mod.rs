pub mod artifacts;
pub mod capabilities;
pub mod media;
pub mod render;
pub mod runs;
pub mod uploads;

use std::path::PathBuf;
use std::sync::Arc;

use axum::http::StatusCode;
use axum::response::{IntoResponse, Json, Response};
use axum::Router;
use serde::Serialize;

use crate::backend_client::LeaseProvider;
use crate::dispatcher::GenerationChannels;
use crate::domain::Trellis2Error;
use crate::storage::Store;

#[derive(Clone)]
pub struct AppState {
    pub store: Store,
    pub provider: Arc<LeaseProvider>,
    pub channels: GenerationChannels,
    pub workspace_dir: PathBuf,
    pub extension_version: String,
    /// Host orchestration bus; `Some` when the host wired it (spec 057). Drives
    /// the per-node Workflow Graph overlay during a generation.
    pub event_bus: Option<Arc<dyn nexus_events::bus::EventBus>>,
}

#[derive(Debug, Serialize)]
pub struct ErrorEnvelope {
    pub status: &'static str,
    pub category: &'static str,
    pub message: String,
}

impl IntoResponse for Trellis2Error {
    fn into_response(self) -> Response {
        let status =
            StatusCode::from_u16(self.status_code()).unwrap_or(StatusCode::INTERNAL_SERVER_ERROR);
        if self.is_internal_detail() {
            tracing::error!(target: "trellis2::api", category = self.category(), detail = %self, "request failed");
        }
        let body = ErrorEnvelope {
            status: "error",
            category: self.category(),
            message: self.client_message(),
        };
        (status, Json(body)).into_response()
    }
}

pub fn build_router(state: AppState) -> Router {
    Router::new()
        .merge(capabilities::router())
        .merge(render::router())
        .merge(media::router())
        .merge(uploads::router())
        .merge(runs::router())
        .merge(artifacts::router())
        .with_state(state)
}

#[must_use]
pub fn http_routes() -> Vec<String> {
    vec![
        "/capabilities".into(),
        "/generate/start".into(),
        "/generate/jobs".into(),
        "/generate/jobs/{job_id}".into(),
        "/generate/jobs/{job_id}/cancel".into(),
        "/generate/jobs/{job_id}/events".into(),
        "/generate/jobs/{job_id}/output".into(),
        "/media/{ref}".into(),
        "/uploads".into(),
        "/deployments/{deployment_id}/runs".into(),
        "/deployments/{deployment_id}/artifacts".into(),
        "/deployments/{deployment_id}/artifacts.zip".into(),
        "/deployments/{deployment_id}/artifacts/{job_id}".into(),
        "/deployments/{deployment_id}/artifacts/{job_id}/download".into(),
    ]
}
