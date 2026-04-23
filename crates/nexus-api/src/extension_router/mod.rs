//! Generic extension HTTP router dispatcher.
//!
//! Implements spec 030 — the host exposes a single generic route
//! `/api/v1/extensions/{ext_id}/{*rest}` whose handler looks up the
//! registered router by `ext_id` and forwards the request unchanged.
//! The host code in this module never names any specific extension.
//!
//! See `.specify/memory/constitution.md` Principle XIII (Host ↔ Extension
//! Boundary) and `.claude/rules/host-extension-boundary.md`.

pub mod dispatcher;
pub mod id;
pub mod registry;

pub use dispatcher::{dispatch, dispatch_root};
pub use id::{ExtensionId, IdError};
pub use registry::{DefaultRegistry, Registration};

use std::sync::Arc;

use axum::Router;
use chrono::{DateTime, Utc};

/// Errors produced by registry mutations.
#[derive(Debug, thiserror::Error)]
#[non_exhaustive]
pub enum RegistryError {
    #[error("duplicate extension id: {0}")]
    Duplicate(String),

    #[error("registry is sealed; cannot register after startup")]
    Sealed,

    #[error("invalid extension id: {0}")]
    InvalidId(#[from] IdError),
}

/// Host-owned in-memory store of extension router registrations.
///
/// Built during host startup (one entry per extension that provides an
/// HTTP router), then sealed before the HTTP listener binds. After
/// sealing, only read operations are allowed.
pub trait ExtensionRouterRegistry: Send + Sync + 'static {
    fn register(
        &self,
        id: ExtensionId,
        router: Router,
        http_routes: Vec<String>,
    ) -> Result<(), RegistryError>;

    fn register_failure(&self, id: ExtensionId, reason: String) -> Result<(), RegistryError>;

    fn seal(&self);

    fn get(&self, id: &str) -> Option<Registration>;

    fn list_ids(&self) -> Vec<String>;

    fn contains(&self, id: &str) -> bool;

    fn is_sealed(&self) -> bool;
}

/// Convenience alias for the shared registry handle stored in `AppState`.
pub type SharedRegistry = Arc<dyn ExtensionRouterRegistry>;

/// Timestamp helper kept here so all registry impls agree on the source.
pub(crate) fn now() -> DateTime<Utc> {
    Utc::now()
}
