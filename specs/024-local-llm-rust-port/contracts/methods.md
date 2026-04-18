# Contract — JSON-RPC Methods Exposed by `nexus.local-llm`

**Direction**: host → extension. Same JSON-RPC transport as Operators, addressed by `method` name.

---

## `backend.logs.tail`

Return the last N lines of child stdout/stderr from the named pool slot.

### Request
```jsonc
{ "pool_key": { "variant": "cuda13", "model_id": "..." }, "limit": 200 }
```

### Response
```jsonc
{
  "lines": [
    { "ts":"<ISO8601>", "stream":"stderr", "text":"main: server listening on ..." },
    ...
  ]
}
```

### Errors
`PoolSlotNotFound`.

---

## `backend.state.get`

Return the current state of a pool slot.

### Request
```jsonc
{ "pool_key": { "variant":"...", "model_id":"..." } }
```

### Response
```jsonc
{
  "state": "Spawning"|"LoadingModel"|"Ready"|"Draining"|"Stopped"|"Crashed"|"Hung"|"Unhealthy",
  "since": "<ISO8601>",
  "last_probe_ok_at": "<ISO8601>"?,
  "detail": {}?
}
```

### Errors
`PoolSlotNotFound`.

---

## `backend.state.observe`

Streaming Method. Emits `backend.state` events scoped to a single pool slot, for UI inspectors.

### Request
```jsonc
{ "pool_key": { "variant":"...", "model_id":"..." } }
```

### Stream
Same shape as the globally-emitted `backend.state` event (see `events.md`), filtered to the requested key.

---

## `pool.list`

Debug/inspector.

### Request
```jsonc
{}
```

### Response
```jsonc
{
  "slots": [
    { "pool_key": {...}, "state":"Ready", "bound_port":12345, "loaded_at":"<ISO>" },
    ...
  ],
  "cap": 2,
  "idle_timeout_secs": 600
}
```

---

## `pool.restart`

User-initiated recovery from `Unhealthy`.

### Request
```jsonc
{ "pool_key": { "variant":"...", "model_id":"..." } }
```

### Response
```jsonc
{ "state":"Spawning" }
```

### Errors
`PoolSlotNotFound`, `RestartDenied` (if already spawning / healthy).
