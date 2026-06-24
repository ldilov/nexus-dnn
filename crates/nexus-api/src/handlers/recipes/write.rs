//! Recipe write API (P6): POST /recipes, PUT /recipes/{id}, DELETE /recipes/{id}.
//! User-authored recipes only — PUT/DELETE never mutate extension recipes (the
//! storage ops are scoped to `author_kind='user'`). Every save routes its
//! projection + presets through `compile_recipe_run` against the pinned
//! workflow-version snapshot, so a broken binding rejects the save (422) and
//! nothing persists. Generic by id + path string: no extension-id literals,
//! no node-id shapes (enforced by `tests/recipes_boundary_test.rs`).

use axum::Json;
use axum::extract::{Path, State};
use axum::http::StatusCode;
use nexus_extension::{ExtensionRegistry, OperatorDefinition};
use nexus_recipe::{ControlValues, RecipeProjection, assess_status, compile_recipe_run};
use nexus_storage::{Database, RecipeRecord, StorageError};
use nexus_workflow::WorkflowVersionSnapshot;

use crate::AppState;
use crate::dto::{RecipeDto, RecipeWritePayloadDto};
use crate::envelope::ApiResponse;
use crate::error::ApiError;
use crate::handlers::workflow_versioning::record_to_snapshot;

use super::run::binding_error_to_api;

/// Load the pinned workflow-version snapshot a recipe write targets. A missing
/// version or a snapshot that fails to assemble is a 422 broken-pin — a user
/// recipe must pin a resolvable version.
async fn load_pinned_snapshot(
    db: &impl Database,
    operators: &[OperatorDefinition],
    workflow_id: &str,
    workflow_version: &str,
) -> Result<WorkflowVersionSnapshot, ApiError> {
    let record = db
        .get_workflow_version(workflow_id, workflow_version)
        .await
        .map_err(|e| match e {
            StorageError::NotFound { .. } => ApiError::structured(
                StatusCode::UNPROCESSABLE_ENTITY,
                "RECIPE_BROKEN_PIN",
                format!("pinned version {workflow_version} of workflow {workflow_id} not found"),
            ),
            other => ApiError::Internal(other.to_string()),
        })?;
    record_to_snapshot(&record, operators).map_err(|e| {
        ApiError::structured(
            StatusCode::UNPROCESSABLE_ENTITY,
            "RECIPE_BROKEN_PIN",
            format!("snapshot assembly failed: {e}"),
        )
    })
}

/// Best-effort snapshot load (current-version side) used only for status
/// currency; resolution failures collapse to `None` (treated as current).
async fn try_load_snapshot(
    db: &impl Database,
    operators: &[OperatorDefinition],
    workflow_id: &str,
    workflow_version: &str,
) -> Option<WorkflowVersionSnapshot> {
    let record = db
        .get_workflow_version(workflow_id, workflow_version)
        .await
        .ok()?;
    record_to_snapshot(&record, operators).ok()
}

/// Save-gate (OR-1, CONTRACTS C4): compile the projection's defaults run and
/// every preset against the pinned snapshot. Any `BindingError` → 422; nothing
/// is persisted. Presets are selected by id so they may legally set
/// locked/hidden controls.
fn validate_projection(
    projection: &RecipeProjection,
    snapshot: &WorkflowVersionSnapshot,
) -> Result<(), ApiError> {
    compile_recipe_run(projection, snapshot, &ControlValues::new(), None)
        .map_err(binding_error_to_api)?;
    for preset in &projection.presets {
        compile_recipe_run(
            projection,
            snapshot,
            &ControlValues::new(),
            Some(&preset.preset_id),
        )
        .map_err(binding_error_to_api)?;
    }
    Ok(())
}

/// Cached compatibility verdict for a freshly written recipe: the pin vs the
/// workflow's current head, plus binding/drift checks (CONTRACTS C6).
async fn assess_recipe_status(
    db: &impl Database,
    operators: &[OperatorDefinition],
    workflow_id: &str,
    workflow_version: &str,
    projection: &RecipeProjection,
    pinned: &WorkflowVersionSnapshot,
) -> (String, Option<String>) {
    let current_version = match db.get_current_version(workflow_id).await {
        Ok(cv) => cv,
        Err(e) => {
            tracing::warn!(workflow_id, error = %e, "current-version lookup failed; treating pin as current");
            None
        }
    };
    let current_snapshot = match current_version {
        Some(ref cv) if cv != workflow_version => {
            try_load_snapshot(db, operators, workflow_id, cv).await
        }
        _ => None,
    };
    let (status, reason) = assess_status(
        projection,
        Some(pinned),
        current_snapshot.as_ref(),
        operators,
    );
    (status.as_str().to_string(), reason)
}

/// Typed in-process create path (CONTRACTS C8). Takes an already-parsed
/// `RecipeProjection` so P8 migrate/import can call it without a JSON
/// round-trip. Loads the pin, validates, computes status, and inserts an
/// `author_kind='user'` row. Returns the persisted record.
pub async fn create_user_recipe(
    db: &impl Database,
    operators: &[OperatorDefinition],
    payload: RecipeWritePayloadDto,
) -> Result<RecipeRecord, ApiError> {
    let snapshot = load_pinned_snapshot(
        db,
        operators,
        &payload.workflow_id,
        &payload.workflow_version,
    )
    .await?;
    validate_projection(&payload.projection, &snapshot)?;
    let (status, status_reason) = assess_recipe_status(
        db,
        operators,
        &payload.workflow_id,
        &payload.workflow_version,
        &payload.projection,
        &snapshot,
    )
    .await;

    let projection_json = serde_json::to_string(&payload.projection)
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    let schema_version = i64::from(payload.projection.schema_version);

    let record = RecipeRecord {
        id: uuid::Uuid::new_v4().to_string(),
        version: "1.0.0".to_string(),
        display_name: payload.display_name,
        summary: payload.summary,
        category: payload.category,
        extension_id: None,
        extension_version: None,
        workflow_template_ref: String::new(),
        thumbnail: None,
        input_summary: None,
        bindings: "{}".to_string(),
        created_at: chrono::Utc::now().to_rfc3339(),
        workflow_id: Some(payload.workflow_id),
        workflow_version: Some(payload.workflow_version),
        projection: Some(projection_json),
        projection_schema_version: schema_version,
        status,
        status_reason,
        author_kind: "user".to_string(),
    };
    db.insert_recipe(&record)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    Ok(record)
}

/// Apply a builder edit to an existing user recipe. Loads the row (404),
/// rejects a non-user recipe (403), validates, and writes through the
/// `author_kind='user'`-scoped storage op.
async fn apply_recipe_update(
    db: &impl Database,
    operators: &[OperatorDefinition],
    id: &str,
    payload: RecipeWritePayloadDto,
) -> Result<RecipeRecord, ApiError> {
    let existing = db.get_recipe(id).await.map_err(|e| match e {
        StorageError::NotFound { .. } => ApiError::NotFound(format!("recipe {id} not found")),
        other => ApiError::Internal(other.to_string()),
    })?;
    if existing.author_kind != "user" {
        return Err(ApiError::structured(
            StatusCode::FORBIDDEN,
            "RECIPE_NOT_USER_AUTHORED",
            "only user-authored recipes may be edited",
        ));
    }

    let snapshot = load_pinned_snapshot(
        db,
        operators,
        &payload.workflow_id,
        &payload.workflow_version,
    )
    .await?;
    validate_projection(&payload.projection, &snapshot)?;
    let (status, status_reason) = assess_recipe_status(
        db,
        operators,
        &payload.workflow_id,
        &payload.workflow_version,
        &payload.projection,
        &snapshot,
    )
    .await;

    let projection_json = serde_json::to_string(&payload.projection)
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    let schema_version = i64::from(payload.projection.schema_version);

    let record = RecipeRecord {
        id: existing.id,
        version: existing.version,
        display_name: payload.display_name,
        summary: payload.summary,
        category: payload.category,
        extension_id: None,
        extension_version: None,
        workflow_template_ref: existing.workflow_template_ref,
        thumbnail: existing.thumbnail,
        input_summary: existing.input_summary,
        bindings: existing.bindings,
        created_at: existing.created_at,
        workflow_id: Some(payload.workflow_id),
        workflow_version: Some(payload.workflow_version),
        projection: Some(projection_json),
        projection_schema_version: schema_version,
        status,
        status_reason,
        author_kind: "user".to_string(),
    };
    db.update_user_recipe(&record).await.map_err(|e| match e {
        StorageError::NotFound { .. } => ApiError::NotFound(format!("user recipe {id} not found")),
        other => ApiError::Internal(other.to_string()),
    })?;
    Ok(record)
}

pub async fn create_recipe(
    State(state): State<AppState>,
    Json(payload): Json<RecipeWritePayloadDto>,
) -> Result<ApiResponse<RecipeDto>, ApiError> {
    let operators = state.extension_registry.list_operators();
    let record = create_user_recipe(state.db.as_ref(), &operators, payload).await?;
    Ok(ApiResponse::created(RecipeDto::from(&record)))
}

pub async fn update_recipe(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(payload): Json<RecipeWritePayloadDto>,
) -> Result<ApiResponse<RecipeDto>, ApiError> {
    let operators = state.extension_registry.list_operators();
    let record = apply_recipe_update(state.db.as_ref(), &operators, &id, payload).await?;
    Ok(ApiResponse::ok(RecipeDto::from(&record)))
}

pub async fn delete_recipe(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<()>, ApiError> {
    state
        .db
        .delete_user_recipe(&id)
        .await
        .map_err(|e| match e {
            StorageError::NotFound { .. } => {
                ApiError::NotFound(format!("user recipe {id} not found"))
            }
            other => ApiError::Internal(other.to_string()),
        })?;
    Ok(ApiResponse::no_content())
}
