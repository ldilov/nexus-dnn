use axum::extract::{Query, State};

use nexus_storage::Database;

use crate::AppState;
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
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
    let records = fetch_filtered_contributions(&state, &filters).await?;
    Ok(ApiResponse::ok(
        serde_json::json!({ "contributions": records }),
    ))
}

pub async fn list_viewers(
    State(state): State<AppState>,
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
    let records = state
        .db
        .list_ui_contributions_by_kind("artifact_viewer")
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    Ok(ApiResponse::ok(
        serde_json::json!({ "contributions": records }),
    ))
}

pub async fn list_commands(
    State(state): State<AppState>,
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
    let records = state
        .db
        .list_ui_contributions_by_kind("command")
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    Ok(ApiResponse::ok(
        serde_json::json!({ "contributions": records }),
    ))
}

pub async fn list_inspectors(
    State(state): State<AppState>,
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
    let records = state
        .db
        .list_ui_contributions_by_kind("inspector_panel")
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    Ok(ApiResponse::ok(
        serde_json::json!({ "contributions": records }),
    ))
}

pub async fn list_widgets(
    State(state): State<AppState>,
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
    let records = state
        .db
        .list_ui_contributions_by_kind("config_widget")
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    Ok(ApiResponse::ok(
        serde_json::json!({ "contributions": records }),
    ))
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
        records.retain(|r| {
            r.target
                .as_ref()
                .map(|t| t == target_type)
                .unwrap_or(false)
        });
    }

    Ok(records)
}
