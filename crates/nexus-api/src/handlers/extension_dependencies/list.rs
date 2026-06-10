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
    DependenciesResponseDto, StepArtifactDto, StepDto, StepErrorDto, StepIntegrityDto,
    StepProgressDto, StepStatusKind,
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
                install_active: false,
                install_resumable: false,
            }));
        }
        Some(plan) => plan,
    };

    let inputs = runner_context_inputs(&state)?;
    // Compute the path but do NOT create it here. Probe handlers must tolerate a
    // missing directory (a missing dir IS the "not satisfied" signal). The dir is
    // created lazily by `start_install` on the install path; doing it on every
    // `GET /dependencies` would be a wasteful filesystem touch on a hot read path.
    let extension_data_dir = inputs.host_data_dir.join("extensions").join(&extension_id);

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
        force: false,
    };

    // Snapshot any in-memory runner state for this extension. Probe is the source of
    // truth for satisfaction, but a step that probes `NotSatisfied` while the runner
    // recorded a `Failed` status from a prior install attempt MUST surface as
    // `failed` so the user sees why the install halted (without this overlay, the
    // step appears `pending` forever and the failure is silent).
    // Clone the Arc out under the DashMap shard lock and drop the shard guard
    // before awaiting on the per-extension Mutex — holding both is unnecessary
    // and would block other extensions' state lookups.
    let runner_state_arc = state
        .dep_install_state
        .get(&extension_id)
        .map(|entry| entry.value().clone());
    let (runner_state, install_active): (HashMap<String, StepStatus>, bool) = match runner_state_arc
    {
        Some(arc) => {
            let guard = arc.lock().await;
            (guard.steps.clone(), guard.install_run_id.is_some())
        }
        None => (HashMap::new(), false),
    };

    let mut any_partial = false;
    for step in &plan.steps {
        let (mut dto, has_partial_bytes) =
            probe_step(&inputs.registry, &runner_ctx, step, &upstream).await;
        apply_runner_overlay(&mut dto, runner_state.get(&step.id));
        // A still-pending step that already has partial bytes on disk is a paused,
        // resumable download (the overlay may have flipped it terminal — only count
        // it if it's genuinely still pending).
        if has_partial_bytes && matches!(dto.status, StepStatusKind::Pending) {
            any_partial = true;
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
        install_active,
        // Only "resumable" when nothing is actively running — otherwise the live
        // run, not a paused one, owns the partial bytes.
        install_resumable: any_partial && !install_active,
    }))
}

/// Overlay the runner's in-memory per-step status onto a probe-derived DTO.
///
/// Probe is the source of truth for *satisfaction*, but it cannot see a step
/// that is mid-run or that a prior run left `Failed`/`Skipped`. The overlay only
/// fires when probe reported `Pending` (so a genuinely-satisfied step's `Ok`
/// from probe is never downgraded):
/// - `Running` → surface live bytes so a remounted page shows the active bar
///   immediately, before the next WebSocket tick.
/// - `Failed` → surface why the install halted (else the row looks pending forever).
/// - `Ok`/`Skipped` → surface completion (the validation step's probe always
///   returns NotSatisfied by design, so without this a success shows PENDING).
fn apply_runner_overlay(dto: &mut StepDto, status: Option<&StepStatus>) {
    if !matches!(dto.status, StepStatusKind::Pending) {
        return;
    }
    match status {
        Some(StepStatus::Running {
            phase,
            current_bytes,
            total_bytes,
            ..
        }) => {
            dto.status = StepStatusKind::Running;
            dto.progress = Some(StepProgressDto {
                phase: phase.clone(),
                current_bytes: *current_bytes,
                total_bytes: *total_bytes,
            });
        }
        Some(StepStatus::Failed { error, .. }) => {
            dto.status = StepStatusKind::Failed;
            dto.last_error = Some(StepErrorDto {
                category: error.category.clone(),
                message: error.message.clone(),
                hint: error.hint.clone(),
                log_excerpt: None,
            });
        }
        Some(StepStatus::Ok { artifact, .. }) => {
            dto.status = StepStatusKind::Ok;
            dto.satisfied = true;
            dto.artifact = Some(StepArtifactDto {
                path: artifact.path.as_ref().map(|p| p.display().to_string()),
                bytes_placed: artifact.bytes_placed,
                summary: artifact.summary.clone(),
            });
            dto.estimated_remaining_bytes = 0;
        }
        Some(StepStatus::Skipped { .. }) => {
            dto.status = StepStatusKind::Skipped;
            dto.satisfied = true;
            dto.estimated_remaining_bytes = 0;
        }
        _ => {}
    }
}

/// Returns the step DTO and a `has_partial_bytes` flag — true when a pending
/// model step already has some bytes downloaded on disk (a paused/resumable
/// download). The caller aggregates the flag into the response-level
/// `install_resumable` signal.
async fn probe_step(
    registry: &nexus_extension_deps::HandlerRegistry,
    runner_ctx: &RunnerContext<'_>,
    step: &Step,
    upstream_artifacts: &HashMap<String, StepArtifact>,
) -> (StepDto, bool) {
    let handler = match registry.get(&step.step_type) {
        Some(h) => h,
        None => {
            return (
                StepDto {
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
                    files_present: None,
                    files_total: None,
                    integrity: None,
                },
                false,
            );
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
        // Read-only probe path (GET /dependencies) never forces a reinstall.
        force: false,
        upstream_artifacts,
    };

    match handler.probe(&step_ctx, &step.spec).await {
        Ok(ProbeResult::Satisfied { artifact }) => {
            // A satisfied step may still be corrupt on disk — verify integrity so
            // the row can warn + offer reinstall. Cheap, no-network; `None` when
            // the handler can't verify (most step types).
            let integrity =
                handler
                    .integrity(&step_ctx, &step.spec)
                    .await
                    .map(|i| StepIntegrityDto {
                        ok: i.ok,
                        detail: i.detail,
                    });
            (
                StepDto {
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
                    files_present: None,
                    files_total: None,
                    integrity,
                },
                false,
            )
        }
        Ok(ProbeResult::NotSatisfied) => {
            // Only NotSatisfied steps pay for the (cheap, no-network) estimate. It
            // surfaces "what's left / what's already present" from persisted state so
            // the UI can show a resume-aware bar before the install even starts.
            let estimate = handler.estimate(&step_ctx, &step.spec).await;
            // present_bytes > 0 on a not-yet-satisfied step means a paused,
            // resumable partial download exists on disk.
            let has_partial_bytes = estimate.map(|e| e.present_bytes > 0).unwrap_or(false);
            (
                StepDto {
                    id: step.id.clone(),
                    step_type: step.step_type.clone(),
                    requires: step.requires.clone(),
                    status: StepStatusKind::Pending,
                    satisfied: false,
                    artifact: None,
                    last_error: None,
                    progress: None,
                    estimated_remaining_bytes: estimate.map(|e| e.remaining_bytes).unwrap_or(0),
                    files_present: estimate.map(|e| e.files_present),
                    files_total: estimate.map(|e| e.files_total),
                    integrity: None,
                },
                has_partial_bytes,
            )
        }
        Ok(ProbeResult::Unsupported { reason }) => (
            StepDto {
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
                files_present: None,
                files_total: None,
                integrity: None,
            },
            false,
        ),
        Err(e) => (
            StepDto {
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
                files_present: None,
                files_total: None,
                integrity: None,
            },
            false,
        ),
    }
}

#[allow(dead_code)]
fn _enforce_install_plan_use(_p: &InstallPlan) {}
#[allow(dead_code)]
fn _enforce_step_status_use(_s: &StepStatus) {}

#[cfg(test)]
mod tests {
    use super::*;
    use async_trait::async_trait;
    use chrono::Utc;
    use nexus_extension_deps::{
        DepError, HandlerRegistry, HandshakeError, ModelDownloadProgress, ModelStoreClient,
        ProgressEvent, ProgressSink, RuntimeBootstrapResult, RuntimeBootstrapper, StepEstimate,
        StepHandler, WorkerHandshake,
    };
    use serde_json::Value;
    use std::path::{Path, PathBuf};

    struct EstimatingHandler;

    #[async_trait]
    impl StepHandler for EstimatingHandler {
        fn step_type(&self) -> &'static str {
            "estimating"
        }
        fn validate(&self, _spec: &Value) -> Result<(), DepError> {
            Ok(())
        }
        async fn probe(
            &self,
            _ctx: &StepContext<'_>,
            _spec: &Value,
        ) -> Result<ProbeResult, DepError> {
            Ok(ProbeResult::NotSatisfied)
        }
        async fn run(
            &self,
            _ctx: &StepContext<'_>,
            _spec: &Value,
        ) -> Result<StepArtifact, DepError> {
            Ok(StepArtifact::empty("estimating"))
        }
        async fn estimate(&self, _ctx: &StepContext<'_>, _spec: &Value) -> Option<StepEstimate> {
            Some(StepEstimate {
                remaining_bytes: 7_000_000,
                present_bytes: 3_000_000,
                files_present: 2,
                files_total: 5,
            })
        }
    }

    struct NoopStore;
    #[async_trait]
    impl ModelStoreClient for NoopStore {
        async fn is_family_installed(
            &self,
            _f: &str,
            _a: Option<&str>,
        ) -> Result<Option<PathBuf>, DepError> {
            Ok(None)
        }
        async fn start_download(
            &self,
            _f: &str,
            _a: Option<&str>,
            _s: &nexus_extension_deps::FileSelection,
        ) -> Result<String, DepError> {
            unreachable!()
        }
        async fn poll_job(&self, _id: &str) -> Result<ModelDownloadProgress, DepError> {
            unreachable!()
        }
    }

    struct NoopRuntime;
    #[async_trait]
    impl RuntimeBootstrapper for NoopRuntime {
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
            _c: tokio_util::sync::CancellationToken,
        ) -> Result<RuntimeBootstrapResult, DepError> {
            unreachable!()
        }
    }

    struct NoopHandshake;
    #[async_trait]
    impl WorkerHandshake for NoopHandshake {
        async fn run_handshake(
            &self,
            _ext: &str,
            _dir: &Path,
            _data: &Path,
            _ups: &HashMap<String, StepArtifact>,
            _t: std::time::Duration,
            _c: tokio_util::sync::CancellationToken,
        ) -> Result<(), HandshakeError> {
            unreachable!()
        }
    }

    struct NoopSink;
    impl ProgressSink for NoopSink {
        fn emit(&self, _e: ProgressEvent) {}
    }

    #[tokio::test]
    async fn not_satisfied_step_surfaces_handler_estimate_in_dto() {
        let mut registry = HandlerRegistry::new();
        registry.register(Box::new(EstimatingHandler));

        let dir = PathBuf::from("/tmp");
        let upstream: HashMap<String, StepArtifact> = HashMap::new();
        let runner_ctx = RunnerContext {
            extension_id: "example",
            extension_dir: dir.as_path(),
            extension_data_dir: dir.as_path(),
            host_data_dir: dir.as_path(),
            model_store: Arc::new(NoopStore),
            runtime_bootstrapper: Arc::new(NoopRuntime),
            worker_handshake: Arc::new(NoopHandshake),
            fetch_artifact: Arc::new(|_req| {
                Box::pin(async { Err(DepError::Backend("stub".into())) })
            }),
            progress_sink: Arc::new(NoopSink),
            cancellation_token: tokio_util::sync::CancellationToken::new(),
            install_run_id: Uuid::nil(),
            force: false,
        };
        let step = Step {
            id: "packages".to_owned(),
            step_type: "estimating".to_owned(),
            requires: Vec::new(),
            spec: serde_json::json!({}),
        };

        let (dto, has_partial) = probe_step(&registry, &runner_ctx, &step, &upstream).await;
        assert!(matches!(dto.status, StepStatusKind::Pending));
        assert!(!dto.satisfied);
        assert_eq!(dto.estimated_remaining_bytes, 7_000_000);
        assert_eq!(dto.files_present, Some(2));
        assert_eq!(dto.files_total, Some(5));
        // EstimatingHandler reports present_bytes = 3_000_000 > 0 → resumable.
        assert!(has_partial, "a step with present_bytes > 0 is resumable");
    }

    fn pending_dto() -> StepDto {
        StepDto {
            id: "model".into(),
            step_type: "model_artifact".into(),
            requires: Vec::new(),
            status: StepStatusKind::Pending,
            satisfied: false,
            artifact: None,
            last_error: None,
            progress: None,
            estimated_remaining_bytes: 1000,
            files_present: None,
            files_total: None,
            integrity: None,
        }
    }

    #[test]
    fn overlay_running_surfaces_live_progress() {
        let mut dto = pending_dto();
        let status = StepStatus::Running {
            phase: "downloading".into(),
            current_bytes: 250,
            total_bytes: 1000,
            started_at: Utc::now(),
        };
        apply_runner_overlay(&mut dto, Some(&status));
        assert!(matches!(dto.status, StepStatusKind::Running));
        let progress = dto.progress.expect("progress surfaced");
        assert_eq!(progress.current_bytes, 250);
        assert_eq!(progress.total_bytes, 1000);
        assert_eq!(progress.phase, "downloading");
        assert!(!dto.satisfied, "a running download is not yet satisfied");
    }

    #[test]
    fn overlay_does_not_downgrade_a_probe_satisfied_step() {
        let mut dto = pending_dto();
        dto.status = StepStatusKind::Ok;
        dto.satisfied = true;
        let status = StepStatus::Running {
            phase: "downloading".into(),
            current_bytes: 1,
            total_bytes: 2,
            started_at: Utc::now(),
        };
        apply_runner_overlay(&mut dto, Some(&status));
        assert!(matches!(dto.status, StepStatusKind::Ok));
        assert!(dto.satisfied);
        assert!(dto.progress.is_none());
    }

    #[test]
    fn overlay_failed_surfaces_error_for_a_pending_probe() {
        let mut dto = pending_dto();
        let status = StepStatus::Failed {
            error: nexus_extension_deps::StepError::new("backend", "boom"),
            failed_at: Utc::now(),
        };
        apply_runner_overlay(&mut dto, Some(&status));
        assert!(matches!(dto.status, StepStatusKind::Failed));
        assert_eq!(dto.last_error.expect("error").message, "boom");
    }
}
