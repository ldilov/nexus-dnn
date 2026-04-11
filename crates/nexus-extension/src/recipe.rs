use std::path::Path;

use serde::{Deserialize, Serialize};

use crate::error::ExtensionError;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct RecipeFile {
    pub spec_version: String,
    pub recipe: RecipeInfo,
    #[serde(default)]
    pub workflow_template: Option<String>,
    #[serde(default)]
    pub bindings: Option<RecipeBindings>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct RecipeInfo {
    pub id: String,
    pub version: String,
    pub display_name: String,
    pub summary: String,
    pub category: String,
    #[serde(default)]
    pub thumbnail: Option<String>,
    #[serde(default)]
    pub input_summary: Option<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct RecipeBindings {
    #[serde(default)]
    pub fields: Vec<RecipeFieldBinding>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct RecipeFieldBinding {
    pub field: String,
    pub maps_to: String,
}

pub fn parse_recipe_definition(path: &Path) -> Result<RecipeFile, ExtensionError> {
    let content = std::fs::read_to_string(path).map_err(|e| ExtensionError::RecipeParse {
        path: path.display().to_string(),
        detail: e.to_string(),
    })?;
    serde_saphyr::from_str(&content).map_err(|e| ExtensionError::RecipeParse {
        path: path.display().to_string(),
        detail: e.to_string(),
    })
}
