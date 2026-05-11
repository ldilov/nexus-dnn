//! Spec 044 T120a — cold-start latency microbench.
//!
//! Target (per `tasks.md` + SC-010): launch → first event displayed ≤ 1 s on a
//! developer-grade machine with the host already running.
//!
//! This criterion harness measures the **in-process** cold-start cost: the
//! sub-second portion of the wall-clock budget that we can regress on
//! deterministically without spawning a subprocess. Specifically:
//!
//!   * tokio runtime construction (multi-thread)
//!   * runtime data-plane setup (ring buffer, filter, hold queue, prompt,
//!     click-registry, controller channels)
//!   * brand renderer warmup
//!   * the FR-076 pre-display pipeline applied to one synthetic event
//!     (filter.is_visible → rate_guard → hold_queue → render_event_line)
//!
//! The full subprocess wall-clock measurement (`launch nexus → SSE event →
//! rendered line`) is captured by the T053 manual smoke. The point of this
//! bench is regression detection on the parts we own.

use std::collections::VecDeque;
use std::io::{Write, sink};
use std::sync::{Arc, Mutex, RwLock};
use std::time::Instant;

use criterion::{Criterion, black_box, criterion_group, criterion_main};
use nexus_events::types::NexusEvent;
use nexus_tui::EventLine;
use nexus_tui::controller::ControllerHandles;
use nexus_tui::mouse::targets::ClickRegistry;
use nexus_tui::render::brand::render_brand;
use nexus_tui::render::event_line::{RenderConfig, render_event_line};
use nexus_tui::repl::ansi::{ColorDepth, detect_color_depth};
use nexus_tui::repl::prompt::AmbientPrompt;
use nexus_tui::stream::event_id::RingBufferCapacity;
use nexus_tui::stream::filter::FilterState;
use nexus_tui::stream::hold_queue::{EnqueueResult, HoldQueue};
use nexus_tui::stream::rate_guard::{RateGuard, RateGuardDecision};
use nexus_tui::stream::ring_buffer::RingBuffer;
use nexus_tui::stream::severity::Severity;
use tokio_util::sync::CancellationToken;

fn build_synthetic_event() -> EventLine {
    EventLine::from_nexus_event(NexusEvent::RunCreated {
        run_id: "01HK3QABRT9XSPK7C8FNJ6QYZ4".to_string(),
        workflow_id: "wf-cold-start".to_string(),
    })
}

type RuntimeParts = (
    Arc<Mutex<RingBuffer>>,
    Arc<RwLock<FilterState>>,
    Arc<Mutex<HoldQueue>>,
    Arc<Mutex<ClickRegistry>>,
    AmbientPrompt,
    ControllerHandles,
);

fn build_runtime_components() -> RuntimeParts {
    let click_registry = Arc::new(Mutex::new(ClickRegistry::default()));
    let prompt = AmbientPrompt::new().with_click_registry(Arc::clone(&click_registry));
    let prompt_state = prompt.handle();

    let capacity = RingBufferCapacity::new(50_000).expect("valid capacity");
    let ring = Arc::new(Mutex::new(RingBuffer::new(capacity)));

    let mut initial_filter = FilterState::default();
    initial_filter.set_level_floor(Severity::Info);
    let filter = Arc::new(RwLock::new(initial_filter));
    let hold_queue = Arc::new(Mutex::new(HoldQueue::default()));

    let shutdown = CancellationToken::new();
    let rate_snapshot = Arc::new(Mutex::new(
        nexus_tui::stream::rate_guard::RateGuardSnapshot::default(),
    ));
    let (handles, _rx) = ControllerHandles::new(
        Arc::clone(&filter),
        Arc::clone(&hold_queue),
        Arc::clone(&prompt_state),
        Arc::clone(&ring),
        rate_snapshot,
        shutdown,
    );

    (ring, filter, hold_queue, click_registry, prompt, handles)
}

fn run_first_event(
    line: &EventLine,
    ring: &Arc<Mutex<RingBuffer>>,
    filter: &Arc<RwLock<FilterState>>,
    hold_queue: &Arc<Mutex<HoldQueue>>,
    depth: ColorDepth,
) {
    {
        let mut buf = ring.lock().expect("ring poisoned");
        buf.push(line.clone());
    }
    let visible = filter.read().map(|f| f.is_visible(line)).unwrap_or(false);
    if !visible {
        return;
    }
    let mut rate_guard = RateGuard::default();
    let now = Instant::now();
    let decision = rate_guard.observe(&line.source, &line.summary, now);
    let to_render = match decision {
        RateGuardDecision::Render => Some(line.clone()),
        _ => None,
    };
    let Some(render_line) = to_render else {
        return;
    };
    let cfg = RenderConfig {
        color_depth: depth,
        critical_border: false,
        hover_target: None,
        thread_leaf: false,
        ascii_glyphs: false,
    };
    let mut q = hold_queue.lock().expect("hold queue poisoned");
    match q.try_enqueue(render_line.clone()) {
        EnqueueResult::Held | EnqueueResult::Overflow => {}
        EnqueueResult::Passthrough(line) => {
            let rendered = render_event_line(&line, &cfg);
            let mut sink = sink();
            let _ = sink.write_all(rendered.as_bytes());
        }
    }
}

fn bench_cold_start_components(c: &mut Criterion) {
    let mut group = c.benchmark_group("cold_start");
    group.sample_size(20);

    group.bench_function("data_plane_setup", |b| {
        b.iter(|| {
            let parts = build_runtime_components();
            black_box(parts);
        });
    });

    group.bench_function("brand_render_truecolor", |b| {
        b.iter(|| {
            let s = render_brand(ColorDepth::Truecolor);
            black_box(s);
        });
    });

    group.bench_function("brand_render_color16", |b| {
        b.iter(|| {
            let s = render_brand(ColorDepth::Color16);
            black_box(s);
        });
    });

    group.bench_function("color_depth_detect", |b| {
        b.iter(|| {
            black_box(detect_color_depth());
        });
    });

    group.bench_function("first_event_pipeline", |b| {
        let depth = ColorDepth::Truecolor;
        b.iter_batched(
            || {
                let parts = build_runtime_components();
                let event = build_synthetic_event();
                (parts, event)
            },
            |((ring, filter, hold_queue, _click, _prompt, _handles), event)| {
                run_first_event(&event, &ring, &filter, &hold_queue, depth);
            },
            criterion::BatchSize::SmallInput,
        );
    });

    group.bench_function("setup_plus_first_event", |b| {
        let depth = ColorDepth::Truecolor;
        b.iter(|| {
            let (ring, filter, hold_queue, _click, _prompt, _handles) = build_runtime_components();
            let event = build_synthetic_event();
            run_first_event(&event, &ring, &filter, &hold_queue, depth);
        });
    });

    group.finish();
}

fn bench_tokio_runtime_warmup(c: &mut Criterion) {
    let mut group = c.benchmark_group("cold_start_tokio");
    group.sample_size(20);

    group.bench_function("multi_thread_runtime_construction", |b| {
        b.iter(|| {
            let rt = tokio::runtime::Builder::new_multi_thread()
                .worker_threads(2)
                .enable_all()
                .build()
                .expect("rt build");
            black_box(&rt);
            drop(rt);
        });
    });

    group.bench_function("warmup_one_async_task", |b| {
        b.iter(|| {
            let rt = tokio::runtime::Builder::new_multi_thread()
                .worker_threads(2)
                .enable_all()
                .build()
                .expect("rt build");
            rt.block_on(async {
                let _ = VecDeque::<u32>::with_capacity(60);
            });
            black_box(&rt);
            drop(rt);
        });
    });

    group.finish();
}

criterion_group!(
    benches,
    bench_cold_start_components,
    bench_tokio_runtime_warmup
);
criterion_main!(benches);
