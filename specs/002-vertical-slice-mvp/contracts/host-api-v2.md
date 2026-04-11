# Host API Contract -- Sprint 002 Additions

**Version**: 0.1.0
**Transport**: HTTP + WebSocket
**Base URL**: `http://localhost:{port}/api/v1`

This document covers endpoints added or modified in sprint 002. Existing sprint 001 endpoints (`/health`, `GET /extensions`, `GET /extensions/{id}`, `POST /extensions/{id}/rescan`, `GET /operators`, `GET /operators/{id}`, `GET /workflows`, `POST /workflows`, `GET /workflows/{id}`, `DELETE /workflows/{id}`, `POST /runs`, `GET /runs`, `GET /runs/{id}`, `POST /runs/{id}/cancel`, `GET /artifacts/{id}`, `GET /artifacts/{id}/blob`, `GET /artifacts/{id}/lineage`, `GET /events`) remain unchanged. See `001-arch-core-setup/contracts/host-api.md` for their shapes.

All responses use the envelope defined in `response-envelope.md`.

---

## System

### GET /api/v1/system/info

Returns host identity, API version, supported runtime families, supported spec versions, and workspace configuration.

**Response** `200`:
```json
{
  "data": {
    "host_version": "0.1.0",
    "api_version": "0.1.0",
    "protocol_version": "0.1.0",
    "supported_runtime_families": ["python", "native", "builtin", "external_service"],
    "supported_spec_versions": ["0.1"],
    "workspace_path": "/home/user/.nexus",
    "platform": "linux-x64"
  },
  "meta": { "timestamp": "2026-04-11T12:00:00Z" },
  "error": null
}
```

---

## Tools

### GET /api/v1/tools

Normalized user-facing projection over operators and recipes. This is a read-only computed view, not a persisted entity.

**Query parameters**:

| Param | Type | Description |
|-------|------|-------------|
| `q` | String (optional) | Free-text search across display_name, description, tags |
| `category` | String (optional) | Filter by category (exact match) |

**Response** `200`:
```json
{
  "data": {
    "tools": [
      {
        "id": "tool:operator:image.resize",
        "kind": "operator",
        "target_id": "image.resize",
        "display_name": "Resize Image",
        "description": "Resize an image to specified dimensions.",
        "category": "Image",
        "tags": ["image", "resize", "transform"],
        "icon": null,
        "extension_id": "example.image.basic",
        "availability": "available"
      },
      {
        "id": "tool:recipe:recipe.image.basic_transform",
        "kind": "recipe",
        "target_id": "recipe.image.basic_transform",
        "display_name": "Basic Image Transform",
        "description": "Resize and convert an image to grayscale.",
        "category": "Image",
        "tags": ["image", "resize", "grayscale"],
        "icon": null,
        "extension_id": "example.image.basic",
        "availability": "available"
      }
    ]
  },
  "meta": { "timestamp": "2026-04-11T12:00:00Z" },
  "error": null
}
```

---

## Recipes

### GET /api/v1/recipes

List all indexed recipes from active extensions.

**Response** `200`:
```json
{
  "data": {
    "recipes": [
      {
        "id": "recipe.image.basic_transform",
        "version": "0.1.0",
        "display_name": "Basic Image Transform",
        "summary": "Resize and convert an image to grayscale.",
        "category": "Image",
        "extension_id": "example.image.basic",
        "extension_version": "0.1.0",
        "workflow_template_ref": "workflows/basic_transform.yaml",
        "thumbnail": "assets/thumbnail.png",
        "input_summary": "Source image, target width, target height",
        "bindings": [
          { "field": "sourceImage", "maps_to": "input:source_image" },
          { "field": "targetWidth", "maps_to": "node:resize_1.config.width" },
          { "field": "targetHeight", "maps_to": "node:resize_1.config.height" }
        ],
        "created_at": "2026-04-11T10:00:00Z"
      }
    ]
  },
  "meta": { "timestamp": "2026-04-11T12:00:00Z" },
  "error": null
}
```

### GET /api/v1/recipes/{recipeId}

Get a single recipe by ID.

**Response** `200`: Same shape as a single element from the `recipes` array above, wrapped in `data`.

**Response** `404`: `RECIPE_NOT_FOUND`

---

## UI Contributions

### GET /api/v1/ui/contributions

List all indexed UI contributions from active extensions.

**Query parameters**:

| Param | Type | Description |
|-------|------|-------------|
| `kind` | String (optional) | Filter by contribution kind (`artifact_viewer`, `command`, `config_widget`, `inspector_panel`, `recipe_card`, `tool_metadata`) |
| `extensionId` | String (optional) | Filter by contributing extension |
| `targetType` | String (optional) | Filter by target artifact or operator type |

**Response** `200`:
```json
{
  "data": {
    "contributions": [
      {
        "id": "image_viewer",
        "kind": "artifact_viewer",
        "extension_id": "example.image.basic",
        "display_name": "Image Viewer",
        "description": "Renders RGB, mask, and grayscale images.",
        "target": null,
        "supported_types": ["image/rgb", "image/mask", "image/grayscale"],
        "priority": 10,
        "metadata": { "fallback": "default_binary_viewer" },
        "availability": "available"
      }
    ]
  },
  "meta": { "timestamp": "2026-04-11T12:00:00Z" },
  "error": null
}
```

### GET /api/v1/ui/contributions/viewers

Convenience filter: equivalent to `GET /ui/contributions?kind=artifact_viewer`.

**Response** `200`: Same shape as `/ui/contributions`.

### GET /api/v1/ui/contributions/commands

Convenience filter: equivalent to `GET /ui/contributions?kind=command`.

**Response** `200`: Same shape as `/ui/contributions`.

### GET /api/v1/ui/contributions/inspectors

Convenience filter: equivalent to `GET /ui/contributions?kind=inspector_panel`.

**Response** `200`: Same shape as `/ui/contributions`.

### GET /api/v1/ui/contributions/widgets

Convenience filter: equivalent to `GET /ui/contributions?kind=config_widget`.

**Response** `200`: Same shape as `/ui/contributions`.

---

## Extensions (additions)

### POST /api/v1/extensions/refresh

Trigger a full rescan of all extension directories. Discovers new packages, re-validates existing ones, updates contribution counts.

**Request body**: None.

**Response** `200`:
```json
{
  "data": {
    "discovered": 2,
    "activated": 1,
    "invalid": 1,
    "unchanged": 0
  },
  "meta": { "timestamp": "2026-04-11T12:00:00Z" },
  "error": null
}
```

### POST /api/v1/extensions/{id}/enable

Transition a disabled extension back to active. Re-indexes its operators, recipes, and UI contributions.

**Request body**: None.

**Response** `204`: No content on success.

**Response** `404`: `EXTENSION_NOT_FOUND`

**Response** `409`: `INVALID_STATE_TRANSITION` (extension is not in `disabled` state)

### POST /api/v1/extensions/{id}/disable

Transition an active extension to disabled. Its operators, recipes, and UI contributions become unavailable but historical run records are preserved.

**Request body**: None.

**Response** `204`: No content on success.

**Response** `404`: `EXTENSION_NOT_FOUND`

**Response** `409`: `INVALID_STATE_TRANSITION` (extension is not in `active` state)

---

## Workflows (additions)

### POST /api/v1/workflows/validate

Validate a workflow definition without persisting it. Checks schema conformance, DAG acyclicity, port type compatibility, operator resolution, required input bindings, and config schema conformance.

**Request body**: YAML workflow definition (`Content-Type: application/yaml`).

**Response** `200`:
```json
{
  "data": {
    "valid": true,
    "node_count": 3,
    "stage_count": 2,
    "input_count": 1,
    "output_count": 1,
    "errors": [],
    "warnings": []
  },
  "meta": { "timestamp": "2026-04-11T12:00:00Z" },
  "error": null
}
```

**Response** `200` (invalid workflow -- not a 4xx because the request itself is well-formed):
```json
{
  "data": {
    "valid": false,
    "node_count": 3,
    "stage_count": 2,
    "input_count": 1,
    "output_count": 1,
    "errors": [
      {
        "path": "edges[2]",
        "code": "PORT_TYPE_MISMATCH",
        "message": "Edge from gen_1.output (image/rgb) to export_1.input (video/encoded): incompatible types"
      }
    ],
    "warnings": []
  },
  "meta": { "timestamp": "2026-04-11T12:00:00Z" },
  "error": null
}
```

### PUT /api/v1/workflows/{id}

Replace an existing workflow definition. The workflow version must be incremented. Existing runs referencing previous versions are unaffected.

**Request body**: YAML workflow definition (`Content-Type: application/yaml`).

**Response** `200`:
```json
{
  "data": {
    "id": "uuid",
    "title": "Basic Image Transform",
    "version": "0.2.0",
    "node_count": 3,
    "stage_count": 2,
    "validation": { "status": "valid", "warnings": [] }
  },
  "meta": { "timestamp": "2026-04-11T12:00:00Z" },
  "error": null
}
```

**Response** `404`: `WORKFLOW_NOT_FOUND`

**Response** `422`: `INVALID_WORKFLOW`

---

## Runs (additions)

### POST /api/v1/runs/{id}/retry

Retry a failed run. Creates a new run targeting the same workflow and inputs, referencing the original run as predecessor. Only valid when the original run is in `failed` or `cancelled` state.

**Request body**: None (re-uses original inputs) or optional overrides:
```json
{
  "input_overrides": {
    "source_image": { "artifact_ref": "artifact://new-id" }
  }
}
```

**Response** `201`:
```json
{
  "data": {
    "id": "new-run-uuid",
    "workflow_id": "uuid",
    "status": "created",
    "predecessor_run_id": "original-run-uuid",
    "created_at": "2026-04-11T12:05:00Z"
  },
  "meta": { "timestamp": "2026-04-11T12:05:00Z" },
  "error": null
}
```

**Response** `404`: `RUN_NOT_FOUND`

**Response** `409`: `RUN_NOT_RETRYABLE` (run is in `completed` or `running` state)

---

## Artifacts (additions)

### GET /api/v1/artifacts

List artifacts with optional filters.

**Query parameters**:

| Param | Type | Description |
|-------|------|-------------|
| `run_id` | String (optional) | Filter by producing run |
| `artifact_type` | String (optional) | Filter by artifact type (e.g., `image/rgb`) |
| `node_id` | String (optional) | Filter by producing node |

**Response** `200`:
```json
{
  "data": {
    "artifacts": [
      {
        "id": "uuid",
        "artifact_type": "image/rgb",
        "run_id": "uuid",
        "node_id": "grayscale_1",
        "port_name": "output",
        "content_hash": "sha256:abc123...",
        "size_bytes": 2048000,
        "created_at": "2026-04-11T10:00:12Z"
      }
    ]
  },
  "meta": { "timestamp": "2026-04-11T12:00:00Z" },
  "error": null
}
```
