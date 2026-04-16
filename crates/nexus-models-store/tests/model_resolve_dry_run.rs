use nexus_models_store::{
    ModelDependency, ResolutionContext, ZeroSizeProbe, count_installs_and_blobs, resolve_dry_run,
};
use sqlx::sqlite::SqlitePoolOptions;

#[tokio::test]
async fn dry_run_leaves_row_count_and_blob_count_unchanged() {
    let pool = SqlitePoolOptions::new()
        .max_connections(2)
        .connect("sqlite::memory:")
        .await
        .unwrap();
    for stmt in include_str!("../../../migrations/009_host_model_store.sql").split(';') {
        let t = stmt.trim();
        if !t.is_empty() {
            sqlx::query(t).execute(&pool).await.unwrap();
        }
    }
    for stmt in include_str!("../../../migrations/010_host_model_store_provenance.sql").split(';') {
        let t = stmt.trim();
        if !t.is_empty() {
            sqlx::query(t).execute(&pool).await.unwrap();
        }
    }
    let tmp = tempfile::TempDir::new().unwrap();
    sqlx::query(
        "INSERT INTO host_model_installs (install_id, family, version, variant, install_root, \
         files_manifest, sha256_root, source_revision, state, source_kind, created_at, \
         updated_at) VALUES ('a','llama','3-8b','default','/t','[]','s','s','ready','direct_url',\
         '2026-04-15T00:00:00Z','2026-04-15T00:00:00Z')",
    )
    .execute(&pool)
    .await
    .unwrap();

    let before = count_installs_and_blobs(&pool, tmp.path()).await.unwrap();
    let deps = vec![ModelDependency {
        family: "missing-family".into(),
        version: "v".into(),
        revision: None,
        allow_unpinned: true,
        min_params: None,
        quantization: None,
        variant: None,
        required: false,
    }];
    let report = resolve_dry_run(&pool, &deps, &ResolutionContext::default(), &ZeroSizeProbe)
        .await
        .unwrap();
    let after = count_installs_and_blobs(&pool, tmp.path()).await.unwrap();
    assert_eq!(before, after);
    assert_eq!(report.missing.len(), 1);
    assert_eq!(report.total_download_bytes, 0);
}
