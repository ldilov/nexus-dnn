//! Spec 053 G6 — pins the local-llm `dependencies.steps` graph.
//!
//! Asserts the manifest now declares a first-class dependency graph that
//! parses to a valid, topo-sorted `InstallPlan` with the expected step
//! ids/types/order — replacing reliance on the legacy `runtime_dependencies`
//! block for the install UX.

use std::path::{Path, PathBuf};

use nexus_extension::{parse_manifest, resolve_dependencies_block};
use nexus_extension_deps::plan::{parse_dependencies_block, InstallPlan};
use nexus_extension_deps::HandlerRegistry;

fn manifest_path() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("..")
        .join("manifest.yaml")
}

fn build_plan() -> InstallPlan {
    let manifest = parse_manifest(&manifest_path()).expect("manifest parses against host schema");
    let block = resolve_dependencies_block(&manifest)
        .expect("manifest resolves to a dependencies block");
    let registry = HandlerRegistry::default();
    parse_dependencies_block("nexus.local-llm", block, &registry)
        .expect("dependencies block topo-sorts against the real handler registry")
}

#[test]
fn manifest_declares_first_class_dependencies_block() {
    let manifest = parse_manifest(&manifest_path()).expect("manifest parses");
    let block = manifest
        .dependencies
        .expect("local-llm declares an explicit dependencies block (not legacy translation)");
    assert!(
        !block.steps.is_empty(),
        "explicit dependencies block must declare steps"
    );
    assert!(
        manifest.runtime_dependencies.is_empty(),
        "legacy runtime_dependencies removed (AC-6.5); install UX is the explicit graph"
    );
}

#[test]
fn plan_has_expected_step_ids_and_types() {
    let plan = build_plan();
    let ids: Vec<&str> = plan.steps.iter().map(|s| s.id.as_str()).collect();

    assert!(ids.contains(&"python"), "python runtime step present: {ids:?}");
    assert!(ids.contains(&"pkgs"), "uv-sync package_set step present: {ids:?}");
    assert!(ids.contains(&"validate"), "worker-handshake validation step present: {ids:?}");

    let type_of = |id: &str| {
        plan.steps
            .iter()
            .find(|s| s.id == id)
            .unwrap_or_else(|| panic!("step {id} present"))
            .step_type
            .as_str()
    };
    assert_eq!(type_of("python"), "runtime");
    assert_eq!(type_of("pkgs"), "package_set");
    assert_eq!(type_of("validate"), "validation");
}

#[test]
fn plan_topo_orders_python_first_pkgs_then_validate_last() {
    let plan = build_plan();
    let order: Vec<&str> = plan.steps.iter().map(|s| s.id.as_str()).collect();
    let pos = |id: &str| {
        order
            .iter()
            .position(|s| *s == id)
            .unwrap_or_else(|| panic!("step {id} missing"))
    };

    assert_eq!(order[0], "python", "python has no requires and is declared first");
    assert!(pos("pkgs") > pos("python"), "pkgs requires python");
    assert!(pos("validate") > pos("pkgs"), "validate requires pkgs");
    assert_eq!(order.last().copied(), Some("validate"), "validate is terminal");
}

#[test]
fn pkgs_step_targets_worker_pyproject() {
    let plan = build_plan();
    let pkgs = plan
        .steps
        .iter()
        .find(|s| s.id == "pkgs")
        .expect("pkgs step present");
    let spec = pkgs.spec.as_object().expect("pkgs spec is an object");
    assert_eq!(spec["manager"], "uv");
    assert_eq!(spec["manifest_path"], "worker/pyproject.toml");
}
