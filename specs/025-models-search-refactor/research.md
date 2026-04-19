# Research — Models Search Refactor

**Feature**: 025-models-search-refactor
**Phase**: 0 (pre-design)
**Date**: 2026-04-19

All scope-level clarifications were resolved in `/speckit.clarify`. This file resolves **implementation-level** unknowns only.

---

## R1. How to expose per-file listings from `nexus-huggingface::search`

**Decision**: Extend `nexus-huggingface::search` to optionally return the `siblings` (file list) array that the HF `/api/models` endpoint already ships inline when `full=true`. Add a new function `search_with_files(query: &SearchQuery, token: Option<&str>) -> SearchPage<RepoWithFiles>` that calls HF with `full=true`, **without** touching the existing `search(...)` signature used by the legacy `/huggingface/search` handler.

**Rationale**: HF's `/api/models?full=true` returns per-file `rfilename`, `size`, and `lfs` blobs in one round-trip. Calling `/api/models/{id}` per result would be N+1. The existing legacy handler does not need `full=true` so keeping a separate entry point avoids breaking its response shape.

**Alternatives considered**:
- Always return files in `search()` and migrate the legacy handler — rejected: legacy handler response shape is frozen for the deprecation window.
- Second round-trip per result to `/api/models/{id}` — rejected: 30× extra HTTP per page at 30 `pageSize`.
- HF's `/api/models/{id}/tree/main` endpoint — rejected: an extra per-result call and does not carry size info reliably.

**References**: HF `GET /api/models` supports `full=true&limit=N&search=…&sort=…&filter=…`. `siblings[*].rfilename` and `siblings[*].size` are the fields the normalizer needs.

---

## R2. GGUF quantization naming canon

**Decision**: Canonical quantization label is the exact token found in the filename between the last `.` before `.gguf` and any split suffix, uppercased and normalized (`q4_k_m` → `Q4_K_M`). Accept the full llama.cpp quantization set: `F32`, `F16`, `BF16`, `Q2_K`, `Q3_K_S`, `Q3_K_M`, `Q3_K_L`, `Q4_0`, `Q4_1`, `Q4_K_S`, `Q4_K_M`, `Q5_0`, `Q5_1`, `Q5_K_S`, `Q5_K_M`, `Q6_K`, `Q8_0`, `IQ1_S`, `IQ1_M`, `IQ2_XXS`, `IQ2_XS`, `IQ2_S`, `IQ2_M`, `IQ3_XXS`, `IQ3_XS`, `IQ3_S`, `IQ3_M`, `IQ4_XS`, `IQ4_NL`. Unknown quant token → `variantLabel = <raw-token>` and `variantType = quantization` (still selectable).

**Rationale**: All three major GGUF publishers (TheBloke, Bartowski, lmstudio-community) use the same underscore-separated `Q<bits>_<method>` tokens derived from llama.cpp's `enum ggml_type`. Accepting the set conservatively (unknowns still surface as selectable variants) keeps us forward-compatible without a registry update per new quant type.

**Alternatives considered**:
- Strict whitelist only — rejected: breaks on every new llama.cpp release.
- Parsing the GGUF file header for authoritative quant — rejected: requires a download; we need this pre-download.

**Test plan**: `tests/unit/normalize_variants.rs` covers every canonical token plus 3 unknowns, plus GGUF-split filenames (e.g. `-00001-of-00003`).

---

## R3. Precision metadata — what's explicit vs inferred

**Decision**:
- For `.safetensors`: explicit only when the HF API's `safetensors` payload on the repo metadata carries a `parameters` dict with a numeric-dtype-keyed breakdown (`F32`, `F16`, `BF16`, `I8`, `U8`). Map the dominant dtype (majority of params) to `precision`; record `precisionSource = explicit`.
- For `.bin` / `.pth`: HF never exposes precision inline. Always `precisionSource = inferred` or `unknown`. Inferred from filename tokens (`-fp16`, `-bf16`, `-int8`, `-awq`, `-gptq`) or model-card `config.json.torch_dtype` when the normalizer has it; otherwise `unknown`.
- For `.gguf` / `.ggml`: quantization is the meaningful axis, not precision. Set `precision = quantized`, `precisionSource = explicit` (derived from filename quant token per R2).

**Rationale**: Matches how HF's own API surfaces the information today and avoids the "`fp16 (assumed)` lie" failure mode called out in spec FR-032.

**Alternatives considered**:
- Always infer `fp16` for safetensors without metadata — rejected by FR-032.
- Parse safetensors header bytes — rejected: another pre-download network roundtrip with sharded repos.

---

## R4. Recommended / default variant heuristic

**Decision** (conservative MVP):
- For GGUF repos, default-flag the `Q4_K_M` variant **if present**. Fallback order: `Q4_K_M` → `Q5_K_M` → `Q8_0` → first-by-filename. If none present, no default flag.
- For safetensors repos with multiple precision variants, default-flag `bf16` → `fp16` → `fp32`.
- For any other format or any ambiguous case, no default flag (UI shows no "default" marker).

**Rationale**: `Q4_K_M` is the llama.cpp community's universally-cited quality/size sweet spot for 7B-to-13B models. Falling back deterministically keeps tests stable. "No default" is a safe UX state — users still get a full selectable list.

**Alternatives considered**:
- Reading the repo's README for a "recommended" label — rejected: parsing unstructured text, high false-positive risk.
- Computing a VRAM-fit score — rejected: requires knowing user hardware; way out of scope.
- Always defaulting to largest variant — rejected: bad for most users' bandwidth and disk budgets.

---

## R5. Pagination mapping: HF cursor → our numbered pages

**Decision**: HF's `/api/models` accepts `limit` (max 100) and is best paginated via `Link: rel="next"` headers carrying a `cursor` param. Because our contract promises **numbered pages** (FR-093 + NFR-002), we translate in the handler:
- Frontend passes `page` (1-based) and `pageSize` (≤ 50).
- Handler cursors forward through HF in `pageSize`-sized steps up to `page × pageSize`, returning only the last page's slice.
- `totalResults` in our response is HF's `X-Total-Count` when present; otherwise `null` and the UI hides the "of N" total (shows `Page k` only).
- Cache: handler caches the cursor → page mapping per `(query, filters, sort)` fingerprint for 60 s in memory (single-process cache, not a crate dep).

**Rationale**: Numbered pages are what users and URLs demand; HF is cursor-based. The forward-walk is acceptable for `page ≤ 20` at `pageSize ≤ 50` (the UI caps both) and the 60 s cache makes back-navigation essentially free.

**Alternatives considered**:
- Surface the cursor directly in our URL — rejected: not stable across HF index changes, not human-readable, loses shareability.
- `elasticsearch`-style `from`/`size` — rejected: HF ignores `from` beyond 10k records.
- Pre-fetching all pages on first load — rejected: wasteful and defeats the point of paging.

---

## R6. `download_jobs` storage shape

**Decision** (migration `013_model_store_download_jobs.sql`, SQLite):

```sql
CREATE TABLE IF NOT EXISTS download_jobs (
    job_id              TEXT PRIMARY KEY,
    family_id           TEXT NOT NULL,
    source_provider     TEXT NOT NULL,
    source_repo         TEXT NOT NULL,
    requested_kind      TEXT NOT NULL CHECK (requested_kind IN ('primary','variant','bundle')),
    include_dependencies INTEGER NOT NULL DEFAULT 0,
    state               TEXT NOT NULL CHECK (state IN
                          ('queued','downloading','paused','downloaded',
                           'failed','incompatible','auth_required')),
    progress_bytes      INTEGER NOT NULL DEFAULT 0,
    total_bytes         INTEGER,
    error_reason        TEXT,
    created_at          TEXT NOT NULL,
    started_at          TEXT,
    finished_at         TEXT
);

CREATE TABLE IF NOT EXISTS download_job_artifacts (
    job_id              TEXT NOT NULL REFERENCES download_jobs(job_id) ON DELETE CASCADE,
    artifact_id         TEXT NOT NULL,
    filename            TEXT NOT NULL,
    role                TEXT NOT NULL,
    expected_bytes      INTEGER,
    downloaded_bytes    INTEGER NOT NULL DEFAULT 0,
    sha256              TEXT,
    state               TEXT NOT NULL CHECK (state IN
                          ('queued','downloading','downloaded','failed','skipped')),
    PRIMARY KEY (job_id, artifact_id)
);

CREATE INDEX IF NOT EXISTS idx_download_jobs_state ON download_jobs(state);
CREATE INDEX IF NOT EXISTS idx_download_job_artifacts_state ON download_job_artifacts(state);
```

**Rationale**: Job-level + per-artifact-row gives us FR-082 state per job (what the UI cares about), FR-083 progress per artifact (what resumable downloads need), FR-084 resumable via `downloaded_bytes` already on disk, FR-085 duplicate prevention via a lookup on `(family_id, artifact_id, state != 'failed')` before creating a new job.

**Alternatives considered**:
- Flat one-row-per-job, artifact list as JSON blob — rejected: no index on per-artifact state; resumable harder.
- Re-use `nexus-models-store::install` tables — rejected: install is post-download, different lifecycle, different invariants.

---

## R7. Auth token plumbing

**Decision**: Re-use `nexus-huggingface::token` (already exists, reads from host settings `huggingface.access_token`). The new `/model-store/search` and `/model-store/downloads` handlers fetch `Option<HfToken>` from the settings-backed cache and pass it into the HF client. Absent token → request proceeds anonymously; 401/403 from HF on a specific repo/file causes the handler (or the download orchestrator) to return `auth_required` rather than a generic `failed`.

**Rationale**: Zero new settings keys per the plan. Existing `token.rs` already caches and invalidates; FR-114 (token change invalidates cached `auth_required` state) is satisfied by the existing invalidation hook.

---

## R8. Concurrency cap implementation

**Decision**: `DownloadOrchestrator` owns a `tokio::sync::Semaphore::new(MAX_CONCURRENT_DOWNLOADS)` where `MAX_CONCURRENT_DOWNLOADS: usize = 2`. Each job acquires a permit before transitioning `queued → downloading`; an RAII `DownloadSlot(OwnedSemaphorePermit)` drops the permit on job completion or failure. FIFO is enforced by a single `VecDeque<JobId>` waiting list drained under the orchestrator's `Mutex` each time a permit frees.

**Rationale**: Standard tokio pattern; RAII-guard compliant with Principle VII. Lifting the cap is a one-line edit per FR-088.

**Alternatives considered**:
- `FuturesUnordered` with a `buffered(2)` stream — rejected: doesn't give us named-job cancellation or pause semantics.
- Per-session concurrency counter in SQLite — rejected: needlessly persistent; any crash rebuilds state from `queued`/`downloading` rows anyway.

---

## R9. Compatibility classification — the intersection rule

**Decision**: For each normalized `ModelFamily`, compute compatibility **once** in the `/search` and `/models/:id` handlers, before serialization:

```
compat = match (primary_artifact.format, enabled_backends_supporting_format, required_deps_satisfiable) {
  (Unknown, _, _)                     => Unsupported,
  (fmt, some_backend, true)           => Compatible,
  (fmt, some_backend, false)          => CompatibleWithRequirements,
  (fmt, empty, _) if fmt in known_fmts => DownloadableButNotRunnable,
  (_, _, _)                           => Unknown,
}
```

Frontend **never re-derives** compatibility; it only renders the enum. This prevents the dual-source-of-truth risk listed in the plan's Risks table.

**Rationale**: Spec FR-061 says classification is derived from intersection; centralising on the backend keeps the rule testable and single-owner (Principle III, SINGLE-CHOICE).

---

## R10. URL schema for the screen

**Decision**: The URL owns the following params, all optional (defaults in brackets):

| Param | Type | Default | Notes |
|---|---|---|---|
| `q` | string | `""` | Free text search. |
| `format` | repeated enum | — | e.g. `?format=gguf&format=safetensors`. |
| `backend` | repeated string | — | backend ids, e.g. `?backend=llama.cpp`. |
| `modality` | repeated enum | — | `llm`, `image`, `video`, `audio`, `upscaler`, `embedding`, `other`. |
| `license` | repeated string | — | SPDX tokens. |
| `compat` | repeated enum | — | filter by compatibility status. |
| `installed` | enum | — | `any` / `installed` / `not_installed`. |
| `showUnsupported` | bool | `false` | FR-070 toggle (default-hide per Clarify Q2). |
| `sort` | enum | `relevance` | `relevance` / `most_downloaded` / `trending` / `recently_updated` / `alphabetical`. |
| `page` | int | `1` | 1-based. |
| `pageSize` | int | `30` | Clamped to `[10, 50]`. |
| `view` | enum | `grid` | `grid` / `list`. |

**Decision — encoding**: repeated params are repeated keys (`?format=gguf&format=safetensors`), not comma-separated, for round-trippability through `URLSearchParams` without custom serialization.

**Rationale**: Matches FR-093. Omitting any param means "default"; clearing a filter removes the key entirely (FR-093 third acceptance scenario).

---

## Open questions routed to plan / tasks

None. Every unknown identified in spec's Clarifications, Assumptions, and the source brief is resolved here or in the contracts (Phase 1).
