use axum::Json;
use axum::extract::State;
use axum::response::{IntoResponse, Response};
use serde::{Deserialize, Serialize};

use crate::AppState;
use crate::envelope::ApiResponse;

/// View emitted by the `GET` and returned on every mutation. Never
/// contains the raw token value — FR-113.
#[derive(Debug, Serialize)]
pub struct HfTokenStatusDto {
    pub configured: bool,
}

#[derive(Debug, Deserialize)]
pub struct SetHfTokenRequest {
    pub token: String,
}

#[derive(Debug, Serialize)]
pub struct CivitaiTokenStatusDto {
    pub configured: bool,
}

#[derive(Debug, Deserialize)]
pub struct SetCivitaiTokenRequest {
    pub token: String,
}

/// `GET /api/v1/model-store/settings/hf-token` — yes/no only.
pub async fn get_hf_token_status(State(state): State<AppState>) -> Response {
    let configured = match state.hf_token_store.as_ref() {
        Some(store) => store.has_token().await,
        None => false,
    };
    ApiResponse::ok(HfTokenStatusDto { configured }).into_response()
}

/// `PUT /api/v1/model-store/settings/hf-token`. Accepts a JSON body
/// `{ "token": "..." }`. Replaces the in-memory token and fires the
/// `TokenEvent::Set` broadcast — the orchestrator picks it up and
/// re-queues every `auth_required` job (FR-114).
pub async fn set_hf_token(
    State(state): State<AppState>,
    Json(req): Json<SetHfTokenRequest>,
) -> Response {
    let Some(store) = state.hf_token_store.as_ref() else {
        return ApiResponse::<()>::err(
            axum::http::StatusCode::SERVICE_UNAVAILABLE,
            "not_ready",
            "settings",
            "HF token store not initialised.".into(),
        )
        .into_response();
    };
    let trimmed = req.token.trim();
    if trimmed.is_empty() {
        return ApiResponse::<()>::bad_request("token must not be empty".into()).into_response();
    }
    store.set(trimmed.to_owned()).await;
    ApiResponse::ok(HfTokenStatusDto { configured: true }).into_response()
}

/// `GET /api/v1/model-store/settings/civitai-token` — yes/no only.
pub async fn get_civitai_token_status(State(state): State<AppState>) -> Response {
    let configured = match state.civitai_token_store.as_ref() {
        Some(store) => store.has_token().await,
        None => false,
    };
    ApiResponse::ok(CivitaiTokenStatusDto { configured }).into_response()
}

/// `PUT /api/v1/model-store/settings/civitai-token`. Accepts a JSON body
/// `{ "token": "..." }`. Replaces the in-memory token.
pub async fn set_civitai_token(
    State(state): State<AppState>,
    Json(req): Json<SetCivitaiTokenRequest>,
) -> Response {
    let Some(store) = state.civitai_token_store.as_ref() else {
        return ApiResponse::<()>::err(
            axum::http::StatusCode::SERVICE_UNAVAILABLE,
            "not_ready",
            "settings",
            "Civitai token store not initialised.".into(),
        )
        .into_response();
    };
    let trimmed = req.token.trim();
    if trimmed.is_empty() {
        return ApiResponse::<()>::bad_request("token must not be empty".into()).into_response();
    }
    store.set(trimmed.to_owned()).await;
    ApiResponse::ok(CivitaiTokenStatusDto { configured: true }).into_response()
}

/// `DELETE /api/v1/model-store/settings/civitai-token` — removes the stored token.
pub async fn clear_civitai_token(State(state): State<AppState>) -> Response {
    let Some(store) = state.civitai_token_store.as_ref() else {
        return ApiResponse::<()>::err(
            axum::http::StatusCode::SERVICE_UNAVAILABLE,
            "not_ready",
            "settings",
            "Civitai token store not initialised.".into(),
        )
        .into_response();
    };
    store.clear().await;
    ApiResponse::ok(CivitaiTokenStatusDto { configured: false }).into_response()
}

/// `DELETE /api/v1/model-store/settings/hf-token` — removes the stored
/// token. Subscribers see `TokenEvent::Cleared`.
pub async fn clear_hf_token(State(state): State<AppState>) -> Response {
    let Some(store) = state.hf_token_store.as_ref() else {
        return ApiResponse::<()>::err(
            axum::http::StatusCode::SERVICE_UNAVAILABLE,
            "not_ready",
            "settings",
            "HF token store not initialised.".into(),
        )
        .into_response();
    };
    store.clear().await;
    ApiResponse::ok(HfTokenStatusDto { configured: false }).into_response()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn civitai_token_request_deserializes() {
        let r: SetCivitaiTokenRequest = serde_json::from_str(r#"{ "token": "abc" }"#).unwrap();
        assert_eq!(r.token, "abc");
    }
}
