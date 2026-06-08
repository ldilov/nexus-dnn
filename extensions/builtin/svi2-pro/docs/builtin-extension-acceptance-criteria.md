# SVI 2.0 Pro — Builtin Extension Packaging: Acceptance Criteria

**Date:** 2026-06-08
**Extension:** `nexus.video.svi2-pro` (`extensions/builtin/svi2-pro/`)
**Branch:** `feat/svi2-attention-fp8-pipeline-knobs`
**Goal:** Promote the half-packaged svi2-pro worker into a fully installable, polished builtin extension — installable from the Extensions panel, dependencies strictly isolated to the extension runtime, models auto-downloaded on install, presets/profiles selectable, default settings, and a clean React UI with both a Recipe view and a DAG view.

**Templates of record:** `extensions/builtin/emotion-tts/` (full React custom-element app) and `extensions/builtin/local-llm/` (declarative YAML + host generic renderer). svi2-pro follows the emotion-tts pattern for its rich custom UI, plus declarative recipe/layout YAML where it fits.

**Specialization:** svi2-pro is a **one-shot long image-to-video** generator. Its canonical mode chains 4n+1-frame clips with error-recycling SVI LoRAs for identity-locked long takes from a single anchor image. The UI must make that workflow first-class.

---

## Acceptance bar (how the loop closes)

Coverage is measured against the numbered criteria below. The loop runs implement → review → %-feedback → re-dispatch until **≥95% of weighted criteria PASS**. All criteria are **offline-verifiable** (no GPU). A real `rtx50-fp8` GPU render is a **separate deferred gate** the operator runs on their own hardware and is **explicitly out of scope** for the 95% bar.

A criterion PASSES only with **evidence**: a passing test, a successful build, a grep result, a screenshot/snapshot from the preview harness, or a fake-backend render artifact. "Looks done" is not evidence.

Weighting: each category has a weight (sum = 100). Category coverage = (passing criteria / total criteria in category). Overall = Σ(category_weight × category_coverage).

---

## Category 1 — Installation & Lifecycle (weight 10)

- **1.1** Extension appears in the Extensions panel gallery (`apps/web/src/views/extensions/gallery/`) as a builtin, with name "SVI 2.0 Pro Video Generator", description, and icon. No code change to the gallery itself (it is generic).
- **1.2** Gallery shows a "Setup required" badge until all dependency steps probe OK; clearing the badge after install requires no manual refresh beyond the existing SSE flow.
- **1.3** The Dependencies tab (`extension-settings/tabs/dependencies.tab.tsx`) lists every declared step (`python`, `pkgs`, `ffmpeg`, all `model_artifact` steps, `validate`) with correct status, ordering (topo-sorted by `requires`), and per-step progress.
- **1.4** `POST /api/v1/extensions/nexus.video.svi2-pro/install` drives the full plan to completion against the **fake** backend path (model steps may run in dry-run/mock mode in CI — see 3.7). Install is idempotent: re-running with already-satisfied steps probes OK and skips.
- **1.5** The `validate` step performs a `worker_handshake` against the worker entrypoint and succeeds with the fake profile (no GPU, no real weights).
- **1.6** Enable/disable toggles work via the generic `POST /extensions/{id}/enable|disable` with no extension-specific host code.
- **1.7** At host startup, the builtin is discovered and activated by `nexus-core::app` builtin scan, and its `backend_runtimes` (rtx50-fp8 + fake) register in the host catalog. Verified by an integration test or a host boot smoke that lists the runtimes.

## Category 2 — Dependency Isolation (weight 10)

- **2.1** All Python deps install into an **extension-local** venv (`target: extension_local`), never the host interpreter. No new entries in any host `pyproject.toml`/`requirements`.
- **2.2** `worker/pyproject.toml` is the single source of Python deps; `worker/uv.lock` exists and is committed so installs are reproducible.
- **2.3** Heavy ML stack (torch cu132, diffusers, etc.) is in the `diffusers` optional extra and the manifest `package_set` step installs the right extras for the rtx50-fp8 runtime; the **fake** runtime installs base deps only (no torch required to run fake).
- **2.4** flash-attn wheels are vendored (git-lfs, `binaries/`) and referenced via `[tool.uv.sources]` with platform/python markers; SDPA fallback path exists in `attention_backend.py` when flash import fails. No network build of flash-attn at install time.
- **2.5** ffmpeg `system_binary` step has **real** pinned URLs + sha256 + size for windows-x64 and linux-x64 (no all-zero placeholder hashes), and `allow_system_path: true` lets an existing ffmpeg satisfy the probe.
- **2.6** Boundary: nothing the extension installs leaks into host crates or `apps/web` node deps. Verified by grep (see 10.x).

## Category 3 — Model Auto-Download (weight 14)

Per operator decision: **everything on install**.

- **3.1** Manifest declares `model_artifact` dependency steps (or a single bundle step) covering **all** weights:
  - Kijai Wan2.2-I2V-A14B HIGH + LOW fp8_e4m3fn experts
  - SVI v2.0 Pro high + low LoRAs (`epfl-vita/svi-model`)
  - UMT5-XXL text encoder + tokenizer
  - Wan2.1/2.2 VAE
  - Qwen-Image-Edit-2509 GGUF quartet (diffusion, VAE, LLM, mmproj) for edit-then-animate
  - RIFE weights (flownet)
  - stable-diffusion.cpp binary (sd-cli) for the Qwen edit path
- **3.2** `backends/rtx50-fp8/versions.yaml` (and `backends/fake/versions.yaml`) declare these artifacts in a model-store-consumable shape: family_id, repo, filename, role, expected sha256/size (placeholders allowed for binaries that have no upstream hash yet, but documented), accelerator match.
- **3.3** Each `model_artifact` step resolves its accelerator via `matches_runtime_step:python` (or explicit) and downloads through the host **model-store** (`crates/nexus-models-store`, `POST /api/v1/model-store/downloads`), not a bespoke downloader inside the extension.
- **3.4** Downloads are concurrency-limited by the host orchestrator (≤ host cap), resumable, and report progress bytes to the Dependencies tab.
- **3.5** After download, model paths are wired into the worker's `models_dir` contract so the render pipeline finds every weight without manual path entry. The default models dir resolves under the host data dir (`NEXUS_HOST_DATA_DIR`), not a hardcoded `D:\svi2_models`.
- **3.6** The fake backend requires **zero** model downloads to run (its versions.yaml has no heavy artifacts), so CI/offline install + fake render works with no weights on disk.
- **3.7** A dry-run/mock model-store path (or a test double) lets the offline test suite exercise the full install plan including model steps without fetching tens of GB. Documented and used by the install integration test.
- **3.8** Integrity: the install fails loudly (clear error in the panel) if a declared artifact's checksum mismatches; it does not silently proceed.

## Category 4 — Presets & Profiles (weight 12)

- **4.1** All 11 presets from `data/render_presets.json` are selectable in the UI (canonical ×3 resolutions, natural ×2, natural-lowvram ×2, forced-motion ×2, flf2v-morph, chained-single-prompt).
- **4.2** Every preset's `params` map **1:1** to `validate_render_params` keys (worker-consumable). A test asserts each preset validates against `schemas/svi2_render_params.schema.json` and against the worker validator.
- **4.3** Selecting a preset populates the Recipe form fields; the user can then nudge individual fields (presets are starting points, not locks).
- **4.4** Off-distribution resolution presets (704, 640) surface the **resolution warning** in the UI exactly when the worker would warn (sub-480p budget), without blocking the render.
- **4.5** Low-VRAM presets clearly indicate their 16 GB targeting and the `blocks_to_swap=40` tradeoff in the UI.
- **4.6** Presets that require a `last-image` (flf2v-morph) make the last-image upload **required** and validate its presence before allowing render.
- **4.7** The canonical preset is the default selection on first open, with a one-line "recommended baseline" hint.
- **4.8** A host-consumable contract exposes the preset catalog to the UI (RPC method or served JSON), so the UI does not hardcode preset bodies — it reads them from the extension's data file.

## Category 5 — Default Settings / ConfigWidget (weight 8)

- **5.1** A settings surface (ConfigWidget contribution and/or a Settings route in the React app) exposes editable **defaults**: models dir, attention backend (`SVI2_ATTENTION`: auto/sdpa/flash2/sage2/sage3_fp4), fp8 compute mode (`SVI2_FP8_COMPUTE`: bf16/fp8), default `blocks_to_swap`, default interpolation method + target fps, default output dir.
- **5.2** Settings persist (extension-local storage or settings table) and are applied as the form defaults for new renders.
- **5.3** Environment levers documented in `docs/fields.md` / `docs/parameters-audit.md` that are operator-facing (not INTERNAL) are reachable from the settings UI; INTERNAL levers are deliberately not exposed.
- **5.4** Sensible shipped defaults: canonical preset, `SVI2_FP8_COMPUTE=bf16`, `SVI2_ATTENTION=flash2` (with sdpa fallback), `blocks_to_swap=40` (16 GB-safe), interpolate rife→ffmpeg fallback.

## Category 6 — UI: Recipe View (weight 12)

- **6.1** React custom-element app under `web/` (React 19 + vanilla-extract + Spectral Graphite tokens), registered as a custom element per the emotion-tts pattern (`main.tsx` `register()`), declared in manifest `ui.custom_elements` + `ui.assets.root: web/dist`.
- **6.2** Preset gallery: cards for all 11 presets with label, description, resolution/duration/VRAM badges, and a "use" action.
- **6.3** Anchor inputs: ref-image upload (required) + optional last-image upload (required for flf2v), with preview thumbnails and basic validation (image type, dimensions /16 hinting).
- **6.4** Prompt input: single-prompt-first UX (canonical guidance) with the option to supply per-clip prompts; inline hint that appearance-change verbs belong in an edited keyframe, not the prompt.
- **6.5** Nudgeable fields form grouped by tier (core / quality / coherence / identity / motion / transform / perf) per `docs/fields.md`, with min/max/step/default from the schema; advanced tiers collapsed by default.
- **6.6** Client-side validation mirrors the worker validator (4n+1 frames, /16 dims, ranges) and blocks invalid submits with clear messages.
- **6.7** "Render" action invokes the render via the host action bridge / RPC and transitions to the progress view.
- **6.8** Edit-then-animate (Qwen anchor edit) is exposed as an optional toggle with its prompt + parameters, only when those models are present.

## Category 7 — UI: DAG View (weight 8)

- **7.1** A DAG/node-graph view (using the host `@xyflow/react` canvas) visualizes the render pipeline as nodes: anchor → (optional Qwen edit) → per-clip diffusion → stitch/crossfade → interpolation → mux. Edges reflect data flow.
- **7.2** Nodes reflect live state during a render (idle/active/done/error) driven by the same RPC notifications as the progress view.
- **7.3** The DAG view is read-first; if node-level parameter editing is included it writes back to the same render params as the Recipe view (single source of truth — no divergent state).
- **7.4** svi2-specific node types live in the **extension** bundle; only a generic DAG canvas wrapper (if any) is added to host core.
- **7.5** Recipe view and DAG view are two views of one render request; switching between them preserves the in-progress configuration.

## Category 8 — UI: Render Progress & Output (weight 8)

- **8.1** Live progress: overall %, current clip N/total, denoise step N/steps, and VRAM peak, driven by worker notifications (`svi2.video.progress`, `clip.started/step/completed`, `runtime.memory_stats`).
- **8.2** Cancel action calls `svi2.video.render.cancel` and the UI returns to an idle/cancelled state cleanly.
- **8.3** On completion, an inline video player plays the output MP4 (with the interpolated fps), plus a render-report summary (frames, duration, VRAM peak, sha256) from `render_report.json`.
- **8.4** Render history list (backed by storage, see Cat 11) shows past jobs with preset, params summary, status, and a replay/open action.
- **8.5** Error states render a clear, actionable message mapped from the worker error codes (DRIVER_TOO_OLD, MODEL_MISSING, VRAM_BUDGET_EXCEEDED, RENDER_FAILED, etc.), not a raw stack trace.

## Category 9 — UI Polish (weight 6)

- **9.1** Spectral Graphite design system: dark graphite surfaces, spectral accents, no hard borders, glassmorphism, dual typography — consistent with the rest of the app.
- **9.2** No obvious layout issues at 1024/1440/1920: no overflow, no clipped controls, no overlapping text. Verified by preview screenshots at those widths.
- **9.3** Designed hover/focus/active states on all interactive controls; visible keyboard focus.
- **9.4** Empty states (no presets loaded, no models, no history) and loading skeletons are intentional, not blank.
- **9.5** Console is clean during a fake-backend render: no errors, no React key warnings, no unhandled promise rejections (verified via preview console logs).
- **9.6** Animations (if any) stay on compositor-friendly properties and respect reduced-motion.

## Category 10 — Host ↔ Extension Boundary (weight 6, GATE)

This category is a **hard gate**: any failure here blocks merge regardless of overall %.

- **10.1** `grep -rn "svi2\|svi-pro\|svi_2\|video\.svi" crates/ apps/web/src/` returns **zero** extension-specific hits (only generic mount points / parameterized-by-id code allowed).
- **10.2** No new DB tables/columns named after svi2 in the host `migrations/` folder; all extension tables are `ext_svi2_pro__*` inside the extension's own `storage/migrations/`.
- **10.3** No host route hardcodes the svi2 extension id; the extension is reached only via the generic `/api/v1/extensions/:id/*` mount.
- **10.4** Any new host **core** UI components (e.g. a generic VideoPlayer, FileDropzone, DagCanvas wrapper, TierFieldGroup) are genuinely generic — no svi2 literals — and are placed in the shared host UI library so other extensions can reuse them. Each new host component has a short usage note.
- **10.5** No new host crate named after the extension. The extension's Rust (if any) lives under `extensions/builtin/svi2-pro/rust/`.

## Category 11 — Storage (weight 3)

- **11.1** Storage namespace declared in manifest (`alias: svi2_pro`, `prefix_mode: host_derived`); migrations live under `extensions/builtin/svi2-pro/storage/migrations/`.
- **11.2** Minimum tables: `ext_svi2_pro__render_jobs` (job id, preset id, params json, status, output path, render_report json, timestamps) and `ext_svi2_pro__settings` (default settings blob) — or settings via extension-local storage if cleaner.
- **11.3** Migrations apply cleanly under the host's `nexus_sqlite_v1` profile; a test asserts forward migration from empty.

## Category 12 — Fake Backend E2E (weight 5)

- **12.1** With the **fake** runtime selected, a full render can be triggered from the React UI (or its RPC contract) and produces a deterministic synthetic MP4 — no GPU, no real weights.
- **12.2** The fake render drives the same progress notifications so the progress + DAG views can be verified offline.
- **12.3** An automated test runs the fake render end-to-end (worker side) and asserts the output artifact + render_report shape.

## Category 13 — Tests & Build (weight 6)

- **13.1** Worker pytest suite green (existing 145+ tests stay green; new tests for preset↔schema, install plan, fake E2E added). No regressions.
- **13.2** Frontend: `tsc --noEmit` clean, `vite build` produces `web/dist/svi2-pro.{js,css}`, and committed dist is rebuilt.
- **13.3** Frontend unit/component tests (vitest) for the preset gallery, field validation, and the render state machine.
- **13.4** Manifest validation test: the manifest parses against the host extension manifest schema (all required blocks present: dependencies, capabilities, backend_runtimes, ui, operators/recipes, storage).
- **13.5** Boundary grep test wired into CI (Cat 10) returns clean.
- **13.6** `cargo test` for any touched host crates stays green; new generic host components have tests.

## Category 14 — Docs (weight 2)

- **14.1** `extensions/builtin/svi2-pro/README.md` updated to describe install-from-panel, auto-download-on-install, preset usage, and the two UI views.
- **14.2** `docs/presets.md` and `docs/fields.md` stay the source of truth and are linked from the UI (a "docs"/help affordance), not duplicated.
- **14.3** A short "GPU smoke (deferred operator gate)" section documents how to run the real rtx50-fp8 render after install — clearly marked out of scope for the 95% bar.

---

## Workstream decomposition (for parallel opus-4.8 implementors)

- **WS-A — Manifest, deps, model auto-download, backend version manifests, storage** (Cat 1,2,3,11) — host-contract heavy; unblocks everything.
- **WS-B — React app: Recipe view, progress, output, polish, settings** (Cat 5,6,8,9) — depends on A's UI/preset contract + D's components.
- **WS-C — Recipe/operator/preset wiring + preset catalog contract + DAG view** (Cat 4,7,12) — depends on A.
- **WS-D — Generic host core components** (Cat 10.4) — VideoPlayer / FileDropzone / DagCanvas wrapper / TierFieldGroup, all generic.
- **WS-E — Tests & build + boundary guard + docs** (Cat 13,14, gate 10) — runs each round.

## Out of scope (deferred)

- Real GPU render acceptance (rtx50-fp8 on RTX 5070 Ti / DGX).
- Real upstream sha256 pinning for binaries lacking published hashes (placeholder + documented).
- Streaming-infinite / 10+ clip endurance runs.
