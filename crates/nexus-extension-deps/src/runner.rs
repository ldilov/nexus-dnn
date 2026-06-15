//! [`InstallRunner`] — sequential walk over a topo-sorted [`InstallPlan`].
//!
//! Per spec 035 § US1 / FR-040..FR-044: walk steps in topo order, `probe` first
//! (skip if satisfied), `run` if not, halt on first failure, emit SSE events through
//! the context's [`ProgressSink`]. Per-step retry runs through [`run_single_step`].

use std::collections::HashMap;
use std::sync::Arc;

use chrono::Utc;
use tracing::{debug, info};

use crate::context::StepContext;
use crate::error::DepError;
use crate::handler::{HandlerRegistry, ProbeResult};
use crate::plan::{InstallPlan, Step};
use crate::types::{
    InstallOutcome, ProgressEvent, ProgressSink, StepArtifact, StepError, StepStatus,
};

pub struct InstallRunner {
    pub plan: InstallPlan,
    pub registry: Arc<HandlerRegistry>,
}

impl InstallRunner {
    pub fn new(plan: InstallPlan, registry: Arc<HandlerRegistry>) -> Self {
        Self { plan, registry }
    }

    /// Walk the plan sequentially. Returns the final per-step status map plus the
    /// overall outcome.
    pub async fn run_install(&self, ctx: &mut RunnerContext<'_>) -> InstallReport {
        let started = std::time::Instant::now();
        let step_ids: Vec<&str> = self.plan.steps.iter().map(|s| s.id.as_str()).collect();
        info!(
            target: "extension_install::runner",
            extension_id = %ctx.extension_id,
            install_run_id = %ctx.install_run_id,
            extension_dir = %ctx.extension_dir.display(),
            extension_data_dir = %ctx.extension_data_dir.display(),
            host_data_dir = %ctx.host_data_dir.display(),
            step_count = self.plan.steps.len(),
            steps = ?step_ids,
            "install: run started — walking plan in topo order"
        );
        let mut statuses: HashMap<String, StepStatus> = HashMap::new();
        let mut artifacts: HashMap<String, StepArtifact> = HashMap::new();

        for step in &self.plan.steps {
            // Skip if any upstream-required step failed. Downstream steps stay
            // pending so the user can see exactly what's blocked.
            if !upstream_satisfied(step, &statuses) {
                tracing::warn!(
                    target: "extension_install::runner",
                    step_id = %step.id,
                    requires = ?step.requires,
                    "install: skipping step — upstream requirement(s) not satisfied"
                );
                statuses.insert(step.id.clone(), StepStatus::Pending);
                continue;
            }

            let outcome = run_one_step(step, &self.registry, ctx, &artifacts).await;
            apply_outcome(step, outcome, &mut statuses, &mut artifacts);

            // Halt on first failure. Subsequent steps stay pending.
            if matches!(statuses.get(&step.id), Some(StepStatus::Failed { .. })) {
                tracing::error!(
                    target: "extension_install::runner",
                    step_id = %step.id,
                    "install: HALTING run on first failure — downstream steps stay pending"
                );
                break;
            }
        }

        let all_satisfied = self
            .plan
            .steps
            .iter()
            .all(|s| statuses.get(&s.id).is_some_and(|st| st.is_satisfied()));

        // Halted-run note: when a step Failed and the runner broke out of the loop,
        // subsequent steps were never reached and have NO entry in `statuses`. Per
        // FR-040 the next `GET /dependencies` will probe each step fresh — the
        // unreached ones return `NotSatisfied` which renders as `pending`. This is
        // intentional: the user sees `step1 = failed` (overlaid from runner-state),
        // `step2..N = pending`. There is no "blocked-by-upstream" status because the
        // probe is what decides satisfaction, not the runner's halt point.

        // Resolve the terminal outcome: cancellation wins over plain failure (so the
        // UI can show a distinct "cancelled" message), success requires every step
        // to be `Ok` or `Skipped`, anything else is a categorised failure.
        let outcome = if ctx.cancellation_token.is_cancelled() {
            InstallOutcome::Cancelled
        } else if all_satisfied {
            InstallOutcome::Success
        } else {
            InstallOutcome::Failed
        };

        // Always emit the terminal event so subscribers can clear their "active"
        // state. The per-step events emitted earlier convey per-step success/failure;
        // `outcome` here is the one-shot summary so subscribers that don't reconcile
        // per-step events still get an authoritative answer.
        let total_ms = started.elapsed().as_millis() as u64;
        let final_summary: Vec<(&str, &'static str)> = self
            .plan
            .steps
            .iter()
            .map(|s| {
                let kind = match statuses.get(&s.id) {
                    Some(StepStatus::Ok { .. }) => "ok",
                    Some(StepStatus::Skipped { .. }) => "skipped",
                    Some(StepStatus::Failed { .. }) => "failed",
                    Some(StepStatus::Pending) => "pending",
                    Some(StepStatus::Running { .. }) => "running",
                    None => "unreached",
                };
                (s.id.as_str(), kind)
            })
            .collect();
        match outcome {
            InstallOutcome::Success => info!(
                target: "extension_install::runner",
                extension_id = %ctx.extension_id,
                install_run_id = %ctx.install_run_id,
                total_ms,
                summary = ?final_summary,
                "install: run COMPLETE — all_satisfied=true"
            ),
            InstallOutcome::Failed => tracing::error!(
                target: "extension_install::runner",
                extension_id = %ctx.extension_id,
                install_run_id = %ctx.install_run_id,
                total_ms,
                summary = ?final_summary,
                "install: run FAILED — see step:run failed entries above for category + stderr"
            ),
            InstallOutcome::Cancelled => tracing::warn!(
                target: "extension_install::runner",
                extension_id = %ctx.extension_id,
                install_run_id = %ctx.install_run_id,
                total_ms,
                summary = ?final_summary,
                "install: run CANCELLED"
            ),
        }
        ctx.progress_sink.emit(ProgressEvent::InstallCompleted {
            extension_id: ctx.extension_id.to_owned(),
            install_run_id: ctx.install_run_id,
            completed_at: Utc::now(),
            outcome,
        });

        InstallReport {
            statuses,
            all_satisfied,
        }
    }

    /// Re-run a single step regardless of its current status. Downstream steps are
    /// not touched — caller must re-run `run_install` to advance.
    pub async fn run_single_step(
        &self,
        step_id: &str,
        ctx: &mut RunnerContext<'_>,
        upstream_artifacts: &HashMap<String, StepArtifact>,
    ) -> StepStatus {
        let Some(step) = self.plan.steps.iter().find(|s| s.id == step_id) else {
            return StepStatus::Failed {
                error: StepError::new("unknown_step", format!("step '{step_id}' not in plan")),
                failed_at: Utc::now(),
            };
        };
        let outcome = run_one_step(step, &self.registry, ctx, upstream_artifacts).await;
        match outcome {
            StepOutcome::Skipped { reason, .. } => StepStatus::Skipped { reason },
            StepOutcome::Ok { artifact } => StepStatus::Ok {
                artifact,
                completed_at: Utc::now(),
            },
            StepOutcome::Failed { error } => StepStatus::Failed {
                error,
                failed_at: Utc::now(),
            },
        }
    }
}

/// Slim mutable context for a single install run. The `StepContext` per-step is
/// rebuilt from this on each step (so `upstream_artifacts` references the right map).
pub struct RunnerContext<'a> {
    pub extension_id: &'a str,
    pub extension_dir: &'a std::path::Path,
    pub extension_data_dir: &'a std::path::Path,
    pub host_data_dir: &'a std::path::Path,
    pub model_store: Arc<dyn crate::context::ModelStoreClient>,
    pub runtime_bootstrapper: Arc<dyn crate::context::RuntimeBootstrapper>,
    pub worker_handshake: Arc<dyn crate::context::WorkerHandshake>,
    pub fetch_artifact: Arc<crate::fetch::FetchArtifact>,
    pub progress_sink: Arc<dyn ProgressSink>,
    pub cancellation_token: tokio_util::sync::CancellationToken,
    pub install_run_id: uuid::Uuid,
    /// When true, every step's `probe` is bypassed and `run` executes
    /// unconditionally. Used by the "Reinstall everything" CTA so a user
    /// can force a full reinstall even when probes report `Satisfied`.
    pub force: bool,
}

#[derive(Debug)]
pub struct InstallReport {
    pub statuses: HashMap<String, StepStatus>,
    pub all_satisfied: bool,
}

enum StepOutcome {
    /// `Skipped` carries the probe-resolved artifact so downstream steps
    /// can read paths/metadata from already-installed prerequisites.
    /// Without this, a satisfied `runtime` step that gets skipped on a
    /// re-install would leave its python interpreter invisible to a
    /// downstream `validation` step (which then can't find what to spawn).
    Skipped {
        reason: String,
        artifact: Option<StepArtifact>,
    },
    Ok {
        artifact: StepArtifact,
    },
    Failed {
        error: StepError,
    },
}

/// Sink wrapper that stamps the active step's id onto handler-emitted progress
/// events that left it blank. Handlers don't know their own step id (the same
/// handler instance serves every step of its type), so they emit `String::new()`
/// and the runner fills it in here — keeping the host event bus payload keyed by
/// step id without leaking step identity into the handler trait.
struct StepScopedSink {
    inner: Arc<dyn ProgressSink>,
    step_id: String,
}

impl ProgressSink for StepScopedSink {
    fn emit(&self, event: ProgressEvent) {
        let tagged = match event {
            ProgressEvent::StepProgress {
                extension_id,
                install_run_id,
                step_id,
                phase,
                current_bytes,
                total_bytes,
                message,
                pct,
            } => ProgressEvent::StepProgress {
                extension_id,
                install_run_id,
                step_id: if step_id.is_empty() {
                    self.step_id.clone()
                } else {
                    step_id
                },
                phase,
                current_bytes,
                total_bytes,
                message,
                pct,
            },
            other => other,
        };
        self.inner.emit(tagged);
    }
}

fn upstream_satisfied(step: &Step, statuses: &HashMap<String, StepStatus>) -> bool {
    step.requires.iter().all(|r| {
        statuses
            .get(r)
            .is_some_and(|st| matches!(st, StepStatus::Ok { .. } | StepStatus::Skipped { .. }))
    })
}

async fn run_one_step(
    step: &Step,
    registry: &HandlerRegistry,
    ctx: &mut RunnerContext<'_>,
    upstream_artifacts: &HashMap<String, StepArtifact>,
) -> StepOutcome {
    let started = std::time::Instant::now();
    info!(
        target: "extension_install::runner",
        extension_id = %ctx.extension_id,
        step_id = %step.id,
        step_type = %step.step_type,
        requires = ?step.requires,
        "step: enter"
    );

    let Some(handler) = registry.get(&step.step_type) else {
        let error = StepError::new(
            "unknown_step_type",
            format!("no handler registered for type '{}'", step.step_type),
        );
        tracing::error!(
            target: "extension_install::runner",
            step_id = %step.id,
            step_type = %step.step_type,
            "step: no handler registered — failing"
        );
        return StepOutcome::Failed { error };
    };

    // Wrap the shared sink so handler-emitted progress events (which don't know
    // their own step id and pass `String::new()`) are re-tagged with this step's
    // id before reaching the host event bus. The byte-stream fetch path already
    // tags its own step id; the wrapper only fills blanks, never overwrites.
    let scoped_sink: Arc<dyn ProgressSink> = Arc::new(StepScopedSink {
        inner: ctx.progress_sink.clone(),
        step_id: step.id.clone(),
    });

    let step_ctx = StepContext {
        extension_id: ctx.extension_id,
        extension_dir: ctx.extension_dir,
        extension_data_dir: ctx.extension_data_dir,
        host_data_dir: ctx.host_data_dir,
        model_store: ctx.model_store.clone(),
        runtime_bootstrapper: ctx.runtime_bootstrapper.clone(),
        worker_handshake: ctx.worker_handshake.clone(),
        fetch_artifact: ctx.fetch_artifact.clone(),
        progress_sink: scoped_sink,
        cancellation_token: ctx.cancellation_token.clone(),
        install_run_id: ctx.install_run_id,
        force: ctx.force,
        upstream_artifacts,
    };

    // Probe first — unless the runner is in `force` mode, in which case the
    // user explicitly asked for a full reinstall and we go straight to run().
    let emit_probe_failure = |error: StepError| {
        ctx.progress_sink.emit(ProgressEvent::StepFailed {
            extension_id: ctx.extension_id.to_owned(),
            install_run_id: ctx.install_run_id,
            step_id: step.id.clone(),
            failed_at: Utc::now(),
            error: error.clone(),
        });
        StepOutcome::Failed { error }
    };
    if ctx.force {
        info!(
            target: "extension_install::runner",
            step_id = %step.id,
            "step: force=true — skipping probe and running unconditionally"
        );
    } else {
        let probe_started = std::time::Instant::now();
        let probe_result = handler.probe(&step_ctx, &step.spec).await;
        let probe_ms = probe_started.elapsed().as_millis() as u64;
        match probe_result {
            Ok(ProbeResult::Satisfied { artifact }) => {
                info!(
                    target: "extension_install::runner",
                    step_id = %step.id,
                    probe_ms,
                    artifact_path = ?artifact.path,
                    "step: probe satisfied — skipping run (no install needed)"
                );
                debug!(step_id = %step.id, "probe satisfied — skipping run");
                return StepOutcome::Skipped {
                    reason: "already satisfied".to_owned(),
                    artifact: Some(artifact),
                };
            }
            Ok(ProbeResult::Unsupported { reason }) => {
                tracing::warn!(
                    target: "extension_install::runner",
                    step_id = %step.id,
                    probe_ms,
                    %reason,
                    "step: probe reported unsupported platform — failing"
                );
                return emit_probe_failure(StepError::new("unsupported_platform", reason));
            }
            Ok(ProbeResult::NotSatisfied) => {
                info!(
                    target: "extension_install::runner",
                    step_id = %step.id,
                    probe_ms,
                    "step: probe NotSatisfied — proceeding to run"
                );
            }
            Err(e) => {
                tracing::error!(
                    target: "extension_install::runner",
                    step_id = %step.id,
                    probe_ms,
                    error = %e,
                    "step: probe errored — failing"
                );
                return emit_probe_failure(dep_error_to_step_error(e));
            }
        }
    }

    ctx.progress_sink.emit(ProgressEvent::StepStarted {
        extension_id: ctx.extension_id.to_owned(),
        install_run_id: ctx.install_run_id,
        step_id: step.id.clone(),
        step_type: step.step_type.clone(),
        started_at: Utc::now(),
    });

    let run_started = std::time::Instant::now();
    let run_result = handler.run(&step_ctx, &step.spec).await;
    let run_ms = run_started.elapsed().as_millis() as u64;
    match run_result {
        Ok(artifact) => {
            info!(
                target: "extension_install::runner",
                step_id = %step.id,
                run_ms,
                total_ms = started.elapsed().as_millis() as u64,
                summary = %artifact.summary,
                bytes_placed = artifact.bytes_placed,
                "step: run completed Ok"
            );
            ctx.progress_sink.emit(ProgressEvent::StepCompleted {
                extension_id: ctx.extension_id.to_owned(),
                install_run_id: ctx.install_run_id,
                step_id: step.id.clone(),
                completed_at: Utc::now(),
                artifact: artifact.clone(),
            });
            StepOutcome::Ok { artifact }
        }
        Err(e) => {
            let step_error = dep_error_to_step_error(e);
            tracing::error!(
                target: "extension_install::runner",
                step_id = %step.id,
                run_ms,
                category = %step_error.category,
                message = %step_error.message,
                "step: run failed"
            );
            ctx.progress_sink.emit(ProgressEvent::StepFailed {
                extension_id: ctx.extension_id.to_owned(),
                install_run_id: ctx.install_run_id,
                step_id: step.id.clone(),
                failed_at: Utc::now(),
                error: step_error.clone(),
            });
            StepOutcome::Failed { error: step_error }
        }
    }
}

fn apply_outcome(
    step: &Step,
    outcome: StepOutcome,
    statuses: &mut HashMap<String, StepStatus>,
    artifacts: &mut HashMap<String, StepArtifact>,
) {
    match outcome {
        StepOutcome::Skipped { reason, artifact } => {
            if let Some(a) = artifact {
                artifacts.insert(step.id.clone(), a);
            }
            statuses.insert(step.id.clone(), StepStatus::Skipped { reason });
        }
        StepOutcome::Ok { artifact } => {
            artifacts.insert(step.id.clone(), artifact.clone());
            statuses.insert(
                step.id.clone(),
                StepStatus::Ok {
                    artifact,
                    completed_at: Utc::now(),
                },
            );
        }
        StepOutcome::Failed { error } => {
            statuses.insert(
                step.id.clone(),
                StepStatus::Failed {
                    error,
                    failed_at: Utc::now(),
                },
            );
        }
    }
}

fn dep_error_to_step_error(e: DepError) -> StepError {
    match &e {
        DepError::Cancelled => StepError::new("cancelled", "install cancelled"),
        DepError::Sha256Mismatch => StepError::new(
            "sha256_mismatch",
            "Downloaded bytes failed integrity check.",
        )
        .with_hint("Network may be modifying downloads — retry on a different connection."),
        DepError::UnsupportedPlatform { platform } => StepError::new(
            "unsupported_platform",
            format!("no source declared for {platform}"),
        ),
        DepError::UnsupportedArchive { format } => StepError::new(
            "unsupported_archive",
            format!("unsupported archive format: {format}"),
        ),
        DepError::InvalidSpec { field, reason, .. } => {
            StepError::new("invalid_spec", format!("{field}: {reason}"))
        }
        _ => StepError::new("install_failed", e.to_string()),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    use std::path::PathBuf;
    use std::sync::Mutex;

    use async_trait::async_trait;
    use serde_json::Value;

    use crate::context::{
        HandshakeError, ModelDownloadProgress, ModelStoreClient, RuntimeBootstrapResult,
        RuntimeBootstrapper, WorkerHandshake,
    };
    use crate::handler::{HandlerRegistry, StepHandler};
    use crate::plan::{InstallPlan, Step};

    /// Captures everything the runner emits.
    #[derive(Default)]
    struct CapturingSink {
        events: Mutex<Vec<ProgressEvent>>,
    }
    impl ProgressSink for CapturingSink {
        fn emit(&self, event: ProgressEvent) {
            self.events.lock().expect("lock").push(event);
        }
    }

    /// Programmable mock handler keyed by step id.
    struct MockHandler {
        step_type: &'static str,
        outcome: Mutex<Vec<MockOutcome>>,
    }

    #[derive(Clone)]
    enum MockOutcome {
        Probe(ProbeKind),
        Run(RunKind),
    }

    #[derive(Clone)]
    enum ProbeKind {
        NotSatisfied,
        Satisfied,
    }

    #[derive(Clone)]
    enum RunKind {
        Ok,
        Fail(&'static str),
    }

    impl MockHandler {
        fn new(step_type: &'static str, outcomes: Vec<MockOutcome>) -> Self {
            Self {
                step_type,
                outcome: Mutex::new(outcomes),
            }
        }
        fn pop(&self) -> Option<MockOutcome> {
            let mut v = self.outcome.lock().expect("lock");
            if v.is_empty() {
                None
            } else {
                Some(v.remove(0))
            }
        }
    }

    #[async_trait]
    impl StepHandler for MockHandler {
        fn step_type(&self) -> &'static str {
            self.step_type
        }
        fn validate(&self, _spec: &Value) -> Result<(), DepError> {
            Ok(())
        }
        async fn probe(
            &self,
            _ctx: &StepContext<'_>,
            _spec: &Value,
        ) -> Result<crate::handler::ProbeResult, DepError> {
            match self.pop() {
                Some(MockOutcome::Probe(ProbeKind::Satisfied)) => {
                    Ok(crate::handler::ProbeResult::Satisfied {
                        artifact: StepArtifact::empty("mock satisfied"),
                    })
                }
                _ => Ok(crate::handler::ProbeResult::NotSatisfied),
            }
        }
        async fn run(
            &self,
            _ctx: &StepContext<'_>,
            _spec: &Value,
        ) -> Result<StepArtifact, DepError> {
            match self.pop() {
                Some(MockOutcome::Run(RunKind::Ok)) => Ok(StepArtifact::empty("mock ok")),
                Some(MockOutcome::Run(RunKind::Fail(msg))) => Err(DepError::Backend(msg.into())),
                other => panic!("unexpected mock state: {:?}", other.is_some()),
            }
        }
    }

    struct StubModelStore;
    #[async_trait]
    impl ModelStoreClient for StubModelStore {
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
        async fn poll_job(&self, _id: &str) -> Result<ModelDownloadProgress, DepError> {
            unreachable!()
        }
    }

    struct StubRuntime;
    #[async_trait]
    impl RuntimeBootstrapper for StubRuntime {
        async fn probe(
            &self,
            _f: &str,
            _v: Option<&str>,
            _a: &[String],
            _t: &std::path::Path,
        ) -> Result<Option<RuntimeBootstrapResult>, DepError> {
            unreachable!()
        }
        async fn bootstrap(
            &self,
            _f: &str,
            _v: Option<&str>,
            _a: &[String],
            _t: &std::path::Path,
            _c: tokio_util::sync::CancellationToken,
        ) -> Result<RuntimeBootstrapResult, DepError> {
            unreachable!()
        }
    }

    struct StubHandshake;
    #[async_trait]
    impl WorkerHandshake for StubHandshake {
        async fn run_handshake(
            &self,
            _ext: &str,
            _dir: &std::path::Path,
            _data: &std::path::Path,
            _ups: &HashMap<String, StepArtifact>,
            _t: std::time::Duration,
            _c: tokio_util::sync::CancellationToken,
        ) -> Result<(), HandshakeError> {
            unreachable!()
        }
    }

    fn stub_fetch_artifact() -> Arc<crate::fetch::FetchArtifact> {
        Arc::new(|_req: crate::fetch::FetchRequest| {
            Box::pin(async move { Err(DepError::Backend("stub fetch_artifact called".into())) })
        })
    }

    fn build_runner(steps: Vec<Step>, registry: HandlerRegistry) -> InstallRunner {
        InstallRunner::new(
            InstallPlan {
                extension_id: "test.ext".to_owned(),
                steps,
            },
            Arc::new(registry),
        )
    }

    fn build_runner_ctx<'a>(
        sink: &Arc<dyn ProgressSink>,
        tmp: &'a std::path::Path,
    ) -> RunnerContext<'a> {
        RunnerContext {
            extension_id: "test.ext",
            extension_dir: tmp,
            extension_data_dir: tmp,
            host_data_dir: tmp,
            model_store: Arc::new(StubModelStore),
            runtime_bootstrapper: Arc::new(StubRuntime),
            worker_handshake: Arc::new(StubHandshake),
            fetch_artifact: stub_fetch_artifact(),
            progress_sink: sink.clone(),
            cancellation_token: tokio_util::sync::CancellationToken::new(),
            install_run_id: uuid::Uuid::nil(),
            force: false,
        }
    }

    #[tokio::test]
    async fn runs_steps_sequentially_to_success() {
        let mut registry = HandlerRegistry::new();
        registry.register(Box::new(MockHandler::new(
            "alpha",
            vec![
                MockOutcome::Probe(ProbeKind::NotSatisfied),
                MockOutcome::Run(RunKind::Ok),
            ],
        )));
        registry.register(Box::new(MockHandler::new(
            "beta",
            vec![
                MockOutcome::Probe(ProbeKind::NotSatisfied),
                MockOutcome::Run(RunKind::Ok),
            ],
        )));

        let runner = build_runner(
            vec![
                Step {
                    id: "a".to_owned(),
                    step_type: "alpha".to_owned(),
                    requires: vec![],
                    spec: Value::Null,
                },
                Step {
                    id: "b".to_owned(),
                    step_type: "beta".to_owned(),
                    requires: vec!["a".to_owned()],
                    spec: Value::Null,
                },
            ],
            registry,
        );

        let sink: Arc<dyn ProgressSink> = Arc::new(CapturingSink::default());
        let tmp = tempfile::tempdir().unwrap();
        let mut rctx = build_runner_ctx(&sink, tmp.path());
        let report = runner.run_install(&mut rctx).await;
        assert!(report.all_satisfied);
        assert!(matches!(report.statuses["a"], StepStatus::Ok { .. }));
        assert!(matches!(report.statuses["b"], StepStatus::Ok { .. }));
    }

    #[tokio::test]
    async fn halts_on_first_failure_downstream_stays_pending() {
        let mut registry = HandlerRegistry::new();
        registry.register(Box::new(MockHandler::new(
            "alpha",
            vec![
                MockOutcome::Probe(ProbeKind::NotSatisfied),
                MockOutcome::Run(RunKind::Fail("boom")),
            ],
        )));
        registry.register(Box::new(MockHandler::new(
            "beta",
            vec![
                MockOutcome::Probe(ProbeKind::NotSatisfied),
                MockOutcome::Run(RunKind::Ok),
            ],
        )));

        let runner = build_runner(
            vec![
                Step {
                    id: "a".to_owned(),
                    step_type: "alpha".to_owned(),
                    requires: vec![],
                    spec: Value::Null,
                },
                Step {
                    id: "b".to_owned(),
                    step_type: "beta".to_owned(),
                    requires: vec!["a".to_owned()],
                    spec: Value::Null,
                },
            ],
            registry,
        );

        let sink: Arc<dyn ProgressSink> = Arc::new(CapturingSink::default());
        let tmp = tempfile::tempdir().unwrap();
        let mut rctx = build_runner_ctx(&sink, tmp.path());
        let report = runner.run_install(&mut rctx).await;
        assert!(!report.all_satisfied);
        assert!(matches!(report.statuses["a"], StepStatus::Failed { .. }));
        // 'b' was never run because 'a' failed.
        assert!(!report.statuses.contains_key("b"));
    }

    #[tokio::test]
    async fn skips_already_satisfied_step() {
        let mut registry = HandlerRegistry::new();
        registry.register(Box::new(MockHandler::new(
            "alpha",
            vec![MockOutcome::Probe(ProbeKind::Satisfied)],
        )));

        let runner = build_runner(
            vec![Step {
                id: "a".to_owned(),
                step_type: "alpha".to_owned(),
                requires: vec![],
                spec: Value::Null,
            }],
            registry,
        );

        let sink: Arc<dyn ProgressSink> = Arc::new(CapturingSink::default());
        let tmp = tempfile::tempdir().unwrap();
        let mut rctx = build_runner_ctx(&sink, tmp.path());
        let report = runner.run_install(&mut rctx).await;
        assert!(report.all_satisfied);
        assert!(matches!(report.statuses["a"], StepStatus::Skipped { .. }));
    }

    #[test]
    fn step_scoped_sink_fills_blank_step_id_only() {
        let inner = Arc::new(CapturingSink::default());
        let scoped = StepScopedSink {
            inner: inner.clone(),
            step_id: "step-x".to_owned(),
        };
        scoped.emit(ProgressEvent::step_progress(
            "ext",
            uuid::Uuid::nil(),
            String::new(),
            crate::types::StepProgress::phase("downloading"),
        ));
        scoped.emit(ProgressEvent::step_progress(
            "ext",
            uuid::Uuid::nil(),
            "explicit-id",
            crate::types::StepProgress::phase("done"),
        ));
        let events = inner.events.lock().expect("lock");
        let ids: Vec<String> = events
            .iter()
            .filter_map(|e| match e {
                ProgressEvent::StepProgress { step_id, .. } => Some(step_id.clone()),
                _ => None,
            })
            .collect();
        assert_eq!(ids, vec!["step-x".to_owned(), "explicit-id".to_owned()]);
    }

    /// AC-2.6 at the runner level: a handler whose `run()` emits a blank-step-id
    /// progress event has it re-tagged with the active step id, AND the runner's
    /// `StepStarted` precedes the first progress event for that step.
    #[tokio::test]
    async fn runner_retags_handler_progress_and_orders_started_first() {
        struct ProgressEmittingHandler;
        #[async_trait]
        impl StepHandler for ProgressEmittingHandler {
            fn step_type(&self) -> &'static str {
                "emitter"
            }
            fn validate(&self, _spec: &Value) -> Result<(), DepError> {
                Ok(())
            }
            async fn probe(
                &self,
                _ctx: &StepContext<'_>,
                _spec: &Value,
            ) -> Result<crate::handler::ProbeResult, DepError> {
                Ok(crate::handler::ProbeResult::NotSatisfied)
            }
            async fn run(
                &self,
                ctx: &StepContext<'_>,
                _spec: &Value,
            ) -> Result<StepArtifact, DepError> {
                ctx.progress_sink.emit(ProgressEvent::step_progress(
                    ctx.extension_id,
                    ctx.install_run_id,
                    String::new(),
                    crate::types::StepProgress::bytes("downloading", 1, 2),
                ));
                Ok(StepArtifact::empty("ok"))
            }
        }

        let mut registry = HandlerRegistry::new();
        registry.register(Box::new(ProgressEmittingHandler));
        let runner = build_runner(
            vec![Step {
                id: "only".to_owned(),
                step_type: "emitter".to_owned(),
                requires: vec![],
                spec: Value::Null,
            }],
            registry,
        );

        let capturing = Arc::new(CapturingSink::default());
        let sink: Arc<dyn ProgressSink> = capturing.clone();
        let tmp = tempfile::tempdir().unwrap();
        let mut rctx = build_runner_ctx(&sink, tmp.path());
        runner.run_install(&mut rctx).await;

        let captured = capturing.events.lock().expect("lock");
        let started_idx = captured.iter().position(
            |e| matches!(e, ProgressEvent::StepStarted { step_id, .. } if step_id == "only"),
        );
        let progress_idx = captured.iter().position(
            |e| matches!(e, ProgressEvent::StepProgress { step_id, phase, .. } if step_id == "only" && phase == "downloading"),
        );
        let started_idx = started_idx.expect("StepStarted emitted");
        let progress_idx = progress_idx.expect("re-tagged StepProgress emitted");
        assert!(
            started_idx < progress_idx,
            "StepStarted must precede first progress (AC-2.6)"
        );
    }

    #[tokio::test]
    async fn run_single_step_doesnt_touch_downstream() {
        let mut registry = HandlerRegistry::new();
        registry.register(Box::new(MockHandler::new(
            "alpha",
            vec![
                MockOutcome::Probe(ProbeKind::NotSatisfied),
                MockOutcome::Run(RunKind::Ok),
            ],
        )));
        registry.register(Box::new(MockHandler::new("beta", vec![])));

        let runner = build_runner(
            vec![
                Step {
                    id: "a".to_owned(),
                    step_type: "alpha".to_owned(),
                    requires: vec![],
                    spec: Value::Null,
                },
                Step {
                    id: "b".to_owned(),
                    step_type: "beta".to_owned(),
                    requires: vec!["a".to_owned()],
                    spec: Value::Null,
                },
            ],
            registry,
        );

        let sink: Arc<dyn ProgressSink> = Arc::new(CapturingSink::default());
        let tmp = tempfile::tempdir().unwrap();
        let mut rctx = build_runner_ctx(&sink, tmp.path());
        let result = runner
            .run_single_step("a", &mut rctx, &HashMap::new())
            .await;
        assert!(matches!(result, StepStatus::Ok { .. }));
        // 'b' was never invoked — its outcome stack is empty so any call would panic.
    }
}
