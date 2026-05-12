//! S6 — Failure-affordance filled glyph for failure-classified events
//! logged at INFO/WARN severity. The plain INFO `○` swaps to `●` when
//! the `EventClass` classifier flags the row as `HttpFailure`,
//! `Exception`, or `Panic`. ERROR/FATAL rows are already loud — don't
//! double up.

use std::collections::BTreeMap;
use std::sync::Arc;

use nexus_tui::EventId;
use nexus_tui::render::event_line::{RenderConfig, render_event_line};
use nexus_tui::repl::ansi::ColorDepth;
use nexus_tui::stream::event_line::{CorrelationKeys, EventLine, RawPayload};
use nexus_tui::stream::severity::Severity;
use nexus_tui::stream::significance::Significance;
use nexus_tui::stream::source_category::SourceCategory;

fn host_event(severity: Severity, message: &str, fields: BTreeMap<String, String>) -> EventLine {
    EventLine {
        id: EventId::new(),
        timestamp_ms: 0,
        severity,
        significance: Significance::Normal,
        category: SourceCategory::Host,
        source: "host.test".into(),
        summary: message.into(),
        correlation: CorrelationKeys::default(),
        raw_payload: Arc::new(RawPayload::NexusEvent(
            nexus_events::types::NexusEvent::HostLog {
                level: "info".into(),
                target: "test".into(),
                message: message.into(),
                fields,
                span_path: None,
                timestamp_ms: 0,
            },
        )),
    }
}

fn config() -> RenderConfig {
    RenderConfig::new(ColorDepth::NoColor, false)
}

// The severity glyph always renders immediately before the severity
// label (e.g. `○ INFO`, `✖ ERROR`). Asserting on `<glyph> INFO`/`ERROR`
// avoids false positives from the category glyph (e.g. SourceCategory::Host
// also renders as `●`).
#[test]
fn info_http_failure_renders_filled_dot() {
    let mut f = BTreeMap::new();
    f.insert("http.status_code".into(), "503".into());
    let evt = host_event(Severity::Info, "GET /api/v1/foo", f);
    let out = render_event_line(&evt, &config());
    assert!(
        out.contains("● INFO"),
        "INFO + HTTP-503 should render `● INFO`; got: {out:?}"
    );
    assert!(
        !out.contains("○ INFO"),
        "outline INFO `○` must have been replaced; got: {out:?}"
    );
}

#[test]
fn info_plain_keeps_outline_dot() {
    let evt = host_event(Severity::Info, "just a plain log line", BTreeMap::new());
    let out = render_event_line(&evt, &config());
    assert!(
        out.contains("○ INFO"),
        "Plain INFO must render `○ INFO`; got: {out:?}"
    );
    assert!(
        !out.contains("● INFO"),
        "filled INFO `●` must NOT appear on Plain INFO; got: {out:?}"
    );
}

#[test]
fn info_exception_renders_filled_dot() {
    let msg = "request failed\n   at handler::call (src/lib.rs:1:1)";
    let evt = host_event(Severity::Info, msg, BTreeMap::new());
    let out = render_event_line(&evt, &config());
    assert!(
        out.contains("● INFO"),
        "INFO + exception stack should render `● INFO`; got: {out:?}"
    );
}

#[test]
fn error_severity_keeps_existing_glyph() {
    // ERROR is already at peak loudness — must not double-up by
    // swapping its glyph just because the classifier also flags it.
    let mut f = BTreeMap::new();
    f.insert("http.status_code".into(), "500".into());
    let evt = host_event(Severity::Error, "request failed", f);
    let out = render_event_line(&evt, &config());
    assert!(
        out.contains("✖ ERROR"),
        "ERROR must keep its `✖` glyph regardless of class; got: {out:?}"
    );
}

#[test]
fn ascii_mode_unaffected_by_class() {
    // ASCII fallback has no filled variants — must not introduce
    // non-ASCII glyphs just because a class flagged failure.
    let mut f = BTreeMap::new();
    f.insert("http.status_code".into(), "503".into());
    let evt = host_event(Severity::Info, "GET /api/v1/foo", f);
    let cfg = config().with_ascii_glyphs(true);
    let out = render_event_line(&evt, &cfg);
    assert!(
        !out.contains("○ INFO") && !out.contains("● INFO"),
        "ASCII mode must not use unicode INFO glyphs; got: {out:?}"
    );
    assert!(out.contains("i INFO"), "ASCII INFO uses `i`; got: {out:?}");
}
