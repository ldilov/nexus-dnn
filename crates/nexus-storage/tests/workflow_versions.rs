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

#[tokio::test]
async fn set_current_version_errors_when_workflow_missing() {
    let db = fresh_db().await;
    assert!(
        db.set_current_version("nope", "v1", "t1").await.is_err(),
        "setting the head of a non-existent workflow must error, not silently no-op"
    );
}

#[tokio::test]
async fn append_workflow_version_allocates_sequential_and_sets_head() {
    let db = fresh_db().await;
    db.insert_workflow(&make_workflow("wf1")).await.unwrap();

    let v1 = db
        .append_workflow_version(&version_record("wf1", "-", "extension", "h1"), "t1")
        .await
        .unwrap();
    let v2 = db
        .append_workflow_version(&version_record("wf1", "-", "user", "h2"), "t2")
        .await
        .unwrap();

    assert_eq!(v1, "v1");
    assert_eq!(v2, "v2");
    assert_eq!(
        db.get_current_version("wf1").await.unwrap(),
        Some("v2".to_string())
    );
    assert_eq!(db.count_workflow_versions("wf1").await.unwrap(), 2);
}

#[tokio::test]
async fn append_workflow_version_rolls_back_when_workflow_row_missing() {
    let db = fresh_db().await;
    let res = db
        .append_workflow_version(&version_record("ghost", "-", "extension", "h1"), "t1")
        .await;

    assert!(
        res.is_err(),
        "append must fail when the head row is missing"
    );
    assert_eq!(
        db.count_workflow_versions("ghost").await.unwrap(),
        0,
        "the version insert must roll back when the head update affects no row"
    );
}

#[tokio::test]
async fn revert_head_to_version_rewrites_content_and_head_atomically() {
    let db = fresh_db().await;
    db.insert_workflow(&make_workflow("wf1")).await.unwrap();
    let mut ext = version_record("wf1", "v1", "extension", "h1");
    ext.nodes = r#"[{"id":"gen"}]"#.into();
    db.insert_workflow_version(&ext).await.unwrap();
    db.set_current_version("wf1", "v2", "t0").await.unwrap();

    db.revert_head_to_version(&ext, "2.0.0", "t9")
        .await
        .unwrap();

    let head = db.get_workflow("wf1").await.unwrap();
    assert_eq!(head.nodes, r#"[{"id":"gen"}]"#);
    assert_eq!(head.version, "2.0.0");
    assert!(head.user_edited_at.is_none());
    assert_eq!(
        db.get_current_version("wf1").await.unwrap(),
        Some("v1".to_string())
    );
}

#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
async fn concurrent_appends_allocate_distinct_versions() {
    let dir = tempfile::tempdir().unwrap();
    let url = format!(
        "sqlite:{}?mode=rwc",
        dir.path()
            .join("conc.db")
            .to_string_lossy()
            .replace('\\', "/")
    );
    let db = std::sync::Arc::new(SqliteDatabase::new(&url).await.unwrap());
    db.insert_workflow(&make_workflow("wf1")).await.unwrap();

    let mut handles = Vec::new();
    for i in 0..8 {
        let dbc = db.clone();
        handles.push(tokio::spawn(async move {
            dbc.append_workflow_version(
                &version_record("wf1", "-", "extension", &format!("h{i}")),
                "t",
            )
            .await
        }));
    }

    let mut versions = std::collections::HashSet::new();
    for h in handles {
        versions.insert(
            h.await
                .unwrap()
                .expect("no PRIMARY KEY collision under concurrency"),
        );
    }

    assert_eq!(
        versions.len(),
        8,
        "every concurrent append got a distinct version"
    );
    assert_eq!(db.count_workflow_versions("wf1").await.unwrap(), 8);
}
