# nexus-local-llm-chat-history

Extension-native Rust library powering chat history persistence for the `nexus.local-llm` extension (spec 029).

## Scope

Durable CRUD for chat threads and messages owned end-to-end by the LLM extension. Sampler audit trail, per-thread sampler override, schema-version guard, host-deployment binding. No host crate changes.

## Layout

```
src/
  lib.rs                       public re-exports
  ids.rs                       ThreadId / MessageId / DeploymentId / InstallId newtypes
  error.rs                     ChatHistoryError (thiserror) + IntoResponse
  chat_history/
    mod.rs                     ChatHistoryStore trait
    model.rs                   DTOs (ChatThread, ChatMessage, SamplerBlock, ...)
    store_sqlx.rs              sqlx-backed store
    schema_version.rs          FR-009a..d guard
    title_autoderive.rs        FR-001a pure function
    sampler_merge.rs           FR-043 pure merge (test oracle)
    identity.rs                deployment-binding helpers
  host_client/
    mod.rs                     HostDeploymentsClient trait
    http.rs                    HTTP impl
  router/
    mod.rs                     axum Router
    threads.rs                 /chat/threads handlers
    messages.rs                /chat/threads/{id}/messages handlers
tests/                         integration + parity tests
```

## Build

This subproject is intentionally **outside** the root Cargo workspace. The root `Cargo.toml` uses `members = ["crates/*"]` which is a scoped glob that does not pick up `extensions/**`, so no `exclude` entry is needed.

```sh
cargo build --manifest-path extensions/builtin/local-llm/rust/Cargo.toml
cargo test  --manifest-path extensions/builtin/local-llm/rust/Cargo.toml
```

## Boundary

All code here obeys the project's host↔extension boundary rule (`.claude/rules/host-extension-boundary.md`). No host-path imports, no host tables, no host router edits. The HTTP surface is mounted by the host's generic `/api/v1/extensions/:ext-id/*` prefix; this crate owns everything after `:ext-id`.

Spec: [specs/029-chat-history-persistence/](../../../../specs/029-chat-history-persistence/).

## Audit-trail write contract (FR-030)

Spec 029's sampler-effective audit trail (`ext_local_llm_chat_messages.sampler_effective`) is written by a **single caller**: the frontend's `services/extension_chat.ts::appendMessage()`. The flow per chat turn:

1. Frontend builds the outbound chat-completion request body, including the sampler block merged from per-model defaults + per-thread override (spec 029 FR-043).
2. Frontend submits the request to the LLM backend.
3. Frontend `appendMessage()` → `POST /chat/threads/{id}/messages` with `role: "assistant"` and `sampler_effective` set to **the exact same block it submitted**.

The Rust store validates (FR-031): `Assistant` with null sampler_effective = 400; `User`/`System` with non-null sampler_effective = 400.

**The Python worker is NOT a persistence writer.** `SessionManager` stays in-memory by design. This eliminates the risk of two writers drifting — the caller that constructed the sampler block is the caller that records it. A later spec may migrate the streaming/inference path itself into Rust; this spec does not.

## Title materialization (FR-001a)

The first user message's `ordinal == 0` `append_message` call triggers an inline `UPDATE ext_local_llm_chat_threads SET title_auto = derive_title(content) WHERE id = ? AND title_auto IS NULL` in the same transaction. No second query, no N+1 risk. `title_resolved` returned by every list/get is computed as `title ?? title_auto ?? "New chat"` without touching message rows.

