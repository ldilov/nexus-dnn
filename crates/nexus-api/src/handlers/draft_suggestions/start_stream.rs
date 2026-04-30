//! Spec 037 — `POST /api/v1/modules/drafts/{draft_id}/suggestions`.
//!
//! Validates the request, builds the prompt, asks the configured
//! `SuggestionStreamProvider` for a token stream, and re-encodes the
//! resulting `StreamItem`s as Server-Sent Events per
//! `contracts/draft_suggestions.events.md`.
//!
//! Exit-path invariants (per the events contract):
//! - Every successful response opens with `stream_started` and closes
//!   with exactly one of `complete | error | cancelled`.
//! - A pre-stream lease failure returns HTTP 503 with a
//!   `NoBackendError` body — the SSE stream is never opened.
//! - Validation failures return HTTP 400 with a `ValidationError` body.
//! - Client disconnect: the stream task drops the lease via the
//!   provider when the receiver channel closes (RAII on `StreamHandle`
//!   / the spawned producer task).

use std::sync::Arc;
use std::time::Duration;

use axum::Extension;
use axum::Json;
use axum::extract::Path;
use axum::http::StatusCode;
use axum::response::sse::{Event, KeepAlive, Sse};
use axum::response::{IntoResponse, Response};
use futures_util::StreamExt;
use serde_json::json;
use tokio::sync::mpsc;
use tokio_stream::wrappers::ReceiverStream;

use super::errors::{DraftSuggestionError, ErrorCode};
use super::prompt_template::{PromptInputs, build_prompt};
use super::provider::{CancelFlag, StreamItem, SuggestionStreamProvider};
use super::registry::StreamRegistry;
use super::sse::SseEncoder;
use super::types::{
    CancelReason, DraftId, StreamId, SuggestionRequest, SuggestionResponseEvent,
};

/// Channel buffer for outbound SSE events. Small — the stream is
/// ordered and slower than the producer; back-pressure is desired.
const SSE_CHANNEL_CAPACITY: usize = 16;

const KEEPALIVE_INTERVAL: Duration = Duration::from_secs(15);

/// Upper bound on how long the producer will wait to flush the terminal
/// SSE event. If the consumer body has stopped draining (rare flaky
/// client), give up rather than wedging the spawned task forever.
const TERMINAL_SEND_TIMEOUT: Duration = Duration::from_secs(5);

fn elapsed_ms_capped(started_at: std::time::Instant) -> u32 {
    started_at.elapsed().as_millis().min(u32::MAX as u128) as u32
}

/// Handler dependencies. Wraps the trait + registry so the AppState
/// only needs to inject one struct.
#[derive(Clone)]
pub struct DraftSuggestionState {
    pub provider: Arc<dyn SuggestionStreamProvider>,
    pub registry: Arc<StreamRegistry>,
}

impl DraftSuggestionState {
    pub fn new(provider: Arc<dyn SuggestionStreamProvider>) -> Self {
        Self {
            provider,
            registry: StreamRegistry::new(),
        }
    }
}

/// `POST /api/v1/modules/drafts/{draft_id}/suggestions` handler.
///
/// `draft_id` is currently treated as opaque — the host does not
/// introspect drafts beyond echoing the value through any future
/// draft-save flow. Reserved for future per-draft metering.
pub async fn start_stream(
    Extension(state): Extension<DraftSuggestionState>,
    Path(draft_id): Path<String>,
    Json(request): Json<SuggestionRequest>,
) -> Response {
    let _draft_id = DraftId::from(draft_id);

    if let Err(violations) = request.validate() {
        let details: serde_json::Map<String, serde_json::Value> = violations
            .into_iter()
            .map(|(field, msg)| (field.to_string(), json!(msg)))
            .collect();
        return (
            StatusCode::BAD_REQUEST,
            Json(json!({
                "code": ErrorCode::ValidationError.as_wire_str(),
                "message": "request body failed validation",
                "details": serde_json::Value::Object(details),
            })),
        )
            .into_response();
    }

    let prompt = build_prompt(PromptInputs {
        draft_text: &request.context.draft_text,
        cursor_line: request.cursor_line,
        active_line_text: &request.context.active_line_text,
        preceding_lines: request.context.preceding_lines,
        intent: request.intent,
    });

    let cancel = CancelFlag::new();
    let handle = match state
        .provider
        .open_stream(&request, prompt, cancel.clone())
        .await
    {
        Ok(h) => h,
        Err(err) => return pre_stream_error_response(&err),
    };

    let stream_id = StreamId::new();
    state.registry.insert(stream_id, cancel.clone());

    let (tx, rx) = mpsc::channel::<Result<Event, std::convert::Infallible>>(SSE_CHANNEL_CAPACITY);
    let encoder = SseEncoder::new();

    let started = SuggestionResponseEvent::StreamStarted {
        stream_id,
        started_at: chrono::Utc::now().to_rfc3339(),
        lease_id: handle.lease_id.clone(),
    };
    if let Ok(ev) = encoder.encode(&started) {
        let _ = tx.send(Ok(ev)).await;
    }

    let registry = state.registry.clone();
    tokio::spawn(async move {
        let started_at = std::time::Instant::now();
        let mut buffered = String::new();
        let mut tokens_emitted: u32 = 0;
        let mut items = handle.items;
        let mut terminated_with: Option<SuggestionResponseEvent> = None;

        while let Some(item) = items.next().await {
            if cancel.is_cancelled() {
                terminated_with = Some(SuggestionResponseEvent::Cancelled {
                    reason: CancelReason::ClientCancelled.as_wire_str().into(),
                    tokens_emitted,
                    elapsed_ms: elapsed_ms_capped(started_at),
                });
                break;
            }
            match item {
                StreamItem::Token(delta) if !delta.is_empty() => {
                    buffered.push_str(&delta);
                    tokens_emitted += 1;
                    let ev = SuggestionResponseEvent::Token { delta };
                    if let Ok(encoded) = encoder.encode(&ev)
                        && tx.send(Ok(encoded)).await.is_err()
                    {
                        break;
                    }
                }
                StreamItem::Token(_) => {
                    // Skip empty deltas — forbidden by the contract.
                }
                StreamItem::Done => {
                    terminated_with = Some(SuggestionResponseEvent::Complete {
                        final_text: buffered.clone(),
                        tokens_emitted,
                        elapsed_ms: elapsed_ms_capped(started_at),
                    });
                    break;
                }
                StreamItem::LeaseRevoked(reason) => {
                    let err = DraftSuggestionError::LeaseRevoked(reason);
                    terminated_with = Some(SuggestionResponseEvent::Error {
                        code: err.code().as_wire_str().into(),
                        message: err.ui_message(),
                        retryable: err.retryable(),
                    });
                    break;
                }
                StreamItem::Error(err) => {
                    terminated_with = Some(SuggestionResponseEvent::Error {
                        code: err.code().as_wire_str().into(),
                        message: err.ui_message(),
                        retryable: err.retryable(),
                    });
                    break;
                }
            }
        }

        // Stream ended without an explicit terminator → emit `cancelled`
        // with `client_disconnected` so the wire contract's "exactly one
        // terminal event" invariant holds.
        let terminal = terminated_with.unwrap_or(SuggestionResponseEvent::Cancelled {
            reason: CancelReason::ClientDisconnected.as_wire_str().into(),
            tokens_emitted,
            elapsed_ms: elapsed_ms_capped(started_at),
        });
        if let Ok(ev) = encoder.encode(&terminal) {
            // Bounded send: if the consumer body has stopped draining
            // (rare flaky client) give up rather than wedging this task.
            let _ = tokio::time::timeout(TERMINAL_SEND_TIMEOUT, tx.send(Ok(ev))).await;
        }
        registry.remove(&stream_id);
    });

    let body = ReceiverStream::new(rx);
    Sse::new(body)
        .keep_alive(KeepAlive::new().interval(KEEPALIVE_INTERVAL))
        .into_response()
}

fn pre_stream_error_response(err: &DraftSuggestionError) -> Response {
    use DraftSuggestionError::*;
    let (status, code, cta) = match err {
        NoEligibleBackend => (
            StatusCode::SERVICE_UNAVAILABLE,
            ErrorCode::NoBackendLeasable,
            Some(json!({ "label": "Configure backend", "href": "/backends" })),
        ),
        LeaseAcquisitionFailed(_) => (
            StatusCode::SERVICE_UNAVAILABLE,
            ErrorCode::NoBackendLeasable,
            Some(json!({ "label": "Configure backend", "href": "/backends" })),
        ),
        Validation(_) => (StatusCode::BAD_REQUEST, ErrorCode::ValidationError, None),
        ModelUnavailable(_) => (
            StatusCode::SERVICE_UNAVAILABLE,
            ErrorCode::ModelUnavailable,
            None,
        ),
        PromptTooLong(_) => (StatusCode::BAD_REQUEST, ErrorCode::PromptTooLong, None),
        LeaseRevoked(_) | Internal(_) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            ErrorCode::Internal,
            None,
        ),
    };
    let mut body = json!({
        "code": code.as_wire_str(),
        "message": err.ui_message(),
    });
    if let Some(cta) = cta {
        body.as_object_mut().unwrap().insert("cta".to_string(), cta);
    }
    (status, Json(body)).into_response()
}
