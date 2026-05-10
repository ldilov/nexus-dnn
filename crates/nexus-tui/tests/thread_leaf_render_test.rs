//! Spec 044 Phase 3 — thread-leaf indent assertions.
//!
//! When [`RenderConfig::thread_leaf`] is `true`, the rendered event
//! line must be prefixed with `  ╰─ ` in lavender (color 183) so the
//! operator can see causality inline. When the flag is `false`, no
//! such prefix appears anywhere in the output.

use std::collections::BTreeMap;

use nexus_events::types::NexusEvent;
use nexus_tui::EventLine;
use nexus_tui::render::event_line::{RenderConfig, render_event_line};
use nexus_tui::repl::ansi::ColorDepth;

fn host_log(target: &str, msg: &str) -> EventLine {
    EventLine::from_nexus_event(NexusEvent::HostLog {
        level: "info".into(),
        target: target.into(),
        message: msg.into(),
        fields: BTreeMap::new(),
        span_path: None,
        timestamp_ms: 0,
    })
}

fn cfg(leaf: bool) -> RenderConfig {
    RenderConfig {
        color_depth: ColorDepth::Truecolor,
        critical_border: false,
        hover_target: None,
        thread_leaf: leaf,
        ascii_glyphs: false,
    }
}

const LAVENDER_OPEN: &str = "\x1b[38;5;183m";
const INDENT_BODY: &str = "╰─";

#[test]
fn root_event_has_no_thread_indent() {
    let line = host_log("scheduler", "tick");
    let rendered = render_event_line(&line, &cfg(false));
    assert!(
        !rendered.contains(INDENT_BODY),
        "root event must not contain the leaf indent glyph"
    );
    assert!(
        !rendered.contains(LAVENDER_OPEN),
        "root event must not emit lavender ANSI"
    );
}

#[test]
fn leaf_event_starts_with_lavender_indent() {
    let line = host_log("scheduler", "tick");
    let rendered = render_event_line(&line, &cfg(true));
    assert!(
        rendered.starts_with(LAVENDER_OPEN),
        "leaf render must open with lavender ANSI: {rendered}"
    );
    assert!(
        rendered.contains(INDENT_BODY),
        "leaf render must include the `╰─` indent glyph"
    );
}

#[test]
fn leaf_indent_uses_two_leading_spaces_then_arc_then_space() {
    let line = host_log("scheduler", "tick");
    let rendered = render_event_line(&line, &cfg(true));
    // The first non-ANSI characters after the open should be 2 spaces.
    let after_open = rendered.strip_prefix(LAVENDER_OPEN).unwrap();
    assert!(
        after_open.starts_with("  ╰─ "),
        "indent prefix must be `  ╰─ ` (2 spaces + arc + space): {rendered}"
    );
}
