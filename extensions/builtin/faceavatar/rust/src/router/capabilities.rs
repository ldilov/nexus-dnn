use axum::extract::State;
use axum::response::{IntoResponse, Json, Response};
use axum::routing::get;
use axum::Router;
use serde_json::json;

use crate::backend_client::methods;
use crate::domain::{Result, FaceAvatarError};
use crate::router::AppState;

pub fn router() -> Router<AppState> {
    Router::new().route("/capabilities", get(capabilities))
}

async fn capabilities(State(state): State<AppState>) -> Response {
    match capabilities_impl(&state).await {
        Ok(facts) => Json(facts).into_response(),
        Err(err) => err.into_response(),
    }
}

/// Read-only metadata query. Never spawns the worker: a running lease answers
/// via its health RPC, otherwise we return 503 so the UI treats capabilities as
/// unknown rather than booting a GPU worker on form load.
async fn capabilities_impl(state: &AppState) -> Result<serde_json::Value> {
    let client = state
        .provider
        .current_if_ready()
        .await
        .ok_or_else(|| FaceAvatarError::RuntimeUnavailable("worker not running".into()))?;
    client.call(methods::HEALTH, json!({})).await
}
