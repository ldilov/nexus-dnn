//! T090 — Mouse-modifier bypass logic.
//!
//! Per FR-011: Shift-click + drag + scroll wheel all bypass the click
//! registry so the terminal's native selection / scrollback survives.

use crossterm::event::{KeyModifiers, MouseEvent, MouseEventKind};
use nexus_tui::mouse::capture::should_bypass;

fn ev(kind: MouseEventKind, modifiers: KeyModifiers) -> MouseEvent {
    MouseEvent {
        kind,
        column: 1,
        row: 1,
        modifiers,
    }
}

#[test]
fn shift_click_bypasses() {
    let event = ev(
        MouseEventKind::Down(crossterm::event::MouseButton::Left),
        KeyModifiers::SHIFT,
    );
    assert!(should_bypass(&event));
}

#[test]
fn drag_bypasses() {
    let event = ev(
        MouseEventKind::Drag(crossterm::event::MouseButton::Left),
        KeyModifiers::NONE,
    );
    assert!(should_bypass(&event));
}

#[test]
fn scroll_up_bypasses() {
    let event = ev(MouseEventKind::ScrollUp, KeyModifiers::NONE);
    assert!(should_bypass(&event));
}

#[test]
fn scroll_down_bypasses() {
    let event = ev(MouseEventKind::ScrollDown, KeyModifiers::NONE);
    assert!(should_bypass(&event));
}

#[test]
fn plain_left_click_does_not_bypass() {
    let event = ev(
        MouseEventKind::Down(crossterm::event::MouseButton::Left),
        KeyModifiers::NONE,
    );
    assert!(!should_bypass(&event));
}

#[test]
fn plain_right_click_does_not_bypass() {
    let event = ev(
        MouseEventKind::Down(crossterm::event::MouseButton::Right),
        KeyModifiers::NONE,
    );
    assert!(!should_bypass(&event));
}
