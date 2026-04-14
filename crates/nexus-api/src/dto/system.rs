use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct HealthDto {
    pub status: String,
    #[serde(skip_serializing_if = "Option::is_none", default)]
    #[ts(type = "Record<string, unknown> | null")]
    pub details: Option<serde_json::Value>,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct SystemInfoDto {
    pub host_version: String,
    pub api_version: String,
    pub protocol_version: String,
    pub supported_runtime_families: Vec<String>,
    pub supported_spec_versions: Vec<String>,
    pub workspace_path: Option<String>,
    pub platform: String,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct RuntimeMetricsDto {
    #[ts(type = "number")]
    pub vram_used_bytes: u64,
    #[ts(type = "number")]
    pub vram_total_bytes: u64,
    pub gpu_utilization_pct: u8,
    pub latency_ms: u32,
    pub worker_count: u32,
    pub active_run_count: u32,
    pub cached_artifact_count: u32,
    #[ts(type = "number")]
    pub uptime_seconds: u64,
}
