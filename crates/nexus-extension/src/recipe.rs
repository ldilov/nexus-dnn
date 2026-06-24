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
    /// Optional host `RecipeProjection` declared by the extension (generic JSON,
    /// validated by the host compiler at run). Persisted into `recipes.projection`.
    #[serde(default)]
    pub projection: Option<serde_json::Value>,
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
    parse_recipe_definition_str(&content, &path.display().to_string())
}

/// Parse a recipe definition from an in-memory YAML string (e.g. a bundled
/// `include_str!`), tagging parse errors with `source` for diagnostics.
pub fn parse_recipe_definition_str(
    content: &str,
    source: &str,
) -> Result<RecipeFile, ExtensionError> {
    serde_saphyr::from_str(content).map_err(|e| ExtensionError::RecipeParse {
        path: source.to_owned(),
        detail: e.to_string(),
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    const RECIPE_WITH_PROJECTION: &str = r#"
spec_version: '0.1'
recipe:
  id: demo_recipe
  version: 1.0.0
  display_name: Demo
  summary: A demo
  category: tts.dialogue
workflow_template: workflows/demo.yaml
projection:
  schema_version: 1
  sections:
    - id: input
      title: Input
      order: 0
      control_ids: [script]
  controls:
    - control_id: script
      kind: string
      label: Script
      mode: basic
      default_value: ""
      bindings: ["input:script"]
  presets: []
  output:
    primary_artifact: audio
    secondary: []
    preview_style: player
    show_intermediate: false
"#;

    const RECIPE_WITHOUT_PROJECTION: &str = r#"
spec_version: '0.1'
recipe:
  id: demo_recipe
  version: 1.0.0
  display_name: Demo
  summary: A demo
  category: tts.dialogue
workflow_template: workflows/demo.yaml
"#;

    #[test]
    fn parses_optional_projection_block() {
        let file: RecipeFile = serde_saphyr::from_str(RECIPE_WITH_PROJECTION).unwrap();
        let projection = file.projection.expect("projection block present");
        assert_eq!(projection["schema_version"], 1);
        assert_eq!(projection["controls"][0]["control_id"], "script");
        assert_eq!(projection["controls"][0]["bindings"][0], "input:script");
    }

    #[test]
    fn projection_defaults_to_none_when_absent() {
        let file: RecipeFile = serde_saphyr::from_str(RECIPE_WITHOUT_PROJECTION).unwrap();
        assert!(file.projection.is_none());
    }
}
