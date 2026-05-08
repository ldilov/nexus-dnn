//! `GET /api/host/metrics/stream?names=&window_ms=` — browser-dev SSE
//! fallback for `cmd_pulse_floor_metrics_subscribe` (spec 042 Phase 5).
//!
//! Subscribes to the in-memory broker, filters `RunEventItem::Metric`
//! events by the requested name set, and emits one
//! `MetricSample` JSON message per `(metric_name, window_ms)` slot.
//! When a metric source has produced no event within
//! [`UNAVAILABLE_TIMEOUT_MS`], `available: false` is emitted so the
//! trace renders dimmed (FR-055). Direct GPU sensor probing is a
//! follow-up — this stage covers anything published to the broker.

use std::collections::{HashMap, HashSet};
use std::convert::Infallible;
use std::sync::{Arc, Mutex};
use std::time::{Duration, SystemTime, UNIX_EPOCH};

use axum::extract::Query;
use axum::response::sse::{Event, KeepAlive, Sse};
use futures_util::stream::Stream;
use nexus_run_events::broker;
use nexus_run_events::{RunEventItem, RunId};
use serde::{Deserialize, Serialize};
use tokio::sync::mpsc;
use tokio::time::interval;
use tokio_stream::StreamExt;
use tokio_stream::wrappers::ReceiverStream;

const UNAVAILABLE_TIMEOUT_MS: u64 = 5_000;
const MIN_WINDOW_MS: u64 = 100;
const DEFAULT_WINDOW_MS: u64 = 250;

#[derive(Debug, Deserialize)]
pub struct MetricsStreamQuery {
    #[serde(default)]
    pub names: Option<String>,
    #[serde(default)]
    pub window_ms: Option<u64>,
}

#[derive(Debug, Clone, Serialize)]
pub struct MetricSample {
    pub metric_name: String,
    pub value: f64,
    pub ts_ms: u64,
    pub available: bool,
}

#[derive(Default)]
struct SlotState {
    last_value: Option<f64>,
    last_seen_ms: Option<u64>,
}

#[derive(Default)]
struct SamplerInner {
    by_name: HashMap<String, SlotState>,
}

#[derive(Clone, Default)]
struct SamplerState {
    inner: Arc<Mutex<SamplerInner>>,
}

impl SamplerState {
    fn new(names: &HashSet<String>) -> Self {
        let mut inner = SamplerInner::default();
        for name in names {
            inner.by_name.insert(name.clone(), SlotState::default());
        }
        Self {
            inner: Arc::new(Mutex::new(inner)),
        }
    }

    fn record(&self, name: &str, value: f64, ts_ms: u64) {
        let mut guard = self.inner.lock().expect("sampler mutex poisoned");
        if let Some(slot) = guard.by_name.get_mut(name) {
            slot.last_value = Some(value);
            slot.last_seen_ms = Some(ts_ms);
        }
    }

    fn snapshot_for(&self, name: &str, now_ms: u64) -> MetricSample {
        let guard = self.inner.lock().expect("sampler mutex poisoned read");
        match guard.by_name.get(name) {
            Some(s) => {
                let fresh = s
                    .last_seen_ms
                    .map(|seen| now_ms.saturating_sub(seen) <= UNAVAILABLE_TIMEOUT_MS)
                    .unwrap_or(false);
                MetricSample {
                    metric_name: name.to_owned(),
                    value: s.last_value.unwrap_or(0.0),
                    ts_ms: now_ms,
                    available: fresh,
                }
            }
            None => MetricSample {
                metric_name: name.to_owned(),
                value: 0.0,
                ts_ms: now_ms,
                available: false,
            },
        }
    }
}

/// SSE stream of `MetricSample` JSON messages for the requested
/// metrics. Empty `names=` falls back to no metrics — the caller must
/// supply at least one name. The keep-alive interval matches the
/// run-events stream (15s).
pub async fn stream_metrics(
    Query(query): Query<MetricsStreamQuery>,
) -> Sse<impl Stream<Item = Result<Event, Infallible>>> {
    let names = parse_names(query.names.as_deref());
    let window_ms = query
        .window_ms
        .map(|w| w.max(MIN_WINDOW_MS))
        .unwrap_or(DEFAULT_WINDOW_MS);
    let stream = build_metrics_stream(names, window_ms);
    Sse::new(stream).keep_alive(KeepAlive::new().interval(Duration::from_secs(15)))
}

fn parse_names(csv: Option<&str>) -> HashSet<String> {
    match csv {
        None => HashSet::new(),
        Some(s) => s
            .split(',')
            .map(str::trim)
            .filter(|t| !t.is_empty())
            .map(|t| t.to_owned())
            .collect(),
    }
}

fn build_metrics_stream(
    names: HashSet<String>,
    window_ms: u64,
) -> impl Stream<Item = Result<Event, Infallible>> {
    let (tx, rx) = mpsc::channel::<MetricSample>(256);
    if names.is_empty() {
        drop(tx);
        return ReceiverStream::new(rx).map(serialise);
    }
    let state = SamplerState::new(&names);
    spawn_metric_listeners(state.clone(), &names);
    spawn_emitter(state, names, window_ms, tx);
    ReceiverStream::new(rx).map(serialise)
}

fn serialise(sample: MetricSample) -> Result<Event, Infallible> {
    let json = serde_json::to_string(&sample).unwrap_or_else(|_| "{}".to_owned());
    Ok(Event::default().data(json))
}

fn spawn_metric_listeners(state: SamplerState, names: &HashSet<String>) {
    let broker = broker::global().clone();
    let active_runs: Vec<RunId> = broker.active_runs();
    for run in active_runs {
        let mut rx = broker.subscribe(&run);
        let state = state.clone();
        let names = names.clone();
        tokio::spawn(async move {
            while let Ok(batch) = rx.recv().await {
                for ev in batch.events {
                    if let RunEventItem::Metric {
                        name, value, ts_ms, ..
                    } = ev
                    {
                        if names.contains(&name) {
                            state.record(&name, value, ts_ms);
                        }
                    }
                }
            }
        });
    }
}

fn spawn_emitter(
    state: SamplerState,
    names: HashSet<String>,
    window_ms: u64,
    tx: mpsc::Sender<MetricSample>,
) {
    let names: Vec<String> = names.into_iter().collect();
    tokio::spawn(async move {
        let mut ticker = interval(Duration::from_millis(window_ms));
        loop {
            ticker.tick().await;
            let now_ms = current_ts_ms();
            for name in &names {
                let sample = state.snapshot_for(name, now_ms);
                if tx.send(sample).await.is_err() {
                    return;
                }
            }
        }
    });
}

fn current_ts_ms() -> u64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_millis() as u64)
        .unwrap_or(0)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parse_names_handles_csv() {
        let parsed = parse_names(Some("a,b,c"));
        assert!(parsed.contains("a"));
        assert!(parsed.contains("b"));
        assert!(parsed.contains("c"));
    }

    #[test]
    fn parse_names_strips_whitespace_and_empties() {
        let parsed = parse_names(Some(" a , , b "));
        assert_eq!(parsed.len(), 2);
        assert!(parsed.contains("a"));
        assert!(parsed.contains("b"));
    }

    #[test]
    fn snapshot_marks_unknown_unavailable() {
        let mut names = HashSet::new();
        names.insert("vram.utilization".to_owned());
        let state = SamplerState::new(&names);
        let s = state.snapshot_for("vram.utilization", 1_000);
        assert!(!s.available);
    }
}
