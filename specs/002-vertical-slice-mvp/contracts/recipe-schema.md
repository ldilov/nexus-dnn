# Recipe YAML Schema

**Spec Version**: 0.1
**Format**: YAML
**Location**: Referenced by `recipes[].file` in the extension manifest

A recipe is a curated workflow entry point contributed by an extension. It maps user-facing fields to workflow inputs and node config values, giving end users a simplified form instead of raw workflow construction.

## Full Shape

```yaml
spec_version: "0.1"

recipe:
  id: "recipe.image.basic_transform"
  version: "0.1.0"
  display_name: "Basic Image Transform"
  summary: "Resize and convert an image to grayscale."
  category: "Image"
  thumbnail: "assets/thumbnail.png"
  input_summary: "Source image, target width, target height"

workflow_template: "workflows/basic_transform.yaml"

bindings:
  fields:
    - field: "sourceImage"
      maps_to: "input:source_image"
    - field: "targetWidth"
      maps_to: "node:resize_1.config.width"
    - field: "targetHeight"
      maps_to: "node:resize_1.config.height"
```

## Field Reference

### Top-level

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `spec_version` | String | yes | Must be `"0.1"` |
| `recipe` | Object | yes | Recipe identity and display metadata |
| `workflow_template` | String | yes | Relative path to the workflow YAML within the extension package |
| `bindings` | Object | yes | Field-to-workflow mapping declarations |

### recipe

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String | yes | Globally unique recipe identifier, dot-separated (e.g., `recipe.image.basic_transform`) |
| `version` | SemVer | yes | Recipe version |
| `display_name` | String | yes | Human-readable name shown in the UI |
| `summary` | String | yes | One-line description of what the recipe does |
| `category` | String | yes | Grouping category for filtering and display (e.g., `Image`, `Video`, `Audio`) |
| `thumbnail` | String | no | Relative path to a thumbnail image within the extension package |
| `input_summary` | String | no | Brief description of expected inputs for tooltip or card display |

### workflow_template

Relative path from the extension package root to a workflow YAML file. The host resolves this path during extension validation. If the file does not exist, the extension is rejected with a structured error.

The referenced workflow YAML uses the same schema as any workflow submitted to `POST /workflows`, but it is not persisted until a run is requested through the recipe. The host instantiates the workflow template at recipe invocation time.

### bindings.fields

Each entry maps a user-facing field name to a target path in the workflow.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `field` | String | yes | User-facing field name displayed in the recipe form |
| `maps_to` | String | yes | Target path in the workflow (see path format below) |

**maps_to path format**:

| Prefix | Meaning | Example |
|--------|---------|---------|
| `input:` | Maps to a declared workflow-level input port | `input:source_image` |
| `node:<node_id>.config.<key>` | Maps to a specific config key on a specific node | `node:resize_1.config.width` |

## Validation Rules

The host rejects a recipe during extension validation if:

- `spec_version` is not `"0.1"`
- Any required field is missing
- `recipe.id` is not globally unique across all active extensions
- `recipe.version` is not valid semver
- `workflow_template` path does not resolve to an existing file within the extension package
- Any `bindings.fields[].maps_to` path uses an unrecognized prefix (not `input:` or `node:`)
- The workflow template itself fails structural validation (DAG, ports, operator refs)

## Example: Minimal Recipe

```yaml
spec_version: "0.1"

recipe:
  id: "recipe.text.echo"
  version: "1.0.0"
  display_name: "Echo Text"
  summary: "Pass text through unchanged."
  category: "Utility"

workflow_template: "workflows/echo.yaml"

bindings:
  fields:
    - field: "text"
      maps_to: "input:text"
```
