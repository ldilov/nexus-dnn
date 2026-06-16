//! Spec 035 T053 — end-to-end install flow against the built-in handlers.
//!
//! Exercises 4 of the 5 step types (`runtime`, `system_binary`, `model_artifact`,
//! `validation`) with real handler implementations and mock services. The fifth
//! type (`package_set`) is excluded here because its `run()` spawns a real `uv`
//! binary which is not available in CI test environments — that path is covered
//! by T086 (smoke proof against a clean host data dir with real adapters wired).
//!
//! Fixture strategy (per the spec self-review T053 expansion):
//! - `wiremock` mock server for `system_binary` HTTP downloads
//! - `tempfile::TempDir` for `host_data_dir` and `extension_dir`
//! - Mock `RuntimeBootstrapper` that creates the install dir + returns a
//!   resolved profile metadata blob (so the downstream `model_artifact` step's
//!   `matches_runtime_step:python` sentinel resolves)
//! - Mock `ModelStoreClient` whose `probe()` flips from `None` to `Some(path)`
//!   after `start_download` is called
//! - Mock `WorkerHandshake` that returns `Ok(())` on the first invocation
//!
//! Assertions: end-to-end success path + **idempotency** — invoking
//! `run_install` again on a satisfied state results in every step `Skipped`,
//! no second downloads, no second bootstraps.

mod common;

use std::collections::HashMap;
use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::{Arc, Mutex};
use std::time::Duration;

use async_trait::async_trait;
use sha2::{Digest, Sha256};
use tokio_util::sync::CancellationToken;
use uuid::Uuid;
use wiremock::matchers::{method, path};
use wiremock::{Mock, MockServer, ResponseTemplate};

use nexus_extension_deps::{
    DepError, DependenciesBlock, HandlerRegistry, HandshakeError, InstallRunner,
    ModelDownloadProgress, ModelStoreClient, ProgressEvent, ProgressSink, RunnerContext,
    RuntimeBootstrapResult, RuntimeBootstrapper, Step, StepArtifact, StepStatus, WorkerHandshake,
    fetch::{FetchArtifact, FetchRequest, fetch_artifact},
    parse_dependencies_block,
};

#[derive(Default)]
struct CapturingSink {
    events: Mutex<Vec<ProgressEvent>>,
}

impl ProgressSink for CapturingSink {
    fn emit(&self, event: ProgressEvent) {
        self.events.lock().expect("lock").push(event);
    }
}

#[derive(Default)]
struct MockRuntime {
    bootstrap_calls: AtomicUsize,
    install_dir: Mutex<Option<PathBuf>>,
}

#[async_trait]
impl RuntimeBootstrapper for MockRuntime {
    async fn probe(
        &self,
        _family: &str,
        _version: Option<&str>,
        _accelerator_profiles: &[String],
        target_dir: &Path,
    ) -> Result<Option<RuntimeBootstrapResult>, DepError> {
        // Satisfied iff the install dir already exists with the marker.
        let marker = target_dir.join(".python_installed");
        if marker.exists() {
            return Ok(Some(RuntimeBootstrapResult {
                install_dir: target_dir.to_path_buf(),
                resolved_version: "3.11.9".into(),
                resolved_profile: Some("cuda12".into()),
                bytes_placed: 480_000_000,
            }));
        }
        Ok(None)
    }

    async fn bootstrap(
        &self,
        _family: &str,
        _version: Option<&str>,
        _accelerator_profiles: &[String],
        target_dir: &Path,
        _cancellation: CancellationToken,
    ) -> Result<RuntimeBootstrapResult, DepError> {
        self.bootstrap_calls.fetch_add(1, Ordering::SeqCst);
        tokio::fs::create_dir_all(target_dir).await?;
        tokio::fs::write(target_dir.join(".python_installed"), b"ok").await?;
        *self.install_dir.lock().expect("lock") = Some(target_dir.to_path_buf());
        Ok(RuntimeBootstrapResult {
            install_dir: target_dir.to_path_buf(),
            resolved_version: "3.11.9".into(),
            resolved_profile: Some("cuda12".into()),
            bytes_placed: 480_000_000,
        })
    }
}

#[derive(Default)]
struct MockModelStore {
    download_calls: AtomicUsize,
    poll_calls: AtomicUsize,
    installed_path: Mutex<Option<PathBuf>>,
    accelerator_seen: Mutex<Option<String>>,
}

// Intentionally does NOT override `verify_files_present`: the full-install test
// uses an unrestricted (no `files[]`) model_artifact selection, so probe() takes
// the no-network fast path and never calls it. A future author who adds an
// explicit `files[]` selection to that test must also override this here, or the
// default no-op will give a false "all present" pass.
#[async_trait]
impl ModelStoreClient for MockModelStore {
    async fn is_family_installed(
        &self,
        _family_id: &str,
        _accelerator: Option<&str>,
    ) -> Result<Option<PathBuf>, DepError> {
        Ok(self.installed_path.lock().expect("lock").clone())
    }

    async fn start_download(
        &self,
        _family_id: &str,
        accelerator: Option<&str>,
        _selection: &nexus_extension_deps::FileSelection,
    ) -> Result<String, DepError> {
        self.download_calls.fetch_add(1, Ordering::SeqCst);
        *self.accelerator_seen.lock().expect("lock") = accelerator.map(String::from);
        Ok("mock-job-id".into())
    }

    async fn poll_job(&self, _id: &str) -> Result<ModelDownloadProgress, DepError> {
        self.poll_calls.fetch_add(1, Ordering::SeqCst);
        // Complete on first poll for test speed.
        let path = std::env::temp_dir().join("mock-model-artifact");
        *self.installed_path.lock().expect("lock") = Some(path.clone());
        Ok(ModelDownloadProgress::Completed {
            path,
            bytes_placed: 12_000_000_000,
        })
    }
}

#[derive(Default)]
struct MockHandshake {
    invocations: AtomicUsize,
}

#[async_trait]
impl WorkerHandshake for MockHandshake {
    async fn run_handshake(
        &self,
        _ext: &str,
        _dir: &Path,
        _data: &Path,
        _ups: &HashMap<String, StepArtifact>,
        _t: Duration,
        _c: CancellationToken,
    ) -> Result<(), HandshakeError> {
        self.invocations.fetch_add(1, Ordering::SeqCst);
        Ok(())
    }
}

fn fetch_artifact_arc() -> Arc<FetchArtifact> {
    Arc::new(|req: FetchRequest| Box::pin(fetch_artifact(req)))
}

fn sha256_hex(bytes: &[u8]) -> String {
    let digest = Sha256::digest(bytes);
    let mut s = String::with_capacity(digest.len() * 2);
    for b in digest {
        s.push_str(&format!("{b:02x}"));
    }
    s
}

/// Model store modelling a partial HuggingFace family install: the family
/// looks installed (`is_family_installed` → Some) but one declared file is
/// absent until `start_download` runs once, after which the per-file verify
/// reports nothing missing (the heal).
#[derive(Default)]
struct PartialMockModelStore {
    download_calls: AtomicUsize,
    healed: std::sync::atomic::AtomicBool,
}

#[async_trait]
impl ModelStoreClient for PartialMockModelStore {
    async fn is_family_installed(
        &self,
        _family_id: &str,
        _accelerator: Option<&str>,
    ) -> Result<Option<PathBuf>, DepError> {
        Ok(Some(std::env::temp_dir().join("partial-family")))
    }

    async fn verify_files_present(
        &self,
        _family_id: &str,
        _accelerator: Option<&str>,
        _selection: &nexus_extension_deps::FileSelection,
    ) -> Result<Vec<String>, DepError> {
        if self.healed.load(Ordering::SeqCst) {
            Ok(Vec::new())
        } else {
            Ok(vec!["t2v.safetensors".to_owned()])
        }
    }

    async fn start_download(
        &self,
        _family_id: &str,
        _accelerator: Option<&str>,
        _selection: &nexus_extension_deps::FileSelection,
    ) -> Result<String, DepError> {
        self.download_calls.fetch_add(1, Ordering::SeqCst);
        self.healed.store(true, Ordering::SeqCst);
        Ok("partial-job".into())
    }

    async fn poll_job(&self, _id: &str) -> Result<ModelDownloadProgress, DepError> {
        Ok(ModelDownloadProgress::Completed {
            path: std::env::temp_dir().join("partial-family"),
            bytes_placed: 1_000,
        })
    }
}

/// A model_artifact step whose family is on disk but is missing a declared
/// file must probe NotSatisfied and then heal via exactly one download — not
/// short-circuit Satisfied and let the render fail at load time.
#[tokio::test]
async fn partial_install_probe_returns_not_satisfied_and_run_heals() {
    let host_dir = tempfile::tempdir().expect("tempdir");
    let ext_dir = tempfile::tempdir().expect("tempdir");

    let runtime = Arc::new(MockRuntime::default());
    let model_store = Arc::new(PartialMockModelStore::default());
    let handshake = Arc::new(MockHandshake::default());
    let sink = Arc::new(CapturingSink::default());

    let block = DependenciesBlock {
        steps: vec![Step {
            id: "models".into(),
            step_type: "model_artifact".into(),
            requires: vec![],
            spec: serde_json::json!({
                "family_id": "huggingface:Owner/Repo",
                "files": ["i2v.safetensors", "t2v.safetensors"],
            }),
        }],
    };

    let registry = HandlerRegistry::default();
    let plan = parse_dependencies_block("test.partial", block, &registry).expect("parses");
    let runner = InstallRunner::new(plan, Arc::new(registry));
    let progress_sink: Arc<dyn ProgressSink> = sink.clone();
    let mut ctx = RunnerContext {
        extension_id: "test.partial",
        extension_dir: ext_dir.path(),
        extension_data_dir: host_dir.path(),
        host_data_dir: host_dir.path(),
        model_store: model_store.clone() as Arc<dyn ModelStoreClient>,
        runtime_bootstrapper: runtime.clone() as Arc<dyn RuntimeBootstrapper>,
        worker_handshake: handshake.clone() as Arc<dyn WorkerHandshake>,
        fetch_artifact: fetch_artifact_arc(),
        progress_sink,
        cancellation_token: CancellationToken::new(),
        install_run_id: Uuid::nil(),
        force: false,
    };

    let report = runner.run_install(&mut ctx).await;
    assert!(
        report.all_satisfied,
        "the partial install heals to satisfied"
    );
    assert!(matches!(report.statuses["models"], StepStatus::Ok { .. }));
    assert_eq!(
        model_store.download_calls.load(Ordering::SeqCst),
        1,
        "exactly one download drives the heal"
    );
}

#[tokio::test]
async fn full_install_flow_succeeds_and_is_idempotent() {
    // Mock HTTP server for the system_binary step.
    let server = MockServer::start().await;
    let bin_payload = b"fake ffmpeg binary contents".to_vec();
    let bin_sha = sha256_hex(&bin_payload);
    Mock::given(method("GET"))
        .and(path("/ffmpeg.bin"))
        .respond_with(ResponseTemplate::new(200).set_body_bytes(bin_payload.clone()))
        .mount(&server)
        .await;

    let host_dir = tempfile::tempdir().expect("tempdir");
    let ext_dir = tempfile::tempdir().expect("tempdir");

    let runtime = Arc::new(MockRuntime::default());
    let model_store = Arc::new(MockModelStore::default());
    let handshake = Arc::new(MockHandshake::default());
    let sink = Arc::new(CapturingSink::default());

    // 4-step plan exercising runtime + system_binary + model_artifact + validation
    // (package_set excluded — covered by T086 smoke proof).
    let block = DependenciesBlock {
        steps: vec![
            Step {
                id: "python".into(),
                step_type: "runtime".into(),
                requires: vec![],
                spec: serde_json::json!({
                    "family": "python",
                    "version": ">=3.11,<3.13",
                    "accelerator_profiles": ["cpu", "cuda12"]
                }),
            },
            Step {
                id: "ffmpeg".into(),
                step_type: "system_binary".into(),
                requires: vec![],
                spec: serde_json::json!({
                    "id": "ffmpeg",
                    "version": ">=4.0",
                    "sources": [{
                        "platform": nexus_extension_deps::PlatformTuple::host().as_canonical(),
                        "url": format!("{}/ffmpeg.bin", server.uri()),
                        "sha256": bin_sha,
                        "size": bin_payload.len(),
                        "archive": "none"
                    }]
                }),
            },
            Step {
                id: "models".into(),
                step_type: "model_artifact".into(),
                requires: vec!["python".into()],
                spec: serde_json::json!({
                    "family_id": "test/model-1.0",
                    "acceleration_match": "matches_runtime_step:python"
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
    let plan = parse_dependencies_block("test.synth", block, &registry).expect("parses");
    assert_eq!(plan.steps.len(), 4);

    let runner = InstallRunner::new(plan, Arc::new(registry));
    let progress_sink: Arc<dyn ProgressSink> = sink.clone();
    let mut ctx = RunnerContext {
        extension_id: "test.synth",
        extension_dir: ext_dir.path(),
        extension_data_dir: host_dir.path(),
        host_data_dir: host_dir.path(),
        model_store: model_store.clone() as Arc<dyn ModelStoreClient>,
        runtime_bootstrapper: runtime.clone() as Arc<dyn RuntimeBootstrapper>,
        worker_handshake: handshake.clone() as Arc<dyn WorkerHandshake>,
        fetch_artifact: fetch_artifact_arc(),
        progress_sink: progress_sink.clone(),
        cancellation_token: CancellationToken::new(),
        install_run_id: Uuid::nil(),
        force: false,
    };

    let report = runner.run_install(&mut ctx).await;
    assert!(report.all_satisfied, "all 4 steps satisfied on first run");
    assert!(matches!(report.statuses["python"], StepStatus::Ok { .. }));
    assert!(matches!(report.statuses["ffmpeg"], StepStatus::Ok { .. }));
    assert!(matches!(report.statuses["models"], StepStatus::Ok { .. }));
    assert!(matches!(report.statuses["validate"], StepStatus::Ok { .. }));

    // Bootstrap was called exactly once.
    assert_eq!(runtime.bootstrap_calls.load(Ordering::SeqCst), 1);
    assert_eq!(model_store.download_calls.load(Ordering::SeqCst), 1);
    assert_eq!(handshake.invocations.load(Ordering::SeqCst), 1);

    // Downstream `model_artifact` step received the `matches_runtime_step:python`
    // resolution → "cuda12" (the profile stamped by the mock runtime).
    assert_eq!(
        model_store
            .accelerator_seen
            .lock()
            .expect("lock")
            .as_deref(),
        Some("cuda12")
    );

    // SSE event sequence: 4 step_started + 4 step_completed + 1 install_completed
    let events = sink.events.lock().expect("lock");
    let started = events
        .iter()
        .filter(|e| matches!(e, ProgressEvent::StepStarted { .. }))
        .count();
    let completed = events
        .iter()
        .filter(|e| matches!(e, ProgressEvent::StepCompleted { .. }))
        .count();
    let install_completed = events
        .iter()
        .filter(|e| matches!(e, ProgressEvent::InstallCompleted { .. }))
        .count();
    assert_eq!(started, 4, "one started event per step");
    assert_eq!(completed, 4, "one completed event per step");
    assert_eq!(install_completed, 1, "exactly one install_completed");
    drop(events);

    // ── Idempotency: re-run, expect every step Skipped ────────────────────────
    sink.events.lock().expect("lock").clear();
    let registry2 = HandlerRegistry::default();
    let plan2_block = DependenciesBlock {
        steps: vec![
            Step {
                id: "python".into(),
                step_type: "runtime".into(),
                requires: vec![],
                spec: serde_json::json!({
                    "family": "python",
                    "version": ">=3.11,<3.13",
                    "accelerator_profiles": ["cpu", "cuda12"]
                }),
            },
            Step {
                id: "ffmpeg".into(),
                step_type: "system_binary".into(),
                requires: vec![],
                spec: serde_json::json!({
                    "id": "ffmpeg",
                    "version": ">=4.0",
                    "sources": [{
                        "platform": nexus_extension_deps::PlatformTuple::host().as_canonical(),
                        "url": format!("{}/ffmpeg.bin", server.uri()),
                        "sha256": bin_sha,
                        "size": bin_payload.len(),
                        "archive": "none"
                    }]
                }),
            },
            Step {
                id: "models".into(),
                step_type: "model_artifact".into(),
                requires: vec!["python".into()],
                spec: serde_json::json!({
                    "family_id": "test/model-1.0",
                    "acceleration_match": "matches_runtime_step:python"
                }),
            },
            // validation always re-runs by design (its probe always returns
            // NotSatisfied — the worker handshake is the only way to confirm).
        ],
    };
    let plan2 = parse_dependencies_block("test.synth", plan2_block, &registry2).expect("parses");
    let runner2 = InstallRunner::new(plan2, Arc::new(registry2));
    let mut ctx2 = RunnerContext {
        extension_id: "test.synth",
        extension_dir: ext_dir.path(),
        extension_data_dir: host_dir.path(),
        host_data_dir: host_dir.path(),
        model_store: model_store.clone() as Arc<dyn ModelStoreClient>,
        runtime_bootstrapper: runtime.clone() as Arc<dyn RuntimeBootstrapper>,
        worker_handshake: handshake.clone() as Arc<dyn WorkerHandshake>,
        fetch_artifact: fetch_artifact_arc(),
        progress_sink,
        cancellation_token: CancellationToken::new(),
        install_run_id: Uuid::nil(),
        force: false,
    };
    let report2 = runner2.run_install(&mut ctx2).await;
    assert!(
        report2.all_satisfied,
        "second run: all 3 satisfied via Skipped"
    );
    assert!(matches!(
        report2.statuses["python"],
        StepStatus::Skipped { .. }
    ));
    assert!(matches!(
        report2.statuses["ffmpeg"],
        StepStatus::Skipped { .. }
    ));
    assert!(matches!(
        report2.statuses["models"],
        StepStatus::Skipped { .. }
    ));

    // No additional bootstrap / download / handshake calls.
    assert_eq!(runtime.bootstrap_calls.load(Ordering::SeqCst), 1);
    assert_eq!(model_store.download_calls.load(Ordering::SeqCst), 1);
    assert_eq!(handshake.invocations.load(Ordering::SeqCst), 1);
}
