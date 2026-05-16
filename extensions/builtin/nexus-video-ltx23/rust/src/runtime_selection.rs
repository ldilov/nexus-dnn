use crate::schemas::{
    ComponentPlacement, DevicePreference, ModelQuant, OffloadMode, RuntimeProfilePreference,
};

#[derive(Debug, Clone, Copy)]
pub struct ProfileDescriptor {
    pub runtime_id: &'static str,
    pub display_name: &'static str,
    pub experimental: bool,
}

const PROFILES: &[ProfileDescriptor] = &[
    ProfileDescriptor {
        runtime_id: "nexus.video.ltx23.fake",
        display_name: "LTX 2.3 Fake (CI / development)",
        experimental: false,
    },
    ProfileDescriptor {
        runtime_id: "nexus.video.ltx23.rtx40-fp8",
        display_name: "LTX 2.3 FP8 (RTX 40 / CUDA 12.x)",
        experimental: false,
    },
    ProfileDescriptor {
        runtime_id: "nexus.video.ltx23.rtx50-fp8",
        display_name: "LTX 2.3 FP8 (RTX 50 / Blackwell)",
        experimental: false,
    },
    ProfileDescriptor {
        runtime_id: "nexus.video.ltx23.rtx50-nvfp4",
        display_name: "LTX 2.3 NVFP4 (RTX 50 / Blackwell, experimental)",
        experimental: true,
    },
];

#[must_use]
pub const fn available_profiles() -> &'static [ProfileDescriptor] {
    PROFILES
}

/// Pick a `runtime_id` from a user preference without host GPU facts.
///
/// `Auto` resolves to the fake profile so the recipe works
/// out-of-the-box before real runtimes are installable. Real GPU-aware
/// selection happens via `select_runtime` once the host provides facts.
///
/// `Rtx50Nvfp4` resolves verbatim to the NVFP4 runtime. The previous
/// experimental opt-in gate that silently downgraded it to FP8 was
/// removed once nvfp4 was validated end-to-end on real hardware
/// (2026-05-15). Profile-install failures now surface as a 503 from
/// the existing install-check, which is the right failure mode.
#[must_use]
pub const fn resolve_runtime_id(preference: RuntimeProfilePreference) -> &'static str {
    match preference {
        RuntimeProfilePreference::Auto => "nexus.video.ltx23.fake",
        RuntimeProfilePreference::Rtx40Fp8 => "nexus.video.ltx23.rtx40-fp8",
        RuntimeProfilePreference::Rtx50Fp8 => "nexus.video.ltx23.rtx50-fp8",
        RuntimeProfilePreference::Rtx50Nvfp4 => "nexus.video.ltx23.rtx50-nvfp4",
    }
}

/// Per-profile default offload mode used to resolve `OffloadMode::Auto`
/// before the payload reaches the worker.
///
/// `profile` is the SHORT slug — e.g. `"rtx50-nvfp4"`, NOT the fully
/// qualified `"nexus.video.ltx23.rtx50-nvfp4"`. Match the existing
/// `short_profile()` helper in `runner.rs`.
///
/// Rationale per profile:
///
/// - `rtx50-nvfp4` → `Model`. This profile's resolved default quant
///   is `Nf4Bnb` (real NVIDIA NVFP4 is host-blocked & under
///   construction — see `default_quant_for_profile`). bitsandbytes
///   loads params via accelerate meta-device dispatch and is
///   fundamentally incompatible with `enable_sequential_cpu_offload`
///   ("Cannot copy out of meta tensor"); the diffusers-supported
///   low-VRAM combo for a bnb pipeline is `enable_model_cpu_offload`,
///   whose NF4 peak (~10 GB largest single component) fits 16 GB.
///   Verified on the RTX 5070 Ti (047 close-out).
/// - Every other profile → `Sequential`. They keep raw bf16 weights
///   (no bnb), so sequential's per-layer paging (~2 GB peak, never
///   touches shared VRAM) is the safe default.
#[must_use]
pub const fn default_offload_mode_for_profile(profile: &str) -> OffloadMode {
    match profile.as_bytes() {
        b"rtx50-nvfp4" => OffloadMode::Model,
        _ => OffloadMode::Sequential,
    }
}

/// Default quantisation per profile.
///
/// `rtx50-nvfp4` → `Nf4Bnb`: the verified-working bitsandbytes-NF4
/// path that fits 16 GB under `enable_model_cpu_offload` (real render
/// confirmed, 047 close-out). Real NVIDIA `ModelOpt` NVFP4
/// (`ModelQuant::Nvfp4`) is **under construction / host-blocked** —
/// NVFP4 layers cannot CPU-offload, diffusers blocks pre-quant cpu
/// `device_map`, and `modelopt_cuda_ext_mx` will not build without a
/// CUDA toolchain on this host (see
/// `checkpoints/2026-05-17-nvfp4-offload-blocker.md`). The `Nvfp4`
/// enum value stays for honest naming + explicit selection, but it is
/// NOT the profile default until those blockers are resolved; an
/// explicit `Nvfp4` request is rejected at plan time
/// (`compatibility.rs` — `[nvfp4_under_construction]`).
///
/// Every other profile → `None`: `fake`/CI has no real weights, and
/// the fp8 profiles' quant story is a separate (unbuilt) path — they
/// keep raw weights until explicitly addressed.
#[must_use]
pub const fn default_quant_for_profile(profile: &str) -> ModelQuant {
    match profile.as_bytes() {
        b"rtx50-nvfp4" => ModelQuant::Nf4Bnb,
        _ => ModelQuant::None,
    }
}

/// Single source of truth: is `profile` an NVFP4 runtime?
///
/// Matches any `*-nvfp4` slug (today only `rtx50-nvfp4`, but a future
/// `rtx60-nvfp4` is covered with ZERO code changes — that is the
/// point). Used by the plan-time compatibility guard for the
/// NVFP4-specific frame-count ceiling and by `is_fp8_family` below.
#[must_use]
pub fn is_nvfp4_family(profile: &str) -> bool {
    profile == "nvfp4" || profile.ends_with("-nvfp4")
}

/// Single source of truth: does `profile` run on FP8-class kernels
/// whose e4m3 activation range saturates at high CFG?
///
/// Every NVFP4 profile (FP8-family activations) plus any `*-fp8`
/// slug. A future `rtx60-fp8` / `rtx60-nvfp4` is covered automatically
/// — there is exactly ONE place to teach the system a new profile's
/// class, here. The plan-time guidance guard and the per-profile
/// frag-ratio ceiling both key off this predicate.
#[must_use]
pub fn is_fp8_family(profile: &str) -> bool {
    is_nvfp4_family(profile) || profile.ends_with("-fp8")
}

/// Per-profile VRAM-supervisor `max_frag_ratio` ceiling.
///
/// `profile` is the SHORT slug (e.g. `"rtx50-nvfp4"`), matching the
/// `short_profile()` helper in `runner.rs` — same convention as the
/// two siblings above.
///
/// Background: the fp8/nvfp4 profiles run under
/// `enable_model_cpu_offload()` / `enable_sequential_cpu_offload()`,
/// which free + reallocate the transformer on every forward. After a
/// *normal, successful* render the CUDA pool is left ~0.99 fragmented
/// by design — `frag_ratio` is `1 - largest_free_block / total_free`
/// and an offloaded pipeline always ends with the pool carved up. So
/// on these profiles `frag_ratio` is not a meaningful OOM predictor
/// and the spec-046 default of 0.30 (measured on the *unoffloaded*
/// dg845 BF16 spike) produces a guaranteed false-positive that aborts
/// otherwise-perfect renders.
///
/// `frag_ratio` is defined on `[0.0, 1.0]`, so a ceiling of `1.0`
/// with the supervisor's strict `frag_ratio > max_frag_ratio` test
/// can never trip — i.e. the frag check is effectively disabled for
/// these profiles, and real trouble is still caught by `num_ooms`,
/// `num_alloc_retries`, and `free_mb` (the actual OOM predictors).
///
/// `fake`/CI + any unknown profile keep the original `0.30` (the fake
/// runtime emits `frag_ratio = 0.0`, and dev/CI wants the tight
/// check). This matches `VramSupervisorConfig::default().max_frag_ratio`.
///
/// An explicit `NEXUS_VIDEO_LTX23_VRAM_MAX_FRAG_RATIO` env override
/// still wins over this per-profile default — see
/// `VramSupervisor::resolve_max_frag_ratio`.
///
/// Keyed off `is_fp8_family` (the single profile-class source) rather
/// than an inline slug enumeration, so a new offloaded profile is
/// covered the moment it is added to `PROFILES` — no risk of this
/// ceiling silently reverting to the false-positive 0.30 for it.
#[must_use]
pub fn default_max_frag_ratio_for_profile(profile: &str) -> f64 {
    if is_fp8_family(profile) {
        1.0
    } else {
        0.30
    }
}

/// Per-component device placement implied by a concrete `OffloadMode`.
///
/// The worker dispatcher uses the placement triple directly when the
/// operator overrode the per-component knobs; otherwise the host
/// resolves `Auto` via this function so the worker still receives
/// concrete strings on the wire.
///
/// Note: for `Model` / `Sequential` the transformer's reported device
/// is `Cpu` because the offload hooks page weights from CPU per
/// forward call. Reporting `Cuda` here would be misleading — even
/// though the hook makes the layer transiently CUDA-resident, the
/// stable storage lives on the CPU.
#[must_use]
pub const fn placement_for_offload_mode(mode: OffloadMode) -> ComponentPlacement {
    match mode {
        // `None`: every component resident on GPU.
        OffloadMode::None => ComponentPlacement {
            transformer: DevicePreference::Cuda,
            vae: DevicePreference::Cuda,
            text_encoder: DevicePreference::Cuda,
        },
        // `Model`: model_cpu_offload pages the transformer's submodules
        // onto GPU one at a time. VAE + text encoder still benefit from
        // being CUDA-resident (one-shot calls).
        OffloadMode::Model => ComponentPlacement {
            transformer: DevicePreference::Cpu,
            vae: DevicePreference::Cuda,
            text_encoder: DevicePreference::Cuda,
        },
        // `Sequential`: every layer paged. Stays on CPU for stable
        // storage; this is the lowest-VRAM mode.
        //
        // `Auto` should not reach this fn — the runner resolves Auto
        // before dispatch — but if it ever does we fall through to
        // Sequential's safe shape rather than panic.
        OffloadMode::Sequential | OffloadMode::Auto => ComponentPlacement {
            transformer: DevicePreference::Cpu,
            vae: DevicePreference::Cpu,
            text_encoder: DevicePreference::Cpu,
        },
    }
}

/// Profile-tuned base placement, before any operator override.
///
/// Every profile now defers to the offload-mode-implied placement.
/// An earlier nvfp4 special-case forced `transformer=cuda, vae=cuda,
/// text_encoder=cpu` to dodge the 22 GB co-residency problem, but
/// real-GPU verification on 2026-05-15 proved that split makes the
/// LTX2 diffusers pipeline raise a cross-device tensor mismatch — it
/// assumes all components live on one device. The correct nvfp4
/// answer is `enable_model_cpu_offload()` (the `Model` offload mode,
/// now the nvfp4 default in `default_offload_mode_for_profile`), whose
/// hooks page submodules on demand and bridge devices automatically.
/// Manual per-component placement remains available as an explicit
/// operator override for power users whose pipeline tolerates it; it
/// is no longer a silent profile default.
#[must_use]
pub const fn default_placement_for_profile(
    _profile: &str,
    base_mode: OffloadMode,
) -> ComponentPlacement {
    placement_for_offload_mode(base_mode)
}

/// Compose an explicit per-component override on top of the
/// profile-tuned base placement.
///
/// Any field the operator left as `Auto` falls through to the profile
/// default; any explicit `Cuda` / `Cpu` field overrides. Result is
/// always fully concrete — every field is `Cuda` or `Cpu`.
#[must_use]
pub const fn resolve_component_placement(
    profile: &str,
    base_mode: OffloadMode,
    override_triple: ComponentPlacement,
) -> ComponentPlacement {
    let implied = default_placement_for_profile(profile, base_mode);
    ComponentPlacement {
        transformer: match override_triple.transformer {
            DevicePreference::Auto => implied.transformer,
            other => other,
        },
        vae: match override_triple.vae {
            DevicePreference::Auto => implied.vae,
            other => other,
        },
        text_encoder: match override_triple.text_encoder {
            DevicePreference::Auto => implied.text_encoder,
            other => other,
        },
    }
}

/// Generic GPU facts the host exposes to extensions.
///
/// The extension never reaches into host crates to compute these — they
/// arrive via the lease / runtime-manager API surface (`nexus-backend-runtimes`).
#[derive(Debug, Clone, Default)]
pub struct HostGpuFacts {
    pub vendor: Option<String>,
    pub architecture: Option<String>,
    pub vram_total_mb: u32,
    pub driver_version: Option<String>,
    pub compute_capability: Option<f32>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct SelectedRuntime {
    pub runtime_id: String,
    pub experimental: bool,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum SelectionError {
    NoCompatibleGpu(String),
    DriverTooOld(String),
    NoCompatibleRuntimeInstalled,
}

/// Map user preference + GPU facts → `runtime_id`, respecting `experimental`
/// opt-in gates.
pub fn select_runtime(
    preference: RuntimeProfilePreference,
    facts: &HostGpuFacts,
    experimental_nvfp4_opt_in: bool,
) -> Result<SelectedRuntime, SelectionError> {
    match preference {
        RuntimeProfilePreference::Rtx40Fp8 => Ok(SelectedRuntime {
            runtime_id: "nexus.video.ltx23.rtx40-fp8".into(),
            experimental: false,
        }),
        RuntimeProfilePreference::Rtx50Fp8 => Ok(SelectedRuntime {
            runtime_id: "nexus.video.ltx23.rtx50-fp8".into(),
            experimental: false,
        }),
        RuntimeProfilePreference::Rtx50Nvfp4 => {
            if !experimental_nvfp4_opt_in {
                return Err(SelectionError::NoCompatibleRuntimeInstalled);
            }
            Ok(SelectedRuntime {
                runtime_id: "nexus.video.ltx23.rtx50-nvfp4".into(),
                experimental: true,
            })
        }
        RuntimeProfilePreference::Auto => auto_select(facts, experimental_nvfp4_opt_in),
    }
}

// Hardware support map for the LTX 2.3 quant variants:
//
//   FP8  tensor cores: Ada (sm_89), Hopper (sm_90), Blackwell (sm_120)
//   NVFP4 tensor cores: Blackwell (sm_120) ONLY
//
// NVFP4 weights CAN be consumed on Ada via runtime dequant (NVFP4 → FP8
// or → BF16) but that requires an inference engine with NVFP4-aware
// kernels for non-Blackwell hardware. diffusers 0.37.x (our current
// engine) does NOT implement that path; TensorRT-LLM does. Until we
// validate the dequant path on real Ada hardware, `auto` selection
// stays conservative: Ada always lands on rtx40-fp8 regardless of opt-in.
//
// Users who want to experiment with NVFP4-on-Ada via an alternative
// engine can override explicitly via `Rtx50Nvfp4 + opt_in=true` — the
// explicit branch above returns the nvfp4 runtime without an Ada gate,
// trusting the user's hardware claim.
fn auto_select(
    facts: &HostGpuFacts,
    experimental_nvfp4_opt_in: bool,
) -> Result<SelectedRuntime, SelectionError> {
    let vendor = facts.vendor.as_deref().unwrap_or("");
    if !vendor.eq_ignore_ascii_case("nvidia") {
        return Err(SelectionError::NoCompatibleGpu(format!(
            "this extension requires an NVIDIA GPU; detected vendor: {vendor:?}"
        )));
    }

    let arch = facts
        .architecture
        .as_deref()
        .unwrap_or("")
        .to_ascii_lowercase();
    let is_blackwell =
        arch.contains("blackwell") || facts.compute_capability.is_some_and(|c| c >= 12.0);

    if is_blackwell && experimental_nvfp4_opt_in {
        return Ok(SelectedRuntime {
            runtime_id: "nexus.video.ltx23.rtx50-nvfp4".into(),
            experimental: true,
        });
    }
    if is_blackwell {
        return Ok(SelectedRuntime {
            runtime_id: "nexus.video.ltx23.rtx50-fp8".into(),
            experimental: false,
        });
    }

    // Ada / Ampere fall through here. NVFP4 dequant on Ada is theoretically
    // viable with a non-diffusers engine but unvalidated; stay on fp8.
    Ok(SelectedRuntime {
        runtime_id: "nexus.video.ltx23.rtx40-fp8".into(),
        experimental: false,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    fn nvidia(arch: &str, cc: f32, vram_mb: u32) -> HostGpuFacts {
        HostGpuFacts {
            vendor: Some("NVIDIA".into()),
            architecture: Some(arch.into()),
            vram_total_mb: vram_mb,
            driver_version: Some("581.10".into()),
            compute_capability: Some(cc),
        }
    }

    #[test]
    fn explicit_rtx40_fp8() {
        let r = select_runtime(
            RuntimeProfilePreference::Rtx40Fp8,
            &nvidia("ada", 8.9, 16384),
            false,
        )
        .unwrap();
        assert_eq!(r.runtime_id, "nexus.video.ltx23.rtx40-fp8");
        assert!(!r.experimental);
    }

    #[test]
    fn explicit_nvfp4_requires_opt_in() {
        let facts = nvidia("blackwell", 12.0, 16384);
        let err = select_runtime(RuntimeProfilePreference::Rtx50Nvfp4, &facts, false);
        assert_eq!(err, Err(SelectionError::NoCompatibleRuntimeInstalled));
        let ok = select_runtime(RuntimeProfilePreference::Rtx50Nvfp4, &facts, true).unwrap();
        assert_eq!(ok.runtime_id, "nexus.video.ltx23.rtx50-nvfp4");
        assert!(ok.experimental);
    }

    #[test]
    fn auto_blackwell_without_opt_in_picks_fp8() {
        let r = select_runtime(
            RuntimeProfilePreference::Auto,
            &nvidia("blackwell", 12.0, 16384),
            false,
        )
        .unwrap();
        assert_eq!(r.runtime_id, "nexus.video.ltx23.rtx50-fp8");
    }

    #[test]
    fn auto_blackwell_with_opt_in_picks_nvfp4() {
        let r = select_runtime(
            RuntimeProfilePreference::Auto,
            &nvidia("blackwell", 12.0, 16384),
            true,
        )
        .unwrap();
        assert_eq!(r.runtime_id, "nexus.video.ltx23.rtx50-nvfp4");
        assert!(r.experimental);
    }

    #[test]
    fn auto_ada_picks_rtx40_fp8() {
        // Even with `experimental_nvfp4_opt_in=true`, auto on Ada stays
        // on the fp8 path — NVFP4 dequant on sm_89 needs an engine
        // (TensorRT-LLM etc.) that we haven't validated yet. Users can
        // still override via explicit Rtx50Nvfp4 if they bring their
        // own runtime.
        let r = select_runtime(
            RuntimeProfilePreference::Auto,
            &nvidia("ada", 8.9, 16384),
            true,
        )
        .unwrap();
        assert_eq!(r.runtime_id, "nexus.video.ltx23.rtx40-fp8");
    }

    #[test]
    fn resolve_explicit_nvfp4_keeps_nvfp4() {
        // The previous experimental opt-in gate that downgraded explicit
        // NVFP4 requests to FP8 was removed once nvfp4 was validated
        // end-to-end on real hardware. An operator asking for NVFP4
        // through the request path now lands on the NVFP4 runtime
        // verbatim; profile-install gaps surface as a 503 from the
        // existing install-check, not a silent substitution.
        assert_eq!(
            resolve_runtime_id(RuntimeProfilePreference::Rtx50Nvfp4),
            "nexus.video.ltx23.rtx50-nvfp4"
        );
    }

    #[test]
    fn resolve_runtime_id_covers_every_preference() {
        for (pref, expected) in [
            (RuntimeProfilePreference::Auto, "nexus.video.ltx23.fake"),
            (
                RuntimeProfilePreference::Rtx40Fp8,
                "nexus.video.ltx23.rtx40-fp8",
            ),
            (
                RuntimeProfilePreference::Rtx50Fp8,
                "nexus.video.ltx23.rtx50-fp8",
            ),
            (
                RuntimeProfilePreference::Rtx50Nvfp4,
                "nexus.video.ltx23.rtx50-nvfp4",
            ),
        ] {
            assert_eq!(resolve_runtime_id(pref), expected, "pref={pref:?}");
        }
    }

    #[test]
    fn placement_for_offload_mode_matches_documented_contract() {
        // `None`: every component lives on cuda — fastest, biggest VRAM
        // budget. Caller picks this only after passing the 16-GB check.
        assert_eq!(
            placement_for_offload_mode(OffloadMode::None),
            ComponentPlacement {
                transformer: DevicePreference::Cuda,
                vae: DevicePreference::Cuda,
                text_encoder: DevicePreference::Cuda,
            }
        );
        // `Model`: model_cpu_offload hook pages the transformer; vae +
        // text encoder still benefit from being cuda-resident.
        assert_eq!(
            placement_for_offload_mode(OffloadMode::Model),
            ComponentPlacement {
                transformer: DevicePreference::Cpu,
                vae: DevicePreference::Cuda,
                text_encoder: DevicePreference::Cuda,
            }
        );
        // `Sequential`: everything paged from CPU per forward call.
        assert_eq!(
            placement_for_offload_mode(OffloadMode::Sequential),
            ComponentPlacement {
                transformer: DevicePreference::Cpu,
                vae: DevicePreference::Cpu,
                text_encoder: DevicePreference::Cpu,
            }
        );
        // `Auto` should not reach this fn but the safe fallback shape
        // matches Sequential — lowest VRAM, no crashes.
        assert_eq!(
            placement_for_offload_mode(OffloadMode::Auto),
            placement_for_offload_mode(OffloadMode::Sequential),
        );
    }

    #[test]
    fn resolve_component_placement_passes_through_when_all_auto_non_nvfp4() {
        // A non-nvfp4 profile under all-Auto falls through to the
        // offload-mode-implied placement verbatim.
        let resolved = resolve_component_placement(
            "rtx50-fp8",
            OffloadMode::None,
            ComponentPlacement::default(),
        );
        assert_eq!(resolved, placement_for_offload_mode(OffloadMode::None));
    }

    #[test]
    fn resolve_component_placement_defers_to_offload_mode_for_all_profiles() {
        // Post-2026-05-15: no profile special-cases placement. nvfp4's
        // 16 GB problem is solved by the Model offload default (set in
        // default_offload_mode_for_profile), not a manual T5-on-cpu
        // split — that split broke the LTX2 pipeline's co-location
        // assumption on real hardware.
        for profile in ["rtx50-nvfp4", "rtx50-fp8", "fake", "unknown-xyz"] {
            for mode in [
                OffloadMode::None,
                OffloadMode::Model,
                OffloadMode::Sequential,
            ] {
                assert_eq!(
                    resolve_component_placement(profile, mode, ComponentPlacement::default()),
                    placement_for_offload_mode(mode),
                    "profile={profile} mode={mode:?}"
                );
            }
        }
    }

    #[test]
    fn resolve_component_placement_lets_explicit_overrides_win() {
        // Operator pins text_encoder to CPU on top of a None-mode
        // pipeline — the explicit field overrides the implied
        // placement; the others fall through.
        let resolved = resolve_component_placement(
            "rtx50-nvfp4",
            OffloadMode::None,
            ComponentPlacement {
                transformer: DevicePreference::Auto,
                vae: DevicePreference::Auto,
                text_encoder: DevicePreference::Cpu,
            },
        );
        assert_eq!(
            resolved,
            ComponentPlacement {
                transformer: DevicePreference::Cuda, // implied by None
                vae: DevicePreference::Cuda,         // implied by None
                text_encoder: DevicePreference::Cpu, // explicit override
            }
        );
    }

    #[test]
    fn default_placement_for_profile_always_defers_to_offload_mode() {
        for profile in ["rtx50-nvfp4", "rtx50-fp8", "fake"] {
            for mode in [
                OffloadMode::None,
                OffloadMode::Model,
                OffloadMode::Sequential,
            ] {
                assert_eq!(
                    default_placement_for_profile(profile, mode),
                    placement_for_offload_mode(mode),
                    "profile={profile} mode={mode:?}"
                );
            }
        }
    }

    #[test]
    fn component_placement_is_fully_auto_iff_default() {
        assert!(ComponentPlacement::default().is_fully_auto());
        assert!(!ComponentPlacement {
            transformer: DevicePreference::Cuda,
            vae: DevicePreference::Auto,
            text_encoder: DevicePreference::Auto,
        }
        .is_fully_auto());
    }

    #[test]
    fn default_offload_mode_per_profile() {
        // nvfp4 is NF4-quantised → Model (bnb is incompatible with
        // sequential offload — meta-tensor copy error; model offload
        // is the diffusers-supported bnb combo and at ~22 GB its
        // ~10 GB peak fits 16 GB). Every other profile keeps raw bf16
        // and uses Sequential (per-layer, ~2 GB peak, no shared VRAM).
        assert_eq!(
            default_offload_mode_for_profile("rtx50-nvfp4"),
            OffloadMode::Model
        );
        for p in ["rtx50-fp8", "rtx40-fp8", "fake", "future-profile-xyz"] {
            assert_eq!(
                default_offload_mode_for_profile(p),
                OffloadMode::Sequential,
                "profile={p}"
            );
        }
    }

    #[test]
    fn default_quant_per_profile() {
        // nvfp4 profile → Nf4Bnb: the verified-working bnb path.
        // Real NVFP4 is host-blocked / under construction (see
        // default_quant_for_profile doc); the profile must keep
        // resolving to the path that actually renders on 16 GB.
        assert_eq!(default_quant_for_profile("rtx50-nvfp4"), ModelQuant::Nf4Bnb);
        for p in ["rtx50-fp8", "rtx40-fp8", "fake", "xyz"] {
            assert_eq!(
                default_quant_for_profile(p),
                ModelQuant::None,
                "profile={p}"
            );
        }
    }

    #[test]
    fn default_max_frag_ratio_per_profile() {
        // fp8/nvfp4 run offloaded and end every healthy render with a
        // ~0.99-fragmented pool by design — the frag check is
        // effectively disabled (ratio <= 1.0, strict `>` test never
        // trips). fake/CI + unknown keep the tight spec-046 0.30
        // (matches VramSupervisorConfig::default().max_frag_ratio).
        for p in ["rtx50-nvfp4", "rtx50-fp8", "rtx40-fp8"] {
            assert!(
                (default_max_frag_ratio_for_profile(p) - 1.0).abs() < f64::EPSILON,
                "profile={p} must disable the frag check"
            );
        }
        for p in ["fake", "future-profile-xyz"] {
            assert!(
                (default_max_frag_ratio_for_profile(p) - 0.30).abs() < f64::EPSILON,
                "profile={p} must keep the tight 0.30 ceiling"
            );
        }
        // Extendability: a future *-fp8 / *-nvfp4 profile inherits the
        // 1.0 ceiling with no code change.
        for p in ["rtx60-nvfp4", "rtx60-fp8"] {
            assert!(
                (default_max_frag_ratio_for_profile(p) - 1.0).abs() < f64::EPSILON,
                "future profile={p} must auto-inherit the disabled frag check"
            );
        }
    }

    #[test]
    fn profile_family_predicates_are_the_single_classification_source() {
        // is_nvfp4_family: any *-nvfp4, today + future.
        assert!(is_nvfp4_family("rtx50-nvfp4"));
        assert!(is_nvfp4_family("rtx60-nvfp4"));
        assert!(is_nvfp4_family("nvfp4"));
        assert!(!is_nvfp4_family("rtx50-fp8"));
        assert!(!is_nvfp4_family("fake"));

        // is_fp8_family: every nvfp4 profile + any *-fp8.
        assert!(is_fp8_family("rtx50-nvfp4"));
        assert!(is_fp8_family("rtx60-nvfp4"));
        assert!(is_fp8_family("rtx40-fp8"));
        assert!(is_fp8_family("rtx50-fp8"));
        assert!(is_fp8_family("rtx60-fp8"));
        assert!(!is_fp8_family("fake"));
        assert!(!is_fp8_family("future-profile-xyz"));
    }

    #[test]
    fn auto_non_nvidia_errors() {
        let facts = HostGpuFacts {
            vendor: Some("AMD".into()),
            architecture: Some("rdna4".into()),
            vram_total_mb: 24576,
            ..Default::default()
        };
        let err = select_runtime(RuntimeProfilePreference::Auto, &facts, false);
        assert!(matches!(err, Err(SelectionError::NoCompatibleGpu(_))));
    }
}
