//! System-tray installation.
//!
//! Builds a minimal menu (`Open`, `Quit`) and wires it to a single
//! `on_menu_event` handler. The tray icon handle is owned by the Tauri runtime
//! once `TrayIconBuilder::build(app)` returns; no explicit RAII guard is
//! required — when the `App` drops, the tray drops with it.

use tauri::{
    menu::{Menu, MenuItem},
    tray::TrayIconBuilder,
    AppHandle, Manager, Runtime,
};

const MENU_OPEN: &str = "open";
const MENU_QUIT: &str = "quit";
const MAIN_WINDOW_LABEL: &str = "main";

/// Install the system tray on the given `AppHandle`.
///
/// Called from `setup()` in [`crate::run`]. Returns a `tauri::Result` so
/// failures during tray construction surface to the builder.
pub fn install<R: Runtime>(app: &AppHandle<R>) -> tauri::Result<()> {
    let open_item = MenuItem::with_id(app, MENU_OPEN, "Open nexus-dnn", true, None::<&str>)?;
    let quit_item = MenuItem::with_id(app, MENU_QUIT, "Quit", true, None::<&str>)?;
    let menu = Menu::with_items(app, &[&open_item, &quit_item])?;

    TrayIconBuilder::with_id("nexus-dnn-tray")
        .tooltip("nexus-dnn")
        .menu(&menu)
        .show_menu_on_left_click(true)
        .on_menu_event(handle_menu_event)
        .build(app)?;

    Ok(())
}

fn handle_menu_event<R: Runtime>(app: &AppHandle<R>, event: tauri::menu::MenuEvent) {
    match event.id().as_ref() {
        MENU_OPEN => show_main_window(app),
        MENU_QUIT => app.exit(0),
        other => tracing::debug!(menu_id = %other, "unhandled tray menu event"),
    }
}

fn show_main_window<R: Runtime>(app: &AppHandle<R>) {
    let Some(window) = app.get_webview_window(MAIN_WINDOW_LABEL) else {
        tracing::warn!(label = MAIN_WINDOW_LABEL, "tray: main window not found");
        return;
    };
    if let Err(e) = window.show() {
        tracing::warn!(error = %e, "tray: window.show() failed");
    }
    if let Err(e) = window.set_focus() {
        tracing::warn!(error = %e, "tray: window.set_focus() failed");
    }
}
