# 📋 API Reference

**Base URL**: `http://localhost:3000/api/v1`

All responses use `Content-Type: application/json` unless otherwise noted.

---

## ✅ Health

### `GET /health`

Returns current host health status.

**Response** `200`

```json
{
  "status": "ok",
  "uptime_secs": 3612,
  "extensions_loaded": 3,
  "workers_active": 2
}
```

---

## 📦 Extensions

### `GET /extensions`

List all discovered extensions.

**Response** `200`

```json
{
  "extensions": [
    {
      "id": "ai.nexus.image-preprocessor",
      "name": "Image Preprocessor",
      "version": "0.2.0",
      "status": "active",
      "runtime_family": "python"
    }
  ]
}
```

### `GET /extensions/{id}`

Get a single extension by ID.

**Response** `200`

```json
{
  "id": "ai.nexus.image-preprocessor",
  "name": "Image Preprocessor",
  "version": "0.2.0",
  "description": "Resize, crop, and normalize images",
  "publisher": "nexus-team",
  "host_api_compat": ">=0.1.0",
  "protocol_compat": ">=0.1.0",
  "runtime_family": "python",
  "entrypoint": "worker.py",
  "capabilities": "[\"filesystem.read\",\"gpu.compute\"]",
  "status": "active",
  "directory": "/home/user/.nexus/extensions/image-preprocessor",
  "installed_at": "2026-04-10T08:00:00Z"
}
```

### `POST /extensions/{id}/rescan`

Trigger a rescan of the extension directory. Re-validates the manifest and re-indexes operators.

**Response** `200`

```json
{
  "id": "ai.nexus.image-preprocessor",
  "status": "active",
  "operators_indexed": 3
}
```

---

## 🔌 Operators

### `GET /operators`

List all indexed operators across all active extensions.

**Response** `200`

```json
{
  "operators": [
    {
      "id": "resize_image",
      "version": "1.0.0",
      "extension_id": "ai.nexus.image-preprocessor",
      "display_name": "Resize Image",
      "category": "image"
    }
  ]
}
```

### `GET /operators/{id}`

Get a single operator by ID.

**Response** `200`

```json
{
  "id": "resize_image",
  "version": "1.0.0",
  "extension_id": "ai.nexus.image-preprocessor",
  "display_name": "Resize Image",
  "description": "Resize an image to target dimensions",
  "category": "image",
  "inputs": "[{\"name\":\"image\",\"type\":\"tensor\"}]",
  "outputs": "[{\"name\":\"resized\",\"type\":\"tensor\"}]",
  "config_schema": "{\"type\":\"object\",\"properties\":{\"width\":{\"type\":\"integer\"}}}",
  "execution_mode": "sync",
  "cacheable": 1,
  "resumable": 0
}
```

---

## 📊 Workflows

### `POST /workflows`

Create a new workflow from a YAML definition.

**Content-Type**: `text/plain` (raw YAML body)

**Request body**

```yaml
id: my-pipeline
title: My Pipeline
version: "1.0.0"

inputs:
  - name: raw_image
    type: tensor

stages:
  - id: preprocess
    label: Preprocessing

nodes:
  - id: resize
    operator: resize_image@1.0.0
    stage: preprocess
    inputs:
      image: { from: "input:raw_image" }
    config:
      width: 224
      height: 224

outputs:
  - name: result
    from: "resize:resized"
```

**Response** `201`

```json
{
  "id": "my-pipeline",
  "title": "My Pipeline",
  "version": "1.0.0"
}
```

### `GET /workflows`

List all stored workflows.

**Response** `200`

```json
{
  "workflows": [
    {
      "id": "my-pipeline",
      "title": "My Pipeline",
      "version": "1.0.0",
      "created_at": "2026-04-10T10:00:00Z",
      "updated_at": "2026-04-10T10:00:00Z"
    }
  ]
}
```

### `GET /workflows/{id}`

Get a workflow by ID, including full node and edge definitions.

**Response** `200`

```json
{
  "id": "my-pipeline",
  "title": "My Pipeline",
  "version": "1.0.0",
  "inputs": "[{\"name\":\"raw_image\",\"type\":\"tensor\"}]",
  "outputs": "[{\"name\":\"result\",\"from\":\"resize:resized\"}]",
  "nodes": "[{\"id\":\"resize\",\"operator\":\"resize_image@1.0.0\"}]",
  "edges": "[{\"source_node\":\"input\",\"source_port\":\"raw_image\",\"target_node\":\"resize\",\"target_port\":\"image\"}]",
  "stages": "[{\"id\":\"preprocess\",\"label\":\"Preprocessing\"}]",
  "created_at": "2026-04-10T10:00:00Z",
  "updated_at": "2026-04-10T10:00:00Z"
}
```

### `DELETE /workflows/{id}`

Delete a workflow by ID.

**Response** `200`

```json
{
  "deleted": "my-pipeline"
}
```

---

## 🚀 Runs

### `POST /runs`

Start a new run for a workflow. The run is created and execution begins asynchronously.

**Request body**

```json
{
  "workflow_id": "my-pipeline"
}
```

**Response** `201`

```json
{
  "run_id": "run-a1b2c3d4",
  "status": "created"
}
```

### `GET /runs`

List all runs.

**Response** `200`

```json
{
  "runs": [
    {
      "id": "run-a1b2c3d4",
      "workflow_id": "my-pipeline",
      "workflow_version": "1.0.0",
      "status": "completed",
      "created_at": "2026-04-10T10:05:00Z"
    }
  ]
}
```

### `GET /runs/{id}`

Get a run with its node executions and produced artifacts.

**Response** `200`

```json
{
  "run": {
    "id": "run-a1b2c3d4",
    "workflow_id": "my-pipeline",
    "status": "completed",
    "started_at": "2026-04-10T10:05:01Z",
    "completed_at": "2026-04-10T10:05:12Z"
  },
  "nodes": [
    {
      "run_id": "run-a1b2c3d4",
      "node_id": "resize",
      "status": "produced_output",
      "duration_ms": 1200
    }
  ],
  "artifacts": [
    {
      "id": "art-x1y2z3",
      "artifact_type": "tensor",
      "node_id": "resize",
      "port_name": "resized",
      "size_bytes": 602112
    }
  ]
}
```

### `POST /runs/{id}/cancel`

Cancel a running execution.

**Response** `200`

```json
{
  "run_id": "run-a1b2c3d4",
  "status": "cancelled"
}
```

---

## 📁 Artifacts

### `GET /artifacts/{id}`

Get artifact metadata.

**Response** `200`

```json
{
  "id": "art-x1y2z3",
  "artifact_type": "tensor",
  "run_id": "run-a1b2c3d4",
  "node_id": "resize",
  "port_name": "resized",
  "content_hash": "sha256:a1b2c3...",
  "size_bytes": 602112,
  "blob_path": "/data/artifacts/art-x1y2z3.bin",
  "metadata": null,
  "created_at": "2026-04-10T10:05:11Z"
}
```

### `GET /artifacts/{id}/blob`

Download the raw artifact binary.

**Response** `200`  
**Content-Type**: `application/octet-stream`

Returns the binary blob as a streamed response.

### `GET /artifacts/{id}/lineage`

Get the provenance graph for an artifact -- which upstream artifacts contributed to it.

**Response** `200`

```json
{
  "artifact_id": "art-x1y2z3",
  "lineage": [
    {
      "output_artifact_id": "art-x1y2z3",
      "input_artifact_id": "art-w0v9u8",
      "run_id": "run-a1b2c3d4",
      "node_id": "resize"
    }
  ]
}
```

---

## 📊 Event Stream

### `GET /events` (WebSocket)

Upgrade to a WebSocket connection for real-time event streaming.

**Query parameters**

| Parameter    | Type   | Description                          |
|:-------------|:-------|:-------------------------------------|
| `run_id`     | string | Filter events to a specific run      |
| `event_type` | string | Filter to a single event type        |

**Event types**

| Type                  | Key Fields                                      |
|:----------------------|:------------------------------------------------|
| `workflow_updated`    | `workflow_id`                                   |
| `run_created`         | `run_id`, `workflow_id`                         |
| `run_state_changed`   | `run_id`, `old_status`, `new_status`            |
| `node_scheduled`      | `run_id`, `node_id`, `worker_id`                |
| `node_started`        | `run_id`, `node_id`                             |
| `node_progress`       | `run_id`, `node_id`, `percent`, `message`       |
| `node_completed`      | `run_id`, `node_id`, `artifact_ids`             |
| `node_failed`         | `run_id`, `node_id`, `error`                    |
| `artifact_produced`   | `artifact_id`, `run_id`, `node_id`              |
| `worker_health_changed` | `worker_id`, `old_status`, `new_status`       |

**Example WebSocket message**

```json
{
  "type": "node_progress",
  "run_id": "run-a1b2c3d4",
  "node_id": "resize",
  "percent": 75,
  "message": "Resizing batch 3/4"
}
```

---

## ⚠️ Error Format

All error responses share a consistent envelope:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Workflow with id 'xyz' not found"
  }
}
```

### Status Codes

| Code | Meaning                                            |
|:-----|:---------------------------------------------------|
| 200  | Success                                            |
| 201  | Created (new workflow or run)                      |
| 400  | Bad request -- invalid YAML, missing fields, validation failure |
| 404  | Resource not found                                 |
| 409  | Conflict -- duplicate ID or state violation        |
| 500  | Internal server error                              |

---

## 🔗 Related

- [Getting Started](getting-started.md)
- [Architecture](architecture.md)
