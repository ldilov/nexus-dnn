# 📊 Workflow Authoring

Workflows are typed directed acyclic graphs (DAGs) that wire operator nodes together
through typed ports. The host validates the graph structure, checks port compatibility,
resolves operator references, and orchestrates execution across worker processes. Workflow
definitions are written in YAML and submitted via the REST API.

---

## 🎯 Concepts

| Concept | Definition |
|---------|------------|
| **Workflow** | A typed DAG describing a processing pipeline — nodes, edges, inputs, outputs |
| **Node** | A concrete use of a registered operator within the workflow |
| **Edge** | A connection between an output port on one node (or a workflow input) and an input port on another node |
| **Stage** | A named grouping of nodes for visualization and logical organization |
| **Port** | A typed input or output on an operator (e.g., `image/rgb`, `text/plain`) |

---

## 📋 Workflow YAML Format

```yaml
spec_version: "0.1"

workflow:
  id: "echo-chain"
  version: "0.1.0"
  title: "Echo Chain Workflow"

  inputs:
    - name: "text"
      type: "text/plain"

  stages:
    - id: "transform"
      label: "Transform"
    - id: "finalize"
      label: "Finalize"

  nodes:
    - id: "prefix_node"
      operator: "echo@1.0.0"
      stage: "transform"
      inputs:
        text:
          from: "input:text"
      config:
        prefix: ">>> "

    - id: "suffix_node"
      operator: "echo@1.0.0"
      stage: "finalize"
      inputs:
        text:
          from: "prefix_node:text_out"
      config:
        prefix: "[done] "

  outputs:
    - name: "result"
      from: "suffix_node:text_out"
```

### Field reference

| Field | Required | Description |
|-------|----------|-------------|
| `spec_version` | Yes | Schema version — must be `"0.1"` |
| `workflow.id` | Yes | Unique workflow identifier |
| `workflow.version` | Yes | SemVer version string |
| `workflow.title` | Yes | Human-readable title |
| `workflow.inputs` | Yes | Array of workflow-level input ports (`name` + `type`) |
| `workflow.stages` | No | Array of stage definitions (`id` + `label`) for grouping |
| `workflow.nodes` | Yes | Array of node instances |
| `workflow.outputs` | Yes | Array of output bindings (`name` + `from`) |

### Node fields

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique within the workflow |
| `operator` | Yes | Operator reference in `id@version` format |
| `stage` | No | Stage ID this node belongs to |
| `inputs` | Yes | Map of port name to input binding |
| `config` | No | Operator configuration values |

---

## 🔄 Input Binding Types

Node inputs support two binding styles:

### Reference binding

Connects to a workflow input or another node's output port.

```yaml
inputs:
  text:
    from: "input:text"
```

```yaml
inputs:
  text:
    from: "prefix_node:text_out"
```

| Pattern | Meaning |
|---------|---------|
| `input:<name>` | Binds to a workflow-level input port |
| `<node_id>:<port_name>` | Binds to an output port on another node |

### Literal binding

Provides a static value directly.

```yaml
inputs:
  text:
    value: "hello world"
```

> 💡 **Tip:** Literal bindings are useful for fixed parameters that do not change between
> runs. Use reference bindings for values that flow through the graph.

---

## 📦 Operator References

Operator references use the format `operator_id@version`:

```yaml
operator: "echo@1.0.0"
```

```yaml
operator: "upscale@2.1.0"
```

The referenced operator must be registered from an active extension. The host resolves
the reference against the global operator registry during workflow validation. If the
extension is not installed or has been disabled, validation fails with `UnknownOperator`.

---

## ✅ Validation Rules

The host validates every workflow on submission. A workflow is rejected when any of these
checks fail:

| Rule | Error Code |
|------|------------|
| Graph must be a valid DAG (no cycles) | `CycleDetected` |
| All node IDs must be unique within the workflow | `DuplicateNodeId` |
| All edges must connect compatible port types (exact match in v0) | `TypeMismatch` |
| All operator references must resolve to registered operators | `UnknownOperator` |
| All required input ports must have an edge or a default value | `MissingRequiredInput` |
| Config values must validate against the operator's `config_schema` | `ConfigValidationError` |

---

## 🚀 Submitting a Workflow

```bash
curl -X POST http://localhost:3000/api/v1/workflows \
  -H "Content-Type: application/yaml" \
  --data-binary @my-workflow.yaml
```

A successful response returns the created workflow with validation status:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Echo Chain Workflow",
  "version": "0.1.0",
  "node_count": 2,
  "stage_count": 2,
  "validation": {
    "status": "valid",
    "warnings": []
  }
}
```

---

## 🚀 Running a Workflow

```bash
curl -X POST http://localhost:3000/api/v1/runs \
  -H "Content-Type: application/json" \
  -d '{"workflow_id": "<workflow-id>"}'
```

For workflows with inputs, supply values in the request body:

```bash
curl -X POST http://localhost:3000/api/v1/runs \
  -H "Content-Type: application/json" \
  -d '{
    "workflow_id": "<workflow-id>",
    "inputs": {
      "text": { "value": "hello world" }
    }
  }'
```

Monitor run status:

```bash
curl http://localhost:3000/api/v1/runs/<run-id>
```

---

## ⚠️ Common Mistakes

| Mistake | Error | Fix |
|---------|-------|-----|
| Wrong port type on edge | `TypeMismatch` | Check the operator's declared input/output types in its YAML definition |
| Missing required input | `MissingRequiredInput` | Add a reference or literal binding, or set a `default` on the operator port |
| Circular dependency | `CycleDetected` | Remove the circular node reference — workflows must be acyclic |
| Unknown operator | `UnknownOperator` | Install the extension that provides the operator, then rescan |
| Duplicate node ID | `DuplicateNodeId` | Rename one of the conflicting nodes to a unique ID |
| Invalid config value | `ConfigValidationError` | Compare config values against the operator's `config_schema` |

---

## 🔗 Related Documentation

- [🔌 Extension Development Guide](extension-guide.md) — creating extensions, operators, and
  workers
- [📋 Host API Reference](../specs/001-arch-core-setup/contracts/host-api.md) — REST endpoints
  for workflows, runs, artifacts, and events
- [📊 Data Model](../specs/001-arch-core-setup/data-model.md) — entity definitions for
  Workflow, Node, Edge, Run, and Artifact
