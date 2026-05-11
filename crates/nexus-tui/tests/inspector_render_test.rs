//! T081 — Snapshot test for inspector block render.

use std::sync::Arc;

use nexus_tui::EventId;
use nexus_tui::render::inspector::{InspectorRenderConfig, render_inspector_block};
use nexus_tui::repl::ansi::ColorDepth;
use nexus_tui::stream::event_id::RingBufferCapacity;
use nexus_tui::stream::event_line::{CorrelationKeys, EventLine, RawPayload};
use nexus_tui::stream::ring_buffer::RingBuffer;
use nexus_tui::stream::severity::Severity;
use nexus_tui::stream::significance::Significance;
use nexus_tui::stream::source_category::SourceCategory;
use ulid::Ulid;

fn line(seed: u128, summary: &str, severity: Severity, run_id: Option<&str>) -> EventLine {
    EventLine {
        id: EventId::from_ulid(Ulid::from(seed)),
        timestamp_ms: 1_730_000_000_000 + seed as i64,
        severity,
        significance: Significance::Loud,
        category: SourceCategory::Run,
        source: "run:run_a".into(),
        summary: summary.into(),
        correlation: CorrelationKeys {
            run_id: run_id.map(String::from),
            ..CorrelationKeys::default()
        },
        raw_payload: Arc::new(RawPayload::NexusEvent(
            nexus_events::types::NexusEvent::NodeFailed {
                run_id: run_id.unwrap_or("run_a").into(),
                node_id: "n1".into(),
                error: "cuda alloc failed: out of memory".into(),
            },
        )),
    }
}

#[test]
fn snapshot_inspector_block_with_correlation_and_heuristic() {
    let mut buf = RingBuffer::new(RingBufferCapacity::new(8).unwrap());
    buf.push(line(1, "run created", Severity::Info, Some("run_a")));
    buf.push(line(2, "node started", Severity::Info, Some("run_a")));
    let target = line(
        3,
        "node failed inference: cuda alloc failed: out of memory",
        Severity::Error,
        Some("run_a"),
    );
    let id = target.id;
    buf.push(target);
    let target = buf.inspect_by_id(id).unwrap().clone();

    let cfg = InspectorRenderConfig {
        color_depth: ColorDepth::Truecolor,
        recent_context_count: 5,
        correlation_depth: 3,
        collapsed: std::collections::BTreeSet::new(),
    };
    let rendered = render_inspector_block(&buf, &target, &cfg);
    insta::assert_snapshot!(rendered);
}
