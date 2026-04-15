use camino::Utf8PathBuf;
use sqlx::SqlitePool;
use std::path::PathBuf;
use std::time::Instant;
use tokio_util::sync::CancellationToken;

use crate::adapter::InstallRequest;
use crate::detect::{find_binary, server_binary_name};
use crate::error::{InstallError, RuntimeAdapterError};
use crate::events::{BackendEvent, InstallFailedPayload, InstallProgressPayload, SharedPublisher};
use crate::extract;
use crate::llamacpp::installs_store;
use crate::manifest::install::{InstallManifest, InstallStatus};
use crate::manifest::version::{ReleaseAsset, VersionManifest};
use crate::resolver::{MachineDescriptor, resolve_runtime_asset};

const PHASES: [&str; 8] = [
    "resolve", "download", "verify", "extract", "detect", "validate", "persist", "complete",
];

fn backend_id() -> &'static str {
    "llama.cpp"
}

pub async fn run(
    manifest: &VersionManifest,
    machine: &MachineDescriptor,
    request: InstallRequest,
    runtimes_root: &Utf8PathBuf,
    pool: &SqlitePool,
    publisher: SharedPublisher,
    cancel: CancellationToken,
) -> Result<InstallManifest, RuntimeAdapterError> {
    let task_id = format!("itask_{}", ulid::Ulid::new());
    let started = Instant::now();
    let emit_progress = |phase_index: usize, bytes_dl: u64, bytes_total: Option<u64>| {
        let publisher = publisher.clone();
        let task_id = task_id.clone();
        let elapsed = started.elapsed().as_millis() as u64;
        let payload = InstallProgressPayload {
            phase: PHASES[phase_index].into(),
            phase_index: phase_index as u32,
            total_phases: PHASES.len() as u32,
            bytes_downloaded: bytes_dl,
            bytes_total,
            elapsed_ms: elapsed,
        };
        tokio::spawn(async move {
            let event = BackendEvent::new(
                "llm.backend.install.progress",
                backend_id(),
                serde_json::to_value(payload).unwrap_or(serde_json::Value::Null),
            )
            .with_task(task_id);
            publisher.publish(event).await;
        });
    };

    match run_inner(
        manifest,
        machine,
        request,
        runtimes_root,
        pool,
        publisher.clone(),
        cancel,
        &task_id,
        emit_progress,
    )
    .await
    {
        Ok(m) => {
            let event = BackendEvent::new(
                "llm.backend.install.completed",
                backend_id(),
                serde_json::json!({
                    "runtime_install_id": m.runtime_install_id,
                    "release_id": m.release_id,
                    "platform": m.platform,
                    "accelerator_profile": m.accelerator_profile,
                    "binary_path": m.binary_path,
                    "elapsed_ms": started.elapsed().as_millis() as u64,
                }),
            )
            .with_task(task_id.clone())
            .with_install(m.runtime_install_id.clone());
            publisher.publish(event).await;
            Ok(m)
        }
        Err(err) => {
            let (phase, category, local_pkg) = match &err {
                RuntimeAdapterError::Install(install_err) => {
                    let category = install_err.failure_category();
                    let phase = match install_err {
                        InstallError::AssetResolution(_) => "resolve",
                        InstallError::Download(_) => "download",
                        InstallError::ChecksumMismatch { .. } => "verify",
                        InstallError::Extraction(_) => "extract",
                        InstallError::BinaryMissing(_) => "detect",
                        InstallError::Cancelled => "download",
                        InstallError::Persistence(_) => "persist",
                        InstallError::Io(_) => "extract",
                    };
                    (phase, category, None)
                }
                _ => (
                    "validate",
                    crate::diagnostics::FailureCategory::UnexpectedProcessExit,
                    None,
                ),
            };
            let payload = InstallFailedPayload {
                phase: phase.into(),
                failure_category: category,
                summary: category.title().into(),
                remediation: vec!["Retry install".into()],
                local_package_path: local_pkg,
                elapsed_ms: started.elapsed().as_millis() as u64,
            };
            let event = BackendEvent::new(
                "llm.backend.install.failed",
                backend_id(),
                serde_json::to_value(payload).unwrap_or(serde_json::Value::Null),
            )
            .with_task(task_id);
            publisher.publish(event).await;
            Err(err)
        }
    }
}

async fn run_inner<F>(
    manifest: &VersionManifest,
    machine: &MachineDescriptor,
    request: InstallRequest,
    runtimes_root: &Utf8PathBuf,
    pool: &SqlitePool,
    _publisher: SharedPublisher,
    cancel: CancellationToken,
    _task_id: &str,
    mut emit_progress: F,
) -> Result<InstallManifest, RuntimeAdapterError>
where
    F: FnMut(usize, u64, Option<u64>),
{
    emit_progress(0, 0, None);
    let asset: &ReleaseAsset = resolve_runtime_asset(
        machine,
        manifest,
        request.release_id.as_deref(),
        request.accelerator_profile,
    )?;
    let release_id = find_release_id(manifest, asset)
        .ok_or_else(|| InstallError::AssetResolution("release not found for asset".into()))?;

    let install_dir: PathBuf = runtimes_root
        .as_std_path()
        .join("llama.cpp")
        .join(&release_id)
        .join(format!(
            "{}-{}",
            asset.platform,
            asset.accelerator_profile.as_wire()
        ));
    let package_dir = install_dir.join("package");
    let tmp_archive = install_dir.join("download.archive");
    tokio::fs::create_dir_all(&install_dir)
        .await
        .map_err(InstallError::from)?;
    tokio::fs::create_dir_all(&package_dir)
        .await
        .map_err(InstallError::from)?;

    emit_progress(1, 0, None);
    let outcome = crate::download::download(
        &asset.url,
        asset.checksum_sha256.as_deref(),
        &tmp_archive,
        &cancel,
        |bytes_dl, bytes_total, _elapsed| {
            emit_progress(1, bytes_dl, bytes_total);
        },
    )
    .await?;

    emit_progress(2, outcome.bytes_downloaded, outcome.bytes_total);
    outcome.verification.verify()?;

    emit_progress(3, outcome.bytes_downloaded, outcome.bytes_total);
    extract::extract(&tmp_archive, &package_dir).await?;
    let _ = tokio::fs::remove_file(&tmp_archive).await;

    emit_progress(4, outcome.bytes_downloaded, outcome.bytes_total);
    let binary_path = find_binary(&package_dir, server_binary_name())?;

    emit_progress(6, outcome.bytes_downloaded, outcome.bytes_total);
    let runtime_install_id = format!("rtinst_{}", ulid::Ulid::new());
    let install_manifest = InstallManifest {
        runtime_install_id: runtime_install_id.clone(),
        backend: backend_id().into(),
        release_id: release_id.clone(),
        platform: asset.platform.clone(),
        accelerator_profile: asset.accelerator_profile,
        source_url: asset.url.clone(),
        checksum_sha256: Some(outcome.verification.actual.clone()),
        install_path: install_dir.to_string_lossy().into(),
        binary_path: binary_path.to_string_lossy().into(),
        status: InstallStatus::InstalledUnvalidated,
        installed_at: chrono::Utc::now().timestamp_millis(),
        validated_at: None,
        last_failure_category: None,
    };
    install_manifest
        .write(&install_dir.join("manifest.json"))
        .await?;
    installs_store::upsert(pool, &install_manifest).await?;
    emit_progress(7, outcome.bytes_downloaded, outcome.bytes_total);
    Ok(install_manifest)
}

fn find_release_id(manifest: &VersionManifest, asset: &ReleaseAsset) -> Option<String> {
    manifest
        .releases
        .iter()
        .find(|rel| {
            rel.assets
                .iter()
                .any(|a| a.url == asset.url && a.platform == asset.platform)
        })
        .map(|rel| rel.release_id.clone())
}
