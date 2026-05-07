# Phase 1 Data Model: Neo-Terminal Desktop Shell

**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Research**: [research.md](./research.md) | **Date**: 2026-05-08

This document defines the data shapes introduced by spec 042. Storage stays unchanged (no new SQLite tables, no new migrations). New shapes live in: a new Rust crate `nexus-run-events`, the existing host runtime crates (extension to `nexus-backend-runtimes`), the desktop shell crate (`nexus-desktop-shell`), and the frontend services + components layers.

---

## Entity overview

| Entity | Lives in | Purpose |
|---|---|---|
| `RunEventItem` | Rust + TS (mirrored) | Versioned, sequence-numbered structured record emitted by a worker about its operations. Ground truth of every UI surface. |
| `Block` | TS (frontend only) | The new UI atom. One streaming run + zero-or-more inline widgets, with prompt-style header + 4-char mnemonic. |
| `LatticeCellState` | TS (frontend only) | A coordinate `(layer_index, tensor_group)` with state derived from the RunEventItem stream filtered to a model-load run. |
| `PulseFloorTrace` | TS (frontend only) | One channel of ambient telemetry rendered as a translucent band along the bottom of the window. |
| `CursorState` | TS (frontend only) | Singleton across the app; owns pulse rate and focus position. |
| `RunId` / `SeqNum` / `LayerIndex` / `TensorGroup` | Rust newtypes | Domain identifiers, enforced via newtype pattern (Constitution Principle VII). |
| `BlockMnemonic` | TS branded string | 4-char ASCII-uppercase identifier for `⌘K` palette lookup. |

---

## Rust types — `crates/nexus-run-events/`

### `SeqNum` (newtype)

Monotonic worker-side counter. Wall-clock collisions under bursty stdout are documented per R4; only the worker's sequence number is authoritative for ordering.

```rust
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct SeqNum(u64);

impl SeqNum {
    pub const fn new(v: u64) -> Self { Self(v) }
    pub const fn value(self) -> u64 { self.0 }
    pub fn next(self) -> Self { Self(self.0.saturating_add(1)) }
}
```

### `RunId`, `SourceId`, `LayerIndex`, `TensorGroup` (newtypes)

```rust
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct RunId(String);

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct SourceId(String);

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, PartialOrd, Ord, Serialize, Deserialize)]
#[serde(transparent)]
pub struct LayerIndex(u32);

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum TensorGroup {
    Embed,
    Attn,
    Ffn,
    Norm,
    KvCache,
    Output,
    Other,
}
```

`#[non_exhaustive]` on `TensorGroup` per Principle V — future model architectures may need additional groups (e.g., Mamba state, Mixture-of-Depths gates).

### `RunEventItem` (discriminated union)

The single canonical event shape emitted by every scraper / worker. Versioned via `schema` field so future incompatible changes don't silently corrupt stored data.

```rust
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(tag = "kind", rename_all = "snake_case")]
#[non_exhaustive]
pub enum RunEventItem {
    Line {
        schema: SchemaVersion,
        seq: SeqNum,
        ts_ms: u64,
        run_id: RunId,
        source: SourceId,
        stream: LineStream,
        severity: Severity,
        text: String,
        spans: Option<Vec<AnsiSpan>>,
    },
    Phase {
        schema: SchemaVersion,
        seq: SeqNum,
        ts_ms: u64,
        run_id: RunId,
        source: SourceId,
        phase: PhaseName,
        state: PhaseState,
        progress: Option<f32>,
        summary: Option<String>,
    },
    Metric {
        schema: SchemaVersion,
        seq: SeqNum,
        ts_ms: u64,
        run_id: RunId,
        source: SourceId,
        name: String,
        value: f64,
        unit: MetricUnit,
        labels: BTreeMap<String, String>,
        window_ms: Option<u32>,
    },
    TensorAllocate {
        schema: SchemaVersion,
        seq: SeqNum,
        ts_ms: u64,
        run_id: RunId,
        source: SourceId,
        layer: Option<LayerIndex>,
        group: TensorGroup,
        bytes: u64,
        target: AllocationTarget,
        tensor_name: Option<String>,
        dtype: Option<String>,
    },
    Artifact {
        schema: SchemaVersion,
        seq: SeqNum,
        ts_ms: u64,
        run_id: RunId,
        source: SourceId,
        path: String,
        mime: String,
        bytes: Option<u64>,
        digest_sha256: Option<String>,
    },
    Widget {
        schema: SchemaVersion,
        seq: SeqNum,
        ts_ms: u64,
        run_id: RunId,
        source: SourceId,
        widget: WidgetKind,
        props: serde_json::Value,
    },
    Error {
        schema: SchemaVersion,
        seq: SeqNum,
        ts_ms: u64,
        run_id: RunId,
        source: SourceId,
        reason: ErrorReason,
        layer: Option<LayerIndex>,
        group: Option<TensorGroup>,
        device: Option<String>,
        message: String,
        suggestion: Option<String>,
    },
    Gap {
        schema: SchemaVersion,
        seq: SeqNum,
        ts_ms: u64,
        run_id: RunId,
        source: SourceId,
        from_seq: SeqNum,
        to_seq: SeqNum,
        reason: GapReason,
    },
    ScraperUnknown {
        schema: SchemaVersion,
        seq: SeqNum,
        ts_ms: u64,
        run_id: RunId,
        source: SourceId,
        raw_line: String,
        scraper: String,
    },
}
```

`#[non_exhaustive]` on the enum and on every supporting enum (`PhaseName`, `Severity`, `MetricUnit`, `AllocationTarget`, `WidgetKind`, `ErrorReason`, `GapReason`, `LineStream`) — per Principle V, consumers must not pattern-match exhaustively on these from outside the crate.

### Supporting enums

```rust
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum PhaseName {
    Discover,
    PrintMeta,
    Tensors,
    KvReserve,
    ContextBuild,
    Warmup,
    Ready,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum PhaseState {
    Started,
    InProgress,
    Completed,
    Failed,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum AllocationTarget {
    Gpu { device: u8 },
    Cpu,
    CpuMmap,
    Pinned,
    Mixed,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum MetricUnit {
    Bytes,
    BytesPerSecond,
    Tokens,
    TokensPerSecond,
    Milliseconds,
    Percent,
    Count,
    Other,
}

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum ErrorReason {
    VramOom,
    RamOom,
    FileNotFound,
    GgufParse,
    CorruptionSuspected,
    QuantizationMismatch,
    BackendInit,
    KvCacheInit,
    AllocFailurePartial,
    UserCancelled,
    Other,
}

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum GapReason {
    NLayerMissing,
    TensorHistogramMissing,
    TransportDrop,
    ScraperLag,
    WorkerCrash,
    Other,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum LineStream { Stdout, Stderr }

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum Severity { Trace, Debug, Info, Warn, Error }

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum WidgetKind {
    Lattice,
    Download,
    KvCache,
    TokenRate,
    FileTree,
    JsonRpc,
    Other,
}

#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
#[serde(transparent)]
pub struct SchemaVersion(&'static str);

pub const SCHEMA_V1: SchemaVersion = SchemaVersion("nexus.run-event.v1");
```

### `WorkerScraper` trait

The contract every scraper implements. New worker types (TTS synth, dep installer, GGUF probe) add their own scrapers without touching the Lattice or the desktop shell.

```rust
pub trait WorkerScraper: Send + Sync {
    fn id(&self) -> &str;
    fn ingest_line(
        &mut self,
        line: &str,
        line_stream: LineStream,
    ) -> Vec<RunEventItem>;
    fn flush(&mut self) -> Vec<RunEventItem>;
}
```

### `EventBatch` (transport unit)

```rust
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EventBatch {
    pub schema: SchemaVersion,
    pub run_id: RunId,
    pub batch_seq_start: SeqNum,
    pub batch_seq_end: SeqNum,
    pub events: Vec<RunEventItem>,
}
```

Transport coalescing per R1: 50ms window of events ships as one `EventBatch` over `tauri::ipc::Channel<EventBatch>` (desktop) or one SSE message (browser dev).

### State transitions for `RunEventItem`

The events themselves are immutable records. State transitions live in *consumer* layers (Lattice cell state, Block collapse state, cursor pulse rate). The events are the audit log.

---

## Frontend types — `apps/web/src/services/run_events.ts`

### `RunEventItem` (TS mirror)

Mirrors the Rust enum via discriminated union on `kind`. Generated from the JSON schema (see `contracts/run-event.schema.json`) so drift is caught at typecheck time.

```ts
type RunEventItem =
  | { kind: "line"; schema: "nexus.run-event.v1"; seq: number; ts_ms: number; run_id: string; source: string; stream: "stdout" | "stderr"; severity: Severity; text: string; spans?: AnsiSpan[]; }
  | { kind: "phase"; schema: "nexus.run-event.v1"; seq: number; ts_ms: number; run_id: string; source: string; phase: PhaseName; state: PhaseState; progress?: number; summary?: string; }
  | { kind: "metric"; schema: "nexus.run-event.v1"; seq: number; ts_ms: number; run_id: string; source: string; name: string; value: number; unit: MetricUnit; labels: Record<string, string>; window_ms?: number; }
  | { kind: "tensor_allocate"; schema: "nexus.run-event.v1"; seq: number; ts_ms: number; run_id: string; source: string; layer?: number; group: TensorGroup; bytes: number; target: AllocationTarget; tensor_name?: string; dtype?: string; }
  | { kind: "artifact"; schema: "nexus.run-event.v1"; seq: number; ts_ms: number; run_id: string; source: string; path: string; mime: string; bytes?: number; digest_sha256?: string; }
  | { kind: "widget"; schema: "nexus.run-event.v1"; seq: number; ts_ms: number; run_id: string; source: string; widget: WidgetKind; props: unknown; }
  | { kind: "error"; schema: "nexus.run-event.v1"; seq: number; ts_ms: number; run_id: string; source: string; reason: ErrorReason; layer?: number; group?: TensorGroup; device?: string; message: string; suggestion?: string; }
  | { kind: "gap"; schema: "nexus.run-event.v1"; seq: number; ts_ms: number; run_id: string; source: string; from_seq: number; to_seq: number; reason: GapReason; }
  | { kind: "scraper_unknown"; schema: "nexus.run-event.v1"; seq: number; ts_ms: number; run_id: string; source: string; raw_line: string; scraper: string; };
```

### Tiered store

```ts
interface RunEventStore {
  append(batch: EventBatch): void;                                // hot tier ingestion
  subscribe(runId: RunId, cb: (item: RunEventItem) => void): () => void;
  query(runId: RunId, range: SeqRange): Promise<RunEventItem[]>; // hot → warm → cold fallthrough
  bucketed(runId: RunId, bucketMs: number): Promise<RunBucket[]>; // for minimap / pulse-floor
  detectGaps(runId: RunId): GapReport;                            // emits synthetic gap events
}
```

Hot tier: in-memory ring buffer keyed by `RunId`, capacity ~2,000 items per active run, eviction by oldest seq.
Warm tier: `idb` v8 object store `run_events`, key `[run_id, seq]`, secondary index `[run_id, ts_ms]`.
Cold tier: existing on-disk persisted log archive (read-only access via host IPC command `cmd_run_events_query_cold`).

### Coalescing

Inbound `EventBatch` is appended on each `requestAnimationFrame` tick; render fan-out happens after the rAF, never per-event. This satisfies FR-014 (≥1,000 events/sec without UI jank).

### Gap detection

On every batch ingest, the store walks `seq` continuity per `(run_id, source)`. A break emits a synthetic `kind: "gap"` event covering the missing range and broadcasts to subscribers. UI consumers (Lattice cells in the affected layer range) display a "?" indicator for the gap span.

---

## Frontend domain types — Block, Lattice, Pulse-Floor, Cursor

### `Block`

```ts
interface BlockProps {
  id: string;                     // stable identifier
  mnemonic: BlockMnemonic;        // 4-char uppercase ASCII for ⌘K
  promptHeader: string;           // e.g. "$ load llama3-8b --layers 67"
  runId?: RunId;                  // optional — Block-without-run is allowed for static surfaces
  collapsed: boolean;
  pinned: boolean;
  splitPaneId?: string;           // when popped to split-pane
  primaryMetric?: string;         // metric name for the inline collapsed-state sparkline
  children: ReactNode;            // the Block's body (any widget tree)
}

type BlockMnemonic = string & { readonly __brand: unique symbol };
function blockMnemonic(s: string): BlockMnemonic;  // validates 4-char [A-Z]
```

### `LatticeCellState` (derived view, not stored)

```ts
type CellPhase =
  | "pending"
  | "discovered"
  | "assigned"
  | "reserved"
  | "ready"
  | "error"
  | "cpu_offloaded";

interface LatticeCell {
  layer: number;
  group: TensorGroup;
  phase: CellPhase;
  bytes?: number;                // populated at "discovered"
  target?: AllocationTarget;     // populated at "assigned"
  device?: string;               // populated at "reserved"
  tensorName?: string;
  dtype?: string;
  errorReason?: ErrorReason;     // populated at "error"
  ggufOffset?: number;           // populated post-load from idle-state inspector
  lastTransitionTs: number;      // for persistence-fade trail
}
```

The cell state is **derived** from the RunEventItem stream by filtering events to the current model-load run + reducing into a `(layer, group) → LatticeCell` map. Implementation lives in `apps/web/src/services/derived/lattice_state.ts`.

### `LadderRung`

```ts
type LadderRung = "bytes" | "tensors" | "phases" | "story";
const DEFAULT_RUNG: LadderRung = "phases";  // FR-034
```

### `PulseFloorTrace`

```ts
interface PulseFloorTrace {
  id: "vram" | "ram" | "leases" | "tokens_per_sec";
  metricName: string;             // metric.name in RunEventItem queries
  thresholds: { warn: number; alarm: number; };
  unit: MetricUnit;
  available: boolean;             // false → render dimmed with tooltip (FR-055)
  tooltipWhenUnavailable?: string;
}
```

State machine for trace visual modes:

| Mode | Entry condition | Visual |
|---|---|---|
| `quiet` | metric within healthy range | dim trace, gentle motion |
| `elevated` | metric above warn threshold for < 1s | trace begins brightening |
| `anomaly` | metric above alarm threshold for ≥ 1s (FR-053) | full phosphor leading-edge glow, brightest element on screen |
| `unavailable` | host returned no value | dim + tooltip |

### `CursorState`

```ts
interface CursorState {
  ownerBlockId: string | null;    // null if no Block focused
  pulseRateHz: 1.0 | 2.0 | 3.0;   // discrete steps map to rest / inference / load
  visible: boolean;
  reducedMotion: boolean;         // mirrors prefers-reduced-motion
}
```

The cursor is a singleton — exactly one instance lives at the application root. It listens to two streams: focus changes (which Block has focus), and a derived "system activity level" computed from active inference runs + active model loads.

---

## Schema versioning policy

- `SCHEMA_V1 = "nexus.run-event.v1"`. Every event carries this string.
- Future additive changes (new variants on `non_exhaustive` enums, new optional fields) increment the patch portion implicitly without changing the version string. Deserializers tolerate unknown variants by mapping to the relevant `Other` variant.
- Future breaking changes mint `SCHEMA_V2`. Cold-tier readers detect version mismatch on read and route to a migration adapter.
- The frontend rejects events whose `schema` is unknown by the receiver, logging `console.error` and emitting telemetry — the event is dropped, not silently mis-rendered.

---

## Storage

**No new SQLite tables. No new migrations.** The hot + warm tiers live in-memory and in IndexedDB respectively; the cold tier reuses existing host log persistence (readable via existing IPC handlers, no new host writers).

The per-run event window in IndexedDB is bounded: oldest run is evicted when total store exceeds ~50 MB across all runs, or when the user explicitly clears it via `⌘K → "clear run history"`. This bound is configurable in `terminal.css.ts`-adjacent `terminal.config.ts` (constants only — no runtime UI).

---

## Validation rules

- `RunId`, `SourceId` non-empty after trim; ASCII letters / digits / `-` / `.` / `_` only.
- `SeqNum` is `u64`; consumers MUST treat it as opaque-ordered (no arithmetic beyond `<`/`>`/`==`/`+1`).
- `BlockMnemonic` validates 4 uppercase ASCII letters at construction (`blockMnemonic("LLMA") === LLMA`; `blockMnemonic("llma")` throws). Mnemonic uniqueness is enforced application-wide via the spec-041 search palette registry.
- `LayerIndex` ≤ `n_layer` (validated at scraper output time; out-of-range emits `kind: "scraper_unknown"`).
- `TensorGroup::Other` is the catch-all for unknown tensor groups; consumers that switch on group MUST handle it.

---

## Cross-references

| Type | Used by |
|---|---|
| `RunEventItem` | scraper output (R4), `EventBatch` transport, `RunEventStore`, every UI consumer |
| `EventBatch` | `tauri::ipc::Channel<EventBatch>` in desktop mode; SSE payload in browser-dev mode |
| `Block` | All Lattice / TTS / dep-installer surfaces (the Lattice ships first; others follow in future specs) |
| `LatticeCell` | `lattice.view.tsx` derived state; inspector drawer reads cell metadata |
| `PulseFloorTrace` | `pulse_floor.tsx`, mounted at root layout |
| `CursorState` | `cursor.tsx` singleton at app root, consumed by every Block via focus listener |
