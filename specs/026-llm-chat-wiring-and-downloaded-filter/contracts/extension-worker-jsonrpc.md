# Contract — `local-llm` extension JSON-RPC methods

All methods live under the `llm.*` namespace, registered via the
extension worker's existing method table (`worker/methods/__init__.py`).
Registration surface: one new module
`worker/methods/chat.py`.

Every response body wraps the native return in the envelope already
used by `monitoring.py` / `profile.py` — tested with the existing
harness.

## Methods

### `llm.new_thread(params?) -> Thread`

Creates a new thread and emits `session.state.changed`.

Params (optional):

```json
{ "title": "Session 1" }
```

If `title` is absent, generate `Session {N}` where `N` is the next
integer for the current calendar day in the user's local timezone.

Returns the created `Thread` (see data-model.md).

Errors: `storage` (500) on DB write failure.

---

### `llm.list_threads(archived=false, limit=50) -> Thread[]`

Returns threads ordered by `updated_at DESC`. Already partially
implemented in `worker/chat/session_manager.py::list_threads`; this
contract locks the return shape.

---

### `llm.get_active_model(session_id) -> ActiveModelBinding | null`

Reads `threads.active_model_family_id / _variant_id` and, if both are
present, resolves the current install via
`host.api.model_store.installed()` and returns the binding. Returns
`null` if either ID is absent or if the installed record is gone
(FR-014 triggers on the client side).

---

### `llm.set_active_model(session_id, family_id, variant_id) -> ActiveModelBinding`

Writes the two TEXT columns, returns the freshly-resolved binding.
Emits `session.state.changed` for the target thread so the UI refresh.

Errors:
- `not_found` (404): no installed artifact matches
  `(family_id, variant_id)`.
- `storage` (500).

---

### `llm.get_generation_settings(session_id) -> GenerationParams`

Reads `threads.generation_settings` (JSON column). NULL ⇒ return the
defaults from data-model.md. Never returns error for missing row (the
UI always opens an existing thread).

---

### `llm.set_generation_settings(session_id, params) -> GenerationParams`

Validates `params` against `GenerationParams`, writes the JSON column,
returns the persisted shape. No event fan-out (settings changes are
UI-local).

Errors:
- `validation` (422): out-of-range field.

---

### `llm.send_message(session_id, content) -> stream<ChatDelta>`

Starts a generation call against `llama.cpp` via the bound model.

Pre-conditions (checked in order, fail-fast):
1. Thread exists.
2. Thread has `active_model_family_id + active_model_variant_id`.
3. The installed record still exists (resolved via host client).
4. `absolute_path` still exists on disk (filesystem check).

Generation call loads `GenerationParams` from the thread, maps to
`SamplingParams`, and invokes the adapter. Streams `ChatDelta`
objects back over the JSON-RPC transport.

Each streamed delta:

```json
{ "role": "assistant", "delta": "hel", "finish_reason": null }
```

Final delta carries `finish_reason: "stop" | "length" | "error"`.

Errors:
- `no_active_model` (422): precondition 2 failed.
- `model_unavailable` (410): precondition 3 or 4 failed.
- `storage` (500).

On success, the handler persists both the user turn and the assistant
turn with `params_snapshot` = the exact params used.

---

### `llm.list_downloaded_models() -> DownloadedModel[]`

Calls `host.api.model_store.installed()` and projects to the
`DownloadedModel` schema. Filters to `format ∈ {gguf, ggml}` in v1
(spec scope). No direct DB query; sealed.

---

## Event emissions

| Method | Event | Payload |
|---|---|---|
| `llm.new_thread` | `session.state.changed` | `{ thread_id }` |
| `llm.set_active_model` | `session.state.changed` | `{ thread_id }` |
| `llm.send_message` (start/delta/complete) | `chat.stream.delta` / `chat.stream.complete` | existing shape |

## Contract tests (pytest, `extensions/builtin/local-llm/tests/`)

| ID | What it asserts |
|---|---|
| T-C1 | `new_thread` writes a row; `list_threads` returns it. |
| T-C2 | `set_active_model` + `get_active_model` round-trip. |
| T-C3 | `set_generation_settings` rejects `temperature = 3.0` with 422. |
| T-C4 | `send_message` with no active model returns `no_active_model`. |
| T-C5 | `send_message` with deleted absolute_path returns `model_unavailable`. |
| T-C6 | `list_downloaded_models` calls `host.api.model_store.installed()` exactly once per request (mock asserts call count). |
| T-C7 | `set_generation_settings` writes, `get_generation_settings` reads identical shape. |
