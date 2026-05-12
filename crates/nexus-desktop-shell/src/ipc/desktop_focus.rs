//! `DesktopFocusBridge` host-side surface for spec 044 US5.
//!
//! Wraps a Tauri `AppHandle` and exposes the two operations the
//! `nexus-api` `POST /api/v1/desktop/focus` handler needs:
//!   - `is_desktop_connected()` — true if the main window can be found.
//!   - `focus_window_with_route(route)` — set focus and emit a navigation
//!     event the frontend listens to.
//!
//! The binary at `apps/web/src-tauri/` is responsible for implementing
//! the `nexus_api::handlers::desktop::focus::DesktopFocusBridge` trait
//! against this struct (the trait lives in `nexus-api` to keep this
//! shell crate free of a reverse dependency).

use crate::errors::{IpcError, IpcResult};
use tauri::{AppHandle, Emitter, Manager, Runtime};

const MAIN_WINDOW_LABEL: &str = "main";
const FOCUS_NAVIGATE_EVENT: &str = "desktop:focused";

#[derive(Clone)]
pub struct DesktopFocusHandle<R: Runtime> {
    app: AppHandle<R>,
}

impl<R: Runtime> DesktopFocusHandle<R> {
    pub fn new(app: AppHandle<R>) -> Self {
        Self { app }
    }

    pub fn is_desktop_connected(&self) -> bool {
        self.app.get_webview_window(MAIN_WINDOW_LABEL).is_some()
    }

    /// Show + focus the main window and emit the navigation event.
    ///
    /// Failure mode: if `set_focus` fails after `show` succeeded the
    /// window stays visible — the caller sees an `Internal` error and
    /// reports it; the desktop is left in a visible-but-unfocused state.
    /// The route event is only emitted after both ops succeed, so a
    /// partial failure produces no stale frontend navigation.
    pub fn focus_window_with_route(&self, route: &str) -> IpcResult<()> {
        let window = self
            .app
            .get_webview_window(MAIN_WINDOW_LABEL)
            .ok_or_else(|| IpcError::Internal(format!("window '{MAIN_WINDOW_LABEL}' not found")))?;
        window
            .show()
            .map_err(|e| IpcError::Internal(format!("window.show failed: {e}")))?;
        window
            .set_focus()
            .map_err(|e| IpcError::Internal(format!("window.set_focus failed: {e}")))?;
        self.app
            .emit(FOCUS_NAVIGATE_EVENT, route.to_string())
            .map_err(|e| IpcError::Internal(format!("emit focus event failed: {e}")))?;
        Ok(())
    }
}
