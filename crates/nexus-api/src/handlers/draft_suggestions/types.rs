//! Wire types for the Draft AI suggestion stream handler family.
//!
//! See `contracts/draft_suggestions.openapi.yaml` (request shape) and
//! `contracts/draft_suggestions.events.md` (response event shapes).

use serde::{Deserialize, Serialize};
use uuid::Uuid;

/// Newtype around the host-issued stream identifier used to target the
/// cancel endpoint. Prevents accidental confusion with `DraftId` /
/// `RuntimeLeaseId` at handler boundaries.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct StreamId(pub Uuid);

impl StreamId {
    pub fn new() -> Self {
        Self(Uuid::new_v4())
    }
}

impl Default for StreamId {
    fn default() -> Self {
        Self::new()
    }
}

impl std::fmt::Display for StreamId {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        self.0.fmt(f)
    }
}

/// Newtype around a Module Draft identifier. Treat as opaque — the host
/// does not introspect drafts beyond passing the id back through to the
/// existing draft-save flow when the operator accepts a suggestion.
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct DraftId(pub String);

impl DraftId {
    pub fn as_str(&self) -> &str {
        &self.0
    }
}

impl From<String> for DraftId {
    fn from(value: String) -> Self {
        Self(value)
    }
}

impl From<&str> for DraftId {
    fn from(value: &str) -> Self {
        Self(value.to_string())
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Default, Serialize, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub enum SuggestionIntent {
    #[default]
    CompleteLine,
    RewriteLine,
    NextStepSuggestion,
}

#[derive(Debug, Clone, Deserialize)]
pub struct SuggestionContext {
    pub draft_text: String,
    pub active_line_text: String,
    #[serde(default = "default_preceding_lines")]
    pub preceding_lines: u8,
}

fn default_preceding_lines() -> u8 {
    5
}

#[derive(Debug, Clone, Deserialize)]
pub struct SuggestionRequest {
    pub cursor_line: u32,
    #[serde(default)]
    pub intent: SuggestionIntent,
    pub context: SuggestionContext,
    #[serde(default = "default_max_tokens")]
    pub max_tokens: u32,
}

fn default_max_tokens() -> u32 {
    96
}

impl SuggestionRequest {
    /// Boundary validation per `draft_suggestions.openapi.yaml`. Returns
    /// a flat list of (field_path, problem) pairs for the validation
    /// error envelope.
    pub fn validate(&self) -> Result<(), Vec<(&'static str, String)>> {
        let mut violations = Vec::new();
        if self.cursor_line < 1 {
            violations.push(("cursor_line", "must be >= 1".to_string()));
        }
        if !(16..=512).contains(&self.max_tokens) {
            violations.push((
                "max_tokens",
                format!("must be in [16, 512]; got {}", self.max_tokens),
            ));
        }
        if self.context.preceding_lines > 20 {
            violations.push((
                "context.preceding_lines",
                format!("must be in [0, 20]; got {}", self.context.preceding_lines),
            ));
        }
        if self.context.draft_text.is_empty() {
            violations.push(("context.draft_text", "must be non-empty".to_string()));
        }
        if violations.is_empty() {
            Ok(())
        } else {
            Err(violations)
        }
    }
}

/// Reason a stream ended in the `cancelled` terminal state.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum CancelReason {
    ClientCancelled,
    ClientDisconnected,
    IdleTimeout,
}

impl CancelReason {
    pub fn as_wire_str(&self) -> &'static str {
        match self {
            Self::ClientCancelled => "client_cancelled",
            Self::ClientDisconnected => "client_disconnected",
            Self::IdleTimeout => "idle_timeout",
        }
    }
}

/// All SSE response event variants. Wire serialization is via the
/// hand-built map in `sse::json_payload` (NOT via serde derive) so the
/// `data:` line shape stays in lockstep with
/// `contracts/draft_suggestions.events.md`.
#[derive(Debug, Clone)]
pub enum SuggestionResponseEvent {
    StreamStarted {
        stream_id: StreamId,
        started_at: String,
        lease_id: String,
    },
    Token {
        delta: String,
    },
    Partial {
        text: String,
        line_offset: u32,
    },
    Complete {
        final_text: String,
        tokens_emitted: u32,
        elapsed_ms: u32,
    },
    Error {
        code: String,
        message: String,
        retryable: bool,
    },
    Cancelled {
        reason: String,
        tokens_emitted: u32,
        elapsed_ms: u32,
    },
}

impl SuggestionResponseEvent {
    /// SSE `event:` field — never collides with `serde`'s tag because
    /// the wire format keeps the event name out of the JSON body.
    pub fn event_name(&self) -> &'static str {
        match self {
            Self::StreamStarted { .. } => "stream_started",
            Self::Token { .. } => "token",
            Self::Partial { .. } => "partial",
            Self::Complete { .. } => "complete",
            Self::Error { .. } => "error",
            Self::Cancelled { .. } => "cancelled",
        }
    }

    /// Whether this event closes the stream per
    /// `contracts/draft_suggestions.events.md` ordering invariant 3.
    pub fn is_terminal(&self) -> bool {
        matches!(
            self,
            Self::Complete { .. } | Self::Error { .. } | Self::Cancelled { .. }
        )
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_request_passes_validation() {
        let req = SuggestionRequest {
            cursor_line: 1,
            intent: SuggestionIntent::CompleteLine,
            context: SuggestionContext {
                draft_text: "line\n".into(),
                active_line_text: "line".into(),
                preceding_lines: 5,
            },
            max_tokens: 96,
        };
        assert!(req.validate().is_ok());
    }

    #[test]
    fn cursor_line_zero_fails_validation() {
        let req = SuggestionRequest {
            cursor_line: 0,
            intent: SuggestionIntent::CompleteLine,
            context: SuggestionContext {
                draft_text: "line\n".into(),
                active_line_text: "line".into(),
                preceding_lines: 5,
            },
            max_tokens: 96,
        };
        let violations = req.validate().expect_err("should fail");
        assert!(violations.iter().any(|(f, _)| *f == "cursor_line"));
    }

    #[test]
    fn max_tokens_out_of_range_fails() {
        let req = SuggestionRequest {
            cursor_line: 1,
            intent: SuggestionIntent::CompleteLine,
            context: SuggestionContext {
                draft_text: "line\n".into(),
                active_line_text: "line".into(),
                preceding_lines: 5,
            },
            max_tokens: 1024,
        };
        let violations = req.validate().expect_err("should fail");
        assert!(violations.iter().any(|(f, _)| *f == "max_tokens"));
    }

    #[test]
    fn empty_draft_text_fails() {
        let req = SuggestionRequest {
            cursor_line: 1,
            intent: SuggestionIntent::CompleteLine,
            context: SuggestionContext {
                draft_text: "".into(),
                active_line_text: "".into(),
                preceding_lines: 0,
            },
            max_tokens: 96,
        };
        assert!(req.validate().is_err());
    }

    #[test]
    fn preceding_lines_max_21_fails() {
        let req = SuggestionRequest {
            cursor_line: 1,
            intent: SuggestionIntent::CompleteLine,
            context: SuggestionContext {
                draft_text: "x".into(),
                active_line_text: "x".into(),
                preceding_lines: 21,
            },
            max_tokens: 96,
        };
        let violations = req.validate().expect_err("should fail");
        assert!(violations.iter().any(|(f, _)| *f == "context.preceding_lines"));
    }

    #[test]
    fn event_name_matches_contract() {
        let started = SuggestionResponseEvent::StreamStarted {
            stream_id: StreamId::new(),
            started_at: "2026-04-29T00:00:00Z".into(),
            lease_id: "abc".into(),
        };
        assert_eq!(started.event_name(), "stream_started");
        assert!(!started.is_terminal());

        let cancelled = SuggestionResponseEvent::Cancelled {
            reason: CancelReason::ClientCancelled.as_wire_str().into(),
            tokens_emitted: 0,
            elapsed_ms: 10,
        };
        assert_eq!(cancelled.event_name(), "cancelled");
        assert!(cancelled.is_terminal());
    }

    #[test]
    fn intent_serializes_kebab_case() {
        let v = serde_json::to_value(SuggestionIntent::NextStepSuggestion).unwrap();
        assert_eq!(v, serde_json::json!("next-step-suggestion"));
    }

    #[test]
    fn cancel_reason_wire_strings_match_contract() {
        assert_eq!(CancelReason::ClientCancelled.as_wire_str(), "client_cancelled");
        assert_eq!(
            CancelReason::ClientDisconnected.as_wire_str(),
            "client_disconnected"
        );
        assert_eq!(CancelReason::IdleTimeout.as_wire_str(), "idle_timeout");
    }
}
