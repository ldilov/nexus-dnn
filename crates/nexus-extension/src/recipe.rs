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
    /// Host-shape recipe projection authored by the extension, as RAW JSON.
    /// Kept untyped here because `nexus-extension` must not depend on
    /// `nexus-recipe` (that crate depends on this one). The host parses+validates
    /// it into `nexus_recipe::RecipeProjection` at ingestion time.
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
    serde_saphyr::from_str(&content).map_err(|e| ExtensionError::RecipeParse {
        path: path.display().to_string(),
        detail: e.to_string(),
    })
}

#[cfg(test)]
mod p6_projection_tests {
    use super::*;

    const YAML: &str = r#"
spec_version: '0.1'
recipe:
  id: r
  version: 1.0.0
  display_name: R
  summary: s
  category: c
workflow_template: workflows/x.yaml
projection:
  schema_version: 1
  controls:
    - control_id: speed
      kind: float
      label: Speed
      mode: basic
      default_value: 1.0
      bindings: ["node:post_1.config.speed"]
"#;

    #[test]
    fn parses_projection_block_as_raw_json() {
        let file: RecipeFile = serde_saphyr::from_str(YAML).unwrap();
        let proj = file.projection.expect("projection present");
        assert_eq!(proj["controls"][0]["control_id"], "speed");
    }
}
