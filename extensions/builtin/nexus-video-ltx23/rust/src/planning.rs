#![allow(
    clippy::cast_possible_truncation,
    clippy::cast_precision_loss,
    clippy::cast_sign_loss,
    clippy::cast_lossless
)]

use crate::errors::{ExtensionError, Result};
use crate::schemas::{
    CreateRenderRequest, InterpolationMethod, PlanWarning, QualityPreset, RenderMode, RenderPlan,
    RenderSegmentPlan, RuntimeProfilePreference, VramRisk,
};

const DEFAULT_BASE_FPS: u32 = 24;
const DEFAULT_OUTPUT_FPS: u32 = 48;
const DEFAULT_SEGMENT_SECONDS: f32 = 4.0;
const DEFAULT_OVERLAP_SECONDS: f32 = 0.5;
const MIN_DURATION: f32 = 1.0;
const MAX_DURATION: f32 = 300.0;

#[must_use]
pub fn ltx_frame_count(seconds: f32, fps: u32) -> u32 {
    if seconds <= 0.0 || fps == 0 {
        return 1;
    }
    let raw = (seconds * fps as f32).ceil() as i64;
    let q = ((raw - 1).max(0) as f32 / 8.0).ceil() as i64;
    (8 * q + 1).max(1) as u32
}

#[must_use]
pub fn segment_count(duration_seconds: f32, segment_seconds: f32, overlap_seconds: f32) -> u32 {
    if duration_seconds <= 0.0 || segment_seconds <= 0.0 {
        return 0;
    }
    if duration_seconds <= segment_seconds {
        return 1;
    }
    let stride = (segment_seconds - overlap_seconds).max(0.1);
    let extra = ((duration_seconds - segment_seconds) / stride).ceil() as u32;
    1 + extra
}

#[must_use]
const fn quality_preset_dims(preset: QualityPreset) -> (u32, u32) {
    match preset {
        QualityPreset::Draft => (832, 480),
        QualityPreset::Balanced16gb => (960, 544),
        QualityPreset::Quality16gb => (1280, 720),
        QualityPreset::High => (1920, 1088),
    }
}

#[must_use]
const fn quality_preset_gpu_budget_mb(preset: QualityPreset) -> u32 {
    match preset {
        QualityPreset::Draft => 10_000,
        QualityPreset::Balanced16gb | QualityPreset::Quality16gb => 14_500,
        QualityPreset::High => 22_000,
    }
}

#[must_use]
const fn align_to_32(value: u32) -> u32 {
    value.div_ceil(32) * 32
}

#[must_use]
const fn segment_seed(base: u64, index: u32) -> u64 {
    // Deterministic mixing. Cheap splitmix-style hash; not cryptographic.
    let mut h = base.wrapping_add(0x9E37_79B9_7F4A_7C15);
    h ^= (index as u64).wrapping_mul(0xBF58_476D_1CE4_E5B9);
    h = h.wrapping_mul(0x94D0_49BB_1331_11EB);
    h ^= h >> 33;
    h
}

/// Walk the user-supplied `scenes[]` script using per-scene durations
/// as a virtual timeline; return the scene that overlaps the midpoint
/// of the given segment window. Falls back to None when no scenes are
/// provided, when an overlapping scene has an empty prompt, or when
/// the segment falls past the end of the script (last scene's prompt
/// is used as a "tail" anchor in that case).
#[must_use]
fn pick_scene_prompt(
    scenes: &[crate::schemas::SceneSpec],
    seg_start: f32,
    seg_duration: f32,
    seg_index: u32,
) -> Option<String> {
    if scenes.is_empty() {
        return None;
    }
    let midpoint = seg_duration.mul_add(0.5, seg_start);
    let total: f32 = scenes
        .iter()
        .map(|s| s.duration_seconds.unwrap_or(0.0).max(0.0))
        .sum();
    // If no scene declared its own duration, distribute evenly by index.
    let prompt = if total <= 0.0 {
        let idx = (seg_index as usize) % scenes.len();
        scenes.get(idx).map(|s| s.prompt.clone())
    } else {
        let mut accum = 0.0_f32;
        let mut picked: Option<&crate::schemas::SceneSpec> = None;
        for scene in scenes {
            let dur = scene.duration_seconds.unwrap_or(0.0).max(0.0);
            accum += dur;
            if midpoint <= accum {
                picked = Some(scene);
                break;
            }
        }
        // Past the script's end → tail-anchor on the last scene.
        picked.or_else(|| scenes.last()).map(|s| s.prompt.clone())
    };
    prompt.and_then(|p| if p.trim().is_empty() { None } else { Some(p) })
}

#[must_use]
fn pick_scene_seed(
    scenes: &[crate::schemas::SceneSpec],
    base_seed: u64,
    seg_start: f32,
    seg_duration: f32,
    seg_index: u32,
) -> u64 {
    if scenes.is_empty() {
        return segment_seed(base_seed, seg_index);
    }
    // Reuse the same scene-walk as for prompts so a single SceneSpec's
    // seed override applies to every segment it covers (preserves the
    // RNG-driven elements of that scene's look across boundaries).
    let midpoint = seg_duration.mul_add(0.5, seg_start);
    let total: f32 = scenes
        .iter()
        .map(|s| s.duration_seconds.unwrap_or(0.0).max(0.0))
        .sum();
    let scene = if total <= 0.0 {
        scenes.get((seg_index as usize) % scenes.len())
    } else {
        let mut accum = 0.0_f32;
        let mut picked: Option<&crate::schemas::SceneSpec> = None;
        for s in scenes {
            accum += s.duration_seconds.unwrap_or(0.0).max(0.0);
            if midpoint <= accum {
                picked = Some(s);
                break;
            }
        }
        picked.or_else(|| scenes.last())
    };
    scene
        .and_then(|s| s.seed)
        .unwrap_or_else(|| segment_seed(base_seed, seg_index))
}

#[must_use]
fn estimate_vram_risk(
    width: u32,
    height: u32,
    frame_count: u32,
    budget_mb: u32,
    profile: RuntimeProfilePreference,
) -> VramRisk {
    let pixels = u64::from(width) * u64::from(height);
    let cost = pixels * u64::from(frame_count);
    let cost_score = cost / 1_000_000;
    let budget_score = u64::from(budget_mb);

    match profile {
        RuntimeProfilePreference::Rtx50Nvfp4 if budget_score < 16_000 => VramRisk::Risky,
        _ if cost_score < 400 => VramRisk::Safe,
        _ if cost_score < 700 => VramRisk::Moderate,
        _ if cost_score < 1_100 => VramRisk::Risky,
        _ => VramRisk::LikelyToFail,
    }
}

#[allow(clippy::too_many_lines)]
pub fn plan_render(req: &CreateRenderRequest, runtime_profile: &str) -> Result<RenderPlan> {
    if req.prompt.trim().is_empty() {
        return Err(ExtensionError::InvalidRequest(
            "prompt cannot be empty".into(),
        ));
    }
    if req.duration_seconds < MIN_DURATION || req.duration_seconds > MAX_DURATION {
        return Err(ExtensionError::InvalidRequest(format!(
            "duration_seconds must be in [{MIN_DURATION}, {MAX_DURATION}]; got {}",
            req.duration_seconds
        )));
    }

    let (default_w, default_h) = quality_preset_dims(req.quality_preset);
    let width = align_to_32(req.width.unwrap_or(default_w));
    let height = align_to_32(req.height.unwrap_or(default_h));
    let base_fps = req.base_fps.unwrap_or(DEFAULT_BASE_FPS);
    let output_fps = req
        .advanced
        .output_fps
        .or(req.output_fps)
        .unwrap_or(DEFAULT_OUTPUT_FPS);
    let segment_seconds = req
        .advanced
        .segment_seconds
        .unwrap_or(DEFAULT_SEGMENT_SECONDS);
    let overlap_seconds = req
        .advanced
        .overlap_seconds
        .unwrap_or(DEFAULT_OVERLAP_SECONDS);

    let segment_count_val = segment_count(req.duration_seconds, segment_seconds, overlap_seconds);
    if segment_count_val == 0 {
        return Err(ExtensionError::PlanInvalid("computed zero segments".into()));
    }

    let base_seed = req.seed.unwrap_or_else(|| {
        // Time-based default if not supplied. Deterministic per second.
        use std::time::{SystemTime, UNIX_EPOCH};
        SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map(|d| d.as_secs())
            .unwrap_or(42)
    });

    let frame_count_per_segment = ltx_frame_count(segment_seconds, base_fps);

    let mut segments = Vec::with_capacity(segment_count_val as usize);
    let stride = (segment_seconds - overlap_seconds).max(0.1);
    for i in 0..segment_count_val {
        let start = if i == 0 { 0.0 } else { i as f32 * stride };
        let duration = if i + 1 == segment_count_val {
            // Last segment runs to the end of the requested duration; stretch
            // its nominal length so cumulative coverage >= duration.
            (req.duration_seconds - start).max(segment_seconds)
        } else {
            segment_seconds
        };
        let action_prompt = pick_scene_prompt(&req.scenes, start, duration, i);
        let seed = pick_scene_seed(&req.scenes, base_seed, start, duration, i);
        segments.push(RenderSegmentPlan {
            index: i,
            start_time_seconds: start,
            duration_seconds: duration,
            overlap_seconds,
            frame_count: ltx_frame_count(duration, base_fps),
            seed,
            action_prompt,
        });
    }

    // Plan-time compatibility gate: reject the three known-bad
    // quant/offload/sampler combinations here, with an actionable
    // message, instead of letting them crash opaquely deep in the
    // worker (accelerate meta-tensor copy / FP8 NaN / NVFP4 NaN
    // burst). `runtime_profile` is the fully-qualified id; the guard
    // resolves the effective offload/quant the same way the worker
    // payload builder does. The last segment can exceed the nominal
    // frame count, so check the chain's maximum.
    let max_segment_frames = segments
        .iter()
        .map(|s| s.frame_count)
        .max()
        .unwrap_or(frame_count_per_segment);
    crate::compatibility::check_known_incompatibilities(
        runtime_profile,
        &req.advanced,
        max_segment_frames,
    )?;

    let budget = quality_preset_gpu_budget_mb(req.quality_preset);
    let risk = estimate_vram_risk(
        width,
        height,
        frame_count_per_segment,
        budget,
        req.runtime_profile,
    );

    let mut warnings = Vec::new();
    if matches!(risk, VramRisk::Risky | VramRisk::LikelyToFail) {
        warnings.push(PlanWarning {
            code: "vram_risk".into(),
            message: format!(
                "selected preset is {risk:?} for the chosen runtime; consider 'balanced_16gb'"
            ),
        });
    }
    if req.duration_seconds > 60.0 {
        warnings.push(PlanWarning {
            code: "long_render".into(),
            message: "renders over 60s incur warm-mode restarts; expect noticeable runtime restarts mid-render.".into(),
        });
    }

    let interpolation = req
        .advanced
        .interpolation
        .unwrap_or(InterpolationMethod::Rife2x);

    Ok(RenderPlan {
        mode: RenderMode::ExternalSegments,
        width,
        height,
        base_fps,
        output_fps,
        requested_duration_seconds: req.duration_seconds,
        planned_duration_seconds: req.duration_seconds,
        segment_count: segment_count_val,
        segments,
        runtime_profile: runtime_profile.to_string(),
        gpu_memory_budget_mb: budget,
        interpolation,
        warnings,
        vram_risk: risk,
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::schemas::AdvancedSettings;

    #[test]
    fn ltx_frame_count_satisfies_8n_plus_1() {
        for seconds in [1.0_f32, 2.5, 4.0, 5.0, 7.3, 10.0] {
            let fc = ltx_frame_count(seconds, 24);
            assert_eq!(
                (fc - 1) % 8,
                0,
                "frame count {fc} for {seconds}s must be 8n+1"
            );
        }
    }

    #[test]
    fn ltx_frame_count_lower_bound_one() {
        assert_eq!(ltx_frame_count(0.0, 24), 1);
        assert_eq!(ltx_frame_count(-1.0, 24), 1);
        assert_eq!(ltx_frame_count(1.0, 0), 1);
    }

    #[test]
    fn segment_count_matches_spec_example() {
        // Spec doc 06 example: 30s / 4s segment / 0.5s overlap = 9 segments
        assert_eq!(segment_count(30.0, 4.0, 0.5), 9);
    }

    #[test]
    fn segment_count_handles_short_video() {
        assert_eq!(segment_count(2.0, 4.0, 0.5), 1);
        assert_eq!(segment_count(4.0, 4.0, 0.5), 1);
    }

    #[test]
    fn segment_count_handles_zero_overlap() {
        // Cumulative coverage must reach duration
        assert!(segment_count(20.0, 4.0, 0.0) >= 5);
    }

    #[test]
    fn plan_rejects_empty_prompt() {
        let req = CreateRenderRequest {
            project_id: None,
            input_image_artifact_id: None,
            prompt: "   ".into(),
            negative_prompt: None,
            style_prompt: None,
            character_prompt: None,
            scenes: Vec::new(),
            duration_seconds: 10.0,
            runtime_profile: RuntimeProfilePreference::Auto,
            quality_preset: QualityPreset::Balanced16gb,
            width: None,
            height: None,
            base_fps: None,
            output_fps: None,
            seed: Some(42),
            advanced: AdvancedSettings::default(),
        };
        assert!(plan_render(&req, "fake").is_err());
    }

    #[test]
    fn plan_rejects_out_of_range_duration() {
        let mk = |dur: f32| CreateRenderRequest {
            project_id: None,
            input_image_artifact_id: None,
            prompt: "x".into(),
            negative_prompt: None,
            style_prompt: None,
            character_prompt: None,
            scenes: Vec::new(),
            duration_seconds: dur,
            runtime_profile: RuntimeProfilePreference::Auto,
            quality_preset: QualityPreset::Balanced16gb,
            width: None,
            height: None,
            base_fps: None,
            output_fps: None,
            seed: Some(42),
            advanced: AdvancedSettings::default(),
        };
        assert!(plan_render(&mk(0.5), "fake").is_err());
        assert!(plan_render(&mk(301.0), "fake").is_err());
        assert!(plan_render(&mk(10.0), "fake").is_ok());
    }

    #[test]
    fn plan_aligns_dims_to_32() {
        let req = CreateRenderRequest {
            project_id: None,
            input_image_artifact_id: None,
            prompt: "x".into(),
            negative_prompt: None,
            style_prompt: None,
            character_prompt: None,
            scenes: Vec::new(),
            duration_seconds: 10.0,
            runtime_profile: RuntimeProfilePreference::Auto,
            quality_preset: QualityPreset::Balanced16gb,
            width: Some(961),
            height: Some(545),
            base_fps: None,
            output_fps: None,
            seed: Some(42),
            advanced: AdvancedSettings::default(),
        };
        let plan = plan_render(&req, "fake").unwrap();
        assert_eq!(plan.width % 32, 0);
        assert_eq!(plan.height % 32, 0);
        assert!(plan.width >= 961);
        assert!(plan.height >= 545);
    }

    #[test]
    fn plan_segment_seeds_are_deterministic_and_distinct() {
        let req = CreateRenderRequest {
            project_id: None,
            input_image_artifact_id: None,
            prompt: "test".into(),
            negative_prompt: None,
            style_prompt: None,
            character_prompt: None,
            scenes: Vec::new(),
            duration_seconds: 30.0,
            runtime_profile: RuntimeProfilePreference::Auto,
            quality_preset: QualityPreset::Balanced16gb,
            width: None,
            height: None,
            base_fps: None,
            output_fps: None,
            seed: Some(123_456),
            advanced: AdvancedSettings::default(),
        };
        let plan1 = plan_render(&req, "fake").unwrap();
        let plan2 = plan_render(&req, "fake").unwrap();
        // Determinism
        for (a, b) in plan1.segments.iter().zip(plan2.segments.iter()) {
            assert_eq!(a.seed, b.seed);
        }
        // Distinctness
        let mut seeds: Vec<_> = plan1.segments.iter().map(|s| s.seed).collect();
        seeds.sort_unstable();
        seeds.dedup();
        assert_eq!(seeds.len(), plan1.segments.len());
    }

    fn mk_request_with_scenes(
        duration: f32,
        scenes: Vec<crate::schemas::SceneSpec>,
    ) -> CreateRenderRequest {
        CreateRenderRequest {
            project_id: None,
            input_image_artifact_id: None,
            prompt: "global fallback prompt".into(),
            negative_prompt: None,
            style_prompt: None,
            character_prompt: None,
            scenes,
            duration_seconds: duration,
            runtime_profile: RuntimeProfilePreference::Auto,
            quality_preset: QualityPreset::Balanced16gb,
            width: None,
            height: None,
            base_fps: None,
            output_fps: None,
            seed: Some(999),
            advanced: AdvancedSettings::default(),
        }
    }

    #[test]
    fn plan_assigns_scene_prompt_by_timeline_midpoint() {
        let req = mk_request_with_scenes(
            12.0,
            vec![
                crate::schemas::SceneSpec {
                    prompt: "scene A: setup".into(),
                    duration_seconds: Some(4.0),
                    seed: None,
                },
                crate::schemas::SceneSpec {
                    prompt: "scene B: conflict".into(),
                    duration_seconds: Some(4.0),
                    seed: None,
                },
                crate::schemas::SceneSpec {
                    prompt: "scene C: resolution".into(),
                    duration_seconds: Some(4.0),
                    seed: None,
                },
            ],
        );
        let plan = plan_render(&req, "fake").unwrap();
        // 12s / 4s segments = 3 segments (approximately), each midpoint
        // lands in a different scene window.
        assert!(plan.segment_count >= 3);
        let action_prompts: Vec<String> = plan
            .segments
            .iter()
            .filter_map(|s| s.action_prompt.clone())
            .collect();
        // All three scene prompts should be represented across the segments.
        assert!(action_prompts.iter().any(|p| p.contains("scene A")));
        assert!(action_prompts.iter().any(|p| p.contains("scene B")));
        assert!(action_prompts.iter().any(|p| p.contains("scene C")));
    }

    #[test]
    fn plan_tail_anchors_past_scene_end() {
        // Render is 16s but scenes only cover 6s — segments past 6s
        // should adopt the last scene's prompt as a tail anchor.
        let req = mk_request_with_scenes(
            16.0,
            vec![
                crate::schemas::SceneSpec {
                    prompt: "intro shot".into(),
                    duration_seconds: Some(3.0),
                    seed: None,
                },
                crate::schemas::SceneSpec {
                    prompt: "epilogue freeze".into(),
                    duration_seconds: Some(3.0),
                    seed: None,
                },
            ],
        );
        let plan = plan_render(&req, "fake").unwrap();
        let last = plan.segments.last().unwrap();
        assert_eq!(last.action_prompt.as_deref(), Some("epilogue freeze"));
    }

    #[test]
    fn plan_falls_back_to_global_prompt_when_no_scenes() {
        let req = mk_request_with_scenes(8.0, Vec::new());
        let plan = plan_render(&req, "fake").unwrap();
        for seg in &plan.segments {
            assert!(
                seg.action_prompt.is_none(),
                "expected None, got {:?}",
                seg.action_prompt
            );
        }
    }

    #[test]
    fn plan_scene_seed_override_propagates() {
        let req = mk_request_with_scenes(
            8.0,
            vec![
                crate::schemas::SceneSpec {
                    prompt: "first".into(),
                    duration_seconds: Some(4.0),
                    seed: Some(7777),
                },
                crate::schemas::SceneSpec {
                    prompt: "second".into(),
                    duration_seconds: Some(4.0),
                    seed: Some(8888),
                },
            ],
        );
        let plan = plan_render(&req, "fake").unwrap();
        // Segments whose midpoint falls in the first scene should use seed 7777.
        for seg in &plan.segments {
            let midpoint = seg.duration_seconds.mul_add(0.5, seg.start_time_seconds);
            let expected = if midpoint <= 4.0 { 7777 } else { 8888 };
            assert_eq!(
                seg.seed, expected,
                "segment {} midpoint={}",
                seg.index, midpoint
            );
        }
    }

    #[test]
    fn plan_emits_long_render_warning_above_60s() {
        let req = CreateRenderRequest {
            project_id: None,
            input_image_artifact_id: None,
            prompt: "long".into(),
            negative_prompt: None,
            style_prompt: None,
            character_prompt: None,
            scenes: Vec::new(),
            duration_seconds: 120.0,
            runtime_profile: RuntimeProfilePreference::Auto,
            quality_preset: QualityPreset::Balanced16gb,
            width: None,
            height: None,
            base_fps: None,
            output_fps: None,
            seed: Some(1),
            advanced: AdvancedSettings::default(),
        };
        let plan = plan_render(&req, "fake").unwrap();
        assert!(plan.warnings.iter().any(|w| w.code == "long_render"));
    }
}
