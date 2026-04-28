mod fixtures;

use chrono::Utc;
use emotion_tts_extension::domain::ContentHash;
use emotion_tts_extension::storage::repo_traits::SynthesisCacheRow;
use emotion_tts_extension::storage::Repos;
use emotion_tts_extension::MIGRATIONS;
use sqlx::sqlite::SqlitePoolOptions;
use sqlx::SqlitePool;

async fn fresh_pool() -> SqlitePool {
    let pool = SqlitePoolOptions::new()
        .max_connections(1)
        .connect("sqlite::memory:")
        .await
        .expect("in-memory pool");
    for m in MIGRATIONS {
        sqlx::raw_sql(m.sql)
            .execute(&pool)
            .await
            .unwrap_or_else(|e| panic!("migration {} failed: {}", m.name, e));
    }
    pool
}

fn hash(byte: u8) -> ContentHash {
    ContentHash::from_hex(format!("{:02x}", byte).repeat(32)).unwrap()
}

async fn insert_entry(repos: &Repos, hash: &ContentHash, size: i64, last_hit: i64) {
    repos
        .cache
        .insert(&SynthesisCacheRow {
            content_hash: hash.clone(),
            audio_artifact_ref: format!("artifact://mem/{}", hash.as_str()),
            extension_version: "0.1.0".into(),
            runtime_version: "0.1.0".into(),
            model_version: "indextts-2-20250908".into(),
            size_bytes: size,
            hit_count: 0,
            created_at: Utc::now().timestamp(),
            last_hit_at: last_hit,
        })
        .await
        .unwrap();
}

#[tokio::test]
async fn total_size_bytes_sums_all_entries() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);

    insert_entry(&repos, &hash(1), 1_000_000, 100).await;
    insert_entry(&repos, &hash(2), 2_000_000, 200).await;
    insert_entry(&repos, &hash(3), 3_000_000, 300).await;

    let total = repos.cache.total_size_bytes().await.unwrap();
    assert_eq!(total, 6_000_000);
}

#[tokio::test]
async fn evict_lru_removes_oldest_first_by_last_hit_at() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);

    let oldest = hash(1);
    let middle = hash(2);
    let newest = hash(3);
    insert_entry(&repos, &oldest, 1_000_000, 100).await;
    insert_entry(&repos, &middle, 1_000_000, 200).await;
    insert_entry(&repos, &newest, 1_000_000, 300).await;

    let victims = repos.cache.evict_lru(1_500_000).await.unwrap();
    assert_eq!(victims.len(), 2, "two entries needed to free 1.5 MB");
    assert_eq!(victims[0].as_str(), oldest.as_str());
    assert_eq!(victims[1].as_str(), middle.as_str());

    assert!(repos.cache.get(&oldest).await.unwrap().is_none());
    assert!(repos.cache.get(&middle).await.unwrap().is_none());
    assert!(repos.cache.get(&newest).await.unwrap().is_some());
}

#[tokio::test]
async fn record_hit_refreshes_last_hit_at_and_increments_count() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);

    let h = hash(1);
    insert_entry(&repos, &h, 1_000, 100).await;
    repos.cache.record_hit(&h, 500).await.unwrap();

    let row = repos.cache.get(&h).await.unwrap().unwrap();
    assert_eq!(row.hit_count, 1);
    assert_eq!(row.last_hit_at, 500);

    repos.cache.record_hit(&h, 700).await.unwrap();
    let row = repos.cache.get(&h).await.unwrap().unwrap();
    assert_eq!(row.hit_count, 2);
    assert_eq!(row.last_hit_at, 700);
}

#[tokio::test]
async fn recently_hit_entry_survives_eviction() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);

    let stale_a = hash(1);
    let stale_b = hash(2);
    let warm = hash(3);
    insert_entry(&repos, &stale_a, 1_000_000, 100).await;
    insert_entry(&repos, &stale_b, 1_000_000, 200).await;
    insert_entry(&repos, &warm, 1_000_000, 150).await;

    repos.cache.record_hit(&warm, 9_999).await.unwrap();

    let victims = repos.cache.evict_lru(2_000_000).await.unwrap();
    let victim_strs: Vec<_> = victims.iter().map(|h| h.as_str().to_string()).collect();
    assert!(victim_strs.contains(&stale_a.as_str().to_string()));
    assert!(victim_strs.contains(&stale_b.as_str().to_string()));
    assert!(!victim_strs.contains(&warm.as_str().to_string()));
}

#[tokio::test]
async fn evict_to_zero_target_is_noop() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);

    insert_entry(&repos, &hash(1), 1_000, 100).await;
    let victims = repos.cache.evict_lru(0).await.unwrap();
    assert!(victims.is_empty());
    assert!(repos.cache.get(&hash(1)).await.unwrap().is_some());
}

#[tokio::test]
async fn lookup_many_returns_aligned_results() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);
    let h1 = hash(1);
    let h2 = hash(2);
    insert_entry(&repos, &h1, 1024, 100).await;
    let results = repos.cache.lookup_many(&[h1.clone(), h2.clone()]).await.unwrap();
    assert_eq!(results.len(), 2);
    assert!(results[0].is_some(), "h1 in cache");
    assert!(results[1].is_none(), "h2 not in cache");
}

#[tokio::test]
async fn insert_conflict_refreshes_last_hit_at() {
    let pool = fresh_pool().await;
    let repos = Repos::from_pool(pool);

    let h = hash(1);
    insert_entry(&repos, &h, 1_000, 100).await;

    repos
        .cache
        .insert(&SynthesisCacheRow {
            content_hash: h.clone(),
            audio_artifact_ref: "artifact://mem/updated".into(),
            extension_version: "0.1.0".into(),
            runtime_version: "0.1.0".into(),
            model_version: "indextts-2-20250908".into(),
            size_bytes: 1_000,
            hit_count: 0,
            created_at: 100,
            last_hit_at: 999,
        })
        .await
        .unwrap();

    let row = repos.cache.get(&h).await.unwrap().unwrap();
    assert_eq!(row.last_hit_at, 999);
}
