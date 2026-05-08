use std::sync::Arc;
use std::time::{Duration, SystemTime, UNIX_EPOCH};

use nexus_run_events::store::WorkerScraper;
use nexus_run_events::{EventBatch, RunEventBroker, RunEventItem, RunId, SCHEMA_V1, SeqNum};
use serde::{Deserialize, Serialize};
use tokio::io::{AsyncBufReadExt, AsyncRead, BufReader};
use tokio::sync::Mutex as TokioMutex;
use tokio::time::Instant;

use crate::events::{BackendEvent, LogLinePayload, SharedPublisher};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RuntimeLogLine {
    pub timestamp: i64,
    pub source: String,
    pub runtime_id: Option<String>,
    pub deployment_id: Option<String>,
    pub severity: String,
    pub namespace: String,
    pub message: String,
}

pub struct LogPipelineContext {
    pub source: String,
    pub namespace: String,
    pub runtime_id: Option<String>,
    pub deployment_id: Option<String>,
    pub publisher: SharedPublisher,
    pub backend: String,
    /// Optional run-event scraper. When set, every line is forwarded
    /// to the scraper and the resulting events are flushed in 50ms
    /// batches into the configured `RunEventBroker`.
    #[allow(clippy::type_complexity)]
    pub scraper: Option<Arc<TokioMutex<dyn WorkerScraper>>>,
    /// Run identifier used as the `run_id` on emitted events. Required
    /// when `scraper` is set.
    pub run_id: Option<RunId>,
    /// Hot-tier broker that receives coalesced batches from the scraper.
    /// Defaults to `RunEventBroker::global()` when unset.
    pub broker: Option<RunEventBroker>,
}

pub fn infer_severity(line: &str) -> &'static str {
    let lowered = line.to_ascii_lowercase();
    if lowered.contains("error") || lowered.contains("fatal") || lowered.contains("panic") {
        "error"
    } else if lowered.contains("warn") {
        "warn"
    } else {
        "info"
    }
}

pub async fn pipe_stream<R>(ctx: Arc<LogPipelineContext>, reader: R)
where
    R: AsyncRead + Unpin + Send + 'static,
{
    let mut buffered = BufReader::new(reader);
    let mut line = String::new();
    let mut batch_buffer: Vec<RunEventItem> = Vec::new();
    let mut last_flush = Instant::now();
    let coalesce = Duration::from_millis(50);
    loop {
        line.clear();
        match buffered.read_line(&mut line).await {
            Ok(0) => {
                if let Some(scraper) = ctx.scraper.as_ref() {
                    let mut s = scraper.lock().await;
                    let final_events = s.flush();
                    drop(s);
                    batch_buffer.extend(final_events);
                    flush_batch(&ctx, &mut batch_buffer);
                }
                break;
            }
            Ok(_) => {
                let trimmed = line.trim_end_matches(['\r', '\n']).to_string();
                if trimmed.is_empty() {
                    continue;
                }
                let severity = infer_severity(&trimmed).to_string();
                let payload = LogLinePayload {
                    source: ctx.source.clone(),
                    runtime_id: ctx.runtime_id.clone(),
                    deployment_id: ctx.deployment_id.clone(),
                    severity: severity.clone(),
                    namespace: ctx.namespace.clone(),
                    message: trimmed.clone(),
                };
                tracing::event!(
                    target: "nexus_backend_runtimes::log",
                    tracing::Level::INFO,
                    namespace = %ctx.namespace,
                    source = %ctx.source,
                    severity = %severity,
                    "{}",
                    trimmed
                );
                let event = BackendEvent::new(
                    "llm.backend.log",
                    ctx.backend.clone(),
                    serde_json::to_value(payload).unwrap_or(serde_json::Value::Null),
                );
                ctx.publisher.publish(event).await;
                if let Some(scraper) = ctx.scraper.as_ref() {
                    let mut s = scraper.lock().await;
                    let new_events = s.ingest_line(&trimmed, nexus_run_events::LineStream::Stderr);
                    drop(s);
                    batch_buffer.extend(new_events);
                    if last_flush.elapsed() >= coalesce && !batch_buffer.is_empty() {
                        flush_batch(&ctx, &mut batch_buffer);
                        last_flush = Instant::now();
                    }
                }
            }
            Err(_) => break,
        }
    }
}

fn flush_batch(ctx: &LogPipelineContext, buffer: &mut Vec<RunEventItem>) {
    if buffer.is_empty() {
        return;
    }
    let Some(run_id) = ctx.run_id.as_ref() else {
        buffer.clear();
        return;
    };
    let drained: Vec<RunEventItem> = std::mem::take(buffer);
    let (start, end) = batch_seq_bounds(&drained);
    let batch = EventBatch {
        schema: SCHEMA_V1.clone(),
        run_id: run_id.clone(),
        batch_seq_start: start,
        batch_seq_end: end,
        events: drained,
    };
    let broker = ctx
        .broker
        .clone()
        .unwrap_or_else(|| nexus_run_events::broker::global().clone());
    broker.publish(batch);
}

fn batch_seq_bounds(events: &[RunEventItem]) -> (SeqNum, SeqNum) {
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

/// Compute a wall-clock millisecond timestamp.
pub fn now_ms() -> u64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_millis() as u64)
        .unwrap_or(0)
}
