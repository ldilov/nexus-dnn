# Data Model: Runtime Metrics

## Entities

### RuntimeMetrics

Runtime health and resource metrics aggregated from host subsystems.

| Field | Type | Source | Description |
|-------|------|--------|-------------|
| vram_used_bytes | u64 | Placeholder (0) | GPU VRAM currently allocated |
| vram_total_bytes | u64 | Placeholder (0) | Total GPU VRAM available |
| gpu_utilization_pct | u8 | Placeholder (0) | GPU compute utilization 0-100 |
| latency_ms | u32 | System clock | Average API response latency |
| worker_count | u32 | WorkerManager | Active worker process count |
| active_run_count | u32 | SqliteDatabase | Runs with status != completed/cancelled/failed |
| cached_artifact_count | u32 | SqliteDatabase | Total artifacts in store |
| uptime_seconds | u64 | Process start time | Host process uptime |

### MetricsThresholds (frontend-only, not stored)

Color-coding thresholds for metric chip display.

| Metric | Green | Amber | Red |
|--------|-------|-------|-----|
| VRAM | < 60% used | 60-85% used | > 85% used |
| Latency | < 50ms | 50-200ms | > 200ms |
| Load (GPU) | < 60% | 60-85% | > 85% |

## State Transitions

None — metrics are stateless snapshots. Each poll returns the current
state at the time of the request.

## Relationships

- `worker_count` reflects live state from WorkerManager
- `active_run_count` queries the runs table WHERE status IN ('created', 'running', 'paused')
- `cached_artifact_count` counts rows in the artifacts table
- `uptime_seconds` computed from `std::time::Instant` captured at startup
