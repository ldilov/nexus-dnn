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
        let mut out = vec![AcceleratorProfile::Cpu];
        match self.cuda_toolkit_line {
            Some(13) => out.push(AcceleratorProfile::Cuda13),
            Some(12) => out.push(AcceleratorProfile::Cuda12),
            _ => {}
        }
        out
    }

    pub fn preferred_profile(&self) -> AcceleratorProfile {
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
/// the arch handling in `family_python::asset`. `windows` stays `windows-x64`
/// (no win-arm64 runtime path); linux distinguishes `linux-arm64` so aarch64
/// hosts resolve aarch64 assets instead of silently matching x64.
fn host_platform_string() -> String {
    let arch = if cfg!(target_arch = "aarch64") {
        "arm64"
    } else {
        "x64"
    };
    if cfg!(target_os = "windows") {
        "windows-x64".to_string()
    } else if cfg!(target_os = "linux") {
        format!("linux-{arch}")
    } else {
        "unsupported".to_string()
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
    fn host_platform_reflects_compile_target() {
        let platform = host_platform_string();
        #[cfg(all(target_os = "linux", target_arch = "aarch64"))]
        assert_eq!(platform, "linux-arm64");
        #[cfg(all(target_os = "linux", target_arch = "x86_64"))]
        assert_eq!(platform, "linux-x64");
        #[cfg(target_os = "windows")]
        assert_eq!(platform, "windows-x64");
        assert_ne!(platform, "unsupported");
    }
}
