//! `POST /api/host/gc/free-all` — host-wide VRAM reclaim.
//!
//! Thin HTTP handler over [`crate::vram_gc::fan_out_release_memory`]: fans
//! the generic `runtime.release_memory` JSON-RPC method across every live
//! lease handle, regardless of which extension owns it. Each worker
//! unloads its model and runs `gc + torch.cuda.empty_cache`. Per-worker
//! errors / timeouts are skipped — partial success still returns 200 so
//! one wedged worker can't block reclaiming the rest.

use std::sync::Arc;

use axum::extract::State;
use axum::response::IntoResponse;
use serde::Serialize;

use nexus_backend_runtimes::generic::leases::BackendRuntimeLease;

use crate::AppState;
use crate::envelope::ApiResponse;
use crate::vram_gc::fan_out_release_memory;

#[derive(Debug, Serialize)]
pub struct FreeAllResponse {
    pub workers_notified: usize,
    pub total_freed_mb: i64,
}

pub async fn free_all(State(state): State<AppState>) -> axum::response::Response {
    let handles: Vec<Arc<dyn BackendRuntimeLease>> = state
        .lease_manager
        .all_live_handles()
        .await
        .into_iter()
        .map(|h| h as Arc<dyn BackendRuntimeLease>)
        .collect();

    let (workers_notified, total_freed_mb) = fan_out_release_memory(handles).await;

    ApiResponse::ok(FreeAllResponse {
        workers_notified,
        total_freed_mb,
    })
    .into_response()
}
