//! `nexus-dnn-desktop` — Tauri 2.x entry point for spec 042 (Neo-Terminal Desktop Shell).
//!
//! This crate is intentionally thin. The lifecycle (window event handlers,
//! system tray, IPC commands, embedded host startup) lives in the
//! `nexus-desktop-shell` crate (Phase 2 of spec 042). This binary wires the
//! React frontend to that shell.
//!
//! See `specs/042-neo-terminal-shell/plan.md` for the architecture.

pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running nexus-dnn-desktop");
}
