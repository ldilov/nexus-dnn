# Spec 046 — Tasks

Numbering: `P{phase}-T{nnn}`. Phases per [plan.md](plan.md).
Acceptance gates per [spec.md](spec.md).

Status legend: ☐ pending · ▶ in-progress · ✓ done · ⊘ deferred · 🟥 blocked

---

## P0 — Verification spike (BLOCKING for P2+)

| ID | Task | Status | Owner |
|---|---|---|---|
| P0-T001 | Verify diffusers' LTXImageToVideoPipeline loads `Lightricks/LTX-2.3` FP8 checkpoint and generates one 4s segment on a 16 GB GPU | ☐ | runtime engineer |
| P0-T002 | If P0-T001 fails: verify Lightricks' native `LTX-Video/inference.py` does the same | ☐ | runtime engineer |
| P0-T003 | Cold-spawn benchmark (Python start + torch import + LTX checkpoint load + 1 segment + clean exit). If `< 15%` of duration=120s wall-clock, switch D2 to process-per-segment | ☐ | runtime engineer |
| P0-T004 | Confirm HuggingFace repos `Lightricks/LTX-2.3` + `Lightricks/LTX-2.3-nvfp4` exist with claimed file paths | ☐ | runtime engineer |

Results recorded in [research.md](research.md) § Phase-0 table.

---

## P1 — Vertical slice (THIS SESSION — fake runtime path)

### Extension scaffolding

| ID | Task | Status |
|---|---|---|
| P1-T010 | Create `extensions/builtin/nexus-video-ltx23/` directory layout | ☐ |
| P1-T011 | `manifest.yaml` (per emotion-tts template, adapted for LTX) | ☐ |
| P1-T012 | `README.md` extension overview | ☐ |
| P1-T013 | `storage/migrations/001_ltx_video_projects.sql` | ☐ |
| P1-T014 | `storage/migrations/002_ltx_video_runs_segments.sql` | ☐ |
| P1-T015 | `recipes/image-to-long-video.yaml` | ☐ |
| P1-T016 | `workflows/long-video.yaml` | ☐ |
| P1-T017 | `operators/{plan-long-video,submit-render,check-render-status}.yaml` | ☐ |
| P1-T018 | `openapi/extension.openapi.yaml` (per spec template + 7 routes) | ☐ |
| P1-T019 | `scripts/audit-boundary.sh` (per spec template) | ☐ |
| P1-T020 | `backends/{rtx40-fp8,rtx50-fp8,rtx50-nvfp4,fake}/backend-runtime.yaml` (4 descriptors) | ☐ |
| P1-T021 | `backends/{rtx40-fp8,rtx50-fp8,rtx50-nvfp4,fake}/versions.yaml` (4 version manifests) | ☐ |
| P1-T022 | `worker/pyproject.toml` + uv.lock (will be generated post-install) | ☐ |
| P1-T023 | `ui/layouts/main.yaml` + `ui/open_recipe.yaml` | ☐ |

### Rust extension worker

| ID | Task | Status |
|---|---|---|
| P1-T030 | `rust/Cargo.toml` (depends on nexus-extension, nexus-storage, nexus-api, nexus-events, nexus-artifact, tokio, serde, sqlx) | ☐ |
| P1-T031 | `rust/src/lib.rs` mod tree | ☐ |
| P1-T032 | `rust/src/main.rs` worker entrypoint (stdio JSON-RPC to host) | ☐ |
| P1-T033 | `rust/src/schemas.rs` DTOs per data-model.md | ☐ |
| P1-T034 | `rust/src/errors.rs` error taxonomy + `IntoResponse` mapping | ☐ |
| P1-T035 | `rust/src/planning.rs` RenderPlan computation (frame_count = 8n+1, segment_count, deterministic seeds, w/h divisible by 32) | ☐ |
| P1-T036 | `rust/src/runtime_selection.rs` (profile auto-select from host GPU facts) | ☐ |
| P1-T037 | `rust/src/storage.rs` CRUD for ext_nexus_video_ltx23__* tables | ☐ |
| P1-T038 | `rust/src/events.rs` idempotent runtime-event forwarder | ☐ |
| P1-T039 | `rust/src/api.rs` 7 route handlers (health, runtime-profiles, recipe/plan, renders, renders/{id}, renders/{id}/cancel, renders/{id}/retry-segment) | ☐ |
| P1-T040 | `rust/src/supervisor.rs` warm-runtime restart-on-threshold (or removed post P0-T003) | ☐ |
| P1-T041 | `rust/src/privacy.rs` prompt redaction scaffold | ☐ |

### Rust tests

| ID | Task | Status |
|---|---|---|
| P1-T050 | `tests/planner_tests.rs` — frame_count rounding, segment count, seed derivation, w/h enforcement, duration bounds | ☐ |
| P1-T051 | `tests/runtime_selection_tests.rs` — auto-select matrix for {Blackwell, Ada, no-NVIDIA} × {nvfp4 opt-in, opt-out} | ☐ |
| P1-T052 | `tests/events_idempotency_tests.rs` — duplicate sequence dropped; reconnect resumes | ☐ |
| P1-T053 | `tests/boundary_audit_tests.rs` — asserts audit script exits 0 against the current repo | ☐ |
| P1-T054 | `tests/fake_runtime_e2e_test.rs` — full plan → render → events → final artifact cycle against the fake Python worker | ☐ |

### Python backend runtime (`_shared/worker/`)

| ID | Task | Status |
|---|---|---|
| P1-T060 | `pyproject.toml` (torch, diffusers, transformers, accelerate, safetensors, huggingface_hub, ffmpeg-python, pillow, numpy, practical-rife) — fake profile deps subset | ☐ |
| P1-T061 | `src/ltx_video_worker/__main__.py` + stdout-swap trick | ☐ |
| P1-T062 | `src/ltx_video_worker/main.py` JSON-RPC NDJSON event loop | ☐ |
| P1-T063 | `src/ltx_video_worker/rpc.py` method registry, error codes, framing | ☐ |
| P1-T064 | `src/ltx_video_worker/pipeline_fake.py` deterministic placeholder MP4 + progress events | ☐ |
| P1-T065 | `src/ltx_video_worker/vram.py` canonical drop sequence (skeleton; no-op in fake mode) | ☐ |
| P1-T066 | `src/ltx_video_worker/planning_validate.py` ltx.video.plan.validate | ☐ |
| P1-T067 | `src/ltx_video_worker/ffmpeg_io.py` encode/stitch/trim wrappers | ☐ |
| P1-T068 | `src/ltx_video_worker/telemetry.py` structured JSON log emission | ☐ |
| P1-T069 | `tests/test_rpc_framing.py` | ☐ |
| P1-T070 | `tests/test_fake_pipeline.py` | ☐ |
| P1-T071 | `tests/test_vram_drop_sequence.py` (mock torch) | ☐ |
| P1-T072 | `tests/test_planning_validate.py` | ☐ |

### Frontend (extension-owned custom-element bundle)

| ID | Task | Status |
|---|---|---|
| P1-T080 | `web/package.json`, `tsconfig.json`, `vite.config.ts` (mirror emotion-tts setup) | ☐ |
| P1-T081 | `web/src/index.tsx` — custom-element register (`ltx23-video-app`) | ☐ |
| P1-T082 | `web/src/LtxRecipeApp.tsx` root | ☐ |
| P1-T083 | `web/src/components/RenderForm.tsx` | ☐ |
| P1-T084 | `web/src/components/PlanPreview.tsx` | ☐ |
| P1-T085 | `web/src/components/SegmentTimeline.tsx` + `SegmentCard.tsx` | ☐ |
| P1-T086 | `web/src/components/FinalArtifactPanel.tsx` (uses host `<MediaArtifactPlayer>`) | ☐ |
| P1-T087 | `web/src/hooks/useRender.ts` + `useSseProgress.ts` | ☐ |
| P1-T088 | `web/src/styles/tokens.css.ts` (vanilla-extract, imports Spectral Graphite globals) | ☐ |
| P1-T089 | Vitest for form validation, plan preview, segment reducer | ☐ |
| P1-T090 | Build + commit `web/dist/ltx23-video.{js,css}` (per emotion-tts precedent) | ☐ |

### Host frontend — generic `MediaArtifactPlayer`

| ID | Task | Status |
|---|---|---|
| P1-T100 | `apps/web/src/components/media/MediaArtifactPlayer.tsx` (audio + video, generic props) | ☐ |
| P1-T101 | `apps/web/src/components/media/MediaArtifactPlayer.css.ts` | ☐ |
| P1-T102 | `apps/web/src/components/media/MediaArtifactPlayer.test.tsx` (loading/error/success/empty/download states) | ☐ |
| P1-T103 | `apps/web/src/components/media/index.ts` re-export | ☐ |

### CI / quality gates

| ID | Task | Status |
|---|---|---|
| P1-T110 | Workspace `Cargo.toml` includes new extension worker crate | ☐ |
| P1-T111 | `cargo build --workspace` green | ☐ |
| P1-T112 | `cargo clippy --workspace -- -D warnings` green | ☐ |
| P1-T113 | `cargo test --workspace -p nexus-video-ltx23-worker` green | ☐ |
| P1-T114 | `pnpm tsc --noEmit && pnpm vitest run` green | ☐ |
| P1-T115 | `cargo run --bin api_doc_check` exits 0 with new extension fragment aggregated | ☐ |
| P1-T116 | `bash extensions/builtin/nexus-video-ltx23/scripts/audit-boundary.sh` exits 0 | ☐ |

---

## P2 — rtx40-fp8 real runtime

| ID | Task | Status |
|---|---|---|
| P2-T200 | `pipeline_diffusers.py` LTX-2.3 image-to-video (or pipeline_native.py per P0 outcome) | ⊘ (next session) |
| P2-T201 | `interpolation.py` RIFE 2× wrapper | ⊘ |
| P2-T202 | Installer playbook validation (`scripts/install-validate.py --profile rtx40-fp8`) | ⊘ |
| P2-T203 | Driver / GPU facts pre-flight | ⊘ |
| P2-T204 | Safe-preset risk estimator | ⊘ |
| P2-T205 | Smoke test on real RTX 40 16 GB hardware | ⊘ |
| P2-T206 | Supervisor mid-segment OOM recovery test | ⊘ |

---

## P3 — Seed/latent continuity test

| ID | Task | Status |
|---|---|---|
| P3-T300 | Forced runtime restart between segments 3 and 4 of a 9-segment render | ⊘ |
| P3-T301 | Frame-diff comparison vs non-restarted control (RMSE threshold) | ⊘ |
| P3-T302 | Document seed/latent continuity contract in README | ⊘ |

---

## P4 — rtx50-fp8 (Blackwell production)

| ID | Task | Status |
|---|---|---|
| P4-T400 | Blackwell FP8 path via cu128 | ⊘ |
| P4-T401 | Driver compat gate (Windows ≥ 580.88) | ⊘ |
| P4-T402 | Smoke test on RTX 50 16 GB | ⊘ |

---

## P5 — rtx50-nvfp4 (experimental opt-in)

| ID | Task | Status |
|---|---|---|
| P5-T500 | cu130 / cu129 wheel set; nightly fallback | ⊘ |
| P5-T501 | Opt-in flag in runtime selector | ⊘ |
| P5-T502 | "Experimental" UI badge | ⊘ |
| P5-T503 | Long-context NaN-burst regression test | ⊘ |

---

## P6 — Docs + release

| ID | Task | Status |
|---|---|---|
| P6-T600 | Update root `README.md` with LTX-2.3 mention | ⊘ |
| P6-T601 | Update `CLAUDE.md` `Recent Changes` line | ⊘ |
| P6-T602 | Release notes for the extension | ⊘ |
| P6-T603 | Final OpenAPI publish | ⊘ |
| P6-T604 | Backfill `specs/046-ltx23-video-generation/quickstart.md` install + first-render walkthrough | ⊘ |

---

## Out-of-scope (locked non-goals from spec.md)

- ComfyUI integration
- Native looping sampler
- Multi-GPU rendering
- Audio-video LTX features
- Remote/cloud runtime
- IC-LoRA / motion-track control
- User-editable workflow graph
