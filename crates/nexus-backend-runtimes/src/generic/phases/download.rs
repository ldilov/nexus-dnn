//! T052 — download phase. Streams the resolved asset to
//! `{partial_path}/archive.bin`. Supports `file://` (local copy) and
//! `http(s)://` (streaming GET via reqwest). Retry short-circuit:
//! if the target file already exists with the expected size + matching
//! sha256, we skip the network IO entirely (FR-028).

use std::path::PathBuf;

use sha2::{Digest, Sha256};
use tokio::fs;
use tokio::io::{AsyncReadExt, AsyncWriteExt};

use crate::generic::enums::PipelineFailureCategory;
use crate::generic::errors::GenericInstallError;
use crate::generic::install_ctx::InstallCtx;

pub const ARCHIVE_FILENAME: &str = "archive.bin";

pub async fn run(ctx: &mut InstallCtx) -> Result<(), GenericInstallError> {
    let asset = ctx.resolved_asset.clone().ok_or_else(|| {
        GenericInstallError::new(
            "download",
            PipelineFailureCategory::InvalidVersionManifest,
            "resolve phase produced no asset",
        )
    })?;

    fs::create_dir_all(&ctx.partial_path).await.map_err(|e| {
        GenericInstallError::new(
            "download",
            PipelineFailureCategory::InvalidDownload,
            format!("create partial dir: {e}"),
        )
    })?;
    let target = ctx.partial_path.join(ARCHIVE_FILENAME);

    // Retry short-circuit — same hash, same size, skip the IO.
    if let Some(existing) = inspect_existing(&target, &asset.sha256).await
        && existing == asset.size
    {
        ctx.downloaded_archive = Some(target);
        return Ok(());
    }

    if let Some(rest) = asset.url.strip_prefix("file://") {
        copy_file(PathBuf::from(rest), &target).await?;
    } else if asset.url.starts_with("http://") || asset.url.starts_with("https://") {
        download_http(&asset.url, &target).await?;
    } else {
        return Err(GenericInstallError::new(
            "download",
            PipelineFailureCategory::InvalidVersionManifest,
            format!("unsupported url scheme: {}", asset.url),
        ));
    }
    ctx.downloaded_archive = Some(target);
    Ok(())
}

/// If `path` exists, hash it and return its size on a checksum match.
/// Returns `None` when the file is missing or its hash differs.
async fn inspect_existing(path: &std::path::Path, expected_sha256: &str) -> Option<u64> {
    if !path.exists() {
        return None;
    }
    let mut file = match fs::File::open(path).await {
        Ok(f) => f,
        Err(_) => return None,
    };
    let mut hasher = Sha256::new();
    let mut buf = vec![0u8; 64 * 1024];
    let mut size: u64 = 0;
    loop {
        match file.read(&mut buf).await {
            Ok(0) => break,
            Ok(n) => {
                hasher.update(&buf[..n]);
                size += n as u64;
            }
            Err(_) => return None,
        }
    }
    let hex = hex_lower(&hasher.finalize());
    if hex == expected_sha256 {
        Some(size)
    } else {
        None
    }
}

async fn copy_file(src: PathBuf, dst: &std::path::Path) -> Result<(), GenericInstallError> {
    fs::copy(&src, dst).await.map_err(|e| {
        GenericInstallError::new(
            "download",
            PipelineFailureCategory::InvalidDownload,
            format!("file copy {} → {}: {e}", src.display(), dst.display()),
        )
    })?;
    Ok(())
}

async fn download_http(url: &str, dst: &std::path::Path) -> Result<(), GenericInstallError> {
    let resp = reqwest::get(url).await.map_err(|e| {
        GenericInstallError::new(
            "download",
            PipelineFailureCategory::InvalidDownload,
            format!("http get {url}: {e}"),
        )
    })?;
    if !resp.status().is_success() {
        return Err(GenericInstallError::new(
            "download",
            PipelineFailureCategory::InvalidDownload,
            format!("http {} for {url}", resp.status()),
        ));
    }
    let bytes = resp.bytes().await.map_err(|e| {
        GenericInstallError::new(
            "download",
            PipelineFailureCategory::InvalidDownload,
            format!("read body: {e}"),
        )
    })?;
    let mut file = fs::File::create(dst).await.map_err(|e| {
        GenericInstallError::new(
            "download",
            PipelineFailureCategory::InvalidDownload,
            format!("create archive: {e}"),
        )
    })?;
    file.write_all(&bytes).await.map_err(|e| {
        GenericInstallError::new(
            "download",
            PipelineFailureCategory::InvalidDownload,
            format!("write archive: {e}"),
        )
    })?;
    file.flush().await.map_err(|e| {
        GenericInstallError::new(
            "download",
            PipelineFailureCategory::InvalidDownload,
            format!("flush archive: {e}"),
        )
    })?;
    Ok(())
}

fn hex_lower(bytes: &[u8]) -> String {
    use std::fmt::Write;
    let mut s = String::with_capacity(bytes.len() * 2);
    for b in bytes {
        let _ = write!(s, "{b:02x}");
    }
    s
}
