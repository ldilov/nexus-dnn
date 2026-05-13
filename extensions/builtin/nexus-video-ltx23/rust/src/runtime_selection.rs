use crate::schemas::RuntimeProfilePreference;

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

/// P1 milestone shortcut: pick a `runtime_id` from a user preference without
/// host GPU facts.
///
/// `Auto` resolves to the fake profile so the recipe works
/// out-of-the-box before real runtimes are installable. Real GPU-aware
/// selection happens via `select_runtime` once the host provides facts.
#[must_use]
pub const fn resolve_runtime_id(
    preference: RuntimeProfilePreference,
    experimental_nvfp4_opt_in: bool,
) -> &'static str {
    match preference {
        RuntimeProfilePreference::Auto => "nexus.video.ltx23.fake",
        RuntimeProfilePreference::Rtx40Fp8 => "nexus.video.ltx23.rtx40-fp8",
        RuntimeProfilePreference::Rtx50Fp8 => "nexus.video.ltx23.rtx50-fp8",
        RuntimeProfilePreference::Rtx50Nvfp4 => {
            if experimental_nvfp4_opt_in {
                "nexus.video.ltx23.rtx50-nvfp4"
            } else {
                "nexus.video.ltx23.rtx50-fp8"
            }
        }
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

    let arch = facts.architecture.as_deref().unwrap_or("").to_ascii_lowercase();
    let is_blackwell = arch.contains("blackwell")
        || facts.compute_capability.is_some_and(|c| c >= 12.0);

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
