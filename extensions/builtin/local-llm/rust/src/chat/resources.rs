//! Host resources required by the LLM extension's chat handlers.
//!
//! Built once at host startup and threaded into the chat router as state.
//! Each field corresponds to a host capability the legacy host-mounted
//! handlers consumed via `AppState`. Bundling them here is the bridge
//! that lets the migrated handlers stay in the extension subproject
//! while still calling host-owned subprocess + storage infrastructure
//! (per Principle XIII.3 — extensions MAY consume host APIs).

use std::sync::Arc;

use nexus_backend_runtimes::events::{BackendEventBus, SharedPublisher};
use nexus_backend_runtimes::spawn::Spawner;
use nexus_models_store::downloads::{DownloadOrchestrator, InstallMap};
use sqlx::SqlitePool;

use super::load_registry::ModelLoadRegistry;

/// Bundle of host resources the chat handlers consume. All `Option`
/// fields mirror the host's `AppState` shape — when wired in production
/// they are `Some`; some test fixtures pass `None` to skip subprocess
/// spawn paths.
#[derive(Clone)]
pub struct ChatHandlerResources {
    pub pool: SqlitePool,
    pub install_map: Option<InstallMap>,
    pub download_orchestrator: Option<Arc<DownloadOrchestrator>>,
    pub spawner: Option<Arc<Spawner>>,
    pub backend_event_publisher: SharedPublisher,
    pub backend_event_bus: Arc<BackendEventBus>,
    pub model_load_registry: Arc<ModelLoadRegistry>,
}

impl ChatHandlerResources {
    pub fn new(
        pool: SqlitePool,
        install_map: Option<InstallMap>,
        download_orchestrator: Option<Arc<DownloadOrchestrator>>,
        spawner: Option<Arc<Spawner>>,
        backend_event_publisher: SharedPublisher,
        backend_event_bus: Arc<BackendEventBus>,
        model_load_registry: Arc<ModelLoadRegistry>,
    ) -> Self {
        Self {
            pool,
            install_map,
            download_orchestrator,
            spawner,
            backend_event_publisher,
            backend_event_bus,
            model_load_registry,
        }
    }
}
