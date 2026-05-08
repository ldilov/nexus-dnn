//! `GET /api/host/runs/events` (SSE), `GET /api/host/runs/{run_id}/events`
//! (window query), `GET /api/host/runs/buckets` — browser-dev fallbacks
//! for the Tauri IPC surface defined by spec 042.
//!
//! These mirror the wire shape of the matching `cmd_run_events_*`
//! commands in `nexus-desktop-shell`. Browser dev mode subscribes via
//! `EventSource`; the SSE keep-alive interval is 15 seconds.

use std::collections::BTreeMap;
use std::convert::Infallible;
use std::time::Duration;

use axum::extract::{Path, Query};
use axum::http::StatusCode;
use axum::response::sse::{Event, KeepAlive, Sse};
use axum::response::IntoResponse;
use axum::Json;
use futures_util::stream::Stream;
use nexus_run_events::broker;
use nexus_run_events::{
    event_severity_bucket, event_ts_ms, EventBatch, RunEventBroker, RunEventItem, RunId,
    SeqNum, SeverityBucket,
};
use serde::{Deserialize, Serialize};
use tokio::sync::mpsc;
use tokio_stream::wrappers::ReceiverStream;
use tokio_stream::StreamExt;

#[derive(Debug, Deserialize)]
pub struct EventsQuery {
    #[serde(default)]
    pub run_ids: Option<String>,
    #[serde(default)]
    pub starting_from: Option<u64>,
    #[serde(default)]
    pub source: Option<String>,
}

/// SSE stream of `EventBatch` JSON messages. Without `run_ids`, the
/// host attaches subscribers to every active run.
pub async fn stream_run_events(
    Query(params): Query<EventsQuery>,
) -> Sse<impl Stream<Item = Result<Event, Infallible>>> {
    let broker = broker::global().clone();
    let runs = parse_runs(&broker, params.run_ids.as_deref());
    let allow = parse_csv(params.source.as_deref());
    let starting_from = params.starting_from.map(SeqNum::new);
    let stream = build_event_stream(broker, runs, starting_from, allow);
    Sse::new(stream).keep_alive(KeepAlive::new().interval(Duration::from_secs(15)))
}

fn build_event_stream(
    broker: RunEventBroker,
    runs: Vec<RunId>,
    starting_from: Option<SeqNum>,
    allow: Option<Vec<String>>,
) -> impl Stream<Item = Result<Event, Infallible>> {
    let (tx, rx) = mpsc::channel::<EventBatch>(256);
    if let Some(start) = starting_from {
        for run in &runs {
            let events = broker.query_window(
                run,
                start,
                SeqNum::new(u64::MAX),
                allow.as_deref(),
            );
            if events.is_empty() {
                continue;
            }
            let (lo, hi) = bounds(&events);
            let batch = EventBatch {
                schema: nexus_run_events::SCHEMA_V1.clone(),
                run_id: run.clone(),
                batch_seq_start: lo,
                batch_seq_end: hi,
                events,
            };
            let _ = tx.try_send(batch);
        }
    }
    for run in runs {
        let mut sub = broker.subscribe(&run);
        let tx = tx.clone();
        let allow = allow.clone();
        tokio::spawn(async move {
            while let Ok(mut batch) = sub.recv().await {
                if let Some(allow) = allow.as_deref() {
                    batch.events.retain(|ev| source_allowed(ev, allow));
                    if batch.events.is_empty() {
                        continue;
                    }
                }
                if tx.send(batch).await.is_err() {
                    break;
                }
            }
        });
    }
    drop(tx);
    ReceiverStream::new(rx).map(|batch| {
        let json = serde_json::to_string(&batch).unwrap_or_else(|_| "{}".to_owned());
        Ok::<_, Infallible>(Event::default().data(json))
    })
}

fn parse_runs(broker: &RunEventBroker, csv: Option<&str>) -> Vec<RunId> {
    match csv {
        None => broker.active_runs(),
        Some(s) => s
            .split(',')
            .map(str::trim)
            .filter(|t| !t.is_empty())
            .filter_map(|t| RunId::try_new(t).ok())
            .collect(),
    }
}

fn parse_csv(s: Option<&str>) -> Option<Vec<String>> {
    s.map(|raw| {
        raw.split(',')
            .map(str::trim)
            .filter(|t| !t.is_empty())
            .map(|t| t.to_owned())
            .collect::<Vec<_>>()
    })
    .filter(|v| !v.is_empty())
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
pub struct WindowQuery {
    pub from_seq: u64,
    pub to_seq: u64,
    #[serde(default)]
    pub source: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct WindowResponse {
    pub schema: &'static str,
    pub events: Vec<RunEventItem>,
    pub gaps: Vec<GapDescriptor>,
}

#[derive(Debug, Serialize)]
pub struct GapDescriptor {
    pub from_seq: u64,
    pub to_seq: u64,
    pub reason: &'static str,
}

/// Read a sequence-numbered window of events for a single run.
pub async fn get_run_events_window(
    Path(run_id): Path<String>,
    Query(query): Query<WindowQuery>,
) -> Result<Json<WindowResponse>, (StatusCode, &'static str)> {
    let run =
        RunId::try_new(run_id.as_str()).map_err(|_| (StatusCode::BAD_REQUEST, "invalid run_id"))?;
    let allow = parse_csv(query.source.as_deref());
    let broker = broker::global();
    let events = broker.query_window(
        &run,
        SeqNum::new(query.from_seq),
        SeqNum::new(query.to_seq),
        allow.as_deref(),
    );
    let gaps = detect_gaps(&events, query.from_seq, query.to_seq);
    Ok(Json(WindowResponse {
        schema: "nexus.host-cmd.v1",
        events,
        gaps,
    }))
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
                reason: "transport_drop",
            });
        }
        cursor = s + 1;
    }
    if cursor <= to && !seqs.is_empty() {
        gaps.push(GapDescriptor {
            from_seq: cursor,
            to_seq: to,
            reason: "scraper_lag",
        });
    }
    gaps
}

#[derive(Debug, Deserialize)]
pub struct BucketsQuery {
    #[serde(default)]
    pub run_id: Option<String>,
    pub bucket_ms: u64,
    #[serde(default)]
    pub metrics: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct BucketsResponse {
    pub schema: &'static str,
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

/// Aggregate hot-tier history into time buckets.
pub async fn get_run_events_buckets(
    Query(query): Query<BucketsQuery>,
) -> impl IntoResponse {
    if query.bucket_ms < 100 {
        return (StatusCode::BAD_REQUEST, Json(serde_json::json!({"error": "bucket_ms must be >= 100"})))
            .into_response();
    }
    let broker = broker::global();
    let metric_filter = parse_csv(query.metrics.as_deref());
    let runs: Vec<RunId> = match query.run_id.as_deref() {
        Some(id) => match RunId::try_new(id) {
            Ok(r) => vec![r],
            Err(_) => {
                return (
                    StatusCode::BAD_REQUEST,
                    Json(serde_json::json!({"error": "invalid run_id"})),
                )
                    .into_response();
            }
        },
        None => broker.active_runs(),
    };
    let mut events: Vec<RunEventItem> = Vec::new();
    for r in &runs {
        events.extend(broker.snapshot_history(r));
    }
    let buckets = aggregate_buckets(&events, query.bucket_ms, metric_filter.as_deref());
    Json(BucketsResponse {
        schema: "nexus.host-cmd.v1",
        buckets,
    })
    .into_response()
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
