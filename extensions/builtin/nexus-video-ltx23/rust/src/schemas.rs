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

/// Max length of an `input_image_artifact_id`.
///
/// The id is produced server-side by `api.rs::upload_input_image` as
/// `ltx23-input-<ulid>` (12 + 26 = 38). Cap at 64 to leave room for a
/// future scheme bump (e.g. namespace prefix).
pub const MAX_INPUT_ARTIFACT_ID_CHARS: usize = 64;

/// Inclusive bounds for `AdvancedSettings.max_gpu_vram_gib`.
///
/// The cap maps to an `accelerate` `max_memory={0: "<N>GiB", ...}`
/// ceiling on the diffusers device-map dispatch under `model` /
/// `sequential` offload — it pins the transformer just below the
/// physical VRAM line so it cannot spill into Windows shared GPU
/// memory (the small-margin spill that collapses nvfp4 throughput).
/// Floor 4 GiB: below that even one paged transformer block plus its
/// activations will not fit, so the cap would be self-defeating.
/// Ceiling 128 GiB: a sanity guard comfortably above any single
/// consumer / prosumer card.
pub const MIN_GPU_VRAM_GIB: u32 = 4;
pub const MAX_GPU_VRAM_GIB: u32 = 128;

/// Validate the shape of a server-issued input-image artifact id.
///
/// The id is consumed by `runner.rs::build_render_params` to locate
/// `<inputs_dir>/<id>.<ext>` on disk. Refusing anything outside the
/// strict prefix + alphanumeric tail shape stops a crafted request body
/// from escaping the inputs directory via the join — defence in depth
/// alongside the path-canonicalisation check in the resolver.
#[must_use]
pub fn is_valid_input_artifact_id(id: &str) -> bool {
    const PREFIX: &str = "ltx23-input-";
    if id.is_empty() || id.len() > MAX_INPUT_ARTIFACT_ID_CHARS {
        return false;
    }
    let Some(tail) = id.strip_prefix(PREFIX) else {
        return false;
    };
    if tail.is_empty() {
        return false;
    }
    tail.chars().all(|c| c.is_ascii_alphanumeric())
}

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
    #[allow(clippy::too_many_lines)]
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
                return Err(format!("negative_prompt exceeds {MAX_PROMPT_CHARS} chars"));
            }
        }
        if let Some(style) = &self.style_prompt {
            if style.len() > MAX_PROMPT_CHARS {
                return Err(format!("style_prompt exceeds {MAX_PROMPT_CHARS} chars"));
            }
        }
        if let Some(character) = &self.character_prompt {
            if character.len() > MAX_PROMPT_CHARS {
                return Err(format!("character_prompt exceeds {MAX_PROMPT_CHARS} chars"));
            }
        }
        if let Some(pid) = &self.project_id {
            if pid.len() > MAX_PROJECT_ID_CHARS {
                return Err(format!("project_id exceeds {MAX_PROJECT_ID_CHARS} chars"));
            }
        }
        if let Some(id) = &self.input_image_artifact_id {
            if !is_valid_input_artifact_id(id) {
                return Err(format!(
                    "input_image_artifact_id '{id}' has invalid shape; \
                     expected 'ltx23-input-' + alphanumeric tail (≤ \
                     {MAX_INPUT_ARTIFACT_ID_CHARS} chars)"
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
        if let Some(v) = self.advanced.decode_timestep {
            if !(0.0..=1.0).contains(&v) || !v.is_finite() {
                return Err(format!(
                    "advanced.decode_timestep must be in 0.0..=1.0 (got {v})"
                ));
            }
        }
        if let Some(v) = self.advanced.image_cond_noise_scale {
            if !(0.0..=0.3).contains(&v) || !v.is_finite() {
                return Err(format!(
                    "advanced.image_cond_noise_scale must be in 0.0..=0.3 (got {v})"
                ));
            }
        }
        if let Some(v) = self.advanced.guidance_rescale {
            if !(0.0..=1.0).contains(&v) || !v.is_finite() {
                return Err(format!(
                    "advanced.guidance_rescale must be in 0.0..=1.0 (got {v})"
                ));
            }
        }
        if let Some(v) = self.advanced.max_gpu_vram_gib {
            if !(MIN_GPU_VRAM_GIB..=MAX_GPU_VRAM_GIB).contains(&v) {
                return Err(format!(
                    "advanced.max_gpu_vram_gib must be in \
                     {MIN_GPU_VRAM_GIB}..={MAX_GPU_VRAM_GIB} (got {v})"
                ));
            }
        }
        if let Some(v) = self.advanced.decode_noise_scale {
            if !(0.0..=0.5).contains(&v) || !v.is_finite() {
                return Err(format!(
                    "advanced.decode_noise_scale must be in 0.0..=0.5 (got {v})"
                ));
            }
        }
        if let Some(v) = self.advanced.condition_strength {
            if !(0.0..=1.0).contains(&v) || !v.is_finite() {
                return Err(format!(
                    "advanced.condition_strength must be in 0.0..=1.0 (got {v})"
                ));
            }
        }
        if let Some(v) = self.advanced.keyframe_strength {
            if !(0.0..=1.0).contains(&v) || !v.is_finite() {
                return Err(format!(
                    "advanced.keyframe_strength must be in 0.0..=1.0 (got {v})"
                ));
            }
        }
        if let Some(v) = self.advanced.condition_tail_frames {
            if !(1..=120).contains(&v) {
                return Err(format!(
                    "advanced.condition_tail_frames must be in 1..=120 (got {v})"
                ));
            }
        }
        if let Some(v) = self.advanced.seam_overlap_frames {
            if v > 48 {
                return Err(format!(
                    "advanced.seam_overlap_frames must be in 0..=48 (got {v})"
                ));
            }
        }
        if let Some(v) = self.advanced.seam_blend_frames {
            if v > 24 {
                return Err(format!(
                    "advanced.seam_blend_frames must be in 0..=24 (got {v})"
                ));
            }
        }
        if let Some(v) = self.advanced.upscale_mode.as_deref() {
            if v != "two_pass" && v != "decoupled" && v != "esrgan" {
                return Err(format!(
                    "advanced.upscale_mode must be \"two_pass\", \
                     \"decoupled\" or \"esrgan\" (got {v:?})"
                ));
            }
        }
        if let Some(v) = self.advanced.model_id.as_deref() {
            let has_gguf_ext = std::path::Path::new(v)
                .extension()
                .is_some_and(|e| e.eq_ignore_ascii_case("gguf"));
            let safe = !v.is_empty()
                && v.len() <= 128
                && has_gguf_ext
                && !v.contains("..")
                && v.chars()
                    .all(|c| c.is_ascii_alphanumeric() || matches!(c, '.' | '_' | '-'));
            if !safe {
                return Err(format!(
                    "advanced.model_id must be a bare *.gguf filename \
                     (alphanumeric/._- only, no path) (got {v:?})"
                ));
            }
        }
        if let Some(v) = self.advanced.vae_tiling.as_deref() {
            if !matches!(v, "default" | "aggressive" | "off") {
                return Err(format!(
                    "advanced.vae_tiling must be \"default\", \
                     \"aggressive\" or \"off\" (got {v:?})"
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
    /// Per-component device override. Each field defaults to `Auto`
    /// which means "follow the resolved `offload_mode`'s placement
    /// for this component". An explicit `Cuda` / `Cpu` value
    /// overrides that component and switches the worker away from
    /// the offload-hook path onto direct `.to(device)` placement —
    /// the two are mutually exclusive on a per-load basis.
    #[serde(default)]
    pub component_placement: ComponentPlacement,
    /// Diffusers scheduler / sampler. `FlowMatchEuler` is the
    /// distilled-LTX default; `FlowMatchHeun` trades ~30% extra
    /// wall-clock for marginally higher quality. Non-flow-matching
    /// schedulers (`DDIM`, `DPM++`, `UniPC`, …) are intentionally
    /// absent — they break on LTX-2.3's flow-matching parametrisation.
    #[serde(default)]
    pub scheduler: SchedulerChoice,
    /// Flow-matching trajectory decode point. Pipeline default ≈ 0.05.
    /// Lower → smoother motion at the cost of decoder work.
    /// Range: 0.0–1.0 inclusive.
    pub decode_timestep: Option<f32>,
    /// Noise added to the image-conditioning latent when chaining
    /// segments. Pipeline default ≈ 0.025. Lower → sharper
    /// continuity across cuts (risk of stutter); higher → more
    /// creative drift. Range: 0.0–0.3 inclusive.
    pub image_cond_noise_scale: Option<f32>,
    /// Rescale CFG to avoid over-saturation when `guidance_scale`
    /// is pushed above ~7. Diffusers default = 0.0 (off).
    /// Range: 0.0–1.0 inclusive.
    pub guidance_rescale: Option<f32>,
    /// Weight quantisation backend for the two heavy components (the
    /// LTX-2.3 transformer + the Gemma-3 text encoder). `Nf4Bnb` /
    /// `Int8` apply bitsandbytes on-the-fly at load via diffusers'
    /// `PipelineQuantizationConfig` (the shipped bf16 checkpoint is
    /// ~36 GB transformer + ~46 GB encoder = 83 GB, unrunnable on a
    /// 16 GB card raw); `Nf4Bnb` shrinks that to ~22 GB. `Nvfp4` is
    /// real NVIDIA `ModelOpt` FP4 restored from a pre-quantised on-disk
    /// tree (no on-the-fly pass). `None` keeps raw bf16 (only viable
    /// on an 80 GB+ card). bnb variants require `bitsandbytes`;
    /// `Nvfp4` requires `nvidia-modelopt` in the worker venv.
    #[serde(default)]
    pub quantization: ModelQuant,
    /// Hard ceiling (GiB) on the GPU VRAM the diffusers device-map
    /// dispatch may consume. Applied under `model` / `sequential`
    /// offload only. `None` keeps the pre-cap behaviour — accelerate's
    /// default heuristic places layers and spills past the hardware
    /// line by a small margin on nvfp4, which bleeds into Windows
    /// shared GPU memory and collapses throughput. When set, the
    /// worker passes `max_memory={0: "<N>GiB", "cpu": <host RAM>}` to
    /// the dispatch so the transformer is pinned just below the card's
    /// physical VRAM. Ignored under `none` (full-resident) — there is
    /// no device map to bound there. Bounds enforced by
    /// `CreateRenderRequest::validate_field_bounds`.
    #[serde(default)]
    pub max_gpu_vram_gib: Option<u32>,
    /// Opt-in two-pass spatial upscale (LTX-Video 0.9.7 path): render
    /// at the native low resolution, latent-upsample via the official
    /// spatial upscaler, short refine + tiled decode → 720p. `None` /
    /// `false` keeps the single-pass native render. Verified peak
    /// 13.5 GiB on a 16 GB card; the upscaler stage does not touch the
    /// quantised transformer so it adds little VRAM.
    #[serde(default)]
    pub upscale: Option<bool>,
    /// Upscale strategy when `upscale` is set. `"two_pass"` (default /
    /// `None`) is the proven refined render→upsample→refine→decode.
    /// `"decoupled"` skips the 13B transformer refine and VAE-decodes
    /// the upsampled latents directly — fits a 16 GB card at full
    /// frame count (the two-pass stage-3 transformer at 1536x1024
    /// spills to WDDM, RCA 2026-05-19) at a softness cost. `"esrgan"`
    /// is the LTX-2 native-path post-render 720p pass — a standalone
    /// Real-ESRGAN process, VRAM-isolated from the 19B set. Only
    /// `"two_pass"` | `"decoupled"` | `"esrgan"` accepted.
    #[serde(default)]
    pub upscale_mode: Option<String>,
    /// GGUF quant basename to load (e.g. `ltxv-13b-0.9.7-dev-Q4_K_M.gguf`). Bare filename only — validated.
    #[serde(default)]
    pub model_id: Option<String>,
    /// VAE tiling preset: `default` | `aggressive` (smaller tiles, lower VAE peak) | `off` (>16 GB only).
    #[serde(default)]
    pub vae_tiling: Option<String>,
    /// VAE-decode noise scale (LTX `decode_noise_scale`). Worker
    /// default 0.025. Higher → grainier decode. Range 0.0..=0.5.
    #[serde(default)]
    pub decode_noise_scale: Option<f32>,
    /// `LTXVideoCondition.strength` for scene continuation. 1.0 fully
    /// anchors scene N+1 to the prior tail (static); lower lets it
    /// animate while inheriting identity. Worker default 0.7.
    #[serde(default)]
    pub condition_strength: Option<f32>,
    /// Trailing frames of the previous scene fed as the next scene's
    /// video condition. Worker default 24. Larger = more motion
    /// context but heavier conditioned VRAM. Range 1..=120.
    #[serde(default)]
    pub condition_tail_frames: Option<u32>,
    /// Seam: frames trimmed from the re-rendered conditioned overlap.
    /// Worker default 8. Range 0..=48.
    #[serde(default)]
    pub seam_overlap_frames: Option<u32>,
    /// Seam: transition-bridge length. Worker default 0 for
    /// `overlap_blend` (a linear bridge ghosts on motion), 6 for the
    /// motion-aware model bridges. Range 0..=24.
    #[serde(default)]
    pub seam_blend_frames: Option<u32>,
    /// Seam: apply Reinhard colour match across the boundary. Worker
    /// default true.
    #[serde(default)]
    pub seam_color_match: Option<bool>,
    /// i2v keyframe-condition strength for the LTX-2 native path. 1.0
    /// pins a clean identity first frame; lower unlocks more motion at
    /// the cost of identity drift. Distinct from `condition_strength`,
    /// which governs scene-to-scene continuation carry. Worker default
    /// 1.0. Range 0.0..=1.0.
    #[serde(default)]
    pub keyframe_strength: Option<f32>,
}

#[derive(Debug, Clone, Copy, Default, Deserialize, Serialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum DevicePreference {
    /// Defer to the resolved `OffloadMode`'s placement for this
    /// component. Resolved away on the host before the worker sees
    /// the payload — the worker only observes `cuda` / `cpu`.
    #[default]
    Auto,
    Cuda,
    Cpu,
}

#[derive(Debug, Clone, Copy, Default, Deserialize, Serialize, PartialEq, Eq)]
pub struct ComponentPlacement {
    #[serde(default)]
    pub transformer: DevicePreference,
    #[serde(default)]
    pub vae: DevicePreference,
    #[serde(default)]
    pub text_encoder: DevicePreference,
}

impl ComponentPlacement {
    /// True iff every field is the default `Auto` — equivalent to
    /// "the operator hasn't overridden the preset's placement".
    #[must_use]
    pub const fn is_fully_auto(&self) -> bool {
        matches!(self.transformer, DevicePreference::Auto)
            && matches!(self.vae, DevicePreference::Auto)
            && matches!(self.text_encoder, DevicePreference::Auto)
    }
}

#[derive(Debug, Clone, Copy, Default, Deserialize, Serialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum SchedulerChoice {
    /// `FlowMatchEulerDiscreteScheduler` — distilled-LTX default.
    #[default]
    FlowMatchEuler,
    /// `FlowMatchHeunDiscreteScheduler` — marginally higher quality,
    /// ~30% extra wall-clock per step.
    FlowMatchHeun,
}

#[derive(Debug, Clone, Copy, Default, Deserialize, Serialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum ModelQuant {
    /// No quantisation — load raw bf16 weights. The shipped LTX-2.3
    /// checkpoint is ~83 GB at bf16 (transformer + Gemma-3 encoder),
    /// so this only runs without shared-VRAM spill on an 80 GB+ card.
    /// It is the default ONLY for the `fake`/CI profile.
    #[default]
    None,
    /// bitsandbytes NF4 (4-bit) on transformer + text encoder.
    /// ~83 GB → ~22 GB; fits 96 GB system RAM and pages cleanly
    /// under sequential offload on a 16 GB GPU. Loads via accelerate
    /// meta-device dispatch (so it is incompatible with sequential
    /// offload — see `compatibility.rs` Guard 1). NOT NVIDIA FP4.
    /// `serde(alias = "nf4")` keeps the pre-rename wire value
    /// deserialising (back-compat).
    #[serde(rename = "nf4_bnb", alias = "nf4")]
    Nf4Bnb,
    /// bitsandbytes INT8 (8-bit) on transformer + text encoder.
    /// ~83 GB → ~42 GB; higher fidelity than NF4, still needs a
    /// big-RAM host + offload on a 16 GB GPU. Also bitsandbytes
    /// (same meta-device sequential-offload constraint as `Nf4Bnb`).
    Int8,
    /// NVIDIA `ModelOpt` **NVFP4** (real Blackwell FP4) — pre-quantised
    /// on disk (official `Lightricks/LTX-2.3-nvfp4`, QAD-trained),
    /// restored via `ModelOpt` HF-checkpointing, NOT bitsandbytes. The
    /// `rtx50-nvfp4` profile default. Distinct backend from `Nf4Bnb`;
    /// the bnb meta-device sequential constraint does not apply.
    Nvfp4,
    /// GGUF `Q4_K_M` transformer (community Abiray LTX-2.3 build,
    /// ~16.5 GB on disk). Loaded via the extension-local
    /// `gguf_loader` (dequant-per-matmul `GGUFLinear`) against the
    /// dg845 base config with the LTX2 key-rename applied — proven
    /// fully schema-clean (4186/4186). NOT bitsandbytes, NOT NVIDIA
    /// FP4: neither the bnb meta-device sequential constraint nor the
    /// NVFP4 host blockers apply. The `rtx50-gguf` profile default.
    Gguf,
    /// Official Lightricks **diffusers-native FP8** (`e4m3`) transformer
    /// — the QAD-trained `Lightricks/LTX-2.3-fp8` checkpoint, loaded
    /// natively by diffusers `from_pretrained` (no bitsandbytes, no
    /// `ModelOpt` restore, no `gguf_loader`). Honest naming: this is
    /// distinct from any on-the-fly fp8 cast and from the bf16 `dg845`
    /// port the `rtx*-fp8` profiles currently install. It is NOT a
    /// profile default yet — the official-repo wiring and the
    /// `validate_state_dict_against_model` schema-parity gate are a
    /// GPU/network-bound verification seam (plan steps S2b/S2c). Until
    /// that lands, an explicit `fp8_official` request is rejected at
    /// plan time the same way `Nvfp4` is — see `compatibility.rs`
    /// (`[fp8_official_under_construction]`). The enum value exists now
    /// so the contract, naming, and guard are reviewable before the
    /// hardware-gated work.
    #[serde(rename = "fp8_official")]
    Fp8Official,
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
    /// `pipe.enable_group_offload(offload_type="block_level")` — pages
    /// the transformer in small block-groups. Peak ≈ a few blocks +
    /// the active component, between `model` and `sequential`. The
    /// only mode that fits the GGUF Q4 22B transformer on 16 GB, since
    /// `sequential` is barred by the bnb-NF4 Gemma-3 text encoder
    /// (meta-tensor crash). The `rtx50-gguf` profile default.
    Group,
}

#[derive(Debug, Clone, Copy, Default, Deserialize, Serialize, PartialEq, Eq)]
#[serde(rename_all = "kebab-case")]
pub enum RuntimeProfilePreference {
    #[default]
    Auto,
    Rtx50Nvfp4,
    Rtx50Fp8,
    Rtx40Fp8,
    Rtx50Gguf,
    /// LTX-Video 0.9.7 13B GGUF — a DIFFERENT model line from the
    /// LTX-2.3-22B the other profiles target (`base_model`
    /// `Lightricks/LTX-Video`, T5 text encoder, its own VAE). `Q4_K_M`
    /// transformer ≈ 8 GB fits 16 GB RESIDENT (no offload), so the
    /// `GGUFParameter`-opaque-to-offload-hooks wall that blocks the
    /// LTX-2.3 `rtx50-gguf` path does not apply here. Plan-time-gated
    /// by `ltxv097_proven()` until the worker 0.9.7 pipeline branch is
    /// wired + GPU-verified.
    Rtx50Ltxv097Gguf,
    /// LTX-2 19B Kijai-distilled GGUF — a THIRD model architecture,
    /// distinct from both the LTX-2.3-22B and the LTX-Video 0.9.7 13B
    /// lines. Pulls the `ltx-2-19b-distilled_Q4_K_M.gguf` transformer +
    /// distilled embeddings connector + LTX-2 video/audio VAEs (from
    /// `Kijai/LTXV2_comfy`), a Gemma-3-12B Q4 text encoder (from
    /// `unsloth/gemma-3-12b-it-GGUF`), and base configs from
    /// `rootonchair/LTX-2-19b-distilled`. Routed to the worker's
    /// `pipeline_ltx2.py` branch. The Q4 stack pages under sequential
    /// offload on a 16 GB card.
    Rtx50Ltx2Gguf,
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
    /// Practical-RIFE motion-aware boundary bridge (on the LTX-Video
    /// 0.9.7 path). Code MIT; its weights are an operator-supplied
    /// external asset (not redistributed) so GPL provenance stays
    /// clean. Falls back to the linear bridge if the model is absent.
    /// NOTE: an *unset* request is sent as null (not this default), so
    /// the worker still resolves unset → `OverlapBlend`.
    #[default]
    Rife2x,
    None,
    /// Scene-boundary overlap trim + Reinhard colour match. No model,
    /// no extra VRAM. The LTX-Video 0.9.7 path's default seam fix (the
    /// boundary already overlaps via tail conditioning, so a
    /// synthesised gap-fill is the wrong primary tool); the worker
    /// also resolves any unset/unknown value here.
    OverlapBlend,
    /// `OverlapBlend` but the boundary bridge is FILM (Apache-2.0,
    /// GPL-clean) motion-aware interpolation. Optional; falls back to
    /// the linear bridge if the FILM model is unavailable.
    Film,
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
            OffloadMode::Group,
        ] {
            let wire = serde_json::to_string(&mode).unwrap();
            let back: OffloadMode = serde_json::from_str(&wire).unwrap();
            assert_eq!(back, mode, "round-trip failed for {mode:?}");
        }
        assert_eq!(
            serde_json::to_value(OffloadMode::Group).unwrap(),
            json!("group")
        );
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
    fn is_valid_input_artifact_id_accepts_canonical_shape() {
        // The server-issued id is `ltx23-input-` + 26-char ULID.
        assert!(is_valid_input_artifact_id(
            "ltx23-input-01J9ABCDEFGHJKMNPQRSTVWXYZ"
        ));
        assert!(is_valid_input_artifact_id("ltx23-input-abc123"));
    }

    #[test]
    fn is_valid_input_artifact_id_rejects_traversal_and_junk() {
        assert!(!is_valid_input_artifact_id("../escape"));
        assert!(!is_valid_input_artifact_id("ltx23-input-../escape"));
        assert!(!is_valid_input_artifact_id("ltx23-input-with/slash"));
        assert!(!is_valid_input_artifact_id("ltx23-input-with\\back"));
        assert!(!is_valid_input_artifact_id("ltx23-input-has.dot"));
        // Empty / missing prefix / missing tail.
        assert!(!is_valid_input_artifact_id(""));
        assert!(!is_valid_input_artifact_id("01J9ABC"));
        assert!(!is_valid_input_artifact_id("ltx23-input-"));
        // Wrong prefix — sibling extensions must not be addressable
        // through this validator.
        assert!(!is_valid_input_artifact_id("emotion-tts-input-01J9"));
        // Oversized.
        let too_long = format!("ltx23-input-{}", "a".repeat(100));
        assert!(!is_valid_input_artifact_id(&too_long));
    }

    #[test]
    fn create_render_request_round_trips_input_image_artifact_id() {
        let wire = json!({
            "prompt": "a cinematic dolly shot",
            "input_image_artifact_id": "ltx23-input-01J9ABCDEFGHJKMNPQRSTVWXYZ",
            "duration_seconds": 6.0,
            "runtime_profile": "auto",
            "quality_preset": "balanced16gb",
        });
        let parsed: CreateRenderRequest = serde_json::from_value(wire).unwrap();
        assert_eq!(
            parsed.input_image_artifact_id.as_deref(),
            Some("ltx23-input-01J9ABCDEFGHJKMNPQRSTVWXYZ")
        );
        // Round-trips through serde without loss.
        let again = serde_json::to_value(&parsed).unwrap();
        assert_eq!(
            again["input_image_artifact_id"].as_str(),
            Some("ltx23-input-01J9ABCDEFGHJKMNPQRSTVWXYZ")
        );
    }

    #[test]
    fn device_preference_round_trip() {
        for pref in [
            DevicePreference::Auto,
            DevicePreference::Cuda,
            DevicePreference::Cpu,
        ] {
            let wire = serde_json::to_string(&pref).unwrap();
            let back: DevicePreference = serde_json::from_str(&wire).unwrap();
            assert_eq!(back, pref);
        }
        assert_eq!(
            serde_json::to_value(DevicePreference::Cpu).unwrap(),
            json!("cpu")
        );
        assert_eq!(
            serde_json::to_value(DevicePreference::Cuda).unwrap(),
            json!("cuda")
        );
    }

    #[test]
    fn component_placement_defaults_to_all_auto() {
        let parsed: ComponentPlacement = serde_json::from_str("{}").unwrap();
        assert!(parsed.is_fully_auto());
    }

    #[test]
    fn scheduler_choice_round_trip() {
        for choice in [
            SchedulerChoice::FlowMatchEuler,
            SchedulerChoice::FlowMatchHeun,
        ] {
            let wire = serde_json::to_string(&choice).unwrap();
            let back: SchedulerChoice = serde_json::from_str(&wire).unwrap();
            assert_eq!(back, choice);
        }
        assert_eq!(
            serde_json::to_value(SchedulerChoice::FlowMatchHeun).unwrap(),
            json!("flow_match_heun")
        );
    }

    #[test]
    fn model_quant_round_trip() {
        for quant in [
            ModelQuant::None,
            ModelQuant::Nf4Bnb,
            ModelQuant::Int8,
            ModelQuant::Nvfp4,
            ModelQuant::Gguf,
        ] {
            let wire = serde_json::to_string(&quant).unwrap();
            let back: ModelQuant = serde_json::from_str(&wire).unwrap();
            assert_eq!(back, quant);
        }
        assert_eq!(
            serde_json::to_value(ModelQuant::None).unwrap(),
            json!("none")
        );
        assert_eq!(
            serde_json::to_value(ModelQuant::Nf4Bnb).unwrap(),
            json!("nf4_bnb")
        );
        assert_eq!(
            serde_json::to_value(ModelQuant::Int8).unwrap(),
            json!("int8")
        );
        assert_eq!(
            serde_json::to_value(ModelQuant::Nvfp4).unwrap(),
            json!("nvfp4")
        );
        assert_eq!(
            serde_json::to_value(ModelQuant::Gguf).unwrap(),
            json!("gguf")
        );
    }

    #[test]
    fn model_quant_legacy_nf4_alias_back_compat() {
        // Pre-rename wire value `"nf4"` must still deserialise to the
        // renamed bitsandbytes variant so old persisted payloads and
        // external callers keep working after the N3 rename.
        let back: ModelQuant = serde_json::from_str("\"nf4\"").unwrap();
        assert_eq!(back, ModelQuant::Nf4Bnb);
    }

    #[test]
    fn model_quant_defaults_to_none() {
        #[derive(serde::Deserialize)]
        struct Probe {
            #[serde(default)]
            quantization: ModelQuant,
        }
        let p: Probe = serde_json::from_str("{}").unwrap();
        assert_eq!(p.quantization, ModelQuant::None);
    }

    fn make_valid_request() -> CreateRenderRequest {
        CreateRenderRequest {
            project_id: None,
            input_image_artifact_id: None,
            prompt: "test".into(),
            negative_prompt: None,
            style_prompt: None,
            character_prompt: None,
            scenes: vec![],
            duration_seconds: 4.0,
            runtime_profile: RuntimeProfilePreference::default(),
            quality_preset: QualityPreset::default(),
            width: None,
            height: None,
            base_fps: None,
            output_fps: None,
            seed: None,
            advanced: AdvancedSettings::default(),
        }
    }

    #[test]
    fn validate_field_bounds_rejects_bad_input_artifact_id() {
        let mut req = make_valid_request();
        req.input_image_artifact_id = Some("../escape".into());
        let err = req.validate_field_bounds().unwrap_err();
        assert!(err.contains("input_image_artifact_id"));
        assert!(err.contains("invalid shape"));

        // Accepting the canonical shape unblocks validation.
        req.input_image_artifact_id = Some("ltx23-input-01J9ABCDEFGHJKMNPQRSTVWXYZ".into());
        assert!(req.validate_field_bounds().is_ok());

        // None passes (the field is optional).
        req.input_image_artifact_id = None;
        assert!(req.validate_field_bounds().is_ok());
    }

    #[test]
    fn validate_field_bounds_accepts_in_range_hyperparameters() {
        let mut req = make_valid_request();
        req.advanced.decode_timestep = Some(0.05);
        req.advanced.image_cond_noise_scale = Some(0.025);
        req.advanced.guidance_rescale = Some(0.7);
        assert!(req.validate_field_bounds().is_ok());
    }

    #[test]
    fn validate_field_bounds_checks_newly_exposed_params() {
        let mut req = make_valid_request();
        req.advanced.decode_noise_scale = Some(0.03);
        req.advanced.condition_strength = Some(0.7);
        req.advanced.condition_tail_frames = Some(24);
        req.advanced.seam_overlap_frames = Some(8);
        req.advanced.seam_blend_frames = Some(6);
        req.advanced.seam_color_match = Some(true);
        assert!(req.validate_field_bounds().is_ok());

        req.advanced.condition_strength = Some(1.5);
        assert!(req
            .validate_field_bounds()
            .unwrap_err()
            .contains("condition_strength"));
        req.advanced.condition_strength = None;

        req.advanced.condition_tail_frames = Some(0);
        assert!(req
            .validate_field_bounds()
            .unwrap_err()
            .contains("condition_tail_frames"));
        req.advanced.condition_tail_frames = None;

        req.advanced.seam_overlap_frames = Some(99);
        assert!(req
            .validate_field_bounds()
            .unwrap_err()
            .contains("seam_overlap_frames"));
        req.advanced.seam_overlap_frames = None;

        req.advanced.upscale_mode = Some("decoupled".into());
        assert!(req.validate_field_bounds().is_ok());
        req.advanced.upscale_mode = Some("two_pass".into());
        assert!(req.validate_field_bounds().is_ok());
        req.advanced.upscale_mode = Some("esrgan".into());
        assert!(req.validate_field_bounds().is_ok());
        req.advanced.upscale_mode = Some("turbo".into());
        assert!(req
            .validate_field_bounds()
            .unwrap_err()
            .contains("upscale_mode"));
        req.advanced.upscale_mode = None;

        req.advanced.keyframe_strength = Some(1.0);
        assert!(req.validate_field_bounds().is_ok());
        req.advanced.keyframe_strength = Some(0.0);
        assert!(req.validate_field_bounds().is_ok());
        req.advanced.keyframe_strength = Some(1.5);
        assert!(req
            .validate_field_bounds()
            .unwrap_err()
            .contains("keyframe_strength"));
        req.advanced.keyframe_strength = None;

        req.advanced.model_id = Some("ltxv-13b-0.9.7-dev-Q4_K_M.gguf".into());
        assert!(req.validate_field_bounds().is_ok());
        for bad in [
            "../etc/passwd.gguf",
            "/abs/path.gguf",
            "sub/dir.gguf",
            "model.safetensors",
            "..gguf",
            "a b.gguf",
        ] {
            req.advanced.model_id = Some(bad.into());
            assert!(
                req.validate_field_bounds()
                    .unwrap_err()
                    .contains("model_id"),
                "expected {bad:?} rejected"
            );
        }
        req.advanced.model_id = None;

        for ok in ["default", "aggressive", "off"] {
            req.advanced.vae_tiling = Some(ok.into());
            assert!(req.validate_field_bounds().is_ok());
        }
        req.advanced.vae_tiling = Some("ultra".into());
        assert!(req
            .validate_field_bounds()
            .unwrap_err()
            .contains("vae_tiling"));
        req.advanced.vae_tiling = None;

        req.advanced.decode_noise_scale = Some(0.6);
        assert!(req
            .validate_field_bounds()
            .unwrap_err()
            .contains("decode_noise_scale"));
        req.advanced.decode_noise_scale = None;

        req.advanced.seam_blend_frames = Some(25);
        assert!(req
            .validate_field_bounds()
            .unwrap_err()
            .contains("seam_blend_frames"));
    }

    #[test]
    fn validate_field_bounds_rejects_decode_timestep_above_range() {
        let mut req = make_valid_request();
        req.advanced.decode_timestep = Some(1.5);
        let err = req.validate_field_bounds().expect_err("must reject");
        assert!(err.contains("decode_timestep"));
    }

    #[test]
    fn validate_field_bounds_rejects_image_cond_noise_scale_above_range() {
        let mut req = make_valid_request();
        req.advanced.image_cond_noise_scale = Some(0.5);
        let err = req.validate_field_bounds().expect_err("must reject");
        assert!(err.contains("image_cond_noise_scale"));
    }

    #[test]
    fn validate_field_bounds_rejects_guidance_rescale_above_range() {
        let mut req = make_valid_request();
        req.advanced.guidance_rescale = Some(2.0);
        let err = req.validate_field_bounds().expect_err("must reject");
        assert!(err.contains("guidance_rescale"));
    }

    #[test]
    fn validate_field_bounds_rejects_nan_decode_timestep() {
        let mut req = make_valid_request();
        req.advanced.decode_timestep = Some(f32::NAN);
        assert!(req.validate_field_bounds().is_err());
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

    #[test]
    fn max_gpu_vram_gib_defaults_to_none_when_absent() {
        let wire = json!({ "offload_mode": "model" });
        let parsed: AdvancedSettings = serde_json::from_value(wire).unwrap();
        assert_eq!(parsed.max_gpu_vram_gib, None);
    }

    #[test]
    fn max_gpu_vram_gib_round_trips_explicit_value() {
        let wire = json!({ "max_gpu_vram_gib": 15 });
        let parsed: AdvancedSettings = serde_json::from_value(wire).unwrap();
        assert_eq!(parsed.max_gpu_vram_gib, Some(15));
        let again = serde_json::to_string(&parsed).unwrap();
        let twice: AdvancedSettings = serde_json::from_str(&again).unwrap();
        assert_eq!(twice.max_gpu_vram_gib, Some(15));
    }

    #[test]
    fn validate_field_bounds_accepts_in_range_max_gpu_vram_gib() {
        let mut req = make_valid_request();
        req.advanced.max_gpu_vram_gib = Some(MIN_GPU_VRAM_GIB);
        assert!(req.validate_field_bounds().is_ok());
        req.advanced.max_gpu_vram_gib = Some(MAX_GPU_VRAM_GIB);
        assert!(req.validate_field_bounds().is_ok());
    }

    #[test]
    fn validate_field_bounds_rejects_max_gpu_vram_gib_below_floor() {
        let mut req = make_valid_request();
        req.advanced.max_gpu_vram_gib = Some(MIN_GPU_VRAM_GIB - 1);
        let err = req.validate_field_bounds().expect_err("must reject");
        assert!(err.contains("max_gpu_vram_gib"));
    }

    #[test]
    fn validate_field_bounds_rejects_max_gpu_vram_gib_above_ceiling() {
        let mut req = make_valid_request();
        req.advanced.max_gpu_vram_gib = Some(MAX_GPU_VRAM_GIB + 1);
        let err = req.validate_field_bounds().expect_err("must reject");
        assert!(err.contains("max_gpu_vram_gib"));
    }
}
