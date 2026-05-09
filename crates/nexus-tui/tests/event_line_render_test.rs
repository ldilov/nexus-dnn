//! T034 — Snapshot tests for event-line rendering across color depths.
//!
//! Each fixture event is rendered three times, once per color depth, and
//! the resulting ANSI string is captured by `insta`. The fixture set spans
//! the three significance buckets that always display (Normal / Loud /
//! Critical) so the gutter, glyph, and palette mapping all get exercised.

use std::sync::Arc;

use nexus_tui::EventId;
use nexus_tui::render::event_line::{RenderConfig, render_event_line};
use nexus_tui::repl::ansi::ColorDepth;
use nexus_tui::stream::event_line::{CorrelationKeys, EventLine, RawPayload};
use nexus_tui::stream::severity::Severity;
use nexus_tui::stream::significance::Significance;
use nexus_tui::stream::source_category::SourceCategory;
use ulid::Ulid;

fn fixed_event(
    seq: u128,
    severity: Severity,
    significance: Significance,
    category: SourceCategory,
    source: &str,
    summary: &str,
) -> EventLine {
    EventLine {
        id: EventId::from_ulid(Ulid::from(seq)),
        timestamp_ms: 1_730_000_000_000,
        severity,
        significance,
        category,
        source: source.to_string(),
        summary: summary.to_string(),
        correlation: CorrelationKeys::default(),
        raw_payload: Arc::new(RawPayload::NexusEvent(
            nexus_events::types::NexusEvent::WorkflowUpdated {
                workflow_id: "wf".into(),
            },
        )),
    }
}

fn render_all_depths(line: &EventLine) -> String {
    let mut out = String::new();
    for depth in [
        ColorDepth::Truecolor,
        ColorDepth::Color256,
        ColorDepth::Color16,
    ] {
        let cfg = RenderConfig {
            color_depth: depth,
            critical_border: false,
            hover_target: None,
            ascii_glyphs: false,
        };
        out.push_str(&format!("--- {:?} ---\n", depth));
        out.push_str(&render_event_line(line, &cfg));
        out.push('\n');
    }
    out
}

#[test]
fn snapshot_normal_info_event() {
    let evt = fixed_event(
        1,
        Severity::Info,
        Significance::Normal,
        SourceCategory::Run,
        "run:run_7f2a",
        "run state queued → running",
    );
    insta::assert_snapshot!(render_all_depths(&evt));
}

#[test]
fn snapshot_loud_error_event() {
    let evt = fixed_event(
        2,
        Severity::Error,
        Significance::Loud,
        SourceCategory::Run,
        "run:run_8c11",
        "node failed inference: cuda alloc",
    );
    insta::assert_snapshot!(render_all_depths(&evt));
}

#[test]
fn snapshot_critical_fatal_event_with_border() {
    let evt = fixed_event(
        3,
        Severity::Fatal,
        Significance::Critical,
        SourceCategory::Storage,
        "storage:ext.example",
        "storage integrity drift in chat: 4 object(s)",
    );
    let cfg = RenderConfig {
        color_depth: ColorDepth::Truecolor,
        critical_border: true,
        hover_target: None,
        ascii_glyphs: false,
    };
    insta::assert_snapshot!(render_event_line(&evt, &cfg));
}
