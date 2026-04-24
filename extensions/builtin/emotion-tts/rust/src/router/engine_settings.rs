//! Spec 034 — per-deployment engine settings.
//!
//! Phase 2 ships the route shell returning 501 stubs so the router surface
//! is discoverable. Real handlers land in T062 (US2 PATCH oas-threshold)
//! and T109 (US5 engine-settings panel consumer).

use axum::http::StatusCode;
use axum::routing::{get, patch};
use axum::Router;

pub fn router() -> Router {
    Router::new()
        .route(
            "/deployments/:deployment_id/engine-settings",
            get(not_implemented).patch(not_implemented),
        )
        .route(
            "/deployments/:deployment_id/oas-threshold",
            patch(not_implemented),
        )
}

async fn not_implemented() -> StatusCode {
    StatusCode::NOT_IMPLEMENTED
}
