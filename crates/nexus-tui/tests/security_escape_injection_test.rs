//! Security-regression tests for the deliver-phase audit findings:
//!
//! - H1 (security): terminal escape injection via unstripped host
//!   content (http.url, http.method, http.response_body, stack-trace
//!   frame paths/functions, HostLog fields).
//! - H2 (security): OSC-8 URI injection via unsanitised file paths
//!   in `build_frame_url` — the OSC-8 envelope must refuse to embed
//!   anything containing ESC/BEL/CSI bytes.
//!
//! These tests don't unit-test the private `sanitize_for_terminal`
//! helper directly; they exercise the user-facing surfaces (rendered
//! output) to confirm that hostile content cannot escape the
//! envelope.

use std::collections::BTreeMap;
use std::sync::Arc;

use nexus_tui::EventId;
use nexus_tui::inspector::classifier::{EventClass, classify};
use nexus_tui::render::inspector::{
    InspectorRenderConfig, default_collapsed_for_class, render_inspector_layout,
};
use nexus_tui::repl::ansi::{ColorDepth, osc8_hyperlink};
use nexus_tui::stream::event_id::RingBufferCapacity;
use nexus_tui::stream::event_line::{CorrelationKeys, EventLine, RawPayload};
use nexus_tui::stream::ring_buffer::RingBuffer;
use nexus_tui::stream::severity::Severity;
use nexus_tui::stream::significance::Significance;
use nexus_tui::stream::source_category::SourceCategory;

fn host_event(message: &str, fields: BTreeMap<String, String>) -> EventLine {
    EventLine {
        id: EventId::new(),
        timestamp_ms: 0,
        severity: Severity::Info,
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

fn render(evt: EventLine) -> String {
    let mut buf = RingBuffer::new(RingBufferCapacity::new(8).unwrap());
    let id = evt.id;
    buf.push(evt);
    let target = buf.inspect_by_id(id).unwrap().clone();
    let class = classify(&target);
    let cfg = InspectorRenderConfig {
        color_depth: ColorDepth::NoColor,
        recent_context_count: 5,
        correlation_depth: 3,
        collapsed: default_collapsed_for_class(class),
        event_class: Some(class),
    };
    render_inspector_layout(&buf, &target, &cfg).rendered
}

#[test]
fn http_response_body_with_escape_does_not_clear_screen() {
    // A malicious host log carrying `\x1b[2J\x1b[H` in the response
    // body would clear the screen if interpolated raw. The sanitiser
    let mut f = BTreeMap::new();
    f.insert("http.status_code".into(), "500".into());
    f.insert(
        "http.response_body".into(),
        "\x1b[2J\x1b[Hgotcha".to_string(),
    );
    let evt = host_event("hijack attempt", f);
    let rendered = render(evt);
    // Specifically the clear-screen `\x1b[2J` and cursor-home `\x1b[H`
    // patterns from the payload must not appear verbatim.
    assert!(
        !rendered.contains("\x1b[2J"),
        "clear-screen ESC must be stripped"
    );
    assert!(
        !rendered.contains("\x1b[H"),
        "cursor-home ESC must be stripped"
    );
    // The non-malicious tail "gotcha" should still render.
    assert!(rendered.contains("gotcha"));
}

#[test]
fn http_url_with_escape_does_not_set_terminal_title() {
    // OSC-0 sets terminal title: `\x1b]0;malicious\x07`. Refuse it.
    let mut f = BTreeMap::new();
    f.insert("http.status_code".into(), "500".into());
    f.insert("http.method".into(), "GET".into());
    f.insert(
        "http.url".into(),
        "/foo\x1b]0;malicious\x07/bar".to_string(),
    );
    let evt = host_event("hostile url", f);
    let rendered = render(evt);
    // Note: HttpRequest section is collapsed by default for HttpFailure
    // — the URL never reaches the rendered output. The defence in depth
    assert!(!rendered.contains("\x1b]0;malicious"));
    assert!(!rendered.contains('\x07'));
}

#[test]
fn stack_frame_function_with_escape_does_not_leak_into_render() {
    // The stack-trace parser pulls `function` and `file` from regex
    // captures of arbitrary host text. A malicious frame could carry
    let msg = "boom\n   at \x1b[31mevil\x1b[0m::foo (src/lib.rs:1:1)";
    let evt = host_event(msg, BTreeMap::new());
    let class = classify(&evt);
    assert!(matches!(class, EventClass::Exception));
    let rendered = render(evt);
    // The renderer's own ANSI escapes (gutter color, dim, etc.) ARE
    // expected. What must NOT survive is the attacker-controlled
    assert!(
        !rendered.contains("\x1b[31mevil\x1b[0m::foo"),
        "attacker ESC bytes must be stripped from stack-frame function names"
    );
}

#[test]
fn osc8_refuses_url_with_escape() {
    // build_frame_url percent-encodes, but the osc8_hyperlink helper
    // is a defence-in-depth check. Hand it a deliberately bad URL.
    let bad = "vscode://file/x.rs\x1b\\evil";
    let result = osc8_hyperlink(bad, "label");
    // Must NOT contain the OSC-8 envelope when ESC is present.
    assert!(!result.contains("\x1b]8;;"));
    // Falls back to the bare label.
    assert_eq!(result, "label");
}

#[test]
fn osc8_refuses_label_with_escape() {
    let bad_label = "src/x.rs:1:1\x1b\\evil";
    let result = osc8_hyperlink("vscode://file/src/x.rs:1:1", bad_label);
    assert!(!result.contains("\x1b]8;;"));
    assert_eq!(result, bad_label);
}

#[test]
fn workspace_frame_with_spaces_in_path_is_percent_encoded() {
    // Real-world POSIX path with a space: "/home/My User/project/lib.rs"
    // The OSC-8 URL must percent-encode the space so the URI is valid.
    let msg = "panic\n   at crate::foo (/home/My User/project/lib.rs:5:1)";
    let evt = host_event(msg, BTreeMap::new());
    let rendered = render(evt);
    // The URL inside the OSC-8 envelope should have %20, not raw space.
    assert!(
        rendered.contains("My%20User"),
        "space in path must be percent-encoded in OSC-8 URL; got: {rendered}"
    );
    // The bare label (outside the envelope) still shows the readable
    // path with the space — that's the user-facing text.
    assert!(rendered.contains("My User"));
}
