//! T032 — SSE client reconnect with `Last-Event-ID` + exponential backoff.
//!
//! These tests exercise the *backoff schedule* and *resume header* logic
//! in isolation from a real HTTP round-trip. The client owns a small
//! pure module `backoff` with a `next_delay(attempt)` function that is
//! the unit under test. The HTTP-level reconnect loop wraps it.

use std::time::Duration;

use nexus_tui::stream::client::{ReconnectBackoff, ResumeState};

#[test]
fn backoff_starts_at_100ms() {
    let mut bo = ReconnectBackoff::default();
    let first = bo.next_delay();
    assert_eq!(first, Duration::from_millis(100));
}

#[test]
fn backoff_doubles_each_attempt() {
    let mut bo = ReconnectBackoff::default();
    let delays: Vec<Duration> = (0..6).map(|_| bo.next_delay()).collect();
    assert_eq!(delays[0], Duration::from_millis(100));
    assert_eq!(delays[1], Duration::from_millis(200));
    assert_eq!(delays[2], Duration::from_millis(400));
    assert_eq!(delays[3], Duration::from_millis(800));
    assert_eq!(delays[4], Duration::from_millis(1600));
    assert_eq!(delays[5], Duration::from_millis(3200));
}

#[test]
fn backoff_caps_at_5_seconds() {
    let mut bo = ReconnectBackoff::default();
    for _ in 0..30 {
        let _ = bo.next_delay();
    }
    let final_delay = bo.next_delay();
    assert!(
        final_delay <= Duration::from_secs(5),
        "backoff capped at 5s, got {final_delay:?}"
    );
    assert!(
        final_delay >= Duration::from_secs(3),
        "backoff at long tail must approach the cap, got {final_delay:?}"
    );
}

#[test]
fn backoff_resets_to_initial_after_success() {
    let mut bo = ReconnectBackoff::default();
    for _ in 0..3 {
        let _ = bo.next_delay();
    }
    bo.reset();
    let first_after_reset = bo.next_delay();
    assert_eq!(first_after_reset, Duration::from_millis(100));
}

#[test]
fn resume_state_records_highest_event_id() {
    let mut state = ResumeState::default();
    assert!(state.last_event_id().is_none());
    state.record("01HZX0000000000000000000A");
    state.record("01HZX0000000000000000000B");
    state.record("01HZX0000000000000000000A"); // out of order shouldn't lower
    assert_eq!(
        state.last_event_id(),
        Some("01HZX0000000000000000000B".to_string())
    );
}

#[test]
fn resume_state_emits_last_event_id_header_after_record() {
    let mut state = ResumeState::default();
    state.record("01HZX0000000000000000000A");
    let header = state.last_event_id_header();
    assert_eq!(header, Some("01HZX0000000000000000000A".to_string()));
}
