# Host API Contract

**Version**: 0.1.0
**Transport**: HTTP + WebSocket
**Base URL**: `http://localhost:{port}/api/v1`

## Endpoints

### Health

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | System health with per-subsystem status |

**Response** `200 OK`:
```json
{
  "status": "healthy",
  "subsystems": {
    "database": "ok",
    "artifact_store": "ok",
    "extension_registry": "ok",
    "worker_manager": "ok",
    "event_bus": "ok"
  },
  "version": "0.1.0",
  "uptime_seconds": 3600
}
```

### Extensions

| Method | Path | Description |
|--------|------|-------------|
| GET | `/extensions` | List all discovered extensions |
| GET | `/extensions/{id}` | Get extension details |
| POST | `/extensions/{id}/rescan` | Trigger rescan of extension directory |

**GET /extensions Response**:
```json
{
  "extensions": [
    {
      "id": "nexus.example.hello",
      "name": "Hello World",
      "version": "0.1.0",
      "status": "active",
      "runtime_family": "python",
      "operator_count": 1
    }
  ]
}
```

### Operators

| Method | Path | Description |
|--------|------|-------------|
| GET | `/operators` | List all indexed operators |
| GET | `/operators/{id}` | Get operator details with ports and config schema |

### Workflows

| Method | Path | Description |
|--------|------|-------------|
| GET | `/workflows` | List stored workflows |
| POST | `/workflows` | Create/validate workflow from YAML body |
| GET | `/workflows/{id}` | Get workflow details |
| DELETE | `/workflows/{id}` | Remove workflow |

**POST /workflows Request**: YAML workflow definition in body (Content-Type: application/yaml)
**Response** `201 Created`:
```json
{
  "id": "uuid",
  "title": "Image to Video",
  "version": "0.1.0",
  "node_count": 3,
  "stage_count": 2,
  "validation": {
    "status": "valid",
    "warnings": []
  }
}
```

### Runs

| Method | Path | Description |
|--------|------|-------------|
| POST | `/runs` | Create and start a run |
| GET | `/runs` | List runs (with filter by workflow_id, status) |
| GET | `/runs/{id}` | Get run details with node statuses and artifacts |
| POST | `/runs/{id}/cancel` | Cancel a running run |

**POST /runs Request**:
```json
{
  "workflow_id": "uuid",
  "inputs": {
    "source_image": { "artifact_ref": "artifact://abc123" },
    "prompt": { "value": "cinematic motion" }
  }
}
```

**GET /runs/{id} Response**:
```json
{
  "id": "uuid",
  "workflow_id": "uuid",
  "status": "completed",
  "nodes": [
    {
      "node_id": "prep_1",
      "status": "produced_output",
      "duration_ms": 1200,
      "cache_hit": false,
      "artifacts": [{ "id": "uuid", "type": "image/rgb" }]
    }
  ],
  "started_at": "2026-04-11T10:00:00Z",
  "completed_at": "2026-04-11T10:00:12Z"
}
```

### Artifacts

| Method | Path | Description |
|--------|------|-------------|
| GET | `/artifacts/{id}` | Get artifact metadata |
| GET | `/artifacts/{id}/blob` | Download artifact payload |
| GET | `/artifacts/{id}/lineage` | Get provenance chain |

### Event Stream

| Method | Path | Description |
|--------|------|-------------|
| GET | `/events` | WebSocket upgrade for live event stream |

**WebSocket messages** (server -> client):
```json
{
  "event": "node_progress",
  "data": {
    "run_id": "uuid",
    "node_id": "gen_1",
    "percent": 45,
    "message": "Generating frames 129-256"
  },
  "timestamp": "2026-04-11T10:00:05Z"
}
```

## Error Format

All errors follow:
```json
{
  "error": {
    "code": "EXTENSION_NOT_FOUND",
    "message": "Extension 'foo.bar' not found",
    "details": {}
  }
}
```

## Status Codes

| Code | Usage |
|------|-------|
| 200 | Success |
| 201 | Created (workflow, run) |
| 400 | Validation error (invalid workflow, bad request) |
| 404 | Resource not found |
| 409 | Conflict (duplicate ID) |
| 500 | Internal server error |
