//! WS-I #3 — `POST /runtime/start` warms the active worker count by default
//! (opt-out via `{"warmup": false}`), and `/runtime/health` reports warm/
//! warming counts. The start response stays non-blocking 202; warming runs in
//! the background, so the test polls the pool until it settles.

use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::Arc;
use std::time::Duration;

use async_trait::async_trait;
use axum::body::{to_bytes, Body};
use axum::http::{Method, Request, StatusCode};
use emotion_tts_extension::backend_client::{LeaseFactory, LeaseProvider};
use emotion_tts_extension::dispatcher::{LeaseProviderPool, RunChannelRegistry};
use emotion_tts_extension::domain::{Result as DomainResult, RuntimeLeaseId};
use emotion_tts_extension::families::FamilyRegistry;
use emotion_tts_extension::host_contract::{
    BackendRuntimeLease, LeaseError, LeaseState, NotificationEnvelope, NotificationStream,
    SharedLease,
};
use emotion_tts_extension::queue::RuntimeQueue;
use emotion_tts_extension::router::{build_router_with_families, families::default_reconciler};
use emotion_tts_extension::storage::Repos;
use emotion_tts_extension::MIGRATIONS;
use futures::stream::StreamExt;
use serde_json::{json, Value};
use sqlx::sqlite::SqlitePoolOptions;
use sqlx::SqlitePool;
use tower::ServiceExt;

struct ReadyLease {
    id: RuntimeLeaseId,
}

#[async_trait]
impl BackendRuntimeLease for ReadyLease {
    fn id(&self) -> RuntimeLeaseId {
        self.id.clone()
    }
    fn state(&self) -> LeaseState {
        LeaseState::Ready
    }
    async fn send_rpc(
        &self,
        _method: &str,
        _params: serde_json::Value,
    ) -> Result<serde_json::Value, LeaseError> {
        Ok(serde_json::Value::Null)
    }
    async fn subscribe_notifications(&self) -> NotificationStream {
        futures::stream::iter(Vec::<NotificationEnvelope>::new()).boxed()
    }
    async fn release(&self) -> Result<(), LeaseError> {
        Ok(())
    }
}

/// Records every `acquire()` so the test can assert how many providers were
/// warmed (= how many leases were minted).
struct CountingAcquireFactory {
    acquired: Arc<AtomicUsize>,
}

#[async_trait]
impl LeaseFactory for CountingAcquireFactory {
    async fn acquire(&self) -> DomainResult<SharedLease> {
        self.acquired.fetch_add(1, Ordering::SeqCst);
        Ok(Arc::new(ReadyLease {
            id: RuntimeLeaseId::new(),
        }))
    }
}

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
            .unwrap_or_else(|e| panic!("migration {} failed: {e}", m.name));
    }
    pool
}

struct Harness {
    router: axum::Router,
    pool: Arc<LeaseProviderPool>,
    acquired: Arc<AtomicUsize>,
}

async fn harness(ceiling: usize) -> Harness {
    let acquired = Arc::new(AtomicUsize::new(0));
    let factory = Arc::new(CountingAcquireFactory {
        acquired: acquired.clone(),
    });
    let provider = Arc::new(LeaseProvider::new(factory.clone()));
    let pool = Arc::new(LeaseProviderPool::with_ceiling(
        factory,
        provider.clone(),
        ceiling,
    ));
    let repos = Repos::from_pool(fresh_pool().await);
    let queue = Arc::new(RuntimeQueue::new());
    let router = build_router_with_families(
        repos,
        queue,
        "0.0.0-test",
        Some(provider),
        Some(pool.clone()),
        None,
        Arc::new(RunChannelRegistry::new()),
        Arc::new(FamilyRegistry::new(Vec::new())),
        default_reconciler(),
    );
    Harness {
        router,
        pool,
        acquired,
    }
}

async fn post_start(router: &axum::Router, body: Value) -> StatusCode {
    router
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/runtime/start")
                .header("content-type", "application/json")
                .body(Body::from(body.to_string()))
                .unwrap(),
        )
        .await
        .unwrap()
        .status()
}

async fn poll_until<F: Fn() -> bool>(cond: F) -> bool {
    for _ in 0..200 {
        if cond() {
            return true;
        }
        tokio::time::sleep(Duration::from_millis(10)).await;
    }
    cond()
}

#[tokio::test]
async fn start_with_warmup_true_warms_all_active_workers() {
    let h = harness(4).await;

    let status = post_start(&h.router, json!({ "numWorkers": 3, "warmup": true })).await;
    assert_eq!(status, StatusCode::ACCEPTED, "start stays non-blocking 202");

    let acquired = h.acquired.clone();
    let warmed = poll_until(|| acquired.load(Ordering::SeqCst) >= 3).await;
    assert!(
        warmed,
        "warmup must acquire all 3 active workers, saw {}",
        h.acquired.load(Ordering::SeqCst)
    );
    assert_eq!(
        h.acquired.load(Ordering::SeqCst),
        3,
        "warmup acquires exactly the active worker count, not the ceiling"
    );

    let pool = h.pool.clone();
    let all_warm = poll_until(|| {
        let p = pool.clone();
        // warm_counts is async; block on a fresh runtime handle is awkward —
        // instead drive it via futures executor on the current runtime.
        futures::executor::block_on(async { p.warm_counts().await.1 == 3 })
    })
    .await;
    assert!(all_warm, "all warmed workers should report Ready");
}

#[tokio::test]
async fn start_with_warmup_false_only_spawns_primary() {
    let h = harness(4).await;

    let status = post_start(&h.router, json!({ "numWorkers": 3, "warmup": false })).await;
    assert_eq!(status, StatusCode::ACCEPTED);

    // Give any (incorrect) background warm a chance to fire before asserting.
    tokio::time::sleep(Duration::from_millis(100)).await;
    assert!(
        h.acquired.load(Ordering::SeqCst) <= 1,
        "warmup:false must only spawn the primary (lazy), saw {}",
        h.acquired.load(Ordering::SeqCst)
    );
}

#[tokio::test]
async fn health_reports_warm_and_warming_counts() {
    let h = harness(4).await;

    let _ = post_start(&h.router, json!({ "numWorkers": 3, "warmup": true })).await;
    let pool = h.pool.clone();
    poll_until(|| futures::executor::block_on(async { pool.warm_counts().await.1 == 3 })).await;

    let response = h
        .router
        .clone()
        .oneshot(
            Request::builder()
                .method(Method::GET)
                .uri("/runtime/health")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(response.status(), StatusCode::OK);
    let body: Value =
        serde_json::from_slice(&to_bytes(response.into_body(), usize::MAX).await.unwrap()).unwrap();

    assert!(
        body.get("workersWarm").is_some(),
        "health must carry workersWarm: {body}"
    );
    assert!(
        body.get("workersWarming").is_some(),
        "health must carry workersWarming: {body}"
    );
    assert_eq!(
        body["workersWarm"].as_u64(),
        Some(3),
        "3 Ready workers ⇒ workersWarm=3: {body}"
    );
}
