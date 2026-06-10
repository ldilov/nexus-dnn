use axum::extract::State;
use axum::response::{IntoResponse, Json, Response};
use axum::routing::get;
use axum::Router;
use serde_json::Value as JsonValue;

use crate::domain::Result;
use crate::router::AppState;

#[must_use]
pub fn router() -> Router<AppState> {
    Router::new().route("/settings", get(get_settings).put(put_settings))
}

async fn get_settings(State(state): State<AppState>) -> Response {
    match get_settings_impl(&state).await {
        Ok(body) => Json(body).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn get_settings_impl(state: &AppState) -> Result<JsonValue> {
    state.store.get_settings().await
}

async fn put_settings(State(state): State<AppState>, Json(body): Json<JsonValue>) -> Response {
    match state.store.put_settings(&body).await {
        Ok(saved) => Json(saved).into_response(),
        Err(err) => err.into_response(),
    }
}
