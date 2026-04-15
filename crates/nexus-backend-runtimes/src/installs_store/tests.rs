//! Tests extracted per spec 015 US4.
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
        "../../../../migrations/008_host_runtime_pool.sql"
    ))
    .execute(pool)
    .await
    .ok();
    for stmt in include_str!("../../../../migrations/008_host_runtime_pool.sql").split(';') {
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

    let by_id: std::collections::HashMap<_, _> = rows
        .into_iter()
        .map(|r| (r.install_id.clone(), r))
        .collect();

    let r1 = &by_id["legacy-1"];
    assert_eq!(r1.family, "llama.cpp", "backend → family");
    assert_eq!(r1.version, "b4970", "release_id → version");
    assert_eq!(r1.accelerator, "cuda12");
    assert_eq!(
        r1.install_root, "/legacy/foo",
        "install_path → install_root"
    );
    assert_eq!(r1.state, "installed", "ready → installed");
    assert_eq!(r1.checksum.as_deref(), Some("deadbeef"));
    assert!(r1.binary_paths.contains("llama-server"));

    assert_eq!(
        by_id["legacy-2"].state, "needs_repair",
        "broken → needs_repair"
    );
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

    let still_legacy = super::migration::legacy_table_exists(&pool).await.unwrap();
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

// Spec 016 US7 (FR-409 / SC-405) — batched JOIN covering N+1 fix.
#[tokio::test]
async fn list_all_with_dependents_batches_in_one_query() {
    let pool = mem_pool().await;
    apply_schema(&pool).await;
    // 5 installs, varying dependents
    for i in 1..=5u32 {
        sqlx::query(
            "INSERT INTO host_runtime_installs \
             (install_id, family, version, accelerator, install_root, binary_paths, state, \
              created_at, updated_at) \
             VALUES ($1,'llama.cpp','b1','cpu','/tmp','[]','installed','t','t')",
        )
        .bind(format!("ri_{i}"))
        .execute(&pool)
        .await
        .unwrap();
    }
    // install ri_1 → ext.a, ext.b ; ri_2 → ext.c ; ri_3..5 → no leases
    for (install, ext, lid) in [
        ("ri_1", "ext.a", "rl_1"),
        ("ri_1", "ext.b", "rl_2"),
        ("ri_2", "ext.c", "rl_3"),
    ] {
        sqlx::query(
            "INSERT INTO host_runtime_leases \
             (lease_id, install_id, extension_id, channel_kind, channel_address, \
              api_dialects, ready, created_at) \
             VALUES ($1,$2,$3,'http_tcp','{}','[]',1,'t')",
        )
        .bind(lid)
        .bind(install)
        .bind(ext)
        .execute(&pool)
        .await
        .unwrap();
    }
    // Released leases MUST be excluded.
    sqlx::query(
        "INSERT INTO host_runtime_leases \
         (lease_id, install_id, extension_id, channel_kind, channel_address, \
          api_dialects, ready, created_at, released_at) \
         VALUES ('rl_dead','ri_1','ext.zombie','http_tcp','{}','[]',1,'t','t')",
    )
    .execute(&pool)
    .await
    .unwrap();

    let out = list_all_with_dependents(&pool).await.unwrap();
    assert_eq!(out.len(), 5, "one entry per install");

    let by_id: std::collections::BTreeMap<&str, &Vec<String>> = out
        .iter()
        .map(|(r, d)| (r.install_id.as_str(), d))
        .collect();
    assert!(
        by_id["ri_1"].contains(&"ext.a".to_string())
            && by_id["ri_1"].contains(&"ext.b".to_string())
            && !by_id["ri_1"].contains(&"ext.zombie".to_string()),
        "ri_1 deps (active only): {:?}",
        by_id["ri_1"],
    );
    assert_eq!(by_id["ri_2"], &vec!["ext.c".to_string()]);
    assert!(by_id["ri_3"].is_empty());
    assert!(by_id["ri_4"].is_empty());
    assert!(by_id["ri_5"].is_empty());
}
