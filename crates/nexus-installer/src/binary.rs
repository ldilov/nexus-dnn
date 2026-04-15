use std::path::{Path, PathBuf};

use futures_util::StreamExt;
use serde::{Deserialize, Serialize};
use tokio::io::AsyncWriteExt;

use crate::checksum;
use crate::error::InstallerError;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DownloadRequest {
    pub url: String,
    pub expected_checksum: Option<String>,
    pub target_dir: PathBuf,
    pub expected_binary: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InstallResult {
    pub install_dir: PathBuf,
    pub binary_paths: Vec<PathBuf>,
    pub total_bytes: u64,
    pub checksum: String,
}

pub struct GenericBinaryInstaller;

impl GenericBinaryInstaller {
    pub async fn install(
        request: &DownloadRequest,
        progress: impl Fn(u64, Option<u64>),
    ) -> Result<InstallResult, InstallerError> {
        tokio::fs::create_dir_all(&request.target_dir).await?;

        let archive_path = request.target_dir.join("_download.zip");
        download_archive(&request.url, &archive_path, &progress).await?;

        let hash = checksum::sha256_file(&archive_path).await?;
        if let Some(expected) = &request.expected_checksum {
            checksum::verify_checksum(&archive_path, expected).await?;
        }

        let total_bytes = tokio::fs::metadata(&archive_path).await?.len();
        extract_zip(&archive_path, &request.target_dir)?;

        tokio::fs::remove_file(&archive_path).await.ok();

        let binaries = discover_binaries(&request.target_dir).await?;

        if let Some(name) = &request.expected_binary {
            Self::validate(&request.target_dir, name)?;
        }

        Ok(InstallResult {
            install_dir: request.target_dir.clone(),
            binary_paths: binaries,
            total_bytes,
            checksum: hash,
        })
    }

    pub fn validate(install_dir: &Path, expected_binary: &str) -> Result<PathBuf, InstallerError> {
        let candidates = binary_candidates(install_dir, expected_binary);
        for candidate in &candidates {
            if candidate.is_file() {
                return Ok(candidate.clone());
            }
        }
        Err(InstallerError::BinaryNotFound(format!(
            "{expected_binary} not found in {}",
            install_dir.display()
        )))
    }
}

fn binary_candidates(dir: &Path, name: &str) -> Vec<PathBuf> {
    let mut paths = vec![dir.join(name)];
    if cfg!(windows) && !name.ends_with(".exe") {
        paths.push(dir.join(format!("{name}.exe")));
    }
    paths.push(dir.join("bin").join(name));
    if cfg!(windows) && !name.ends_with(".exe") {
        paths.push(dir.join("bin").join(format!("{name}.exe")));
    }
    paths
}

async fn download_archive(
    url: &str,
    dest: &Path,
    progress: &impl Fn(u64, Option<u64>),
) -> Result<(), InstallerError> {
    tracing::info!(url, "downloading archive");

    let response = reqwest::get(url)
        .await
        .map_err(|e| InstallerError::Download(format!("request failed: {e}")))?;

    if !response.status().is_success() {
        return Err(InstallerError::Download(format!(
            "HTTP {}",
            response.status()
        )));
    }

    let total = response.content_length();
    let mut stream = response.bytes_stream();
    let mut file = tokio::fs::File::create(dest).await?;
    let mut downloaded: u64 = 0;

    while let Some(chunk) = stream.next().await {
        let chunk = chunk.map_err(|e| InstallerError::Download(format!("stream error: {e}")))?;
        file.write_all(&chunk).await?;
        downloaded += chunk.len() as u64;
        progress(downloaded, total);
    }

    file.flush().await?;
    tracing::info!(bytes = downloaded, "download complete");
    Ok(())
}

fn extract_zip(archive: &Path, dest: &Path) -> Result<(), InstallerError> {
    let file = std::fs::File::open(archive)
        .map_err(|e| InstallerError::Extraction(format!("open archive: {e}")))?;
    let mut zip = zip::ZipArchive::new(file)
        .map_err(|e| InstallerError::Extraction(format!("invalid zip: {e}")))?;

    zip.extract(dest)
        .map_err(|e| InstallerError::Extraction(format!("unpack failed: {e}")))?;

    tracing::info!(entries = zip.len(), "archive extracted");
    Ok(())
}

async fn discover_binaries(dir: &Path) -> Result<Vec<PathBuf>, InstallerError> {
    let mut binaries = Vec::new();
    let mut stack = vec![dir.to_path_buf()];

    while let Some(current) = stack.pop() {
        let mut entries = tokio::fs::read_dir(&current).await?;
        while let Some(entry) = entries.next_entry().await? {
            let path = entry.path();
            let ft = entry.file_type().await?;
            if ft.is_dir() {
                stack.push(path);
                continue;
            }
            if is_executable(&path).await {
                binaries.push(path);
            }
        }
    }

    binaries.sort();
    Ok(binaries)
}

#[cfg(windows)]
async fn is_executable(path: &Path) -> bool {
    let exe_extensions = ["exe", "bat", "cmd"];
    path.extension()
        .and_then(|ext| ext.to_str())
        .is_some_and(|ext| exe_extensions.iter().any(|e| e.eq_ignore_ascii_case(ext)))
}

#[cfg(not(windows))]
async fn is_executable(path: &Path) -> bool {
    use std::os::unix::fs::PermissionsExt;
    tokio::fs::metadata(path)
        .await
        .map(|m| m.permissions().mode() & 0o111 != 0)
        .unwrap_or(false)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn binary_candidates_includes_exe_on_windows() {
        let dir = Path::new("/install");
        let candidates = binary_candidates(dir, "server");

        assert!(candidates.contains(&dir.join("server")));
        assert!(candidates.contains(&dir.join("bin").join("server")));

        if cfg!(windows) {
            assert!(candidates.contains(&dir.join("server.exe")));
            assert!(candidates.contains(&dir.join("bin").join("server.exe")));
        }
    }

    #[test]
    fn validate_returns_error_for_missing_binary() {
        let tmp = tempfile::tempdir().unwrap();
        let result = GenericBinaryInstaller::validate(tmp.path(), "nonexistent");
        assert!(result.is_err());
        let msg = result.unwrap_err().to_string();
        assert!(msg.contains("nonexistent"));
    }

    #[test]
    fn validate_finds_existing_binary() {
        let tmp = tempfile::tempdir().unwrap();
        let bin_name = if cfg!(windows) { "tool.exe" } else { "tool" };
        let bin_path = tmp.path().join(bin_name);
        std::fs::write(&bin_path, b"fake binary").unwrap();

        #[cfg(not(windows))]
        {
            use std::os::unix::fs::PermissionsExt;
            std::fs::set_permissions(&bin_path, std::fs::Permissions::from_mode(0o755)).unwrap();
        }

        let result = GenericBinaryInstaller::validate(tmp.path(), bin_name);
        assert!(result.is_ok());
        assert_eq!(result.unwrap(), bin_path);
    }
}
