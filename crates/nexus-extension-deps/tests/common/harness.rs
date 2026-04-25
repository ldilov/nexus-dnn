//! Lightweight test harness — synthesises a [`StepContext`]/[`RunnerContext`]
//! against `tempfile::TempDir`s + stub trait impls so integration tests can
//! exercise the runner without spinning up real spec-032/spec-025 services.

use std::collections::HashMap;
use std::path::Path;
use std::path::PathBuf;
use std::sync::{Arc, Mutex};

use async_trait::async_trait;
use tokio_util::sync::CancellationToken;

use nexus_extension_deps::{
    DepError, HandshakeError, ModelDownloadProgress, ModelStoreClient, ProgressEvent, ProgressSink,
    RunnerContext, RuntimeBootstrapResult, RuntimeBootstrapper, StepArtifact, WorkerHandshake,
    fetch::{FetchArtifact, FetchRequest, fetch_artifact},
};

/// Captures every emitted [`ProgressEvent`] for later assertion.
#[derive(Default)]
pub struct CapturingSink {
    pub events: Mutex<Vec<ProgressEvent>>,
}

impl ProgressSink for CapturingSink {
    fn emit(&self, event: ProgressEvent) {
        self.events.lock().expect("lock").push(event);
    }
}

pub struct StubModelStore;
#[async_trait]
impl ModelStoreClient for StubModelStore {
    async fn is_family_installed(
        &self,
        _f: &str,
        _a: Option<&str>,
    ) -> Result<Option<PathBuf>, DepError> {
        Ok(None)
    }
    async fn start_download(&self, _f: &str, _a: Option<&str>) -> Result<String, DepError> {
        unreachable!("stub model store called");
    }
    async fn poll_job(&self, _id: &str) -> Result<ModelDownloadProgress, DepError> {
        unreachable!("stub model store called");
    }
}

pub struct StubRuntime;
#[async_trait]
impl RuntimeBootstrapper for StubRuntime {
    async fn probe(
        &self,
        _f: &str,
        _v: Option<&str>,
        _a: &[String],
        _t: &Path,
    ) -> Result<Option<RuntimeBootstrapResult>, DepError> {
        Ok(None)
    }
    async fn bootstrap(
        &self,
        _f: &str,
        _v: Option<&str>,
        _a: &[String],
        _t: &Path,
        _c: CancellationToken,
    ) -> Result<RuntimeBootstrapResult, DepError> {
        unreachable!("stub runtime called");
    }
}

pub struct StubHandshake;
#[async_trait]
impl WorkerHandshake for StubHandshake {
    async fn run_handshake(
        &self,
        _ext: &str,
        _dir: &Path,
        _ups: &HashMap<String, StepArtifact>,
        _t: std::time::Duration,
        _c: CancellationToken,
    ) -> Result<(), HandshakeError> {
        unreachable!("stub handshake called");
    }
}

pub fn stub_fetch_artifact() -> Arc<FetchArtifact> {
    Arc::new(|_req: FetchRequest| {
        Box::pin(async move { Err(DepError::Backend("stub fetch_artifact called".into())) })
    })
}

/// Real `fetch_artifact` (used by tests that exercise the system_binary path
/// against a wiremock server).
pub fn real_fetch_artifact() -> Arc<FetchArtifact> {
    Arc::new(|req: FetchRequest| Box::pin(fetch_artifact(req)))
}

pub struct HarnessHandles {
    pub sink: Arc<CapturingSink>,
    pub progress_sink: Arc<dyn ProgressSink>,
    pub fetch: Arc<FetchArtifact>,
    pub model_store: Arc<dyn ModelStoreClient>,
    pub runtime_bootstrapper: Arc<dyn RuntimeBootstrapper>,
    pub worker_handshake: Arc<dyn WorkerHandshake>,
}

impl HarnessHandles {
    pub fn new() -> Self {
        let sink = Arc::new(CapturingSink::default());
        let progress_sink: Arc<dyn ProgressSink> = sink.clone();
        Self {
            sink,
            progress_sink,
            fetch: stub_fetch_artifact(),
            model_store: Arc::new(StubModelStore),
            runtime_bootstrapper: Arc::new(StubRuntime),
            worker_handshake: Arc::new(StubHandshake),
        }
    }
}

pub fn build_runner_ctx<'a>(
    handles: &HarnessHandles,
    extension_id: &'a str,
    tmp: &'a Path,
) -> RunnerContext<'a> {
    RunnerContext {
        extension_id,
        extension_dir: tmp,
        extension_data_dir: tmp,
        host_data_dir: tmp,
        model_store: handles.model_store.clone(),
        runtime_bootstrapper: handles.runtime_bootstrapper.clone(),
        worker_handshake: handles.worker_handshake.clone(),
        fetch_artifact: handles.fetch.clone(),
        progress_sink: handles.progress_sink.clone(),
        cancellation_token: CancellationToken::new(),
        install_run_id: uuid::Uuid::nil(),
    }
}
