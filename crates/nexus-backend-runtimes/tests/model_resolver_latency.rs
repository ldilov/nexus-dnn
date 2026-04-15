use nexus_backend_runtimes::models_store::{
    ModelDependency, Quantization, ResolutionContext, check_model_dependencies,
};
use sqlx::sqlite::SqlitePoolOptions;

#[tokio::test]
async fn resolver_p95_under_100ms_with_50_installs_and_5_deps() {
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
    for i in 0..50 {
        let t = format!("2026-04-15T00:{:02}:00Z", i);
        sqlx::query(
            "INSERT INTO host_model_installs (install_id, family, version, quantization, \
             variant, install_root, files_manifest, sha256_root, source_revision, state, \
             source_kind, created_at, updated_at) VALUES ($1,'llama','3-8b','Q4_K_M','default',\
             '/t','[]',$1,$1,'ready','direct_url',$2,$2)",
        )
        .bind(format!("i{i}"))
        .bind(&t)
        .execute(&pool)
        .await
        .unwrap();
    }

    let deps: Vec<ModelDependency> = (0..5)
        .map(|_| ModelDependency {
            family: "llama".into(),
            version: "3-8b".into(),
            revision: None,
            allow_unpinned: true,
            min_params: None,
            quantization: Some(Quantization::Q4_K_M),
            variant: None,
            required: true,
        })
        .collect();

    let mut times = Vec::with_capacity(1000);
    for _ in 0..1000 {
        let start = std::time::Instant::now();
        check_model_dependencies(&pool, &deps, &ResolutionContext::default())
            .await
            .unwrap();
        times.push(start.elapsed().as_micros());
    }
    times.sort();
    let p95 = times[(times.len() as f64 * 0.95) as usize];
    let median = times[times.len() / 2];
    let max = *times.last().unwrap();
    println!("resolver latency: median={median}us p95={p95}us max={max}us");
    assert!(p95 < 100_000, "p95={p95}us exceeds 100ms budget");
}
