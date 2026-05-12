//! Typed classification of streaming events into UX-affordance buckets.
//!
//! The classifier sits between the raw event ([`EventLine`] +
//! [`RawPayload`]) and the renderer. It answers a single question:
//! *"What kind of thing is this, for the purpose of choosing how loud to
//! draw it and which sub-sections to offer in the inspector?"*
//!
//! Detection is pattern-based — we sniff `HostLog.fields` for HTTP-flavoured
//! keys, and we run the message body against the panic / Rust-backtrace /
//! Python-traceback shapes. The wire format
//! ([`nexus_events::types::NexusEvent`]) has no native HTTP variant, so
//! `HostLog.fields` is the only bridge surface — see the Spec 044 + Define
//! consensus for why this is the right seam rather than extending the
//! enum.
//!
//! Precedence is `Panic > Exception > HttpFailure > HttpSuccess > Plain`.
//! A panic inside an HTTP-500 handler classifies as `Panic`; the status
//! code stays accessible under the inspector's Fields sub-section.

use std::sync::LazyLock;

use nexus_events::types::NexusEvent;
use regex::Regex;

use crate::stream::event_line::{EventLine, RawPayload};

/// What kind of event this is, from a UX-affordance perspective.
///
/// `Plain` is the fallback — most ambient events. The other variants
/// trigger sub-sectioned inspector layouts (`HttpFailure` adds a
/// Status / Request / Response triple, `Exception` / `Panic` add an
/// auto-expanded Stack-trace section), and in the event stream itself
/// they get a louder severity glyph (filled-variant) so failure rows
/// pop against the ambient noise.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum EventClass {
    Plain,
    HttpSuccess { status: u16 },
    HttpFailure { status: u16 },
    Exception,
    Panic,
}

impl EventClass {
    /// True when this class denotes a failure mode the renderer should
    /// draw with extra visual weight (filled severity glyph, auto-expanded
    /// stack-trace section).
    pub fn is_failure(self) -> bool {
        matches!(
            self,
            EventClass::HttpFailure { .. } | EventClass::Exception | EventClass::Panic
        )
    }
}

/// Classify an event for UX-affordance purposes.
///
/// Cheap — short-circuits on the first match in precedence order and
/// only inspects the `HostLog` payload (other `NexusEvent` variants are
/// always `Plain` because they're structured-domain events without
/// free-form HTTP/stack content).
pub fn classify(line: &EventLine) -> EventClass {
    let host_log = match line.raw_payload.as_ref() {
        RawPayload::NexusEvent(NexusEvent::HostLog {
            message, fields, ..
        }) => Some((message.as_str(), fields)),
        _ => None,
    };

    // Tier 1 — Panic. Strongest signal; checks message body for the
    // canonical Rust panic preamble.
    if is_panic_message(&line.summary) {
        return EventClass::Panic;
    }
    if let Some((message, _)) = host_log
        && is_panic_message(message)
    {
        return EventClass::Panic;
    }

    // Tier 2 — Exception with stack trace. Multi-line message shapes.
    if has_stack_trace(&line.summary) {
        return EventClass::Exception;
    }
    if let Some((message, _)) = host_log
        && has_stack_trace(message)
    {
        return EventClass::Exception;
    }

    // Tier 3 — HTTP status. Only HostLog events carry structured fields.
    if let Some((_, fields)) = host_log {
        if fields.contains_key("http.error") {
            // Backend reported an HTTP error even without a status code
            // (e.g. connection reset, DNS failure). Treat as failure
            // with status=0 sentinel.
            return EventClass::HttpFailure { status: 0 };
        }
        if let Some(status_str) = fields.get("http.status_code")
            && let Ok(status) = status_str.parse::<u16>()
        {
            if status >= 400 {
                return EventClass::HttpFailure { status };
            }
            if (200..400).contains(&status) {
                return EventClass::HttpSuccess { status };
            }
        }
    }

    EventClass::Plain
}

fn is_panic_message(s: &str) -> bool {
    // Canonical Rust panic preamble: `thread 'main' panicked at ...`.
    // The std panic hook always emits this exact shape regardless of
    // `RUST_BACKTRACE`.
    s.starts_with("thread '") && s.contains("panicked at")
}

fn has_stack_trace(s: &str) -> bool {
    // Three shapes we recognise:
    //
    // 1. Rust panic `at` frames: `\n   at fn_path (file:line:col)`.
    //    Cheap multi-line indicator.
    if RUST_AT_FRAME.is_match(s) {
        return true;
    }
    // 2. Rust numbered backtrace: `\n   0: fn_path` ... `\n   1: fn_path`.
    //    Emitted when `RUST_BACKTRACE=1` is set.
    if RUST_NUMBERED_FRAME.is_match(s) {
        return true;
    }
    // 3. Python traceback header. Python workers (extensions) bubble
    //    these up through HostLog.message verbatim.
    if s.contains("Traceback (most recent call last):") {
        return true;
    }
    false
}

static RUST_AT_FRAME: LazyLock<Regex> = LazyLock::new(|| {
    // Match `\n` followed by leading whitespace then `at ` then anything.
    // Anchored on the newline so we don't match `at` mid-sentence.
    Regex::new(r"\n\s+at\s+\S").expect("RUST_AT_FRAME regex must compile")
});

static RUST_NUMBERED_FRAME: LazyLock<Regex> = LazyLock::new(|| {
    // Match `\n` + whitespace + `<digits>:` — the shape of
    // `RUST_BACKTRACE=1` output frames.
    Regex::new(r"\n\s*\d+:\s+\S").expect("RUST_NUMBERED_FRAME regex must compile")
});

#[cfg(test)]
mod tests {
    use std::collections::BTreeMap;
    use std::sync::Arc;

    use nexus_events::types::NexusEvent;

    use crate::EventId;
    use crate::inspector::classifier::{EventClass, classify};
    use crate::stream::event_line::{CorrelationKeys, EventLine, RawPayload};
    use crate::stream::severity::Severity;
    use crate::stream::significance::Significance;
    use crate::stream::source_category::SourceCategory;

    fn host_log_line(message: &str, fields: BTreeMap<String, String>) -> EventLine {
        EventLine {
            id: EventId::new(),
            timestamp_ms: 0,
            severity: Severity::Info,
            significance: Significance::Normal,
            category: SourceCategory::Host,
            source: "host.test".into(),
            summary: message.into(),
            correlation: CorrelationKeys::default(),
            raw_payload: Arc::new(RawPayload::NexusEvent(NexusEvent::HostLog {
                level: "info".into(),
                target: "test".into(),
                message: message.into(),
                fields,
                span_path: None,
                timestamp_ms: 0,
            })),
        }
    }

    fn non_host_line(summary: &str) -> EventLine {
        EventLine {
            id: EventId::new(),
            timestamp_ms: 0,
            severity: Severity::Info,
            significance: Significance::Normal,
            category: SourceCategory::Other,
            source: "src.test".into(),
            summary: summary.into(),
            correlation: CorrelationKeys::default(),
            raw_payload: Arc::new(RawPayload::NexusEvent(NexusEvent::WorkflowUpdated {
                workflow_id: "wf".into(),
            })),
        }
    }

    #[test]
    fn plain_event_classifies_as_plain() {
        let l = host_log_line("nothing interesting", BTreeMap::new());
        assert_eq!(classify(&l), EventClass::Plain);
    }

    #[test]
    fn http_200_classifies_as_success() {
        let mut f = BTreeMap::new();
        f.insert("http.status_code".into(), "200".into());
        let l = host_log_line("GET /api/v1/foo", f);
        assert_eq!(classify(&l), EventClass::HttpSuccess { status: 200 });
    }

    #[test]
    fn http_503_classifies_as_failure() {
        let mut f = BTreeMap::new();
        f.insert("http.status_code".into(), "503".into());
        let l = host_log_line("GET /api/v1/foo", f);
        assert_eq!(classify(&l), EventClass::HttpFailure { status: 503 });
    }

    #[test]
    fn http_404_classifies_as_failure() {
        let mut f = BTreeMap::new();
        f.insert("http.status_code".into(), "404".into());
        let l = host_log_line("GET /missing", f);
        assert_eq!(classify(&l), EventClass::HttpFailure { status: 404 });
    }

    #[test]
    fn http_300_redirect_classifies_as_success() {
        // 3xx is conventionally non-error; default to HttpSuccess.
        let mut f = BTreeMap::new();
        f.insert("http.status_code".into(), "302".into());
        let l = host_log_line("GET /old", f);
        assert_eq!(classify(&l), EventClass::HttpSuccess { status: 302 });
    }

    #[test]
    fn http_error_field_without_status_classifies_as_failure() {
        let mut f = BTreeMap::new();
        f.insert("http.error".into(), "connection reset".into());
        let l = host_log_line("POST /api/v1/bar", f);
        assert_eq!(classify(&l), EventClass::HttpFailure { status: 0 });
    }

    #[test]
    fn unparseable_status_falls_back_to_plain() {
        // Defensive: a malformed status string should not crash the
        // classifier nor masquerade as a 0-status failure.
        let mut f = BTreeMap::new();
        f.insert("http.status_code".into(), "not-a-number".into());
        let l = host_log_line("GET /weird", f);
        assert_eq!(classify(&l), EventClass::Plain);
    }

    #[test]
    fn rust_panic_classifies_as_panic() {
        let msg = "thread 'main' panicked at src/lib.rs:42:9:\nassertion failed";
        let l = host_log_line(msg, BTreeMap::new());
        assert_eq!(classify(&l), EventClass::Panic);
    }

    #[test]
    fn rust_at_frame_classifies_as_exception() {
        let msg = "something broke\n   at my_crate::foo (src/foo.rs:10:5)\n   at my_crate::bar";
        let l = host_log_line(msg, BTreeMap::new());
        assert_eq!(classify(&l), EventClass::Exception);
    }

    #[test]
    fn rust_numbered_backtrace_classifies_as_exception() {
        let msg = "error\n   0: my_crate::foo\n   1: my_crate::bar\n   2: main";
        let l = host_log_line(msg, BTreeMap::new());
        assert_eq!(classify(&l), EventClass::Exception);
    }

    #[test]
    fn python_traceback_classifies_as_exception() {
        let msg = "RuntimeError\nTraceback (most recent call last):\n  File \"/foo.py\", line 1";
        let l = host_log_line(msg, BTreeMap::new());
        assert_eq!(classify(&l), EventClass::Exception);
    }

    #[test]
    fn panic_in_http_500_classifies_as_panic_not_failure() {
        // Precedence: Panic wins over HttpFailure. Status stays in
        // fields so the inspector still surfaces it.
        let mut f = BTreeMap::new();
        f.insert("http.status_code".into(), "500".into());
        let msg = "thread 'tokio-worker-1' panicked at src/handler.rs:9:1: bad state";
        let l = host_log_line(msg, f);
        assert_eq!(classify(&l), EventClass::Panic);
    }

    #[test]
    fn exception_in_http_500_classifies_as_exception_not_failure() {
        // Precedence: Exception wins over HttpFailure (without Panic).
        let mut f = BTreeMap::new();
        f.insert("http.status_code".into(), "500".into());
        let msg = "request failed\n   at handler::call (src/lib.rs:1:1)";
        let l = host_log_line(msg, f);
        assert_eq!(classify(&l), EventClass::Exception);
    }

    #[test]
    fn non_host_log_event_always_plain() {
        // Structured domain events (WorkflowUpdated, NodeFailed, etc.)
        // bypass the HTTP-field detection entirely.
        let l = non_host_line("anything goes");
        assert_eq!(classify(&l), EventClass::Plain);
    }

    #[test]
    fn is_failure_groups_correctly() {
        assert!(!EventClass::Plain.is_failure());
        assert!(!EventClass::HttpSuccess { status: 200 }.is_failure());
        assert!(EventClass::HttpFailure { status: 500 }.is_failure());
        assert!(EventClass::Exception.is_failure());
        assert!(EventClass::Panic.is_failure());
    }
}
