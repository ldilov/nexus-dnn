//! Integration tests for Shift+wheel scrollback passthrough.
//!
//! Covers FR — Shift+ScrollUp/Down toggles a ScrollbackPassthrough state
//! machine; after a debounce window of inactivity the state reverts so
//! the runtime can reclaim mouse capture.

use std::time::{Duration, Instant};

use crossterm::event::{KeyModifiers, MouseEvent, MouseEventKind};
use nexus_tui::mouse::capture::should_bypass;
use nexus_tui::mouse::scrollback::{DEBOUNCE, ScrollbackPassthrough};

fn mouse_event(kind: MouseEventKind, modifiers: KeyModifiers) -> MouseEvent {
    MouseEvent {
        kind,
        column: 1,
        row: 1,
        modifiers,
    }
}

fn is_shift_wheel(event: &MouseEvent) -> bool {
    event.modifiers.contains(KeyModifiers::SHIFT)
        && matches!(
            event.kind,
            MouseEventKind::ScrollUp | MouseEventKind::ScrollDown
        )
}

#[test]
fn shift_scroll_up_triggers_activation() {
    let now = Instant::now();
    let state = ScrollbackPassthrough::new(now);
    let event = mouse_event(MouseEventKind::ScrollUp, KeyModifiers::SHIFT);

    assert!(is_shift_wheel(&event));
    let activating = state.record_event(now);
    assert!(activating, "first Shift+ScrollUp activates passthrough");
    assert!(state.is_active());
}

#[test]
fn shift_scroll_down_triggers_activation() {
    let now = Instant::now();
    let state = ScrollbackPassthrough::new(now);
    let event = mouse_event(MouseEventKind::ScrollDown, KeyModifiers::SHIFT);

    assert!(is_shift_wheel(&event));
    let activating = state.record_event(now);
    assert!(activating);
    assert!(state.is_active());
}

#[test]
fn shift_left_click_is_not_wheel_passthrough() {
    let event = mouse_event(
        MouseEventKind::Down(crossterm::event::MouseButton::Left),
        KeyModifiers::SHIFT,
    );
    assert!(
        !is_shift_wheel(&event),
        "Shift+click is a separate bypass — does NOT toggle passthrough"
    );
    // It still bypasses click registration (existing behaviour).
    assert!(should_bypass(&event));
}

#[test]
fn unmodified_wheel_does_not_activate_passthrough() {
    let event = mouse_event(MouseEventKind::ScrollUp, KeyModifiers::NONE);
    assert!(!is_shift_wheel(&event));
    // It does still bypass click handling (existing should_bypass rule).
    assert!(should_bypass(&event));
}

#[test]
fn debounce_window_keeps_passthrough_active_across_burst() {
    let now = Instant::now();
    let state = ScrollbackPassthrough::new(now);

    // Burst of three Shift+wheel events 300ms apart — total 600ms.
    state.record_event(now);
    state.record_event(now + Duration::from_millis(300));
    state.record_event(now + Duration::from_millis(600));

    // Still within debounce relative to the LAST event.
    assert!(state.is_active());
    assert!(!state.should_release(now + Duration::from_millis(900)));

    // After (600 + DEBOUNCE) ms total, watchdog reclaims.
    let release_at = now + Duration::from_millis(600) + DEBOUNCE + Duration::from_millis(1);
    assert!(state.should_release(release_at));
    assert!(!state.is_active());
}

#[test]
fn release_happens_exactly_once_per_activation_cycle() {
    let now = Instant::now();
    let state = ScrollbackPassthrough::new(now);
    state.record_event(now);

    let release_at = now + DEBOUNCE + Duration::from_millis(10);
    assert!(state.should_release(release_at));
    // Subsequent ticks must not re-release — guards against
    // double-enable_mouse_capture calls.
    assert!(!state.should_release(release_at + Duration::from_millis(100)));
    assert!(!state.should_release(release_at + Duration::from_secs(5)));
}
