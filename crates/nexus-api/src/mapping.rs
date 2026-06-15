use nexus_extension::ActivatedExtension;
use nexus_storage::{Database, ExtensionRecord, RecipeRecord, UIContributionRecord};

use crate::AppState;
use crate::error::ApiError;

pub fn extension_to_record(ext: &ActivatedExtension) -> ExtensionRecord {
    let capabilities = ext
        .manifest
        .capabilities
        .as_ref()
        .map(|caps| serde_json::to_string(caps).unwrap_or_default());

    let validation_errors = if ext.validation_errors.is_empty() {
        None
    } else {
        Some(serde_json::to_string(&ext.validation_errors).unwrap_or_default())
    };

    ExtensionRecord {
        id: ext.manifest.extension.id.clone(),
        name: ext.manifest.extension.name.clone(),
        version: ext.manifest.extension.version.clone(),
        description: ext.manifest.extension.description.clone(),
        publisher: ext.manifest.extension.publisher.clone(),
        host_api_compat: ext.manifest.compatibility.host_api.clone(),
        protocol_compat: ext.manifest.compatibility.protocol.clone(),
        runtime_family: format!("{:?}", ext.manifest.runtime.family),
        entrypoint: ext.manifest.runtime.entrypoint.clone(),
        capabilities,
        status: ext.status.as_str().to_owned(),
        directory: ext.directory.display().to_string(),
        installed_at: chrono::Utc::now().to_rfc3339(),
        recipe_count: Some(ext.recipe_count as i32),
        ui_contribution_count: Some(ext.ui_contribution_count as i32),
        validation_errors,
        primary_recipe_id: None,
        default_workflow_id: None,
        icon_kind: match ext.manifest.extension.icon.as_ref() {
            Some(icon) if icon.svg.is_some() => Some(nexus_storage::IconKind::Svg),
            Some(icon) if icon.symbol.is_some() => Some(nexus_storage::IconKind::Symbol),
            _ => None,
        },
        icon_symbol: ext
            .manifest
            .extension
            .icon
            .as_ref()
            .and_then(|i| i.svg.is_none().then(|| i.symbol.clone()).flatten()),
        icon_svg: ext
            .manifest
            .extension
            .icon
            .as_ref()
            .and_then(|i| i.svg.clone()),
    }
}

pub async fn persist_recipes_for_extension(
    state: &AppState,
    ext: &ActivatedExtension,
) -> Result<(), ApiError> {
    let ext_id = &ext.manifest.extension.id;
    if let Err(e) = state.db.delete_recipes_by_extension(ext_id).await {
        tracing::warn!(extension_id = %ext_id, error = %e, "delete_recipes_by_extension failed before re-persist");
    }

    for recipe in &ext.recipes {
        let record = recipe_to_record(recipe, ext);
        state
            .db
            .insert_recipe(&record)
            .await
            .map_err(|e| ApiError::Internal(e.to_string()))?;
    }
    Ok(())
}

pub async fn persist_ui_contributions_for_extension(
    state: &AppState,
    ext: &ActivatedExtension,
) -> Result<(), ApiError> {
    let ext_id = &ext.manifest.extension.id;
    if let Err(e) = state.db.delete_ui_contributions_by_extension(ext_id).await {
        tracing::warn!(extension_id = %ext_id, error = %e, "delete_ui_contributions_by_extension failed before re-persist");
    }

    for contrib in &ext.ui_contributions {
        let record = ui_contribution_to_record(contrib, ext);
        state
            .db
            .insert_ui_contribution(&record)
            .await
            .map_err(|e| ApiError::Internal(e.to_string()))?;
    }
    Ok(())
}

fn recipe_to_record(
    recipe: &nexus_extension::RecipeFile,
    ext: &ActivatedExtension,
) -> RecipeRecord {
    let bindings = recipe
        .bindings
        .as_ref()
        .map(|b| serde_json::to_string(b).unwrap_or_default())
        .unwrap_or_else(|| "{}".to_owned());

    RecipeRecord {
        id: recipe.recipe.id.clone(),
        version: recipe.recipe.version.clone(),
        display_name: recipe.recipe.display_name.clone(),
        summary: recipe.recipe.summary.clone(),
        category: recipe.recipe.category.clone(),
        extension_id: ext.manifest.extension.id.clone(),
        extension_version: ext.manifest.extension.version.clone(),
        workflow_template_ref: recipe.workflow_template.clone().unwrap_or_default(),
        thumbnail: recipe.recipe.thumbnail.clone(),
        input_summary: recipe.recipe.input_summary.clone(),
        bindings,
        workflow_id: None,
        workflow_version: None,
        projection_schema_version: recipe
            .projection
            .as_ref()
            .and_then(|v| v.get("schema_version").and_then(|s| s.as_i64())),
        projection: recipe.projection.as_ref().map(|v| {
            if serde_json::from_value::<nexus_recipe::RecipeProjection>(v.clone()).is_err() {
                tracing::warn!(recipe_id = %recipe.recipe.id, "recipe projection does not parse as RecipeProjection; storing raw");
            }
            serde_json::to_string(v).unwrap_or_default()
        }),
        status: None,
        author_kind: "extension".to_owned(),
        created_at: chrono::Utc::now().to_rfc3339(),
    }
}

fn ui_contribution_to_record(
    contrib: &nexus_extension::UIContributionFile,
    ext: &ActivatedExtension,
) -> UIContributionRecord {
    let kind_str = serde_json::to_value(&contrib.kind)
        .ok()
        .and_then(|v| v.as_str().map(|s| s.to_owned()))
        .unwrap_or_else(|| format!("{:?}", contrib.kind));

    let supported_types = contrib
        .supported_types
        .as_ref()
        .map(|st| serde_json::to_string(st).unwrap_or_default());

    let metadata = contrib
        .metadata
        .as_ref()
        .map(|m| serde_json::to_string(m).unwrap_or_default());

    UIContributionRecord {
        id: contrib.id.clone(),
        kind: kind_str,
        extension_id: ext.manifest.extension.id.clone(),
        display_name: contrib.display_name.clone(),
        description: contrib.description.clone(),
        target: contrib.target.clone(),
        supported_types,
        priority: contrib.priority.unwrap_or(0) as i32,
        metadata,
        availability: ext.status.as_str().to_owned(),
    }
}

#[cfg(test)]
mod recipe_to_record_tests {
    use super::*;
    use nexus_extension::{ActivatedExtension, ExtensionManifest, ExtensionStatus, RecipeFile};
    use serde_json::json;

    fn manifest() -> ExtensionManifest {
        serde_json::from_value(json!({
            "spec_version": "0.1",
            "extension": { "id": "test.ext", "version": "1.0.0" },
            "compatibility": { "host_api": "1", "protocol": "1" },
            "runtime": { "family": "python", "entrypoint": "main.py" }
        }))
        .unwrap()
    }

    fn recipe_with_projection() -> RecipeFile {
        serde_json::from_value(json!({
            "spec_version": "0.1",
            "recipe": {
                "id": "r",
                "version": "1.0.0",
                "display_name": "R",
                "summary": "s",
                "category": "c"
            },
            "workflow_template": "workflows/x.yaml",
            "projection": {
                "schema_version": 1,
                "controls": [
                    {
                        "control_id": "speed",
                        "kind": "float",
                        "label": "Speed",
                        "mode": "basic",
                        "default_value": 1.0,
                        "bindings": ["node:post_1.config.speed"]
                    }
                ]
            }
        }))
        .unwrap()
    }

    fn fixture(recipe: RecipeFile) -> ActivatedExtension {
        ActivatedExtension {
            manifest: manifest(),
            operators: Vec::new(),
            recipes: vec![recipe],
            ui_contributions: Vec::new(),
            layouts: Vec::new(),
            storage: None,
            recipe_count: 1,
            ui_contribution_count: 0,
            validation_errors: Vec::new(),
            status: ExtensionStatus::Active,
            directory: std::path::PathBuf::from("/tmp/test.ext"),
            install_plan: None,
        }
    }

    #[test]
    fn ingests_recipe_projection_into_projection_column() {
        let recipe = recipe_with_projection();
        let ext = fixture(recipe.clone());

        let record = recipe_to_record(&recipe, &ext);

        assert_eq!(record.projection_schema_version, Some(1));
        let raw = record.projection.expect("projection persisted");
        let parsed: nexus_recipe::RecipeProjection = serde_json::from_str(&raw).unwrap();
        assert_eq!(parsed.schema_version, 1);
        assert_eq!(parsed.controls[0].control_id, "speed");
        assert_eq!(parsed.controls[0].bindings[0], "node:post_1.config.speed");
    }

    #[test]
    fn recipe_without_projection_leaves_column_none() {
        let mut recipe = recipe_with_projection();
        recipe.projection = None;
        let ext = fixture(recipe.clone());

        let record = recipe_to_record(&recipe, &ext);

        assert!(record.projection.is_none());
        assert!(record.projection_schema_version.is_none());
    }
}
