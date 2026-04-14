use std::path::PathBuf;

use nexus_extension::{ExtensionRegistry, InMemoryExtensionRegistry};
use nexus_protocol::RuntimeFamily;
use semver::Version;

fn host_version() -> Version {
    Version::parse("0.1.0").unwrap()
}

fn protocol_version() -> Version {
    Version::parse("0.1.0").unwrap()
}

fn builtin_extensions_dir() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .unwrap()
        .parent()
        .unwrap()
        .join("extensions")
        .join("builtin")
}

#[test]
fn builtin_extensions_dir_exists() {
    let dir = builtin_extensions_dir();
    assert!(
        dir.exists(),
        "builtin extensions directory does not exist at: {}",
        dir.display()
    );
}

#[test]
fn local_llm_manifest_exists() {
    let manifest = builtin_extensions_dir()
        .join("local-llm")
        .join("manifest.yaml");
    assert!(
        manifest.exists(),
        "local-llm manifest not found at: {}",
        manifest.display()
    );
}

#[test]
fn local_llm_manifest_parses() {
    let manifest_path = builtin_extensions_dir()
        .join("local-llm")
        .join("manifest.yaml");

    let manifest = nexus_extension::parse_manifest(&manifest_path)
        .expect("manifest should parse without error");

    assert_eq!(manifest.extension.id, "nexus.local-llm");
    assert_eq!(manifest.extension.version, "0.1.0");
    assert_eq!(manifest.spec_version, "0.1");
    assert_eq!(manifest.runtime.family, RuntimeFamily::Builtin);
}

#[test]
fn local_llm_manifest_passes_schema_validation() {
    let manifest_path = builtin_extensions_dir()
        .join("local-llm")
        .join("manifest.yaml");

    let yaml_content = std::fs::read_to_string(&manifest_path).expect("should read manifest file");

    let json_value: serde_json::Value =
        serde_saphyr::from_str(&yaml_content).expect("should parse YAML as JSON value");

    let result = nexus_extension::validate_manifest_schema(&json_value);
    assert!(
        result.is_ok(),
        "manifest schema validation failed: {:?}",
        result.err()
    );
}

#[test]
fn local_llm_manifest_passes_compatibility_check() {
    let manifest_path = builtin_extensions_dir()
        .join("local-llm")
        .join("manifest.yaml");

    let manifest = nexus_extension::parse_manifest(&manifest_path).expect("manifest should parse");

    let result =
        nexus_extension::check_compatibility(&manifest, &host_version(), &protocol_version());

    assert!(
        result.is_ok(),
        "compatibility check failed: {:?}",
        result.err()
    );
}

#[test]
fn builtin_extension_discovered_in_registry() {
    let dir = builtin_extensions_dir();
    let hv = host_version();
    let pv = protocol_version();

    let empty_dir = tempfile::tempdir().unwrap();
    let (registry, _report) = tokio::runtime::Runtime::new()
        .unwrap()
        .block_on(InMemoryExtensionRegistry::from_directory(
            empty_dir.path(),
            &hv,
            &pv,
        ))
        .expect("registry should initialize");

    let builtin_report = registry
        .scan_builtin_extensions_dir(&dir, &hv, &pv)
        .expect("builtin scan should succeed");

    assert!(
        builtin_report
            .activated
            .contains(&"nexus.local-llm".to_string()),
        "local-llm should be discovered, got: {:?}",
        builtin_report
    );
}

#[test]
fn builtin_extension_activates_with_operators() {
    let dir = builtin_extensions_dir();
    let hv = host_version();
    let pv = protocol_version();

    let empty_dir = tempfile::tempdir().unwrap();
    let (registry, _) = tokio::runtime::Runtime::new()
        .unwrap()
        .block_on(InMemoryExtensionRegistry::from_directory(
            empty_dir.path(),
            &hv,
            &pv,
        ))
        .expect("registry should initialize");

    registry
        .scan_builtin_extensions_dir(&dir, &hv, &pv)
        .expect("builtin scan should succeed");

    registry
        .activate_builtin_extension("nexus.local-llm", &hv, &pv)
        .expect("activation should succeed");

    let ext = registry
        .get_extension("nexus.local-llm")
        .expect("extension should exist after activation");

    assert!(
        ext.validation_errors.is_empty(),
        "extension should have no validation errors, got: {:?}",
        ext.validation_errors
    );
    assert_eq!(ext.status.as_str(), "active");
    assert!(
        !ext.operators.is_empty(),
        "extension should have operators after activation"
    );
}

#[test]
fn builtin_extension_has_recipes_after_activation() {
    let dir = builtin_extensions_dir();
    let hv = host_version();
    let pv = protocol_version();

    let empty_dir = tempfile::tempdir().unwrap();
    let (registry, _) = tokio::runtime::Runtime::new()
        .unwrap()
        .block_on(InMemoryExtensionRegistry::from_directory(
            empty_dir.path(),
            &hv,
            &pv,
        ))
        .expect("registry should initialize");

    registry
        .scan_builtin_extensions_dir(&dir, &hv, &pv)
        .expect("builtin scan should succeed");

    registry
        .activate_builtin_extension("nexus.local-llm", &hv, &pv)
        .expect("activation should succeed");

    let recipes = registry.list_recipes();
    assert!(
        !recipes.is_empty(),
        "should have recipes after activation, got 0"
    );
}

#[test]
fn builtin_extension_has_layouts_after_activation() {
    let dir = builtin_extensions_dir();
    let hv = host_version();
    let pv = protocol_version();

    let empty_dir = tempfile::tempdir().unwrap();
    let (registry, _) = tokio::runtime::Runtime::new()
        .unwrap()
        .block_on(InMemoryExtensionRegistry::from_directory(
            empty_dir.path(),
            &hv,
            &pv,
        ))
        .expect("registry should initialize");

    registry
        .scan_builtin_extensions_dir(&dir, &hv, &pv)
        .expect("builtin scan should succeed");

    registry
        .activate_builtin_extension("nexus.local-llm", &hv, &pv)
        .expect("activation should succeed");

    let layouts = registry.list_layouts();
    assert!(
        !layouts.is_empty(),
        "should have layouts after activation, got 0"
    );

    let chat_layout = layouts.iter().find(|l| l.id.contains("chat"));
    assert!(
        chat_layout.is_some(),
        "should have a chat layout, available: {:?}",
        layouts.iter().map(|l| &l.id).collect::<Vec<_>>()
    );
}

#[test]
fn builtin_extension_has_ui_contributions_after_activation() {
    let dir = builtin_extensions_dir();
    let hv = host_version();
    let pv = protocol_version();

    let empty_dir = tempfile::tempdir().unwrap();
    let (registry, _) = tokio::runtime::Runtime::new()
        .unwrap()
        .block_on(InMemoryExtensionRegistry::from_directory(
            empty_dir.path(),
            &hv,
            &pv,
        ))
        .expect("registry should initialize");

    registry
        .scan_builtin_extensions_dir(&dir, &hv, &pv)
        .expect("builtin scan should succeed");

    registry
        .activate_builtin_extension("nexus.local-llm", &hv, &pv)
        .expect("activation should succeed");

    let contributions = registry.list_ui_contributions();
    assert!(
        !contributions.is_empty(),
        "should have UI contributions after activation, got 0"
    );
}

#[test]
fn empty_extensions_dir_returns_empty_registry() {
    let empty_dir = tempfile::tempdir().unwrap();
    let hv = host_version();
    let pv = protocol_version();

    let (registry, report) = tokio::runtime::Runtime::new()
        .unwrap()
        .block_on(InMemoryExtensionRegistry::from_directory(
            empty_dir.path(),
            &hv,
            &pv,
        ))
        .expect("should handle empty dir");

    assert!(report.activated.is_empty());
    assert!(registry.list_extensions().is_empty());
}

#[test]
fn nonexistent_extensions_dir_returns_empty_registry() {
    let hv = host_version();
    let pv = protocol_version();
    let missing_dir = PathBuf::from("/nonexistent/path/that/does/not/exist");

    let (registry, report) = tokio::runtime::Runtime::new()
        .unwrap()
        .block_on(InMemoryExtensionRegistry::from_directory(
            &missing_dir,
            &hv,
            &pv,
        ))
        .expect("should handle missing dir gracefully");

    assert!(report.activated.is_empty());
    assert!(registry.list_extensions().is_empty());
}
