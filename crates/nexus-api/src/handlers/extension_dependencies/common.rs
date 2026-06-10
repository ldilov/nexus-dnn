//! Shared utilities for the extension-dependencies handlers.
//!
//! Includes the [`EventBusProgressSink`] adapter that translates
//! [`nexus_extension_deps::ProgressEvent`] into [`nexus_events::types::NexusEvent`]
//! variants, and a helper for fetching a parsed [`InstallPlan`] for an extension.

use std::sync::Arc;

use chrono::Utc;
use dashmap::DashMap;
use tokio::sync::Mutex;

use nexus_events::bus::EventBus;
use nexus_events::types::NexusEvent;
use nexus_extension::ExtensionRegistry;
use nexus_extension_deps::{
    ExtensionInstallState, InstallOutcome, InstallPlan, ProgressEvent, ProgressSink, StepStatus,
};

use crate::AppState;
use crate::error::ApiError;

/// Shared per-extension install-run state map (mirrors `AppState::dep_install_state`).
pub type DepInstallStateMap = Arc<DashMap<String, Arc<Mutex<ExtensionInstallState>>>>;

/// Mirrors live step status into the shared run-state so a page (re)opened
/// mid-install rehydrates from REST without waiting for the next WebSocket tick.
struct StateMirror {
    state: DepInstallStateMap,
    extension_id: String,
}

/// Adapter that translates dep-installer [`ProgressEvent`]s into [`NexusEvent`]s
/// on the host event bus. Captured by the runner via `Arc<dyn ProgressSink>`.
///
/// When constructed via [`EventBusProgressSink::with_state`] it ALSO mirrors each
/// step's live status (`Running{bytes}` / `Ok` / `Failed`) into the shared
/// `dep_install_state` map so `GET /dependencies` is authoritative mid-run.
pub struct EventBusProgressSink {
    bus: Arc<dyn EventBus>,
    mirror: Option<StateMirror>,
}

impl EventBusProgressSink {
    /// Event-bus-only sink (no shared-state mirroring) — used on the read path.
    pub fn new(bus: Arc<dyn EventBus>) -> Self {
        Self { bus, mirror: None }
    }

    /// Sink that also mirrors live step status into `dep_install_state` for the
    /// given extension — used by the active install run.
    pub fn with_state(
        bus: Arc<dyn EventBus>,
        state: DepInstallStateMap,
        extension_id: impl Into<String>,
    ) -> Self {
        Self {
            bus,
            mirror: Some(StateMirror {
                state,
                extension_id: extension_id.into(),
            }),
        }
    }

    /// Best-effort mirror of a single event into the shared run state. Uses
    /// `try_lock`: progress mirroring must never block the runner, and the
    /// authoritative terminal write in `start_install` reconciles at run end, so
    /// a skipped update under contention self-heals on the next tick.
    fn mirror_event(&self, event: &ProgressEvent) {
        let Some(mirror) = self.mirror.as_ref() else {
            return;
        };
        let Some(entry) = mirror.state.get(&mirror.extension_id) else {
            return;
        };
        let Ok(mut guard) = entry.value().try_lock() else {
            return;
        };
        // Never resurrect a finished run.
        if guard.install_run_id.is_none() {
            return;
        }
        match event {
            ProgressEvent::StepStarted {
                step_id,
                started_at,
                ..
            } => {
                guard.steps.insert(
                    step_id.clone(),
                    StepStatus::Running {
                        phase: String::new(),
                        current_bytes: 0,
                        total_bytes: 0,
                        started_at: *started_at,
                    },
                );
            }
            ProgressEvent::StepProgress {
                step_id,
                phase,
                current_bytes,
                total_bytes,
                ..
            } => {
                // Preserve the original start time of an already-running step.
                let started_at = match guard.steps.get(step_id) {
                    Some(StepStatus::Running { started_at, .. }) => *started_at,
                    _ => Utc::now(),
                };
                guard.steps.insert(
                    step_id.clone(),
                    StepStatus::Running {
                        phase: phase.clone(),
                        current_bytes: *current_bytes,
                        total_bytes: *total_bytes,
                        started_at,
                    },
                );
            }
            ProgressEvent::StepCompleted {
                step_id,
                artifact,
                completed_at,
                ..
            } => {
                guard.steps.insert(
                    step_id.clone(),
                    StepStatus::Ok {
                        artifact: artifact.clone(),
                        completed_at: *completed_at,
                    },
                );
            }
            ProgressEvent::StepFailed {
                step_id,
                error,
                failed_at,
                ..
            } => {
                guard.steps.insert(
                    step_id.clone(),
                    StepStatus::Failed {
                        error: error.clone(),
                        failed_at: *failed_at,
                    },
                );
            }
            ProgressEvent::InstallCompleted { .. } => {}
        }
    }
}

impl ProgressSink for EventBusProgressSink {
    fn emit(&self, event: ProgressEvent) {
        self.mirror_event(&event);
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
                pct,
            } => NexusEvent::ExtensionInstallStepProgress {
                extension_id,
                install_run_id: install_run_id.to_string(),
                step_id,
                phase,
                current_bytes,
                total_bytes,
                message,
                pct,
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
                outcome,
            } => NexusEvent::ExtensionInstallCompleted {
                extension_id,
                install_run_id: install_run_id.to_string(),
                completed_at: completed_at.to_rfc3339(),
                outcome: install_outcome_wire(outcome).to_owned(),
            },
        };
        self.bus.publish(nexus_event);
    }
}

/// Snake-case wire form for the terminal outcome — kept colocated with the
/// `ProgressEvent::InstallCompleted -> NexusEvent::ExtensionInstallCompleted`
/// translation so any new variant is impossible to forget.
fn install_outcome_wire(outcome: InstallOutcome) -> &'static str {
    match outcome {
        InstallOutcome::Success => "success",
        InstallOutcome::Failed => "failed",
        InstallOutcome::Cancelled => "cancelled",
    }
}

/// Fetch the parsed install plan for an extension. Returns 404 if the extension is
/// not registered, or 200 + None if it has no `dependencies` declared.
pub fn install_plan_for(
    state: &AppState,
    extension_id: &str,
) -> Result<Option<InstallPlan>, ApiError> {
    let registry = state.dep_handler_registry.as_ref().ok_or_else(|| {
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
pub fn runner_context_inputs(state: &AppState) -> Result<RunnerInputs, ApiError> {
    Ok(RunnerInputs {
        registry: state
            .dep_handler_registry
            .clone()
            .ok_or_else(|| ApiError::Internal("dep handler registry not wired".into()))?,
        runtime_bootstrapper: state
            .dep_runtime_bootstrapper
            .clone()
            .ok_or_else(|| ApiError::Internal("runtime bootstrapper not wired".into()))?,
        model_store: state
            .dep_model_store
            .clone()
            .ok_or_else(|| ApiError::Internal("model store not wired".into()))?,
        worker_handshake: state
            .dep_worker_handshake
            .clone()
            .ok_or_else(|| ApiError::Internal("worker handshake not wired".into()))?,
        fetch_artifact: state
            .dep_fetch_artifact
            .clone()
            .ok_or_else(|| ApiError::Internal("fetch_artifact primitive not wired".into()))?,
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
