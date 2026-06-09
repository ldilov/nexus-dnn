use std::path::Path;

use nexus_extension::{ExtensionManifest, parse_manifest, validate_manifest_schema};

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
    assert_eq!(m.extension.id, "nexus.video.svi2-pro");
    assert_eq!(
        m.extension.name.as_deref(),
        Some("SVI 2.0 Pro Video Generator")
    );
}

#[test]
fn manifest_has_dependency_steps_block() {
    let m = load();
    let deps = m.dependencies.expect("dependencies block present");
    let ids: Vec<&str> = deps.steps.iter().map(|s| s.id.as_str()).collect();
    for required in [
        "python", "pkgs", "ffmpeg", "sdcli", "model_wan_base", "model_svi_lora", "validate",
    ] {
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
fn manifest_has_backend_runtimes() {
    let m = load();
    let ids: Vec<&str> = m
        .backend_runtimes
        .iter()
        .map(|r| r.runtime_id.as_str())
        .collect();
    assert!(ids.contains(&"nexus.video.svi2-pro.rtx50-fp8"));
    assert!(ids.contains(&"nexus.video.svi2-pro.fake"));
    for rt in &m.backend_runtimes {
        assert_eq!(rt.family, "python");
        assert_eq!(rt.transport, "stdio");
    }
}

#[test]
fn manifest_has_ui_block() {
    let m = load();
    let ui = m.ui.expect("ui declaration present");
    assert_eq!(ui.assets.expect("assets").root, "web/dist");
    let elements = ui.custom_elements.expect("custom elements present");
    let app = &elements[0];
    assert_eq!(app.tag, "svi2-pro-app");
    assert_eq!(app.module, "svi2-pro.js");
    assert_eq!(app.entry, "register");
}

#[test]
fn manifest_has_operators_and_recipes() {
    let m = load();
    let operators = m.operators.expect("operators present");
    let op_files: Vec<&str> = operators.iter().map(|o| o.file.as_str()).collect();
    assert!(op_files.contains(&"operators/video_render.yaml"));
    let recipes = m.recipes.expect("recipes present");
    assert_eq!(recipes[0].file, "recipes/svi2_render.yaml");
}

#[test]
fn manifest_has_storage_block() {
    let m = load();
    let storage = m.storage.expect("storage contribution present");
    let json = serde_json::to_value(&storage).expect("storage serializes");
    assert_eq!(json["namespace"]["alias"], "svi2_pro");
    assert_eq!(json["namespace"]["prefix_mode"], "host_derived");
}
