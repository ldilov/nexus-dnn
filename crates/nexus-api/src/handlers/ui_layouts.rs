use axum::extract::{Path, State};

use nexus_extension::ExtensionRegistry;

use crate::AppState;
use crate::dto::{LayoutSummaryDto, ListResponseDto};
use crate::envelope::ApiResponse;
use crate::error::ApiError;

pub async fn list_layouts(
    State(state): State<AppState>,
) -> Result<ApiResponse<ListResponseDto<LayoutSummaryDto>>, ApiError> {
    let items: Vec<LayoutSummaryDto> = state
        .extension_registry
        .list_layouts()
        .into_iter()
        .map(|l| LayoutSummaryDto {
            id: l.id,
            display_name: l.display_name,
            extension_id: l.extension_id,
            placement: l.placement,
            is_default: l.is_default,
        })
        .collect();

    Ok(ApiResponse::ok(ListResponseDto { items }))
}

pub async fn get_layout(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
    let layout = state
        .extension_registry
        .get_layout(&id)
        .ok_or_else(|| ApiError::NotFound(format!("layout {id} not found")))?;

    // Layout definitions are structurally recursive and extension-defined. We
    // return the YAML-derived JSON tree verbatim; the frontend layout renderer
    Ok(ApiResponse::ok(layout.content))
}
