# Spec 046 — Implementation Plan

**Companion**: [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [tasks.md](tasks.md)

## Stack decisions

### Runtime stack — diffusers (primary)

- Python 3.12, managed by `uv` inside the runtime install root.
- `torch 2.10.x` (CUDA family per profile), `diffusers` (latest stable), `transformers`, `accelerate`, `safetensors`, `huggingface_hub`, `ffmpeg-python`, `pillow`, `numpy`, `pyloudnorm` (unused — drop).
- RIFE interpolation: `practical-rife` pip package (or `vsrife` if Practical-RIFE pip install is unstable). Confirmed pip-installable, no ComfyUI dependency.
- NO ComfyUI, NO ComfyUI-LTXVideo, NO ComfyUI-VideoHelperSuite custom-node clones in v1.

If P0-T001 fails: swap diffusers for Lightricks' native `LTX-Video/inference.py` (vendored under `extensions/builtin/nexus-video-ltx23/backends/_vendor/ltx-video/`). Same JSON-RPC contract preserved.

### Runtime stack — fake profile (CI)

- Pure Python, no torch, no GPU. Emits deterministic progress events + writes tiny placeholder MP4 (1s black frame via ffmpeg-python). Supports cancel.

### Host crates touched

Per boundary rule, **NO new host crates**. The extension consumes:
- `crates/nexus-extension-deps` step handlers (already supports runtime/package_set/system_binary/model_artifact/validation).
- `crates/nexus-backend-runtimes::family_python` (already used by emotion-tts/indextts).
- `crates/nexus-api::extension_router::dispatcher` (already routes `/api/v1/extensions/{ext_id}/*`).
- `crates/nexus-extension::storage` (schema-contribute, already supports `prefix_mode: host_derived`).
- `crates/nexus-events` (SSE event bus, already in use by spec 044).
- `crates/nexus-artifact` (artifact store).
- `crates/nexus-protocol::stdio` (JSON-RPC NDJSON framer).
- `crates/nexus-api::handlers::api_doc_check` (OpenAPI aggregation).

### Host frontend touched

- **NEW**: `apps/web/src/components/media/MediaArtifactPlayer.tsx` (+ `.css.ts`) — ONE generic reusable component.
- **NEW** (test): `apps/web/src/components/media/MediaArtifactPlayer.test.tsx`.
- **NO** other host frontend changes. All LTX UI lives in the custom-element bundle.

### Extension directory layout

```
extensions/builtin/nexus-video-ltx23/
  manifest.yaml
  README.md
  rust/
    Cargo.toml
    src/
      main.rs                    # binary entrypoint (stdio JSON-RPC loop to host)
      lib.rs                     # mod tree
      api.rs                     # extension HTTP routes (mounted by host)
      planning.rs                # RenderPlan computation
      runtime_selection.rs       # profile auto-select from GPU facts
      storage.rs                 # CRUD for ext_nexus_video_ltx23__* tables
      events.rs                  # runtime event forwarder (idempotent)
      errors.rs                  # error code taxonomy
      schemas.rs                 # request/response DTOs
      supervisor.rs              # warm-runtime restart policy (or removed post-P0-T003)
      privacy.rs                 # prompt redaction (FR future)
    tests/
      planner_tests.rs
      runtime_selection_tests.rs
      events_idempotency_tests.rs
      boundary_audit_tests.rs    # asserts no LTX literals leaked
  backends/
    rtx40-fp8/
      backend-runtime.yaml
      versions.yaml
    rtx50-fp8/
      backend-runtime.yaml
      versions.yaml
    rtx50-nvfp4/
      backend-runtime.yaml
      versions.yaml
    fake/
      backend-runtime.yaml
      versions.yaml
    _shared/
      worker/
        pyproject.toml
        uv.lock                  # generated post-P1
        src/
          ltx_video_worker/
            __init__.py
            __main__.py          # entrypoint; stdout-swap trick from emotion-tts
            main.py              # JSON-RPC event loop
            rpc.py               # method registry, error codes, framing
            vram.py              # canonical drop sequence + memory_stats
            pipeline_diffusers.py # primary pipeline (P2)
            pipeline_native.py   # fallback Lightricks inference (post-P0-T002)
            pipeline_fake.py     # fake runtime (P1)
            ffmpeg_io.py         # video encode/stitch/trim
            interpolation.py     # RIFE wrapper (P2)
            planning_validate.py # ltx.video.plan.validate handler
            telemetry.py
        tests/
          test_rpc_framing.py
          test_vram_drop_sequence.py
          test_fake_pipeline.py
          test_planning_validate.py
  recipes/
    image-to-long-video.yaml
  workflows/
    long-video.yaml
  operators/
    plan-long-video.yaml
    submit-render.yaml
    check-render-status.yaml
  ui/
    layouts/
      main.yaml                  # default layout pointing at custom_element
    open_recipe.yaml             # registers Quick Action in extension gallery
  web/
    package.json
    tsconfig.json
    vite.config.ts
    src/
      index.tsx                  # custom_element register
      LtxRecipeApp.tsx           # root recipe app
      components/
        RenderForm.tsx
        PlanPreview.tsx
        SegmentTimeline.tsx
        SegmentCard.tsx
        FinalArtifactPanel.tsx
      hooks/
        useRender.ts
        useSseProgress.ts
      styles/
        tokens.css.ts            # extension-local tokens (Spectral Graphite imports allowed)
    dist/                         # built bundle (committed per emotion-tts precedent)
  storage/
    migrations/
      001_ltx_video_projects.sql
      002_ltx_video_runs_segments.sql
  openapi/
    extension.openapi.yaml
  scripts/
    audit-boundary.sh
    install-validate.py          # backend runtime validator (per profile)
  contracts/
    runtime-rpc.json              # JSON-RPC schema (ltx.video.* methods)
    render-plan.schema.json
    render-request.schema.json
```

## Implementation phasing (P0-P6)

P0, P1 in this session. P2+ in follow-up sessions.

### P0 — Phase-0 verification (BLOCKING for real runtime work)

- P0-T001 → P0-T004 per spec.md. Results in research.md Phase-0 table.

P0 does NOT block P1 scaffolding (fake runtime path is GPU-free).

### P1 — Vertical slice (THIS SESSION)

1. Create extension directory + manifest + storage migrations + recipe + workflow + operators + openapi fragment + backend-runtime descriptors + audit-boundary.sh + README.
2. Rust worker skeleton: Cargo.toml, lib.rs module tree, api.rs route handlers (stubbed), planning.rs (full impl — pure logic), storage.rs (CRUD), errors.rs.
3. Python worker skeleton: pyproject.toml, main.py + rpc.py (full JSON-RPC framing), pipeline_fake.py (fake render emits placeholder MP4 + progress events), vram.py (no-op for fake).
4. Frontend: custom-element bundle scaffolding (vite + react), recipe form rendering, plan preview, segment timeline placeholders.
5. Host: MediaArtifactPlayer component (video + audio) + tests.
6. Boundary audit passes; api_doc_check passes; cargo build + clippy + tests green.

### P2 — rtx40-fp8 real runtime

- Implement pipeline_diffusers.py (or pipeline_native.py per P0 outcome).
- Implement supervisor.rs restart-on-threshold (OR remove if P0-T003 mandates process-per-segment).
- Installer playbook + validator script.
- Driver/GPU detection + risk estimator.
- Smoke test on RTX 40 16 GB.

### P3 — Seed/latent continuity test

- Forced mid-run restart test. Frame-diff against non-restarted control.

### P4 — rtx50-fp8 (Blackwell production)

- Same diffusers pipeline; cu128 wheels.

### P5 — rtx50-nvfp4 (experimental opt-in)

- cu130 wheel set; opt-in flag in runtime selector.

### P6 — Docs + release notes + OpenAPI publish

- README.md update; release notes; OpenAPI fragment finalised; quickstart.md walkthrough.

## VRAM safety details (D2)

**Canonical drop sequence (between segments AND on run completion):**

```python
def evict_model(state):
    if hasattr(state, "pipe") and state.pipe is not None:
        state.pipe.to("cpu")
        del state.pipe.transformer
        del state.pipe.vae
        del state.pipe.text_encoder
        del state.pipe
        state.pipe = None

    torch._dynamo.reset()

    import gc
    gc.collect()
    gc.collect()

    import torch
    torch.cuda.synchronize()
    torch.cuda.empty_cache()
    torch.cuda.ipc_collect()
    torch.cuda.reset_peak_memory_stats()
```

**Memory_stats RPC notification** (emitted by runtime after each segment):

```json
{
  "jsonrpc":"2.0","method":"runtime.memory_stats","params":{
    "run_id":"...","segment_index":3,
    "allocated_mb":11420,"reserved_mb":12880,
    "frag_ratio":0.113,"num_alloc_retries":0,"num_ooms":0,
    "peak_mb_this_segment":13900,"free_mb":2104,
    "rss_mb":13560,"generation_count":4
  }
}
```

**Supervisor restart triggers** (Rust extension worker watches):

| Trigger | Condition | Action |
|---|---|---|
| Generation count | ≥ runtime_settings.restart_after_segments (default 6) | Soft restart at next segment boundary |
| Allocator retries | num_alloc_retries > 0 | Restart immediately |
| Fragmentation | frag_ratio > 0.30 AND reserved_mb > 12000 | Restart at next boundary |
| Free VRAM | free_mb < 2500 post-cleanup | Restart at next boundary |
| RSS growth | rss_mb growth > 500 MB / segment | Restart at next boundary |
| OOM | runtime emits `ltx.video.error{code:vram_budget_exceeded}` | Restart + retry segment OR fail with safe-preset suggestion |
| Run completed | Always | Restart (AC13 guarantee) |

**If P0-T003 mandates process-per-segment**: replace supervisor + memory_stats with simple `Command::spawn` + wait per segment. JSON-RPC contract unchanged from supervisor's perspective.

## Frontend interaction model

```text
Form submit → POST /api/v1/extensions/nexus.video.ltx23/recipe/plan
  └─ display PlanPreview banner (mode + segments + duration + VRAM-risk)

User confirms → POST /api/v1/extensions/nexus.video.ltx23/renders
  └─ open SSE stream GET /api/v1/extensions/nexus.video.ltx23/events?run_id=...
  └─ render SegmentTimeline reactively

On ltx.video.done event:
  └─ fetch final artifact metadata
  └─ render FinalArtifactPanel with <MediaArtifactPlayer artifactId={final} mime="video/mp4" downloadEnabled posterArtifactId={...} />
```

## OpenAPI aggregation

Extension fragment at `extensions/builtin/nexus-video-ltx23/openapi/extension.openapi.yaml` (template provided in spec zip — adapted). Host's `api_doc_check` discovers it via the standard `extensions/builtin/*/openapi/` glob. No host changes.

## Test strategy summary

| Layer | Framework | Coverage focus |
|---|---|---|
| Rust unit | `cargo test -p nexus-video-ltx23-worker` | planning math, runtime selection, error mapping, event idempotency |
| Rust integration | same | fake runtime end-to-end, storage round-trips, supervisor restart policy |
| Python unit | `pytest` inside worker dir | RPC framing, fake pipeline, VRAM drop sequence (mocked torch) |
| Frontend vitest | `pnpm vitest run` | form validation, plan preview, segment timeline reducers, MediaArtifactPlayer states |
| Frontend Playwright | `pnpm test:e2e` | full recipe flow against fake runtime |
| Boundary | `audit-boundary.sh` (CI) | no LTX literals outside extension |
| OpenAPI | `cargo run --bin api_doc_check` | aggregated docs include new extension routes |

Coverage gate: 80% line coverage on extension code per global rule.

## Security review focus

- No HF token leakage from logs.
- Runtime workdir isolation enforced by host lease (existing).
- Input image / artifact_id validation: extension verifies host artifact ownership before passing to runtime.
- Prompt redaction in privacy mode (FR future, scaffolded in privacy.rs).
- No process spawning by extension Rust code — all spawns go through host runtime-manager.

## Constitution alignment

- **Principle I (curated dependencies)**: new pip deps are mainstream (diffusers, transformers, accelerate, practical-rife, ffmpeg-python, soundfile). Each justified in plan.md.
- **Principle V (extendability)**: extension lives entirely under `extensions/builtin/`. Host changes: ONE generic reusable component + zero new crates.
- **Principle VII (separation)**: extension never reaches into host source tree; host never imports extension types.
- **Principle X (boundary audit)**: audit-boundary.sh enforced in CI.
