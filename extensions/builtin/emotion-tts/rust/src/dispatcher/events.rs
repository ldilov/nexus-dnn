use serde::{Deserialize, Serialize};

use crate::domain::{RunId, UtteranceId};

/// Wire names for the per-run SSE event field — the SINGLE SOURCE OF TRUTH for
/// the producer side. Both `RunEvent::sse_event_name()` (live loop) and the
/// late-subscribe replay / DB-poll fast-path in `router::runs` emit these, so a
/// rename here propagates to every producer site. The frontend mirrors this
/// list in `web/src/services/http.ts` (`RUN_PROGRESS_EVENT_NAMES`); that
/// TS↔Rust link is structural, not enforced — keep both in sync.
pub(crate) const SSE_SEGMENT_STARTED: &str = "segment_started";
pub(crate) const SSE_SEGMENT_COMPLETED: &str = "segment_completed";
pub(crate) const SSE_SEGMENT_FAILED: &str = "segment_failed";
pub(crate) const SSE_RUN_TERMINAL: &str = "run_terminal";

/// Events the dispatcher publishes per-run. Frontend's
/// `subscribeRunProgress` already handles `segment_started`,
/// `segment_completed`, `segment_failed`, and `run_terminal` — so the
/// `serde(tag = "type")` discriminator becomes the SSE event name's
/// payload, while the SSE event field is set separately by the handler.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "snake_case")]
pub enum RunEvent {
    SegmentStarted {
        run_id: String,
        utterance_id: String,
        global_index: i64,
    },
    SegmentCompleted {
        run_id: String,
        utterance_id: String,
        global_index: i64,
        duration_ms: i64,
    },
    SegmentFailed {
        run_id: String,
        utterance_id: String,
        global_index: i64,
        failure_category: String,
        failure_detail: Option<String>,
    },
    RunTerminal {
        run_id: String,
        status: String,
    },
}

impl RunEvent {
    pub fn run_id(&self) -> &str {
        match self {
            RunEvent::SegmentStarted { run_id, .. }
            | RunEvent::SegmentCompleted { run_id, .. }
            | RunEvent::SegmentFailed { run_id, .. }
            | RunEvent::RunTerminal { run_id, .. } => run_id,
        }
    }

    pub fn sse_event_name(&self) -> &'static str {
        match self {
            RunEvent::SegmentStarted { .. } => SSE_SEGMENT_STARTED,
            RunEvent::SegmentCompleted { .. } => SSE_SEGMENT_COMPLETED,
            RunEvent::SegmentFailed { .. } => SSE_SEGMENT_FAILED,
            RunEvent::RunTerminal { .. } => SSE_RUN_TERMINAL,
        }
    }
}

#[allow(dead_code)]
fn _bind_unused_imports(_a: RunId, _b: UtteranceId) {} // keep imports if domain swaps to typed strings later

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sse_name_consts_match_frontend_listener_list() {
        // Pins the single source of truth the producer (live loop + replay /
        // DB-poll paths in router::runs) and the frontend listener list share.
        assert_eq!(SSE_SEGMENT_STARTED, "segment_started");
        assert_eq!(SSE_SEGMENT_COMPLETED, "segment_completed");
        assert_eq!(SSE_SEGMENT_FAILED, "segment_failed");
        assert_eq!(SSE_RUN_TERMINAL, "run_terminal");
    }

    #[test]
    fn sse_event_name_returns_the_shared_consts() {
        let started = RunEvent::SegmentStarted {
            run_id: "r".into(),
            utterance_id: "u".into(),
            global_index: 1,
        };
        let completed = RunEvent::SegmentCompleted {
            run_id: "r".into(),
            utterance_id: "u".into(),
            global_index: 1,
            duration_ms: 10,
        };
        let failed = RunEvent::SegmentFailed {
            run_id: "r".into(),
            utterance_id: "u".into(),
            global_index: 1,
            failure_category: "x".into(),
            failure_detail: None,
        };
        let terminal = RunEvent::RunTerminal {
            run_id: "r".into(),
            status: "completed".into(),
        };

        assert_eq!(started.sse_event_name(), SSE_SEGMENT_STARTED);
        assert_eq!(completed.sse_event_name(), SSE_SEGMENT_COMPLETED);
        assert_eq!(failed.sse_event_name(), SSE_SEGMENT_FAILED);
        assert_eq!(terminal.sse_event_name(), SSE_RUN_TERMINAL);
    }
}
