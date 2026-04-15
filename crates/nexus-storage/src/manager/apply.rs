use nexus_events::types::NexusEvent;
use sqlx::Executor;
use sqlx::Sqlite;
use sqlx::Transaction;

use crate::error::StorageError;
use crate::records::{MigrationRecord, ObjectRecord};

use super::{ApplyReport, MigrationInput, StorageManager, chrono_now};

impl StorageManager {
    pub async fn apply_plan(
        &self,
        namespace_id: &str,
        action: &str,
        migrations: &[MigrationInput],
    ) -> Result<ApplyReport, StorageError> {
        let ext_id = migrations
            .first()
            .map(|m| m.extension_id.as_str())
            .unwrap_or("");
        let op_id = self.journal_start(namespace_id, "apply_plan").await.ok();
        self.emit(NexusEvent::StorageApplyStarted {
            extension_id: ext_id.to_owned(),
            namespace_id: namespace_id.to_owned(),
        });

        let pool = self.db.pool();
        let mut tx = pool.begin().await?;
        let mut applied_count = 0usize;
        let mut objects_count = 0usize;

        for migration in migrations {
            match self.apply_single_migration(&mut tx, migration).await {
                Ok(obj_added) => {
                    applied_count += 1;
                    objects_count += obj_added;
                }
                Err(e) => {
                    tx.rollback().await?;
                    self.handle_apply_failure(&op_id, namespace_id, migration, &e)
                        .await;
                    return Err(StorageError::ApplyFailed {
                        detail: format!("migration '{}' failed: {e}", migration.migration_id),
                    });
                }
            }
        }

        sqlx::query(include_str!("../../queries/storage/activate_namespace.sql"))
            .bind(namespace_id)
            .execute(&mut *tx)
            .await?;
        tx.commit().await?;

        if let Some(ref id) = op_id {
            self.journal_complete(id, "completed", None).await;
        }

        Ok(ApplyReport {
            namespace_id: namespace_id.to_owned(),
            action: action.to_owned(),
            migrations_applied: applied_count,
            objects_created: objects_count,
            status: "active".into(),
        })
    }

    async fn apply_single_migration(
        &self,
        tx: &mut Transaction<'_, Sqlite>,
        migration: &MigrationInput,
    ) -> Result<usize, StorageError> {
        let savepoint = format!("sp_{}", migration.migration_id);
        tx.execute(sqlx::query(&format!("SAVEPOINT {savepoint}")))
            .await
            .map_err(|e| StorageError::ApplyFailed {
                detail: format!("SAVEPOINT failed for {}: {e}", migration.migration_id),
            })?;

        tx.execute(sqlx::query(&migration.expanded_sql))
            .await
            .map_err(|e| StorageError::ApplyFailed {
                detail: format!("expanded SQL failed for {}: {e}", migration.migration_id),
            })?;

        let now = chrono_now();
        let objects_added = insert_migration_and_objects(tx, migration, &now).await?;

        tx.execute(sqlx::query(&format!("RELEASE {savepoint}")))
            .await
            .map_err(|e| StorageError::ApplyFailed {
                detail: format!("RELEASE failed for {}: {e}", migration.migration_id),
            })?;

        self.emit(NexusEvent::StorageMigrationApplied {
            extension_id: migration.extension_id.clone(),
            namespace_id: migration.namespace_id.clone(),
            migration_id: migration.migration_id.clone(),
        });

        Ok(objects_added)
    }

    async fn handle_apply_failure(
        &self,
        op_id: &Option<String>,
        namespace_id: &str,
        migration: &MigrationInput,
        err: &StorageError,
    ) {
        self.emit(NexusEvent::StorageApplyFailed {
            extension_id: migration.extension_id.clone(),
            namespace_id: migration.namespace_id.clone(),
            error: err.to_string(),
        });
        if let Some(id) = op_id {
            self.journal_complete(id, "failed", None).await;
        }
        if let Err(qerr) = self.check_quarantine_threshold(namespace_id).await {
            tracing::warn!(namespace_id, error = %qerr, "quarantine threshold check failed");
        }
    }

    pub async fn validate_dry_run(&self, migrations_sql: &[String]) -> Result<(), StorageError> {
        let temp_pool = sqlx::sqlite::SqlitePool::connect("sqlite::memory:")
            .await
            .map_err(|e| StorageError::DryRunFailed {
                detail: format!("failed to create in-memory DB: {e}"),
            })?;

        for host_mig in HOST_MIGRATIONS {
            apply_host_migration_for_dry_run(&temp_pool, host_mig).await?;
        }
        for sql in migrations_sql {
            sqlx::query(sql)
                .execute(&temp_pool)
                .await
                .map_err(|e| StorageError::DryRunFailed {
                    detail: format!("extension migration failed: {e}"),
                })?;
        }
        temp_pool.close().await;
        Ok(())
    }
}

const HOST_MIGRATIONS: &[&str] = &[
    include_str!("../../../../migrations/001_initial.sql"),
    include_str!("../../../../migrations/002_recipes_contributions.sql"),
    include_str!("../../../../migrations/003_extension_storage.sql"),
];

async fn insert_migration_and_objects(
    tx: &mut Transaction<'_, Sqlite>,
    migration: &MigrationInput,
    now: &str,
) -> Result<usize, StorageError> {
    let mig = MigrationRecord {
        id: migration.record_id.clone(),
        namespace_id: migration.namespace_id.clone(),
        extension_id: migration.extension_id.clone(),
        extension_version: migration.extension_version.clone(),
        migration_id: migration.migration_id.clone(),
        path: migration.path.clone(),
        raw_checksum_sha256: migration.raw_checksum.clone(),
        expanded_checksum_sha256: migration.expanded_checksum.clone(),
        status: "applied".into(),
        applied_at: Some(now.to_owned()),
        error_json: None,
    };
    sqlx::query(include_str!("../../queries/storage/insert_migration.sql"))
        .bind(&mig.id)
        .bind(&mig.namespace_id)
        .bind(&mig.extension_id)
        .bind(&mig.extension_version)
        .bind(&mig.migration_id)
        .bind(&mig.path)
        .bind(&mig.raw_checksum_sha256)
        .bind(&mig.expanded_checksum_sha256)
        .bind(&mig.status)
        .bind(&mig.applied_at)
        .bind(&mig.error_json)
        .execute(&mut **tx)
        .await?;

    let mut count = 0usize;
    for obj in &migration.objects {
        let rec = ObjectRecord {
            id: obj.record_id.clone(),
            namespace_id: migration.namespace_id.clone(),
            object_name: obj.object_name.clone(),
            object_type: obj.object_type.clone(),
            created_by_migration_id: obj.migration_id.clone(),
            sql_hash: None,
            status: "present".into(),
            recorded_at: now.to_owned(),
        };
        sqlx::query(include_str!("../../queries/storage/insert_object.sql"))
            .bind(&rec.id)
            .bind(&rec.namespace_id)
            .bind(&rec.object_name)
            .bind(&rec.object_type)
            .bind(&rec.created_by_migration_id)
            .bind(&rec.sql_hash)
            .bind(&rec.status)
            .bind(&rec.recorded_at)
            .execute(&mut **tx)
            .await?;
        count += 1;
    }
    Ok(count)
}

async fn apply_host_migration_for_dry_run(
    pool: &sqlx::SqlitePool,
    sql: &str,
) -> Result<(), StorageError> {
    for statement in sql.split(';') {
        let trimmed = statement.trim();
        if trimmed.is_empty() {
            continue;
        }
        if let Err(e) = sqlx::query(trimmed).execute(pool).await
            && !e.to_string().contains("duplicate column")
        {
            return Err(StorageError::DryRunFailed {
                detail: format!("host migration failed: {e}"),
            });
        }
    }
    Ok(())
}
