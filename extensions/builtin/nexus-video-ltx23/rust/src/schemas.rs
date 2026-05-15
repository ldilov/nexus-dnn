use serde::{Deserialize, Serialize};

/// Hard cap on free-text prompt fields (chars).
///
/// The diffusers pipeline tokenises prompts on a CLIP-class encoder
/// with a 77-token / ~300-char practical limit; we cap an order of
/// magnitude higher to leave room for `character + style + action`
/// concatenation while still bounding the per-segment memory + DB
/// row footprint. Validated by `CreateRenderRequest::validate_field_bounds`
/// before any planner work + DB write.
pub const MAX_PROMPT_CHARS: usize = 4096;
pub const MAX_SCENES: usize = 200;
pub const MAX_PROJECT_ID_CHARS: usize = 128;

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

impl CreateRenderRequest {
    /// Reject oversized free-text fields + oversized scene arrays
    /// before they reach the planner or the DB. Caller maps the
    /// `Err(reason)` to a 400 `InvalidRequest`.
    pub fn validate_field_bounds(&self) -> Result<(), String> {
        if self.prompt.is_empty() {
            return Err("prompt is required".into());
        }
        if self.prompt.len() > MAX_PROMPT_CHARS {
            return Err(format!(
                "prompt exceeds {MAX_PROMPT_CHARS} chars (got {})",
                self.prompt.len()
            ));
        }
        if let Some(neg) = &self.negative_prompt {
            if neg.len() > MAX_PROMPT_CHARS {
                return Err(format!(
                    "negative_prompt exceeds {MAX_PROMPT_CHARS} chars"
                ));
            }
        }
        if let Some(style) = &self.style_prompt {
            if style.len() > MAX_PROMPT_CHARS {
                return Err(format!("style_prompt exceeds {MAX_PROMPT_CHARS} chars"));
            }
        }
        if let Some(character) = &self.character_prompt {
            if character.len() > MAX_PROMPT_CHARS {
                return Err(format!(
                    "character_prompt exceeds {MAX_PROMPT_CHARS} chars"
                ));
            }
        }
        if let Some(pid) = &self.project_id {
            if pid.len() > MAX_PROJECT_ID_CHARS {
                return Err(format!(
                    "project_id exceeds {MAX_PROJECT_ID_CHARS} chars"
                ));
            }
        }
        if self.scenes.len() > MAX_SCENES {
            return Err(format!(
                "scenes array exceeds {MAX_SCENES} entries (got {})",
                self.scenes.len()
            ));
        }
        for (i, scene) in self.scenes.iter().enumerate() {
            if scene.prompt.len() > MAX_PROMPT_CHARS {
                return Err(format!(
                    "scenes[{i}].prompt exceeds {MAX_PROMPT_CHARS} chars"
                ));
            }
        }
        Ok(())
    }
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
    /// CPU/GPU offload aggressiveness for the diffusers pipeline. `Auto`
    /// resolves to the per-profile default in `runner.rs` before the
    /// payload reaches the worker — the worker never sees `auto`.
    #[serde(default)]
    pub offload_mode: OffloadMode,
}

#[derive(Debug, Clone, Copy, Default, Deserialize, Serialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum OffloadMode {
    /// Use the per-profile default. Resolved away in
    /// `runner.rs::build_render_params` so the worker only ever observes
    /// `none`, `model`, or `sequential`.
    #[default]
    Auto,
    /// `pipe.to("cuda")` — full pipeline resident on GPU. Fastest,
    /// requires most VRAM. Worker rejects this mode on cards with
    /// less than 16 GB total VRAM.
    None,
    /// `pipe.enable_model_cpu_offload()` — one major submodule on GPU
    /// at a time. Mid-grained, mid-speed.
    Model,
    /// `pipe.enable_sequential_cpu_offload()` — one layer on GPU at a
    /// time. Slowest, lowest VRAM. Current per-profile default for
    /// fp8 profiles.
    Sequential,
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

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn offload_mode_serializes_as_snake_case() {
        assert_eq!(
            serde_json::to_value(OffloadMode::Auto).unwrap(),
            json!("auto")
        );
        assert_eq!(
            serde_json::to_value(OffloadMode::None).unwrap(),
            json!("none")
        );
        assert_eq!(
            serde_json::to_value(OffloadMode::Model).unwrap(),
            json!("model")
        );
        assert_eq!(
            serde_json::to_value(OffloadMode::Sequential).unwrap(),
            json!("sequential")
        );
    }

    #[test]
    fn offload_mode_round_trips_through_serde() {
        for mode in [
            OffloadMode::Auto,
            OffloadMode::None,
            OffloadMode::Model,
            OffloadMode::Sequential,
        ] {
            let wire = serde_json::to_string(&mode).unwrap();
            let back: OffloadMode = serde_json::from_str(&wire).unwrap();
            assert_eq!(back, mode, "round-trip failed for {mode:?}");
        }
    }

    #[test]
    fn advanced_settings_defaults_offload_mode_to_auto_when_absent() {
        // The wire contract for the worker payload + the retry replay
        // path: a request with no `advanced` field at all collapses to
        // every default, including `OffloadMode::Auto`. The host
        // resolver turns that into a concrete per-profile mode before
        // the worker sees it.
        let parsed: AdvancedSettings = serde_json::from_str("{}").unwrap();
        assert_eq!(parsed.offload_mode, OffloadMode::Auto);
    }

    #[test]
    fn advanced_settings_round_trips_explicit_offload_mode() {
        let wire = json!({
            "guidance_scale": 4.0,
            "num_inference_steps": 8,
            "offload_mode": "none",
        });
        let parsed: AdvancedSettings = serde_json::from_value(wire).unwrap();
        assert_eq!(parsed.offload_mode, OffloadMode::None);
        // Re-serialise + reparse to confirm the field survives a
        // round-trip through the retry-replay path (which serialises
        // the parsed struct back into request_json).
        let again = serde_json::to_string(&parsed).unwrap();
        let twice: AdvancedSettings = serde_json::from_str(&again).unwrap();
        assert_eq!(twice.offload_mode, OffloadMode::None);
    }
}
