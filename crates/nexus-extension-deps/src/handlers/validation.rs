//! `validation` step handler — terminal step. Spawns the worker via the host's
//! [`crate::context::WorkerHandshake`] (wired to spec 032's lease primitives) and
//! declares success only if the handshake completes within the timeout.
//!
//! ## Persistence
//!
//! The handshake itself is ephemeral (the worker isn't running between sessions),
//! but the *fact* that a successful handshake happened is durable signal that the
//! install completed end-to-end. We persist that fact by writing a marker file
//! at `<extension_data_dir>/.dep-installer/validation/<step_id>.ok` on success.
//! `probe()` reads the marker, so after an app restart the Dependencies tab still
//! shows Validate as satisfied — the user does not have to re-install just to
//! turn the row green again. Force-reinstall removes the marker before the
//! handshake, so a partial failure correctly reverts the row to NotSatisfied.

use std::path::{Path, PathBuf};
use std::time::Duration;

use async_trait::async_trait;
use serde::Deserialize;
use serde_json::Value;

use crate::context::StepContext;
use crate::error::DepError;
use crate::handler::{ProbeResult, StepHandler};
use crate::types::{ProgressEvent, StepArtifact, StepProgress};

#[derive(Debug, Deserialize)]
struct ValidationSpec {
    #[serde(default = "default_kind")]
    kind: String,
    #[serde(default = "default_timeout")]
    timeout_seconds: u64,
}

fn default_kind() -> String {
    "worker_handshake".to_owned()
}

fn default_timeout() -> u64 {
    60
}

pub struct ValidationHandler;

impl ValidationHandler {
    pub fn new() -> Self {
        Self
    }
}

impl Default for ValidationHandler {
    fn default() -> Self {
        Self::new()
    }
}

fn parse(spec: &Value) -> Result<ValidationSpec, DepError> {
    serde_json::from_value(spec.clone()).map_err(|e| DepError::InvalidSpec {
        step_id: String::new(),
        field: "spec".to_owned(),
        reason: e.to_string(),
    })
}

/// Marker filename. Validation in spec 035 is the terminal smoke test; there is
/// at most one validation step per extension plan, so a fixed filename keeps
/// `StepContext` free of a step-id hop while still producing a deterministic
/// path that survives app restarts.
const MARKER_RELATIVE: &str = ".dep-installer/validation.ok";

fn marker_path(extension_data_dir: &Path) -> PathBuf {
    extension_data_dir.join(MARKER_RELATIVE)
}

#[async_trait]
impl StepHandler for ValidationHandler {
    fn step_type(&self) -> &'static str {
        "validation"
    }

    fn validate(&self, spec: &Value) -> Result<(), DepError> {
        let parsed = parse(spec)?;
        if parsed.kind != "worker_handshake" {
            return Err(DepError::invalid_spec(
                "",
                "kind",
                format!("v1 only supports 'worker_handshake'; got '{}'", parsed.kind),
            ));
        }
        if parsed.timeout_seconds == 0 {
            return Err(DepError::invalid_spec("", "timeout_seconds", "must be > 0"));
        }
        Ok(())
    }

    async fn probe(&self, ctx: &StepContext<'_>, _spec: &Value) -> Result<ProbeResult, DepError> {
        // Filesystem-backed: the marker is written by `run()` on a successful
        // handshake and removed at the start of every `run()` attempt, so its
        // presence is a durable proof that the most recent install completed.
        // After an app restart, this is what keeps the Validate row green
        // without a re-handshake against a worker that isn't running yet.
        let marker = marker_path(ctx.extension_data_dir);
        if tokio::fs::metadata(&marker).await.is_ok() {
            return Ok(ProbeResult::Satisfied {
                artifact: StepArtifact {
                    path: Some(marker),
                    bytes_placed: 0,
                    summary: "previous handshake validated".to_owned(),
                    metadata: Value::Null,
                },
            });
        }
        Ok(ProbeResult::NotSatisfied)
    }

    async fn run(&self, ctx: &StepContext<'_>, spec: &Value) -> Result<StepArtifact, DepError> {
        let parsed = parse(spec)?;
        let timeout = Duration::from_secs(parsed.timeout_seconds);
        let marker = marker_path(ctx.extension_data_dir);

        // Always invalidate the previous marker before re-attempting. If the
        // handshake fails below, no stale "ok" marker survives — probe() will
        // correctly report NotSatisfied on the next `GET /dependencies`.
        let _ = tokio::fs::remove_file(&marker).await;

        // First-progress promptly so the validation row shows `running` instead
        // of a blank cell while the worker handshake is in flight (AC-2.5/2.6).
        ctx.progress_sink.emit(ProgressEvent::step_progress(
            ctx.extension_id,
            ctx.install_run_id,
            // step_id is unknown to the handler — runner re-tags it.
            String::new(),
            StepProgress::phase("running").with_message("validating worker handshake"),
        ));

        match ctx
            .worker_handshake
            .run_handshake(
                ctx.extension_id,
                ctx.extension_dir,
                ctx.extension_data_dir,
                ctx.upstream_artifacts,
                timeout,
                ctx.cancellation_token.clone(),
            )
            .await
        {
            Ok(()) => {
                if let Some(parent) = marker.parent() {
                    tokio::fs::create_dir_all(parent).await.map_err(|e| {
                        DepError::Backend(format!(
                            "failed to create validation marker dir {}: {e}",
                            parent.display()
                        ))
                    })?;
                }
                tokio::fs::write(&marker, marker_payload(parsed.timeout_seconds))
                    .await
                    .map_err(|e| {
                        DepError::Backend(format!(
                            "failed to write validation marker {}: {e}",
                            marker.display()
                        ))
                    })?;
                ctx.progress_sink.emit(ProgressEvent::step_progress(
                    ctx.extension_id,
                    ctx.install_run_id,
                    String::new(),
                    StepProgress::phase("done").with_message("worker handshake ok"),
                ));
                Ok(StepArtifact {
                    path: Some(marker),
                    bytes_placed: 0,
                    summary: format!("worker handshake ok ({}s timeout)", parsed.timeout_seconds),
                    metadata: Value::Null,
                })
            }
            Err(handshake_err) => Err(DepError::Backend(format!(
                "{}: {}",
                handshake_err.category, handshake_err.message
            ))),
        }
    }
}

fn marker_payload(timeout_seconds: u64) -> String {
    format!(
        "validated_at={}\ntimeout_seconds={}\n",
        chrono::Utc::now().to_rfc3339(),
        timeout_seconds
    )
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashMap;
    use std::sync::{Arc, Mutex};

    #[derive(Default)]
    struct CapturingSink {
        events: Mutex<Vec<ProgressEvent>>,
    }
    impl crate::ProgressSink for CapturingSink {
        fn emit(&self, e: ProgressEvent) {
            self.events.lock().expect("lock").push(e);
        }
    }

    struct OkHandshake;
    #[async_trait]
    impl crate::WorkerHandshake for OkHandshake {
        async fn run_handshake(
            &self,
            _ext: &str,
            _dir: &Path,
            _data: &Path,
            _ups: &HashMap<String, StepArtifact>,
            _t: Duration,
            _c: tokio_util::sync::CancellationToken,
        ) -> Result<(), crate::HandshakeError> {
            Ok(())
        }
    }

    struct NoopModelStore;
    #[async_trait]
    impl crate::ModelStoreClient for NoopModelStore {
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
            _s: &crate::FileSelection,
        ) -> Result<String, DepError> {
            unreachable!()
        }
        async fn poll_job(&self, _id: &str) -> Result<crate::ModelDownloadProgress, DepError> {
            unreachable!()
        }
    }

    struct NoopRuntime;
    #[async_trait]
    impl crate::RuntimeBootstrapper for NoopRuntime {
        async fn probe(
            &self,
            _f: &str,
            _v: Option<&str>,
            _a: &[String],
            _t: &Path,
        ) -> Result<Option<crate::RuntimeBootstrapResult>, DepError> {
            Ok(None)
        }
        async fn bootstrap(
            &self,
            _f: &str,
            _v: Option<&str>,
            _a: &[String],
            _t: &Path,
            _c: tokio_util::sync::CancellationToken,
        ) -> Result<crate::RuntimeBootstrapResult, DepError> {
            unreachable!()
        }
    }

    /// AC-2.5 + AC-2.6: validation emits `running` before the handshake and a
    /// terminal `done` after a successful handshake.
    #[tokio::test]
    async fn run_emits_running_then_done_on_success() {
        let sink = Arc::new(CapturingSink::default());
        let dir = tempfile::tempdir().expect("tmp");
        let upstream = HashMap::new();
        let ctx = StepContext {
            extension_id: "example",
            extension_dir: dir.path(),
            extension_data_dir: dir.path(),
            host_data_dir: dir.path(),
            model_store: Arc::new(NoopModelStore),
            runtime_bootstrapper: Arc::new(NoopRuntime),
            worker_handshake: Arc::new(OkHandshake),
            fetch_artifact: Arc::new(|_req: crate::fetch::FetchRequest| {
                Box::pin(async { Err(DepError::Backend("stub".into())) })
            }),
            progress_sink: sink.clone(),
            cancellation_token: tokio_util::sync::CancellationToken::new(),
            install_run_id: uuid::Uuid::nil(),
            force: false,
            upstream_artifacts: &upstream,
        };
        let spec = serde_json::json!({ "kind": "worker_handshake", "timeout_seconds": 5 });

        let handler = ValidationHandler::new();
        handler.run(&ctx, &spec).await.expect("run ok");

        let phases: Vec<String> = sink
            .events
            .lock()
            .expect("lock")
            .iter()
            .filter_map(|e| match e {
                ProgressEvent::StepProgress { phase, .. } => Some(phase.clone()),
                _ => None,
            })
            .collect();
        assert_eq!(phases.first().map(String::as_str), Some("running"));
        assert_eq!(phases.last().map(String::as_str), Some("done"));
    }
}
