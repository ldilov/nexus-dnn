# Contract — REST `/api/v1/model-store/*`

**Feature**: 025-models-search-refactor
**Phase**: 1 (design)

Five endpoints. All responses are the standard `nexus-api` envelope; error responses carry typed error codes.

---

## 1. `GET /api/v1/model-store/backends`

Returns the capability registry — the SINGLE source of truth for backend filter options and compatibility computation.

**Request**: no params.

**Response 200**:

```jsonc
{
  "backends": [
    {
      "backend_id": "llama.cpp",
      "display_name": "llama.cpp",
      "supported_formats": ["gguf", "ggml"],
      "supports_quantized_variants": true,
      "supports_multi_artifact_models": false,
      "status": "enabled"
    }
  ]
}
```

**Errors**: none (always succeeds; if registry is empty, returns `{"backends": []}`).

**Contract tests** (`tests/contract/model_store_backends.rs`):

- `T-B1`: With only the `llama.cpp` adapter registered, response contains exactly one entry with `supported_formats` equal to `["gguf", "ggml"]`.
- `T-B2`: Adding a second adapter (in test-only registry) causes response to contain two entries; existing entry unchanged.
- `T-B3`: Adapter reporting `status = experimental` is reflected in response.

---

## 2. `GET /api/v1/model-store/search`

Normalized search, backed by Hugging Face.

**Query params** (all optional):

| Name | Type | Default | Notes |
|---|---|---|---|
| `q` | string | `""` | Free-text query. |
| `format` | repeated | — | e.g. `?format=gguf&format=safetensors`. |
| `backend` | repeated | — | Backend ids; narrows to families with at least one artifact whose format is in the union of `supported_formats`. |
| `modality` | repeated | — | |
| `license` | repeated | — | |
| `compat` | repeated | — | `compatible`, `compatible_with_requirements`, `downloadable_but_not_runnable`, `unsupported`, `unknown`. |
| `installed` | `any`/`installed`/`not_installed` | `any` | |
| `show_unsupported` | bool | `false` | When `false`, families classified `unsupported` or `unknown` are filtered out. |
| `sort` | enum | `relevance` | `relevance`, `most_downloaded`, `trending`, `recently_updated`, `alphabetical`. |
| `page` | int | `1` | 1-based. |
| `page_size` | int | `30` | Clamped to `[10, 50]`. |

**Response 200**:

```jsonc
{
  "page": 1,
  "page_size": 30,
  "total_results": 1432,   // nullable when upstream does not report a total
  "families": [ /* ModelFamily[] — see data-model.md §1.2 */ ],
  "facets": {
     "formats":   { "gguf": 412, "safetensors": 783, "pytorch_bin": 141, "pth": 6, "unknown": 90 },
     "licenses":  { "apache-2.0": 520, "mit": 210, "llama3": 180, ... },
     "modalities": { "llm": 812, "image": 320, "upscaler": 42, ... }
  }
}
```

**Response 502 (upstream failure, recoverable)**: `{"error": {"code": "upstream_unavailable", "message": "..."}}`. Frontend renders `ErrorState` with retry.

**Response 503 (registry unavailable)**: Degrades gracefully — returns 200 with an empty `backends` facet and a response header `X-ModelStore-Degraded: backend_registry`, so the UI can show a non-blocking notice per FR-054.

**Contract tests** (`tests/contract/model_store_search.rs`):

- `T-S1` (FR-001): `?q=llama` returns non-empty `families`; each family matches query in at least one of name/owner/tags.
- `T-S2` (FR-050, FR-052): `?backend=llama.cpp` filters out families whose artifacts are all safetensors.
- `T-S3` (FR-005 + Clarify Q2): With `show_unsupported=false` (default), no family with `compat ∈ {unsupported, unknown}` appears.
- `T-S4` (FR-005 + Clarify Q2): Same query with `show_unsupported=true` returns a superset including those families.
- `T-S5` (FR-093 + pagination): `?page=2&page_size=30` returns a disjoint family set from page 1 for the same query.
- `T-S6` (R5 cache): Two back-to-back identical calls produce identical `families` order within the 60 s cache window.
- `T-S7` (FR-105): Fixture with a malformed HF payload row is filtered but does not 5xx.
- `T-S8` (FR-060/061): For a GGUF repo and enabled `llama.cpp`, family's `compat == "compatible"`; for a safetensors repo, `compat == "downloadable_but_not_runnable"`.

---

## 3. `GET /api/v1/model-store/models/:family_id`

Single-family detail.

**Path**: `family_id` = url-encoded `huggingface:<owner>/<name>`.

**Response 200**: one `ModelFamily` (see data-model.md §1.2) with `repository` fully populated, every `artifact` including `sha256` when available, and `dependencies` fully resolved.

**Response 404**: `{"error": {"code": "family_not_found", "message": "..."}}`.

**Contract tests** (`tests/contract/model_store_detail.rs`):

- `T-D1` (FR-104): Returns family with all artifacts, variants, deps, compat.
- `T-D2`: For a family unknown to upstream, returns 404 with `family_not_found`.
- `T-D3` (FR-040/042): An SDXL fixture returns a primary safetensors artifact plus a `vae` dependency with `requirement = required`.

---

## 4. `POST /api/v1/model-store/downloads`

Creates a download job.

**Request body**:

```jsonc
{
  "family_id": "huggingface:meta-llama/Llama-3-8B-Instruct",
  "target": {
     "kind": "variant",            // "primary" | "variant" | "bundle"
     "variant_id": "huggingface:meta-llama/Llama-3-8B-Instruct@Q5_K_M"
     // "artifact_id" for kind=primary
     // no extra fields for kind=bundle
  },
  "include_dependencies": false     // must be true iff kind=bundle
}
```

**Response 202**:

```jsonc
{
  "job_id": "01JX7...-UUIDv7",
  "state": "queued",
  "targets": [ /* DownloadJobTarget[] */ ],
  "warnings": [],
  "total_bytes": 5733445120
}
```

**Response 409** (duplicate): An existing non-terminal job for the same `(family_id, target)` already exists. Response body includes `existing_job_id`. Frontend treats this as idempotent success (FR-085).

**Response 422** (incompatible): The requested target's format is not supported by any enabled backend **and** no ambient override flag was passed; the server refuses to create a doomed job. Body: `{"error": {"code": "incompatible", "message": "..."}}`. Frontend surfaces this as a disabled action; user sees `Show unsupported` toggle guidance.

**Response 401 / 403 passthrough**: Converted to `{"error": {"code": "auth_required", ...}}`; no job is created. Setting/changing the HF token and retrying unblocks.

**Response 422 (invalid_request, I1)**: `include_dependencies = true` with `target.kind != "bundle"`, or `include_dependencies = false` with `target.kind = "bundle"`, is rejected before any job is created. Body: `{"error": {"code": "invalid_request", "message": "include_dependencies only valid with kind=bundle"}}`.

**Contract tests** (`tests/contract/model_store_downloads.rs`):

- `T-J1` (FR-081, FR-102): `kind=variant` creates job whose `targets` list has exactly the artifacts backing that variant.
- `T-J2` (FR-042 + Clarify Q1): `kind=bundle` with an SDXL family returns job with primary + every required `Dependency`.
- `T-J3` (FR-085): Second identical POST returns 409 with same `existing_job_id`.
- `T-J4` (FR-087): POST three times for three different variants in quick succession — first two transition `queued → downloading`, third stays `queued` until a slot frees.
- `T-J5` (FR-110 + FR-112): Without a token, POST for a gated repo returns 401 passthrough with `auth_required`.
- `T-J6` (FR-114): Setting a valid HF token after `T-J5` and retrying succeeds; the prior failed attempt left no duplicate lock.

---

## 5. `GET /api/v1/model-store/downloads/:job_id`

Per-job status + progress.

**Response 200**: full `DownloadJob` DTO (see data-model.md §1.8).

**Response 404**: `{"error": {"code": "job_not_found"}}`.

**Frontend polling**: the screen subscribes with SWR at a 1 s interval for active-state jobs only; terminal states (`downloaded`, `failed`, `incompatible`) stop polling.

**Contract tests**:

- `T-J7` (FR-083, SC-007): Progress updates propagate; successive polls never go backwards in `progress_bytes`.
- `T-J8` (NFR-005): After host restart with a job in `downloading`, GET returns either `paused` or `queued` (re-hydrated), never `downloading` without a live orchestrator slot.

---

## 6. Deprecation plan for `/api/v1/huggingface/search`

The existing route stays wired. All responses carry:

```
Deprecation: true
Sunset: <ISO-8601 date, +90 days from this feature's merge>
Link: </api/v1/model-store/search>; rel="successor-version"
```

No behavioral changes. The new screen never calls it. Removal lands in a follow-up spec after the Sunset date.
