use std::path::{Path, PathBuf};

use nexus_extension::{ExtensionRegistry, InMemoryExtensionRegistry};
use semver::Version;

fn builtin_dir() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR")).join("..").join("..")
}

#[tokio::test]
async fn svi2_pro_scans_and_activates_without_validation_errors() {
    let v = Version::new(0, 1, 0);
    let (registry, report) = InMemoryExtensionRegistry::from_directory(&builtin_dir(), &v, &v)
        .await
        .expect("builtin directory scan succeeds");

    assert!(
        report
            .activated
            .iter()
            .any(|id| id == "nexus.video.svi2-pro"),
        "svi2-pro failed to activate; invalid entries: {:?}",
        report.invalid
    );

    let ext = ExtensionRegistry::get_extension(&registry, "nexus.video.svi2-pro")
        .expect("svi2-pro present after activation");

    assert!(
        ext.validation_errors.is_empty(),
        "svi2-pro activated with validation errors: {:?}",
        ext.validation_errors
    );
    assert!(
        ext.status.is_active(),
        "svi2-pro status is not active: {:?}",
        ext.status
    );
}
