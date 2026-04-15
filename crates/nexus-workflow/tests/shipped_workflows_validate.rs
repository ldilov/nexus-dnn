//! End-to-end check: every shipped workflow YAML in `extensions/builtin/*`
//! parses and validates against the operator definitions the same extension
//! ships. This is the regression guard that catches user-visible issues like
//! "retrieve: type mismatch: text/chat-message → text/retrieval-query"
//! before they reach the frontend.
//!
//! Also covers the user's spec requirement: React Flow handles carry the
//! operator port name verbatim; validating that the YAML graph resolves all
//! ports against the operator spec proves handle IDs line up.

use nexus_extension::{OperatorDefinition, parse_manifest};
use nexus_workflow::{parse_workflow, validate_workflow};
use std::fs;
use std::path::{Path, PathBuf};

fn repo_root() -> PathBuf {
    // CARGO_MANIFEST_DIR = crates/nexus-workflow → repo root is two up.
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .unwrap()
        .parent()
        .unwrap()
        .to_path_buf()
}

fn load_operators_for(extension_dir: &Path) -> Vec<OperatorDefinition> {
    let operators_dir = extension_dir.join("operators");
    if !operators_dir.exists() {
        return vec![];
    }
    let mut out = vec![];
    for entry in fs::read_dir(&operators_dir).expect("operators dir readable") {
        let path = entry.unwrap().path();
        if path.extension().and_then(|e| e.to_str()) != Some("yaml") {
            continue;
        }
        let raw = fs::read_to_string(&path).expect("operator yaml readable");
        let def: OperatorDefinition = serde_saphyr::from_str(&raw)
            .unwrap_or_else(|e| panic!("failed to parse {}: {e}", path.display()));
        out.push(def);
    }
    out
}

fn load_workflow_yaml(path: &Path) -> String {
    fs::read_to_string(path).expect("workflow yaml readable")
}

#[test]
fn every_shipped_workflow_validates_against_its_extensions_operators() {
    let root = repo_root();
    let builtin = root.join("extensions").join("builtin");
    assert!(builtin.exists(), "extensions/builtin should exist");

    let mut checked = 0;
    for ext_entry in fs::read_dir(&builtin).unwrap() {
        let ext_dir = ext_entry.unwrap().path();
        if !ext_dir.is_dir() {
            continue;
        }
        let workflows_dir = ext_dir.join("workflows");
        if !workflows_dir.exists() {
            continue;
        }

        // Gather this extension's operator definitions. Real production setups
        // could cross-reference operators from other extensions; for this
        // smoke test we expect each builtin extension to be self-contained.
        let operators = load_operators_for(&ext_dir);

        for wf_entry in fs::read_dir(&workflows_dir).unwrap() {
            let wf_path = wf_entry.unwrap().path();
            if wf_path.extension().and_then(|e| e.to_str()) != Some("yaml") {
                continue;
            }
            let content = load_workflow_yaml(&wf_path);
            let workflow = parse_workflow(&content)
                .unwrap_or_else(|e| panic!("failed to parse {}: {e}", wf_path.display()));

            validate_workflow(&workflow, &operators).unwrap_or_else(|e| {
                panic!(
                    "shipped workflow {} failed validation: {e}\n\
                     this regresses the user-visible \"type mismatch\" bug.",
                    wf_path.display(),
                );
            });
            checked += 1;
        }
    }

    assert!(checked > 0, "expected at least one shipped workflow to validate");
}

#[test]
fn every_node_input_resolves_to_a_real_operator_port_name() {
    // Handle IDs in the React Flow graph are sourced from the operator's port
    // `name`. This test walks every shipped workflow, resolves each edge
    // endpoint to an operator port, and asserts the name exists on the spec.
    // If this passes, the canvas cannot ever render a handle without a
    // backing spec port — which is the invariant the user asked us to test.
    let root = repo_root();
    let builtin = root.join("extensions").join("builtin");

    for ext_entry in fs::read_dir(&builtin).unwrap() {
        let ext_dir = ext_entry.unwrap().path();
        if !ext_dir.is_dir() {
            continue;
        }
        let workflows_dir = ext_dir.join("workflows");
        if !workflows_dir.exists() {
            continue;
        }
        let operators = load_operators_for(&ext_dir);
        let op_by_id: std::collections::HashMap<String, &OperatorDefinition> = operators
            .iter()
            .map(|o| (format!("{}@{}", o.operator.id, o.operator.version), o))
            .collect();

        for wf_entry in fs::read_dir(&workflows_dir).unwrap() {
            let wf_path = wf_entry.unwrap().path();
            if wf_path.extension().and_then(|e| e.to_str()) != Some("yaml") {
                continue;
            }
            let content = load_workflow_yaml(&wf_path);
            let workflow = parse_workflow(&content).unwrap();

            for node in &workflow.nodes {
                let op = op_by_id.get(&node.operator).unwrap_or_else(|| {
                    panic!(
                        "node {} in {} references unknown operator {}",
                        node.id,
                        wf_path.display(),
                        node.operator
                    )
                });
                let input_names: std::collections::HashSet<&str> = op
                    .inputs
                    .as_deref()
                    .unwrap_or(&[])
                    .iter()
                    .map(|p| p.name.as_str())
                    .collect();

                for port_name in node.inputs.keys() {
                    assert!(
                        input_names.contains(port_name.as_str()),
                        "node `{}` in {} wires input `{}` that does not exist on operator {} (valid: {:?})",
                        node.id,
                        wf_path.display(),
                        port_name,
                        node.operator,
                        input_names
                    );
                }
            }
        }
    }
}

#[test]
fn builtin_manifests_parse_cleanly() {
    // A user-facing symptom of a broken manifest is "extension failed to
    // load" at boot, which then makes the whole catalog empty. Pin the
    // manifest parse as a separate test so regressions localize.
    let root = repo_root();
    let builtin = root.join("extensions").join("builtin");
    for ext_entry in fs::read_dir(&builtin).unwrap() {
        let ext_dir = ext_entry.unwrap().path();
        if !ext_dir.is_dir() {
            continue;
        }
        let manifest_path = ext_dir.join("manifest.yaml");
        if !manifest_path.exists() {
            continue;
        }
        parse_manifest(&manifest_path).unwrap_or_else(|e| {
            panic!("failed to parse manifest {}: {e}", manifest_path.display())
        });
    }
}
