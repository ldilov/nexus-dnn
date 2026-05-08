//! `cmd_pulse_floor_metrics_subscribe` — system-wide metric stream for the Pulse-Floor.
//!
//! Phase 5 (US3) wires the broker-backed sampler. The host fans every
//! `RunEventItem::Metric` whose `name` matches one of the requested
//! `metric_names` into a windowed sampler that emits one
//! [`MetricSample`] per `(metric_name, window_ms)` slot. When a metric
//! source has not produced an event within
//! [`UNAVAILABLE_TIMEOUT_MS`], an `available: false` sample is emitted
//! so the trace renders dimmed (FR-055).
//!
//! Source coverage in this stage is whatever the broker already
//! receives — runtime workers publishing `kind: "metric"` events.
//! Direct GPU sensor probing (NVML / Metal / SYCL) is a follow-up that
//! lives behind the same channel contract.

use std::collections::{HashMap, HashSet};
use std::sync::{Arc, Mutex};
use std::time::{Duration, SystemTime, UNIX_EPOCH};

use crate::errors::{IpcError, IpcResult};
use crate::ipc::SCHEMA_V1;
use nexus_run_events::broker;
use nexus_run_events::{RunEventItem, RunId};
use serde::{Deserialize, Serialize};
use tauri::ipc::Channel;
use tokio::time::interval;

/// Window after which a metric without fresh samples is reported as
/// `available: false`. Matches the spec's "no recent metric in 5s →
/// unavailable" guidance.
const UNAVAILABLE_TIMEOUT_MS: u64 = 5_000;

/// Minimum sampler cadence — the host enforces this so a misbehaving
/// caller cannot pin a runtime task at 1ms.
const MIN_WINDOW_MS: u64 = 100;

#[derive(Debug, Deserialize)]
pub struct SubscribeInput {
    pub schema: String,
    pub metric_names: Vec<String>,
    pub window_ms: u64,
}

#[derive(Debug, Serialize)]
pub struct SubscribeOutput {
    pub schema: String,
    pub subscription_id: String,
}

/// One sampler emission. Mirrors the TS `MetricSample` shape so the
/// frontend can consume the channel without translation.
#[derive(Debug, Clone, Serialize)]
pub struct MetricSample {
    pub metric_name: String,
    pub value: f64,
    pub ts_ms: u64,
    pub available: bool,
}

#[tauri::command]
pub async fn cmd_pulse_floor_metrics_subscribe(
    input: SubscribeInput,
    on_sample: Channel<MetricSample>,
) -> IpcResult<SubscribeOutput> {
    if input.schema != SCHEMA_V1 {
        return Err(IpcError::SchemaMismatch(input.schema));
    }
    let window_ms = input.window_ms.max(MIN_WINDOW_MS);
    let names: HashSet<String> = input.metric_names.into_iter().collect();
    if names.is_empty() {
        return Err(IpcError::Validation(
            "metric_names must not be empty".into(),
        ));
    }
    let state = SamplerState::new(&names);
    let broker = broker::global().clone();
    let active_runs = broker.active_runs();
    spawn_metric_listeners(state.clone(), names.clone(), &active_runs);
    spawn_emitter(state, names, window_ms, on_sample);
    Ok(SubscribeOutput {
        schema: SCHEMA_V1.to_owned(),
        subscription_id: new_subscription_id(),
    })
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
        let slot = guard.by_name.get(name);
        match slot {
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

fn spawn_metric_listeners(state: SamplerState, names: HashSet<String>, runs: &[RunId]) {
    let broker = broker::global().clone();
    for run in runs {
        let mut rx = broker.subscribe(run);
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
    channel: Channel<MetricSample>,
) {
    let names: Vec<String> = names.into_iter().collect();
    tokio::spawn(async move {
        let mut ticker = interval(Duration::from_millis(window_ms));
        loop {
            ticker.tick().await;
            let now_ms = current_ts_ms();
            for name in &names {
                let sample = state.snapshot_for(name, now_ms);
                if channel.send(sample).is_err() {
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

fn new_subscription_id() -> String {
    let nanos = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_nanos())
        .unwrap_or(0);
    format!("pf-sub-{nanos:032x}")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn unknown_metric_reports_unavailable() {
        let names: HashSet<String> = ["vram.utilization".to_string()].into_iter().collect();
        let state = SamplerState::new(&names);
        let now = 1_000_000;
        let sample = state.snapshot_for("vram.utilization", now);
        assert!(!sample.available);
        assert_eq!(sample.value, 0.0);
        assert_eq!(sample.metric_name, "vram.utilization");
    }

    #[test]
    fn fresh_metric_reports_available() {
        let names: HashSet<String> = ["ram.utilization".to_string()].into_iter().collect();
        let state = SamplerState::new(&names);
        state.record("ram.utilization", 0.62, 1_000);
        let sample = state.snapshot_for("ram.utilization", 2_000);
        assert!(sample.available);
        assert_eq!(sample.value, 0.62);
    }

    #[test]
    fn stale_metric_reports_unavailable() {
        let names: HashSet<String> = ["leases.active".to_string()].into_iter().collect();
        let state = SamplerState::new(&names);
        state.record("leases.active", 4.0, 0);
        let sample = state.snapshot_for("leases.active", UNAVAILABLE_TIMEOUT_MS + 1_000);
        assert!(!sample.available);
        assert_eq!(sample.value, 4.0);
    }
}
