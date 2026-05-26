//! Generic text-completion broker.
//!
//! Accepts any caller. Surfaces the canonical text-completion JSON-RPC
//! contract (`nexus_backend_runtimes::generic::leases::text_completion`)
//! over a buffered HTTP endpoint, so worker subprocesses in any language
//! can call a host service without rolling stdio JSON-RPC plumbing
//! themselves.
//!
//! Boundary contract (project-local `host-extension-boundary.md` + spec
//! 049 D9):
//! - This module + sub-modules MUST contain zero matches for any
//!   specific extension id or domain-specific feature name.
//! - Enforced mechanically by the CI grep guard documented in spec 049.
//! - CI grep enforced.
//!
//! Wire shape:
//! - `POST /api/v1/services/text-completion`
//! - Request: `{system, user, max_tokens, timeout_ms}`
//! - Response: `{text}` (buffered; host collects the entire stream
//!   server-side before responding)
//! - Status codes per spec 049 D8 — see `errors::status_code`.

pub mod errors;
pub mod handler;
pub mod service;

pub use errors::{TextCompletionError, status_code};
pub use handler::{TextCompletionRequest, TextCompletionResponse, complete};
pub use service::{LeaseBackedTextCompletion, TextCompletionService};

use axum::Extension;
use axum::Router;
use axum::routing::post;
use std::sync::Arc;

/// Build the broker router. The provider drives the lease; tests inject
/// a fake to exercise status-code mapping without a real backend.
pub fn router<S: Clone + Send + Sync + 'static>(
    provider: Arc<dyn TextCompletionService>,
) -> Router<S> {
    Router::new()
        .route("/api/v1/services/text-completion", post(complete))
        .layer(Extension(provider))
}
