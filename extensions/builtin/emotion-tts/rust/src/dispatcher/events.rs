use serde::{Deserialize, Serialize};

use crate::domain::{RunId, UtteranceId};

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
            RunEvent::SegmentStarted { .. } => "segment_started",
            RunEvent::SegmentCompleted { .. } => "segment_completed",
            RunEvent::SegmentFailed { .. } => "segment_failed",
            RunEvent::RunTerminal { .. } => "run_terminal",
        }
    }
}

#[allow(dead_code)]
fn _bind_unused_imports(_a: RunId, _b: UtteranceId) {} // keep imports if domain swaps to typed strings later

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sse_event_names_match_frontend_listener_list() {
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

        assert_eq!(started.sse_event_name(), "segment_started");
        assert_eq!(completed.sse_event_name(), "segment_completed");
        assert_eq!(failed.sse_event_name(), "segment_failed");
        assert_eq!(terminal.sse_event_name(), "run_terminal");
    }
}
