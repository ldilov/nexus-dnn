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

/// S1.b — `/grep` widened match surface. Today the regex tests
/// `summary` first, then `source`, then (for `HostLog` payloads) the
/// tracing target, every key/value pair in `fields`, and any
/// `span_path` segment. Pre-S1, only `summary` was tested — which is
/// why typing `/grep host` showed nothing on a startup line whose
/// summary was "nexus-dnn api server listening" but whose source was
/// "host.nexus_core::app".
#[test]
fn grep_matches_source_label_not_just_summary() {
    let mut state = FilterState::default();
    state.set_grep(Some("nexus_core")).unwrap();
    let l = line(
        Severity::Info,
        "host.nexus_core::app",
        "nexus-dnn api server listening",
        None,
    );
    assert!(state.is_visible(&l));
}

#[test]
fn grep_matches_host_log_target_and_fields() {
    use std::collections::BTreeMap;
    let mut fields = BTreeMap::new();
    fields.insert("port".to_string(), "3000".to_string());
    fields.insert("backend".to_string(), "llamacpp".to_string());
    let raw = nexus_events::types::NexusEvent::HostLog {
        level: "info".into(),
        target: "nexus_core::http_api".into(),
        message: "listening".into(),
        fields,
        span_path: Some(vec!["app".into(), "boot".into()]),
        timestamp_ms: 0,
    };
    let evt = EventLine {
        id: EventId::new(),
        timestamp_ms: 0,
        severity: Severity::Info,
        significance: Significance::Normal,
        category: SourceCategory::Host,
        source: "host.app".into(),
        summary: "listening".into(),
        correlation: CorrelationKeys::default(),
        raw_payload: Arc::new(RawPayload::NexusEvent(raw)),
    };
    let mut state = FilterState::default();

    // target match
    state.set_grep(Some("http_api")).unwrap();
    assert!(state.is_visible(&evt), "should match HostLog.target");

    // field value match
    state.set_grep(Some("llamacpp")).unwrap();
    assert!(state.is_visible(&evt), "should match a fields value");

    // field key match
    state.set_grep(Some("^port$")).unwrap();
    assert!(state.is_visible(&evt), "should match a fields key");

    // span path match
    state.set_grep(Some("boot")).unwrap();
    assert!(state.is_visible(&evt), "should match span_path segment");

    // no match — drop
    state.set_grep(Some("doesnotexist")).unwrap();
    assert!(!state.is_visible(&evt));
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
