//! S4 — Sub-sectioned inspector: HttpFailure / Exception / Panic
//! events render `HttpStatus` / `HttpRequest` / `HttpResponse` /
//! `StackTrace` sections in addition to the legacy 8-section layout.
//! Plain events do NOT get sub-sections (byte-identical legacy
//! output).

use std::collections::BTreeMap;
use std::sync::Arc;

use nexus_tui::EventId;
use nexus_tui::inspector::classifier::{EventClass, classify};
use nexus_tui::render::inspector::{
    InspectorRenderConfig, InspectorSection, default_collapsed_for_class, render_inspector_layout,
};
use nexus_tui::repl::ansi::ColorDepth;
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

fn cfg_for(class: EventClass) -> InspectorRenderConfig {
    InspectorRenderConfig {
        color_depth: ColorDepth::NoColor,
        recent_context_count: 5,
        correlation_depth: 3,
        collapsed: default_collapsed_for_class(class),
        event_class: Some(class),
    }
}

fn buf_with(evt: EventLine) -> (RingBuffer, EventLine) {
    let mut buf = RingBuffer::new(RingBufferCapacity::new(8).unwrap());
    let id = evt.id;
    buf.push(evt);
    let target = buf.inspect_by_id(id).unwrap().clone();
    (buf, target)
}

#[test]
fn http_failure_renders_status_request_response_sections() {
    let mut f = BTreeMap::new();
    f.insert("http.status_code".into(), "503".into());
    f.insert("http.method".into(), "POST".into());
    f.insert("http.url".into(), "/api/v1/foo".into());
    f.insert("http.duration_ms".into(), "142".into());
    f.insert(
        "http.response_body".into(),
        r#"{"error":"upstream timeout"}"#.into(),
    );

    let evt = host_event("upstream timeout", f);
    let class = classify(&evt);
    assert!(matches!(class, EventClass::HttpFailure { status: 503 }));

    let (buf, target) = buf_with(evt);
    let cfg = cfg_for(class);
    let layout = render_inspector_layout(&buf, &target, &cfg);

    // Layout should contain the three HTTP sub-section titles.
    let sections: Vec<InspectorSection> = layout.section_rows.iter().map(|(s, _)| *s).collect();
    assert!(sections.contains(&InspectorSection::HttpStatus));
    assert!(sections.contains(&InspectorSection::HttpRequest));
    assert!(sections.contains(&InspectorSection::HttpResponse));
    // Default-expanded for HttpFailure: status + response visible.
    // (HttpRequest is collapsed by default per the Define Q3 matrix —
    assert!(layout.rendered.contains("503"));
    assert!(layout.rendered.contains("upstream timeout"));
}

#[test]
fn exception_renders_stack_trace_section_with_top_frames() {
    let msg = "request failed\n   at handler::call (src/lib.rs:1:1)\n   at handler::run (src/run.rs:99:5)\n   at main (src/main.rs:7:3)";
    let evt = host_event(msg, BTreeMap::new());
    let class = classify(&evt);
    assert!(matches!(class, EventClass::Exception));

    let (buf, target) = buf_with(evt);
    let cfg = cfg_for(class);
    let layout = render_inspector_layout(&buf, &target, &cfg);

    let sections: Vec<InspectorSection> = layout.section_rows.iter().map(|(s, _)| *s).collect();
    assert!(sections.contains(&InspectorSection::StackTrace));
    assert!(layout.rendered.contains("handler::call"));
    assert!(layout.rendered.contains("src/lib.rs:1"));
    assert!(layout.rendered.contains("handler::run"));
    assert!(layout.rendered.contains("main"));
}

#[test]
fn long_stack_trace_truncates_with_more_frames_footer() {
    // 8 frames — only top 5 should render with `… 3 more frames` footer.
    let mut msg = String::from("error");
    for i in 0..8 {
        msg.push_str(&format!("\n   at fn_{i} (src/file_{i}.rs:{i}:1)"));
    }
    let evt = host_event(&msg, BTreeMap::new());
    let class = classify(&evt);
    let (buf, target) = buf_with(evt);
    let cfg = cfg_for(class);
    let layout = render_inspector_layout(&buf, &target, &cfg);

    // Footer presence is the canonical check that truncation fired.
    // Frame names can leak into the Header section's summary echo
    assert!(
        layout.rendered.contains("… 3 more frames"),
        "expected truncation footer; got: {}",
        layout.rendered
    );
    // Top frames are present
    assert!(layout.rendered.contains("fn_0"));
    assert!(layout.rendered.contains("fn_4"));
}

#[test]
fn plain_event_renders_no_sub_sections() {
    let evt = host_event("just a plain log line", BTreeMap::new());
    let class = classify(&evt);
    assert!(matches!(class, EventClass::Plain));

    let (buf, target) = buf_with(evt);
    let cfg = cfg_for(class);
    let layout = render_inspector_layout(&buf, &target, &cfg);

    let sections: Vec<InspectorSection> = layout.section_rows.iter().map(|(s, _)| *s).collect();
    assert!(!sections.contains(&InspectorSection::HttpStatus));
    assert!(!sections.contains(&InspectorSection::HttpRequest));
    assert!(!sections.contains(&InspectorSection::HttpResponse));
    assert!(!sections.contains(&InspectorSection::StackTrace));
}

#[test]
fn http_failure_default_expands_status_and_response_collapses_others() {
    let collapsed = default_collapsed_for_class(EventClass::HttpFailure { status: 500 });
    // Status + Response are NOT in the collapsed set (expanded by default).
    assert!(!collapsed.contains(&InspectorSection::HttpStatus));
    assert!(!collapsed.contains(&InspectorSection::HttpResponse));
    // Header / Metadata / etc. ARE collapsed.
    assert!(collapsed.contains(&InspectorSection::Header));
    assert!(collapsed.contains(&InspectorSection::Metadata));
    assert!(collapsed.contains(&InspectorSection::HttpRequest));
}

#[test]
fn exception_default_expands_stack_trace() {
    let collapsed = default_collapsed_for_class(EventClass::Exception);
    assert!(!collapsed.contains(&InspectorSection::StackTrace));
    assert!(!collapsed.contains(&InspectorSection::Header));
    // Body sections are collapsed since the trace is what matters.
    assert!(collapsed.contains(&InspectorSection::Metadata));
    assert!(collapsed.contains(&InspectorSection::Fields));
}

#[test]
fn workspace_frame_wraps_in_osc8_hyperlink() {
    // S5 — workspace stack-trace frames get OSC-8 hyperlinks pointing
    // at the vscode://file/ scheme so terminals that support OSC-8
    let msg = "request failed\n   at handler::call (src/lib.rs:1:1)";
    let evt = host_event(msg, BTreeMap::new());
    let class = classify(&evt);
    let (buf, target) = buf_with(evt);
    let cfg = cfg_for(class);
    let layout = render_inspector_layout(&buf, &target, &cfg);

    // OSC-8 escape sequence: ESC ]8;;<url>ESC \<label>ESC ]8;;ESC \
    assert!(
        layout
            .rendered
            .contains("\u{1b}]8;;vscode://file/src/lib.rs:1:1"),
        "workspace frame must be wrapped in OSC-8 with vscode:// URI; got: {}",
        layout.rendered
    );
}

#[test]
fn registry_frame_not_wrapped_in_osc8() {
    let msg = "panic\n   at tokio::runtime::handle (/home/u/.cargo/registry/src/tokio-1.0/handle.rs:42:5)";
    let evt = host_event(msg, BTreeMap::new());
    let class = classify(&evt);
    let (buf, target) = buf_with(evt);
    let cfg = cfg_for(class);
    let layout = render_inspector_layout(&buf, &target, &cfg);

    // Non-workspace frames render dim, no OSC-8 wrapping.
    assert!(
        !layout
            .rendered
            .contains("\u{1b}]8;;vscode://file//home/u/.cargo"),
        "registry frame must NOT be wrapped in OSC-8; got: {}",
        layout.rendered
    );
    // But the path should still be visible (just plain text).
    assert!(layout.rendered.contains(".cargo/registry"));
}

#[test]
fn missing_response_body_renders_placeholder() {
    let mut f = BTreeMap::new();
    f.insert("http.status_code".into(), "500".into());
    f.insert("http.method".into(), "GET".into());
    f.insert("http.url".into(), "/foo".into());
    // No http.response_body field.
    let evt = host_event("internal error", f);
    let class = classify(&evt);
    let (buf, target) = buf_with(evt);
    let cfg = cfg_for(class);
    let layout = render_inspector_layout(&buf, &target, &cfg);

    assert!(
        layout.rendered.contains("(no response body captured)"),
        "should render placeholder; got: {}",
        layout.rendered
    );
}
