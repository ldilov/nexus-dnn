use axum::extract::{Path, State};
use chrono::Utc;
use serde::Serialize;

use nexus_extension::ExtensionRegistry;
use nexus_storage::Database;
use nexus_storage::records::WorkflowRecord;
use ts_rs::TS;

use crate::AppState;
use crate::dto::{ListResponseDto, WorkflowDto};
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
