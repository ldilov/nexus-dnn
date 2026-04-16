use sqlx::Row;
use sqlx::SqlitePool;
use sqlx::sqlite::SqlitePoolOptions;

async fn mem_pool() -> SqlitePool {
    SqlitePoolOptions::new()
        .max_connections(1)
        .connect("sqlite::memory:")
        .await
        .expect("open sqlite memory pool")
}

async fn apply_base_migrations(pool: &SqlitePool) {
    for stmt in include_str!("../../../migrations/008_host_runtime_pool.sql").split(';') {
        let trimmed = stmt.trim();
        if trimmed.is_empty() {
            continue;
        }
        sqlx::query(trimmed)
            .execute(pool)
            .await
            .expect("apply 008_host_runtime_pool");
    }
}

async fn apply_009(pool: &SqlitePool) {
    for stmt in include_str!("../../../migrations/009_host_model_store.sql").split(';') {
        let trimmed = stmt.trim();
        if trimmed.is_empty() {
            continue;
        }
        sqlx::query(trimmed)
            .execute(pool)
            .await
            .expect("apply 009_host_model_store");
    }
}

async fn tables_exist(pool: &SqlitePool) -> (bool, bool) {
    let installs = sqlx::query(
        "SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'host_model_installs'",
    )
    .fetch_optional(pool)
    .await
    .expect("probe installs")
    .is_some();
    let leases = sqlx::query(
        "SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'host_model_leases'",
    )
    .fetch_optional(pool)
    .await
    .expect("probe leases")
    .is_some();
    (installs, leases)
}

#[tokio::test]
async fn migration_009_applies_on_empty_db() {
    let pool = mem_pool().await;
    apply_009(&pool).await;
    let (installs, leases) = tables_exist(&pool).await;
    assert!(installs, "host_model_installs table created");
    assert!(leases, "host_model_leases table created");
}

#[tokio::test]
async fn migration_009_applies_on_top_of_pre_017_runtime_schema() {
    let pool = mem_pool().await;
    apply_base_migrations(&pool).await;
    apply_009(&pool).await;
    let (installs, leases) = tables_exist(&pool).await;
    assert!(installs);
    assert!(leases);
}

#[tokio::test]
async fn migration_009_is_idempotent() {
    let pool = mem_pool().await;
    apply_009(&pool).await;
    apply_009(&pool).await;
    let (installs, leases) = tables_exist(&pool).await;
    assert!(installs);
    assert!(leases);
}

async fn insert_install(
    pool: &SqlitePool,
    install_id: &str,
    sha: &str,
    private: i64,
    owner: Option<&str>,
) -> sqlx::Result<sqlx::sqlite::SqliteQueryResult> {
    sqlx::query(
        "INSERT INTO host_model_installs (\
            install_id, family, version, quantization, variant, install_root, \
            files_manifest, sha256_root, source_revision, state, source_kind, \
            private_model, owner_extension_id, created_at, updated_at\
         ) VALUES ($1, 'llama-cpp-gguf', 'llama-3-8b-instruct', 'Q4_K_M', 'default', \
                   '/tmp/install', '[]', $2, $2, 'ready', 'huggingface', $3, $4, \
                   '2026-04-15T00:00:00Z', '2026-04-15T00:00:00Z')",
    )
    .bind(install_id)
    .bind(sha)
    .bind(private)
    .bind(owner)
    .execute(pool)
    .await
}

#[tokio::test]
async fn unique_index_rejects_duplicate_identity_tuple() {
    let pool = mem_pool().await;
    apply_009(&pool).await;
    insert_install(&pool, "a", "sha-aaa", 0, None)
        .await
        .expect("first insert succeeds");
    let err = insert_install(&pool, "b", "sha-aaa", 0, None)
        .await
        .expect_err("same tuple -> unique violation");
    assert!(err.to_string().to_lowercase().contains("unique"));
}

#[tokio::test]
async fn unique_index_allows_distinct_revisions_for_same_tuple() {
    let pool = mem_pool().await;
    apply_009(&pool).await;
    insert_install(&pool, "a", "sha-aaa", 0, None)
        .await
        .expect("first insert");
    insert_install(&pool, "b", "sha-bbb", 0, None)
        .await
        .expect("different sha256_root -> different row (US12.4)");
    let count: i64 = sqlx::query("SELECT COUNT(*) AS n FROM host_model_installs")
        .fetch_one(&pool)
        .await
        .unwrap()
        .try_get("n")
        .unwrap();
    assert_eq!(count, 2);
}

#[tokio::test]
async fn unique_index_allows_private_row_alongside_public_row() {
    let pool = mem_pool().await;
    apply_009(&pool).await;
    insert_install(&pool, "public", "sha-aaa", 0, None)
        .await
        .expect("public row");
    insert_install(&pool, "private", "sha-aaa", 1, Some("ext-alpha"))
        .await
        .expect("private row with same sha but owner_extension_id -> allowed");
}

#[tokio::test]
async fn check_constraint_rejects_private_without_owner() {
    let pool = mem_pool().await;
    apply_009(&pool).await;
    let err = insert_install(&pool, "bad", "sha-aaa", 1, None)
        .await
        .expect_err("private_model=1 requires owner_extension_id");
    assert!(
        err.to_string().to_lowercase().contains("check")
            || err.to_string().to_lowercase().contains("constraint"),
        "expected CHECK constraint violation, got: {err}"
    );
}

#[tokio::test]
async fn check_constraint_rejects_public_row_with_owner() {
    let pool = mem_pool().await;
    apply_009(&pool).await;
    let err = insert_install(&pool, "bad", "sha-aaa", 0, Some("ext-alpha"))
        .await
        .expect_err("private_model=0 forbids owner_extension_id");
    assert!(
        err.to_string().to_lowercase().contains("check")
            || err.to_string().to_lowercase().contains("constraint"),
        "expected CHECK constraint violation, got: {err}"
    );
}
