//! Per-run handler context. Carries host-owned services that handlers compose against.

use std::collections::HashMap;
use std::path::{Path, PathBuf};
use std::sync::Arc;

use tokio_util::sync::CancellationToken;

use crate::types::{ProgressSink, StepArtifact};

/// Trait the host implements to give the [`crate::handlers::ModelArtifactHandler`] a way
/// to query and trigger model-store downloads without a hard dep on `nexus-models-store`.
#[async_trait::async_trait]
pub trait ModelStoreClient: Send + Sync {
    /// Is the named family already installed on disk?
    async fn is_family_installed(
        &self,
        family_id: &str,
        accelerator: Option<&str>,
    ) -> Result<Option<PathBuf>, crate::DepError>;

    /// Start (or attach to) a download job and return its id. The job runs in the
    /// model-store layer; the handler watches it via `poll_job`.
    async fn start_download(
        &self,
        family_id: &str,
        accelerator: Option<&str>,
    ) -> Result<String, crate::DepError>;

    /// Poll a previously-started job for current progress. Returns `Ok(None)` if the
    /// job is still running with the reported progress; `Ok(Some(path))` on success.
    async fn poll_job(&self, job_id: &str) -> Result<ModelDownloadProgress, crate::DepError>;

    /// Cheap, no-network partial-state snapshot for a family, read from the persisted
    /// download job. Returns `Ok(None)` when no job exists yet. MUST NOT hit the network.
    async fn family_partial_state(
        &self,
        _family_id: &str,
        _accelerator: Option<&str>,
    ) -> Result<Option<ModelPartialState>, crate::DepError> {
        Ok(None)
    }

    /// Record that `extension_id` references the model artifact resolved for
    /// `(family_id, accelerator)`. Called by the `model_artifact` handler after
    /// a successful install so the host can ref-count shared models and GC them
    /// only when the last extension drops its reference.
    ///
    /// Default no-op: probe-only / test doubles that never persist refs accept
    /// the default. The host's real client overrides it to write a ref row.
    async fn record_reference(
        &self,
        _extension_id: &str,
        _family_id: &str,
        _accelerator: Option<&str>,
    ) -> Result<(), crate::DepError> {
        Ok(())
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct ModelPartialState {
    pub present_bytes: u64,
    pub total_bytes: u64,
    pub files_present: u32,
    pub files_total: u32,
}

#[derive(Debug, Clone)]
pub enum ModelDownloadProgress {
    InProgress {
        current_bytes: u64,
        total_bytes: u64,
        message: String,
    },
    Completed {
        path: PathBuf,
        bytes_placed: u64,
    },
    Failed {
        category: String,
        message: String,
    },
}

/// Trait the host implements so the `RuntimeHandler` can delegate to spec 032's
/// `nexus-backend-runtimes` without a hard dep on that crate from this one.
#[async_trait::async_trait]
pub trait RuntimeBootstrapper: Send + Sync {
    /// Is the requested runtime family/version/profile already installed at a
    /// known-good location?
    async fn probe(
        &self,
        family: &str,
        version: Option<&str>,
        accelerator_profiles: &[String],
        target_dir: &std::path::Path,
    ) -> Result<Option<RuntimeBootstrapResult>, crate::DepError>;

    /// Bootstrap the runtime into `target_dir`. Idempotent.
    async fn bootstrap(
        &self,
        family: &str,
        version: Option<&str>,
        accelerator_profiles: &[String],
        target_dir: &std::path::Path,
        cancellation: tokio_util::sync::CancellationToken,
    ) -> Result<RuntimeBootstrapResult, crate::DepError>;
}

#[derive(Debug, Clone)]
pub struct RuntimeBootstrapResult {
    pub install_dir: PathBuf,
    pub resolved_version: String,
    pub resolved_profile: Option<String>,
    pub bytes_placed: u64,
}

/// Trait the host implements so the `ValidationHandler` can delegate the worker
/// handshake to spec 032's lease primitives without a hard dep on that crate.
#[async_trait::async_trait]
pub trait WorkerHandshake: Send + Sync {
    /// Spawn the extension's worker, run the handshake within `timeout`, and return
    /// success or a categorised failure.
    ///
    /// `extension_data_dir` is the per-extension host-data directory
    /// (e.g. `<host_data_dir>/extensions/<extension_id>`) — implementations
    /// can use it as a convention-based fallback when `upstream_artifacts`
    /// is missing the runtime/venv (e.g. on a host built before the
    /// runner's probe-skip artifact-propagation fix landed).
    async fn run_handshake(
        &self,
        extension_id: &str,
        extension_dir: &std::path::Path,
        extension_data_dir: &std::path::Path,
        upstream_artifacts: &HashMap<String, StepArtifact>,
        timeout: std::time::Duration,
        cancellation: tokio_util::sync::CancellationToken,
    ) -> Result<(), HandshakeError>;
}

#[derive(Debug, Clone)]
pub struct HandshakeError {
    pub category: String,
    pub message: String,
}

/// The per-run context handed to every handler invocation. Carries everything the
/// handler is permitted to touch.
pub struct StepContext<'a> {
    pub extension_id: &'a str,
    pub extension_dir: &'a Path,
    pub extension_data_dir: &'a Path,
    pub host_data_dir: &'a Path,

    pub model_store: Arc<dyn ModelStoreClient>,
    pub runtime_bootstrapper: Arc<dyn RuntimeBootstrapper>,
    pub worker_handshake: Arc<dyn WorkerHandshake>,
    pub fetch_artifact: Arc<crate::fetch::FetchArtifact>,
    pub progress_sink: Arc<dyn ProgressSink>,
    pub cancellation_token: CancellationToken,
    pub install_run_id: uuid::Uuid,

    /// Resolved artifacts of upstream `requires` steps in topo order. Available to
    /// `run()` so downstream steps can consult upstream metadata (e.g., the resolved
    /// accelerator profile of a `runtime` step picked up by a `model_artifact` step).
    pub upstream_artifacts: &'a HashMap<String, StepArtifact>,
}
