//! T048 — end-to-end smoke tests for the install-pipeline orchestrator.
//!
//! Drives the 10-phase pipeline against the no-op family-native handler
//! and an in-memory phase-event sink. With the generic phases (T051-T054)
//! now real, these tests build a tiny zip fixture so resolve / download
//! (file://) / verify / extract execute against actual bytes.

use std::io::Write;
use std::path::{Path, PathBuf};
use std::sync::{Arc, Mutex};

use async_trait::async_trait;
use sha2::{Digest, Sha256};
use tokio_util::sync::CancellationToken;

use nexus_backend_runtimes::events::{BackendEventBus, SharedPublisher};
use nexus_backend_runtimes::family::RuntimeFamily;
use nexus_backend_runtimes::family_native::FamilyNativeHandler;
use nexus_backend_runtimes::generic::enums::PipelineFailureCategory;
use nexus_backend_runtimes::generic::ids::{
    AcceleratorProfile, PlatformId, ReleaseId, RuntimeId, RuntimeInstallId,
};
use nexus_backend_runtimes::generic::install_ctx::InstallCtx;
use nexus_backend_runtimes::generic::install_pipeline::{
    Phase, PhaseEvent, PhaseEventSink, PhaseState, run,
};

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

fn publisher() -> SharedPublisher {
    Arc::new(BackendEventBus::new(64))
}

/// Generate a minimal zip on disk containing one file `worker.py`.
/// Returns `(path, sha256_hex, size)` so the version manifest can
/// reference it accurately.
fn build_test_zip(dir: &Path) -> (PathBuf, String, u64) {
    let path = dir.join("asset.zip");
    let file = std::fs::File::create(&path).unwrap();
    let mut zip = zip::ZipWriter::new(file);
    let opts: zip::write::SimpleFileOptions =
        zip::write::SimpleFileOptions::default().compression_method(zip::CompressionMethod::Stored);
    zip.start_file("worker.py", opts).unwrap();
    zip.write_all(b"# echo worker\n").unwrap();
    zip.finish().unwrap();

    let bytes = std::fs::read(&path).unwrap();
    let mut hasher = Sha256::new();
    hasher.update(&bytes);
    let sha = format!("{:x}", hasher.finalize());
    let size = bytes.len() as u64;
    (path, sha, size)
}

fn version_manifest(asset_path: &Path, sha: &str, size: u64) -> serde_json::Value {
    serde_json::json!({
        "releases": [{
            "release_id": "v0_0_1",
            "targets": [{
                "platform": "linux-x64",
                "accelerator_profile": "cpu",
                "asset": {
                    "url": format!("file://{}", asset_path.display()),
                    "sha256": sha,
                    "size": size
                }
            }]
        }]
    })
}

fn make_ctx(partial: PathBuf, install: PathBuf, manifest: serde_json::Value) -> InstallCtx {
    InstallCtx {
        install_id: RuntimeInstallId::new(),
        runtime_id: RuntimeId::try_from("test.echo").unwrap(),
        release_id: ReleaseId::try_from("v0_0_1").unwrap(),
        platform: PlatformId::try_from("linux-x64").unwrap(),
        accelerator_profile: AcceleratorProfile::try_from("cpu").unwrap(),
        partial_path: partial,
        install_path: install,
        download_cache: std::env::temp_dir()
            .join(format!("generic_pipeline_test_{}", std::process::id()))
            .join(RuntimeInstallId::new().to_string()),
        release_manifest: manifest,
        extension_root: None,
        resolved_asset: None,
        downloaded_archive: None,
        artifact_hash: None,
        entrypoint_path: Some(PathBuf::from("python")),
        event_publisher: publisher(),
        cancellation: CancellationToken::new(),
        phase_cached: false,
    }
}

#[tokio::test]
async fn pipeline_runs_all_ten_phases_in_order() {
    let tmp = tempfile::tempdir().unwrap();
    let asset_dir = tmp.path().join("assets");
    std::fs::create_dir(&asset_dir).unwrap();
    let (asset_path, sha, size) = build_test_zip(&asset_dir);
    let manifest = version_manifest(&asset_path, &sha, size);

    let partial = tmp.path().join("install.partial");
    let install = tmp.path().join("install");
    let mut ctx = make_ctx(partial.clone(), install.clone(), manifest);
    let handler = Arc::new(FamilyNativeHandler::new(RuntimeFamily::Python));
    let sink = Arc::new(CapturingSink::default());

    run(&mut ctx, handler, sink.clone()).await.unwrap();

    let events = sink.events.lock().unwrap().clone();
    assert_eq!(
        events.len(),
        Phase::ORDER.len() * 2,
        "expected one started + one completed per phase, got {}: {events:#?}",
        events.len()
    );

    for (i, expected_phase) in Phase::ORDER.iter().enumerate() {
        let started = &events[i * 2];
        let completed = &events[i * 2 + 1];
        assert_eq!(started.phase, *expected_phase, "{started:?}");
        assert_eq!(started.state, PhaseState::Started);
        assert_eq!(completed.phase, *expected_phase, "{completed:?}");
        assert_eq!(completed.state, PhaseState::Completed);
    }

    // After the pipeline, the install dir holds the unpacked content.
    assert!(install.exists(), "install dir should exist post-rename");
    assert!(install.join("worker.py").exists(), "extracted file present");
    assert!(
        install.join("archive.bin").exists(),
        "downloaded archive preserved"
    );
    assert_eq!(ctx.artifact_hash.as_deref(), Some(sha.as_str()));
}

#[tokio::test]
async fn pipeline_honours_cancellation_at_phase_boundary() {
    let tmp = tempfile::tempdir().unwrap();
    let (asset_path, sha, size) = build_test_zip(tmp.path());
    let manifest = version_manifest(&asset_path, &sha, size);
    let partial = tmp.path().join("install.partial");
    let install = tmp.path().join("install");
    let mut ctx = make_ctx(partial, install, manifest);
    ctx.cancellation.cancel();

    let handler = Arc::new(FamilyNativeHandler::new(RuntimeFamily::Python));
    let sink = Arc::new(CapturingSink::default());

    let err = run(&mut ctx, handler, sink.clone()).await.unwrap_err();
    assert_eq!(err.phase, "resolve");
    assert_eq!(err.category, PipelineFailureCategory::Cancelled);
}

/// T050 — cancellation fires from inside a family-handler phase and
/// the next phase boundary honours the token immediately. Proves the
/// boundary check isn't only respected at pipeline entry.
struct CancelInBootstrapHandler {
    token: CancellationToken,
}

#[async_trait]
impl nexus_backend_runtimes::generic::family_handler::RuntimeFamilyHandler
    for CancelInBootstrapHandler
{
    fn family(&self) -> RuntimeFamily {
        RuntimeFamily::Python
    }
    async fn bootstrap_runtime(
        &self,
        _ctx: &mut InstallCtx,
    ) -> Result<(), nexus_backend_runtimes::generic::errors::GenericInstallError> {
        self.token.cancel();
        Ok(())
    }
    async fn install_deps(
        &self,
        _ctx: &mut InstallCtx,
    ) -> Result<(), nexus_backend_runtimes::generic::errors::GenericInstallError> {
        panic!("install_deps MUST NOT run after cancellation at boundary")
    }
    async fn validate_env(
        &self,
        _ctx: &mut InstallCtx,
    ) -> Result<(), nexus_backend_runtimes::generic::errors::GenericInstallError> {
        panic!("validate_env MUST NOT run after cancellation at boundary")
    }
    fn spawn_launch_spec(
        &self,
        install: &nexus_backend_runtimes::generic::installs::InstallRecord,
        _settings: &nexus_backend_runtimes::generic::settings::RuntimeSettings,
    ) -> nexus_backend_runtimes::generic::install_ctx::LaunchSpec {
        nexus_backend_runtimes::generic::install_ctx::LaunchSpec::new(PathBuf::from(
            &install.install_path,
        ))
    }
}

#[tokio::test]
async fn cancellation_mid_pipeline_stops_at_next_phase_boundary() {
    let tmp = tempfile::tempdir().unwrap();
    let (asset_path, sha, size) = build_test_zip(tmp.path());
    let manifest = version_manifest(&asset_path, &sha, size);
    let partial = tmp.path().join("install.partial");
    let install = tmp.path().join("install");
    let mut ctx = make_ctx(partial, install, manifest);
    let token = ctx.cancellation.clone();

    let handler = Arc::new(CancelInBootstrapHandler { token });
    let sink = Arc::new(CapturingSink::default());

    let err = run(&mut ctx, handler, sink.clone()).await.unwrap_err();
    assert_eq!(err.phase, "install_deps");
    assert_eq!(err.category, PipelineFailureCategory::Cancelled);

    let events = sink.events.lock().unwrap().clone();
    let phases_that_completed: Vec<_> = events
        .iter()
        .filter(|e| matches!(e.state, PhaseState::Completed))
        .map(|e| e.phase)
        .collect();
    assert!(phases_that_completed.contains(&Phase::Resolve));
    assert!(phases_that_completed.contains(&Phase::BootstrapRuntime));
    assert!(!phases_that_completed.contains(&Phase::InstallDeps));
}

/// T096/T097 — second pipeline run against a pre-populated partial
/// dir marks download + extract as cached on their completed events.
#[tokio::test]
async fn cached_phases_stamp_payload_on_second_run() {
    let tmp = tempfile::tempdir().unwrap();
    let (asset_path, sha, size) = build_test_zip(tmp.path());
    let manifest = version_manifest(&asset_path, &sha, size);
    let partial = tmp.path().join("install.partial");
    let install_first = tmp.path().join("install_first");
    let install_second = tmp.path().join("install_second");

    let handler = Arc::new(FamilyNativeHandler::new(RuntimeFamily::Python));
    let sink1 = Arc::new(CapturingSink::default());
    let mut ctx1 = make_ctx(partial.clone(), install_first.clone(), manifest.clone());
    run(&mut ctx1, handler.clone(), sink1.clone())
        .await
        .unwrap();

    let partial2 = tmp.path().join("install_second.partial");
    std::fs::create_dir_all(&partial2).unwrap();
    std::fs::copy(
        install_first.join("archive.bin"),
        partial2.join("archive.bin"),
    )
    .unwrap();
    std::fs::write(
        partial2.join(nexus_backend_runtimes::generic::phases::extract::EXTRACT_SENTINEL),
        &sha,
    )
    .unwrap();

    let sink2 = Arc::new(CapturingSink::default());
    let mut ctx2 = make_ctx(partial2, install_second, manifest);
    ctx2.download_cache = ctx1.download_cache.clone();
    run(&mut ctx2, handler, sink2.clone()).await.unwrap();

    let events = sink2.events.lock().unwrap().clone();
    let download_completed = events
        .iter()
        .find(|e| e.phase == Phase::Download && e.state == PhaseState::Completed)
        .expect("download completed event");
    let extract_completed = events
        .iter()
        .find(|e| e.phase == Phase::Extract && e.state == PhaseState::Completed)
        .expect("extract completed event");
    assert_eq!(
        download_completed.payload,
        serde_json::json!({ "cached": true })
    );
    assert_eq!(
        extract_completed.payload,
        serde_json::json!({ "cached": true })
    );
}

#[tokio::test]
async fn complete_phase_rejects_collision_at_install_path() {
    let tmp = tempfile::tempdir().unwrap();
    let (asset_path, sha, size) = build_test_zip(tmp.path());
    let manifest = version_manifest(&asset_path, &sha, size);
    let partial = tmp.path().join("install.partial");
    let install = tmp.path().join("install");
    std::fs::create_dir(&install).unwrap(); // pre-existing collision

    let mut ctx = make_ctx(partial, install, manifest);
    let handler = Arc::new(FamilyNativeHandler::new(RuntimeFamily::Python));
    let sink = Arc::new(CapturingSink::default());

    let err = run(&mut ctx, handler, sink).await.unwrap_err();
    assert_eq!(err.phase, "complete");
    assert_eq!(err.category, PipelineFailureCategory::InstallPathCollision);
}

// -----------------------------------------------------------------------------
// T049 — failure injection at each generic phase
// -----------------------------------------------------------------------------

#[tokio::test]
async fn resolve_fails_on_unknown_release() {
    let tmp = tempfile::tempdir().unwrap();
    let (asset_path, sha, size) = build_test_zip(tmp.path());
    let mut manifest = version_manifest(&asset_path, &sha, size);
    manifest["releases"][0]["release_id"] = serde_json::json!("nope");

    let partial = tmp.path().join("install.partial");
    let install = tmp.path().join("install");
    let mut ctx = make_ctx(partial, install, manifest);
    let handler = Arc::new(FamilyNativeHandler::new(RuntimeFamily::Python));
    let sink = Arc::new(CapturingSink::default());

    let err = run(&mut ctx, handler, sink).await.unwrap_err();
    assert_eq!(err.phase, "resolve");
    assert_eq!(
        err.category,
        PipelineFailureCategory::InvalidVersionManifest
    );
}

#[tokio::test]
async fn download_fails_on_missing_file_url() {
    let tmp = tempfile::tempdir().unwrap();
    // Build a real zip to seed the resolver, then point the version
    // manifest at a sibling path that doesn't exist so download fails.
    let (real_asset, sha, size) = build_test_zip(tmp.path());
    let missing = real_asset.parent().unwrap().join("definitely_missing.zip");
    let manifest = serde_json::json!({
        "releases": [{
            "release_id": "v0_0_1",
            "targets": [{
                "platform": "linux-x64",
                "accelerator_profile": "cpu",
                "asset": {
                    "url": format!("file://{}", missing.display()),
                    "sha256": sha,
                    "size": size
                }
            }]
        }]
    });
    let partial = tmp.path().join("install.partial");
    let install = tmp.path().join("install");
    let mut ctx = make_ctx(partial, install, manifest);
    let handler = Arc::new(FamilyNativeHandler::new(RuntimeFamily::Python));
    let sink = Arc::new(CapturingSink::default());

    let err = run(&mut ctx, handler, sink).await.unwrap_err();
    assert_eq!(err.phase, "download");
    assert_eq!(err.category, PipelineFailureCategory::InvalidDownload);
}

#[tokio::test]
async fn verify_fails_on_checksum_mismatch() {
    let tmp = tempfile::tempdir().unwrap();
    let (asset_path, _correct_sha, size) = build_test_zip(tmp.path());
    let bogus_sha = "f".repeat(64);
    let manifest = version_manifest(&asset_path, &bogus_sha, size);

    let partial = tmp.path().join("install.partial");
    let install = tmp.path().join("install");
    let mut ctx = make_ctx(partial, install, manifest);
    let handler = Arc::new(FamilyNativeHandler::new(RuntimeFamily::Python));
    let sink = Arc::new(CapturingSink::default());

    let err = run(&mut ctx, handler, sink).await.unwrap_err();
    assert_eq!(err.phase, "verify");
    assert_eq!(err.category, PipelineFailureCategory::InvalidDownload);
    assert!(err.detail.contains("checksum mismatch"), "{}", err.detail);
}

#[tokio::test]
async fn extract_fails_on_unsupported_archive_format() {
    let tmp = tempfile::tempdir().unwrap();
    // Write some bytes to a .bin file that's neither zip nor tar.
    let asset = tmp.path().join("blob.bin");
    std::fs::write(&asset, b"not an archive").unwrap();
    let mut hasher = Sha256::new();
    hasher.update(b"not an archive");
    let sha = format!("{:x}", hasher.finalize());

    let manifest = serde_json::json!({
        "releases": [{
            "release_id": "v0_0_1",
            "targets": [{
                "platform": "linux-x64",
                "accelerator_profile": "cpu",
                "asset": {
                    "url": format!("file://{}", asset.display()),
                    "sha256": sha,
                    "size": 14
                }
            }]
        }]
    });
    let partial = tmp.path().join("install.partial");
    let install = tmp.path().join("install");
    let mut ctx = make_ctx(partial, install, manifest);
    let handler = Arc::new(FamilyNativeHandler::new(RuntimeFamily::Python));
    let sink = Arc::new(CapturingSink::default());

    let err = run(&mut ctx, handler, sink).await.unwrap_err();
    assert_eq!(err.phase, "extract");
    assert_eq!(err.category, PipelineFailureCategory::InvalidDownload);
}

#[tokio::test]
async fn download_short_circuits_on_existing_matching_archive() {
    let tmp = tempfile::tempdir().unwrap();
    let (asset_path, sha, size) = build_test_zip(tmp.path());
    let manifest = version_manifest(&asset_path, &sha, size);
    let partial = tmp.path().join("install.partial");
    let install = tmp.path().join("install");
    std::fs::create_dir(&partial).unwrap();
    // Pre-populate the archive at the destination — download must skip
    // the file copy because the existing file's hash matches.
    std::fs::copy(&asset_path, partial.join("archive.bin")).unwrap();
    // Now delete the source asset so any actual copy attempt would fail.
    std::fs::remove_file(&asset_path).unwrap();

    let mut ctx = make_ctx(partial.clone(), install, manifest);
    let handler = Arc::new(FamilyNativeHandler::new(RuntimeFamily::Python));
    let sink = Arc::new(CapturingSink::default());

    run(&mut ctx, handler, sink).await.unwrap();
    assert_eq!(ctx.artifact_hash.as_deref(), Some(sha.as_str()));
}
