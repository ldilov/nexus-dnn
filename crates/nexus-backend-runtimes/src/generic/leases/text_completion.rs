//! Cross-extension JSON-RPC contract for streaming text completion over
//! a [`BackendRuntimeLease`].
//!
//! This module is the canonical source of truth for the wire format that
//! lets the host drive any participating runtime worker (regardless of
//! which extension contributed it) through a token-by-token text
//! completion. It defines:
//!
//! - The capability tag a runtime advertises in its catalog entry to
//!   opt into participation ([`CAPABILITY_TAG`]).
//! - The JSON-RPC 2.0 method names ([`METHOD_START`], [`METHOD_CANCEL`]).
//! - The lease-notification method names emitted by the worker
//!   ([`NOTIFY_TOKEN`], [`NOTIFY_DONE`], [`NOTIFY_ERROR`]).
//! - Strongly-typed [`StartParams`], [`StartResult`], [`CancelParams`],
//!   [`TokenNotify`], [`DoneNotify`], [`ErrorNotify`] for serde
//!   round-trips.
//!
//! ## Wire shape
//!
//! 1. Host issues `text.complete.start` with [`StartParams`]; worker
//!    responds with [`StartResult`] carrying the `stream_id` (a uuid the
//!    worker chose). The id MUST be reflected on every notification so
//!    the host can demultiplex multiple concurrent streams over one
//!    lease.
//! 2. Worker emits zero or more `text.complete.token` notifications,
//!    each carrying a single [`TokenNotify`] payload.
//! 3. Worker emits exactly one terminal notification:
//!    - `text.complete.done` ([`DoneNotify`]) on natural completion or
//!      because the cancel RPC was honored, OR
//!    - `text.complete.error` ([`ErrorNotify`]) on unrecoverable
//!      worker-side failure.
//! 4. To cancel a stream that hasn't terminated, the host issues
//!    `text.complete.cancel` with [`CancelParams { stream_id }`]. The
//!    worker SHOULD stop emitting tokens within a small bounded number
//!    of frames and emit `text.complete.done` with `cancelled = true`.
//!
//! ## Boundary contract
//!
//! Per the host ↔ extension boundary rule: this module references no
//! specific extension id. Extensions opt into the contract by tagging
//! their catalog entry with [`CAPABILITY_TAG`] and registering JSON-RPC
//! handlers for [`METHOD_START`] / [`METHOD_CANCEL`] in their worker.
//! The host implementation lives in
//! `crates/nexus-api/src/handlers/draft_suggestions/lease_adapter.rs`
//! and consumes only this module's types.

use serde::{Deserialize, Serialize};

/// Catalog `capability_tags` entry that signals "this runtime
/// implements the text-completion JSON-RPC contract defined in this
/// module". A runtime that omits this tag is invisible to consumers
/// driving the contract.
pub const CAPABILITY_TAG: &str = "text-completion";

/// JSON-RPC method name for the host → worker request that opens a
/// streaming text completion.
pub const METHOD_START: &str = "text.complete.start";

/// JSON-RPC method name for the host → worker request that cancels an
/// in-flight stream.
pub const METHOD_CANCEL: &str = "text.complete.cancel";

/// `LeaseNotification.method` value for one streamed token chunk.
pub const NOTIFY_TOKEN: &str = "text.complete.token";

/// `LeaseNotification.method` value for the natural-completion
/// terminator.
pub const NOTIFY_DONE: &str = "text.complete.done";

/// `LeaseNotification.method` value for an unrecoverable worker-side
/// failure terminator.
pub const NOTIFY_ERROR: &str = "text.complete.error";

/// Opaque structured-output constraint passed through to the worker.
///
/// The host does not interpret the body. Tenants supply a schema (or a
/// GBNF grammar) and a tenant-chosen `name` (echoed back in errors). The
/// worker is responsible for translating to the underlying backend's
/// native flag (`--json-schema` / `--grammar-file` for llama.cpp,
/// `guided_json` for vLLM, etc.) or for rejecting with
/// `unsupported_response_format`.
///
/// This enum is intentionally minimal at v1: only `JsonSchema`. `Gbnf`
/// is a forward-compatible additive variant for a follow-up spec; do
/// not add it here without a paired backend-adapter test.
///
/// Boundary contract: every variant body is `serde_json::Value` or
/// `String`. The host never types the schema. No tenant identifier
/// (extension id, profile name, render id) appears inside any variant.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(tag = "type", rename_all = "snake_case")]
pub enum ResponseFormat {
    JsonSchema {
        schema: serde_json::Value,
        /// Tenant-chosen identifier echoed back on errors. Opaque
        /// string; the host neither parses it nor restricts its values.
        name: String,
    },
}

/// Params for a [`METHOD_START`] request.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct StartParams {
    /// System-role text used to condition the model. May be empty.
    #[serde(default)]
    pub system: String,
    /// User-role prompt the model should continue. MUST be non-empty.
    pub user: String,
    /// Hard cap on the number of tokens the worker may emit.
    pub max_tokens: u32,
    /// Optional structured-output constraint. `None` MUST serialize to
    /// an absent field (not `null`) so pre-`ResponseFormat` tenants
    /// produce byte-identical wire output.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub response_format: Option<ResponseFormat>,
}

/// Result of a successful [`METHOD_START`] request.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct StartResult {
    /// Identifier the worker chose for this stream. Reflected on every
    /// subsequent token / done / error notification AND on any future
    /// [`METHOD_CANCEL`] call. The id is opaque to the host — the
    /// worker MAY pick a uuid, sequential integer-as-string, or
    /// anything else, but it MUST be unique among the worker's
    /// in-flight streams.
    pub stream_id: String,
}

/// Params for a [`METHOD_CANCEL`] request.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct CancelParams {
    pub stream_id: String,
}

/// Payload of a [`NOTIFY_TOKEN`] notification.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct TokenNotify {
    pub stream_id: String,
    /// One model-emitted chunk to append to the running suggestion.
    /// MAY be the empty string (workers SHOULD avoid emitting empty
    /// tokens but consumers MUST tolerate them).
    pub delta: String,
}

/// Payload of a [`NOTIFY_DONE`] notification.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct DoneNotify {
    pub stream_id: String,
    /// `true` when the stream was terminated because [`METHOD_CANCEL`]
    /// was honored. `false` for natural completion.
    #[serde(default)]
    pub cancelled: bool,
}

/// Payload of a [`NOTIFY_ERROR`] notification.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct ErrorNotify {
    pub stream_id: String,
    /// Short machine-readable code (e.g. `"context_overflow"`,
    /// `"model_unavailable"`). Operator-safe; surfaced to the client.
    pub code: String,
    /// Operator-safe human message. MUST NOT include stack frames or
    /// internal paths.
    pub message: String,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn capability_tag_is_stable() {
        assert_eq!(CAPABILITY_TAG, "text-completion");
    }

    #[test]
    fn method_names_are_stable() {
        assert_eq!(METHOD_START, "text.complete.start");
        assert_eq!(METHOD_CANCEL, "text.complete.cancel");
    }

    #[test]
    fn notification_names_are_stable() {
        assert_eq!(NOTIFY_TOKEN, "text.complete.token");
        assert_eq!(NOTIFY_DONE, "text.complete.done");
        assert_eq!(NOTIFY_ERROR, "text.complete.error");
    }

    #[test]
    fn start_params_round_trip() {
        let p = StartParams {
            system: "be terse".into(),
            user: "complete this".into(),
            max_tokens: 96,
            response_format: None,
        };
        let json = serde_json::to_string(&p).unwrap();
        let back: StartParams = serde_json::from_str(&json).unwrap();
        assert_eq!(p, back);
    }

    #[test]
    fn start_params_default_system_to_empty() {
        let json = r#"{"user":"x","max_tokens":1}"#;
        let p: StartParams = serde_json::from_str(json).unwrap();
        assert_eq!(p.system, "");
        assert!(p.response_format.is_none());
    }

    #[test]
    fn start_params_omits_none_response_format_from_wire() {
        let p = StartParams {
            system: "".into(),
            user: "hello".into(),
            max_tokens: 16,
            response_format: None,
        };
        let wire = serde_json::to_string(&p).unwrap();
        assert!(
            !wire.contains("response_format"),
            "None response_format must serialize to absent, got: {wire}"
        );
    }

    #[test]
    fn response_format_json_schema_round_trip() {
        let rf = ResponseFormat::JsonSchema {
            schema: serde_json::json!({"type": "object", "required": ["x"]}),
            name: "scene_packet_v1".into(),
        };
        let json = serde_json::to_string(&rf).unwrap();
        assert!(json.contains("\"type\":\"json_schema\""));
        let back: ResponseFormat = serde_json::from_str(&json).unwrap();
        assert_eq!(rf, back);
    }

    #[test]
    fn start_params_with_response_format_round_trip() {
        let p = StartParams {
            system: "".into(),
            user: "produce json".into(),
            max_tokens: 256,
            response_format: Some(ResponseFormat::JsonSchema {
                schema: serde_json::json!({"type": "string"}),
                name: "string_payload".into(),
            }),
        };
        let wire = serde_json::to_string(&p).unwrap();
        assert!(wire.contains("response_format"));
        let back: StartParams = serde_json::from_str(&wire).unwrap();
        assert_eq!(p, back);
    }

    #[test]
    fn start_result_round_trip() {
        let r = StartResult {
            stream_id: "abc-123".into(),
        };
        let json = serde_json::to_string(&r).unwrap();
        let back: StartResult = serde_json::from_str(&json).unwrap();
        assert_eq!(r, back);
    }

    #[test]
    fn cancel_params_round_trip() {
        let c = CancelParams {
            stream_id: "abc-123".into(),
        };
        let json = serde_json::to_string(&c).unwrap();
        let back: CancelParams = serde_json::from_str(&json).unwrap();
        assert_eq!(c, back);
    }

    #[test]
    fn token_notify_round_trip() {
        let t = TokenNotify {
            stream_id: "s1".into(),
            delta: "hello ".into(),
        };
        let json = serde_json::to_string(&t).unwrap();
        let back: TokenNotify = serde_json::from_str(&json).unwrap();
        assert_eq!(t, back);
    }

    #[test]
    fn done_notify_default_cancelled_is_false() {
        let json = r#"{"stream_id":"s1"}"#;
        let d: DoneNotify = serde_json::from_str(json).unwrap();
        assert!(!d.cancelled);
    }

    #[test]
    fn done_notify_explicit_cancelled_round_trip() {
        let d = DoneNotify {
            stream_id: "s1".into(),
            cancelled: true,
        };
        let json = serde_json::to_string(&d).unwrap();
        let back: DoneNotify = serde_json::from_str(&json).unwrap();
        assert_eq!(d, back);
    }

    #[test]
    fn error_notify_round_trip() {
        let e = ErrorNotify {
            stream_id: "s1".into(),
            code: "context_overflow".into(),
            message: "input exceeds context".into(),
        };
        let json = serde_json::to_string(&e).unwrap();
        let back: ErrorNotify = serde_json::from_str(&json).unwrap();
        assert_eq!(e, back);
    }
}
