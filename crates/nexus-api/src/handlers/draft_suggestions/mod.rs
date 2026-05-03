//! Module Draft AI suggestion stream.
//!
//! Generic, extension-agnostic handler family that opens a Server-Sent
//! Events stream of suggestion deltas for a single line of a Module Draft.
//! Acquires an inference backend via the existing
//! `/api/v1/backend-runtime-leases` machinery; persists nothing beyond
//! what the existing draft-save flow already persists when the operator
//! accepts a suggestion.
//!
//! Boundary contract (Constitution Principle XIII / FR-051):
//! - Path contains no extension id literal.
//! - This module + its sub-modules MUST contain zero matches for any
//!   specific extension id (the boundary audit test enumerates the
//!   banned forms; this comment must not).
//! - Asserted by `tests/draft_suggestions/boundary_audit_test.rs`.
//!
//! Wire contract: see
//! `specs/037-spectral-graphite-redesign/contracts/draft_suggestions.openapi.yaml`
//! and `contracts/draft_suggestions.events.md`.

pub mod cancel_stream;
pub mod errors;
pub mod lease_adapter;
pub mod prompt_template;
pub mod provider;
pub mod registry;
pub mod sse;
pub mod start_stream;
pub mod types;

pub use cancel_stream::cancel_stream as cancel_stream_handler;
pub use errors::{DraftSuggestionError, ErrorCode};
pub use lease_adapter::{
    CatalogBackedLeaseFinder, EligibleLeaseFinder, LeaseBackedStreamProvider, NullStreamProvider,
};
pub use prompt_template::{PromptInputs, PromptPair, build_prompt};
pub use provider::{
    CancelFlag, FakeStreamProvider, StreamHandle, StreamItem, SuggestionStreamProvider,
};
pub use registry::StreamRegistry;
pub use sse::SseEncoder;
pub use start_stream::{DraftSuggestionState, start_stream as start_stream_handler};
pub use types::{
    CancelReason, DraftId, StreamId, SuggestionContext, SuggestionIntent, SuggestionRequest,
    SuggestionResponseEvent,
};

use axum::{Extension, Router};
use axum::routing::post;
use std::sync::Arc;

/// Generic router builder for the Draft AI suggestion stream endpoint
/// family. Returns a `Router<S>` so it can be merged into a host router
/// of any state type — handlers extract their own per-request state via
/// the `Extension` layer attached here.
///
/// Boundary-clean: takes only an injected `SuggestionStreamProvider`.
pub fn router<S: Clone + Send + Sync + 'static>(
    provider: Arc<dyn SuggestionStreamProvider>,
) -> Router<S> {
    let state = DraftSuggestionState::new(provider);
    Router::new()
        .route(
            "/api/v1/modules/drafts/{draft_id}/suggestions",
            post(start_stream_handler),
        )
        .route(
            "/api/v1/modules/drafts/{draft_id}/suggestions/{stream_id}/cancel",
            post(cancel_stream_handler),
        )
        .layer(Extension(state))
}
