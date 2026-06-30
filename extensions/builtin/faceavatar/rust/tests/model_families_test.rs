//! Guards that the manifest's `model_artifact` `family_id`s and the
//! `host_adapter` `MODEL_FAMILIES` list (what the worker resolves) stay in lockstep.
//! At GPU-spike time the host installs model dirs keyed by the manifest ids while
//! the lease factory looks them up by `MODEL_FAMILIES`; a drift would silently
//! install dirs the worker never finds. Both are provisional TODO(gpu-spike) ids,
//! but they MUST be the same provisional ids.

use std::collections::BTreeSet;
use std::path::Path;

use faceavatar_extension::host_adapter::MODEL_FAMILIES;
use nexus_extension::parse_manifest;

fn manifest_path() -> std::path::PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("..")
        .join("manifest.yaml")
}

fn manifest_model_artifact_family_ids() -> BTreeSet<String> {
    let manifest = parse_manifest(&manifest_path()).expect("manifest deserializes");
    let deps = manifest.dependencies.expect("dependencies block present");
    deps.steps
        .iter()
        .filter(|s| s.step_type == "model_artifact")
        .map(|s| {
            s.spec
                .get("family_id")
                .and_then(|v| v.as_str())
                .unwrap_or_else(|| panic!("model_artifact step {} missing string family_id", s.id))
                .to_owned()
        })
        .collect()
}

#[test]
fn manifest_model_artifact_family_ids_equal_host_adapter_model_families() {
    let manifest_ids = manifest_model_artifact_family_ids();
    let adapter_ids: BTreeSet<String> = MODEL_FAMILIES.iter().map(|s| (*s).to_owned()).collect();
    assert_eq!(
        manifest_ids, adapter_ids,
        "manifest model_artifact family_ids must match host_adapter MODEL_FAMILIES exactly; \
         a drift means installed model dirs are never resolved by the worker"
    );
}

#[test]
fn there_are_three_model_artifact_families() {
    assert_eq!(
        MODEL_FAMILIES.len(),
        3,
        "expected Arc2Face + insightface + SD1.5"
    );
    assert_eq!(manifest_model_artifact_family_ids().len(), 3);
}
