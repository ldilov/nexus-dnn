use std::fs::File;
use std::io::{BufReader, Read, Seek};
use std::path::{Path, PathBuf};

use crate::error::InstallError;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ArchiveFormat {
    Zip,
    TarGz,
    Unknown,
}

pub fn sniff_format(path: &Path) -> Result<ArchiveFormat, InstallError> {
    let mut file = File::open(path)?;
    let mut magic = [0u8; 4];
    let n = file.read(&mut magic)?;
    file.rewind()?;
    if n >= 4 && &magic == b"PK\x03\x04" {
        Ok(ArchiveFormat::Zip)
    } else if n >= 2 && magic[0] == 0x1f && magic[1] == 0x8b {
        Ok(ArchiveFormat::TarGz)
    } else {
        Ok(ArchiveFormat::Unknown)
    }
}

pub async fn extract(archive: &Path, destination: &Path) -> Result<PathBuf, InstallError> {
    let archive = archive.to_path_buf();
    let destination = destination.to_path_buf();
    tokio::task::spawn_blocking(move || extract_blocking(&archive, &destination))
        .await
        .map_err(|e| InstallError::Extraction(format!("join error: {e}")))?
}

fn extract_blocking(archive: &Path, destination: &Path) -> Result<PathBuf, InstallError> {
    std::fs::create_dir_all(destination)?;
    match sniff_format(archive)? {
        ArchiveFormat::Zip => extract_zip(archive, destination),
        ArchiveFormat::TarGz => extract_tar_gz(archive, destination),
        ArchiveFormat::Unknown => Err(InstallError::Extraction(
            "unsupported archive format".into(),
        )),
    }
}

fn extract_zip(archive: &Path, destination: &Path) -> Result<PathBuf, InstallError> {
    let file = File::open(archive)?;
    let mut zip = zip::ZipArchive::new(file)
        .map_err(|e| InstallError::Extraction(format!("zip open: {e}")))?;
    for i in 0..zip.len() {
        let mut entry = zip
            .by_index(i)
            .map_err(|e| InstallError::Extraction(format!("zip entry {i}: {e}")))?;
        let out_rel = entry
            .enclosed_name()
            .ok_or_else(|| InstallError::Extraction("zip entry has invalid name".into()))?
            .to_path_buf();
        let out_path = destination.join(out_rel);
        if entry.is_dir() {
            std::fs::create_dir_all(&out_path)?;
        } else {
            if let Some(parent) = out_path.parent() {
                std::fs::create_dir_all(parent)?;
            }
            let mut out_file = File::create(&out_path)?;
            std::io::copy(&mut entry, &mut out_file)?;
        }
    }
    Ok(destination.to_path_buf())
}

fn extract_tar_gz(archive: &Path, destination: &Path) -> Result<PathBuf, InstallError> {
    let file = File::open(archive)?;
    let reader = BufReader::new(file);
    let decoder = flate2::read::GzDecoder::new(reader);
    let mut tar = tar::Archive::new(decoder);
    tar.unpack(destination)
        .map_err(|e| InstallError::Extraction(format!("tar unpack: {e}")))?;
    Ok(destination.to_path_buf())
}
