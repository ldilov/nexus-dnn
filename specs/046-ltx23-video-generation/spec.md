# Spec 046 — LTX-2.3 Video Generation Extension

**Status**: Draft (post-Define, post-debate-gate)
**Author**: /octo:embrace pipeline (Claude)
**Date**: 2026-05-13
**Branch**: claude/unruffled-perlman-dd12e1
**Scope**: Large feature. New builtin extension `nexus.video.ltx23` + isolated Python backend runtime (LTX-2.3 image-to-video) + recipe UI + 4 runtime profiles.

## User story

> As a user, I want to generate videos via LTX-2.3 (RTX 40 FP8 and RTX 50 Blackwell paths) so that I receive a downloadable MP4 from an input image, prompt, and target duration — fitting in 16 GB VRAM by default, with models cleared from VRAM after generation completes.

## Goals

1. Add `nexus.video.ltx23` builtin extension under `extensions/builtin/nexus-video-ltx23/`.
2. Add three real Python backend runtime profiles (rtx40-fp8, rtx50-fp8, rtx50-nvfp4 experimental) plus a `fake` profile for CI / frontend development.
3. Recipe UI: form fields → plan preview → submit → live progress timeline → MP4 preview + download.
4. Guarantee 16 GB VRAM cap on default presets via external-segments mode + tiled VAE + offload + explicit model eviction.
5. Guarantee VRAM is fully freed after every render run.
6. Honour the host ↔ extension boundary rule (.claude/rules/host-extension-boundary.md).
7. Reuse existing host machinery — runtime install/lease, model store, artifact store, OpenAPI aggregation, generic extension dispatcher, schema-contribute storage — **without adding LTX-specific code to the host**.
8. Add at most ONE generic reusable host component: `MediaArtifactPlayer` (video + audio).

## Non-goals (locked)

- ComfyUI integration. Defer to a future spec if ever needed.
- Native looping sampler. Defer to "Phase B continuity" follow-up.
- Multi-GPU rendering.
- LTX-2.3 audio-track generation features.
- Remote / cloud runtime execution.
- IC-LoRA / motion-track control.
- User-editable workflow graph (DAG view is read-only/export-only in v1).

## Acceptance criteria

From the original user request, restated as testable gates:

| # | Criterion | Test |
|---|---|---|
| AC1 | Tests cover success, validation failure, authorization failure, edge cases | Rust unit + Rust integration (fake runtime) + Python worker unit + Playwright E2E. ≥ 80% line coverage on extension code. |
| AC2 | UI handles loading, empty, error, and success states | Vitest + Playwright cover each. |
| AC3 | No secrets, no unsafe input handling, no broken authorization path | security-reviewer agent on PR. |
| AC4 | Build/lint/test pass | `cargo build --workspace && cargo clippy --workspace -- -D warnings && cargo test --workspace -p nexus-video-ltx23-worker` green. Frontend `pnpm tsc --noEmit && pnpm vitest run` green. |
| AC5 | OpenAPI v3 spec maintained | `cargo run --bin api_doc_check` exits 0 with the new extension fragment aggregated. |
| AC6 | Extension not referenced directly by host; API-only | `extensions/builtin/nexus-video-ltx23/scripts/audit-boundary.sh` exits 0; CI runs it. No `ltx23`, `nexus.video.ltx23`, `nexus-video-ltx23`, `ext_nexus_video_ltx23__`, `LTX-2.3`, `NVFP4`, `rtx50-nvfp4`, `rtx40-fp8` literals outside the extension subtree. |
| AC7 | Recipe UI contains all functionality | All form fields (prompt, image, duration, profile, preset, seed) render; plan preview shows mode/segments/duration/VRAM-risk; submit triggers render; progress timeline updates per segment; final artifact previews + downloads. |
| AC8 | Recipe UI same paradigm as other extensions | Custom-element bundle at `extensions/builtin/nexus-video-ltx23/web/dist/ltx23-video.js`; recipe YAML schema matches emotion-tts shape. |
| AC9 | New React components reusable | `MediaArtifactPlayer` accepts generic `ArtifactRef`; PR review verifies no LTX-specific props. |
| AC10 | Few comments | Code review per global rule. |
| AC11 | Preview + download | `<MediaArtifactPlayer artifactId={final} mime="video/mp4" downloadEnabled />` renders on completion. |
| AC12 | 16 GB VRAM | rtx40-fp8 + rtx50-fp8 default preset (960×544@24fps, 97 frames/segment) generates a 30s video on a 16 GB GPU without OOM. Smoke test on real hardware before merging P2. |
| AC13 | Models cleared after generation | Post-run nvidia-smi snapshot (integration test) shows runtime process VRAM ≤ baseline + 200 MB tolerance. |

## High-level architecture

```text
User
  └─> apps/web (host shell + generic extension renderer)
       └─> custom_element bundle (LTX recipe UI, extension-owned)
             └─> POST /api/v1/extensions/nexus.video.ltx23/renders
                  └─> generic host dispatcher routes to extension Rust worker
                       ├─> writes ext_nexus_video_ltx23__runs/segments via host storage
                       ├─> acquires backend-runtime lease via host runtime-manager
                       │     └─> spawns isolated Python worker (uv venv + diffusers)
                       │           └─> JSON-RPC over stdio: ltx.video.render.start
                       │           └─> per-segment events: progress + artifact.created
                       │           └─> canonical VRAM drop sequence between segments
                       │           └─> hard-restart on threshold breach
                       ├─> persists per-segment artifacts via host artifact store
                       └─> emits SSE progress to UI
```

The extension owns: planning math, recipe UI, runtime profile selection, render plan persistence, segment retry policy.

The host owns: extension lifecycle, generic dispatcher, runtime install/lease/health, model store, artifact store, schema-contribute storage, OpenAPI aggregation, event bus.

The Python runtime owns: diffusers LTX pipeline, VRAM management, FFmpeg invocation, RIFE interpolation, ComfyUI-free image-to-video implementation.

## Functional requirements (FR)

- **FR-001** Extension manifest declares storage (prefix `ext_nexus_video_ltx23__`), capabilities, dependencies graph, backend runtime requirements, recipe + workflow + operator files, openapi fragment, custom-element bundle.
- **FR-010** Storage carries 2 migrations: `001_ltx_video_projects.sql` (`projects`, `style_profiles`), `002_ltx_video_runs_segments.sql` (`runs`, `segments`).
- **FR-020** Recipe `image-to-long-video` exposes the field list in D8 (consensus).
- **FR-030** Plan endpoint computes `RenderPlan` (mode=external_segments, width/height divisible by 32, frame_count = 8n+1, deterministic segment seeds, 24fps gen → 48fps output, exact-duration final trim).
- **FR-040** Render endpoint persists run + segments, acquires runtime lease, dispatches `ltx.video.render.start` JSON-RPC, returns run_id + status.
- **FR-050** Worker forwards runtime progress/segment/artifact events to durable DB updates and SSE.
- **FR-060** Worker supports cancel (sets cancelling state, sends `ltx.video.render.cancel`, releases lease).
- **FR-070** Worker supports retry-segment (re-renders one segment with optional prompt override).
- **FR-080** Runtime selector chooses among rtx50-nvfp4 / rtx50-fp8 / rtx40-fp8 based on user preference + generic GPU facts; surfaces actionable error if no compatible runtime found.
- **FR-090** Runtime worker exposes `runtime.memory_stats` notification every segment; extension supervisor restarts runtime on threshold breach.
- **FR-100** Seed/latent continuity contract: segment seeds derived from base seed + index; image conditioning persisted to artifact store; runtime restart NEVER loses continuity (acceptance: forced-restart test passes).
- **FR-110** Final artifact registered as `video/mp4` with duration metadata; recipe UI renders `<MediaArtifactPlayer>` + download.
- **FR-120** Boundary audit script runs in CI; exits 0 = no LTX literals outside extension subtree.

## Non-functional requirements (NFR)

- **NFR-001** 16 GB VRAM hard cap on default presets (AC12).
- **NFR-002** Final stitched output for duration ≤ 60s renders within 20 minutes on RTX 40 16 GB (informational target, not gate).
- **NFR-003** Runtime process spawn + first model load < 60 s on warm cache.
- **NFR-004** SSE event latency from runtime → UI < 2 s typical.
- **NFR-005** Idempotency-Key header on POST /renders is respected for at least 5 minutes (host-provided).
- **NFR-006** Logs are structured JSON; prompts redactable in privacy mode (FR future).

## Phase-0 verification gate (BLOCKS P1 for real-runtime work)

**Must complete before any real-runtime task (P2+) starts:**

- P0-T001 diffusers LTX-2.3 image-to-video pipeline loads FP8 checkpoint + generates one 4s segment on a 16 GB GPU.
- P0-T002 If P0-T001 fails: Lightricks' native `LTX-Video/inference.py` does the same.
- P0-T003 Cold-spawn benchmark (Python start + torch import + LTX load + 1 segment + exit). If < 15% of duration=120s wall-clock, switch to process-per-segment (delete supervisor restart machinery).
- P0-T004 HuggingFace repos `Lightricks/LTX-2.3` + `Lightricks/LTX-2.3-nvfp4` exist with expected file paths.

Results recorded as pass/fail rows in `research.md` § Phase-0.

## Risks + mitigations

| Risk | Mitigation |
|---|---|
| diffusers LTX-2.3 support absent | P0-T001 verifies; P0-T002 fallback path. |
| NVFP4 NaN bursts on long context | rtx50-nvfp4 marked experimental opt-in; rtx50-fp8 is the production Blackwell default. |
| Driver R580 < 580.88 on Windows | Runtime validator parses nvidia-smi; one-click "Download R580 Studio Driver" link + "Switch to FP8" fallback. |
| Restart thresholds wrong | Threshold values configurable via runtime_settings; first-week telemetry drives F1 tuning. |
| Seed continuity broken across restart | Per-segment seed + last-frame artifact persisted before segment start; P3 forced-restart test gates merge. |
| MediaArtifactPlayer scope creep | Hard scope-box documented in D5 revised; new requirements ship as separate components. |
| 22B FP8 model download UX (~22 GB) | Host model store partial-download + resume already exists (emotion-tts pattern). |

## Open follow-ups (logged, not blocking)

- **F1** Tune restart thresholds from first-week telemetry.
- **F2** Native looping sampler (Phase B continuity spec).
- **F3** ComfyUI integration if user demand emerges.
- **F4** Audio-video LTX features.
- **F5** IC-LoRA / motion-track control.
- **F6** Multi-GPU / cloud-runtime execution.
