//! Spec 044 T120b — end-to-end render-throughput perf harness.
//!
//! Targets (per `tasks.md` + SC-004 + SC-005):
//!   * **Sustained 1 000 events / minute for 60 s** — zero drops; every
//!     visible line must reach the renderer (passthrough), the hold queue
//!     must never overflow, and the rate-guard must not condense.
//!   * **Burst 10 000 events / 2 s** — no screen corruption; the
//!     `≫ N events condensed` indicator must fire (rate-exceeded visible),
//!     and the run finishes without panic.
//!
//! The harness exercises the FR-076 pre-display pipeline directly
//! (`ring_buffer.push → filter.is_visible → rate_guard → hold_queue → render`)
//! against a synthetic event generator. We bypass the SSE transport: that's
//! covered by the T053 manual smoke and is an HTTP-network concern,
//! orthogonal to the rendering throughput question this gate answers.
//!
//! Both tests are `#[ignore]` because the sustained variant takes 60 s of
//! wall time; run with `cargo test -p nexus-tui --test perf_throughput
//! -- --ignored --nocapture`. Two faster CI-friendly variants run by
//! default and assert the same invariants on shorter windows.

use std::io::{Write, sink};
use std::sync::{Arc, Mutex, RwLock};
use std::time::{Duration, Instant};

use std::collections::BTreeMap;

use nexus_events::types::NexusEvent;
use nexus_tui::EventLine;
use nexus_tui::mouse::targets::ClickRegistry;
use nexus_tui::render::event_line::{RenderConfig, render_event_line};
use nexus_tui::repl::ansi::ColorDepth;
use nexus_tui::repl::prompt::AmbientPrompt;
use nexus_tui::stream::event_id::RingBufferCapacity;
use nexus_tui::stream::filter::FilterState;
use nexus_tui::stream::hold_queue::{EnqueueResult, HoldQueue};
use nexus_tui::stream::rate_guard::{RateGuard, RateGuardDecision};
use nexus_tui::stream::ring_buffer::RingBuffer;
use nexus_tui::stream::severity::Severity;
use nexus_tui::stream::significance::Significance;
use tokio::sync::mpsc;

#[derive(Debug, Default, Clone)]
struct PipelineMetrics {
    delivered: u64,
    rendered: u64,
    repeats: u64,
    condensed_events: u64,
    condensed_decisions: u64,
    held: u64,
    overflow: u64,
    not_visible: u64,
    max_input_lag: Duration,
    sum_input_lag: Duration,
    sample_count: u64,
}

impl PipelineMetrics {
    fn record_lag(&mut self, lag: Duration) {
        if lag > self.max_input_lag {
            self.max_input_lag = lag;
        }
        self.sum_input_lag += lag;
        self.sample_count = self.sample_count.saturating_add(1);
    }

    fn average_lag(&self) -> Duration {
        if self.sample_count == 0 {
            Duration::ZERO
        } else {
            self.sum_input_lag / self.sample_count as u32
        }
    }
}

struct PipelineHarness {
    ring: Arc<Mutex<RingBuffer>>,
    filter: Arc<RwLock<FilterState>>,
    hold_queue: Arc<Mutex<HoldQueue>>,
    rate_guard: RateGuard,
    metrics: PipelineMetrics,
    render_cfg: RenderConfig,
    saw_critical_border: bool,
}

impl PipelineHarness {
    fn new(ring_capacity: usize) -> Self {
        let _click_registry = Arc::new(Mutex::new(ClickRegistry::default()));
        let _prompt = AmbientPrompt::new();

        let capacity = RingBufferCapacity::new(ring_capacity).expect("valid capacity");
        let ring = Arc::new(Mutex::new(RingBuffer::new(capacity)));
        let mut filter = FilterState::default();
        filter.set_level_floor(Severity::Info);
        let filter = Arc::new(RwLock::new(filter));
        let hold_queue = Arc::new(Mutex::new(HoldQueue::default()));

        Self {
            ring,
            filter,
            hold_queue,
            rate_guard: RateGuard::default(),
            metrics: PipelineMetrics::default(),
            render_cfg: RenderConfig {
                color_depth: ColorDepth::Truecolor,
                critical_border: false,
                hover_target: None,
                thread_leaf: false,
                ascii_glyphs: false,
                correlation_depth: 0,
                luminance_ladder: false,
                grep_highlight: None,
            },
            saw_critical_border: false,
        }
    }

    fn process(&mut self, line: EventLine, enqueued_at: Instant) {
        self.metrics.delivered = self.metrics.delivered.saturating_add(1);

        {
            let mut buf = self.ring.lock().expect("ring poisoned");
            buf.push(line.clone());
        }

        let visible = self
            .filter
            .read()
            .map(|f| f.is_visible(&line))
            .unwrap_or(false);
        if !visible {
            self.metrics.not_visible = self.metrics.not_visible.saturating_add(1);
            return;
        }

        let now = Instant::now();
        let decision = self.rate_guard.observe(&line.source, &line.summary, now);
        match decision {
            RateGuardDecision::Render => {
                let to_render = line.clone();
                let mut q = self.hold_queue.lock().expect("hold queue poisoned");
                match q.try_enqueue(to_render) {
                    EnqueueResult::Held => {
                        self.metrics.held = self.metrics.held.saturating_add(1);
                    }
                    EnqueueResult::Overflow => {
                        self.metrics.overflow = self.metrics.overflow.saturating_add(1);
                    }
                    EnqueueResult::Passthrough(rendered_line) => {
                        if matches!(rendered_line.significance, Significance::Critical) {
                            self.saw_critical_border = true;
                        }
                        let rendered = render_event_line(&rendered_line, &self.render_cfg);
                        let mut sink = sink();
                        sink.write_all(rendered.as_bytes())
                            .expect("sink write should not fail");
                        sink.write_all(b"\n").ok();
                        self.metrics.rendered = self.metrics.rendered.saturating_add(1);
                    }
                }
            }
            RateGuardDecision::Repeat { .. } => {
                self.metrics.repeats = self.metrics.repeats.saturating_add(1);
            }
            RateGuardDecision::Condensed { dropped, .. } => {
                self.metrics.condensed_decisions =
                    self.metrics.condensed_decisions.saturating_add(1);
                self.metrics.condensed_events = self
                    .metrics
                    .condensed_events
                    .saturating_add(u64::from(dropped));
            }
        }

        let lag = Instant::now().duration_since(enqueued_at);
        self.metrics.record_lag(lag);
    }

    fn metrics(&self) -> &PipelineMetrics {
        &self.metrics
    }
}

/// Emit a `HostLog` event so `EventLine.source` is exactly `host.{target}`,
/// giving the test precise control over the rate-guard's per-source bucket.
/// The summary is per-`seq` to defeat repeat-collapse.
fn synthesise_event(seq: u64, source_pool: &[&str]) -> EventLine {
    let target = source_pool[(seq % source_pool.len() as u64) as usize];
    let event = NexusEvent::HostLog {
        level: "info".to_string(),
        target: target.to_string(),
        message: format!("synthetic tick #{seq} from {target}"),
        fields: BTreeMap::new(),
        span_path: None,
        timestamp_ms: 0,
    };
    EventLine::from_nexus_event(event)
}

async fn drive_pipeline(
    harness: &mut PipelineHarness,
    total_events: u64,
    duration: Option<Duration>,
    source_pool: &[&str],
) {
    let (tx, mut rx) = mpsc::channel::<(EventLine, Instant)>(1024);

    let total = total_events;
    let window = duration;
    let pool: Vec<&'static str> = source_pool
        .iter()
        .map(|s| {
            // Leak — test-only, source pool stays for process lifetime.
            Box::leak(Box::<str>::from(*s)) as &'static str
        })
        .collect();

    let producer = tokio::spawn(async move {
        let start = Instant::now();
        for seq in 0..total {
            let event = synthesise_event(seq, &pool);
            let now = Instant::now();
            if tx.send((event, now)).await.is_err() {
                return;
            }
            if let Some(window) = window {
                let target_offset = window.mul_f64((seq + 1) as f64 / total as f64);
                let elapsed = start.elapsed();
                if elapsed < target_offset {
                    let wait = target_offset - elapsed;
                    tokio::time::sleep(wait).await;
                }
            }
        }
        drop(tx);
    });

    while let Some((event, enqueued_at)) = rx.recv().await {
        harness.process(event, enqueued_at);
    }

    let _ = producer.await;
}

fn pretty_metrics(label: &str, metrics: &PipelineMetrics) {
    eprintln!(
        "[{label}] delivered={} rendered={} repeats={} held={} overflow={} \
         condensed_events={} condensed_decisions={} not_visible={} \
         max_lag={:?} avg_lag={:?}",
        metrics.delivered,
        metrics.rendered,
        metrics.repeats,
        metrics.held,
        metrics.overflow,
        metrics.condensed_events,
        metrics.condensed_decisions,
        metrics.not_visible,
        metrics.max_input_lag,
        metrics.average_lag(),
    );
}

const SUSTAINED_EVENTS: u64 = 1_000;
const BURST_EVENTS: u64 = 10_000;

/// CI-fast variant: 1 000 events spread over 6 s (10× the spec rate).
/// Same drop/overflow/condense invariants as the full 60 s run — proves
/// the steady-state pipeline doesn't drop at the spec's sustained rate.
#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
async fn sustained_short_window_zero_drops() {
    let mut harness = PipelineHarness::new(50_000);
    let pool = ["host", "scheduler", "worker", "extension"];
    drive_pipeline(
        &mut harness,
        SUSTAINED_EVENTS,
        Some(Duration::from_secs(6)),
        &pool,
    )
    .await;
    pretty_metrics("sustained_short", harness.metrics());

    let m = harness.metrics();
    assert_eq!(
        m.delivered, SUSTAINED_EVENTS,
        "all events should be delivered"
    );
    assert_eq!(m.overflow, 0, "hold-queue overflow on sustained traffic");
    assert_eq!(
        m.condensed_decisions, 0,
        "rate-guard must not condense at the sustained rate (≪ 200 evt/s threshold)"
    );
    assert!(
        m.rendered + m.repeats == m.delivered,
        "every visible event accounted for: rendered ({}) + repeats ({}) != delivered ({})",
        m.rendered,
        m.repeats,
        m.delivered,
    );
    assert!(
        m.max_input_lag < Duration::from_millis(500),
        "max input lag exceeded 500ms: {:?}",
        m.max_input_lag
    );
}

/// CI-fast variant: 10 000 events in 2 s. The rate-guard must condense
/// (≥ 1 condensed decision) and the harness finishes without panic.
#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
async fn burst_triggers_rate_exceeded_indicator() {
    let mut harness = PipelineHarness::new(50_000);
    let pool = ["burst-source-a", "burst-source-b"];
    drive_pipeline(
        &mut harness,
        BURST_EVENTS,
        Some(Duration::from_secs(2)),
        &pool,
    )
    .await;
    pretty_metrics("burst", harness.metrics());

    let m = harness.metrics();
    assert_eq!(m.delivered, BURST_EVENTS);
    assert!(
        m.condensed_decisions > 0,
        "rate-guard should condense during a 5 K evt/s burst"
    );
    assert!(
        m.condensed_events > 0,
        "condensed event count should be non-zero"
    );
    let accounted_for =
        m.rendered + m.repeats + m.condensed_decisions + m.held + m.overflow + m.not_visible;
    assert_eq!(
        accounted_for,
        m.delivered,
        "all decisions accounted for: rendered={} repeats={} condensed_dec={} held={} overflow={} not_visible={} delivered={}",
        m.rendered,
        m.repeats,
        m.condensed_decisions,
        m.held,
        m.overflow,
        m.not_visible,
        m.delivered,
    );
}

/// Full-duration spec gate: 1 000 events over 60 s, zero drops.
/// `--ignored` because of the wall-clock cost.
#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
#[ignore = "60s wall-clock; opt in via `--ignored`"]
async fn sustained_full_minute_zero_drops() {
    let mut harness = PipelineHarness::new(50_000);
    let pool = ["host", "scheduler", "worker", "extension"];
    drive_pipeline(
        &mut harness,
        SUSTAINED_EVENTS,
        Some(Duration::from_secs(60)),
        &pool,
    )
    .await;
    pretty_metrics("sustained_full", harness.metrics());

    let m = harness.metrics();
    assert_eq!(m.delivered, SUSTAINED_EVENTS);
    assert_eq!(m.overflow, 0);
    assert_eq!(m.condensed_decisions, 0);
}
