use chrono::Utc;
use sqlx::{Row, SqlitePool};

use super::errors::{ModelStoreError, ModelStoreResult};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ModelLease {
    pub lease_id: String,
    pub install_id: String,
    pub extension_id: String,
    pub device: String,
    pub vram_reserved_bytes: u64,
    pub acquired_at: String,
    pub released_at: Option<String>,
}

pub async fn acquire_lease(
    pool: &SqlitePool,
    install_id: &str,
    extension_id: &str,
    device: &str,
    vram_reserved_bytes: u64,
    device_budget_bytes: u64,
) -> ModelStoreResult<ModelLease> {
    let reserved: i64 = sqlx::query(
        "SELECT COALESCE(SUM(vram_reserved_bytes), 0) AS total \
         FROM host_model_leases \
         WHERE device = $1 AND released_at IS NULL",
    )
    .bind(device)
    .fetch_one(pool)
    .await?
    .try_get("total")?;
    let reserved = reserved.max(0) as u64;

    let available = device_budget_bytes.saturating_sub(reserved);
    if vram_reserved_bytes > available {
        return Err(ModelStoreError::InsufficientResources {
            device: device.to_string(),
            requested: vram_reserved_bytes,
            available,
        });
    }

    let lease_id = format!("ml-{}", ulid::Ulid::new());
    let now = Utc::now().to_rfc3339();
    sqlx::query(
        "INSERT INTO host_model_leases (lease_id, install_id, extension_id, device, \
         vram_reserved_bytes, acquired_at) VALUES ($1, $2, $3, $4, $5, $6)",
    )
    .bind(&lease_id)
    .bind(install_id)
    .bind(extension_id)
    .bind(device)
    .bind(vram_reserved_bytes as i64)
    .bind(&now)
    .execute(pool)
    .await?;

    Ok(ModelLease {
        lease_id,
        install_id: install_id.to_string(),
        extension_id: extension_id.to_string(),
        device: device.to_string(),
        vram_reserved_bytes,
        acquired_at: now,
        released_at: None,
    })
}

pub async fn release_lease(pool: &SqlitePool, lease_id: &str) -> ModelStoreResult<()> {
    sqlx::query(
        "UPDATE host_model_leases SET released_at = $1 \
         WHERE lease_id = $2 AND released_at IS NULL",
    )
    .bind(Utc::now().to_rfc3339())
    .bind(lease_id)
    .execute(pool)
    .await?;
    Ok(())
}

/// Spec 020 FR-Q3-06 prerequisite — returns `true` iff a row exists in
/// `host_model_installs` for the given install_id. Used by the dependents
/// endpoint to produce `404 not_found` for unknown install ids.
pub async fn install_exists(pool: &SqlitePool, install_id: &str) -> ModelStoreResult<bool> {
    let row = sqlx::query("SELECT 1 FROM host_model_installs WHERE install_id = $1")
        .bind(install_id)
        .fetch_optional(pool)
        .await?;
    Ok(row.is_some())
}

/// Spec 020 FR-Q3-06 — distinct extensions currently leasing the given
/// host-model install (`released_at IS NULL`). Returned order is stable
/// on extension_id for deterministic UI rendering.
pub async fn list_active_dependents(
    pool: &SqlitePool,
    install_id: &str,
) -> ModelStoreResult<Vec<String>> {
    let rows = sqlx::query(
        "SELECT DISTINCT extension_id FROM host_model_leases \
         WHERE install_id = $1 AND released_at IS NULL \
         ORDER BY extension_id ASC",
    )
    .bind(install_id)
    .fetch_all(pool)
    .await?;
    let mut out = Vec::with_capacity(rows.len());
    for row in rows {
        out.push(row.try_get::<String, _>("extension_id")?);
    }
    Ok(out)
}

pub async fn list_active_leases(
    pool: &SqlitePool,
    device: &str,
) -> ModelStoreResult<Vec<ModelLease>> {
    let rows = sqlx::query(
        "SELECT lease_id, install_id, extension_id, device, vram_reserved_bytes, \
         acquired_at, released_at FROM host_model_leases \
         WHERE device = $1 AND released_at IS NULL \
         ORDER BY acquired_at",
    )
    .bind(device)
    .fetch_all(pool)
    .await?;

    let mut out = Vec::with_capacity(rows.len());
    for row in rows {
        let vram: i64 = row.try_get("vram_reserved_bytes")?;
        out.push(ModelLease {
            lease_id: row.try_get("lease_id")?,
            install_id: row.try_get("install_id")?,
            extension_id: row.try_get("extension_id")?,
            device: row.try_get("device")?,
            vram_reserved_bytes: vram.max(0) as u64,
            acquired_at: row.try_get("acquired_at")?,
            released_at: row.try_get("released_at").ok(),
        });
    }
    Ok(out)
}

#[cfg(test)]
mod tests {
    use super::*;
    use sqlx::sqlite::SqlitePoolOptions;

    async fn setup() -> SqlitePool {
        let pool = SqlitePoolOptions::new()
            .max_connections(2)
            .connect("sqlite::memory:")
            .await
            .unwrap();
        for stmt in include_str!("../../../migrations/009_host_model_store.sql").split(';') {
            let t = stmt.trim();
            if !t.is_empty() {
                sqlx::query(t).execute(&pool).await.unwrap();
            }
        }
        let now = Utc::now().to_rfc3339();
        sqlx::query(
            "INSERT INTO host_model_installs (install_id, family, version, variant, \
             install_root, files_manifest, sha256_root, source_revision, state, source_kind, \
             created_at, updated_at) VALUES ('inst-1','f','v','default','/tmp','[]','s','s',\
             'ready','direct_url',$1,$1)",
        )
        .bind(&now)
        .execute(&pool)
        .await
        .unwrap();
        pool
    }

    const TWELVE_GB: u64 = 12 * 1024 * 1024 * 1024;

    #[tokio::test]
    async fn acquire_over_budget_returns_insufficient_resources() {
        let pool = setup().await;
        acquire_lease(&pool, "inst-1", "ext-a", "cuda:0", TWELVE_GB, TWELVE_GB)
            .await
            .unwrap();
        let err = acquire_lease(&pool, "inst-1", "ext-b", "cuda:0", 1, TWELVE_GB)
            .await
            .unwrap_err();
        match err {
            ModelStoreError::InsufficientResources {
                device,
                requested,
                available,
            } => {
                assert_eq!(device, "cuda:0");
                assert_eq!(requested, 1);
                assert_eq!(available, 0);
            }
            other => panic!("expected InsufficientResources, got {other:?}"),
        }
    }

    #[tokio::test]
    async fn acquire_release_round_trip_reflects_in_list() {
        let pool = setup().await;
        let lease = acquire_lease(&pool, "inst-1", "ext-a", "cuda:0", 4 * 1024, TWELVE_GB)
            .await
            .unwrap();
        let active = list_active_leases(&pool, "cuda:0").await.unwrap();
        assert_eq!(active.len(), 1);
        assert_eq!(active[0].lease_id, lease.lease_id);

        release_lease(&pool, &lease.lease_id).await.unwrap();
        let active = list_active_leases(&pool, "cuda:0").await.unwrap();
        assert!(active.is_empty());
    }
}
