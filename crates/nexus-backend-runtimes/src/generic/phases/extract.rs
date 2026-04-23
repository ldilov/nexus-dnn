//! T054 — extract phase. Unpacks the downloaded archive into the
//! `partial_path` working dir. Detects format by extension on the
//! resolved URL: `.zip`, `.tar.gz` / `.tgz`, `.tar`. Family-agnostic.
//!
//! Runs the actual unpack on `tokio::task::spawn_blocking` because the
//! `zip` and `tar` crates are sync.

use std::fs::File;
use std::io::BufReader;
use std::path::{Path, PathBuf};

use tokio::fs as async_fs;

use crate::generic::enums::PipelineFailureCategory;
use crate::generic::errors::GenericInstallError;
use crate::generic::install_ctx::InstallCtx;

pub const EXTRACT_SENTINEL: &str = ".extract-complete";

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum ArchiveKind {
    Zip,
    TarGz,
    Tar,
}

pub async fn run(ctx: &mut InstallCtx) -> Result<(), GenericInstallError> {
    let archive = ctx.downloaded_archive.as_ref().ok_or_else(|| {
        GenericInstallError::new(
            "extract",
            PipelineFailureCategory::InvalidDownload,
            "no downloaded archive",
        )
    })?;
    let asset = ctx.resolved_asset.as_ref().ok_or_else(|| {
        GenericInstallError::new(
            "extract",
            PipelineFailureCategory::InvalidVersionManifest,
            "no resolved asset",
        )
    })?;

    let sentinel_path = ctx.partial_path.join(EXTRACT_SENTINEL);
    if sentinel_matches(&sentinel_path, &asset.sha256).await {
        ctx.phase_cached = true;
        return Ok(());
    }

    let kind = detect_kind(&asset.url).ok_or_else(|| {
        GenericInstallError::new(
            "extract",
            PipelineFailureCategory::InvalidDownload,
            format!("cannot infer archive format from url `{}`", asset.url),
        )
    })?;
    let archive_path = archive.clone();
    let dst = ctx.partial_path.clone();

    tokio::task::spawn_blocking(move || extract_blocking(kind, archive_path, dst))
        .await
        .map_err(|e| {
            GenericInstallError::new(
                "extract",
                PipelineFailureCategory::InvalidDownload,
                format!("extract task panicked: {e}"),
            )
        })??;

    async_fs::write(&sentinel_path, asset.sha256.as_bytes())
        .await
        .map_err(|e| {
            GenericInstallError::new(
                "extract",
                PipelineFailureCategory::InvalidDownload,
                format!("write extract sentinel {}: {e}", sentinel_path.display()),
            )
        })?;
    Ok(())
}

async fn sentinel_matches(path: &Path, expected_sha256: &str) -> bool {
    match async_fs::read_to_string(path).await {
        Ok(stored) => stored.trim() == expected_sha256,
        Err(_) => false,
    }
}

fn detect_kind(url: &str) -> Option<ArchiveKind> {
    let lower = url.to_ascii_lowercase();
    if lower.ends_with(".zip") {
        Some(ArchiveKind::Zip)
    } else if lower.ends_with(".tar.gz") || lower.ends_with(".tgz") {
        Some(ArchiveKind::TarGz)
    } else if lower.ends_with(".tar") {
        Some(ArchiveKind::Tar)
    } else {
        None
    }
}

fn extract_blocking(
    kind: ArchiveKind,
    archive: PathBuf,
    dst: PathBuf,
) -> Result<(), GenericInstallError> {
    let file = File::open(&archive).map_err(|e| {
        GenericInstallError::new(
            "extract",
            PipelineFailureCategory::InvalidDownload,
            format!("open archive {}: {e}", archive.display()),
        )
    })?;
    match kind {
        ArchiveKind::Zip => extract_zip(file, &dst),
        ArchiveKind::TarGz => extract_tar_gz(file, &dst),
        ArchiveKind::Tar => extract_tar(file, &dst),
    }
}

fn extract_zip(file: File, dst: &std::path::Path) -> Result<(), GenericInstallError> {
    let mut archive = zip::ZipArchive::new(BufReader::new(file)).map_err(|e| {
        GenericInstallError::new(
            "extract",
            PipelineFailureCategory::InvalidDownload,
            format!("open zip: {e}"),
        )
    })?;
    for i in 0..archive.len() {
        let mut entry = archive.by_index(i).map_err(|e| {
            GenericInstallError::new(
                "extract",
                PipelineFailureCategory::InvalidDownload,
                format!("read zip entry {i}: {e}"),
            )
        })?;
        // zip-slip prevention: enclosed_name() rejects absolute paths + ..
        let outpath = match entry.enclosed_name() {
            Some(p) => dst.join(p),
            None => {
                return Err(GenericInstallError::new(
                    "extract",
                    PipelineFailureCategory::InvalidDownload,
                    format!("zip entry `{}` has unsafe path", entry.name()),
                ));
            }
        };
        if entry.is_dir() {
            std::fs::create_dir_all(&outpath).map_err(|e| zip_io_err(&outpath, e))?;
        } else {
            if let Some(parent) = outpath.parent() {
                std::fs::create_dir_all(parent).map_err(|e| zip_io_err(parent, e))?;
            }
            let mut out = File::create(&outpath).map_err(|e| zip_io_err(&outpath, e))?;
            std::io::copy(&mut entry, &mut out).map_err(|e| zip_io_err(&outpath, e))?;
        }
    }
    Ok(())
}

fn extract_tar_gz(file: File, dst: &std::path::Path) -> Result<(), GenericInstallError> {
    let dec = flate2::read::GzDecoder::new(BufReader::new(file));
    let mut archive = tar::Archive::new(dec);
    archive
        .unpack(dst)
        .map_err(|e| extract_io_err(dst, e, "tar.gz"))?;
    Ok(())
}

fn extract_tar(file: File, dst: &std::path::Path) -> Result<(), GenericInstallError> {
    let mut archive = tar::Archive::new(BufReader::new(file));
    archive
        .unpack(dst)
        .map_err(|e| extract_io_err(dst, e, "tar"))?;
    Ok(())
}

fn zip_io_err(path: &std::path::Path, e: std::io::Error) -> GenericInstallError {
    GenericInstallError::new(
        "extract",
        PipelineFailureCategory::InvalidDownload,
        format!("zip extract {}: {e}", path.display()),
    )
}

fn extract_io_err(
    path: &std::path::Path,
    e: std::io::Error,
    kind: &'static str,
) -> GenericInstallError {
    GenericInstallError::new(
        "extract",
        PipelineFailureCategory::InvalidDownload,
        format!("{kind} extract into {}: {e}", path.display()),
    )
}
