//! `cmd_run_events_*` — RunEvent streaming + windowed query + bucketed counts.
//!
//! The commands surface the host's [`nexus_run_events::RunEventBroker`]
//! to the Tauri frontend. Streaming uses the `tauri::ipc::Channel`
//! transport; the window and bucket queries return JSON snapshots.
//! See [`contracts/ipc-commands.md`](../../../specs/042-neo-terminal-shell/contracts/ipc-commands.md)
//! for the wire shape.

use std::collections::BTreeMap;

use crate::errors::{IpcError, IpcResult};
use crate::ipc::SCHEMA_V1;
use nexus_run_events::broker;
use nexus_run_events::{
    event_severity_bucket, event_ts_ms, EventBatch, GapReason, RunEventBroker, RunEventItem, RunId,
    SeqNum, SeverityBucket,
};
use serde::{Deserialize, Serialize};
use tauri::ipc::Channel;
use uuid_compat::new_v4_str;

/// Request payload for `cmd_run_events_subscribe`.
#[derive(Debug, Deserialize)]
pub struct SubscribeInput {
    pub schema: String,
    pub run_ids: Vec<String>,
    #[serde(default)]
    pub starting_from: Option<u64>,
    #[serde(default)]
    pub source_filter: Option<Vec<String>>,
}

#[derive(Debug, Serialize)]
pub struct SubscribeOutput {
    pub schema: String,
    pub subscription_id: String,
}

/// Subscribe to live event batches for one or more runs. The frontend
/// passes a [`Channel<EventBatch>`] which receives every batch the
/// broker emits for the matching runs.
#[tauri::command]
pub async fn cmd_run_events_subscribe(
    input: SubscribeInput,
    on_batch: Channel<EventBatch>,
) -> IpcResult<SubscribeOutput> {
    if input.schema != SCHEMA_V1 {
        return Err(IpcError::SchemaMismatch(input.schema));
    }
    let broker = broker::global().clone();
    let run_ids = parse_run_ids(&input.run_ids)?;
    if let Some(start) = input.starting_from {
        replay_window(
            &broker,
            &run_ids,
            SeqNum::new(start),
            input.source_filter.as_deref(),
            &on_batch,
        );
    }
    spawn_live_subscribers(&broker, run_ids, input.source_filter, on_batch);
    Ok(SubscribeOutput {
        schema: SCHEMA_V1.to_owned(),
        subscription_id: new_v4_str(),
    })
}

fn parse_run_ids(ids: &[String]) -> Result<Vec<RunId>, IpcError> {
    if ids.is_empty() {
        return Ok(Vec::new());
    }
    let mut out = Vec::with_capacity(ids.len());
    for id in ids {
        let parsed = RunId::try_new(id.as_str())
            .map_err(|e| IpcError::Validation(format!("run_id: {e}")))?;
        out.push(parsed);
    }
    Ok(out)
}

fn replay_window(
    broker: &RunEventBroker,
    run_ids: &[RunId],
    start: SeqNum,
    source_filter: Option<&[String]>,
    channel: &Channel<EventBatch>,
) {
    let runs: Vec<RunId> = if run_ids.is_empty() {
        broker.active_runs()
    } else {
        run_ids.to_vec()
    };
    for run in runs {
        let events = broker.query_window(&run, start, SeqNum::new(u64::MAX), source_filter);
        if events.is_empty() {
            continue;
        }
        let (lo, hi) = bounds(&events);
        let batch = EventBatch {
            schema: nexus_run_events::SCHEMA_V1.clone(),
            run_id: run,
            batch_seq_start: lo,
            batch_seq_end: hi,
            events,
        };
        let _ = channel.send(batch);
    }
}

fn spawn_live_subscribers(
    broker: &RunEventBroker,
    run_ids: Vec<RunId>,
    source_filter: Option<Vec<String>>,
    channel: Channel<EventBatch>,
) {
    let runs: Vec<RunId> = if run_ids.is_empty() {
        broker.active_runs()
    } else {
        run_ids
    };
    for run in runs {
        let mut rx = broker.subscribe(&run);
        let allow = source_filter.clone();
        let ch = channel.clone();
        tokio::spawn(async move {
            while let Ok(mut batch) = rx.recv().await {
                if let Some(allow) = allow.as_deref() {
                    batch.events.retain(|ev| source_allowed(ev, allow));
                    if batch.events.is_empty() {
                        continue;
                    }
                }
                if ch.send(batch).is_err() {
                    break;
                }
            }
        });
    }
}

fn source_allowed(ev: &RunEventItem, allow: &[String]) -> bool {
    let source = match ev {
        RunEventItem::Line { source, .. }
        | RunEventItem::Phase { source, .. }
        | RunEventItem::Metric { source, .. }
        | RunEventItem::TensorAllocate { source, .. }
        | RunEventItem::Artifact { source, .. }
        | RunEventItem::Widget { source, .. }
        | RunEventItem::Error { source, .. }
        | RunEventItem::Gap { source, .. }
        | RunEventItem::ScraperUnknown { source, .. } => source.as_str().to_owned(),
        _ => String::new(),
    };
    allow.iter().any(|a| a == &source)
}

#[derive(Debug, Deserialize)]
pub struct QueryWindowInput {
    pub schema: String,
    pub run_id: String,
    pub from_seq: u64,
    pub to_seq: u64,
    #[serde(default)]
    pub source_filter: Option<Vec<String>>,
}

#[derive(Debug, Serialize)]
pub struct QueryWindowOutput {
    pub schema: String,
    pub events: Vec<RunEventItem>,
    pub gaps: Vec<GapDescriptor>,
}

#[derive(Debug, Serialize)]
pub struct GapDescriptor {
    pub from_seq: u64,
    pub to_seq: u64,
    pub reason: String,
}

/// Read a sequence-numbered window of events from the hot tier broker.
#[tauri::command]
pub async fn cmd_run_events_query_window(input: QueryWindowInput) -> IpcResult<QueryWindowOutput> {
    if input.schema != SCHEMA_V1 {
        return Err(IpcError::SchemaMismatch(input.schema));
    }
    let run = RunId::try_new(input.run_id.as_str())
        .map_err(|e| IpcError::Validation(format!("run_id: {e}")))?;
    let broker = broker::global();
    let events = broker.query_window(
        &run,
        SeqNum::new(input.from_seq),
        SeqNum::new(input.to_seq),
        input.source_filter.as_deref(),
    );
    let gaps = detect_gaps(&events, input.from_seq, input.to_seq);
    Ok(QueryWindowOutput {
        schema: SCHEMA_V1.to_owned(),
        events,
        gaps,
    })
}

fn detect_gaps(events: &[RunEventItem], from: u64, to: u64) -> Vec<GapDescriptor> {
    let mut seqs: Vec<u64> = events
        .iter()
        .filter_map(|ev| match ev {
            RunEventItem::Line { seq, .. }
            | RunEventItem::Phase { seq, .. }
            | RunEventItem::Metric { seq, .. }
            | RunEventItem::TensorAllocate { seq, .. }
            | RunEventItem::Artifact { seq, .. }
            | RunEventItem::Widget { seq, .. }
            | RunEventItem::Error { seq, .. }
            | RunEventItem::Gap { seq, .. }
            | RunEventItem::ScraperUnknown { seq, .. } => Some(seq.value()),
            _ => None,
        })
        .collect();
    seqs.sort_unstable();
    seqs.dedup();
    let mut gaps = Vec::new();
    let mut cursor = from;
    for s in &seqs {
        if *s > cursor {
            gaps.push(GapDescriptor {
                from_seq: cursor,
                to_seq: s - 1,
                reason: gap_reason_string(GapReason::TransportDrop),
            });
        }
        cursor = s + 1;
    }
    if cursor <= to && !seqs.is_empty() {
        gaps.push(GapDescriptor {
            from_seq: cursor,
            to_seq: to,
            reason: gap_reason_string(GapReason::ScraperLag),
        });
    }
    gaps
}

fn gap_reason_string(r: GapReason) -> String {
    match r {
        GapReason::NLayerMissing => "n_layer_missing",
        GapReason::TensorHistogramMissing => "tensor_histogram_missing",
        GapReason::TransportDrop => "transport_drop",
        GapReason::ScraperLag => "scraper_lag",
        GapReason::WorkerCrash => "worker_crash",
        GapReason::Other => "other",
        _ => "other",
    }
    .to_owned()
}

#[derive(Debug, Deserialize)]
pub struct BucketedInput {
    pub schema: String,
    #[serde(default)]
    pub run_id: Option<String>,
    pub bucket_ms: u64,
    #[serde(default)]
    pub metric_filter: Option<Vec<String>>,
}

#[derive(Debug, Serialize)]
pub struct BucketedOutput {
    pub schema: String,
    pub buckets: Vec<Bucket>,
}

#[derive(Debug, Serialize)]
pub struct Bucket {
    pub start_ts_ms: u64,
    pub end_ts_ms: u64,
    pub counts: BucketCounts,
    pub metrics: BTreeMap<String, MetricAggregate>,
}

#[derive(Debug, Serialize, Default)]
pub struct BucketCounts {
    pub info: u64,
    pub warn: u64,
    pub error: u64,
}

#[derive(Debug, Serialize, Default)]
pub struct MetricAggregate {
    pub sum: f64,
    pub max: f64,
    pub count: u64,
}

/// Aggregate hot-tier history into time buckets for the Pulse-Floor /
/// minimap consumer.
#[tauri::command]
pub async fn cmd_run_events_bucketed(input: BucketedInput) -> IpcResult<BucketedOutput> {
    if input.schema != SCHEMA_V1 {
        return Err(IpcError::SchemaMismatch(input.schema));
    }
    if input.bucket_ms < 100 {
        return Err(IpcError::Validation("bucket_ms must be >= 100".into()));
    }
    let broker = broker::global();
    let runs: Vec<RunId> = match input.run_id.as_deref() {
        Some(id) => {
            let r = RunId::try_new(id).map_err(|e| IpcError::Validation(e.to_string()))?;
            vec![r]
        }
        None => broker.active_runs(),
    };
    let mut events: Vec<RunEventItem> = Vec::new();
    for r in &runs {
        events.extend(broker.snapshot_history(r));
    }
    let buckets = aggregate_buckets(&events, input.bucket_ms, input.metric_filter.as_deref());
    Ok(BucketedOutput {
        schema: SCHEMA_V1.to_owned(),
        buckets,
    })
}

fn aggregate_buckets(
    events: &[RunEventItem],
    bucket_ms: u64,
    metric_filter: Option<&[String]>,
) -> Vec<Bucket> {
    if events.is_empty() {
        return Vec::new();
    }
    let mut by_start: BTreeMap<u64, Bucket> = BTreeMap::new();
    for ev in events {
        let ts = event_ts_ms(ev);
        let start = (ts / bucket_ms) * bucket_ms;
        let bucket = by_start.entry(start).or_insert_with(|| Bucket {
            start_ts_ms: start,
            end_ts_ms: start + bucket_ms,
            counts: BucketCounts::default(),
            metrics: BTreeMap::new(),
        });
        match event_severity_bucket(ev) {
            SeverityBucket::Info => bucket.counts.info += 1,
            SeverityBucket::Warn => bucket.counts.warn += 1,
            SeverityBucket::Error => bucket.counts.error += 1,
        }
        if let RunEventItem::Metric { name, value, .. } = ev {
            if let Some(allow) = metric_filter {
                if !allow.iter().any(|a| a == name) {
                    continue;
                }
            }
            let agg = bucket.metrics.entry(name.clone()).or_default();
            agg.sum += value;
            if *value > agg.max {
                agg.max = *value;
            }
            agg.count += 1;
        }
    }
    by_start.into_values().collect()
}

fn bounds(events: &[RunEventItem]) -> (SeqNum, SeqNum) {
    let mut min = u64::MAX;
    let mut max = 0u64;
    for ev in events {
        let s = match ev {
            RunEventItem::Line { seq, .. }
            | RunEventItem::Phase { seq, .. }
            | RunEventItem::Metric { seq, .. }
            | RunEventItem::TensorAllocate { seq, .. }
            | RunEventItem::Artifact { seq, .. }
            | RunEventItem::Widget { seq, .. }
            | RunEventItem::Error { seq, .. }
            | RunEventItem::Gap { seq, .. }
            | RunEventItem::ScraperUnknown { seq, .. } => seq.value(),
            _ => continue,
        };
        if s < min {
            min = s;
        }
        if s > max {
            max = s;
        }
    }
    if min == u64::MAX {
        return (SeqNum::new(0), SeqNum::new(0));
    }
    (SeqNum::new(min), SeqNum::new(max))
}

mod uuid_compat {
    pub fn new_v4_str() -> String {
        let nanos = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .map(|d| d.as_nanos())
            .unwrap_or(0);
        format!("sub-{nanos:032x}")
    }
}
