use std::path::PathBuf;
use std::sync::Arc;

use crate::database::Database;
use crate::error::StorageError;
use crate::records::{ArchiveRecord, MigrationRecord, NamespaceRecord, ObjectRecord};
use crate::sqlite::SqliteDatabase;

pub struct UninstallReport {
    pub namespace_id: String,
    pub policy_executed: String,
    pub objects_dropped: usize,
    pub archive_path: Option<String>,
}

#[derive(Debug, Clone)]
pub struct IntegrityReport {
    pub namespace_id: String,
    pub status: String,
    pub objects_verified: usize,
    pub objects_missing: Vec<String>,
    pub objects_unexpected: Vec<String>,
}

pub struct StorageManager {
    db: Arc<SqliteDatabase>,
    data_dir: Option<PathBuf>,
}

#[derive(Debug, Clone)]
pub struct ApplyReport {
    pub namespace_id: String,
    pub action: String,
    pub migrations_applied: usize,
    pub objects_created: usize,
    pub status: String,
}

#[derive(Debug, Clone)]
pub struct MigrationInput {
    pub record_id: String,
    pub namespace_id: String,
    pub extension_id: String,
    pub extension_version: String,
    pub migration_id: String,
    pub path: String,
    pub raw_checksum: String,
    pub expanded_checksum: String,
    pub expanded_sql: String,
    pub objects: Vec<ObjectInput>,
}

#[derive(Debug, Clone)]
pub struct ObjectInput {
    pub record_id: String,
    pub object_name: String,
    pub object_type: String,
    pub migration_id: String,
}

impl StorageManager {
    pub fn new(db: Arc<SqliteDatabase>) -> Self {
        Self { db, data_dir: None }
    }

    pub fn with_data_dir(db: Arc<SqliteDatabase>, data_dir: PathBuf) -> Self {
        Self {
            db,
            data_dir: Some(data_dir),
        }
    }

    pub fn db(&self) -> &SqliteDatabase {
        &self.db
    }

    pub async fn reserve_namespace(
        &self,
        record: &NamespaceRecord,
    ) -> Result<(), StorageError> {
        let prefix_pattern = format!("{}%", record.effective_prefix);
        let collision: Option<(String,)> = sqlx::query_as(
            "SELECT name FROM sqlite_master WHERE type IN ('table', 'index') AND name LIKE ?1 \
             AND name NOT IN (SELECT object_name FROM extension_storage_objects)",
        )
        .bind(&prefix_pattern)
        .fetch_optional(self.db.pool())
        .await?;

        if let Some((colliding_name,)) = collision {
            return Err(StorageError::NamespaceCollision {
                prefix: format!(
                    "{} (collides with existing object '{colliding_name}')",
                    record.effective_prefix
                ),
            });
        }

        self.db.insert_namespace(record).await
    }

    pub async fn apply_plan(
        &self,
        namespace_id: &str,
        action: &str,
        migrations: &[MigrationInput],
    ) -> Result<ApplyReport, StorageError> {
        use sqlx::Executor;

        let pool = self.db.pool();
        let mut tx = pool.begin().await?;

        let mut applied_count = 0;
        let mut objects_count = 0;

        for migration in migrations {
            let savepoint_name = format!("sp_{}", migration.migration_id);
            tx.execute(
                sqlx::query(&format!("SAVEPOINT {savepoint_name}"))
            )
            .await
            .map_err(|e| StorageError::ApplyFailed {
                detail: format!("SAVEPOINT failed for {}: {e}", migration.migration_id),
            })?;

            let exec_result = tx.execute(sqlx::query(&migration.expanded_sql)).await;

            match exec_result {
                Ok(_) => {
                    let now = chrono_now();
                    let mig_record = MigrationRecord {
                        id: migration.record_id.clone(),
                        namespace_id: migration.namespace_id.clone(),
                        extension_id: migration.extension_id.clone(),
                        extension_version: migration.extension_version.clone(),
                        migration_id: migration.migration_id.clone(),
                        path: migration.path.clone(),
                        raw_checksum_sha256: migration.raw_checksum.clone(),
                        expanded_checksum_sha256: migration.expanded_checksum.clone(),
                        status: "applied".into(),
                        applied_at: Some(now.clone()),
                        error_json: None,
                    };
                    sqlx::query(
                        "INSERT INTO extension_storage_migrations (id, namespace_id, \
                         extension_id, extension_version, migration_id, path, \
                         raw_checksum_sha256, expanded_checksum_sha256, status, applied_at, \
                         error_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    )
                    .bind(&mig_record.id)
                    .bind(&mig_record.namespace_id)
                    .bind(&mig_record.extension_id)
                    .bind(&mig_record.extension_version)
                    .bind(&mig_record.migration_id)
                    .bind(&mig_record.path)
                    .bind(&mig_record.raw_checksum_sha256)
                    .bind(&mig_record.expanded_checksum_sha256)
                    .bind(&mig_record.status)
                    .bind(&mig_record.applied_at)
                    .bind(&mig_record.error_json)
                    .execute(&mut *tx)
                    .await?;

                    for obj in &migration.objects {
                        let obj_record = ObjectRecord {
                            id: obj.record_id.clone(),
                            namespace_id: migration.namespace_id.clone(),
                            object_name: obj.object_name.clone(),
                            object_type: obj.object_type.clone(),
                            created_by_migration_id: obj.migration_id.clone(),
                            sql_hash: None,
                            status: "present".into(),
                            recorded_at: now.clone(),
                        };
                        sqlx::query(
                            "INSERT INTO extension_storage_objects (id, namespace_id, \
                             object_name, object_type, created_by_migration_id, sql_hash, \
                             status, recorded_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                        )
                        .bind(&obj_record.id)
                        .bind(&obj_record.namespace_id)
                        .bind(&obj_record.object_name)
                        .bind(&obj_record.object_type)
                        .bind(&obj_record.created_by_migration_id)
                        .bind(&obj_record.sql_hash)
                        .bind(&obj_record.status)
                        .bind(&obj_record.recorded_at)
                        .execute(&mut *tx)
                        .await?;
                        objects_count += 1;
                    }

                    tx.execute(
                        sqlx::query(&format!("RELEASE {savepoint_name}"))
                    )
                    .await
                    .map_err(|e| StorageError::ApplyFailed {
                        detail: format!("RELEASE failed for {}: {e}", migration.migration_id),
                    })?;
                    applied_count += 1;
                }
                Err(e) => {
                    let _ = tx.execute(
                        sqlx::query(&format!("ROLLBACK TO {savepoint_name}"))
                    )
                    .await;
                    tx.rollback().await?;
                    return Err(StorageError::ApplyFailed {
                        detail: format!(
                            "migration '{}' failed: {e}",
                            migration.migration_id
                        ),
                    });
                }
            }
        }

        sqlx::query("UPDATE extension_storage_namespaces SET status = 'active' WHERE id = ?")
            .bind(namespace_id)
            .execute(&mut *tx)
            .await?;

        tx.commit().await?;

        Ok(ApplyReport {
            namespace_id: namespace_id.to_owned(),
            action: action.to_owned(),
            migrations_applied: applied_count,
            objects_created: objects_count,
            status: "active".into(),
        })
    }

    pub async fn validate_dry_run(
        &self,
        migrations_sql: &[String],
    ) -> Result<(), StorageError> {
        let temp_pool =
            sqlx::sqlite::SqlitePool::connect("sqlite::memory:").await.map_err(|e| {
                StorageError::DryRunFailed {
                    detail: format!("failed to create in-memory DB: {e}"),
                }
            })?;

        let host_migrations = [
            include_str!("../../../migrations/001_initial.sql"),
            include_str!("../../../migrations/002_recipes_contributions.sql"),
            include_str!("../../../migrations/003_extension_storage.sql"),
        ];
        for host_mig in &host_migrations {
            for statement in host_mig.split(';') {
                let trimmed = statement.trim();
                if trimmed.is_empty() {
                    continue;
                }
                let result = sqlx::query(trimmed).execute(&temp_pool).await;
                if let Err(e) = result {
                    let msg = e.to_string();
                    if !msg.contains("duplicate column") {
                        return Err(StorageError::DryRunFailed {
                            detail: format!("host migration failed: {e}"),
                        });
                    }
                }
            }
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

    pub async fn uninstall_namespace(
        &self,
        namespace_id: &str,
        policy: &str,
    ) -> Result<UninstallReport, StorageError> {
        match policy {
            "retain" => self.uninstall_retain(namespace_id).await,
            "drop_namespace_objects" => self.uninstall_drop(namespace_id).await,
            "archive_then_drop" => self.uninstall_archive_then_drop(namespace_id).await,
            other => Err(StorageError::ApplyFailed {
                detail: format!("unknown uninstall policy: {other}"),
            }),
        }
    }

    async fn uninstall_retain(
        &self,
        namespace_id: &str,
    ) -> Result<UninstallReport, StorageError> {
        self.db
            .update_namespace_status(namespace_id, "uninstalled_retain")
            .await?;

        Ok(UninstallReport {
            namespace_id: namespace_id.to_owned(),
            policy_executed: "retain".to_owned(),
            objects_dropped: 0,
            archive_path: None,
        })
    }

    async fn uninstall_drop(
        &self,
        namespace_id: &str,
    ) -> Result<UninstallReport, StorageError> {
        let objects = self.db.list_objects_for_namespace(namespace_id).await?;

        let mut tables: Vec<&ObjectRecord> = objects
            .iter()
            .filter(|o| o.object_type == "table" && o.status == "present")
            .collect();
        let indexes: Vec<&ObjectRecord> = objects
            .iter()
            .filter(|o| o.object_type == "index" && o.status == "present")
            .collect();

        tables.reverse();

        let pool = self.db.pool();
        let mut dropped = 0;

        for idx in &indexes {
            let sql = format!("DROP INDEX IF EXISTS {}", idx.object_name);
            sqlx::query(&sql).execute(pool).await.map_err(|e| {
                StorageError::ApplyFailed {
                    detail: format!("failed to drop index {}: {e}", idx.object_name),
                }
            })?;
            self.db.update_object_status(&idx.id, "dropped").await?;
            dropped += 1;
        }

        for tbl in &tables {
            let sql = format!("DROP TABLE IF EXISTS {}", tbl.object_name);
            sqlx::query(&sql).execute(pool).await.map_err(|e| {
                StorageError::ApplyFailed {
                    detail: format!("failed to drop table {}: {e}", tbl.object_name),
                }
            })?;
            self.db.update_object_status(&tbl.id, "dropped").await?;
            dropped += 1;
        }

        self.db
            .update_namespace_status(namespace_id, "dropped")
            .await?;

        Ok(UninstallReport {
            namespace_id: namespace_id.to_owned(),
            policy_executed: "drop_namespace_objects".to_owned(),
            objects_dropped: dropped,
            archive_path: None,
        })
    }

    async fn uninstall_archive_then_drop(
        &self,
        namespace_id: &str,
    ) -> Result<UninstallReport, StorageError> {
        let objects = self.db.list_objects_for_namespace(namespace_id).await?;
        let tables: Vec<&ObjectRecord> = objects
            .iter()
            .filter(|o| o.object_type == "table" && o.status == "present")
            .collect();

        let archive_dir = self
            .data_dir
            .clone()
            .unwrap_or_else(|| PathBuf::from("."))
            .join("archives")
            .join(namespace_id);

        std::fs::create_dir_all(&archive_dir).map_err(|e| StorageError::ArchiveFailed {
            detail: format!("failed to create archive directory: {e}"),
        })?;

        let pool = self.db.pool();

        for tbl in &tables {
            let rows: Vec<(String,)> = sqlx::query_as(&format!(
                "SELECT json_object(*) FROM {}",
                tbl.object_name
            ))
            .fetch_all(pool)
            .await
            .unwrap_or_default();

            let json_lines: Vec<String> = rows.into_iter().map(|(row,)| row).collect();
            let file_path = archive_dir.join(format!("{}.json", tbl.object_name));
            let content = format!("[{}]", json_lines.join(",\n"));
            std::fs::write(&file_path, &content).map_err(|e| StorageError::ArchiveFailed {
                detail: format!("failed to write archive for {}: {e}", tbl.object_name),
            })?;

            let archive_record = ArchiveRecord {
                id: format!("archive-{}-{}", namespace_id, tbl.object_name),
                namespace_id: namespace_id.to_owned(),
                archive_format: "json".to_owned(),
                archive_path: file_path.to_string_lossy().to_string(),
                content_hash: sha256_bytes(content.as_bytes()),
                created_at: chrono_now(),
            };
            self.db.insert_archive(&archive_record).await?;
        }

        let archive_path_str = archive_dir.to_string_lossy().to_string();
        let drop_report = self.uninstall_drop(namespace_id).await?;

        Ok(UninstallReport {
            namespace_id: namespace_id.to_owned(),
            policy_executed: "archive_then_drop".to_owned(),
            objects_dropped: drop_report.objects_dropped,
            archive_path: Some(archive_path_str),
        })
    }

    pub async fn verify_namespace(
        &self,
        namespace_id: &str,
    ) -> Result<IntegrityReport, StorageError> {
        let ns = self.db.get_namespace(namespace_id).await?;
        let prefix_pattern = format!("{}%", ns.effective_prefix);

        let actual_objects: Vec<(String, String)> = sqlx::query_as(
            "SELECT name, type FROM sqlite_master \
             WHERE name LIKE ?1 AND type IN ('table', 'index')",
        )
        .bind(&prefix_pattern)
        .fetch_all(self.db.pool())
        .await?;

        let recorded_objects = self.db.list_objects_for_namespace(namespace_id).await?;
        let present_objects: Vec<&ObjectRecord> = recorded_objects
            .iter()
            .filter(|o| o.status == "present")
            .collect();

        let actual_names: std::collections::HashSet<String> =
            actual_objects.iter().map(|(name, _)| name.clone()).collect();
        let recorded_names: std::collections::HashSet<String> =
            present_objects.iter().map(|o| o.object_name.clone()).collect();

        let missing: Vec<String> = recorded_names
            .difference(&actual_names)
            .cloned()
            .collect();
        let unexpected: Vec<String> = actual_names
            .difference(&recorded_names)
            .cloned()
            .collect();

        for obj in &present_objects {
            if missing.contains(&obj.object_name) {
                self.db.update_object_status(&obj.id, "drifted").await?;
            }
        }

        let status = if missing.is_empty() {
            "healthy".to_owned()
        } else {
            self.db
                .update_namespace_status(namespace_id, "repair_required")
                .await?;
            "repair_required".to_owned()
        };

        Ok(IntegrityReport {
            namespace_id: namespace_id.to_owned(),
            status,
            objects_verified: present_objects.len(),
            objects_missing: missing,
            objects_unexpected: unexpected,
        })
    }
}

fn sha256_bytes(data: &[u8]) -> String {
    use sha2::{Digest, Sha256};
    let mut hasher = Sha256::new();
    hasher.update(data);
    format!("{:x}", hasher.finalize())
}

fn chrono_now() -> String {
    let now = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap_or_default();
    format!("{}Z", now.as_secs())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::database::Database;

    async fn setup() -> (Arc<SqliteDatabase>, StorageManager) {
        let db = Arc::new(SqliteDatabase::new("sqlite::memory:").await.unwrap());
        let manager = StorageManager::new(Arc::clone(&db));
        (db, manager)
    }

    fn make_namespace_record(id: &str, ext_id: &str, prefix: &str) -> NamespaceRecord {
        NamespaceRecord {
            id: id.into(),
            extension_id: ext_id.into(),
            extension_version_first_seen: "1.0.0".into(),
            namespace_alias: "test_ns".into(),
            effective_prefix: prefix.into(),
            engine: "sqlite".into(),
            storage_spec_version: "0.1".into(),
            sql_profile: "nexus_sqlite_v1".into(),
            status: "reserved".into(),
            uninstall_policy: "retain".into(),
            created_at: "2026-01-01T00:00:00Z".into(),
            updated_at: "2026-01-01T00:00:00Z".into(),
        }
    }

    #[tokio::test]
    async fn reserve_namespace_succeeds() {
        let (_db, manager) = setup().await;
        let ns = make_namespace_record("ns-1", "test.ext", "ext_test_ns_");
        let result = manager.reserve_namespace(&ns).await;
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn apply_plan_creates_tables_and_records() {
        let (db, manager) = setup().await;
        let ns = make_namespace_record("ns-1", "test.ext", "ext_test_ns_");
        manager.reserve_namespace(&ns).await.unwrap();

        let migrations = vec![MigrationInput {
            record_id: "mig-rec-1".into(),
            namespace_id: "ns-1".into(),
            extension_id: "test.ext".into(),
            extension_version: "1.0.0".into(),
            migration_id: "001_init".into(),
            path: "storage/migrations/001_init.sql".into(),
            raw_checksum: "abc123".into(),
            expanded_checksum: "def456".into(),
            expanded_sql: "CREATE TABLE ext_test_ns_items (id TEXT PRIMARY KEY, name TEXT);"
                .into(),
            objects: vec![ObjectInput {
                record_id: "obj-1".into(),
                object_name: "ext_test_ns_items".into(),
                object_type: "table".into(),
                migration_id: "001_init".into(),
            }],
        }];

        let report = manager
            .apply_plan("ns-1", "new_install", &migrations)
            .await
            .unwrap();
        assert_eq!(report.migrations_applied, 1);
        assert_eq!(report.objects_created, 1);
        assert_eq!(report.status, "active");

        let ns_record = db.get_namespace("ns-1").await.unwrap();
        assert_eq!(ns_record.status, "active");

        let mig_records = db.list_migrations_for_namespace("ns-1").await.unwrap();
        assert_eq!(mig_records.len(), 1);
        assert_eq!(mig_records[0].status, "applied");

        let obj_records = db.list_objects_for_namespace("ns-1").await.unwrap();
        assert_eq!(obj_records.len(), 1);
        assert_eq!(obj_records[0].object_name, "ext_test_ns_items");
    }

    #[tokio::test]
    async fn apply_plan_rolls_back_on_failure() {
        let (db, manager) = setup().await;
        let ns = make_namespace_record("ns-1", "test.ext", "ext_test_ns_");
        manager.reserve_namespace(&ns).await.unwrap();

        let migrations = vec![MigrationInput {
            record_id: "mig-rec-1".into(),
            namespace_id: "ns-1".into(),
            extension_id: "test.ext".into(),
            extension_version: "1.0.0".into(),
            migration_id: "001_init".into(),
            path: "storage/migrations/001_init.sql".into(),
            raw_checksum: "abc123".into(),
            expanded_checksum: "def456".into(),
            expanded_sql: "INVALID SQL STATEMENT HERE".into(),
            objects: vec![],
        }];

        let result = manager.apply_plan("ns-1", "new_install", &migrations).await;
        assert!(result.is_err());

        let ns_record = db.get_namespace("ns-1").await.unwrap();
        assert_eq!(ns_record.status, "reserved");
    }

    #[tokio::test]
    async fn dry_run_validates_without_affecting_real_db() {
        let (_db, manager) = setup().await;
        let sql = vec![
            "CREATE TABLE ext_test_ns_items (id TEXT PRIMARY KEY);".to_owned(),
        ];
        let result = manager.validate_dry_run(&sql).await;
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn dry_run_fails_on_invalid_sql() {
        let (_db, manager) = setup().await;
        let sql = vec!["COMPLETELY INVALID SQL".to_owned()];
        let result = manager.validate_dry_run(&sql).await;
        assert!(result.is_err());
    }

    async fn setup_with_applied_namespace() -> (Arc<SqliteDatabase>, StorageManager) {
        let (db, manager) = setup().await;
        let ns = make_namespace_record("ns-1", "test.ext", "ext_test_ns_");
        manager.reserve_namespace(&ns).await.unwrap();

        let migrations = vec![MigrationInput {
            record_id: "mig-rec-1".into(),
            namespace_id: "ns-1".into(),
            extension_id: "test.ext".into(),
            extension_version: "1.0.0".into(),
            migration_id: "001_init".into(),
            path: "storage/migrations/001_init.sql".into(),
            raw_checksum: "abc123".into(),
            expanded_checksum: "def456".into(),
            expanded_sql: "CREATE TABLE ext_test_ns_items (id TEXT PRIMARY KEY, name TEXT);"
                .into(),
            objects: vec![ObjectInput {
                record_id: "obj-1".into(),
                object_name: "ext_test_ns_items".into(),
                object_type: "table".into(),
                migration_id: "001_init".into(),
            }],
        }];

        manager
            .apply_plan("ns-1", "new_install", &migrations)
            .await
            .unwrap();

        (db, manager)
    }

    #[tokio::test]
    async fn disable_extension_tables_remain() {
        let (db, _manager) = setup_with_applied_namespace().await;

        db.update_namespace_status("ns-1", "active").await.unwrap();

        let table_exists: Option<(String,)> = sqlx::query_as(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='ext_test_ns_items'",
        )
        .fetch_optional(db.pool())
        .await
        .unwrap();
        assert!(table_exists.is_some());

        let ns = db.get_namespace("ns-1").await.unwrap();
        assert_eq!(ns.status, "active");
    }

    #[tokio::test]
    async fn uninstall_retain_keeps_objects() {
        let (db, manager) = setup_with_applied_namespace().await;

        let report = manager.uninstall_namespace("ns-1", "retain").await.unwrap();
        assert_eq!(report.policy_executed, "retain");
        assert_eq!(report.objects_dropped, 0);

        let table_exists: Option<(String,)> = sqlx::query_as(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='ext_test_ns_items'",
        )
        .fetch_optional(db.pool())
        .await
        .unwrap();
        assert!(table_exists.is_some());

        let ns = db.get_namespace("ns-1").await.unwrap();
        assert_eq!(ns.status, "uninstalled_retain");
    }

    #[tokio::test]
    async fn uninstall_drop_removes_objects() {
        let (db, manager) = setup_with_applied_namespace().await;

        let report = manager
            .uninstall_namespace("ns-1", "drop_namespace_objects")
            .await
            .unwrap();
        assert_eq!(report.policy_executed, "drop_namespace_objects");
        assert_eq!(report.objects_dropped, 1);

        let table_exists: Option<(String,)> = sqlx::query_as(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='ext_test_ns_items'",
        )
        .fetch_optional(db.pool())
        .await
        .unwrap();
        assert!(table_exists.is_none());

        let ns = db.get_namespace("ns-1").await.unwrap();
        assert_eq!(ns.status, "dropped");

        let objects = db.list_objects_for_namespace("ns-1").await.unwrap();
        assert!(objects.iter().all(|o| o.status == "dropped"));
    }

    #[tokio::test]
    async fn uninstall_archive_then_drop_creates_archive_and_drops() {
        let tmp = tempfile::tempdir().unwrap();
        let (db, _) = setup().await;

        let manager = StorageManager::with_data_dir(Arc::clone(&db), tmp.path().to_path_buf());

        let ns = make_namespace_record("ns-1", "test.ext", "ext_test_ns_");
        manager.reserve_namespace(&ns).await.unwrap();

        let migrations = vec![MigrationInput {
            record_id: "mig-rec-1".into(),
            namespace_id: "ns-1".into(),
            extension_id: "test.ext".into(),
            extension_version: "1.0.0".into(),
            migration_id: "001_init".into(),
            path: "storage/migrations/001_init.sql".into(),
            raw_checksum: "abc123".into(),
            expanded_checksum: "def456".into(),
            expanded_sql: "CREATE TABLE ext_test_ns_items (id TEXT PRIMARY KEY, name TEXT);"
                .into(),
            objects: vec![ObjectInput {
                record_id: "obj-1".into(),
                object_name: "ext_test_ns_items".into(),
                object_type: "table".into(),
                migration_id: "001_init".into(),
            }],
        }];

        manager
            .apply_plan("ns-1", "new_install", &migrations)
            .await
            .unwrap();

        let report = manager
            .uninstall_namespace("ns-1", "archive_then_drop")
            .await
            .unwrap();
        assert_eq!(report.policy_executed, "archive_then_drop");
        assert!(report.archive_path.is_some());
        assert!(report.objects_dropped > 0);

        let archive_path = std::path::Path::new(report.archive_path.as_ref().unwrap());
        assert!(archive_path.exists());

        let archive_file = archive_path.join("ext_test_ns_items.json");
        assert!(archive_file.exists());

        let table_exists: Option<(String,)> = sqlx::query_as(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='ext_test_ns_items'",
        )
        .fetch_optional(db.pool())
        .await
        .unwrap();
        assert!(table_exists.is_none());
    }

    #[tokio::test]
    async fn verify_healthy_namespace() {
        let (_db, manager) = setup_with_applied_namespace().await;

        let report = manager.verify_namespace("ns-1").await.unwrap();
        assert_eq!(report.status, "healthy");
        assert_eq!(report.objects_verified, 1);
        assert!(report.objects_missing.is_empty());
    }

    #[tokio::test]
    async fn verify_drift_detected_when_table_dropped() {
        let (db, manager) = setup_with_applied_namespace().await;

        sqlx::query("DROP TABLE ext_test_ns_items")
            .execute(db.pool())
            .await
            .unwrap();

        let report = manager.verify_namespace("ns-1").await.unwrap();
        assert_eq!(report.status, "repair_required");
        assert!(report.objects_missing.contains(&"ext_test_ns_items".to_owned()));

        let ns = db.get_namespace("ns-1").await.unwrap();
        assert_eq!(ns.status, "repair_required");

        let objects = db.list_objects_for_namespace("ns-1").await.unwrap();
        assert!(objects.iter().any(|o| o.status == "drifted"));
    }
}
