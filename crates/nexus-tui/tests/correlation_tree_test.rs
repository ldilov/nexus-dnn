//! T079 — correlation-tree walker.
//!
//! Given a target event, walks the ring buffer to collect related
//! events sharing run_id / deployment_id / extension_id / install_run_id
//! within a depth bound of 3.

use std::sync::Arc;

use nexus_tui::EventId;
use nexus_tui::inspector::correlation::{CorrelationContext, walk_correlation};
use nexus_tui::stream::event_id::RingBufferCapacity;
use nexus_tui::stream::event_line::{CorrelationKeys, EventLine, RawPayload};
use nexus_tui::stream::ring_buffer::RingBuffer;
use nexus_tui::stream::severity::Severity;
use nexus_tui::stream::significance::Significance;
use nexus_tui::stream::source_category::SourceCategory;

fn line(
    summary: &str,
    severity: Severity,
    correlation: CorrelationKeys,
    category: SourceCategory,
) -> EventLine {
    EventLine {
        id: EventId::new(),
        timestamp_ms: 0,
        severity,
        significance: Significance::Normal,
        category,
        source: "host.x".into(),
        summary: summary.into(),
        correlation,
        raw_payload: Arc::new(RawPayload::NexusEvent(
            nexus_events::types::NexusEvent::WorkflowUpdated {
                workflow_id: "w".into(),
            },
        )),
    }
}

#[test]
fn correlation_walker_groups_by_run_id() {
    let mut buf = RingBuffer::new(RingBufferCapacity::new(20).unwrap());
    buf.push(line(
        "run created",
        Severity::Info,
        CorrelationKeys {
            run_id: Some("run_a".into()),
            ..CorrelationKeys::default()
        },
        SourceCategory::Run,
    ));
    let target = line(
        "node failed",
        Severity::Error,
        CorrelationKeys {
            run_id: Some("run_a".into()),
            ..CorrelationKeys::default()
        },
        SourceCategory::Run,
    );
    let target_id = target.id;
    buf.push(target);
    buf.push(line(
        "unrelated",
        Severity::Info,
        CorrelationKeys::default(),
        SourceCategory::Host,
    ));

    let target = buf.inspect_by_id(target_id).unwrap().clone();
    let ctx: CorrelationContext = walk_correlation(&buf, &target, 3);
    assert_eq!(
        ctx.related.len(),
        1,
        "should find 1 related event by run_id"
    );
    assert_eq!(ctx.related[0].summary, "run created");
}

#[test]
fn correlation_walker_respects_depth_bound() {
    let mut buf = RingBuffer::new(RingBufferCapacity::new(20).unwrap());
    for _ in 0..10 {
        buf.push(line(
            "noise",
            Severity::Info,
            CorrelationKeys {
                run_id: Some("run_b".into()),
                ..CorrelationKeys::default()
            },
            SourceCategory::Run,
        ));
    }
    let target = line(
        "node failed",
        Severity::Error,
        CorrelationKeys {
            run_id: Some("run_b".into()),
            ..CorrelationKeys::default()
        },
        SourceCategory::Run,
    );
    let target_id = target.id;
    buf.push(target);
    let target = buf.inspect_by_id(target_id).unwrap().clone();
    let ctx = walk_correlation(&buf, &target, 3);
    assert!(
        ctx.related.len() <= 3,
        "depth bound 3 caps related count, got {}",
        ctx.related.len()
    );
}

#[test]
fn correlation_walker_finds_extension_chain() {
    let mut buf = RingBuffer::new(RingBufferCapacity::new(10).unwrap());
    let install_line = line(
        "step started",
        Severity::Info,
        CorrelationKeys {
            extension_id: Some("ext_a".into()),
            install_run_id: Some("ir_1".into()),
            ..CorrelationKeys::default()
        },
        SourceCategory::Extension,
    );
    buf.push(install_line);
    let target = line(
        "step failed",
        Severity::Error,
        CorrelationKeys {
            extension_id: Some("ext_a".into()),
            install_run_id: Some("ir_1".into()),
            ..CorrelationKeys::default()
        },
        SourceCategory::Extension,
    );
    let id = target.id;
    buf.push(target);
    let target = buf.inspect_by_id(id).unwrap().clone();
    let ctx = walk_correlation(&buf, &target, 3);
    assert_eq!(ctx.related.len(), 1);
    assert_eq!(ctx.related[0].summary, "step started");
}

#[test]
fn target_is_not_included_in_related() {
    let mut buf = RingBuffer::new(RingBufferCapacity::new(4).unwrap());
    let target = line(
        "lone",
        Severity::Error,
        CorrelationKeys {
            run_id: Some("run_x".into()),
            ..CorrelationKeys::default()
        },
        SourceCategory::Run,
    );
    let id = target.id;
    buf.push(target);
    let target = buf.inspect_by_id(id).unwrap().clone();
    let ctx = walk_correlation(&buf, &target, 3);
    assert!(ctx.related.is_empty());
}
