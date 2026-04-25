//! `GET /api/v1/extensions/:id/dependencies` — re-runs `probe()` per step on every
//! call and returns current state. Cheap; safe to call on focus / mount.

use std::collections::HashMap;
use std::sync::Arc;

use axum::extract::{Path, State};
use uuid::Uuid;

use nexus_extension::ExtensionRegistry;
use nexus_extension_deps::{
    InstallPlan, ProbeResult, RunnerContext, Step, StepArtifact, StepContext, StepStatus,
};

use crate::AppState;
use crate::dto::extension_dependencies::{
    DependenciesResponseDto, StepArtifactDto, StepDto, StepErrorDto, StepStatusKind,
};
use crate::envelope::ApiResponse;
use crate::error::ApiError;

use super::common::{EventBusProgressSink, install_plan_for, runner_context_inputs};

pub async fn list_dependencies(
    State(state): State<AppState>,
    Path(extension_id): Path<String>,
) -> Result<ApiResponse<DependenciesResponseDto>, ApiError> {
    let plan = install_plan_for(&state, &extension_id)?;
    let plan = match plan {
        None => {
            return Ok(ApiResponse::ok(DependenciesResponseDto {
                steps: Vec::new(),
                all_satisfied: true,
                total_remaining_bytes: 0,
            }));
        }
        Some(plan) => plan,
    };

    let inputs = runner_context_inputs(&state)?;
    let extension_data_dir = inputs.host_data_dir.join("extensions").join(&extension_id);
    tokio::fs::create_dir_all(&extension_data_dir)
        .await
        .map_err(|e| ApiError::Internal(format!("failed to ensure extension data dir: {e}")))?;

    let extension = state
        .extension_registry
        .get_extension(&extension_id)
        .ok_or_else(|| ApiError::NotFound(format!("extension {extension_id} not found")))?;

    let progress_sink: Arc<dyn nexus_extension_deps::ProgressSink> =
        Arc::new(EventBusProgressSink::new(state.event_bus.clone()));
    let upstream: HashMap<String, StepArtifact> = HashMap::new();

    // Walk steps and call probe() on each — the response is purely a snapshot.
    let mut step_dtos: Vec<StepDto> = Vec::with_capacity(plan.steps.len());
    let mut total_remaining: u64 = 0;
    let mut all_satisfied = true;

    let runner_ctx = RunnerContext {
        extension_id: extension_id.as_str(),
        extension_dir: extension.directory.as_path(),
        extension_data_dir: extension_data_dir.as_path(),
        host_data_dir: inputs.host_data_dir.as_path(),
        model_store: inputs.model_store.clone(),
        runtime_bootstrapper: inputs.runtime_bootstrapper.clone(),
        worker_handshake: inputs.worker_handshake.clone(),
        fetch_artifact: inputs.fetch_artifact.clone(),
        progress_sink: progress_sink.clone(),
        cancellation_token: tokio_util::sync::CancellationToken::new(),
        install_run_id: Uuid::nil(),
    };

    // Snapshot any in-memory runner state for this extension. Probe is the source of
    // truth for satisfaction, but a step that probes `NotSatisfied` while the runner
    // recorded a `Failed` status from a prior install attempt MUST surface as
    // `failed` so the user sees why the install halted (without this overlay, the
    // step appears `pending` forever and the failure is silent).
    let runner_state: HashMap<String, StepStatus> = state
        .dep_install_state
        .get(&extension_id)
        .map(|entry| {
            let arc = entry.value().clone();
            drop(entry);
            arc
        })
        .map(|arc| {
            let guard = arc.try_lock();
            guard.map(|g| g.steps.clone()).unwrap_or_default()
        })
        .unwrap_or_default();

    for step in &plan.steps {
        let mut dto = probe_step(&inputs.registry, &runner_ctx, step, &upstream).await;
        // Overlay: probe says NotSatisfied but the runner recorded a terminal state
        // for this step. Use that state so the user can see the failure.
        if matches!(dto.status, StepStatusKind::Pending) {
            if let Some(StepStatus::Failed { error, .. }) = runner_state.get(&step.id) {
                dto.status = StepStatusKind::Failed;
                dto.last_error = Some(StepErrorDto {
                    category: error.category.clone(),
                    message: error.message.clone(),
                    hint: error.hint.clone(),
                    log_excerpt: None,
                });
            }
        }
        if !dto.satisfied {
            all_satisfied = false;
            total_remaining = total_remaining.saturating_add(dto.estimated_remaining_bytes);
        }
        step_dtos.push(dto);
    }

    Ok(ApiResponse::ok(DependenciesResponseDto {
        steps: step_dtos,
        all_satisfied,
        total_remaining_bytes: total_remaining,
    }))
}

async fn probe_step(
    registry: &nexus_extension_deps::HandlerRegistry,
    runner_ctx: &RunnerContext<'_>,
    step: &Step,
    upstream_artifacts: &HashMap<String, StepArtifact>,
) -> StepDto {
    let handler = match registry.get(&step.step_type) {
        Some(h) => h,
        None => {
            return StepDto {
                id: step.id.clone(),
                step_type: step.step_type.clone(),
                requires: step.requires.clone(),
                status: StepStatusKind::Failed,
                satisfied: false,
                artifact: None,
                last_error: Some(StepErrorDto {
                    category: "unknown_step_type".into(),
                    message: format!("no handler registered for type '{}'", step.step_type),
                    hint: None,
                    log_excerpt: None,
                }),
                progress: None,
                estimated_remaining_bytes: 0,
            };
        }
    };

    let step_ctx = StepContext {
        extension_id: runner_ctx.extension_id,
        extension_dir: runner_ctx.extension_dir,
        extension_data_dir: runner_ctx.extension_data_dir,
        host_data_dir: runner_ctx.host_data_dir,
        model_store: runner_ctx.model_store.clone(),
        runtime_bootstrapper: runner_ctx.runtime_bootstrapper.clone(),
        worker_handshake: runner_ctx.worker_handshake.clone(),
        fetch_artifact: runner_ctx.fetch_artifact.clone(),
        progress_sink: runner_ctx.progress_sink.clone(),
        cancellation_token: runner_ctx.cancellation_token.clone(),
        install_run_id: runner_ctx.install_run_id,
        upstream_artifacts,
    };

    match handler.probe(&step_ctx, &step.spec).await {
        Ok(ProbeResult::Satisfied { artifact }) => StepDto {
            id: step.id.clone(),
            step_type: step.step_type.clone(),
            requires: step.requires.clone(),
            status: StepStatusKind::Ok,
            satisfied: true,
            artifact: Some(StepArtifactDto {
                path: artifact.path.as_ref().map(|p| p.display().to_string()),
                bytes_placed: artifact.bytes_placed,
                summary: artifact.summary,
            }),
            last_error: None,
            progress: None,
            estimated_remaining_bytes: 0,
        },
        Ok(ProbeResult::NotSatisfied) => StepDto {
            id: step.id.clone(),
            step_type: step.step_type.clone(),
            requires: step.requires.clone(),
            status: StepStatusKind::Pending,
            satisfied: false,
            artifact: None,
            last_error: None,
            progress: None,
            // probe() doesn't carry a size estimate today — surface 0; the runner
            // emits actual progress during install.
            estimated_remaining_bytes: 0,
        },
        Ok(ProbeResult::Unsupported { reason }) => StepDto {
            id: step.id.clone(),
            step_type: step.step_type.clone(),
            requires: step.requires.clone(),
            status: StepStatusKind::Failed,
            satisfied: false,
            artifact: None,
            last_error: Some(StepErrorDto {
                category: "unsupported_platform".into(),
                message: reason,
                hint: None,
                log_excerpt: None,
            }),
            progress: None,
            estimated_remaining_bytes: 0,
        },
        Err(e) => StepDto {
            id: step.id.clone(),
            step_type: step.step_type.clone(),
            requires: step.requires.clone(),
            status: StepStatusKind::Failed,
            satisfied: false,
            artifact: None,
            last_error: Some(StepErrorDto {
                category: "probe_error".into(),
                message: e.to_string(),
                hint: None,
                log_excerpt: None,
            }),
            progress: None,
            estimated_remaining_bytes: 0,
        },
    }
}

#[allow(dead_code)]
fn _enforce_install_plan_use(_p: &InstallPlan) {}
#[allow(dead_code)]
fn _enforce_step_status_use(_s: &StepStatus) {}
