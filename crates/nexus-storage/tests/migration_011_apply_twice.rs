use nexus_storage::{Database, SqliteDatabase};

#[tokio::test]
async fn migration_011_is_idempotent_when_applied_twice() {
    let db = SqliteDatabase::new("sqlite::memory:").await.unwrap();
    db.run_migrations()
        .await
        .expect("second migration pass must be idempotent");
}
