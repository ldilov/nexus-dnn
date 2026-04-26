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
        let mut statuses: HashMap<String, StepStatus> = HashMap::new();
        let mut artifacts: HashMap<String, StepArtifact> = HashMap::new();

        for step in &self.plan.steps {
            // Skip if any upstream-required step failed. Downstream steps stay
            // pending so the user can see exactly what's blocked.
            if !upstream_satisfied(step, &statuses) {
                statuses.insert(step.id.clone(), StepStatus::Pending);
                continue;
            }

            let outcome = run_one_step(step, &self.registry, ctx, &artifacts).await;
            apply_outcome(step, outcome, &mut statuses, &mut artifacts);

            // Halt on first failure. Subsequent steps stay pending.
            if matches!(statuses.get(&step.id), Some(StepStatus::Failed { .. })) {
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
            StepOutcome::Skipped { reason } => StepStatus::Skipped { reason },
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
}

#[derive(Debug)]
pub struct InstallReport {
    pub statuses: HashMap<String, StepStatus>,
    pub all_satisfied: bool,
}

enum StepOutcome {
    Skipped { reason: String },
    Ok { artifact: StepArtifact },
    Failed { error: StepError },
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
    let Some(handler) = registry.get(&step.step_type) else {
        return StepOutcome::Failed {
            error: StepError::new(
                "unknown_step_type",
                format!("no handler registered for type '{}'", step.step_type),
            ),
        };
    };

    let step_ctx = StepContext {
        extension_id: ctx.extension_id,
        extension_dir: ctx.extension_dir,
        extension_data_dir: ctx.extension_data_dir,
        host_data_dir: ctx.host_data_dir,
        model_store: ctx.model_store.clone(),
        runtime_bootstrapper: ctx.runtime_bootstrapper.clone(),
        worker_handshake: ctx.worker_handshake.clone(),
        fetch_artifact: ctx.fetch_artifact.clone(),
        progress_sink: ctx.progress_sink.clone(),
        cancellation_token: ctx.cancellation_token.clone(),
        install_run_id: ctx.install_run_id,
        upstream_artifacts,
    };

    // Probe first.
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
    match handler.probe(&step_ctx, &step.spec).await {
        Ok(ProbeResult::Satisfied { .. }) => {
            debug!(step_id = %step.id, "probe satisfied — skipping run");
            return StepOutcome::Skipped {
                reason: "already satisfied".to_owned(),
            };
        }
        Ok(ProbeResult::Unsupported { reason }) => {
            return emit_probe_failure(StepError::new("unsupported_platform", reason));
        }
        Ok(ProbeResult::NotSatisfied) => {
            // fall through
        }
        Err(e) => {
            return emit_probe_failure(dep_error_to_step_error(e));
        }
    }

    ctx.progress_sink.emit(ProgressEvent::StepStarted {
        extension_id: ctx.extension_id.to_owned(),
        install_run_id: ctx.install_run_id,
        step_id: step.id.clone(),
        step_type: step.step_type.clone(),
        started_at: Utc::now(),
    });

    match handler.run(&step_ctx, &step.spec).await {
        Ok(artifact) => {
            info!(step_id = %step.id, "step completed");
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
        StepOutcome::Skipped { reason } => {
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
        async fn start_download(&self, _f: &str, _a: Option<&str>) -> Result<String, DepError> {
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
