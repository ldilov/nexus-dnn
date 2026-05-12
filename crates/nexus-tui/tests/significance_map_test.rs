use std::collections::BTreeMap;

use nexus_events::types::NexusEvent;
use nexus_tui::stream::source_category::{classify_nexus_event, classify_nexus_event_significance};
use nexus_tui::{Severity, Significance, SourceCategory, should_display};

#[test]
fn severity_total_ordering_matches_declaration_order() {
    assert!(Severity::Debug < Severity::Info);
    assert!(Severity::Info < Severity::Warn);
    assert!(Severity::Warn < Severity::Error);
    assert!(Severity::Error < Severity::Fatal);
}

#[test]
fn severity_parse_is_case_insensitive() {
    assert_eq!(Severity::parse("DEBUG"), Some(Severity::Debug));
    assert_eq!(Severity::parse("info"), Some(Severity::Info));
    assert_eq!(Severity::parse("Warn"), Some(Severity::Warn));
    assert_eq!(Severity::parse("warning"), Some(Severity::Warn));
    assert_eq!(Severity::parse("ERROR"), Some(Severity::Error));
    assert_eq!(Severity::parse("Fatal"), Some(Severity::Fatal));
}

#[test]
fn severity_parse_returns_none_for_garbage() {
    assert_eq!(Severity::parse("garbage"), None);
    assert_eq!(Severity::parse(""), None);
}

#[test]
fn severity_implements_from_str_trait() {
    use std::str::FromStr;
    let parsed: Severity = "Error".parse().expect("parse");
    assert_eq!(parsed, Severity::Error);
    let err = Severity::from_str("garbage");
    assert!(err.is_err());
}

#[test]
fn significance_silent_never_displays() {
    assert!(!should_display(
        Significance::Silent,
        Severity::Error,
        Severity::Info
    ));
    assert!(!should_display(
        Significance::Silent,
        Severity::Fatal,
        Severity::Debug
    ));
}

#[test]
fn significance_hum_visible_only_at_debug_floor() {
    assert!(should_display(
        Significance::Hum,
        Severity::Debug,
        Severity::Debug
    ));
    assert!(!should_display(
        Significance::Hum,
        Severity::Debug,
        Severity::Info
    ));
}

#[test]
fn significance_normal_visible_at_info_or_below() {
    assert!(should_display(
        Significance::Normal,
        Severity::Info,
        Severity::Info
    ));
    assert!(should_display(
        Significance::Normal,
        Severity::Info,
        Severity::Debug
    ));
    assert!(!should_display(
        Significance::Normal,
        Severity::Info,
        Severity::Warn
    ));
}

#[test]
fn significance_loud_visible_unless_floor_is_fatal() {
    assert!(should_display(
        Significance::Loud,
        Severity::Warn,
        Severity::Info
    ));
    assert!(should_display(
        Significance::Loud,
        Severity::Error,
        Severity::Error
    ));
    assert!(!should_display(
        Significance::Loud,
        Severity::Error,
        Severity::Fatal
    ));
}

#[test]
fn significance_critical_always_visible_when_severity_meets_floor() {
    assert!(should_display(
        Significance::Critical,
        Severity::Fatal,
        Severity::Info
    ));
    assert!(should_display(
        Significance::Critical,
        Severity::Fatal,
        Severity::Fatal
    ));
}

#[test]
fn classify_node_progress_to_run_category() {
    let event = NexusEvent::NodeProgress {
        run_id: "r".to_string(),
        node_id: "n".to_string(),
        percent: 42,
        message: "halfway".to_string(),
    };
    assert_eq!(classify_nexus_event(&event), SourceCategory::Run);
}

#[test]
fn classify_host_log_to_host_category() {
    let event = NexusEvent::HostLog {
        level: "info".to_string(),
        target: "test".to_string(),
        message: "hi".to_string(),
        fields: BTreeMap::new(),
        span_path: None,
        timestamp_ms: 0,
    };
    assert_eq!(classify_nexus_event(&event), SourceCategory::Host);
}

#[test]
fn significance_for_node_progress_is_silent() {
    let event = NexusEvent::NodeProgress {
        run_id: "r".to_string(),
        node_id: "n".to_string(),
        percent: 10,
        message: String::new(),
    };
    assert_eq!(
        classify_nexus_event_significance(&event),
        Significance::Silent
    );
}

#[test]
fn significance_for_node_failed_is_loud() {
    let event = NexusEvent::NodeFailed {
        run_id: "r".to_string(),
        node_id: "n".to_string(),
        error: "boom".to_string(),
    };
    assert_eq!(
        classify_nexus_event_significance(&event),
        Significance::Loud
    );
}

#[test]
fn significance_for_storage_drift_is_critical() {
    let event = NexusEvent::StorageIntegrityDriftDetected {
        extension_id: "x".to_string(),
        namespace_id: "n".to_string(),
        objects: vec!["foo".to_string()],
    };
    assert_eq!(
        classify_nexus_event_significance(&event),
        Significance::Critical
    );
}

#[test]
fn significance_for_host_log_info_is_normal() {
    let event = NexusEvent::HostLog {
        level: "info".to_string(),
        target: "test".to_string(),
        message: "hi".to_string(),
        fields: BTreeMap::new(),
        span_path: None,
        timestamp_ms: 0,
    };
    assert_eq!(
        classify_nexus_event_significance(&event),
        Significance::Normal
    );
}

#[test]
fn significance_for_host_log_warn_is_loud() {
    let event = NexusEvent::HostLog {
        level: "warn".to_string(),
        target: "test".to_string(),
        message: "careful".to_string(),
        fields: BTreeMap::new(),
        span_path: None,
        timestamp_ms: 0,
    };
    assert_eq!(
        classify_nexus_event_significance(&event),
        Significance::Loud
    );
}
