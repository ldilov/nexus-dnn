//! Plan-time compatibility resolver.
//!
//! Converts three known-bad quant / offload / sampler combinations
//! from opaque deep-in-the-worker crashes into actionable plan-time
//! `InvalidRequest` errors. Each combination was observed on real
//! hardware and has no in-pipeline recovery — the only correct moment
//! to surface it is before the lease is acquired and the worker is
//! told to render.
//!
//! Scope (debate-revised first slice): the three guards below ONLY.
//! The full capability registry, progressive fallback planner, and
//! `UserPolicy` are deferred — a guard that returns a clear error is
//! strictly better UX than the status-quo runtime crash, and ships
//! without that machinery.
//!
//! 1. `quant=nf4 + offload=sequential` — bitsandbytes loads params via
//!    accelerate meta-device dispatch; `enable_sequential_cpu_offload`
//!    then tries to copy meta tensors that were never materialised
//!    ("Cannot copy out of meta tensor; no data!"). Hard crash.
//! 2. fp8/nvfp4 profile + `guidance_scale > 5.5` — the FP8 e4m3 range
//!    saturates at high CFG; attention outputs go NaN/Inf and the
//!    video turns grey/black a few seconds in. Silent quality
//!    destruction, not a clean failure.
//! 3. nvfp4 profile + segment `frames > 121` — NVFP4 GEMM emits NaN
//!    bursts past a 121-frame context on Blackwell. Silent corruption.
//!
//! All three resolve the operator's effective offload / quant the
//! same way `runner.rs::build_advanced_block` does, so the guard sees
//! exactly what the worker would receive — `Auto`/`None` are resolved
//! to their per-profile concretes before the check.

use crate::errors::{ExtensionError, Result};
use crate::runtime_selection::{default_offload_mode_for_profile, default_quant_for_profile};
use crate::schemas::{AdvancedSettings, ModelQuant, OffloadMode};

/// Highest CFG the FP8/NVFP4 activation range tolerates before e4m3
/// saturation drives attention outputs to NaN/Inf on Ada-class cards.
pub const FP8_MAX_GUIDANCE_SCALE: f32 = 5.5;

/// Largest per-segment frame count NVFP4 GEMM is stable at on
/// Blackwell. Past this the kernel emits NaN bursts.
pub const NVFP4_MAX_SEGMENT_FRAMES: u32 = 121;

/// Pipeline default CFG when the operator leaves `guidance_scale`
/// unset — mirrors `runner.rs::build_advanced_block`'s constant so the
/// guard evaluates the value the worker would actually use.
pub const DEFAULT_GUIDANCE_SCALE: f32 = 4.0;

/// Last dotted segment of a runtime id.
///
/// `"nexus.video.ltx23.rtx50-nvfp4"` → `"rtx50-nvfp4"`. Mirrors
/// `runner.rs::short_profile` exactly (including its `rsplit` edge
/// behaviour); duplicated rather than widening that private helper's
/// visibility for a single call site.
#[must_use]
pub fn short_profile_slug(full: &str) -> &str {
    full.rsplit('.').next().unwrap_or("fake")
}

/// Resolve the offload mode the worker will actually run with —
/// `Auto` collapses to the per-profile default, every concrete value
/// passes through unchanged.
const fn effective_offload(advanced: &AdvancedSettings, short_profile: &str) -> OffloadMode {
    match advanced.offload_mode {
        OffloadMode::Auto => default_offload_mode_for_profile(short_profile),
        concrete => concrete,
    }
}

/// Resolve the quantisation the worker will actually apply — `None`
/// means "take the per-profile default" (nvfp4 → nf4), an explicit
/// choice always wins. Same precedence as `build_advanced_block`.
const fn effective_quant(advanced: &AdvancedSettings, short_profile: &str) -> ModelQuant {
    match advanced.quantization {
        ModelQuant::None => default_quant_for_profile(short_profile),
        explicit => explicit,
    }
}

fn is_fp8_family(short_profile: &str) -> bool {
    matches!(short_profile, "rtx40-fp8" | "rtx50-fp8" | "rtx50-nvfp4")
}

/// Reject a render whose effective config hits a known-bad combo.
///
/// Returns the FIRST offending combination so the message stays
/// single-cause and actionable; the error code is embedded in the
/// message tail as `[code]` so the frontend can branch without
/// parsing prose.
///
/// `guidance_scale` is the operator value or `None` (→ pipeline
/// default). `max_segment_frames` is the largest per-segment frame
/// count in the plan (the last segment can exceed the nominal one).
pub fn check_known_incompatibilities(
    runtime_profile_full: &str,
    advanced: &AdvancedSettings,
    guidance_scale: Option<f32>,
    max_segment_frames: u32,
) -> Result<()> {
    let short = short_profile_slug(runtime_profile_full);

    // Guard 1 — nf4 + sequential is an immediate accelerate crash.
    if effective_quant(advanced, short) == ModelQuant::Nf4
        && effective_offload(advanced, short) == OffloadMode::Sequential
    {
        return Err(ExtensionError::InvalidRequest(
            "offload_mode='sequential' is incompatible with NF4 quantisation \
             (bitsandbytes loads via accelerate meta-device dispatch and \
             sequential offload cannot copy the un-materialised meta tensors). \
             Use offload_mode='model' instead. [quant_nf4_sequential_unsupported]"
                .into(),
        ));
    }

    // Guard 2 — high CFG saturates the FP8 activation range.
    let cfg = guidance_scale.unwrap_or(DEFAULT_GUIDANCE_SCALE);
    if is_fp8_family(short) && cfg > FP8_MAX_GUIDANCE_SCALE {
        return Err(ExtensionError::InvalidRequest(format!(
            "guidance_scale {cfg} exceeds the FP8-safe ceiling of \
             {FP8_MAX_GUIDANCE_SCALE} for profile '{short}'; the e4m3 range \
             saturates and attention outputs go NaN (video turns grey/black \
             mid-render). Lower guidance_scale to \
             {FP8_MAX_GUIDANCE_SCALE} or below. [fp8_guidance_too_high]"
        )));
    }

    // Guard 3 — NVFP4 GEMM NaN-bursts past a 121-frame context.
    if short == "rtx50-nvfp4" && max_segment_frames > NVFP4_MAX_SEGMENT_FRAMES {
        return Err(ExtensionError::InvalidRequest(format!(
            "segment frame count {max_segment_frames} exceeds the NVFP4 \
             stability ceiling of {NVFP4_MAX_SEGMENT_FRAMES} frames; NVFP4 \
             GEMM emits NaN bursts past this context length on Blackwell. \
             Reduce segment_seconds or base_fps so each segment stays at \
             or below {NVFP4_MAX_SEGMENT_FRAMES} frames. \
             [nvfp4_segment_too_long]"
        )));
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    fn advanced(offload: OffloadMode, quant: ModelQuant, cfg: Option<f32>) -> AdvancedSettings {
        AdvancedSettings {
            offload_mode: offload,
            quantization: quant,
            guidance_scale: cfg,
            ..AdvancedSettings::default()
        }
    }

    const NVFP4: &str = "nexus.video.ltx23.rtx50-nvfp4";
    const FP8: &str = "nexus.video.ltx23.rtx50-fp8";
    const FAKE: &str = "nexus.video.ltx23.fake";

    #[test]
    fn short_profile_slug_takes_last_segment() {
        assert_eq!(short_profile_slug(NVFP4), "rtx50-nvfp4");
        assert_eq!(short_profile_slug("bare"), "bare");
        // `"".rsplit('.').next()` is `Some("")`, so the slug is "" —
        // identical to runner.rs::short_profile. Not a real input
        // (runtime ids are always dotted); pinned to document parity.
        assert_eq!(short_profile_slug(""), "");
    }

    #[test]
    fn nf4_plus_explicit_sequential_is_blocked() {
        // nvfp4 profile resolves quant→nf4; user forces sequential.
        let adv = advanced(OffloadMode::Sequential, ModelQuant::None, None);
        let err = check_known_incompatibilities(NVFP4, &adv, None, 97)
            .expect_err("nf4+sequential must block");
        assert!(matches!(err, ExtensionError::InvalidRequest(m)
            if m.contains("quant_nf4_sequential_unsupported")));
    }

    #[test]
    fn explicit_nf4_plus_sequential_on_any_profile_blocked() {
        let adv = advanced(OffloadMode::Sequential, ModelQuant::Nf4, None);
        assert!(check_known_incompatibilities(FP8, &adv, None, 97).is_err());
    }

    #[test]
    fn nf4_plus_model_offload_is_allowed() {
        // The safe default path: nvfp4 → nf4 + model offload.
        let adv = advanced(OffloadMode::Model, ModelQuant::None, None);
        assert!(check_known_incompatibilities(NVFP4, &adv, None, 97).is_ok());
    }

    #[test]
    fn nvfp4_auto_offload_default_is_allowed() {
        // Auto on nvfp4 resolves to Model (not Sequential) → safe.
        let adv = advanced(OffloadMode::Auto, ModelQuant::None, None);
        assert!(check_known_incompatibilities(NVFP4, &adv, None, 97).is_ok());
    }

    #[test]
    fn fp8_guidance_above_ceiling_blocked() {
        let adv = advanced(OffloadMode::Auto, ModelQuant::None, Some(6.0));
        let err = check_known_incompatibilities(FP8, &adv, Some(6.0), 97)
            .expect_err("fp8 + cfg>5.5 must block");
        assert!(matches!(err, ExtensionError::InvalidRequest(m)
            if m.contains("fp8_guidance_too_high")));
    }

    #[test]
    fn fp8_guidance_at_ceiling_allowed() {
        let adv = advanced(OffloadMode::Auto, ModelQuant::None, Some(5.5));
        assert!(check_known_incompatibilities(FP8, &adv, Some(5.5), 97).is_ok());
    }

    #[test]
    fn fp8_default_guidance_allowed() {
        // None → 4.0 default, well under the 5.5 ceiling.
        let adv = advanced(OffloadMode::Auto, ModelQuant::None, None);
        assert!(check_known_incompatibilities(FP8, &adv, None, 97).is_ok());
    }

    #[test]
    fn fake_profile_exempt_from_fp8_guidance_guard() {
        // fake/CI has no FP8 kernels — high CFG is fine there.
        let adv = advanced(OffloadMode::Auto, ModelQuant::None, Some(9.0));
        assert!(check_known_incompatibilities(FAKE, &adv, Some(9.0), 999).is_ok());
    }

    #[test]
    fn nvfp4_segment_over_121_frames_blocked() {
        let adv = advanced(OffloadMode::Model, ModelQuant::None, None);
        let err = check_known_incompatibilities(NVFP4, &adv, None, 122)
            .expect_err("nvfp4 + >121 frames must block");
        assert!(matches!(err, ExtensionError::InvalidRequest(m)
            if m.contains("nvfp4_segment_too_long")));
    }

    #[test]
    fn nvfp4_segment_at_121_frames_allowed() {
        let adv = advanced(OffloadMode::Model, ModelQuant::None, None);
        assert!(check_known_incompatibilities(NVFP4, &adv, None, 121).is_ok());
    }

    #[test]
    fn fp8_long_segment_allowed_only_nvfp4_frame_capped() {
        // The 121-frame ceiling is NVFP4-specific; plain FP8 is exempt.
        let adv = advanced(OffloadMode::Auto, ModelQuant::None, None);
        assert!(check_known_incompatibilities(FP8, &adv, None, 200).is_ok());
    }

    #[test]
    fn first_offending_combo_is_reported() {
        // nf4+sequential AND cfg>5.5 both true → guard 1 wins (single
        // cause, most actionable: the crash beats the quality bug).
        let adv = advanced(OffloadMode::Sequential, ModelQuant::Nf4, Some(8.0));
        let err = check_known_incompatibilities(NVFP4, &adv, Some(8.0), 200)
            .expect_err("must block");
        assert!(matches!(err, ExtensionError::InvalidRequest(m)
            if m.contains("quant_nf4_sequential_unsupported")
            && !m.contains("fp8_guidance_too_high")));
    }
}
