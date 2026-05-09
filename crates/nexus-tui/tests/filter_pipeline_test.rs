//! T054 — `FilterState` AND-composition + live mutation.

use std::sync::Arc;

use nexus_tui::EventId;
use nexus_tui::stream::event_line::{CorrelationKeys, EventLine, RawPayload};
use nexus_tui::stream::filter::{FilterState, FollowTarget};
use nexus_tui::stream::severity::Severity;
use nexus_tui::stream::significance::Significance;
use nexus_tui::stream::source_category::SourceCategory;

fn line(severity: Severity, source: &str, summary: &str, run_id: Option<&str>) -> EventLine {
    EventLine {
        id: EventId::new(),
        timestamp_ms: 0,
        severity,
        significance: Significance::Normal,
        category: SourceCategory::Other,
        source: source.into(),
        summary: summary.into(),
        correlation: CorrelationKeys {
            run_id: run_id.map(String::from),
            ..CorrelationKeys::default()
        },
        raw_payload: Arc::new(RawPayload::NexusEvent(
            nexus_events::types::NexusEvent::WorkflowUpdated {
                workflow_id: "wf".into(),
            },
        )),
    }
}

#[test]
fn level_floor_drops_below_threshold() {
    let mut state = FilterState::default();
    state.set_level_floor(Severity::Warn);
    let info_line = line(Severity::Info, "host.x", "noise", None);
    let warn_line = line(Severity::Warn, "host.x", "warn", None);
    assert!(!state.is_visible(&info_line));
    assert!(state.is_visible(&warn_line));
}

#[test]
fn source_glob_filters_by_pattern() {
    let mut state = FilterState::default();
    state.set_source_glob(Some("deploy:*")).unwrap();
    assert!(state.is_visible(&line(Severity::Info, "deploy:chat-prod", "x", None)));
    assert!(!state.is_visible(&line(Severity::Info, "host.api", "x", None)));
}

#[test]
fn grep_filters_by_summary_match() {
    let mut state = FilterState::default();
    state.set_grep(Some("cuda")).unwrap();
    assert!(state.is_visible(&line(Severity::Info, "host.x", "cuda alloc failed", None)));
    assert!(!state.is_visible(&line(Severity::Info, "host.x", "ok", None)));
}

#[test]
fn paused_drops_everything() {
    let mut state = FilterState::default();
    state.set_paused(true);
    let warn_line = line(Severity::Warn, "host.x", "x", None);
    assert!(!state.is_visible(&warn_line));
}

#[test]
fn follow_run_narrows_to_matching_run_id() {
    let mut state = FilterState::default();
    state.set_follow(Some(FollowTarget::Run("run_a".into())));
    let matching = line(Severity::Info, "run:run_a", "x", Some("run_a"));
    let other = line(Severity::Info, "run:run_b", "x", Some("run_b"));
    assert!(state.is_visible(&matching));
    assert!(!state.is_visible(&other));
}

#[test]
fn filters_compose_with_and() {
    let mut state = FilterState::default();
    state.set_level_floor(Severity::Warn);
    state.set_source_glob(Some("deploy:*")).unwrap();
    let pass = line(Severity::Error, "deploy:chat", "x", None);
    let wrong_source = line(Severity::Error, "host.api", "x", None);
    let too_low = line(Severity::Info, "deploy:chat", "x", None);
    assert!(state.is_visible(&pass));
    assert!(!state.is_visible(&wrong_source));
    assert!(!state.is_visible(&too_low));
}

#[test]
fn clear_filter_resets_all() {
    let mut state = FilterState::default();
    state.set_level_floor(Severity::Error);
    state.set_source_glob(Some("deploy:*")).unwrap();
    state.set_grep(Some("cuda")).unwrap();
    state.set_paused(true);
    state.clear();
    assert!(!state.has_active_filters());
}
