# Extension Manifest Contract

**Spec Version**: 0.1
**Format**: YAML (validated against JSON Schema)
**Location**: `manifest.yaml` at extension package root

## Full Manifest Shape

```yaml
spec_version: "0.1"

extension:
  id: "publisher.category.name"
  name: "Human Readable Name"
  version: "0.1.0"
  description: "Short description of what this extension does."
  publisher: "publisher-name"

compatibility:
  host_api: ">=0.1.0, <0.2.0"
  protocol: ">=0.1.0, <0.2.0"
  platforms:
    - linux-x64
    - windows-x64

runtime:
  family: "python"
  entrypoint: "worker/main.py"
  environment:
    python: "3.11"
    requirements_file: "worker/requirements.txt"

capabilities:
  - "gpu.compute"
  - "filesystem.read"
  - "filesystem.write"

operators:
  - file: "operators/my_operator.yaml"

recipes:
  - file: "recipes/my_recipe.yaml"
```

## Required Fields

| Path | Type | Description |
|------|------|-------------|
| `spec_version` | String | Must be "0.1" |
| `extension.id` | String | Globally unique, dot-separated |
| `extension.version` | SemVer | Extension version |
| `compatibility.host_api` | VersionReq | Cargo-style semver range |
| `compatibility.protocol` | VersionReq | Cargo-style semver range |
| `runtime.family` | Enum | `python`, `native`, `builtin`, `external_service` |
| `runtime.entrypoint` | Path | Relative path to worker entry |

## Optional Fields

| Path | Type | Description |
|------|------|-------------|
| `extension.name` | String | Display name |
| `extension.description` | String | Short description |
| `extension.publisher` | String | Publisher identifier |
| `compatibility.platforms` | Vec<String> | Target platform constraints |
| `runtime.environment` | Map | Runtime-specific env config |
| `capabilities` | Vec<String> | Capability declarations |
| `operators` | Vec<FileRef> | Operator definition files |
| `recipes` | Vec<FileRef> | Recipe definition files |

## Operator Definition Shape

File referenced by `operators[].file`:

```yaml
spec_version: "0.1"

operator:
  id: "operator.name"
  version: "1.0.0"
  display_name: "Operator Name"
  description: "What this operator does."
  category: "Category"

execution:
  mode: "job"
  cacheable: true
  resumable: false

inputs:
  - name: "input_name"
    type: "image/rgb"
    required: true
  - name: "optional_param"
    type: "scalar/integer"
    required: false
    default: 42

outputs:
  - name: "output_name"
    type: "image/rgb"

config_schema:
  type: object
  properties:
    param_a:
      type: string
    param_b:
      type: integer
      minimum: 1
  required: [param_a]

resources:
  gpu: false
  min_vram_mb: 0
  cpu_cores: 1
```

## Validation Rules

The host rejects activation if:
- Required fields are missing
- `spec_version` is not "0.1"
- `runtime.family` is not a supported value
- `compatibility.host_api` does not include current host version
- `compatibility.protocol` does not include current protocol version
- Duplicate operator IDs exist within the extension
- `config_schema` is not valid JSON Schema
- Referenced operator/recipe files do not exist
- Unknown capability declarations are present

## Port Type Identifiers (v0)

Structured string format: `category/subtype`

| Type | Description |
|------|-------------|
| `image/rgb` | RGB image |
| `image/mask` | Binary or grayscale mask |
| `video/frame-sequence` | Ordered frame sequence |
| `video/encoded` | Encoded video file |
| `audio/waveform` | Raw audio waveform |
| `text/prompt` | Text prompt |
| `text/plain` | Plain text |
| `text/transcript` | Transcription output |
| `tensor/latent/*` | Latent space tensors |
| `model/checkpoint/*` | Model checkpoints |
| `model/lora` | LoRA weights |
| `scalar/integer` | Integer value |
| `scalar/float` | Float value |
| `scalar/boolean` | Boolean value |
| `metadata/json` | Arbitrary JSON metadata |
