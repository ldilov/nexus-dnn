//! `POST /api/v1/extensions/install-from-zip` (spec 019 FR-IE03) and
//! surrounding wiring: per-route body size cap, multipart streaming to
//! staging, delegation to [`ZipInstallPipeline`], registry refresh, and
//! `module.installed` event emission.

pub mod zip_handler;

use axum::Router;
use axum::extract::DefaultBodyLimit;
use axum::routing::post;
use tower_http::limit::RequestBodyLimitLayer;

use crate::AppState;

/// Configured router fragment mounted at `/api/v1/extensions`. The body
/// limit mirrors [`ZipSizeLimits::max_compressed_bytes`] — 64 MiB.
pub fn router() -> Router<AppState> {
    Router::new()
        .route("/install-from-zip", post(zip_handler::install_from_zip))
        .layer(DefaultBodyLimit::disable())
        .layer(RequestBodyLimitLayer::new(64 * 1024 * 1024))
}
