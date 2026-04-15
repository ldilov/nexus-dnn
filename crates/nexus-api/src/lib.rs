pub mod dto;
pub mod envelope;
pub mod error;
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
use nexus_events::bus::EventBus;
use nexus_extension::InMemoryExtensionRegistry;
use nexus_huggingface::HuggingFaceCapability;
use nexus_local_llm::adapter::AdapterRegistry as BackendAdapterRegistry;
use nexus_local_llm::manifest::install_models::ModelInstaller;
use std::collections::HashMap;
use tokio::sync::Mutex;
use tokio_util::sync::CancellationToken;
use nexus_run::DefaultRunEngine;
use nexus_scheduler::Scheduler;
use nexus_storage::{SqliteDatabase, StorageManager};
use nexus_worker::DefaultWorkerManager;

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
    pub huggingface: Option<Arc<dyn HuggingFaceCapability>>,
    pub extension_model_installers: Arc<HashMap<String, Arc<ModelInstaller>>>,
    pub install_task_cancels: Arc<Mutex<HashMap<String, CancellationToken>>>,
}

pub fn create_router(state: AppState) -> axum::Router {
    router::build(state)
}
