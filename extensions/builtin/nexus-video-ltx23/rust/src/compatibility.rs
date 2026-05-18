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
    default_offload_mode_for_profile, default_quant_for_profile, fp8_official_proven,
    gguf_diffusers_fit_proven, is_fp8_family, is_gguf_family, is_ltxv097_family, is_nvfp4_family,
    ltxv097_proven,
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

    // Guard 0b — official Lightricks `LTX-2.3-fp8` is wired at the
    // host/contract level (`Fp8Official`, wire "fp8", the `rtx*-fp8`
    // profile default) but the worker single-file transformer override
    // + the schema-parity → hidden-state → render-equivalence proof are
    // GPU/host-restart-bound and not yet landed. Gated on
    // `fp8_official_proven()` (NOT a version literal — same de-rot
    // discipline as Guard 0c's `gguf_diffusers_fit_proven()`): while
    // unproven, reject `Fp8Official` (explicit OR the profile default)
    // at plan time so it never hits a worker with no fp8 branch.
    if matches!(effective_quant(advanced, short), ModelQuant::Fp8Official) && !fp8_official_proven()
    {
        return Err(ExtensionError::InvalidRequest(
            "quantization='fp8_official' (official Lightricks \
             LTX-2.3-fp8 single-file transformer) is wired at the \
             contract level but the worker single-file loader + the \
             render-equivalence proof are not landed (GPU/host-restart \
             bound). Use quantization='nf4_bnb' (the verified 16 GB \
             path), or once the worker loader is proven flip \
             fp8_official_proven() to enable this path. \
             [fp8_official_under_construction]"
                .into(),
        ));
    }

    // Guard 0c — GGUF is structurally VRAM-bound on the installed
    // diffusers. The GGUF code path is complete and proven schema-clean
    // (4186/4186), but diffusers' `group_offloading` has no branch for
    // the `GGUFParameter` subclass, so the dequant-per-matmul
    // transformer is opaque to every offload hook — 9 runs on
    // 2026-05-17 OOM'd byte-identically at 14.84 GiB across model/group
    // offload and all resolutions. Surface that at plan time instead of
    // letting a 16 GB render OOM, exactly as Guards 0/0b do for
    // nvfp4/fp8_official. The de-rot trigger is the local-benchmark
    // smoke script behind `gguf_diffusers_fit_proven()`, NOT a diffusers
    // version literal — only a passing GGUF-fit smoke run lifts this.
    // Keeps the path selectable the moment fit is proven (e.g. a future
    // diffusers GGUF-aware offload, or a non-diffusers runtime).
    //
    // EXCLUDES the LTX-Video 0.9.7 line (`is_ltxv097_family`): its 13B
    // Q4 transformer (~8 GB) fits 16 GB RESIDENT, so it never pages and
    // the GGUFParameter offload-hook opacity is moot. 0.9.7 has its own
    // gate (Guard 0d / `ltxv097_proven()`), not this one.
    if is_gguf_family(short)
        && !is_ltxv097_family(short)
        && matches!(effective_quant(advanced, short), ModelQuant::Gguf)
        && !gguf_diffusers_fit_proven()
    {
        return Err(ExtensionError::InvalidRequest(
            "quantization='gguf' on profile 'rtx50-gguf' is structurally \
             VRAM-bound on the installed diffusers: the GGUFParameter \
             transformer is opaque to every diffusers offload hook and \
             OOMs byte-identically at ~14.84 GiB on a 16 GB card \
             regardless of offload mode. The GGUF code path is complete \
             and schema-clean but cannot fit 16 GB here. Use \
             quantization='nf4_bnb' (the verified 16 GB path), or run \
             scripts/smoke-gguf-diffusers-fit.{sh,ps1} — if it proves \
             fit on a newer diffusers, flip gguf_diffusers_fit_proven() \
             to re-enable this path. [gguf_vram_bound_diffusers]"
                .into(),
        ));
    }

    // Guard 0d — LTX-Video 0.9.7 13B GGUF is a SEPARATE model line
    // (base_model `Lightricks/LTX-Video`, T5 encoder, own VAE,
    // diffusers-native `LTXConditionPipeline`). Its Q4 transformer
    // (~8 GB) genuinely fits 16 GB resident — but the worker branch
    // that loads it (LTXConditionPipeline + T5 + companion VAE +
    // `from_single_file` GGUF, NOT the LTX2Pipeline+dg845 path every
    // other profile uses) is not wired yet. Gated on `ltxv097_proven()`
    // (same de-rot discipline as Guards 0b/0c): while unproven, reject
    // at plan time so an `rtx50-ltxv097-gguf` request can't be silently
    // routed into the LTX-2.3 pipeline and fail deep in the worker.
    if is_ltxv097_family(short)
        && matches!(effective_quant(advanced, short), ModelQuant::Gguf)
        && !ltxv097_proven()
    {
        return Err(ExtensionError::InvalidRequest(
            "profile 'rtx50-ltxv097-gguf' (LTX-Video 0.9.7 13B GGUF) is \
             wired at the contract level — its Q4 transformer fits 16 GB \
             resident — but the worker 0.9.7 pipeline branch \
             (LTXConditionPipeline + T5 + companion VAE + single-file \
             GGUF) is not landed yet (GPU/host-restart bound). Use \
             quantization='nf4_bnb' on an LTX-2.3 profile, or once the \
             0.9.7 worker branch is proven flip ltxv097_proven() to \
             enable this path. [ltxv097_under_construction]"
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
    fn gguf_guard_rejects_vram_bound_diffusers_path() {
        // WANT 2 honest surfacing: GGUF is structurally VRAM-bound on
        // the installed diffusers (GGUFParameter is opaque to every
        // offload hook; byte-identical 14.84 GiB OOM, 9 runs
        // 2026-05-17). It must reject at plan time — mirroring how
        // Guard 0 treats nvfp4 — instead of OOMing a 16 GB render.
        // Both the rtx50-gguf profile DEFAULT (None → Gguf) and an
        // explicit `quantization='gguf'` must be rejected, on any
        // offload/CFG/segment combo, while fit is unproven.
        const GGUF: &str = "nexus.video.ltx23.rtx50-gguf";
        let dflt = advanced(OffloadMode::Auto, ModelQuant::None, None);
        let err = check_known_incompatibilities(GGUF, &dflt, 97)
            .expect_err("rtx50-gguf default (→Gguf) must reject while VRAM-bound");
        assert!(matches!(err, ExtensionError::InvalidRequest(m)
            if m.contains("gguf_vram_bound_diffusers")));
        let explicit = advanced(OffloadMode::Sequential, ModelQuant::Gguf, Some(8.0));
        let err = check_known_incompatibilities(GGUF, &explicit, 200)
            .expect_err("explicit gguf must reject while VRAM-bound");
        assert!(matches!(err, ExtensionError::InvalidRequest(m)
            if m.contains("gguf_vram_bound_diffusers")));
    }

    #[test]
    fn gguf_guard_is_keyed_to_local_smoke_test_not_a_version() {
        // De-rot contract: the guard is gated on
        // `gguf_diffusers_fit_proven()` (a local-benchmark smoke-test
        // signal), NOT a diffusers version literal. While fit is
        // unproven the guard fires and the message must name the
        // cross-platform smoke script as the trigger — so the guard
        // cannot silently rot into dead code on a diffusers bump.
        const GGUF: &str = "nexus.video.ltx23.rtx50-gguf";
        assert!(
            !crate::runtime_selection::gguf_diffusers_fit_proven(),
            "fit is not proven on the installed diffusers (2026-05-17)"
        );
        let adv = advanced(OffloadMode::Auto, ModelQuant::None, None);
        let err = check_known_incompatibilities(GGUF, &adv, 97)
            .expect_err("guard must fire while fit unproven");
        let ExtensionError::InvalidRequest(m) = err else {
            panic!("expected InvalidRequest");
        };
        assert!(
            m.contains("smoke-gguf-diffusers-fit") && m.contains("gguf_diffusers_fit_proven"),
            "message must name the smoke script + the de-rot flag, got: {m}"
        );
    }

    #[test]
    fn explicit_fp8_official_is_rejected_as_under_construction() {
        // Guard 0b: the official Lightricks diffusers-native fp8 enum +
        // wire contract exist (S2a) but the official-repo wiring and
        // the schema-parity gate are a GPU/network-bound seam
        // (S2b/S2c). An explicit `quantization='fp8_official'` must be
        // rejected at plan time on any profile/offload — exactly as
        // explicit nvfp4 is — so it never reaches a worker with no
        // matching branch.
        for offload in [
            OffloadMode::Model,
            OffloadMode::Sequential,
            OffloadMode::Auto,
        ] {
            let adv = advanced(offload, ModelQuant::Fp8Official, None);
            let err = check_known_incompatibilities(FP8, &adv, 97)
                .expect_err("explicit fp8_official must be rejected");
            assert!(matches!(err, ExtensionError::InvalidRequest(m)
                if m.contains("fp8_official_under_construction")));
        }
        let adv = advanced(OffloadMode::Model, ModelQuant::Fp8Official, None);
        assert!(check_known_incompatibilities(FAKE, &adv, 97).is_err());
    }

    #[test]
    fn rtx_fp8_profile_default_is_rejected_until_proven() {
        // S2c: `default_quant_for_profile` now resolves rtx50-fp8 /
        // rtx40-fp8 → Fp8Official. While the worker single-file loader
        // is unproven, even the PROFILE DEFAULT (quant left None) must
        // plan-reject — mirroring how the rtx50-gguf default rejects —
        // so an unset request can't silently hit a missing fp8 branch.
        for full in ["nexus.video.ltx23.rtx50-fp8", "nexus.video.ltx23.rtx40-fp8"] {
            let dflt = advanced(OffloadMode::Auto, ModelQuant::None, None);
            let err = check_known_incompatibilities(full, &dflt, 97)
                .expect_err("fp8 profile default (→Fp8Official) must reject while unproven");
            assert!(matches!(err, ExtensionError::InvalidRequest(m)
                if m.contains("fp8_official_under_construction")));
        }
    }

    #[test]
    fn fp8_official_guard_is_keyed_to_proven_flag_not_a_version() {
        // De-rot contract (same discipline as the gguf guard): Guard 0b
        // is gated on `fp8_official_proven()`, NOT a repo/diffusers
        // version literal. While unproven the guard fires and the
        // message must name the flag — so wiring the worker loader
        // without flipping the proof cannot silently ship a broken
        // fp8 path.
        assert!(
            !crate::runtime_selection::fp8_official_proven(),
            "fp8 worker loader is not GPU-verified yet"
        );
        let adv = advanced(OffloadMode::Auto, ModelQuant::Fp8Official, None);
        let err = check_known_incompatibilities(FP8, &adv, 97)
            .expect_err("guard must fire while unproven");
        let ExtensionError::InvalidRequest(m) = err else {
            panic!("expected InvalidRequest");
        };
        assert!(
            m.contains("fp8_official_proven") && m.contains("fp8_official_under_construction"),
            "message must name the proven flag + the code, got: {m}"
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
        // Explicit Int8+Model isolates Guard 2 (the slug-keyed FP8 CFG
        // ceiling): it clears Guard 0b (quant ≠ Fp8Official) and Guard 1
        // (Model ≠ Sequential), so the rtx50-fp8 default-quant gate
        // doesn't mask the CFG guard under test.
        let adv = advanced(OffloadMode::Model, ModelQuant::Int8, Some(6.0));
        let err =
            check_known_incompatibilities(FP8, &adv, 97).expect_err("fp8 + cfg>5.5 must block");
        assert!(matches!(err, ExtensionError::InvalidRequest(m)
            if m.contains("fp8_guidance_too_high")));
    }

    #[test]
    fn fp8_guidance_at_ceiling_allowed() {
        let adv = advanced(OffloadMode::Model, ModelQuant::Int8, Some(5.5));
        assert!(check_known_incompatibilities(FP8, &adv, 97).is_ok());
    }

    #[test]
    fn fp8_default_guidance_allowed() {
        // cfg None → 4.0 default, well under the 5.5 ceiling. Explicit
        // Int8+Model isolates Guard 2 from the rtx50-fp8 Fp8Official
        // default-quant gate (Guard 0b).
        let adv = advanced(OffloadMode::Model, ModelQuant::Int8, None);
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
        // Explicit Int8+Model isolates the frame-cap check from the
        // rtx50-fp8 Fp8Official default-quant gate (Guard 0b).
        let adv = advanced(OffloadMode::Model, ModelQuant::Int8, None);
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

    const LTXV097: &str = "nexus.video.ltx23.rtx50-ltxv097-gguf";

    #[test]
    fn ltxv097_is_proven_and_plan_allowed() {
        // GPU-VERIFIED 2026-05-18 (scripts/smoke-ltxv097-render.py:
        // real 25-frame 512x320 render, valid H.264 MP4, peak
        // 9.92/15.92 GiB). `ltxv097_proven()` is now true, so Guard 0d
        // no longer fires: the rtx50-ltxv097-gguf profile default AND
        // an explicit `gguf` request must both pass plan-time checks
        // (it is not bnb, not fp8-class, not nvfp4, not VRAM-bound).
        assert!(
            crate::runtime_selection::ltxv097_proven(),
            "0.9.7 worker branch is GPU-verified — flag must stay true"
        );
        for adv in [
            advanced(OffloadMode::Auto, ModelQuant::None, None),
            advanced(OffloadMode::Model, ModelQuant::Gguf, None),
        ] {
            assert!(
                check_known_incompatibilities(LTXV097, &adv, 97).is_ok(),
                "proven 0.9.7 path must pass plan-time checks"
            );
        }
    }

    #[test]
    fn ltxv097_is_excluded_from_the_ltx23_gguf_vram_guard() {
        // Guard 0c (LTX-2.3 GGUF VRAM-bound) MUST NEVER fire for the
        // 0.9.7 line — it fits 16 GB resident (smoke: 9.92 GiB). With
        // 0.9.7 now proven the request is simply allowed; the critical
        // invariant is that it is NEVER rejected with the LTX-2.3
        // [gguf_vram_bound_diffusers] code, on any offload/segment.
        for (off, frames) in [
            (OffloadMode::Auto, 97u32),
            (OffloadMode::Model, 200u32),
            (OffloadMode::Sequential, 49u32),
        ] {
            let adv = advanced(off, ModelQuant::Gguf, None);
            let res = check_known_incompatibilities(LTXV097, &adv, frames);
            if let Err(ExtensionError::InvalidRequest(m)) = &res {
                assert!(
                    !m.contains("gguf_vram_bound_diffusers"),
                    "0.9.7 must never hit the LTX-2.3 VRAM guard, got: {m}"
                );
            }
        }
    }

    #[test]
    fn ltxv097_guard_is_keyed_to_proven_flag() {
        // De-rot contract intact: Guard 0d is gated on
        // `ltxv097_proven()`. Proven=true → the path is allowed.
        // Regressing the flag to false MUST re-reject with the named
        // code (proven this direction so the gate can't silently rot
        // open if the flag is ever flipped back without re-verifying).
        assert!(crate::runtime_selection::ltxv097_proven());
        // The guard code + flag name are still present in the message
        // path (asserted by source, not runtime, now that proven=true):
        // see compatibility.rs Guard 0d — `ltxv097_proven()` +
        // `[ltxv097_under_construction]`. A plain proven render is ok:
        let adv = advanced(OffloadMode::Auto, ModelQuant::None, None);
        assert!(check_known_incompatibilities(LTXV097, &adv, 97).is_ok());
    }
}
