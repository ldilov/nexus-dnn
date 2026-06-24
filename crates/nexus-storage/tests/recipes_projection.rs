use nexus_storage::{Database, RecipeRecord, SqliteDatabase, StorageError};

async fn fresh_db() -> SqliteDatabase {
    SqliteDatabase::new("sqlite::memory:").await.unwrap()
}

fn ext_recipe(id: &str) -> RecipeRecord {
    RecipeRecord {
        id: id.into(),
        version: "1.0.0".into(),
        display_name: "Demo".into(),
        summary: "S".into(),
        category: "audio".into(),
        extension_id: Some("ext.demo".into()),
        extension_version: Some("1.0.0".into()),
        workflow_template_ref: "workflows/main.yaml".into(),
        thumbnail: None,
        input_summary: None,
        bindings: "{}".into(),
        created_at: "2026-06-24T00:00:00Z".into(),
        workflow_id: None,
        workflow_version: None,
        projection: None,
        projection_schema_version: 1,
        status: "healthy".into(),
        status_reason: None,
        author_kind: "extension".into(),
    }
}

fn user_recipe(id: &str) -> RecipeRecord {
    RecipeRecord {
        extension_id: None,
        extension_version: None,
        author_kind: "user".into(),
        ..ext_recipe(id)
    }
}

#[tokio::test]
async fn recipe_record_round_trips_with_new_columns() {
    let db = fresh_db().await;
    let mut r = ext_recipe("r1");
    r.workflow_id = Some("wf-1".into());
    r.workflow_version = Some("v3".into());
    r.projection = Some(r#"{"schema_version":1}"#.into());
    r.projection_schema_version = 1;
    r.status = "outdated".into();
    r.status_reason = Some("needs_re_pin".into());

    db.insert_recipe(&r).await.unwrap();
    let got = db.get_recipe("r1").await.unwrap();

    assert_eq!(got.workflow_id.as_deref(), Some("wf-1"));
    assert_eq!(got.workflow_version.as_deref(), Some("v3"));
    assert_eq!(got.projection.as_deref(), Some(r#"{"schema_version":1}"#));
    assert_eq!(got.projection_schema_version, 1);
    assert_eq!(got.status, "outdated");
    assert_eq!(got.status_reason.as_deref(), Some("needs_re_pin"));
    assert_eq!(got.author_kind, "extension");
    assert_eq!(got.extension_id.as_deref(), Some("ext.demo"));
}

#[tokio::test]
async fn user_recipe_insert_with_null_extension_succeeds() {
    let db = fresh_db().await;
    db.insert_recipe(&user_recipe("u1")).await.unwrap();
    let got = db.get_recipe("u1").await.unwrap();
    assert_eq!(got.extension_id, None);
    assert_eq!(got.extension_version, None);
    assert_eq!(got.author_kind, "user");
}

#[tokio::test]
async fn delete_recipes_by_extension_leaves_user_recipes() {
    let db = fresh_db().await;
    db.insert_recipe(&ext_recipe("e1")).await.unwrap();
    db.insert_recipe(&user_recipe("u1")).await.unwrap();

    db.delete_recipes_by_extension("ext.demo").await.unwrap();

    assert!(
        db.get_recipe("e1").await.is_err(),
        "extension recipe deleted"
    );
    assert!(db.get_recipe("u1").await.is_ok(), "user recipe preserved");
}

#[tokio::test]
async fn update_recipe_pin_sets_pin_and_status() {
    let db = fresh_db().await;
    db.insert_recipe(&ext_recipe("r1")).await.unwrap();

    db.update_recipe_pin("r1", Some("wf-1"), Some("v2"), "healthy", None)
        .await
        .unwrap();
    let got = db.get_recipe("r1").await.unwrap();
    assert_eq!(got.workflow_id.as_deref(), Some("wf-1"));
    assert_eq!(got.workflow_version.as_deref(), Some("v2"));
    assert_eq!(got.status, "healthy");
    assert_eq!(got.status_reason, None);

    db.update_recipe_pin("r1", None, None, "broken", Some("needs_re_pin"))
        .await
        .unwrap();
    let broken = db.get_recipe("r1").await.unwrap();
    assert_eq!(broken.workflow_id, None);
    assert_eq!(broken.status, "broken");
    assert_eq!(broken.status_reason.as_deref(), Some("needs_re_pin"));
}

#[tokio::test]
async fn update_recipe_projection_round_trips_on_user_recipe() {
    let db = fresh_db().await;
    db.insert_recipe(&user_recipe("u1")).await.unwrap();

    let projection = r#"{"schema_version":1,"presets":[{"preset_id":"p","label":"P","source":"user","values":{}}]}"#;
    db.update_recipe_projection("u1", projection).await.unwrap();

    let got = db.get_recipe("u1").await.unwrap();
    assert_eq!(got.projection.as_deref(), Some(projection));
}

#[tokio::test]
async fn update_recipe_projection_rejects_extension_recipe() {
    let db = fresh_db().await;
    db.insert_recipe(&ext_recipe("e1")).await.unwrap();

    let err = db.update_recipe_projection("e1", "{}").await.unwrap_err();
    assert!(matches!(err, StorageError::NotFound { .. }));

    let got = db.get_recipe("e1").await.unwrap();
    assert_eq!(got.projection, None, "extension projection unchanged");
}

#[tokio::test]
async fn update_recipe_projection_missing_recipe_is_not_found() {
    let db = fresh_db().await;
    let err = db.update_recipe_projection("nope", "{}").await.unwrap_err();
    assert!(matches!(err, StorageError::NotFound { .. }));
}

#[tokio::test]
async fn migration_027_reruns_idempotently() {
    let dir = tempfile::tempdir().unwrap();
    let url = format!(
        "sqlite:{}?mode=rwc",
        dir.path()
            .join("rec.db")
            .to_string_lossy()
            .replace('\\', "/")
    );

    let db1 = SqliteDatabase::new(&url).await.unwrap();
    let mut r = ext_recipe("r1");
    r.workflow_id = Some("wf-1".into());
    r.workflow_version = Some("v1".into());
    r.projection = Some(r#"{"schema_version":1}"#.into());
    db1.insert_recipe(&r).await.unwrap();
    db1.insert_recipe(&user_recipe("u-pre")).await.unwrap();
    drop(db1);

    // Second boot re-runs every migration, including 027's table-rebuild.
    let db2 = SqliteDatabase::new(&url).await.unwrap();
    let user_survived = db2.get_recipe("u-pre").await.unwrap();
    assert_eq!(
        user_survived.extension_id, None,
        "user recipe nullable ext survived rebuild"
    );
    assert_eq!(user_survived.author_kind, "user");
    let survived = db2.get_recipe("r1").await.unwrap();
    assert_eq!(
        survived.workflow_id.as_deref(),
        Some("wf-1"),
        "pin survived rebuild"
    );
    assert_eq!(
        survived.projection.as_deref(),
        Some(r#"{"schema_version":1}"#)
    );

    // nullable shape still holds after a re-run
    db2.insert_recipe(&user_recipe("u1")).await.unwrap();
    assert_eq!(db2.get_recipe("u1").await.unwrap().extension_id, None);
}
