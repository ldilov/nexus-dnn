# P2 — Binding Compiler (keystone) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the host-owned binding compiler in `nexus-recipe`: take user control values, layer them over recipe defaults + an optional preset, reject locked/hidden overrides, fan-out onto a working copy of a pinned workflow snapshot, validate every projected value against the existing operator schemas, and emit a validated `ResolvedRun`. This is the keystone every later phase depends on.

**Architecture:** A pure, generic function `compile_recipe_run(projection, workflow, version, operators, control_values, preset_id) -> Result<ResolvedRun, BindingError>`. Target resolution generalizes EmotionTTS's `parse_path` into `parse_target` + a writer over the host `nexus_workflow::Workflow` model (node `config: Option<Value>` with nested JSON pointers; workflow inputs captured into a `resolved_inputs` map). Validation reuses `nexus_workflow::validate_workflow` (which already JSON-Schema-checks node configs) plus a new public `validate_node_config` wrapper and an input-value type check against `WorkflowPort` types. The compiler does **not** execute — it produces a frozen, validated graph + inputs for P3 to hand to whatever runs.

**Tech Stack:** Rust, `serde_json`, `thiserror`, `nexus-workflow`, `nexus-extension` (`OperatorDefinition`), `nexus-storage` (`WorkflowVersionRecord`).

**Depends on:** P0 (`WorkflowVersionRecord`), P1 (`RecipeProjection`, `ControlDef`, `ControlMode`, `PresetPack`).

**Boundary:** all P2 code lands in `crates/nexus-recipe` and `crates/nexus-workflow` — generic, zero extension-id literals, zero hardcoded node ids. The EmotionTTS `RecipeField`/`targets()`/`CURATED_*` tables are NOT lifted; only the `input:`/`node:` resolver primitive is generalized.

---

### Task 1: Public `validate_node_config` wrapper in `nexus-workflow`

**Files:**
- Modify: `crates/nexus-workflow/src/validation.rs:245` (make a public wrapper)
- Modify: `crates/nexus-workflow/src/lib.rs:11-13` (re-export)
- Test: `crates/nexus-workflow/src/validation.rs` `#[cfg(test)]`

`check_node_config` is private. Expose it generically so the compiler can call it per node.

- [ ] **Step 1: Add the public wrapper + failing test**

In `crates/nexus-workflow/src/validation.rs`, add a public fn that delegates to the existing private one:

```rust
/// Validate a single node's `config` against its operator's `config_schema`
/// (JSON-Schema draft7). `Ok(())` when no schema or no config. Public wrapper
/// over the internal check so callers (e.g. the recipe binding compiler) can
/// validate a single node without re-running the whole workflow.
pub fn validate_node_config(
    node: &crate::model::NodeInstance,
    op_def: &OperatorDefinition,
) -> Result<(), WorkflowError> {
    check_node_config(node, op_def)
}
```

Add a test in the existing `#[cfg(test)] mod tests` block (create one if absent at the bottom of the file):

```rust
#[cfg(test)]
mod p2_wrapper_tests {
    use super::*;
    use crate::model::NodeInstance;
    use nexus_extension::OperatorDefinition;
    use std::collections::HashMap;

    fn op_with_schema(schema: serde_json::Value) -> OperatorDefinition {
        // Build a minimal OperatorDefinition with a config_schema. Copy the exact
        // constructor/field set from an existing nexus-workflow validation test
        // (search this file's tests or crates/nexus-extension for a helper).
        let mut op: OperatorDefinition = serde_json::from_value(serde_json::json!({
            "operator": { "id": "op", "version": "1.0.0" },
            "config_schema": schema,
        })).expect("operator definition fixture");
        let _ = &mut op;
        op
    }

    #[test]
    fn rejects_config_violating_schema() {
        let op = op_with_schema(serde_json::json!({
            "type": "object",
            "properties": { "steps": { "type": "integer", "minimum": 1, "maximum": 10 } }
        }));
        let node = NodeInstance {
            id: "n".into(), operator: "op@1.0.0".into(), stage: None,
            inputs: HashMap::new(),
            config: Some(serde_json::json!({ "steps": 999 })),
        };
        assert!(validate_node_config(&node, &op).is_err());
    }

    #[test]
    fn accepts_config_within_schema() {
        let op = op_with_schema(serde_json::json!({
            "type": "object",
            "properties": { "steps": { "type": "integer", "minimum": 1, "maximum": 10 } }
        }));
        let node = NodeInstance {
            id: "n".into(), operator: "op@1.0.0".into(), stage: None,
            inputs: HashMap::new(),
            config: Some(serde_json::json!({ "steps": 5 })),
        };
        assert!(validate_node_config(&node, &op).is_ok());
    }
}
```

> If `OperatorDefinition` does not `Deserialize` from that JSON shape, open `crates/nexus-extension/src/manifest.rs` (the `OperatorDefinition` definition near line 219) and build the fixture with its real constructor/fields. Do not guess field names — read them.

- [ ] **Step 2: Re-export**

In `crates/nexus-workflow/src/lib.rs`, add `validate_node_config` to the `validation` re-export:

```rust
pub use validation::{
    resolve_operator_bindings, validate_dag, validate_node_config, validate_port_types,
    validate_workflow,
};
```

- [ ] **Step 3: Run**

Run: `cargo test -p nexus-workflow p2_wrapper_tests`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add crates/nexus-workflow/src/validation.rs crates/nexus-workflow/src/lib.rs
git commit -m "feat(workflow): public validate_node_config wrapper (P2)"
```

---

### Task 2: Target parsing + writer in `nexus-recipe`

**Files:**
- Modify: `crates/nexus-recipe/Cargo.toml` (add deps)
- Create: `crates/nexus-recipe/src/error.rs`
- Create: `crates/nexus-recipe/src/target.rs`
- Modify: `crates/nexus-recipe/src/lib.rs` (declare + re-export)

- [ ] **Step 1: Add dependencies**

In `crates/nexus-recipe/Cargo.toml` `[dependencies]`:

```toml
nexus-workflow = { path = "../nexus-workflow" }
nexus-extension = { path = "../nexus-extension" }
nexus-storage = { path = "../nexus-storage" }
```

(Acyclic: none of those depend on `nexus-recipe`.)

- [ ] **Step 2: Error type**

Create `crates/nexus-recipe/src/error.rs`:

```rust
#[derive(Debug, thiserror::Error, PartialEq)]
pub enum BindingError {
    #[error("unknown control: {0}")]
    UnknownControl(String),
    #[error("locked control cannot be overridden: {0}")]
    LockedOverride(String),
    #[error("control is not user-settable: {0}")]
    NotSettable(String),
    #[error("malformed target path: {0}")]
    BadTarget(String),
    #[error("target node not found: {0}")]
    UnknownNode(String),
    #[error("preset not found: {0}")]
    UnknownPreset(String),
    #[error("workflow validation failed: {0}")]
    Validation(String),
    #[error("input {name}: value does not match port type {expected}")]
    InputTypeMismatch { name: String, expected: String },
}
```

- [ ] **Step 3: Target parsing + writer + failing tests**

Create `crates/nexus-recipe/src/target.rs`:

```rust
use std::collections::BTreeMap;

use serde_json::{Map, Value};

use nexus_workflow::Workflow;

use crate::error::BindingError;

/// Host-canonical binding target. `input:<name>` writes a workflow input value;
/// `node:<node_id>.config.<a.b.c>` writes a (possibly nested) node config path.
#[derive(Debug, Clone, PartialEq)]
pub enum ParsedTarget {
    Input(String),
    NodeConfig { node_id: String, pointer: Vec<String> },
}

pub fn parse_target(raw: &str) -> Result<ParsedTarget, BindingError> {
    if let Some(name) = raw.strip_prefix("input:") {
        if name.is_empty() {
            return Err(BindingError::BadTarget(raw.into()));
        }
        return Ok(ParsedTarget::Input(name.to_string()));
    }
    if let Some(rest) = raw.strip_prefix("node:") {
        let (node_id, tail) = rest
            .split_once('.')
            .ok_or_else(|| BindingError::BadTarget(raw.into()))?;
        let pointer_str = tail
            .strip_prefix("config.")
            .ok_or_else(|| BindingError::BadTarget(raw.into()))?;
        if node_id.is_empty() || pointer_str.is_empty() {
            return Err(BindingError::BadTarget(raw.into()));
        }
        let pointer: Vec<String> = pointer_str.split('.').map(str::to_string).collect();
        if pointer.iter().any(|s| s.is_empty()) {
            return Err(BindingError::BadTarget(raw.into()));
        }
        return Ok(ParsedTarget::NodeConfig {
            node_id: node_id.to_string(),
            pointer,
        });
    }
    Err(BindingError::BadTarget(raw.into()))
}

/// Write `value` at `target`, mutating either the working `workflow` (node
/// config, nested) or the `inputs` value map (workflow input ports).
pub fn write_target(
    workflow: &mut Workflow,
    inputs: &mut BTreeMap<String, Value>,
    target: &ParsedTarget,
    value: Value,
) -> Result<(), BindingError> {
    match target {
        ParsedTarget::Input(name) => {
            inputs.insert(name.clone(), value);
            Ok(())
        }
        ParsedTarget::NodeConfig { node_id, pointer } => {
            let node = workflow
                .nodes
                .iter_mut()
                .find(|n| &n.id == node_id)
                .ok_or_else(|| BindingError::UnknownNode(node_id.clone()))?;
            let root = node.config.get_or_insert_with(|| Value::Object(Map::new()));
            set_pointer(root, pointer, value)
        }
    }
}

fn set_pointer(root: &mut Value, pointer: &[String], value: Value) -> Result<(), BindingError> {
    if !root.is_object() {
        *root = Value::Object(Map::new());
    }
    let mut cur = root;
    for key in &pointer[..pointer.len() - 1] {
        let obj = cur.as_object_mut().expect("ensured object above");
        let entry = obj.entry(key.clone()).or_insert_with(|| Value::Object(Map::new()));
        if !entry.is_object() {
            *entry = Value::Object(Map::new());
        }
        cur = entry;
    }
    let last = &pointer[pointer.len() - 1];
    cur.as_object_mut()
        .expect("object")
        .insert(last.clone(), value);
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use nexus_workflow::{NodeInstance, Workflow};
    use std::collections::HashMap;

    fn wf_with_node(id: &str) -> Workflow {
        Workflow {
            id: "wf".into(), title: "T".into(), version: "0.1.0".into(),
            inputs: vec![], outputs: vec![],
            nodes: vec![NodeInstance {
                id: id.into(), operator: "op@1.0.0".into(), stage: None,
                inputs: HashMap::new(), config: None,
            }],
            stages: vec![], created_at: "t".into(), updated_at: "t".into(),
        }
    }

    #[test]
    fn parses_input_and_node_targets() {
        assert_eq!(parse_target("input:script").unwrap(), ParsedTarget::Input("script".into()));
        assert_eq!(
            parse_target("node:n1.config.a.b").unwrap(),
            ParsedTarget::NodeConfig { node_id: "n1".into(), pointer: vec!["a".into(), "b".into()] }
        );
    }

    #[test]
    fn rejects_malformed_targets() {
        for bad in ["", "foo", "input:", "node:", "node:n.bad.key", "node:n.config."] {
            assert!(parse_target(bad).is_err(), "{bad} should be rejected");
        }
    }

    #[test]
    fn writes_input_value() {
        let mut wf = wf_with_node("n1");
        let mut inputs = BTreeMap::new();
        write_target(&mut wf, &mut inputs, &parse_target("input:x").unwrap(), serde_json::json!(7)).unwrap();
        assert_eq!(inputs.get("x"), Some(&serde_json::json!(7)));
    }

    #[test]
    fn writes_nested_node_config() {
        let mut wf = wf_with_node("n1");
        let mut inputs = BTreeMap::new();
        write_target(&mut wf, &mut inputs, &parse_target("node:n1.config.a.b").unwrap(), serde_json::json!("v")).unwrap();
        let cfg = wf.nodes[0].config.as_ref().unwrap();
        assert_eq!(cfg["a"]["b"], serde_json::json!("v"));
    }

    #[test]
    fn unknown_node_errors() {
        let mut wf = wf_with_node("n1");
        let mut inputs = BTreeMap::new();
        let err = write_target(&mut wf, &mut inputs, &parse_target("node:ghost.config.x").unwrap(), serde_json::json!(1)).unwrap_err();
        assert_eq!(err, BindingError::UnknownNode("ghost".into()));
    }
}
```

- [ ] **Step 4: Declare modules**

In `crates/nexus-recipe/src/lib.rs` add:

```rust
pub mod error;
pub mod target;

pub use error::BindingError;
pub use target::{parse_target, write_target, ParsedTarget};
```

- [ ] **Step 5: Run**

Run: `cargo test -p nexus-recipe target`
Expected: all PASS.

- [ ] **Step 6: Commit**

```bash
git add crates/nexus-recipe/Cargo.toml crates/nexus-recipe/src/error.rs crates/nexus-recipe/src/target.rs crates/nexus-recipe/src/lib.rs
git commit -m "feat(recipe): host-canonical binding target parsing + nested writer (P2)"
```

---

### Task 3: Snapshot → Workflow helper

**Files:**
- Create: `crates/nexus-recipe/src/snapshot.rs`
- Modify: `crates/nexus-recipe/src/lib.rs`

- [ ] **Step 1: Helper + failing test**

Create `crates/nexus-recipe/src/snapshot.rs`:

```rust
use nexus_storage::records::WorkflowVersionRecord;
use nexus_workflow::{NodeInstance, OutputBinding, Stage, Workflow, WorkflowPort};

/// Reconstruct a runnable `Workflow` from an immutable version snapshot row.
/// `title` comes from the identity `workflows` row (the version row has none).
pub fn snapshot_to_workflow(
    title: &str,
    rec: &WorkflowVersionRecord,
) -> Result<Workflow, serde_json::Error> {
    let inputs: Vec<WorkflowPort> = match &rec.inputs {
        Some(s) => serde_json::from_str(s)?,
        None => Vec::new(),
    };
    let outputs: Vec<OutputBinding> = match &rec.outputs {
        Some(s) => serde_json::from_str(s)?,
        None => Vec::new(),
    };
    let nodes: Vec<NodeInstance> = serde_json::from_str(&rec.nodes)?;
    let stages: Vec<Stage> = match &rec.stages {
        Some(s) => serde_json::from_str(s)?,
        None => Vec::new(),
    };
    Ok(Workflow {
        id: rec.workflow_id.clone(),
        title: title.to_string(),
        version: rec.version.clone(),
        inputs,
        outputs,
        nodes,
        stages,
        created_at: rec.created_at.clone(),
        updated_at: rec.created_at.clone(),
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    fn rec() -> WorkflowVersionRecord {
        WorkflowVersionRecord {
            workflow_id: "wf".into(), version: "1".into(),
            canonical_hash: "h".into(), operator_schema_hash: None,
            inputs: Some(r#"[{"name":"script","type":"string"}]"#.into()),
            outputs: Some("[]".into()),
            nodes: "[]".into(), edges: "[]".into(), stages: Some("[]".into()),
            author_kind: "extension".into(), extension_id: None,
            extension_version: None, created_at: "t".into(),
        }
    }

    #[test]
    fn rebuilds_workflow_from_snapshot() {
        let wf = snapshot_to_workflow("My Flow", &rec()).unwrap();
        assert_eq!(wf.id, "wf");
        assert_eq!(wf.version, "1");
        assert_eq!(wf.title, "My Flow");
        assert_eq!(wf.inputs.len(), 1);
        assert_eq!(wf.inputs[0].name, "script");
    }
}
```

- [ ] **Step 2: Declare**

In `crates/nexus-recipe/src/lib.rs` add `pub mod snapshot;` and `pub use snapshot::snapshot_to_workflow;`.

- [ ] **Step 3: Run**

Run: `cargo test -p nexus-recipe snapshot`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add crates/nexus-recipe/src/snapshot.rs crates/nexus-recipe/src/lib.rs
git commit -m "feat(recipe): reconstruct Workflow from version snapshot (P2)"
```

---

### Task 4: The compiler — `compile_recipe_run`

**Files:**
- Create: `crates/nexus-recipe/src/compiler.rs`
- Modify: `crates/nexus-recipe/src/lib.rs`

- [ ] **Step 1: Compiler + `ResolvedRun` + failing tests**

Create `crates/nexus-recipe/src/compiler.rs`:

```rust
use std::collections::BTreeMap;

use serde_json::Value;

use nexus_extension::OperatorDefinition;
use nexus_workflow::{validate_workflow, Workflow};

use crate::error::BindingError;
use crate::projection::{ControlMode, RecipeProjection};
use crate::target::{parse_target, write_target};

#[derive(Debug, Clone, PartialEq)]
pub struct AppliedControl {
    pub control_id: String,
    pub targets: Vec<String>,
    pub value: Value,
}

/// A validated, frozen run request. NOT executed — handed to P3's run path.
#[derive(Debug, Clone)]
pub struct ResolvedRun {
    pub workflow_id: String,
    pub workflow_version: String,
    pub resolved_workflow: Workflow,
    pub resolved_inputs: BTreeMap<String, Value>,
    pub applied_controls: Vec<AppliedControl>,
}

/// Compile user control values through a recipe projection onto a pinned
/// workflow snapshot. Layering: control defaults -> preset values -> user
/// values. Locked controls reject user overrides; hidden controls are not
/// user-settable. Every projected value is validated against the operator
/// schemas via `validate_workflow`, and input values are type-checked against
/// their `WorkflowPort` types.
pub fn compile_recipe_run(
    projection: &RecipeProjection,
    workflow: &Workflow,
    workflow_version: &str,
    operators: &[OperatorDefinition],
    control_values: &BTreeMap<String, Value>,
    preset_id: Option<&str>,
) -> Result<ResolvedRun, BindingError> {
    let by_id: BTreeMap<&str, &crate::projection::ControlDef> =
        projection.controls.iter().map(|c| (c.control_id.as_str(), c)).collect();

    // 1. defaults
    let mut effective: BTreeMap<String, Value> = BTreeMap::new();
    for c in &projection.controls {
        if let Some(d) = &c.default_value {
            effective.insert(c.control_id.clone(), d.clone());
        }
    }

    // 2. preset overlay
    if let Some(pid) = preset_id {
        let preset = projection
            .presets
            .iter()
            .find(|p| p.preset_id == pid)
            .ok_or_else(|| BindingError::UnknownPreset(pid.to_string()))?;
        for (k, v) in &preset.values {
            effective.insert(k.clone(), v.clone());
        }
    }

    // 3. user overlay (locked/hidden guarded)
    for (k, v) in control_values {
        let control = by_id.get(k.as_str()).ok_or_else(|| BindingError::UnknownControl(k.clone()))?;
        match control.mode {
            ControlMode::Locked => return Err(BindingError::LockedOverride(k.clone())),
            ControlMode::Hidden => return Err(BindingError::NotSettable(k.clone())),
            ControlMode::Basic | ControlMode::Advanced => {
                effective.insert(k.clone(), v.clone());
            }
        }
    }

    // 4. fan-out onto a working copy
    let mut working = workflow.clone();
    let mut resolved_inputs: BTreeMap<String, Value> = BTreeMap::new();
    let mut applied = Vec::new();
    for c in &projection.controls {
        let Some(val) = effective.get(&c.control_id) else { continue };
        for target_str in &c.bindings {
            let target = parse_target(target_str)?;
            write_target(&mut working, &mut resolved_inputs, &target, val.clone())?;
        }
        if !c.bindings.is_empty() {
            applied.push(AppliedControl {
                control_id: c.control_id.clone(),
                targets: c.bindings.clone(),
                value: val.clone(),
            });
        }
    }

    // 5. validate node configs + structure
    validate_workflow(&working, operators).map_err(|e| BindingError::Validation(e.to_string()))?;

    // 6. input value type-check vs port types
    for (name, value) in &resolved_inputs {
        if let Some(port) = working.inputs.iter().find(|p| &p.name == name) {
            if !value_matches_port(value, &port.port_type) {
                return Err(BindingError::InputTypeMismatch {
                    name: name.clone(),
                    expected: port.port_type.clone(),
                });
            }
        }
    }

    Ok(ResolvedRun {
        workflow_id: working.id.clone(),
        workflow_version: workflow_version.to_string(),
        resolved_workflow: working,
        resolved_inputs,
        applied_controls: applied,
    })
}

fn value_matches_port(value: &Value, port_type: &str) -> bool {
    match port_type {
        "string" => value.is_string(),
        "boolean" | "bool" => value.is_boolean(),
        "number" | "float" | "double" => value.is_number(),
        "integer" | "int" => value.is_i64() || value.is_u64(),
        _ => true, // unknown/structured types are not value-checked here
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::projection::{ControlDef, ControlKind, PresetPack, PresetSource};
    use nexus_workflow::{Workflow, WorkflowPort};

    fn control(id: &str, mode: ControlMode, default: Option<Value>, bindings: Vec<&str>) -> ControlDef {
        ControlDef {
            control_id: id.into(), kind: ControlKind::String, label: id.into(),
            help_text: None, mode, default_value: default, widget_hint: None,
            bindings: bindings.into_iter().map(str::to_string).collect(),
        }
    }

    fn empty_wf() -> Workflow {
        Workflow {
            id: "wf".into(), title: "T".into(), version: "0.1.0".into(),
            inputs: vec![WorkflowPort { name: "script".into(), port_type: "string".into() }],
            outputs: vec![], nodes: vec![], stages: vec![],
            created_at: "t".into(), updated_at: "t".into(),
        }
    }

    fn proj(controls: Vec<ControlDef>, presets: Vec<PresetPack>) -> RecipeProjection {
        RecipeProjection { schema_version: 1, sections: vec![], controls, presets, output: Default::default() }
    }

    #[test]
    fn applies_default_and_user_value_to_input() {
        let p = proj(vec![control("text", ControlMode::Basic, Some(serde_json::json!("d")), vec!["input:script"])], vec![]);
        let mut user = BTreeMap::new();
        user.insert("text".to_string(), serde_json::json!("hello"));
        let run = compile_recipe_run(&p, &empty_wf(), "1", &[], &user, None).unwrap();
        assert_eq!(run.resolved_inputs.get("script"), Some(&serde_json::json!("hello")));
        assert_eq!(run.applied_controls.len(), 1);
    }

    #[test]
    fn fan_out_writes_every_target() {
        // two input ports, one control bound to both
        let mut wf = empty_wf();
        wf.inputs.push(WorkflowPort { name: "script2".into(), port_type: "string".into() });
        let p = proj(vec![control("text", ControlMode::Basic, None, vec!["input:script", "input:script2"])], vec![]);
        let mut user = BTreeMap::new();
        user.insert("text".to_string(), serde_json::json!("x"));
        let run = compile_recipe_run(&p, &wf, "1", &[], &user, None).unwrap();
        assert_eq!(run.resolved_inputs.get("script"), Some(&serde_json::json!("x")));
        assert_eq!(run.resolved_inputs.get("script2"), Some(&serde_json::json!("x")));
    }

    #[test]
    fn locked_user_override_is_rejected() {
        let p = proj(vec![control("text", ControlMode::Locked, Some(serde_json::json!("fixed")), vec!["input:script"])], vec![]);
        let mut user = BTreeMap::new();
        user.insert("text".to_string(), serde_json::json!("hack"));
        let err = compile_recipe_run(&p, &empty_wf(), "1", &[], &user, None).unwrap_err();
        assert_eq!(err, BindingError::LockedOverride("text".into()));
    }

    #[test]
    fn hidden_user_override_is_rejected() {
        let p = proj(vec![control("text", ControlMode::Hidden, Some(serde_json::json!("d")), vec!["input:script"])], vec![]);
        let mut user = BTreeMap::new();
        user.insert("text".to_string(), serde_json::json!("x"));
        let err = compile_recipe_run(&p, &empty_wf(), "1", &[], &user, None).unwrap_err();
        assert_eq!(err, BindingError::NotSettable("text".into()));
    }

    #[test]
    fn preset_values_overlay_defaults() {
        let p = proj(
            vec![control("text", ControlMode::Basic, Some(serde_json::json!("d")), vec!["input:script"])],
            vec![PresetPack {
                preset_id: "final".into(), label: "Final".into(), description: None,
                source: PresetSource::Recipe,
                values: BTreeMap::from([("text".to_string(), serde_json::json!("preset"))]),
            }],
        );
        let run = compile_recipe_run(&p, &empty_wf(), "1", &[], &BTreeMap::new(), Some("final")).unwrap();
        assert_eq!(run.resolved_inputs.get("script"), Some(&serde_json::json!("preset")));
    }

    #[test]
    fn unknown_preset_errors() {
        let p = proj(vec![], vec![]);
        let err = compile_recipe_run(&p, &empty_wf(), "1", &[], &BTreeMap::new(), Some("nope")).unwrap_err();
        assert_eq!(err, BindingError::UnknownPreset("nope".into()));
    }

    #[test]
    fn input_type_mismatch_is_rejected() {
        let p = proj(vec![control("n", ControlMode::Basic, None, vec!["input:script"])], vec![]);
        let mut user = BTreeMap::new();
        user.insert("n".to_string(), serde_json::json!(123)); // port "script" is string
        let err = compile_recipe_run(&p, &empty_wf(), "1", &[], &user, None).unwrap_err();
        assert_eq!(err, BindingError::InputTypeMismatch { name: "script".into(), expected: "string".into() });
    }
}
```

(Node-config fan-out through `validate_workflow` with a real `OperatorDefinition` is exercised end-to-end in P3's integration test, where the registry is available; the unit tests above use input-only bindings + an empty node set so `resolve_operator_bindings` trivially passes.)

- [ ] **Step 2: Declare + re-export**

In `crates/nexus-recipe/src/lib.rs`:

```rust
pub mod compiler;
pub use compiler::{compile_recipe_run, AppliedControl, ResolvedRun};
```

- [ ] **Step 3: Run**

Run: `cargo test -p nexus-recipe compiler`
Expected: all PASS.

- [ ] **Step 4: Commit**

```bash
git add crates/nexus-recipe/src/compiler.rs crates/nexus-recipe/src/lib.rs
git commit -m "feat(recipe): binding compiler — layering, fan-out, locked/hidden, validate (P2)"
```

---

## Final verification

- [ ] **Tests + lint**

Run: `cargo test -p nexus-recipe -p nexus-workflow && cargo fmt && cargo clippy -p nexus-recipe -p nexus-workflow -- -D warnings`
Expected: green.

- [ ] **Boundary gate**

Run: `grep -rn "emotion-tts\|svi2\|local-llm\|local_llm\|script_parse_1\|synthesize_1\|_1\.config\." crates/nexus-recipe/src/`
Expected: zero hits — the compiler is fully generic and table-driven from projections.

---

## Self-review notes

- Public `validate_node_config` wrapper → Task 1. ✅
- Generic target parse + nested writer (generalized from EmotionTTS `parse_path`, no curated tables) → Task 2. ✅
- Snapshot → Workflow reconstruction → Task 3. ✅
- `compile_recipe_run`: defaults→preset→user layering, locked/hidden guards, fan-out, `validate_workflow` reuse, input value-check, `ResolvedRun` w/ audit trail → Task 4. ✅
- **ResolvedRun has no executor yet** — that consumption point (`create_run_from_resolved` + frozen-graph `execute_run`) is **P3**, by design. P2 stops at producing the validated `ResolvedRun`.
- **operator_schema_hash** drift detection (design §4.1) still not wired — fill when the compiler/run path threads the registry hash; tracked for P3/P8. Flagged, not silently dropped.
- Node-config-through-`validate_workflow` happy path is integration-tested in P3 (needs the operator registry); P2 unit tests use input-only bindings to stay hermetic.
- Type-annotation reminder: plan code is Rust; `edition`/dep versions must match siblings (copy from `nexus-workflow`/`nexus-deployments` Cargo.toml).
