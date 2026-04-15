//! Spec 012 US1 — startup migration wiring integration tests.
//!
//! Validates `run_startup_migrations` chains `migrate_from_legacy`,
//! `relocate_legacy_binaries`, and `hydrate_on_start` into a single
//! idempotent pre-bind hook.

use sqlx::SqlitePool;
use sqlx::sqlite::SqlitePoolOptions;

async fn mem_pool() -> SqlitePool {
    SqlitePoolOptions::new()
        .max_connections(1)
        .connect(":memory:")
        .await
        .expect("connect in-memory sqlite")
}

async fn apply_host_schema(pool: &SqlitePool) {
    for stmt in include_str!("../../../migrations/008_host_runtime_pool.sql").split(';') {
        let trimmed = stmt.trim();
        if trimmed.is_empty() {
            continue;
        }
        sqlx::query(trimmed).execute(pool).await.ok();
    }
}

async fn seed_legacy_row(pool: &SqlitePool, install_root: &str, binary_path: &str) {
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
    sqlx::query(
        "INSERT INTO ext_local_llm_runtime_installs \
         (runtime_install_id, backend, release_id, accelerator_profile, install_path, \
          binary_path, status, source_url, checksum_sha256, installed_at) \
         VALUES ('ri_legacy','llamacpp','b4970','cuda12',$1,$2,'ready',NULL,NULL,NULL)",
    )
    .bind(install_root)
    .bind(binary_path)
    .execute(pool)
    .await
    .unwrap();
}

#[tokio::test]
async fn startup_runs_migration_before_bind() {
    let tmp = tempfile::tempdir().unwrap();
    let data_dir = tmp.path().to_path_buf();
    let legacy_root = data_dir.join("extensions/local-llm/runtimes");
    let legacy_install = legacy_root.join("llamacpp/b4970/win-cuda12");
    std::fs::create_dir_all(&legacy_install).unwrap();
    let bin = legacy_install.join("llama-server.exe");
    std::fs::write(&bin, b"binary-bytes").unwrap();

    let pool = mem_pool().await;
    apply_host_schema(&pool).await;
    seed_legacy_row(
        &pool,
        &legacy_install.to_string_lossy(),
        &bin.to_string_lossy(),
    )
    .await;

    nexus_backend_runtimes::run_startup_migrations(&pool, &data_dir)
        .await
        .expect("startup migrations succeed");

    let rows = nexus_backend_runtimes::installs_store::list_all(&pool)
        .await
        .unwrap();
    assert_eq!(
        rows.len(),
        1,
        "legacy row migrated to host_runtime_installs"
    );
    let row = &rows[0];
    assert_eq!(row.family, "llama.cpp");

    let expected_dir = data_dir.join("runtimes").join("llama.cpp").join("b4970");
    assert!(
        expected_dir.exists(),
        "binary directory relocated under host layout: {}",
        expected_dir.display(),
    );
    assert!(
        expected_dir.join("llama-server.exe").exists(),
        "binary moved with the directory",
    );
    assert!(!legacy_install.exists(), "legacy directory removed");

    let renamed = sqlx::query(
        "SELECT name FROM sqlite_master \
         WHERE type='table' AND name='ext_local_llm_runtime_installs_migrated_008'",
    )
    .fetch_optional(&pool)
    .await
    .unwrap();
    assert!(renamed.is_some(), "legacy table renamed");
}

#[tokio::test]
async fn idempotent_across_restarts() {
    let tmp = tempfile::tempdir().unwrap();
    let data_dir = tmp.path().to_path_buf();
    let legacy_root = data_dir.join("extensions/local-llm/runtimes");
    let legacy_install = legacy_root.join("llamacpp/b4970/win-cuda12");
    std::fs::create_dir_all(&legacy_install).unwrap();
    let bin = legacy_install.join("llama-server.exe");
    std::fs::write(&bin, b"binary-bytes").unwrap();

    let pool = mem_pool().await;
    apply_host_schema(&pool).await;
    seed_legacy_row(
        &pool,
        &legacy_install.to_string_lossy(),
        &bin.to_string_lossy(),
    )
    .await;

    nexus_backend_runtimes::run_startup_migrations(&pool, &data_dir)
        .await
        .expect("first run succeeds");
    let count_first = nexus_backend_runtimes::installs_store::list_all(&pool)
        .await
        .unwrap()
        .len();

    nexus_backend_runtimes::run_startup_migrations(&pool, &data_dir)
        .await
        .expect("second run succeeds");
    let count_second = nexus_backend_runtimes::installs_store::list_all(&pool)
        .await
        .unwrap()
        .len();

    assert_eq!(count_first, count_second, "row count stable across re-runs");
    assert_eq!(count_first, 1, "exactly one migrated row survives");

    nexus_backend_runtimes::run_startup_migrations(&pool, &data_dir)
        .await
        .expect("third run succeeds");
    let count_third = nexus_backend_runtimes::installs_store::list_all(&pool)
        .await
        .unwrap()
        .len();
    assert_eq!(count_third, 1, "three runs still yield a single row");
}

#[tokio::test]
#[tracing_test::traced_test]
async fn structured_tracing_on_failure() {
    let tmp = tempfile::tempdir().unwrap();
    let data_dir = tmp.path().to_path_buf();
    let pool = mem_pool().await;
    seed_legacy_row(
        &pool,
        "/nonexistent/legacy/install",
        "/nonexistent/legacy/install/bin",
    )
    .await;

    let result = nexus_backend_runtimes::run_startup_migrations(&pool, &data_dir).await;

    assert!(
        result.is_err(),
        "missing host schema surfaces failure: got {result:?}",
    );
    assert!(
        logs_contain("startup migration failed"),
        "structured error event captured via tracing",
    );
    assert!(
        logs_contain("phase=\"migrate_from_legacy\"") || logs_contain("phase=migrate_from_legacy"),
        "phase field is present in captured event",
    );
}
