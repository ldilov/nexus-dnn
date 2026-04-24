//! Spec 034 US5 — model-family registry HTTP surface.
//!
//! Phase 2 ships 501 stubs. Real handlers land in T102 once the Rust
//! `families/` registry module (T101) exists.

use axum::http::StatusCode;
use axum::routing::get;
use axum::Router;

pub fn router() -> Router {
    Router::new()
        .route("/families", get(not_implemented))
        .route("/families/:family_id", get(not_implemented))
        .route("/families/:family_id/install-hint", get(not_implemented))
}

async fn not_implemented() -> StatusCode {
    StatusCode::NOT_IMPLEMENTED
}
