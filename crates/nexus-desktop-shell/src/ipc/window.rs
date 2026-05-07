//! `cmd_window_*` — show/hide/focus + titlebar breadcrumb.
//!
//! Phase 2 stubs.

use crate::errors::{IpcError, IpcResult};
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct EmptyInput {
    pub schema: String,
}

#[derive(Debug, Serialize)]
pub struct OkOutput {
    pub schema: String,
    pub ok: bool,
}

#[tauri::command]
pub async fn cmd_window_show(_input: EmptyInput) -> IpcResult<OkOutput> {
    Err(IpcError::not_implemented("cmd_window_show"))
}

#[tauri::command]
pub async fn cmd_window_hide(_input: EmptyInput) -> IpcResult<OkOutput> {
    Err(IpcError::not_implemented("cmd_window_hide"))
}

#[tauri::command]
pub async fn cmd_window_focus(_input: EmptyInput) -> IpcResult<OkOutput> {
    Err(IpcError::not_implemented("cmd_window_focus"))
}

#[derive(Debug, Deserialize)]
pub struct BreadcrumbInput {
    pub schema: String,
    pub cwd: String,
    pub suffix: Option<String>,
}

#[tauri::command]
pub async fn cmd_window_set_titlebar_breadcrumb(_input: BreadcrumbInput) -> IpcResult<OkOutput> {
    Err(IpcError::not_implemented(
        "cmd_window_set_titlebar_breadcrumb",
    ))
}
