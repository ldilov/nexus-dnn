//! Spec 030 SC-007 — dispatcher overhead benchmark.
//!
//! Compares p50 latency of:
//!   1. A direct axum route mounted in the host router.
//!   2. The same handler reached via the generic
//!      `/api/v1/extensions/{ext_id}/{*rest}` dispatcher with a
//!      synthetic extension registered for `bench`.
//!
//! Acceptance: dispatcher p50 minus direct p50 ≤ 1 ms (FR-014, SC-007).
//! Run with `cargo bench -p nexus-api --bench dispatcher_overhead`.

use std::sync::Arc;
use std::time::Instant;

use axum::Router;
use axum::body::Body;
use axum::http::Request;
use axum::routing::get;
use nexus_api::extension_router::{
    DefaultRegistry, ExtensionId, ExtensionRouterRegistry, SharedRegistry, dispatch,
};
use tokio::runtime::Runtime;
use tower::ServiceExt;

const ITERATIONS: usize = 1000;
const WARMUP: usize = 100;

fn build_direct_app() -> Router {
    Router::new().route("/bench/ping", get(|| async { "pong" }))
}

fn build_dispatcher_app() -> Router {
    let registry: Arc<DefaultRegistry> = Arc::new(DefaultRegistry::new());
    let bench_router = Router::new().route("/ping", get(|| async { "pong" }));
    registry
        .register(
            ExtensionId::parse("bench").unwrap(),
            bench_router,
            vec!["/ping".into()],
        )
        .unwrap();
    registry.seal();
    let shared: SharedRegistry = registry;
    Router::new()
        .route("/api/v1/extensions/{ext_id}/{*rest}", get(dispatch))
        .with_state(shared)
}

async fn measure(label: &str, app: Router, uri: &'static str) -> Vec<u128> {
    for _ in 0..WARMUP {
        let req = Request::builder().uri(uri).body(Body::empty()).unwrap();
        let _ = app.clone().oneshot(req).await.unwrap();
    }
    let mut samples = Vec::with_capacity(ITERATIONS);
    for _ in 0..ITERATIONS {
        let req = Request::builder().uri(uri).body(Body::empty()).unwrap();
        let start = Instant::now();
        let _ = app.clone().oneshot(req).await.unwrap();
        samples.push(start.elapsed().as_nanos());
    }
    samples.sort_unstable();
    let p50_ns = samples[samples.len() / 2];
    let p99_ns = samples[(samples.len() * 99) / 100];
    println!(
        "{label}: n={ITERATIONS} p50={:.3} ms p99={:.3} ms",
        p50_ns as f64 / 1_000_000.0,
        p99_ns as f64 / 1_000_000.0,
    );
    samples
}

fn main() {
    let rt = Runtime::new().expect("tokio runtime");
    rt.block_on(async {
        let direct = measure("direct route   ", build_direct_app(), "/bench/ping").await;
        let dispatched = measure(
            "via dispatcher ",
            build_dispatcher_app(),
            "/api/v1/extensions/bench/ping",
        )
        .await;

        let direct_p50 = direct[direct.len() / 2] as f64 / 1_000_000.0;
        let dispatched_p50 = dispatched[dispatched.len() / 2] as f64 / 1_000_000.0;
        let overhead = dispatched_p50 - direct_p50;
        println!("---");
        println!(
            "p50 overhead = {overhead:.3} ms (dispatcher {dispatched_p50:.3} - direct {direct_p50:.3})",
        );
        if overhead > 1.0 {
            eprintln!("FAIL: SC-007 budget exceeded — overhead {overhead:.3} ms > 1 ms");
            std::process::exit(1);
        }
        println!("PASS: SC-007 (overhead ≤ 1 ms p50)");
    });
}
