//! T093 — `render_event_line_with_targets` emits visible-column spans
//! for the body, source label, and (when present) the run-id reference.

use std::sync::Arc;

use nexus_tui::EventId;
use nexus_tui::mouse::targets::ClickTarget;
use nexus_tui::render::event_line::{RenderConfig, render_event_line_with_targets};
use nexus_tui::repl::ansi::ColorDepth;
use nexus_tui::stream::event_line::{CorrelationKeys, EventLine, RawPayload};
use nexus_tui::stream::severity::Severity;
use nexus_tui::stream::significance::Significance;
use nexus_tui::stream::source_category::SourceCategory;
use ulid::Ulid;

fn line_with_run(run_id: Option<&str>, source: &str, summary: &str) -> EventLine {
    EventLine {
        id: EventId::from_ulid(Ulid::from(1u128)),
        timestamp_ms: 1_730_000_000_000,
        severity: Severity::Info,
        significance: Significance::Normal,
        category: SourceCategory::Run,
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

fn cfg() -> RenderConfig {
    RenderConfig {
        color_depth: ColorDepth::Truecolor,
        critical_border: false,
        hover_target: None,
        thread_leaf: false,
        ascii_glyphs: false,
        correlation_depth: 0,
        luminance_ladder: false,
    }
}

#[test]
fn layout_emits_event_line_body_target() {
    let line = line_with_run(None, "host.api", "ready");
    let layout = render_event_line_with_targets(&line, &cfg());
    let has_body = layout
        .targets
        .iter()
        .any(|(t, _)| matches!(t, ClickTarget::EventLineBody { .. }));
    assert!(has_body);
}

#[test]
fn layout_emits_source_label_target() {
    let line = line_with_run(None, "deploy:foo", "ok");
    let layout = render_event_line_with_targets(&line, &cfg());
    let source_target = layout
        .targets
        .iter()
        .find(|(t, _)| matches!(t, ClickTarget::SourceLabel { source } if source == "deploy:foo"));
    assert!(source_target.is_some(), "source label target missing");
    let (_, range) = source_target.unwrap();
    assert!(range.end > range.start, "source range must be non-empty");
}

#[test]
fn layout_emits_run_id_reference_when_summary_contains_it() {
    let line = line_with_run(Some("run_abc"), "run:run_abc", "node failed run_abc step");
    let layout = render_event_line_with_targets(&line, &cfg());
    let run_target = layout
        .targets
        .iter()
        .find(|(t, _)| matches!(t, ClickTarget::RunIdReference { run_id } if run_id == "run_abc"));
    assert!(run_target.is_some(), "run-id reference target missing");
}

#[test]
fn layout_skips_run_id_reference_when_summary_does_not_mention_it() {
    let line = line_with_run(Some("run_xyz"), "run:run_xyz", "node failed");
    let layout = render_event_line_with_targets(&line, &cfg());
    let has_run = layout
        .targets
        .iter()
        .any(|(t, _)| matches!(t, ClickTarget::RunIdReference { .. }));
    assert!(
        !has_run,
        "run-id ref should only register when summary contains the id"
    );
}

#[test]
fn body_range_is_a_superset_of_source_range() {
    let line = line_with_run(None, "deploy:foo", "ok");
    let layout = render_event_line_with_targets(&line, &cfg());
    let body = layout
        .targets
        .iter()
        .find_map(|(t, r)| matches!(t, ClickTarget::EventLineBody { .. }).then(|| r.clone()))
        .unwrap();
    let source = layout
        .targets
        .iter()
        .find_map(|(t, r)| matches!(t, ClickTarget::SourceLabel { .. }).then(|| r.clone()))
        .unwrap();
    assert!(body.start <= source.start && source.end <= body.end);
}
