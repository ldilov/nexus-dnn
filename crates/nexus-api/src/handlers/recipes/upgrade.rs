//! P8 upgrade assistant: `GET /recipes/{id}/upgrade-preview` (read-only pin diff
//! + risk summary) and `POST /recipes/{id}/upgrade` (migration copy for a clean
//! upgrade, broken-binding report for a breaking one). Generic by `{id}` over
//! host-owned rows; zero extension-id / node-id literals (boundary_test).

use axum::extract::{Path, State};
use nexus_extension::{ExtensionRegistry, OperatorDefinition};
use nexus_recipe::{MigrationSource, RecipeProjection, build_migration_copy, diff_recipe_pin};
use nexus_storage::{Database, RecipeRecord, StorageError};
use nexus_workflow::WorkflowVersionSnapshot;

use crate::AppState;
use crate::dto::{
    BrokenBindingDto, RecipePinDiffDto, RecipeUpgradeResultDto, RecipeWritePayloadDto,
};
use crate::envelope::ApiResponse;
use crate::error::ApiError;
use crate::handlers::workflow_versioning::record_to_snapshot;

use super::run::load_workflow_snapshot;
use super::write::create_user_recipe;

async fn load_recipe(db: &impl Database, id: &str) -> Result<RecipeRecord, ApiError> {
    db.get_recipe(id).await.map_err(|e| match e {
        StorageError::NotFound { .. } => ApiError::NotFound(format!("recipe {id} not found")),
        other => ApiError::Internal(other.to_string()),
    })
}

fn projection_of(recipe: &RecipeRecord) -> Result<RecipeProjection, ApiError> {
    match recipe.projection.as_deref() {
        Some(json) => serde_json::from_str(json).map_err(|e| {
            ApiError::structured(
                axum::http::StatusCode::UNPROCESSABLE_ENTITY,
                "RECIPE_PROJECTION_PARSE",
                format!("projection parse failed: {e}"),
            )
        }),
        None => Ok(RecipeProjection::empty()),
    }
}

/// Best-effort load of a workflow's current-version snapshot; resolution failures
/// collapse to `None` so the caller can treat current as equal to pinned.
async fn load_current_snapshot(
    db: &impl Database,
    workflow_id: &str,
    operators: &[OperatorDefinition],
) -> Option<WorkflowVersionSnapshot> {
    let current_version = db.get_current_version(workflow_id).await.ok().flatten()?;
    let record = db
        .get_workflow_version(workflow_id, &current_version)
        .await
        .ok()?;
    record_to_snapshot(&record, operators).ok()
}

/// Load the pinned + current snapshots and diff them. Pinned-load failures
/// surface (422 unpin / broken pin); a missing current collapses to pinned.
async fn diff_for_recipe(
    db: &impl Database,
    operators: &[OperatorDefinition],
    recipe: &RecipeRecord,
) -> Result<(String, RecipeProjection, nexus_recipe::RecipePinDiff), ApiError> {
    let pinned = load_workflow_snapshot(db, recipe, operators).await?;
    let workflow_id = pinned.workflow_id.clone();
    let current = load_current_snapshot(db, &workflow_id, operators)
        .await
        .unwrap_or_else(|| pinned.clone());
    let projection = projection_of(recipe)?;
    let diff = diff_recipe_pin(&projection, &pinned, &current);
    Ok((current.version, projection, diff))
}

pub async fn get_recipe_upgrade_preview(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<RecipePinDiffDto>, ApiError> {
    let operators = state.extension_registry.list_operators();
    let recipe = load_recipe(state.db.as_ref(), &id).await?;
    let (_, _, diff) = diff_for_recipe(state.db.as_ref(), &operators, &recipe).await?;
    Ok(ApiResponse::ok(RecipePinDiffDto::from(&diff)))
}

pub async fn upgrade_recipe(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<RecipeUpgradeResultDto>, ApiError> {
    let operators = state.extension_registry.list_operators();
    let recipe = load_recipe(state.db.as_ref(), &id).await?;
    let (current_version, projection, diff) =
        diff_for_recipe(state.db.as_ref(), &operators, &recipe).await?;

    if !diff.broken_bindings.is_empty() {
        return Ok(ApiResponse::ok(RecipeUpgradeResultDto {
            new_recipe_id: None,
            broken_bindings: diff
                .broken_bindings
                .iter()
                .map(BrokenBindingDto::from)
                .collect(),
        }));
    }

    let workflow_id = recipe
        .workflow_id
        .clone()
        .expect("pinned snapshot proved a workflow id");
    let source = MigrationSource {
        display_name: &recipe.display_name,
        summary: &recipe.summary,
        category: &recipe.category,
        recipe_version: &recipe.version,
        workflow_id: &workflow_id,
        projection: &projection,
    };
    let plan = build_migration_copy(&source, &current_version);
    let new = plan.new_recipe;
    let recipe_version = new.recipe_version.clone();
    let payload = RecipeWritePayloadDto {
        display_name: new.display_name,
        summary: new.summary,
        category: new.category,
        workflow_id: new.workflow_id,
        workflow_version: new.workflow_version,
        projection: new.projection,
    };
    let created =
        create_user_recipe(state.db.as_ref(), &operators, payload, &recipe_version).await?;

    Ok(ApiResponse::ok(RecipeUpgradeResultDto {
        new_recipe_id: Some(created.id),
        broken_bindings: Vec::new(),
    }))
}
