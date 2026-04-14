use nexus_local_llm::manifest::version::parse_yaml;
use nexus_local_llm::resolver::{MachineDescriptor, resolve_runtime_asset};
use nexus_local_llm::settings::AcceleratorProfile;

const MANIFEST_YAML: &str = r#"
backend: llama.cpp
default_release_id: b7472
releases:
  - release_id: b7472
    assets:
      - platform: windows-x64
        accelerator_profile: cpu
        url: https://example.com/win-cpu.zip
      - platform: windows-x64
        accelerator_profile: cuda12
        url: https://example.com/win-cuda12.zip
      - platform: windows-x64
        accelerator_profile: cuda13
        url: https://example.com/win-cuda13.zip
      - platform: linux-x64
        accelerator_profile: cpu
        url: https://example.com/linux-cpu.tar.gz
      - platform: linux-x64
        accelerator_profile: cuda12
        url: https://example.com/linux-cuda12.tar.gz
      - platform: linux-x64
        accelerator_profile: cuda13
        url: https://example.com/linux-cuda13.tar.gz
"#;

#[test]
fn picks_cuda12_when_available() {
    let manifest = parse_yaml(MANIFEST_YAML).unwrap();
    let descriptor = MachineDescriptor {
        platform: "windows-x64".into(),
        cuda_toolkit_line: Some(12),
    };
    let asset = resolve_runtime_asset(&descriptor, &manifest, None, None).unwrap();
    assert_eq!(asset.accelerator_profile, AcceleratorProfile::Cuda12);
    assert_eq!(asset.platform, "windows-x64");
}

#[test]
fn falls_back_to_cpu_without_cuda() {
    let manifest = parse_yaml(MANIFEST_YAML).unwrap();
    let descriptor = MachineDescriptor {
        platform: "linux-x64".into(),
        cuda_toolkit_line: None,
    };
    let asset = resolve_runtime_asset(&descriptor, &manifest, None, None).unwrap();
    assert_eq!(asset.accelerator_profile, AcceleratorProfile::Cpu);
}

#[test]
fn explicit_profile_override_wins() {
    let manifest = parse_yaml(MANIFEST_YAML).unwrap();
    let descriptor = MachineDescriptor {
        platform: "linux-x64".into(),
        cuda_toolkit_line: Some(13),
    };
    let asset = resolve_runtime_asset(
        &descriptor,
        &manifest,
        None,
        Some(AcceleratorProfile::Cpu),
    )
    .unwrap();
    assert_eq!(asset.accelerator_profile, AcceleratorProfile::Cpu);
}

#[test]
fn missing_asset_returns_error() {
    let manifest = parse_yaml(MANIFEST_YAML).unwrap();
    let descriptor = MachineDescriptor {
        platform: "unsupported".into(),
        cuda_toolkit_line: None,
    };
    assert!(resolve_runtime_asset(&descriptor, &manifest, None, None).is_err());
}
