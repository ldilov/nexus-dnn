use serde::Serialize;
use serde_json::Value;
use ts_rs::TS;

#[derive(Debug, Serialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct SchemaHintDto {
    pub value_type: Option<String>,
    pub enum_values: Option<Vec<Value>>,
    pub minimum: Option<f64>,
    pub maximum: Option<f64>,
}

#[derive(Debug, Serialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct FormControlDto {
    pub control_id: String,
    pub kind: String,
    pub label: String,
    pub help_text: Option<String>,
    pub mode: String,
    pub default_value: Option<Value>,
    pub widget_hint: Option<String>,
    pub schema_hint: Option<SchemaHintDto>,
}

#[derive(Debug, Serialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct FormSectionDto {
    pub id: String,
    pub title: String,
    pub order: u32,
    pub control_ids: Vec<String>,
}

#[derive(Debug, Serialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct FormPresetDto {
    pub preset_id: String,
    pub label: String,
    pub description: Option<String>,
}

#[derive(Debug, Serialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct RecipeFormDto {
    pub recipe_id: String,
    pub display_name: String,
    pub summary: String,
    pub status: Option<String>,
    pub sections: Vec<FormSectionDto>,
    pub controls: Vec<FormControlDto>,
    pub presets: Vec<FormPresetDto>,
}
