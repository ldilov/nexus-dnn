use serde::Serialize;

use crate::manifest::OperatorDefinition;
use crate::recipe::RecipeFile;

#[derive(Clone, Debug, Serialize)]
pub struct Tool {
    pub id: String,
    pub kind: String,
    pub target_id: String,
    pub display_name: String,
    pub description: Option<String>,
    pub category: String,
    pub tags: Vec<String>,
    pub icon: Option<String>,
    pub extension_id: String,
    pub availability: String,
}

pub fn build_tool_from_operator(
    op: &OperatorDefinition,
    extension_id: &str,
    availability: &str,
) -> Tool {
    let display_name = op
        .operator
        .display_name
        .clone()
        .unwrap_or_else(|| op.operator.id.clone());

    let category = op
        .operator
        .category
        .clone()
        .unwrap_or_else(|| "Uncategorized".to_owned());

    let tags = build_tags(&category, &display_name);

    Tool {
        id: format!("tool:operator:{}", op.operator.id),
        kind: "operator".to_owned(),
        target_id: op.operator.id.clone(),
        display_name,
        description: op.operator.description.clone(),
        category,
        tags,
        icon: None,
        extension_id: extension_id.to_owned(),
        availability: availability.to_owned(),
    }
}

pub fn build_tool_from_recipe(
    recipe: &RecipeFile,
    extension_id: &str,
    availability: &str,
) -> Tool {
    let tags = build_tags(&recipe.recipe.category, &recipe.recipe.display_name);

    Tool {
        id: format!("tool:recipe:{}", recipe.recipe.id),
        kind: "recipe".to_owned(),
        target_id: recipe.recipe.id.clone(),
        display_name: recipe.recipe.display_name.clone(),
        description: Some(recipe.recipe.summary.clone()),
        category: recipe.recipe.category.clone(),
        tags,
        icon: recipe.recipe.thumbnail.clone(),
        extension_id: extension_id.to_owned(),
        availability: availability.to_owned(),
    }
}

fn build_tags(category: &str, display_name: &str) -> Vec<String> {
    let mut tags: Vec<String> = Vec::new();
    let normalized_category = category.to_lowercase();
    if !normalized_category.is_empty() {
        tags.push(normalized_category);
    }
    for word in display_name.split_whitespace() {
        let lowered = word.to_lowercase();
        if !tags.contains(&lowered) {
            tags.push(lowered);
        }
    }
    tags
}
