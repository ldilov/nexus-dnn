use std::path::Path;

use nexus_extension::{ExtensionRegistry, InMemoryExtensionRegistry};
use semver::Version;
use tempfile::TempDir;

const MANIFEST_TEMPLATE: &str = r#"spec_version: "0.2"
extension:
  id: "EXT_ID"
  version: "0.1.0"
  name: "Test Extension"
  description: "US4 regression fixture."
  publisher: "test"
compatibility:
  host_api: ">=0.2.0, <0.3.0"
  protocol: ">=0.2.0, <0.3.0"
  platforms: ["linux-x64", "windows-x64"]
runtime:
  family: "native"
  entrypoint: "noop"
"#;

fn host_version() -> Version {
    Version::parse("0.2.0").unwrap()
}

fn protocol_version() -> Version {
    Version::parse("0.2.0").unwrap()
}

fn write_extension(dir: &Path, id: &str) {
    let ext_dir = dir.join(id);
    std::fs::create_dir_all(&ext_dir).unwrap();
    let manifest = MANIFEST_TEMPLATE.replace("EXT_ID", id);
    std::fs::write(ext_dir.join("manifest.yaml"), manifest).unwrap();
}

#[tokio::test]
async fn scans_new_extension() {
    let tmp = TempDir::new().unwrap();
    // Registry starts empty (directory has no extensions at construction).
    let (registry, initial) =
        InMemoryExtensionRegistry::from_directory(tmp.path(), &host_version(), &protocol_version())
            .await
            .unwrap();
    assert!(initial.activated.is_empty());
    assert!(registry.list_extensions().is_empty());

    // Drop a new extension into the directory, then call
    // `discover_and_activate` via the trait — it must pick it up.
    write_extension(tmp.path(), "ext.one");

    let report = registry
        .discover_and_activate(tmp.path(), &host_version(), &protocol_version())
        .await
        .unwrap();

    assert!(
        report.activated.iter().any(|id| id == "ext.one"),
        "report.activated should include ext.one: {:?}",
        report.activated
    );
    assert!(
        registry
            .list_extensions()
            .iter()
            .any(|e| e.manifest.extension.id == "ext.one"),
        "registry state must reflect the scanned extension",
    );
}

#[tokio::test]
async fn idempotent_re_invocation() {
    let tmp = TempDir::new().unwrap();
    write_extension(tmp.path(), "ext.a");

    let (registry, _) =
        InMemoryExtensionRegistry::from_directory(tmp.path(), &host_version(), &protocol_version())
            .await
            .unwrap();

    // Drop a second extension and re-invoke.
    write_extension(tmp.path(), "ext.b");
    registry
        .discover_and_activate(tmp.path(), &host_version(), &protocol_version())
        .await
        .unwrap();

    let ids: Vec<String> = registry
        .list_extensions()
        .into_iter()
        .map(|e| e.manifest.extension.id)
        .collect();
    assert!(ids.contains(&"ext.a".to_owned()), "ext.a missing: {ids:?}");
    assert!(ids.contains(&"ext.b".to_owned()), "ext.b missing: {ids:?}");
    assert_eq!(ids.len(), 2, "no duplicates expected: {ids:?}");

    // Re-invoke with the same directory — still {A, B}, still no duplicates.
    registry
        .discover_and_activate(tmp.path(), &host_version(), &protocol_version())
        .await
        .unwrap();
    let ids_after: Vec<String> = registry
        .list_extensions()
        .into_iter()
        .map(|e| e.manifest.extension.id)
        .collect();
    assert_eq!(ids_after.len(), 2, "idempotent expected: {ids_after:?}");
}
