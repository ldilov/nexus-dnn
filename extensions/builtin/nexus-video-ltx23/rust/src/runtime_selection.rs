use crate::schemas::{ComponentPlacement, DevicePreference, OffloadMode, RuntimeProfilePreference};

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
/// - `rtx50-nvfp4`: FP4 weights ~11 GB on a 16 GB Blackwell card; fits
///   resident with headroom for activations + VAE + text encoder.
///   `None` is the right default; operators can downgrade to `Model`
///   if they're tight on VRAM.
/// - `rtx50-fp8` / `rtx40-fp8`: FP8 weights ~14 GB. `model_cpu_offload`
///   was documented to spill to unified memory on RTX 5070 Ti; until
///   a fresh benchmark proves `Model` fits cleanly, default
///   `Sequential` and let operators opt up.
/// - `fake` / unknown: `Sequential` is the safest mode.
#[must_use]
pub const fn default_offload_mode_for_profile(profile: &str) -> OffloadMode {
    match profile.as_bytes() {
        b"rtx50-nvfp4" => OffloadMode::None,
        _ => OffloadMode::Sequential,
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

/// Compose an explicit per-component override on top of an
/// `OffloadMode`-implied placement.
///
/// Any field that the operator left as `Auto` falls through to the
/// implied placement; any explicit `Cuda` / `Cpu` field overrides.
/// Result is always fully concrete — every field is `Cuda` or `Cpu`.
#[must_use]
pub const fn resolve_component_placement(
    base_mode: OffloadMode,
    override_triple: ComponentPlacement,
) -> ComponentPlacement {
    let implied = placement_for_offload_mode(base_mode);
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
    fn resolve_component_placement_passes_through_when_all_auto() {
        // Operator left every field at default Auto — implied placement
        // from the offload mode propagates verbatim.
        let resolved = resolve_component_placement(
            OffloadMode::None,
            ComponentPlacement::default(),
        );
        assert_eq!(resolved, placement_for_offload_mode(OffloadMode::None));
    }

    #[test]
    fn resolve_component_placement_lets_explicit_overrides_win() {
        // Operator pinned text_encoder to CPU on a None-mode pipeline
        // (the recommended nvfp4-on-16GB shape — keep T5 off the GPU).
        let resolved = resolve_component_placement(
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
                transformer: DevicePreference::Cuda, // from implied
                vae: DevicePreference::Cuda,         // from implied
                text_encoder: DevicePreference::Cpu, // explicit override
            }
        );
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
        // NVFP4 weights fit resident on a 16 GB Blackwell card with
        // headroom — None is the right default. Every other profile
        // (including unknowns) falls through to the safest mode.
        assert_eq!(
            default_offload_mode_for_profile("rtx50-nvfp4"),
            OffloadMode::None
        );
        assert_eq!(
            default_offload_mode_for_profile("rtx50-fp8"),
            OffloadMode::Sequential
        );
        assert_eq!(
            default_offload_mode_for_profile("rtx40-fp8"),
            OffloadMode::Sequential
        );
        assert_eq!(
            default_offload_mode_for_profile("fake"),
            OffloadMode::Sequential
        );
        assert_eq!(
            default_offload_mode_for_profile("future-profile-xyz"),
            OffloadMode::Sequential
        );
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
