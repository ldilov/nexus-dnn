use std::collections::HashSet;
use std::path::{Path, PathBuf};

use serde::{Deserialize, Serialize};
use sqlx::{Row, SqlitePool};
use tokio::fs;

use super::errors::{ModelStoreError, ModelStoreResult};

/// Entry in a `files.json` manifest persisted on disk and mirrored into
/// `host_model_installs.files_manifest`.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct FileManifestEntry {
    /// Path relative to the install root.
    pub path: String,
    pub sha256: String,
    pub size_bytes: u64,
}

#[derive(Debug, Default, Clone)]
pub struct GcReport {
    pub removed_blobs: Vec<PathBuf>,
    pub retained_blobs: usize,
}

fn cas_path(blobs_root: &Path, sha: &str) -> PathBuf {
    let prefix = &sha[..sha.len().min(2)];
    blobs_root.join(prefix).join(sha)
}

/// Move `source_path` into the CAS if absent; then create a hardlink at
/// `target_path`. Falls back to symlink (warn-log) if hardlink fails.
///
/// On success, `source_path` no longer exists as a distinct inode — it is
/// either moved into the CAS (new content) or removed (already-present
/// content, dedup path).
pub async fn materialize_blob(
    content_sha256: &str,
    source_path: &Path,
    target_path: &Path,
    blobs_root: &Path,
) -> ModelStoreResult<()> {
    let cas = cas_path(blobs_root, content_sha256);
    if let Some(parent) = cas.parent() {
        fs::create_dir_all(parent).await?;
    }

    if fs::metadata(&cas).await.is_err() {
        // First write for this hash — move source into CAS.
        match fs::rename(source_path, &cas).await {
            Ok(()) => {}
            Err(_) => {
                // Cross-device rename (EXDEV) or similar — copy + remove.
                fs::copy(source_path, &cas).await?;
                fs::remove_file(source_path).await?;
            }
        }
    } else {
        // Already materialized — discard the duplicate bytes.
        let _ = fs::remove_file(source_path).await;
    }

    if let Some(parent) = target_path.parent() {
        fs::create_dir_all(parent).await?;
    }
    if fs::metadata(target_path).await.is_ok() {
        fs::remove_file(target_path).await?;
    }

    match fs::hard_link(&cas, target_path).await {
        Ok(()) => Ok(()),
        Err(e) => {
            tracing::warn!(
                error = %e,
                cas = %cas.display(),
                target = %target_path.display(),
                "hardlink failed; falling back to symlink",
            );
            #[cfg(unix)]
            {
                tokio::fs::symlink(&cas, target_path).await?;
            }
            #[cfg(windows)]
            {
                tokio::task::spawn_blocking({
                    let cas = cas.clone();
                    let target = target_path.to_path_buf();
                    move || std::os::windows::fs::symlink_file(&cas, &target)
                })
                .await
                .map_err(|e| ModelStoreError::Storage(e.to_string()))??;
            }
            Ok(())
        }
    }
}

/// Scan `blobs_root` and remove files whose SHA is not referenced by any
/// non-`reclaimed` install's `files_manifest`.
pub async fn gc_blobs(pool: &SqlitePool, blobs_root: &Path) -> ModelStoreResult<GcReport> {
    let rows =
        sqlx::query("SELECT files_manifest FROM host_model_installs WHERE state != 'reclaimed'")
            .fetch_all(pool)
            .await?;

    let mut referenced: HashSet<String> = HashSet::new();
    for row in rows {
        let raw: String = row.try_get("files_manifest")?;
        if raw.is_empty() {
            continue;
        }
        let entries: Vec<FileManifestEntry> = serde_json::from_str(&raw)
            .map_err(|e| ModelStoreError::ManifestInvalid(e.to_string()))?;
        for e in entries {
            referenced.insert(e.sha256);
        }
    }

    let mut report = GcReport::default();
    let mut dirs = match fs::read_dir(blobs_root).await {
        Ok(d) => d,
        Err(e) if e.kind() == std::io::ErrorKind::NotFound => return Ok(report),
        Err(e) => return Err(e.into()),
    };
    while let Some(prefix_entry) = dirs.next_entry().await? {
        if !prefix_entry.file_type().await?.is_dir() {
            continue;
        }
        let mut files = fs::read_dir(prefix_entry.path()).await?;
        while let Some(f) = files.next_entry().await? {
            let path = f.path();
            let sha = match path.file_name().and_then(|s| s.to_str()) {
                Some(s) => s.to_string(),
                None => continue,
            };
            if referenced.contains(&sha) {
                report.retained_blobs += 1;
            } else {
                fs::remove_file(&path).await?;
                report.removed_blobs.push(path);
            }
        }
    }
    Ok(report)
}

#[cfg(test)]
mod tests {
    use super::*;
    use tempfile::TempDir;

    async fn write_file(dir: &Path, name: &str, content: &[u8]) -> PathBuf {
        let p = dir.join(name);
        fs::write(&p, content).await.unwrap();
        p
    }

    fn sha(bytes: &[u8]) -> String {
        use sha2::{Digest, Sha256};
        let mut h = Sha256::new();
        h.update(bytes);
        let out = h.finalize();
        out.iter().map(|b| format!("{b:02x}")).collect()
    }

    #[tokio::test]
    async fn two_installs_share_one_blob_via_hardlink() {
        let tmp = TempDir::new().unwrap();
        let blobs = tmp.path().join("blobs");
        let install_a = tmp.path().join("installs/a/tokenizer.json");
        let install_b = tmp.path().join("installs/b/tokenizer.json");
        fs::create_dir_all(install_a.parent().unwrap())
            .await
            .unwrap();
        fs::create_dir_all(install_b.parent().unwrap())
            .await
            .unwrap();

        let bytes = b"{\"vocab\":{}}" as &[u8];
        let src_a = write_file(tmp.path(), "src_a.bin", bytes).await;
        let src_b = write_file(tmp.path(), "src_b.bin", bytes).await;
        let digest = sha(bytes);

        materialize_blob(&digest, &src_a, &install_a, &blobs)
            .await
            .unwrap();
        materialize_blob(&digest, &src_b, &install_b, &blobs)
            .await
            .unwrap();

        let cas = cas_path(&blobs, &digest);
        assert!(cas.exists(), "CAS file exists");

        // Both install paths exist and read back identical bytes.
        assert_eq!(fs::read(&install_a).await.unwrap(), bytes);
        assert_eq!(fs::read(&install_b).await.unwrap(), bytes);

        // Exactly one file under the CAS prefix.
        let prefix = cas.parent().unwrap();
        let mut rd = fs::read_dir(prefix).await.unwrap();
        let mut n = 0;
        while rd.next_entry().await.unwrap().is_some() {
            n += 1;
        }
        assert_eq!(n, 1, "exactly one blob for identical content");
    }

    #[tokio::test]
    async fn gc_removes_unreferenced_and_keeps_referenced() {
        use sqlx::sqlite::SqlitePoolOptions;
        let pool = SqlitePoolOptions::new()
            .max_connections(1)
            .connect("sqlite::memory:")
            .await
            .unwrap();
        for stmt in include_str!("../../../../migrations/009_host_model_store.sql").split(';') {
            let t = stmt.trim();
            if !t.is_empty() {
                sqlx::query(t).execute(&pool).await.unwrap();
            }
        }

        let tmp = TempDir::new().unwrap();
        let blobs = tmp.path().join("blobs");
        fs::create_dir_all(&blobs).await.unwrap();

        let kept_sha = sha(b"kept");
        let gone_sha = sha(b"gone");
        let kept_cas = cas_path(&blobs, &kept_sha);
        let gone_cas = cas_path(&blobs, &gone_sha);
        fs::create_dir_all(kept_cas.parent().unwrap())
            .await
            .unwrap();
        fs::create_dir_all(gone_cas.parent().unwrap())
            .await
            .unwrap();
        fs::write(&kept_cas, b"kept").await.unwrap();
        fs::write(&gone_cas, b"gone").await.unwrap();

        let manifest = serde_json::to_string(&vec![FileManifestEntry {
            path: "file.bin".into(),
            sha256: kept_sha.clone(),
            size_bytes: 4,
        }])
        .unwrap();
        sqlx::query(
            "INSERT INTO host_model_installs (install_id, family, version, variant, \
             install_root, files_manifest, sha256_root, source_revision, state, source_kind, \
             created_at, updated_at) VALUES ('a','f','v','default','/tmp',$1,$2,$2,'ready',\
             'direct_url','2026-04-15T00:00:00Z','2026-04-15T00:00:00Z')",
        )
        .bind(&manifest)
        .bind(&kept_sha)
        .execute(&pool)
        .await
        .unwrap();

        let report = gc_blobs(&pool, &blobs).await.unwrap();
        assert!(kept_cas.exists());
        assert!(!gone_cas.exists());
        assert_eq!(report.retained_blobs, 1);
        assert_eq!(report.removed_blobs.len(), 1);
    }
}
