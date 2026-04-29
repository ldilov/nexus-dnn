//! Typed request/response shapes for spec-034 RPC additions.
//!
//! Every struct derives `Serialize` + `Deserialize` and is paired with a
//! contract test (`tests/rpc_additions_contract_test.rs`) that round-trips
//! sample JSON against `contracts/rpc/methods_additions.md`.

use serde::{Deserialize, Serialize};

// ---------------------------------------------------------------------------
// voice.preprocess  (T018, US1)
// ---------------------------------------------------------------------------

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct VoicePreprocessParams {
    pub request_id: String,
    pub source_artifact_abs: String,
    pub output_artifact_abs: String,
    pub pipeline_version: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct VoicePreprocessResult {
    pub succeeded: bool,
    pub report: PreprocessingReport,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct PreprocessingReport {
    pub pipeline_version: String,
    pub stages: Vec<PreprocessingStage>,
    pub succeeded: bool,
    #[serde(default)]
    pub warnings: Vec<String>,
}

impl PreprocessingReport {
    /// Mirrors `ref_audio_report.DEFAULT_PIPELINE_VERSION` in the Python
    /// worker. If the two drift the contract test in
    /// `tests/rpc_additions_contract_test.rs` will flag it.
    #[must_use]
    pub const fn default_pipeline_version() -> &'static str {
        "1"
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct PreprocessingStage {
    pub stage: String,
    pub status: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub duration_ms: Option<i64>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub reason: Option<String>,
    #[serde(flatten)]
    pub extra: serde_json::Map<String, serde_json::Value>,
}

// ---------------------------------------------------------------------------
// capability.probe  (T019)
// ---------------------------------------------------------------------------

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct CapabilityProbeParams {
    pub probes: Vec<String>,
}

pub type CapabilityProbeResult = std::collections::BTreeMap<String, CapabilityProbeEntry>;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct CapabilityProbeEntry {
    pub available: bool,
    pub detail: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub duration_ms: Option<i64>,
}

// ---------------------------------------------------------------------------
// family.list / family.switch  (T020, US5)
// ---------------------------------------------------------------------------

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct FamilyListResult {
    pub active_family: String,
    pub known_families: Vec<FamilyListEntry>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct FamilyListEntry {
    pub family_id: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub engine_version: Option<String>,
    pub languages: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct FamilySwitchParams {
    pub family_id: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct FamilySwitchResult {
    pub switched: bool,
    pub load_duration_ms: i64,
    pub vram_delta_mb: i64,
}

// ---------------------------------------------------------------------------
// synthesize.batch additions  (T021)
// ---------------------------------------------------------------------------

/// Optional fields added to `synthesize.batch` params. Existing callers that
/// omit these get current behaviour (deployment-row defaults).
#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct SynthesizeBatchSpec034Extensions {
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub model_family: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub enable_attention_capture: Option<bool>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub enable_compile: Option<bool>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub speaker_cache_hint: Option<SpeakerCacheHint>,
}

impl SynthesizeBatchSpec034Extensions {
    /// Build the extensions for a batch from the deployment row's toggle
    /// state (spec 034 T086). Future dispatcher code calls this once per
    /// batch so the worker's active settings always agree with what the
    /// UI has configured on the deployment.
    #[must_use]
    pub fn from_deployment(
        model_family: impl Into<String>,
        oas_enabled: bool,
        compile_gpt_enabled: bool,
        speaker_cache_budget_mb: i64,
    ) -> Self {
        Self {
            model_family: Some(model_family.into()),
            enable_attention_capture: Some(oas_enabled),
            enable_compile: Some(compile_gpt_enabled),
            speaker_cache_hint: Some(SpeakerCacheHint::from_budget_mb(speaker_cache_budget_mb)),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct SpeakerCacheHint {
    pub enabled: bool,
    pub budget_mb: i64,
}

impl SpeakerCacheHint {
    /// Build a default hint sized to the deployment's `AdapterSettings`
    /// (spec 034 T075). Future dispatcher code calls this once per batch
    /// so `synthesize.batch` always carries an explicit cache budget
    /// instead of relying on the worker's startup default.
    #[must_use]
    pub const fn from_budget_mb(budget_mb: i64) -> Self {
        Self {
            enabled: true,
            budget_mb,
        }
    }

    #[must_use]
    pub const fn disabled() -> Self {
        Self {
            enabled: false,
            budget_mb: 0,
        }
    }
}

// ---------------------------------------------------------------------------
// Notification payload typing (spec 034 subset — the dispatcher still carries
// the raw serde_json::Value; these types document the shape for consumers
// who want to parse it into something typed).
// ---------------------------------------------------------------------------

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct CompileStartedPayload {
    pub request_id: String,
    pub stage: String,
    pub eta_ms: i64,
    pub message: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct CompileCompletePayload {
    pub stage: String,
    pub duration_ms: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct CompileFailedPayload {
    pub stage: String,
    pub duration_ms: i64,
    pub reason: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct DiagnosticAlignmentPayload {
    pub run_id: String,
    pub global_index: i64,
    pub alignment_score: f64,
    pub alignment_flag: bool,
    pub threshold_used: f64,
    pub threshold_source: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub attention_map_artifact_ref: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct PreprocessWarningPayload {
    pub request_id: String,
    pub skipped_stage: String,
    pub reason: String,
}

// ---------------------------------------------------------------------------
// audio.edit + audio.edit.preview  (spec 036, US1)
//
// `chain` is carried as a raw `serde_json::Value` so the wire format stays
// stable across schema evolution — the worker re-validates it server-side
// against `EditChain`. Keeping it untyped here avoids a host-side recompile
// every time the chain JSON gains an optional field.
// ---------------------------------------------------------------------------

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct AudioEditParams {
    pub request_id: String,
    pub source_artifact_abs: String,
    pub output_artifact_abs: String,
    pub chain: serde_json::Value,
    pub chain_digest: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct AudioEditResult {
    pub chain_digest: String,
    pub source_duration_ms: u32,
    pub derived_duration_ms: u32,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub measured_lufs: Option<f32>,
    #[serde(default)]
    pub per_op_durations_ms: Vec<OpDuration>,
    #[serde(default)]
    pub warnings: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct OpDuration {
    pub op_id: String,
    pub duration_ms: f32,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct AudioEditPreviewParams {
    pub request_id: String,
    pub source_artifact_abs: String,
    pub chain: serde_json::Value,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub format_hint: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct AudioEditPreviewResult {
    pub temp_path_abs: String,
    pub format: String,
    pub byte_size: u64,
    pub derived_duration_ms: u32,
}
