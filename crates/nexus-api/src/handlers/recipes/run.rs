//! POST /api/v1/recipes/{id}/run — validate + compile a recipe, then submit it
//! as a run. Generic by `recipe_id` only: zero extension-id literals, zero
//! hardcoded node ids (enforced by `tests/recipes_boundary_test.rs`).

use axum::Json;
use axum::extract::{Path, State};
use axum::http::StatusCode;
use nexus_extension::{ExtensionRegistry, OperatorDefinition};
use nexus_recipe::{BindingError, ControlValues, RecipeProjection, compile_recipe_run};
use nexus_storage::{Database, RecipeRecord};
use nexus_workflow::WorkflowVersionSnapshot;
use serde::Deserialize;

use crate::AppState;
use crate::dto::CreateRunResponseDto;
use crate::envelope::ApiResponse;
use crate::error::ApiError;
use crate::handlers::workflow_versioning::record_to_snapshot;

#[derive(Debug, Deserialize)]
pub struct RunRecipeBody {
    #[serde(default)]
    pub control_values: serde_json::Value,
    pub preset_id: Option<String>,
}

/// Pure resolution + compile step, separated for unit-testability without a
/// full run engine. The handler wraps this with `create_run_from_resolved` +
/// fire-and-forget `execute_run`.
pub async fn resolve_and_compile(
    db: &impl Database,
    operators: &[OperatorDefinition],
    recipe_id: &str,
    control_values: &ControlValues,
    preset_id: Option<&str>,
) -> Result<nexus_recipe::ResolvedRun, ApiError> {
    let recipe = db.get_recipe(recipe_id).await.map_err(|e| match e {
        nexus_storage::StorageError::NotFound { .. } => {
            ApiError::NotFound(format!("recipe {recipe_id} not found"))
        }
        other => ApiError::Internal(other.to_string()),
    })?;

    let projection = match recipe.projection.as_deref() {
        Some(json_str) => serde_json::from_str::<RecipeProjection>(json_str).map_err(|e| {
            ApiError::structured(
                StatusCode::UNPROCESSABLE_ENTITY,
                "RECIPE_PROJECTION_PARSE",
                format!("projection parse failed: {e}"),
            )
        })?,
        None => RecipeProjection::empty(),
    };

    let snapshot = load_workflow_snapshot(db, &recipe, operators).await?;

    compile_recipe_run(&projection, &snapshot, control_values, preset_id)
        .map_err(binding_error_to_api)
}

/// Resolve a recipe's pinned workflow-version into a [`WorkflowVersionSnapshot`]
/// (recipe pin -> `get_workflow_version` -> `record_to_snapshot`). Shared by
/// `resolve_and_compile` and the user-preset save-gate so both surfaces map the
/// same RECIPE_UNPIN / RECIPE_BROKEN_PIN codes. Never head-falls-back.
pub(crate) async fn load_workflow_snapshot(
    db: &impl Database,
    record: &RecipeRecord,
    operators: &[OperatorDefinition],
) -> Result<WorkflowVersionSnapshot, ApiError> {
    let workflow_id = record.workflow_id.as_deref().ok_or_else(|| {
        ApiError::structured(
            StatusCode::UNPROCESSABLE_ENTITY,
            "RECIPE_UNPIN",
            "recipe has no pinned workflow_id",
        )
    })?;
    let workflow_version = record.workflow_version.as_deref().ok_or_else(|| {
        ApiError::structured(
            StatusCode::UNPROCESSABLE_ENTITY,
            "RECIPE_UNPIN",
            "recipe has no pinned workflow_version",
        )
    })?;
    let version = db
        .get_workflow_version(workflow_id, workflow_version)
        .await
        .map_err(|_| {
            ApiError::structured(
                StatusCode::UNPROCESSABLE_ENTITY,
                "RECIPE_BROKEN_PIN",
                format!("pinned version {workflow_version} of workflow {workflow_id} not found"),
            )
        })?;
    record_to_snapshot(&version, operators).map_err(|e| {
        ApiError::structured(
            StatusCode::UNPROCESSABLE_ENTITY,
            "RECIPE_BROKEN_PIN",
            format!("snapshot assembly failed: {e}"),
        )
    })
}

/// Map a [`BindingError`] to a structured 422 response carrying the variant
/// name + message (CONTRACTS C4). Shared with the deployment recipe-run route.
pub(crate) fn binding_error_to_api(err: BindingError) -> ApiError {
    let code = match &err {
        BindingError::UnknownControl { .. } => "BINDING_UNKNOWN_CONTROL",
        BindingError::DuplicateControl { .. } => "BINDING_DUPLICATE_CONTROL",
        BindingError::UnknownPreset { .. } => "BINDING_UNKNOWN_PRESET",
        BindingError::LockedOverride { .. } => "BINDING_LOCKED_OVERRIDE",
        BindingError::HiddenControlNotSettable { .. } => "BINDING_HIDDEN_CONTROL",
        BindingError::UnknownTarget { .. } => "BINDING_UNKNOWN_TARGET",
        BindingError::PathResolveFailed { .. } => "BINDING_PATH_RESOLVE",
        BindingError::TypeMismatch { .. } => "BINDING_TYPE_MISMATCH",
        BindingError::SchemaViolation { .. } => "BINDING_SCHEMA_VIOLATION",
        BindingError::OperatorSchemaDrift { .. } => "BINDING_OPERATOR_SCHEMA_DRIFT",
        BindingError::MissingRequired { .. } => "BINDING_MISSING_REQUIRED",
        BindingError::Workflow(_) => "BINDING_WORKFLOW_ERROR",
    };
    ApiError::structured(StatusCode::UNPROCESSABLE_ENTITY, code, err.to_string())
}

pub async fn run_recipe(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(body): Json<RunRecipeBody>,
) -> Result<ApiResponse<CreateRunResponseDto>, ApiError> {
    let operators = state.extension_registry.list_operators();

    let control_values: ControlValues = body
        .control_values
        .as_object()
        .map(|m| m.iter().map(|(k, v)| (k.clone(), v.clone())).collect())
        .unwrap_or_default();

    let resolved = resolve_and_compile(
        state.db.as_ref(),
        &operators,
        &id,
        &control_values,
        body.preset_id.as_deref(),
    )
    .await?;

    let run_id = state
        .run_engine
        .create_run_from_resolved(&resolved)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let engine = state.run_engine.clone();
    let rid = run_id.clone();
    tokio::spawn(async move {
        if let Err(e) = engine.execute_run(&rid).await {
            tracing::error!(run_id = %rid, error = %e, "recipe run execution failed");
        }
    });

    Ok(ApiResponse::created(CreateRunResponseDto {
        run_id,
        status: "created".to_owned(),
        predecessor_run_id: None,
    }))
}
