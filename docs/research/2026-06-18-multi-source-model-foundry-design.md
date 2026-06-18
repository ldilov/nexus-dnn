# Multi-Source Model Foundry — Design

**Date:** 2026-06-18
**Status:** Approved for planning
**Scope:** Host-only. Model Foundry gains two new install sources — **direct URL** and **Civitai (paste-link)** — alongside the existing Hugging Face browse. The filter bar is simplified.

---

## 1. Goal

Today the Model Foundry can only discover and install models from Hugging Face. Operators want to install:

1. A model from **any direct URL** (e.g. a raw `.gguf` / `.safetensors`).
2. A model from **Civitai** by pasting a `civitai.com` model/version link.

Plus a UI cleanup: collapse the crowded multi-row filter bar down to **Source · Search · Downloaded · Sort/View**.

Cards are explicitly **out of scope** — only the filter/discovery surface changes.

## 2. Non-goals (v1)

- No Civitai **browse/search grid**. Civitai is paste-link only; a future spec can add the search API + a `nexus-civitai` browse provider.
- No multi-file direct-URL bundles. A direct URL resolves to **one** artifact. (Civitai links may carry the version's companion files where the API lists them, but the direct-URL path is single-file.)
- No new provider routing inside the HF browse path. HF remains the sole browse source.

## 3. Boundary compliance (nexus-dnn host ↔ extension rule)

All changes live in **host paths** and stay generic:

- `apps/web/src/views/models-search/**` — generic operator surface.
- `crates/nexus-api/src/handlers/model_store/**` — generic model-store API.
- `crates/nexus-models-store/**` — provider-agnostic store.
- New `crates/nexus-civitai/` — a host upstream client crate, peer of the existing `nexus-huggingface`.

No extension-id literals, no extension-specific tables/routes. `SourceProvider` is already `#[non_exhaustive]` with civitai/direct_url named in its doc comment, and `provenance.rs` already branches on `source_kind = "direct_url"`. This design fills in scaffolding the codebase already anticipated.

## 4. Architecture

### 4.1 Source model

`SourceProvider` (in `crates/nexus-models-store/src/model.rs`) gains explicit variants:

```rust
pub enum SourceProvider {
    Huggingface,   // existing default
    Civitai,       // new
    DirectUrl,     // new
    Other,         // existing #[serde(other)] catch-all
}
```

Serde stays `snake_case` (`huggingface`, `civitai`, `direct_url`, `other`). Adding named variants before `Other` is backward compatible — old persisted `"other"` still deserializes.

### 4.2 Resolve endpoint (new)

```
POST /api/v1/model-store/resolve-url
body: { "url": "https://…" }
→ 200 { family: ModelFamily }   // a synthetic single-family result
→ 4xx { error } on unreachable / unparseable / unsupported URL
```

The handler is a **provider-aware resolver**:

| Input | Path |
|---|---|
| host matches `civitai.com` | parse `modelId` / `modelVersionId` from the URL → call `nexus-civitai::resolve()` → Civitai version API → pick the **primary** file → build a `ModelFamily` with `sha256` (Civitai supplies `files[].hashes.SHA256`), filename, size, license (`model.allowCommercialUse` / license string), modality from `model.type`. `source_provider = Civitai`, `source_kind = "civitai"`. |
| any other URL | `HEAD` (fall back to ranged `GET`) → filename from `Content-Disposition` or URL tail, size from `Content-Length`, format inferred from extension → `ModelFamily` with **`sha256 = null`**. `source_provider = DirectUrl`, `source_kind = "direct_url"`. |

The resolved family carries exactly one artifact (the primary file). Its `compat` is classified by the existing `classify_compat` against the capability registry; an `unknown` result is **not hidden** (see §4.5).

### 4.3 `nexus-civitai` crate (resolve-only)

New host crate mirroring `nexus-huggingface`'s shape but **resolve-only** (no search):

```rust
pub struct CivitaiClient { /* http client + optional token */ }

pub struct CivitaiFile {
    pub name: String,
    pub size_bytes: u64,
    pub sha256: Option<String>,
    pub download_url: String,
    pub primary: bool,
}
pub struct CivitaiResolved {
    pub model_id: u64,
    pub version_id: u64,
    pub name: String,
    pub model_type: String,        // Checkpoint, LORA, VAE, TextualInversion, …
    pub license: Option<String>,
    pub files: Vec<CivitaiFile>,
}

impl CivitaiClient {
    pub async fn resolve(&self, ref_: CivitaiRef) -> Result<CivitaiResolved, CivitaiError>;
}
```

`CivitaiRef` is parsed from the pasted URL: `/models/{id}` (resolves the model's latest/default version), `/models/{id}?modelVersionId={vid}`, or `/model-versions/{vid}`. Modality mapping: `Checkpoint→image`, `LORA`/`LoCon`→`lora`, `TextualInversion`→`embedding`, `VAE`→`vae`, `Controlnet`→`controlnet`, `Upscaler`→`upscaler`, else `other`.

Unit-tested against **recorded JSON fixtures** (no live network in tests), same as `nexus-huggingface`'s fixtures.

### 4.4 Install pipeline — hashless (trust-on-download)

`HttpFetcher::fetch_file` + `download_and_verify` currently require `expected_sha256`. Change:

- When `DownloadSpec.expected_sha256` is **absent/empty**, stream the file while computing SHA-256, then **adopt the computed digest** as the file hash and `sha256_root`. No pre-verify, no mismatch error.
- When present (HF + Civitai), behaviour is unchanged: verify and fail on mismatch.

`InstallModelRequest` / `PlannedFile` already carry `source_url`; `sha256` becomes optional on the planned file for the direct-URL case. `IdentityKey.sha256_root` is filled from the computed digest post-download for direct URLs.

This is the only behavioural change inside `nexus-models-store`.

### 4.5 Compat gate for resolved sources

`search.rs` hides `Unsupported | Unknown` families unless `show_unsupported=true`. Resolved (URL/Civitai) families are returned by the **resolve endpoint**, not `search`, so they bypass that gate entirely — a resolved card is always shown. No change to the browse gate.

### 4.6 Secrets

- **Civitai API token** (optional) — some downloads are gated. Stored in host settings, mirroring HF token handling in `crates/nexus-models-store/src/downloads/auth.rs`. Browsing/resolving public models needs no token; the token is appended (`Authorization: Bearer` or `?token=`) only at download time when set.
- **Direct-URL bearer** (optional) — for gated direct URLs. Same settings surface.

Tokens are never logged and never committed. Missing token → public-only behaviour, with a clear `auth_required` warning surfaced on the resolved family if the source returns 401/403.

## 5. Frontend

`apps/web/src/views/models-search/`:

- **`model_store.ts`** — add `source: "huggingface" | "direct_url"` to `ParsedSearchParams` (URL-persisted as `?source=`); add `resolveUrl(url)` → `POST /model-store/resolve-url`; `createDownload` accepts a resolved family/artifact. New `SourceProvider` values added to the type union.
- **`FilterBar.tsx`** — remove the Format, Backend, Modality, Compat chip groups and the separate repo input. Keep: **Source dropdown**, search input, **Downloaded** toggle, **Clear**. (`degraded` banner kept.)
- **Source = "From URL"** — the search input becomes a paste field + **Resolve** button; on resolve, the grid is replaced by a single preview card (reusing `ModelCard`) → Download. Civitai links are just pasted here; the resolver handles them. Placeholder text names HF file URLs, Civitai links, and direct `.gguf`/`.safetensors`.
- **`models_search.view.tsx`** — controller branches on `source`: `huggingface` → existing search flow; `direct_url` → resolve-on-submit, render the one resolved card, suppress Sort/Paginator.

The Sort + grid/list row (`sortRow`, separate from `FilterBar`) is unchanged for HF; hidden in URL mode.

## 6. Components & isolation

| Unit | Does | Depends on |
|---|---|---|
| `nexus-civitai::resolve` | URL → file metadata + hash | http client, fixtures (tests) |
| `model_store/resolve.rs` (handler) | provider-aware URL → `ModelFamily` | `nexus-civitai`, http HEAD, `normalize` |
| `download_and_verify` (hashless branch) | stream + compute-or-verify sha256 | — |
| `FilterBar` (slimmed) | Source/Search/Downloaded controls | params |
| URL-mode controller branch | resolve → single card → download | `model_store.ts` |

Each is independently testable; the resolver and the hashless download are the two pieces carrying real risk and each gets focused tests.

## 7. Error handling

- Unreachable / non-2xx URL → `SourceUnreachable` mapped to a 4xx with the host shown (no full URL in logs if it carries a token).
- Civitai 401/403 → resolved family flagged `auth_required`; the card prompts for a token.
- Unparseable Civitai link → 400 "could not parse a Civitai model or version id from this URL".
- Direct URL with no `Content-Length` → allowed (progress bar shows indeterminate); trust-on-download still computes the hash.

## 8. Testing

- **Rust:** `nexus-civitai` resolve from fixtures (model link, version link, gated 403, LORA type mapping). Resolver handler: civitai-vs-direct routing, direct-URL synthetic family, sha256-null path. `download_and_verify` hashless branch: computes + adopts digest; present-hash branch still rejects mismatch. Boundary test: no extension-id literals in new host files.
- **Frontend:** `model_store.ts` param round-trip with `source`; `resolveUrl` shape; `FilterBar` renders slimmed controls and omits removed groups; URL-mode renders a single resolved card and hides the paginator.
- Target ≥80% on new modules; reuse existing fake-fetcher harness for install.

## 9. Effort & rollout

Multi-PR. Suggested slices:
1. `SourceProvider` variants + hashless download path (+ tests) — pure backend, no UX.
2. `nexus-civitai` resolve crate + fixtures.
3. `POST /resolve-url` handler (civitai + direct) + settings/token.
4. Frontend: `model_store.ts` + slimmed `FilterBar` + URL-mode controller + resolved-card render.
5. Rebuild committed `dist` (per repo convention) + e2e smoke.

Implementation is a good fit for `/subagent-driven-development` given the slices are largely independent.

## 10. Open risks

- Civitai API shape drift — pin to `/api/v1`, isolate parsing in the crate, fixture-test.
- Trust-on-download gives no source-integrity guarantee for direct URLs — accepted (documented in the URL panel).
- `dist` is committed in this repo; the build/commit step must not be skipped.
