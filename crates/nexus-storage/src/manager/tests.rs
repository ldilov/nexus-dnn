use super::*;
use crate::database::Database;
use crate::records::NamespaceRecord;

async fn setup() -> (Arc<SqliteDatabase>, StorageManager) {
    let db = Arc::new(SqliteDatabase::new("sqlite::memory:").await.unwrap());
    let manager = StorageManager::new(Arc::clone(&db));
    (db, manager)
}

#[tokio::test]
async fn builder_threads_all_options_through_to_struct() {
    let db = Arc::new(SqliteDatabase::new("sqlite::memory:").await.unwrap());
    let dir = std::path::PathBuf::from("/tmp/builder-test");
    let manager = StorageManager::builder(Arc::clone(&db))
        .data_dir(dir.clone())
        .quarantine_threshold(7)
        .build();
    assert_eq!(manager.data_dir.as_ref(), Some(&dir));
    assert_eq!(manager.quarantine_threshold, 7);
    assert!(manager.event_bus.is_none());
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
        expanded_sql: "CREATE TABLE ext_test_ns_items (id TEXT PRIMARY KEY, name TEXT);".into(),
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
    let sql = vec!["CREATE TABLE ext_test_ns_items (id TEXT PRIMARY KEY);".to_owned()];
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
        expanded_sql: "CREATE TABLE ext_test_ns_items (id TEXT PRIMARY KEY, name TEXT);".into(),
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
    assert_eq!(ns.status, "retained");
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
    assert!(
        report
            .objects_missing
            .contains(&"ext_test_ns_items".to_owned())
    );

    let ns = db.get_namespace("ns-1").await.unwrap();
    assert_eq!(ns.status, "repair_required");

    let objects = db.list_objects_for_namespace("ns-1").await.unwrap();
    assert!(objects.iter().any(|o| o.status == "drifted"));
}

#[tokio::test]
async fn duplicate_effective_prefix_rejected() {
    let (_db, manager) = setup().await;

    let ns1 = make_namespace_record("ns-1", "ext.alpha", "ext_test_ns_");
    manager.reserve_namespace(&ns1).await.unwrap();

    let ns2 = NamespaceRecord {
        id: "ns-2".into(),
        extension_id: "ext.beta".into(),
        extension_version_first_seen: "1.0.0".into(),
        namespace_alias: "test_ns".into(),
        effective_prefix: "ext_test_ns_".into(),
        engine: "sqlite".into(),
        storage_spec_version: "0.1".into(),
        sql_profile: "nexus_sqlite_v1".into(),
        status: "reserved".into(),
        uninstall_policy: "retain".into(),
        created_at: "2026-01-01T00:00:00Z".into(),
        updated_at: "2026-01-01T00:00:00Z".into(),
    };

    let result = manager.reserve_namespace(&ns2).await;
    assert!(result.is_err());
}

#[tokio::test]
async fn quarantine_after_threshold_failures() {
    let (db, manager) = setup().await;
    let ns = make_namespace_record("ns-q", "test.ext", "ext_q_");
    manager.reserve_namespace(&ns).await.unwrap();

    let bad_migration = vec![MigrationInput {
        record_id: "mig-bad".into(),
        namespace_id: "ns-q".into(),
        extension_id: "test.ext".into(),
        extension_version: "1.0.0".into(),
        migration_id: "001_bad".into(),
        path: "storage/migrations/001_bad.sql".into(),
        raw_checksum: "abc".into(),
        expanded_checksum: "def".into(),
        expanded_sql: "INVALID SQL STATEMENT".into(),
        objects: vec![],
    }];

    for _ in 0..3 {
        let _ = manager
            .apply_plan("ns-q", "new_install", &bad_migration)
            .await;
    }

    let ns_record = db.get_namespace("ns-q").await.unwrap();
    assert_eq!(ns_record.status, "quarantined_storage");
}

#[tokio::test]
async fn update_namespace_policy_changes_record() {
    let (db, manager) = setup().await;
    let ns = make_namespace_record("ns-pol", "test.ext", "ext_pol_");
    manager.reserve_namespace(&ns).await.unwrap();

    let before = db.get_namespace("ns-pol").await.unwrap();
    assert_eq!(before.uninstall_policy, "retain");

    manager
        .update_namespace_policy("ns-pol", "drop_namespace_objects")
        .await
        .unwrap();

    let after = db.get_namespace("ns-pol").await.unwrap();
    assert_eq!(after.uninstall_policy, "drop_namespace_objects");
    assert_ne!(after.updated_at, before.updated_at);
}
