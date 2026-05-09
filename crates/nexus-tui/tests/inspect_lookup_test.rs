//! T078 — `/inspect` lookup-by-id via the RingBuffer id_index.

use std::sync::Arc;

use nexus_tui::EventId;
use nexus_tui::stream::event_id::RingBufferCapacity;
use nexus_tui::stream::event_line::{CorrelationKeys, EventLine, RawPayload};
use nexus_tui::stream::ring_buffer::RingBuffer;
use nexus_tui::stream::severity::Severity;
use nexus_tui::stream::significance::Significance;
use nexus_tui::stream::source_category::SourceCategory;

fn line(seq: u64, source: &str) -> EventLine {
    EventLine {
        id: EventId::new(),
        timestamp_ms: seq as i64,
        severity: Severity::Info,
        significance: Significance::Normal,
        category: SourceCategory::Other,
        source: source.to_string(),
        summary: format!("evt {seq}"),
        correlation: CorrelationKeys::default(),
        raw_payload: Arc::new(RawPayload::NexusEvent(
            nexus_events::types::NexusEvent::WorkflowUpdated {
                workflow_id: format!("w{seq}"),
            },
        )),
    }
}

#[test]
fn lookup_by_id_finds_event_by_full_ulid() {
    let mut buf = RingBuffer::new(RingBufferCapacity::new(8).unwrap());
    let target = line(1, "host.x");
    let target_id = target.id;
    buf.push(target);
    buf.push(line(2, "host.x"));
    let found = buf.inspect_by_id(target_id);
    assert!(found.is_some());
    assert_eq!(found.unwrap().summary, "evt 1");
}

#[test]
fn lookup_by_full_id_string_round_trip() {
    use nexus_tui::repl::inspect::find_event_by_id_str;
    let mut buf = RingBuffer::new(RingBufferCapacity::new(4).unwrap());
    let target = line(7, "deploy:foo");
    let target_id_str = format!("{}", target.id);
    buf.push(target);
    let found = find_event_by_id_str(&buf, &target_id_str);
    assert!(found.is_some());
    assert_eq!(found.unwrap().summary, "evt 7");
}

#[test]
fn lookup_by_short_prefix_matches_uniquely() {
    use nexus_tui::repl::inspect::find_event_by_id_str;
    let mut buf = RingBuffer::new(RingBufferCapacity::new(4).unwrap());
    let target = line(7, "deploy:foo");
    let target_id_full = format!("{}", target.id);
    let prefix: String = target_id_full.chars().take(8).collect();
    buf.push(target);
    let found = find_event_by_id_str(&buf, &prefix);
    assert!(found.is_some(), "prefix {prefix} should match");
}

#[test]
fn lookup_unknown_id_returns_none() {
    use nexus_tui::repl::inspect::find_event_by_id_str;
    let mut buf = RingBuffer::new(RingBufferCapacity::new(4).unwrap());
    buf.push(line(1, "host.x"));
    assert!(find_event_by_id_str(&buf, "ZZZZZZ").is_none());
}
