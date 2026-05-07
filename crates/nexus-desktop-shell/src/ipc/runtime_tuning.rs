//! `cmd_runtime_tuning_patch` — partial RuntimeTuning update for a deployment.
//!
//! Phase 2 stub. The full body forwards to the host's runtime-tuning surface
//! introduced by spec 039 once the embedded host is linked in (T032).
//!
//! Per Principle XIII, this command operates on the host-owned `RuntimeTuning`
//! shape only — it does not understand any extension's settings.

use crate::errors::{IpcError, IpcResult};
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct PatchInput {
    pub schema: String,
    pub deployment_id: String,
    pub patch: serde_json::Value,
    pub reload_after_apply: bool,
}

#[derive(Debug, Serialize)]
pub struct PatchOutput {
    pub schema: String,
    pub applied_patch: serde_json::Value,
    pub reload_run_id: Option<String>,
}

#[tauri::command]
pub async fn cmd_runtime_tuning_patch(_input: PatchInput) -> IpcResult<PatchOutput> {
    Err(IpcError::not_implemented("cmd_runtime_tuning_patch"))
}
