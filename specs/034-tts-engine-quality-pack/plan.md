# Implementation Plan: EmotionTTS Engine Quality + Performance Expansion Pack

**Branch**: `main` (spec 034) · **Date**: 2026-04-24 · **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from [specs/034-tts-engine-quality-pack/spec.md](./spec.md)

## Summary

Spec 031 shipped a working EmotionTTS extension (Rust shim + Python worker + React recipe UI + SQLite storage + content-hash synthesis cache). A code-review pass on the engine path found five Critical issues — all patched inline in commit `dea4fc0`. A deep-research pass then surfaced five first-class improvement opportunities covering quality, observability, performance, and future-readiness. This plan shapes those five opportunities into ordered sub-phases, each landable independently, every one strictly inside `extensions/builtin/emotion-tts/**` with zero host changes.

The improvements, ranked by impact/effort:

1. **Reference-audio preprocessing pipeline** — `worker/ref_audio.py` (new) runs a deterministic chain (resample → mono → RNNoise → VAD → pyloudnorm −25 LUFS → peak limit −1 dBFS → 30 s hard cap / 15 s soft target) on voice-asset upload. Stored as a second artifact alongside the original so A/B is provenance-safe.
2. **OAS observability** — `worker/observability/` (new) hooks attention tensors out of the decoder, computes Optimal Alignment Score (Viterbi path probability) per segment, flags segments below a learned per-deployment threshold, and generates log-scale attention-map PNGs for flagged segments only (cost control).
3. **Speaker-prefix in-memory LRU cache** — `worker/speaker_cache.py` (new) caches computed speaker-conditioning embeddings keyed on `(reference_content_hash, model_family, runtime_version)`. Extension-local, subprocess-lifetime scope, bounded to `speaker_cache_mb` from `AdapterSettings` (default 200 MB).
4. **Opt-in `torch.compile` + static KV cache for the GPT stage** — `worker/gpt_compile.py` (new) wraps the sampling loop once per session, pads text to `pad_to_multiple_of`, and falls back to uncompiled inference on any `CompilationError` with a structured warning.
5. **Dual model-family support** — `worker/families/` (new) loads family descriptors from `recipes/families/*.yaml`, so a future `indextts-2.5` drops in as a pure YAML + weights addition. Cache key + manifest already carry `model_family` (FR-242 / FR-243).

All five share three cross-cutting rules: **every toggle surfaces in the deployment recipe UI** (FR-251), **every toggle is recorded in the manifest** (FR-252), and **every observability artifact travels through the host artifact store** (FR-253). No sidecar files, no env vars, no host coupling.

## Technical Context

**Language/Version**:
- Python 3.11 (embedded distribution, matches spec 031). `torch >= 2.4` for `torch.compile` stability on Windows-CUDA; `torchaudio >= 2.4`.
- Rust 1.84 (extension's own Cargo workspace — not the host workspace, per spec 031 checkpoint gotcha #5).
- TypeScript 5.7 + React 19 + Vite 6 for the recipe UI additions.

**Primary Dependencies** (additive to spec 031's set):

- **Python preprocessing (US1)**: `pyloudnorm >= 0.1.1` (BSD), `silero-vad >= 5.1` (MIT, preferred over pyannote-audio for Windows-wheel availability), `RNNoise` Python bindings via `rnnoise-wheels >= 0.1` OR a pure-Python/numpy denoiser if wheels are unreliable on Windows. **Resolved in research.md § R-34-01.**
- **Python observability (US2)**: standard `torch` + `numpy` only; the attention hook is pure PyTorch introspection. Attention-map PNG uses `matplotlib >= 3.8` with the `Agg` non-interactive backend — already a transitive of the base pytorch stack, confirmed no extra install.
- **Python cache (US3)**: stdlib `collections.OrderedDict` + `threading.Lock`. No new dependencies.
- **Python compile (US4)**: `torch >= 2.4` provides `torch.compile`; `flash-attn` is **not** required (we do not bind to a specific attention kernel). **Windows-CUDA `triton` wheel availability is the blocker; resolved in research.md § R-34-04.**
- **Python family loader (US5)**: `pyyaml` (already in spec 031 worker deps).
- **Rust side**: no new crates. The five improvements are Python-side only; Rust changes are restricted to RPC surface (a few new methods + fields), manifest writer (new record fields), and `AdapterSettings` (new toggle fields).
- **Frontend**: no new packages. All UI additions ride on existing `vanilla-extract` / `motion` / `react-router` / `swr`.

**Storage**:
- Extension-owned SQLite (existing). One additive migration: `011_deployment_engine_settings.sql` adds four nullable columns to `ext_emotion_tts__deployments` (`reference_preprocess_enabled`, `oas_enabled`, `compile_gpt_enabled`, `model_family`). No new tables.
- Voice-asset table (existing) gains one nullable column via `012_voice_assets_preprocess.sql`: `preprocessed_artifact_ref TEXT NULL`.
- Manifest entries (already on host artifact store) gain four fields per segment: `alignment_score`, `alignment_flag`, `attention_map_artifact_ref`, `compile_active`. Top-level manifest gains `preprocessing_report_ref`, `model_family`. No schema change to the manifest table — these travel inside the JSON payload.
- Speaker-prefix cache is in-memory in the Python worker process; no SQLite row.

**Testing**:
- Rust: `cargo test` with integration tests under `extensions/builtin/emotion-tts/rust/tests/` (existing pattern). Contract tests for new endpoints; unit tests for family-loader + manifest-writer changes.
- Python: `pytest` under `extensions/builtin/emotion-tts/worker/tests/`. The preprocessing pipeline is tested against a small corpus of reference clips checked into `worker/tests/fixtures/audio/`; OAS is tested with a synthetic attention tensor + golden Viterbi path; speaker cache is tested via the stdlib; compile path is tested against a stub model (`torch.compile` on a tiny `nn.Linear`).
- Frontend: unit tests for new components via `vitest`; the Playwright smoke test (T128 in spec 031) is extended with a "toggles round-trip through the manifest" scenario.
- E2E: one new Playwright test (behind `RUN_E2E=1`) that exercises the full preprocessing → synthesis → manifest round-trip.

**Target Platform**:
- **Primary**: Windows-x64 + CUDA 12.8 (existing spec 031 target). All five improvements MUST ship on this platform.
- **Secondary (v1+)**: Windows-x64 CPU fallback (preprocessing works; OAS works; compile skipped with structured warning; speaker cache works; family loader works).
- **Not in this spec**: Linux / macOS / non-CUDA. Inherits spec 031's deferral.

**Project Type**: **Extension-under-host** — same shape as spec 031. No net-new source tree at the repo root. Everything lives under `extensions/builtin/emotion-tts/` in its existing subdirectories plus a few new modules.

**Performance Goals** (restated from spec Success Criteria):

- SC-200/201 Reference preprocessing: ≥ 70 % listener preference for speaker similarity on the curated hard-reference set; ≥ 15 % cosine-distance reduction on an objective speaker-encoder.
- SC-202/203 OAS observability: ≥ 80 % precision at ≥ 80 % recall on a 25-segment benchmark; ≤ 80 ms CPU at p95 per flagged segment for PNG generation.
- SC-204/205 Speaker-prefix cache: ≥ 5 % total wall-clock reduction; ≥ 60 % warm-start latency reduction from second segment onward.
- SC-206/207 Compile: ≤ 0.55× baseline wall-clock; failure fallback stays within 1.05× baseline.
- SC-208 Dual-family: zero cross-family cache hits and zero state bleed across concurrent deployments.
- SC-209 Boundary: zero host-path references to any extension-id literal.

**Constraints**:
- Principle XIII (non-negotiable): zero host crate changes. Zero `apps/web/src/` changes outside the generic extension-rendering surface. `audit-boundary.ps1` is the merge gate.
- Principle III: Rust files ≤ 800 LOC, functions ≤ 25 LOC (soft). Python modules follow PEP 8 + the same size discipline.
- Principle IV: No inline code comments. User-facing strings (help tooltips, warning banners) are UI content, not comments.
- Principle VI: Tests lead implementation. Every new module ships with its test file red-green-refactored.
- Principle XII: New UI components obey the smart/dumb split (`*.view.tsx` / `*.ui.tsx`) and route loaders own I/O.
- **VRAM / memory**: speaker cache defaults to 200 MB, compile adds ≤ 500 MB of buffer overhead for the static KV; both bounded and configurable.
- **Additive migrations only**: two migrations that ADD nullable columns. Never ALTER a column type, never DROP. Zero risk to existing deployments.

**Scale/Scope**:
- Typical batch: 1–50 segments (unchanged from spec 031).
- Stress batch: 500 segments (audiobook chapter). OAS module MUST sample attention tensors without blowing RAM: a 500-segment run emits 500 alignment scores (8 bytes each = 4 KB) and at most ~10 PNG artifacts (only flagged segments).
- Concurrent deployments sharing one runtime: 3 design target, 5 tested. Dual-family support MUST not change this target.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| # | Principle | Status | Notes |
|---|---|---|---|
| I | Ecosystem-First | **PASS** | All library picks are upstream: `pyloudnorm`, `silero-vad`, `matplotlib`, `torch.compile`. No hand-rolled denoiser / VAD / PNG generator. No custom attention-score algorithm — OAS comes from arXiv:2108.10447. |
| II | SOLID + classical | **PASS** | Preprocessing is a Chain of Responsibility (each stage can be skipped/replaced). OAS is a forward-hook Observer over the decoder. Speaker cache is a straightforward Cache. Compile path is a Decorator around `IndexTTS2.infer()`. Family loader is a Factory over YAML descriptors. |
| III | Modularity | **PASS** | 5 new Python modules, each < 300 LOC target. Each US maps 1:1 to a file. `worker/ref_audio.py`, `worker/observability/__init__.py` + `oas.py` + `attention_map.py`, `worker/speaker_cache.py`, `worker/gpt_compile.py`, `worker/families/__init__.py` + `registry.py` + `loader.py`. |
| IV | No inline comments | **PASS** | Same discipline as spec 031. `//!` and `///` module/API docs only; user-visible tooltip strings live in `.ui.tsx` children, not in comments. |
| V | Extendability via adapter contracts | **PASS** | Every improvement reaches the user through a contract any external TTS extension could implement: preprocessing is a `PreprocessorProtocol`, observability is a `DiagnosticsSink`, speaker cache keys off public metadata, compile path is a runtime capability advertised via handshake, family loader is a YAML-declarative registry. |
| VI | Test-First | **PASS** | 11 new test files planned; see Phase 1 contracts/ directory below. The deepest code path (compile) has a stub-model test so CI can run without a GPU. |
| VII | Memory & type safety | **PASS** | Typed dataclasses for every new DTO on the Python side; newtypes + `thiserror` for every new Rust error. No `unsafe`. |
| VIII | Living documentation | **PASS** | Updates to `worker/README.md` + `rust/README.md` land inside the polish phase of this spec. |
| IX | Git-flow / bisectability | **PASS** | Each US is a self-contained commit set that leaves `cargo test` green. Commit plan: 1 per US + 1 Rust-side manifest/migration + 1 frontend toggles + 1 polish. |
| X | Parallelism-first | **PASS** | Preprocessing stages are independent (denoise, VAD, loudness all composable). OAS attention hooks fire per-head in parallel. Family reconciliation at activation is a single pass. |
| XI | Rust idioms | **PASS** | New Rust surface is minimal: a few DTOs + manifest fields + migration loader entries. Existing patterns (newtypes, borrowed args, `thiserror`) apply. |
| XII | Web frontend architecture | **PASS** | New UI is 4 toggles (preprocess, OAS, compile, family) + 1 new observability panel (alignment badge + PNG viewer). All under `views/recipe/` + `views/run_detail/`. Smart/dumb split preserved. |
| XIII | Host ↔ Extension Boundary (NON-NEGOTIABLE) | **PASS** | Zero host crates touched. Zero `apps/web/src/` files touched. Everything lives under `extensions/builtin/emotion-tts/**`. Both boundary audits must return zero. |

**Verdict**: all gates pass. **No carve-outs needed** — spec 031's carve-out (the host generic-backend-runtime prerequisite) is already resolved by spec 032. Spec 034 ships entirely within the extension.

## Project Structure

### Documentation (this feature)

```text
specs/034-tts-engine-quality-pack/
├── plan.md              # This file (/speckit.plan output)
├── research.md          # Phase 0 output — 10 research items (R-34-01..R-34-10)
├── data-model.md        # Phase 1 output — 6 entity updates + 2 migrations
├── contracts/
│   ├── http/            # New HTTP endpoints for toggles + diagnostics
│   │   ├── engine_settings.yaml
│   │   ├── voice_assets_preprocess.yaml
│   │   ├── families.yaml
│   │   └── diagnostics.yaml
│   └── rpc/             # JSON-RPC additions to the Rust ↔ Python boundary
│       ├── methods_additions.md
│       └── notifications_additions.md
├── quickstart.md        # Developer onboarding — how to enable each toggle
└── checklists/
    └── requirements.md  # Already shipped from /speckit.specify
```

### Source Code (repository)

```text
extensions/builtin/emotion-tts/
├── manifest.yaml                    # unchanged (toggles live in deployment rows, not manifest)
├── storage/migrations/
│   ├── 011_deployment_engine_settings.sql   # NEW — adds 4 nullable cols to deployments
│   └── 012_voice_assets_preprocess.sql       # NEW — adds preprocessed_artifact_ref col
├── recipes/
│   └── families/
│       ├── indextts-2.yaml          # NEW — default family, describes current model
│       └── indextts-2-5.yaml        # NEW (stub until weights ship) — future family
├── rust/
│   ├── src/
│   │   ├── lib.rs                   # MODIFIED — register 011/012, expose Rust-side settings field
│   │   ├── domain/
│   │   │   ├── cache_key.rs         # MODIFIED — include model_family in canonical string
│   │   │   ├── manifest.rs          # MODIFIED — 6 new fields (alignment_score, flag, ref, compile_active, model_family, preprocessing_report_ref)
│   │   │   └── family.rs            # NEW — ModelFamily newtype + FamilyRegistry loader
│   │   ├── router/
│   │   │   ├── engine_settings.rs   # NEW — GET/PATCH /deployments/:id/engine-settings
│   │   │   ├── voice_assets.rs      # MODIFIED — preprocessedArtifactRef on GET, toggle on PATCH
│   │   │   ├── families.rs          # NEW — GET /families, GET /families/:id
│   │   │   └── diagnostics.rs       # NEW — GET /runs/:id/diagnostics, serves PNG refs
│   │   └── storage/
│   │       ├── deployments_repo.rs  # MODIFIED — read/write 4 new columns
│   │       └── voice_assets_repo.rs # MODIFIED — read/write preprocessed_artifact_ref
│   └── tests/
│       ├── http_contract_engine_settings_test.rs  # NEW
│       ├── http_contract_families_test.rs         # NEW
│       ├── http_contract_diagnostics_test.rs      # NEW
│       └── family_registry_test.rs                # NEW
├── worker/
│   ├── src/emotion_tts_worker/
│   │   ├── ref_audio.py             # NEW — preprocessing pipeline (US1)
│   │   ├── observability/
│   │   │   ├── __init__.py          # NEW
│   │   │   ├── oas.py               # NEW — Optimal Alignment Score (US2)
│   │   │   ├── attention_hook.py    # NEW — forward-hook capture
│   │   │   └── attention_map.py     # NEW — PNG renderer (matplotlib Agg)
│   │   ├── speaker_cache.py         # NEW — in-memory LRU (US3)
│   │   ├── gpt_compile.py           # NEW — torch.compile wrapper (US4)
│   │   ├── families/
│   │   │   ├── __init__.py          # NEW
│   │   │   ├── registry.py          # NEW — YAML loader + reconcile (US5)
│   │   │   └── descriptor.py        # NEW — FamilyDescriptor dataclass
│   │   ├── indextts_adapter.py      # MODIFIED — plumb speaker_cache, compile toggle, family choice
│   │   ├── handlers.py              # MODIFIED — 4 new RPC methods + 2 notification types
│   │   ├── synthesis.py             # MODIFIED — invoke ref_audio + observability + cache + compile
│   │   └── rpc.py                   # MODIFIED — add new method constants
│   └── tests/
│       ├── test_ref_audio.py        # NEW
│       ├── test_oas.py              # NEW
│       ├── test_attention_map.py    # NEW
│       ├── test_speaker_cache.py    # NEW
│       ├── test_gpt_compile_stub.py # NEW (stub model — runs on CI without GPU)
│       ├── test_family_registry.py  # NEW
│       └── fixtures/audio/          # NEW — 3 small wav fixtures for preprocessing tests
└── web/
    └── src/
        ├── services/
        │   ├── engine_settings_client.ts     # NEW
        │   ├── families_client.ts            # NEW
        │   └── diagnostics_client.ts         # NEW
        └── views/
            ├── recipe/components/
            │   ├── engine_settings_panel.tsx  # NEW — 4 toggle controls + family picker
            │   └── engine_settings_panel.css.ts  # NEW
            ├── run_detail/
            │   ├── run_detail.view.tsx       # MODIFIED — alignment badge column, PNG modal
            │   └── attention_map_modal.tsx   # NEW
            └── mapping_editor/
                └── mapping_editor.view.tsx    # MODIFIED — per-voice-asset preprocess toggle
```

**Structure Decision**: Inherits spec 031's layout. No new top-level directories. The extension's Rust crate remains a standalone Cargo workspace (never a member of the host workspace). The web bundle remains a custom-element build per spec 031 T125a. Two additive SQLite migrations + one YAML family registry. Zero net-new files at the repo root.

## Complexity Tracking

No constitution gate violations. Complexity notes worth logging so reviewers don't hunt:

| Flagged Area | Note | Mitigation |
|---|---|---|
| `torch.compile` Windows-CUDA13 | `triton` wheel availability is a moving target | US4 is opt-in with graceful fallback (FR-232). Default OFF until we have 2 weeks of green CI. |
| RNNoise Windows wheel | PyPI `rnnoise-wheels` support for Windows-x64 is uneven | If the install fails, US1 skips the denoise stage only, logs a structured warning, and ships with VAD + pyloudnorm; quality still improves meaningfully. Research item R-34-01. |
| Attention tensors not returned by upstream | Requires forward hooks on internal modules | Hook setup lives in one file (`attention_hook.py`) so an upstream refactor has a single audit site. Research item R-34-02. |
| Dual-family concurrency on one runtime | Two deployments sharing the worker subprocess with different families | Per-call `model_family` field on synthesize params; worker holds a per-family adapter map, bounded size 2. Research item R-34-05. |
| IndexTTS 2.5 not yet released | US5 must ship with a mock second family for tests | `indextts-2-5.yaml` stub points at the same weights dir as 2.0 for CI; real weights path lands as a one-line YAML change when upstream ships. |
