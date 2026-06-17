use std::collections::{HashMap, HashSet};
use std::path::PathBuf;
use std::sync::Arc;
use std::time::Duration;

use serde_json::{json, Value};
use tokio::sync::broadcast::error::RecvError;
use tokio::sync::{Mutex, Notify};

use crate::errors::Result;
use crate::lease::LeaseAcquirer;
use crate::notification_buffer::{NotificationBuffer, SegmentStatusWrite};
use crate::runtime_selection::{
    default_max_frag_ratio_for_profile, default_offload_mode_for_profile,
    default_quant_for_profile, resolve_component_placement,
};
use crate::schemas::{
    AdvancedSettings, DevicePreference, ModelQuant, OffloadMode, RenderPlan, SchedulerChoice,
};
use crate::storage::Repos;
use crate::vram_supervisor::{VramSupervisor, VramVerdict};

/// Distinct JSON-RPC-style error code for VRAM-supervisor halts.
///
/// Mirrors the worker's `ErrorCodes` namespace (`-32100..-32109` are
/// taken by the worker, so we claim `-32110` for host-side halts).
pub const VRAM_SUPERVISOR_BREACH_CODE: i64 = -32110;

const W_DRIVER_TOO_OLD: i64 = -32100;
const W_TORCH_CUDA_MISMATCH: i64 = -32101;
const W_GPU_NOT_SUPPORTED: i64 = -32102;
const W_MODEL_MISSING: i64 = -32103;
const W_MODEL_LOAD_FAILED: i64 = -32104;
const W_VRAM_BUDGET_EXCEEDED: i64 = -32105;
const W_RENDER_FAILED: i64 = -32106;
const W_PLAN_INVALID: i64 = -32108;
const W_NVFP4_NAN_BURST: i64 = -32109;

/// Project a worker JSON-RPC error code to a UI-friendly `error_code`
/// string. Returns a `&'static str` for the known namespace; the
/// unknown-code path is handled by the caller.
const fn map_worker_error_code(code: i64) -> &'static str {
    match code {
        VRAM_SUPERVISOR_BREACH_CODE => "vram_supervisor",
        W_DRIVER_TOO_OLD => "driver_too_old",
        W_TORCH_CUDA_MISMATCH => "torch_cuda_mismatch",
        W_GPU_NOT_SUPPORTED => "gpu_not_supported",
        W_MODEL_MISSING => "model_missing",
        W_MODEL_LOAD_FAILED => "model_load_failed",
        W_VRAM_BUDGET_EXCEEDED => "vram_budget_exceeded",
        W_RENDER_FAILED => "render_failed",
        W_PLAN_INVALID => "plan_invalid",
        W_NVFP4_NAN_BURST => "nvfp4_nan_burst",
        _ => "worker_error",
    }
}

/// Convert a worker error code + message into the most specific
/// typed `ExtensionError` variant available. This lets the HTTP
/// layer map `model_missing` → 503 / `driver_too_old` → 503 /
/// `plan_invalid` → 400 etc., instead of collapsing everything to
/// the generic 500 path.
#[allow(clippy::missing_const_for_fn)]
fn typed_error_for(code: i64, message: String) -> crate::errors::ExtensionError {
    use crate::errors::ExtensionError;
    match code {
        W_DRIVER_TOO_OLD => ExtensionError::DriverTooOld(message),
        W_GPU_NOT_SUPPORTED => ExtensionError::GpuNotSupported(message),
        W_MODEL_MISSING => ExtensionError::ModelMissing(message),
        W_VRAM_BUDGET_EXCEEDED => ExtensionError::VramBudgetExceeded(message),
        W_PLAN_INVALID => ExtensionError::PlanInvalid(message),
        _ => ExtensionError::RenderFailed(message),
    }
}

// Hard cap on transparent restart-mid-chain attempts before the runner
// gives up and surfaces the supervisor halt to the UI. Three is the
const DEFAULT_MAX_RESTARTS: u32 = 3;
const MAX_RESTARTS_ENV: &str = "NEXUS_VIDEO_LTX23_VRAM_MAX_RESTARTS";

fn max_restarts_from_env() -> u32 {
    std::env::var(MAX_RESTARTS_ENV)
        .ok()
        .and_then(|v| v.trim().parse::<u32>().ok())
        .unwrap_or(DEFAULT_MAX_RESTARTS)
}

/// Public wrapper around `max_restarts_from_env`.
///
/// The HTTP layer calls this to snapshot the current cap into
/// `run.max_restart_count` at insert-run time. Returns the same value
/// `run_via_lease` will use when it spawns the run.
#[must_use]
pub fn max_restarts_from_env_public() -> u32 {
    max_restarts_from_env()
}

const RENDER_TIMEOUT: Duration = Duration::from_secs(1800);
const RETRY_SEGMENT_TIMEOUT: Duration = Duration::from_secs(900);
/// Window the worker is given to flush its in-flight segment, emit
/// `ltx.video.error{code:RENDER_CANCELLED}`, and clean up resources after
/// the cancel RPC lands. Past this point the lease is force-released even
/// if the worker hasn't replied.
const CANCEL_GRACE: Duration = Duration::from_secs(15);

#[derive(Clone)]
pub struct RunnerConfig {
    pub runs_dir: PathBuf,
    /// Directory holding operator-uploaded input images keyed by
    /// `ltx23-input-<ulid>.<ext>`. The runner reads this to resolve
    /// `CreateRenderRequest::input_image_artifact_id` into an absolute
    /// path the worker can `PIL.Image.open()` for first-segment
    /// conditioning. Created by `register.rs::build_router_inner`
    /// next to `runs_dir`; layout is single-flat-directory, no
    /// per-run nesting (an input image may be referenced by multiple
    /// renders during a tweaking session).
    pub inputs_dir: PathBuf,
    pub repos: Repos,
    pub factory: Arc<dyn LeaseAcquirer>,
    /// Watches `runtime.memory_stats` notifications and trips a clean
    /// halt when usage crosses configured thresholds. Defaults to
    /// `VramSupervisor::default()` (env-tunable; see
    /// `vram_supervisor.rs`). Set deliberately to
    /// `VramSupervisorConfig` with `u64::MAX` thresholds to disable.
    pub vram_supervisor: VramSupervisor,
    /// Coalesces `update_segment_status` writes through a periodic
    /// flusher (Item B). Each notification handler enqueues instead
    /// of awaiting `SQLite` directly; the flusher commits batches
    /// every 50 ms inside one transaction. Run lifecycle calls
    /// `flush_now` at terminal-state transitions so the polling
    /// client always sees a consistent snapshot.
    pub notification_buffer: NotificationBuffer,
}

/// Per-run abort handle. Held by both the spawned render task and the
/// `cancel_render` HTTP handler so a flip on either side wakes the
/// notification loop.
type CancelRegistry = Arc<Mutex<HashMap<String, Arc<Notify>>>>;

/// In-flight retry tracker keyed by `(run_id, segment_index)`. Prevents
/// two concurrent `POST /retry-segment` calls for the same segment
/// from racing on the same workdir + DB row. Eviction happens in the
/// retry task's tail block — `Drop`-style cleanup is unsafe here
/// because tokio tasks can be cancelled at any await point, so the
/// task itself removes its key when it terminates.
type RetryRegistry = Arc<Mutex<HashSet<(String, u32)>>>;

#[derive(Clone)]
pub struct Runner {
    cfg: Arc<RunnerConfig>,
    cancellers: CancelRegistry,
    retries: RetryRegistry,
}

/// Outcome of `Runner::cancel`. Reported by the HTTP layer so the response
/// can distinguish "already terminal" from "actually cancelled" cases
/// without an extra DB round-trip.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum CancelOutcome {
    /// A cancel signal was delivered to a live render task.
    Signalled,
    /// No live render task exists for this run id (already terminal,
    /// never started, or already cancelled).
    NotInFlight,
}

/// Outcome of `Runner::spawn_retry_segment`. Lets the HTTP layer
/// distinguish "first retry accepted" from "duplicate concurrent retry".
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum RetrySpawnOutcome {
    /// Registry slot claimed; background task spawned.
    Accepted,
    /// Another retry for this `(run_id, segment_index)` is in flight.
    Duplicate,
}

/// Hard cap on error-message length written to DB / forwarded to the
/// SSE broker. Mirrors the worker-side `truncate_for_log` cap.
const STATUS_MSG_CAP: usize = 2048;

fn truncate_status_msg(message: &str) -> String {
    if message.len() <= STATUS_MSG_CAP {
        message.to_string()
    } else {
        let keep = STATUS_MSG_CAP - 32;
        format!(
            "{} … [truncated {} chars]",
            &message[..keep],
            message.len() - keep
        )
    }
}

impl Runner {
    #[must_use]
    pub fn new(cfg: RunnerConfig) -> Self {
        Self {
            cfg: Arc::new(cfg),
            cancellers: Arc::new(Mutex::new(HashMap::new())),
            retries: Arc::new(Mutex::new(HashSet::new())),
        }
    }

    #[allow(clippy::too_many_arguments)]
    pub fn spawn_render(
        &self,
        run_id: String,
        profile: String,
        plan: RenderPlan,
        prompt: String,
        negative_prompt: Option<String>,
        style_prompt: Option<String>,
        character_prompt: Option<String>,
        input_image_artifact_id: Option<String>,
        advanced: crate::schemas::AdvancedSettings,
    ) {
        let cfg = self.cfg.clone();
        let cancellers = self.cancellers.clone();
        let notify = Arc::new(Notify::new());

        let run_id_for_task = run_id.clone();
        let notify_for_task = notify.clone();
        let cancellers_for_cleanup = cancellers.clone();
        let run_id_for_cleanup = run_id.clone();

        tokio::spawn(async move {
            cancellers
                .lock()
                .await
                .insert(run_id.clone(), notify.clone());

            let result = run_via_lease(
                &cfg,
                &run_id_for_task,
                &profile,
                &plan,
                &prompt,
                negative_prompt.as_deref(),
                style_prompt.as_deref(),
                character_prompt.as_deref(),
                input_image_artifact_id.as_deref(),
                &advanced,
                notify_for_task,
            )
            .await;

            cancellers_for_cleanup
                .lock()
                .await
                .remove(&run_id_for_cleanup);

            if let Err(err) = result {
                // RenderCancelled is the expected terminal Err on the cancel
                // path — the inner loop has already flipped the row to
                if matches!(err, crate::errors::ExtensionError::RenderCancelled) {
                    tracing::info!(
                        extension_id = "nexus.video.ltx23",
                        run_id = %run_id_for_task,
                        "runner: render cancelled"
                    );
                } else {
                    tracing::error!(
                        extension_id = "nexus.video.ltx23",
                        run_id = %run_id_for_task,
                        error = %err,
                        "runner: render failed"
                    );
                    let _ = cfg
                        .repos
                        .update_run_status(
                            &run_id_for_task,
                            "failed",
                            None,
                            Some("runner_error"),
                            Some(&err.to_string()),
                        )
                        .await;
                }
            }
        });
    }

    /// Signal a live render task to abort. Returns whether the signal
    /// landed on an in-flight task. Idempotent — repeated calls after the
    /// task has been removed from the registry simply return `NotInFlight`.
    pub async fn cancel(&self, run_id: &str) -> CancelOutcome {
        let token = self.cancellers.lock().await.get(run_id).cloned();
        token.map_or(CancelOutcome::NotInFlight, |notify| {
            notify.notify_waiters();
            CancelOutcome::Signalled
        })
    }

    /// Re-run a single segment by sending the worker an
    /// `ltx.video.segment.retry` RPC against a freshly-acquired lease.
    ///
    /// Returns when the worker emits `SEGMENT_COMPLETED` for the target
    /// segment (success) or an error notification (failure). Updates the
    /// segment row's status in DB through the same notification handler
    /// the full render uses. Idempotent at the HTTP layer — the caller
    /// can retry the retry; each call acquires a fresh lease.
    ///
    /// Refuses to start if a live render task already exists for this
    /// run id — a retry while the full chain is in flight would race
    /// with the original task's segment-status writes.
    /// Attempt to spawn a retry-segment task.
    ///
    /// Returns `RetrySpawnOutcome::Accepted` when the registry was
    /// updated and the task launched, or `Duplicate` when an in-flight
    /// retry already owns the same `(run_id, segment_index)` pair. The
    /// HTTP layer translates the latter into a 409 Conflict so two
    /// concurrent retry clicks don't race the same workdir.
    #[allow(clippy::too_many_arguments)]
    pub async fn spawn_retry_segment(
        &self,
        run_id: String,
        profile: String,
        plan: RenderPlan,
        segment_index: u32,
        prompt: String,
        negative_prompt: Option<String>,
        style_prompt: Option<String>,
        character_prompt: Option<String>,
        input_image_artifact_id: Option<String>,
        advanced: AdvancedSettings,
    ) -> RetrySpawnOutcome {
        let key = (run_id.clone(), segment_index);
        {
            let mut retries = self.retries.lock().await;
            if !retries.insert(key.clone()) {
                return RetrySpawnOutcome::Duplicate;
            }
        }
        let cfg = self.cfg.clone();
        let retries = self.retries.clone();
        tokio::spawn(async move {
            let result = retry_segment_via_lease(
                &cfg,
                &run_id,
                &profile,
                &plan,
                segment_index,
                &prompt,
                negative_prompt.as_deref(),
                style_prompt.as_deref(),
                character_prompt.as_deref(),
                input_image_artifact_id.as_deref(),
                &advanced,
            )
            .await;

            if let Err(err) = result {
                tracing::error!(
                    extension_id = "nexus.video.ltx23",
                    run_id = %run_id,
                    segment_index,
                    error = %err,
                    "runner: segment retry failed"
                );
                let _ = cfg
                    .repos
                    .update_segment_status(
                        &run_id,
                        i64::from(segment_index),
                        "failed",
                        Some(&truncate_status_msg(&err.to_string())),
                    )
                    .await;
            }
            retries.lock().await.remove(&key);
        });
        RetrySpawnOutcome::Accepted
    }

    /// Returns true when a live render OR retry task currently owns
    /// this run id. HTTP handlers use this to reject retry-segment
    /// while a full chain (or another retry) is in flight.
    pub async fn is_render_in_flight(&self, run_id: &str) -> bool {
        if self.cancellers.lock().await.contains_key(run_id) {
            return true;
        }
        self.retries
            .lock()
            .await
            .iter()
            .any(|(rid, _)| rid == run_id)
    }

    /// Test-only inspection — number of run ids with live tokens.
    #[cfg(test)]
    #[must_use]
    pub async fn live_render_count(&self) -> usize {
        self.cancellers.lock().await.len()
    }

    /// Test-only: inject a canceller for a fake run id without going
    /// through `spawn_render` (which requires a real lease factory + DB
    /// pool). Returns a clone the test can `.notified().await` on.
    #[cfg(test)]
    pub async fn register_test_canceller(&self, run_id: String) -> Arc<Notify> {
        let notify = Arc::new(Notify::new());
        self.cancellers.lock().await.insert(run_id, notify.clone());
        notify
    }
}

#[allow(clippy::too_many_lines, clippy::too_many_arguments)]
async fn run_via_lease(
    cfg: &RunnerConfig,
    run_id: &str,
    profile: &str,
    plan: &RenderPlan,
    prompt: &str,
    negative_prompt: Option<&str>,
    style_prompt: Option<&str>,
    character_prompt: Option<&str>,
    input_image_artifact_id: Option<&str>,
    advanced: &crate::schemas::AdvancedSettings,
    cancel_notify: Arc<Notify>,
) -> Result<()> {
    let workdir = cfg.runs_dir.join(run_id).join("work");
    tokio::fs::create_dir_all(&workdir).await.map_err(|e| {
        crate::errors::ExtensionError::Internal(format!("mkdir workdir {}: {e}", workdir.display()))
    })?;

    cfg.repos
        .update_run_status(run_id, "waiting_for_runtime", None, None, None)
        .await?;

    let max_restarts = max_restarts_from_env();
    let mut segment_offset: u32 = 0;
    let mut restart_attempts: u32 = 0;
    let mut last_breach_reason: Option<String> = None;

    let outcome = loop {
        cfg.repos
            .update_run_status(run_id, "rendering", None, None, None)
            .await?;

        let attempt_outcome = run_attempt(
            cfg,
            run_id,
            profile,
            plan,
            prompt,
            negative_prompt,
            style_prompt,
            character_prompt,
            input_image_artifact_id,
            advanced,
            &workdir,
            segment_offset,
            cancel_notify.clone(),
        )
        .await?;

        match attempt_outcome {
            NotificationOutcome::RestartRequired {
                reason,
                last_completed_segment,
            } => {
                // Translate the "what was the last good segment" into
                // the "where do we resume" index. last_completed_segment
                let next_offset =
                    u32::try_from(last_completed_segment.saturating_add(1)).unwrap_or(u32::MAX);
                // No forward progress check — should be impossible
                // because the latch is consumed by segment.completed,
                if next_offset <= segment_offset || (next_offset as usize) >= plan.segments.len() {
                    tracing::warn!(
                        extension_id = "nexus.video.ltx23",
                        run_id = %run_id,
                        reason = %reason,
                        segment_offset,
                        next_offset,
                        plan_segments = plan.segments.len(),
                        "vram supervisor: restart point invalid; halting chain"
                    );
                    break NotificationOutcome::Error {
                        code: VRAM_SUPERVISOR_BREACH_CODE,
                        message: format!("vram supervisor halt: {reason}"),
                    };
                }
                restart_attempts += 1;
                last_breach_reason = Some(reason.clone());
                if let Err(e) = cfg.repos.update_last_breach_reason(run_id, &reason).await {
                    tracing::warn!(
                        extension_id = "nexus.video.ltx23",
                        run_id = %run_id,
                        error = %e,
                        "runner: failed to persist last_breach_reason; UI tooltip will lag"
                    );
                }
                if restart_attempts > max_restarts {
                    tracing::warn!(
                        extension_id = "nexus.video.ltx23",
                        run_id = %run_id,
                        reason = %reason,
                        restart_attempts,
                        max_restarts,
                        "vram supervisor: restart budget exhausted; halting chain"
                    );
                    break NotificationOutcome::Error {
                        code: VRAM_SUPERVISOR_BREACH_CODE,
                        message: format!(
                            "vram supervisor halt after {restart_attempts} restart(s): {reason}"
                        ),
                    };
                }
                tracing::info!(
                    extension_id = "nexus.video.ltx23",
                    run_id = %run_id,
                    reason = %reason,
                    restart_attempts,
                    next_offset,
                    "vram supervisor: restarting chain at next segment"
                );
                if let Err(e) = cfg.repos.increment_restart_count(run_id).await {
                    tracing::warn!(
                        extension_id = "nexus.video.ltx23",
                        run_id = %run_id,
                        error = %e,
                        "runner: failed to persist restart counter; UI badge will lag"
                    );
                }
                segment_offset = next_offset;
            }
            other => break other,
        }
    };

    if let Some(reason) = &last_breach_reason {
        if matches!(outcome, NotificationOutcome::Done { .. }) {
            tracing::info!(
                extension_id = "nexus.video.ltx23",
                run_id = %run_id,
                breach_reason = %reason,
                restart_attempts,
                "vram supervisor: chain completed after transparent restart(s)"
            );
        }
    }

    if let Err(e) = cfg.notification_buffer.flush_now().await {
        tracing::warn!(
            extension_id = "nexus.video.ltx23",
            run_id = %run_id,
            error = %e,
            "notification buffer flush_now failed at terminal exit; segment rows may lag"
        );
    }

    match outcome {
        NotificationOutcome::Done { final_path } => {
            // Defence-in-depth: the worker controls the `final_path`
            // field in its `ltx.video.done` notification. A compromised
            assert_path_under(&final_path, &workdir).await?;
            let artifact_id = format!("ltx23-run-{run_id}-final");
            let dest = cfg.runs_dir.join(run_id).join("final.mp4");
            tokio::fs::copy(&final_path, &dest).await.map_err(|e| {
                crate::errors::ExtensionError::Internal(format!(
                    "copy final {} → {}: {e}",
                    final_path.display(),
                    dest.display()
                ))
            })?;
            cfg.repos
                .update_run_status(run_id, "completed", Some(&artifact_id), None, None)
                .await?;
            cleanup_workdir(&workdir, run_id).await;
            Ok(())
        }
        NotificationOutcome::Error { code, message } => {
            // The worker's RENDER_CANCELLED error code (-32107) lands here when
            // cancel arrived before the grace timeout — collapse it back to the
            if code == -32107 {
                cfg.repos
                    .update_run_status(run_id, "cancelled", None, None, None)
                    .await?;
                cleanup_workdir(&workdir, run_id).await;
                return Err(crate::errors::ExtensionError::RenderCancelled);
            }
            let error_code = map_worker_error_code(code);
            cfg.repos
                .update_run_status(
                    run_id,
                    "failed",
                    None,
                    Some(error_code),
                    Some(&truncate_status_msg(&message)),
                )
                .await?;
            cleanup_workdir(&workdir, run_id).await;
            Err(typed_error_for(code, message))
        }
        NotificationOutcome::Cancelled => {
            cfg.repos
                .update_run_status(run_id, "cancelled", None, None, None)
                .await?;
            cleanup_workdir(&workdir, run_id).await;
            Err(crate::errors::ExtensionError::RenderCancelled)
        }
        NotificationOutcome::RestartRequired { .. } => {
            unreachable!("RestartRequired must be consumed by the restart loop")
        }
    }
}

/// One attempt at running the chain (from `segment_offset` to end).
///
/// Acquires a fresh lease, sends `render.start`, drains notifications
/// until terminal outcome OR `RestartRequired`. Releases the lease on
/// every exit path. Caller decides whether to restart based on the
/// outcome variant.
#[allow(clippy::too_many_lines, clippy::too_many_arguments)]
async fn run_attempt(
    cfg: &RunnerConfig,
    run_id: &str,
    profile: &str,
    plan: &RenderPlan,
    prompt: &str,
    negative_prompt: Option<&str>,
    style_prompt: Option<&str>,
    character_prompt: Option<&str>,
    input_image_artifact_id: Option<&str>,
    advanced: &crate::schemas::AdvancedSettings,
    workdir: &std::path::Path,
    segment_offset: u32,
    cancel_notify: Arc<Notify>,
) -> Result<NotificationOutcome> {
    let lease = cfg.factory.acquire_lease(short_profile(profile)).await?;
    let mut notifications = lease.subscribe_notifications();
    let breach_latch = BreachLatch::default();

    let render_params = if segment_offset == 0 {
        build_render_params(
            run_id,
            plan,
            prompt,
            negative_prompt,
            style_prompt,
            character_prompt,
            advanced,
            workdir,
            &cfg.inputs_dir,
            input_image_artifact_id,
        )
    } else {
        let prev_idx = segment_offset.saturating_sub(1);
        let cond_image = workdir
            .join("segments")
            .join(format!("{prev_idx:03}"))
            .join("last_frame.png");
        let cond_image_opt = if cond_image.is_file() {
            Some(cond_image.as_path())
        } else {
            tracing::warn!(
                extension_id = "nexus.video.ltx23",
                run_id = %run_id,
                segment_offset,
                expected_path = %cond_image.display(),
                "restart attempt: prior last_frame.png missing; resume will lose continuity"
            );
            None
        };
        build_render_params_offset(
            run_id,
            plan,
            prompt,
            negative_prompt,
            style_prompt,
            character_prompt,
            advanced,
            workdir,
            &cfg.inputs_dir,
            input_image_artifact_id,
            segment_offset,
            cond_image_opt,
        )
    };

    let outcome_result: Result<NotificationOutcome> = async {
        lease
            .send_rpc("ltx.video.render.start", render_params)
            .await
            .map_err(|e| {
                crate::errors::ExtensionError::RenderFailed(format!(
                    "render.start rejected by worker: {e}"
                ))
            })?;

        let cancel_wait = cancel_notify.notified();
        tokio::pin!(cancel_wait);
        let mut cancel_requested = false;
        let mut cancel_deadline: Option<tokio::time::Instant> = None;

        let driven = tokio::time::timeout(RENDER_TIMEOUT, async {
            loop {
                let recv_fut = notifications.recv();
                let cancel_deadline_tick = async {
                    if let Some(deadline) = cancel_deadline {
                        tokio::time::sleep_until(deadline).await;
                    } else {
                        std::future::pending::<()>().await;
                    }
                };

                tokio::select! {
                    () = &mut cancel_wait, if !cancel_requested => {
                        cancel_requested = true;
                        cancel_deadline = Some(tokio::time::Instant::now() + CANCEL_GRACE);
                        if let Err(e) = lease
                            .send_rpc("ltx.video.render.cancel", json!({ "request_id": run_id }))
                            .await
                        {
                            tracing::warn!(
                                extension_id = "nexus.video.ltx23",
                                run_id = %run_id,
                                error = %e,
                                "runner: cancel RPC failed; will rely on grace timeout"
                            );
                        } else {
                            tracing::info!(
                                extension_id = "nexus.video.ltx23",
                                run_id = %run_id,
                                "runner: cancel signalled to worker"
                            );
                        }
                    }
                    () = cancel_deadline_tick, if cancel_requested => {
                        return Ok::<NotificationOutcome, crate::errors::ExtensionError>(
                            NotificationOutcome::Cancelled,
                        );
                    }
                    recv = recv_fut => match recv {
                        Ok(note) => {
                            if !notification_matches_run(&note.params, run_id) {
                                continue;
                            }
                            if let Some(o) = handle_notification(
                                cfg, run_id, workdir, &note, &breach_latch,
                                profile, plan.segment_count,
                            ).await? {
                                return Ok(o);
                            }
                        }
                        Err(RecvError::Lagged(skipped)) => {
                            tracing::warn!(
                                run_id = %run_id,
                                skipped,
                                "runner: notification lag — dropping events but continuing"
                            );
                        }
                        Err(RecvError::Closed) => {
                            return Err(crate::errors::ExtensionError::RenderFailed(
                                "worker closed notification channel before emitting done"
                                    .into(),
                            ));
                        }
                    }
                }
            }
        })
        .await
        .map_err(|_| {
            crate::errors::ExtensionError::RenderFailed(format!(
                "render timed out after {} seconds",
                RENDER_TIMEOUT.as_secs()
            ))
        })?;

        driven
    }
    .await;

    if let Err(e) = lease.release().await {
        tracing::warn!(
            extension_id = "nexus.video.ltx23",
            run_id = %run_id,
            error = %e,
            "runner: lease release failed; subprocess may be orphaned"
        );
    }

    outcome_result
}

/// Verify a worker-supplied path is a descendant of `workdir`.
/// Used to constrain the `final_path` field of `ltx.video.done` so a
/// crafted notification can't cause the runner to copy arbitrary
/// host files into the artifact publish slot.
async fn assert_path_under(candidate: &std::path::Path, workdir: &std::path::Path) -> Result<()> {
    let candidate_canon = tokio::fs::canonicalize(candidate).await.map_err(|e| {
        crate::errors::ExtensionError::RenderFailed(format!(
            "final_path {} not accessible: {e}",
            candidate.display()
        ))
    })?;
    let workdir_canon = tokio::fs::canonicalize(workdir).await.map_err(|e| {
        crate::errors::ExtensionError::Internal(format!(
            "workdir {} not accessible during final_path check: {e}",
            workdir.display()
        ))
    })?;
    if !candidate_canon.starts_with(&workdir_canon) {
        return Err(crate::errors::ExtensionError::RenderFailed(format!(
            "worker emitted final_path '{}' outside workdir '{}'; refusing to publish",
            candidate.display(),
            workdir.display()
        )));
    }
    Ok(())
}

/// Best-effort workdir cleanup on terminal status transitions.
/// Failures are logged but do not fail the render — the DB row already
/// records the outcome, and a stale workdir is a disk-pressure issue
/// rather than a correctness one.
async fn cleanup_workdir(workdir: &std::path::Path, run_id: &str) {
    if !workdir.is_dir() {
        return;
    }
    if let Err(e) = tokio::fs::remove_dir_all(workdir).await {
        tracing::warn!(
            extension_id = "nexus.video.ltx23",
            run_id = %run_id,
            workdir = %workdir.display(),
            error = %e,
            "runner: workdir cleanup failed; disk space may accumulate"
        );
    }
}

enum NotificationOutcome {
    Done {
        final_path: PathBuf,
    },
    Error {
        code: i64,
        message: String,
    },
    Cancelled,
    /// Supervisor tripped mid-chain. Carries the breach reason for
    /// logging + the last segment index that completed successfully
    /// so the outer driver can resume from `index + 1` with a trimmed
    /// plan + cond-image from the prior segment's `last_frame.png`.
    RestartRequired {
        reason: String,
        last_completed_segment: i64,
    },
}

/// Shared mid-render state for the supervisor's "breach now, restart at
/// next segment boundary" flow.
///
/// `runtime.memory_stats` notifications interleave with `segment.completed`
/// notifications (memory stats fire just before the worker advances to
/// the next segment). The latch is set when a breach is detected and
/// consumed on the very next `segment.completed` so the runner can
/// release the lease while the worker is in a quiescent state — never
/// mid-step. Falls back to immediate halt if the worker emits `done`
/// before the latch is consumed (chain already finished, no resume
/// needed).
#[derive(Default)]
struct BreachLatch {
    reason: tokio::sync::Mutex<Option<String>>,
}

impl BreachLatch {
    async fn set(&self, reason: String) {
        let mut guard = self.reason.lock().await;
        if guard.is_none() {
            *guard = Some(reason);
        }
        // Multiple breaches in one segment collapse to the first reason
        // observed — the underlying VRAM problem is one event, not many.
    }

    async fn take(&self) -> Option<String> {
        self.reason.lock().await.take()
    }
}

/// Single-segment-retry analogue of `run_via_lease`. Acquires a fresh
/// lease, sends `ltx.video.segment.retry`, drains notifications until
/// `SEGMENT_COMPLETED` for the target index (success) or `ERROR` (failure).
///
/// The HTTP layer already flipped the segment row to `queued` before
/// invoking this — we don't repeat it here so a fast worker emitting
/// `SEGMENT_STARTED` before our DB write would not be clobbered. The
/// lease is released on every exit path through `drive_retry_loop`'s
/// inner Result handling at the end of the function.
#[allow(clippy::too_many_arguments, clippy::too_many_lines)]
async fn retry_segment_via_lease(
    cfg: &RunnerConfig,
    run_id: &str,
    profile: &str,
    plan: &RenderPlan,
    seg_idx: u32,
    prompt: &str,
    negative_prompt: Option<&str>,
    style_prompt: Option<&str>,
    character_prompt: Option<&str>,
    input_image_artifact_id: Option<&str>,
    advanced: &AdvancedSettings,
) -> Result<()> {
    let workdir = cfg.runs_dir.join(run_id).join("work");
    tokio::fs::create_dir_all(&workdir).await.map_err(|e| {
        crate::errors::ExtensionError::Internal(format!("mkdir workdir {}: {e}", workdir.display()))
    })?;

    let lease = cfg.factory.acquire_lease(short_profile(profile)).await?;
    let target = i64::from(seg_idx);

    let outcome_result: Result<RetryOutcome> = async {
        let mut notifications = lease.subscribe_notifications();

        let mut retry_params = build_render_params(
            run_id,
            plan,
            prompt,
            negative_prompt,
            style_prompt,
            character_prompt,
            advanced,
            &workdir,
            &cfg.inputs_dir,
            if seg_idx == 0 {
                input_image_artifact_id
            } else {
                None
            },
        );
        if let Some(obj) = retry_params.as_object_mut() {
            obj.insert("segment_index".into(), Value::from(seg_idx));
        }

        lease
            .send_rpc("ltx.video.segment.retry", retry_params)
            .await
            .map_err(|e| {
                crate::errors::ExtensionError::RenderFailed(format!(
                    "segment.retry rejected by worker: {e}"
                ))
            })?;

        let driven = tokio::time::timeout(RETRY_SEGMENT_TIMEOUT, async {
            loop {
                match notifications.recv().await {
                    Ok(note) => {
                        if !notification_matches_run(&note.params, run_id) {
                            continue;
                        }
                        match note.method.as_str() {
                            "ltx.video.segment.completed" => {
                                if segment_index(&note.params) == Some(target) {
                                    cfg.repos
                                        .update_segment_status(run_id, target, "completed", None)
                                        .await?;
                                    return Ok::<RetryOutcome, crate::errors::ExtensionError>(
                                        RetryOutcome::Completed,
                                    );
                                }
                            }
                            "ltx.video.segment.started" => {
                                if segment_index(&note.params) == Some(target) {
                                    cfg.repos
                                        .update_segment_status(run_id, target, "rendering", None)
                                        .await?;
                                }
                            }
                            "ltx.video.error" => {
                                let code = note
                                    .params
                                    .get("code")
                                    .and_then(Value::as_i64)
                                    .unwrap_or(-32603);
                                let message = note
                                    .params
                                    .get("message")
                                    .and_then(Value::as_str)
                                    .unwrap_or("worker emitted error without message")
                                    .to_string();
                                return Ok(RetryOutcome::Error { code, message });
                            }
                            _ => {}
                        }
                    }
                    Err(RecvError::Lagged(skipped)) => {
                        tracing::warn!(
                            run_id = %run_id,
                            segment_index = seg_idx,
                            skipped,
                            "runner: retry notification lag — dropping events but continuing"
                        );
                    }
                    Err(RecvError::Closed) => {
                        return Err(crate::errors::ExtensionError::RenderFailed(
                            "worker closed notification channel before retry completed".into(),
                        ));
                    }
                }
            }
        })
        .await
        .map_err(|_| {
            crate::errors::ExtensionError::RenderFailed(format!(
                "segment retry timed out after {} seconds",
                RETRY_SEGMENT_TIMEOUT.as_secs()
            ))
        })?;

        driven
    }
    .await;

    let _ = lease.release().await;

    match outcome_result? {
        RetryOutcome::Completed => Ok(()),
        RetryOutcome::Error { code, message } => {
            let truncated = truncate_status_msg(&message);
            cfg.repos
                .update_segment_status(
                    run_id,
                    target,
                    "failed",
                    Some(&format!("worker_error:{code} {truncated}")),
                )
                .await?;
            Err(crate::errors::ExtensionError::RenderFailed(message))
        }
    }
}

/// Compare a notification's `run_id` field (when present) against the
/// expected one. Returns true when the field matches OR when it's
/// absent — older worker builds may not emit `run_id` on every
/// notification, so absence is treated as "trust the lease binding".
fn notification_matches_run(params: &Value, expected: &str) -> bool {
    params
        .get("run_id")
        .and_then(Value::as_str)
        .is_none_or(|got| got == expected)
}

enum RetryOutcome {
    Completed,
    Error { code: i64, message: String },
}

/// Push one segment-status write through the batching flusher. A
/// flusher-died error logs a warn and falls through — the render
/// itself is unaffected, the polling client just sees a stale row
/// until the next status change.
async fn enqueue_segment_status(
    buffer: &NotificationBuffer,
    run_id: &str,
    segment_index: i64,
    status: &str,
) {
    let write = SegmentStatusWrite {
        run_id: run_id.to_string(),
        segment_index,
        status: status.into(),
        preview_artifact_id: None,
    };
    if let Err(e) = buffer.enqueue(write).await {
        tracing::warn!(
            extension_id = "nexus.video.ltx23",
            run_id = %run_id,
            segment = segment_index,
            new_status = %status,
            error = %e,
            "notification buffer enqueue failed; segment status will lag"
        );
    }
}

async fn handle_notification(
    cfg: &RunnerConfig,
    run_id: &str,
    _workdir: &std::path::Path,
    note: &nexus_backend_runtimes::generic::leases::trait_def::LeaseNotification,
    breach_latch: &BreachLatch,
    // SHORT or fully-qualified profile slug for the running chain —
    // selects the per-profile `max_frag_ratio` ceiling so an offloaded
    profile: &str,
    // Total planned segments for the chain. When the FINAL segment
    // completes there is nothing left to render, so a latched breach
    total_segments: u32,
) -> Result<Option<NotificationOutcome>> {
    match note.method.as_str() {
        "ltx.video.segment.started" => {
            if let Some(i) = segment_index(&note.params) {
                enqueue_segment_status(&cfg.notification_buffer, run_id, i, "rendering").await;
            }
            Ok(None)
        }
        "ltx.video.segment.completed" => {
            if let Some(i) = segment_index(&note.params) {
                enqueue_segment_status(&cfg.notification_buffer, run_id, i, "completed").await;
                if let Some(reason) = breach_latch.take().await {
                    if let Some(outcome) =
                        restart_outcome_for_latched_breach(&reason, i, total_segments)
                    {
                        return Ok(Some(outcome));
                    }
                    tracing::info!(
                        extension_id = "nexus.video.ltx23",
                        run_id = %run_id,
                        reason = %reason,
                        last_segment = i,
                        total_segments,
                        "vram supervisor: breach latched on the final segment — \
                         render already complete, treating as benign (no restart)"
                    );
                    return Ok(None);
                }
            }
            Ok(None)
        }
        "ltx.video.segment.step" => {
            let step = note.params.get("step").and_then(Value::as_u64).unwrap_or(0);
            let total = note
                .params
                .get("total_steps")
                .and_then(Value::as_u64)
                .unwrap_or(0);
            let seg = note
                .params
                .get("segment_index")
                .and_then(Value::as_i64)
                .unwrap_or(-1);
            tracing::trace!(
                extension_id = "nexus.video.ltx23",
                run_id = %run_id,
                segment = seg,
                step,
                total,
                "segment inference step"
            );
            Ok(None)
        }
        "ltx.video.done" => {
            let final_path = note
                .params
                .get("final_path")
                .and_then(Value::as_str)
                .ok_or_else(|| {
                    crate::errors::ExtensionError::RenderFailed(
                        "done notification missing final_path".into(),
                    )
                })?;
            Ok(Some(NotificationOutcome::Done {
                final_path: PathBuf::from(final_path),
            }))
        }
        "ltx.video.error" => {
            let code = note
                .params
                .get("code")
                .and_then(Value::as_i64)
                .unwrap_or(-32603);
            let message = note
                .params
                .get("message")
                .and_then(Value::as_str)
                .unwrap_or("worker emitted error without message")
                .to_string();
            Ok(Some(NotificationOutcome::Error { code, message }))
        }
        "runtime.memory_stats" => {
            // Supervisor reads each VRAM snapshot. Instead of halting
            // immediately, set a latch — the next `segment.completed`
            match evaluate_memory_stats(&cfg.vram_supervisor, profile, &note.params) {
                VramVerdict::Healthy => Ok(None),
                VramVerdict::Breach { reason } => {
                    tracing::warn!(
                        extension_id = "nexus.video.ltx23",
                        run_id = %run_id,
                        reason = %reason,
                        "vram supervisor: threshold breached — will restart at next segment boundary"
                    );
                    breach_latch.set(reason).await;
                    Ok(None)
                }
            }
        }
        _ => Ok(None),
    }
}

fn segment_index(params: &Value) -> Option<i64> {
    params.get("segment_index").and_then(Value::as_i64)
}

/// Resolve the per-profile `frag_ratio` ceiling and evaluate a
/// `runtime.memory_stats` payload.
///
/// fp8/nvfp4 run under CPU offload and leave the CUDA pool heavily
/// fragmented after a *normal* render, so the spec-046 default of
/// 0.30 would false-positive on every healthy run of those profiles.
/// `resolve_max_frag_ratio` keeps an explicit env override winning.
/// Centralised here so Guard A is unit-testable without driving the
/// async notification loop.
fn evaluate_memory_stats(supervisor: &VramSupervisor, profile: &str, stats: &Value) -> VramVerdict {
    let max_frag = supervisor
        .resolve_max_frag_ratio(default_max_frag_ratio_for_profile(short_profile(profile)));
    supervisor.evaluate_with_max_frag(stats, max_frag)
}

/// Decide what a latched supervisor breach means once a segment has
/// completed cleanly.
///
/// `completed_segment` is the ORIGINAL 0-based chain index that just
/// landed; `total_segments` is the full planned count. When the final
/// segment completes (`completed_segment + 1 >= total_segments`) every
/// planned segment is on disk and the run will proceed to
/// `ltx.video.done` — the breach is moot (there is nothing left to
/// render) so this returns `None` and the caller lets the chain
/// finish. Otherwise it returns `RestartRequired` so the outer driver
/// releases the lease and resumes mid-chain.
///
/// Pure + sync so the benign-completion guard is unit-testable without
/// driving the async notification loop.
fn restart_outcome_for_latched_breach(
    reason: &str,
    completed_segment: i64,
    total_segments: u32,
) -> Option<NotificationOutcome> {
    if completed_segment.saturating_add(1) >= i64::from(total_segments) {
        return None;
    }
    Some(NotificationOutcome::RestartRequired {
        reason: reason.to_string(),
        last_completed_segment: completed_segment,
    })
}

/// Build a `render.start` payload that resumes mid-chain.
///
/// Slices `plan.segments[segment_offset..]` and injects an
/// `input_image.path` pointing at the prior segment's `last_frame.png`
/// so the worker conditions the resume chain on visual continuity
/// from the breach point. Segment indices remain ORIGINAL (worker
/// uses `seg["index"]` to compute its workdir path), so the on-disk
/// layout + DB segment rows stay coherent across attempts.
#[allow(clippy::too_many_arguments)]
fn build_render_params_offset(
    run_id: &str,
    plan: &RenderPlan,
    prompt: &str,
    negative_prompt: Option<&str>,
    style_prompt: Option<&str>,
    character_prompt: Option<&str>,
    advanced: &crate::schemas::AdvancedSettings,
    workdir: &std::path::Path,
    inputs_dir: &std::path::Path,
    // Resume payload deliberately ignores the operator's original
    // upload — see comment + T13 below. Kept as a named param so
    _input_image_artifact_id: Option<&str>,
    segment_offset: u32,
    cond_image_path: Option<&std::path::Path>,
) -> Value {
    let mut params = build_render_params(
        run_id,
        plan,
        prompt,
        negative_prompt,
        style_prompt,
        character_prompt,
        advanced,
        workdir,
        inputs_dir,
        // Resume payload — the prior segment's last_frame.png supplied
        // via `cond_image_path` is the authoritative conditioning
        None,
    );

    // Trim segments + inject cond_image. The worker's render_loop reads
    // `input_image.path` once for segment 0, then derives subsequent
    let offset_usize = segment_offset as usize;
    if let Some(obj) = params.as_object_mut() {
        if let Some(video) = obj.get_mut("video").and_then(Value::as_object_mut) {
            if let Some(segments_arr) = video.get_mut("segments").and_then(Value::as_array_mut) {
                if offset_usize < segments_arr.len() {
                    segments_arr.drain(0..offset_usize);
                }
            }
            // The worker reads `frames_per_segment` / `segment_seconds`
            // from the first remaining segment, but recompute defensively
            if let Some(first) = plan.segments.get(offset_usize) {
                video.insert("frames_per_segment".into(), Value::from(first.frame_count));
                video.insert(
                    "segment_seconds".into(),
                    Value::from(f64::from(first.duration_seconds)),
                );
                video.insert(
                    "overlap_seconds".into(),
                    Value::from(f64::from(first.overlap_seconds)),
                );
            }
        }
        if let Some(cond) = cond_image_path {
            obj.insert(
                "input_image".into(),
                json!({ "path": cond.to_string_lossy() }),
            );
        }
        obj.insert("resumed_from_segment".into(), Value::from(segment_offset));
    }
    params
}

#[allow(clippy::too_many_arguments)]
fn build_render_params(
    run_id: &str,
    plan: &RenderPlan,
    prompt: &str,
    negative_prompt: Option<&str>,
    style_prompt: Option<&str>,
    character_prompt: Option<&str>,
    advanced: &crate::schemas::AdvancedSettings,
    workdir: &std::path::Path,
    inputs_dir: &std::path::Path,
    input_image_artifact_id: Option<&str>,
) -> Value {
    // Substitute the pipeline's documented defaults when the user
    // leaves these unset, rather than sending JSON `null`. The worker
    let advanced_block = build_advanced_block(advanced, &plan.runtime_profile);

    // Per-segment `action_prompt` overrides the global `prompt` when
    // the planner zipped a scenes[] script. The worker composes the
    let segments_json: Vec<Value> = plan
        .segments
        .iter()
        .map(|s| {
            json!({
                "index": s.index,
                "start_time_seconds": s.start_time_seconds,
                "duration_seconds": s.duration_seconds,
                "overlap_seconds": s.overlap_seconds,
                "frame_count": s.frame_count,
                "seed": s.seed,
                "action_prompt": s.action_prompt,
            })
        })
        .collect();

    let mut payload = json!({
        "request_id": run_id,
        "workdir": workdir.to_string_lossy(),
        "prompt": {
            "action": prompt,
            "negative": negative_prompt.unwrap_or(""),
            "style": style_prompt.unwrap_or(""),
            "character": character_prompt.unwrap_or(""),
        },
        "video": {
            "width": plan.width,
            "height": plan.height,
            "base_fps": plan.base_fps,
            "output_fps": plan.output_fps,
            "duration_seconds": plan.requested_duration_seconds,
            "requested_duration_seconds": plan.requested_duration_seconds,
            "segment_count": plan.segment_count,
            "segment_seconds": plan.segments.first().map_or(4.0, |s| s.duration_seconds),
            "overlap_seconds": plan.segments.first().map_or(0.5, |s| s.overlap_seconds),
            "mode": "external_segments",
            "frames_per_segment": plan.segments.first().map_or(97, |s| s.frame_count),
            "segments": segments_json,
        },
        "advanced": advanced_block,
        "runtime_profile": plan.runtime_profile.clone(),
    });

    if let Some(id) = input_image_artifact_id {
        if let Some(path) = resolve_input_image_path(inputs_dir, id) {
            if let Some(obj) = payload.as_object_mut() {
                obj.insert(
                    "input_image".into(),
                    json!({ "path": path.to_string_lossy() }),
                );
            }
        } else {
            tracing::warn!(
                extension_id = "nexus.video.ltx23",
                run_id = %run_id,
                artifact_id = %id,
                inputs_dir = %inputs_dir.display(),
                "input_image artifact id did not resolve to an on-disk file; \
                 rendering text-only (worker will fall back to solid-grey conditioning)"
            );
        }
    }

    payload
}

/// Resolve `<artifact_id>` to an absolute path inside `inputs_dir`.
///
/// Tries each accepted extension (png/jpg/jpeg/webp) and returns the
/// first hit. The candidate path is canonicalised + verified to live
/// under the canonical `inputs_dir`, so any traversal symlink or escape
/// trick is caught before the path is handed to the worker.
///
/// Returns `None` for every failure mode — invalid id shape, no file
/// matching any accepted extension, canonicalize error, or path-escape.
/// Caller renders text-only on `None` and logs a warn.
///
/// `pub(crate)` so `api.rs::create_render` can run the identical
/// resolution at submission time and reject a render that references a
/// stale / orphaned artifact id with a 400 instead of silently
/// degrading to text-only after a GPU-hour run. Single source of truth
/// for "does this artifact id point at a usable file".
pub(crate) fn resolve_input_image_path(
    inputs_dir: &std::path::Path,
    artifact_id: &str,
) -> Option<PathBuf> {
    const ACCEPTED_EXTS: &[&str] = &["png", "jpg", "jpeg", "webp"];

    if !crate::schemas::is_valid_input_artifact_id(artifact_id) {
        return None;
    }

    let inputs_canon = std::fs::canonicalize(inputs_dir).ok()?;
    for ext in ACCEPTED_EXTS {
        let candidate = inputs_canon.join(format!("{artifact_id}.{ext}"));
        if !candidate.is_file() {
            continue;
        }
        let canon = std::fs::canonicalize(&candidate).ok()?;
        // Defence in depth: even with a clean id shape, refuse a
        // symlink that points outside inputs_dir. canonicalize +
        if !canon.starts_with(&inputs_canon) {
            return None;
        }
        return Some(canon);
    }
    None
}

fn short_profile(full: &str) -> &str {
    full.rsplit('.').next().unwrap_or("fake")
}

/// Build the worker payload's `advanced` block from operator settings.
///
/// Centralises `Auto` resolution + every wire-format conversion so the
/// payload-shape and the build-time call site stay independently
/// testable. The worker observes only concrete values — no `auto`
/// device, no `None`-as-JSON-null where the worker expects a number,
/// no `Auto`-variant offload mode.
#[allow(clippy::too_many_lines)]
fn build_advanced_block(advanced: &AdvancedSettings, runtime_profile: &str) -> Value {
    const DEFAULT_GUIDANCE_SCALE: f32 = 4.0;
    const DEFAULT_NUM_INFERENCE_STEPS: u32 = 8;
    let guidance_scale = Value::from(f64::from(
        advanced.guidance_scale.unwrap_or(DEFAULT_GUIDANCE_SCALE),
    ));
    let num_inference_steps = Value::from(
        advanced
            .num_inference_steps
            .unwrap_or(DEFAULT_NUM_INFERENCE_STEPS),
    );

    let offload_mode = match advanced.offload_mode {
        OffloadMode::Auto => default_offload_mode_for_profile(short_profile(runtime_profile)),
        concrete => concrete,
    };
    let offload_mode_str = match offload_mode {
        OffloadMode::None => "none",
        OffloadMode::Model => "model",
        OffloadMode::Group => "group",
        OffloadMode::Sequential | OffloadMode::Auto => "sequential",
    };

    let placement = resolve_component_placement(
        short_profile(runtime_profile),
        offload_mode,
        advanced.component_placement,
    );
    let placement_overridden = !advanced.component_placement.is_fully_auto();
    let device_str = |pref: DevicePreference| match pref {
        DevicePreference::Auto | DevicePreference::Cpu => "cpu",
        DevicePreference::Cuda => "cuda",
    };
    let placement_json = json!({
        "transformer": device_str(placement.transformer),
        "vae": device_str(placement.vae),
        "text_encoder": device_str(placement.text_encoder),
    });

    let scheduler_str = match advanced.scheduler {
        SchedulerChoice::FlowMatchEuler => "flow_match_euler",
        SchedulerChoice::FlowMatchHeun => "flow_match_heun",
    };
    let quant = match advanced.quantization {
        ModelQuant::None => default_quant_for_profile(short_profile(runtime_profile)),
        explicit => explicit,
    };
    let quant_str = match quant {
        ModelQuant::None => "none",
        // bnb wire value stays "nf4" so the worker's bitsandbytes
        // branch is unchanged by the N3 rename (host-side enum only).
        ModelQuant::Nf4Bnb => "nf4",
        ModelQuant::Int8 => "int8",
        // New worker contract: "nvfp4" → ModelOpt restore path.
        ModelQuant::Nvfp4 => "nvfp4",
        // "gguf" → gguf_loader override path (rename + schema-clean).
        ModelQuant::Gguf => "gguf",
        // "fp8" → official Lightricks diffusers-native fp8 transformer
        // (worker loads via from_pretrained behind a schema-parity
        ModelQuant::Fp8Official => "fp8",
    };

    let decode_timestep = advanced
        .decode_timestep
        .map_or(Value::Null, |v| Value::from(f64::from(v)));
    let image_cond_noise_scale = advanced
        .image_cond_noise_scale
        .map_or(Value::Null, |v| Value::from(f64::from(v)));
    let guidance_rescale = advanced
        .guidance_rescale
        .map_or(Value::Null, |v| Value::from(f64::from(v)));
    let max_gpu_vram_gib = advanced.max_gpu_vram_gib.map_or(Value::Null, Value::from);
    let interpolation = advanced.interpolation.map_or(Value::Null, |m| {
        serde_json::to_value(m).unwrap_or(Value::Null)
    });
    // Opt-in two-pass spatial upscale. `None` → JSON null → worker
    // keeps its single-pass native render default.
    let upscale = advanced.upscale.map_or(Value::Null, Value::from);
    // Upscale strategy. `None` → JSON null → worker defaults to the
    // proven two_pass; `decoupled` skips the transformer refine.
    let upscale_mode = advanced
        .upscale_mode
        .as_deref()
        .map_or(Value::Null, Value::from);
    let model_id = advanced
        .model_id
        .as_deref()
        .map_or(Value::Null, Value::from);
    let vae_tiling = advanced
        .vae_tiling
        .as_deref()
        .map_or(Value::Null, Value::from);
    let f = |o: Option<f32>| o.map_or(Value::Null, |v| Value::from(f64::from(v)));
    let decode_noise_scale = f(advanced.decode_noise_scale);
    let condition_strength = f(advanced.condition_strength);
    let condition_tail_frames = advanced
        .condition_tail_frames
        .map_or(Value::Null, Value::from);
    let seam_overlap_frames = advanced
        .seam_overlap_frames
        .map_or(Value::Null, Value::from);
    let seam_blend_frames = advanced.seam_blend_frames.map_or(Value::Null, Value::from);
    let seam_color_match = advanced.seam_color_match.map_or(Value::Null, Value::from);

    json!({
        "guidance_scale": guidance_scale,
        "num_inference_steps": num_inference_steps,
        "offload_mode": offload_mode_str,
        "component_placement": placement_json,
        "placement_overridden": placement_overridden,
        "scheduler": scheduler_str,
        "quantization": quant_str,
        "decode_timestep": decode_timestep,
        "image_cond_noise_scale": image_cond_noise_scale,
        "guidance_rescale": guidance_rescale,
        "max_gpu_vram_gib": max_gpu_vram_gib,
        "interpolation": interpolation,
        "upscale": upscale,
        "upscale_mode": upscale_mode,
        "model_id": model_id,
        "vae_tiling": vae_tiling,
        "decode_noise_scale": decode_noise_scale,
        "condition_strength": condition_strength,
        "condition_tail_frames": condition_tail_frames,
        "seam_overlap_frames": seam_overlap_frames,
        "seam_blend_frames": seam_blend_frames,
        "seam_color_match": seam_color_match,
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::lease::LtxLeaseFactory;
    use sqlx::sqlite::SqlitePoolOptions;

    async fn empty_runner() -> Runner {
        // In-memory SQLite is enough — Runner::cancel never touches the DB.
        let pool = SqlitePoolOptions::new()
            .max_connections(1)
            .connect("sqlite::memory:")
            .await
            .unwrap();
        let repos = Repos::from_pool(pool);
        let (notification_buffer, _handle) = crate::notification_buffer::NotificationBuffer::new(
            repos.clone(),
            crate::notification_buffer::DEFAULT_FLUSH_INTERVAL,
        );
        Runner::new(RunnerConfig {
            runs_dir: PathBuf::from("/tmp"),
            inputs_dir: PathBuf::from("/tmp"),
            repos,
            factory: Arc::new(LtxLeaseFactory::new(
                PathBuf::from("/nonexistent-ext"),
                PathBuf::from("/nonexistent-data"),
            )),
            vram_supervisor: VramSupervisor::default(),
            notification_buffer,
        })
    }

    #[tokio::test]
    async fn cancel_unknown_run_returns_not_in_flight() {
        let runner = empty_runner().await;
        let outcome = runner.cancel("does-not-exist").await;
        assert_eq!(outcome, CancelOutcome::NotInFlight);
        assert_eq!(runner.live_render_count().await, 0);
    }

    #[tokio::test]
    async fn cancel_signals_registered_canceller() {
        let runner = empty_runner().await;
        let notify = runner.register_test_canceller("run-abc".into()).await;
        assert_eq!(runner.live_render_count().await, 1);

        let waiter = tokio::spawn(async move { notify.notified().await });
        // Yield once so the waiter is parked on `notified()` before we
        // call `notify_waiters` — `Notify` only wakes already-parked
        tokio::task::yield_now().await;

        let outcome = runner.cancel("run-abc").await;
        assert_eq!(outcome, CancelOutcome::Signalled);

        tokio::time::timeout(Duration::from_millis(200), waiter)
            .await
            .expect("waiter should be notified within 200ms")
            .expect("waiter task should not panic");
    }

    #[tokio::test]
    async fn cancel_is_idempotent_after_registry_cleanup() {
        let runner = empty_runner().await;
        let _ = runner.register_test_canceller("run-x".into()).await;
        // Simulate task completion: clean up the registry entry the way
        // spawn_render's own teardown would.
        runner.cancellers.lock().await.remove("run-x");

        let first = runner.cancel("run-x").await;
        let second = runner.cancel("run-x").await;
        assert_eq!(first, CancelOutcome::NotInFlight);
        assert_eq!(second, CancelOutcome::NotInFlight);
    }

    #[tokio::test]
    async fn is_render_in_flight_reflects_live_canceller() {
        let runner = empty_runner().await;
        assert!(!runner.is_render_in_flight("ghost").await);
        let _ = runner.register_test_canceller("alive".into()).await;
        assert!(runner.is_render_in_flight("alive").await);
        assert!(!runner.is_render_in_flight("ghost").await);
    }

    #[tokio::test]
    async fn is_render_in_flight_returns_false_after_cleanup() {
        let runner = empty_runner().await;
        let _ = runner.register_test_canceller("transient".into()).await;
        runner.cancellers.lock().await.remove("transient");
        assert!(!runner.is_render_in_flight("transient").await);
    }

    #[test]
    fn map_worker_error_code_known_namespace() {
        assert_eq!(map_worker_error_code(W_MODEL_MISSING), "model_missing");
        assert_eq!(map_worker_error_code(W_DRIVER_TOO_OLD), "driver_too_old");
        assert_eq!(
            map_worker_error_code(W_VRAM_BUDGET_EXCEEDED),
            "vram_budget_exceeded"
        );
        assert_eq!(
            map_worker_error_code(VRAM_SUPERVISOR_BREACH_CODE),
            "vram_supervisor"
        );
    }

    #[test]
    fn map_worker_error_code_unknown_falls_back() {
        // Future worker code that hasn't been added to the map should
        // still get a useful (if generic) label.
        assert_eq!(map_worker_error_code(-99_999), "worker_error");
        assert_eq!(map_worker_error_code(0), "worker_error");
    }

    #[test]
    fn typed_error_for_routes_to_specific_variants() {
        use crate::errors::ExtensionError;
        assert!(matches!(
            typed_error_for(W_MODEL_MISSING, "weights gone".into()),
            ExtensionError::ModelMissing(_)
        ));
        assert!(matches!(
            typed_error_for(W_DRIVER_TOO_OLD, "535 < 545".into()),
            ExtensionError::DriverTooOld(_)
        ));
        assert!(matches!(
            typed_error_for(W_GPU_NOT_SUPPORTED, "sm_75 unsupported".into()),
            ExtensionError::GpuNotSupported(_)
        ));
        assert!(matches!(
            typed_error_for(W_VRAM_BUDGET_EXCEEDED, "OOM".into()),
            ExtensionError::VramBudgetExceeded(_)
        ));
        assert!(matches!(
            typed_error_for(W_PLAN_INVALID, "bad plan".into()),
            ExtensionError::PlanInvalid(_)
        ));
        // Unknown codes collapse to the generic RenderFailed bucket.
        assert!(matches!(
            typed_error_for(-99_999, "mystery".into()),
            ExtensionError::RenderFailed(_)
        ));
    }

    #[tokio::test]
    async fn is_render_in_flight_covers_retry_registry() {
        let runner = empty_runner().await;
        runner.retries.lock().await.insert(("run-retry".into(), 3));
        assert!(runner.is_render_in_flight("run-retry").await);
        assert!(!runner.is_render_in_flight("run-other").await);
    }

    #[test]
    fn notification_matches_run_returns_true_when_field_absent() {
        let params = serde_json::json!({"segment_index": 1});
        assert!(notification_matches_run(&params, "run-x"));
    }

    #[test]
    fn notification_matches_run_compares_string_run_id() {
        let params = serde_json::json!({"run_id": "run-x", "segment_index": 1});
        assert!(notification_matches_run(&params, "run-x"));
        let params_other = serde_json::json!({"run_id": "run-y", "segment_index": 1});
        assert!(!notification_matches_run(&params_other, "run-x"));
    }

    #[test]
    fn truncate_status_msg_passthrough_under_cap() {
        let short = "x".repeat(100);
        assert_eq!(truncate_status_msg(&short), short);
    }

    #[test]
    fn truncate_status_msg_truncates_over_cap() {
        let long = "y".repeat(STATUS_MSG_CAP * 2);
        let out = truncate_status_msg(&long);
        assert!(out.len() < long.len());
        assert!(out.contains("truncated"));
    }

    // ── Rung 7L: BreachLatch + restart-mid-chain ──────────────────────

    #[tokio::test]
    async fn breach_latch_set_then_take_returns_first_reason() {
        let latch = BreachLatch::default();
        latch.set("frag too high".into()).await;
        assert_eq!(latch.take().await, Some("frag too high".into()));
        // Second take returns None — the consumer drained it.
        assert_eq!(latch.take().await, None);
    }

    #[tokio::test]
    async fn breach_latch_set_is_first_writer_wins() {
        let latch = BreachLatch::default();
        latch.set("first".into()).await;
        latch.set("second".into()).await;
        assert_eq!(latch.take().await, Some("first".into()));
    }

    #[tokio::test]
    async fn breach_latch_starts_empty() {
        let latch = BreachLatch::default();
        assert_eq!(latch.take().await, None);
    }

    // env-var mutation: serialised against every other test that
    // touches `MAX_RESTARTS_ENV` (including the orchestration
    #[test]
    #[serial_test::serial(max_restarts_env)]
    fn max_restarts_from_env_uses_default_when_unset() {
        std::env::remove_var(MAX_RESTARTS_ENV);
        assert_eq!(max_restarts_from_env(), DEFAULT_MAX_RESTARTS);
    }

    #[test]
    #[serial_test::serial(max_restarts_env)]
    fn max_restarts_from_env_parses_valid_override() {
        std::env::set_var(MAX_RESTARTS_ENV, "7");
        let result = max_restarts_from_env();
        std::env::remove_var(MAX_RESTARTS_ENV);
        assert_eq!(result, 7);
    }

    #[test]
    #[serial_test::serial(max_restarts_env)]
    fn max_restarts_from_env_falls_back_on_garbage() {
        std::env::set_var(MAX_RESTARTS_ENV, "not-a-number");
        let result = max_restarts_from_env();
        std::env::remove_var(MAX_RESTARTS_ENV);
        assert_eq!(result, DEFAULT_MAX_RESTARTS);
    }

    fn sample_plan(seg_count: u32) -> RenderPlan {
        use crate::schemas::{
            InterpolationMethod, RenderMode, RenderPlan, RenderSegmentPlan, VramRisk,
        };
        RenderPlan {
            mode: RenderMode::ExternalSegments,
            width: 832,
            height: 480,
            base_fps: 24,
            output_fps: 48,
            requested_duration_seconds: f32::from(u16::try_from(seg_count * 4).unwrap_or(0)),
            planned_duration_seconds: f32::from(u16::try_from(seg_count * 4).unwrap_or(0)),
            segment_count: seg_count,
            segments: (0..seg_count)
                .map(|i| RenderSegmentPlan {
                    index: i,
                    start_time_seconds: f32::from(u16::try_from(i * 4).unwrap_or(0)),
                    duration_seconds: 4.0,
                    overlap_seconds: 0.5,
                    frame_count: 97,
                    seed: u64::from(i),
                    action_prompt: Some(format!("scene {i}")),
                })
                .collect(),
            runtime_profile: "nexus.video.ltx23.fake".into(),
            gpu_memory_budget_mb: 16_384,
            interpolation: InterpolationMethod::Rife2x,
            warnings: vec![],
            vram_risk: VramRisk::Safe,
        }
    }

    /// Test-only `inputs_dir` placeholder. The existing offload-mode /
    /// segment-trim tests don't exercise the resolver — they pass an
    /// empty artifact id so the directory is never read. The dedicated
    /// input-image resolver tests below provision their own
    /// `tempfile::tempdir`.
    fn test_inputs_dir() -> std::path::PathBuf {
        std::path::PathBuf::from("/tmp/ltx23-nonexistent-inputs")
    }

    #[test]
    fn build_render_params_offset_trims_segments() {
        let plan = sample_plan(5);
        let workdir = PathBuf::from("/runs/run-x/work");
        let inputs_dir = test_inputs_dir();
        let params = build_render_params_offset(
            "run-x",
            &plan,
            "make video",
            None,
            None,
            None,
            &AdvancedSettings::default(),
            &workdir,
            &inputs_dir,
            None,
            2,
            None,
        );
        let segments = params["video"]["segments"]
            .as_array()
            .expect("segments array");
        assert_eq!(segments.len(), 3, "should keep segments[2..] = 3 entries");
        assert_eq!(segments[0]["index"].as_u64().unwrap(), 2);
        assert_eq!(segments[1]["index"].as_u64().unwrap(), 3);
        assert_eq!(segments[2]["index"].as_u64().unwrap(), 4);
    }

    #[test]
    fn build_render_params_offset_marks_resumed_segment() {
        let plan = sample_plan(3);
        let workdir = PathBuf::from("/runs/run-x/work");
        let inputs_dir = test_inputs_dir();
        let params = build_render_params_offset(
            "run-x",
            &plan,
            "make video",
            None,
            None,
            None,
            &AdvancedSettings::default(),
            &workdir,
            &inputs_dir,
            None,
            1,
            None,
        );
        assert_eq!(params["resumed_from_segment"].as_u64(), Some(1));
    }

    #[test]
    fn build_render_params_offset_injects_cond_image() {
        let plan = sample_plan(3);
        let workdir = PathBuf::from("/runs/run-x/work");
        let inputs_dir = test_inputs_dir();
        let cond = std::path::PathBuf::from("/runs/run-x/work/segments/000/last_frame.png");
        let params = build_render_params_offset(
            "run-x",
            &plan,
            "make video",
            None,
            None,
            None,
            &AdvancedSettings::default(),
            &workdir,
            &inputs_dir,
            None,
            1,
            Some(cond.as_path()),
        );
        let injected = params["input_image"]["path"]
            .as_str()
            .expect("input_image.path");
        assert!(injected.contains("last_frame.png"));
        assert!(injected.contains("000"));
    }

    #[test]
    fn build_render_params_offset_no_cond_omits_input_image() {
        let plan = sample_plan(3);
        let workdir = PathBuf::from("/runs/run-x/work");
        let inputs_dir = test_inputs_dir();
        let params = build_render_params_offset(
            "run-x",
            &plan,
            "make video",
            None,
            None,
            None,
            &AdvancedSettings::default(),
            &workdir,
            &inputs_dir,
            None,
            1,
            None,
        );
        assert!(params.get("input_image").is_none());
    }

    #[test]
    fn build_render_params_default_advanced_resolves_auto_for_fake_profile() {
        // `AdvancedSettings::default()` carries `OffloadMode::Auto`.
        // The `fake` profile maps to the catch-all default
        let plan = sample_plan(2);
        let workdir = PathBuf::from("/runs/run-x/work");
        let inputs_dir = test_inputs_dir();
        let params = build_render_params(
            "run-x",
            &plan,
            "make video",
            None,
            None,
            None,
            &AdvancedSettings::default(),
            &workdir,
            &inputs_dir,
            None,
        );
        assert_eq!(
            params["advanced"]["offload_mode"].as_str(),
            Some("sequential"),
            "Auto on the fake profile must resolve to sequential"
        );
    }

    #[test]
    fn build_render_params_auto_resolves_to_model_for_rtx50_nvfp4() {
        let mut plan = sample_plan(1);
        plan.runtime_profile = "nexus.video.ltx23.rtx50-nvfp4".into();
        let workdir = PathBuf::from("/runs/run-y/work");
        let inputs_dir = test_inputs_dir();
        let params = build_render_params(
            "run-y",
            &plan,
            "make video",
            None,
            None,
            None,
            &AdvancedSettings::default(),
            &workdir,
            &inputs_dir,
            None,
        );
        assert_eq!(
            params["advanced"]["offload_mode"].as_str(),
            Some("model"),
            "Auto on rtx50-nvfp4 → model: the profile is NF4-quantised, \
             and bnb is incompatible with sequential offload (meta-tensor \
             copy error). enable_model_cpu_offload is the bnb-supported \
             combo; at ~22 GB its ~10 GB peak fits 16 GB (verified \
             2026-05-16)."
        );
    }

    #[test]
    fn build_render_params_explicit_offload_mode_propagates() {
        let plan = sample_plan(1);
        let workdir = PathBuf::from("/runs/run-z/work");
        let inputs_dir = test_inputs_dir();
        for (mode, expected) in [
            (OffloadMode::None, "none"),
            (OffloadMode::Model, "model"),
            (OffloadMode::Sequential, "sequential"),
        ] {
            let advanced = AdvancedSettings {
                offload_mode: mode,
                ..AdvancedSettings::default()
            };
            let params = build_render_params(
                "run-z",
                &plan,
                "make video",
                None,
                None,
                None,
                &advanced,
                &workdir,
                &inputs_dir,
                None,
            );
            assert_eq!(
                params["advanced"]["offload_mode"].as_str(),
                Some(expected),
                "explicit {mode:?} must serialise as {expected}"
            );
        }
    }

    #[test]
    fn build_render_params_offset_propagates_offload_mode() {
        // The resume + retry call paths reach the worker through
        // `build_render_params_offset` (resume) and
        let plan = sample_plan(3);
        let workdir = PathBuf::from("/runs/run-r/work");
        let inputs_dir = test_inputs_dir();
        let advanced = AdvancedSettings {
            offload_mode: OffloadMode::None,
            ..AdvancedSettings::default()
        };
        let resumed = build_render_params_offset(
            "run-r",
            &plan,
            "make video",
            None,
            None,
            None,
            &advanced,
            &workdir,
            &inputs_dir,
            None,
            1,
            None,
        );
        assert_eq!(
            resumed["advanced"]["offload_mode"].as_str(),
            Some("none"),
            "resume payload must propagate offload_mode"
        );
        let retry = build_render_params(
            "run-r",
            &plan,
            "make video",
            None,
            None,
            None,
            &advanced,
            &workdir,
            &inputs_dir,
            None,
        );
        assert_eq!(
            retry["advanced"]["offload_mode"].as_str(),
            Some("none"),
            "retry payload (build_render_params direct) must propagate offload_mode"
        );
    }

    #[test]
    fn build_advanced_block_resolves_placement_from_offload_mode() {
        // Auto on rtx50-nvfp4 → Model (bnb-quantised; sequential is
        // bnb-incompatible). placement_for_offload_mode(Model) =
        let advanced = AdvancedSettings::default();
        let block = build_advanced_block(&advanced, "nexus.video.ltx23.rtx50-nvfp4");
        assert_eq!(block["offload_mode"].as_str(), Some("model"));
        assert_eq!(
            block["component_placement"]["transformer"].as_str(),
            Some("cpu")
        );
        assert_eq!(block["component_placement"]["vae"].as_str(), Some("cuda"));
        assert_eq!(
            block["component_placement"]["text_encoder"].as_str(),
            Some("cuda")
        );
        assert_eq!(block["placement_overridden"].as_bool(), Some(false));
    }

    #[test]
    fn build_advanced_block_respects_explicit_per_component_override() {
        // Operator pins vae to CPU on top of the Auto-resolved nvfp4
        // Model placement (vae would otherwise be cuda). The explicit
        let advanced = AdvancedSettings {
            component_placement: crate::schemas::ComponentPlacement {
                transformer: crate::schemas::DevicePreference::Auto,
                vae: crate::schemas::DevicePreference::Cpu,
                text_encoder: crate::schemas::DevicePreference::Auto,
            },
            ..AdvancedSettings::default()
        };
        let block = build_advanced_block(&advanced, "nexus.video.ltx23.rtx50-nvfp4");
        assert_eq!(
            block["component_placement"]["transformer"].as_str(),
            Some("cpu")
        );
        assert_eq!(block["component_placement"]["vae"].as_str(), Some("cpu"));
        assert_eq!(
            block["component_placement"]["text_encoder"].as_str(),
            Some("cuda")
        );
        assert_eq!(block["placement_overridden"].as_bool(), Some(true));
    }

    #[test]
    fn build_advanced_block_emits_concrete_scheduler_string() {
        let advanced = AdvancedSettings {
            scheduler: crate::schemas::SchedulerChoice::FlowMatchHeun,
            ..AdvancedSettings::default()
        };
        let block = build_advanced_block(&advanced, "nexus.video.ltx23.fake");
        assert_eq!(block["scheduler"].as_str(), Some("flow_match_heun"));
    }

    #[test]
    fn build_advanced_block_omits_interpolation_when_unset() {
        // Unset → JSON null: the worker resolves env/default (the
        // LTX-Video 0.9.7 path's `overlap_blend` seam fix) rather than
        let advanced = AdvancedSettings::default();
        let block = build_advanced_block(&advanced, "nexus.video.ltx23.rtx50-ltxv097-gguf");
        assert!(block["interpolation"].is_null());
    }

    #[test]
    fn build_advanced_block_wires_upscale_flag() {
        let off = build_advanced_block(
            &AdvancedSettings::default(),
            "nexus.video.ltx23.rtx50-ltxv097-gguf",
        );
        assert!(off["upscale"].is_null());
        let on = build_advanced_block(
            &AdvancedSettings {
                upscale: Some(true),
                ..AdvancedSettings::default()
            },
            "nexus.video.ltx23.rtx50-ltxv097-gguf",
        );
        assert_eq!(on["upscale"].as_bool(), Some(true));
    }

    #[test]
    fn build_advanced_block_emits_every_param_when_fully_populated() {
        // Codex risk control: a fully-set AdvancedSettings must reach
        // the worker with NO field silently dropped to a default.
        let advanced = AdvancedSettings {
            decode_noise_scale: Some(0.03),
            condition_strength: Some(0.65),
            condition_tail_frames: Some(32),
            seam_overlap_frames: Some(12),
            seam_blend_frames: Some(4),
            seam_color_match: Some(false),
            upscale: Some(true),
            upscale_mode: Some("decoupled".into()),
            model_id: Some("ltxv-13b-0.9.7-dev-Q4_K_M.gguf".into()),
            vae_tiling: Some("aggressive".into()),
            interpolation: Some(crate::schemas::InterpolationMethod::Film),
            ..AdvancedSettings::default()
        };
        let b = build_advanced_block(&advanced, "nexus.video.ltx23.rtx50-ltxv097-gguf");
        assert!((b["decode_noise_scale"].as_f64().unwrap() - 0.03).abs() < 1e-6);
        assert!((b["condition_strength"].as_f64().unwrap() - 0.65).abs() < 1e-6);
        assert_eq!(b["condition_tail_frames"].as_u64(), Some(32));
        assert_eq!(b["seam_overlap_frames"].as_u64(), Some(12));
        assert_eq!(b["seam_blend_frames"].as_u64(), Some(4));
        assert_eq!(b["seam_color_match"].as_bool(), Some(false));
        assert_eq!(b["upscale"].as_bool(), Some(true));
        assert_eq!(b["upscale_mode"].as_str(), Some("decoupled"));
        assert_eq!(
            b["model_id"].as_str(),
            Some("ltxv-13b-0.9.7-dev-Q4_K_M.gguf")
        );
        assert_eq!(b["vae_tiling"].as_str(), Some("aggressive"));
        assert_eq!(b["interpolation"].as_str(), Some("film"));
        // Unset → null so the worker keeps its own SoT default.
        let d = build_advanced_block(&AdvancedSettings::default(), "nexus.video.ltx23.fake");
        for k in [
            "decode_noise_scale",
            "condition_strength",
            "condition_tail_frames",
            "seam_overlap_frames",
            "seam_blend_frames",
            "seam_color_match",
            "upscale_mode",
            "model_id",
            "vae_tiling",
        ] {
            assert!(d[k].is_null(), "{k} must be null when unset");
        }
    }

    #[test]
    fn build_advanced_block_serialises_explicit_seam_method() {
        for (method, wire) in [
            (
                crate::schemas::InterpolationMethod::OverlapBlend,
                "overlap_blend",
            ),
            (crate::schemas::InterpolationMethod::Film, "film"),
            (crate::schemas::InterpolationMethod::None, "none"),
        ] {
            let advanced = AdvancedSettings {
                interpolation: Some(method),
                ..AdvancedSettings::default()
            };
            let block = build_advanced_block(&advanced, "nexus.video.ltx23.rtx50-ltxv097-gguf");
            assert_eq!(block["interpolation"].as_str(), Some(wire));
        }
    }

    #[test]
    fn build_advanced_block_explicit_quant_propagates_verbatim() {
        // An explicit operator choice always wins over the per-profile
        // default, on any profile.
        for (variant, expected) in [
            (crate::schemas::ModelQuant::Nf4Bnb, "nf4"),
            (crate::schemas::ModelQuant::Int8, "int8"),
            (crate::schemas::ModelQuant::Nvfp4, "nvfp4"),
            (crate::schemas::ModelQuant::Gguf, "gguf"),
            (crate::schemas::ModelQuant::Fp8Official, "fp8"),
        ] {
            let advanced = AdvancedSettings {
                quantization: variant,
                ..AdvancedSettings::default()
            };
            let block = build_advanced_block(&advanced, "nexus.video.ltx23.fake");
            assert_eq!(
                block["quantization"].as_str(),
                Some(expected),
                "variant={variant:?}"
            );
        }
    }

    #[test]
    fn build_advanced_block_nvfp4_default_quant_is_nf4_bnb() {
        // Real NVFP4 is host-blocked / under construction, so with
        // quant left at the default None the `rtx50-nvfp4` profile
        let advanced = AdvancedSettings::default();
        let block = build_advanced_block(&advanced, "nexus.video.ltx23.rtx50-nvfp4");
        assert_eq!(block["quantization"].as_str(), Some("nf4"));
        // Model offload — the bnb-compatible 16 GB pairing.
        assert_eq!(block["offload_mode"].as_str(), Some("model"));
    }

    #[test]
    fn build_advanced_block_fake_profile_default_quant_is_none() {
        let advanced = AdvancedSettings::default();
        let block = build_advanced_block(&advanced, "nexus.video.ltx23.fake");
        assert_eq!(block["quantization"].as_str(), Some("none"));
    }

    #[test]
    fn build_advanced_block_serialises_three_hyperparameters_as_numbers() {
        let advanced = AdvancedSettings {
            decode_timestep: Some(0.07),
            image_cond_noise_scale: Some(0.04),
            guidance_rescale: Some(0.6),
            ..AdvancedSettings::default()
        };
        let block = build_advanced_block(&advanced, "nexus.video.ltx23.fake");
        assert!((block["decode_timestep"].as_f64().unwrap() - 0.07).abs() < 1e-5);
        assert!((block["image_cond_noise_scale"].as_f64().unwrap() - 0.04).abs() < 1e-5);
        assert!((block["guidance_rescale"].as_f64().unwrap() - 0.6).abs() < 1e-5);
    }

    #[test]
    fn build_advanced_block_omits_hyperparameters_as_null_when_unset() {
        let block = build_advanced_block(&AdvancedSettings::default(), "nexus.video.ltx23.fake");
        assert!(block["decode_timestep"].is_null());
        assert!(block["image_cond_noise_scale"].is_null());
        assert!(block["guidance_rescale"].is_null());
    }

    #[test]
    fn build_advanced_block_propagates_max_gpu_vram_gib_as_number() {
        let advanced = AdvancedSettings {
            max_gpu_vram_gib: Some(15),
            ..AdvancedSettings::default()
        };
        let block = build_advanced_block(&advanced, "nexus.video.ltx23.rtx50-nvfp4");
        assert_eq!(block["max_gpu_vram_gib"].as_u64(), Some(15));
    }

    #[test]
    fn build_advanced_block_max_gpu_vram_gib_null_when_unset() {
        let block = build_advanced_block(&AdvancedSettings::default(), "nexus.video.ltx23.fake");
        assert!(block["max_gpu_vram_gib"].is_null());
    }

    #[test]
    fn build_render_params_offset_zero_offset_equivalent_to_full_chain() {
        let plan = sample_plan(4);
        let workdir = PathBuf::from("/runs/run-x/work");
        let inputs_dir = test_inputs_dir();
        let full = build_render_params(
            "run-x",
            &plan,
            "make video",
            None,
            None,
            None,
            &AdvancedSettings::default(),
            &workdir,
            &inputs_dir,
            None,
        );
        let offset_zero = build_render_params_offset(
            "run-x",
            &plan,
            "make video",
            None,
            None,
            None,
            &AdvancedSettings::default(),
            &workdir,
            &inputs_dir,
            None,
            0,
            None,
        );
        // resumed_from_segment field differs (0 vs absent), but the
        // segments array should be byte-identical.
        assert_eq!(full["video"]["segments"], offset_zero["video"]["segments"],);
    }

    // ── Input-image resolver + injection (T4-T7, T13) ────────────────

    fn write_test_image(dir: &std::path::Path, id: &str, ext: &str) -> std::path::PathBuf {
        let path = dir.join(format!("{id}.{ext}"));
        std::fs::write(&path, b"\x89PNG\r\n\x1a\nfake").expect("write test image");
        path
    }

    #[test]
    fn build_render_params_injects_input_image_when_artifact_resolves() {
        // T4 — resolver hits an on-disk file → input_image.path lands
        // in the worker payload pointing at that file.
        let tmp = tempfile::tempdir().expect("tempdir");
        let id = "ltx23-input-01J9ABCDEFGHJKMNPQRSTVWXYZ";
        let written = write_test_image(tmp.path(), id, "png");

        let plan = sample_plan(2);
        let workdir = PathBuf::from("/runs/run-x/work");
        let params = build_render_params(
            "run-x",
            &plan,
            "make video",
            None,
            None,
            None,
            &AdvancedSettings::default(),
            &workdir,
            tmp.path(),
            Some(id),
        );

        let path_in_payload = params["input_image"]["path"]
            .as_str()
            .expect("input_image.path must be present when artifact resolves");
        let canon_expected = std::fs::canonicalize(&written).expect("canonicalize written");
        // The payload path is the resolver's canonical absolute form.
        // Compare canonical-to-canonical to avoid UNC/symlink mismatches
        let canon_actual = std::fs::canonicalize(std::path::Path::new(path_in_payload))
            .expect("canonicalize actual");
        assert_eq!(canon_actual, canon_expected);
    }

    #[test]
    fn build_render_params_omits_input_image_when_artifact_id_is_none() {
        // T5 — no artifact id → no `input_image` key in the payload.
        let tmp = tempfile::tempdir().expect("tempdir");
        let plan = sample_plan(2);
        let workdir = PathBuf::from("/runs/run-x/work");
        let params = build_render_params(
            "run-x",
            &plan,
            "make video",
            None,
            None,
            None,
            &AdvancedSettings::default(),
            &workdir,
            tmp.path(),
            None,
        );
        assert!(params.get("input_image").is_none());
    }

    #[test]
    fn build_render_params_omits_input_image_when_artifact_id_misses() {
        // T6 — id has the right shape but no file matches → soft-fail,
        // payload omits the field. The render proceeds text-only with
        let tmp = tempfile::tempdir().expect("tempdir");
        let plan = sample_plan(2);
        let workdir = PathBuf::from("/runs/run-x/work");
        let params = build_render_params(
            "run-x",
            &plan,
            "make video",
            None,
            None,
            None,
            &AdvancedSettings::default(),
            &workdir,
            tmp.path(),
            Some("ltx23-input-MISSINGNOFILEONDISK"),
        );
        assert!(params.get("input_image").is_none());
    }

    #[test]
    fn resolve_input_image_path_rejects_bad_id_shape() {
        // T7a — even if a file exists at the literal path, an invalid
        // id shape returns None before any filesystem access.
        let tmp = tempfile::tempdir().expect("tempdir");
        let _ = write_test_image(tmp.path(), "../escape", "png");
        // No actual file matches the canonical shape — but the
        // validator rejects the shape regardless.
        let resolved = resolve_input_image_path(tmp.path(), "../escape");
        assert!(resolved.is_none(), "bad id shape must not resolve");
    }

    #[test]
    fn resolve_input_image_path_returns_under_inputs_dir() {
        // T7b — happy-path resolver result must be a canonical
        // descendant of inputs_dir. The build_render_params caller
        let tmp = tempfile::tempdir().expect("tempdir");
        let id = "ltx23-input-01J9HAPPYCASE";
        let _ = write_test_image(tmp.path(), id, "jpg");

        let inputs_canon = std::fs::canonicalize(tmp.path()).expect("canonicalize inputs");
        let resolved =
            resolve_input_image_path(tmp.path(), id).expect("happy-path id must resolve");
        assert!(resolved.starts_with(&inputs_canon));
    }

    #[test]
    fn build_render_params_offset_resume_path_overrides_uploaded_image() {
        // T13 — resume invariant. When `build_render_params_offset`
        // runs with both an uploaded artifact id AND a cond_image_path
        let tmp = tempfile::tempdir().expect("tempdir");
        let id = "ltx23-input-01J9UPLOAD";
        let _ = write_test_image(tmp.path(), id, "webp");

        let plan = sample_plan(3);
        let workdir = PathBuf::from("/runs/run-resume/work");
        let cond = std::path::PathBuf::from("/runs/run-resume/work/segments/000/last_frame.png");
        let params = build_render_params_offset(
            "run-resume",
            &plan,
            "make video",
            None,
            None,
            None,
            &AdvancedSettings::default(),
            &workdir,
            tmp.path(),
            Some(id),
            1,
            Some(cond.as_path()),
        );
        let injected = params["input_image"]["path"]
            .as_str()
            .expect("resume path must inject input_image");
        // The resume cond_image wins — payload points at last_frame.png,
        // NOT at the operator's webp upload under tmp.path().
        assert!(injected.contains("last_frame.png"));
        assert!(!injected.contains(id));
    }

    #[tokio::test]
    async fn handle_notification_memory_stats_breach_sets_latch_no_outcome() {
        let runner = empty_runner().await;
        let latch = BreachLatch::default();
        let breach_payload = serde_json::json!({
            "run_id": "run-x",
            "num_ooms": 10, // exceeds default max=1
        });
        let note = nexus_backend_runtimes::generic::leases::trait_def::LeaseNotification {
            method: "runtime.memory_stats".into(),
            params: breach_payload,
        };
        let outcome = handle_notification(
            &runner.cfg,
            "run-x",
            std::path::Path::new("/tmp"),
            &note,
            &latch,
            "nexus.video.ltx23.fake",
            4,
        )
        .await
        .expect("handler should not error");
        assert!(outcome.is_none(), "breach must not return outcome directly");
        assert!(
            latch.reason.lock().await.is_some(),
            "breach must populate latch"
        );
    }

    #[tokio::test]
    async fn handle_notification_memory_stats_healthy_leaves_latch_clear() {
        let runner = empty_runner().await;
        let latch = BreachLatch::default();
        let healthy_payload = serde_json::json!({
            "run_id": "run-x",
            "num_ooms": 0,
            "num_alloc_retries": 1,
            "frag_ratio": 0.1,
            "free_mb": 8000,
        });
        let note = nexus_backend_runtimes::generic::leases::trait_def::LeaseNotification {
            method: "runtime.memory_stats".into(),
            params: healthy_payload,
        };
        let outcome = handle_notification(
            &runner.cfg,
            "run-x",
            std::path::Path::new("/tmp"),
            &note,
            &latch,
            "nexus.video.ltx23.fake",
            4,
        )
        .await
        .expect("handler should not error");
        assert!(outcome.is_none());
        assert!(latch.reason.lock().await.is_none());
    }

    // ── supervisor false-positive guards ─────────────────────────────

    #[test]
    fn restart_outcome_restarts_when_chain_has_more_segments() {
        let outcome = restart_outcome_for_latched_breach("frag spike", 1, 4)
            .expect("mid-chain breach must request a restart");
        match outcome {
            NotificationOutcome::RestartRequired {
                reason,
                last_completed_segment,
            } => {
                assert_eq!(reason, "frag spike");
                assert_eq!(last_completed_segment, 1);
            }
            _ => panic!("expected RestartRequired"),
        }
    }

    #[test]
    fn restart_outcome_benign_on_final_segment() {
        // Last segment (index 3 of a 4-segment chain) just landed —
        // the render is complete, a latched breach is moot.
        assert!(restart_outcome_for_latched_breach("frag spike", 3, 4).is_none());
    }

    #[test]
    fn restart_outcome_benign_when_index_at_or_beyond_total() {
        // Defensive: an out-of-range index must also be treated as
        // "nothing left to restart" rather than panicking or looping.
        assert!(restart_outcome_for_latched_breach("x", 4, 4).is_none());
        assert!(restart_outcome_for_latched_breach("x", 9, 4).is_none());
    }

    #[test]
    fn evaluate_memory_stats_fp8_profiles_ignore_benign_fragmentation() {
        // The reported false-positive: offloaded fp8/nvfp4 end every
        // healthy render at frag_ratio ≈ 0.995 — must NOT breach.
        let supervisor = VramSupervisor::default();
        let stats = serde_json::json!({
            "num_ooms": 0,
            "num_alloc_retries": 1,
            "frag_ratio": 0.995,
            "free_mb": 8000,
        });
        for profile in [
            "nexus.video.ltx23.rtx50-nvfp4",
            "nexus.video.ltx23.rtx50-fp8",
            "nexus.video.ltx23.rtx40-fp8",
        ] {
            assert_eq!(
                evaluate_memory_stats(&supervisor, profile, &stats),
                VramVerdict::Healthy,
                "profile={profile} benign post-render frag must not breach"
            );
        }
    }

    #[test]
    fn evaluate_memory_stats_fake_profile_still_breaches_high_frag() {
        // Genuine mid-render breach on the tight-ceiling profile.
        let supervisor = VramSupervisor::default();
        let stats = serde_json::json!({"frag_ratio": 0.995});
        match evaluate_memory_stats(&supervisor, "nexus.video.ltx23.fake", &stats) {
            VramVerdict::Breach { reason } => assert!(reason.contains("frag_ratio")),
            VramVerdict::Healthy => panic!("fake profile must keep the 0.30 ceiling"),
        }
    }

    #[test]
    fn evaluate_memory_stats_real_oom_breaches_even_on_fp8() {
        // Disabling frag for fp8 must not mask a real OOM.
        let supervisor = VramSupervisor::default();
        let stats = serde_json::json!({"frag_ratio": 0.999, "num_ooms": 10});
        match evaluate_memory_stats(&supervisor, "nexus.video.ltx23.rtx50-nvfp4", &stats) {
            VramVerdict::Breach { reason } => assert!(reason.contains("num_ooms=10")),
            VramVerdict::Healthy => panic!("real OOM must still breach on fp8"),
        }
    }

    #[tokio::test]
    async fn handle_notification_final_segment_breach_is_benign() {
        let runner = empty_runner().await;
        let latch = BreachLatch::default();
        latch
            .set("frag_ratio=0.995 exceeded max=0.300".into())
            .await;
        // Segment index 3 of a 4-segment chain = the final segment.
        let note = nexus_backend_runtimes::generic::leases::trait_def::LeaseNotification {
            method: "ltx.video.segment.completed".into(),
            params: serde_json::json!({"run_id": "run-x", "segment_index": 3}),
        };
        let outcome = handle_notification(
            &runner.cfg,
            "run-x",
            std::path::Path::new("/tmp"),
            &note,
            &latch,
            "nexus.video.ltx23.rtx50-nvfp4",
            4,
        )
        .await
        .expect("handler should not error");
        assert!(
            outcome.is_none(),
            "breach on the final segment must NOT abort a finished render"
        );
        assert!(
            latch.reason.lock().await.is_none(),
            "latch must still be consumed even on the benign path"
        );
    }

    #[tokio::test]
    async fn handle_notification_midchain_segment_breach_restarts() {
        let runner = empty_runner().await;
        let latch = BreachLatch::default();
        latch.set("num_ooms=2 exceeded max=1".into()).await;
        // Segment index 1 of a 4-segment chain = more work remains.
        let note = nexus_backend_runtimes::generic::leases::trait_def::LeaseNotification {
            method: "ltx.video.segment.completed".into(),
            params: serde_json::json!({"run_id": "run-x", "segment_index": 1}),
        };
        let outcome = handle_notification(
            &runner.cfg,
            "run-x",
            std::path::Path::new("/tmp"),
            &note,
            &latch,
            "nexus.video.ltx23.rtx50-nvfp4",
            4,
        )
        .await
        .expect("handler should not error");
        match outcome {
            Some(NotificationOutcome::RestartRequired {
                last_completed_segment,
                ..
            }) => assert_eq!(last_completed_segment, 1),
            _ => panic!("expected RestartRequired"),
        }
    }

    #[tokio::test]
    async fn cancel_targets_only_requested_run_id() {
        let runner = empty_runner().await;
        let kept = runner.register_test_canceller("run-keep".into()).await;
        let killed = runner.register_test_canceller("run-kill".into()).await;

        let kept_waiter = tokio::spawn(async move { kept.notified().await });
        let killed_waiter = tokio::spawn(async move { killed.notified().await });
        tokio::task::yield_now().await;

        let outcome = runner.cancel("run-kill").await;
        assert_eq!(outcome, CancelOutcome::Signalled);

        // The killed waiter completes; the kept waiter must NOT wake.
        tokio::time::timeout(Duration::from_millis(200), killed_waiter)
            .await
            .expect("killed waiter should fire")
            .expect("waiter task should not panic");

        let kept_result = tokio::time::timeout(Duration::from_millis(50), kept_waiter).await;
        assert!(
            kept_result.is_err(),
            "kept waiter should still be parked, not woken"
        );
    }

    // ── Rung 7L: end-to-end restart-loop orchestration ────────────────
    //
    mod orchestration {
        use super::super::*;
        use crate::lease::LeaseAcquirer;
        use crate::schemas::{
            AdvancedSettings, InterpolationMethod, RenderMode, RenderPlan, RenderSegmentPlan,
            VramRisk,
        };
        use crate::storage::{RenderRunRow, Repos};
        use crate::vram_supervisor::{VramSupervisor, VramSupervisorConfig};
        use async_trait::async_trait;
        use chrono::Utc;
        use nexus_backend_runtimes::generic::enums::LeaseState;
        use nexus_backend_runtimes::generic::ids::RuntimeLeaseId;
        use nexus_backend_runtimes::generic::leases::error::LeaseError;
        use nexus_backend_runtimes::generic::leases::trait_def::{
            BackendRuntimeLease, LeaseNotification,
        };
        use sqlx::sqlite::SqlitePoolOptions;
        use std::path::PathBuf;
        use std::sync::atomic::{AtomicUsize, Ordering};
        use std::sync::Arc;
        use std::time::Duration;
        use tokio::sync::{broadcast, Notify};

        /// Per-lease handle the test keeps to inject notifications and
        /// watch lifecycle state. The matching `FakeLease` (handed to
        /// the runner) shares the same sender + counters via `Arc`.
        struct LeaseHandle {
            tx: broadcast::Sender<LeaseNotification>,
            subscribed_count: Arc<AtomicUsize>,
            release_count: Arc<AtomicUsize>,
        }

        struct FakeLease {
            id: RuntimeLeaseId,
            tx: broadcast::Sender<LeaseNotification>,
            subscribed_count: Arc<AtomicUsize>,
            release_count: Arc<AtomicUsize>,
        }

        #[async_trait]
        impl BackendRuntimeLease for FakeLease {
            fn id(&self) -> RuntimeLeaseId {
                self.id
            }

            fn state(&self) -> LeaseState {
                LeaseState::Ready
            }

            async fn send_rpc(
                &self,
                _method: &str,
                _params: serde_json::Value,
            ) -> std::result::Result<serde_json::Value, LeaseError> {
                // Worker would parse render.start and start emitting
                // segment notifications. Tests drive the notifications
                Ok(serde_json::Value::Null)
            }

            fn subscribe_notifications(&self) -> broadcast::Receiver<LeaseNotification> {
                self.subscribed_count.fetch_add(1, Ordering::SeqCst);
                self.tx.subscribe()
            }

            async fn release(&self) -> std::result::Result<(), LeaseError> {
                self.release_count.fetch_add(1, Ordering::SeqCst);
                Ok(())
            }
        }

        struct FakeLeaseAcquirer {
            handles: tokio::sync::Mutex<Vec<Arc<LeaseHandle>>>,
            acquire_count: AtomicUsize,
            new_acquire: Notify,
        }

        impl FakeLeaseAcquirer {
            fn new() -> Self {
                Self {
                    handles: tokio::sync::Mutex::new(Vec::new()),
                    acquire_count: AtomicUsize::new(0),
                    new_acquire: Notify::new(),
                }
            }

            async fn wait_for_lease(&self, n: usize) -> Arc<LeaseHandle> {
                // Spin with a Notify wake on each new acquire; bounded by
                // the outer test timeout via tokio::time::timeout.
                loop {
                    if self.acquire_count.load(Ordering::SeqCst) >= n {
                        return self.handles.lock().await[n - 1].clone();
                    }
                    let wait = self.new_acquire.notified();
                    tokio::pin!(wait);
                    if self.acquire_count.load(Ordering::SeqCst) >= n {
                        return self.handles.lock().await[n - 1].clone();
                    }
                    wait.await;
                }
            }
        }

        #[async_trait]
        impl LeaseAcquirer for FakeLeaseAcquirer {
            async fn acquire_lease(&self, _profile: &str) -> Result<Arc<dyn BackendRuntimeLease>> {
                let (tx, _) = broadcast::channel::<LeaseNotification>(1024);
                let subscribed_count = Arc::new(AtomicUsize::new(0));
                let release_count = Arc::new(AtomicUsize::new(0));
                let lease: Arc<dyn BackendRuntimeLease> = Arc::new(FakeLease {
                    id: RuntimeLeaseId::new(),
                    tx: tx.clone(),
                    subscribed_count: subscribed_count.clone(),
                    release_count: release_count.clone(),
                });
                self.handles.lock().await.push(Arc::new(LeaseHandle {
                    tx,
                    subscribed_count,
                    release_count,
                }));
                self.acquire_count.fetch_add(1, Ordering::SeqCst);
                self.new_acquire.notify_waiters();
                Ok(lease)
            }
        }

        async fn wait_subscribed(handle: &LeaseHandle) {
            // Subscribed status flips before the runner calls send_rpc,
            // which runs on the same task — yield until visible.
            tokio::time::timeout(Duration::from_secs(5), async {
                while handle.subscribed_count.load(Ordering::SeqCst) == 0 {
                    tokio::task::yield_now().await;
                }
            })
            .await
            .expect("subscribe should land within 5s");
        }

        async fn apply_test_migrations(pool: &sqlx::SqlitePool) {
            sqlx::query(
                "CREATE TABLE IF NOT EXISTS ext_nexus_video_ltx23__schema_versions (\
                     version INTEGER PRIMARY KEY,\
                     name TEXT NOT NULL,\
                     applied_at TEXT NOT NULL\
                 )",
            )
            .execute(pool)
            .await
            .expect("create schema_versions");

            for migration in crate::migrations::MIGRATIONS {
                let already: Option<i64> = sqlx::query_scalar(
                    "SELECT version FROM ext_nexus_video_ltx23__schema_versions WHERE version = ?",
                )
                .bind(i64::from(migration.version))
                .fetch_optional(pool)
                .await
                .expect("query schema version");
                if already.is_some() {
                    continue;
                }
                let mut tx = pool.begin().await.expect("begin");
                sqlx::raw_sql(migration.sql)
                    .execute(&mut *tx)
                    .await
                    .unwrap_or_else(|e| panic!("apply migration {}: {e}", migration.version));
                sqlx::query(
                    "INSERT INTO ext_nexus_video_ltx23__schema_versions (version, name, applied_at) VALUES (?, ?, ?)",
                )
                .bind(i64::from(migration.version))
                .bind(migration.name)
                .bind(Utc::now().to_rfc3339())
                .execute(&mut *tx)
                .await
                .expect("record schema version");
                tx.commit().await.expect("commit migration");
            }
        }

        fn linear_plan(seg_count: u32) -> RenderPlan {
            // Test inputs stay within u16 range; mirror the
            // `sample_plan` idiom used elsewhere in this module so
            let total_secs = f32::from(u16::try_from(seg_count * 4).unwrap_or(0));
            RenderPlan {
                mode: RenderMode::ExternalSegments,
                width: 832,
                height: 480,
                base_fps: 24,
                output_fps: 48,
                requested_duration_seconds: total_secs,
                planned_duration_seconds: total_secs,
                segment_count: seg_count,
                segments: (0..seg_count)
                    .map(|i| RenderSegmentPlan {
                        index: i,
                        start_time_seconds: f32::from(u16::try_from(i * 4).unwrap_or(0)),
                        duration_seconds: 4.0,
                        overlap_seconds: 0.0,
                        frame_count: 97,
                        seed: u64::from(i),
                        action_prompt: Some(format!("scene {i}")),
                    })
                    .collect(),
                runtime_profile: "nexus.video.ltx23.fake".into(),
                gpu_memory_budget_mb: 16_384,
                interpolation: InterpolationMethod::Rife2x,
                warnings: vec![],
                vram_risk: VramRisk::Safe,
            }
        }

        async fn build_runner(
            runs_dir: PathBuf,
            acquirer: Arc<FakeLeaseAcquirer>,
            supervisor: VramSupervisor,
        ) -> (RunnerConfig, Repos) {
            let pool = SqlitePoolOptions::new()
                .max_connections(4)
                .connect("sqlite::memory:")
                .await
                .expect("open in-memory sqlite");
            apply_test_migrations(&pool).await;
            let repos = Repos::from_pool(pool);
            // Item B: each test spins up its own flusher. Use the
            // production cadence — fast enough that segment status
            let (notification_buffer, _flusher_handle) =
                crate::notification_buffer::NotificationBuffer::new(
                    repos.clone(),
                    crate::notification_buffer::DEFAULT_FLUSH_INTERVAL,
                );
            // Mirror production layout — inputs_dir is a sibling of
            // runs_dir under the per-extension data root. Tests rarely
            let inputs_dir = runs_dir
                .parent()
                .map_or_else(|| runs_dir.join("inputs"), |p| p.join("inputs"));
            std::fs::create_dir_all(&inputs_dir).expect("mkdir inputs");
            let cfg = RunnerConfig {
                runs_dir,
                inputs_dir,
                repos: repos.clone(),
                factory: acquirer,
                vram_supervisor: supervisor,
                notification_buffer,
            };
            (cfg, repos)
        }

        async fn insert_test_run(
            repos: &Repos,
            run_id: &str,
            plan: &RenderPlan,
            max_restarts: u32,
        ) {
            let now = Utc::now();
            repos
                .insert_run(&RenderRunRow {
                    id: run_id.to_string(),
                    project_id: "test-project".into(),
                    status: "queued".into(),
                    runtime_profile: Some(plan.runtime_profile.clone()),
                    requested_duration_seconds: f64::from(plan.requested_duration_seconds),
                    planned_duration_seconds: Some(f64::from(plan.planned_duration_seconds)),
                    width: i64::from(plan.width),
                    height: i64::from(plan.height),
                    base_fps: i64::from(plan.base_fps),
                    output_fps: i64::from(plan.output_fps),
                    segment_count: i64::from(plan.segment_count),
                    seed: None,
                    quality_preset: "balanced".into(),
                    render_mode: "external_segments".into(),
                    request_json: "{}".into(),
                    plan_json: Some("{}".into()),
                    error_code: None,
                    error_message: None,
                    final_artifact_id: None,
                    created_at: now,
                    started_at: None,
                    completed_at: None,
                    cancelled_at: None,
                    restart_count: 0,
                    max_restart_count: i64::from(max_restarts),
                    last_breach_reason: None,
                })
                .await
                .expect("insert run row");
        }

        fn note(method: &str, run_id: &str, extra: serde_json::Value) -> LeaseNotification {
            let mut params = serde_json::Map::new();
            params.insert("run_id".into(), serde_json::Value::String(run_id.into()));
            if let serde_json::Value::Object(extra_obj) = extra {
                for (k, v) in extra_obj {
                    params.insert(k, v);
                }
            }
            LeaseNotification {
                method: method.into(),
                params: serde_json::Value::Object(params),
            }
        }

        fn drive_segment(handle: &LeaseHandle, run_id: &str, seg_idx: i64) {
            handle
                .tx
                .send(note(
                    "ltx.video.segment.started",
                    run_id,
                    serde_json::json!({ "segment_index": seg_idx }),
                ))
                .expect("send segment.started");
            handle
                .tx
                .send(note(
                    "ltx.video.segment.completed",
                    run_id,
                    serde_json::json!({ "segment_index": seg_idx }),
                ))
                .expect("send segment.completed");
        }

        /// Memory-stats payload that breaches the `num_ooms` default-1 cap.
        fn breach_payload() -> serde_json::Value {
            serde_json::json!({ "num_ooms": 7 })
        }

        // Rung 7L happy path: supervisor trips after segment 0 completes,
        // latch consumed by segment 1, runner releases first lease and
        #[tokio::test(flavor = "current_thread", start_paused = false)]
        async fn rung7l_outer_loop_resumes_after_one_breach() {
            let tmp = tempfile::tempdir().expect("tmp");
            let runs_dir = tmp.path().to_path_buf();
            let run_id = "run-rung7l-happy";
            let acquirer = Arc::new(FakeLeaseAcquirer::new());

            // Strict supervisor: num_ooms=1 cap so the test payload trips.
            let supervisor = VramSupervisor::new(VramSupervisorConfig {
                max_num_ooms: 1,
                ..VramSupervisorConfig::default()
            });

            let (cfg, repos) = build_runner(runs_dir.clone(), acquirer.clone(), supervisor).await;
            let plan = linear_plan(4);
            insert_test_run(&repos, run_id, &plan, 3).await;

            // Pre-stage final.mp4 inside the workdir the runner will mkdir;
            // the runner copies this path into <runs_dir>/<run_id>/final.mp4.
            let workdir = runs_dir.join(run_id).join("work");
            tokio::fs::create_dir_all(&workdir)
                .await
                .expect("mkdir workdir");
            let final_path = workdir.join("final.mp4");
            tokio::fs::write(&final_path, b"fake mp4 bytes")
                .await
                .expect("write final.mp4");

            let cfg_for_task = cfg.clone();
            let plan_for_task = plan.clone();
            let run_id_owned = run_id.to_string();
            let task = tokio::spawn(async move {
                run_via_lease(
                    &cfg_for_task,
                    &run_id_owned,
                    "nexus.video.ltx23.fake",
                    &plan_for_task,
                    "test prompt",
                    None,
                    None,
                    None,
                    None,
                    &AdvancedSettings::default(),
                    Arc::new(Notify::new()),
                )
                .await
            });

            // First lease: drive seg 0 → memory_stats breach → seg 1
            // completion consumes the latch → RestartRequired.
            let lease1 = acquirer.wait_for_lease(1).await;
            wait_subscribed(&lease1).await;
            drive_segment(&lease1, run_id, 0);
            lease1
                .tx
                .send(note("runtime.memory_stats", run_id, breach_payload()))
                .expect("send memory_stats");
            // Segment 1 started + completed — the completed arm consumes
            // the latch and emits RestartRequired{last_completed_segment:1}.
            drive_segment(&lease1, run_id, 1);

            // Second lease: drive remaining segments + done.
            let lease2 = acquirer.wait_for_lease(2).await;
            wait_subscribed(&lease2).await;
            drive_segment(&lease2, run_id, 2);
            drive_segment(&lease2, run_id, 3);
            lease2
                .tx
                .send(LeaseNotification {
                    method: "ltx.video.done".into(),
                    params: serde_json::json!({
                        "run_id": run_id,
                        "final_path": final_path.to_string_lossy(),
                    }),
                })
                .expect("send done");

            // Render should resolve cleanly.
            let outcome = tokio::time::timeout(Duration::from_secs(10), task)
                .await
                .expect("task should complete within 10s")
                .expect("task panicked");
            outcome.expect("run_via_lease should return Ok after restart");

            // Persisted counter reflects exactly one restart attempt.
            let run = repos.get_run(run_id).await.expect("get_run");
            assert_eq!(
                run.restart_count, 1,
                "expected restart_count=1 after one transparent restart"
            );
            assert_eq!(run.status, "completed");
            // Item D: breach reason persists across the restart so the
            // UI tooltip survives into the completed-state DTO.
            assert!(
                run.last_breach_reason.is_some(),
                "expected last_breach_reason to be persisted after a breach"
            );
            assert!(
                run.last_breach_reason
                    .as_deref()
                    .unwrap_or("")
                    .contains("num_ooms"),
                "expected breach reason to mention num_ooms, got {:?}",
                run.last_breach_reason
            );
            assert_eq!(
                acquirer.acquire_count.load(Ordering::SeqCst),
                2,
                "expected exactly two lease acquires (initial + restart)"
            );
            // Both leases released by the runner's lease lifecycle.
            assert_eq!(
                lease1.release_count.load(Ordering::SeqCst),
                1,
                "first lease should be released exactly once"
            );
            assert_eq!(
                lease2.release_count.load(Ordering::SeqCst),
                1,
                "second lease should be released exactly once"
            );
        }

        // Rung 7L safety net: budget=1 means the runner accepts one
        // restart, then collapses the next breach into a `vram_supervisor`
        #[tokio::test(flavor = "current_thread", start_paused = false)]
        #[serial_test::serial(max_restarts_env)]
        async fn rung7l_outer_loop_halts_when_restart_budget_exhausted() {
            let tmp = tempfile::tempdir().expect("tmp");
            let runs_dir = tmp.path().to_path_buf();
            let run_id = "run-rung7l-exhausted";
            let acquirer = Arc::new(FakeLeaseAcquirer::new());
            let supervisor = VramSupervisor::new(VramSupervisorConfig {
                max_num_ooms: 1,
                ..VramSupervisorConfig::default()
            });

            let (cfg, repos) = build_runner(runs_dir.clone(), acquirer.clone(), supervisor).await;
            let plan = linear_plan(6);
            insert_test_run(&repos, run_id, &plan, 1).await;

            // Constrain restart budget for this test only; reset before
            // returning so concurrent tests don't see a leaked override.
            std::env::set_var(MAX_RESTARTS_ENV, "1");

            // Workdir must exist before run_via_lease's create_dir_all so
            // the test doesn't race on directory creation. The Error arm
            let workdir = runs_dir.join(run_id).join("work");
            tokio::fs::create_dir_all(&workdir)
                .await
                .expect("mkdir workdir");

            let cfg_for_task = cfg.clone();
            let plan_for_task = plan.clone();
            let run_id_owned = run_id.to_string();
            let task = tokio::spawn(async move {
                run_via_lease(
                    &cfg_for_task,
                    &run_id_owned,
                    "nexus.video.ltx23.fake",
                    &plan_for_task,
                    "test prompt",
                    None,
                    None,
                    None,
                    None,
                    &AdvancedSettings::default(),
                    Arc::new(Notify::new()),
                )
                .await
            });

            // Iteration 0: breach after seg 0; latch consumed by seg 1
            // → RestartRequired. restart_attempts becomes 1, not over
            let lease1 = acquirer.wait_for_lease(1).await;
            wait_subscribed(&lease1).await;
            drive_segment(&lease1, run_id, 0);
            lease1
                .tx
                .send(note("runtime.memory_stats", run_id, breach_payload()))
                .expect("send memory_stats #1");
            drive_segment(&lease1, run_id, 1);

            // Iteration 1: breach after seg 2; latch consumed by seg 3
            // → RestartRequired. restart_attempts becomes 2, > budget(1)
            let lease2 = acquirer.wait_for_lease(2).await;
            wait_subscribed(&lease2).await;
            drive_segment(&lease2, run_id, 2);
            lease2
                .tx
                .send(note("runtime.memory_stats", run_id, breach_payload()))
                .expect("send memory_stats #2");
            drive_segment(&lease2, run_id, 3);

            let outcome = tokio::time::timeout(Duration::from_secs(10), task)
                .await
                .expect("task should complete within 10s")
                .expect("task panicked");

            // Restore env BEFORE asserting so a failed assert doesn't
            // leak the override into the next test in this binary.
            std::env::remove_var(MAX_RESTARTS_ENV);

            let err = outcome.expect_err("run_via_lease should fail when budget exhausted");
            assert!(
                matches!(err, crate::errors::ExtensionError::RenderFailed(_)),
                "expected RenderFailed, got {err:?}"
            );
            assert!(
                err.to_string()
                    .contains("vram supervisor halt after 2 restart"),
                "expected 'vram supervisor halt after 2 restart' in error, got: {err}"
            );

            let run = repos.get_run(run_id).await.expect("get_run");
            assert_eq!(
                run.restart_count, 1,
                "expected restart_count=1 (incremented before budget check on the surviving iter)"
            );
            assert_eq!(run.status, "failed");
            assert_eq!(run.error_code.as_deref(), Some("vram_supervisor"));
            // Item D: even on the halt path the most recent breach
            // reason is persisted, so the UI tooltip survives into
            assert!(
                run.last_breach_reason
                    .as_deref()
                    .unwrap_or("")
                    .contains("num_ooms"),
                "expected breach reason to survive into failed row, got {:?}",
                run.last_breach_reason
            );
            assert_eq!(
                acquirer.acquire_count.load(Ordering::SeqCst),
                2,
                "expected exactly two lease acquires before exhaustion"
            );
            assert_eq!(
                lease1.release_count.load(Ordering::SeqCst),
                1,
                "first lease must be released"
            );
            assert_eq!(
                lease2.release_count.load(Ordering::SeqCst),
                1,
                "second lease must be released"
            );
        }
    }
}
