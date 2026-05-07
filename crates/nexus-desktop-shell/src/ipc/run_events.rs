//! `cmd_run_events_*` — RunEvent streaming + windowed query + bucketed counts.
//!
//! Phase 2 stubs. See
//! [`contracts/ipc-commands.md`](../../../specs/042-neo-terminal-shell/contracts/ipc-commands.md)
//! for the wire shape.

use crate::errors::{IpcError, IpcResult};
use crate::ipc::SCHEMA_V1;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct SubscribeInput {
    pub schema: String,
    pub run_ids: Vec<String>,
    pub starting_from: Option<u64>,
    pub source_filter: Option<Vec<String>>,
}

#[derive(Debug, Serialize)]
pub struct SubscribeOutput {
    pub schema: String,
    pub subscription_id: String,
}

#[tauri::command]
pub async fn cmd_run_events_subscribe(_input: SubscribeInput) -> IpcResult<SubscribeOutput> {
    Err(IpcError::not_implemented("cmd_run_events_subscribe"))
}

#[derive(Debug, Deserialize)]
pub struct QueryWindowInput {
    pub schema: String,
    pub run_id: String,
    pub from_seq: u64,
    pub to_seq: u64,
    pub source_filter: Option<Vec<String>>,
}

#[derive(Debug, Serialize)]
pub struct QueryWindowOutput {
    pub schema: String,
    pub events: Vec<serde_json::Value>,
    pub gaps: Vec<GapDescriptor>,
}

#[derive(Debug, Serialize)]
pub struct GapDescriptor {
    pub from_seq: u64,
    pub to_seq: u64,
    pub reason: String,
}

#[tauri::command]
pub async fn cmd_run_events_query_window(_input: QueryWindowInput) -> IpcResult<QueryWindowOutput> {
    Err(IpcError::not_implemented("cmd_run_events_query_window"))
}

#[derive(Debug, Deserialize)]
pub struct BucketedInput {
    pub schema: String,
    pub run_id: Option<String>,
    pub bucket_ms: u64,
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
    pub metrics: serde_json::Value,
}

#[derive(Debug, Serialize)]
pub struct BucketCounts {
    pub info: u64,
    pub warn: u64,
    pub error: u64,
}

#[tauri::command]
pub async fn cmd_run_events_bucketed(_input: BucketedInput) -> IpcResult<BucketedOutput> {
    Err(IpcError::not_implemented("cmd_run_events_bucketed"))
}

#[allow(dead_code)]
fn _schema_anchor() -> &'static str {
    SCHEMA_V1
}
