//! T053 — verify phase. SHA-256 hashes the downloaded archive and
//! compares against the version manifest's expected checksum. On
//! match, populates `ctx.artifact_hash` for the install row.

use sha2::{Digest, Sha256};
use tokio::fs;
use tokio::io::AsyncReadExt;

use crate::generic::enums::PipelineFailureCategory;
use crate::generic::errors::GenericInstallError;
use crate::generic::install_ctx::InstallCtx;

pub async fn run(ctx: &mut InstallCtx) -> Result<(), GenericInstallError> {
    let asset = ctx.resolved_asset.as_ref().ok_or_else(|| {
        GenericInstallError::new(
            "verify",
            PipelineFailureCategory::InvalidVersionManifest,
            "no resolved asset",
        )
    })?;
    let archive = ctx.downloaded_archive.as_ref().ok_or_else(|| {
        GenericInstallError::new(
            "verify",
            PipelineFailureCategory::InvalidDownload,
            "no downloaded archive",
        )
    })?;

    let mut file = fs::File::open(archive).await.map_err(|e| {
        GenericInstallError::new(
            "verify",
            PipelineFailureCategory::InvalidDownload,
            format!("open archive {}: {e}", archive.display()),
        )
    })?;
    let mut hasher = Sha256::new();
    let mut buf = vec![0u8; 64 * 1024];
    loop {
        let n = file.read(&mut buf).await.map_err(|e| {
            GenericInstallError::new(
                "verify",
                PipelineFailureCategory::InvalidDownload,
                format!("read archive: {e}"),
            )
        })?;
        if n == 0 {
            break;
        }
        hasher.update(&buf[..n]);
    }
    let actual = hex_lower(&hasher.finalize());
    if actual != asset.sha256 {
        return Err(GenericInstallError::new(
            "verify",
            PipelineFailureCategory::InvalidDownload,
            format!("checksum mismatch: expected {}, got {actual}", asset.sha256),
        ));
    }
    ctx.artifact_hash = Some(actual);
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
