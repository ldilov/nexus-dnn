//! `cmd_pulse_floor_metrics_subscribe` — system-wide metric stream for the Pulse-Floor.
//!
//! Phase 2 stub.

use crate::errors::{IpcError, IpcResult};
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct SubscribeInput {
    pub schema: String,
    pub metric_names: Vec<String>,
    pub window_ms: u64,
}

#[derive(Debug, Serialize)]
pub struct SubscribeOutput {
    pub schema: String,
    pub subscription_id: String,
}

#[tauri::command]
pub async fn cmd_pulse_floor_metrics_subscribe(
    _input: SubscribeInput,
) -> IpcResult<SubscribeOutput> {
    Err(IpcError::not_implemented(
        "cmd_pulse_floor_metrics_subscribe",
    ))
}
