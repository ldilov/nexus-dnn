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

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub struct SpeakerCacheHint {
    pub enabled: bool,
    pub budget_mb: i64,
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
