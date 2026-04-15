use super::*;

async fn setup_db() -> SqliteDatabase {
    SqliteDatabase::new("sqlite::memory:").await.unwrap()
}

fn make_namespace(id: &str, ext_id: &str) -> NamespaceRecord {
    NamespaceRecord {
        id: id.into(),
        extension_id: ext_id.into(),
        extension_version_first_seen: "1.0.0".into(),
        namespace_alias: "test_ns".into(),
        effective_prefix: format!("ext_{id}_"),
        engine: "sqlite".into(),
        storage_spec_version: "0.1".into(),
        sql_profile: "nexus_sqlite_v1".into(),
        status: "reserved".into(),
        uninstall_policy: "retain".into(),
        created_at: "2026-01-01T00:00:00Z".into(),
        updated_at: "2026-01-01T00:00:00Z".into(),
    }
}

fn make_migration(id: &str, ns_id: &str, mig_id: &str) -> MigrationRecord {
    MigrationRecord {
        id: id.into(),
        namespace_id: ns_id.into(),
        extension_id: "test.ext".into(),
        extension_version: "1.0.0".into(),
        migration_id: mig_id.into(),
        path: "migrations/001_init.sql".into(),
        raw_checksum_sha256: "abc123".into(),
        expanded_checksum_sha256: "def456".into(),
        status: "planned".into(),
        applied_at: None,
        error_json: None,
    }
}

fn make_object(id: &str, ns_id: &str) -> ObjectRecord {
    ObjectRecord {
        id: id.into(),
        namespace_id: ns_id.into(),
        object_name: format!("ext_{ns_id}_items"),
        object_type: "table".into(),
        created_by_migration_id: "mig-1".into(),
        sql_hash: Some("hash123".into()),
        status: "present".into(),
        recorded_at: "2026-01-01T00:00:00Z".into(),
    }
}

#[tokio::test]
async fn namespace_insert_and_read() {
    let db = setup_db().await;
    let ns = make_namespace("ns-1", "test.ext");

    db.insert_namespace(&ns).await.unwrap();

    let fetched = db.get_namespace("ns-1").await.unwrap();
    assert_eq!(fetched.id, "ns-1");
    assert_eq!(fetched.extension_id, "test.ext");
    assert_eq!(fetched.status, "reserved");
}

#[tokio::test]
async fn namespace_list_and_by_extension() {
    let db = setup_db().await;
    let ns = make_namespace("ns-1", "test.ext");
    db.insert_namespace(&ns).await.unwrap();

    let all = db.list_namespaces().await.unwrap();
    assert_eq!(all.len(), 1);

    let by_ext = db.get_namespace_by_extension("test.ext").await.unwrap();
    assert!(by_ext.is_some());
    assert_eq!(by_ext.unwrap().id, "ns-1");

    let missing = db.get_namespace_by_extension("no.such").await.unwrap();
    assert!(missing.is_none());
}

#[tokio::test]
async fn namespace_update_status() {
    let db = setup_db().await;
    let ns = make_namespace("ns-1", "test.ext");
    db.insert_namespace(&ns).await.unwrap();

    db.update_namespace_status("ns-1", "active").await.unwrap();

    let fetched = db.get_namespace("ns-1").await.unwrap();
    assert_eq!(fetched.status, "active");
}

#[tokio::test]
async fn migration_insert_and_list() {
    let db = setup_db().await;
    let ns = make_namespace("ns-1", "test.ext");
    db.insert_namespace(&ns).await.unwrap();

    let mig = make_migration("m-1", "ns-1", "001_init");
    db.insert_migration_record(&mig).await.unwrap();

    let migrations = db.list_migrations_for_namespace("ns-1").await.unwrap();
    assert_eq!(migrations.len(), 1);
    assert_eq!(migrations[0].migration_id, "001_init");

    let found = db.get_migration_record("ns-1", "001_init").await.unwrap();
    assert!(found.is_some());

    let missing = db.get_migration_record("ns-1", "999_nope").await.unwrap();
    assert!(missing.is_none());
}

#[tokio::test]
async fn object_insert_list_and_update() {
    let db = setup_db().await;
    let ns = make_namespace("ns-1", "test.ext");
    db.insert_namespace(&ns).await.unwrap();

    let obj = make_object("obj-1", "ns-1");
    db.insert_object_record(&obj).await.unwrap();

    let objects = db.list_objects_for_namespace("ns-1").await.unwrap();
    assert_eq!(objects.len(), 1);
    assert_eq!(objects[0].object_type, "table");

    db.update_object_status("obj-1", "dropped").await.unwrap();

    let objects = db.list_objects_for_namespace("ns-1").await.unwrap();
    assert_eq!(objects[0].status, "dropped");
}

#[tokio::test]
async fn operation_insert_and_update() {
    let db = setup_db().await;
    let ns = make_namespace("ns-1", "test.ext");
    db.insert_namespace(&ns).await.unwrap();

    let op = OperationRecord {
        id: "op-1".into(),
        namespace_id: "ns-1".into(),
        operation_type: "apply".into(),
        status: "started".into(),
        plan_json: Some(r#"{"action":"new_install"}"#.into()),
        result_json: None,
        started_at: "2026-01-01T00:00:00Z".into(),
        completed_at: None,
    };
    db.insert_operation(&op).await.unwrap();

    db.update_operation(
        "op-1",
        "completed",
        Some(r#"{"ok":true}"#),
        Some("2026-01-01T00:01:00Z"),
    )
    .await
    .unwrap();
}

#[tokio::test]
async fn archive_insert_and_list() {
    let db = setup_db().await;
    let ns = make_namespace("ns-1", "test.ext");
    db.insert_namespace(&ns).await.unwrap();

    let archive = ArchiveRecord {
        id: "arc-1".into(),
        namespace_id: "ns-1".into(),
        archive_format: "jsonl_zip".into(),
        archive_path: "/tmp/archive.zip".into(),
        content_hash: "sha256abc".into(),
        table_count: 3,
        row_count: 42,
        created_at: "2026-01-01T00:00:00Z".into(),
    };
    db.insert_archive(&archive).await.unwrap();

    let archives = db.list_archives_for_namespace("ns-1").await.unwrap();
    assert_eq!(archives.len(), 1);
    assert_eq!(archives[0].archive_format, "jsonl_zip");
    assert_eq!(archives[0].table_count, 3);
    assert_eq!(archives[0].row_count, 42);
}
