//! T031 — RingBuffer FIFO eviction + capacity bound + id-index integrity.
//!
//! Each test constructs synthetic `EventLine` values directly (bypassing
//! the wire-format event bus) and exercises the ring buffer's invariants:
//! - `push` never exceeds `capacity` after eviction.
//! - Eviction is FIFO: the oldest item is dropped first.
//! - `inspect_by_id` returns the same value the buffer holds.
//! - The id-index drops evicted ids so stale lookups return `None`.

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
        summary: format!("evt #{seq}"),
        correlation: CorrelationKeys::default(),
        raw_payload: Arc::new(RawPayload::NexusEvent(
            nexus_events::types::NexusEvent::WorkflowUpdated {
                workflow_id: format!("w{seq}"),
            },
        )),
    }
}

#[test]
fn push_respects_capacity_bound() {
    let cap = RingBufferCapacity::new(3).unwrap();
    let mut buf = RingBuffer::new(cap);
    for i in 0..5 {
        buf.push(line(i, "host.test"));
    }
    assert_eq!(buf.len(), 3);
    assert!(buf.len() <= cap.get());
}

#[test]
fn push_evicts_oldest_first() {
    let cap = RingBufferCapacity::new(2).unwrap();
    let mut buf = RingBuffer::new(cap);
    let first = line(1, "a");
    let second = line(2, "b");
    let third = line(3, "c");
    let first_id = first.id;
    let second_id = second.id;
    buf.push(first);
    buf.push(second);
    buf.push(third);

    assert!(
        buf.inspect_by_id(first_id).is_none(),
        "first must be evicted"
    );
    assert!(buf.inspect_by_id(second_id).is_some(), "second must remain");
}

#[test]
fn inspect_by_id_returns_stored_event() {
    let mut buf = RingBuffer::new(RingBufferCapacity::new(8).unwrap());
    let evt = line(7, "deploy:foo");
    let id = evt.id;
    buf.push(evt);
    let found = buf.inspect_by_id(id).expect("event must be present");
    assert_eq!(found.source, "deploy:foo");
    assert_eq!(found.summary, "evt #7");
}

#[test]
fn inspect_by_id_returns_none_after_eviction() {
    let cap = RingBufferCapacity::new(2).unwrap();
    let mut buf = RingBuffer::new(cap);
    let target = line(1, "a");
    let target_id = target.id;
    buf.push(target);
    buf.push(line(2, "b"));
    buf.push(line(3, "c"));
    assert!(buf.inspect_by_id(target_id).is_none());
}

#[test]
fn iter_yields_oldest_to_newest() {
    let mut buf = RingBuffer::new(RingBufferCapacity::new(4).unwrap());
    for i in 1..=4 {
        buf.push(line(i, "x"));
    }
    let summaries: Vec<String> = buf.iter().map(|e| e.summary.clone()).collect();
    assert_eq!(
        summaries,
        vec!["evt #1", "evt #2", "evt #3", "evt #4"]
            .into_iter()
            .map(String::from)
            .collect::<Vec<_>>()
    );
}

#[test]
fn id_index_remains_consistent_under_load() {
    let mut buf = RingBuffer::new(RingBufferCapacity::new(50).unwrap());
    let mut held: Vec<EventId> = Vec::new();
    for i in 0..200 {
        let evt = line(i, "host.busy");
        held.push(evt.id);
        buf.push(evt);
    }
    let evicted = &held[..150];
    let live = &held[150..];
    for id in evicted {
        assert!(buf.inspect_by_id(*id).is_none(), "evicted id must be gone");
    }
    for id in live {
        assert!(buf.inspect_by_id(*id).is_some(), "live id must be present");
    }
    assert_eq!(buf.len(), 50);
}
