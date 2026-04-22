//! Adapter contract for extensions that publish HTTP routes.
//!
//! Spec 030. The host calls `build_router` once at startup. Returned
//! tuple is `(Router, http_routes)`; the host stores both verbatim and
//! never inspects the router's internals. See constitution Principle XIII
//! (Host ↔ Extension Boundary, NON-NEGOTIABLE).

use std::sync::Arc;

use axum::Router;

/// Result of `ExtensionRouterProvider::build_router`. Boxed error keeps
/// extension errors opaque from the host's point of view.
pub type BuildRouterError = Box<dyn std::error::Error + Send + Sync>;

/// Adapter trait implemented by every extension that exposes an HTTP
/// surface. The host depends only on this trait — never on a concrete
/// extension type, except in the single permitted startup-wiring seam.
pub trait ExtensionRouterProvider: Send + Sync {
    /// Stable extension id. Must match `[a-z][a-z0-9.-]*` and be unique
    /// across the host process.
    fn extension_id(&self) -> &'static str;

    /// Build the extension's `axum::Router`. Called exactly once during
    /// host startup. Returning `Err` causes the registry to record
    /// `Registration::Failed` for this id; subsequent requests to the
    /// extension respond with HTTP 503.
    ///
    /// `http_routes` is an optional disclosure — patterns the extension
    /// claims to expose (e.g. `["/chat/threads", "/chat/threads/{id}"]`).
    /// Surfaced via the `/api/v1/extensions` listing endpoint.
    fn build_router(
        &self,
        cx: &ExtensionContext<'_>,
    ) -> Result<(Router, Vec<String>), BuildRouterError>;
}

/// Borrowed view of host-supplied resources passed to each provider at
/// router-build time. Deliberately narrow — extensions consume only what
/// the boundary rule permits.
#[non_exhaustive]
pub struct ExtensionContext<'a> {
    pub extension_id: &'a str,
    pub host_facts: HostFacts<'a>,
}

impl<'a> ExtensionContext<'a> {
    pub fn new(extension_id: &'a str, host_facts: HostFacts<'a>) -> Self {
        Self {
            extension_id,
            host_facts,
        }
    }
}

/// Generic facts about the host that any extension may consume. Future
/// fields (token clients, capability snapshots) are additive.
#[derive(Clone)]
#[non_exhaustive]
pub struct HostFacts<'a> {
    /// Base URL the extension can use to call host APIs (`/api/host/*`,
    /// `/api/v1/...`). Borrowed string keeps the context short-lived.
    pub host_api_base: &'a str,

    /// Type-erased payload extensions can downcast to access opaque
    /// host-supplied resources (sqlx pools, HTTP clients) without the
    /// host crate depending on the extension's concrete types.
    pub opaque: Option<Arc<dyn std::any::Any + Send + Sync>>,
}

impl<'a> HostFacts<'a> {
    pub fn new(host_api_base: &'a str) -> Self {
        Self {
            host_api_base,
            opaque: None,
        }
    }

    pub fn with_opaque(mut self, value: Arc<dyn std::any::Any + Send + Sync>) -> Self {
        self.opaque = Some(value);
        self
    }
}
