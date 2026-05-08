//! Stderr-driven scraper that converts llama.cpp `--log-verbosity 1`
//! output into `RunEventItem` records consumed by the spec 042
//! Lattice surface.
//!
//! The scraper is invoked once per stderr line by the host log
//! pipeline. State machine fields:
//!
//! - `current_phase` — most recently observed lifecycle phase, used to
//!   classify boundary transitions and to decide when expected lines
//!   are missing (so a `Gap` event can be emitted).
//! - `n_layer` — cached transformer layer count from the
//!   `llm_load_print_meta: n_layer = N` line. Required by the
//!   tensor-histogram fallback path.
//! - `pending_allocations` — per-(layer, group) `TensorAllocate` events
//!   buffered until the offload-plan line arrives, then re-emitted with
//!   `target` updated from `Mixed` to `Gpu { device: 0 }` or `Cpu`.
//! - `oom_window` — sliding 2-second buffer of OOM-related lines.
//!   Drained into a single aggregated `Error` event when all three
//!   members of the documented trio arrive, or flushed as
//!   `AllocFailurePartial` after the timeout.
//!
//! See `specs/042-neo-terminal-shell/contracts/llamacpp-scraper-events.md`
//! for the canonical regex table and event mapping.

use std::collections::{BTreeMap, HashMap, VecDeque};
use std::sync::OnceLock;
use std::time::{SystemTime, UNIX_EPOCH};

use nexus_run_events::store::WorkerScraper;
use nexus_run_events::{
    AllocationTarget, ErrorReason, GapReason, LayerIndex, LineStream, MetricUnit, PhaseName,
    PhaseState, RunEventItem, RunId, SchemaVersion, SeqNum, Severity, SourceId, TensorGroup,
    SCHEMA_V1,
};
use regex::Regex;

const SOURCE: &str = "llamacpp.scraper";
const SCRAPER_ID: &str = "llamacpp.v1";
const OOM_WINDOW_MS: u64 = 2_000;

/// Stable identifier emitted as the `source` of every event the
/// scraper produces.
pub const SCRAPER_SOURCE: &str = SOURCE;

struct Patterns {
    head: Regex,
    n_layer: Regex,
    tensor_split: Regex,
    offload_repeating: Regex,
    offload_total: Regex,
    offload_expert_cpu: Regex,
    offload_output: Regex,
    buffer_size: Regex,
    kv_summary: Regex,
    context_kv: Regex,
    cuda_oom: Regex,
    rocm_oom: Regex,
    gallocr_failed: Regex,
    compute_buf_failed: Regex,
    error_top: Regex,
    blk_tensor: Regex,
}

fn patterns() -> &'static Patterns {
    static P: OnceLock<Patterns> = OnceLock::new();
    P.get_or_init(|| Patterns {
        head: Regex::new(r"^(?P<func>\w+):\s+(?P<body>.*)$").unwrap(),
        n_layer: Regex::new(r"^(?P<func>\w+):\s+n_layer\s*=\s*(?P<n>\d+)\s*$").unwrap(),
        tensor_split: Regex::new(
            r"^llama_model_loader:\s+-\s+tensor split\s+(?P<split>\d+):\s+(?P<name>\S+)\s+(?P<dtype>\S+)\s+\[\s*(?P<shape>[^\]]+?)\s*\]\s+(?P<mib>[0-9.]+)\s+MiB",
        )
        .unwrap(),
        offload_repeating: Regex::new(
            r"^\w+:\s+offloading\s+(?P<count>\d+)\s+repeating layers to GPU",
        )
        .unwrap(),
        offload_total: Regex::new(
            r"^\w+:\s+offloaded\s+(?P<offloaded>\d+)/(?P<total>\d+)\s+layers to GPU",
        )
        .unwrap(),
        offload_expert_cpu: Regex::new(
            r"^\w+:\s+offloading\s+(?P<count>\d+)\s+expert layers to CPU",
        )
        .unwrap(),
        offload_output: Regex::new(r"^\w+:\s+offloading\s+output layer to GPU").unwrap(),
        buffer_size: Regex::new(
            r"^(?P<func>\w+):\s+(?P<device>\S+)\s+(?P<kind>model|KV|compute|output)\s+buffer size\s*=\s*(?P<mib>[0-9.]+)\s+MiB",
        )
        .unwrap(),
        kv_summary: Regex::new(
            r"^llama_kv_cache:\s+size\s*=\s*(?P<total_mib>[0-9.]+)\s+MiB\s+\((?P<cells>\d+)\s+cells,\s+(?P<layers>\d+)\s+layers,\s+(?P<seqs_used>\d+)/(?P<seqs_max>\d+)\s+seqs\),\s+K\s+\((?P<k_dtype>[^)]+)\):\s*(?P<k_mib>[0-9.]+)\s+MiB,\s+V\s+\((?P<v_dtype>[^)]+)\):\s*(?P<v_mib>[0-9.]+)\s+MiB",
        )
        .unwrap(),
        context_kv: Regex::new(
            r"^llama_context:\s+(?P<key>\w+)\s*=\s*(?P<value>\S+)",
        )
        .unwrap(),
        cuda_oom: Regex::new(r"cudaMalloc failed:\s+out of memory").unwrap(),
        rocm_oom: Regex::new(r"hipMalloc failed:\s+out of memory").unwrap(),
        gallocr_failed: Regex::new(
            r"failed to allocate (?P<device>\S+) buffer of size (?P<bytes>\d+)",
        )
        .unwrap(),
        compute_buf_failed: Regex::new(r"failed to allocate compute buffers").unwrap(),
        error_top: Regex::new(
            r"^(?P<func>\w+):\s+(?:failed to|error loading|cancelled)\s+(?P<rest>.*)$",
        )
        .unwrap(),
        blk_tensor: Regex::new(r"^blk\.(?P<layer>\d+)\.(?P<rest>.+?)\.weight$").unwrap(),
    })
}

#[derive(Debug, Clone, Copy)]
enum FuncFamily {
    LlamaModelLoader,
    LlmLoadPrintMeta,
    LlmLoadTensors,
    LlamaKvCache,
    LlamaContext,
    Other,
}

fn classify_family(func: &str) -> FuncFamily {
    match func {
        "llama_model_loader" => FuncFamily::LlamaModelLoader,
        "llm_load_print_meta" | "print_info" => FuncFamily::LlmLoadPrintMeta,
        "llm_load_tensors" | "load_tensors" => FuncFamily::LlmLoadTensors,
        f if f.starts_with("llama_kv_cache") => FuncFamily::LlamaKvCache,
        "llama_context" | "llama_new_context_with_model" => FuncFamily::LlamaContext,
        _ => FuncFamily::Other,
    }
}

fn family_phase(family: FuncFamily) -> Option<PhaseName> {
    match family {
        FuncFamily::LlamaModelLoader => Some(PhaseName::Discover),
        FuncFamily::LlmLoadPrintMeta => Some(PhaseName::PrintMeta),
        FuncFamily::LlmLoadTensors => Some(PhaseName::Tensors),
        FuncFamily::LlamaKvCache => Some(PhaseName::KvReserve),
        FuncFamily::LlamaContext => Some(PhaseName::ContextBuild),
        FuncFamily::Other => None,
    }
}

#[derive(Debug, Clone)]
struct OomLine {
    ts_ms: u64,
    text: String,
    device: Option<String>,
    bytes: Option<u64>,
}

#[derive(Debug, Clone)]
struct PendingAlloc {
    layer: Option<LayerIndex>,
    group: TensorGroup,
    bytes: u64,
    tensor_name: String,
    dtype: String,
}

/// Llama.cpp v1 stderr scraper. One instance per worker process.
pub struct LlamacppScraperV1 {
    run_id: RunId,
    seq: SeqNum,
    current_phase: Option<PhaseName>,
    n_layer: Option<u32>,
    tensor_histogram_seen: bool,
    pending_allocations: HashMap<(Option<u32>, u8), PendingAlloc>,
    oom_window: VecDeque<OomLine>,
    n_layer_gap_emitted: bool,
    histogram_gap_emitted: bool,
    offload_total_gpu: Option<u32>,
    offload_total_layers: Option<u32>,
    offload_expert_cpu: Option<u32>,
}

impl LlamacppScraperV1 {
    /// Construct a fresh scraper attached to the given run.
    pub fn new(run_id: RunId) -> Self {
        Self {
            run_id,
            seq: SeqNum::new(0),
            current_phase: None,
            n_layer: None,
            tensor_histogram_seen: false,
            pending_allocations: HashMap::new(),
            oom_window: VecDeque::new(),
            n_layer_gap_emitted: false,
            histogram_gap_emitted: false,
            offload_total_gpu: None,
            offload_total_layers: None,
            offload_expert_cpu: None,
        }
    }

    fn next_seq(&mut self) -> SeqNum {
        self.seq = self.seq.next();
        self.seq
    }

    fn ts_ms(&self) -> u64 {
        SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map(|d| d.as_millis() as u64)
            .unwrap_or(0)
    }

    fn schema(&self) -> SchemaVersion {
        SCHEMA_V1.clone()
    }

    fn source_id(&self) -> SourceId {
        SourceId::try_new(SOURCE).expect("static source id")
    }

    fn emit_phase(&mut self, phase: PhaseName, state: PhaseState, summary: Option<String>) -> RunEventItem {
        let seq = self.next_seq();
        RunEventItem::Phase {
            schema: self.schema(),
            seq,
            ts_ms: self.ts_ms(),
            run_id: self.run_id.clone(),
            source: self.source_id(),
            phase,
            state,
            progress: None,
            summary,
        }
    }

    fn emit_metric(
        &mut self,
        name: impl Into<String>,
        value: f64,
        unit: MetricUnit,
        labels: BTreeMap<String, String>,
    ) -> RunEventItem {
        let seq = self.next_seq();
        RunEventItem::Metric {
            schema: self.schema(),
            seq,
            ts_ms: self.ts_ms(),
            run_id: self.run_id.clone(),
            source: self.source_id(),
            name: name.into(),
            value,
            unit,
            labels,
            window_ms: None,
        }
    }

    fn emit_tensor_allocate(
        &mut self,
        alloc: &PendingAlloc,
        target: AllocationTarget,
    ) -> RunEventItem {
        let seq = self.next_seq();
        RunEventItem::TensorAllocate {
            schema: self.schema(),
            seq,
            ts_ms: self.ts_ms(),
            run_id: self.run_id.clone(),
            source: self.source_id(),
            layer: alloc.layer,
            group: alloc.group,
            bytes: alloc.bytes,
            target,
            tensor_name: Some(alloc.tensor_name.clone()),
            dtype: Some(alloc.dtype.clone()),
        }
    }

    fn emit_unknown(&mut self, raw_line: &str) -> RunEventItem {
        let seq = self.next_seq();
        RunEventItem::ScraperUnknown {
            schema: self.schema(),
            seq,
            ts_ms: self.ts_ms(),
            run_id: self.run_id.clone(),
            source: self.source_id(),
            raw_line: raw_line.to_owned(),
            scraper: SCRAPER_ID.to_owned(),
        }
    }

    fn emit_gap(&mut self, reason: GapReason) -> RunEventItem {
        let seq = self.next_seq();
        RunEventItem::Gap {
            schema: self.schema(),
            seq,
            ts_ms: self.ts_ms(),
            run_id: self.run_id.clone(),
            source: self.source_id(),
            from_seq: seq,
            to_seq: seq,
            reason,
        }
    }

    fn emit_error(
        &mut self,
        reason: ErrorReason,
        device: Option<String>,
        message: String,
        suggestion: Option<String>,
    ) -> RunEventItem {
        let seq = self.next_seq();
        RunEventItem::Error {
            schema: self.schema(),
            seq,
            ts_ms: self.ts_ms(),
            run_id: self.run_id.clone(),
            source: self.source_id(),
            reason,
            layer: None,
            group: None,
            device,
            message,
            suggestion,
        }
    }

    fn classify_phase_transition(
        &mut self,
        family: FuncFamily,
        out: &mut Vec<RunEventItem>,
    ) {
        let next_phase = match family_phase(family) {
            Some(p) => p,
            None => return,
        };
        if self.current_phase == Some(next_phase) {
            return;
        }
        if let Some(prev) = self.current_phase {
            if needs_gap_check(prev, &mut self.n_layer_gap_emitted, self.n_layer.is_none(), GapPredicate::NLayer) {
                let ev = self.emit_gap(GapReason::NLayerMissing);
                out.push(ev);
            }
            if needs_gap_check(
                prev,
                &mut self.histogram_gap_emitted,
                !self.tensor_histogram_seen,
                GapPredicate::Histogram,
            ) {
                let ev = self.emit_gap(GapReason::TensorHistogramMissing);
                out.push(ev);
            }
            let ev = self.emit_phase(prev, PhaseState::Completed, None);
            out.push(ev);
        }
        let ev = self.emit_phase(next_phase, PhaseState::Started, None);
        out.push(ev);
        self.current_phase = Some(next_phase);
    }

    fn try_n_layer(&mut self, line: &str, out: &mut Vec<RunEventItem>) -> bool {
        let pats = patterns();
        let Some(caps) = pats.n_layer.captures(line) else {
            return false;
        };
        let Some(n) = caps.name("n").and_then(|m| m.as_str().parse::<u32>().ok()) else {
            return false;
        };
        self.n_layer = Some(n);
        let ev = self.emit_metric(
            "model.n_layer",
            f64::from(n),
            MetricUnit::Count,
            BTreeMap::new(),
        );
        out.push(ev);
        true
    }

    fn try_tensor_split(&mut self, line: &str, out: &mut Vec<RunEventItem>) -> bool {
        let pats = patterns();
        let Some(caps) = pats.tensor_split.captures(line) else {
            return false;
        };
        let name = caps
            .name("name")
            .map(|m| m.as_str().to_owned())
            .unwrap_or_default();
        let dtype = caps
            .name("dtype")
            .map(|m| m.as_str().to_owned())
            .unwrap_or_default();
        let mib: f64 = caps
            .name("mib")
            .and_then(|m| m.as_str().parse().ok())
            .unwrap_or(0.0);
        let bytes = (mib * 1_048_576.0) as u64;
        let (layer, group) = parse_tensor_name(&name);
        self.tensor_histogram_seen = true;
        let alloc = PendingAlloc {
            layer,
            group,
            bytes,
            tensor_name: name,
            dtype,
        };
        let key = (alloc.layer.map(|l| l.value()), tensor_group_key(alloc.group));
        let ev = self.emit_tensor_allocate(&alloc, AllocationTarget::Mixed);
        self.pending_allocations.insert(key, alloc);
        out.push(ev);
        true
    }

    fn try_offload_plan(&mut self, line: &str, out: &mut Vec<RunEventItem>) -> bool {
        let pats = patterns();
        let mut matched = false;
        if let Some(caps) = pats.offload_repeating.captures(line) {
            self.offload_total_gpu = caps.name("count").and_then(|m| m.as_str().parse().ok());
            matched = true;
        }
        if let Some(caps) = pats.offload_total.captures(line) {
            self.offload_total_gpu = caps.name("offloaded").and_then(|m| m.as_str().parse().ok());
            self.offload_total_layers = caps.name("total").and_then(|m| m.as_str().parse().ok());
            matched = true;
        }
        if let Some(caps) = pats.offload_expert_cpu.captures(line) {
            self.offload_expert_cpu = caps.name("count").and_then(|m| m.as_str().parse().ok());
            matched = true;
        }
        if pats.offload_output.is_match(line) {
            matched = true;
        }
        if !matched {
            return false;
        }
        if self.offload_total_gpu.is_some() || self.offload_total_layers.is_some() {
            let summary = self.format_offload_summary();
            let ev = self.emit_phase(PhaseName::Tensors, PhaseState::InProgress, Some(summary));
            out.push(ev);
            self.replay_pending_allocations(out);
        }
        true
    }

    fn format_offload_summary(&self) -> String {
        let gpu = self.offload_total_gpu.unwrap_or(0);
        let total = self.offload_total_layers.or(self.n_layer).unwrap_or(0);
        let cpu_expert = self.offload_expert_cpu.unwrap_or(0);
        if cpu_expert > 0 {
            format!("{gpu}/{total} layers on GPU + {cpu_expert} expert layers on CPU")
        } else {
            format!("{gpu}/{total} layers on GPU")
        }
    }

    fn replay_pending_allocations(&mut self, out: &mut Vec<RunEventItem>) {
        let pending: Vec<_> = self.pending_allocations.values().cloned().collect();
        let total = self.offload_total_layers.or(self.n_layer);
        let gpu = self.offload_total_gpu;
        let cpu_expert = self.offload_expert_cpu.unwrap_or(0);
        for alloc in pending {
            let target = derived_target(alloc.layer, alloc.group, total, gpu, cpu_expert);
            let ev = self.emit_tensor_allocate(&alloc, target);
            out.push(ev);
        }
    }

    fn try_buffer_size(&mut self, line: &str, out: &mut Vec<RunEventItem>) -> bool {
        let pats = patterns();
        let Some(caps) = pats.buffer_size.captures(line) else {
            return false;
        };
        let device = caps
            .name("device")
            .map(|m| m.as_str().to_owned())
            .unwrap_or_default();
        let kind = caps
            .name("kind")
            .map(|m| m.as_str().to_owned())
            .unwrap_or_default();
        let mib: f64 = caps
            .name("mib")
            .and_then(|m| m.as_str().parse().ok())
            .unwrap_or(0.0);
        let bytes = (mib * 1_048_576.0) as u64;
        let normalised = normalise_device_label(&device);
        let mut labels = BTreeMap::new();
        labels.insert("device".to_owned(), normalised.clone());
        labels.insert("kind".to_owned(), kind);
        let ev = self.emit_metric("buffer.bytes", bytes as f64, MetricUnit::Bytes, labels);
        out.push(ev);
        if normalised == "unknown" {
            let ev = self.emit_unknown(line);
            out.push(ev);
        }
        true
    }

    fn try_kv_summary(&mut self, line: &str, out: &mut Vec<RunEventItem>) -> bool {
        let pats = patterns();
        let Some(caps) = pats.kv_summary.captures(line) else {
            return false;
        };
        let total_mib: f64 = caps
            .name("total_mib")
            .and_then(|m| m.as_str().parse().ok())
            .unwrap_or(0.0);
        let layers: u32 = caps
            .name("layers")
            .and_then(|m| m.as_str().parse().ok())
            .unwrap_or(0);
        let k_dtype = caps
            .name("k_dtype")
            .map(|m| m.as_str().trim().to_owned())
            .unwrap_or_default();
        let v_dtype = caps
            .name("v_dtype")
            .map(|m| m.as_str().trim().to_owned())
            .unwrap_or_default();
        let k_mib: f64 = caps
            .name("k_mib")
            .and_then(|m| m.as_str().parse().ok())
            .unwrap_or(0.0);
        let v_mib: f64 = caps
            .name("v_mib")
            .and_then(|m| m.as_str().parse().ok())
            .unwrap_or(0.0);
        let mut k_labels = BTreeMap::new();
        k_labels.insert("kind".to_owned(), "K".to_owned());
        k_labels.insert("dtype".to_owned(), k_dtype.clone());
        let ev_k = self.emit_metric(
            "kv.bytes",
            k_mib * 1_048_576.0,
            MetricUnit::Bytes,
            k_labels,
        );
        out.push(ev_k);
        let mut v_labels = BTreeMap::new();
        v_labels.insert("kind".to_owned(), "V".to_owned());
        v_labels.insert("dtype".to_owned(), v_dtype.clone());
        let ev_v = self.emit_metric(
            "kv.bytes",
            v_mib * 1_048_576.0,
            MetricUnit::Bytes,
            v_labels,
        );
        out.push(ev_v);
        let summary = format!(
            "KV cache: {total_mib} MiB across {layers} layers, K ({k_dtype}) {k_mib}, V ({v_dtype}) {v_mib}"
        );
        let ev = self.emit_phase(PhaseName::KvReserve, PhaseState::Completed, Some(summary));
        out.push(ev);
        if let Some(n) = self.n_layer
            && layers < n
        {
            let hybrid = self.emit_phase(
                    PhaseName::KvReserve,
                    PhaseState::InProgress,
                    Some(format!(
                        "{} layers without KV cache (hybrid model)",
                        n - layers
                    )),
                );
            out.push(hybrid);
        }
        true
    }

    fn try_context_build(&mut self, line: &str, out: &mut Vec<RunEventItem>) -> bool {
        let pats = patterns();
        let Some(caps) = pats.context_kv.captures(line) else {
            return false;
        };
        let key = caps
            .name("key")
            .map(|m| m.as_str().to_owned())
            .unwrap_or_default();
        let raw = caps
            .name("value")
            .map(|m| m.as_str().to_owned())
            .unwrap_or_default();
        let value: f64 = match raw.as_str() {
            "true" => 1.0,
            "false" => 0.0,
            other => other.parse::<f64>().unwrap_or(0.0),
        };
        let ev = self.emit_metric(
            format!("context.{key}"),
            value,
            MetricUnit::Count,
            BTreeMap::new(),
        );
        out.push(ev);
        if key == "graph" || key == "graph_splits" {
            let summary = format!("{raw} graph splits");
            let phase_event =
                self.emit_phase(PhaseName::ContextBuild, PhaseState::Completed, Some(summary));
            out.push(phase_event);
        }
        true
    }

    fn try_oom_window(&mut self, line: &str, out: &mut Vec<RunEventItem>) -> bool {
        let pats = patterns();
        let now = self.ts_ms();
        let mut hit = false;
        let mut entry = OomLine {
            ts_ms: now,
            text: line.to_owned(),
            device: None,
            bytes: None,
        };
        if pats.cuda_oom.is_match(line) || pats.rocm_oom.is_match(line) {
            hit = true;
        }
        if let Some(caps) = pats.gallocr_failed.captures(line) {
            entry.device = caps.name("device").map(|m| m.as_str().to_owned());
            entry.bytes = caps.name("bytes").and_then(|m| m.as_str().parse().ok());
            hit = true;
        }
        if pats.compute_buf_failed.is_match(line) {
            hit = true;
        }
        if !hit {
            return false;
        }
        self.oom_window.push_back(entry);
        self.flush_oom_window(out, false);
        true
    }

    fn flush_oom_window(&mut self, out: &mut Vec<RunEventItem>, force: bool) {
        if self.oom_window.is_empty() {
            return;
        }
        let now = self.ts_ms();
        let oldest = self.oom_window.front().map(|l| l.ts_ms).unwrap_or(now);
        let elapsed = now.saturating_sub(oldest);
        let trio = self.oom_window.len() >= 3;
        if !(trio || force || elapsed >= OOM_WINDOW_MS) {
            return;
        }
        let drained: Vec<_> = self.oom_window.drain(..).collect();
        let device = drained.iter().find_map(|l| l.device.clone());
        let bytes = drained.iter().find_map(|l| l.bytes);
        let combined = drained
            .iter()
            .map(|l| l.text.as_str())
            .collect::<Vec<_>>()
            .join("\n");
        let suggestion = derive_oom_suggestion(bytes);
        let reason = if trio {
            ErrorReason::VramOom
        } else {
            ErrorReason::AllocFailurePartial
        };
        let mut message = combined;
        if let Some(b) = bytes {
            message.push_str(&format!("\nrequested_bytes={b}"));
        }
        let ev = self.emit_error(reason, device, message, suggestion);
        out.push(ev);
    }

    fn try_other_errors(&mut self, line: &str, out: &mut Vec<RunEventItem>) -> bool {
        let pats = patterns();
        if let Some(caps) = pats.error_top.captures(line) {
            let func = caps
                .name("func")
                .map(|m| m.as_str().to_owned())
                .unwrap_or_default();
            let rest = caps
                .name("rest")
                .map(|m| m.as_str().to_owned())
                .unwrap_or_default();
            let reason = classify_error(&func, &rest);
            let ev = self.emit_error(reason, None, format!("{func}: {rest}"), None);
            out.push(ev);
            return true;
        }
        if line.contains("tensor '") && line.contains("' has invalid data") {
            let ev = self.emit_error(
                ErrorReason::CorruptionSuspected,
                None,
                line.to_owned(),
                None,
            );
            out.push(ev);
            return true;
        }
        if line.contains("unknown type ") && line.starts_with("llama_model_loader:") {
            let ev = self.emit_error(
                ErrorReason::QuantizationMismatch,
                None,
                line.to_owned(),
                None,
            );
            out.push(ev);
            return true;
        }
        if line.contains("no backends are loaded") {
            let ev = self.emit_error(ErrorReason::BackendInit, None, line.to_owned(), None);
            out.push(ev);
            return true;
        }
        if line.contains("failed to allocate output buffer") {
            let ev = self.emit_error(ErrorReason::KvCacheInit, None, line.to_owned(), None);
            out.push(ev);
            return true;
        }
        false
    }
}

#[derive(Debug, Clone, Copy)]
enum GapPredicate {
    NLayer,
    Histogram,
}

fn needs_gap_check(
    prev: PhaseName,
    already_emitted: &mut bool,
    missing: bool,
    pred: GapPredicate,
) -> bool {
    if *already_emitted || !missing {
        return false;
    }
    let trigger = match pred {
        GapPredicate::NLayer => matches!(prev, PhaseName::PrintMeta),
        GapPredicate::Histogram => matches!(prev, PhaseName::Tensors),
    };
    if trigger {
        *already_emitted = true;
        true
    } else {
        false
    }
}

fn tensor_group_key(g: TensorGroup) -> u8 {
    match g {
        TensorGroup::Embed => 0,
        TensorGroup::Attn => 1,
        TensorGroup::Ffn => 2,
        TensorGroup::Norm => 3,
        TensorGroup::KvCache => 4,
        TensorGroup::Output => 5,
        TensorGroup::Other => 6,
        _ => u8::MAX,
    }
}

fn parse_tensor_name(name: &str) -> (Option<LayerIndex>, TensorGroup) {
    if name == "token_embd.weight" || name == "tok_embeddings.weight" {
        return (None, TensorGroup::Embed);
    }
    if name == "output.weight" || name == "output_norm.weight" {
        return (None, TensorGroup::Output);
    }
    let pats = patterns();
    if let Some(caps) = pats.blk_tensor.captures(name) {
        let layer = caps
            .name("layer")
            .and_then(|m| m.as_str().parse::<u32>().ok())
            .map(LayerIndex::new);
        let rest = caps.name("rest").map(|m| m.as_str()).unwrap_or("");
        let group = match rest {
            r if r.starts_with("attn_q")
                || r.starts_with("attn_k")
                || r.starts_with("attn_v")
                || r.starts_with("attn_output") =>
            {
                TensorGroup::Attn
            }
            r if r.starts_with("ffn_up")
                || r.starts_with("ffn_down")
                || r.starts_with("ffn_gate") =>
            {
                TensorGroup::Ffn
            }
            r if r.starts_with("attn_norm") || r.starts_with("ffn_norm") => TensorGroup::Norm,
            _ => TensorGroup::Other,
        };
        return (layer, group);
    }
    (None, TensorGroup::Other)
}

fn normalise_device_label(label: &str) -> String {
    let upper = label.to_ascii_uppercase();
    if upper.starts_with("CUDA")
        || upper.starts_with("ROCM")
        || upper.starts_with("METAL")
        || upper.starts_with("SYCL")
        || upper.starts_with("VULKAN")
        || upper.starts_with("CANN")
        || upper.starts_with("RPC")
        || upper == "CPU"
        || upper == "CPU_MAPPED"
        || upper == "CUDA_HOST"
    {
        return label.to_owned();
    }
    "unknown".to_owned()
}

fn derived_target(
    layer: Option<LayerIndex>,
    group: TensorGroup,
    total_layers: Option<u32>,
    gpu_count: Option<u32>,
    cpu_expert: u32,
) -> AllocationTarget {
    let Some(l) = layer.map(|x| x.value()) else {
        return AllocationTarget::Gpu { device: 0 };
    };
    let total = total_layers.unwrap_or(0);
    let gpu = gpu_count.unwrap_or(total);
    if matches!(group, TensorGroup::Ffn) && cpu_expert > 0 {
        let cpu_threshold = total.saturating_sub(cpu_expert);
        if l >= cpu_threshold {
            return AllocationTarget::Cpu;
        }
    }
    if l < gpu {
        AllocationTarget::Gpu { device: 0 }
    } else {
        AllocationTarget::Cpu
    }
}

fn classify_error(func: &str, rest: &str) -> ErrorReason {
    if rest.contains("model load") || rest.contains("cancelled") {
        return ErrorReason::UserCancelled;
    }
    if rest.starts_with("load model") || rest.contains("hyperparameters") {
        return ErrorReason::GgufParse;
    }
    if rest.contains("output buffer") {
        return ErrorReason::KvCacheInit;
    }
    if func == "llama_load_model_from_file" || func == "llama_model_load_from_file" {
        return ErrorReason::GgufParse;
    }
    ErrorReason::Other
}

fn derive_oom_suggestion(bytes: Option<u64>) -> Option<String> {
    match bytes {
        Some(b) if b > 0 => Some(format!(
            "Reduce n-gpu-layers or use n-cpu-moe 1 (requested ~{} MiB)",
            b / 1_048_576
        )),
        _ => Some("Reduce n-gpu-layers or use n-cpu-moe 1".to_owned()),
    }
}

impl WorkerScraper for LlamacppScraperV1 {
    fn id(&self) -> &str {
        SCRAPER_ID
    }

    fn ingest_line(&mut self, line: &str, _stream: LineStream) -> Vec<RunEventItem> {
        let mut out = Vec::new();
        let trimmed = line.trim_end_matches(['\r', '\n']);
        if trimmed.is_empty() {
            self.flush_oom_window(&mut out, false);
            return out;
        }
        tracing::trace!(target: "nexus_backend_runtimes::llamacpp::scraper", line = %trimmed);
        let pats = patterns();
        let Some(head) = pats.head.captures(trimmed) else {
            if self.try_oom_window(trimmed, &mut out) || self.try_other_errors(trimmed, &mut out) {
                return out;
            }
            self.flush_oom_window(&mut out, false);
            return out;
        };
        let func = head.name("func").map(|m| m.as_str()).unwrap_or("");
        let family = classify_family(func);
        if !matches!(family, FuncFamily::Other) {
            self.classify_phase_transition(family, &mut out);
        }
        let mut consumed = false;
        if matches!(family, FuncFamily::LlmLoadPrintMeta) && self.try_n_layer(trimmed, &mut out) {
            consumed = true;
        }
        if !consumed
            && matches!(family, FuncFamily::LlamaModelLoader)
            && self.try_tensor_split(trimmed, &mut out)
        {
            consumed = true;
        }
        if !consumed && self.try_offload_plan(trimmed, &mut out) {
            consumed = true;
        }
        if !consumed && self.try_buffer_size(trimmed, &mut out) {
            consumed = true;
        }
        if !consumed
            && matches!(family, FuncFamily::LlamaKvCache)
            && self.try_kv_summary(trimmed, &mut out)
        {
            consumed = true;
        }
        if !consumed
            && matches!(family, FuncFamily::LlamaContext)
            && self.try_context_build(trimmed, &mut out)
        {
            consumed = true;
        }
        if !consumed && self.try_oom_window(trimmed, &mut out) {
            consumed = true;
        }
        if !consumed && self.try_other_errors(trimmed, &mut out) {
            consumed = true;
        }
        if !consumed && !matches!(family, FuncFamily::Other) {
            let ev = self.emit_unknown(trimmed);
            out.push(ev);
        }
        self.flush_oom_window(&mut out, false);
        let _ = Severity::Info;
        out
    }

    fn flush(&mut self) -> Vec<RunEventItem> {
        let mut out = Vec::new();
        self.flush_oom_window(&mut out, true);
        if let Some(prev) = self.current_phase.take() {
            let ev = self.emit_phase(prev, PhaseState::Completed, None);
            out.push(ev);
        }
        out
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn run() -> RunId {
        RunId::try_new("test-run").unwrap()
    }

    #[test]
    fn parses_n_layer() {
        let mut s = LlamacppScraperV1::new(run());
        let evs = s.ingest_line("llm_load_print_meta: n_layer = 32", LineStream::Stderr);
        assert!(evs
            .iter()
            .any(|e| matches!(e, RunEventItem::Metric { name, .. } if name == "model.n_layer")));
        assert_eq!(s.n_layer, Some(32));
    }

    #[test]
    fn classifies_tensor_groups() {
        assert!(matches!(parse_tensor_name("blk.0.attn_q.weight").1, TensorGroup::Attn));
        assert!(matches!(parse_tensor_name("blk.5.ffn_up.weight").1, TensorGroup::Ffn));
        assert!(matches!(parse_tensor_name("blk.7.attn_norm.weight").1, TensorGroup::Norm));
        assert!(matches!(parse_tensor_name("token_embd.weight").1, TensorGroup::Embed));
        assert!(matches!(parse_tensor_name("output.weight").1, TensorGroup::Output));
    }

    #[test]
    fn unknown_device_label_emits_unknown_event() {
        let mut s = LlamacppScraperV1::new(run());
        let evs = s.ingest_line(
            "llm_load_tensors:        FOOBAR model buffer size =   234.50 MiB",
            LineStream::Stderr,
        );
        assert!(evs
            .iter()
            .any(|e| matches!(e, RunEventItem::Metric { name, .. } if name == "buffer.bytes")));
        assert!(evs.iter().any(|e| matches!(e, RunEventItem::ScraperUnknown { .. })));
    }
}
