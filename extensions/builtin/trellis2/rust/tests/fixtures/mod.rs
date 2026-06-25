#![allow(dead_code)]

pub mod mock_lease;

use sqlx::sqlite::SqlitePoolOptions;
use sqlx::SqlitePool;

pub async fn memory_pool() -> SqlitePool {
    let pool = SqlitePoolOptions::new()
        .max_connections(1)
        .connect("sqlite::memory:")
        .await
        .expect("open in-memory sqlite");
    for migration in trellis2_extension::MIGRATIONS {
        sqlx::raw_sql(migration.sql)
            .execute(&pool)
            .await
            .unwrap_or_else(|e| panic!("migration {} failed: {e}", migration.name));
    }
    pool
}
