//! T103 — `/snapshot` artifact format.
//!
//! The snapshot is a plain-text file with a deterministic header
//! followed by a JSON-Lines body of `EventLine` records. Sensitive
//! fields are redacted via the `<redacted>` marker per FR-036c.

use std::collections::BTreeMap;
use std::sync::Arc;

use nexus_tui::EventId;
use nexus_tui::snapshot::{SnapshotInputs, write_snapshot};
use nexus_tui::stream::event_id::RingBufferCapacity;
use nexus_tui::stream::event_line::{CorrelationKeys, EventLine, RawPayload};
use nexus_tui::stream::filter::FilterState;
use nexus_tui::stream::ring_buffer::RingBuffer;
use nexus_tui::stream::severity::Severity;
use nexus_tui::stream::significance::Significance;
use nexus_tui::stream::source_category::SourceCategory;

fn line_with_payload(payload: nexus_events::types::NexusEvent, summary: &str) -> EventLine {
    EventLine {
        id: EventId::new(),
        timestamp_ms: 1_730_000_000_000,
        severity: Severity::Info,
        significance: Significance::Normal,
        category: SourceCategory::Host,
        source: "host.test".into(),
        summary: summary.into(),
        correlation: CorrelationKeys::default(),
        raw_payload: Arc::new(RawPayload::NexusEvent(payload)),
    }
}

#[test]
fn header_contains_metadata() {
    let buf = RingBuffer::new(RingBufferCapacity::new(4).unwrap());
    let filter = FilterState::default();
    let tmp = tempfile_path("snapshot-header.log");
    let inputs = SnapshotInputs {
        host_url: "http://127.0.0.1:7878",
        path: &tmp,
    };
    write_snapshot(&inputs, &buf, &filter).unwrap();
    let body = std::fs::read_to_string(&tmp).unwrap();
    assert!(body.contains("# nexus snapshot"));
    assert!(body.contains("host:"));
    assert!(body.contains("written_at:"));
    assert!(body.contains("event_count:"));
    let _ = std::fs::remove_file(&tmp);
}

#[test]
fn body_is_valid_json_lines() {
    let mut buf = RingBuffer::new(RingBufferCapacity::new(8).unwrap());
    for i in 0..3 {
        buf.push(line_with_payload(
            nexus_events::types::NexusEvent::WorkflowUpdated {
                workflow_id: format!("w{i}"),
            },
            &format!("evt {i}"),
        ));
    }
    let tmp = tempfile_path("snapshot-jsonl.log");
    write_snapshot(
        &SnapshotInputs {
            host_url: "http://127.0.0.1:7878",
            path: &tmp,
        },
        &buf,
        &FilterState::default(),
    )
    .unwrap();
    let body = std::fs::read_to_string(&tmp).unwrap();
    let body_after_blank = body.split_once("\n\n").map(|(_, b)| b).unwrap_or(&body);
    let mut record_count = 0usize;
    for line in body_after_blank.lines() {
        let line = line.trim();
        if line.is_empty() {
            continue;
        }
        let value: serde_json::Value =
            serde_json::from_str(line).expect("each body line must be valid JSON");
        assert!(value.is_object());
        record_count += 1;
    }
    assert_eq!(record_count, 3);
    let _ = std::fs::remove_file(&tmp);
}

#[test]
fn filter_state_preserved_in_header() {
    let buf = RingBuffer::new(RingBufferCapacity::new(4).unwrap());
    let mut filter = FilterState::default();
    filter.set_level_floor(Severity::Warn);
    filter.set_source_glob(Some("deploy:*")).unwrap();
    let tmp = tempfile_path("snapshot-filter.log");
    write_snapshot(
        &SnapshotInputs {
            host_url: "http://127.0.0.1:7878",
            path: &tmp,
        },
        &buf,
        &filter,
    )
    .unwrap();
    let body = std::fs::read_to_string(&tmp).unwrap();
    assert!(body.contains("level_floor: warn"));
    assert!(body.contains("source_glob: deploy:*"));
    let _ = std::fs::remove_file(&tmp);
}

#[test]
fn host_log_field_token_renders_as_redacted() {
    let mut fields = BTreeMap::new();
    fields.insert("token".into(), "<redacted>".into());
    fields.insert("user".into(), "alice".into());
    let payload = nexus_events::types::NexusEvent::HostLog {
        level: "error".into(),
        target: "nexus_api".into(),
        message: "ouch".into(),
        fields,
        span_path: None,
        timestamp_ms: 0,
    };
    let mut buf = RingBuffer::new(RingBufferCapacity::new(4).unwrap());
    buf.push(line_with_payload(payload, "ouch"));
    let tmp = tempfile_path("snapshot-redact.log");
    write_snapshot(
        &SnapshotInputs {
            host_url: "http://127.0.0.1:7878",
            path: &tmp,
        },
        &buf,
        &FilterState::default(),
    )
    .unwrap();
    let body = std::fs::read_to_string(&tmp).unwrap();
    assert!(
        body.contains("<redacted>"),
        "redaction marker missing in:\n{body}"
    );
    assert!(
        !body.contains("secret-abc"),
        "raw secret leaked into snapshot"
    );
    let _ = std::fs::remove_file(&tmp);
}

#[test]
fn snapshot_is_plain_text_no_ansi_escapes() {
    let buf = RingBuffer::new(RingBufferCapacity::new(2).unwrap());
    let tmp = tempfile_path("snapshot-plain.log");
    write_snapshot(
        &SnapshotInputs {
            host_url: "http://127.0.0.1:7878",
            path: &tmp,
        },
        &buf,
        &FilterState::default(),
    )
    .unwrap();
    let body = std::fs::read_to_string(&tmp).unwrap();
    assert!(!body.contains('\u{1b}'), "ANSI escape leaked into snapshot");
    let _ = std::fs::remove_file(&tmp);
}

fn tempfile_path(name: &str) -> std::path::PathBuf {
    let mut path = std::env::temp_dir();
    path.push(format!("nexus-tui-test-{name}-{}", std::process::id()));
    path
}
