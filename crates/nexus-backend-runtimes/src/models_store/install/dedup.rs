use std::collections::HashMap;
use std::sync::Arc;

use sqlx::{Row, SqlitePool};
use tokio::sync::Mutex;

use super::dto::{HostModelRow, IdentityKey, InstalledModelDto};
use crate::models_store::errors::ModelStoreResult;

pub(super) type InflightMap = Arc<Mutex<HashMap<IdentityKey, Arc<Mutex<()>>>>>;

pub(super) async fn acquire_key_lock(map: &InflightMap, key: &IdentityKey) -> Arc<Mutex<()>> {
    let mut guard = map.lock().await;
    guard
        .entry(key.clone())
        .or_insert_with(|| Arc::new(Mutex::new(())))
        .clone()
}

pub(super) async fn release_key_lock(map: &InflightMap, key: &IdentityKey) {
    let mut guard = map.lock().await;
    if let Some(lock) = guard.get(key)
        && Arc::strong_count(lock) == 1
    {
        guard.remove(key);
    }
}

pub(super) async fn find_existing(
    pool: &SqlitePool,
    key: &IdentityKey,
) -> ModelStoreResult<Option<InstalledModelDto>> {
    let row = sqlx::query(
        "SELECT install_id, family, version, quantization, variant, install_root, \
                sha256_root, source_revision, state, private_model, owner_extension_id \
         FROM host_model_installs \
         WHERE family = $1 AND version = $2 AND COALESCE(quantization,'') = COALESCE($3,'') \
           AND variant = $4 AND sha256_root = $5 AND private_model = $6 \
           AND COALESCE(owner_extension_id,'') = COALESCE($7,'')",
    )
    .bind(&key.family)
    .bind(&key.version)
    .bind(&key.quantization)
    .bind(&key.variant)
    .bind(&key.sha256_root)
    .bind(key.private_model as i64)
    .bind(&key.owner_extension_id)
    .fetch_optional(pool)
    .await?;

    Ok(row.map(|r| InstalledModelDto {
        install_id: r.try_get("install_id").unwrap_or_default(),
        family: r.try_get("family").unwrap_or_default(),
        version: r.try_get("version").unwrap_or_default(),
        quantization: r.try_get("quantization").ok(),
        variant: r.try_get("variant").unwrap_or_default(),
        install_root: r.try_get("install_root").unwrap_or_default(),
        sha256_root: r.try_get("sha256_root").unwrap_or_default(),
        source_revision: r.try_get("source_revision").unwrap_or_default(),
        state: r.try_get("state").unwrap_or_default(),
        private_model: r
            .try_get::<i64, _>("private_model")
            .map(|v| v != 0)
            .unwrap_or(false),
        owner_extension_id: r.try_get("owner_extension_id").ok(),
    }))
}

pub async fn list_all_visible(
    pool: &SqlitePool,
    caller_extension_id: Option<&str>,
) -> ModelStoreResult<Vec<HostModelRow>> {
    let rows = sqlx::query(
        "SELECT install_id, family, version, quantization, variant, install_root, sha256_root, \
                source_revision, state, source_kind, source_url, license_spdx, license_url, \
                private_model, owner_extension_id, created_at \
         FROM host_model_installs \
         WHERE private_model = 0 OR owner_extension_id = $1 \
         ORDER BY datetime(created_at) DESC",
    )
    .bind(caller_extension_id.unwrap_or(""))
    .fetch_all(pool)
    .await?;

    let mut out = Vec::with_capacity(rows.len());
    for r in rows {
        out.push(HostModelRow {
            install_id: r.try_get("install_id")?,
            family: r.try_get("family")?,
            version: r.try_get("version")?,
            quantization: r.try_get("quantization").ok(),
            variant: r.try_get("variant")?,
            install_root: r.try_get("install_root")?,
            sha256_root: r.try_get("sha256_root")?,
            source_revision: r.try_get("source_revision")?,
            state: r.try_get("state")?,
            source_kind: r.try_get("source_kind")?,
            source_url: r.try_get("source_url").ok(),
            license_spdx: r.try_get("license_spdx").ok(),
            license_url: r.try_get("license_url").ok(),
            private_model: r.try_get::<i64, _>("private_model")? != 0,
            owner_extension_id: r.try_get("owner_extension_id").ok(),
            created_at: r.try_get("created_at")?,
        });
    }
    Ok(out)
}
