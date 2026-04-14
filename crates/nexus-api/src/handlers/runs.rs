use axum::Json;
use axum::extract::{Path, State};

use nexus_storage::Database;

use crate::AppState;
use crate::dto::{
    ArtifactDto, CreateRunResponseDto, ListResponseDto, NodeExecutionDto, RunDetailDto, RunDto,
};
use crate::envelope::ApiResponse;
use crate::error::ApiError;

#[derive(serde::Deserialize)]
pub struct CreateRunRequest {
    pub workflow_id: String,
}

pub async fn create_run(
    State(state): State<AppState>,
    Json(body): Json<CreateRunRequest>,
) -> Result<ApiResponse<CreateRunResponseDto>, ApiError> {
    let run_id = state
        .run_engine
        .create_run(&body.workflow_id)
        .await
        .map_err(|e| ApiError::BadRequest(e.to_string()))?;

    let engine = state.run_engine.clone();
    let rid = run_id.clone();
    tokio::spawn(async move {
        if let Err(e) = engine.execute_run(&rid).await {
            tracing::error!(run_id = %rid, error = %e, "run execution failed");
        }
    });

    Ok(ApiResponse::created(CreateRunResponseDto {
        run_id,
        status: "created".to_owned(),
        predecessor_run_id: None,
    }))
}

pub async fn list_runs(
    State(state): State<AppState>,
) -> Result<ApiResponse<ListResponseDto<RunDto>>, ApiError> {
    let runs = state
        .db
        .list_runs()
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let items = runs.iter().map(RunDto::from).collect();
    Ok(ApiResponse::ok(ListResponseDto { items }))
}

pub async fn get_run(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<RunDetailDto>, ApiError> {
    let run = state
        .db
        .get_run(&id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;

    let nodes = state
        .db
        .get_node_executions_for_run(&id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let artifacts = state
        .db
        .list_artifacts_for_run(&id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    Ok(ApiResponse::ok(RunDetailDto {
        run: RunDto::from(&run),
        nodes: nodes.iter().map(NodeExecutionDto::from).collect(),
        artifacts: artifacts.iter().map(ArtifactDto::from).collect(),
    }))
}

pub async fn cancel_run(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<CreateRunResponseDto>, ApiError> {
    state
        .run_engine
        .cancel_run(&id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    Ok(ApiResponse::ok(CreateRunResponseDto {
        run_id: id,
        status: "cancelled".to_owned(),
        predecessor_run_id: None,
    }))
}

pub async fn retry_run(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<CreateRunResponseDto>, ApiError> {
    let new_run_id = state
        .run_engine
        .retry_run(&id)
        .await
        .map_err(|e| ApiError::BadRequest(e.to_string()))?;

    let engine = state.run_engine.clone();
    let rid = new_run_id.clone();
    tokio::spawn(async move {
        if let Err(e) = engine.execute_run(&rid).await {
            tracing::error!(run_id = %rid, error = %e, "retry run execution failed");
        }
    });

    Ok(ApiResponse::created(CreateRunResponseDto {
        run_id: new_run_id,
        status: "created".to_owned(),
        predecessor_run_id: Some(id),
    }))
}
