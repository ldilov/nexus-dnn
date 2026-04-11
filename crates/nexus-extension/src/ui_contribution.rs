use std::path::Path;

use serde::{Deserialize, Serialize};

use crate::error::ExtensionError;

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum UIContributionKind {
    ArtifactViewer,
    Command,
    ConfigWidget,
    InspectorPanel,
    RecipeCard,
    ToolMetadata,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct UIContributionFile {
    pub kind: UIContributionKind,
    pub id: String,
    pub display_name: String,
    #[serde(default)]
    pub description: Option<String>,
    #[serde(default)]
    pub target: Option<String>,
    #[serde(default)]
    pub supported_types: Option<Vec<String>>,
    #[serde(default)]
    pub priority: Option<u32>,
    #[serde(default)]
    pub metadata: Option<serde_json::Value>,
    #[serde(default)]
    pub category: Option<String>,
    #[serde(default)]
    pub target_type: Option<String>,
    #[serde(default)]
    pub invocation: Option<serde_json::Value>,
    #[serde(default)]
    pub fallback: Option<String>,
}

pub fn parse_ui_contribution(path: &Path) -> Result<UIContributionFile, ExtensionError> {
    let content =
        std::fs::read_to_string(path).map_err(|e| ExtensionError::UiContributionParse {
            path: path.display().to_string(),
            detail: e.to_string(),
        })?;
    deserialize_ui_contribution(&content, &path.display().to_string())
}

pub fn parse_ui_contribution_from_str(content: &str) -> Result<UIContributionFile, ExtensionError> {
    deserialize_ui_contribution(content, "<inline>")
}

fn deserialize_ui_contribution(
    content: &str,
    source: &str,
) -> Result<UIContributionFile, ExtensionError> {
    serde_saphyr::from_str(content).map_err(|e| ExtensionError::UiContributionParse {
        path: source.to_owned(),
        detail: e.to_string(),
    })
}
