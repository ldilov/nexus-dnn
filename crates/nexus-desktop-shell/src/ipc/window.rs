//! `cmd_window_*` — show/hide/focus + titlebar breadcrumb.
//!
//! T030 (Phase 3, US1) replaces the Phase 2 `not_implemented` stubs with
//! concrete bodies. Each command resolves the `main` window through the
//! `AppHandle`, performs the requested operation, and returns the canonical
//! `{ schema, ok: true }` envelope. The breadcrumb command additionally:
//!   1. stores the latest payload in Tauri-managed [`BreadcrumbState`] so the
//!      value survives a window reopen from the system tray, and
//!   2. emits the `breadcrumb:updated` Tauri event so any frontend `Titlebar`
//!      mounted in the desktop window receives the new prompt context.

use crate::errors::{IpcError, IpcResult};
use crate::ipc::SCHEMA_V1;
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::{AppHandle, Emitter, Manager, Runtime};

const MAIN_WINDOW_LABEL: &str = "main";
const BREADCRUMB_EVENT: &str = "breadcrumb:updated";
const DEFAULT_BREADCRUMB_SUFFIX: &str = "$";

#[derive(Debug, Default)]
pub struct BreadcrumbState {
    inner: Mutex<Option<BreadcrumbSnapshot>>,
}

#[derive(Debug, Clone, Serialize)]
pub struct BreadcrumbSnapshot {
    pub cwd: String,
    pub suffix: String,
}

#[derive(Debug, Deserialize)]
pub struct EmptyInput {
    pub schema: String,
}

#[derive(Debug, Serialize)]
pub struct OkOutput {
    pub schema: &'static str,
    pub ok: bool,
}

fn ok() -> OkOutput {
    OkOutput {
        schema: SCHEMA_V1,
        ok: true,
    }
}

fn check_schema(schema: &str) -> IpcResult<()> {
    if schema != SCHEMA_V1 {
        return Err(IpcError::SchemaMismatch(schema.to_string()));
    }
    Ok(())
}

#[tauri::command]
pub async fn cmd_window_show<R: Runtime>(
    app: AppHandle<R>,
    input: EmptyInput,
) -> IpcResult<OkOutput> {
    check_schema(&input.schema)?;
    let window = app
        .get_webview_window(MAIN_WINDOW_LABEL)
        .ok_or_else(|| IpcError::Internal(format!("window '{MAIN_WINDOW_LABEL}' not found")))?;
    window
        .show()
        .map_err(|e| IpcError::Internal(format!("window.show failed: {e}")))?;
    Ok(ok())
}

#[tauri::command]
pub async fn cmd_window_hide<R: Runtime>(
    app: AppHandle<R>,
    input: EmptyInput,
) -> IpcResult<OkOutput> {
    check_schema(&input.schema)?;
    let window = app
        .get_webview_window(MAIN_WINDOW_LABEL)
        .ok_or_else(|| IpcError::Internal(format!("window '{MAIN_WINDOW_LABEL}' not found")))?;
    window
        .hide()
        .map_err(|e| IpcError::Internal(format!("window.hide failed: {e}")))?;
    Ok(ok())
}

#[tauri::command]
pub async fn cmd_window_focus<R: Runtime>(
    app: AppHandle<R>,
    input: EmptyInput,
) -> IpcResult<OkOutput> {
    check_schema(&input.schema)?;
    let window = app
        .get_webview_window(MAIN_WINDOW_LABEL)
        .ok_or_else(|| IpcError::Internal(format!("window '{MAIN_WINDOW_LABEL}' not found")))?;
    window
        .set_focus()
        .map_err(|e| IpcError::Internal(format!("window.set_focus failed: {e}")))?;
    Ok(ok())
}

#[derive(Debug, Deserialize)]
pub struct BreadcrumbInput {
    pub schema: String,
    pub cwd: String,
    pub suffix: Option<String>,
}

#[tauri::command]
pub async fn cmd_window_set_titlebar_breadcrumb<R: Runtime>(
    app: AppHandle<R>,
    state: tauri::State<'_, BreadcrumbState>,
    input: BreadcrumbInput,
) -> IpcResult<OkOutput> {
    check_schema(&input.schema)?;
    if input.cwd.is_empty() {
        return Err(IpcError::Validation("cwd must not be empty".into()));
    }
    let suffix = input
        .suffix
        .filter(|s| !s.is_empty())
        .unwrap_or_else(|| DEFAULT_BREADCRUMB_SUFFIX.to_string());
    let snapshot = BreadcrumbSnapshot {
        cwd: input.cwd,
        suffix,
    };
    {
        let mut guard = state
            .inner
            .lock()
            .map_err(|_| IpcError::Internal("breadcrumb state poisoned".into()))?;
        *guard = Some(snapshot.clone());
    }
    app.emit(BREADCRUMB_EVENT, &snapshot)
        .map_err(|e| IpcError::Internal(format!("emit breadcrumb event failed: {e}")))?;
    Ok(ok())
}
