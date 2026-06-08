pub mod media;
pub mod presets;
pub mod render;
pub mod settings;
pub mod uploads;

use std::path::PathBuf;
use std::sync::Arc;

use axum::http::StatusCode;
use axum::response::{IntoResponse, Json, Response};
use axum::Router;
use serde::Serialize;

use crate::backend_client::LeaseProvider;
use crate::dispatcher::RenderChannels;
use crate::domain::Svi2Error;
use crate::storage::Store;

#[derive(Clone)]
pub struct AppState {
    pub store: Store,
    pub provider: Arc<LeaseProvider>,
    pub channels: RenderChannels,
    pub workspace_dir: PathBuf,
    pub extension_version: String,
}

#[derive(Debug, Serialize)]
pub struct ErrorEnvelope {
    pub status: &'static str,
    pub category: &'static str,
    pub message: String,
}

impl IntoResponse for Svi2Error {
    fn into_response(self) -> Response {
        let status =
            StatusCode::from_u16(self.status_code()).unwrap_or(StatusCode::INTERNAL_SERVER_ERROR);
        let body = ErrorEnvelope {
            status: "error",
            category: self.category(),
            message: self.to_string(),
        };
        (status, Json(body)).into_response()
    }
}

#[must_use]
pub fn build_router(state: AppState) -> Router {
    Router::new()
        .merge(presets::router())
        .merge(settings::router())
        .merge(render::router())
        .merge(media::router())
        .merge(uploads::router())
        .with_state(state)
}

#[must_use]
pub fn http_routes() -> Vec<String> {
    vec![
        "/presets".into(),
        "/settings".into(),
        "/render/start".into(),
        "/render/jobs".into(),
        "/render/jobs/{job_id}".into(),
        "/render/jobs/{job_id}/cancel".into(),
        "/render/jobs/{job_id}/events".into(),
        "/render/jobs/{job_id}/output".into(),
        "/media".into(),
        "/uploads".into(),
    ]
}
