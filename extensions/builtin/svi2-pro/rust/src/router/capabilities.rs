use axum::extract::State;
use axum::response::{IntoResponse, Json, Response};
use axum::routing::get;
use axum::Router;
use serde_json::json;

use crate::backend_client::methods;
use crate::domain::{Result, Svi2Error};
use crate::router::AppState;

#[must_use]
pub fn router() -> Router<AppState> {
    Router::new().route("/capabilities/attention", get(attention_capabilities))
}

async fn attention_capabilities(State(state): State<AppState>) -> Response {
    match attention_capabilities_impl(&state).await {
        Ok(facts) => Json(facts).into_response(),
        Err(err) => err.into_response(),
    }
}

/// Read-only metadata query. Never spawns the worker: a running lease answers,
/// otherwise we return 503 so the UI treats capabilities as unknown and shows
/// every option ungated rather than booting a GPU worker on form load.
async fn attention_capabilities_impl(state: &AppState) -> Result<serde_json::Value> {
    let client = state
        .provider
        .current_if_ready()
        .await
        .ok_or_else(|| Svi2Error::RuntimeUnavailable("worker not running".into()))?;
    client
        .call(methods::ATTENTION_CAPABILITIES, json!({}))
        .await
}
