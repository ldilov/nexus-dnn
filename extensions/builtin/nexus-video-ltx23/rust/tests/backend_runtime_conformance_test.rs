use std::path::Path;

use nexus_video_ltx23_extension::compatibility::short_profile_slug;
use nexus_video_ltx23_extension::runtime_selection::available_profiles;

fn ext_root() -> &'static Path {
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .expect("crate dir has a parent (extension root)")
}

#[test]
fn every_runtime_selection_profile_is_declared_in_manifest() {
    let manifest =
        std::fs::read_to_string(ext_root().join("manifest.yaml")).expect("manifest.yaml readable");
    let missing: Vec<&str> = available_profiles()
        .iter()
        .map(|p| p.runtime_id)
        .filter(|id| !manifest.contains(&format!("runtime_id: \"{id}\"")))
        .collect();
    assert!(
        missing.is_empty(),
        "manifest.yaml backend_runtimes is missing selectable runtimes: {missing:?}"
    );
}

#[test]
fn every_runtime_selection_profile_has_a_backend_runtime_yaml() {
    let root = ext_root();
    let mut failures: Vec<String> = Vec::new();
    for p in available_profiles() {
        let slug = short_profile_slug(p.runtime_id);
        let yaml = root
            .join("backends")
            .join(slug)
            .join("backend-runtime.yaml");
        if !yaml.is_file() {
            failures.push(format!("{slug}: missing {}", yaml.display()));
            continue;
        }
        let body = std::fs::read_to_string(&yaml).unwrap_or_default();
        if !body.contains(&format!("runtime_id: \"{}\"", p.runtime_id)) {
            failures.push(format!(
                "{slug}: backend-runtime.yaml runtime_id != {}",
                p.runtime_id
            ));
        }
    }
    assert!(
        failures.is_empty(),
        "backend-runtime.yaml conformance failures: {failures:?}"
    );
}

#[test]
fn experimental_flag_agrees_between_selection_and_backend_yaml() {
    let root = ext_root();
    let mut mismatches: Vec<String> = Vec::new();
    for p in available_profiles() {
        let slug = short_profile_slug(p.runtime_id);
        let yaml = root
            .join("backends")
            .join(slug)
            .join("backend-runtime.yaml");
        let Ok(body) = std::fs::read_to_string(&yaml) else {
            continue;
        };
        let yaml_experimental = body.contains("experimental: true");
        if yaml_experimental != p.experimental {
            mismatches.push(format!(
                "{slug}: selection.experimental={} backend.yaml.experimental={}",
                p.experimental, yaml_experimental
            ));
        }
    }
    assert!(
        mismatches.is_empty(),
        "experimental flag mismatches: {mismatches:?}"
    );
}
