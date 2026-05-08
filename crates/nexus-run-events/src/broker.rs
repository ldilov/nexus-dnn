//! In-memory hot-tier broker for `RunEventItem` streams.
//!
//! Producers (worker scrapers, log pipelines) publish coalesced
//! [`EventBatch`] values to a per-run channel. Consumers (Tauri IPC
//! channel commands, axum SSE handlers, in-process inspectors) subscribe
//! to receive live batches and may also walk the buffered history for
//! replay or windowed queries.
//!
//! The broker is intentionally simple — bounded ring buffers per run,
//! a `tokio::sync::broadcast` channel per run for fan-out, and a single
//! mutex guarding the run table. Spec 042 calls out cold-tier IndexedDB
//! and IPC channel batching as the production scale answer; this layer
//! is the in-process hot tier the Lattice + IPC layers consume.

use std::collections::{HashMap, VecDeque};
use std::sync::Arc;

use parking_lot::Mutex;
use tokio::sync::broadcast;

use crate::{EventBatch, RunEventItem, RunId, SeqNum};

/// Default per-run history capacity (events). Older entries are evicted
/// in arrival order once the buffer is full.
pub const DEFAULT_RUN_HISTORY: usize = 4096;

/// Default broadcast subscriber buffer (in batches).
pub const DEFAULT_SUBSCRIBER_BUFFER: usize = 256;

struct RunSlot {
    history: VecDeque<RunEventItem>,
    sender: broadcast::Sender<EventBatch>,
    history_capacity: usize,
}

impl RunSlot {
    fn new(history_capacity: usize, subscriber_buffer: usize) -> Self {
        let (sender, _) = broadcast::channel(subscriber_buffer);
        Self {
            history: VecDeque::with_capacity(history_capacity),
            sender,
            history_capacity,
        }
    }

    fn push_batch(&mut self, batch: &EventBatch) {
        for ev in &batch.events {
            if self.history.len() == self.history_capacity {
                self.history.pop_front();
            }
            self.history.push_back(ev.clone());
        }
        let _ = self.sender.send(batch.clone());
    }

    fn snapshot_window(
        &self,
        from_seq: SeqNum,
        to_seq: SeqNum,
        source_filter: Option<&[String]>,
    ) -> Vec<RunEventItem> {
        let from = from_seq.value();
        let to = to_seq.value();
        self.history
            .iter()
            .filter(|ev| {
                let s = event_seq(ev).value();
                s >= from && s <= to
            })
            .filter(|ev| match source_filter {
                None => true,
                Some(allow) => {
                    let src = event_source(ev);
                    allow.iter().any(|a| a == src)
                }
            })
            .cloned()
            .collect()
    }
}

/// Shared, cloneable handle to the in-memory event broker.
#[derive(Clone, Default)]
pub struct RunEventBroker {
    inner: Arc<BrokerInner>,
}

struct BrokerInner {
    runs: Mutex<HashMap<RunId, RunSlot>>,
    history_capacity: usize,
    subscriber_buffer: usize,
}

impl Default for BrokerInner {
    fn default() -> Self {
        Self {
            runs: Mutex::new(HashMap::new()),
            history_capacity: DEFAULT_RUN_HISTORY,
            subscriber_buffer: DEFAULT_SUBSCRIBER_BUFFER,
        }
    }
}

impl RunEventBroker {
    /// Create a broker with default capacities.
    pub fn new() -> Self {
        Self::default()
    }

    /// Create a broker with custom buffer sizes.
    pub fn with_capacity(history_capacity: usize, subscriber_buffer: usize) -> Self {
        Self {
            inner: Arc::new(BrokerInner {
                runs: Mutex::new(HashMap::new()),
                history_capacity,
                subscriber_buffer,
            }),
        }
    }

    /// Publish a batch to the run's slot, creating the slot if needed.
    pub fn publish(&self, batch: EventBatch) {
        let mut runs = self.inner.runs.lock();
        let slot = runs.entry(batch.run_id.clone()).or_insert_with(|| {
            RunSlot::new(self.inner.history_capacity, self.inner.subscriber_buffer)
        });
        slot.push_batch(&batch);
    }

    /// Subscribe to live batches for a run. Creates the slot on demand
    /// so subscribers can attach before the producer starts.
    pub fn subscribe(&self, run_id: &RunId) -> broadcast::Receiver<EventBatch> {
        let mut runs = self.inner.runs.lock();
        let slot = runs.entry(run_id.clone()).or_insert_with(|| {
            RunSlot::new(self.inner.history_capacity, self.inner.subscriber_buffer)
        });
        slot.sender.subscribe()
    }

    /// Walk the buffered window for a run, returning matched events in
    /// arrival order.
    pub fn query_window(
        &self,
        run_id: &RunId,
        from_seq: SeqNum,
        to_seq: SeqNum,
        source_filter: Option<&[String]>,
    ) -> Vec<RunEventItem> {
        let runs = self.inner.runs.lock();
        match runs.get(run_id) {
            Some(slot) => slot.snapshot_window(from_seq, to_seq, source_filter),
            None => Vec::new(),
        }
    }

    /// Snapshot the full buffered history for a run.
    pub fn snapshot_history(&self, run_id: &RunId) -> Vec<RunEventItem> {
        let runs = self.inner.runs.lock();
        runs.get(run_id)
            .map(|slot| slot.history.iter().cloned().collect())
            .unwrap_or_default()
    }

    /// Return the active run identifiers known to this broker.
    pub fn active_runs(&self) -> Vec<RunId> {
        let runs = self.inner.runs.lock();
        runs.keys().cloned().collect()
    }
}

fn event_seq(ev: &RunEventItem) -> SeqNum {
    match ev {
        RunEventItem::Line { seq, .. }
        | RunEventItem::Phase { seq, .. }
        | RunEventItem::Metric { seq, .. }
        | RunEventItem::TensorAllocate { seq, .. }
        | RunEventItem::Artifact { seq, .. }
        | RunEventItem::Widget { seq, .. }
        | RunEventItem::Error { seq, .. }
        | RunEventItem::Gap { seq, .. }
        | RunEventItem::ScraperUnknown { seq, .. } => *seq,
    }
}

fn event_source(ev: &RunEventItem) -> &str {
    match ev {
        RunEventItem::Line { source, .. }
        | RunEventItem::Phase { source, .. }
        | RunEventItem::Metric { source, .. }
        | RunEventItem::TensorAllocate { source, .. }
        | RunEventItem::Artifact { source, .. }
        | RunEventItem::Widget { source, .. }
        | RunEventItem::Error { source, .. }
        | RunEventItem::Gap { source, .. }
        | RunEventItem::ScraperUnknown { source, .. } => source.as_str(),
    }
}

/// Return the timestamp of an event in milliseconds since the unix epoch.
pub fn event_ts_ms(ev: &RunEventItem) -> u64 {
    match ev {
        RunEventItem::Line { ts_ms, .. }
        | RunEventItem::Phase { ts_ms, .. }
        | RunEventItem::Metric { ts_ms, .. }
        | RunEventItem::TensorAllocate { ts_ms, .. }
        | RunEventItem::Artifact { ts_ms, .. }
        | RunEventItem::Widget { ts_ms, .. }
        | RunEventItem::Error { ts_ms, .. }
        | RunEventItem::Gap { ts_ms, .. }
        | RunEventItem::ScraperUnknown { ts_ms, .. } => *ts_ms,
    }
}

/// Return the severity bucket of an event for bucket-counts aggregation.
pub fn event_severity_bucket(ev: &RunEventItem) -> SeverityBucket {
    match ev {
        RunEventItem::Line { severity, .. } => match severity {
            crate::Severity::Error => SeverityBucket::Error,
            crate::Severity::Warn => SeverityBucket::Warn,
            _ => SeverityBucket::Info,
        },
        RunEventItem::Error { .. } => SeverityBucket::Error,
        RunEventItem::Gap { .. } => SeverityBucket::Warn,
        RunEventItem::ScraperUnknown { .. } => SeverityBucket::Warn,
        _ => SeverityBucket::Info,
    }
}

/// Three-bucket severity classification used by the bucketed query.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum SeverityBucket {
    Info,
    Warn,
    Error,
}

static GLOBAL_BROKER: std::sync::OnceLock<RunEventBroker> = std::sync::OnceLock::new();

/// Return the process-global broker, lazily constructing it on first
/// call. Used by host log-pipeline producers and IPC consumers that
/// don't otherwise share state.
pub fn global() -> &'static RunEventBroker {
    GLOBAL_BROKER.get_or_init(RunEventBroker::new)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{LineStream, SchemaVersion, Severity, SourceId, SCHEMA_V1};

    fn line_event(run: &RunId, seq: u64, ts: u64) -> RunEventItem {
        RunEventItem::Line {
            schema: SCHEMA_V1.clone(),
            seq: SeqNum::new(seq),
            ts_ms: ts,
            run_id: run.clone(),
            source: SourceId::try_new("llamacpp.scraper").unwrap(),
            stream: LineStream::Stderr,
            severity: Severity::Info,
            text: format!("line {seq}"),
            spans: None,
        }
    }

    #[test]
    fn publish_and_snapshot() {
        let broker = RunEventBroker::new();
        let run = RunId::try_new("run-a").unwrap();
        let events = vec![line_event(&run, 1, 100), line_event(&run, 2, 200)];
        broker.publish(EventBatch {
            schema: SchemaVersion::new("nexus.run-event.v1"),
            run_id: run.clone(),
            batch_seq_start: SeqNum::new(1),
            batch_seq_end: SeqNum::new(2),
            events,
        });
        let history = broker.snapshot_history(&run);
        assert_eq!(history.len(), 2);
    }

    #[test]
    fn window_query_filters_by_seq() {
        let broker = RunEventBroker::new();
        let run = RunId::try_new("run-b").unwrap();
        broker.publish(EventBatch {
            schema: SCHEMA_V1.clone(),
            run_id: run.clone(),
            batch_seq_start: SeqNum::new(1),
            batch_seq_end: SeqNum::new(3),
            events: vec![
                line_event(&run, 1, 0),
                line_event(&run, 2, 0),
                line_event(&run, 3, 0),
            ],
        });
        let window = broker.query_window(&run, SeqNum::new(2), SeqNum::new(2), None);
        assert_eq!(window.len(), 1);
    }
}
