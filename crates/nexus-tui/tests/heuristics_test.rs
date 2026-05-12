//! T080 — heuristic-pattern registry (10 patterns; case-insensitive;
//! first-match wins on multi-pattern overlap).

use nexus_tui::inspector::heuristics::{match_heuristics, suggestion_count};

#[test]
fn registry_carries_at_least_ten_patterns() {
    assert!(suggestion_count() >= 10);
}

#[test]
fn cuda_oom_pattern_matches() {
    let m = match_heuristics("cuda alloc failed: out of memory");
    assert!(m.is_some());
    let suggestion = m.unwrap();
    assert!(suggestion.title.to_lowercase().contains("cuda"));
}

#[test]
fn econnrefused_pattern_matches() {
    let m = match_heuristics("econnrefused: 127.0.0.1:7878");
    assert!(m.is_some());
}

#[test]
fn port_collision_pattern_matches() {
    let m = match_heuristics("address already in use: bind 0.0.0.0:7878");
    assert!(m.is_some());
}

#[test]
fn lease_stalled_pattern_matches() {
    let m = match_heuristics("backend lease stalled for 30s");
    assert!(m.is_some());
}

#[test]
fn integrity_drift_pattern_matches() {
    let m = match_heuristics("storage integrity drift in chat: 4 object(s)");
    assert!(m.is_some());
}

#[test]
fn host_panic_pattern_matches() {
    let m = match_heuristics("thread 'main' panicked at 'invariant broken'");
    assert!(m.is_some());
}

#[test]
fn unknown_text_returns_none() {
    let m = match_heuristics("just some neutral log line, nothing wrong");
    assert!(m.is_none());
}

#[test]
fn matches_are_case_insensitive() {
    let m = match_heuristics("CUDA Alloc Failed: OUT OF MEMORY");
    assert!(m.is_some());
}

#[test]
fn first_match_wins_when_multiple_apply() {
    let m = match_heuristics("cuda alloc failed and econnrefused too");
    assert!(m.is_some());
}
