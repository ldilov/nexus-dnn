use axum::Json;
use axum::extract::{Path, State};
use axum::response::IntoResponse;

use crate::AppState;
use crate::envelope::ApiResponse;
use nexus_backend_runtimes::settings::RuntimeSettings;

use super::{map_error, registry, unwired};

pub async fn get_settings(
    State(state): State<AppState>,
    Path(backend_id): Path<String>,
) -> axum::response::Response {
    let Some(registry) = registry(&state) else {
        return unwired().into_response();
    };
    let Some(adapter) = registry.get(&backend_id) else {
        return ApiResponse::<()>::not_found(format!("backend {backend_id} not found"))
            .into_response();
    };
    match adapter.get_settings().await {
        Ok(settings) => ApiResponse::ok(settings).into_response(),
        Err(err) => map_error(err).into_response(),
    }
}

pub async fn put_settings(
    State(state): State<AppState>,
    Path(backend_id): Path<String>,
    Json(settings): Json<RuntimeSettings>,
) -> axum::response::Response {
    let Some(registry) = registry(&state) else {
        return unwired().into_response();
    };
    let Some(adapter) = registry.get(&backend_id) else {
        return ApiResponse::<()>::not_found(format!("backend {backend_id} not found"))
            .into_response();
    };
    match adapter.put_settings(settings).await {
        Ok(()) => ApiResponse::no_content().into_response(),
        Err(err) => map_error(err).into_response(),
    }
}
