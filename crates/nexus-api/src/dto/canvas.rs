use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct CanvasPositionDto {
    pub x: f64,
    pub y: f64,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct CanvasNoteDto {
    pub id: String,
    pub text: String,
    pub position: CanvasPositionDto,
    pub accent: Option<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct CanvasRerouteDto {
    pub id: String,
    pub port_type: String,
    pub position: CanvasPositionDto,
    pub source_node: String,
    pub source_port: String,
    pub target_node: String,
    pub target_port: String,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS, Default)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct CanvasStateDto {
    #[serde(default)]
    pub notes: Vec<CanvasNoteDto>,
    #[serde(default)]
    pub reroutes: Vec<CanvasRerouteDto>,
    #[serde(default)]
    pub node_positions: std::collections::HashMap<String, CanvasPositionDto>,
    #[serde(default)]
    pub updated_at: Option<String>,
}
