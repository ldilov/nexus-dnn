//! The [`RuntimeFamilyHandler`] trait + per-process [`FamilyHandlerRegistry`]
//! that keys family implementations by [`RuntimeFamily`].
//!
//! A family handler captures the family-specific knowledge the generic
//! pipeline does not have: how to bootstrap its runtime (e.g. fetch a
//! portable Python), how to install deps (pip / none), how to validate
//! the final environment, and how to shape a subprocess spawn.
//!
//! One handler per family is registered at host boot; lookups are
//! `O(1)` via the `Arc<RwLock<HashMap<…>>>`.

use std::collections::HashMap;
use std::sync::Arc;

use async_trait::async_trait;
use tokio::sync::RwLock;

use crate::family::RuntimeFamily;
use crate::generic::errors::GenericInstallError;
use crate::generic::install_ctx::{InstallCtx, LaunchSpec};
use crate::generic::installs::InstallRecord;
use crate::generic::settings::RuntimeSettings;

/// Family-specific behaviour invoked by the install pipeline + lease
/// subsystem. All async methods MUST honour the context's
/// [`CancellationToken`](tokio_util::sync::CancellationToken) at phase
/// boundaries.
#[async_trait]
pub trait RuntimeFamilyHandler: Send + Sync + 'static {
    fn family(&self) -> RuntimeFamily;

    /// Family-specific runtime bootstrap (e.g. fetch and unpack embedded
    /// Python). Idempotent — second call with the same ctx is a no-op.
    async fn bootstrap_runtime(&self, ctx: &mut InstallCtx) -> Result<(), GenericInstallError>;

    /// Install family-specific dependencies into the staged install dir
    /// (e.g. pip install into the embedded Python's site-packages).
    async fn install_deps(&self, ctx: &mut InstallCtx) -> Result<(), GenericInstallError>;

    /// Sanity-check the staged environment before the pipeline flips the
    /// install row to `validated`. May populate `ctx.entrypoint_path`.
    async fn validate_env(&self, ctx: &mut InstallCtx) -> Result<(), GenericInstallError>;

    /// Build the subprocess launch specification used when the lease
    /// subsystem acquires this install. Synchronous — should not read
    /// filesystem state unless truly unavoidable.
    fn spawn_launch_spec(&self, install: &InstallRecord, settings: &RuntimeSettings) -> LaunchSpec;
}

/// Thread-safe registry keyed by [`RuntimeFamily`]. Host boot populates
/// this once; lookups thereafter are read-only.
#[derive(Clone, Default)]
pub struct FamilyHandlerRegistry {
    inner: Arc<RwLock<HashMap<RuntimeFamily, Arc<dyn RuntimeFamilyHandler>>>>,
}

impl FamilyHandlerRegistry {
    pub fn new() -> Self {
        Self::default()
    }

    /// Register a handler. Overwrites any previous registration for the
    /// same family (useful in tests).
    pub async fn register(&self, handler: Arc<dyn RuntimeFamilyHandler>) {
        let family = handler.family();
        self.inner.write().await.insert(family, handler);
    }

    pub async fn get(&self, family: RuntimeFamily) -> Option<Arc<dyn RuntimeFamilyHandler>> {
        self.inner.read().await.get(&family).cloned()
    }

    pub async fn families(&self) -> Vec<RuntimeFamily> {
        self.inner.read().await.keys().copied().collect()
    }
}
