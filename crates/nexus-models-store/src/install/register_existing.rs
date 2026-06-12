use std::path::{Path, PathBuf};

use chrono::Utc;
use sha2::{Digest, Sha256};
use sqlx::SqlitePool;
use tokio::io::AsyncReadExt;

use crate::blobs::{self, FileManifestEntry};
use crate::errors::{ModelStoreError, ModelStoreResult};

use super::dedup::find_existing;
use super::dto::{IdentityKey, InstalledModelDto};
use super::staged::{StagedInstallOutcome, guard_relative_path};

/// Canonical content-tree digest shared by every install path.
///
/// This is the single source of truth for `host_model_installs.sha256_root`.
/// Files are ordered by their byte-lexicographic relative path, then each
/// contributes `path \0 per_file_sha256_hex \n` to a SHA-256 stream whose
/// lowercase hex digest is the root. Any install path that wants its row to
/// dedup against another (e.g. an extension's own download converging with a
/// Foundry install of the same repo) MUST feed identical relative paths and
/// lowercase-hex per-file digests.
pub fn compute_sha256_root(files: &[FileManifestEntry]) -> String {
    let mut sorted: Vec<&FileManifestEntry> = files.iter().collect();
    sorted.sort_by(|a, b| a.path.cmp(&b.path));
    let mut hasher = Sha256::new();
    for f in &sorted {
        hasher.update(f.path.as_bytes());
        hasher.update(b"\0");
        hasher.update(f.sha256.as_bytes());
        hasher.update(b"\n");
    }
    format!("{:x}", hasher.finalize())
}

const HASH_CHUNK: usize = 1024 * 1024;

async fn sha256_file(path: &Path) -> ModelStoreResult<(String, u64)> {
    let mut file = tokio::fs::File::open(path).await?;
    let mut hasher = Sha256::new();
    let mut buf = vec![0u8; HASH_CHUNK];
    let mut total: u64 = 0;
    loop {
        let n = file.read(&mut buf).await?;
        if n == 0 {
            break;
        }
        hasher.update(&buf[..n]);
        total += n as u64;
    }
    let hex = hasher
        .finalize()
        .iter()
        .map(|b| format!("{b:02x}"))
        .collect();
    Ok((hex, total))
}

/// Register a model whose bytes are already on disk in a tree the host does
/// not own (caller-supplied identity + `existing_root`/`files`).
#[derive(Debug, Clone)]
pub struct RegisterExistingRequest {
    pub family: String,
    pub version: String,
    pub quantization: Option<String>,
    pub variant: String,
    pub source_revision: String,
    /// One of `huggingface` | `direct_url` | `local_import` | `bundled`
    /// (DB-enforced). Adopted-from-disk registrations use `local_import`.
    pub source_kind: String,
    pub source_url: Option<String>,
    pub license_spdx: Option<String>,
    pub private: bool,
    pub owner_extension_id: Option<String>,
    /// Directory already on disk (extension-owned; never moved or removed).
    pub existing_root: PathBuf,
    /// Paths relative to `existing_root`.
    pub files: Vec<String>,
}

/// Generic host capability: adopt an already-downloaded model tree into the
/// host model store as a `ready` install, without re-downloading.
///
/// The bytes are linked into the content-addressed blob store and a fresh
/// `installs_root/<install_id>` is materialized; `existing_root` is left
/// untouched so the caller's own state stays valid. Idempotent on the
/// install [`IdentityKey`]: a second call for the same identity returns the
/// existing row with `already_installed = true`, which is how an extension's
/// own download converges with a later Foundry install of the same repo.
pub async fn register_existing(
    pool: &SqlitePool,
    installs_root: &Path,
    blobs_root: &Path,
    req: RegisterExistingRequest,
) -> ModelStoreResult<StagedInstallOutcome> {
    if req.files.is_empty() {
        return Err(ModelStoreError::ManifestInvalid(
            "register_existing requires at least one file".into(),
        ));
    }
    for f in &req.files {
        guard_relative_path(f)?;
    }

    let mut entries: Vec<FileManifestEntry> = Vec::with_capacity(req.files.len());
    for rel in &req.files {
        let source = req.existing_root.join(rel);
        let (sha256, size_bytes) = sha256_file(&source).await?;
        entries.push(FileManifestEntry {
            path: rel.clone(),
            sha256,
            size_bytes,
        });
    }

    let sha256_root = compute_sha256_root(&entries);

    let key = IdentityKey {
        family: req.family.clone(),
        version: req.version.clone(),
        quantization: req.quantization.clone(),
        variant: req.variant.clone(),
        sha256_root: sha256_root.clone(),
        private_model: req.private,
        owner_extension_id: req.owner_extension_id.clone(),
    };

    if let Some(existing) = find_existing(pool, &key).await? {
        if existing.private_model && existing.owner_extension_id != req.owner_extension_id {
            return Err(ModelStoreError::ManifestInvalid(
                "model_private: this model is owned by another extension".into(),
            ));
        }
        return Ok(StagedInstallOutcome {
            install: existing,
            already_installed: true,
        });
    }

    let install_id = format!("hmi_{}", ulid::Ulid::new());
    let install_root = installs_root.join(&install_id);
    tokio::fs::create_dir_all(&install_root).await?;

    let manifest_json = serde_json::to_string(&entries)
        .map_err(|e| ModelStoreError::ManifestInvalid(e.to_string()))?;

    for e in &entries {
        let source = req.existing_root.join(&e.path);
        let target = install_root.join(&e.path);
        blobs::link_existing_into_cas(&e.sha256, &source, &target, blobs_root).await?;
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
    .bind(&sha256_root)
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
            sha256_root,
            source_revision: req.source_revision,
            state: "ready".into(),
            private_model: req.private,
            owner_extension_id: req.owner_extension_id,
        },
        already_installed: false,
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use sqlx::Row;
    use sqlx::sqlite::SqlitePoolOptions;
    use tempfile::TempDir;

    fn legacy_compute_root_sha(files: &[(String, String)]) -> String {
        let mut sorted: Vec<&(String, String)> = files.iter().collect();
        sorted.sort_by(|a, b| a.0.cmp(&b.0));
        let mut hasher = Sha256::new();
        for (path, file_sha) in &sorted {
            hasher.update(path.as_bytes());
            hasher.update(b"\0");
            hasher.update(file_sha.as_bytes());
            hasher.update(b"\n");
        }
        format!("{:x}", hasher.finalize())
    }

    fn entry(path: &str, sha: &str) -> FileManifestEntry {
        FileManifestEntry {
            path: path.into(),
            sha256: sha.into(),
            size_bytes: 0,
        }
    }

    #[test]
    fn canonical_root_matches_legacy_foundry_algorithm() {
        // Deliberately unsorted input to prove ordering is normalized.
        let entries = vec![
            entry("b.txt", "beef"),
            entry("a/x.bin", "cafe"),
            entry("a/aa.bin", "f00d"),
        ];
        let pairs: Vec<(String, String)> = entries
            .iter()
            .map(|e| (e.path.clone(), e.sha256.clone()))
            .collect();
        assert_eq!(
            compute_sha256_root(&entries),
            legacy_compute_root_sha(&pairs),
            "canonical root must byte-match the historical Foundry algorithm"
        );
    }

    async fn make_pool() -> SqlitePool {
        let pool = SqlitePoolOptions::new()
            .max_connections(4)
            .connect("sqlite::memory:")
            .await
            .unwrap();
        for stmt in include_str!("../../../../migrations/009_host_model_store.sql").split(';') {
            let t = stmt.trim();
            if !t.is_empty() {
                sqlx::query(t).execute(&pool).await.unwrap();
            }
        }
        for stmt in
            include_str!("../../../../migrations/010_host_model_store_provenance.sql").split(';')
        {
            let t = stmt.trim();
            if !t.is_empty() {
                sqlx::query(t).execute(&pool).await.unwrap();
            }
        }
        pool
    }

    async fn write(dir: &Path, rel: &str, bytes: &[u8]) {
        let p = dir.join(rel);
        tokio::fs::create_dir_all(p.parent().unwrap())
            .await
            .unwrap();
        tokio::fs::write(&p, bytes).await.unwrap();
    }

    fn sample_req(existing_root: PathBuf) -> RegisterExistingRequest {
        RegisterExistingRequest {
            family: "fam-x".into(),
            version: "abc123revision".into(),
            quantization: Some("Q5_K_M".into()),
            variant: "default".into(),
            source_revision: "abc123revision".into(),
            source_kind: "local_import".into(),
            source_url: Some("https://example.test/org/repo".into()),
            license_spdx: None,
            private: false,
            owner_extension_id: None,
            existing_root,
            files: vec!["model.gguf".into(), "sub/vae.safetensors".into()],
        }
    }

    #[tokio::test]
    async fn register_existing_creates_ready_row_and_preserves_source() {
        let pool = make_pool().await;
        let tmp = TempDir::new().unwrap();
        let existing = tmp.path().join("models/org/repo");
        write(&existing, "model.gguf", b"transformer weights").await;
        write(&existing, "sub/vae.safetensors", b"vae weights").await;

        let installs = tmp.path().join("installs");
        let blobs = tmp.path().join("blobs");

        let outcome = register_existing(&pool, &installs, &blobs, sample_req(existing.clone()))
            .await
            .expect("register ok");

        assert!(!outcome.already_installed);
        assert_eq!(outcome.install.state, "ready");

        // Source tree the host does not own MUST survive untouched.
        assert!(existing.join("model.gguf").is_file(), "source preserved");
        assert!(
            existing.join("sub/vae.safetensors").is_file(),
            "nested source preserved"
        );

        // Materialized install root reads back identical bytes.
        let root = PathBuf::from(&outcome.install.install_root);
        assert_eq!(
            tokio::fs::read(root.join("model.gguf")).await.unwrap(),
            b"transformer weights"
        );
        assert_eq!(
            tokio::fs::read(root.join("sub/vae.safetensors"))
                .await
                .unwrap(),
            b"vae weights"
        );

        let n: i64 = sqlx::query("SELECT COUNT(*) AS n FROM host_model_installs")
            .fetch_one(&pool)
            .await
            .unwrap()
            .try_get("n")
            .unwrap();
        assert_eq!(n, 1);

        let expected_root = compute_sha256_root(&[
            FileManifestEntry {
                path: "model.gguf".into(),
                sha256: {
                    let mut h = Sha256::new();
                    h.update(b"transformer weights");
                    h.finalize().iter().map(|b| format!("{b:02x}")).collect()
                },
                size_bytes: 0,
            },
            FileManifestEntry {
                path: "sub/vae.safetensors".into(),
                sha256: {
                    let mut h = Sha256::new();
                    h.update(b"vae weights");
                    h.finalize().iter().map(|b| format!("{b:02x}")).collect()
                },
                size_bytes: 0,
            },
        ]);
        assert_eq!(outcome.install.sha256_root, expected_root);
    }

    #[tokio::test]
    async fn register_existing_is_idempotent_on_identity_key() {
        let pool = make_pool().await;
        let tmp = TempDir::new().unwrap();
        let existing = tmp.path().join("m");
        write(&existing, "model.gguf", b"w").await;
        write(&existing, "sub/vae.safetensors", b"v").await;
        let installs = tmp.path().join("installs");
        let blobs = tmp.path().join("blobs");

        let a = register_existing(&pool, &installs, &blobs, sample_req(existing.clone()))
            .await
            .unwrap();
        let b = register_existing(&pool, &installs, &blobs, sample_req(existing.clone()))
            .await
            .unwrap();

        assert!(!a.already_installed);
        assert!(b.already_installed, "second call dedups on IdentityKey");
        assert_eq!(a.install.install_id, b.install.install_id);

        let n: i64 = sqlx::query("SELECT COUNT(*) AS n FROM host_model_installs")
            .fetch_one(&pool)
            .await
            .unwrap()
            .try_get("n")
            .unwrap();
        assert_eq!(n, 1, "idempotent — exactly one row");
    }

    #[tokio::test]
    async fn register_existing_rejects_path_traversal() {
        let pool = make_pool().await;
        let tmp = TempDir::new().unwrap();
        let installs = tmp.path().join("installs");
        let blobs = tmp.path().join("blobs");
        let mut req = sample_req(tmp.path().join("m"));
        req.files = vec!["../escape.gguf".into()];

        let err = register_existing(&pool, &installs, &blobs, req)
            .await
            .unwrap_err();
        assert!(matches!(err, ModelStoreError::ManifestInvalid(_)));
    }
}
