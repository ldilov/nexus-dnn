# Contract — Events Emitted and Consumed by `nexus.local-llm`

All events ride `nexus-protocol::StdioTransport` as JSON-RPC notifications. Every payload carries `event_id`, `timestamp`, `extension_id="nexus.local-llm"` at the envelope level — the payloads below describe the inner `data` field.

---

## Emitted

### `backend.state`
```jsonc
{
  "pool_key": { "variant":"cuda13", "model_id":"..." },
  "from": "LoadingModel",
  "to":   "Ready",
  "reason": "first_health_probe_ok" | "auto_restart" | "user_restart" | "idle_eviction" | ...
}
```

### `backend.crashed`
```jsonc
{
  "pool_key": {...},
  "exit_code": -9 | 1 | ...,
  "stderr_tail": [ "CUDA out of memory ...", "..." ],
  "will_retry": true
}
```

### `backend.hung`
```jsonc
{
  "pool_key": {...},
  "last_probe_ok_at": "<ISO8601>",
  "probe_failures": 3
}
```

### `backend.log_line`
```jsonc
{
  "pool_key": {...},
  "stream": "stdout"|"stderr",
  "line": "..."
}
```
(Rate-limited; not every line is emitted. Full log available via `backend.logs.tail`.)

### `pool.evicted`
```jsonc
{
  "pool_key": {...},
  "reason": "lru_cap" | "idle_timeout" | "model_removed" | "user" | "shutdown"
}
```

### Operator-scoped events (under the Operator subscription)

- `llm.chat.turn` → `chunk`, `tool_call`, `done`, `error` (see `operators.md`).
- Other Operators are non-streaming; they emit only a single response.

---

## Consumed (host → extension)

### `model.removed`
```jsonc
{ "model_id": "...", "reason": "user_uninstall"|"corruption"|"admin" }
```
Extension must evict any pool slot referring to this model within 5 s (spec FR-024).

### `runtime.removed`
```jsonc
{ "install_id": "...", "codename": "llamacpp", "variant": "cuda13" }
```
Extension must evict any pool slot using this runtime and fail in-flight Operators with `RuntimeMissing`.

### `host.shutdown`
```jsonc
{ "deadline": "<ISO8601>" }
```
Extension must release all leases / stop all children before the deadline (≤ 5 s). Any in-flight Operator is failed with `{code:"Cancelled", retry_safe:true}`.

### `settings.changed`
```jsonc
{ "key":"local-llm.pool.cap", "old_value":2, "new_value":4 }
```
Extension reloads pool cap / idle timeout without restart.
