pub mod dto;
pub mod envelope;
pub mod error;
pub mod extension_router;
pub mod frontend;
pub mod handlers;
pub mod mapping;
pub mod router;
mod ws;

use std::path::PathBuf;
use std::sync::Arc;

pub use envelope::ApiResponse;
pub use error::ApiError;

use nexus_artifact::FilesystemArtifactStore;
use nexus_backend_runtimes::adapter::AdapterRegistry as BackendAdapterRegistry;
use nexus_backend_runtimes::events::{BackendEventBus, SharedPublisher};
use nexus_backend_runtimes::spawn::Spawner;
use nexus_events::bus::EventBus;
use nexus_extension::InMemoryExtensionRegistry;
use nexus_huggingface::HuggingFaceCapability;
use nexus_models_store::capabilities::CapabilityRegistry;
use nexus_models_store::downloads::{DownloadOrchestrator, InstallMap, JobStore, TokenStore};
use nexus_run::DefaultRunEngine;
use nexus_scheduler::Scheduler;
use nexus_storage::{SqliteDatabase, StorageManager};
use nexus_worker::DefaultWorkerManager;

use handlers::modules::draft_map::DraftMaterializeMap;

pub use crate::extension_router::ExtensionRouterRegistry;
use crate::extension_router::SharedRegistry;

#[derive(Clone)]
pub struct HostInstallPaths {
    pub installs_root: PathBuf,
    pub blobs_root: PathBuf,
}

#[derive(Clone)]
pub struct AppState {
    pub health_status_fn: Arc<dyn Fn() -> serde_json::Value + Send + Sync>,
    pub db: Arc<SqliteDatabase>,
    pub event_bus: Arc<dyn EventBus>,
    pub extension_registry: Arc<InMemoryExtensionRegistry>,
    pub run_engine: Arc<DefaultRunEngine<DefaultWorkerManager>>,
    pub worker_manager: Arc<DefaultWorkerManager>,
    pub scheduler: Arc<dyn Scheduler>,
    pub artifact_store: Arc<FilesystemArtifactStore>,
    pub extensions_dir: Option<PathBuf>,
    pub storage_manager: Option<Arc<StorageManager>>,
    pub backend_adapter_registry: Option<Arc<BackendAdapterRegistry>>,
    pub spawner: Option<Arc<Spawner>>,
    pub huggingface: Option<Arc<dyn HuggingFaceCapability>>,
    pub capability_registry: Option<Arc<CapabilityRegistry>>,
    pub download_job_store: Option<Arc<JobStore>>,
    pub download_orchestrator: Option<Arc<DownloadOrchestrator>>,
    pub install_map: Option<InstallMap>,
    pub hf_token_store: Option<TokenStore>,
    pub backend_event_publisher: SharedPublisher,
    pub backend_event_bus: Arc<BackendEventBus>,
    pub draft_materialize_map: Arc<DraftMaterializeMap>,
    pub host_install_paths: Option<HostInstallPaths>,
    pub extension_router_registry: SharedRegistry,
    /// Spec 032 — registry of `RuntimeFamilyHandler`s, keyed by
    /// `RuntimeFamily`. Empty by default; the host bootstrap registers
    /// concrete handlers (e.g. `FamilyNativeHandler`, `FamilyPythonHandler`).
    pub family_handlers: nexus_backend_runtimes::generic::family_handler::FamilyHandlerRegistry,
    /// Spec 032 — global broadcast of `PhaseEvent`s emitted by running
    /// install pipelines. Capacity `PIPELINE_EVENT_CAPACITY`. Subscribers
    /// filter by `install_id`. SSE progress endpoint reads from here.
    pub pipeline_events: Arc<
        tokio::sync::broadcast::Sender<
            nexus_backend_runtimes::generic::install_pipeline::PhaseEvent,
        >,
    >,
    /// Spec 032 — in-process registry of live `StdioLease` handles.
    /// Populated by `POST /install/:id/start`, drained by stop /
    /// uninstall / extension-deactivate paths.
    pub lease_manager: Arc<nexus_backend_runtimes::generic::leases::LeaseManager>,
}

/// Broadcast backlog for pipeline phase events — sized so a fresh
/// subscriber can catch up on a fully-unrolled 10-phase install (10
/// `started` + 10 `completed` = 20 events, plus headroom).
pub const PIPELINE_EVENT_CAPACITY: usize = 1024;

impl axum::extract::FromRef<AppState> for SharedRegistry {
    fn from_ref(state: &AppState) -> Self {
        state.extension_router_registry.clone()
    }
}

pub fn create_router(state: AppState) -> axum::Router {
    router::build(state)
}
