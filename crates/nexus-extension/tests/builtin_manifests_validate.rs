//! Pins the embedded extension-manifest JSON schema against every builtin
//! extension's actual `manifest.yaml`. Catches the class of regression where
//! a Rust-side struct field is added without the matching schema update —
//! silently breaking discovery for builtins that exercise the new field.
//!
//! Generic by design: walks the `extensions/builtin/` directory and
//! validates whatever it finds. No extension-id literals here, per the host
//! ↔ extension boundary rule.

use std::path::PathBuf;

fn workspace_root() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .and_then(std::path::Path::parent)
        .expect("workspace root")
        .to_path_buf()
}

#[test]
fn every_builtin_extension_activates_via_registry() {
    use semver::Version;
    let host = Version::parse("0.1.0").unwrap();
    let proto = Version::parse("0.1.0").unwrap();

    let builtin_dir = workspace_root().join("extensions").join("builtin");
    let tmp = tempfile::tempdir().expect("tempdir");

    let rt = tokio::runtime::Runtime::new().unwrap();
    let (registry, _report) = rt.block_on(async {
        nexus_extension::InMemoryExtensionRegistry::from_directory(tmp.path(), &host, &proto)
            .await
            .expect("empty registry")
    });
    let scan = registry
        .scan_builtin_extensions_dir(&builtin_dir, &host, &proto)
        .expect("scan builtin");

    let mut failures: Vec<String> = Vec::new();
    use nexus_extension::ExtensionRegistry;
    for ext_id in &scan.activated {
        if let Err(e) = registry.activate_builtin_extension(ext_id, &host, &proto) {
            failures.push(format!("[{ext_id}] activate failed: {e}"));
            continue;
        }
        let activated = registry
            .get_extension(ext_id)
            .unwrap_or_else(|| panic!("[{ext_id}] missing after activation"));
        if !activated.validation_errors.is_empty() {
            failures.push(format!(
                "[{ext_id}] validation_errors:\n    - {}",
                activated.validation_errors.join("\n    - ")
            ));
        }
    }
    if !failures.is_empty() {
        panic!(
            "builtin activation produced {} failure(s):\n  {}",
            failures.len(),
            failures.join("\n  ")
        );
    }
}
