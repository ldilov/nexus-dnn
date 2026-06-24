//! Preset-packs DTOs (P5). All generic by `control_id`/`preset_id`; the
//! `source` strings come from serializing `PresetSource`/`ValueSource`
//! (snake_case). No extension-id literals, no node-id shapes.

use serde::{Deserialize, Serialize};
use ts_rs::TS;

/// One row in the preset rail. `source` is the serialized [`PresetSource`]
/// ("extension"|"recipe"|"user"); `control_count` is `values.len()`.
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct PresetDto {
    pub preset_id: String,
    pub label: String,
    pub description: Option<String>,
    pub source: String,
    pub control_count: u32,
}

/// One control a preset supplies, with its label (joined from the projection)
/// and fan-out targets. `source` is the serialized [`ValueSource`].
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct PresetExplainEntryDto {
    pub control_id: String,
    pub label: String,
    #[ts(type = "unknown")]
    pub final_value: serde_json::Value,
    pub targets: Vec<String>,
    pub source: String,
}

/// `GET /recipes/{id}/explain` body: what a preset changes in the graph.
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct PresetExplanationDto {
    pub entries: Vec<PresetExplainEntryDto>,
}

/// One control's default-vs-effective provenance. `source` is the serialized
/// [`ValueSource`]; `overridden` is true iff effective != default.
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct ControlDiffDto {
    pub control_id: String,
    #[ts(type = "unknown")]
    pub default_value: serde_json::Value,
    #[ts(type = "unknown")]
    pub effective_value: serde_json::Value,
    pub source: String,
    pub overridden: bool,
}

/// `POST /recipes/{id}/presets` body: create one USER preset. `values` maps
/// control_id -> value; the handler validates it through the compiler.
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct CreateUserPresetBody {
    pub label: String,
    pub description: Option<String>,
    #[serde(default)]
    #[ts(type = "Record<string, unknown>")]
    pub values: serde_json::Map<String, serde_json::Value>,
}
