//! SQL migration runner extracted from sqlite.rs per spec 014.

use sqlx::sqlite::SqlitePool;

use crate::error::StorageError;

/// Apply every workspace SQL migration in order. Each migration is split on
/// `;` boundaries and executed statement-by-statement so that
/// `ALTER TABLE ... ADD COLUMN` clauses can be re-run idempotently when the
/// migration is re-applied against an already-upgraded schema.
///
/// `ignore_duplicate_column = true` swallows SQLite's `duplicate column`
/// error so the runner stays idempotent for `ALTER TABLE` migrations.
pub async fn run_migrations(pool: &SqlitePool) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../../../migrations/001_initial.sql"))
        .execute(pool)
        .await?;
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/002_recipes_contributions.sql"),
        true,
    )
    .await?;
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/003_extension_storage.sql"),
        false,
    )
    .await?;
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/004_workflow_user_edits.sql"),
        true,
    )
    .await?;
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/005_workflow_canvas_state.sql"),
        false,
    )
    .await?;
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/006_workflow_extension_attribution.sql"),
        true,
    )
    .await?;
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/007_host_hf_catalog.sql"),
        false,
    )
    .await?;
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/008_host_runtime_pool.sql"),
        false,
    )
    .await?;
    Ok(())
}

async fn execute_migration_statements(
    pool: &SqlitePool,
    sql: &str,
    ignore_duplicate_column: bool,
) -> Result<(), StorageError> {
    for statement in sql.split(';') {
        let trimmed = statement.trim();
        if trimmed.is_empty() {
            continue;
        }
        if let Err(e) = sqlx::query(trimmed).execute(pool).await {
            if ignore_duplicate_column && e.to_string().contains("duplicate column") {
                continue;
            }
            return Err(e.into());
        }
    }
    Ok(())
}
