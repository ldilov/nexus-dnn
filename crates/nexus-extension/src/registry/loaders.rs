use std::path::Path;

use tracing::warn;

use crate::error::ExtensionError;
use crate::manifest::{ExtensionManifest, OperatorDefinition, parse_operator_definition};
use crate::recipe::{RecipeFile, parse_recipe_definition};
use crate::ui_contribution::{UIContributionFile, parse_ui_contribution};

use super::types::LayoutFile;

pub(super) fn yaml_to_json_value(path: &Path) -> Result<serde_json::Value, ExtensionError> {
    let content = std::fs::read_to_string(path).map_err(|e| ExtensionError::ManifestParse {
        path: path.display().to_string(),
        detail: e.to_string(),
    })?;
    serde_saphyr::from_str(&content).map_err(|e| ExtensionError::ManifestParse {
        path: path.display().to_string(),
        detail: e.to_string(),
    })
}

pub(super) fn yaml_to_json_value_for_operator(
    path: &Path,
) -> Result<serde_json::Value, ExtensionError> {
    let content = std::fs::read_to_string(path).map_err(|e| ExtensionError::OperatorParse {
        path: path.display().to_string(),
        detail: e.to_string(),
    })?;
    serde_saphyr::from_str(&content).map_err(|e| ExtensionError::OperatorParse {
        path: path.display().to_string(),
        detail: e.to_string(),
    })
}

pub(super) fn load_operators(
    ext_dir: &Path,
    manifest: &ExtensionManifest,
) -> Result<Vec<OperatorDefinition>, ExtensionError> {
    let file_refs = match &manifest.operators {
        Some(refs) => refs,
        None => return Ok(Vec::new()),
    };

    let mut operators = Vec::with_capacity(file_refs.len());
    for file_ref in file_refs {
        let op_path = ext_dir.join(&file_ref.file);
        let op = parse_operator_definition(&op_path)?;

        let op_json = yaml_to_json_value_for_operator(&op_path)?;
        crate::validation::validate_operator_schema(&op_json)?;

        operators.push(op);
    }
    Ok(operators)
}

pub(super) fn load_recipes(
    ext_dir: &Path,
    manifest: &ExtensionManifest,
    validation_errors: &mut Vec<String>,
) -> Vec<RecipeFile> {
    let file_refs = match &manifest.recipes {
        Some(refs) => refs,
        None => return Vec::new(),
    };

    let mut recipes = Vec::with_capacity(file_refs.len());
    for file_ref in file_refs {
        let recipe_path = ext_dir.join(&file_ref.file);
        match parse_recipe_definition(&recipe_path) {
            Ok(recipe) => recipes.push(recipe),
            Err(e) => {
                let msg = format!("recipe parse failed for {}: {e}", recipe_path.display());
                warn!("{msg}");
                validation_errors.push(msg);
            }
        }
    }
    recipes
}

pub(super) fn load_ui_contributions(
    ext_dir: &Path,
    validation_errors: &mut Vec<String>,
) -> Vec<UIContributionFile> {
    let ui_dir = ext_dir.join("ui");
    if !ui_dir.is_dir() {
        return Vec::new();
    }

    let entries = match std::fs::read_dir(&ui_dir) {
        Ok(entries) => entries,
        Err(e) => {
            validation_errors.push(format!("failed to read ui/ directory: {e}"));
            return Vec::new();
        }
    };

    let mut contributions = Vec::new();
    for entry in entries {
        let entry = match entry {
            Ok(e) => e,
            Err(e) => {
                validation_errors.push(format!("failed to read ui/ entry: {e}"));
                continue;
            }
        };

        let path = entry.path();
        let is_yaml = path
            .extension()
            .map(|ext| ext == "yaml" || ext == "yml")
            .unwrap_or(false);
        if !is_yaml {
            continue;
        }

        match parse_ui_contribution(&path) {
            Ok(contribution) => contributions.push(contribution),
            Err(e) => {
                let msg = format!("ui contribution parse failed for {}: {e}", path.display());
                warn!("{msg}");
                validation_errors.push(msg);
            }
        }
    }
    contributions
}

pub(super) fn load_layouts(
    ext_dir: &Path,
    manifest: &ExtensionManifest,
    validation_errors: &mut Vec<String>,
) -> Vec<LayoutFile> {
    let layout_refs = match manifest.ui.as_ref().and_then(|ui| ui.layouts.as_ref()) {
        Some(refs) => refs,
        None => return Vec::new(),
    };

    let ext_id = &manifest.extension.id;
    let mut layouts = Vec::with_capacity(layout_refs.len());

    for layout_ref in layout_refs {
        let layout_path = ext_dir.join(&layout_ref.file);
        let raw = match std::fs::read_to_string(&layout_path) {
            Ok(content) => content,
            Err(e) => {
                let msg = format!("layout file '{}' not readable: {e}", layout_path.display());
                warn!("{msg}");
                validation_errors.push(msg);
                continue;
            }
        };

        let content: serde_json::Value = match serde_saphyr::from_str(&raw) {
            Ok(v) => v,
            Err(e) => {
                let msg = format!("layout file '{}' parse failed: {e}", layout_path.display());
                warn!("{msg}");
                validation_errors.push(msg);
                continue;
            }
        };

        let id = content
            .get("id")
            .and_then(|v| v.as_str())
            .unwrap_or("")
            .to_owned();
        let display_name = content
            .get("displayName")
            .and_then(|v| v.as_str())
            .unwrap_or("")
            .to_owned();

        if id.is_empty() {
            let msg = format!("layout file '{}' missing 'id' field", layout_path.display());
            warn!("{msg}");
            validation_errors.push(msg);
            continue;
        }

        layouts.push(LayoutFile {
            id,
            display_name,
            extension_id: ext_id.clone(),
            placement: layout_ref.placement.clone(),
            is_default: layout_ref.default.unwrap_or(false),
            content,
        });
    }

    layouts
}
