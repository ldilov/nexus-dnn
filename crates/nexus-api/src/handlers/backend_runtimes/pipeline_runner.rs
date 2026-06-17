//! Spawn the install pipeline orchestrator asynchronously (T064b).
//!
//! The `POST /install` handler (`install.rs`) inserts the pending
//! install row + returns 202 immediately; it then hands off to
//! [`spawn_pipeline`] which runs the 10-phase orchestrator on a
//! tokio task and writes the terminal outcome back to the install
//! row. Phase events are broadcast via `state.pipeline_events` so
//! the SSE progress endpoint can stream them live.

use std::path::PathBuf;
use std::sync::Arc;

use async_trait::async_trait;
use tokio::sync::broadcast;

use nexus_backend_runtimes::family::RuntimeFamily;
use nexus_backend_runtimes::family_native::FamilyNativeHandler;
use nexus_backend_runtimes::family_python::{FamilyPythonHandler, PythonAsset};
use nexus_backend_runtimes::generic::catalog::CatalogEntry;
use nexus_backend_runtimes::generic::enums::{InstallStatus, PipelineFailureCategory};
use nexus_backend_runtimes::generic::errors::GenericInstallError;
use nexus_backend_runtimes::generic::family_handler::RuntimeFamilyHandler;
use nexus_backend_runtimes::generic::ids::{
    AcceleratorProfile, PlatformId, ReleaseId, RuntimeId, RuntimeInstallId,
};
use nexus_backend_runtimes::generic::install_ctx::InstallCtx;
use nexus_backend_runtimes::generic::install_pipeline::{
    Phase, PhaseEvent, PhaseEventSink, PhaseState, run,
};
use nexus_backend_runtimes::generic::installs::{BackendRuntimeInstallsRepo, SqliteInstallsRepo};
use nexus_backend_runtimes::generic::version_manifest::parse_yaml;
use tokio_util::sync::CancellationToken;

use crate::AppState;

type EventSender = Arc<broadcast::Sender<PhaseEvent>>;

/// Sink that forwards every phase event to the global broadcast.
struct BroadcastSink {
    sender: EventSender,
}

#[async_trait]
impl PhaseEventSink for BroadcastSink {
    async fn emit(&self, event: PhaseEvent) {
        // Send-count ignored: the broadcast channel's semantics are
        // fire-and-forget. No subscribers → event dropped.
        let _ = self.sender.send(event);
    }
}

/// Fire-and-forget spawn — the pipeline runs on a detached tokio task.
/// Returns immediately; callers address the install via `install_id`.
///
/// On completion (success or failure) the install row is updated via
/// the installs repo. If the family handler isn't registered, the row
/// is flipped to `failed` with category `runtime_not_installed` before
/// any phase fires.
pub fn spawn_pipeline(state: AppState, request: PipelineRequest) {
    tokio::spawn(async move {
        let install_id = request.install_id;
        let runtime_id = request.runtime_id.clone();
        let family = request.runtime_family.as_str();
        let installs = SqliteInstallsRepo::new(state.db.pool().clone());
        let started_at = std::time::Instant::now();

        let outcome = drive(&state, &request).await;
        let duration_ms = started_at.elapsed().as_millis() as u64;

        match &outcome {
            Ok(()) => {
                tracing::info!(
                    target: "spec_032::install_outcome",
                    install_id = %install_id,
                    runtime_id = %runtime_id,
                    runtime_family = %family,
                    outcome = "success",
                    duration_ms,
                    "install pipeline succeeded",
                );
            }
            Err(e) => {
                tracing::info!(
                    target: "spec_032::install_outcome",
                    install_id = %install_id,
                    runtime_id = %runtime_id,
                    runtime_family = %family,
                    outcome = "failure",
                    phase = %e.phase,
                    failure_category = %e.category.to_wire(),
                    duration_ms,
                    "install pipeline failed",
                );
            }
        }

        if let Err(e) = outcome {
            if let Err(repo_err) = installs
                .record_failure(&install_id, e.category.clone(), &e.detail)
                .await
            {
                tracing::warn!(
                    install_id = %install_id,
                    error = %repo_err,
                    "failed to record pipeline failure — install row may be inconsistent",
                );
            }
        }
    });
}

/// Core pipeline drive — own the error boundary so `spawn_pipeline`
/// just has to decide success/failure recording.
async fn drive(state: &AppState, request: &PipelineRequest) -> Result<(), GenericInstallError> {
    let installs = SqliteInstallsRepo::new(state.db.pool().clone());

    // Transition the install row `pending → downloading` to signal start.
    installs
        .update_status(
            &request.install_id,
            InstallStatus::Downloading,
            Some(Phase::Resolve.as_str()),
        )
        .await
        .map_err(|e| {
            GenericInstallError::new(
                "resolve",
                PipelineFailureCategory::InstallPathCollision,
                format!("status update failed: {e}"),
            )
        })?;

    // Look up the family handler. Missing handler is a pipeline-level
    // failure — the catalog said the runtime was available, but no
    let handler = state
        .family_handlers
        .get(request.runtime_family)
        .await
        .ok_or_else(|| {
            GenericInstallError::new(
                "resolve",
                PipelineFailureCategory::RuntimeNotInstalled,
                format!(
                    "no family handler registered for `{}`",
                    request.runtime_family.as_str()
                ),
            )
        })?;

    // Load + parse the version manifest from disk.
    let manifest_path = request.extension_root.join(&request.version_manifest_path);
    let manifest_yaml = tokio::fs::read_to_string(&manifest_path)
        .await
        .map_err(|e| {
            GenericInstallError::new(
                "resolve",
                PipelineFailureCategory::InvalidVersionManifest,
                format!("read version manifest {}: {e}", manifest_path.display()),
            )
        })?;
    let manifest_value = parse_yaml(&manifest_yaml).map_err(|e| {
        GenericInstallError::new(
            "resolve",
            PipelineFailureCategory::InvalidVersionManifest,
            e.to_string(),
        )
    })?;

    // Assemble the install context. The resolver treats `extension_root`
    // as the base for `file://` URLs in the version manifest — and those
    let manifest_dir = manifest_path
        .parent()
        .map(std::path::Path::to_path_buf)
        .unwrap_or_else(|| request.extension_root.clone());
    let install_path = PathBuf::from(&request.install_path);
    let partial_path = install_path.with_extension("partial");
    let sink: Arc<dyn PhaseEventSink> = Arc::new(BroadcastSink {
        sender: state.pipeline_events.clone(),
    });

    let mut ctx = InstallCtx {
        install_id: request.install_id,
        runtime_id: request.runtime_id.clone(),
        release_id: request.release_id.clone(),
        platform: request.platform.clone(),
        accelerator_profile: request.accelerator_profile.clone(),
        partial_path,
        install_path: install_path.clone(),
        download_cache: state
            .host_install_paths
            .as_ref()
            .map(|p| p.blobs_root.clone())
            .unwrap_or_else(|| PathBuf::from("./cache")),
        release_manifest: manifest_value,
        extension_root: Some(manifest_dir),
        resolved_asset: None,
        downloaded_archive: None,
        artifact_hash: None,
        entrypoint_path: Some(PathBuf::from(&request.worker_entrypoint_path)),
        event_publisher: state.backend_event_publisher.clone(),
        cancellation: CancellationToken::new(),
        phase_cached: false,
    };

    run(&mut ctx, handler, sink).await?;

    // Pipeline success — persist the validated state.
    let validated_at = chrono::Utc::now().timestamp();
    let entrypoint = ctx
        .entrypoint_path
        .as_ref()
        .map(|p| p.display().to_string());
    installs
        .record_success(
            &request.install_id,
            entrypoint.as_deref(),
            ctx.artifact_hash.as_deref(),
            validated_at,
        )
        .await
        .map_err(|e| {
            GenericInstallError::new(
                "complete",
                PipelineFailureCategory::InstallPathCollision,
                format!("record_success failed: {e}"),
            )
        })?;
    Ok(())
}

/// Inputs the install handler hands off to `spawn_pipeline`. Owns
/// everything the orchestrator needs + everything the post-run
/// bookkeeping cares about.
#[derive(Debug, Clone)]
pub struct PipelineRequest {
    pub install_id: RuntimeInstallId,
    pub runtime_id: RuntimeId,
    pub runtime_family: RuntimeFamily,
    pub release_id: ReleaseId,
    pub platform: PlatformId,
    pub accelerator_profile: AcceleratorProfile,
    pub install_path: String,
    pub extension_root: PathBuf,
    pub version_manifest_path: String,
    pub worker_entrypoint_path: String,
}

impl PipelineRequest {
    /// Build a request from a freshly-inserted install row + its catalog
    /// entry. Resolves the extension_root against `extensions_dir`.
    pub fn from_catalog(
        install_id: RuntimeInstallId,
        entry: &CatalogEntry,
        release_id: ReleaseId,
        platform: PlatformId,
        accelerator_profile: AcceleratorProfile,
        install_path: String,
        extensions_dir: &std::path::Path,
    ) -> Self {
        let extension_root = extensions_dir.join(entry.source_extension_id.as_str());
        Self {
            install_id,
            runtime_id: entry.runtime_id.clone(),
            runtime_family: entry.runtime_family,
            release_id,
            platform,
            accelerator_profile,
            install_path,
            extension_root,
            version_manifest_path: entry.version_manifest_path.clone(),
            worker_entrypoint_path: entry.worker_entrypoint.clone(),
        }
    }
}

/// Helper for host bootstrap: register every family handler the host
/// currently owns. Called once at startup. Native-binary and Python
/// runtimes are wired here; a python-family extension whose embedded
/// Python asset has not been pinned by the host will fail at the
/// `bootstrap_runtime` phase with `PythonBootstrapFailed`.
///
/// `python_asset` is an optional override for the embedded Python
/// distribution. When `None`, the handler ships without a default —
/// production hosts should pin a version before shipping; tests inject
/// a fixture asset.
pub async fn register_default_handlers(
    registry: &FamilyHandlerRegistry,
    python_asset: Option<PythonAsset>,
) {
    registry
        .register(Arc::new(FamilyNativeHandler::new(RuntimeFamily::LlamaCpp))
            as Arc<dyn RuntimeFamilyHandler>)
        .await;

    let python = match python_asset {
        Some(asset) => FamilyPythonHandler::with_asset(asset),
        None => FamilyPythonHandler::new(),
    };
    registry
        .register(Arc::new(python) as Arc<dyn RuntimeFamilyHandler>)
        .await;
}

use nexus_backend_runtimes::generic::family_handler::FamilyHandlerRegistry;

/// True for phase-state combos that terminate an install stream.
/// Used by the SSE endpoint to close its connection.
pub fn is_terminal_event(event: &PhaseEvent) -> bool {
    // Any `Failed` state terminates. `Completed` on the final `Complete`
    // phase terminates. All other completed phases are mid-stream.
    match event.state {
        PhaseState::Failed => true,
        PhaseState::Completed => matches!(event.phase, Phase::Complete),
        PhaseState::Started => false,
    }
}
