use nexus_storage::RecipeRecord;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct RecipeFieldBindingDto {
    pub field: String,
    pub maps_to: String,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct RecipeDto {
    pub id: String,
    pub version: String,
    pub display_name: String,
    pub summary: String,
    pub category: String,
    pub extension_id: String,
    pub extension_version: String,
    pub workflow_template_ref: String,
    pub thumbnail: Option<String>,
    pub input_summary: Option<String>,
    pub bindings: Vec<RecipeFieldBindingDto>,
    pub created_at: String,
}

impl From<&RecipeRecord> for RecipeDto {
    fn from(r: &RecipeRecord) -> Self {
        let bindings = serde_json::from_str::<serde_json::Value>(&r.bindings)
            .ok()
            .and_then(|v| {
                v.get("fields")
                    .cloned()
                    .or_else(|| if v.is_array() { Some(v) } else { None })
            })
            .and_then(|v| serde_json::from_value::<Vec<RecipeFieldBindingDto>>(v).ok())
            .unwrap_or_default();

        Self {
            id: r.id.clone(),
            version: r.version.clone(),
            display_name: r.display_name.clone(),
            summary: r.summary.clone(),
            category: r.category.clone(),
            extension_id: r.extension_id.clone(),
            extension_version: r.extension_version.clone(),
            workflow_template_ref: r.workflow_template_ref.clone(),
            thumbnail: r.thumbnail.clone(),
            input_summary: r.input_summary.clone(),
            bindings,
            created_at: r.created_at.clone(),
        }
    }
}
