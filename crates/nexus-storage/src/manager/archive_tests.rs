use super::*;
use crate::database::Database;
use crate::records::NamespaceRecord;

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
async fn uninstall_archive_then_drop_creates_archive_and_drops() {
    use std::io::Read;

    let tmp = tempfile::tempdir().unwrap();
    let (db, _) = setup().await;

    let manager = StorageManager::builder(Arc::clone(&db))
        .data_dir(tmp.path().to_path_buf())
        .build();

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

    sqlx::query("INSERT INTO ext_test_ns_items (id, name) VALUES ('row1', 'Alice')")
        .execute(db.pool())
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
    assert!(archive_path.extension().is_some_and(|ext| ext == "zip"));

    let zip_file = std::fs::File::open(archive_path).unwrap();
    let mut archive = zip::ZipArchive::new(zip_file).unwrap();
    assert_eq!(archive.len(), 1);

    let mut entry = archive.by_name("ext_test_ns_items.jsonl").unwrap();
    let mut contents = String::new();
    entry.read_to_string(&mut contents).unwrap();
    assert!(contents.contains("Alice"));

    let archives = db.list_archives_for_namespace("ns-1").await.unwrap();
    assert_eq!(archives.len(), 1);
    assert_eq!(archives[0].archive_format, "jsonl_zip");
    assert_eq!(archives[0].table_count, 1);
    assert_eq!(archives[0].row_count, 1);

    let table_exists: Option<(String,)> = sqlx::query_as(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='ext_test_ns_items'",
    )
    .fetch_optional(db.pool())
    .await
    .unwrap();
    assert!(table_exists.is_none());
}
