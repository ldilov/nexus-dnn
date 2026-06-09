//! T033 — variant → `Significance` + `SourceCategory` mapping per FR-047a.
//!
//! Verifies the public `classify()` function exposed by the stream module
//! returns the correct significance and category tuple for a sampling of
//! NexusEvent variants. Spot-checks one representative per category and
//! one of every significance bucket.

use std::collections::BTreeMap;

use nexus_events::types::NexusEvent;
use nexus_tui::stream::significance::{Significance, classify};
use nexus_tui::stream::source_category::SourceCategory;

#[test]
fn run_progress_classifies_as_silent_run_category() {
    let event = NexusEvent::NodeProgress {
        run_id: "run_a".into(),
        node_id: "n1".into(),
        percent: 42,
        message: String::new(),
    };
    let (sig, cat) = classify(&event);
    assert_eq!(sig, Significance::Silent);
    assert_eq!(cat, SourceCategory::Run);
}

#[test]
fn host_log_info_classifies_as_normal_host_category() {
    let event = NexusEvent::HostLog {
        level: "info".into(),
        target: "nexus_api".into(),
        message: "ready".into(),
        fields: BTreeMap::new(),
        span_path: None,
        timestamp_ms: 0,
    };
    let (sig, cat) = classify(&event);
    assert_eq!(sig, Significance::Normal);
    assert_eq!(cat, SourceCategory::Host);
}

#[test]
fn node_failed_classifies_as_loud_run_category() {
    let event = NexusEvent::NodeFailed {
        run_id: "run_a".into(),
        node_id: "n1".into(),
        error: "boom".into(),
    };
    let (sig, cat) = classify(&event);
    assert_eq!(sig, Significance::Loud);
    assert_eq!(cat, SourceCategory::Run);
}

#[test]
fn storage_drift_classifies_as_critical_storage_category() {
    let event = NexusEvent::StorageIntegrityDriftDetected {
        extension_id: "ext".into(),
        namespace_id: "ns".into(),
        objects: vec![],
    };
    let (sig, cat) = classify(&event);
    assert_eq!(sig, Significance::Critical);
    assert_eq!(cat, SourceCategory::Storage);
}

#[test]
fn worker_health_changed_classifies_as_loud_worker_category() {
    let event = NexusEvent::WorkerHealthChanged {
        worker_id: "w1".into(),
        old_status: "healthy".into(),
        new_status: "unhealthy".into(),
    };
    let (sig, cat) = classify(&event);
    assert_eq!(sig, Significance::Loud);
    assert_eq!(cat, SourceCategory::Worker);
}

#[test]
fn deployment_deleted_classifies_as_loud_deploy_category() {
    let event = NexusEvent::DeploymentDeleted {
        deployment_id: "d1".into(),
        deleted_at: "now".into(),
    };
    let (sig, cat) = classify(&event);
    assert_eq!(sig, Significance::Loud);
    assert_eq!(cat, SourceCategory::Deploy);
}

#[test]
fn extension_install_progress_classifies_as_hum_extension_category() {
    let event = NexusEvent::ExtensionInstallStepProgress {
        extension_id: "ext".into(),
        install_run_id: "ir1".into(),
        step_id: "step".into(),
        phase: "downloading".into(),
        current_bytes: 10,
        total_bytes: 100,
        message: String::new(),
        pct: Some(10.0),
    };
    let (sig, cat) = classify(&event);
    assert_eq!(sig, Significance::Hum);
    assert_eq!(cat, SourceCategory::Extension);
}
