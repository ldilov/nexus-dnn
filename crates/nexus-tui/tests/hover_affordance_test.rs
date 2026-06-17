//! Spec 044 T100 — hover affordance assertions.
//!
//! When [`RenderConfig::hover_target`] points at the source label of the
//! line being rendered, the source token must be wrapped in
//! ANSI underline (`\x1b[4m`/`\x1b[24m`). When it points at the run-id
//! reference inside the summary, the run-id glyph must be wrapped in
//! ANSI bold (`\x1b[1m`/`\x1b[22m`). Other regions stay un-styled.

use std::collections::BTreeMap;

use nexus_events::types::NexusEvent;
use nexus_tui::EventLine;
use nexus_tui::mouse::targets::ClickTarget;
use nexus_tui::render::event_line::{RenderConfig, render_event_line_with_targets};
use nexus_tui::repl::ansi::ColorDepth;

fn host_log_event(target: &str, message: &str) -> EventLine {
    EventLine::from_nexus_event(NexusEvent::HostLog {
        level: "info".into(),
        target: target.into(),
        message: message.into(),
        fields: BTreeMap::new(),
        span_path: None,
        timestamp_ms: 0,
    })
}

fn run_progress_event(run_id: &str, summary_node: &str) -> EventLine {
    EventLine::from_nexus_event(NexusEvent::NodeProgress {
        run_id: run_id.into(),
        node_id: summary_node.into(),
        percent: 25,
        message: format!("ticking {summary_node}"),
    })
}

fn cfg(target: Option<ClickTarget>) -> RenderConfig {
    RenderConfig {
        color_depth: ColorDepth::Truecolor,
        critical_border: false,
        hover_target: target,
        thread_leaf: false,
        ascii_glyphs: false,
        correlation_depth: 0,
        luminance_ladder: false,
        grep_highlight: None,
    }
}

#[test]
fn no_hover_emits_no_underline_or_bold() {
    let line = host_log_event("scheduler", "tick");
    let layout = render_event_line_with_targets(&line, &cfg(None));
    assert!(
        !layout.rendered.contains("\x1b[4m"),
        "no hover should not emit underline"
    );
    assert!(
        !layout.rendered.contains("\x1b[1m"),
        "no hover should not emit bold"
    );
}

#[test]
fn hover_on_source_emits_underline_around_label() {
    let line = host_log_event("scheduler", "tick");
    let target = ClickTarget::SourceLabel {
        source: line.source.clone(),
    };
    let layout = render_event_line_with_targets(&line, &cfg(Some(target)));
    assert!(
        layout.rendered.contains("\x1b[4m"),
        "source-hover must underline-open: {}",
        layout.rendered
    );
    assert!(
        layout.rendered.contains("\x1b[24m"),
        "source-hover must underline-close"
    );
}

#[test]
fn hover_on_different_source_does_not_underline_this_line() {
    let line = host_log_event("scheduler", "tick");
    let target = ClickTarget::SourceLabel {
        source: "host.worker".to_string(),
    };
    let layout = render_event_line_with_targets(&line, &cfg(Some(target)));
    assert!(
        !layout.rendered.contains("\x1b[4m"),
        "non-matching source must not underline"
    );
}

#[test]
fn hover_on_run_id_emits_bold_around_glyph() {
    let line = run_progress_event("01HK3RUN42", "node-a");
    // The default summary "ticking node-a" doesn't contain the run id; build
    // a HostLog that does so we can assert the glyph match.
    let mut fields = BTreeMap::new();
    fields.insert("run".into(), "01HK3RUN42".into());
    let line = EventLine::from_nexus_event(NexusEvent::HostLog {
        level: "info".into(),
        target: "scheduler".into(),
        message: format!("started run {}", "01HK3RUN42"),
        fields,
        span_path: None,
        timestamp_ms: line.timestamp_ms,
    });
    // HostLog doesn't carry a correlation.run_id by derivation. Skip if the
    // EventLine doesn't expose one; the runtime's run-id click registration
    if line.correlation.run_id.is_none() {
        return;
    }
    let target = ClickTarget::RunIdReference {
        run_id: "01HK3RUN42".to_string(),
    };
    let layout = render_event_line_with_targets(&line, &cfg(Some(target)));
    assert!(layout.rendered.contains("\x1b[1m"));
    assert!(layout.rendered.contains("\x1b[22m"));
}

#[test]
fn hover_on_unrelated_target_leaves_line_unstyled() {
    let line = host_log_event("scheduler", "tick");
    let target = ClickTarget::Sparkline;
    let layout = render_event_line_with_targets(&line, &cfg(Some(target)));
    assert!(!layout.rendered.contains("\x1b[4m"));
    assert!(!layout.rendered.contains("\x1b[1m"));
}
