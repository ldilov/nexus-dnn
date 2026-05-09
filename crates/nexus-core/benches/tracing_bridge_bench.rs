//! Spec 044 T120 — tracing-bridge full-pipeline microbenchmark.
//!
//! Targets (per `tasks.md`):
//!   * typical 5-field event (no redactions)            — p95 ≤ 5 µs
//!   * pathological 20-field event (5 redactions)       — p95 ≤ 20 µs
//!
//! Pipeline measured: `tracing::event!()` → metadata filter → rate-limit check →
//! `HostLogVisitor` field collection → redaction pass → `EventBus::publish`.
//! The bench installs a global tracing subscriber once and uses a no-op event bus
//! so we measure only the bridge-layer overhead.

use std::sync::{Arc, Once};

use criterion::{Criterion, black_box, criterion_group, criterion_main};
use nexus_core::tracing_bridge::{TargetFilter, TracingBridgeLayer};
use nexus_events::bus::{EventBus, EventSubscription, PublishedEvent};
use nexus_events::redaction::SensitiveNameAllowlist;
use nexus_events::types::NexusEvent;
use tracing::Level;
use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;

#[derive(Default)]
struct NoOpBus;

impl EventBus for NoOpBus {
    fn publish(&self, event: NexusEvent) -> PublishedEvent {
        PublishedEvent {
            id: String::new(),
            event,
        }
    }

    fn subscribe(&self) -> EventSubscription {
        unreachable!("bench bus does not subscribe")
    }

    fn subscribe_from(&self, _after: Option<&str>) -> EventSubscription {
        unreachable!("bench bus does not subscribe_from")
    }

    fn replay_after(&self, _after: Option<&str>) -> Vec<PublishedEvent> {
        Vec::new()
    }

    fn subscriber_count(&self) -> usize {
        0
    }
}

static INSTALL: Once = Once::new();

fn install_subscriber() {
    INSTALL.call_once(|| {
        let bus: Arc<dyn EventBus> = Arc::new(NoOpBus);
        let layer = TracingBridgeLayer::new(
            bus,
            SensitiveNameAllowlist::default(),
            TargetFilter::new(vec![]),
        )
        .with_rate_limit(usize::MAX);
        let _ = tracing_subscriber::registry()
            .with(tracing_subscriber::filter::LevelFilter::from_level(
                Level::INFO,
            ))
            .with(layer)
            .try_init();
    });
}

fn bench_tracing_bridge(c: &mut Criterion) {
    install_subscriber();

    let mut group = c.benchmark_group("tracing_bridge");

    group.bench_function("typical_5_fields", |b| {
        b.iter(|| {
            tracing::info!(
                target: "nexus_tui_bench::typical",
                run_id = black_box("01HK3QABRT9XSPK7C8FNJ6QYZ4"),
                status = black_box("ok"),
                latency_ms = black_box(42_u32),
                backend = black_box("llamacpp"),
                workflow_id = black_box("wf-abc"),
                "tick"
            );
        });
    });

    group.bench_function("pathological_20_fields_5_redactions", |b| {
        b.iter(|| {
            tracing::info!(
                target: "nexus_tui_bench::pathological",
                f01 = black_box("v1"),
                f02 = black_box("v2"),
                f03 = black_box("v3"),
                f04 = black_box("v4"),
                f05 = black_box("v5"),
                f06 = black_box("v6"),
                f07 = black_box("v7"),
                f08 = black_box("v8"),
                f09 = black_box("v9"),
                f10 = black_box("v10"),
                f11 = black_box("v11"),
                f12 = black_box("v12"),
                f13 = black_box("v13"),
                f14 = black_box("v14"),
                f15 = black_box("v15"),
                password = black_box("p"),
                api_key = black_box("a"),
                session_token = black_box("t"),
                authorization = black_box("z"),
                private_key = black_box("k"),
                "burst"
            );
        });
    });

    group.bench_function("filtered_out_target", |b| {
        b.iter(|| {
            tracing::debug!(
                target: "hyper::client",
                method = black_box("GET"),
                "request"
            );
        });
    });

    group.bench_function("no_fields", |b| {
        b.iter(|| {
            tracing::info!(target: "nexus_tui_bench::empty", "ping");
        });
    });

    group.finish();
}

criterion_group!(benches, bench_tracing_bridge);
criterion_main!(benches);
