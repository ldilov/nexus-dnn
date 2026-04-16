use std::path::Path;
use std::process::Command;

fn cargo_metadata() -> serde_json::Value {
    let out = Command::new(env!("CARGO"))
        .args([
            "metadata",
            "--format-version",
            "1",
            "--no-deps",
            "--manifest-path",
        ])
        .arg(format!("{}/../../Cargo.toml", env!("CARGO_MANIFEST_DIR")))
        .output()
        .expect("cargo metadata");
    serde_json::from_slice(&out.stdout).expect("parse metadata json")
}

fn deps_of(meta: &serde_json::Value, crate_name: &str) -> Vec<String> {
    meta["packages"]
        .as_array()
        .unwrap()
        .iter()
        .find(|p| p["name"] == crate_name)
        .unwrap_or_else(|| panic!("crate {crate_name} missing from workspace metadata"))["dependencies"]
        .as_array()
        .unwrap()
        .iter()
        .map(|d| d["name"].as_str().unwrap().to_owned())
        .collect()
}

#[test]
fn three_new_crates_exist_in_workspace() {
    let meta = cargo_metadata();
    for name in [
        "nexus-deployments",
        "nexus-models-store",
        "nexus-provenance",
    ] {
        let found = meta["packages"]
            .as_array()
            .unwrap()
            .iter()
            .any(|p| p["name"] == name);
        assert!(found, "crate {name} missing from workspace");
    }
}

#[test]
fn nexus_backend_runtimes_does_not_depend_on_new_crates() {
    let meta = cargo_metadata();
    let deps = deps_of(&meta, "nexus-backend-runtimes");
    for forbidden in [
        "nexus-deployments",
        "nexus-models-store",
        "nexus-provenance",
    ] {
        assert!(
            !deps.iter().any(|d| d == forbidden),
            "nexus-backend-runtimes must NOT depend on {forbidden}; found in deps: {deps:?}"
        );
    }
}

#[test]
fn extracted_crates_have_no_migration_directories_or_sql_files() {
    let workspace_root = Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("..")
        .join("..")
        .canonicalize()
        .unwrap();
    for name in [
        "nexus-deployments",
        "nexus-models-store",
        "nexus-provenance",
    ] {
        let crate_dir = workspace_root.join("crates").join(name);
        let migrations = crate_dir.join("migrations");
        assert!(
            !migrations.exists(),
            "{name} must not contain a migrations/ directory (FR-037)"
        );
        let walked = walkdir(&crate_dir);
        for entry in walked {
            let s = entry.to_string_lossy().to_lowercase();
            assert!(
                !s.ends_with(".sql"),
                "{name} must not contain .sql files (FR-037); found {entry:?}"
            );
        }
    }
}

fn walkdir(root: &Path) -> Vec<std::path::PathBuf> {
    let mut out = Vec::new();
    let mut stack = vec![root.to_path_buf()];
    while let Some(p) = stack.pop() {
        if let Ok(rd) = std::fs::read_dir(&p) {
            for e in rd.flatten() {
                let path = e.path();
                if path.is_dir() {
                    if path.file_name().and_then(|s| s.to_str()) == Some("target") {
                        continue;
                    }
                    stack.push(path);
                } else {
                    out.push(path);
                }
            }
        }
    }
    out
}
