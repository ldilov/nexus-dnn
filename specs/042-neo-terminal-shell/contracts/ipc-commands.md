# Contract: Tauri IPC Commands & Channel Streams

**Spec**: [spec.md](../spec.md) | **Plan**: [plan.md](../plan.md) | **Date**: 2026-05-08

This document defines the IPC surface between the Tauri frontend and the embedded host (`nexus-api` linked into the desktop binary). The browser-dev fallback maps each command to an existing HTTP/SSE endpoint.

## Transport selection

| Mode | Frontend transport | Mapped to |
|---|---|---|
| Desktop (Tauri) | `invoke()` for commands; `tauri::ipc::Channel<EventBatch>` for streams | Direct in-process call to embedded `nexus-api` |
| Browser dev | `fetch()` for commands; `EventSource` for streams | Existing axum routes on `127.0.0.1:3000` |

Selection logic per R2 (`window.isTauri` runtime check) lives in `apps/web/src/services/ipc_adapter.ts`. Consumers see one typed surface; both branches conform to the same contract below.

## Conventions

- **Naming**: Tauri commands use `cmd_<noun>_<verb>` snake_case. HTTP equivalents use `/api/host/<noun>/<verb>` kebab-case.
- **Errors**: Tauri commands return `Result<T, IpcError>` where `IpcError` serialises as `{ code: string; message: string; retriable: boolean }`. HTTP equivalents return non-2xx with the same JSON body.
- **Versioning**: each command response carries a top-level `schema` field set to its contract version (e.g., `"nexus.host-cmd.v1"`). Future incompatible changes mint a new version; the adapter rejects mismatches with `IpcError { code: "schema_mismatch" }`.

---

## Commands

### `cmd_window_set_titlebar_breadcrumb`

Updates the prompt-style breadcrumb on the custom titlebar (FR-002).

**Direction**: frontend → host (host owns breadcrumb persistence so the value survives reload via the system tray).

**Request**:

```ts
{ schema: "nexus.host-cmd.v1"; cwd: string; suffix?: string; }
```

`cwd` is the prompt path (e.g., `~/nexus-dnn/runs/2026-05-08-llama3-8b`). `suffix` is the trailing glyph (default `$`).

**Response**: `{ schema: "nexus.host-cmd.v1"; ok: true; }`

**Errors**: none expected; mis-shape returns `IpcError { code: "validation" }`.

**HTTP equivalent**: `POST /api/host/window/titlebar/breadcrumb`

---

### `cmd_tray_set_state`

Updates the system-tray icon state — used to indicate background activity (model loading, dependency install in progress) when the window is closed.

**Request**:

```ts
{ schema: "nexus.host-cmd.v1"; state: "idle" | "active" | "anomaly"; tooltip?: string; }
```

**Response**: `{ schema: "nexus.host-cmd.v1"; ok: true; }`

**HTTP equivalent**: not applicable (browser dev has no tray; falls through silently).

---

### `cmd_run_events_subscribe`

Opens a streaming `Channel<EventBatch>` subscription for events of one or more runs.

**Direction**: frontend → host. Frontend constructs a `Channel<EventBatch>` and passes it as the `on_batch` argument; host fills it as events arrive.

**Request**:

```ts
{
  schema: "nexus.host-cmd.v1";
  run_ids: RunId[];                  // [] = all active runs
  starting_from?: number;            // if present, replay events with seq >= this; else live-only
  source_filter?: string[];          // optional source allowlist
  on_batch: Channel<EventBatch>;     // Tauri Channel; opaque on the wire
}
```

**Response (initial)**: `{ schema: "nexus.host-cmd.v1"; subscription_id: string; }`

The host begins delivering `EventBatch` over the channel. Each batch coalesces ~50 ms of events; ordering within a batch is by `seq`. Backpressure: when the frontend drops the channel, the host stops sending and frees its end.

**Errors**:

- `IpcError { code: "run_not_found", retriable: false }`
- `IpcError { code: "schema_mismatch" }`

**HTTP equivalent**: `GET /api/host/runs/events?run_ids=...&starting_from=...&source=...` with response `text/event-stream`. Each SSE message is one `EventBatch` JSON.

---

### `cmd_run_events_query_window`

Reads a sequence-numbered window of events from any tier (hot → warm → cold fallthrough).

**Request**:

```ts
{
  schema: "nexus.host-cmd.v1";
  run_id: RunId;
  from_seq: number;
  to_seq: number;                    // inclusive
  source_filter?: string[];
}
```

**Response**:

```ts
{
  schema: "nexus.host-cmd.v1";
  events: RunEventItem[];
  gaps: { from_seq: number; to_seq: number; reason: GapReason; }[];
}
```

**HTTP equivalent**: `GET /api/host/runs/{run_id}/events?from_seq=...&to_seq=...`

---

### `cmd_run_events_bucketed`

Returns aggregated time-bucketed counts for the Pulse-Floor / minimap.

**Request**:

```ts
{
  schema: "nexus.host-cmd.v1";
  run_id?: RunId;                    // if absent, aggregate across all active runs
  bucket_ms: number;                 // ≥ 100
  metric_filter?: string[];          // metric.name allowlist
}
```

**Response**:

```ts
{
  schema: "nexus.host-cmd.v1";
  buckets: {
    start_ts_ms: number;
    end_ts_ms: number;
    counts: { info: number; warn: number; error: number };
    metrics: Record<string, { sum: number; max: number; count: number }>;
  }[];
}
```

**HTTP equivalent**: `GET /api/host/runs/buckets?run_id=...&bucket_ms=...`

---

### `cmd_runtime_tuning_patch`

Applies a partial `RuntimeTuning` update to a model load — issued by the Lattice idle-state Edit tab when the user reassigns layer placement (FR-036).

**Direction**: frontend → host. Implementation forwards to the host's existing runtime tuning surface introduced by spec 039.

**Request**:

```ts
{
  schema: "nexus.host-cmd.v1";
  deployment_id: string;
  patch: {
    n_gpu_layers?: number;
    n_cpu_moe?: number;
    cache_reuse?: number;
    force_fp16_kv?: boolean;
    [k: string]: unknown;             // per-spec-039 RuntimeTuning surface
  };
  reload_after_apply: boolean;        // if true, host triggers a model reload
}
```

**Response**:

```ts
{
  schema: "nexus.host-cmd.v1";
  applied_patch: Record<string, unknown>;
  reload_run_id?: RunId;              // present when reload_after_apply=true
}
```

**Errors**:

- `IpcError { code: "deployment_not_found", retriable: false }`
- `IpcError { code: "tuning_validation_failed", retriable: false, message: "..." }`

**HTTP equivalent**: `POST /api/host/runtime/{deployment_id}/tuning`

**Boundary note**: This command operates on the host-owned `RuntimeTuning` shape, not on any extension's settings. The Lattice Edit tab's call passes through the host runtime tuning surface; XIII compliance is preserved.

---

### `cmd_block_register_mnemonic`

Registers a 4-character mnemonic for a Block instance with the host's command palette index (delivered by spec 041).

**Request**:

```ts
{
  schema: "nexus.host-cmd.v1";
  block_id: string;
  mnemonic: string;        // 4 uppercase ASCII letters
  prompt_header: string;   // e.g. "$ load llama3-8b --layers 67"
  primary_metric?: string;
}
```

**Response**:

```ts
{
  schema: "nexus.host-cmd.v1";
  registered: boolean;
  conflict_with?: string;  // existing block_id if mnemonic taken
}
```

**Errors**:

- `IpcError { code: "mnemonic_invalid" }` — not 4 uppercase ASCII letters.
- `IpcError { code: "mnemonic_conflict", retriable: false }` — already registered to a different Block.

**HTTP equivalent**: `POST /api/host/blocks/mnemonics`

---

### `cmd_pulse_floor_metrics_subscribe`

Streams metrics for the Pulse-Floor (separate from the per-run event channel because Pulse-Floor is system-wide and does not require run-level granularity).

**Request**:

```ts
{
  schema: "nexus.host-cmd.v1";
  metric_names: string[];   // e.g. ["vram.utilization", "ram.utilization", "leases.active", "tokens_per_second.global"]
  window_ms: number;        // sample period
  on_sample: Channel<{ metric_name: string; value: number; ts_ms: number; available: boolean; }>;
}
```

**Response**: `{ schema: "nexus.host-cmd.v1"; subscription_id: string; }`

The host begins delivering samples on the channel. When a metric source is unavailable (e.g., NVML access denied), `available: false` is emitted with the last-known value of `0` and the trace renders dimmed (FR-055).

**HTTP equivalent**: `GET /api/host/metrics/stream?names=...&window_ms=...` SSE.

---

### `cmd_window_show` / `cmd_window_hide` / `cmd_window_focus`

Control the desktop window from the frontend (used by ⌘K palette commands like "show window from background").

**Request / Response**: simple `{ schema, ok }` envelopes.

**HTTP equivalent**: not applicable (no window in browser-dev mode).

---

## Channel typing rules

All Tauri channels carry a single typed payload shape. The frontend's `Channel<T>` constructor enforces the type at the TypeScript layer; the Rust side uses `tauri::ipc::Channel<T>` with `T: Serialize`. Mismatched types fail at compile time on both sides.

Per R1: producers MUST batch into 50ms windows before sending — never send single events. The host's scraper layer provides this batching; raw single-event streams are forbidden.

## Capability declarations

The Tauri capabilities file (`apps/web/src-tauri/capabilities/default.json`) MUST grant:

- `core:default` (baseline)
- `core:window:default`
- `core:window:allow-start-dragging` (titlebar drag region)
- `core:window:allow-show`, `:allow-hide`, `:allow-set-focus`, `:allow-toggle-maximize`, `:allow-minimize`, `:allow-close`
- `core:event:default` (for tray menu events)
- `core:tray:default` (system tray)
- The custom commands declared above (auto-derived by Tauri's macro from `#[tauri::command]` annotations).

The capabilities file MUST NOT grant filesystem, shell, or network plugins to the frontend — all such access goes through host commands above.

## Browser-dev SSE fallback

Each streaming command has a corresponding SSE endpoint. The `EventSource` MUST treat each SSE `message` event as one batch (one JSON object per message, never multi-line). The SSE keep-alive interval is 15 seconds; clients reconnect with `Last-Event-ID: <last_seq>` to resume where they left off (the host walks its hot+warm tiers to deliver the missing window).

This contract preserves the Principle XII.4 single-I/O-boundary discipline: both transports converge on the same typed surface inside `services/ipc_adapter.ts`.
