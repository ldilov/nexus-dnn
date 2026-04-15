//! Legacy-table migration extracted per spec 015 US4.

use sqlx::Row;
use sqlx::SqlitePool;

use super::storage;
use crate::error::{BackendRuntimeError, BackendRuntimeResult};

pub async fn migrate_from_legacy(pool: &SqlitePool) -> BackendRuntimeResult<u64> {
    if migrated_guard_tripped(pool).await? {
        return Ok(0);
    }
    if !legacy_table_exists(pool).await? {
        return Ok(0);
    }

    let now = chrono::Utc::now().to_rfc3339();

    let legacy_rows = sqlx::query(
        "SELECT runtime_install_id, backend, release_id, accelerator_profile, install_path, \
                binary_path, status, source_url, checksum_sha256, installed_at \
         FROM ext_local_llm_runtime_installs",
    )
    .fetch_all(pool)
    .await
    .map_err(storage)?;

    let mut inserted: u64 = 0;
    for row in legacy_rows {
        let install_id: String = row.try_get("runtime_install_id").map_err(storage)?;
        let backend: String = row.try_get("backend").map_err(storage)?;
        let release_id: String = row.try_get("release_id").map_err(storage)?;
        let accelerator: String = row.try_get("accelerator_profile").map_err(storage)?;
        let install_root: String = row.try_get("install_path").map_err(storage)?;
        let binary_path: Option<String> = row.try_get("binary_path").ok();
        let legacy_status: String = row.try_get("status").map_err(storage)?;
        let source_url: Option<String> = row.try_get("source_url").ok();
        let checksum: Option<String> = row.try_get("checksum_sha256").ok();
        let installed_at_ms: Option<i64> = row.try_get("installed_at").ok();
        let created_at = match installed_at_ms {
            Some(ms) => chrono::DateTime::<chrono::Utc>::from_timestamp_millis(ms)
                .map(|t| t.to_rfc3339())
                .unwrap_or_else(|| now.clone()),
            None => now.clone(),
        };

        let state = match legacy_status.as_str() {
            "ready" | "installed_unvalidated" => "installed",
            "broken" => "needs_repair",
            "updating" => "installing",
            _ => "installed",
        };

        let binary_paths_json = build_binary_paths_json(binary_path.as_deref())?;

        let family = crate::family::RuntimeFamily::canonical(backend.as_str())
            .map(|f| f.as_str())
            .unwrap_or(backend.as_str());

        let already = sqlx::query("SELECT 1 FROM host_runtime_installs WHERE install_id = $1")
            .bind(&install_id)
            .fetch_optional(pool)
            .await
            .map_err(storage)?;
        if already.is_some() {
            continue;
        }

        sqlx::query(
            "INSERT INTO host_runtime_installs \
             (install_id, family, version, accelerator, install_root, binary_paths, \
              state, source_url, checksum, created_at, updated_at) \
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $10)",
        )
        .bind(&install_id)
        .bind(family)
        .bind(&release_id)
        .bind(&accelerator)
        .bind(&install_root)
        .bind(&binary_paths_json)
        .bind(state)
        .bind(&source_url)
        .bind(&checksum)
        .bind(&created_at)
        .execute(pool)
        .await
        .map_err(storage)?;
        inserted += 1;
    }

    sqlx::query(
        "ALTER TABLE ext_local_llm_runtime_installs \
         RENAME TO ext_local_llm_runtime_installs_migrated_008",
    )
    .execute(pool)
    .await
    .map_err(storage)?;

    Ok(inserted)
}

pub(super) async fn migrated_guard_tripped(pool: &SqlitePool) -> BackendRuntimeResult<bool> {
    let renamed = sqlx::query(
        "SELECT name FROM sqlite_master \
         WHERE type='table' AND name='ext_local_llm_runtime_installs_migrated_008'",
    )
    .fetch_optional(pool)
    .await
    .map_err(storage)?;
    if renamed.is_none() {
        return Ok(false);
    }
    let host_row = sqlx::query("SELECT 1 FROM host_runtime_installs LIMIT 1")
        .fetch_optional(pool)
        .await
        .map_err(storage)?;
    Ok(host_row.is_some())
}

pub(super) async fn legacy_table_exists(pool: &SqlitePool) -> BackendRuntimeResult<bool> {
    let row = sqlx::query(
        "SELECT name FROM sqlite_master \
         WHERE type='table' AND name='ext_local_llm_runtime_installs'",
    )
    .fetch_optional(pool)
    .await
    .map_err(storage)?;
    Ok(row.is_some())
}

/// Build the JSON-array string stored in `host_runtime_installs.binary_paths`
/// from a single optional binary path (per spec 015 US7 / FR-312).
/// Returns `Internal` on serialize failure rather than silently emitting `[]`.
fn build_binary_paths_json(binary_path: Option<&str>) -> BackendRuntimeResult<String> {
    match binary_path {
        Some(p) => {
            let escaped = serde_json::to_string(p).map_err(|e| {
                BackendRuntimeError::Internal(format!("serialize binary_path: {e}"))
            })?;
            Ok(format!("[{escaped}]"))
        }
        None => Ok("[]".to_owned()),
    }
}
