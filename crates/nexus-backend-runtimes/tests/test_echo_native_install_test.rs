use std::path::{Path, PathBuf};
use std::sync::{Arc, Mutex};

use async_trait::async_trait;
use tokio_util::sync::CancellationToken;

use nexus_backend_runtimes::events::{BackendEventBus, SharedPublisher};
use nexus_backend_runtimes::family::RuntimeFamily;
use nexus_backend_runtimes::family_native::FamilyNativeHandler;
use nexus_backend_runtimes::generic::ids::{
    AcceleratorProfile, PlatformId, ReleaseId, RuntimeId, RuntimeInstallId,
};
use nexus_backend_runtimes::generic::install_ctx::InstallCtx;
use nexus_backend_runtimes::generic::install_pipeline::{Phase, PhaseEvent, PhaseEventSink, run};
use nexus_backend_runtimes::generic::version_manifest::parse_yaml;

#[derive(Default, Clone)]
struct CapturingSink {
    events: Arc<Mutex<Vec<PhaseEvent>>>,
}

#[async_trait]
impl PhaseEventSink for CapturingSink {
    async fn emit(&self, event: PhaseEvent) {
        self.events.lock().unwrap().push(event);
    }
}

fn native_extension_root() -> PathBuf {
    let manifest_dir = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    manifest_dir
        .parent()
        .and_then(Path::parent)
        .expect("workspace root")
        .join("extensions/builtin/test-echo-native/backends/echo")
}

fn version_manifest_value() -> serde_json::Value {
    let yaml_path = native_extension_root().join("versions.yaml");
    let yaml = std::fs::read_to_string(&yaml_path)
        .unwrap_or_else(|e| panic!("read {}: {e}", yaml_path.display()));
    parse_yaml(&yaml).expect("parse test-echo-native versions.yaml")
}

#[tokio::test]
async fn native_family_install_runs_all_family_agnostic_phases() {
    let tmp = tempfile::tempdir().unwrap();
    let partial = tmp.path().join("install.partial");
    let install = tmp.path().join("install");

    let publisher: SharedPublisher = Arc::new(BackendEventBus::new(64));
    let sink = Arc::new(CapturingSink::default());

    let mut ctx = InstallCtx {
        install_id: RuntimeInstallId::new(),
        runtime_id: RuntimeId::try_from("test.echo.native").unwrap(),
        release_id: ReleaseId::try_from("v0_0_1").unwrap(),
        platform: PlatformId::try_from("linux-x64").unwrap(),
        accelerator_profile: AcceleratorProfile::try_from("cpu").unwrap(),
        partial_path: partial,
        install_path: install.clone(),
        download_cache: tmp.path().join("cache"),
        release_manifest: version_manifest_value(),
        extension_root: Some(native_extension_root()),
        resolved_asset: None,
        downloaded_archive: None,
        artifact_hash: None,
        entrypoint_path: Some(PathBuf::from("worker/echo_worker")),
        event_publisher: publisher,
        cancellation: CancellationToken::new(),
        phase_cached: false,
    };

    let handler = Arc::new(FamilyNativeHandler::new(RuntimeFamily::LlamaCpp));
    run(&mut ctx, handler, sink.clone())
        .await
        .expect("native pipeline should run cleanly");

    let events = sink.events.lock().unwrap().clone();
    assert_eq!(
        events.len(),
        Phase::ORDER.len() * 2,
        "every phase emits started + completed"
    );
    assert!(install.exists(), "install dir renamed in place");
    assert!(
        ctx.artifact_hash.is_some(),
        "verify phase recorded the artifact hash"
    );
}
