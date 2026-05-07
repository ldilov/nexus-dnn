//! Window-lifecycle helpers.
//!
//! Phase 2 contains the close-to-tray skeleton. Phase 3 (US1) will fill in
//! titlebar breadcrumb persistence and drag-region helpers.
//!
//! The actual `on_window_event` closure is installed in [`crate::run`]; this
//! module exposes the inner reusable handler so it can be unit-tested without
//! a live `tauri::Builder`.

use tauri::{Runtime, Window, WindowEvent};

/// Reaction taken by [`handle_window_event`].
///
/// Exposed for unit testing — production code never inspects this directly;
/// the side effects on `Window` and the `prevent_close` API call are the
/// observable behaviour.
#[derive(Debug, PartialEq, Eq)]
pub enum WindowAction {
    /// `WindowEvent::CloseRequested` — hide the window, prevent default close.
    HideAndPrevent,
    /// All other events — let Tauri handle defaults.
    PassThrough,
}

/// Classify a `WindowEvent`. Pure function — no side effects.
pub fn classify(event: &WindowEvent) -> WindowAction {
    match event {
        WindowEvent::CloseRequested { .. } => WindowAction::HideAndPrevent,
        _ => WindowAction::PassThrough,
    }
}

/// Apply the `WindowAction` for a `CloseRequested` event.
///
/// Hides the window (so it stays alive in the system tray) and asks Tauri to
/// not perform the default close behaviour. Errors from `window.hide()` are
/// logged but not propagated — close-to-tray is best-effort and a failure
/// here should not crash the app.
pub fn apply_close_to_tray<R: Runtime>(window: &Window<R>) {
    if let Err(e) = window.hide() {
        tracing::warn!(error = %e, "close-to-tray: window.hide() failed");
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn destroyed_passes_through() {
        let event = WindowEvent::Destroyed;
        assert_eq!(classify(&event), WindowAction::PassThrough);
    }

    #[test]
    fn focused_passes_through() {
        let event = WindowEvent::Focused(true);
        assert_eq!(classify(&event), WindowAction::PassThrough);
    }
}
