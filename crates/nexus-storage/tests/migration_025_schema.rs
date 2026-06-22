use nexus_storage::SqliteDatabase;

#[tokio::test]
async fn migration_025_creates_presets_table_and_index() {
    let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
    let table = sqlx::query(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='deployment_presets'",
    )
    .fetch_optional(db.pool())
    .await
    .unwrap();
    assert!(table.is_some(), "deployment_presets table missing after migration 025");

    let index = sqlx::query(
        "SELECT name FROM sqlite_master WHERE type='index' AND name='idx_deployment_presets_recipe_key'",
    )
    .fetch_optional(db.pool())
    .await
    .unwrap();
    assert!(index.is_some(), "idx_deployment_presets_recipe_key missing after migration 025");
}
