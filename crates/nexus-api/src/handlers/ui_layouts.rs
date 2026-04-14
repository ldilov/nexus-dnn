use axum::extract::{Path, State};

use nexus_extension::ExtensionRegistry;

use crate::AppState;
use crate::envelope::ApiResponse;
use crate::error::ApiError;

#[derive(Debug, serde::Serialize)]
pub struct LayoutSummary {
    pub id: String,
    pub display_name: String,
    pub extension_id: String,
    pub placement: Option<String>,
    pub is_default: bool,
}

pub async fn list_layouts(
    State(state): State<AppState>,
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
    let layouts: Vec<LayoutSummary> = state
        .extension_registry
        .list_layouts()
        .into_iter()
        .map(|l| LayoutSummary {
            id: l.id,
            display_name: l.display_name,
            extension_id: l.extension_id,
            placement: l.placement,
            is_default: l.is_default,
        })
        .collect();

    Ok(ApiResponse::ok(
        serde_json::json!({ "layouts": layouts }),
    ))
}

pub async fn get_layout(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
    let layout = state
        .extension_registry
        .get_layout(&id)
        .ok_or_else(|| ApiError::NotFound(format!("layout {id} not found")))?;

    Ok(ApiResponse::ok(layout.content))
}
