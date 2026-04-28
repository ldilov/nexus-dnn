//! Spec 035 T088 — `probe()` p95 timing test.
//!
//! Plan-level performance assertion from spec 035 plan.md:
//!   "probe() per step: <100ms p95 (filesystem stat + at most one DB row lookup)"
//!
//! Strategy: build a 5-step plan against a populated host data dir, run the
//! built-in handlers' `probe()` 100 times, assert p95 < 100ms. Uses the same
//! mocks as the install_flow_test (no real network/subprocess).

mod common;

use std::collections::HashMap;
use std::path::{Path, PathBuf};
use std::sync::{Arc, Mutex};
use std::time::{Duration, Instant};

use async_trait::async_trait;
use tokio_util::sync::CancellationToken;
use uuid::Uuid;

use nexus_extension_deps::{
    DepError, DependenciesBlock, HandlerRegistry, HandshakeError, ModelDownloadProgress,
    ModelStoreClient, ProbeResult, ProgressEvent, ProgressSink, RunnerContext,
    RuntimeBootstrapResult, RuntimeBootstrapper, Step, StepArtifact, StepContext, WorkerHandshake,
    fetch::{FetchArtifact, FetchRequest, fetch_artifact},
    parse_dependencies_block,
};

#[derive(Default)]
struct DiscardSink;
impl ProgressSink for DiscardSink {
    fn emit(&self, _event: ProgressEvent) {}
}

struct AlwaysSatisfiedRuntime;
#[async_trait]
impl RuntimeBootstrapper for AlwaysSatisfiedRuntime {
    async fn probe(
        &self,
        _f: &str,
        _v: Option<&str>,
        _a: &[String],
        target_dir: &Path,
    ) -> Result<Option<RuntimeBootstrapResult>, DepError> {
        Ok(Some(RuntimeBootstrapResult {
            install_dir: target_dir.to_path_buf(),
            resolved_version: "3.11.9".into(),
            resolved_profile: Some("cuda12".into()),
            bytes_placed: 0,
        }))
    }
    async fn bootstrap(
        &self,
        _f: &str,
        _v: Option<&str>,
        _a: &[String],
        _t: &Path,
        _c: CancellationToken,
    ) -> Result<RuntimeBootstrapResult, DepError> {
        unreachable!()
    }
}

struct AlwaysInstalledModelStore;
#[async_trait]
impl ModelStoreClient for AlwaysInstalledModelStore {
    async fn is_family_installed(
        &self,
        _f: &str,
        _a: Option<&str>,
    ) -> Result<Option<PathBuf>, DepError> {
        Ok(Some(PathBuf::from("/.../models/test/1.0")))
    }
    async fn start_download(&self, _f: &str, _a: Option<&str>) -> Result<String, DepError> {
        unreachable!()
    }
    async fn poll_job(&self, _id: &str) -> Result<ModelDownloadProgress, DepError> {
        unreachable!()
    }
}

struct StubHandshake;
#[async_trait]
impl WorkerHandshake for StubHandshake {
    async fn run_handshake(
        &self,
        _ext: &str,
        _dir: &Path,
        _data: &Path,
        _ups: &HashMap<String, StepArtifact>,
        _t: Duration,
        _c: CancellationToken,
    ) -> Result<(), HandshakeError> {
        unreachable!()
    }
}

fn fetch() -> Arc<FetchArtifact> {
    Arc::new(|req: FetchRequest| Box::pin(fetch_artifact(req)))
}

fn percentile(mut samples: Vec<u128>, pct: f64) -> u128 {
    samples.sort_unstable();
    let idx = ((samples.len() as f64 - 1.0) * pct).round() as usize;
    samples[idx]
}

#[tokio::test]
async fn probe_p95_under_100ms_across_5_step_plan() {
    let host_dir = tempfile::tempdir().expect("tempdir");
    let ext_dir = tempfile::tempdir().expect("tempdir");

    // Pre-populate the system_binary content-addressed dir so its probe()
    // returns Satisfied without hitting the network.
    let bin_sha = "a".repeat(64);
    let bin_dir = host_dir
        .path()
        .join("extensions")
        .join("test.perf")
        .join("runtime")
        .join("binaries")
        .join("ffmpeg")
        .join(&bin_sha[..8]);
    tokio::fs::create_dir_all(&bin_dir).await.expect("mkdir");
    tokio::fs::write(bin_dir.join("ffmpeg.bin"), b"fake")
        .await
        .expect("write");

    let block = DependenciesBlock {
        steps: vec![
            Step {
                id: "python".into(),
                step_type: "runtime".into(),
                requires: vec![],
                spec: serde_json::json!({
                    "family": "python",
                    "version": ">=3.11"
                }),
            },
            Step {
                id: "ffmpeg".into(),
                step_type: "system_binary".into(),
                requires: vec![],
                spec: serde_json::json!({
                    "id": "ffmpeg",
                    "sources": [{
                        "platform": nexus_extension_deps::PlatformTuple::host().as_canonical(),
                        "url": "https://example.invalid/ffmpeg.bin",
                        "sha256": bin_sha,
                        "size": 4,
                        "archive": "none"
                    }]
                }),
            },
            Step {
                id: "models".into(),
                step_type: "model_artifact".into(),
                requires: vec!["python".into()],
                spec: serde_json::json!({
                    "family_id": "test/model",
                    "acceleration_match": "cuda12"
                }),
            },
            Step {
                id: "validate".into(),
                step_type: "validation".into(),
                requires: vec!["python".into(), "ffmpeg".into(), "models".into()],
                spec: serde_json::json!({ "kind": "worker_handshake", "timeout_seconds": 60 }),
            },
        ],
    };

    let registry = HandlerRegistry::default();
    let plan = parse_dependencies_block("test.perf", block, &registry).expect("plan");

    let progress_sink: Arc<dyn ProgressSink> = Arc::new(DiscardSink);
    let runner_ctx_fields = RunnerContext {
        extension_id: "test.perf",
        extension_dir: ext_dir.path(),
        extension_data_dir: &host_dir.path().join("extensions").join("test.perf"),
        host_data_dir: host_dir.path(),
        model_store: Arc::new(AlwaysInstalledModelStore),
        runtime_bootstrapper: Arc::new(AlwaysSatisfiedRuntime),
        worker_handshake: Arc::new(StubHandshake),
        fetch_artifact: fetch(),
        progress_sink: progress_sink.clone(),
        cancellation_token: CancellationToken::new(),
        install_run_id: Uuid::nil(),
        force: false,
    };

    let upstream: HashMap<String, StepArtifact> = HashMap::new();
    let mut samples: Vec<u128> = Vec::with_capacity(100);

    // Warm up.
    for _ in 0..10 {
        for step in &plan.steps {
            let handler = registry.get(&step.step_type).expect("registered");
            let step_ctx = StepContext {
                extension_id: runner_ctx_fields.extension_id,
                extension_dir: runner_ctx_fields.extension_dir,
                extension_data_dir: runner_ctx_fields.extension_data_dir,
                host_data_dir: runner_ctx_fields.host_data_dir,
                model_store: runner_ctx_fields.model_store.clone(),
                runtime_bootstrapper: runner_ctx_fields.runtime_bootstrapper.clone(),
                worker_handshake: runner_ctx_fields.worker_handshake.clone(),
                fetch_artifact: runner_ctx_fields.fetch_artifact.clone(),
                progress_sink: runner_ctx_fields.progress_sink.clone(),
                cancellation_token: runner_ctx_fields.cancellation_token.clone(),
                install_run_id: runner_ctx_fields.install_run_id,
                upstream_artifacts: &upstream,
            };
            let _ = handler.probe(&step_ctx, &step.spec).await;
        }
    }

    // Hot loop — measure per full-plan probe pass.
    for _ in 0..100 {
        let start = Instant::now();
        for step in &plan.steps {
            let handler = registry.get(&step.step_type).expect("registered");
            let step_ctx = StepContext {
                extension_id: runner_ctx_fields.extension_id,
                extension_dir: runner_ctx_fields.extension_dir,
                extension_data_dir: runner_ctx_fields.extension_data_dir,
                host_data_dir: runner_ctx_fields.host_data_dir,
                model_store: runner_ctx_fields.model_store.clone(),
                runtime_bootstrapper: runner_ctx_fields.runtime_bootstrapper.clone(),
                worker_handshake: runner_ctx_fields.worker_handshake.clone(),
                fetch_artifact: runner_ctx_fields.fetch_artifact.clone(),
                progress_sink: runner_ctx_fields.progress_sink.clone(),
                cancellation_token: runner_ctx_fields.cancellation_token.clone(),
                install_run_id: runner_ctx_fields.install_run_id,
                upstream_artifacts: &upstream,
            };
            let outcome = handler.probe(&step_ctx, &step.spec).await;
            assert!(outcome.is_ok());
            // validation handler always returns NotSatisfied; others return Satisfied
            if step.id != "validate" {
                assert!(matches!(outcome.unwrap(), ProbeResult::Satisfied { .. }));
            }
        }
        samples.push(start.elapsed().as_micros());
    }

    let p95_us = percentile(samples.clone(), 0.95);
    let p99_us = percentile(samples.clone(), 0.99);
    let max_us = samples.iter().copied().max().unwrap_or(0);

    eprintln!(
        "probe perf: p95={}μs p99={}μs max={}μs (target <100ms)",
        p95_us, p99_us, max_us
    );

    // Plan target: <100ms p95 across the full 4-step plan probe pass.
    assert!(
        p95_us < 100_000,
        "probe p95 = {}μs exceeded 100ms budget; max={}μs",
        p95_us,
        max_us
    );
}
