use super::*;
use chrono::Utc;
use sqlx::sqlite::SqlitePoolOptions;

async fn fresh_pool() -> SqlitePool {
    let pool = SqlitePoolOptions::new()
        .max_connections(2)
        .connect("sqlite::memory:")
        .await
        .unwrap();
    for stmt in include_str!("../../../../../migrations/009_host_model_store.sql").split(';') {
        let t = stmt.trim();
        if !t.is_empty() {
            sqlx::query(t).execute(&pool).await.unwrap();
        }
    }
    for stmt in include_str!("../../../../../migrations/010_host_model_store_provenance.sql").split(';') {
        let t = stmt.trim();
        if !t.is_empty() {
            sqlx::query(t).execute(&pool).await.unwrap();
        }
    }
    pool
}

async fn insert(
    pool: &SqlitePool,
    id: &str,
    family: &str,
    version: &str,
    q: Option<&str>,
    created_at: &str,
) {
    sqlx::query(
        "INSERT INTO host_model_installs (install_id, family, version, quantization, \
         variant, install_root, files_manifest, sha256_root, source_revision, state, \
         source_kind, created_at, updated_at) VALUES ($1,$2,$3,$4,'default','/t','[]',\
         $1,$1,'ready','direct_url',$5,$5)",
    )
    .bind(id)
    .bind(family)
    .bind(version)
    .bind(q)
    .bind(created_at)
    .execute(pool)
    .await
    .unwrap();
}

fn dep(q: Option<Quantization>) -> ModelDependency {
    ModelDependency {
        family: "llama".into(),
        version: "3-8b".into(),
        revision: None,
        allow_unpinned: true,
        min_params: None,
        quantization: q,
        variant: None,
        required: true,
    }
}

#[tokio::test]
async fn partition_matched_missing() {
    let pool = fresh_pool().await;
    insert(
        &pool,
        "a",
        "llama",
        "3-8b",
        Some("Q4_K_M"),
        "2026-04-15T00:00:00Z",
    )
    .await;
    let deps = vec![dep(Some(Quantization::Q4_K_M)), dep(None).clone(), {
        let mut d = dep(None);
        d.family = "nonexistent".into();
        d
    }];
    let report = check_model_dependencies(&pool, &deps, &ResolutionContext::default())
        .await
        .unwrap();
    assert_eq!(report.matched.len(), 2);
    assert_eq!(report.missing.len(), 1);
}

#[tokio::test]
async fn tie_breaker_exact_over_family() {
    let pool = fresh_pool().await;
    let now = Utc::now().to_rfc3339();
    insert(&pool, "fam", "llama", "3-8b", Some("Q4_K_S"), &now).await;
    insert(&pool, "exa", "llama", "3-8b", Some("Q4_K_M"), &now).await;
    let d = dep(Some(Quantization::Q4_K_M));
    let r = check_model_dependencies(&pool, &[d], &ResolutionContext::default())
        .await
        .unwrap();
    assert_eq!(r.matched[0].install_id, "exa");
    assert_eq!(r.matched[0].quality, "exact");
}

#[tokio::test]
async fn dry_run_is_side_effect_free() {
    let pool = fresh_pool().await;
    let tmp = tempfile::TempDir::new().unwrap();
    insert(
        &pool,
        "a",
        "llama",
        "3-8b",
        Some("Q4_K_M"),
        "2026-04-15T00:00:00Z",
    )
    .await;

    let before = count_installs_and_blobs(&pool, tmp.path()).await.unwrap();
    let mut d = dep(None);
    d.family = "missing".into();
    let report = resolve_dry_run(&pool, &[d], &ResolutionContext::default(), &ZeroSizeProbe)
        .await
        .unwrap();
    let after = count_installs_and_blobs(&pool, tmp.path()).await.unwrap();
    assert_eq!(before, after);
    assert_eq!(report.missing.len(), 1);
}

#[tokio::test]
async fn latency_p95_under_100ms_with_50_installs_5_deps() {
    let pool = fresh_pool().await;
    for i in 0..50 {
        let t = format!("2026-04-15T00:{:02}:00Z", i);
        insert(&pool, &format!("i{i}"), "llama", "3-8b", Some("Q4_K_M"), &t).await;
    }
    let deps: Vec<ModelDependency> = (0..5).map(|_| dep(Some(Quantization::Q4_K_M))).collect();

    let mut times = Vec::with_capacity(200);
    for _ in 0..200 {
        let start = std::time::Instant::now();
        check_model_dependencies(&pool, &deps, &ResolutionContext::default())
            .await
            .unwrap();
        times.push(start.elapsed().as_micros());
    }
    times.sort();
    let p95 = times[(times.len() as f64 * 0.95) as usize];
    assert!(p95 < 100_000, "p95 = {p95}us exceeds 100ms budget");
}
