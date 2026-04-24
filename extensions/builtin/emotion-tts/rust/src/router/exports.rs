use axum::http::StatusCode;
use axum::Router;

#[must_use]
pub fn router() -> Router {
    Router::new().fallback(|| async { StatusCode::NOT_IMPLEMENTED })
}
