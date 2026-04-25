//! Shared utilities for the extension-dependencies handlers.
//!
//! Includes the [`EventBusProgressSink`] adapter that translates
//! [`nexus_extension_deps::ProgressEvent`] into [`nexus_events::types::NexusEvent`]
//! variants, and a helper for fetching a parsed [`InstallPlan`] for an extension.

use std::sync::Arc;

use nexus_events::bus::EventBus;
use nexus_events::types::NexusEvent;
use nexus_extension::ExtensionRegistry;
use nexus_extension_deps::{InstallPlan, ProgressEvent, ProgressSink};

use crate::AppState;
use crate::error::ApiError;

/// Adapter that translates dep-installer [`ProgressEvent`]s into [`NexusEvent`]s
/// on the host event bus. Captured by the runner via `Arc<dyn ProgressSink>`.
pub struct EventBusProgressSink {
    bus: Arc<dyn EventBus>,
}

impl EventBusProgressSink {
    pub fn new(bus: Arc<dyn EventBus>) -> Self {
        Self { bus }
    }
}

impl ProgressSink for EventBusProgressSink {
    fn emit(&self, event: ProgressEvent) {
        let nexus_event = match event {
            ProgressEvent::StepStarted {
                extension_id,
                install_run_id,
                step_id,
                step_type,
                started_at,
            } => NexusEvent::ExtensionInstallStepStarted {
                extension_id,
                install_run_id: install_run_id.to_string(),
                step_id,
                step_type,
                started_at: started_at.to_rfc3339(),
            },
            ProgressEvent::StepProgress {
                extension_id,
                install_run_id,
                step_id,
                phase,
                current_bytes,
                total_bytes,
                message,
            } => NexusEvent::ExtensionInstallStepProgress {
                extension_id,
                install_run_id: install_run_id.to_string(),
                step_id,
                phase,
                current_bytes,
                total_bytes,
                message,
            },
            ProgressEvent::StepCompleted {
                extension_id,
                install_run_id,
                step_id,
                completed_at,
                artifact,
            } => NexusEvent::ExtensionInstallStepCompleted {
                extension_id,
                install_run_id: install_run_id.to_string(),
                step_id,
                completed_at: completed_at.to_rfc3339(),
                summary: artifact.summary,
                bytes_placed: artifact.bytes_placed,
            },
            ProgressEvent::StepFailed {
                extension_id,
                install_run_id,
                step_id,
                failed_at,
                error,
            } => NexusEvent::ExtensionInstallStepFailed {
                extension_id,
                install_run_id: install_run_id.to_string(),
                step_id,
                failed_at: failed_at.to_rfc3339(),
                category: error.category,
                message: error.message,
                hint: error.hint,
            },
            ProgressEvent::InstallCompleted {
                extension_id,
                install_run_id,
                completed_at,
            } => NexusEvent::ExtensionInstallCompleted {
                extension_id,
                install_run_id: install_run_id.to_string(),
                completed_at: completed_at.to_rfc3339(),
            },
        };
        self.bus.publish(nexus_event);
    }
}

/// Fetch the parsed install plan for an extension. Returns 404 if the extension is
/// not registered, or 200 + None if it has no `dependencies` declared.
pub fn install_plan_for(
    state: &AppState,
    extension_id: &str,
) -> Result<Option<InstallPlan>, ApiError> {
    let registry = state
        .dep_handler_registry
        .as_ref()
        .ok_or_else(|| {
            ApiError::Internal(
                "extension dependency installer is not wired into this host process".into(),
            )
        })?;

    let mut activated = state
        .extension_registry
        .get_extension(extension_id)
        .ok_or_else(|| ApiError::NotFound(format!("extension {extension_id} not found")))?;

    activated
        .populate_install_plan(registry)
        .map_err(|e| ApiError::Internal(format!("install plan parse failed: {e}")))?;

    Ok(activated.install_plan)
}

/// Build a `RunnerContext` referencing the wired-up host services. Returns
/// `Internal` if any required service is missing.
pub fn runner_context_inputs(
    state: &AppState,
) -> Result<RunnerInputs, ApiError> {
    Ok(RunnerInputs {
        registry: state.dep_handler_registry.clone().ok_or_else(|| {
            ApiError::Internal("dep handler registry not wired".into())
        })?,
        runtime_bootstrapper: state.dep_runtime_bootstrapper.clone().ok_or_else(|| {
            ApiError::Internal("runtime bootstrapper not wired".into())
        })?,
        model_store: state
            .dep_model_store
            .clone()
            .ok_or_else(|| ApiError::Internal("model store not wired".into()))?,
        worker_handshake: state.dep_worker_handshake.clone().ok_or_else(|| {
            ApiError::Internal("worker handshake not wired".into())
        })?,
        fetch_artifact: state.dep_fetch_artifact.clone().ok_or_else(|| {
            ApiError::Internal("fetch_artifact primitive not wired".into())
        })?,
        host_data_dir: state
            .dep_host_data_dir
            .clone()
            .ok_or_else(|| ApiError::Internal("host data dir not configured".into()))?,
    })
}

pub struct RunnerInputs {
    pub registry: Arc<nexus_extension_deps::HandlerRegistry>,
    pub runtime_bootstrapper: Arc<dyn nexus_extension_deps::RuntimeBootstrapper>,
    pub model_store: Arc<dyn nexus_extension_deps::ModelStoreClient>,
    pub worker_handshake: Arc<dyn nexus_extension_deps::WorkerHandshake>,
    pub fetch_artifact: Arc<nexus_extension_deps::fetch::FetchArtifact>,
    pub host_data_dir: std::path::PathBuf,
}
