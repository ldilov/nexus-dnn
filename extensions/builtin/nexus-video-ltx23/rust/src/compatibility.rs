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
//! 1. bitsandbytes (`nf4_bnb`/`int8`) + `offload=sequential` — bnb
//!    loads params via accelerate meta-device dispatch;
//!    `enable_sequential_cpu_offload` then tries to copy meta tensors
//!    that were never materialised ("Cannot copy out of meta tensor;
//!    no data!"). Hard crash. (Does NOT apply to `nvfp4` — that is
//!    NVIDIA `ModelOpt`, not bnb.)
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
use crate::runtime_selection::{
    default_offload_mode_for_profile, default_quant_for_profile, is_fp8_family, is_nvfp4_family,
};
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
/// means "take the per-profile default" (nvfp4 profile → `Nf4Bnb`
/// while real NVFP4 is host-blocked), an explicit choice always wins.
/// Same precedence as `build_advanced_block`.
const fn effective_quant(advanced: &AdvancedSettings, short_profile: &str) -> ModelQuant {
    match advanced.quantization {
        ModelQuant::None => default_quant_for_profile(short_profile),
        explicit => explicit,
    }
}

/// Reject a render whose effective config hits a known-bad combo.
///
/// Returns the FIRST offending combination so the message stays
/// single-cause and actionable; the error code is embedded in the
/// message tail as `[code]` so the frontend can branch without
/// parsing prose.
///
/// `guidance_scale` is read from `advanced` (operator value or, when
/// unset, the pipeline default) — single source of truth, identical
/// to what `build_advanced_block` serialises. `max_segment_frames` is
/// the largest per-segment frame count in the plan (the last segment
/// can exceed the nominal one).
pub fn check_known_incompatibilities(
    runtime_profile_full: &str,
    advanced: &AdvancedSettings,
    max_segment_frames: u32,
) -> Result<()> {
    let short = short_profile_slug(runtime_profile_full);

    // Guard 0 — real NVIDIA ModelOpt NVFP4 is under construction /
    // host-blocked: NVFP4 layers cannot CPU-offload, diffusers blocks
    // pre-quant cpu device_map, and `modelopt_cuda_ext_mx` will not
    // build without a CUDA toolchain on this host (see
    // checkpoints/2026-05-17-nvfp4-offload-blocker.md). The `Nvfp4`
    // value stays for honest naming + future use, but resolves only
    // via an EXPLICIT operator request (it is not a profile default —
    // `default_quant_for_profile` keeps `rtx50-nvfp4` on the verified
    // bnb path). Reject the explicit request at plan time rather than
    // letting it reach a worker with no nvfp4 branch.
    if matches!(effective_quant(advanced, short), ModelQuant::Nvfp4) {
        return Err(ExtensionError::InvalidRequest(
            "quantization='nvfp4' (real NVIDIA ModelOpt FP4) is under \
             construction and not yet runnable on this host (NVFP4 \
             layers cannot CPU-offload, and the ModelOpt MX CUDA \
             extension requires a CUDA build toolchain). Use \
             quantization='nf4_bnb' (the verified 16 GB path) or leave \
             it unset to take the profile default. \
             [nvfp4_under_construction]"
                .into(),
        ));
    }

    // Guard 1 — bitsandbytes (NF4 *or* INT8) + sequential offload is
    // an immediate accelerate crash. BOTH 4-bit and 8-bit bnb load
    // params via accelerate's meta-device dispatch, so
    // `enable_sequential_cpu_offload` hits the identical "Cannot copy
    // out of meta tensor; no data!" on either — the guard must cover
    // both quant variants, not just NF4.
    if matches!(
        effective_quant(advanced, short),
        ModelQuant::Nf4Bnb | ModelQuant::Int8
    ) && effective_offload(advanced, short) == OffloadMode::Sequential
    {
        return Err(ExtensionError::InvalidRequest(
            "offload_mode='sequential' is incompatible with bitsandbytes \
             quantisation (NF4/INT8 load via accelerate meta-device \
             dispatch and sequential offload cannot copy the \
             un-materialised meta tensors). Use offload_mode='model' \
             instead. [quant_bnb_sequential_unsupported]"
                .into(),
        ));
    }

    // Guard 2 — high CFG saturates the FP8 activation range.
    let cfg = advanced.guidance_scale.unwrap_or(DEFAULT_GUIDANCE_SCALE);
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
    // `is_nvfp4_family` (not a literal slug) so a future *-nvfp4
    // profile is covered automatically.
    if is_nvfp4_family(short) && max_segment_frames > NVFP4_MAX_SEGMENT_FRAMES {
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
    fn nvfp4_profile_default_plus_sequential_is_blocked() {
        // Real NVFP4 is shelved/host-blocked, so the `rtx50-nvfp4`
        // profile default resolves to `Nf4Bnb` (the verified bnb
        // path). Nf4Bnb + sequential is the Guard-1 meta-tensor crash
        // and must be blocked at plan time. (This is the original
        // pre-N3c semantic, restored after the NVFP4 shelve decision.)
        let adv = advanced(OffloadMode::Sequential, ModelQuant::None, None);
        let err = check_known_incompatibilities(NVFP4, &adv, 97)
            .expect_err("nf4_bnb (nvfp4 profile default) + sequential must block");
        assert!(matches!(err, ExtensionError::InvalidRequest(m)
            if m.contains("quant_bnb_sequential_unsupported")));
    }

    #[test]
    fn explicit_nf4_plus_sequential_on_any_profile_blocked() {
        let adv = advanced(OffloadMode::Sequential, ModelQuant::Nf4Bnb, None);
        assert!(check_known_incompatibilities(FP8, &adv, 97).is_err());
    }

    #[test]
    fn explicit_nvfp4_is_rejected_as_under_construction() {
        // Real NVFP4 is host-blocked / under construction (Guard 0).
        // An explicit operator `quantization='nvfp4'` must be rejected
        // at plan time with the actionable code, on any profile and
        // any offload mode — it must NOT reach a worker that has no
        // nvfp4 branch.
        for offload in [
            OffloadMode::Model,
            OffloadMode::Sequential,
            OffloadMode::Auto,
        ] {
            let adv = advanced(offload, ModelQuant::Nvfp4, None);
            let err = check_known_incompatibilities(NVFP4, &adv, 97)
                .expect_err("explicit nvfp4 must be rejected");
            assert!(matches!(err, ExtensionError::InvalidRequest(m)
                if m.contains("nvfp4_under_construction")));
        }
        // It is rejected regardless of profile too.
        let adv = advanced(OffloadMode::Model, ModelQuant::Nvfp4, None);
        assert!(check_known_incompatibilities(FAKE, &adv, 97).is_err());
    }

    #[test]
    fn gguf_profile_passes_all_guards() {
        // GGUF is neither bnb (Guard 1) nor under-construction NVFP4
        // (Guard 0) nor fp8-class (Guard 2 CFG) nor nvfp4 (Guard 3
        // frame ceiling). The rtx50-gguf profile with its defaults —
        // and even with sequential offload + high CFG + long segments
        // — must pass cleanly. Regression guard for the G-A wiring.
        const GGUF: &str = "nexus.video.ltx23.rtx50-gguf";
        let dflt = advanced(OffloadMode::Auto, ModelQuant::None, None);
        assert!(check_known_incompatibilities(GGUF, &dflt, 97).is_ok());
        let explicit = advanced(OffloadMode::Sequential, ModelQuant::Gguf, Some(8.0));
        assert!(
            check_known_incompatibilities(GGUF, &explicit, 200).is_ok(),
            "gguf must not trip the bnb/fp8/nvfp4 guards"
        );
    }

    #[test]
    fn explicit_int8_plus_sequential_is_blocked() {
        // DEFECT 1 regression guard: INT8 also loads via bnb
        // meta-device dispatch, so int8+sequential crashes identically
        // to nf4+sequential. Must be blocked at plan time.
        let adv = advanced(OffloadMode::Sequential, ModelQuant::Int8, None);
        let err =
            check_known_incompatibilities(FP8, &adv, 97).expect_err("int8+sequential must block");
        assert!(matches!(err, ExtensionError::InvalidRequest(m)
            if m.contains("quant_bnb_sequential_unsupported")));
    }

    #[test]
    fn int8_plus_model_offload_is_allowed() {
        let adv = advanced(OffloadMode::Model, ModelQuant::Int8, None);
        assert!(check_known_incompatibilities(FP8, &adv, 97).is_ok());
    }

    #[test]
    fn nf4_plus_model_offload_is_allowed() {
        // The safe default path: nvfp4 → nf4 + model offload.
        let adv = advanced(OffloadMode::Model, ModelQuant::None, None);
        assert!(check_known_incompatibilities(NVFP4, &adv, 97).is_ok());
    }

    #[test]
    fn nvfp4_auto_offload_default_is_allowed() {
        // Auto on nvfp4 resolves to Model (not Sequential) → safe.
        let adv = advanced(OffloadMode::Auto, ModelQuant::None, None);
        assert!(check_known_incompatibilities(NVFP4, &adv, 97).is_ok());
    }

    #[test]
    fn fp8_guidance_above_ceiling_blocked() {
        let adv = advanced(OffloadMode::Auto, ModelQuant::None, Some(6.0));
        let err =
            check_known_incompatibilities(FP8, &adv, 97).expect_err("fp8 + cfg>5.5 must block");
        assert!(matches!(err, ExtensionError::InvalidRequest(m)
            if m.contains("fp8_guidance_too_high")));
    }

    #[test]
    fn fp8_guidance_at_ceiling_allowed() {
        let adv = advanced(OffloadMode::Auto, ModelQuant::None, Some(5.5));
        assert!(check_known_incompatibilities(FP8, &adv, 97).is_ok());
    }

    #[test]
    fn fp8_default_guidance_allowed() {
        // None → 4.0 default, well under the 5.5 ceiling.
        let adv = advanced(OffloadMode::Auto, ModelQuant::None, None);
        assert!(check_known_incompatibilities(FP8, &adv, 97).is_ok());
    }

    #[test]
    fn fake_profile_exempt_from_fp8_guidance_guard() {
        // fake/CI has no FP8 kernels — high CFG is fine there.
        let adv = advanced(OffloadMode::Auto, ModelQuant::None, Some(9.0));
        assert!(check_known_incompatibilities(FAKE, &adv, 999).is_ok());
    }

    #[test]
    fn nvfp4_segment_over_121_frames_blocked() {
        let adv = advanced(OffloadMode::Model, ModelQuant::None, None);
        let err = check_known_incompatibilities(NVFP4, &adv, 122)
            .expect_err("nvfp4 + >121 frames must block");
        assert!(matches!(err, ExtensionError::InvalidRequest(m)
            if m.contains("nvfp4_segment_too_long")));
    }

    #[test]
    fn nvfp4_segment_at_121_frames_allowed() {
        let adv = advanced(OffloadMode::Model, ModelQuant::None, None);
        assert!(check_known_incompatibilities(NVFP4, &adv, 121).is_ok());
    }

    #[test]
    fn fp8_long_segment_allowed_only_nvfp4_frame_capped() {
        // The 121-frame ceiling is NVFP4-specific; plain FP8 is exempt.
        let adv = advanced(OffloadMode::Auto, ModelQuant::None, None);
        assert!(check_known_incompatibilities(FP8, &adv, 200).is_ok());
    }

    #[test]
    fn first_offending_combo_is_reported() {
        // nf4+sequential AND cfg>5.5 both true → guard 1 wins (single
        // cause, most actionable: the crash beats the quality bug).
        let adv = advanced(OffloadMode::Sequential, ModelQuant::Nf4Bnb, Some(8.0));
        let err = check_known_incompatibilities(NVFP4, &adv, 200).expect_err("must block");
        assert!(matches!(err, ExtensionError::InvalidRequest(m)
            if m.contains("quant_bnb_sequential_unsupported")
            && !m.contains("fp8_guidance_too_high")));
    }

    #[test]
    fn future_nvfp4_profile_is_covered_by_guards_2_and_3() {
        // DEFECT 2 regression guard: a hypothetical 2nd NVFP4 profile
        // must be picked up by the FP8 guidance guard AND the NVFP4
        // frame-count guard with ZERO code changes — proving the
        // single-source `is_*_family` predicates, not slug literals,
        // drive classification.
        const FUTURE: &str = "nexus.video.ltx23.rtx60-nvfp4";
        let hi_cfg = advanced(OffloadMode::Model, ModelQuant::None, Some(7.0));
        assert!(
            check_known_incompatibilities(FUTURE, &hi_cfg, 97).is_err(),
            "future nvfp4 profile must still hit the FP8 guidance guard"
        );
        let long = advanced(OffloadMode::Model, ModelQuant::None, None);
        assert!(
            check_known_incompatibilities(FUTURE, &long, 200).is_err(),
            "future nvfp4 profile must still hit the 121-frame guard"
        );
    }

    #[test]
    fn future_fp8_profile_is_covered_by_guidance_guard() {
        const FUTURE_FP8: &str = "nexus.video.ltx23.rtx60-fp8";
        let hi_cfg = advanced(OffloadMode::Auto, ModelQuant::None, Some(7.0));
        assert!(
            check_known_incompatibilities(FUTURE_FP8, &hi_cfg, 97).is_err(),
            "future fp8 profile must still hit the FP8 guidance guard"
        );
        // ...but NOT the NVFP4-only frame guard.
        let long = advanced(OffloadMode::Auto, ModelQuant::None, None);
        assert!(check_known_incompatibilities(FUTURE_FP8, &long, 300).is_ok());
    }
}
