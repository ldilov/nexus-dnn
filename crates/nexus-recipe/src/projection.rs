//! The normalized recipe projection document (CONTRACTS C6). Serialized to the
//! `recipes.projection` JSON column; snake_case throughout.

use serde::{Deserialize, Serialize};
use ts_rs::TS;

/// A recipe's full presentation + control model for one pinned workflow version.
#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct RecipeProjection {
    pub schema_version: u32,
    #[serde(default)]
    pub sections: Vec<Section>,
    #[serde(default)]
    pub controls: Vec<Control>,
    #[serde(default)]
    pub presets: Vec<Preset>,
    pub output: Output,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub custom_ui: Option<CustomUi>,
}

impl RecipeProjection {
    /// A binding-free projection used when a recipe has no stored projection yet
    /// (extension recipes pre-P4/P7). Status then reflects only pin currency.
    pub fn empty() -> Self {
        Self {
            schema_version: 1,
            sections: Vec::new(),
            controls: Vec::new(),
            presets: Vec::new(),
            output: Output {
                primary_artifact: String::new(),
                secondary: Vec::new(),
                preview_style: String::new(),
                show_intermediate: false,
            },
            custom_ui: None,
        }
    }
}

/// A titled group of controls, ordered for layout.
#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct Section {
    pub id: String,
    pub title: String,
    pub order: i64,
    #[serde(default)]
    pub control_ids: Vec<String>,
}

/// One user-facing control. `bindings` fan out to one or more workflow targets.
#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct Control {
    pub control_id: String,
    pub kind: ControlKind,
    pub label: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub help_text: Option<String>,
    pub mode: ControlMode,
    #[serde(default)]
    #[ts(type = "unknown")]
    pub default_value: serde_json::Value,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub widget_hint: Option<String>,
    #[serde(default)]
    pub bindings: Vec<String>,
}

#[derive(Clone, Copy, Debug, Serialize, Deserialize, PartialEq, Eq, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
#[serde(rename_all = "snake_case")]
pub enum ControlKind {
    String,
    Enum,
    Bool,
    Int,
    Float,
    Asset,
    PresetSelector,
}

#[derive(Clone, Copy, Debug, Serialize, Deserialize, PartialEq, Eq, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
#[serde(rename_all = "snake_case")]
pub enum ControlMode {
    Basic,
    Advanced,
    Hidden,
    Locked,
}

/// A named bundle of control values.
#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct Preset {
    pub preset_id: String,
    pub label: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
    pub source: PresetSource,
    #[serde(default)]
    #[ts(type = "Record<string, unknown>")]
    pub values: serde_json::Map<String, serde_json::Value>,
}

#[derive(Clone, Copy, Debug, Serialize, Deserialize, PartialEq, Eq, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
#[serde(rename_all = "snake_case")]
pub enum PresetSource {
    Extension,
    Recipe,
    User,
}

/// How the run's result is presented.
#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct Output {
    pub primary_artifact: String,
    #[serde(default)]
    pub secondary: Vec<String>,
    pub preview_style: String,
    #[serde(default)]
    pub show_intermediate: bool,
}

/// FR-3 reference to a bespoke UI bundle. P1 only STORES it; rendering is FR-10.
#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct CustomUi {
    pub extension_id: String,
    pub component_ref: String,
}
