use axum::extract::{Path, State};

use nexus_storage::Database;

use crate::AppState;
use crate::dto::{ListResponseDto, RecipeDto};
use crate::envelope::ApiResponse;
use crate::error::ApiError;

pub async fn list_recipes(
    State(state): State<AppState>,
) -> Result<ApiResponse<ListResponseDto<RecipeDto>>, ApiError> {
    let recipes = state
        .db
        .list_recipes()
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let items = recipes.iter().map(RecipeDto::from).collect();
    Ok(ApiResponse::ok(ListResponseDto { items }))
}

pub async fn get_recipe(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<RecipeDto>, ApiError> {
    let record = state
        .db
        .get_recipe(&id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;

    Ok(ApiResponse::ok(RecipeDto::from(&record)))
}
