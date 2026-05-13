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

    let lease = cfg.factory.acquire(short_profile(profile)).await?;

    cfg.repos
        .update_run_status(run_id, "rendering", None, None, None)
        .await?;

    let mut notifications = lease.subscribe_notifications();

    let render_params = build_render_params(
        run_id,
        plan,
        prompt,
        negative_prompt,
        style_prompt,
        character_prompt,
        advanced,
        &workdir,
    );
    if let Err(e) = lease.send_rpc("ltx.video.render.start", render_params).await {
        let _ = lease.release().await;
        return Err(crate::errors::ExtensionError::RenderFailed(format!(
            "render.start rejected by worker: {e}"
        )));
    }

    let cancel_wait = cancel_notify.notified();
    tokio::pin!(cancel_wait);
    let mut cancel_requested = false;
    let mut cancel_deadline: Option<tokio::time::Instant> = None;

    let outcome = tokio::time::timeout(RENDER_TIMEOUT, async {
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
                        if let Some(o) =
                            handle_notification(cfg, run_id, &workdir, &note).await?
                        {
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
                            "worker closed notification channel before emitting done".into(),
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
    })??;

    let _ = lease.release().await;

    match outcome {
        NotificationOutcome::Done { final_path } => {
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
                return Err(crate::errors::ExtensionError::RenderCancelled);
            }
            // VRAM supervisor halts get a distinct error_code so the
            // UI can show "halted by policy" rather than the generic
            // "worker_error:-32603" path.
            let error_code = if code == VRAM_SUPERVISOR_BREACH_CODE {
                "vram_supervisor".to_string()
            } else {
                format!("worker_error:{code}")
            };
            cfg.repos
                .update_run_status(
                    run_id,
                    "failed",
                    None,
                    Some(&error_code),
                    Some(&truncate_status_msg(&message)),
                )
                .await?;
            Err(crate::errors::ExtensionError::RenderFailed(message))
        }
        NotificationOutcome::Cancelled => {
            cfg.repos
                .update_run_status(run_id, "cancelled", None, None, None)
                .await?;
            Err(crate::errors::ExtensionError::RenderCancelled)
        }
    }
}

enum NotificationOutcome {
    Done { final_path: PathBuf },
    Error { code: i64, message: String },
    Cancelled,
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
            // Supervisor reads each VRAM snapshot. A clean halt now
            // (between segments, while the worker is still alive) is
            // strictly better than crashing on the next allocation;
            // the run row gets a distinct `vram_supervisor` error
            // code so the UI can tell halt-by-policy from halt-by-OOM.
            match cfg.vram_supervisor.evaluate(&note.params) {
                VramVerdict::Healthy => Ok(None),
                VramVerdict::Breach { reason } => {
                    tracing::warn!(
                        extension_id = "nexus.video.ltx23",
                        run_id = %run_id,
                        reason = %reason,
                        "vram supervisor: threshold breached — halting chain"
                    );
                    Ok(Some(NotificationOutcome::Error {
                        code: VRAM_SUPERVISOR_BREACH_CODE,
                        message: format!("vram supervisor halt: {reason}"),
                    }))
                }
            }
        }
        _ => Ok(None),
    }
}

fn segment_index(params: &Value) -> Option<i64> {
    params.get("segment_index").and_then(Value::as_i64)
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
