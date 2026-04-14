use axum::body::Body;
use axum::extract::{Path, Query, State};
use axum::http::header;
use axum::response::IntoResponse;
use tokio_util::io::ReaderStream;

use nexus_artifact::ArtifactStore;
use nexus_storage::Database;

use crate::AppState;
use crate::dto::{
    ArtifactDto, ArtifactLineageDto, ListResponseDto, ViewerCandidateDto, artifacts::LineageEdgeDto,
};
use crate::envelope::ApiResponse;
use crate::error::ApiError;

#[derive(serde::Deserialize)]
pub struct ArtifactListParams {
    pub run_id: Option<String>,
    pub artifact_type: Option<String>,
    pub node_id: Option<String>,
}

pub async fn list_artifacts(
    State(state): State<AppState>,
    Query(params): Query<ArtifactListParams>,
) -> Result<ApiResponse<ListResponseDto<ArtifactDto>>, ApiError> {
    let artifacts = state
        .db
        .list_artifacts_filtered(
            params.run_id.as_deref(),
            params.artifact_type.as_deref(),
            params.node_id.as_deref(),
        )
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let items = artifacts.iter().map(ArtifactDto::from).collect();
    Ok(ApiResponse::ok(ListResponseDto { items }))
}

pub async fn get_artifact(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<ArtifactDto>, ApiError> {
    let record = state
        .db
        .get_artifact(&id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;

    let viewer_candidates = fetch_viewer_candidates(&state, &record.artifact_type).await;
    let mut dto = ArtifactDto::from(&record);
    dto.viewer_candidates = Some(viewer_candidates);

    Ok(ApiResponse::ok(dto))
}

async fn fetch_viewer_candidates(state: &AppState, artifact_type: &str) -> Vec<ViewerCandidateDto> {
    let contributions = state
        .db
        .list_ui_contributions_by_kind("artifact_viewer")
        .await
        .unwrap_or_default();

    let mut matching: Vec<_> = contributions
        .into_iter()
        .filter(|c| {
            c.supported_types
                .as_deref()
                .map(|st| st.split(',').any(|t| t.trim() == artifact_type))
                .unwrap_or(false)
        })
        .collect();

    matching.sort_by(|a, b| b.priority.cmp(&a.priority));

    matching
        .iter()
        .map(|c| ViewerCandidateDto {
            id: c.id.clone(),
            display_name: c.display_name.clone(),
            extension_id: c.extension_id.clone(),
            priority: c.priority,
        })
        .collect()
}

pub async fn get_artifact_blob(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<impl IntoResponse, ApiError> {
    let _record = state
        .db
        .get_artifact(&id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;

    let blob_path = state
        .artifact_store
        .blob_path(&id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;

    let file = tokio::fs::File::open(&blob_path)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let stream = ReaderStream::new(file);
    let body = Body::from_stream(stream);

    let headers = [(header::CONTENT_TYPE, "application/octet-stream")];

    Ok((headers, body))
}

pub async fn get_artifact_content(
    state: State<AppState>,
    path: Path<String>,
) -> Result<impl IntoResponse, ApiError> {
    get_artifact_blob(state, path).await
}

pub async fn get_artifact_lineage(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<ArtifactLineageDto>, ApiError> {
    let _record = state
        .db
        .get_artifact(&id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;

    let lineage = state
        .db
        .get_lineage_for_artifact(&id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    Ok(ApiResponse::ok(ArtifactLineageDto {
        artifact_id: id,
        lineage: lineage.iter().map(LineageEdgeDto::from).collect(),
    }))
}
