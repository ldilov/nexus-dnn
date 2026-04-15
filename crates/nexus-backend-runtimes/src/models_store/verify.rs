use chrono::Utc;
use sha2::{Digest, Sha256};
use sqlx::{Row, SqlitePool};
use tokio::io::AsyncReadExt;

use super::blobs::FileManifestEntry;
use super::errors::{ModelStoreError, ModelStoreResult};

async fn hash_file(path: &std::path::Path) -> ModelStoreResult<String> {
    let mut f = tokio::fs::File::open(path).await?;
    let mut hasher = Sha256::new();
    let mut buf = vec![0u8; 64 * 1024];
    loop {
        let n = f.read(&mut buf).await?;
        if n == 0 {
            break;
        }
        hasher.update(&buf[..n]);
    }
    Ok(hasher
        .finalize()
        .iter()
        .map(|b| format!("{b:02x}"))
        .collect())
}

pub async fn verify_install(pool: &SqlitePool, install_id: &str) -> ModelStoreResult<()> {
    let row = sqlx::query(
        "SELECT install_root, files_manifest FROM host_model_installs WHERE install_id = $1",
    )
    .bind(install_id)
    .fetch_optional(pool)
    .await?
    .ok_or_else(|| ModelStoreError::InstallNotFound(install_id.to_string()))?;

    let install_root: String = row.try_get("install_root")?;
    let manifest_raw: String = row.try_get("files_manifest")?;
    let entries: Vec<FileManifestEntry> = serde_json::from_str(&manifest_raw)
        .map_err(|e| ModelStoreError::ManifestInvalid(e.to_string()))?;

    let root = std::path::Path::new(&install_root);
    for entry in &entries {
        let full = root.join(&entry.path);
        let actual = hash_file(&full).await?;
        if !actual.eq_ignore_ascii_case(&entry.sha256) {
            sqlx::query(
                "UPDATE host_model_installs SET state = 'corrupt', updated_at = $1 \
                 WHERE install_id = $2",
            )
            .bind(Utc::now().to_rfc3339())
            .bind(install_id)
            .execute(pool)
            .await?;
            return Err(ModelStoreError::ChecksumMismatch {
                file: full,
                expected: entry.sha256.clone(),
                actual,
            });
        }
    }
    Ok(())
}
