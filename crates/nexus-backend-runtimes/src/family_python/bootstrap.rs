use std::fs::File;
use std::io::BufReader;
use std::path::{Path, PathBuf};

use sha2::{Digest, Sha256};
use tokio::fs;
use tokio::io::{AsyncReadExt, AsyncWriteExt};

use crate::generic::enums::PipelineFailureCategory;
use crate::generic::errors::GenericInstallError;
use crate::generic::install_ctx::InstallCtx;

use super::asset::{PythonArchiveKind, PythonAsset};
use super::handler::python_exe_in;

const PHASE: &str = "bootstrap_runtime";
const EMBEDDED_PYTHON_CACHE_SUBDIR: &str = "embedded_python";

pub async fn run(
    ctx: &mut InstallCtx,
    asset: Option<&PythonAsset>,
) -> Result<(), GenericInstallError> {
    if python_exe_in(&ctx.partial_path).is_file() {
        return Ok(());
    }

    let asset = asset.ok_or_else(|| {
        GenericInstallError::new(
            PHASE,
            PipelineFailureCategory::PythonBootstrapFailed,
            format!(
                "no embedded Python asset configured for target `{}` — \
                 call FamilyPythonHandler::with_asset or populate the \
                 host-side asset table before installing python-family runtimes",
                super::asset::current_target_triple()
            ),
        )
    })?;

    let cache_root = ctx.download_cache.join(EMBEDDED_PYTHON_CACHE_SUBDIR);
    fs::create_dir_all(&cache_root).await.map_err(io_err)?;
    let cached_archive = cache_root.join(cache_filename(asset));
    fetch_archive(asset, &cached_archive).await?;

    let extract_into = ctx.partial_path.join(&asset.extract_dir);
    fs::create_dir_all(&extract_into).await.map_err(io_err)?;

    let archive = cached_archive.clone();
    let dst = extract_into.clone();
    let kind = asset.kind;
    let strip = asset.archive_root_component.clone();
    tokio::task::spawn_blocking(move || extract_archive(kind, &archive, &dst, strip.as_deref()))
        .await
        .map_err(|e| {
            GenericInstallError::new(
                PHASE,
                PipelineFailureCategory::PythonBootstrapFailed,
                format!("extract task panicked: {e}"),
            )
        })??;

    if !python_exe_in(&ctx.partial_path).is_file() {
        return Err(GenericInstallError::new(
            PHASE,
            PipelineFailureCategory::PythonBootstrapFailed,
            format!(
                "embedded python executable not found at `{}` after extraction",
                python_exe_in(&ctx.partial_path).display()
            ),
        ));
    }

    Ok(())
}

fn cache_filename(asset: &PythonAsset) -> String {
    let ext = match asset.kind {
        PythonArchiveKind::TarGz => "tar.gz",
        PythonArchiveKind::Zip => "zip",
    };
    format!("{}.{ext}", &asset.sha256)
}

async fn fetch_archive(asset: &PythonAsset, dst: &Path) -> Result<(), GenericInstallError> {
    if let Some(existing) = inspect_existing(dst, &asset.sha256).await
        && existing == asset.size
    {
        return Ok(());
    }

    if let Some(rest) = asset.url.strip_prefix("file://") {
        let src = decode_file_url(rest);
        fs::copy(&src, dst).await.map_err(|e| {
            GenericInstallError::new(
                PHASE,
                PipelineFailureCategory::PythonBootstrapFailed,
                format!("copy {} → {}: {e}", src.display(), dst.display()),
            )
        })?;
    } else if asset.url.starts_with("http://") || asset.url.starts_with("https://") {
        download_http(&asset.url, dst).await?;
    } else {
        return Err(GenericInstallError::new(
            PHASE,
            PipelineFailureCategory::PythonBootstrapFailed,
            format!("unsupported url scheme: {}", asset.url),
        ));
    }

    verify_checksum(dst, &asset.sha256, asset.size).await
}

async fn download_http(url: &str, dst: &Path) -> Result<(), GenericInstallError> {
    let resp = reqwest::get(url).await.map_err(|e| {
        GenericInstallError::new(
            PHASE,
            PipelineFailureCategory::PythonBootstrapFailed,
            format!("http get {url}: {e}"),
        )
    })?;
    if !resp.status().is_success() {
        return Err(GenericInstallError::new(
            PHASE,
            PipelineFailureCategory::PythonBootstrapFailed,
            format!("http {} for {url}", resp.status()),
        ));
    }
    let bytes = resp.bytes().await.map_err(|e| {
        GenericInstallError::new(
            PHASE,
            PipelineFailureCategory::PythonBootstrapFailed,
            format!("read body: {e}"),
        )
    })?;
    let mut file = fs::File::create(dst).await.map_err(io_err)?;
    file.write_all(&bytes).await.map_err(io_err)?;
    file.flush().await.map_err(io_err)?;
    Ok(())
}

async fn inspect_existing(path: &Path, expected_sha256: &str) -> Option<u64> {
    if !path.exists() {
        return None;
    }
    let mut file = fs::File::open(path).await.ok()?;
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

async fn verify_checksum(
    path: &Path,
    expected_sha256: &str,
    expected_size: u64,
) -> Result<(), GenericInstallError> {
    let mut file = fs::File::open(path).await.map_err(io_err)?;
    let mut hasher = Sha256::new();
    let mut buf = vec![0u8; 64 * 1024];
    let mut size: u64 = 0;
    loop {
        let n = file.read(&mut buf).await.map_err(io_err)?;
        if n == 0 {
            break;
        }
        hasher.update(&buf[..n]);
        size += n as u64;
    }
    let hex = hex_lower(&hasher.finalize());
    if hex != expected_sha256 {
        return Err(GenericInstallError::new(
            PHASE,
            PipelineFailureCategory::PythonBootstrapFailed,
            format!("sha256 mismatch: expected {expected_sha256}, got {hex}"),
        ));
    }
    if expected_size > 0 && size != expected_size {
        return Err(GenericInstallError::new(
            PHASE,
            PipelineFailureCategory::PythonBootstrapFailed,
            format!("size mismatch: expected {expected_size}, got {size}"),
        ));
    }
    Ok(())
}

fn extract_archive(
    kind: PythonArchiveKind,
    archive: &Path,
    dst: &Path,
    strip_component: Option<&str>,
) -> Result<(), GenericInstallError> {
    let file = File::open(archive).map_err(|e| {
        GenericInstallError::new(
            PHASE,
            PipelineFailureCategory::PythonBootstrapFailed,
            format!("open archive {}: {e}", archive.display()),
        )
    })?;
    match kind {
        PythonArchiveKind::TarGz => extract_tar_gz(file, dst, strip_component),
        PythonArchiveKind::Zip => extract_zip(file, dst, strip_component),
    }
}

fn extract_tar_gz(
    file: File,
    dst: &Path,
    strip_component: Option<&str>,
) -> Result<(), GenericInstallError> {
    let dec = flate2::read::GzDecoder::new(BufReader::new(file));
    let mut archive = tar::Archive::new(dec);
    archive.set_preserve_permissions(true);
    archive.set_overwrite(true);
    for entry in archive.entries().map_err(tar_err)? {
        let mut entry = entry.map_err(tar_err)?;
        let path = entry.path().map_err(tar_err)?.into_owned();
        let Some(rel) = strip_outer(&path, strip_component) else {
            continue;
        };
        if rel.as_os_str().is_empty() {
            continue;
        }
        let out = dst.join(&rel);
        if !out.starts_with(dst) {
            return Err(GenericInstallError::new(
                PHASE,
                PipelineFailureCategory::PythonBootstrapFailed,
                format!("tar entry `{}` escapes dst via ..", path.display()),
            ));
        }
        if let Some(parent) = out.parent() {
            std::fs::create_dir_all(parent).map_err(io_err_std)?;
        }
        entry.unpack(&out).map_err(tar_err)?;
    }
    Ok(())
}

fn extract_zip(
    file: File,
    dst: &Path,
    strip_component: Option<&str>,
) -> Result<(), GenericInstallError> {
    let mut archive = zip::ZipArchive::new(BufReader::new(file)).map_err(|e| {
        GenericInstallError::new(
            PHASE,
            PipelineFailureCategory::PythonBootstrapFailed,
            format!("open zip: {e}"),
        )
    })?;
    for i in 0..archive.len() {
        let mut entry = archive.by_index(i).map_err(|e| {
            GenericInstallError::new(
                PHASE,
                PipelineFailureCategory::PythonBootstrapFailed,
                format!("read zip entry {i}: {e}"),
            )
        })?;
        let enclosed = match entry.enclosed_name() {
            Some(p) => p.to_path_buf(),
            None => {
                return Err(GenericInstallError::new(
                    PHASE,
                    PipelineFailureCategory::PythonBootstrapFailed,
                    format!("zip entry `{}` has unsafe path", entry.name()),
                ));
            }
        };
        let Some(rel) = strip_outer(&enclosed, strip_component) else {
            continue;
        };
        if rel.as_os_str().is_empty() {
            continue;
        }
        let out = dst.join(&rel);
        if entry.is_dir() {
            std::fs::create_dir_all(&out).map_err(io_err_std)?;
        } else {
            if let Some(parent) = out.parent() {
                std::fs::create_dir_all(parent).map_err(io_err_std)?;
            }
            let mut sink = File::create(&out).map_err(io_err_std)?;
            std::io::copy(&mut entry, &mut sink).map_err(io_err_std)?;
        }
    }
    Ok(())
}

fn strip_outer(path: &Path, strip_component: Option<&str>) -> Option<PathBuf> {
    let Some(outer) = strip_component else {
        return Some(path.to_path_buf());
    };
    let mut components = path.components();
    match components.next() {
        Some(first) if first.as_os_str() == outer => Some(components.as_path().to_path_buf()),
        _ => Some(path.to_path_buf()),
    }
}

fn decode_file_url(rest: &str) -> PathBuf {
    if cfg!(windows) && rest.starts_with('/') && rest.len() >= 4 {
        let bytes = rest.as_bytes();
        if bytes[2] == b':' || bytes[3] == b':' {
            return PathBuf::from(&rest[1..]);
        }
    }
    PathBuf::from(rest)
}

fn io_err(e: std::io::Error) -> GenericInstallError {
    io_err_std(e)
}

fn io_err_std(e: std::io::Error) -> GenericInstallError {
    GenericInstallError::new(
        PHASE,
        PipelineFailureCategory::PythonBootstrapFailed,
        format!("io error: {e}"),
    )
}

fn tar_err(e: std::io::Error) -> GenericInstallError {
    GenericInstallError::new(
        PHASE,
        PipelineFailureCategory::PythonBootstrapFailed,
        format!("tar error: {e}"),
    )
}

fn hex_lower(bytes: &[u8]) -> String {
    use std::fmt::Write;
    let mut s = String::with_capacity(bytes.len() * 2);
    for b in bytes {
        let _ = write!(s, "{b:02x}");
    }
    s
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn strip_outer_drops_matching_component() {
        let rel = strip_outer(Path::new("python/bin/python3"), Some("python")).unwrap();
        assert_eq!(rel, PathBuf::from("bin/python3"));
    }

    #[test]
    fn strip_outer_leaves_non_matching_component_alone() {
        let rel = strip_outer(Path::new("bin/python3"), Some("python")).unwrap();
        assert_eq!(rel, PathBuf::from("bin/python3"));
    }

    #[test]
    fn strip_outer_none_is_identity() {
        let rel = strip_outer(Path::new("bin/python3"), None).unwrap();
        assert_eq!(rel, PathBuf::from("bin/python3"));
    }

    #[test]
    fn cache_filename_uses_hash_and_extension() {
        let a = PythonAsset::pbs_install_only("file:///x/y.tar.gz", "aaaa", 1);
        assert_eq!(cache_filename(&a), "aaaa.tar.gz");
        let z = PythonAsset {
            url: "file:///x/y.zip".into(),
            sha256: "bbbb".into(),
            size: 0,
            kind: PythonArchiveKind::Zip,
            extract_dir: PathBuf::from("python"),
            archive_root_component: None,
        };
        assert_eq!(cache_filename(&z), "bbbb.zip");
    }

    #[test]
    fn decode_file_url_strips_leading_slash_on_windows_drive_paths() {
        if cfg!(windows) {
            assert_eq!(decode_file_url("/C:/tmp/x"), PathBuf::from("C:/tmp/x"));
        } else {
            assert_eq!(decode_file_url("/tmp/x"), PathBuf::from("/tmp/x"));
        }
    }
}
