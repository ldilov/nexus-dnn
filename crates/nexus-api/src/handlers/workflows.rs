use axum::extract::{Path, State};
use chrono::Utc;

use nexus_extension::ExtensionRegistry;
use nexus_storage::Database;
use nexus_storage::records::WorkflowRecord;

use crate::AppState;
use crate::envelope::ApiResponse;
use crate::error::ApiError;

pub async fn validate_workflow_only(
    State(state): State<AppState>,
    body: String,
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
    let workflow = match nexus_workflow::parse_workflow(&body) {
        Ok(w) => w,
        Err(e) => {
            return Ok(ApiResponse::ok(serde_json::json!({
                "valid": false,
                "node_count": 0,
                "stage_count": 0,
                "input_count": 0,
                "output_count": 0,
                "errors": [e.to_string()],
                "warnings": [],
            })));
        }
    };

    let operators = state.extension_registry.list_operators();
    let mut errors = Vec::new();

    if let Err(e) = nexus_workflow::validate_workflow(&workflow, &operators) {
        errors.push(e.to_string());
    }

    Ok(ApiResponse::ok(serde_json::json!({
        "valid": errors.is_empty(),
        "node_count": workflow.nodes.len(),
        "stage_count": workflow.stages.len(),
        "input_count": workflow.inputs.len(),
        "output_count": workflow.outputs.len(),
        "errors": errors,
        "warnings": [],
    })))
}

pub async fn update_workflow(
    State(state): State<AppState>,
    Path(id): Path<String>,
    body: String,
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
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

    Ok(ApiResponse::ok(serde_json::json!({
        "id": workflow.id,
        "title": workflow.title,
        "version": workflow.version,
        "updated_at": now,
    })))
}

pub async fn create_workflow(
    State(state): State<AppState>,
    body: String,
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
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

    Ok(ApiResponse::created(serde_json::json!({
        "id": workflow.id,
        "title": workflow.title,
        "version": workflow.version,
    })))
}

pub async fn list_workflows(
    State(state): State<AppState>,
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
    let workflows = state
        .db
        .list_workflows()
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    Ok(ApiResponse::ok(serde_json::json!({ "workflows": workflows })))
}

pub async fn get_workflow(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
    let record = state
        .db
        .get_workflow(&id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;

    Ok(ApiResponse::ok(
        serde_json::to_value(record).unwrap_or_default(),
    ))
}

pub async fn delete_workflow(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
    state
        .db
        .delete_workflow(&id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;

    Ok(ApiResponse::ok(serde_json::json!({ "deleted": id })))
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
    })
}
