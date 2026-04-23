//! Integration tests for the Python family handler's bootstrap phase
//! (T060). Exercises the tar.gz extraction path end-to-end against a
//! fixture archive so we never regress the `strip_outer` component
//! handling or the post-extract executable-presence assertion.

use std::fs;
use std::io::Write;
use std::path::{Path, PathBuf};
use std::sync::Arc;

use flate2::Compression;
use flate2::write::GzEncoder;
use sha2::{Digest, Sha256};
use tempfile::TempDir;
use tokio_util::sync::CancellationToken;

use nexus_backend_runtimes::events::{BackendEventBus, SharedPublisher};
use nexus_backend_runtimes::family_python::{
    FamilyPythonHandler, PythonAsset, bootstrap, python_exe_in, validate,
};
use nexus_backend_runtimes::generic::enums::PipelineFailureCategory;
use nexus_backend_runtimes::generic::family_handler::RuntimeFamilyHandler;
use nexus_backend_runtimes::generic::ids::{
    AcceleratorProfile, PlatformId, ReleaseId, RuntimeId, RuntimeInstallId,
};
use nexus_backend_runtimes::generic::install_ctx::InstallCtx;

/// Name of the entry inside the fixture archive that represents the
/// embedded interpreter. Platform-conventional so the post-extract
/// assertion in [`bootstrap::run`] passes.
fn archive_python_entry() -> &'static str {
    if cfg!(windows) {
        "python/python.exe"
    } else {
        "python/bin/python3"
    }
}

/// Build a minimal `python/…` tar.gz on disk, return its path, sha256,
/// and size.
fn build_fixture_archive(archive_dir: &Path) -> (PathBuf, String, u64) {
    let archive_path = archive_dir.join("cpython-fixture.tar.gz");
    let file = fs::File::create(&archive_path).expect("create archive");
    let enc = GzEncoder::new(file, Compression::fast());
    let mut tar = tar::Builder::new(enc);

    // A dummy interpreter payload — a single-line shell stub is enough
    // for bootstrap's "file present after extract" check.
    let payload = b"#!stub\n";
    let mut header = tar::Header::new_gnu();
    header.set_size(payload.len() as u64);
    header.set_mode(0o755);
    header.set_cksum();
    tar.append_data(&mut header, archive_python_entry(), &payload[..])
        .expect("append entry");
    let enc = tar.into_inner().expect("finish tar");
    enc.finish().expect("finish gz");

    let bytes = fs::read(&archive_path).expect("read archive");
    let mut hasher = Sha256::new();
    hasher.update(&bytes);
    let hex = hex_lower(&hasher.finalize());
    (archive_path, hex, bytes.len() as u64)
}

fn hex_lower(bytes: &[u8]) -> String {
    use std::fmt::Write;
    let mut s = String::with_capacity(bytes.len() * 2);
    for b in bytes {
        let _ = write!(s, "{b:02x}");
    }
    s
}

fn publisher() -> SharedPublisher {
    Arc::new(BackendEventBus::new(64))
}

fn fixture_ctx(partial: &Path, install: &Path, cache: &Path) -> InstallCtx {
    InstallCtx {
        install_id: RuntimeInstallId::new(),
        runtime_id: RuntimeId::try_from("nexus.test.python").unwrap(),
        release_id: ReleaseId::try_from("v0_0_1").unwrap(),
        platform: PlatformId::try_from(if cfg!(windows) {
            "windows-x64"
        } else {
            "linux-x64"
        })
        .unwrap(),
        accelerator_profile: AcceleratorProfile::try_from("cpu").unwrap(),
        partial_path: partial.to_path_buf(),
        install_path: install.to_path_buf(),
        download_cache: cache.to_path_buf(),
        release_manifest: serde_json::Value::Null,
        extension_root: None,
        resolved_asset: None,
        downloaded_archive: None,
        artifact_hash: None,
        entrypoint_path: None,
        event_publisher: publisher(),
        cancellation: CancellationToken::new(),
        phase_cached: false,
    }
}

fn file_url(path: &Path) -> String {
    // Encode backslashes as forward slashes so reqwest's parser is happy.
    let display = path.display().to_string().replace('\\', "/");
    if cfg!(windows) {
        format!("file:///{display}")
    } else {
        format!("file://{display}")
    }
}

#[tokio::test]
async fn bootstrap_extracts_archive_and_lands_expected_python_exe() {
    let tmp = TempDir::new().expect("tmp");
    let fixture_dir = tmp.path().join("fixtures");
    fs::create_dir_all(&fixture_dir).unwrap();
    let (archive_path, sha256, size) = build_fixture_archive(&fixture_dir);

    let cache = tmp.path().join("cache");
    let partial = tmp.path().join("partial");
    let install = tmp.path().join("install");
    fs::create_dir_all(&partial).unwrap();
    fs::create_dir_all(&cache).unwrap();

    let asset = PythonAsset::pbs_install_only(file_url(&archive_path), sha256, size);
    let mut ctx = fixture_ctx(&partial, &install, &cache);

    bootstrap::run(&mut ctx, Some(&asset))
        .await
        .expect("bootstrap ok");

    let python = python_exe_in(&partial);
    assert!(python.is_file(), "expected python at {}", python.display());
}

#[tokio::test]
async fn bootstrap_short_circuits_when_interpreter_already_present() {
    let tmp = TempDir::new().expect("tmp");
    let cache = tmp.path().join("cache");
    let partial = tmp.path().join("partial");
    let install = tmp.path().join("install");
    fs::create_dir_all(&cache).unwrap();
    let python = python_exe_in(&partial);
    fs::create_dir_all(python.parent().unwrap()).unwrap();
    let mut f = fs::File::create(&python).unwrap();
    f.write_all(b"#!stub\n").unwrap();
    drop(f);

    // No asset configured — short-circuit must fire before the asset
    // presence check.
    let mut ctx = fixture_ctx(&partial, &install, &cache);
    bootstrap::run(&mut ctx, None)
        .await
        .expect("bootstrap noop ok");
    assert!(python.is_file());
}

#[tokio::test]
async fn bootstrap_fails_with_python_bootstrap_failed_when_no_asset_configured() {
    let tmp = TempDir::new().expect("tmp");
    let cache = tmp.path().join("cache");
    let partial = tmp.path().join("partial");
    let install = tmp.path().join("install");
    fs::create_dir_all(&cache).unwrap();
    fs::create_dir_all(&partial).unwrap();

    let mut ctx = fixture_ctx(&partial, &install, &cache);
    let err = bootstrap::run(&mut ctx, None)
        .await
        .expect_err("bootstrap should fail without asset");
    assert_eq!(err.category, PipelineFailureCategory::PythonBootstrapFailed);
    assert!(err.detail.contains("no embedded Python asset"));
}

#[tokio::test]
async fn bootstrap_rejects_checksum_mismatch() {
    let tmp = TempDir::new().expect("tmp");
    let fixture_dir = tmp.path().join("fixtures");
    fs::create_dir_all(&fixture_dir).unwrap();
    let (archive_path, _, size) = build_fixture_archive(&fixture_dir);

    let cache = tmp.path().join("cache");
    let partial = tmp.path().join("partial");
    let install = tmp.path().join("install");
    fs::create_dir_all(&partial).unwrap();
    fs::create_dir_all(&cache).unwrap();

    let wrong_hash = "0".repeat(64);
    let asset = PythonAsset::pbs_install_only(file_url(&archive_path), wrong_hash, size);
    let mut ctx = fixture_ctx(&partial, &install, &cache);

    let err = bootstrap::run(&mut ctx, Some(&asset))
        .await
        .expect_err("expected checksum failure");
    assert_eq!(err.category, PipelineFailureCategory::PythonBootstrapFailed);
    assert!(err.detail.contains("sha256 mismatch"));
}

#[tokio::test]
async fn validate_absolutises_relative_entrypoint_against_install_path() {
    let tmp = TempDir::new().expect("tmp");
    let partial = tmp.path().join("partial");
    let install = tmp.path().join("install");
    fs::create_dir_all(&partial).unwrap();

    // Stage a fake interpreter that actually runs the version probe.
    // This exercises the real `probe_interpreter` code path.
    let system_python = locate_system_python().expect(
        "system python3 needed for validate probe — skip this test in minimal CI envs",
    );
    let python = python_exe_in(&partial);
    fs::create_dir_all(python.parent().unwrap()).unwrap();
    copy_executable(&system_python, &python).expect("copy system python");

    let mut ctx = fixture_ctx(&partial, &install, &tmp.path().join("cache"));
    ctx.entrypoint_path = Some(PathBuf::from("worker/main.py"));
    validate::run(&mut ctx).await.expect("validate ok");

    let rewritten = ctx.entrypoint_path.clone().unwrap();
    assert!(rewritten.is_absolute(), "entrypoint must be absolutised");
    assert_eq!(rewritten, install.join("worker/main.py"));
}

#[tokio::test]
async fn handler_reports_python_family_and_bootstrap_delegates() {
    let tmp = TempDir::new().expect("tmp");
    let cache = tmp.path().join("cache");
    let partial = tmp.path().join("partial");
    let install = tmp.path().join("install");
    fs::create_dir_all(&cache).unwrap();
    fs::create_dir_all(&partial).unwrap();

    let handler = FamilyPythonHandler::new();
    let mut ctx = fixture_ctx(&partial, &install, &cache);
    let err = handler
        .bootstrap_runtime(&mut ctx)
        .await
        .expect_err("no asset → error");
    assert_eq!(err.category, PipelineFailureCategory::PythonBootstrapFailed);
    assert_eq!(handler.family().as_str(), "python");
}

fn locate_system_python() -> Option<PathBuf> {
    let candidates = if cfg!(windows) {
        vec!["python", "python3", "py"]
    } else {
        vec!["python3", "python"]
    };
    for name in candidates {
        if let Ok(output) = std::process::Command::new(if cfg!(windows) { "where" } else { "which" })
            .arg(name)
            .output()
            && output.status.success()
        {
            let stdout = String::from_utf8_lossy(&output.stdout);
            if let Some(line) = stdout.lines().next() {
                let p = PathBuf::from(line.trim());
                if p.is_file() {
                    return Some(p);
                }
            }
        }
    }
    None
}

fn copy_executable(src: &Path, dst: &Path) -> std::io::Result<()> {
    fs::copy(src, dst)?;
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        let mut perms = fs::metadata(dst)?.permissions();
        perms.set_mode(0o755);
        fs::set_permissions(dst, perms)?;
    }
    Ok(())
}
