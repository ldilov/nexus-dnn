use nexus_storage::{Database, SqliteDatabase, WorkflowRecord, WorkflowVersionRecord};

async fn fresh_db() -> SqliteDatabase {
    SqliteDatabase::new("sqlite::memory:").await.unwrap()
}

fn version_record(
    workflow_id: &str,
    version: &str,
    author_kind: &str,
    canonical_hash: &str,
) -> WorkflowVersionRecord {
    WorkflowVersionRecord {
        workflow_id: workflow_id.into(),
        version: version.into(),
        label: Some("1.0.0".into()),
        canonical_hash: canonical_hash.into(),
        operator_schema_hash: "ophash".into(),
        nodes: "[]".into(),
        edges: "[]".into(),
        inputs: Some("[]".into()),
        outputs: Some("[]".into()),
        stages: Some("[]".into()),
        author_kind: author_kind.into(),
        extension_id: None,
        extension_version: None,
        created_at: "2026-06-23T00:00:00Z".into(),
    }
}

fn make_workflow(id: &str) -> WorkflowRecord {
    WorkflowRecord {
        id: id.into(),
        title: "Sample".into(),
        version: "1.0.0".into(),
        inputs: Some("[]".into()),
        outputs: Some("[]".into()),
        nodes: "[]".into(),
        edges: "[]".into(),
        stages: Some("[]".into()),
        created_at: "2026-06-23T00:00:00Z".into(),
        updated_at: "2026-06-23T00:00:00Z".into(),
        user_edited_at: None,
        extension_id: None,
        extension_version: None,
        extension_version_first_seen: None,
    }
}

#[tokio::test]
async fn migration_026_creates_versions_table_and_current_version_column() {
    let db = fresh_db().await;

    let count: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM workflow_versions")
        .fetch_one(db.pool())
        .await
        .expect("workflow_versions table should exist after migration 026");
    assert_eq!(count, 0);

    sqlx::query("SELECT current_version FROM workflows")
        .fetch_all(db.pool())
        .await
        .expect("workflows.current_version column should exist after migration 026");
}

#[tokio::test]
async fn insert_and_list_workflow_versions_round_trip() {
    let db = fresh_db().await;
    db.insert_workflow_version(&version_record("wf1", "v1", "extension", "h1"))
        .await
        .unwrap();
    db.insert_workflow_version(&version_record("wf1", "v2", "user", "h2"))
        .await
        .unwrap();

    let versions = db.list_workflow_versions("wf1").await.unwrap();
    assert_eq!(versions.len(), 2);
    assert_eq!(versions[0].version, "v1");
    assert_eq!(versions[1].version, "v2");
    assert_eq!(versions[0].canonical_hash, "h1");
    assert_eq!(versions[0].label.as_deref(), Some("1.0.0"));
}

#[tokio::test]
async fn get_workflow_version_returns_record() {
    let db = fresh_db().await;
    db.insert_workflow_version(&version_record("wf1", "v1", "extension", "h1"))
        .await
        .unwrap();

    let v = db.get_workflow_version("wf1", "v1").await.unwrap();
    assert_eq!(v.canonical_hash, "h1");
    assert_eq!(v.author_kind, "extension");
}

#[tokio::test]
async fn get_workflow_version_missing_is_not_found() {
    let db = fresh_db().await;
    assert!(db.get_workflow_version("wf1", "v9").await.is_err());
}

#[tokio::test]
async fn latest_for_author_filters_by_author_kind() {
    let db = fresh_db().await;
    db.insert_workflow_version(&version_record("wf1", "v1", "user", "h1"))
        .await
        .unwrap();
    db.insert_workflow_version(&version_record("wf1", "v2", "extension", "h2"))
        .await
        .unwrap();

    let latest_ext = db
        .latest_workflow_version_for_author("wf1", "extension")
        .await
        .unwrap();
    let latest_user = db
        .latest_workflow_version_for_author("wf1", "user")
        .await
        .unwrap();
    assert_eq!(latest_ext.unwrap().version, "v2");
    assert_eq!(latest_user.unwrap().version, "v1");
}

#[tokio::test]
async fn count_workflow_versions_counts_all_authors() {
    let db = fresh_db().await;
    db.insert_workflow_version(&version_record("wf1", "v1", "user", "h1"))
        .await
        .unwrap();
    db.insert_workflow_version(&version_record("wf1", "v2", "extension", "h2"))
        .await
        .unwrap();
    db.insert_workflow_version(&version_record("wf-other", "v1", "user", "h3"))
        .await
        .unwrap();

    assert_eq!(db.count_workflow_versions("wf1").await.unwrap(), 2);
}

#[tokio::test]
async fn set_and_get_current_version_round_trip() {
    let db = fresh_db().await;
    db.insert_workflow(&make_workflow("wf1")).await.unwrap();
    assert_eq!(db.get_current_version("wf1").await.unwrap(), None);

    db.set_current_version("wf1", "v3", "2026-06-23T01:00:00Z")
        .await
        .unwrap();
    assert_eq!(
        db.get_current_version("wf1").await.unwrap(),
        Some("v3".to_string())
    );
}
