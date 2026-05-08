//! `cmd_host_port` — surface the embedded host's bound port to the frontend.
//!
//! T032 stage 1 (Phase 3, US1): returns a fixed dev-mode port so the frontend
//! adapter can complete its bootstrap (T033). Full in-process axum embedding
//! requires a `nexus-api` workspace dependency and is deferred to a follow-up
//! task — that work will replace the `DEV_FALLBACK_PORT` constant with a value
//! captured from the spawned axum listener and stored in Tauri-managed state.

use crate::errors::IpcResult;
use crate::ipc::SCHEMA_V1;
use serde::Serialize;

const DEV_FALLBACK_PORT: u16 = 3000;

#[derive(Debug, Serialize)]
pub struct HostPortOutput {
    pub schema: &'static str,
    pub port: u16,
}

#[tauri::command]
pub async fn cmd_host_port() -> IpcResult<HostPortOutput> {
    Ok(HostPortOutput {
        schema: SCHEMA_V1,
        port: DEV_FALLBACK_PORT,
    })
}
