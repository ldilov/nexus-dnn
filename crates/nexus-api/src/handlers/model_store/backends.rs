use axum::extract::State;
use axum::response::{IntoResponse, Response};
use serde::Serialize;

use nexus_models_store::model::BackendCapability;

use crate::AppState;
use crate::envelope::ApiResponse;

#[derive(Debug, Serialize)]
pub struct BackendsListDto {
    pub backends: Vec<BackendCapability>,
}

/// `GET /api/v1/model-store/backends` — returns the capability
/// registry. When no registry is wired (e.g. early-boot host), returns
/// an empty list so the frontend can degrade gracefully per FR-054.
pub async fn list_backends(State(state): State<AppState>) -> Response {
    let backends = match state.capability_registry.as_ref() {
        Some(reg) => reg.list().cloned().collect::<Vec<_>>(),
        None => Vec::new(),
    };
    ApiResponse::ok(BackendsListDto { backends }).into_response()
}
