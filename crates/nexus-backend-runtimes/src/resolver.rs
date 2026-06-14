use serde::{Deserialize, Serialize};
use tokio::process::Command;

use crate::error::InstallError;
use crate::manifest::version::{ReleaseAsset, VersionManifest};
use crate::settings::AcceleratorProfile;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct MachineDescriptor {
    pub platform: String,
    pub cuda_toolkit_line: Option<u8>,
}

impl MachineDescriptor {
    pub async fn detect() -> Self {
        let platform = host_platform_string();
        let cuda_toolkit_line = detect_cuda_line().await;
        Self {
            platform,
            cuda_toolkit_line,
        }
    }

    pub fn supported_profiles(&self) -> Vec<AcceleratorProfile> {
        if self.platform == "linux-arm64" {
            // No upstream CUDA arm64 build; the Vulkan GPU build is the
            // accelerated option, CPU the baseline.
            return vec![AcceleratorProfile::Cpu, AcceleratorProfile::Vulkan];
        }
        let mut out = vec![AcceleratorProfile::Cpu];
        match self.cuda_toolkit_line {
            Some(13) => out.push(AcceleratorProfile::Cuda13),
            Some(12) => out.push(AcceleratorProfile::Cuda12),
            _ => {}
        }
        out
    }

    pub fn preferred_profile(&self) -> AcceleratorProfile {
        if self.platform == "linux-arm64" {
            // Prefer the Vulkan GPU build when a GPU/CUDA stack is present
            // (e.g. GB10), else CPU — there is no CUDA arm64 asset to pick.
            return if self.cuda_toolkit_line.is_some() {
                AcceleratorProfile::Vulkan
            } else {
                AcceleratorProfile::Cpu
            };
        }
        match self.cuda_toolkit_line {
            Some(13) => AcceleratorProfile::Cuda13,
            Some(12) => AcceleratorProfile::Cuda12,
            _ => AcceleratorProfile::Cpu,
        }
    }
}

async fn detect_cuda_line() -> Option<u8> {
    if let Ok(output) = Command::new("nvcc").arg("--version").output().await
        && output.status.success()
    {
        let text = String::from_utf8_lossy(&output.stdout);
        if let Some(line) = parse_cuda_line(&text) {
            return Some(line);
        }
    }
    if let Ok(output) = Command::new("nvidia-smi")
        .args(["--query-gpu=driver_version", "--format=csv,noheader"])
        .output()
        .await
        && output.status.success()
    {
        let text = String::from_utf8_lossy(&output.stdout);
        if let Some(driver) = parse_driver_major(&text) {
            return Some(if driver >= 550 { 13 } else { 12 });
        }
    }
    None
}

fn parse_cuda_line(text: &str) -> Option<u8> {
    let marker = text.find("release ")?;
    let tail = &text[marker + "release ".len()..];
    let major = tail.split('.').next()?;
    major.trim().parse::<u8>().ok()
}

fn parse_driver_major(text: &str) -> Option<u32> {
    text.trim().split('.').next()?.trim().parse::<u32>().ok()
}

/// Compile-time host platform tuple in canonical `os-arch` form, mirroring
/// the arch handling in `family_python::asset`.
fn host_platform_string() -> String {
    let os = if cfg!(target_os = "windows") {
        "windows"
    } else if cfg!(target_os = "linux") {
        "linux"
    } else if cfg!(target_os = "macos") {
        "macos"
    } else {
        "other"
    };
    let arch = if cfg!(target_arch = "aarch64") {
        "aarch64"
    } else {
        "x86_64"
    };
    platform_for(os, arch)
}

/// Maps an `(os, arch)` pair to the canonical `os-arch` platform tuple used in
/// version manifests. `windows` is always `windows-x64` (no win-arm64 runtime
/// path); only linux distinguishes `linux-arm64`; anything else is
/// `unsupported`. Pure (no `cfg!`) so it is testable on any build host.
fn platform_for(os: &str, arch: &str) -> String {
    match (os, arch) {
        ("windows", _) => "windows-x64".to_string(),
        ("linux", "aarch64") => "linux-arm64".to_string(),
        ("linux", _) => "linux-x64".to_string(),
        _ => "unsupported".to_string(),
    }
}

pub async fn detect_gpu_compute_cap_major() -> Option<u8> {
    let output = Command::new("nvidia-smi")
        .args(["--query-gpu=compute_cap", "--format=csv,noheader"])
        .output()
        .await
        .ok()?;
    if !output.status.success() {
        return None;
    }
    let text = String::from_utf8_lossy(&output.stdout);
    text.lines()
        .filter_map(|line| line.trim().split('.').next()?.trim().parse::<u8>().ok())
        .max()
}

pub fn resolve_runtime_asset<'a>(
    descriptor: &MachineDescriptor,
    manifest: &'a VersionManifest,
    release_id: Option<&str>,
    profile: Option<AcceleratorProfile>,
) -> Result<&'a ReleaseAsset, InstallError> {
    let release = match release_id {
        Some(r) => manifest
            .releases
            .iter()
            .find(|rel| rel.release_id == r)
            .ok_or_else(|| {
                InstallError::AssetResolution(format!("release {r} not in version manifest"))
            })?,
        None => {
            let default = manifest.default_release_id.as_deref();
            match default {
                Some(r) => manifest
                    .releases
                    .iter()
                    .find(|rel| rel.release_id == r)
                    .ok_or_else(|| {
                        InstallError::AssetResolution(
                            "default_release_id not present in releases".into(),
                        )
                    })?,
                None => manifest.releases.first().ok_or_else(|| {
                    InstallError::AssetResolution("version manifest has no releases".into())
                })?,
            }
        }
    };
    let wanted_profile = profile.unwrap_or_else(|| descriptor.preferred_profile());
    release
        .assets
        .iter()
        .find(|a| a.platform == descriptor.platform && a.accelerator_profile == wanted_profile)
        .ok_or_else(|| {
            InstallError::AssetResolution(format!(
                "no asset for platform {} and profile {}",
                descriptor.platform,
                wanted_profile.as_wire()
            ))
        })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn arm64_prefers_vulkan_when_gpu_present_else_cpu() {
        let gpu = MachineDescriptor {
            platform: "linux-arm64".to_string(),
            cuda_toolkit_line: Some(13),
        };
        assert_eq!(gpu.preferred_profile(), AcceleratorProfile::Vulkan);
        assert!(
            gpu.supported_profiles()
                .contains(&AcceleratorProfile::Vulkan)
        );
        // No CUDA arm64 asset exists — never prefer CUDA on arm64.
        assert!(
            !gpu.supported_profiles()
                .contains(&AcceleratorProfile::Cuda13)
        );

        let no_gpu = MachineDescriptor {
            platform: "linux-arm64".to_string(),
            cuda_toolkit_line: None,
        };
        assert_eq!(no_gpu.preferred_profile(), AcceleratorProfile::Cpu);
    }

    #[test]
    fn platform_for_maps_os_arch() {
        // Host-agnostic: locks the load-bearing "linux-arm64" literal (must
        // match versions.yaml + the manifest platform enums) on every build.
        assert_eq!(platform_for("linux", "aarch64"), "linux-arm64");
        assert_eq!(platform_for("linux", "x86_64"), "linux-x64");
        assert_eq!(platform_for("windows", "x86_64"), "windows-x64");
        assert_eq!(platform_for("windows", "aarch64"), "windows-x64");
        assert_eq!(platform_for("macos", "aarch64"), "unsupported");
        assert_eq!(platform_for("other", "x86_64"), "unsupported");
    }

    #[test]
    fn host_platform_reflects_compile_target() {
        let platform = host_platform_string();
        #[cfg(all(target_os = "linux", target_arch = "aarch64"))]
        assert_eq!(platform, "linux-arm64");
        #[cfg(all(target_os = "linux", target_arch = "x86_64"))]
        assert_eq!(platform, "linux-x64");
        #[cfg(target_os = "windows")]
        assert_eq!(platform, "windows-x64");
    }
}
