# Data Model — Models Search Refactor

**Feature**: 025-models-search-refactor
**Phase**: 1 (design)

This document defines the domain entities, their DTO shape on the wire, the new SQLite schema, and three state machines. All DTO field names are the canonical form — both Rust serde and TypeScript types align on these names.

---

## 1. Domain entities (normalized)

### 1.1 `ModelRepository`

Upstream source entry.

| Field | Type | Notes |
|---|---|---|
| `repo_id` | string | Source-provider-scoped id, e.g. `meta-llama/Llama-3-8B-Instruct`. |
| `source_provider` | enum (`huggingface`) | Only `huggingface` in v1. |
| `owner` | string | |
| `name` | string | |
| `description` | string? | |
| `license` | string? | SPDX token when resolvable. |
| `tags` | string[] | |
| `downloads` | int? | Upstream counter (may be null). |
| `likes` | int? | |
| `last_updated` | ISO-8601 string? | |
| `modality` | enum (`llm`, `image`, `video`, `audio`, `upscaler`, `embedding`, `other`) | Inferred from tags / pipeline-tag. |

### 1.2 `ModelFamily`

Normalized app-level model. One family per upstream repo in v1.

| Field | Type | Notes |
|---|---|---|
| `family_id` | string | Canonical: `huggingface:<repo_id>`. |
| `repository` | `ModelRepository` | Embedded. |
| `artifacts` | `Artifact[]` | |
| `variants` | `Variant[]` | |
| `dependencies` | `Dependency[]` | |
| `compat` | `CompatibilityStatus` | Computed host-side (R9). |

### 1.3 `Artifact`

Concrete downloadable asset.

| Field | Type | Notes |
|---|---|---|
| `artifact_id` | string | Family-scoped, e.g. `<family_id>#<filename>`. |
| `role` | enum (`primary`, `vae`, `text_encoder`, `tokenizer`, `controlnet`, `lora`, `scheduler`, `other`) | `#[non_exhaustive]`. |
| `format` | enum (`gguf`, `ggml`, `safetensors`, `pytorch_bin`, `pth`, `unknown`) | `#[non_exhaustive]`. |
| `precision` | enum (`fp32`, `fp16`, `bf16`, `int8`, `quantized`, `unknown`) | `#[non_exhaustive]`. |
| `precision_source` | enum (`explicit`, `inferred`, `unknown`) | |
| `size_bytes` | int? | |
| `filename` | string | Original on upstream. |
| `download_url` | string | Resolved direct URL. |
| `sha256` | string? | When upstream supplies it. |
| `install_state` | `InstallState` | See §4.2. |

### 1.4 `Variant`

Selectable option within a family.

| Field | Type | Notes |
|---|---|---|
| `variant_id` | string | e.g. `<family_id>@Q5_K_M`. |
| `variant_type` | enum (`quantization`, `precision`, `checkpoint`, `other`) | `#[non_exhaustive]`. |
| `label` | string | Human label: `Q5_K_M`, `fp16`, etc. |
| `artifact_ids` | string[] | Backing artifact(s). |
| `is_default` | bool | From R4 heuristic. |
| `install_state` | `InstallState` | Aggregated from backing artifacts. |

### 1.5 `Dependency`

Companion artifact relation.

| Field | Type | Notes |
|---|---|---|
| `role` | same enum as `Artifact.role` | e.g. `vae`. |
| `requirement` | enum (`required`, `optional`) | |
| `target_artifact_id` | string? | When target is in the same family. |
| `external_ref` | `{ source_provider, repo_id, filename }`? | When target lives in a different upstream repo. |

### 1.6 `BackendCapability`

| Field | Type | Notes |
|---|---|---|
| `backend_id` | string | e.g. `llama.cpp`. |
| `display_name` | string | |
| `supported_formats` | `Format[]` | |
| `supports_quantized_variants` | bool | |
| `supports_multi_artifact_models` | bool | |
| `status` | enum (`enabled`, `experimental`, `disabled`) | |

### 1.7 `CompatibilityStatus`

Enum with five cases: `compatible`, `compatible_with_requirements`, `downloadable_but_not_runnable`, `unsupported`, `unknown`. Computed host-side, never re-derived in the frontend.

### 1.8 `DownloadJob`

| Field | Type | Notes |
|---|---|---|
| `job_id` | string (UUID v7) | Newtype `JobId`. |
| `family_id` | string | |
| `requested_kind` | enum (`primary`, `variant`, `bundle`) | Matches v1 action set per Clarify Q1. |
| `include_dependencies` | bool | `true` only for `requested_kind = bundle`. |
| `state` | `DownloadState` | See §4.1. |
| `targets` | `DownloadJobTarget[]` | Resolved artifact list. |
| `warnings` | string[] | Compatibility / conflict notes. |
| `progress_bytes` | int | Sum across targets. |
| `total_bytes` | int? | Sum of `expected_bytes` when known. |
| `error_reason` | string? | When `state == failed` or `auth_required`. |
| `created_at` | ISO-8601 | |
| `started_at` | ISO-8601? | |
| `finished_at` | ISO-8601? | |

### 1.9 `DownloadJobTarget`

| Field | Type | Notes |
|---|---|---|
| `artifact_id` | string | |
| `filename` | string | |
| `role` | `Artifact.role` | |
| `expected_bytes` | int? | |
| `downloaded_bytes` | int | |
| `sha256` | string? | |
| `state` | enum (`queued`, `downloading`, `downloaded`, `failed`, `skipped`) | Per-artifact state. |

---

## 2. Rust newtypes and enum attributes

All new IDs are newtypes (Principle VII, XI):

```rust
pub struct FamilyId(String);
pub struct ArtifactId(String);
pub struct VariantId(String);
pub struct JobId(uuid::Uuid);
pub struct BackendId(String);
```

All public enums carry `#[non_exhaustive]`:

```rust
#[non_exhaustive] pub enum Format { Gguf, Ggml, Safetensors, PytorchBin, Pth, Unknown }
#[non_exhaustive] pub enum Precision { Fp32, Fp16, Bf16, Int8, Quantized, Unknown }
#[non_exhaustive] pub enum PrecisionSource { Explicit, Inferred, Unknown }
#[non_exhaustive] pub enum Modality { Llm, Image, Video, Audio, Upscaler, Embedding, Other }
#[non_exhaustive] pub enum DependencyRole { Primary, Vae, TextEncoder, Tokenizer, Controlnet, Lora, Scheduler, Other }
#[non_exhaustive] pub enum Requirement { Required, Optional }
#[non_exhaustive] pub enum CompatibilityStatus {
    Compatible,
    CompatibleWithRequirements,
    DownloadableButNotRunnable,
    Unsupported,
    Unknown,
}
#[non_exhaustive] pub enum DownloadState {
    Queued, Downloading, Paused, Downloaded, Failed, Incompatible, AuthRequired,
}
```

Deserializers use `#[serde(default)]` on the enum-carrying DTOs where `Unknown` is a valid fallback (Principle V — additive enums).

---

## 3. SQLite schema (migration `013_model_store_download_jobs.sql`)

See research.md R6. Tables: `download_jobs`, `download_job_artifacts`. Append-only migration; idempotent.

---

## 4. State machines

### 4.1 Download job state machine

```
       ┌───────────┐   permit_acquired   ┌─────────────┐  all_targets_ok   ┌──────────────┐
 (new)→│  queued   │────────────────────▶│ downloading │──────────────────▶│  downloaded  │
       └─────┬─────┘                     └──────┬──────┘                   └──────────────┘
             │                                  │
             │                                  │ user_pauses
             │                                  ▼
             │                            ┌───────────┐
             │                            │  paused   │──── user_resumes ───► downloading
             │                            └──────┬────┘
             │                                   │
             │  403/401 from upstream            │ any_target_failed
             │                                   │
             ▼                                   ▼
       ┌──────────────┐                    ┌──────────┐
       │ auth_required│                    │  failed  │
       └──────────────┘                    └──────────┘
```

`incompatible` is a terminal state assigned at job creation when classification says `unsupported` and the client still requested it (explicit override); v1 rejects such requests at the handler with 422, so `incompatible` is reserved for future use and only ever read back from history.

**Invariants**:
- Only one permit per active job at a time.
- Permits are strict FIFO across `queued` jobs (one `VecDeque<JobId>`).
- Transition out of `downloading` always releases the permit (RAII).
- `auth_required` is recoverable: on token change (FR-114) matching `auth_required` jobs transition back to `queued`.

### 4.2 Per-artifact install state (frontend-facing)

Per-artifact `InstallState` is a derived view computed from `download_job_artifacts` plus the existing `nexus-models-store::install` tables:

```
not_downloaded  ──── create job ────►  queued
queued          ──── orchestrator ──►  downloading
downloading     ──── bytes reach expected + sha match ──►  downloaded
downloading     ──── error ──► failed  ── user retry ──► queued
downloaded      ──── user removes ──► not_downloaded
*               ──── classification flips to Unsupported ──► incompatible
```

### 4.3 Auth state (settings-backed)

```
no_token  ── user sets token ──►  token_present  ── user clears ──►  no_token
token_present  ── 401/403 from HF ──►  token_present (job → auth_required)
any  ── token value changes ──►  auth caches invalidated
                                  + outstanding auth_required jobs → queued
```

---

## 5. Validation rules (from spec FRs)

- `Artifact.filename` and `Artifact.download_url` MUST be non-empty after normalization; rows with either missing are dropped and surfaced as `Artifact.role = other`, `format = unknown` only when they provide some other signal.
- `Variant.artifact_ids` MUST reference at least one artifact in the same family.
- `Dependency.target_artifact_id` XOR `Dependency.external_ref` — exactly one is set.
- `DownloadJob.requested_kind = bundle` ⇒ `include_dependencies = true` and `targets` contains every `Dependency{requirement: Required}` of the primary.
- `DownloadJob.requested_kind = primary` ⇒ `include_dependencies = false` and `targets` has exactly one row with `role = primary`.
- `DownloadJob.requested_kind = variant` ⇒ `include_dependencies = false` and `targets` = `Variant.artifact_ids` for the selected variant.
- **Request-shape invariant (I1)**: `include_dependencies = true` is valid **only** when `kind = bundle`. Any other combination (`kind = primary | variant` with `include_dependencies = true`, or `kind = bundle` with `include_dependencies = false`) MUST be rejected at the handler with `422 invalid_request` before a job is created. Enforced in `POST /api/v1/model-store/downloads` (see tasks.md T035).

---

## 6. Size budgets (for review)

- `GET /model-store/search` response with `pageSize = 30` and an average family of 4 artifacts + 6 variants + 2 deps ≈ **55–70 KB JSON**. Well within tolerable payload sizes.
- `GET /model-store/models/:id` for an SDXL-class family (10 artifacts, 3 deps) ≈ **8–12 KB JSON**.
- `GET /model-store/backends` is O(N_backends); v1 N = 1 ⇒ < 300 B.

---

## 7. Invariants enforceable in types

The Rust layer models the following invariants at the type level (Principle II — Design by Contract):

- `CompatibilityStatus` is computed only by `nexus-models-store::normalize::classify_compat`, which takes `&CapabilityRegistry` + `&ModelFamily` and returns `CompatibilityStatus`. No other code path may synthesize this value — enforced by keeping the constructor `pub(crate)`.
- `DownloadSlot` is a RAII guard — dropping it auto-releases the concurrency permit; there is no public `release()` method.
- `JobId` is created only by `JobStore::create(...)`; callers cannot construct one ad-hoc.
