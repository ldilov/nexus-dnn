//! Generic IPC dispatcher.
//!
//! Per Principle XIII, this module knows nothing about specific extensions —
//! it routes commands by name, not by domain. Phase 3 (US1) fills in window,
//! tray, and host-port command bodies; the remaining `run_events_*`,
//! `runtime_tuning_*`, `block_*`, and `pulse_floor_*` stubs are filled in by
//! later phases.

pub mod block;
pub mod host;
pub mod pulse_floor;
pub mod run_events;
pub mod runtime_tuning;
pub mod tray;
pub mod window;

/// Schema-version literal returned in every response envelope.
///
/// Centralised here so a future bump only touches one constant.
pub const SCHEMA_V1: &str = "nexus.host-cmd.v1";

/// Register every `cmd_*` declared in this module on the given builder.
///
/// Called once from [`crate::run`] before any other builder mutation. Adding
/// a command requires three changes: (1) the command function, (2) inclusion
/// in `tauri::generate_handler![..]` below, (3) the corresponding allow entry
/// in `apps/web/src-tauri/capabilities/default.json`.
pub fn register<R: tauri::Runtime>(builder: tauri::Builder<R>) -> tauri::Builder<R> {
    builder
        .manage(window::BreadcrumbState::default())
        .invoke_handler(tauri::generate_handler![
            run_events::cmd_run_events_subscribe,
            run_events::cmd_run_events_query_window,
            run_events::cmd_run_events_bucketed,
            runtime_tuning::cmd_runtime_tuning_patch,
            window::cmd_window_show,
            window::cmd_window_hide,
            window::cmd_window_focus,
            window::cmd_window_set_titlebar_breadcrumb,
            tray::cmd_tray_set_state,
            block::cmd_block_register_mnemonic,
            pulse_floor::cmd_pulse_floor_metrics_subscribe,
            host::cmd_host_port,
        ])
}
