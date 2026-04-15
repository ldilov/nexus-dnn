use nexus_storage::{Database, ExtensionRecord, SqliteDatabase, WorkflowRecord};

async fn seed_extension(db: &SqliteDatabase, id: &str, version: &str) {
    let ext = ExtensionRecord {
        id: id.into(),
        name: Some(id.into()),
        version: version.into(),
        description: None,
        publisher: None,
        host_api_compat: "1.0.0".into(),
        protocol_compat: "1.0.0".into(),
        runtime_family: "builtin".into(),
        entrypoint: ".".into(),
        capabilities: None,
        status: "enabled".into(),
        directory: ".".into(),
        installed_at: "2026-04-14T00:00:00Z".into(),
        recipe_count: Some(0),
        ui_contribution_count: Some(0),
        validation_errors: None,
    };
    db.insert_extension(&ext).await.unwrap();
}

async fn fresh_db() -> SqliteDatabase {
    SqliteDatabase::new("sqlite::memory:").await.unwrap()
}

fn sample_record(id: &str) -> WorkflowRecord {
    WorkflowRecord {
        id: id.into(),
        title: "Sample".into(),
        version: "1.0.0".into(),
        inputs: Some("[]".into()),
        outputs: Some("[]".into()),
        nodes: "[]".into(),
        edges: "[]".into(),
        stages: Some("[]".into()),
        created_at: "2026-04-14T00:00:00Z".into(),
        updated_at: "2026-04-14T00:00:00Z".into(),
        user_edited_at: None,
        extension_id: None,
        extension_version: None,
        extension_version_first_seen: None,
    }
}

#[tokio::test]
async fn migration_006_applies_on_fresh_db() {
    let db = fresh_db().await;
    let row = sqlx::query(
        "SELECT name FROM pragma_table_info('workflows') WHERE name IN \
         ('extension_id', 'extension_version', 'extension_version_first_seen')",
    )
    .fetch_all(db.pool())
    .await
    .unwrap();
    assert_eq!(row.len(), 3, "expected all three attribution columns to exist");
}

#[tokio::test]
async fn migration_006_creates_extension_index() {
    let db = fresh_db().await;
    let found = sqlx::query("SELECT name FROM sqlite_master WHERE type='index' AND name=?")
        .bind("idx_workflows_extension")
        .fetch_optional(db.pool())
        .await
        .unwrap();
    assert!(found.is_some(), "expected idx_workflows_extension to be created");
}

#[tokio::test]
async fn migration_006_idempotent_on_rerun() {
    let db = fresh_db().await;
    db.run_migrations().await.unwrap();
    db.run_migrations().await.unwrap();
    db.run_migrations().await.unwrap();
}

#[tokio::test]
async fn existing_workflow_rows_default_to_null_attribution() {
    let db = fresh_db().await;
    db.insert_workflow(&sample_record("legacy_wf")).await.unwrap();
    let loaded = db.get_workflow("legacy_wf").await.unwrap();
    assert_eq!(loaded.extension_id, None);
    assert_eq!(loaded.extension_version, None);
    assert_eq!(loaded.extension_version_first_seen, None);
}

#[tokio::test]
async fn stamp_workflow_extension_sets_attribution_without_touching_graph() {
    let db = fresh_db().await;
    seed_extension(&db, "nexus.chatllm", "1.0.0").await;
    db.insert_workflow(&sample_record("wf")).await.unwrap();

    db.stamp_workflow_extension("wf", "nexus.chatllm", "1.0.0", "2026-04-14T10:00:00Z")
        .await
        .unwrap();

    let after = db.get_workflow("wf").await.unwrap();
    assert_eq!(after.extension_id.as_deref(), Some("nexus.chatllm"));
    assert_eq!(after.extension_version.as_deref(), Some("1.0.0"));
    assert_eq!(
        after.extension_version_first_seen.as_deref(),
        Some("2026-04-14T10:00:00Z"),
        "first_seen should match the first stamp"
    );

    db.stamp_workflow_extension("wf", "nexus.chatllm", "1.1.0", "2026-04-15T10:00:00Z")
        .await
        .unwrap();

    let after_upgrade = db.get_workflow("wf").await.unwrap();
    assert_eq!(after_upgrade.extension_version.as_deref(), Some("1.1.0"));
    assert_eq!(
        after_upgrade.extension_version_first_seen.as_deref(),
        Some("2026-04-14T10:00:00Z"),
        "first_seen should NOT change across extension upgrades"
    );

    assert_eq!(after_upgrade.nodes, "[]", "nodes untouched by attribution stamp");
}

#[tokio::test]
async fn user_edit_survives_extension_stamp() {
    let db = fresh_db().await;
    seed_extension(&db, "nexus.chatllm", "1.0.0").await;
    let mut rec = sample_record("wf");
    rec.user_edited_at = Some("2026-04-14T00:00:00Z".into());
    db.insert_workflow(&rec).await.unwrap();

    db.stamp_workflow_extension("wf", "nexus.chatllm", "1.0.0", "2026-04-14T10:00:00Z")
        .await
        .unwrap();

    let after = db.get_workflow("wf").await.unwrap();
    assert_eq!(after.user_edited_at.as_deref(), Some("2026-04-14T00:00:00Z"));
    assert_eq!(after.extension_id.as_deref(), Some("nexus.chatllm"));
}
