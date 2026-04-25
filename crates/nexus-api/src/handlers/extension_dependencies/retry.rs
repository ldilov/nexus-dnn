//! `POST /api/v1/extensions/:id/install/steps/:step_id/retry` — re-runs a single
//! step regardless of its current status. Downstream steps are NOT touched —
//! the user must click `/install` again to advance.

use std::collections::HashMap;
use std::sync::Arc;

use axum::extract::{Path, State};
use chrono::Utc;
use tokio::sync::Mutex;
use uuid::Uuid;

use nexus_extension::ExtensionRegistry;
use nexus_extension_deps::{
    ExtensionInstallState, InstallRunner, RunnerContext, StepArtifact, StepStatus,
};

use crate::AppState;
use crate::dto::extension_dependencies::InstallStartedResponseDto;
use crate::envelope::ApiResponse;
use crate::error::ApiError;

use super::common::{EventBusProgressSink, install_plan_for, runner_context_inputs};

pub async fn retry_step(
    State(state): State<AppState>,
    Path((extension_id, step_id)): Path<(String, String)>,
) -> Result<ApiResponse<InstallStartedResponseDto>, ApiError> {
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

    if !plan.steps.iter().any(|s| s.id == step_id) {
        return Err(ApiError::NotFound(format!(
            "step '{step_id}' not in extension '{extension_id}' install plan"
        )));
    }

    let inputs = runner_context_inputs(&state)?;
    let extension = state
        .extension_registry
        .get_extension(&extension_id)
        .ok_or_else(|| ApiError::NotFound(format!("extension {extension_id} not found")))?;
    let extension_dir = extension.directory.clone();

    let install_run_id = Uuid::new_v4();
    let started_at = Utc::now();
    let cancel_token = tokio_util::sync::CancellationToken::new();

    // Reuse any existing run-state so prior step statuses are preserved across the
    // retry; only this step's status is overwritten.
    let run_state = match state.dep_install_state.get(&extension_id) {
        Some(existing) => existing.clone(),
        None => {
            let fresh = Arc::new(Mutex::new(ExtensionInstallState {
                install_run_id: None,
                started_at: None,
                cancellation_token: cancel_token.clone(),
                steps: HashMap::new(),
            }));
            state
                .dep_install_state
                .insert(extension_id.clone(), fresh.clone());
            fresh
        }
    };
    {
        let mut guard = run_state.lock().await;
        guard.install_run_id = Some(install_run_id);
        guard.started_at = Some(started_at);
        guard.cancellation_token = cancel_token.clone();
    }

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

        // Build an upstream-artifacts map from prior `Ok` statuses recorded in the
        // run state — handlers that consult upstream metadata still see the right
        // values when only one step is being re-run.
        let upstream_artifacts: HashMap<String, StepArtifact> = {
            let guard = run_state.lock().await;
            guard
                .steps
                .iter()
                .filter_map(|(id, status)| match status {
                    StepStatus::Ok { artifact, .. } => Some((id.clone(), artifact.clone())),
                    _ => None,
                })
                .collect()
        };

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
        let result = runner
            .run_single_step(&step_id, &mut runner_ctx, &upstream_artifacts)
            .await;

        if let Some(state_arc) = install_state_map.get(&extension_id_owned) {
            let mut guard = state_arc.lock().await;
            guard.install_run_id = None;
            guard.steps.insert(step_id.clone(), result);
        }
    });

    Ok(ApiResponse::ok(InstallStartedResponseDto {
        install_run_id: install_run_id.to_string(),
        started_at: started_at.to_rfc3339(),
    }))
}
