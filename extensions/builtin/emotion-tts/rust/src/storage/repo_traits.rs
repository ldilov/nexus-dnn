use async_trait::async_trait;
use serde::{Deserialize, Serialize};

use crate::domain::{
    ContentHash, DeploymentId, EmotionTtsError, ExportId, MappingId, PresetId, RunId, UtteranceId,
    VoiceAssetId,
};

pub type RepoResult<T> = Result<T, EmotionTtsError>;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DeploymentRow {
    pub deployment_id: DeploymentId,
    pub host_extension_instance_ref: String,
    pub display_name: String,
    pub backend_runtime_preference: Option<String>,
    pub default_output_format: String,
    pub default_speed_factor: f64,
    pub default_generation_overrides_json: String,
    pub most_recent_run_id: Option<RunId>,
    #[serde(default)]
    pub partial_run_id: Option<RunId>,
    #[serde(default = "default_reference_preprocess_enabled")]
    pub reference_preprocess_enabled: bool,
    #[serde(default = "default_oas_enabled")]
    pub oas_enabled: bool,
    #[serde(default)]
    pub compile_gpt_enabled: bool,
    #[serde(default = "default_model_family")]
    pub model_family: String,
    #[serde(default)]
    pub oas_threshold_learned: Option<f64>,
    #[serde(default)]
    pub oas_samples_seen: i64,
    pub created_at: i64,
    pub updated_at: i64,
}

pub const DEFAULT_MODEL_FAMILY: &str = "indextts-2";

fn default_reference_preprocess_enabled() -> bool {
    true
}

fn default_oas_enabled() -> bool {
    true
}

fn default_model_family() -> String {
    DEFAULT_MODEL_FAMILY.to_string()
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VoiceAssetRow {
    pub voice_asset_id: VoiceAssetId,
    pub deployment_id: DeploymentId,
    pub display_name: String,
    pub kind: String,
    pub audio_artifact_ref: String,
    pub content_sha256: String,
    pub reference_text: Option<String>,
    pub sample_rate: Option<i64>,
    pub duration_ms: Option<i64>,
    pub source_type: String,
    pub notes: Option<String>,
    pub is_active: bool,
    #[serde(default)]
    pub preprocessed_artifact_ref: Option<String>,
    #[serde(default)]
    pub preprocessing_report_json: Option<String>,
    pub created_at: i64,
    pub updated_at: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CharacterMappingRow {
    pub mapping_id: MappingId,
    pub deployment_id: DeploymentId,
    pub character_name: String,
    pub character_name_lower: String,
    pub speaker_voice_asset_id: VoiceAssetId,
    pub default_emotion_mode: String,
    pub default_emotion_voice_asset_id: Option<VoiceAssetId>,
    pub default_vector_preset_id: Option<PresetId>,
    pub default_qwen_template: Option<String>,
    pub default_speed_factor: Option<f64>,
    pub default_generation_overrides_json: String,
    pub is_active: bool,
    pub notes: Option<String>,
    pub created_at: i64,
    pub updated_at: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VectorPresetRow {
    pub preset_id: PresetId,
    pub deployment_id: DeploymentId,
    pub preset_name: String,
    pub vector_json: String,
    pub created_at: i64,
    pub updated_at: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RunRow {
    pub run_id: RunId,
    pub deployment_id: DeploymentId,
    pub kind: String,
    pub status: String,
    pub script_snapshot: String,
    pub parser_mode: String,
    pub generation_settings_json: String,
    pub global_emotion_snapshot_json: Option<String>,
    pub output_format: String,
    pub speed_factor: f64,
    pub speed_mode: String,
    pub cache_policy: String,
    pub seed_strategy: String,
    pub base_seed: i64,
    pub original_run_id: Option<RunId>,
    pub runtime_install_id: Option<String>,
    pub runtime_version: Option<String>,
    pub model_version: Option<String>,
    pub extension_version: String,
    pub queued_at: i64,
    pub started_at: Option<i64>,
    pub finished_at: Option<i64>,
    pub error_category: Option<String>,
    pub error_detail: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UtteranceRow {
    pub utterance_id: UtteranceId,
    pub run_id: RunId,
    pub global_index: i64,
    pub character_display: String,
    pub character_sanitised: String,
    pub character_index: i64,
    pub text: String,
    pub source_line_number: i64,
    pub inline_overrides_json: String,
    pub legacy_emotion_ref: Option<String>,
    pub resolved_mapping_id: Option<MappingId>,
    pub resolved_speaker_voice_asset_id: Option<VoiceAssetId>,
    pub resolved_emotion_mode: Option<String>,
    pub resolved_emotion_payload_json: Option<String>,
    pub resolved_seed: Option<i64>,
    pub resolved_generation_json: Option<String>,
    pub content_hash: Option<String>,
    pub status: String,
    pub source_run_id: Option<RunId>,
    pub audio_artifact_ref: Option<String>,
    pub cache_hit: bool,
    pub duration_ms: Option<i64>,
    pub started_at: Option<i64>,
    pub finished_at: Option<i64>,
    pub failure_category: Option<String>,
    pub failure_detail: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SynthesisCacheRow {
    pub content_hash: ContentHash,
    pub audio_artifact_ref: String,
    pub extension_version: String,
    pub runtime_version: String,
    pub model_version: String,
    pub size_bytes: i64,
    pub hit_count: i64,
    pub created_at: i64,
    pub last_hit_at: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ExportHistoryRow {
    pub export_id: ExportId,
    pub deployment_id: DeploymentId,
    pub run_id: Option<RunId>,
    pub zip_artifact_ref: String,
    pub manifest_artifact_ref: Option<String>,
    pub preview_artifact_ref: Option<String>,
    pub output_format: String,
    pub utterance_count: i64,
    pub partial: bool,
    pub created_at: i64,
}

#[async_trait]
pub trait DeploymentsRepo: Send + Sync {
    async fn insert(&self, row: &DeploymentRow) -> RepoResult<()>;
    async fn get(&self, id: &DeploymentId) -> RepoResult<Option<DeploymentRow>>;
    async fn list(&self) -> RepoResult<Vec<DeploymentRow>>;
    async fn update(&self, row: &DeploymentRow) -> RepoResult<()>;
    async fn delete(&self, id: &DeploymentId) -> RepoResult<()>;
    async fn set_most_recent_run(&self, id: &DeploymentId, run_id: &RunId) -> RepoResult<()>;
    async fn set_partial_run(&self, id: &DeploymentId, run_id: Option<&RunId>) -> RepoResult<()>;
    /// Spec 034 US2 / T062 — persist the rolling-MAD threshold after a batch.
    /// Also updates `oas_samples_seen` so the threshold-regime decision sees
    /// the new total. `threshold_learned == None` resets to cold-start (used
    /// when the user clears calibration from the UI).
    async fn set_oas_threshold(
        &self,
        id: &DeploymentId,
        threshold_learned: Option<f64>,
        samples_seen: i64,
    ) -> RepoResult<()>;
    /// Spec 034 US2 / T062 — PATCH /engine-settings writes toggle bits.
    /// Any field passed as `None` is left unchanged.
    async fn patch_engine_settings(
        &self,
        id: &DeploymentId,
        reference_preprocess_enabled: Option<bool>,
        oas_enabled: Option<bool>,
        compile_gpt_enabled: Option<bool>,
        model_family: Option<&str>,
    ) -> RepoResult<()>;
}

#[async_trait]
pub trait VoiceAssetsRepo: Send + Sync {
    async fn insert(&self, row: &VoiceAssetRow) -> RepoResult<()>;
    async fn get(&self, id: &VoiceAssetId) -> RepoResult<Option<VoiceAssetRow>>;
    async fn list_by_deployment(&self, dep: &DeploymentId) -> RepoResult<Vec<VoiceAssetRow>>;
    async fn deactivate(&self, id: &VoiceAssetId) -> RepoResult<()>;
    /// Spec 034 US1 / T038 — persist the preprocessing outcome against an
    /// existing voice-asset row. Passing `None` clears the fields (used when
    /// the user re-uploads and we invalidate any stale preprocessed artifact).
    async fn set_preprocessed(
        &self,
        id: &VoiceAssetId,
        preprocessed_artifact_ref: Option<&str>,
        preprocessing_report_json: Option<&str>,
    ) -> RepoResult<()>;
}

#[async_trait]
pub trait MappingsRepo: Send + Sync {
    async fn insert(&self, row: &CharacterMappingRow) -> RepoResult<()>;
    async fn get(&self, id: &MappingId) -> RepoResult<Option<CharacterMappingRow>>;
    async fn list_by_deployment(&self, dep: &DeploymentId) -> RepoResult<Vec<CharacterMappingRow>>;
    async fn find_by_character(&self, dep: &DeploymentId, name_lower: &str) -> RepoResult<Option<CharacterMappingRow>>;
    async fn update(&self, row: &CharacterMappingRow) -> RepoResult<()>;
    async fn deactivate(&self, id: &MappingId) -> RepoResult<()>;
}

#[async_trait]
pub trait PresetsRepo: Send + Sync {
    async fn insert(&self, row: &VectorPresetRow) -> RepoResult<()>;
    async fn get(&self, id: &PresetId) -> RepoResult<Option<VectorPresetRow>>;
    async fn list_by_deployment(&self, dep: &DeploymentId) -> RepoResult<Vec<VectorPresetRow>>;
    async fn update(&self, row: &VectorPresetRow) -> RepoResult<()>;
    async fn delete(&self, id: &PresetId) -> RepoResult<()>;
}

#[async_trait]
pub trait RunsRepo: Send + Sync {
    async fn insert(&self, row: &RunRow) -> RepoResult<()>;
    async fn get(&self, id: &RunId) -> RepoResult<Option<RunRow>>;
    async fn list_by_deployment(&self, dep: &DeploymentId, limit: i64) -> RepoResult<Vec<RunRow>>;
    async fn update_status(&self, id: &RunId, status: &str, finished_at: Option<i64>) -> RepoResult<()>;
    /// Update status only if the current status is one of `from_any`.
    ///
    /// Returns `true` if a row matched and was updated; `false` if the row was
    /// already in a terminal state (race-safe cancel path, I-3).
    async fn update_status_guarded(
        &self,
        id: &RunId,
        status: &str,
        finished_at: Option<i64>,
        from_any: &[&str],
    ) -> RepoResult<bool>;
    async fn set_started(&self, id: &RunId, at: i64) -> RepoResult<()>;
}

#[async_trait]
pub trait UtterancesRepo: Send + Sync {
    async fn insert_many(&self, rows: &[UtteranceRow]) -> RepoResult<()>;
    async fn get(&self, id: &UtteranceId) -> RepoResult<Option<UtteranceRow>>;
    async fn list_by_run(&self, run: &RunId) -> RepoResult<Vec<UtteranceRow>>;
    async fn update_status(&self, id: &UtteranceId, status: &str) -> RepoResult<()>;
    async fn mark_completed(
        &self,
        id: &UtteranceId,
        audio_ref: &str,
        cache_hit: bool,
        duration_ms: Option<i64>,
    ) -> RepoResult<()>;
}

#[async_trait]
pub trait SynthesisCacheRepo: Send + Sync {
    async fn get(&self, hash: &ContentHash) -> RepoResult<Option<SynthesisCacheRow>>;
    async fn insert(&self, row: &SynthesisCacheRow) -> RepoResult<()>;
    async fn record_hit(&self, hash: &ContentHash, at: i64) -> RepoResult<()>;
    async fn total_size_bytes(&self) -> RepoResult<i64>;
    async fn evict_lru(&self, target_bytes: i64) -> RepoResult<Vec<ContentHash>>;
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct WorkflowRow {
    pub deployment_id: DeploymentId,
    pub document_json: String,
    pub customised: bool,
    pub updated_at: i64,
}

#[async_trait]
pub trait WorkflowsRepo: Send + Sync {
    async fn get(&self, dep: &DeploymentId) -> RepoResult<Option<WorkflowRow>>;
    async fn upsert(&self, row: &WorkflowRow) -> RepoResult<()>;
    async fn delete(&self, dep: &DeploymentId) -> RepoResult<()>;
}

#[async_trait]
pub trait ExportHistoryRepo: Send + Sync {
    async fn insert(&self, row: &ExportHistoryRow) -> RepoResult<()>;
    async fn list_by_deployment(&self, dep: &DeploymentId, limit: i64) -> RepoResult<Vec<ExportHistoryRow>>;
    async fn get(&self, id: &ExportId) -> RepoResult<Option<ExportHistoryRow>>;
}
