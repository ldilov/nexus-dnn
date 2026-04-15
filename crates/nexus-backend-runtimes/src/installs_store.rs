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

fn storage(e: sqlx::Error) -> BackendRuntimeError {
    BackendRuntimeError::Storage(e.to_string())
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

pub async fn migrate_from_legacy(pool: &SqlitePool) -> BackendRuntimeResult<u64> {
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

        let binary_paths_json = match &binary_path {
            Some(p) => format!("[{}]", serde_json::to_string(p).unwrap_or_default()),
            None => "[]".to_owned(),
        };

        let family = match backend.as_str() {
            "llama.cpp" | "llamacpp" => "llama.cpp",
            other => other,
        };

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

/// Find the best-matching `installed` runtime row for a dependency declaration
/// (spec 011 US1). Version matching uses a permissive lexicographic test against
/// the `version` column; accelerator matching is a membership check when the
/// dependency pins one or more acceleration profiles.
///
/// Returns `Ok(Some(row))` on match, `Ok(None)` when no install satisfies the
/// requirement.
pub async fn resolve_dependency(
    pool: &SqlitePool,
    family: &str,
    version_req: Option<&str>,
    acceleration: &[String],
) -> BackendRuntimeResult<Option<RuntimeInstallRow>> {
    let all = list_all(pool).await?;
    let matched = all.into_iter().find(|row| {
        row.family == family
            && row.state == "installed"
            && version_satisfies(row.version.as_str(), version_req)
            && (acceleration.is_empty() || acceleration.iter().any(|a| a == &row.accelerator))
    });
    Ok(matched)
}

/// Return the extension ids currently holding (or declaring) a dependency on
/// the given install. Walks `host_runtime_leases` for live leases; callers
/// that also need manifest-declared dependents should merge with the registry
/// view.
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

fn version_satisfies(have: &str, req: Option<&str>) -> bool {
    let Some(req) = req else {
        return true;
    };
    let req = req.trim();
    if let Some(rest) = req.strip_prefix(">=") {
        return have >= rest.trim();
    }
    if let Some(rest) = req.strip_prefix(">") {
        return have > rest.trim();
    }
    if let Some(rest) = req.strip_prefix("<=") {
        return have <= rest.trim();
    }
    if let Some(rest) = req.strip_prefix("<") {
        return have < rest.trim();
    }
    if let Some(rest) = req.strip_prefix("=") {
        return have == rest.trim();
    }
    have == req
}

async fn legacy_table_exists(pool: &SqlitePool) -> BackendRuntimeResult<bool> {
    let row = sqlx::query(
        "SELECT name FROM sqlite_master \
         WHERE type='table' AND name='ext_local_llm_runtime_installs'",
    )
    .fetch_optional(pool)
    .await
    .map_err(storage)?;
    Ok(row.is_some())
}

#[cfg(test)]
mod tests {
    use super::*;
    use sqlx::sqlite::SqlitePoolOptions;

    async fn mem_pool() -> SqlitePool {
        SqlitePoolOptions::new()
            .max_connections(1)
            .connect(":memory:")
            .await
            .unwrap()
    }

    async fn apply_schema(pool: &SqlitePool) {
        sqlx::query(include_str!(
            "../../../migrations/008_host_runtime_pool.sql"
        ))
        .execute(pool)
        .await
        .ok();
        for stmt in include_str!("../../../migrations/008_host_runtime_pool.sql").split(';') {
            let t = stmt.trim();
            if t.is_empty() {
                continue;
            }
            sqlx::query(t).execute(pool).await.ok();
        }
    }

    #[tokio::test]
    async fn hydrate_clears_stale_leases() {
        let pool = mem_pool().await;
        apply_schema(&pool).await;
        sqlx::query(
            "INSERT INTO host_runtime_installs \
             (install_id, family, version, accelerator, install_root, binary_paths, state, \
              created_at, updated_at) \
             VALUES ('ri_1','llama.cpp','b1','cpu','/tmp','[]','installed','t','t')",
        )
        .execute(&pool)
        .await
        .unwrap();
        sqlx::query(
            "INSERT INTO host_runtime_leases \
             (lease_id, install_id, extension_id, channel_kind, channel_address, api_dialects, ready, created_at) \
             VALUES ('rl_1','ri_1','local-llm','http_tcp','{}','[]',1,'t')",
        )
        .execute(&pool)
        .await
        .unwrap();
        let affected = hydrate_on_start(&pool).await.unwrap();
        assert_eq!(affected, 1);
    }

    #[tokio::test]
    async fn resolve_dependency_matches_family_version_and_accel() {
        let pool = mem_pool().await;
        apply_schema(&pool).await;
        sqlx::query(
            "INSERT INTO host_runtime_installs \
             (install_id, family, version, accelerator, install_root, binary_paths, state, \
              created_at, updated_at) \
             VALUES \
             ('ri_a','llama.cpp','b4970','cuda12','/a','[]','installed','t','t'), \
             ('ri_b','llama.cpp','b3000','cpu','/b','[]','installed','t','t'), \
             ('ri_c','llama.cpp','b5000','cpu','/c','[]','needs_repair','t','t')",
        )
        .execute(&pool)
        .await
        .unwrap();

        let m = resolve_dependency(
            &pool,
            "llama.cpp",
            Some(">=b4000"),
            &["cuda12".into(), "cpu".into()],
        )
        .await
        .unwrap();
        assert_eq!(m.unwrap().install_id, "ri_a");

        let none = resolve_dependency(&pool, "llama.cpp", Some(">=b9999"), &[])
            .await
            .unwrap();
        assert!(none.is_none());

        let not_ready = resolve_dependency(&pool, "llama.cpp", Some(">=b5000"), &["cpu".into()])
            .await
            .unwrap();
        assert!(not_ready.is_none(), "needs_repair rows must not resolve");
    }

    #[tokio::test]
    async fn list_dependents_returns_active_lease_holders() {
        let pool = mem_pool().await;
        apply_schema(&pool).await;
        sqlx::query(
            "INSERT INTO host_runtime_installs \
             (install_id, family, version, accelerator, install_root, binary_paths, state, \
              created_at, updated_at) \
             VALUES ('ri_1','llama.cpp','b1','cpu','/tmp','[]','installed','t','t')",
        )
        .execute(&pool)
        .await
        .unwrap();
        sqlx::query(
            "INSERT INTO host_runtime_leases \
             (lease_id, install_id, extension_id, channel_kind, channel_address, api_dialects, ready, created_at) \
             VALUES \
             ('l1','ri_1','ext.a','http_tcp','{}','[]',1,'t'), \
             ('l2','ri_1','ext.b','http_tcp','{}','[]',1,'t'), \
             ('l3','ri_1','ext.a','http_tcp','{}','[]',1,'t')",
        )
        .execute(&pool)
        .await
        .unwrap();
        let mut deps = list_dependents(&pool, "ri_1").await.unwrap();
        deps.sort();
        assert_eq!(deps, vec!["ext.a".to_string(), "ext.b".to_string()]);
    }

    #[tokio::test]
    async fn migrate_from_legacy_is_idempotent_when_no_legacy_table() {
        let pool = mem_pool().await;
        apply_schema(&pool).await;
        let inserted = migrate_from_legacy(&pool).await.unwrap();
        assert_eq!(inserted, 0);
        let again = migrate_from_legacy(&pool).await.unwrap();
        assert_eq!(again, 0);
    }
}
