mod common;

use std::fs;
use std::path::{Path, PathBuf};
use std::sync::{Arc, Mutex};

use async_trait::async_trait;
use tokio_util::sync::CancellationToken;

use nexus_backend_runtimes::events::{BackendEventBus, SharedPublisher};
use nexus_backend_runtimes::generic::ids::{
    AcceleratorProfile, PlatformId, ReleaseId, RuntimeId, RuntimeInstallId,
};
use nexus_backend_runtimes::generic::install_ctx::InstallCtx;
use nexus_backend_runtimes::generic::install_pipeline::{PhaseEvent, PhaseEventSink};
use nexus_backend_runtimes::generic::phases::download::{
    ARCHIVE_FILENAME, DOWNLOAD_CACHE_SUBDIR, run as download_run,
};
use nexus_backend_runtimes::generic::version_manifest::ResolvedAsset;

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

fn fixture_asset_path() -> PathBuf {
    let manifest_dir = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    manifest_dir
        .parent()
        .and_then(Path::parent)
        .expect("workspace root")
        .join("extensions/builtin/test-echo-runtime/backends/echo/assets/echo_worker.zip")
}

fn file_url(path: &Path) -> String {
    let display = path.display().to_string().replace('\\', "/");
    if cfg!(windows) {
        format!("file:///{display}")
    } else {
        format!("file://{display}")
    }
}

fn ctx(partial: &Path, install: &Path, cache: &Path, asset: ResolvedAsset) -> InstallCtx {
    InstallCtx {
        install_id: RuntimeInstallId::new(),
        runtime_id: RuntimeId::try_from("test.echo").unwrap(),
        release_id: ReleaseId::try_from("v0_0_1").unwrap(),
        platform: PlatformId::try_from("linux-x64").unwrap(),
        accelerator_profile: AcceleratorProfile::try_from("cpu").unwrap(),
        partial_path: partial.to_path_buf(),
        install_path: install.to_path_buf(),
        download_cache: cache.to_path_buf(),
        release_manifest: serde_json::Value::Null,
        extension_root: None,
        resolved_asset: Some(asset),
        downloaded_archive: None,
        artifact_hash: None,
        entrypoint_path: None,
        event_publisher: publisher(),
        cancellation: CancellationToken::new(),
        phase_cached: false,
    }
}

fn resolved_from_fixture() -> ResolvedAsset {
    ResolvedAsset {
        url: file_url(&fixture_asset_path()),
        sha256: "30b9a5ee418004e78261372bf7d6689c72d88f82a79f0425025d2519b704b522".into(),
        size: 3500,
    }
}

#[tokio::test]
async fn download_caches_archive_under_host_download_cache() {
    let tmp = tempfile::tempdir().unwrap();
    let partial = tmp.path().join("partial");
    let install = tmp.path().join("install");
    let cache = tmp.path().join("cache");
    fs::create_dir_all(&partial).unwrap();
    fs::create_dir_all(&cache).unwrap();

    let asset = resolved_from_fixture();
    let cached_path = cache
        .join(DOWNLOAD_CACHE_SUBDIR)
        .join(format!("{}.bin", asset.sha256));
    assert!(!cached_path.exists(), "precondition: cache empty");

    let mut c = ctx(&partial, &install, &cache, asset);
    download_run(&mut c).await.expect("download ok");

    assert!(
        cached_path.exists(),
        "archive cached at {}",
        cached_path.display()
    );
    assert!(partial.join(ARCHIVE_FILENAME).exists());
    assert_eq!(c.downloaded_archive.as_deref(), Some(partial.join(ARCHIVE_FILENAME).as_path()));
}

#[tokio::test]
async fn second_download_run_short_circuits_via_host_cache() {
    let tmp = tempfile::tempdir().unwrap();
    let cache = tmp.path().join("cache");
    fs::create_dir_all(&cache).unwrap();

    let asset = resolved_from_fixture();

    let partial_a = tmp.path().join("a_partial");
    let install_a = tmp.path().join("a_install");
    fs::create_dir_all(&partial_a).unwrap();
    let mut first = ctx(&partial_a, &install_a, &cache, asset.clone());
    download_run(&mut first).await.unwrap();
    let cached = cache
        .join(DOWNLOAD_CACHE_SUBDIR)
        .join(format!("{}.bin", asset.sha256));
    let first_mtime = fs::metadata(&cached).unwrap().modified().unwrap();

    let partial_b = tmp.path().join("b_partial");
    let install_b = tmp.path().join("b_install");
    fs::create_dir_all(&partial_b).unwrap();
    let mut second = ctx(&partial_b, &install_b, &cache, asset.clone());
    download_run(&mut second).await.unwrap();

    let second_mtime = fs::metadata(&cached).unwrap().modified().unwrap();
    assert_eq!(
        first_mtime, second_mtime,
        "second run must not rewrite the cached archive"
    );
    assert!(partial_b.join(ARCHIVE_FILENAME).exists());
}

#[tokio::test]
async fn partial_path_archive_also_short_circuits_when_hash_matches() {
    let tmp = tempfile::tempdir().unwrap();
    let partial = tmp.path().join("partial");
    let install = tmp.path().join("install");
    let cache = tmp.path().join("cache");
    fs::create_dir_all(&partial).unwrap();
    fs::create_dir_all(&cache).unwrap();

    fs::copy(fixture_asset_path(), partial.join(ARCHIVE_FILENAME)).unwrap();

    let asset = resolved_from_fixture();
    let mut c = ctx(&partial, &install, &cache, asset);
    download_run(&mut c).await.unwrap();

    let cache_root = cache.join(DOWNLOAD_CACHE_SUBDIR);
    if cache_root.exists() {
        let entries = fs::read_dir(&cache_root).unwrap().count();
        assert_eq!(entries, 0, "partial hit should skip the cache entirely");
    }
}

#[tokio::test]
async fn corrupted_cache_is_replaced_by_fresh_download() {
    let tmp = tempfile::tempdir().unwrap();
    let partial = tmp.path().join("partial");
    let install = tmp.path().join("install");
    let cache = tmp.path().join("cache");
    fs::create_dir_all(&partial).unwrap();
    fs::create_dir_all(&cache).unwrap();

    let asset = resolved_from_fixture();
    let cache_root = cache.join(DOWNLOAD_CACHE_SUBDIR);
    fs::create_dir_all(&cache_root).unwrap();
    let poisoned = cache_root.join(format!("{}.bin", asset.sha256));
    fs::write(&poisoned, b"corrupted placeholder").unwrap();

    let mut c = ctx(&partial, &install, &cache, asset.clone());
    download_run(&mut c).await.unwrap();

    let reloaded = fs::read(&poisoned).unwrap();
    assert_eq!(
        reloaded.len() as u64,
        asset.size,
        "corrupted cache must be replaced, not trusted"
    );
}
