//! Versioned run-event protocol shared between worker scrapers and the
//! Neo-Terminal frontend store.
//!
//! Every nexus-dnn worker emits a stream of [`RunEventItem`] records.
//! The shapes here are the canonical wire format (`nexus.run-event.v1`)
//! used by every UI surface defined in spec 042. The crate is generic
//! and contains no extension-id literals — see Constitution Principle
//! XIII (host ↔ extension boundary).

use std::borrow::Cow;
use std::collections::BTreeMap;

use serde::{Deserialize, Serialize};

pub mod broker;
pub mod ids;
pub mod store;

pub use broker::{event_severity_bucket, event_ts_ms, RunEventBroker, SeverityBucket};
pub use ids::{IdError, LayerIndex, RunId, SeqNum, SourceId};

/// Schema version identifier carried by every event on the wire.
///
/// The internal storage is a `Cow<'static, str>` so the well-known
/// version constants can be constructed in `const` context without
/// allocation while still allowing owned strings to flow back from
/// deserialisation.
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct SchemaVersion(Cow<'static, str>);

impl SchemaVersion {
    /// Wrap a static string slice as a schema version.
    pub const fn new(s: &'static str) -> Self {
        Self(Cow::Borrowed(s))
    }

    /// Return the underlying schema string slice.
    pub fn as_str(&self) -> &str {
        &self.0
    }
}

/// The current schema string. Future incompatible changes mint a new
/// constant rather than mutating this one.
pub const SCHEMA_V1: SchemaVersion = SchemaVersion::new("nexus.run-event.v1");

/// Stream that produced a `Line` event.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum LineStream {
    /// Standard output stream of the worker process.
    Stdout,
    /// Standard error stream of the worker process.
    Stderr,
}

/// Severity level for log lines.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum Severity {
    Trace,
    Debug,
    Info,
    Warn,
    Error,
}

/// Named phase of a run lifecycle.
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

/// Lifecycle state of a phase.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum PhaseState {
    Started,
    InProgress,
    Completed,
    Failed,
}

/// Logical group a tensor belongs to within a model.
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

/// Memory destination of a tensor allocation.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(tag = "kind", rename_all = "snake_case")]
#[non_exhaustive]
pub enum AllocationTarget {
    /// GPU device allocation, identified by zero-based device index.
    Gpu { device: u8 },
    /// Plain CPU heap allocation.
    Cpu,
    /// Memory-mapped file mapped into CPU address space.
    CpuMmap,
    /// CPU pinned memory.
    Pinned,
    /// A mix of the above; details flattened into accompanying labels.
    Mixed,
}

/// Unit of a metric value.
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

/// Categorical reason an `Error` event was emitted.
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

/// Categorical reason a `Gap` event was emitted.
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

/// Inline-widget kind referenced by a `Widget` event.
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

/// Styled span within an ANSI-coloured log line.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct AnsiSpan {
    /// Plain text payload of the span.
    pub text: String,
    /// Foreground colour hint (`"red"`, `"cyan"`, `"#abc"` ...).
    #[serde(skip_serializing_if = "Option::is_none")]
    pub fg: Option<String>,
    /// Background colour hint.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub bg: Option<String>,
    /// Bold text flag.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub bold: Option<bool>,
    /// Dim text flag.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub dim: Option<bool>,
    /// Italic text flag.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub italic: Option<bool>,
}

/// Single canonical event emitted by every worker scraper.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(tag = "kind", rename_all = "snake_case")]
#[non_exhaustive]
pub enum RunEventItem {
    /// A raw stdout / stderr line, optionally split into ANSI spans.
    Line {
        schema: SchemaVersion,
        seq: SeqNum,
        ts_ms: u64,
        run_id: RunId,
        source: SourceId,
        stream: LineStream,
        severity: Severity,
        text: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        spans: Option<Vec<AnsiSpan>>,
    },
    /// Lifecycle transition for a named phase.
    Phase {
        schema: SchemaVersion,
        seq: SeqNum,
        ts_ms: u64,
        run_id: RunId,
        source: SourceId,
        phase: PhaseName,
        state: PhaseState,
        #[serde(skip_serializing_if = "Option::is_none")]
        progress: Option<f32>,
        #[serde(skip_serializing_if = "Option::is_none")]
        summary: Option<String>,
    },
    /// A scalar metric reading at a point or window in time.
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
        #[serde(skip_serializing_if = "Option::is_none")]
        window_ms: Option<u32>,
    },
    /// Tensor allocation event used to build the Lattice cell map.
    TensorAllocate {
        schema: SchemaVersion,
        seq: SeqNum,
        ts_ms: u64,
        run_id: RunId,
        source: SourceId,
        #[serde(skip_serializing_if = "Option::is_none")]
        layer: Option<LayerIndex>,
        group: TensorGroup,
        bytes: u64,
        target: AllocationTarget,
        #[serde(skip_serializing_if = "Option::is_none")]
        tensor_name: Option<String>,
        #[serde(skip_serializing_if = "Option::is_none")]
        dtype: Option<String>,
    },
    /// A produced artifact on disk (model, render output, log file ...).
    Artifact {
        schema: SchemaVersion,
        seq: SeqNum,
        ts_ms: u64,
        run_id: RunId,
        source: SourceId,
        path: String,
        mime: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        bytes: Option<u64>,
        #[serde(skip_serializing_if = "Option::is_none")]
        digest_sha256: Option<String>,
    },
    /// An inline-widget hint for the frontend renderer.
    Widget {
        schema: SchemaVersion,
        seq: SeqNum,
        ts_ms: u64,
        run_id: RunId,
        source: SourceId,
        widget: WidgetKind,
        props: serde_json::Value,
    },
    /// A categorised error captured from the worker.
    Error {
        schema: SchemaVersion,
        seq: SeqNum,
        ts_ms: u64,
        run_id: RunId,
        source: SourceId,
        reason: ErrorReason,
        #[serde(skip_serializing_if = "Option::is_none")]
        layer: Option<LayerIndex>,
        #[serde(skip_serializing_if = "Option::is_none")]
        group: Option<TensorGroup>,
        #[serde(skip_serializing_if = "Option::is_none")]
        device: Option<String>,
        message: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        suggestion: Option<String>,
    },
    /// A detected continuity gap in the sequence-number stream.
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
    /// A worker line that the scraper could not interpret.
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

/// Transport unit shipping a coalesced window of events to a consumer.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct EventBatch {
    /// Schema version of every event in this batch.
    pub schema: SchemaVersion,
    /// Run identifier the events all belong to.
    pub run_id: RunId,
    /// Inclusive lower bound of the contained sequence numbers.
    pub batch_seq_start: SeqNum,
    /// Inclusive upper bound of the contained sequence numbers.
    pub batch_seq_end: SeqNum,
    /// The events themselves, in arrival order.
    pub events: Vec<RunEventItem>,
}
