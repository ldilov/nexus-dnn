use std::fs;
use std::path::PathBuf;

use nexus_extension::{ExtensionRegistry, InMemoryExtensionRegistry};
use semver::Version;

fn create_temp_extensions_dir(name: &str) -> PathBuf {
    let base = std::env::temp_dir().join("nexus_test").join(name);
    if base.exists() {
        fs::remove_dir_all(&base).unwrap();
    }
    fs::create_dir_all(&base).unwrap();
    base
}

fn write_valid_extension(ext_dir: &std::path::Path) {
    fs::create_dir_all(ext_dir.join("operators")).unwrap();
    fs::create_dir_all(ext_dir.join("worker")).unwrap();

    let manifest = r#"
spec_version: "0.1"
extension:
  id: "nexus.utility.echotest"
  version: "0.1.0"
  name: "Echo Test"
  description: "A test extension that echoes input."
  publisher: "nexus"
compatibility:
  host_api: ">=0.1.0, <1.0.0"
  protocol: ">=0.1.0, <1.0.0"
  platforms:
    - "linux-x64"
    - "windows-x64"
runtime:
  family: "python"
  entrypoint: "worker/main.py"
  environment:
    python: "3.11"
capabilities:
  - "filesystem.read"
operators:
  - file: "operators/echo.yaml"
"#;
    fs::write(ext_dir.join("manifest.yaml"), manifest).unwrap();

    let operator = r#"
spec_version: "0.1"
operator:
  id: "echo"
  version: "1.0.0"
  display_name: "Echo"
  description: "Echoes input text."
  category: "Utility"
execution:
  mode: "job"
  cacheable: true
  resumable: false
inputs:
  - name: "text"
    type: "text/plain"
    required: true
outputs:
  - name: "text_out"
    type: "text/plain"
config_schema:
  type: object
  properties:
    prefix:
      type: string
resources:
  gpu: false
"#;
    fs::write(ext_dir.join("operators/echo.yaml"), operator).unwrap();

    fs::write(ext_dir.join("worker/main.py"), "# stub").unwrap();
}

#[tokio::test]
async fn valid_extension_is_discovered_and_activated() {
    let extensions_dir = create_temp_extensions_dir("valid_ext_lifecycle");
    write_valid_extension(&extensions_dir.join("echotest"));

    let host_version = Version::new(0, 1, 0);
    let protocol_version = Version::new(0, 1, 0);

    let (registry, report) = InMemoryExtensionRegistry::from_directory(
        &extensions_dir,
        &host_version,
        &protocol_version,
    )
    .await
    .expect("registry creation should succeed");

    assert!(
        report
            .activated
            .contains(&"nexus.utility.echotest".to_string()),
        "extension must be activated; activated={:?}, invalid={:?}",
        report.activated,
        report.invalid,
    );
    assert!(
        report.invalid.is_empty(),
        "no extensions should be invalid: {:?}",
        report.invalid,
    );

    let extensions = registry.list_extensions();
    assert_eq!(extensions.len(), 1);
    assert_eq!(
        extensions[0].manifest.extension.id,
        "nexus.utility.echotest"
    );

    let operators = registry.list_operators();
    assert!(!operators.is_empty(), "operators must be indexed");
    assert!(
        registry.get_operator("echo").is_some(),
        "echo operator must be findable by id"
    );
}

#[tokio::test]
async fn invalid_extension_missing_required_fields_is_rejected() {
    let extensions_dir = create_temp_extensions_dir("invalid_ext_lifecycle");
    let ext_dir = extensions_dir.join("broken-ext");
    fs::create_dir_all(&ext_dir).unwrap();

    let incomplete_manifest = r#"
spec_version: "0.1"
extension:
  id: "broken.ext"
"#;
    fs::write(ext_dir.join("manifest.yaml"), incomplete_manifest).unwrap();

    let host_version = Version::new(0, 1, 0);
    let protocol_version = Version::new(0, 1, 0);

    let (registry, report) = InMemoryExtensionRegistry::from_directory(
        &extensions_dir,
        &host_version,
        &protocol_version,
    )
    .await
    .expect("registry creation should succeed even with invalid extensions");

    assert!(
        report.activated.is_empty(),
        "no extensions should be activated"
    );
    assert_eq!(report.invalid.len(), 1, "one extension should be invalid");
    assert_eq!(report.invalid[0].0, "broken-ext");
    assert!(registry.list_extensions().is_empty());
}
