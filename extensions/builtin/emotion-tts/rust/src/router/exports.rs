use axum::http::StatusCode;
use axum::Router;

use crate::router::RouterState;

#[must_use]
pub fn router() -> Router<RouterState> {
    Router::new().fallback(|| async { StatusCode::NOT_IMPLEMENTED })
}
