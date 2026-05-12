//! T057 — `RateGuard` (200/s condensation, 2s repeat collapse).

use std::time::{Duration, Instant};

use nexus_tui::stream::rate_guard::{RateGuard, RateGuardDecision};

#[test]
fn under_threshold_with_distinct_summaries_passes_unchanged() {
    let mut guard = RateGuard::default();
    let base = Instant::now();
    for i in 0..5 {
        let summary = format!("ok #{i}");
        let decision = guard.observe("host.api", &summary, base + Duration::from_millis(i * 10));
        assert!(
            matches!(decision, RateGuardDecision::Render),
            "got {decision:?}"
        );
    }
}

#[test]
fn extreme_burst_condenses() {
    let mut guard = RateGuard::default();
    let base = Instant::now();
    let mut condensed = 0;
    for i in 0..300 {
        let decision = guard.observe("host.busy", "spam", base + Duration::from_millis(i));
        if matches!(decision, RateGuardDecision::Condensed { .. }) {
            condensed += 1;
        }
    }
    assert!(condensed > 0, "should condense some events at 300/s burst");
}

#[test]
fn repeat_summary_is_collapsed_within_window() {
    let mut guard = RateGuard::default();
    let base = Instant::now();
    let _ = guard.observe("host.x", "duplicate", base);
    let decision = guard.observe("host.x", "duplicate", base + Duration::from_millis(500));
    assert!(matches!(
        decision,
        RateGuardDecision::Repeat { count: 2, .. }
    ));
}

#[test]
fn repeat_collapse_resets_after_window_expires() {
    let mut guard = RateGuard::default();
    let base = Instant::now();
    let _ = guard.observe("host.x", "dup", base);
    let later = guard.observe("host.x", "dup", base + Duration::from_secs(3));
    assert!(matches!(later, RateGuardDecision::Render));
}

#[test]
fn different_summaries_do_not_collapse() {
    let mut guard = RateGuard::default();
    let base = Instant::now();
    let _ = guard.observe("host.x", "first", base);
    let next = guard.observe("host.x", "second", base + Duration::from_millis(100));
    assert!(matches!(next, RateGuardDecision::Render));
}
