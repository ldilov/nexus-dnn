use nexus_models_store::{
    ModelDependency, Quantization, ResolutionContext, UnsatisfiableReason, check_model_dependencies,
};
use sqlx::sqlite::SqlitePoolOptions;

async fn fresh_pool() -> sqlx::SqlitePool {
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
    pool
}

async fn insert(pool: &sqlx::SqlitePool, id: &str, param_count: Option<i64>) {
    sqlx::query(
        "INSERT INTO host_model_installs (install_id, family, version, variant, install_root, \
         files_manifest, sha256_root, source_revision, state, source_kind, license_spdx, \
         param_count, created_at, updated_at) VALUES ($1,'llama','3-8b','default','/t','[]',\
         $1,$1,'ready','direct_url','apache-2.0',$2,'2026-04-15T00:00:00Z','2026-04-15T00:00:00Z')",
    )
    .bind(id)
    .bind(param_count)
    .execute(pool)
    .await
    .unwrap();
}

fn dep_with_min(min_params: u64) -> ModelDependency {
    ModelDependency {
        family: "llama".into(),
        version: "3-8b".into(),
        revision: None,
        allow_unpinned: true,
        min_params: Some(min_params),
        quantization: Some(Quantization::Q4_K_M),
        variant: None,
        required: true,
    }
}

#[tokio::test]
async fn min_params_7b_with_3b_install_is_unsatisfiable() {
    let pool = fresh_pool().await;
    insert(&pool, "tiny", Some(3_000_000_000)).await;
    let report = check_model_dependencies(
        &pool,
        &[dep_with_min(7_000_000_000)],
        &ResolutionContext::default(),
    )
    .await
    .unwrap();
    assert!(report.matched.is_empty());
    assert_eq!(report.unsatisfiable.len(), 1);
    assert_eq!(
        report.unsatisfiable[0].reason,
        UnsatisfiableReason::ParameterCountTooLow
    );
}

#[tokio::test]
async fn min_params_7b_with_7b_install_matches() {
    let pool = fresh_pool().await;
    insert(&pool, "big", Some(7_000_000_000)).await;
    let report = check_model_dependencies(
        &pool,
        &[dep_with_min(7_000_000_000)],
        &ResolutionContext::default(),
    )
    .await
    .unwrap();
    assert_eq!(report.matched.len(), 1);
    assert_eq!(report.matched[0].install_id, "big");
}

#[test]
fn sanity_match_quality_some_vs_none() {
    use nexus_models_store::MatchQuality;
    let a = Some(Quantization::Q4_K_M);
    let b: Option<Quantization> = None;
    assert_eq!(
        Quantization::match_quality(a.as_ref(), b.as_ref()),
        MatchQuality::Family
    );
}
