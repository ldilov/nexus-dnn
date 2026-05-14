use std::collections::{HashMap, HashSet};
use std::path::PathBuf;
use std::sync::Arc;
use std::time::Duration;

use nexus_backend_runtimes::generic::leases::trait_def::BackendRuntimeLease;
use serde_json::{Value, json};
use tokio::sync::broadcast::error::RecvError;
use tokio::sync::{Mutex, Notify};

use crate::errors::Result;
use crate::lease::LtxLeaseFactory;
use crate::schemas::{AdvancedSettings, RenderPlan};
use crate::storage::Repos;
use crate::vram_supervisor::{VramSupervisor, VramVerdict};

/// Distinct JSON-RPC-style error code for VRAM-supervisor halts.
///
/// Mirrors the worker's `ErrorCodes` namespace (`-32100..-32109` are
/// taken by the worker, so we claim `-32110` for host-side halts).
pub const VRAM_SUPERVISOR_BREACH_CODE: i64 = -32110;

// Worker JSON-RPC error code constants. These mirror the worker's
// `rpc.py::ErrorCodes` namespace — kept in sync by hand because the
// extension's Rust + Python halves don't share a generated schema.
// If the worker adds a new code, add the matching match arm in
// `map_worker_error_code` so the host UI gets a discriminator.
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
// sweet spot from spec-046 measurements: one restart is often enough to
// drain the fragmented CUDA pool; two covers slow-leak pathologies;
// three is the canary for "something else is wrong, stop wasting GPU
// time". Configurable via env var so operators can tune for their
// hardware without rebuilding.
const DEFAULT_MAX_RESTARTS: u32 = 3;
const MAX_RESTARTS_ENV: &str = "NEXUS_VIDEO_LTX23_VRAM_MAX_RESTARTS";

fn max_restarts_from_env() -> u32 {
    std::env::var(MAX_RESTARTS_ENV)
        .ok()
        .and_then(|v| v.trim().parse::<u32>().ok())
        .unwrap_or(DEFAULT_MAX_RESTARTS)
}

// Render wall-clock budget. The real LTX-2.3 pipeline on a single 16 GB
// GPU takes ~750 s per 4-second segment (60 s cold pipeline load + 8
// inference steps @ ~75 s each, measured 2026-05-13 on RTX 5070 Ti with
// BF16 weights spilling to system RAM). The fake pipeline finishes in
// seconds. 30 minutes covers both modes plus headroom for multi-segment
// runs; cancellation still pre-empts via the Notify path so a stuck
// render isn't unconditionally blocking the lease.
const RENDER_TIMEOUT: Duration = Duration::from_secs(1800);
// Single-segment retry budget. One segment instead of the full chain —
// cold pipeline load + one 8-step inference at the real-runtime rate
// is ~800 s tops on a 16 GB card; 15 minutes covers worst case with
// the same safety pattern as RENDER_TIMEOUT.
const RETRY_SEGMENT_TIMEOUT: Duration = Duration::from_secs(900);
/// Window the worker is given to flush its in-flight segment, emit
/// `ltx.video.error{code:RENDER_CANCELLED}`, and clean up resources after
/// the cancel RPC lands. Past this point the lease is force-released even
/// if the worker hasn't replied.
const CANCEL_GRACE: Duration = Duration::from_secs(15);

#[derive(Clone)]
pub struct RunnerConfig {
    pub runs_dir: PathBuf,
    pub repos: Repos,
    pub factory: Arc<LtxLeaseFactory>,
    /// Watches `runtime.memory_stats` notifications and trips a clean
    /// halt when usage crosses configured thresholds. Defaults to
    /// `VramSupervisor::default()` (env-tunable; see
    /// `vram_supervisor.rs`). Set deliberately to
    /// `VramSupervisorConfig` with `u64::MAX` thresholds to disable.
    pub vram_supervisor: VramSupervisor,
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
                // "cancelled", so don't overwrite with "failed".
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
        self.cancellers
            .lock()
            .await
            .insert(run_id, notify.clone());
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
    advanced: &crate::schemas::AdvancedSettings,
    cancel_notify: Arc<Notify>,
) -> Result<()> {
    let workdir = cfg.runs_dir.join(run_id).join("work");
    tokio::fs::create_dir_all(&workdir).await.map_err(|e| {
        crate::errors::ExtensionError::Internal(format!(
            "mkdir workdir {}: {e}",
            workdir.display()
        ))
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
                // is the original chain index (0-based); we resume at +1.
                let next_offset = u32::try_from(last_completed_segment.saturating_add(1))
                    .unwrap_or(u32::MAX);
                // No forward progress check — should be impossible
                // because the latch is consumed by segment.completed,
                // but defensive: if next_offset isn't strictly greater
                // than the offset we just ran with, collapse to halt.
                if next_offset <= segment_offset
                    || (next_offset as usize) >= plan.segments.len()
                {
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
                segment_offset = next_offset;
            }
            other => break other,
        }
    };

    // Stash the last breach reason on a transient log so the final
    // error message can mention it when the chain ultimately Done's
    // after one or more restarts — useful operator diagnostic.
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

    match outcome {
        NotificationOutcome::Done { final_path } => {
            // Defence-in-depth: the worker controls the `final_path`
            // field in its `ltx.video.done` notification. A compromised
            // or crafted notification could point at any host-readable
            // file (`.env`, ssh keys, etc.) and we'd happily publish it
            // as `final.mp4`. Constrain the source path to the
            // workdir's canonical descendant set before copying.
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
            // cancelled status path so the HTTP DTO and DB row agree.
            if code == -32107 {
                cfg.repos
                    .update_run_status(run_id, "cancelled", None, None, None)
                    .await?;
                cleanup_workdir(&workdir, run_id).await;
                return Err(crate::errors::ExtensionError::RenderCancelled);
            }
            // Map JSON-RPC error codes from the worker's ErrorCodes
            // namespace to the typed `error_code` strings the UI
            // discriminates on. Falls through to `worker_error:<code>`
            // for any code not in the known namespace so we don't
            // silently swallow new error types.
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
        // The loop above only `break`s with Done / Error / Cancelled.
        // This arm exists for exhaustiveness — the type system won't
        // let us drop it without a wildcard, and a wildcard would hide
        // future variants.
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
    advanced: &crate::schemas::AdvancedSettings,
    workdir: &std::path::Path,
    segment_offset: u32,
    cancel_notify: Arc<Notify>,
) -> Result<NotificationOutcome> {
    let lease = cfg.factory.acquire(short_profile(profile)).await?;
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
        )
    } else {
        // Resume mid-chain: trim the segments + point at the prior
        // chain's last_frame.png so the worker re-anchors visual
        // continuity. The path is the workdir layout the worker
        // itself writes (`<workdir>/segments/<NNN>/last_frame.png`).
        let prev_idx = segment_offset.saturating_sub(1);
        let cond_image = workdir
            .join("segments")
            .join(format!("{prev_idx:03}"))
            .join("last_frame.png");
        let cond_image_opt = if cond_image.is_file() {
            Some(cond_image.as_path())
        } else {
            // Best effort — if the prior segment's last_frame.png was
            // never written (worker crash before flush), fall through
            // without cond_image. The worker will still render the
            // remaining segments, just without the visual-continuity
            // anchor. Logged so an operator can correlate.
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
    advanced: &AdvancedSettings,
) -> Result<()> {
    let workdir = cfg.runs_dir.join(run_id).join("work");
    tokio::fs::create_dir_all(&workdir).await.map_err(|e| {
        crate::errors::ExtensionError::Internal(format!(
            "mkdir workdir {}: {e}",
            workdir.display()
        ))
    })?;

    let lease = cfg.factory.acquire(short_profile(profile)).await?;
    let target = i64::from(seg_idx);

    // Single-exit pattern: do the work inside an inner async block,
    // capture its Result, then release the lease ONCE on every path
    // (timeout, channel close, worker error, success). Avoids the
    // "lease leaked on timeout" anti-pattern the prior structure had.
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
                            // Notification from a different run sharing the
                            // pool — defence-in-depth so a mis-routed event
                            // can't prematurely succeed our retry.
                            continue;
                        }
                        match note.method.as_str() {
                            "ltx.video.segment.completed" => {
                                if segment_index(&note.params) == Some(target) {
                                    cfg.repos
                                        .update_segment_status(
                                            run_id, target, "completed", None,
                                        )
                                        .await?;
                                    return Ok::<RetryOutcome, crate::errors::ExtensionError>(
                                        RetryOutcome::Completed,
                                    );
                                }
                            }
                            "ltx.video.segment.started" => {
                                if segment_index(&note.params) == Some(target) {
                                    cfg.repos
                                        .update_segment_status(
                                            run_id, target, "rendering", None,
                                        )
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

async fn handle_notification(
    cfg: &RunnerConfig,
    run_id: &str,
    _workdir: &std::path::Path,
    note: &nexus_backend_runtimes::generic::leases::trait_def::LeaseNotification,
    breach_latch: &BreachLatch,
) -> Result<Option<NotificationOutcome>> {
    match note.method.as_str() {
        "ltx.video.segment.started" => {
            if let Some(i) = segment_index(&note.params) {
                cfg.repos
                    .update_segment_status(run_id, i, "rendering", None)
                    .await?;
            }
            Ok(None)
        }
        "ltx.video.segment.completed" => {
            if let Some(i) = segment_index(&note.params) {
                cfg.repos
                    .update_segment_status(run_id, i, "completed", None)
                    .await?;
                // Supervisor breach pending? Now is the right moment to
                // halt: the segment just landed cleanly on disk + the
                // worker is between segments, so releasing the lease
                // here gives a clean restart point.
                if let Some(reason) = breach_latch.take().await {
                    return Ok(Some(NotificationOutcome::RestartRequired {
                        reason,
                        last_completed_segment: i,
                    }));
                }
            }
            Ok(None)
        }
        "ltx.video.segment.step" => {
            // Per-inference-step heartbeat from pipeline_diffusers' diffusers
            // `callback_on_step_end` hook. Solves the "worker silent for
            // minutes" UX problem — gives the recipe UI a live per-step
            // progress counter even when the segment-level progress
            // hasn't ticked yet. Logged at TRACE so it doesn't spam the
            // host log; the notification still reaches any SSE subscriber.
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
            // arm consumes it and returns RestartRequired so the outer
            // driver can release the lease + acquire a fresh one to
            // continue the chain transparently. After
            // `max_restarts_from_env()` exhausted attempts the outer
            // driver collapses to the legacy halt path with the
            // `vram_supervisor` error_code.
            match cfg.vram_supervisor.evaluate(&note.params) {
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
    );

    // Trim segments + inject cond_image. The worker's render_loop reads
    // `input_image.path` once for segment 0, then derives subsequent
    // `cond_image` from the prior segment's last_frame.png internally.
    // So injecting the prior chain's last_frame.png as `input_image.path`
    // for the FIRST segment of the resume payload re-establishes
    // continuity without any further worker-side change.
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
            // so even an empty-array edge case stays consistent.
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
) -> Value {
    let guidance_scale = advanced
        .guidance_scale
        .map_or(Value::Null, |v| serde_json::Value::from(f64::from(v)));
    let num_inference_steps = advanced
        .num_inference_steps
        .map_or(Value::Null, Value::from);

    // Per-segment `action_prompt` overrides the global `prompt` when
    // the planner zipped a scenes[] script. The worker composes the
    // effective prompt as `character + action + style` per segment;
    // we pass all three slots through so the worker has full control
    // over the final string sent to LTX-2.3.
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

    json!({
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
        "advanced": {
            "guidance_scale": guidance_scale,
            "num_inference_steps": num_inference_steps,
        },
        "runtime_profile": plan.runtime_profile.clone(),
    })
}

fn short_profile(full: &str) -> &str {
    full.rsplit('.').next().unwrap_or("fake")
}

#[cfg(test)]
mod tests {
    use super::*;
    use sqlx::sqlite::SqlitePoolOptions;

    async fn empty_runner() -> Runner {
        // In-memory SQLite is enough — Runner::cancel never touches the DB.
        let pool = SqlitePoolOptions::new()
            .max_connections(1)
            .connect("sqlite::memory:")
            .await
            .unwrap();
        Runner::new(RunnerConfig {
            runs_dir: PathBuf::from("/tmp"),
            repos: Repos::from_pool(pool),
            factory: Arc::new(LtxLeaseFactory::new(
                PathBuf::from("/nonexistent-ext"),
                PathBuf::from("/nonexistent-data"),
            )),
            vram_supervisor: VramSupervisor::default(),
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
        // tasks, not future ones.
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
        runner
            .retries
            .lock()
            .await
            .insert(("run-retry".into(), 3));
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

    #[test]
    fn max_restarts_from_env_uses_default_when_unset() {
        // SAFETY: clearing env var inside the test process; relies on
        // test-isolation via single-threaded reads of this var.
        std::env::remove_var(MAX_RESTARTS_ENV);
        assert_eq!(max_restarts_from_env(), DEFAULT_MAX_RESTARTS);
    }

    #[test]
    fn max_restarts_from_env_parses_valid_override() {
        std::env::set_var(MAX_RESTARTS_ENV, "7");
        let result = max_restarts_from_env();
        std::env::remove_var(MAX_RESTARTS_ENV);
        assert_eq!(result, 7);
    }

    #[test]
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

    #[test]
    fn build_render_params_offset_trims_segments() {
        let plan = sample_plan(5);
        let workdir = PathBuf::from("/runs/run-x/work");
        let params = build_render_params_offset(
            "run-x", &plan, "make video", None, None, None,
            &AdvancedSettings::default(), &workdir, 2, None,
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
        let params = build_render_params_offset(
            "run-x", &plan, "make video", None, None, None,
            &AdvancedSettings::default(), &workdir, 1, None,
        );
        assert_eq!(params["resumed_from_segment"].as_u64(), Some(1));
    }

    #[test]
    fn build_render_params_offset_injects_cond_image() {
        let plan = sample_plan(3);
        let workdir = PathBuf::from("/runs/run-x/work");
        let cond = std::path::PathBuf::from("/runs/run-x/work/segments/000/last_frame.png");
        let params = build_render_params_offset(
            "run-x", &plan, "make video", None, None, None,
            &AdvancedSettings::default(), &workdir, 1, Some(cond.as_path()),
        );
        let injected = params["input_image"]["path"].as_str().expect("input_image.path");
        assert!(injected.contains("last_frame.png"));
        assert!(injected.contains("000"));
    }

    #[test]
    fn build_render_params_offset_no_cond_omits_input_image() {
        let plan = sample_plan(3);
        let workdir = PathBuf::from("/runs/run-x/work");
        let params = build_render_params_offset(
            "run-x", &plan, "make video", None, None, None,
            &AdvancedSettings::default(), &workdir, 1, None,
        );
        assert!(params.get("input_image").is_none());
    }

    #[test]
    fn build_render_params_offset_zero_offset_equivalent_to_full_chain() {
        let plan = sample_plan(4);
        let workdir = PathBuf::from("/runs/run-x/work");
        let full = build_render_params(
            "run-x", &plan, "make video", None, None, None,
            &AdvancedSettings::default(), &workdir,
        );
        let offset_zero = build_render_params_offset(
            "run-x", &plan, "make video", None, None, None,
            &AdvancedSettings::default(), &workdir, 0, None,
        );
        // resumed_from_segment field differs (0 vs absent), but the
        // segments array should be byte-identical.
        assert_eq!(
            full["video"]["segments"],
            offset_zero["video"]["segments"],
        );
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
        )
        .await
        .expect("handler should not error");
        assert!(outcome.is_none());
        assert!(latch.reason.lock().await.is_none());
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
}
