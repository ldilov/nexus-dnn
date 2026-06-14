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
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/009_host_model_store.sql"),
        false,
    )
    .await?;
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/010_host_model_store_provenance.sql"),
        true,
    )
    .await?;
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/011_deployments.sql"),
        true,
    )
    .await?;
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/012_extensions_primary_refs.sql"),
        true,
    )
    .await?;
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/013_model_store_download_jobs.sql"),
        false,
    )
    .await?;
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/014_model_store_installed_artifacts.sql"),
        false,
    )
    .await?;
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/015_installed_artifact_extraction_metadata.sql"),
        true,
    )
    .await?;
    // spec 032 — backend-runtime catalog + installs + settings + leases
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/016_backend_runtime_catalog.sql"),
        false,
    )
    .await?;
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/017_backend_runtime_installs.sql"),
        false,
    )
    .await?;
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/018_backend_runtime_settings.sql"),
        false,
    )
    .await?;
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/019_backend_runtime_leases.sql"),
        false,
    )
    .await?;
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/020_deployments_soft_delete.sql"),
        true,
    )
    .await?;
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/021_installed_artifact_moe_metadata.sql"),
        true,
    )
    .await?;
    // spec 054 — ref-counted Foundry ownership of model-store artifacts
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/022_model_store_artifact_refs.sql"),
        false,
    )
    .await?;
    // spec workflow-driven-recipes P0 — immutable workflow version history
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/023_workflow_versions.sql"),
        true,
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
