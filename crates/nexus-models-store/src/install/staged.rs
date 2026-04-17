use std::path::{Path, PathBuf};

use chrono::Utc;
use sqlx::SqlitePool;

use crate::blobs::{self, FileManifestEntry};
use crate::errors::{ModelStoreError, ModelStoreResult};

use super::dedup::find_existing;
use super::dto::{IdentityKey, InstalledModelDto};

#[derive(Debug, Clone)]
pub struct StagedFile {
    pub path: String,
    pub sha256: String,
    pub size_bytes: u64,
    pub staging_path: PathBuf,
}

#[derive(Debug, Clone)]
pub struct StagedInstallRequest {
    pub family: String,
    pub version: String,
    pub quantization: Option<String>,
    pub variant: String,
    pub sha256_root: String,
    pub source_revision: String,
    pub source_kind: String,
    pub source_url: Option<String>,
    pub license_spdx: Option<String>,
    pub private: bool,
    pub owner_extension_id: Option<String>,
    pub files: Vec<StagedFile>,
}

#[derive(Debug, Clone)]
pub struct StagedInstallOutcome {
    pub install: InstalledModelDto,
    pub already_installed: bool,
}

/// Spec 020 T211 — host-scope install from a pre-downloaded staging dir.
///
/// Dedup via [`find_existing`]; if the requesting context is not the owner
/// of a private-flagged match, returns [`ModelStoreError::ManifestInvalid`]
/// with a "private" marker in the message so the handler can map it to
/// `403 model_private` without a dedicated variant. Otherwise materializes
/// the staged files into `installs_root / install_id / …` via the
/// content-addressed blob store and INSERTs the install row as `ready`.
pub async fn install_from_staging(
    pool: &SqlitePool,
    installs_root: &Path,
    blobs_root: &Path,
    req: StagedInstallRequest,
) -> ModelStoreResult<StagedInstallOutcome> {
    let key = IdentityKey {
        family: req.family.clone(),
        version: req.version.clone(),
        quantization: req.quantization.clone(),
        variant: req.variant.clone(),
        sha256_root: req.sha256_root.clone(),
        private_model: req.private,
        owner_extension_id: req.owner_extension_id.clone(),
    };

    if let Some(existing) = find_existing(pool, &key).await? {
        if existing.private_model
            && existing.owner_extension_id != req.owner_extension_id
        {
            return Err(ModelStoreError::ManifestInvalid(
                "model_private: this model is owned by another extension".into(),
            ));
        }
        return Ok(StagedInstallOutcome {
            install: existing,
            already_installed: true,
        });
    }

    for f in &req.files {
        guard_relative_path(&f.path)?;
    }

    let install_id = format!("hmi_{}", ulid::Ulid::new());
    let install_root = installs_root.join(&install_id);
    tokio::fs::create_dir_all(&install_root).await?;

    let manifest_entries: Vec<FileManifestEntry> = req
        .files
        .iter()
        .map(|f| FileManifestEntry {
            path: f.path.clone(),
            sha256: f.sha256.clone(),
            size_bytes: f.size_bytes,
        })
        .collect();
    let manifest_json = serde_json::to_string(&manifest_entries)
        .map_err(|e| ModelStoreError::ManifestInvalid(e.to_string()))?;

    for f in &req.files {
        let target = install_root.join(&f.path);
        if let Some(parent) = target.parent() {
            tokio::fs::create_dir_all(parent).await?;
        }
        blobs::materialize_blob(&f.sha256, &f.staging_path, &target, blobs_root).await?;
    }

    let now = Utc::now().to_rfc3339();
    let install_root_str = install_root.to_string_lossy().into_owned();

    sqlx::query(
        "INSERT INTO host_model_installs (install_id, family, version, quantization, variant, \
             install_root, files_manifest, sha256_root, source_revision, state, source_kind, \
             source_url, license_spdx, license_url, provenance_note, private_model, \
             owner_extension_id, param_count, created_at, updated_at) \
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'ready',$10,$11,$12,NULL,NULL,$13,$14,NULL,$15,$15)",
    )
    .bind(&install_id)
    .bind(&req.family)
    .bind(&req.version)
    .bind(req.quantization.as_ref())
    .bind(&req.variant)
    .bind(&install_root_str)
    .bind(&manifest_json)
    .bind(&req.sha256_root)
    .bind(&req.source_revision)
    .bind(&req.source_kind)
    .bind(req.source_url.as_ref())
    .bind(req.license_spdx.as_ref())
    .bind(req.private as i64)
    .bind(req.owner_extension_id.as_ref())
    .bind(&now)
    .execute(pool)
    .await?;

    Ok(StagedInstallOutcome {
        install: InstalledModelDto {
            install_id,
            family: req.family,
            version: req.version,
            quantization: req.quantization,
            variant: req.variant,
            install_root: install_root_str,
            sha256_root: req.sha256_root,
            source_revision: req.source_revision,
            state: "ready".into(),
            private_model: req.private,
            owner_extension_id: req.owner_extension_id,
        },
        already_installed: false,
    })
}

fn guard_relative_path(untrusted: &str) -> ModelStoreResult<()> {
    if untrusted.is_empty() {
        return Err(ModelStoreError::ManifestInvalid("file path is empty".into()));
    }
    if untrusted.contains('\0') {
        return Err(ModelStoreError::ManifestInvalid(
            "file path contains null byte".into(),
        ));
    }
    let p = std::path::Path::new(untrusted);
    if p.is_absolute() {
        return Err(ModelStoreError::ManifestInvalid(format!(
            "file path escapes install root: {untrusted}"
        )));
    }
    for c in p.components() {
        use std::path::Component;
        if matches!(
            c,
            Component::ParentDir | Component::RootDir | Component::Prefix(_)
        ) {
            return Err(ModelStoreError::ManifestInvalid(format!(
                "file path escapes install root: {untrusted}"
            )));
        }
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn guard_rejects_parent_traversal() {
        assert!(guard_relative_path("../x").is_err());
    }
    #[test]
    fn guard_rejects_absolute() {
        assert!(guard_relative_path("/etc/passwd").is_err());
    }
    #[test]
    fn guard_rejects_embedded_parent() {
        assert!(guard_relative_path("a/../../b").is_err());
    }
    #[test]
    fn guard_rejects_null_byte() {
        assert!(guard_relative_path("a\0b").is_err());
    }
    #[test]
    fn guard_accepts_nested() {
        assert!(guard_relative_path("a/b/c.gguf").is_ok());
    }
}
