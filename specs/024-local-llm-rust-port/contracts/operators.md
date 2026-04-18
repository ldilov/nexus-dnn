# Contract — Operators Exposed by `nexus.local-llm`

**Direction**: host → extension (Operator invocation); extension → host (streaming events).
**Stability**: byte-compatible with the current Python extension per spec SC-007. Any shape drift breaks the frontend.

---

## `llm.chat.turn` — v1.0.0

Streaming Operator. Orchestrates a multi-turn chat request: compose → submit to `llama-server` `/v1/chat/completions` → stream chunks back.

### Request
```jsonc
{
  "session_id": "<uuid>",
  "model_id": "<ModelId>",
  "runtime_preference": "cuda13" | "cpu" | null,
  "messages": [ { "role":"user"|"assistant"|"system", "content":"..." } ],
  "params": {
    "temperature": 0.7?,
    "top_p": 0.95?,
    "top_k": 40?,
    "max_tokens": 2048?,
    "stop": ["..."]?,
    "seed": 42?
  }?,
  "tools": [ ... ]?
}
```

### Event stream

- `chunk` — `{ "delta": "...", "token_count": n }`
- `tool_call` — `{ "id":"...", "name":"...", "arguments_json":"..." }` (passthrough if upstream tool-calling is active)
- `done` — `{ "finish_reason":"stop"|"length"|"tool_calls"|"cancelled", "usage": { "prompt_tokens":..., "completion_tokens":..., "total_tokens":... } }`
- `error` — `{ "code":"...", "message":"...", "retry_safe":true|false }`

### Errors

- `ModelMissing`, `BackendUnavailable`, `BackendBusy`, `OutOfMemory`, `Cancelled`.

### Cancellation

Drop of the Operator subscription triggers connection-drop to `llama-server` within 200 ms (spec FR-018). The session's last turn is marked `cancelled` in `local_llm_chat_turns.status`.

---

## `llm.prompt.compose` — v1.0.0

Non-streaming. Pure function; no backend involvement.

### Request
```jsonc
{
  "template_id": "chat-default" | "raw" | "...",
  "variables": { "system": "...", "history": [...], "user_turn": "..." }
}
```

### Response
```jsonc
{ "prompt": "<composed string>", "token_estimate": n? }
```

### Errors
`TemplateNotFound`, `VariableMissing`.

---

## `llm.output.persist` — v1.0.0

Non-streaming. Writes a turn record into `local_llm_chat_turns`.

### Request
```jsonc
{
  "session_id": "<uuid>",
  "turn_id": "<uuid>",
  "role": "assistant",
  "content": "...",
  "tool_calls": [...]?,
  "usage": { "prompt_tokens":..., "completion_tokens":... }?,
  "status": "completed"|"cancelled"|"errored",
  "finished_at": "<ISO8601>"
}
```

### Response
`{ "persisted": true }`

---

## `llm.embed.text` — v1.0.0

Non-streaming.

### Request
```jsonc
{
  "model_id": "<ModelId>",
  "runtime_preference": "...?" ,
  "texts": ["...", "..."],
  "normalize": true
}
```

### Response
```jsonc
{ "dimension": 1024, "vectors": [[...], [...]] }
```

### Errors
- `CapabilityUnavailable` if the resolved runtime's `BackendCapabilities.embeddings == false` (spec FR-025).
- `ModelMissing`, `BackendUnavailable`.

---

## `llm.rag.retrieve` — v1.0.0

Non-streaming.

### Request
```jsonc
{
  "corpus_id": "<uuid>",
  "query": "...",
  "top_k": 5,
  "filters": { "document_tag": "..."? }?
}
```

### Response
```jsonc
{
  "hits": [
    { "document_id":"...", "chunk_id":"...", "score":0.83, "excerpt":"..." },
    ...
  ]
}
```

### Errors
`CorpusNotFound`, `EmbeddingModelUnavailable`.

### Determinism

For a fixed `(corpus, query, embedding model)` tuple, results MUST be byte-identical to the Python baseline (spec SC-011, frozen as fixtures in `contracts/tests/rag_golden/`).
