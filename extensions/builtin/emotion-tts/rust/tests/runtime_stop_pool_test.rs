//! WS-I #2 — `POST /runtime/stop` must drain the WHOLE worker pool, not just
//! the primary provider. Builds the runtime router over a counting-factory
//! pool (ceiling 3), forces all 3 providers live, then asserts the stop call
//! returns 202 and releases all 3 leases.

use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::Arc;

use async_trait::async_trait;
use axum::body::Body;
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
use sqlx::sqlite::SqlitePoolOptions;
use sqlx::SqlitePool;
use tower::ServiceExt;

struct CountingLease {
    id: RuntimeLeaseId,
    released: Arc<AtomicUsize>,
}

#[async_trait]
impl BackendRuntimeLease for CountingLease {
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

struct CountingLeaseFactory {
    released: Arc<AtomicUsize>,
}

#[async_trait]
impl LeaseFactory for CountingLeaseFactory {
    async fn acquire(&self) -> DomainResult<SharedLease> {
        Ok(Arc::new(CountingLease {
            id: RuntimeLeaseId::new(),
            released: self.released.clone(),
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

#[tokio::test]
async fn post_runtime_stop_drains_the_whole_pool() {
    let released = Arc::new(AtomicUsize::new(0));
    let factory = Arc::new(CountingLeaseFactory {
        released: released.clone(),
    });
    let provider = Arc::new(LeaseProvider::new(factory.clone()));
    let pool = Arc::new(LeaseProviderPool::with_ceiling(
        factory,
        provider.clone(),
        3,
    ));
    assert_eq!(pool.size(), 3);

    for p in pool.providers() {
        p.spawn_if_needed().await.expect("force provider live");
    }

    let repos = Repos::from_pool(fresh_pool().await);
    let queue = Arc::new(RuntimeQueue::new());
    let router = build_router_with_families(
        repos,
        queue,
        "0.0.0-test",
        Some(provider),
        Some(pool),
        None,
        Arc::new(RunChannelRegistry::new()),
        Arc::new(FamilyRegistry::new(Vec::new())),
        default_reconciler(),
    );

    let response = router
        .oneshot(
            Request::builder()
                .method(Method::POST)
                .uri("/runtime/stop")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(response.status(), StatusCode::ACCEPTED);
    assert_eq!(
        released.load(Ordering::SeqCst),
        3,
        "POST /runtime/stop must release every pooled worker, not just the primary"
    );
}
