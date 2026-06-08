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
    Router::new().route("/presets", get(list_presets))
}

async fn list_presets(State(state): State<AppState>) -> Response {
    match list_presets_impl(&state).await {
        Ok(catalog) => Json(catalog).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn list_presets_impl(state: &AppState) -> Result<serde_json::Value> {
    let client = state.provider.spawn_if_needed().await?;
    client.call(methods::PRESETS_LIST, json!({})).await
}
