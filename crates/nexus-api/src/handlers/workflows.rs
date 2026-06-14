use axum::Json;
use axum::extract::{Path, State};
use chrono::Utc;
use serde::Serialize;
use std::collections::HashMap;

use nexus_extension::ExtensionRegistry;
use nexus_storage::Database;
use nexus_storage::records::WorkflowRecord;
use nexus_workflow::{NodeInput, NodeInstance, OutputBinding, Stage, Workflow, WorkflowPort};
use ts_rs::TS;

use crate::AppState;
use crate::dto::{
    CanvasStateDto, ListResponseDto, WorkflowDto, WorkflowUpdatePayloadDto,
    WorkflowValidationErrorDto,
};
use crate::envelope::ApiResponse;
use crate::error::ApiError;

#[derive(Debug, Serialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct WorkflowValidationResponseDto {
    pub valid: bool,
    pub node_count: usize,
    pub stage_count: usize,
    pub input_count: usize,
    pub output_count: usize,
    pub errors: Vec<String>,
    pub warnings: Vec<String>,
}

#[derive(Debug, Serialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct WorkflowMutationResponseDto {
    pub id: String,
    pub title: String,
    pub version: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub updated_at: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub predecessor_run_id: Option<String>,
}

#[derive(Debug, Serialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct WorkflowDeleteResponseDto {
    pub deleted: String,
}

pub async fn validate_workflow_only(
    State(state): State<AppState>,
    body: String,
) -> Result<ApiResponse<WorkflowValidationResponseDto>, ApiError> {
    let workflow = match nexus_workflow::parse_workflow(&body) {
        Ok(w) => w,
        Err(e) => {
            return Ok(ApiResponse::ok(WorkflowValidationResponseDto {
                valid: false,
                node_count: 0,
                stage_count: 0,
                input_count: 0,
                output_count: 0,
                errors: vec![e.to_string()],
                warnings: Vec::new(),
            }));
        }
    };

    let operators = state.extension_registry.list_operators();
    let mut errors = Vec::new();

    if let Err(e) = nexus_workflow::validate_workflow(&workflow, &operators) {
        errors.push(e.to_string());
    }

    Ok(ApiResponse::ok(WorkflowValidationResponseDto {
        valid: errors.is_empty(),
        node_count: workflow.nodes.len(),
        stage_count: workflow.stages.len(),
        input_count: workflow.inputs.len(),
        output_count: workflow.outputs.len(),
        errors,
        warnings: Vec::new(),
    }))
}

pub async fn update_workflow(
    State(state): State<AppState>,
    Path(id): Path<String>,
    body: String,
) -> Result<ApiResponse<WorkflowMutationResponseDto>, ApiError> {
    let _existing = state
        .db
        .get_workflow(&id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;

    let workflow =
        nexus_workflow::parse_workflow(&body).map_err(|e| ApiError::BadRequest(e.to_string()))?;

    let operators = state.extension_registry.list_operators();
    nexus_workflow::validate_workflow(&workflow, &operators)
        .map_err(|e| ApiError::BadRequest(e.to_string()))?;

    let now = Utc::now().to_rfc3339();

    let record = build_workflow_record(&workflow, &now)?;

    state
        .db
        .update_workflow(&record)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    Ok(ApiResponse::ok(WorkflowMutationResponseDto {
        id: workflow.id,
        title: workflow.title,
        version: workflow.version,
        updated_at: Some(now),
        predecessor_run_id: None,
    }))
}

pub async fn create_workflow(
    State(state): State<AppState>,
    body: String,
) -> Result<ApiResponse<WorkflowMutationResponseDto>, ApiError> {
    let workflow =
        nexus_workflow::parse_workflow(&body).map_err(|e| ApiError::BadRequest(e.to_string()))?;

    let operators = state.extension_registry.list_operators();

    nexus_workflow::validate_workflow(&workflow, &operators)
        .map_err(|e| ApiError::BadRequest(e.to_string()))?;

    let now = Utc::now().to_rfc3339();
    let record = build_workflow_record(&workflow, &now)?;

    state
        .db
        .insert_workflow(&record)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let author = match &record.extension_id {
        Some(id) => nexus_storage::versioning::VersionAuthor::Extension {
            id: id.clone(),
            version: record.extension_version.clone().unwrap_or_default(),
        },
        None => nexus_storage::versioning::VersionAuthor::User,
    };
    if let Ok(nv) = crate::workflow_versioning::new_version_from(&workflow, &record, author) {
        let _ = nexus_storage::versioning::record_version_if_changed(
            &*state.db,
            &workflow.id,
            nv,
            &now,
        )
        .await;
    }

    Ok(ApiResponse::created(WorkflowMutationResponseDto {
        id: workflow.id,
        title: workflow.title,
        version: workflow.version,
        updated_at: None,
        predecessor_run_id: None,
    }))
}

pub async fn list_workflows(
    State(state): State<AppState>,
) -> Result<ApiResponse<ListResponseDto<WorkflowDto>>, ApiError> {
    let workflows = state
        .db
        .list_workflows()
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let items = workflows.iter().map(WorkflowDto::from).collect();
    Ok(ApiResponse::ok(ListResponseDto { items }))
}

pub async fn get_workflow(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<WorkflowDto>, ApiError> {
    let record = state
        .db
        .get_workflow(&id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;

    Ok(ApiResponse::ok(WorkflowDto::from(&record)))
}

pub async fn delete_workflow(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<WorkflowDeleteResponseDto>, ApiError> {
    state
        .db
        .delete_workflow(&id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;

    Ok(ApiResponse::ok(WorkflowDeleteResponseDto { deleted: id }))
}

/// `PUT /workflows/:id/graph` — save a user-edited graph. Validates against
/// the authoritative `nexus_workflow::validate_workflow` before writing, and
/// stamps `user_edited_at` so boot-time re-persistence leaves the row alone.
pub async fn update_workflow_graph(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(payload): Json<WorkflowUpdatePayloadDto>,
) -> Result<ApiResponse<WorkflowDto>, ApiError> {
    let existing = state
        .db
        .get_workflow(&id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;

    let workflow = payload_to_workflow(&id, &existing, &payload)?;

    let operators = state.extension_registry.list_operators();
    if let Err(e) = nexus_workflow::validate_workflow(&workflow, &operators) {
        return Err(ApiError::BadRequest(e.to_string()));
    }

    let now = Utc::now().to_rfc3339();
    let mut record = build_workflow_record(&workflow, &now)?;
    record.created_at = existing.created_at.clone();
    record.user_edited_at = Some(now.clone());
    record.extension_id = existing.extension_id.clone();
    record.extension_version = existing.extension_version.clone();
    record.extension_version_first_seen = existing.extension_version_first_seen.clone();

    state
        .db
        .update_workflow(&record)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let author = nexus_storage::versioning::VersionAuthor::User;
    if let Ok(nv) = crate::workflow_versioning::new_version_from(&workflow, &record, author) {
        let _ =
            nexus_storage::versioning::record_version_if_changed(&*state.db, &id, nv, &now).await;
    }

    let fresh = state
        .db
        .get_workflow(&id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    Ok(ApiResponse::ok(WorkflowDto::from(&fresh)))
}

/// `POST /workflows/:id/revert` — clear the user-edit stamp and re-point the
/// head to the latest extension-authored version so the workflow reflects the
/// shipped graph again. When no extension version exists the stamp is cleared
/// without moving the head.
pub async fn revert_workflow(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<WorkflowDto>, ApiError> {
    state
        .db
        .clear_workflow_user_edit(&id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let versions = state
        .db
        .list_workflow_versions(&id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    if let Some(latest_ext) = versions.iter().rfind(|v| v.author_kind == "extension") {
        let now = Utc::now().to_rfc3339();
        state
            .db
            .set_workflow_current_version(&id, &latest_ext.version, &now)
            .await
            .map_err(|e| ApiError::Internal(e.to_string()))?;
    }

    let fresh = state
        .db
        .get_workflow(&id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;

    Ok(ApiResponse::ok(WorkflowDto::from(&fresh)))
}

/// `POST /workflows/validate` — structural validation over a pending draft,
/// without touching the database. Used by the editor to keep the Save button
/// in sync with the server's rules.
pub async fn validate_workflow_payload(
    State(state): State<AppState>,
    Json(payload): Json<WorkflowUpdatePayloadDto>,
) -> Result<ApiResponse<WorkflowValidationResponseDto>, ApiError> {
    let placeholder = WorkflowRecord {
        id: "__validate__".to_owned(),
        title: payload.title.clone(),
        version: payload.version.clone(),
        inputs: None,
        outputs: None,
        nodes: "[]".into(),
        edges: "[]".into(),
        stages: None,
        created_at: String::new(),
        updated_at: String::new(),
        user_edited_at: None,
        extension_id: None,
        extension_version: None,
        extension_version_first_seen: None,
    };
    let workflow = match payload_to_workflow("__validate__", &placeholder, &payload) {
        Ok(w) => w,
        Err(e) => {
            return Ok(ApiResponse::ok(WorkflowValidationResponseDto {
                valid: false,
                node_count: 0,
                stage_count: 0,
                input_count: 0,
                output_count: 0,
                errors: vec![e.to_string()],
                warnings: Vec::new(),
            }));
        }
    };

    let operators = state.extension_registry.list_operators();
    let mut errors = Vec::new();
    if let Err(e) = nexus_workflow::validate_workflow(&workflow, &operators) {
        errors.push(e.to_string());
    }

    Ok(ApiResponse::ok(WorkflowValidationResponseDto {
        valid: errors.is_empty(),
        node_count: workflow.nodes.len(),
        stage_count: workflow.stages.len(),
        input_count: workflow.inputs.len(),
        output_count: workflow.outputs.len(),
        errors,
        warnings: Vec::new(),
    }))
}

/// Convert the UI payload into the canonical execution model. Preserves
/// metadata (id, created_at) from the existing row so we don't accidentally
/// rewrite them.
fn payload_to_workflow(
    id: &str,
    existing: &WorkflowRecord,
    payload: &WorkflowUpdatePayloadDto,
) -> Result<Workflow, ApiError> {
    let inputs: Vec<WorkflowPort> = payload
        .inputs
        .iter()
        .map(|p| WorkflowPort {
            name: p.name.clone(),
            port_type: p.port_type.clone(),
        })
        .collect();

    let outputs: Vec<OutputBinding> = payload
        .outputs
        .iter()
        .map(|o| OutputBinding {
            name: o.name.clone(),
            from: o.from.clone(),
        })
        .collect();

    let nodes: Vec<NodeInstance> = payload
        .nodes
        .iter()
        .map(|n| {
            let mut inputs_map: HashMap<String, NodeInput> = HashMap::new();
            for (port, dto) in &n.inputs {
                let serialized =
                    serde_json::to_value(dto).map_err(|e| ApiError::BadRequest(e.to_string()))?;
                let parsed: NodeInput = serde_json::from_value(serialized)
                    .map_err(|e| ApiError::BadRequest(e.to_string()))?;
                inputs_map.insert(port.clone(), parsed);
            }
            Ok::<_, ApiError>(NodeInstance {
                id: n.id.clone(),
                operator: n.operator.clone(),
                stage: n.stage.clone(),
                inputs: inputs_map,
                config: n.config.clone(),
            })
        })
        .collect::<Result<_, _>>()?;

    let stages: Vec<Stage> = payload
        .stages
        .iter()
        .map(|s| Stage {
            id: s.id.clone(),
            label: s.label.clone(),
        })
        .collect();

    Ok(Workflow {
        id: id.to_owned(),
        title: payload.title.clone(),
        version: payload.version.clone(),
        inputs,
        outputs,
        nodes,
        stages,
        created_at: existing.created_at.clone(),
        updated_at: Utc::now().to_rfc3339(),
    })
}

#[allow(dead_code)]
fn _force_export(_: WorkflowValidationErrorDto) {}

/// `GET /workflows/:id/canvas` — returns the persisted canvas-state JSON
/// (notes, reroutes, node positions). Missing row → empty default.
pub async fn get_workflow_canvas(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<CanvasStateDto>, ApiError> {
    let _ = state
        .db
        .get_workflow(&id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;
    let raw = state
        .db
        .get_canvas_state(&id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    let dto: CanvasStateDto = match raw {
        Some(payload) => serde_json::from_str(&payload)
            .map_err(|e| ApiError::Internal(format!("canvas state parse: {e}")))?,
        None => CanvasStateDto::default(),
    };
    Ok(ApiResponse::ok(dto))
}

/// `PUT /workflows/:id/canvas` — replace the persisted canvas state.
pub async fn put_workflow_canvas(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(mut payload): Json<CanvasStateDto>,
) -> Result<ApiResponse<CanvasStateDto>, ApiError> {
    let _ = state
        .db
        .get_workflow(&id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;
    let now = Utc::now().to_rfc3339();
    payload.updated_at = Some(now.clone());
    let body = serde_json::to_string(&payload)
        .map_err(|e| ApiError::Internal(format!("serialize canvas state: {e}")))?;
    state
        .db
        .set_canvas_state(&id, &body, &now)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    Ok(ApiResponse::ok(payload))
}

fn build_workflow_record(
    workflow: &nexus_workflow::Workflow,
    now: &str,
) -> Result<WorkflowRecord, ApiError> {
    let edge_values: Vec<serde_json::Value> = workflow
        .extract_edges()
        .iter()
        .map(|e| {
            serde_json::json!({
                "source_node": e.source_node,
                "source_port": e.source_port,
                "target_node": e.target_node,
                "target_port": e.target_port,
            })
        })
        .collect();

    Ok(WorkflowRecord {
        id: workflow.id.clone(),
        title: workflow.title.clone(),
        version: workflow.version.clone(),
        inputs: Some(
            serde_json::to_string(&workflow.inputs)
                .map_err(|e| ApiError::Internal(e.to_string()))?,
        ),
        outputs: Some(
            serde_json::to_string(&workflow.outputs)
                .map_err(|e| ApiError::Internal(e.to_string()))?,
        ),
        nodes: serde_json::to_string(&workflow.nodes)
            .map_err(|e| ApiError::Internal(e.to_string()))?,
        edges: serde_json::to_string(&edge_values)
            .map_err(|e| ApiError::Internal(e.to_string()))?,
        stages: Some(
            serde_json::to_string(&workflow.stages)
                .map_err(|e| ApiError::Internal(e.to_string()))?,
        ),
        created_at: now.to_owned(),
        updated_at: now.to_owned(),
        user_edited_at: None,
        extension_id: None,
        extension_version: None,
        extension_version_first_seen: None,
    })
}
