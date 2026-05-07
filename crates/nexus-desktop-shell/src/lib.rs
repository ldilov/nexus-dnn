//! `nexus-desktop-shell` — generic Tauri 2.x shell for the nexus-dnn desktop binary.
//!
//! This crate owns the host-shaped desktop concerns documented in
//! [`README.md`](../README.md): window lifecycle, system tray, IPC dispatcher.
//!
//! The binary at `apps/web/src-tauri/` calls [`run`] from its `lib.rs`.
//! Phase 2 (T021–T025) ships the dispatcher with stubbed command bodies; the
//! embedded `nexus-api` host is not started here — that wiring lands in T032
//! (Phase 3, US1).
//!
//! Per **Principle XIII** this crate must remain free of extension-id
//! literals. The dispatcher routes by command name only.

pub mod errors;
pub mod ipc;
pub mod tray;
pub mod window;

pub use errors::{IpcError, IpcResult};

use tauri::{Context, RunEvent, Runtime};

/// Build and run the Tauri application using the supplied generated context.
///
/// `tauri::generate_context!()` resolves paths relative to the **binary**
/// crate (it reads `tauri.conf.json` next to the caller's `Cargo.toml`), so
/// the binary at `apps/web/src-tauri/` invokes the macro and passes the
/// resulting [`Context`] in.
///
/// Returns once the user explicitly quits via the tray's `Quit` item or via
/// platform-level `app.exit(0)`. Returns `tauri::Error` if the builder
/// itself fails (e.g., asset resolution).
pub fn run<R: Runtime>(context: Context<R>) -> tauri::Result<()> {
    let app = ipc::register(tauri::Builder::<R>::new())
        .on_window_event(|window, event| {
            if matches!(
                window::classify(event),
                window::WindowAction::HideAndPrevent
            ) {
                window::apply_close_to_tray(window);
                if let tauri::WindowEvent::CloseRequested { api, .. } = event {
                    api.prevent_close();
                }
            }
        })
        .setup(|app| {
            let handle = app.handle().clone();
            tray::install(&handle)?;
            Ok(())
        })
        .build(context)?;

    app.run(|_app, event| {
        if let RunEvent::ExitRequested { api, code, .. } = event {
            if code.is_none() {
                api.prevent_exit();
            }
        }
    });

    Ok(())
}
