//! Spec 035 — bootstrap wiring for the generic extension dependency installer.
//!
//! Builds the `Arc<...>` services that populate `AppState.dep_*` fields. Stub
//! adapters implement `RuntimeBootstrapper`/`ModelStoreClient`/`WorkerHandshake`
//! with `probe()` returning `Ok(None)` and `bootstrap`/`run`/`run_handshake`
//! returning a categorised `NotImplemented`-style error.
//!
//! Real adapters delegating to `nexus_backend_runtimes` / `nexus_models_store` /
//! lease primitives replace these stubs once each integration lands. Until then,
//! the host wires *something* so:
//! - `GET /dependencies` returns a meaningful step list (probe is real, not 503)
//! - the gallery's "Setup required" badge actually surfaces
//! - `POST /install` runs the orchestrator; failures carry a useful category

use std::path::PathBuf;
use std::sync::Arc;

use async_trait::async_trait;
use tokio_util::sync::CancellationToken;

use nexus_extension_deps::{
    DepError, HandlerRegistry, HandshakeError, ModelDownloadProgress, ModelStoreClient,
    RuntimeBootstrapResult, RuntimeBootstrapper, StepArtifact, WorkerHandshake,
    fetch::{FetchArtifact, FetchRequest, fetch_artifact},
};

/// Build the default registry — registers all five built-in handlers.
pub fn default_dep_handler_registry() -> Arc<HandlerRegistry> {
    Arc::new(HandlerRegistry::default())
}

/// Wrap the crate-level `fetch_artifact` function in the trait-object closure
/// shape required by `StepContext::fetch_artifact`.
pub fn default_fetch_artifact() -> Arc<FetchArtifact> {
    Arc::new(|req: FetchRequest| Box::pin(fetch_artifact(req)))
}

/// Stub `RuntimeBootstrapper` — `probe` returns `Ok(None)` (never installed),
/// `bootstrap` returns a categorised error pointing the user at backend manager.
pub struct StubRuntimeBootstrapper;

#[async_trait]
impl RuntimeBootstrapper for StubRuntimeBootstrapper {
    async fn probe(
        &self,
        _family: &str,
        _version: Option<&str>,
        _accelerator_profiles: &[String],
        _target_dir: &std::path::Path,
    ) -> Result<Option<RuntimeBootstrapResult>, DepError> {
        Ok(None)
    }

    async fn bootstrap(
        &self,
        family: &str,
        _version: Option<&str>,
        _accelerator_profiles: &[String],
        _target_dir: &std::path::Path,
        _cancellation: CancellationToken,
    ) -> Result<RuntimeBootstrapResult, DepError> {
        Err(DepError::Backend(format!(
            "runtime '{family}' bootstrap not yet wired to nexus-backend-runtimes — install via the Backends page for now"
        )))
    }
}

/// Stub `ModelStoreClient` — `probe` reports never-installed; download paths
/// return categorised errors. Full delegation to `nexus-models-store` lands
/// in a follow-up.
pub struct StubModelStoreClient;

#[async_trait]
impl ModelStoreClient for StubModelStoreClient {
    async fn is_family_installed(
        &self,
        _family_id: &str,
        _accelerator: Option<&str>,
    ) -> Result<Option<PathBuf>, DepError> {
        Ok(None)
    }

    async fn start_download(
        &self,
        family_id: &str,
        _accelerator: Option<&str>,
    ) -> Result<String, DepError> {
        Err(DepError::Backend(format!(
            "model store delegation not yet wired — download '{family_id}' via the Models Search page for now"
        )))
    }

    async fn poll_job(
        &self,
        _job_id: &str,
    ) -> Result<ModelDownloadProgress, DepError> {
        Ok(ModelDownloadProgress::Failed {
            category: "not_wired".into(),
            message: "model store delegation not yet wired".into(),
        })
    }
}

/// Stub `WorkerHandshake` — returns categorised `not_wired` until the lease
/// primitives are surfaced through this trait.
pub struct StubWorkerHandshake;

#[async_trait]
impl WorkerHandshake for StubWorkerHandshake {
    async fn run_handshake(
        &self,
        _extension_id: &str,
        _extension_dir: &std::path::Path,
        _upstream_artifacts: &std::collections::HashMap<String, StepArtifact>,
        _timeout: std::time::Duration,
        _cancellation: CancellationToken,
    ) -> Result<(), HandshakeError> {
        Err(HandshakeError {
            category: "not_wired".into(),
            message: "worker handshake delegation not yet wired to spec-032 lease primitives".into(),
        })
    }
}

/// Convenience bundle — every `Option<Arc<dyn ...>>` field on `AppState`
/// populated with the default registry + stubs.
pub struct DefaultDepBootstrap {
    pub handler_registry: Arc<HandlerRegistry>,
    pub runtime_bootstrapper: Arc<dyn RuntimeBootstrapper>,
    pub model_store: Arc<dyn ModelStoreClient>,
    pub worker_handshake: Arc<dyn WorkerHandshake>,
    pub fetch_artifact: Arc<FetchArtifact>,
    pub host_data_dir: PathBuf,
}

impl DefaultDepBootstrap {
    pub fn new(host_data_dir: PathBuf) -> Self {
        Self {
            handler_registry: default_dep_handler_registry(),
            runtime_bootstrapper: Arc::new(StubRuntimeBootstrapper),
            model_store: Arc::new(StubModelStoreClient),
            worker_handshake: Arc::new(StubWorkerHandshake),
            fetch_artifact: default_fetch_artifact(),
            host_data_dir,
        }
    }
}
