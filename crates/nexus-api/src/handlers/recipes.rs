use axum::extract::{Path, State};

use nexus_storage::Database;

use crate::AppState;
use crate::envelope::ApiResponse;
use crate::error::ApiError;

pub async fn list_recipes(
    State(state): State<AppState>,
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
    let recipes = state
        .db
        .list_recipes()
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    Ok(ApiResponse::ok(serde_json::json!({ "recipes": recipes })))
}

pub async fn get_recipe(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
    let record = state
        .db
        .get_recipe(&id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;

    Ok(ApiResponse::ok(
        serde_json::to_value(record).unwrap_or_default(),
    ))
}
