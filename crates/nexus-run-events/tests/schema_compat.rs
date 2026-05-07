//! Round-trip + forward-compatibility tests for the `RunEventItem`
//! wire shape.
//!
//! Every variant is built, serialised through `serde_json`, parsed
//! back, and asserted equal. Forward-compatibility is exercised by
//! checking that an unknown enum tag fails to deserialise rather than
//! panicking — `#[non_exhaustive]` does not silently absorb future
//! variants on the read path.

use std::collections::BTreeMap;

use nexus_run_events::{
    AllocationTarget, AnsiSpan, ErrorReason, EventBatch, GapReason, LayerIndex,
    LineStream, MetricUnit, PhaseName, PhaseState, RunEventItem, RunId, SeqNum,
    Severity, SourceId, TensorGroup, WidgetKind, SCHEMA_V1,
};

fn run_id() -> RunId {
    RunId::try_new("run-042-test").expect("valid run id")
}

fn source_id() -> SourceId {
    SourceId::try_new("scraper.test").expect("valid source id")
}

fn assert_round_trip(event: &RunEventItem) {
    let json = serde_json::to_string(event).expect("serialise");
    let parsed: RunEventItem =
        serde_json::from_str(&json).expect("deserialise");
    assert_eq!(event, &parsed, "round-trip mismatch for {json}");
}

#[test]
fn line_round_trip() {
    let event = RunEventItem::Line {
        schema: SCHEMA_V1,
        seq: SeqNum::new(1),
        ts_ms: 1_700_000_000_000,
        run_id: run_id(),
        source: source_id(),
        stream: LineStream::Stdout,
        severity: Severity::Info,
        text: "hello".to_owned(),
        spans: Some(vec![AnsiSpan {
            text: "hello".to_owned(),
            fg: Some("cyan".to_owned()),
            bg: None,
            bold: Some(true),
            dim: None,
            italic: None,
        }]),
    };
    assert_round_trip(&event);
}

#[test]
fn phase_round_trip() {
    let event = RunEventItem::Phase {
        schema: SCHEMA_V1,
        seq: SeqNum::new(2),
        ts_ms: 1_700_000_000_001,
        run_id: run_id(),
        source: source_id(),
        phase: PhaseName::Tensors,
        state: PhaseState::InProgress,
        progress: Some(0.42),
        summary: Some("loading layers".to_owned()),
    };
    assert_round_trip(&event);
}

#[test]
fn metric_round_trip() {
    let mut labels = BTreeMap::new();
    labels.insert("device".to_owned(), "0".to_owned());
    let event = RunEventItem::Metric {
        schema: SCHEMA_V1,
        seq: SeqNum::new(3),
        ts_ms: 1_700_000_000_002,
        run_id: run_id(),
        source: source_id(),
        name: "vram_used".to_owned(),
        value: 1024.0,
        unit: MetricUnit::Bytes,
        labels,
        window_ms: Some(1_000),
    };
    assert_round_trip(&event);
}

#[test]
fn tensor_allocate_round_trip_gpu_target() {
    let event = RunEventItem::TensorAllocate {
        schema: SCHEMA_V1,
        seq: SeqNum::new(4),
        ts_ms: 1_700_000_000_003,
        run_id: run_id(),
        source: source_id(),
        layer: Some(LayerIndex::new(7)),
        group: TensorGroup::Attn,
        bytes: 65_536,
        target: AllocationTarget::Gpu { device: 0 },
        tensor_name: Some("blk.7.attn_q.weight".to_owned()),
        dtype: Some("Q4_K_M".to_owned()),
    };
    assert_round_trip(&event);
}

#[test]
fn tensor_allocate_round_trip_cpu_mmap_target() {
    let event = RunEventItem::TensorAllocate {
        schema: SCHEMA_V1,
        seq: SeqNum::new(5),
        ts_ms: 1_700_000_000_004,
        run_id: run_id(),
        source: source_id(),
        layer: None,
        group: TensorGroup::Embed,
        bytes: 16_384,
        target: AllocationTarget::CpuMmap,
        tensor_name: None,
        dtype: None,
    };
    assert_round_trip(&event);
}

#[test]
fn artifact_round_trip() {
    let event = RunEventItem::Artifact {
        schema: SCHEMA_V1,
        seq: SeqNum::new(6),
        ts_ms: 1_700_000_000_005,
        run_id: run_id(),
        source: source_id(),
        path: "/tmp/out.wav".to_owned(),
        mime: "audio/wav".to_owned(),
        bytes: Some(2_048),
        digest_sha256: Some(
            "abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789"
                .to_owned(),
        ),
    };
    assert_round_trip(&event);
}

#[test]
fn widget_round_trip() {
    let event = RunEventItem::Widget {
        schema: SCHEMA_V1,
        seq: SeqNum::new(7),
        ts_ms: 1_700_000_000_006,
        run_id: run_id(),
        source: source_id(),
        widget: WidgetKind::Lattice,
        props: serde_json::json!({"layers": 70, "groups": 5}),
    };
    assert_round_trip(&event);
}

#[test]
fn error_round_trip() {
    let event = RunEventItem::Error {
        schema: SCHEMA_V1,
        seq: SeqNum::new(8),
        ts_ms: 1_700_000_000_007,
        run_id: run_id(),
        source: source_id(),
        reason: ErrorReason::VramOom,
        layer: Some(LayerIndex::new(33)),
        group: Some(TensorGroup::KvCache),
        device: Some("cuda:0".to_owned()),
        message: "out of memory".to_owned(),
        suggestion: Some("reduce n_ctx".to_owned()),
    };
    assert_round_trip(&event);
}

#[test]
fn gap_round_trip() {
    let event = RunEventItem::Gap {
        schema: SCHEMA_V1,
        seq: SeqNum::new(9),
        ts_ms: 1_700_000_000_008,
        run_id: run_id(),
        source: source_id(),
        from_seq: SeqNum::new(100),
        to_seq: SeqNum::new(120),
        reason: GapReason::TransportDrop,
    };
    assert_round_trip(&event);
}

#[test]
fn scraper_unknown_round_trip() {
    let event = RunEventItem::ScraperUnknown {
        schema: SCHEMA_V1,
        seq: SeqNum::new(10),
        ts_ms: 1_700_000_000_009,
        run_id: run_id(),
        source: source_id(),
        raw_line: "??? unparsed line ???".to_owned(),
        scraper: "scraper.test".to_owned(),
    };
    assert_round_trip(&event);
}

#[test]
fn event_batch_round_trip() {
    let event = RunEventItem::Line {
        schema: SCHEMA_V1.clone(),
        seq: SeqNum::new(1),
        ts_ms: 1_700_000_000_000,
        run_id: run_id(),
        source: source_id(),
        stream: LineStream::Stderr,
        severity: Severity::Warn,
        text: "warning emitted".to_owned(),
        spans: None,
    };
    let batch = EventBatch {
        schema: SCHEMA_V1,
        run_id: run_id(),
        batch_seq_start: SeqNum::new(1),
        batch_seq_end: SeqNum::new(1),
        events: vec![event],
    };
    let json = serde_json::to_string(&batch).expect("serialise batch");
    let parsed: EventBatch =
        serde_json::from_str(&json).expect("deserialise batch");
    assert_eq!(batch, parsed);
}

#[test]
fn unknown_kind_fails_gracefully() {
    let json = r#"{
        "kind": "future_unknown",
        "schema": "nexus.run-event.v1",
        "seq": 1,
        "ts_ms": 0,
        "run_id": "run-x",
        "source": "src-x"
    }"#;
    let result: Result<RunEventItem, _> = serde_json::from_str(json);
    assert!(result.is_err(), "unknown kind must error, not panic");
}

#[test]
fn unknown_enum_value_fails_gracefully() {
    let json = r#"{
        "kind": "phase",
        "schema": "nexus.run-event.v1",
        "seq": 1,
        "ts_ms": 0,
        "run_id": "run-x",
        "source": "src-x",
        "phase": "future_phase",
        "state": "started"
    }"#;
    let result: Result<RunEventItem, _> = serde_json::from_str(json);
    assert!(result.is_err(), "unknown enum value must error, not panic");
}
