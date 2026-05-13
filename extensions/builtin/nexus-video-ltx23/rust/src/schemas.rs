use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct CreateRenderRequest {
    pub project_id: Option<String>,
    pub input_image_artifact_id: Option<String>,
    /// Global / fallback prompt — describes what's happening overall.
    /// Used for every segment unless `scenes[i].prompt` overrides it.
    pub prompt: String,
    pub negative_prompt: Option<String>,
    /// Visual-style anchor appended to EVERY scene's effective prompt
    /// (e.g. "moody noir, deep teal shadows, neon highlights, 35mm film
    /// grain"). Threads through the chain so style stays coherent across
    /// segment boundaries.
    pub style_prompt: Option<String>,
    /// Character anchor prepended to every scene (e.g. "a woman in a
    /// red coat, short black hair, brown eyes"). Combined with image
    /// conditioning from the previous segment's last frame, this is the
    /// strongest tool for preserving character appearance across cuts.
    pub character_prompt: Option<String>,
    /// Optional per-scene script. When provided AND non-empty, the
    /// planner zips scenes[] against the computed segments — scenes
    /// longer than `segment_seconds` get split across multiple segments,
    /// shorter ones leave headroom in the last segment they touch.
    /// When omitted, the global `prompt` drives every segment.
    #[serde(default)]
    pub scenes: Vec<SceneSpec>,
    pub duration_seconds: f32,
    #[serde(default)]
    pub runtime_profile: RuntimeProfilePreference,
    #[serde(default)]
    pub quality_preset: QualityPreset,
    pub width: Option<u32>,
    pub height: Option<u32>,
    pub base_fps: Option<u32>,
    pub output_fps: Option<u32>,
    pub seed: Option<u64>,
    #[serde(default)]
    pub advanced: AdvancedSettings,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct SceneSpec {
    /// What happens in this scene. Combined with the global
    /// `character_prompt` + `style_prompt` to form the effective prompt
    /// the worker sends to LTX-2.3.
    pub prompt: String,
    /// Defaults to `request.duration_seconds / scenes.len()` if omitted.
    #[serde(default)]
    pub duration_seconds: Option<f32>,
    /// Per-scene seed override. When omitted, derived deterministically
    /// from the global seed + scene index so chain noise stays
    /// correlated (preserves style/lighting continuity).
    #[serde(default)]
    pub seed: Option<u64>,
}

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct AdvancedSettings {
    pub segment_seconds: Option<f32>,
    pub overlap_seconds: Option<f32>,
    pub output_fps: Option<u32>,
    pub interpolation: Option<InterpolationMethod>,
    /// Classifier-Free Guidance scale (LTX 2.3's "temperature" knob).
    /// Higher = more prompt adherence, less creative drift. Default 4.0
    /// matches the LTX 2.3 distilled pipeline's recommended value.
    /// Sensible range: 1.0 (free-flowing) – 7.0 (very literal).
    pub guidance_scale: Option<f32>,
    /// Number of denoising steps. The distilled model is tuned for 8;
    /// higher steps improve quality with diminishing returns and roughly
    /// linear wall-clock cost. Sensible range: 4 (fastest, lossy) – 30.
    pub num_inference_steps: Option<u32>,
}

#[derive(Debug, Clone, Copy, Default, Deserialize, Serialize, PartialEq, Eq)]
#[serde(rename_all = "kebab-case")]
pub enum RuntimeProfilePreference {
    #[default]
    Auto,
    Rtx50Nvfp4,
    Rtx50Fp8,
    Rtx40Fp8,
}

#[derive(Debug, Clone, Copy, Default, Deserialize, Serialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum QualityPreset {
    Draft,
    #[default]
    Balanced16gb,
    Quality16gb,
    High,
}

#[derive(Debug, Clone, Copy, Deserialize, Serialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum RenderMode {
    ExternalSegments,
}

#[derive(Debug, Clone, Copy, Default, Deserialize, Serialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum InterpolationMethod {
    #[default]
    Rife2x,
    None,
}

#[derive(Debug, Clone, Copy, Deserialize, Serialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum VramRisk {
    Safe,
    Moderate,
    Risky,
    LikelyToFail,
    Unsupported,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RenderPlan {
    pub mode: RenderMode,
    pub width: u32,
    pub height: u32,
    pub base_fps: u32,
    pub output_fps: u32,
    pub requested_duration_seconds: f32,
    pub planned_duration_seconds: f32,
    pub segment_count: u32,
    pub segments: Vec<RenderSegmentPlan>,
    pub runtime_profile: String,
    pub gpu_memory_budget_mb: u32,
    pub interpolation: InterpolationMethod,
    pub warnings: Vec<PlanWarning>,
    pub vram_risk: VramRisk,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RenderSegmentPlan {
    pub index: u32,
    pub start_time_seconds: f32,
    pub duration_seconds: f32,
    pub overlap_seconds: f32,
    pub frame_count: u32,
    pub seed: u64,
    pub action_prompt: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PlanWarning {
    pub code: String,
    pub message: String,
}
