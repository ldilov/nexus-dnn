use std::collections::HashMap;
use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;

use async_trait::async_trait;
use nexus_extension::parse_manifest;
use nexus_extension_deps::context::{
    HandshakeError, ModelDownloadProgress, ModelStoreClient, RuntimeBootstrapResult,
    RuntimeBootstrapper, WorkerHandshake,
};
use nexus_extension_deps::plan::{parse_dependencies_block, DependenciesBlock, InstallPlan};
use nexus_extension_deps::types::{ProgressEvent, ProgressSink, StepArtifact, StepStatus};
use nexus_extension_deps::{
    HandlerRegistry, InstallReport, InstallRunner, PlatformTuple, RunnerContext,
};
use serde_json::Value;
use tokio_util::sync::CancellationToken;

fn manifest_path() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("..")
        .join("manifest.yaml")
}

fn extension_dir() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR")).join("..")
}

fn fake_backend_versions_path() -> PathBuf {
    extension_dir()
        .join("backends")
        .join("fake")
        .join("versions.yaml")
}

fn load_block() -> DependenciesBlock {
    let manifest = parse_manifest(&manifest_path()).expect("manifest parses against host schema");
    manifest
        .dependencies
        .expect("manifest declares a dependencies block")
}

fn build_plan() -> InstallPlan {
    let registry = HandlerRegistry::default();
    parse_dependencies_block("nexus.video.svi2-pro", load_block(), &registry)
        .expect("dependencies block topo-sorts against the real handler registry")
}

#[derive(Default)]
struct CapturingSink {
    events: std::sync::Mutex<Vec<ProgressEvent>>,
}

impl ProgressSink for CapturingSink {
    fn emit(&self, event: ProgressEvent) {
        self.events.lock().expect("sink lock").push(event);
    }
}

struct FakeRuntimeBootstrapper {
    installed: AtomicBool,
}

impl FakeRuntimeBootstrapper {
    fn new() -> Self {
        Self {
            installed: AtomicBool::new(false),
        }
    }

    fn result(target_dir: &Path) -> RuntimeBootstrapResult {
        RuntimeBootstrapResult {
            install_dir: target_dir.to_path_buf(),
            resolved_version: "3.12.0".to_owned(),
            resolved_profile: Some("cuda12".to_owned()),
            bytes_placed: 0,
        }
    }
}

#[async_trait]
impl RuntimeBootstrapper for FakeRuntimeBootstrapper {
    async fn probe(
        &self,
        _family: &str,
        _version: Option<&str>,
        _profiles: &[String],
        target_dir: &Path,
    ) -> Result<Option<RuntimeBootstrapResult>, nexus_extension_deps::DepError> {
        if self.installed.load(Ordering::SeqCst) {
            Ok(Some(Self::result(target_dir)))
        } else {
            Ok(None)
        }
    }

    async fn bootstrap(
        &self,
        _family: &str,
        _version: Option<&str>,
        _profiles: &[String],
        target_dir: &Path,
        _cancellation: CancellationToken,
    ) -> Result<RuntimeBootstrapResult, nexus_extension_deps::DepError> {
        self.installed.store(true, Ordering::SeqCst);
        Ok(Self::result(target_dir))
    }
}

struct FakeModelStore {
    installed: AtomicBool,
    root: PathBuf,
    download_calls: std::sync::atomic::AtomicUsize,
}

impl FakeModelStore {
    fn new(root: PathBuf) -> Self {
        Self {
            installed: AtomicBool::new(false),
            root,
            download_calls: std::sync::atomic::AtomicUsize::new(0),
        }
    }

    fn download_calls(&self) -> usize {
        self.download_calls.load(Ordering::SeqCst)
    }

    fn family_dir(&self, family_id: &str) -> PathBuf {
        self.root.join(family_id.replace([':', '/'], "_"))
    }
}

#[async_trait]
impl ModelStoreClient for FakeModelStore {
    async fn is_family_installed(
        &self,
        family_id: &str,
        _accelerator: Option<&str>,
    ) -> Result<Option<PathBuf>, nexus_extension_deps::DepError> {
        if self.installed.load(Ordering::SeqCst) {
            Ok(Some(self.family_dir(family_id)))
        } else {
            Ok(None)
        }
    }

    async fn start_download(
        &self,
        family_id: &str,
        _accelerator: Option<&str>,
        _selection: &nexus_extension_deps::FileSelection,
    ) -> Result<String, nexus_extension_deps::DepError> {
        self.download_calls.fetch_add(1, Ordering::SeqCst);
        Ok(format!("job-{family_id}"))
    }

    async fn poll_job(
        &self,
        job_id: &str,
    ) -> Result<ModelDownloadProgress, nexus_extension_deps::DepError> {
        let family_id = job_id.strip_prefix("job-").unwrap_or(job_id);
        Ok(ModelDownloadProgress::Completed {
            path: self.family_dir(family_id),
            bytes_placed: 0,
        })
    }
}

struct FakeWorkerHandshake;

#[async_trait]
impl WorkerHandshake for FakeWorkerHandshake {
    async fn run_handshake(
        &self,
        _extension_id: &str,
        _extension_dir: &Path,
        _extension_data_dir: &Path,
        _upstream: &HashMap<String, StepArtifact>,
        _timeout: std::time::Duration,
        _cancellation: CancellationToken,
    ) -> Result<(), HandshakeError> {
        Ok(())
    }
}

fn stub_fetch_artifact() -> Arc<nexus_extension_deps::fetch::FetchArtifact> {
    Arc::new(|_req: nexus_extension_deps::fetch::FetchRequest| {
        Box::pin(async move {
            Err(nexus_extension_deps::DepError::Backend(
                "fetch_artifact must not be reached — system binaries are pre-seeded offline"
                    .into(),
            ))
        })
    })
}

async fn file_sha256(path: &Path) -> String {
    use sha2::{Digest, Sha256};
    use std::fmt::Write as _;
    let bytes = tokio::fs::read(path).await.expect("read manifest for sha");
    let digest = Sha256::digest(&bytes);
    let mut s = String::with_capacity(digest.len() * 2);
    for b in digest {
        let _ = write!(s, "{b:02x}");
    }
    s
}

async fn seed_package_set(ext_data: &Path, manifest_sha: &str) {
    let packages = ext_data.join("runtime").join("packages");
    let venv = packages.join(".venv");
    tokio::fs::create_dir_all(&venv).await.expect("seed venv");
    let marker = packages.join(".synced.json");
    let payload = serde_json::json!({
        "manifest_path": "worker/pyproject.toml",
        "manifest_sha256": manifest_sha,
        "lock_path": "worker/uv.lock",
        "synced_at": "2026-06-08T00:00:00Z",
    });
    tokio::fs::write(&marker, serde_json::to_vec_pretty(&payload).unwrap())
        .await
        .expect("seed package_set marker");
}

fn host_source_sha256(step_spec: &Value) -> Option<String> {
    let host = PlatformTuple::host().as_canonical();
    step_spec
        .get("sources")?
        .as_array()?
        .iter()
        .find(|s| s.get("platform").and_then(Value::as_str) == Some(host.as_str()))
        .and_then(|s| s.get("sha256").and_then(Value::as_str))
        .map(str::to_owned)
}

async fn seed_system_binary(ext_data: &Path, id: &str, sha256: &str) {
    let prefix = sha256.get(..8).unwrap_or(sha256);
    let dir = ext_data
        .join("runtime")
        .join("binaries")
        .join(id)
        .join(prefix);
    tokio::fs::create_dir_all(&dir)
        .await
        .expect("seed binary dir");
    tokio::fs::write(dir.join("artifact"), b"seeded")
        .await
        .expect("seed binary file");
}

struct Doubles {
    model_store: Arc<FakeModelStore>,
    runtime: Arc<FakeRuntimeBootstrapper>,
    handshake: Arc<FakeWorkerHandshake>,
}

fn runner_ctx<'a>(
    doubles: &Doubles,
    sink: &Arc<dyn ProgressSink>,
    ext_dir: &'a Path,
    ext_data: &'a Path,
    host_data: &'a Path,
) -> RunnerContext<'a> {
    RunnerContext {
        extension_id: "nexus.video.svi2-pro",
        extension_dir: ext_dir,
        extension_data_dir: ext_data,
        host_data_dir: host_data,
        model_store: doubles.model_store.clone(),
        runtime_bootstrapper: doubles.runtime.clone(),
        worker_handshake: doubles.handshake.clone(),
        fetch_artifact: stub_fetch_artifact(),
        progress_sink: sink.clone(),
        cancellation_token: CancellationToken::new(),
        install_run_id: uuid::Uuid::new_v4(),
        force: false,
    }
}

fn satisfied(report: &InstallReport, step_id: &str) -> bool {
    report
        .statuses
        .get(step_id)
        .is_some_and(StepStatus::is_satisfied)
}

fn system_binary_unsupported_on_host(plan: &InstallPlan, step_id: &str) -> bool {
    let step = plan
        .steps
        .iter()
        .find(|s| s.id == step_id)
        .expect("step present in plan");
    step.step_type == "system_binary" && host_source_sha256(&step.spec).is_none()
}

#[test]
fn plan_topo_orders_requires_python_first_pkgs_models_after_validate_last() {
    let plan = build_plan();
    let order: Vec<&str> = plan.steps.iter().map(|s| s.id.as_str()).collect();

    let pos = |id: &str| {
        order
            .iter()
            .position(|s| *s == id)
            .unwrap_or_else(|| panic!("step {id} missing"))
    };

    assert_eq!(
        order[0], "python",
        "python has no requires and is declared first"
    );
    assert!(pos("pkgs") > pos("python"), "pkgs requires python");
    assert!(
        pos("model_wan_base") > pos("python"),
        "model steps require python"
    );
    assert!(pos("model_svi_lora") > pos("python"));
    assert!(pos("model_rife") > pos("python"));
    assert!(pos("sdcli") > pos("python"), "sdcli requires python");

    let validate_pos = pos("validate");
    for (i, id) in order.iter().enumerate() {
        if *id != "validate" {
            assert!(
                i < validate_pos,
                "validate must come last; {id} appears after it"
            );
        }
    }
    assert_eq!(order.last().copied(), Some("validate"));
}

#[tokio::test]
async fn full_install_plan_runs_to_success_then_is_idempotent_offline() {
    let plan = build_plan();
    let plan_for_second = build_plan();

    let ext_dir = extension_dir();
    let tmp = tempfile::tempdir().expect("tempdir");
    let ext_data = tmp.path().join("ext-data");
    let host_data = tmp.path().join("host-data");
    let model_root = tmp.path().join("models");
    tokio::fs::create_dir_all(&ext_data).await.unwrap();
    tokio::fs::create_dir_all(&host_data).await.unwrap();
    tokio::fs::create_dir_all(&model_root).await.unwrap();

    let pyproject = ext_dir.join("worker").join("pyproject.toml");
    let manifest_sha = file_sha256(&pyproject).await;
    seed_package_set(&ext_data, &manifest_sha).await;

    for step in &plan.steps {
        if step.step_type == "system_binary" {
            if let Some(sha) = host_source_sha256(&step.spec) {
                let id = step
                    .spec
                    .get("id")
                    .and_then(Value::as_str)
                    .expect("system_binary spec.id");
                seed_system_binary(&ext_data, id, &sha).await;
            }
        }
    }

    let doubles = Doubles {
        model_store: Arc::new(FakeModelStore::new(model_root.clone())),
        runtime: Arc::new(FakeRuntimeBootstrapper::new()),
        handshake: Arc::new(FakeWorkerHandshake),
    };
    let sink: Arc<dyn ProgressSink> = Arc::new(CapturingSink::default());

    let runner = InstallRunner::new(plan, Arc::new(HandlerRegistry::default()));
    let mut ctx = runner_ctx(&doubles, &sink, &ext_dir, &ext_data, &host_data);
    let report = runner.run_install(&mut ctx).await;

    let plan_ref = &runner.plan;
    for step in &plan_ref.steps {
        if system_binary_unsupported_on_host(plan_ref, &step.id) {
            continue;
        }
        assert!(
            satisfied(&report, &step.id),
            "step {} did not reach a satisfied terminal state: {:?}",
            step.id,
            report.statuses.get(&step.id)
        );
    }

    let host_has_all_sources = plan_ref
        .steps
        .iter()
        .all(|s| !system_binary_unsupported_on_host(plan_ref, &s.id));
    if host_has_all_sources {
        assert!(report.all_satisfied, "every step satisfied on this host");
    }

    let model_steps = plan_ref
        .steps
        .iter()
        .filter(|s| s.step_type == "model_artifact")
        .count();
    assert!(model_steps >= 7, "all declared model families present");
    assert_eq!(
        doubles.model_store.download_calls(),
        model_steps,
        "first run downloads each model family exactly once via the host model store"
    );

    doubles.model_store.installed.store(true, Ordering::SeqCst);

    let runner2 = InstallRunner::new(plan_for_second, runner.registry.clone());
    let sink2: Arc<dyn ProgressSink> = Arc::new(CapturingSink::default());
    let mut ctx2 = runner_ctx(&doubles, &sink2, &ext_dir, &ext_data, &host_data);
    let report2 = runner2.run_install(&mut ctx2).await;

    for step in &runner2.plan.steps {
        if system_binary_unsupported_on_host(&runner2.plan, &step.id) {
            continue;
        }
        assert!(
            matches!(
                report2.statuses.get(&step.id),
                Some(StepStatus::Skipped { .. })
            ),
            "second run must skip step {} (probe satisfied), got {:?}",
            step.id,
            report2.statuses.get(&step.id)
        );
    }

    assert_eq!(
        doubles.model_store.download_calls(),
        model_steps,
        "idempotent re-run triggers zero additional downloads"
    );
}

#[test]
fn fake_backend_declares_no_heavy_artifacts_offline_guarantee() {
    let raw = std::fs::read_to_string(fake_backend_versions_path())
        .expect("fake backend versions.yaml present");
    let doc: serde_yaml::Value = serde_yaml::from_str(&raw).expect("fake versions.yaml parses");
    let versions = doc
        .get("versions")
        .and_then(|v| v.as_sequence())
        .expect("versions list present");
    assert!(
        !versions.is_empty(),
        "fake backend declares at least one version"
    );
    for version in versions {
        let artifacts = version
            .get("artifacts")
            .and_then(|a| a.as_sequence())
            .expect("each version declares an artifacts list");
        assert!(
            artifacts.is_empty(),
            "fake backend must declare zero model artifacts so offline install/render needs no weights"
        );
    }
}
