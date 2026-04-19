pub mod dto;
pub mod envelope;
pub mod error;
pub mod frontend;
pub mod handlers;
pub mod mapping;
pub mod router;
mod ws;

pub use nexus_backend_runtimes::events::BroadcastPublisher as BackendEventPublisher;

use std::path::PathBuf;
use std::sync::Arc;

pub use envelope::ApiResponse;
pub use error::ApiError;

use nexus_artifact::FilesystemArtifactStore;
use nexus_backend_runtimes::adapter::AdapterRegistry as BackendAdapterRegistry;
use nexus_backend_runtimes::events::BroadcastPublisher;
use nexus_backend_runtimes::spawn::Spawner;
use nexus_events::bus::EventBus;
use nexus_extension::InMemoryExtensionRegistry;
use nexus_huggingface::HuggingFaceCapability;
use nexus_models_store::capabilities::CapabilityRegistry;
use nexus_models_store::downloads::{DownloadOrchestrator, JobStore, TokenStore};
use nexus_run::DefaultRunEngine;
use nexus_scheduler::Scheduler;
use nexus_storage::{SqliteDatabase, StorageManager};
use nexus_worker::DefaultWorkerManager;

use handlers::modules::draft_map::DraftMaterializeMap;

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
    pub hf_token_store: Option<TokenStore>,
    pub backend_event_bus: Arc<BroadcastPublisher>,
    pub draft_materialize_map: Arc<DraftMaterializeMap>,
    pub host_install_paths: Option<HostInstallPaths>,
}

pub fn create_router(state: AppState) -> axum::Router {
    router::build(state)
}
