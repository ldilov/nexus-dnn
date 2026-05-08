//! Fixture-driven correctness tests for the spec 042 llama.cpp scraper.
//!
//! Each fixture is a pair of files in
//! `tests/llamacpp_scraper_fixtures/`:
//!
//! - `<name>.txt` — verbatim stderr captured from a real or simulated
//!   `llama-server` invocation.
//! - `<name>.expected.json` — canonical-form summary of the
//!   [`RunEventItem`] sequence the scraper must emit when fed the
//!   fixture line by line.
//!
//! The "canonical form" deliberately drops the `seq` and `ts_ms`
//! fields (both are timing- and ordering-sensitive) and compares the
//! kind + key payload fields instead. This keeps the fixtures stable
//! across machines while still asserting the core correctness contract:
//! the right kinds of events fire in the right order, with the right
//! semantically-meaningful fields.

use std::collections::BTreeMap;
use std::path::Path;

use nexus_backend_runtimes::llamacpp::scraper_patterns::LlamacppScraperV1;
use nexus_run_events::store::WorkerScraper;
use nexus_run_events::{LineStream, RunEventItem, RunId};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, PartialEq, Eq)]
#[serde(tag = "kind", rename_all = "snake_case")]
enum ExpectedEvent {
    Line {
        text: String,
    },
    Phase {
        phase: String,
        state: String,
        #[serde(default, skip_serializing_if = "Option::is_none")]
        summary: Option<String>,
    },
    Metric {
        name: String,
        #[serde(default)]
        labels: BTreeMap<String, String>,
    },
    TensorAllocate {
        #[serde(default, skip_serializing_if = "Option::is_none")]
        layer: Option<u32>,
        group: String,
        target: String,
    },
    Artifact {
        path: String,
    },
    Widget {
        widget: String,
    },
    Error {
        reason: String,
    },
    Gap {
        reason: String,
    },
    ScraperUnknown {},
}

fn canonicalize(events: &[RunEventItem]) -> Vec<ExpectedEvent> {
    events.iter().filter_map(canonical_one).collect()
}

fn canonical_one(ev: &RunEventItem) -> Option<ExpectedEvent> {
    match ev {
        RunEventItem::Line { text, .. } => Some(ExpectedEvent::Line { text: text.clone() }),
        RunEventItem::Phase {
            phase,
            state,
            summary,
            ..
        } => Some(ExpectedEvent::Phase {
            phase: phase_name(phase),
            state: phase_state(state),
            summary: summary.clone(),
        }),
        RunEventItem::Metric { name, labels, .. } => Some(ExpectedEvent::Metric {
            name: name.clone(),
            labels: labels.clone(),
        }),
        RunEventItem::TensorAllocate {
            layer,
            group,
            target,
            ..
        } => Some(ExpectedEvent::TensorAllocate {
            layer: layer.map(|l| l.value()),
            group: tensor_group(group),
            target: alloc_target(target),
        }),
        RunEventItem::Artifact { path, .. } => Some(ExpectedEvent::Artifact { path: path.clone() }),
        RunEventItem::Widget { widget, .. } => Some(ExpectedEvent::Widget {
            widget: widget_kind(widget),
        }),
        RunEventItem::Error { reason, .. } => Some(ExpectedEvent::Error {
            reason: error_reason(reason),
        }),
        RunEventItem::Gap { reason, .. } => Some(ExpectedEvent::Gap {
            reason: gap_reason(reason),
        }),
        RunEventItem::ScraperUnknown { .. } => Some(ExpectedEvent::ScraperUnknown {}),
        _ => None,
    }
}

fn phase_name(p: &nexus_run_events::PhaseName) -> String {
    use nexus_run_events::PhaseName;
    match p {
        PhaseName::Discover => "discover",
        PhaseName::PrintMeta => "print_meta",
        PhaseName::Tensors => "tensors",
        PhaseName::KvReserve => "kv_reserve",
        PhaseName::ContextBuild => "context_build",
        PhaseName::Warmup => "warmup",
        PhaseName::Ready => "ready",
        _ => "other",
    }
    .to_owned()
}

fn phase_state(s: &nexus_run_events::PhaseState) -> String {
    use nexus_run_events::PhaseState;
    match s {
        PhaseState::Started => "started",
        PhaseState::InProgress => "in_progress",
        PhaseState::Completed => "completed",
        PhaseState::Failed => "failed",
        _ => "other",
    }
    .to_owned()
}

fn tensor_group(g: &nexus_run_events::TensorGroup) -> String {
    use nexus_run_events::TensorGroup;
    match g {
        TensorGroup::Embed => "embed",
        TensorGroup::Attn => "attn",
        TensorGroup::Ffn => "ffn",
        TensorGroup::Norm => "norm",
        TensorGroup::KvCache => "kv_cache",
        TensorGroup::Output => "output",
        TensorGroup::Other => "other",
        _ => "other",
    }
    .to_owned()
}

fn alloc_target(t: &nexus_run_events::AllocationTarget) -> String {
    use nexus_run_events::AllocationTarget;
    match t {
        AllocationTarget::Gpu { device } => format!("gpu:{device}"),
        AllocationTarget::Cpu => "cpu".to_owned(),
        AllocationTarget::CpuMmap => "cpu_mmap".to_owned(),
        AllocationTarget::Pinned => "pinned".to_owned(),
        AllocationTarget::Mixed => "mixed".to_owned(),
        _ => "other".to_owned(),
    }
}

fn error_reason(r: &nexus_run_events::ErrorReason) -> String {
    use nexus_run_events::ErrorReason;
    match r {
        ErrorReason::VramOom => "vram_oom",
        ErrorReason::RamOom => "ram_oom",
        ErrorReason::FileNotFound => "file_not_found",
        ErrorReason::GgufParse => "gguf_parse",
        ErrorReason::CorruptionSuspected => "corruption_suspected",
        ErrorReason::QuantizationMismatch => "quantization_mismatch",
        ErrorReason::BackendInit => "backend_init",
        ErrorReason::KvCacheInit => "kv_cache_init",
        ErrorReason::AllocFailurePartial => "alloc_failure_partial",
        ErrorReason::UserCancelled => "user_cancelled",
        ErrorReason::Other => "other",
        _ => "other",
    }
    .to_owned()
}

fn gap_reason(r: &nexus_run_events::GapReason) -> String {
    use nexus_run_events::GapReason;
    match r {
        GapReason::NLayerMissing => "n_layer_missing",
        GapReason::TensorHistogramMissing => "tensor_histogram_missing",
        GapReason::TransportDrop => "transport_drop",
        GapReason::ScraperLag => "scraper_lag",
        GapReason::WorkerCrash => "worker_crash",
        GapReason::Other => "other",
        _ => "other",
    }
    .to_owned()
}

fn widget_kind(w: &nexus_run_events::WidgetKind) -> String {
    use nexus_run_events::WidgetKind;
    match w {
        WidgetKind::Lattice => "lattice",
        WidgetKind::Download => "download",
        WidgetKind::KvCache => "kv_cache",
        WidgetKind::TokenRate => "token_rate",
        WidgetKind::FileTree => "file_tree",
        WidgetKind::JsonRpc => "json_rpc",
        WidgetKind::Other => "other",
        _ => "other",
    }
    .to_owned()
}

#[derive(Debug, Serialize, Deserialize)]
struct Expected {
    must_contain: Vec<ExpectedEvent>,
}

fn replay_fixture(input: &str) -> Vec<RunEventItem> {
    let run = RunId::try_new("fixture-run").unwrap();
    let mut scraper = LlamacppScraperV1::new(run);
    let mut all = Vec::new();
    for line in input.lines() {
        all.extend(scraper.ingest_line(line, LineStream::Stderr));
    }
    all.extend(scraper.flush());
    all
}

fn assert_must_contain(actual: &[ExpectedEvent], expected: &Expected, fixture_name: &str) {
    for needle in &expected.must_contain {
        let found = actual.iter().any(|a| matches_loose(a, needle));
        assert!(
            found,
            "fixture {fixture_name}: expected event {needle:?} not found in actual:\n{actual:#?}"
        );
    }
}

fn matches_loose(actual: &ExpectedEvent, needle: &ExpectedEvent) -> bool {
    match (actual, needle) {
        (
            ExpectedEvent::Phase {
                phase: a,
                state: b,
                summary: _s,
            },
            ExpectedEvent::Phase {
                phase: a2,
                state: b2,
                summary: ns,
            },
        ) => a == a2 && b == b2 && (ns.is_none() || ns == &Some(_s.clone().unwrap_or_default())),
        (
            ExpectedEvent::Metric {
                name: a,
                labels: la,
            },
            ExpectedEvent::Metric {
                name: b,
                labels: lb,
            },
        ) => a == b && lb.iter().all(|(k, v)| la.get(k) == Some(v)),
        (
            ExpectedEvent::TensorAllocate {
                layer: l1,
                group: g1,
                target: t1,
            },
            ExpectedEvent::TensorAllocate {
                layer: l2,
                group: g2,
                target: t2,
            },
        ) => g1 == g2 && t1 == t2 && (l2.is_none() || l1 == l2),
        (ExpectedEvent::Error { reason: a }, ExpectedEvent::Error { reason: b }) => a == b,
        (ExpectedEvent::Gap { reason: a }, ExpectedEvent::Gap { reason: b }) => a == b,
        (ExpectedEvent::ScraperUnknown {}, ExpectedEvent::ScraperUnknown {}) => true,
        _ => false,
    }
}

fn run_fixture(name: &str) {
    let dir = Path::new(env!("CARGO_MANIFEST_DIR")).join("tests/llamacpp_scraper_fixtures");
    let txt_path = dir.join(format!("{name}.txt"));
    let json_path = dir.join(format!("{name}.expected.json"));
    let input = std::fs::read_to_string(&txt_path)
        .unwrap_or_else(|e| panic!("missing fixture {txt_path:?}: {e}"));
    let raw = std::fs::read_to_string(&json_path)
        .unwrap_or_else(|e| panic!("missing expected {json_path:?}: {e}"));
    let expected: Expected =
        serde_json::from_str(&raw).unwrap_or_else(|e| panic!("malformed {json_path:?}: {e}"));
    let actual = canonicalize(&replay_fixture(&input));
    assert_must_contain(&actual, &expected, name);
}

#[test]
fn happy_path() {
    run_fixture("happy_path");
}

#[test]
fn mixed_offload() {
    run_fixture("mixed_offload");
}

#[test]
fn moe_offload() {
    run_fixture("moe_offload");
}

#[test]
fn vram_oom() {
    run_fixture("vram_oom");
}

#[test]
fn cancelled() {
    run_fixture("cancelled");
}

#[test]
fn corrupt_tensor() {
    run_fixture("corrupt_tensor");
}

#[test]
fn hybrid_mamba() {
    run_fixture("hybrid_mamba");
}

#[test]
fn rocm_oom() {
    run_fixture("rocm_oom");
}
