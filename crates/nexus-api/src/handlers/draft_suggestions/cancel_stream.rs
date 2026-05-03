//! `POST /api/v1/modules/drafts/{draft_id}/suggestions/{stream_id}/cancel`.
//!
//! Idempotent. Returns 204 regardless of whether the stream is in-flight,
//! finished, or unknown — per
//! `contracts/draft_suggestions.openapi.yaml`. The body of the cancel
//! signal is just flipping the `CancelFlag` registered for the stream;
//! the streaming task observes the flag between tokens and emits a
//! terminal `cancelled` SSE event before closing.

use axum::Extension;
use axum::extract::Path;
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};

use super::start_stream::DraftSuggestionState;
use super::types::StreamId;

#[derive(Debug, serde::Deserialize)]
pub struct CancelPath {
    pub draft_id: String,
    pub stream_id: StreamId,
}

pub async fn cancel_stream(
    Extension(state): Extension<DraftSuggestionState>,
    Path(params): Path<CancelPath>,
) -> Response {
    let _ = params.draft_id;
    state.registry.cancel(&params.stream_id);
    StatusCode::NO_CONTENT.into_response()
}
