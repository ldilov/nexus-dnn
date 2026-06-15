use std::collections::BTreeMap;

use axum::Json;
use axum::extract::{Path, State};
use serde_json::Value;

use nexus_storage::Database;

use crate::AppState;
use crate::dto::{CreateRunResponseDto, ListResponseDto, RecipeDto};
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

#[derive(serde::Deserialize, Default)]
pub struct RecipeRunRequest {
    #[serde(default)]
    pub control_values: BTreeMap<String, Value>,
    #[serde(default)]
    pub preset_id: Option<String>,
}

pub async fn run_recipe(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(body): Json<RecipeRunRequest>,
) -> Result<ApiResponse<CreateRunResponseDto>, ApiError> {
    let recipe = state
        .db
        .get_recipe(&id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;
    let run_id =
        crate::recipe_run::compile_and_launch(&state, &recipe, body.control_values, body.preset_id)
            .await?;
    Ok(ApiResponse::created(CreateRunResponseDto {
        run_id,
        status: "created".to_owned(),
        predecessor_run_id: None,
    }))
}
