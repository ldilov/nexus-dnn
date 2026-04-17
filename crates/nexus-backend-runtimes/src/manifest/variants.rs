//! Pure projection of [`VersionManifest`] assets into per-variant rows for
//! the Backends UI picker. Keeps the handler a thin pass-through: the
//! machine-detection policy (which accelerator is "recommended") lives here
//! and is unit-testable without the axum state.

use serde::{Deserialize, Serialize};

use crate::manifest::version::{Release, ReleaseAsset, VersionManifest};
use crate::resolver::MachineDescriptor;
use crate::settings::AcceleratorProfile;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[non_exhaustive]
pub struct BackendVariant {
    pub release_id: String,
    pub platform: String,
    pub accelerator_profile: AcceleratorProfile,
    pub label: String,
    pub recommended: bool,
    pub supported: bool,
    pub disabled_reason: Option<String>,
    pub size_bytes: Option<u64>,
    pub checksum_sha256: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[non_exhaustive]
pub struct BackendVariantCatalog {
    pub variants: Vec<BackendVariant>,
    pub recommended_release_id: Option<String>,
}

pub fn project_variants(
    manifest: &VersionManifest,
    machine: &MachineDescriptor,
) -> BackendVariantCatalog {
    let preferred_release = manifest
        .default_release_id
        .clone()
        .or_else(|| manifest.releases.first().map(|r| r.release_id.clone()));
    let preferred_profile = machine.preferred_profile();
    let supported_profiles = machine.supported_profiles();

    let mut variants = Vec::new();
    for release in &manifest.releases {
        for asset in &release.assets {
            variants.push(build_variant(
                release,
                asset,
                machine,
                &supported_profiles,
                preferred_release.as_deref(),
                preferred_profile,
            ));
        }
    }

    let recommended_release_id = variants
        .iter()
        .find(|v| v.recommended)
        .map(|v| v.release_id.clone())
        .or(preferred_release);

    BackendVariantCatalog {
        variants,
        recommended_release_id,
    }
}

fn build_variant(
    release: &Release,
    asset: &ReleaseAsset,
    machine: &MachineDescriptor,
    supported_profiles: &[AcceleratorProfile],
    preferred_release_id: Option<&str>,
    preferred_profile: AcceleratorProfile,
) -> BackendVariant {
    let label = format!(
        "{} · {} · {}",
        release.release_id,
        asset.platform,
        asset.accelerator_profile.as_wire()
    );
    let platform_match = asset.platform == machine.platform;
    let profile_match = supported_profiles.contains(&asset.accelerator_profile);
    let supported = platform_match && profile_match;
    let disabled_reason = if !platform_match {
        Some(format!(
            "This machine is {} — variant targets {}",
            machine.platform, asset.platform
        ))
    } else if !profile_match {
        Some(match asset.accelerator_profile {
            AcceleratorProfile::Cuda12 => "No CUDA 12 toolkit detected on this machine".into(),
            AcceleratorProfile::Cuda13 => "No CUDA 13 toolkit detected on this machine".into(),
            AcceleratorProfile::Cpu => "CPU variant is always supported".into(),
        })
    } else {
        None
    };

    let recommended = supported
        && asset.accelerator_profile == preferred_profile
        && preferred_release_id
            .map(|rid| rid == release.release_id)
            .unwrap_or(true);

    BackendVariant {
        release_id: release.release_id.clone(),
        platform: asset.platform.clone(),
        accelerator_profile: asset.accelerator_profile,
        label,
        recommended,
        supported,
        disabled_reason,
        size_bytes: asset.size_bytes,
        checksum_sha256: asset.checksum_sha256.clone(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::manifest::version::{ArchiveKind, Release, ReleaseAsset, VersionManifest};

    fn asset(platform: &str, profile: AcceleratorProfile) -> ReleaseAsset {
        ReleaseAsset {
            platform: platform.into(),
            accelerator_profile: profile,
            url: format!("https://example/{platform}-{}.zip", profile.as_wire()),
            archive_kind: Some(ArchiveKind::Zip),
            checksum_sha256: Some("deadbeef".into()),
            size_bytes: Some(1_000_000),
            binary_relpath: None,
        }
    }

    fn sample_manifest() -> VersionManifest {
        VersionManifest {
            backend: "llama.cpp".into(),
            default_release_id: Some("b6859".into()),
            releases: vec![Release {
                release_id: "b6859".into(),
                release_notes_url: None,
                assets: vec![
                    asset("windows-x64", AcceleratorProfile::Cpu),
                    asset("windows-x64", AcceleratorProfile::Cuda12),
                    asset("windows-x64", AcceleratorProfile::Cuda13),
                    asset("linux-x64", AcceleratorProfile::Cpu),
                ],
            }],
        }
    }

    #[test]
    fn recommends_cuda12_on_cuda12_machine() {
        let machine = MachineDescriptor {
            platform: "windows-x64".into(),
            cuda_toolkit_line: Some(12),
        };
        let catalog = project_variants(&sample_manifest(), &machine);

        assert_eq!(catalog.recommended_release_id.as_deref(), Some("b6859"));
        let recommended = catalog
            .variants
            .iter()
            .filter(|v| v.recommended)
            .collect::<Vec<_>>();
        assert_eq!(recommended.len(), 1);
        assert_eq!(
            recommended[0].accelerator_profile,
            AcceleratorProfile::Cuda12
        );
        assert_eq!(recommended[0].platform, "windows-x64");
    }

    #[test]
    fn marks_other_platform_unsupported_with_reason() {
        let machine = MachineDescriptor {
            platform: "windows-x64".into(),
            cuda_toolkit_line: None,
        };
        let catalog = project_variants(&sample_manifest(), &machine);
        let linux_row = catalog
            .variants
            .iter()
            .find(|v| v.platform == "linux-x64")
            .unwrap();
        assert!(!linux_row.supported);
        assert!(
            linux_row
                .disabled_reason
                .as_deref()
                .unwrap()
                .contains("windows-x64")
        );
    }

    #[test]
    fn no_gpu_machine_only_recommends_cpu() {
        let machine = MachineDescriptor {
            platform: "linux-x64".into(),
            cuda_toolkit_line: None,
        };
        let catalog = project_variants(&sample_manifest(), &machine);
        let recommended = catalog
            .variants
            .iter()
            .filter(|v| v.recommended)
            .collect::<Vec<_>>();
        assert_eq!(recommended.len(), 1);
        assert_eq!(recommended[0].accelerator_profile, AcceleratorProfile::Cpu);
        assert_eq!(recommended[0].platform, "linux-x64");
    }

    #[test]
    fn cuda12_variant_disabled_on_cpu_only_machine() {
        let machine = MachineDescriptor {
            platform: "windows-x64".into(),
            cuda_toolkit_line: None,
        };
        let catalog = project_variants(&sample_manifest(), &machine);
        let cuda_row = catalog
            .variants
            .iter()
            .find(|v| {
                v.platform == "windows-x64" && v.accelerator_profile == AcceleratorProfile::Cuda12
            })
            .unwrap();
        assert!(!cuda_row.supported);
        assert!(
            cuda_row
                .disabled_reason
                .as_deref()
                .unwrap()
                .contains("CUDA 12")
        );
    }

    #[test]
    fn label_matches_card_version_line() {
        let machine = MachineDescriptor {
            platform: "windows-x64".into(),
            cuda_toolkit_line: Some(12),
        };
        let catalog = project_variants(&sample_manifest(), &machine);
        let cpu_row = catalog
            .variants
            .iter()
            .find(|v| {
                v.platform == "windows-x64" && v.accelerator_profile == AcceleratorProfile::Cpu
            })
            .unwrap();
        assert_eq!(cpu_row.label, "b6859 · windows-x64 · cpu");
    }
}
