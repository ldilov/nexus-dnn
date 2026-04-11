# 🔌 Extension Development Guide

Extensions are installable packages that contribute operators, recipes, and runtime
capabilities to Nexus. Each extension is a self-contained directory with a manifest,
operator definitions, an optional worker process, and optional recipe files. The host
discovers extensions at startup, validates their manifests, launches their workers, and
indexes their operators into the global registry.

---

## 🎯 What Extensions Can Do

- **Add operators** — define typed, configurable processing nodes (image filters, model
  inference, text transforms, etc.)
- **Provide recipes** — ship pre-built workflow templates that users can instantiate
- **Declare runtime adapters** — choose between Python workers, native binaries, built-in
  host functions, or external service connectors
- **Contribute UI metadata** — supply display names, categories, and resource hints so
  frontends can render rich operator palettes

---

## 📁 Extension Package Structure

```
my-extension/
├── manifest.yaml
├── operators/
│   └── my_operator.yaml
├── worker/
│   ├── main.py
│   └── requirements.txt
└── recipes/          (optional)
    └── my_recipe.yaml
```

| Path | Purpose |
|------|---------|
| `manifest.yaml` | Declares identity, compatibility, runtime, and file references |
| `operators/` | One YAML file per operator definition |
| `worker/` | Worker process source code executed by the host |
| `recipes/` | Pre-built workflow templates bundled with the extension |

---

## 📋 Manifest Format

The manifest is the single source of truth the host reads when discovering an extension.

```yaml
spec_version: "0.1"

extension:
  id: "acme.imaging.super-resolve"
  version: "0.2.0"
  name: "Super Resolution"
  description: "Upscales images using diffusion-based super resolution."
  publisher: "acme"

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
    requirements_file: "worker/requirements.txt"

capabilities:
  - "gpu.compute"
  - "filesystem.read"
  - "filesystem.write"

operators:
  - file: "operators/upscale.yaml"

recipes:
  - file: "recipes/4x-upscale.yaml"
```

### Section breakdown

| Section | Fields | Description |
|---------|--------|-------------|
| `extension` | `id`, `version`, `name`, `description`, `publisher` | Identity and metadata. `id` is globally unique and dot-separated. `version` follows SemVer. |
| `compatibility` | `host_api`, `protocol`, `platforms` | Version ranges the extension supports. The host rejects activation when its own version falls outside the declared range. `platforms` is optional. |
| `runtime` | `family`, `entrypoint`, `environment` | How the host launches the worker. `family` is one of `python`, `native`, `builtin`, `external_service`. |
| `capabilities` | (list) | Permission declarations such as `gpu.compute`, `filesystem.read`, `network.remote`. |
| `operators` | (list of file refs) | Paths to operator YAML files relative to the extension root. |
| `recipes` | (list of file refs) | Paths to recipe YAML files relative to the extension root. |

> 💡 **Tip:** Use Cargo-style semver ranges for compatibility (e.g., `>=0.1.0, <1.0.0`)

---

## 📊 Operator Definition

Each operator lives in its own YAML file referenced from the manifest.

```yaml
spec_version: "0.1"

operator:
  id: "upscale"
  version: "1.0.0"
  display_name: "Image Upscale"
  description: "Upscales an image by a configurable scale factor."
  category: "Imaging"

execution:
  mode: "job"
  cacheable: true
  resumable: false

inputs:
  - name: "image"
    type: "image/rgb"
    required: true
  - name: "scale"
    type: "scalar/integer"
    required: false
    default: 4

outputs:
  - name: "upscaled"
    type: "image/rgb"

config_schema:
  type: object
  properties:
    model:
      type: string
      enum: ["esrgan", "swinir"]
    tile_size:
      type: integer
      minimum: 64
      maximum: 1024
  required:
    - model

resources:
  gpu: true
  min_vram_mb: 4096
  cpu_cores: 2
```

### Section breakdown

| Section | Description |
|---------|-------------|
| `operator` | Identity block: `id` (unique within extension), `version`, `display_name`, `category`. |
| `execution` | `mode` (`job` or `streaming` — v0 supports `job` only), `cacheable`, `resumable`. |
| `inputs` | Array of typed input ports. Each has `name`, `type`, `required`, and optional `default`. |
| `outputs` | Array of typed output ports. Each has `name` and `type`. |
| `config_schema` | Standard JSON Schema describing operator configuration. Validated before execution. |
| `resources` | Scheduler hints: `gpu` (bool), `min_vram_mb`, `cpu_cores`. |

---

## 📦 Port Types (v0)

Port types use a structured `category/subtype` format. In v0, edge validation requires
an exact type match between connected ports.

| Type | Description |
|------|-------------|
| `image/rgb` | RGB image |
| `image/mask` | Binary or grayscale mask |
| `video/frame-sequence` | Ordered frame sequence |
| `video/encoded` | Encoded video file |
| `audio/waveform` | Raw audio waveform |
| `text/prompt` | Text prompt |
| `text/plain` | Plain text |
| `scalar/integer` | Integer value |
| `scalar/float` | Float value |
| `scalar/boolean` | Boolean value |
| `metadata/json` | Arbitrary JSON metadata |

---

## 🐍 Writing a Python Worker

The Python SDK provides `BaseWorker` and `ExecutionContext` to handle the JSON-RPC
protocol. A worker registers one handler per operator, receives typed inputs and
configuration, and returns a result dictionary.

### Minimal worker (`worker/main.py`)

```python
from __future__ import annotations

import sys
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).resolve().parents[4] / "sdk" / "python"))

from nexus_sdk.worker import BaseWorker, ExecutionContext


def echo_handler(
    inputs: dict[str, Any],
    config: dict[str, Any],
    context: ExecutionContext,
) -> dict[str, Any]:
    text = inputs.get("text", {}).get("value", "")
    prefix = config.get("prefix", "")
    output_text = f"{prefix}{text}" if prefix else text

    context.send_progress(50, "Processing...")

    write_ref = context.output_targets.get("text_out", {}).get("artifact_write_ref", "")
    artifact_ref = (
        write_ref.replace("artifact-write://", "artifact://")
        if write_ref
        else f"artifact://text_out_{context.request_id}"
    )

    return {
        "status": "completed",
        "outputs": {
            "text_out": {
                "artifact_ref": artifact_ref,
                "type": "text/plain",
            }
        },
        "metrics": {"duration_ms": 1},
    }


worker = BaseWorker(
    extension_id="nexus.utility.hello-world",
    extension_version="0.1.0",
    worker_name="hello-world-worker",
)
worker.register_operator("echo", "1.0.0", echo_handler)
worker.run()
```

### How it works

| Component | Role |
|-----------|------|
| **Handler function** | Receives `inputs` (port values), `config` (operator config), and `context`. Returns a result dict with `status`, `outputs`, and `metrics`. |
| **`context.send_progress(percent, message)`** | Sends a progress notification to the host (forwarded to the event stream). |
| **`context.send_log(level, message)`** | Sends a log notification (`info`, `warn`, `error`). |
| **`context.output_targets`** | Maps output port names to artifact write references provided by the host. |
| **`context.is_cancelled`** | Boolean property — check periodically in long-running handlers. |

The result dictionary must contain:

```python
{
    "status": "completed",
    "outputs": {
        "<port_name>": {
            "artifact_ref": "artifact://...",
            "type": "<port_type>"
        }
    },
    "metrics": {"duration_ms": <int>}
}
```

Set `"status": "failed"` and include an `"error"` key to signal failure.

---

## 📦 Installing Extensions

Copy the extension directory into the Nexus extensions folder:

```bash
cp -r my-extension/ ~/.nexus/extensions/
```

Restart the host or trigger a rescan:

```bash
curl -X POST http://localhost:3000/api/v1/extensions/acme.imaging.super-resolve/rescan
```

---

## ✅ Validation Rules

The host rejects activation when any of these checks fail:

- Required manifest fields (`spec_version`, `extension.id`, `extension.version`,
  `compatibility.host_api`, `compatibility.protocol`, `runtime.family`,
  `runtime.entrypoint`) are missing
- `spec_version` is not a supported value
- `runtime.family` is not one of `python`, `native`, `builtin`, `external_service`
- `compatibility.host_api` does not include the current host version
- `compatibility.protocol` does not include the current protocol version
- Duplicate operator IDs exist within the extension
- Referenced operator or recipe files do not exist on disk
- `config_schema` on any operator is not valid JSON Schema
- Unknown capability declarations are present

---

## 🔗 Related Documentation

- [📋 Worker Protocol](../specs/001-arch-core-setup/contracts/worker-protocol.md) — JSON-RPC
  message format between host and worker
- [🐍 Python SDK](../sdk/python/) — `BaseWorker`, `ExecutionContext`, protocol helpers
- [📋 Host API Reference](../specs/001-arch-core-setup/contracts/host-api.md) — REST endpoints
  for extensions, operators, workflows, and runs
