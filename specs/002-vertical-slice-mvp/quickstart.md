# Quickstart: Vertical Slice MVP

End-to-end walkthrough: install the example image extension, start the host, select a recipe, provide an image, execute, and inspect the output.

## Prerequisites

- Rust toolchain (latest stable): `rustup update stable`
- Python 3.11+ (for the example extension worker)
- A test image file (any `.png` or `.jpg`)

## 1. Build the Host

```bash
cd nexus-dnn
cargo build --release
```

## 2. Install the Example Extension

Copy the example image extension into the local extensions directory:

```bash
mkdir -p ~/.nexus/extensions
cp -r extensions/examples/image-basic ~/.nexus/extensions/
```

The extension package contains:
- `manifest.yaml` -- extension identity, operators, recipe, UI contributions
- `operators/resize.yaml` -- resize operator definition
- `operators/grayscale.yaml` -- grayscale operator definition
- `recipes/basic_transform.yaml` -- recipe definition
- `workflows/basic_transform.yaml` -- three-stage workflow template
- `worker/main.py` -- Python worker implementation
- `worker/requirements.txt` -- Python dependencies (Pillow)
- `assets/thumbnail.png` -- recipe thumbnail

## 3. Start the Host

```bash
./target/release/nexus-dnn
```

The host will:
1. Initialize `~/.nexus/` (db, artifacts, logs)
2. Run database migrations (001 + 002)
3. Scan `~/.nexus/extensions/` and discover `example.image.basic`
4. Validate the manifest, operators, recipe, and UI contributions
5. Activate the extension and index all contributions
6. Launch the Python worker process and complete the handshake
7. Start the HTTP API on `http://localhost:3000`

## 4. Verify Extension Discovery

```bash
# System info
curl -s http://localhost:3000/api/v1/system/info | jq .data

# Extensions
curl -s http://localhost:3000/api/v1/extensions | jq .data.extensions

# Operators
curl -s http://localhost:3000/api/v1/operators | jq .data

# Recipes
curl -s http://localhost:3000/api/v1/recipes | jq .data.recipes

# Tools (unified view)
curl -s http://localhost:3000/api/v1/tools | jq .data.tools

# UI contributions
curl -s http://localhost:3000/api/v1/ui/contributions | jq .data.contributions
```

You should see:
- 1 extension (`example.image.basic`) in `active` state
- 2 operators (`image.resize`, `image.grayscale`)
- 1 recipe (`recipe.image.basic_transform`)
- 3 tools (2 operators + 1 recipe)
- UI contributions: 1 artifact viewer, 1 command

## 5. Open the Browser UI (optional)

```bash
cd apps/web
npm install
npm run dev
```

Open `http://localhost:5173`. The three-zone shell loads:
- **Left rail**: recipe catalog shows "Basic Image Transform" with thumbnail
- **Center canvas**: empty (no workflow loaded yet)
- **Right inspector**: empty

## 6. Select the Recipe and Provide Inputs

**Via UI**: Click the "Basic Image Transform" recipe card. The recipe form shows three fields: Source Image, Target Width, Target Height. Upload an image and set dimensions.

**Via CLI**:

First, store the source image as an input artifact:

```bash
# Register the workflow from the recipe template
curl -s -X POST http://localhost:3000/api/v1/workflows \
  -H "Content-Type: application/yaml" \
  --data-binary @~/.nexus/extensions/image-basic/workflows/basic_transform.yaml \
  | jq .data.id
```

Save the returned workflow ID, then create a run:

```bash
curl -s -X POST http://localhost:3000/api/v1/runs \
  -H "Content-Type: application/json" \
  -d '{
    "workflow_id": "<workflow-id>",
    "inputs": {
      "source_image": { "file_path": "/path/to/your/test-image.png" }
    },
    "config_overrides": {
      "resize_1": { "width": 256, "height": 256 }
    }
  }' | jq .data
```

## 7. Watch Execution Progress

**Via WebSocket**:

```bash
websocat ws://localhost:3000/api/v1/events
```

You will see events in order:
1. `run.created` -- run record created
2. `run.state_changed` -- created -> planning
3. `run.state_changed` -- planning -> running
4. `node.scheduled` -- resize_1 assigned to worker
5. `node.started` -- resize_1 executing
6. `node.progress` -- resize_1 progress updates
7. `node.completed` -- resize_1 finished
8. `artifact.produced` -- resized image artifact registered
9. `node.scheduled` -> `node.started` -> `node.progress` -> `node.completed` -- grayscale_1
10. `artifact.produced` -- grayscale image artifact registered
11. `node.scheduled` -> `node.started` -> `node.completed` -- export_1
12. `artifact.produced` -- final output artifact
13. `run.state_changed` -- running -> completed

**Via polling**:

```bash
curl -s http://localhost:3000/api/v1/runs/<run-id> | jq .data.status
```

## 8. Inspect the Output

List artifacts from the run:

```bash
curl -s "http://localhost:3000/api/v1/artifacts?run_id=<run-id>" | jq .data.artifacts
```

Get artifact detail with viewer candidates:

```bash
curl -s http://localhost:3000/api/v1/artifacts/<artifact-id> | jq .data
```

Download the artifact content:

```bash
curl -s http://localhost:3000/api/v1/artifacts/<artifact-id>/blob -o output.png
```

Check provenance (input chain):

```bash
curl -s http://localhost:3000/api/v1/artifacts/<artifact-id>/lineage | jq .data
```

The lineage response traces back through:
- Output artifact (grayscale image)
- Intermediate artifact (resized image)
- Input artifact (original source image)
- Operator versions, extension versions, and config values at each step

## 9. Retry a Failed Run (if applicable)

If a run failed:

```bash
curl -s -X POST http://localhost:3000/api/v1/runs/<failed-run-id>/retry | jq .data
```

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Extension shows `invalid` state | Manifest validation failed | Check `validation_errors` in extension detail response |
| Worker not starting | Python not found or missing deps | Ensure Python 3.11+ is on PATH; run `pip install -r worker/requirements.txt` in the extension dir |
| Run stuck in `planning` | No healthy worker for required operators | Check `/health` and worker status in extension detail |
| Artifact content returns 404 | Blob not written to artifact store | Check host logs for artifact finalization errors |
| WebSocket disconnects | Host restart or network issue | Reconnect; run state is recoverable from GET endpoints |
