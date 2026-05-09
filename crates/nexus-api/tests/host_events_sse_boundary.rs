//! Spec 044 — Principle XIII boundary checks for the host-wide SSE
//! adapter source.

use std::path::Path;

fn manifest_path(rel: &str) -> std::path::PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR")).join(rel)
}

#[test]
fn handler_source_contains_no_extension_id_literals() {
    let src = std::fs::read_to_string(manifest_path("src/handlers/host/events_sse.rs"))
        .expect("read events_sse.rs");

    let needles: [String; 4] = [
        ["nexus", "local-llm"].join("."),
        ["nexus.audio", "emotiontts"].join("."),
        format!("{}{}", "extension_id ", "=="),
        format!("{}{}", "extension_id ", "!="),
    ];
    for needle in &needles {
        assert!(
            !src.contains(needle.as_str()),
            "host SSE handler must not special-case extension identities: found {needle}",
        );
    }
}

#[test]
fn handler_filter_pipeline_has_no_hard_coded_event_type_extension_behavior() {
    let src = std::fs::read_to_string(manifest_path("src/handlers/host/events_sse.rs"))
        .expect("read events_sse.rs");

    for needle in [
        "event_type ==",
        "match params.event_type",
        "match query.event_type",
        "extension.",
        "deploy:",
    ] {
        assert!(
            !src.contains(needle),
            "event_type filter must stay generic and free of hard-coded extension behavior: found {needle}",
        );
    }
}

#[test]
fn router_mounts_host_events_sse() {
    let router_src =
        std::fs::read_to_string(manifest_path("src/router.rs")).expect("read router.rs");

    for needle in ["/events/sse", "host::events_sse::stream_events_sse"] {
        assert!(
            router_src.contains(needle),
            "router must mount the host SSE adapter: missing {needle}",
        );
    }
}
