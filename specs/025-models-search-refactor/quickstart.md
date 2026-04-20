# Quickstart — Models Search Refactor (dev bring-up)

**Feature**: 025-models-search-refactor
**Phase**: 1 (design)

## Prerequisites

- Rust 1.84+, `cargo` in PATH
- Node ≥ 20, `pnpm`
- A Hugging Face access token (optional for v1; required to exercise gated repos)

## Run the feature locally

```bash
# 1. Apply the new migration + bring up the host
cargo run --bin nexus-dnn

# 2. In a second shell, start the web dev server
cd apps/web && pnpm dev
```

Open `http://localhost:5173/models-search`.

## Exercise the feature

### GGUF variant download (User Story 1)

```
URL: /models-search?q=llama-3&format=gguf&backend=llama.cpp&sort=most_downloaded
```

1. Variant list is visible inline on the card.
2. Click download on `Q5_K_M`.
3. Job appears in the host's download-jobs list.
4. Refresh the page — job state is re-hydrated from `/api/v1/model-store/downloads/:job_id`.

### Backend-aware filter (User Story 2)

```
URL: /models-search?q=stable-diffusion&backend=llama.cpp
```

Expected: empty grid (no safetensors-only repo passes the `llama.cpp` format filter). Toggle off the backend filter → SDXL results appear with `compat = downloadable_but_not_runnable`.

### Multi-format discovery (User Story 3)

```
URL: /models-search?q=stable-diffusion-xl&showUnsupported=true
```

- Card exposes VAE dependency marker.
- Action set: `Download primary`, `Download bundle`.
- Clicking `Download bundle` creates a job whose `targets` contains primary + VAE.

### Concurrency cap (FR-087)

```bash
# Queue three downloads in quick succession from the UI or curl:
curl -X POST http://localhost:8787/api/v1/model-store/downloads -d '...'   # #1
curl -X POST http://localhost:8787/api/v1/model-store/downloads -d '...'   # #2
curl -X POST http://localhost:8787/api/v1/model-store/downloads -d '...'   # #3

# Expected: #1 and #2 → state=downloading; #3 → state=queued
# When #1 completes, #3 → state=downloading automatically
```

### Auth-required path (FR-110–FR-114)

```
URL: /models-search?q=Llama-3-70B-Instruct
```

Without a token: gated Llama repos return `compat=unknown` / download fails with `auth_required`. Set a token via host settings → same page refresh resolves the gated repos and the `auth_required` jobs auto-transition to `queued`.

## Run tests

```bash
# Host unit + contract tests
cargo test --workspace

# Specifically the new contract tests
cargo test --test model_store_backends
cargo test --test model_store_search
cargo test --test model_store_detail
cargo test --test model_store_downloads

# 50-repo normalizer fixture sweep (SC-002, SC-009)
cargo test --test normalize_fixtures

# Frontend unit tests (service + smart container)
cd apps/web && pnpm test

# Frontend type check
cd apps/web && pnpm tsc --noEmit

# Playwright smoke (URL round-trip, download lifecycle)
cd apps/web && pnpm test:e2e -- models-search.spec.ts
```

## Scope-diff check (NFR-010, SC-010)

```bash
bash specs/025-models-search-refactor/scripts/scope_check.sh
```

Fails CI if any file outside the allow-list (see `contracts/frontend-loader.md §9`) is modified.

## Deferred coverage (design-heavy-UI carve-out)

Per Principle VI amendment and the plan's Test Strategy table, per-component vitest for `views/models-search/components/*` and the `.ui.tsx` root is **deferred**. Follow-up tracked in `specs/025-models-search-refactor/tasks.md` under "Deferred".
