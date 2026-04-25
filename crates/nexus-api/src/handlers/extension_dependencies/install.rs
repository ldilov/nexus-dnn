//! `POST /api/v1/extensions/:id/install` — kicks off a runner task starting from
//! the first incomplete step. Returns immediately; progress flows via the event bus
//! topic `extension.install.*`.

use std::sync::Arc;

use axum::extract::{Path, State};
use chrono::Utc;
use tokio::sync::Mutex;
use uuid::Uuid;

use nexus_extension::ExtensionRegistry;
use nexus_extension_deps::{ExtensionInstallState, InstallRunner, RunnerContext};

use crate::AppState;
use crate::dto::extension_dependencies::InstallStartedResponseDto;
use crate::envelope::ApiResponse;
use crate::error::ApiError;

use super::common::{EventBusProgressSink, install_plan_for, runner_context_inputs};

pub async fn start_install(
    State(state): State<AppState>,
    Path(extension_id): Path<String>,
) -> Result<ApiResponse<InstallStartedResponseDto>, ApiError> {
    // Reject if a run is already active for this extension.
    if let Some(existing) = state.dep_install_state.get(&extension_id) {
        let guard = existing.lock().await;
        if guard.install_run_id.is_some() {
            return Err(ApiError::InvalidState(format!(
                "an install run is already active for {extension_id}"
            )));
        }
    }

    let plan = install_plan_for(&state, &extension_id)?
        .ok_or_else(|| ApiError::InvalidState("extension declares no dependencies".into()))?;
    let inputs = runner_context_inputs(&state)?;

    let extension = state
        .extension_registry
        .get_extension(&extension_id)
        .ok_or_else(|| ApiError::NotFound(format!("extension {extension_id} not found")))?;
    let extension_dir = extension.directory.clone();

    let install_run_id = Uuid::new_v4();
    let started_at = Utc::now();

    // Stamp the run-state map atomically so concurrent POSTs don't race.
    let cancel_token = tokio_util::sync::CancellationToken::new();
    let run_state = Arc::new(Mutex::new(ExtensionInstallState {
        install_run_id: Some(install_run_id),
        started_at: Some(started_at),
        cancellation_token: cancel_token.clone(),
        steps: Default::default(),
    }));
    state
        .dep_install_state
        .insert(extension_id.clone(), run_state.clone());

    let extension_data_dir = inputs.host_data_dir.join("extensions").join(&extension_id);
    tokio::fs::create_dir_all(&extension_data_dir)
        .await
        .map_err(|e| ApiError::Internal(format!("failed to ensure extension data dir: {e}")))?;

    let progress_sink: Arc<dyn nexus_extension_deps::ProgressSink> =
        Arc::new(EventBusProgressSink::new(state.event_bus.clone()));

    let registry = inputs.registry.clone();
    let runtime_bootstrapper = inputs.runtime_bootstrapper.clone();
    let model_store = inputs.model_store.clone();
    let worker_handshake = inputs.worker_handshake.clone();
    let fetch_artifact = inputs.fetch_artifact.clone();
    let host_data_dir = inputs.host_data_dir.clone();
    let extension_id_owned = extension_id.clone();
    let install_state_map = state.dep_install_state.clone();

    tokio::spawn(async move {
        let runner = InstallRunner::new(plan, registry);
        let mut runner_ctx = RunnerContext {
            extension_id: extension_id_owned.as_str(),
            extension_dir: extension_dir.as_path(),
            extension_data_dir: extension_data_dir.as_path(),
            host_data_dir: host_data_dir.as_path(),
            model_store,
            runtime_bootstrapper,
            worker_handshake,
            fetch_artifact,
            progress_sink,
            cancellation_token: cancel_token,
            install_run_id,
        };
        let report = runner.run_install(&mut runner_ctx).await;

        // Persist final per-step statuses into the in-memory map and clear the
        // active install_run_id so subsequent installs are accepted.
        if let Some(state_arc) = install_state_map.get(&extension_id_owned) {
            let mut guard = state_arc.lock().await;
            guard.install_run_id = None;
            guard.steps = report.statuses;
        }
    });

    Ok(ApiResponse::ok(InstallStartedResponseDto {
        install_run_id: install_run_id.to_string(),
        started_at: started_at.to_rfc3339(),
    }))
}
