# Research — Spec 026

## R1. Shape of the installed-artifacts roll-up

**Decision**: One flat JSON array of `InstalledArtifact` entries plus a
convenience `family_ids: string[]` set, returned from a single
`GET /api/v1/model-store/installed` call. No pagination in v1 (cap at
500 rows; a user with more will see the first 500 sorted by
`installed_at DESC` and a `truncated: true` flag).

**Rationale**:
- Frontend joins against the search result set in-process (O(n) hash
  lookup on `family_id`) — no extra round-trip per family.
- The Choose Model picker groups in-process as well (by family id).
- Keeping a single DTO means one SWR key, one cache entry, one
  `mutate()` on install-complete. Variant-grouped or family-grouped
  DTOs would each force a second fetch for the other view.

**Alternatives**:
- Nested `{[family_id]: InstalledArtifact[]}` — rejected, forces the
  frontend to flatten for the picker.
- Paginated list — rejected, real-world ceiling is < 200 artifacts
  and the roll-up is < 100 KB at 500 rows.
- Server-side grouping behind a `?group_by=family` query — rejected,
  double cache-key surface.

## R2. Extend `search` vs new handler for the Downloaded filter

**Decision**: Extend the existing `search` handler with one additional
post-normalisation filter step that consults the in-memory installed
set (fetched via `InstallMap::list_all()` once per handler invocation
and cached in the existing 60 s family cache keyed on `fingerprint()`).

**Rationale**:
- Downloaded composes with every existing filter (format, modality,
  license, compat). A second handler would re-implement all of them.
- The spec-025 family cache already keys on filters; the installed set
  is a per-process, per-second-scale cache that overlays transparently.
- URL round-trip invariant stays intact: `installed` is a single
  optional query param.

**Alternatives**:
- Separate `GET /model-store/installed-search` — rejected, scope
  duplication.
- Compute installed join in `InstallMap::find_installed_family_ids()`
  and hand a HashSet into normalisation — viable, kept as an internal
  implementation detail.

## R3. Where per-session generation settings live

**Decision**: Additive columns on the existing extension `threads`
table:

```sql
ALTER TABLE threads ADD COLUMN generation_settings TEXT;
ALTER TABLE threads ADD COLUMN active_model_family_id TEXT;
ALTER TABLE threads ADD COLUMN active_model_variant_id TEXT;
```

`generation_settings` stores a JSON blob conforming to
`GenerationParams`. NULL ⇒ defaults from the UI schema.

**Rationale**:
- Threads are the natural unit of session scope; no extra table.
- JSON keeps the schema easy to extend (top_p_min, min_p, etc.) without
  new migrations.
- Existing reads / writes already join threads once; overhead is zero.

**Alternatives**:
- New `session_settings` table — rejected, one-to-one with threads,
  extra join for no expressive gain.
- Key-value table per (thread, param) — rejected, N rows per thread
  for no benefit.
- Host-side storage — rejected; these values are LLM-specific,
  extension-owned, Principle V.

## R4. Extension worker → host REST client

**Decision**: Add a thin `host.api.model_store.installed()` wrapper in
`extensions/builtin/local-llm/worker/host/model_store.py` (new file)
that uses the same `aiohttp` session already used by other `llm.*`
host-facing calls. No direct SQLite access; reads only the REST
envelope.

**Rationale**:
- Honours Principle V: the extension is a consumer of the host's
  sealed `/model-store/*` surface.
- Cache invalidation piggybacks on the existing
  `session.state.changed` event fan-out — the worker re-fetches when
  a download completes.
- Simplifies testing: the contract test for chat methods can mock the
  installed-models source at the `host_client` layer.

**Alternatives**:
- Give the extension read access to `model_store_installed_artifacts`
  — rejected, breaks the isolation boundary.
- Event-pushed roll-up over the event bus — rejected, two-way sync
  complicates recovery.

## R5. Sampler proof — capturing the params handed to llama.cpp

**Decision**: Add a `pub(crate)` `CallRecorder` trait to
`nexus-backend-runtimes::llamacpp::adapter` gated behind
`#[cfg(any(test, feature = "test-shim"))]`:

```rust
pub(crate) trait CallRecorder: Send + Sync {
    fn record(&self, snapshot: SamplerCall);
}

#[derive(Debug, Clone, serde::Serialize)]
pub(crate) struct SamplerCall {
    pub sampling: SamplingParams,
    pub system_prompt: Option<String>,
    pub user_content: String,
    pub model_path: std::path::PathBuf,
}
```

`LlamaCppAdapter` holds `recorder: Option<Box<dyn CallRecorder>>`; the
production path always sees `None` and takes the normal branch. In
test mode, the adapter calls `recorder.record(snapshot)` immediately
before handing off to `llama-cpp-2`.

**Rationale**:
- Zero runtime cost in release (the `Option::is_none()` branch).
- The sealed adapter stays sealed; no public trait change.
- Test can assert field-for-field equality on `SamplingParams`
  without mocking the model.

**Alternatives**:
- Parse tracing logs — rejected, brittle, couples proof to format.
- Inject a full mock adapter — rejected, forks the production code
  path.
- Run an actual llama.cpp with a 1-token model — rejected, needs GPU
  and a real weight file; not hermetic.

## R6. Proof-artifact format + CI wiring

**Decision**: `target/sc-026-proof.json` is emitted by the test via
`std::fs::write`:

```json
{
  "spec": "026",
  "test": "chat_hyperparameters_reach_llamacpp",
  "captured": {
    "sampling": { "temperature": 1.7, "top_p": 0.9, "top_k": 40,
                  "max_tokens": 16, "repeat_penalty": 1.1 },
    "system_prompt": "You are a helpful assistant.",
    "user_content": "ping",
    "model_path": "…Q8_0.gguf"
  },
  "passed_at": "2026-04-20T12:00:00Z"
}
```

**Rationale**: plain JSON is diffable, the path is predictable
(`target/` is already CI-uploaded on failure; we upload on success too
for spec 026), and the schema is stable enough that a future regression
will fail a single JSON equality assertion.

**Alternatives**: Cargo bench artifacts / structured tracing spans —
rejected, heavier for no gain at one artifact.

## R7. Keyboard flow for the Choose Model picker

**Decision**: `role="dialog"` + focus-trap on the picker container;
rows are `role="option"` inside a `role="listbox"`. Arrow keys move
focus, Enter selects, Esc closes. Initial focus lands on the currently
bound variant (if any) else the first row.

**Rationale**: Matches the existing `SortMenu` pattern from spec 025
(listbox+option), which a11y spec T117 already validates. Reusing the
same ARIA contract shortens the new a11y Playwright case.

## R8. Thread-list invalidation on `llm.new_thread`

**Decision**: Reuse the existing `session.state.changed` event already
subscribed to by the `thread_list` dataSource. `llm.new_thread` emits
this event post-commit. No new event kind.

**Rationale**: The extension's layout YAML already declares
`events: ["session.state.changed"]` on the thread list; adding a new
event kind would also require a layout edit and an aggregator-side
subscription.
