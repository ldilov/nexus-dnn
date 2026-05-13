use std::collections::HashMap;
use std::path::PathBuf;
use std::sync::Arc;
use std::time::Duration;

use nexus_backend_runtimes::generic::leases::trait_def::BackendRuntimeLease;
use serde_json::{Value, json};
use tokio::sync::broadcast::error::RecvError;
use tokio::sync::{Mutex, Notify};

use crate::errors::Result;
use crate::lease::LtxLeaseFactory;
use crate::schemas::RenderPlan;
use crate::storage::Repos;

// Render wall-clock budget. The real LTX-2.3 pipeline on a single 16 GB
// GPU takes ~750 s per 4-second segment (60 s cold pipeline load + 8
// inference steps @ ~75 s each, measured 2026-05-13 on RTX 5070 Ti with
// BF16 weights spilling to system RAM). The fake pipeline finishes in
// seconds. 30 minutes covers both modes plus headroom for multi-segment
// runs; cancellation still pre-empts via the Notify path so a stuck
// render isn't unconditionally blocking the lease.
const RENDER_TIMEOUT: Duration = Duration::from_secs(1800);
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
}

/// Per-run abort handle. Held by both the spawned render task and the
/// `cancel_render` HTTP handler so a flip on either side wakes the
/// notification loop.
type CancelRegistry = Arc<Mutex<HashMap<String, Arc<Notify>>>>;

#[derive(Clone)]
pub struct Runner {
    cfg: Arc<RunnerConfig>,
    cancellers: CancelRegistry,
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

impl Runner {
    #[must_use]
    pub fn new(cfg: RunnerConfig) -> Self {
        Self {
            cfg: Arc::new(cfg),
            cancellers: Arc::new(Mutex::new(HashMap::new())),
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
            cfg.repos
                .update_run_status(
                    run_id,
                    "failed",
                    None,
                    Some(&format!("worker_error:{code}")),
                    Some(&message),
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
