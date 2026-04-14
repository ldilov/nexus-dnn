use axum::extract::{Query, State};

use nexus_extension::{
    ExtensionRegistry, ExtensionStatus, Tool, build_tool_from_operator, build_tool_from_recipe,
};

use crate::AppState;
use crate::dto::{ListResponseDto, ToolDto};
use crate::envelope::ApiResponse;
use crate::error::ApiError;

#[derive(serde::Deserialize, Default)]
pub struct ToolsFilter {
    pub q: Option<String>,
    pub category: Option<String>,
}

pub async fn list_tools(
    State(state): State<AppState>,
    Query(filter): Query<ToolsFilter>,
) -> Result<ApiResponse<ListResponseDto<ToolDto>>, ApiError> {
    let extensions = state.extension_registry.list_extensions();
    let mut tools: Vec<Tool> = Vec::new();

    for ext in &extensions {
        let availability = ext.status.as_str();
        let ext_id = &ext.manifest.extension.id;

        for op in &ext.operators {
            tools.push(build_tool_from_operator(op, ext_id, availability));
        }

        if ext.status == ExtensionStatus::Active {
            for recipe in &ext.recipes {
                tools.push(build_tool_from_recipe(recipe, ext_id, availability));
            }
        }
    }

    if let Some(ref category) = filter.category {
        let lower = category.to_lowercase();
        tools.retain(|t| t.category.to_lowercase() == lower);
    }

    if let Some(ref query) = filter.q {
        let lower = query.to_lowercase();
        tools.retain(|t| matches_query(t, &lower));
    }

    let items = tools.iter().map(ToolDto::from).collect();
    Ok(ApiResponse::ok(ListResponseDto { items }))
}

fn matches_query(tool: &Tool, query: &str) -> bool {
    if tool.display_name.to_lowercase().contains(query) {
        return true;
    }
    if tool.id.to_lowercase().contains(query) {
        return true;
    }
    if let Some(ref desc) = tool.description
        && desc.to_lowercase().contains(query)
    {
        return true;
    }
    tool.tags.iter().any(|tag| tag.contains(query))
}
