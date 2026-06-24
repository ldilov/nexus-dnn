//! GET /api/v1/recipes/{id}/form — the recipe projection plus per-control
//! schema hints resolved server-side from the bound operator's `config_schema`
//! (or workflow input-port type). Generic by `recipe_id` + `control_id` only:
//! zero extension-id literals, zero hardcoded node ids (enforced by
//! `tests/recipes_boundary_test.rs`). The binding grammar lives in
//! `nexus_recipe::parse_target`; this module never spells out a binding prefix.

use axum::extract::{Path, State};
use axum::http::StatusCode;
use nexus_extension::ExtensionRegistry;
use nexus_recipe::{BindingTarget, RecipeProjection, parse_target};
use nexus_storage::Database;
use nexus_workflow::WorkflowVersionSnapshot;

use crate::AppState;
use crate::dto::{ControlHintDto, RecipeFormDto};
use crate::envelope::ApiResponse;
use crate::error::ApiError;
use crate::handlers::workflow_versioning::record_to_snapshot;

/// Resolve one [`ControlHintDto`] per projection control. A control with no
/// binding (or a binding that does not resolve to a known node/operator/port)
/// yields a hint carrying only its `control_id`; constraint fields stay `None`.
/// Generic by `control_id` + path string — never panics on bad input.
pub fn resolve_control_hints(
    projection: &RecipeProjection,
    snapshot: &WorkflowVersionSnapshot,
) -> Vec<ControlHintDto> {
    projection
        .controls
        .iter()
        .map(|control| {
            let hint = control
                .bindings
                .first()
                .and_then(|binding| resolve_binding_hint(&control.control_id, binding, snapshot));
            hint.unwrap_or_else(|| empty_hint(&control.control_id))
        })
        .collect()
}

fn empty_hint(control_id: &str) -> ControlHintDto {
    ControlHintDto {
        control_id: control_id.to_string(),
        kind: None,
        min: None,
        max: None,
        step: None,
        enum_values: None,
        required: None,
    }
}

/// Resolve a single binding into a hint, or `None` when the target type, node,
/// operator, or schema property cannot be found (caller falls back to an empty
/// hint so every control still has an entry).
fn resolve_binding_hint(
    control_id: &str,
    binding: &str,
    snapshot: &WorkflowVersionSnapshot,
) -> Option<ControlHintDto> {
    let target = parse_target(binding).ok()?;
    match target {
        BindingTarget::Input(name) => resolve_input_hint(control_id, &name, snapshot),
        BindingTarget::NodeConfig { node_id, pointer } => {
            resolve_node_config_hint(control_id, &node_id, &pointer, snapshot)
        }
    }
}

/// An input-port binding lifts only `kind` from the port's declared type.
fn resolve_input_hint(
    control_id: &str,
    name: &str,
    snapshot: &WorkflowVersionSnapshot,
) -> Option<ControlHintDto> {
    let port = snapshot.workflow.inputs.iter().find(|p| p.name == name)?;
    Some(ControlHintDto {
        control_id: control_id.to_string(),
        kind: Some(port.port_type.clone()),
        min: None,
        max: None,
        step: None,
        enum_values: None,
        required: None,
    })
}

/// A node-config binding walks the bound operator's `config_schema` to the leaf
/// property at `pointer` and lifts its numeric/enum/type constraints.
fn resolve_node_config_hint(
    control_id: &str,
    node_id: &str,
    pointer: &[String],
    snapshot: &WorkflowVersionSnapshot,
) -> Option<ControlHintDto> {
    let node = snapshot.workflow.nodes.iter().find(|n| n.id == node_id)?;
    let (op_id, op_version) = node.operator.rsplit_once('@')?;
    let operator = snapshot
        .operators
        .iter()
        .find(|op| op.operator.id == op_id && op.operator.version == op_version)?;
    let schema = operator.config_schema.as_ref()?;
    let (leaf, required) = walk_pointer(schema, pointer)?;
    Some(hint_from_property(control_id, leaf, required))
}

/// Walk `properties.<seg>` repeatedly to reach the leaf property schema for
/// `pointer`. Returns the leaf schema and whether the leaf's name appears in
/// its parent object's `required` array.
fn walk_pointer<'a>(
    schema: &'a serde_json::Value,
    pointer: &[String],
) -> Option<(&'a serde_json::Value, bool)> {
    let mut current = schema;
    let mut required = false;
    for (idx, segment) in pointer.iter().enumerate() {
        let required_here = current
            .get("required")
            .and_then(|r| r.as_array())
            .map(|arr| arr.iter().any(|v| v.as_str() == Some(segment.as_str())))
            .unwrap_or(false);
        let next = current.get("properties")?.get(segment)?;
        current = next;
        if idx + 1 == pointer.len() {
            required = required_here;
        }
    }
    Some((current, required))
}

/// Lift `minimum`→min, `maximum`→max, `multipleOf`→step, `enum`→enum_values,
/// `type`→kind from a leaf property schema.
fn hint_from_property(
    control_id: &str,
    property: &serde_json::Value,
    required: bool,
) -> ControlHintDto {
    ControlHintDto {
        control_id: control_id.to_string(),
        kind: property
            .get("type")
            .and_then(|v| v.as_str())
            .map(str::to_string),
        min: property.get("minimum").and_then(serde_json::Value::as_f64),
        max: property.get("maximum").and_then(serde_json::Value::as_f64),
        step: property
            .get("multipleOf")
            .and_then(serde_json::Value::as_f64),
        enum_values: property
            .get("enum")
            .and_then(|v| v.as_array())
            .map(|arr| arr.to_vec()),
        required: Some(required),
    }
}

pub async fn get_recipe_form(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<RecipeFormDto>, ApiError> {
    let recipe = state.db.get_recipe(&id).await.map_err(|e| match e {
        nexus_storage::StorageError::NotFound { .. } => {
            ApiError::NotFound(format!("recipe {id} not found"))
        }
        other => ApiError::Internal(other.to_string()),
    })?;

    let pin_workflow_id = recipe.workflow_id.clone();
    let pin_workflow_version = recipe.workflow_version.clone();

    let projection = match recipe.projection.as_deref() {
        Some(json_str) => serde_json::from_str::<RecipeProjection>(json_str).map_err(|e| {
            ApiError::structured(
                StatusCode::UNPROCESSABLE_ENTITY,
                "RECIPE_PROJECTION_PARSE",
                format!("projection parse failed: {e}"),
            )
        })?,
        None => {
            return Ok(ApiResponse::ok(RecipeFormDto {
                projection: RecipeProjection::empty(),
                control_hints: Vec::new(),
                workflow_id: pin_workflow_id,
                workflow_version: pin_workflow_version,
            }));
        }
    };

    if projection.controls.is_empty() {
        return Ok(ApiResponse::ok(RecipeFormDto {
            projection,
            control_hints: Vec::new(),
            workflow_id: pin_workflow_id,
            workflow_version: pin_workflow_version,
        }));
    }

    let workflow_id = recipe.workflow_id.ok_or_else(|| {
        ApiError::structured(
            StatusCode::UNPROCESSABLE_ENTITY,
            "RECIPE_BROKEN_PIN",
            "recipe has no pinned workflow_id",
        )
    })?;
    let workflow_version = recipe.workflow_version.ok_or_else(|| {
        ApiError::structured(
            StatusCode::UNPROCESSABLE_ENTITY,
            "RECIPE_BROKEN_PIN",
            "recipe has no pinned workflow_version",
        )
    })?;

    let record = state
        .db
        .get_workflow_version(&workflow_id, &workflow_version)
        .await
        .map_err(|_| {
            ApiError::structured(
                StatusCode::UNPROCESSABLE_ENTITY,
                "RECIPE_BROKEN_PIN",
                format!("pinned version {workflow_version} of workflow {workflow_id} not found"),
            )
        })?;
    let operators = state.extension_registry.list_operators();
    let snapshot = record_to_snapshot(&record, &operators).map_err(|e| {
        ApiError::structured(
            StatusCode::UNPROCESSABLE_ENTITY,
            "RECIPE_BROKEN_PIN",
            format!("snapshot assembly failed: {e}"),
        )
    })?;

    let control_hints = resolve_control_hints(&projection, &snapshot);
    Ok(ApiResponse::ok(RecipeFormDto {
        projection,
        control_hints,
        workflow_id: pin_workflow_id,
        workflow_version: pin_workflow_version,
    }))
}
