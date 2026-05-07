//! `nexus-dnn-desktop` — Tauri 2.x entry point for spec 042 (Neo-Terminal Desktop Shell).
//!
//! This crate is intentionally thin. The lifecycle (window event handlers,
//! system tray, IPC commands, embedded host startup) lives in the
//! [`nexus_desktop_shell`] crate. This binary's only job is to call
//! `tauri::generate_context!()` (which must be invoked from the binary crate
//! so it locates `tauri.conf.json` correctly) and forward the result.
//!
//! See `specs/042-neo-terminal-shell/plan.md` for the architecture.

pub fn run() {
    let context: tauri::Context<tauri::Wry> = tauri::generate_context!();
    if let Err(error) = nexus_desktop_shell::run(context) {
        tracing::error!(%error, "nexus-dnn-desktop failed to start");
        std::process::exit(1);
    }
}
