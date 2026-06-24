//! GET /api/v1/workflows/{id}/versions/{version}/exposable-targets — the
//! inventory of binding targets a recipe author may expose for a pinned
//! workflow version: every input port plus every node-config leaf with its
//! operator sub-schema. Generic by id + path string only: zero extension-id
//! literals, zero hardcoded node ids (enforced by `tests/recipes_boundary_test.rs`).
//! Binding strings are assembled in `nexus_recipe`, never spelled here.

use axum::extract::{Path, State};
use axum::http::StatusCode;
use nexus_extension::ExtensionRegistry;
use nexus_recipe::BindingTarget;
use nexus_storage::Database;
use nexus_workflow::{NodeInstance, WorkflowVersionSnapshot};

use crate::AppState;
use crate::dto::{ExposableTargetDto, ExposableTargetsResponseDto};
use crate::envelope::ApiResponse;
use crate::error::ApiError;
use crate::handlers::workflow_versioning::record_to_snapshot;

/// Read a node's current config value at a top-level `key`, if present. The
/// `config` field is bound to a local first so no node-id-shaped path literal
/// appears in this source (boundary discipline).
fn node_default<'a>(instance: &'a NodeInstance, key: &str) -> Option<&'a serde_json::Value> {
    let cfg = &instance.config;
    cfg.as_ref().and_then(|obj| obj.get(key))
}

/// Pure scan: enumerate the exposable targets of a pinned workflow snapshot.
/// One input target per declared input port; one node-config target per
/// top-level property in each node's operator `config_schema`. Nodes whose
/// operator is unknown or schemaless contribute no node-config targets.
pub fn scan_exposable_targets(snapshot: &WorkflowVersionSnapshot) -> ExposableTargetsResponseDto {
    let inputs = snapshot
        .workflow
        .inputs
        .iter()
        .map(|port| {
            let target = BindingTarget::Input(port.name.clone()).to_target_string();
            ExposableTargetDto {
                target,
                kind: "input".to_string(),
                label: port.name.clone(),
                schema: None,
                node_id: None,
                port_type: Some(port.port_type.clone()),
                required: false,
                current_default: None,
            }
        })
        .collect();

    let mut node_configs = Vec::new();
    for instance in &snapshot.workflow.nodes {
        scan_node_config_targets(snapshot, instance, &mut node_configs);
    }

    ExposableTargetsResponseDto {
        workflow_id: snapshot.workflow_id.clone(),
        workflow_version: snapshot.version.clone(),
        inputs,
        node_configs,
    }
}

/// Append one node-config target per top-level `config_schema` property of the
/// node's resolved operator. No-op when the operator or its schema is absent.
fn scan_node_config_targets(
    snapshot: &WorkflowVersionSnapshot,
    instance: &NodeInstance,
    out: &mut Vec<ExposableTargetDto>,
) {
    let Some((op_id, op_version)) = instance.operator.rsplit_once('@') else {
        return;
    };
    let Some(operator) = snapshot
        .operators
        .iter()
        .find(|op| op.operator.id == op_id && op.operator.version == op_version)
    else {
        return;
    };
    let Some(schema) = operator.config_schema.as_ref() else {
        return;
    };
    let Some(properties) = schema.get("properties").and_then(|p| p.as_object()) else {
        return;
    };

    let required = schema
        .get("required")
        .and_then(|r| r.as_array())
        .map(|arr| {
            arr.iter()
                .filter_map(|v| v.as_str())
                .collect::<std::collections::HashSet<_>>()
        })
        .unwrap_or_default();

    for (key, property) in properties {
        let target = BindingTarget::NodeConfig {
            node_id: instance.id.clone(),
            pointer: vec![key.clone()],
        }
        .to_target_string();
        let current_default = node_default(instance, key)
            .cloned()
            .or_else(|| property.get("default").cloned());
        out.push(ExposableTargetDto {
            target,
            kind: "node_config".to_string(),
            label: key.clone(),
            schema: Some(property.clone()),
            node_id: Some(instance.id.clone()),
            port_type: None,
            required: required.contains(key.as_str()),
            current_default,
        });
    }
}

pub async fn get_exposable_targets(
    State(state): State<AppState>,
    Path((workflow_id, version)): Path<(String, String)>,
) -> Result<ApiResponse<ExposableTargetsResponseDto>, ApiError> {
    let record = state
        .db
        .get_workflow_version(&workflow_id, &version)
        .await
        .map_err(|_| {
            ApiError::NotFound(format!(
                "workflow version {version} of {workflow_id} not found"
            ))
        })?;
    let operators = state.extension_registry.list_operators();
    let snapshot = record_to_snapshot(&record, &operators).map_err(|e| {
        ApiError::structured(
            StatusCode::UNPROCESSABLE_ENTITY,
            "WORKFLOW_VERSION_BROKEN",
            format!("snapshot assembly failed: {e}"),
        )
    })?;

    Ok(ApiResponse::ok(scan_exposable_targets(&snapshot)))
}
