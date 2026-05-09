//! T058 — `HoldQueue` (50-cap, overflow, flush banner).

use std::sync::Arc;

use nexus_tui::EventId;
use nexus_tui::stream::event_line::{CorrelationKeys, EventLine, RawPayload};
use nexus_tui::stream::hold_queue::{FlushReport, HoldQueue};
use nexus_tui::stream::severity::Severity;
use nexus_tui::stream::significance::Significance;
use nexus_tui::stream::source_category::SourceCategory;

fn line(seq: u64) -> EventLine {
    EventLine {
        id: EventId::new(),
        timestamp_ms: seq as i64,
        severity: Severity::Info,
        significance: Significance::Normal,
        category: SourceCategory::Other,
        source: "host.x".into(),
        summary: format!("evt {seq}"),
        correlation: CorrelationKeys::default(),
        raw_payload: Arc::new(RawPayload::NexusEvent(
            nexus_events::types::NexusEvent::WorkflowUpdated {
                workflow_id: "w".into(),
            },
        )),
    }
}

#[test]
fn enqueue_within_capacity() {
    let mut q = HoldQueue::default();
    q.set_holding(true);
    for i in 0..10 {
        q.try_enqueue(line(i));
    }
    let report = q.flush();
    assert_eq!(report.flushed.len(), 10);
    assert_eq!(report.overflow_count, 0);
}

#[test]
fn cap_at_50_overflow_recorded() {
    let mut q = HoldQueue::default();
    q.set_holding(true);
    for i in 0..75 {
        q.try_enqueue(line(i));
    }
    let report = q.flush();
    assert_eq!(report.flushed.len(), 50);
    assert_eq!(report.overflow_count, 25);
}

#[test]
fn not_holding_means_passthrough() {
    let mut q = HoldQueue::default();
    let result = q.try_enqueue(line(1));
    assert!(matches!(
        result,
        nexus_tui::stream::hold_queue::EnqueueResult::Passthrough(_)
    ));
}

#[test]
fn flush_resets_state() {
    let mut q = HoldQueue::default();
    q.set_holding(true);
    q.try_enqueue(line(1));
    let _ = q.flush();
    let next: FlushReport = q.flush();
    assert_eq!(next.flushed.len(), 0);
    assert_eq!(next.overflow_count, 0);
}
