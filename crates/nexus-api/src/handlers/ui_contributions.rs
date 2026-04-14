use axum::extract::{Query, State};

use nexus_storage::Database;

use crate::AppState;
use crate::dto::{ListResponseDto, UIContributionDto};
use crate::envelope::ApiResponse;
use crate::error::ApiError;

#[derive(Debug, serde::Deserialize)]
pub struct ContributionFilters {
    pub kind: Option<String>,
    #[serde(rename = "extensionId")]
    pub extension_id: Option<String>,
    #[serde(rename = "targetType")]
    pub target_type: Option<String>,
}

pub async fn list_contributions(
    State(state): State<AppState>,
    Query(filters): Query<ContributionFilters>,
) -> Result<ApiResponse<ListResponseDto<UIContributionDto>>, ApiError> {
    let records = fetch_filtered_contributions(&state, &filters).await?;
    let items = records.iter().map(UIContributionDto::from).collect();
    Ok(ApiResponse::ok(ListResponseDto { items }))
}

pub async fn list_viewers(
    State(state): State<AppState>,
) -> Result<ApiResponse<ListResponseDto<UIContributionDto>>, ApiError> {
    list_by_kind(state, "artifact_viewer").await
}

pub async fn list_commands(
    State(state): State<AppState>,
) -> Result<ApiResponse<ListResponseDto<UIContributionDto>>, ApiError> {
    list_by_kind(state, "command").await
}

pub async fn list_inspectors(
    State(state): State<AppState>,
) -> Result<ApiResponse<ListResponseDto<UIContributionDto>>, ApiError> {
    list_by_kind(state, "inspector_panel").await
}

pub async fn list_widgets(
    State(state): State<AppState>,
) -> Result<ApiResponse<ListResponseDto<UIContributionDto>>, ApiError> {
    list_by_kind(state, "config_widget").await
}

async fn list_by_kind(
    state: AppState,
    kind: &str,
) -> Result<ApiResponse<ListResponseDto<UIContributionDto>>, ApiError> {
    let records = state
        .db
        .list_ui_contributions_by_kind(kind)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    let items = records.iter().map(UIContributionDto::from).collect();
    Ok(ApiResponse::ok(ListResponseDto { items }))
}

async fn fetch_filtered_contributions(
    state: &AppState,
    filters: &ContributionFilters,
) -> Result<Vec<nexus_storage::UIContributionRecord>, ApiError> {
    let mut records = if let Some(kind) = &filters.kind {
        state
            .db
            .list_ui_contributions_by_kind(kind)
            .await
            .map_err(|e| ApiError::Internal(e.to_string()))?
    } else if let Some(ext_id) = &filters.extension_id {
        state
            .db
            .list_ui_contributions_by_extension(ext_id)
            .await
            .map_err(|e| ApiError::Internal(e.to_string()))?
    } else {
        state
            .db
            .list_ui_contributions()
            .await
            .map_err(|e| ApiError::Internal(e.to_string()))?
    };

    if let Some(target_type) = &filters.target_type {
        records.retain(|r| r.target.as_ref().map(|t| t == target_type).unwrap_or(false));
    }

    Ok(records)
}
