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

/// Poll an async predicate until it returns `true` or the deadline passes.
/// Awaits the predicate directly on the current runtime — no nested executor —
/// so it stays sound even if `warm_counts` ever performs tokio I/O.
async fn poll_until<F, Fut>(predicate: F) -> bool
where
    F: Fn() -> Fut,
    Fut: std::future::Future<Output = bool>,
{
    let deadline = tokio::time::Instant::now() + Duration::from_secs(2);
    loop {
        if predicate().await {
            return true;
        }
        if tokio::time::Instant::now() >= deadline {
            return predicate().await;
        }
        tokio::time::sleep(Duration::from_millis(10)).await;
    }
}

#[tokio::test]
async fn start_with_warmup_true_warms_all_active_workers() {
    let h = harness(4).await;

    let status = post_start(&h.router, json!({ "numWorkers": 3, "warmup": true })).await;
    assert_eq!(status, StatusCode::ACCEPTED, "start stays non-blocking 202");

    let acquired = h.acquired.clone();
    let warmed = poll_until(|| {
        let acquired = acquired.clone();
        async move { acquired.load(Ordering::SeqCst) >= 3 }
    })
    .await;
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
        let pool = pool.clone();
        async move { pool.warm_counts().await.1 == 3 }
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
    poll_until(|| {
        let pool = pool.clone();
        async move { pool.warm_counts().await.1 == 3 }
    })
    .await;

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

// ---------------------------------------------------------------------------
// WS-I review IMPORTANT — warm-on-Start vs Stop race. A gated factory lets the
// test pause the background warm mid-flight, fire Stop (which bumps the start
// generation), then release the gate. The generation fence must make the warm
// task BAIL on its next iteration instead of re-acquiring workers Stop just
// released. Net leases (acquired - released) must settle to ZERO and no worker
// may survive Stop.
// ---------------------------------------------------------------------------

struct GatedLease {
    id: RuntimeLeaseId,
    released: Arc<AtomicUsize>,
}

#[async_trait]
impl BackendRuntimeLease for GatedLease {
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
        self.released.fetch_add(1, Ordering::SeqCst);
        Ok(())
    }
}

/// `acquire()` sleeps so a warm step stays briefly in-flight, then mints a
/// lease that counts its own release. Tracks acquired + released so the test can
/// assert net leases settle to zero.
struct SlowCountingFactory {
    acquired: Arc<AtomicUsize>,
    released: Arc<AtomicUsize>,
    acquire_delay: Duration,
}

#[async_trait]
impl LeaseFactory for SlowCountingFactory {
    async fn acquire(&self) -> DomainResult<SharedLease> {
        tokio::time::sleep(self.acquire_delay).await;
        self.acquired.fetch_add(1, Ordering::SeqCst);
        Ok(Arc::new(GatedLease {
            id: RuntimeLeaseId::new(),
            released: self.released.clone(),
        }))
    }
}

/// IMPORTANT regression — warm-on-Start vs Stop race, exercised through the real
/// HTTP `start` (background warm) + `stop` paths across many rapid cycles. The
/// per-acquire delay keeps the warm task in-flight when Stop lands, so an
/// UNFENCED warm re-acquires workers Stop already released and net leases drift
/// (acquired > released). The generation fence makes every superseded warm bail,
/// so acquired == released after every cycle. Many cycles make the unfenced
/// failure overwhelmingly likely (and in practice deterministic).
#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
async fn stop_during_warmup_leaves_no_surviving_worker() {
    let acquired = Arc::new(AtomicUsize::new(0));
    let released = Arc::new(AtomicUsize::new(0));
    let factory = Arc::new(SlowCountingFactory {
        acquired: acquired.clone(),
        released: released.clone(),
        acquire_delay: Duration::from_millis(15),
    });
    let provider = Arc::new(LeaseProvider::new(factory.clone()));
    let pool = Arc::new(LeaseProviderPool::with_ceiling(
        factory,
        provider.clone(),
        4,
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

    for cycle in 0..40 {
        let start = post_start(&router, json!({ "numWorkers": 4, "warmup": true })).await;
        assert_eq!(start, StatusCode::ACCEPTED, "cycle {cycle}: start 202");

        // Stop mid-warm: 4 × 15ms acquires ≈ 60ms; a few ms in, warm is in-flight.
        tokio::time::sleep(Duration::from_millis(5)).await;
        let stop = router
            .clone()
            .oneshot(
                Request::builder()
                    .method(Method::POST)
                    .uri("/runtime/stop")
                    .body(Body::empty())
                    .unwrap(),
            )
            .await
            .unwrap()
            .status();
        assert_eq!(stop, StatusCode::ACCEPTED, "cycle {cycle}: stop 202");

        // After Stop settles, the superseded warm must have bailed: every lease
        // it acquired is released, and nothing remains warm/warming.
        let balanced = poll_until(|| {
            let acquired = acquired.clone();
            let released = released.clone();
            async move { acquired.load(Ordering::SeqCst) == released.load(Ordering::SeqCst) }
        })
        .await;
        // Extra grace so any unfenced late re-acquire would have happened.
        tokio::time::sleep(Duration::from_millis(40)).await;

        let acquired_n = acquired.load(Ordering::SeqCst);
        let released_n = released.load(Ordering::SeqCst);
        assert!(
            balanced && acquired_n == released_n,
            "cycle {cycle}: Stop during warmup must leave no surviving worker \
             (acquired={acquired_n}, released={released_n})"
        );
        assert_eq!(
            pool.warm_counts().await,
            (0, 0),
            "cycle {cycle}: no provider may remain warm/warming after Stop"
        );
    }
}
