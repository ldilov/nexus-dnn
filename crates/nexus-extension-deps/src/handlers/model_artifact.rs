//! `model_artifact` step handler — thin adapter over the host's model store.
//!
//! All bytes flow through spec 025's `nexus-models-store` via the
//! [`crate::context::ModelStoreClient`] trait. This handler never touches
//! HuggingFace directly. Models always live under the host's `models/` dir, never
//! inside the extension's data dir.

use std::time::Duration;

use async_trait::async_trait;
use serde::Deserialize;
use serde_json::Value;

use crate::context::{ModelDownloadProgress, StepContext};
use crate::error::DepError;
use crate::file_selection::FileSelection;
use crate::handler::{ProbeResult, StepHandler};
use crate::types::{ProgressEvent, StepArtifact, StepEstimate, StepProgress};

/// Parsed `model_artifact` step spec.
///
/// File selection is flattened from the spec root (`files` / `include` /
/// `exclude`). With none set the whole repo is snapshotted (backward
/// compatible); see [`FileSelection`] for precedence.
#[derive(Debug, Deserialize)]
struct ModelArtifactSpec {
    family_id: String,
    #[serde(default)]
    acceleration_match: Option<String>,
    #[serde(default, flatten)]
    selection: FileSelection,
}

pub struct ModelArtifactHandler;

impl ModelArtifactHandler {
    pub fn new() -> Self {
        Self
    }
}

impl Default for ModelArtifactHandler {
    fn default() -> Self {
        Self::new()
    }
}

fn parse(spec: &Value) -> Result<ModelArtifactSpec, DepError> {
    serde_json::from_value(spec.clone()).map_err(|e| DepError::InvalidSpec {
        step_id: String::new(),
        field: "spec".to_owned(),
        reason: e.to_string(),
    })
}

/// Resolve the requested accelerator profile from the spec's `acceleration_match`
/// directive against upstream artifacts. Sentinel form is
/// `matches_runtime_step:<step_id>` — read that step's `metadata.resolved_profile`.
fn resolve_accelerator(parsed: &ModelArtifactSpec, ctx: &StepContext<'_>) -> Option<String> {
    let directive = parsed.acceleration_match.as_deref()?;
    if let Some(step_id) = directive.strip_prefix("matches_runtime_step:") {
        let upstream = ctx.upstream_artifacts.get(step_id)?;
        return upstream
            .metadata
            .get("resolved_profile")
            .and_then(Value::as_str)
            .map(String::from);
    }
    Some(directive.to_owned())
}

#[async_trait]
impl StepHandler for ModelArtifactHandler {
    fn step_type(&self) -> &'static str {
        "model_artifact"
    }

    fn validate(&self, spec: &Value) -> Result<(), DepError> {
        let parsed = parse(spec)?;
        if parsed.family_id.trim().is_empty() {
            return Err(DepError::invalid_spec("", "family_id", "empty"));
        }
        Ok(())
    }

    async fn probe(&self, ctx: &StepContext<'_>, spec: &Value) -> Result<ProbeResult, DepError> {
        let parsed = parse(spec)?;
        let accelerator = resolve_accelerator(&parsed, ctx);
        let Some(path) = ctx
            .model_store
            .is_family_installed(&parsed.family_id, accelerator.as_deref())
            .await?
        else {
            return Ok(ProbeResult::NotSatisfied);
        };

        // An explicit `files[]`/include/exclude selection must have EVERY declared
        // file on disk — `is_family_installed` flips green as soon as any one file
        // of the family is present, which silently masks a never-downloaded file
        // (the render then fails at load time instead of the install healing).
        // Unrestricted selections keep the historical fast-path (no network probe).
        if !parsed.selection.is_unrestricted() {
            let missing = ctx
                .model_store
                .verify_files_present(&parsed.family_id, accelerator.as_deref(), &parsed.selection)
                .await?;
            if !missing.is_empty() {
                tracing::warn!(
                    target: "extension_install::model_artifact",
                    family_id = %parsed.family_id,
                    missing_count = missing.len(),
                    missing = ?missing,
                    "model_artifact: family present but declared files missing — re-download needed"
                );
                return Ok(ProbeResult::NotSatisfied);
            }
        }

        Ok(ProbeResult::Satisfied {
            artifact: StepArtifact {
                path: Some(path),
                bytes_placed: 0,
                summary: format!(
                    "model {} ({})",
                    parsed.family_id,
                    accelerator.as_deref().unwrap_or("default")
                ),
                metadata: Value::Null,
            },
        })
    }

    async fn integrity(
        &self,
        ctx: &StepContext<'_>,
        spec: &Value,
    ) -> Option<crate::ArtifactIntegrity> {
        let parsed = parse(spec).ok()?;
        let accelerator = resolve_accelerator(&parsed, ctx);
        ctx.model_store
            .family_integrity(&parsed.family_id, accelerator.as_deref())
            .await
            .ok()
            .flatten()
    }

    async fn estimate(&self, ctx: &StepContext<'_>, spec: &Value) -> Option<StepEstimate> {
        let parsed = parse(spec).ok()?;
        let accelerator = resolve_accelerator(&parsed, ctx);
        let partial = ctx
            .model_store
            .family_partial_state(&parsed.family_id, accelerator.as_deref())
            .await
            .ok()??;
        Some(StepEstimate {
            remaining_bytes: partial.total_bytes.saturating_sub(partial.present_bytes),
            present_bytes: partial.present_bytes,
            files_present: partial.files_present,
            files_total: partial.files_total,
        })
    }

    async fn run(&self, ctx: &StepContext<'_>, spec: &Value) -> Result<StepArtifact, DepError> {
        let parsed = parse(spec)?;
        let accelerator = resolve_accelerator(&parsed, ctx);
        // Forced reinstall: wipe this extension's prior copy first so the
        // download below starts fresh (and reports byte progress) instead of
        // re-attaching to an already-complete job that streams nothing.
        if ctx.force {
            tracing::info!(
                target: "extension_install::model_artifact",
                extension_id = %ctx.extension_id,
                family_id = %parsed.family_id,
                "model_artifact: force reinstall — purging prior copy before re-download"
            );
            ctx.model_store
                .purge_family(ctx.extension_id, &parsed.family_id, accelerator.as_deref())
                .await?;
        }
        let job_id = ctx
            .model_store
            .start_download(&parsed.family_id, accelerator.as_deref(), &parsed.selection)
            .await?;
        tracing::info!(
            target: "extension_install::model_artifact",
            extension_id = %ctx.extension_id,
            family_id = %parsed.family_id,
            accelerator = ?accelerator,
            job_id = %job_id,
            "model_artifact: download job started"
        );

        // Throttle the structured tracing output so we get one log line per
        // ~5 seconds of download progress (or every 10% advancement,
        // whichever comes first), instead of one per 500ms poll. The
        // ProgressSink event still fires every poll so the UI bar stays
        // smooth.
        let mut last_log_at = std::time::Instant::now();
        let mut last_log_bytes: u64 = 0;
        let mut last_log_pct: u8 = 0;

        // First-progress promptly so the row never sits blank between the
        // runner's `running` event and the first poll result (AC-2.6).
        ctx.progress_sink.emit(ProgressEvent::step_progress(
            ctx.extension_id,
            ctx.install_run_id,
            // step_id is unknown to the handler — runner re-tags it.
            String::new(),
            StepProgress::bytes("downloading", 0, 0).with_message("starting download"),
        ));

        loop {
            if ctx.cancellation_token.is_cancelled() {
                tracing::warn!(
                    target: "extension_install::model_artifact",
                    family_id = %parsed.family_id,
                    job_id = %job_id,
                    "model_artifact: cancelled by client"
                );
                return Err(DepError::Cancelled);
            }
            match ctx.model_store.poll_job(&job_id).await? {
                ModelDownloadProgress::InProgress {
                    current_bytes,
                    total_bytes,
                    message,
                } => {
                    ctx.progress_sink.emit(ProgressEvent::step_progress(
                        ctx.extension_id,
                        ctx.install_run_id,
                        // step_id is unknown to the handler — runner re-tags it.
                        String::new(),
                        StepProgress::bytes("downloading", current_bytes, total_bytes)
                            .with_message(message.clone()),
                    ));

                    let elapsed = last_log_at.elapsed();
                    let pct = if total_bytes > 0 {
                        ((current_bytes.saturating_mul(100)) / total_bytes).min(100) as u8
                    } else {
                        0
                    };
                    if elapsed >= std::time::Duration::from_secs(5)
                        || pct.saturating_sub(last_log_pct) >= 10
                    {
                        tracing::info!(
                            target: "extension_install::model_artifact",
                            family_id = %parsed.family_id,
                            job_id = %job_id,
                            current_bytes,
                            total_bytes,
                            percent = pct,
                            delta_bytes = current_bytes.saturating_sub(last_log_bytes),
                            elapsed_secs = elapsed.as_secs(),
                            message = %message,
                            "model_artifact: download progress"
                        );
                        last_log_at = std::time::Instant::now();
                        last_log_bytes = current_bytes;
                        last_log_pct = pct;
                    }

                    tokio::time::sleep(Duration::from_millis(500)).await;
                }
                ModelDownloadProgress::Completed { path, bytes_placed } => {
                    tracing::info!(
                        target: "extension_install::model_artifact",
                        family_id = %parsed.family_id,
                        job_id = %job_id,
                        bytes_placed,
                        path = %path.display(),
                        "model_artifact: download completed"
                    );
                    // Record the Foundry ownership ref so the model is GC'd only
                    // when the last referencing extension drops it. Non-fatal:
                    // a failed ref-write must not fail an otherwise-good install.
                    if let Err(err) = ctx
                        .model_store
                        .record_reference(
                            ctx.extension_id,
                            &parsed.family_id,
                            accelerator.as_deref(),
                        )
                        .await
                    {
                        tracing::warn!(
                            target: "extension_install::model_artifact",
                            extension_id = %ctx.extension_id,
                            family_id = %parsed.family_id,
                            error = %err,
                            "model_artifact: failed to record ownership ref (install still ok)"
                        );
                    }
                    // Terminal `done` at 100% so the row settles full, not at
                    // whatever the last in-progress poll reported (AC-2.1).
                    ctx.progress_sink.emit(ProgressEvent::step_progress(
                        ctx.extension_id,
                        ctx.install_run_id,
                        String::new(),
                        StepProgress::bytes("done", bytes_placed, bytes_placed.max(1))
                            .with_message("download complete"),
                    ));
                    return Ok(StepArtifact {
                        path: Some(path),
                        bytes_placed,
                        summary: format!(
                            "model {} ({})",
                            parsed.family_id,
                            accelerator.as_deref().unwrap_or("default")
                        ),
                        metadata: Value::Null,
                    });
                }
                ModelDownloadProgress::Failed { category, message } => {
                    tracing::error!(
                        target: "extension_install::model_artifact",
                        family_id = %parsed.family_id,
                        job_id = %job_id,
                        category = %category,
                        message = %message,
                        "model_artifact: download FAILED"
                    );
                    return Err(DepError::Backend(format!("{category}: {message}")));
                }
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::context::ModelPartialState;
    use std::collections::HashMap;
    use std::path::{Path, PathBuf};
    use std::sync::Arc;

    struct PartialStateStore(Option<ModelPartialState>);

    #[async_trait]
    impl crate::ModelStoreClient for PartialStateStore {
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
        async fn family_partial_state(
            &self,
            _family_id: &str,
            _accelerator: Option<&str>,
        ) -> Result<Option<ModelPartialState>, DepError> {
            Ok(self.0)
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

    struct NoopHandshake;
    #[async_trait]
    impl crate::WorkerHandshake for NoopHandshake {
        async fn run_handshake(
            &self,
            _ext: &str,
            _dir: &Path,
            _data: &Path,
            _ups: &HashMap<String, StepArtifact>,
            _t: std::time::Duration,
            _c: tokio_util::sync::CancellationToken,
        ) -> Result<(), crate::HandshakeError> {
            unreachable!()
        }
    }

    struct NoopSink;
    impl crate::ProgressSink for NoopSink {
        fn emit(&self, _e: ProgressEvent) {}
    }

    #[derive(Default)]
    struct CapturingSink {
        events: std::sync::Mutex<Vec<ProgressEvent>>,
    }
    impl crate::ProgressSink for CapturingSink {
        fn emit(&self, e: ProgressEvent) {
            self.events.lock().expect("lock").push(e);
        }
    }

    /// Model store that hands back a scripted sequence of poll results,
    /// then completes. `start_download` returns a fixed job id.
    struct ScriptedStore {
        polls: std::sync::Mutex<Vec<crate::ModelDownloadProgress>>,
    }
    #[async_trait]
    impl crate::ModelStoreClient for ScriptedStore {
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
            Ok("job-1".to_owned())
        }
        async fn poll_job(&self, _id: &str) -> Result<crate::ModelDownloadProgress, DepError> {
            let mut polls = self.polls.lock().expect("lock");
            Ok(polls.remove(0))
        }
    }

    /// Store whose family is "installed" (so the `is_family_installed` fast
    /// path returns `Some`) but whose per-file verify reports a configurable
    /// missing list — models a partial HuggingFace family install where one
    /// declared file (e.g. a T2V pair) was never downloaded.
    struct PartialFileStore {
        missing: Vec<String>,
    }
    #[async_trait]
    impl crate::ModelStoreClient for PartialFileStore {
        async fn is_family_installed(
            &self,
            _f: &str,
            _a: Option<&str>,
        ) -> Result<Option<PathBuf>, DepError> {
            Ok(Some(PathBuf::from("/tmp/model")))
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
        async fn verify_files_present(
            &self,
            _family_id: &str,
            _accelerator: Option<&str>,
            _selection: &crate::FileSelection,
        ) -> Result<Vec<String>, DepError> {
            Ok(self.missing.clone())
        }
    }

    fn ctx_with_store<'a>(
        store: Arc<dyn crate::ModelStoreClient>,
        dir: &'a Path,
        upstream: &'a HashMap<String, StepArtifact>,
    ) -> StepContext<'a> {
        ctx_with_store_and_sink(store, Arc::new(NoopSink), dir, upstream)
    }

    fn ctx_with_store_and_sink<'a>(
        store: Arc<dyn crate::ModelStoreClient>,
        sink: Arc<dyn crate::ProgressSink>,
        dir: &'a Path,
        upstream: &'a HashMap<String, StepArtifact>,
    ) -> StepContext<'a> {
        StepContext {
            extension_id: "example",
            extension_dir: dir,
            extension_data_dir: dir,
            host_data_dir: dir,
            model_store: store,
            runtime_bootstrapper: Arc::new(NoopRuntime),
            worker_handshake: Arc::new(NoopHandshake),
            fetch_artifact: Arc::new(|_req: crate::fetch::FetchRequest| {
                Box::pin(async { Err(DepError::Backend("stub".into())) })
            }),
            progress_sink: sink,
            cancellation_token: tokio_util::sync::CancellationToken::new(),
            install_run_id: uuid::Uuid::nil(),
            force: false,
            upstream_artifacts: upstream,
        }
    }

    fn step_progress_fields(e: &ProgressEvent) -> Option<(String, u64, u64, Option<f32>)> {
        match e {
            ProgressEvent::StepProgress {
                phase,
                current_bytes,
                total_bytes,
                pct,
                ..
            } => Some((phase.clone(), *current_bytes, *total_bytes, *pct)),
            _ => None,
        }
    }

    #[tokio::test]
    async fn run_emits_first_progress_then_monotonic_bytes_then_terminal_done() {
        use crate::ModelDownloadProgress;
        let store: Arc<dyn crate::ModelStoreClient> = Arc::new(ScriptedStore {
            polls: std::sync::Mutex::new(vec![
                ModelDownloadProgress::InProgress {
                    current_bytes: 100,
                    total_bytes: 1000,
                    message: "downloading".into(),
                },
                ModelDownloadProgress::InProgress {
                    current_bytes: 500,
                    total_bytes: 1000,
                    message: "downloading".into(),
                },
                ModelDownloadProgress::Completed {
                    path: PathBuf::from("/tmp/model"),
                    bytes_placed: 1000,
                },
            ]),
        });
        let sink = Arc::new(CapturingSink::default());
        let dir = PathBuf::from("/tmp");
        let upstream = HashMap::new();
        let ctx = ctx_with_store_and_sink(store, sink.clone(), &dir, &upstream);
        let spec = serde_json::json!({ "family_id": "huggingface:Owner/Repo" });

        let handler = ModelArtifactHandler::new();
        let artifact = handler.run(&ctx, &spec).await.expect("run ok");
        assert_eq!(artifact.bytes_placed, 1000);

        let events = sink.events.lock().expect("lock");
        let progress: Vec<(String, u64, u64, Option<f32>)> =
            events.iter().filter_map(step_progress_fields).collect();
        assert!(progress.len() >= 2, "expected first-progress + updates");

        // First event is emitted before the first poll (AC-2.6).
        assert_eq!(progress[0].0, "downloading");

        // Byte progress is monotonic across the in-progress polls (AC-2.1).
        let byte_series: Vec<u64> = progress
            .iter()
            .filter(|(phase, _, _, _)| phase == "downloading")
            .map(|(_, cur, _, _)| *cur)
            .collect();
        for w in byte_series.windows(2) {
            assert!(w[1] >= w[0], "bytes must be monotonic, got {byte_series:?}");
        }

        // Final progress event is a terminal `done` at 100% (AC-2.1).
        let last = progress.last().expect("at least one event");
        assert_eq!(last.0, "done");
        assert_eq!(last.3, Some(100.0));
    }

    /// Model store that scripts polls AND captures the `record_reference` call
    /// so the handler's post-Completed ref recording (AC-4.2) is observable.
    struct RefRecordingStore {
        polls: std::sync::Mutex<Vec<crate::ModelDownloadProgress>>,
        recorded: std::sync::Mutex<Vec<(String, String)>>,
    }
    #[async_trait]
    impl crate::ModelStoreClient for RefRecordingStore {
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
            Ok("job-ref".to_owned())
        }
        async fn poll_job(&self, _id: &str) -> Result<crate::ModelDownloadProgress, DepError> {
            Ok(self.polls.lock().expect("lock").remove(0))
        }
        async fn record_reference(
            &self,
            extension_id: &str,
            family_id: &str,
            _accelerator: Option<&str>,
        ) -> Result<(), DepError> {
            self.recorded
                .lock()
                .expect("lock")
                .push((extension_id.to_owned(), family_id.to_owned()));
            Ok(())
        }
    }

    /// AC-4.2 — a successful `model_artifact` install records an ownership ref
    /// for `(extension_id -> family_id)`.
    #[tokio::test]
    async fn run_records_reference_on_completion() {
        use crate::ModelDownloadProgress;
        let store = Arc::new(RefRecordingStore {
            polls: std::sync::Mutex::new(vec![ModelDownloadProgress::Completed {
                path: PathBuf::from("/tmp/model"),
                bytes_placed: 10,
            }]),
            recorded: std::sync::Mutex::new(Vec::new()),
        });
        let dir = PathBuf::from("/tmp");
        let upstream = HashMap::new();
        let ctx = ctx_with_store(store.clone(), &dir, &upstream);
        let spec = serde_json::json!({ "family_id": "huggingface:Owner/Repo" });

        let handler = ModelArtifactHandler::new();
        handler.run(&ctx, &spec).await.expect("run ok");

        let recorded = store.recorded.lock().expect("lock");
        assert_eq!(recorded.len(), 1, "exactly one ref recorded on success");
        assert_eq!(recorded[0].0, "example", "extension_id from ctx");
        assert_eq!(recorded[0].1, "huggingface:Owner/Repo", "family from spec");
    }

    /// Records the order of `purge_family` and `start_download` so the
    /// force-reinstall sequencing (purge BEFORE download) is observable.
    #[derive(Default)]
    struct OrderTrackingStore {
        calls: std::sync::Mutex<Vec<&'static str>>,
    }
    #[async_trait]
    impl crate::ModelStoreClient for OrderTrackingStore {
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
            self.calls.lock().expect("lock").push("start_download");
            Ok("job-force".to_owned())
        }
        async fn poll_job(&self, _id: &str) -> Result<crate::ModelDownloadProgress, DepError> {
            Ok(crate::ModelDownloadProgress::Completed {
                path: PathBuf::from("/tmp/model"),
                bytes_placed: 1,
            })
        }
        async fn purge_family(
            &self,
            _extension_id: &str,
            _family_id: &str,
            _accelerator: Option<&str>,
        ) -> Result<(), DepError> {
            self.calls.lock().expect("lock").push("purge_family");
            Ok(())
        }
    }

    /// Forced reinstall purges the prior copy BEFORE re-downloading.
    #[tokio::test]
    async fn force_run_purges_before_download() {
        let store = Arc::new(OrderTrackingStore::default());
        let dir = PathBuf::from("/tmp");
        let upstream = HashMap::new();
        let mut ctx = ctx_with_store(store.clone(), &dir, &upstream);
        ctx.force = true;
        let spec = serde_json::json!({ "family_id": "huggingface:Owner/Repo" });

        ModelArtifactHandler::new()
            .run(&ctx, &spec)
            .await
            .expect("run ok");

        let calls = store.calls.lock().expect("lock");
        assert_eq!(
            calls.as_slice(),
            ["purge_family", "start_download"],
            "force must purge before re-downloading"
        );
    }

    /// A non-forced run never purges — the historical fast path is preserved.
    #[tokio::test]
    async fn non_force_run_does_not_purge() {
        let store = Arc::new(OrderTrackingStore::default());
        let dir = PathBuf::from("/tmp");
        let upstream = HashMap::new();
        let ctx = ctx_with_store(store.clone(), &dir, &upstream);
        let spec = serde_json::json!({ "family_id": "huggingface:Owner/Repo" });

        ModelArtifactHandler::new()
            .run(&ctx, &spec)
            .await
            .expect("run ok");

        let calls = store.calls.lock().expect("lock");
        assert_eq!(calls.as_slice(), ["start_download"]);
    }

    struct IntegrityStore(Option<crate::ArtifactIntegrity>);
    #[async_trait]
    impl crate::ModelStoreClient for IntegrityStore {
        async fn is_family_installed(
            &self,
            _f: &str,
            _a: Option<&str>,
        ) -> Result<Option<PathBuf>, DepError> {
            Ok(Some(PathBuf::from("/tmp/model")))
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
        async fn family_integrity(
            &self,
            _f: &str,
            _a: Option<&str>,
        ) -> Result<Option<crate::ArtifactIntegrity>, DepError> {
            Ok(self.0.clone())
        }
    }

    #[tokio::test]
    async fn integrity_delegates_to_model_store_and_surfaces_corruption() {
        let store: Arc<dyn crate::ModelStoreClient> =
            Arc::new(IntegrityStore(Some(crate::ArtifactIntegrity {
                ok: false,
                detail: Some("weights.bin truncated".into()),
            })));
        let dir = PathBuf::from("/tmp");
        let upstream = HashMap::new();
        let ctx = ctx_with_store(store, &dir, &upstream);
        let spec = serde_json::json!({ "family_id": "huggingface:Owner/Repo" });

        let report = ModelArtifactHandler::new()
            .integrity(&ctx, &spec)
            .await
            .expect("integrity report present");
        assert!(!report.ok);
        assert_eq!(report.detail.as_deref(), Some("weights.bin truncated"));
    }

    #[tokio::test]
    async fn integrity_is_none_when_store_cannot_verify() {
        let store: Arc<dyn crate::ModelStoreClient> = Arc::new(IntegrityStore(None));
        let dir = PathBuf::from("/tmp");
        let upstream = HashMap::new();
        let ctx = ctx_with_store(store, &dir, &upstream);
        let spec = serde_json::json!({ "family_id": "huggingface:Owner/Repo" });
        assert!(
            ModelArtifactHandler::new()
                .integrity(&ctx, &spec)
                .await
                .is_none()
        );
    }

    #[tokio::test]
    async fn estimate_maps_partial_state_to_step_estimate() {
        let store: Arc<dyn crate::ModelStoreClient> =
            Arc::new(PartialStateStore(Some(ModelPartialState {
                present_bytes: 3_000_000,
                total_bytes: 10_000_000,
                files_present: 2,
                files_total: 5,
            })));
        let dir = PathBuf::from("/tmp");
        let upstream = HashMap::new();
        let ctx = ctx_with_store(store, &dir, &upstream);
        let spec = serde_json::json!({ "family_id": "huggingface:Owner/Repo" });

        let handler = ModelArtifactHandler::new();
        let est = handler
            .estimate(&ctx, &spec)
            .await
            .expect("estimate present");
        assert_eq!(est.remaining_bytes, 7_000_000);
        assert_eq!(est.present_bytes, 3_000_000);
        assert_eq!(est.files_present, 2);
        assert_eq!(est.files_total, 5);
    }

    #[tokio::test]
    async fn estimate_returns_none_when_store_has_no_job() {
        let store: Arc<dyn crate::ModelStoreClient> = Arc::new(PartialStateStore(None));
        let dir = PathBuf::from("/tmp");
        let upstream = HashMap::new();
        let ctx = ctx_with_store(store, &dir, &upstream);
        let spec = serde_json::json!({ "family_id": "huggingface:Owner/Repo" });

        let handler = ModelArtifactHandler::new();
        assert!(handler.estimate(&ctx, &spec).await.is_none());
    }

    /// AC-1.1 — a spec with no selection parses to an unrestricted (whole-repo)
    /// selection.
    #[test]
    fn parses_spec_with_no_selection() {
        let spec = serde_json::json!({ "family_id": "huggingface:Owner/Repo" });
        let parsed = parse(&spec).expect("parse ok");
        assert!(parsed.selection.is_unrestricted());
    }

    /// AC-1.1 — `files` (exact allowlist) is parsed onto the selection.
    #[test]
    fn parses_spec_with_files_allowlist() {
        let spec = serde_json::json!({
            "family_id": "huggingface:Owner/Repo",
            "files": ["transformer/model.safetensors", "config.json"],
        });
        let parsed = parse(&spec).expect("parse ok");
        assert_eq!(
            parsed.selection.files,
            vec!["transformer/model.safetensors", "config.json"]
        );
        assert!(!parsed.selection.is_unrestricted());
    }

    /// AC-1.1 — `include` / `exclude` globs are parsed onto the selection.
    #[test]
    fn parses_spec_with_include_exclude_globs() {
        let spec = serde_json::json!({
            "family_id": "huggingface:Owner/Repo",
            "include": ["transformer/**", "*.json"],
            "exclude": ["**/*.fp16.safetensors"],
        });
        let parsed = parse(&spec).expect("parse ok");
        assert_eq!(parsed.selection.include, vec!["transformer/**", "*.json"]);
        assert_eq!(parsed.selection.exclude, vec!["**/*.fp16.safetensors"]);
    }

    /// AC-1.2 — validate() accepts specs with any selection combination,
    /// including none; it rejects nothing new (empty = whole repo).
    #[test]
    fn validate_accepts_any_selection_combination() {
        let handler = ModelArtifactHandler::new();
        for spec in [
            serde_json::json!({ "family_id": "huggingface:Owner/Repo" }),
            serde_json::json!({ "family_id": "huggingface:Owner/Repo", "files": ["a.bin"] }),
            serde_json::json!({ "family_id": "huggingface:Owner/Repo", "include": ["**/*.safetensors"] }),
            serde_json::json!({ "family_id": "huggingface:Owner/Repo", "exclude": ["junk/**"] }),
            serde_json::json!({
                "family_id": "huggingface:Owner/Repo",
                "files": ["a.bin"],
                "include": ["**"],
                "exclude": ["junk/**"],
            }),
        ] {
            assert!(handler.validate(&spec).is_ok(), "should accept {spec}");
        }
    }

    /// With an explicit `files[]` selection and every declared file present on
    /// disk, probe returns `Satisfied` — the family is genuinely complete.
    #[tokio::test]
    async fn probe_satisfied_when_all_declared_files_present() {
        let store: Arc<dyn crate::ModelStoreClient> = Arc::new(PartialFileStore {
            missing: Vec::new(),
        });
        let dir = PathBuf::from("/tmp");
        let upstream = HashMap::new();
        let ctx = ctx_with_store(store, &dir, &upstream);
        let spec = serde_json::json!({
            "family_id": "huggingface:Owner/Repo",
            "files": ["i2v.safetensors", "t2v.safetensors"],
        });
        let result = ModelArtifactHandler::new()
            .probe(&ctx, &spec)
            .await
            .expect("probe ok");
        assert!(matches!(result, ProbeResult::Satisfied { .. }));
    }

    /// With an explicit `files[]` selection where the family looks installed
    /// (`is_family_installed` → Some) but a declared file is missing, probe
    /// returns `NotSatisfied` so `run()` re-downloads it instead of letting the
    /// render fail at load time (svi2-pro T2V-pair root cause).
    #[tokio::test]
    async fn probe_not_satisfied_when_declared_file_missing() {
        let store: Arc<dyn crate::ModelStoreClient> = Arc::new(PartialFileStore {
            missing: vec!["t2v.safetensors".to_owned()],
        });
        let dir = PathBuf::from("/tmp");
        let upstream = HashMap::new();
        let ctx = ctx_with_store(store, &dir, &upstream);
        let spec = serde_json::json!({
            "family_id": "huggingface:Owner/Repo",
            "files": ["i2v.safetensors", "t2v.safetensors"],
        });
        let result = ModelArtifactHandler::new()
            .probe(&ctx, &spec)
            .await
            .expect("probe ok");
        assert!(
            matches!(result, ProbeResult::NotSatisfied),
            "a missing declared file must flip probe to NotSatisfied, got {result:?}"
        );
    }
}
