use std::collections::BTreeMap;

use serde::{Deserialize, Serialize};
use serde_json::Value;

/// A recipe projection: the curated, validated surface a recipe exposes over one
/// pinned workflow version. Authored by extensions (YAML) or users (builder).
#[derive(Clone, Debug, Default, Serialize, Deserialize, PartialEq)]
pub struct RecipeProjection {
    pub schema_version: u32,
    #[serde(default)]
    pub sections: Vec<Section>,
    #[serde(default)]
    pub controls: Vec<ControlDef>,
    #[serde(default)]
    pub presets: Vec<PresetPack>,
    #[serde(default)]
    pub output: OutputPresentation,
}

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub struct Section {
    pub id: String,
    pub title: String,
    #[serde(default)]
    pub order: u32,
    #[serde(default)]
    pub control_ids: Vec<String>,
}

#[derive(Clone, Copy, Debug, Serialize, Deserialize, PartialEq, Eq)]
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

#[derive(Clone, Copy, Debug, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum ControlMode {
    Basic,
    Advanced,
    Hidden,
    Locked,
}

/// A user-facing control. `bindings` are the workflow target paths this control
/// writes to (fan-out = more than one). Target grammar is host-canonical:
/// `input:<name>` or `node:<node_id>.config.<dotted.pointer>`.
#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub struct ControlDef {
    pub control_id: String,
    pub kind: ControlKind,
    pub label: String,
    #[serde(default)]
    pub help_text: Option<String>,
    pub mode: ControlMode,
    #[serde(default)]
    pub default_value: Option<Value>,
    #[serde(default)]
    pub widget_hint: Option<String>,
    #[serde(default)]
    pub bindings: Vec<String>,
}

#[derive(Clone, Copy, Debug, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum PresetSource {
    Extension,
    Recipe,
    User,
}

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub struct PresetPack {
    pub preset_id: String,
    pub label: String,
    #[serde(default)]
    pub description: Option<String>,
    pub source: PresetSource,
    #[serde(default)]
    pub values: BTreeMap<String, Value>,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize, PartialEq)]
pub struct OutputPresentation {
    #[serde(default)]
    pub primary_artifact: Option<String>,
    #[serde(default)]
    pub secondary: Vec<String>,
    #[serde(default)]
    pub preview_style: Option<String>,
    #[serde(default)]
    pub show_intermediate: bool,
}
