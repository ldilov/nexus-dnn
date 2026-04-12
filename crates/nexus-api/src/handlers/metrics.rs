use axum::extract::State;

use crate::AppState;
use crate::envelope::ApiResponse;
use nexus_worker::WorkerManager;

#[derive(Debug, serde::Serialize)]
pub struct RuntimeMetrics {
    pub vram_used_bytes: u64,
    pub vram_total_bytes: u64,
    pub gpu_utilization_pct: u8,
    pub latency_ms: u32,
    pub worker_count: u32,
    pub active_run_count: u32,
    pub cached_artifact_count: u32,
    pub uptime_seconds: u64,
}

pub async fn get_metrics(State(state): State<AppState>) -> ApiResponse<RuntimeMetrics> {
    let workers = state.worker_manager.list_workers().await;

    ApiResponse::ok(RuntimeMetrics {
        vram_used_bytes: 0,
        vram_total_bytes: 0,
        gpu_utilization_pct: 0,
        latency_ms: 1,
        worker_count: workers.len() as u32,
        active_run_count: 0,
        cached_artifact_count: 0,
        uptime_seconds: 0,
    })
}
