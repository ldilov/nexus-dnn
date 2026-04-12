# Contract: GET /api/v1/metrics

## Endpoint

```
GET /api/v1/metrics
```

No authentication required (local-first tool).
No query parameters.

## Response

HTTP 200 with standard API envelope:

```json
{
  "data": {
    "vram_used_bytes": 0,
    "vram_total_bytes": 0,
    "gpu_utilization_pct": 0,
    "latency_ms": 2,
    "worker_count": 3,
    "active_run_count": 1,
    "cached_artifact_count": 42,
    "uptime_seconds": 3600
  },
  "meta": {
    "timestamp": "2026-04-12T12:00:00Z"
  }
}
```

## Field Definitions

| Field | Type | Range | Notes |
|-------|------|-------|-------|
| vram_used_bytes | integer | >= 0 | Placeholder: always 0 until GPU monitoring |
| vram_total_bytes | integer | >= 0 | Placeholder: always 0 until GPU monitoring |
| gpu_utilization_pct | integer | 0-100 | Placeholder: always 0 until GPU monitoring |
| latency_ms | integer | >= 0 | Measured from handler start to serialization |
| worker_count | integer | >= 0 | Live count from WorkerManager |
| active_run_count | integer | >= 0 | Runs with status in (created, running, paused) |
| cached_artifact_count | integer | >= 0 | Total artifacts in storage |
| uptime_seconds | integer | >= 0 | Seconds since host process started |

## Error Response

HTTP 500 if metrics collection fails:

```json
{
  "data": null,
  "error": {
    "code": "METRICS_ERROR",
    "category": "internal",
    "message": "Failed to collect runtime metrics"
  }
}
```

## Performance

- Target: < 10ms p95
- Polling frequency: every 5 seconds from ServiceWorker
- No caching headers (always fresh data)

## Rust Type

```rust
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
```

## TypeScript Type

```typescript
type RuntimeMetrics = {
  vram_used_bytes: number;
  vram_total_bytes: number;
  gpu_utilization_pct: number;
  latency_ms: number;
  worker_count: number;
  active_run_count: number;
  cached_artifact_count: number;
  uptime_seconds: number;
};
```
