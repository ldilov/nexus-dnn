# Worker Protocol Contract

**Version**: 0.1.0
**Transport**: JSON-RPC 2.0 over stdio (line-delimited JSON)
**Direction**: Host initiates requests, Worker responds + sends notifications

## Transport

Messages are newline-delimited JSON on stdio:
- Host writes to worker stdin, reads from worker stdout
- Worker stderr is captured for diagnostics (not protocol messages)
- Each message is a single line of JSON followed by `\n`

## Operations

### 1. Handshake (host -> worker -> host)

**Request**:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "handshake",
  "params": {
    "protocol_version": "0.1.0",
    "host_version": "0.1.0"
  }
}
```

**Response**:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "protocol_version": "0.1.0",
    "worker_name": "hello-world-worker",
    "extension_id": "nexus.example.hello",
    "extension_version": "0.1.0"
  }
}
```

### 2. List Operators (host -> worker -> host)

**Request**:
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "list_operators",
  "params": {}
}
```

**Response**:
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "operators": [
      {
        "id": "echo",
        "version": "1.0.0"
      }
    ]
  }
}
```

### 3. Validate Config (host -> worker -> host)

**Request**:
```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "validate_config",
  "params": {
    "operator_id": "echo",
    "operator_version": "1.0.0",
    "config": { "prefix": ">>>" }
  }
}
```

**Response** (valid):
```json
{ "jsonrpc": "2.0", "id": 3, "result": { "valid": true } }
```

**Response** (invalid):
```json
{
  "jsonrpc": "2.0", "id": 3,
  "result": { "valid": false, "errors": ["prefix must be non-empty"] }
}
```

### 4. Execute (host -> worker -> host, with notifications)

**Request**:
```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "execute",
  "params": {
    "request_id": "req_42",
    "run_id": "run_123",
    "node_id": "echo_1",
    "operator": { "id": "echo", "version": "1.0.0" },
    "config": { "prefix": ">>>" },
    "inputs": {
      "text": { "value": "hello world" }
    },
    "output_targets": {
      "text_out": { "artifact_write_ref": "artifact-write://temp/run_123/echo_1/text_out" }
    }
  }
}
```

**Progress notification** (worker -> host, no id):
```json
{
  "jsonrpc": "2.0",
  "method": "progress",
  "params": { "request_id": "req_42", "percent": 50, "message": "Processing..." }
}
```

**Log notification** (worker -> host, no id):
```json
{
  "jsonrpc": "2.0",
  "method": "log",
  "params": { "request_id": "req_42", "level": "info", "message": "Loaded model" }
}
```

**Response** (success):
```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "result": {
    "status": "completed",
    "outputs": {
      "text_out": { "artifact_ref": "artifact://final_abc", "type": "text/plain" }
    },
    "metrics": { "duration_ms": 150 }
  }
}
```

### 5. Cancel (host -> worker -> host)

**Request**:
```json
{ "jsonrpc": "2.0", "id": 5, "method": "cancel", "params": { "request_id": "req_42" } }
```

**Response**:
```json
{ "jsonrpc": "2.0", "id": 5, "result": { "cancelled": true } }
```

### 6. Health Check (host -> worker -> host)

**Request**:
```json
{ "jsonrpc": "2.0", "id": 6, "method": "health", "params": {} }
```

**Response**:
```json
{ "jsonrpc": "2.0", "id": 6, "result": { "status": "healthy" } }
```

## Error Codes

| Code | Meaning |
|------|---------|
| -32700 | Parse error |
| -32600 | Invalid request |
| -32601 | Method not found |
| -32602 | Invalid params |
| -32603 | Internal error |
| -32000 | Validation error |
| -32001 | Runtime dependency missing |
| -32002 | Model unavailable |
| -32003 | Out of memory |
| -32004 | Execution cancelled |

## Lifecycle

1. Host spawns worker process
2. Host sends `handshake` — must be first message
3. Protocol version mismatch -> host kills worker
4. Host sends `list_operators` to index capabilities
5. During runs: `execute` requests with `progress`/`log` notifications
6. Host sends `health` periodically
7. On shutdown: host sends `cancel` for in-flight work, then closes stdin
