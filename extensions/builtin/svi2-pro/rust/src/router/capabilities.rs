use axum::extract::State;
use axum::response::{IntoResponse, Json, Response};
use axum::routing::get;
use axum::Router;
use serde_json::json;

use crate::backend_client::methods;
use crate::domain::Result;
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

async fn attention_capabilities_impl(state: &AppState) -> Result<serde_json::Value> {
    let client = state.provider.spawn_if_needed().await?;
    client
        .call(methods::ATTENTION_CAPABILITIES, json!({}))
        .await
}
