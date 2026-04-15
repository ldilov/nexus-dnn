//! Host-owned runtime install store + migration from the legacy
//! extension-scoped table.
//!
//! The migrator is idempotent: if `host_runtime_installs` already holds rows
//! and the legacy table has been renamed, re-running is a no-op. Filesystem
//! relocation is a separate concern (handled by `relocate_legacy_binaries`
//! after the row migration).

use sqlx::{Row, SqlitePool};

use crate::error::{BackendRuntimeError, BackendRuntimeResult};

#[derive(Debug, Clone)]
pub struct RuntimeInstallRow {
    pub install_id: String,
    pub family: String,
    pub version: String,
    pub accelerator: String,
    pub install_root: String,
    pub binary_paths: String,
    pub state: String,
    pub validation_result: Option<String>,
    pub last_failure_category: Option<String>,
    pub source_url: Option<String>,
    pub checksum: Option<String>,
    pub created_at: String,
    pub updated_at: String,
}

mod migration;
mod relocation;
mod resolution;

// Public re-exports (preserve original module surface)
// Re-export the public surface (originally free functions on installs_store::*)
pub use migration::migrate_from_legacy;
pub use relocation::relocate_legacy_binaries;
pub use resolution::resolve_dependency;

fn storage(e: sqlx::Error) -> BackendRuntimeError {
    BackendRuntimeError::Storage(e.to_string())
}

pub async fn load_by_id(
    pool: &SqlitePool,
    install_id: &str,
) -> BackendRuntimeResult<Option<RuntimeInstallRow>> {
    let row_opt = sqlx::query(
        "SELECT install_id, family, version, accelerator, install_root, binary_paths, \
                state, validation_result, last_failure_category, source_url, checksum, \
                created_at, updated_at \
         FROM host_runtime_installs \
         WHERE install_id = $1",
    )
    .bind(install_id)
    .fetch_optional(pool)
    .await
    .map_err(storage)?;

    let Some(row) = row_opt else {
        return Ok(None);
    };
    Ok(Some(RuntimeInstallRow {
        install_id: row.try_get("install_id").map_err(storage)?,
        family: row.try_get("family").map_err(storage)?,
        version: row.try_get("version").map_err(storage)?,
        accelerator: row.try_get("accelerator").map_err(storage)?,
        install_root: row.try_get("install_root").map_err(storage)?,
        binary_paths: row.try_get("binary_paths").map_err(storage)?,
        state: row.try_get("state").map_err(storage)?,
        validation_result: row.try_get("validation_result").ok(),
        last_failure_category: row.try_get("last_failure_category").ok(),
        source_url: row.try_get("source_url").ok(),
        checksum: row.try_get("checksum").ok(),
        created_at: row.try_get("created_at").map_err(storage)?,
        updated_at: row.try_get("updated_at").map_err(storage)?,
    }))
}

pub async fn list_all(pool: &SqlitePool) -> BackendRuntimeResult<Vec<RuntimeInstallRow>> {
    let rows = sqlx::query(
        "SELECT install_id, family, version, accelerator, install_root, binary_paths, \
                state, validation_result, last_failure_category, source_url, checksum, \
                created_at, updated_at \
         FROM host_runtime_installs \
         ORDER BY datetime(created_at) DESC",
    )
    .fetch_all(pool)
    .await
    .map_err(storage)?;

    let mut out = Vec::with_capacity(rows.len());
    for row in rows {
        out.push(RuntimeInstallRow {
            install_id: row.try_get("install_id").map_err(storage)?,
            family: row.try_get("family").map_err(storage)?,
            version: row.try_get("version").map_err(storage)?,
            accelerator: row.try_get("accelerator").map_err(storage)?,
            install_root: row.try_get("install_root").map_err(storage)?,
            binary_paths: row.try_get("binary_paths").map_err(storage)?,
            state: row.try_get("state").map_err(storage)?,
            validation_result: row.try_get("validation_result").ok(),
            last_failure_category: row.try_get("last_failure_category").ok(),
            source_url: row.try_get("source_url").ok(),
            checksum: row.try_get("checksum").ok(),
            created_at: row.try_get("created_at").map_err(storage)?,
            updated_at: row.try_get("updated_at").map_err(storage)?,
        });
    }
    Ok(out)
}

pub async fn hydrate_on_start(pool: &SqlitePool) -> BackendRuntimeResult<u64> {
    let result = sqlx::query(
        "UPDATE host_runtime_leases \
         SET released_at = datetime('now'), ready = 0 \
         WHERE released_at IS NULL",
    )
    .execute(pool)
    .await
    .map_err(storage)?;
    Ok(result.rows_affected())
}

pub async fn remove_binary_directory(install_root: &std::path::Path) -> BackendRuntimeResult<()> {
    if !install_root.exists() {
        return Ok(());
    }
    if let Err(e) = tokio::fs::remove_dir_all(install_root).await {
        tracing::warn!(error = %e, "remove_binary_directory failed");
    }
    Ok(())
}

pub async fn delete_row(pool: &SqlitePool, install_id: &str) -> BackendRuntimeResult<()> {
    let existing = load_by_id(pool, install_id).await?;
    let Some(row) = existing else {
        return Ok(());
    };
    let now = chrono::Utc::now().to_rfc3339();
    sqlx::query(
        "INSERT INTO host_runtime_state_log \
         (install_id, from_state, to_state, trigger, detail, occurred_at) \
         VALUES ($1, $2, 'uninstalled', 'api.uninstall', NULL, $3)",
    )
    .bind(&row.install_id)
    .bind(&row.state)
    .bind(&now)
    .execute(pool)
    .await
    .map_err(storage)?;
    sqlx::query("DELETE FROM host_runtime_leases WHERE install_id = $1")
        .bind(install_id)
        .execute(pool)
        .await
        .map_err(storage)?;
    sqlx::query("DELETE FROM host_runtime_installs WHERE install_id = $1")
        .bind(install_id)
        .execute(pool)
        .await
        .map_err(storage)?;
    Ok(())
}

/// Spec 016 US7 (FR-409): batched counterpart to `list_all` + N× `list_dependents`.
/// One LEFT JOIN against `host_runtime_leases WHERE released_at IS NULL`; the
/// caller gets `(row, dedup'd extension_ids)` tuples. Query count: always 1.
#[allow(clippy::type_complexity)]
pub async fn list_all_with_dependents(
    pool: &SqlitePool,
) -> BackendRuntimeResult<Vec<(RuntimeInstallRow, Vec<String>)>> {
    let rows = sqlx::query(
        "SELECT i.install_id, i.family, i.version, i.accelerator, i.install_root, \
                i.binary_paths, i.state, i.validation_result, i.last_failure_category, \
                i.source_url, i.checksum, i.created_at, i.updated_at, \
                l.extension_id AS dep_extension_id \
         FROM host_runtime_installs i \
         LEFT JOIN host_runtime_leases l \
                ON l.install_id = i.install_id AND l.released_at IS NULL \
         ORDER BY datetime(i.created_at) DESC, i.install_id, l.extension_id",
    )
    .fetch_all(pool)
    .await
    .map_err(storage)?;

    let mut out: Vec<(RuntimeInstallRow, Vec<String>)> = Vec::new();
    for row in rows {
        let install_id: String = row.try_get("install_id").map_err(storage)?;
        let dep: Option<String> = row
            .try_get::<Option<String>, _>("dep_extension_id")
            .map_err(storage)?
            .filter(|s| !s.is_empty());

        let entry = match out.last_mut() {
            Some(last) if last.0.install_id == install_id => last,
            _ => {
                out.push((
                    RuntimeInstallRow {
                        install_id: install_id.clone(),
                        family: row.try_get("family").map_err(storage)?,
                        version: row.try_get("version").map_err(storage)?,
                        accelerator: row.try_get("accelerator").map_err(storage)?,
                        install_root: row.try_get("install_root").map_err(storage)?,
                        binary_paths: row.try_get("binary_paths").map_err(storage)?,
                        state: row.try_get("state").map_err(storage)?,
                        validation_result: row.try_get("validation_result").ok(),
                        last_failure_category: row.try_get("last_failure_category").ok(),
                        source_url: row.try_get("source_url").ok(),
                        checksum: row.try_get("checksum").ok(),
                        created_at: row.try_get("created_at").map_err(storage)?,
                        updated_at: row.try_get("updated_at").map_err(storage)?,
                    },
                    Vec::new(),
                ));
                out.last_mut().unwrap()
            }
        };
        if let Some(ext) = dep
            && !entry.1.contains(&ext)
        {
            entry.1.push(ext);
        }
    }
    Ok(out)
}

pub async fn list_dependents(
    pool: &SqlitePool,
    install_id: &str,
) -> BackendRuntimeResult<Vec<String>> {
    let rows = sqlx::query(
        "SELECT DISTINCT extension_id FROM host_runtime_leases \
         WHERE install_id = $1 AND released_at IS NULL",
    )
    .bind(install_id)
    .fetch_all(pool)
    .await
    .map_err(storage)?;
    let mut out = Vec::with_capacity(rows.len());
    for row in rows {
        out.push(row.try_get::<String, _>("extension_id").map_err(storage)?);
    }
    Ok(out)
}

#[cfg(test)]
mod tests;
