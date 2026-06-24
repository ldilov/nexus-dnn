use nexus_recipe::RecipeProjection;
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
    pub extension_id: Option<String>,
    pub extension_version: Option<String>,
    pub workflow_template_ref: String,
    pub thumbnail: Option<String>,
    pub input_summary: Option<String>,
    pub bindings: Vec<RecipeFieldBindingDto>,
    pub created_at: String,
    pub workflow_id: Option<String>,
    pub workflow_version: Option<String>,
    pub status: String,
    pub status_reason: Option<String>,
}

/// Per-control schema hints lifted server-side from the bound operator's
/// `config_schema` (or workflow input-port type). One entry per projection
/// control; unbound or unresolvable controls carry `control_id` only, with all
/// constraint fields `None`. Generic by `control_id` — no node/extension ids.
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct ControlHintDto {
    pub control_id: String,
    pub kind: Option<String>,
    pub min: Option<f64>,
    pub max: Option<f64>,
    pub step: Option<f64>,
    #[ts(type = "Array<unknown> | null")]
    pub enum_values: Option<Vec<serde_json::Value>>,
    pub required: Option<bool>,
}

/// `GET /recipes/{id}/form` body: the recipe's stored projection plus the
/// resolved per-control hints. Legacy recipes (no projection) return an empty
/// projection + empty hints so the client falls back gracefully.
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct RecipeFormDto {
    pub projection: RecipeProjection,
    pub control_hints: Vec<ControlHintDto>,
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
            workflow_id: r.workflow_id.clone(),
            workflow_version: r.workflow_version.clone(),
            status: r.status.clone(),
            status_reason: r.status_reason.clone(),
        }
    }
}
