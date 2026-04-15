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

/// Move legacy extension-scoped binary directories under the host-managed
/// `<data_dir>/runtimes/{family}/{version}/` layout (spec 011 US6 T092).
///
/// For each row whose `install_root` lives under `legacy_root`, the directory
/// is renamed onto `host_runtimes_root` and the row's `install_root` +
/// `binary_paths` JSON are rewritten to the new absolute path. Rows that
/// have already been relocated are skipped. Missing source directories are
/// reported as a warning via `tracing::warn!` but do not fail the relocator
/// — orphan rows are surfaced to the operator via the Backends UI as
/// `needs_repair`.
pub async fn relocate_legacy_binaries(
    pool: &SqlitePool,
    legacy_root: &std::path::Path,
    host_runtimes_root: &std::path::Path,
) -> BackendRuntimeResult<u64> {
    let rows = list_all(pool).await?;
    let mut relocated: u64 = 0;
    for row in rows {
        let src = std::path::Path::new(&row.install_root);
        if !src.starts_with(legacy_root) {
            continue;
        }
        let dest = host_runtimes_root
            .join(&row.family)
            .join(&row.version);
        if dest.exists() {
            continue;
        }
        if let Some(parent) = dest.parent() {
            if let Err(e) = std::fs::create_dir_all(parent) {
                tracing::warn!(
                    install_id = %row.install_id,
                    error = %e,
                    "relocate: failed to create destination parent",
                );
                continue;
            }
        }
        if !src.exists() {
            tracing::warn!(
                install_id = %row.install_id,
                src = %src.display(),
                "relocate: source directory missing — skipping (row left for repair)",
            );
            continue;
        }
        if let Err(e) = std::fs::rename(src, &dest) {
            tracing::warn!(
                install_id = %row.install_id,
                src = %src.display(),
                dest = %dest.display(),
                error = %e,
                "relocate: rename failed — skipping",
            );
            continue;
        }
        let new_root = dest.to_string_lossy().into_owned();
        let new_binary_paths = rewrite_binary_paths(&row.binary_paths, &row.install_root, &new_root);
        sqlx::query(
            "UPDATE host_runtime_installs \
             SET install_root = $1, binary_paths = $2, updated_at = datetime('now') \
             WHERE install_id = $3",
        )
        .bind(&new_root)
        .bind(&new_binary_paths)
        .bind(&row.install_id)
        .execute(pool)
        .await
        .map_err(storage)?;
        relocated += 1;
    }
    Ok(relocated)
}

fn rewrite_binary_paths(json_str: &str, old_prefix: &str, new_prefix: &str) -> String {
    match serde_json::from_str::<Vec<String>>(json_str) {
        Ok(paths) => {
            let updated: Vec<String> = paths
                .into_iter()
                .map(|p| {
                    if let Some(rest) = p.strip_prefix(old_prefix) {
                        format!("{new_prefix}{rest}")
                    } else {
                        p
                    }
                })
                .collect();
            serde_json::to_string(&updated).unwrap_or_else(|_| json_str.to_owned())
        }
        Err(_) => json_str.to_owned(),
    }
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

    async fn seed_legacy_table(pool: &SqlitePool) {
        sqlx::query(
            "CREATE TABLE ext_local_llm_runtime_installs ( \
             runtime_install_id TEXT PRIMARY KEY, \
             backend TEXT NOT NULL, \
             release_id TEXT NOT NULL, \
             accelerator_profile TEXT NOT NULL, \
             install_path TEXT NOT NULL, \
             binary_path TEXT, \
             status TEXT NOT NULL, \
             source_url TEXT, \
             checksum_sha256 TEXT, \
             installed_at INTEGER \
           )",
        )
        .execute(pool)
        .await
        .unwrap();
    }

    #[tokio::test]
    async fn legacy_rows_copied_with_field_mapping() {
        let pool = mem_pool().await;
        apply_schema(&pool).await;
        seed_legacy_table(&pool).await;

        sqlx::query(
            "INSERT INTO ext_local_llm_runtime_installs \
             (runtime_install_id, backend, release_id, accelerator_profile, install_path, \
              binary_path, status, source_url, checksum_sha256, installed_at) \
             VALUES \
             ('legacy-1','llamacpp','b4970','cuda12','/legacy/foo','/legacy/foo/llama-server', \
              'ready','https://example/x','deadbeef',1700000000000), \
             ('legacy-2','llamacpp','b4900','cpu','/legacy/bar','/legacy/bar/llama-server', \
              'broken',NULL,NULL,NULL), \
             ('legacy-3','llamacpp','b4800','cpu','/legacy/baz','/legacy/baz/llama-server', \
              'installed_unvalidated',NULL,NULL,NULL)",
        )
        .execute(&pool)
        .await
        .unwrap();

        let inserted = migrate_from_legacy(&pool).await.unwrap();
        assert_eq!(inserted, 3);

        let rows = list_all(&pool).await.unwrap();
        assert_eq!(rows.len(), 3);

        let by_id: std::collections::HashMap<_, _> =
            rows.into_iter().map(|r| (r.install_id.clone(), r)).collect();

        let r1 = &by_id["legacy-1"];
        assert_eq!(r1.family, "llama.cpp", "backend → family");
        assert_eq!(r1.version, "b4970", "release_id → version");
        assert_eq!(r1.accelerator, "cuda12");
        assert_eq!(r1.install_root, "/legacy/foo", "install_path → install_root");
        assert_eq!(r1.state, "installed", "ready → installed");
        assert_eq!(r1.checksum.as_deref(), Some("deadbeef"));
        assert!(r1.binary_paths.contains("llama-server"));

        assert_eq!(by_id["legacy-2"].state, "needs_repair", "broken → needs_repair");
        assert_eq!(
            by_id["legacy-3"].state, "installed",
            "installed_unvalidated → installed",
        );

        let renamed = sqlx::query(
            "SELECT name FROM sqlite_master \
             WHERE type='table' AND name='ext_local_llm_runtime_installs_migrated_008'",
        )
        .fetch_optional(&pool)
        .await
        .unwrap();
        assert!(renamed.is_some(), "legacy table renamed after migration");

        let still_legacy = legacy_table_exists(&pool).await.unwrap();
        assert!(!still_legacy, "old name no longer exists");
    }

    #[tokio::test]
    async fn relocate_moves_legacy_binary_and_rewrites_paths() {
        let tmp = tempfile::tempdir().unwrap();
        let legacy_root = tmp.path().join("data/extensions/local-llm/runtimes");
        let host_root = tmp.path().join("data/runtimes");
        let legacy_install = legacy_root.join("llamacpp/b4970/win-cuda12");
        std::fs::create_dir_all(&legacy_install).unwrap();
        let bin = legacy_install.join("llama-server.exe");
        std::fs::write(&bin, b"binary-bytes").unwrap();

        let pool = mem_pool().await;
        apply_schema(&pool).await;
        let install_root = legacy_install.to_string_lossy().into_owned();
        let bin_path = bin.to_string_lossy().into_owned();
        let binary_json = serde_json::to_string(&vec![bin_path.clone()]).unwrap();
        sqlx::query(
            "INSERT INTO host_runtime_installs \
             (install_id, family, version, accelerator, install_root, binary_paths, state, \
              created_at, updated_at) \
             VALUES ('ri_relocate','llama.cpp','b4970','cuda12',$1,$2,'installed','t','t')",
        )
        .bind(&install_root)
        .bind(&binary_json)
        .execute(&pool)
        .await
        .unwrap();

        let n = relocate_legacy_binaries(&pool, &legacy_root, &host_root)
            .await
            .unwrap();
        assert_eq!(n, 1);

        let new_dir = host_root.join("llama.cpp/b4970");
        assert!(new_dir.exists(), "directory was moved to host layout");
        assert!(
            new_dir.join("llama-server.exe").exists(),
            "binary moved with the directory",
        );
        assert!(!legacy_install.exists(), "legacy directory removed");

        let row = list_all(&pool).await.unwrap().pop().unwrap();
        assert_eq!(
            std::path::Path::new(&row.install_root),
            new_dir.as_path(),
            "install_root rewritten to host layout",
        );
        assert!(
            row.binary_paths.contains("llama.cpp")
                && row.binary_paths.contains("b4970")
                && row.binary_paths.contains("llama-server.exe")
                && !row.binary_paths.contains("extensions"),
            "binary_paths rewritten away from legacy root: {}",
            row.binary_paths,
        );

        // Second run is a no-op (dest exists, src missing).
        let again = relocate_legacy_binaries(&pool, &legacy_root, &host_root)
            .await
            .unwrap();
        assert_eq!(again, 0);
    }

    #[tokio::test]
    async fn migrate_from_legacy_idempotent_second_run() {
        let pool = mem_pool().await;
        apply_schema(&pool).await;
        seed_legacy_table(&pool).await;
        sqlx::query(
            "INSERT INTO ext_local_llm_runtime_installs \
             (runtime_install_id, backend, release_id, accelerator_profile, install_path, \
              binary_path, status, source_url, checksum_sha256, installed_at) \
             VALUES ('only','llamacpp','b1','cpu','/p','/p/b','ready',NULL,NULL,NULL)",
        )
        .execute(&pool)
        .await
        .unwrap();

        let first = migrate_from_legacy(&pool).await.unwrap();
        assert_eq!(first, 1);
        let count_after_first = list_all(&pool).await.unwrap().len();

        // Second run finds the legacy table renamed → no-ops to 0 inserted, no
        // duplicate rows in the host table.
        let second = migrate_from_legacy(&pool).await.unwrap();
        assert_eq!(second, 0, "second run inserts nothing");
        assert_eq!(
            list_all(&pool).await.unwrap().len(),
            count_after_first,
            "row count stable across re-runs",
        );
    }
}
