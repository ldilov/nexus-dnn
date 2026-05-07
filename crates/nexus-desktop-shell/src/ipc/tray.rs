//! `cmd_tray_set_state` — update the system-tray icon to reflect background activity.
//!
//! Phase 2 stub.

use crate::errors::{IpcError, IpcResult};
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct TrayStateInput {
    pub schema: String,
    pub state: TrayState,
    pub tooltip: Option<String>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum TrayState {
    Idle,
    Active,
    Anomaly,
}

#[derive(Debug, Serialize)]
pub struct OkOutput {
    pub schema: String,
    pub ok: bool,
}

#[tauri::command]
pub async fn cmd_tray_set_state(_input: TrayStateInput) -> IpcResult<OkOutput> {
    Err(IpcError::not_implemented("cmd_tray_set_state"))
}
