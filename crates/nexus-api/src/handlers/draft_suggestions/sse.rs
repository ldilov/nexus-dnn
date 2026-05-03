//! SSE encoder for the Draft AI suggestion stream.
//!
//! Maps `SuggestionResponseEvent` variants onto `axum::response::sse::Event`
//! instances per `contracts/draft_suggestions.events.md`. The `event:`
//! field is always populated explicitly so consumers dispatch by type
//! rather than by structural match on the JSON body.

use axum::response::sse::Event;
use serde_json::json;

use super::types::{StreamId, SuggestionResponseEvent};

/// Stateless event encoder. Holds nothing — kept as a struct purely so
/// callers can swap in test doubles via dependency injection.
#[derive(Debug, Default, Clone, Copy)]
pub struct SseEncoder;

impl SseEncoder {
    pub fn new() -> Self {
        Self
    }

    /// Render a logical event into an SSE `Event`. Returns
    /// `Result<Event, serde_json::Error>` because the JSON serialization
    /// can technically fail; callers should treat that as
    /// `DraftSuggestionError::Internal`.
    pub fn encode(
        &self,
        event: &SuggestionResponseEvent,
    ) -> Result<Event, serde_json::Error> {
        let name = event.event_name();
        let payload = serde_json::to_string(&json_payload(event))?;
        Ok(Event::default().event(name).data(payload))
    }
}

/// Wire-format JSON payload for the `data:` line of an SSE event.
/// Pulled out of `encode` so unit tests can assert the exact JSON shape
/// without round-tripping through axum's opaque `Event` type.
pub fn json_payload(event: &SuggestionResponseEvent) -> serde_json::Value {
    match event {
        SuggestionResponseEvent::StreamStarted {
            stream_id,
            started_at,
            lease_id,
        } => json!({
            "stream_id": stream_id,
            "started_at": started_at,
            "lease_id": lease_id,
        }),
        SuggestionResponseEvent::Token { delta } => json!({ "delta": delta }),
        SuggestionResponseEvent::Partial { text, line_offset } => {
            json!({ "text": text, "line_offset": line_offset })
        }
        SuggestionResponseEvent::Complete {
            final_text,
            tokens_emitted,
            elapsed_ms,
        } => json!({
            "final_text": final_text,
            "tokens_emitted": tokens_emitted,
            "elapsed_ms": elapsed_ms,
        }),
        SuggestionResponseEvent::Error {
            code,
            message,
            retryable,
        } => json!({
            "code": code,
            "message": message,
            "retryable": retryable,
        }),
        SuggestionResponseEvent::Cancelled {
            reason,
            tokens_emitted,
            elapsed_ms,
        } => json!({
            "reason": reason,
            "tokens_emitted": tokens_emitted,
            "elapsed_ms": elapsed_ms,
        }),
    }
}

/// Convenience: construct a `stream_started` event with a fresh ISO 8601
/// timestamp. Pulled out so tests can compare without reaching into
/// `chrono::Utc::now()`.
pub fn stream_started(stream_id: StreamId, lease_id: impl Into<String>) -> SuggestionResponseEvent {
    SuggestionResponseEvent::StreamStarted {
        stream_id,
        started_at: chrono::Utc::now().to_rfc3339(),
        lease_id: lease_id.into(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn token_event_payload_carries_delta() {
        let ev = SuggestionResponseEvent::Token {
            delta: "hello".into(),
        };
        let v = json_payload(&ev);
        assert_eq!(v["delta"], "hello");
    }

    #[test]
    fn complete_event_payload_carries_tokens_and_elapsed() {
        let ev = SuggestionResponseEvent::Complete {
            final_text: "done".into(),
            tokens_emitted: 5,
            elapsed_ms: 123,
        };
        let v = json_payload(&ev);
        assert_eq!(v["final_text"], "done");
        assert_eq!(v["tokens_emitted"], 5);
        assert_eq!(v["elapsed_ms"], 123);
    }

    #[test]
    fn error_event_payload_includes_retryable_flag() {
        let ev = SuggestionResponseEvent::Error {
            code: "lease_revoked".into(),
            message: "lease revoked".into(),
            retryable: true,
        };
        let v = json_payload(&ev);
        assert_eq!(v["code"], "lease_revoked");
        assert_eq!(v["retryable"], true);
    }

    #[test]
    fn cancelled_event_payload_carries_reason() {
        let ev = SuggestionResponseEvent::Cancelled {
            reason: "client_cancelled".into(),
            tokens_emitted: 0,
            elapsed_ms: 10,
        };
        let v = json_payload(&ev);
        assert_eq!(v["reason"], "client_cancelled");
    }

    /// Snapshot test asserting `json_payload` emits the exact JSON keys
    /// documented in `contracts/draft_suggestions.events.md`. Replaces the
    /// compile-time guarantee that was lost when `Serialize` was removed
    /// from `SuggestionResponseEvent` (the wire shape is now hand-built).
    #[test]
    fn json_payload_matches_events_contract() {
        use serde_json::Value;

        fn keys(v: &Value) -> Vec<String> {
            let mut out: Vec<String> = v
                .as_object()
                .expect("expected JSON object")
                .keys()
                .cloned()
                .collect();
            out.sort();
            out
        }

        let started = SuggestionResponseEvent::StreamStarted {
            stream_id: StreamId::new(),
            started_at: "2026-05-02T00:00:00Z".into(),
            lease_id: "lease-1".into(),
        };
        assert_eq!(
            keys(&json_payload(&started)),
            vec!["lease_id", "started_at", "stream_id"]
        );

        let token = SuggestionResponseEvent::Token { delta: "x".into() };
        assert_eq!(keys(&json_payload(&token)), vec!["delta"]);

        let partial = SuggestionResponseEvent::Partial {
            text: "x".into(),
            line_offset: 0,
        };
        assert_eq!(keys(&json_payload(&partial)), vec!["line_offset", "text"]);

        let complete = SuggestionResponseEvent::Complete {
            final_text: "x".into(),
            tokens_emitted: 1,
            elapsed_ms: 1,
        };
        assert_eq!(
            keys(&json_payload(&complete)),
            vec!["elapsed_ms", "final_text", "tokens_emitted"]
        );

        let err = SuggestionResponseEvent::Error {
            code: "internal".into(),
            message: "boom".into(),
            retryable: false,
        };
        assert_eq!(keys(&json_payload(&err)), vec!["code", "message", "retryable"]);

        let cancelled = SuggestionResponseEvent::Cancelled {
            reason: "client_cancelled".into(),
            tokens_emitted: 0,
            elapsed_ms: 0,
        };
        assert_eq!(
            keys(&json_payload(&cancelled)),
            vec!["elapsed_ms", "reason", "tokens_emitted"]
        );
    }

    #[test]
    fn encode_round_trips_without_serde_error() {
        let enc = SseEncoder::new();
        for ev in [
            SuggestionResponseEvent::Token {
                delta: "x".into(),
            },
            SuggestionResponseEvent::Complete {
                final_text: "x".into(),
                tokens_emitted: 1,
                elapsed_ms: 1,
            },
            SuggestionResponseEvent::Cancelled {
                reason: "client_cancelled".into(),
                tokens_emitted: 0,
                elapsed_ms: 0,
            },
        ] {
            assert!(enc.encode(&ev).is_ok());
        }
    }

    #[test]
    fn stream_started_helper_produces_started_variant() {
        let id = StreamId::new();
        let ev = stream_started(id, "lease-1");
        match ev {
            SuggestionResponseEvent::StreamStarted {
                stream_id,
                lease_id,
                ..
            } => {
                assert_eq!(stream_id, id);
                assert_eq!(lease_id, "lease-1");
            }
            _ => panic!("expected StreamStarted variant"),
        }
    }
}
