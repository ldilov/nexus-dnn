# Response Envelope Contract

**Version**: 0.1.0
**Applies to**: All `/api/v1` endpoints

Every HTTP response from the nexus-dnn host API uses a consistent envelope structure. This eliminates per-endpoint shape guessing and gives consumers a single parsing path.

## Success Shape

```json
{
  "data": { ... },
  "meta": {
    "timestamp": "2026-04-11T12:00:00Z"
  },
  "error": null
}
```

- `data` contains the resource payload. Its shape varies per endpoint.
- `meta.timestamp` is always an RFC 3339 UTC timestamp of the moment the host serialized the response.
- `error` is `null` on success.

## Error Shape

```json
{
  "data": null,
  "meta": {
    "timestamp": "2026-04-11T12:00:00Z"
  },
  "error": {
    "code": "EXTENSION_NOT_FOUND",
    "category": "not_found",
    "message": "Extension 'foo' not found",
    "details": null
  }
}
```

- `data` is `null` on error.
- `error.code` is an upper-snake-case machine-readable identifier.
- `error.category` groups codes into broad buckets (see table below).
- `error.message` is a human-readable explanation safe for log output.
- `error.details` is an optional JSON value with structured context (validation errors, version mismatches, etc.).

## Error Categories

| Category | Meaning |
|----------|---------|
| `validation` | Request body or query parameter failed validation |
| `not_found` | Referenced resource does not exist |
| `conflict` | Operation conflicts with current state (duplicate ID, invalid transition) |
| `unavailable` | Required subsystem or dependency is not ready |
| `internal` | Unexpected host error |

## Status Code Mapping

| HTTP Status | Category | When Used |
|-------------|----------|-----------|
| 200 | -- | Successful read or mutation that returns data |
| 201 | -- | Resource created (workflow, run) |
| 204 | -- | Successful mutation with no response body (enable, disable) |
| 400 | `validation` | Malformed request body, invalid query parameters, schema violation |
| 404 | `not_found` | Resource ID does not resolve |
| 409 | `conflict` | Duplicate ID, invalid state transition, already running |
| 422 | `validation` | Semantically invalid request (DAG cycle, type mismatch, unresolvable operator) |
| 500 | `internal` | Unhandled host error |
| 503 | `unavailable` | Subsystem not ready (database, worker manager) |

## Error Codes (non-exhaustive)

| Code | Category | Description |
|------|----------|-------------|
| `EXTENSION_NOT_FOUND` | not_found | Extension ID does not exist |
| `OPERATOR_NOT_FOUND` | not_found | Operator ID does not exist |
| `WORKFLOW_NOT_FOUND` | not_found | Workflow ID does not exist |
| `RUN_NOT_FOUND` | not_found | Run ID does not exist |
| `ARTIFACT_NOT_FOUND` | not_found | Artifact ID does not exist |
| `RECIPE_NOT_FOUND` | not_found | Recipe ID does not exist |
| `VALIDATION_FAILED` | validation | Generic validation failure with details |
| `INVALID_WORKFLOW` | validation | Workflow definition failed structural or type checks |
| `INVALID_MANIFEST` | validation | Extension manifest failed schema validation |
| `INCOMPATIBLE_VERSION` | validation | Host API or protocol version mismatch |
| `DAG_CYCLE_DETECTED` | validation | Workflow graph contains a cycle |
| `PORT_TYPE_MISMATCH` | validation | Edge connects incompatible port types |
| `UNRESOLVED_OPERATOR` | validation | Node references an operator that is not registered |
| `MISSING_INPUT_BINDING` | validation | Required workflow input has no binding |
| `DUPLICATE_ID` | conflict | Resource with this ID already exists |
| `INVALID_STATE_TRANSITION` | conflict | Requested transition is not valid from current state |
| `RUN_NOT_RETRYABLE` | conflict | Run retry requested but run is not in a retryable state |
| `WORKER_UNAVAILABLE` | unavailable | No healthy worker for required operator |
| `SUBSYSTEM_NOT_READY` | unavailable | Required subsystem is still initializing |
| `INTERNAL_ERROR` | internal | Unexpected host error |

## Validation Error Details

When `error.code` is `VALIDATION_FAILED` or `INVALID_WORKFLOW`, the `details` field contains an array of individual issues:

```json
{
  "error": {
    "code": "INVALID_WORKFLOW",
    "category": "validation",
    "message": "Workflow validation failed with 2 errors",
    "details": {
      "errors": [
        {
          "path": "edges[2]",
          "code": "PORT_TYPE_MISMATCH",
          "message": "Edge from gen_1.output (image/rgb) to export_1.input (video/encoded): incompatible types"
        },
        {
          "path": "nodes[1].config",
          "code": "SCHEMA_VIOLATION",
          "message": "Missing required config field 'width'"
        }
      ],
      "warnings": []
    }
  }
}
```
