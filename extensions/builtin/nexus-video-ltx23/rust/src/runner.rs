use std::path::PathBuf;
use std::sync::Arc;
use std::time::Duration;

use nexus_backend_runtimes::generic::leases::trait_def::BackendRuntimeLease;
use serde_json::{Value, json};
use tokio::sync::broadcast::error::RecvError;

use crate::errors::Result;
use crate::lease::LtxLeaseFactory;
use crate::schemas::RenderPlan;
use crate::storage::Repos;

const RENDER_TIMEOUT: Duration = Duration::from_secs(600);

#[derive(Clone)]
pub struct RunnerConfig {
    pub runs_dir: PathBuf,
    pub repos: Repos,
    pub factory: Arc<LtxLeaseFactory>,
}

#[derive(Clone)]
pub struct Runner {
    cfg: Arc<RunnerConfig>,
}

impl Runner {
    #[must_use]
    pub fn new(cfg: RunnerConfig) -> Self {
        Self { cfg: Arc::new(cfg) }
    }

    pub fn spawn_render(
        &self,
        run_id: String,
        profile: String,
        plan: RenderPlan,
        prompt: String,
        negative_prompt: Option<String>,
    ) {
        let cfg = self.cfg.clone();
        tokio::spawn(async move {
            if let Err(err) = run_via_lease(&cfg, &run_id, &profile, &plan, &prompt, negative_prompt.as_deref()).await {
                tracing::error!(
                    extension_id = "nexus.video.ltx23",
                    run_id = %run_id,
                    error = %err,
                    "runner: render failed"
                );
                let _ = cfg
                    .repos
                    .update_run_status(
                        &run_id,
                        "failed",
                        None,
                        Some("runner_error"),
                        Some(&err.to_string()),
                    )
                    .await;
            }
        });
    }
}

async fn run_via_lease(
    cfg: &RunnerConfig,
    run_id: &str,
    profile: &str,
    plan: &RenderPlan,
    prompt: &str,
    negative_prompt: Option<&str>,
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

    let render_params = build_render_params(run_id, plan, prompt, negative_prompt, &workdir);
    if let Err(e) = lease.send_rpc("ltx.video.render.start", render_params).await {
        let _ = lease.release().await;
        return Err(crate::errors::ExtensionError::RenderFailed(format!(
            "render.start rejected by worker: {e}"
        )));
    }

    let outcome = tokio::time::timeout(RENDER_TIMEOUT, async {
        loop {
            match notifications.recv().await {
                Ok(note) => {
                    if let Some(o) = handle_notification(cfg, run_id, &workdir, &note).await? {
                        return Ok::<NotificationOutcome, crate::errors::ExtensionError>(o);
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
    }
}

enum NotificationOutcome {
    Done { final_path: PathBuf },
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

fn build_render_params(
    run_id: &str,
    plan: &RenderPlan,
    prompt: &str,
    negative_prompt: Option<&str>,
    workdir: &std::path::Path,
) -> Value {
    json!({
        "request_id": run_id,
        "workdir": workdir.to_string_lossy(),
        "prompt": {
            "action": prompt,
            "negative": negative_prompt.unwrap_or(""),
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
            "segments": plan.segments.iter().map(|s| json!({
                "index": s.index,
                "start_time_seconds": s.start_time_seconds,
                "duration_seconds": s.duration_seconds,
                "overlap_seconds": s.overlap_seconds,
                "frame_count": s.frame_count,
                "seed": s.seed,
            })).collect::<Vec<_>>(),
        },
        "runtime_profile": plan.runtime_profile.clone(),
    })
}

fn short_profile(full: &str) -> &str {
    full.rsplit('.').next().unwrap_or("fake")
}
