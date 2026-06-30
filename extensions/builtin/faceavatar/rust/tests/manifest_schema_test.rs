use std::path::Path;

use nexus_extension::{parse_manifest, validate_manifest_schema, ExtensionManifest};

fn manifest_path() -> std::path::PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("..")
        .join("manifest.yaml")
}

fn load() -> ExtensionManifest {
    parse_manifest(&manifest_path()).expect("manifest deserializes against host ExtensionManifest")
}

#[test]
fn manifest_passes_discovery_json_schema_gate() {
    let yaml = std::fs::read_to_string(manifest_path()).expect("read manifest");
    let value: serde_json::Value =
        serde_yaml::from_str(&yaml).expect("manifest yaml parses to json value");
    validate_manifest_schema(&value).expect("manifest passes the extension-manifest.json gate");
}

#[test]
fn manifest_deserializes_against_host_schema() {
    let m = load();
    assert_eq!(m.spec_version, "0.1");
    assert_eq!(m.extension.id, "nexus.3d.faceavatar");
}

#[test]
fn manifest_has_dependency_steps_block() {
    let m = load();
    let deps = m.dependencies.expect("dependencies block present");
    let ids: Vec<&str> = deps.steps.iter().map(|s| s.id.as_str()).collect();
    for required in ["python", "pkgs", "validate"] {
        assert!(ids.contains(&required), "missing dependency step: {required}");
    }
    let validate = deps
        .steps
        .iter()
        .find(|s| s.id == "validate")
        .expect("validate step");
    assert_eq!(validate.step_type, "validation");
}

#[test]
fn manifest_has_capabilities() {
    let m = load();
    let caps = m.capabilities.expect("capabilities present");
    for required in [
        "gpu.compute",
        "huggingface.install",
        "model.registry.read",
        "storage.schema_contribute",
    ] {
        assert!(
            caps.iter().any(|c| c == required),
            "missing capability: {required}"
        );
    }
}

#[test]
fn manifest_has_frozen_backend_runtimes() {
    let m = load();
    let ids: Vec<&str> = m
        .backend_runtimes
        .iter()
        .map(|r| r.runtime_id.as_str())
        .collect();
    assert!(ids.contains(&"nexus.3d.faceavatar.gb10-flash"));
    assert!(ids.contains(&"nexus.3d.faceavatar.fake"));
    for rt in &m.backend_runtimes {
        assert_eq!(rt.family, "python");
        assert_eq!(rt.transport, "stdio");
        assert!(
            rt.supported_roles.iter().any(|r| r == "mesh.generate"),
            "backend {} must support mesh.generate",
            rt.runtime_id
        );
    }
}

#[test]
fn manifest_has_storage_block_with_frozen_alias() {
    let m = load();
    let storage = m.storage.expect("storage contribution present");
    let json = serde_json::to_value(&storage).expect("storage serializes");
    assert_eq!(json["namespace"]["alias"], "trellis2");
    assert_eq!(json["namespace"]["prefix_mode"], "host_derived");
}
