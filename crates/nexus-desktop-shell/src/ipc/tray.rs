//! `cmd_tray_set_state` — update the system-tray icon to reflect background activity.
//!
//! T031 (Phase 3, US1) replaces the Phase 2 stub with a real body that updates
//! the tray icon's tooltip. Per spec 042 ipc-commands.md the input carries a
//! state enum (`idle | active | anomaly`) plus an optional explicit tooltip.
//! When a tooltip is provided we forward it verbatim; otherwise we synthesise a
//! short status line from the state value.
//!
//! Distinct icons per state are out of scope for the first cut — the tray
//! icon's tooltip is the operator-visible signal channel for now. Custom icons
//! per state are tracked as a follow-up.

use crate::errors::{IpcError, IpcResult};
use crate::ipc::SCHEMA_V1;
use crate::tray::TRAY_ID;
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager, Runtime};

#[derive(Debug, Deserialize)]
pub struct TrayStateInput {
    pub schema: String,
    pub state: TrayState,
    pub tooltip: Option<String>,
}

#[derive(Debug, Deserialize, Clone, Copy)]
#[serde(rename_all = "lowercase")]
pub enum TrayState {
    Idle,
    Active,
    Anomaly,
}

impl TrayState {
    fn default_tooltip(self) -> &'static str {
        match self {
            TrayState::Idle => "nexus-dnn",
            TrayState::Active => "nexus-dnn — active",
            TrayState::Anomaly => "nexus-dnn — anomaly",
        }
    }
}

#[derive(Debug, Serialize)]
pub struct OkOutput {
    pub schema: &'static str,
    pub ok: bool,
}

#[tauri::command]
pub async fn cmd_tray_set_state<R: Runtime>(
    app: AppHandle<R>,
    input: TrayStateInput,
) -> IpcResult<OkOutput> {
    if input.schema != SCHEMA_V1 {
        return Err(IpcError::SchemaMismatch(input.schema));
    }
    let tooltip = input
        .tooltip
        .filter(|s| !s.is_empty())
        .unwrap_or_else(|| input.state.default_tooltip().to_string());
    let tray = app
        .tray_by_id(TRAY_ID)
        .ok_or_else(|| IpcError::Internal(format!("tray '{TRAY_ID}' not installed")))?;
    tray.set_tooltip(Some(&tooltip))
        .map_err(|e| IpcError::Internal(format!("tray.set_tooltip failed: {e}")))?;
    Ok(OkOutput {
        schema: SCHEMA_V1,
        ok: true,
    })
}
