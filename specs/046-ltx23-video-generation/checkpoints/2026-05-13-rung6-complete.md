# Checkpoint 2026-05-13 — Spec 046 Rung 6 complete

**Branch**: `claude/unruffled-perlman-dd12e1` (pushed to `origin`)
**HEAD**: `92c1267` `feat(046): per-profile model install + RIFE interpolation skeleton — Rung 6`
**Worktree**: `D:\Workspace\repos\nexus-dnn\.claude\worktrees\unruffled-perlman-dd12e1`
**PR**: not yet opened — URL: https://github.com/ldilov/nexus-dnn/compare/main...claude/unruffled-perlman-dd12e1?expand=1
**Spec dir**: `specs/046-ltx23-video-generation/` (11 files)
**Extension dir**: `extensions/builtin/nexus-video-ltx23/` (62 source files: 13 Rust + 16 Python + 23 YAML + 4 TS/TSX + 2 SQL + 4 other)

## Commits since `main`

| # | SHA | Subject |
|---|---|---|
| 1 | `d009334` | feat(046): scaffold LTX-2.3 video generation extension + spec |
| 2 | `90978b6` | feat(046): make ltx23 extension runnable end-to-end with fake runtime |
| 3 | `60a9d9e` | feat(046): recipe UI bundle + storage/manifest fixes — Rung 2 (P1.5) |
| 4 | `89a9846` | feat(046): install pipeline runs end-to-end + UI dependency banner — Rung 3 |
| 5 | `9b904e1` | feat(046): real Python subprocess + lease + JSON-RPC notifications — Rung 4 |
| 6 | `0973a9d` | feat(046): real diffusers pipeline + per-profile model resolver — Rung 5 |
| 7 | `92c1267` | feat(046): per-profile model install + RIFE interpolation skeleton — Rung 6 |

## What works end-to-end *right now* on the fake profile

```bash
# 1. Run the host (port 3100 to avoid Windows zombie-socket on default 3000)
NEXUS_PORT=3100 cargo dev-tui
# OR direct: NEXUS_PORT=3100 ./target/debug/nexus-dnn.exe

# 2. Open the recipe UI in a browser
#    Direct URL fails (dots in layout id → SPA fallback returns 404);
#    navigate via the gallery: http://127.0.0.1:3100/extensions
#    then click "LTX 2.3 Video"

# 3. Recipe UI shows:
#    - DependencyBanner: shows "Runtime ready" (Python+ffmpeg+pkgs+validate all green)
#    - Form: prompt + duration + runtime selector (Auto/RTX 40 FP8/RTX 50 FP8/RTX 50 NVFP4) + quality preset + seed
#    - ProfileStatus: status of the selected profile
#    - ProfileInstallPanel: appears for non-auto profiles → "Weights not installed" + Download CTA
#    - Preview plan / Generate video buttons
#    - Right column: ResultPanel with segment timeline + final preview/download

# 4. Click "Generate video" with runtime=auto:
#    - POST /api/v1/extensions/nexus.video.ltx23/renders → 202 queued
#    - Rust runner acquires a Python subprocess lease (~120ms)
#    - JSON-RPC handshake → render.start → fake pipeline walks segments
#    - Per-segment ltx.video.segment.{started,completed,artifact.created,memory_stats}
#      notifications update DB rows in real time
#    - On ltx.video.done: copies <workdir>/final/final.mp4 →
#      <runs_dir>/<run_id>/final.mp4, releases lease, run flips to completed
#    - UI auto-polls /renders/{id} → final <video> mounts + Download button

# 5. Smoke verification (curl)
curl http://127.0.0.1:3100/api/v1/extensions/nexus.video.ltx23/health
curl http://127.0.0.1:3100/api/v1/extensions/nexus.video.ltx23/dependencies
curl http://127.0.0.1:3100/api/v1/extensions/nexus.video.ltx23/profiles/rtx40-fp8/install
```

## Validation gates (all green)

| Gate | Command | Status |
|---|---|---|
| Rust check | `cargo check -p nexus-video-ltx23-extension` | ✓ |
| Rust clippy | `cargo clippy -p nexus-video-ltx23-extension --all-targets -- -D warnings` (pedantic + nursery) | ✓ clean |
| Rust unit tests | `cargo test -p nexus-video-ltx23-extension --lib` | ✓ 16/16 |
| Python unit tests | `cd extensions/builtin/nexus-video-ltx23/worker && uv run python -m pytest tests/` | ✓ 25/25 |
| Boundary audit | `bash extensions/builtin/nexus-video-ltx23/scripts/audit-boundary.sh` | ✓ PASS |
| Frontend build | `cd extensions/builtin/nexus-video-ltx23/web && pnpm build` | ✓ 358 KB JS + 3.8 KB CSS |
| Host extension activation | log line `builtin extension activated extension_id=nexus.video.ltx23` | ✓ no validation_errors |
| Host install pipeline end-to-end | POST `/install` walks python → ffmpeg → pkgs → validate to all-satisfied | ✓ ~30s first time, ~2s subsequent |
| Fake-mode render end-to-end | POST `/renders` → completed, valid 20 KB MP4 | ✓ ~700ms warm |

## File-level inventory

### Spec dir (`specs/046-ltx23-video-generation/`)

```
spec.md            — feature spec + 13 acceptance criteria
plan.md            — implementation plan, P0-P6 phasing
data-model.md      — DB schema + RenderPlan + RenderRun
research.md        — multi-LLM synthesis from Discover phase
tasks.md           — phased task list
quickstart.md      — install + first-render walkthrough
followups.md       — deferred items
verification/
  README.md
  p0-t004.md         — HF repo verification (PASS; spec corrected)
  p0_diffusers_smoke.py  — runnable on real GPU (not yet run)
  p0_cold_spawn_bench.py — cold-spawn benchmark for D2 decision
checkpoints/
  2026-05-13-rung6-complete.md (THIS FILE)
```

### Extension dir (`extensions/builtin/nexus-video-ltx23/`)

```
manifest.yaml             — extension declaration; ui block declares custom_element
                            tag=ltx23-video-app, module=ltx23-video.js, entry=register;
                            storage namespace alias=nexus_video_ltx23 → effective_prefix
                            ext_nexus_video_ltx23_; dependencies graph:
                            python (runtime, python >=3.11<3.13) → pkgs (package_set, uv,
                            worker/pyproject.toml) → ffmpeg (system_binary, allow_system_path)
                            → validate (validation, worker_handshake, 120s).
                            No model_artifact step at the global level (per-profile install
                            handled separately).
README.md                 — quick-link bundle + status table

rust/                     — extension shim crate (nexus-video-ltx23-extension)
  Cargo.toml              — registered in workspace via Cargo.toml + nexus-core dep
  src/
    lib.rs                — module list + pub re-exports
    main.rs               — bin entrypoint (currently just logs version)
    errors.rs             — ExtensionError + ExtensionErrorCode (incl. NotFound, Storage)
    schemas.rs            — CreateRenderRequest, RenderPlan, RenderSegmentPlan,
                            QualityPreset, RuntimeProfilePreference, VramRisk,
                            InterpolationMethod, RenderMode, AdvancedSettings
    planning.rs           — ltx_frame_count (8n+1), segment_count, plan_render, segment_seed
                            (splitmix), align_to_32, quality_preset_dims/gpu_budget_mb,
                            estimate_vram_risk. 8 unit tests.
    runtime_selection.rs  — select_runtime (full GPU-fact-driven), resolve_runtime_id
                            (P1 shortcut auto→fake), available_profiles. 5 unit tests.
    migrations.rs         — Migration struct + MIGRATIONS const slice with include_str!
                            of 001_ltx_video_projects.sql + 002_ltx_video_runs_segments.sql
    storage.rs            — Repos struct over sqlx::SqlitePool; insert_run, get_run,
                            update_run_status, insert_segments, list_segments,
                            update_segment_status. RenderRunRow + RenderSegmentRow DTOs
                            with rfc3339 ↔ DateTime<Utc> serde.
    api.rs                — axum router with 11 routes:
                              GET  /health
                              GET  /runtime-profiles
                              POST /recipe/plan
                              POST /renders
                              GET  /renders/{run_id}
                              POST /renders/{run_id}/cancel
                              POST /renders/{run_id}/retry-segment
                              GET  /renders/{run_id}/segments
                              GET  /artifacts/{artifact_id}
                              POST /profiles/{profile_id}/install
                              GET  /profiles/{profile_id}/install
                            ApiError → HTTP status mapping (InvalidRequest → 400,
                            NotFound → 404, RuntimeUnavailable/DriverTooOld/etc → 503,
                            VramBudgetExceeded → 413, RenderCancelled → 409).
    lease.rs              — LtxLeaseFactory mirroring emotion-tts host_adapter. Walks
                            <extension_data_dir>/runtime/packages/.venv/{Scripts|bin}/python.
                            LaunchSpec sets NEXUS_VIDEO_LTX23_RUNTIME=<profile>,
                            NEXUS_HOST_DATA_DIR=<host_data_root>, PYTHONUNBUFFERED=1.
                            do_handshake with 60s budget.
    runner.rs             — Runner + RunnerConfig. spawn_render fires tokio task that
                            acquires lease, subscribes notifications, sends
                            ltx.video.render.start, loops on notifications updating DB,
                            on done copies <workdir>/final/final.mp4 →
                            <runs_dir>/<run_id>/final.mp4, releases lease. 600s timeout.
                            Tolerates broadcast::Lagged.
    profile_install.rs    — ProfileInstallService. start(profile) → acquires fake-mode
                            lease, sends ltx.video.install.start, polls for done|error
                            via notifications, releases. 60-minute timeout. status() is
                            pure filesystem stat on .nexus-install-complete sentinel.
    register.rs           — LtxRouterProvider impl. Applies migrations (gated by
                            ext_nexus_video_ltx23__schema_versions). Builds ApiState
                            with Repos + Runner + ProfileInstallService + runs_dir.
                            LtxProviderResources builder pattern: new() →
                            with_host_data_dir() + with_extension_dir().
  tests/                  — Boundary audit test + planner + runtime_selection tests
                            (16/16 pass).

backends/                 — Backend runtime descriptors. Discovered by host but
  rtx40-fp8/              not yet wired to install/lease (per-profile install lives in
    backend-runtime.yaml    profile_install.rs).
    versions.yaml
    models.yaml
  rtx50-fp8/
    backend-runtime.yaml
    versions.yaml
    models.yaml
  rtx50-nvfp4/
    backend-runtime.yaml
    versions.yaml
    models.yaml
  fake/
    backend-runtime.yaml
    versions.yaml
  _shared/               — Worker used to live here; moved to worker/ at root in Rung 3
                            (host RealWorkerHandshake hardcodes <extension_dir>/worker/
                            pyproject.toml convention).

worker/                  — Python worker (nexus-video-ltx23-worker)
  pyproject.toml         — base deps: pydantic, pyyaml, ffmpeg-python, pillow, numpy<3,
                            huggingface_hub. Optional extras:
                              [diffusers]: torch>=2.10, torchvision, torchaudio, diffusers,
                                transformers, accelerate, safetensors, huggingface_hub, einops
                              [interpolation]: rife-ncnn-vulkan-python (linux+win)
                              [test]: pytest, pytest-asyncio
                          requires-python = ">=3.11,<3.13".
  uv.lock                — 78 packages resolved; committed for reproducible installs.
  src/ltx_video_worker/
    __init__.py
    __main__.py          — entry: hijacks stdout to stderr (rogue-print guard);
                            constructs Worker; registers installer handlers always;
                            registers pipeline_fake OR pipeline_diffusers per
                            NEXUS_VIDEO_LTX23_RUNTIME env var.
    main.py              — Worker class: stdio NDJSON JSON-RPC event loop. Registers
                            intrinsic handshake + health + shutdown methods.
                            Windows-safe stdin pump via thread bridge (asyncio
                            connect_read_pipe is unreliable under WindowsProactor).
    rpc.py               — Methods (HEALTH, MODELS_LIST, PLAN_VALIDATE, RENDER_START,
                            RENDER_CANCEL), Notifications (PROGRESS, SEGMENT_STARTED,
                            SEGMENT_COMPLETED, ARTIFACT_CREATED, DONE, ERROR,
                            MEMORY_STATS), ErrorCodes (full taxonomy).
    telemetry.py         — WorkerLogger structured stderr.
    vram.py              — canonical drop sequence (gc×2 BEFORE empty_cache);
                            memory_stats() reads torch.cuda.memory_stats() →
                            allocated_mb/reserved_mb/frag_ratio/num_alloc_retries/
                            num_ooms/free_mb/rss_mb/generation_count. Falls back to
                            zeros when torch unavailable. _rss_mb walks resource ↘
                            psutil ↘ 0.
    pipeline_fake.py     — register_fake_handlers wires render_start that walks
                            segments, writes placeholder mp4/png per segment via
                            ffmpeg_io, emits full notification stream, stitches +
                            trims. ~200ms per segment by default
                            (NEXUS_VIDEO_LTX23_FAKE_DELAY_MS).
                            Supports cancellation + deterministic failure injection
                            (NEXUS_VIDEO_LTX23_FAKE_FAILURE_SEGMENT_INDEX).
    pipeline_diffusers.py — LTX-2.3 real pipeline. Lazy torch + diffusers imports.
                            _resolve_model_dir order: NEXUS_VIDEO_LTX23_MODEL_DIR ↘
                            <NEXUS_HOST_DATA_DIR>/models/Lightricks/LTX-2.3-<quant>/.
                            _ensure_pipeline_loaded: LTXImageToVideoPipeline.from_pretrained
                            (local_files_only=True, torch_dtype=bfloat16),
                            enable_model_cpu_offload, vae.enable_tiling.
                            _render_loop: per-segment generation with image-conditioning
                            on last frame; full notification stream matching fake;
                            OOM mapped to VRAM_BUDGET_EXCEEDED; AC13 cleanup before
                            done. RIFE 2x post-stitch via _try_interpolate_rife
                            (rife-ncnn fallback to ffmpeg minterpolate). SHIPPED-
                            UNVERIFIED — needs P0-T001 on real GPU.
    installer.py         — JSON-RPC handlers ltx.video.install.start / .status that
                            drive huggingface_hub.snapshot_download to
                            <host_data_dir>/models/Lightricks/LTX-2.3-<quant>/.
                            Writes .nexus-install-complete sentinel on success.
                            Emits ltx.video.install.{progress,done,error} notifications.
    ffmpeg_io.py         — stitch_segments, trim_to_duration, write_placeholder_mp4,
                            write_placeholder_png (ffmpeg-python wrappers).
    planning_validate.py — validate_plan(plan, profile) — checks 8n+1, divisible by 32,
                            external_segments only in v1.
  tests/                 — 25 tests / 5 files:
                            test_rpc_framing.py     (5)
                            test_planning_validate.py (4)
                            test_vram_drop_sequence.py (3)
                            test_fake_pipeline.py   (6)
                            test_diffusers_resolver.py (7)
                          All pass with `uv run python -m pytest tests/`.

recipes/
  image_to_long_video.yaml  — recipe with fields[] (prompt, negative, duration_seconds,
                              runtime_profile enum, quality_preset enum, seed).

workflows/
  long_video.yaml           — generic recipe-runner template. Not actively used in
                              the runner path today (Rust runner is direct).

operators/
  plan_long_video.yaml      — input request:object, output plan:object
  submit_render.yaml        — input plan:object, output run_id:string, status:string
  check_render_status.yaml  — input run_id:string, outputs status/final_artifact_id/
                              progress_percent

storage/
  migrations/
    001_ltx_video_projects.sql       — ext_nexus_video_ltx23__projects,
                                       ext_nexus_video_ltx23__style_profiles
                                       + ext_nexus_video_ltx23_idx_projects_created_at
    002_ltx_video_runs_segments.sql  — ext_nexus_video_ltx23__runs +
                                       ext_nexus_video_ltx23__segments +
                                       4 indexes (project_id, status × runs/segments)

openapi/
  extension.openapi.yaml   — 7 routes documented (no profile install routes yet).
                              Aggregated by host's api_doc_check.

scripts/
  audit-boundary.sh        — fails CI if any LTX literal leaks outside the extension
                              subtree. HOST_ALLOWED_FILES whitelists the
                              startup-wiring seam (Cargo.toml + app.rs).

ui/layouts/
  main.yaml                — layout id=ltx23-video.layout.main, root.type=ltx23-video-app
                              (mounted in the SPA at /extensions/<layoutId>).

web/                       — extension custom-element bundle (committed dist/)
  package.json             — @nexus/ltx23-video-web: react@19 + react-dom + swr +
                              @vanilla-extract/css + vite + plugin-react +
                              vanilla-extract/vite-plugin
  vite.config.ts           — library mode → dist/ltx23-video.js (358 KB)
  tsconfig.json
  pnpm-lock.yaml           — committed
  .gitignore               — node_modules + *.tsbuildinfo + *.js.map + *.css.map
  src/
    main.tsx               — registers Ltx23VideoAppElement custom-element class.
                              ensureStylesheet() injects <link> at import.meta.url
                              resolved to /api/v1/extensions/.../ui/ltx23-video.css.
                              `export function register()` is the entry the host
                              tag-loader calls.
    App.tsx                — root component. ~530 LOC.
                              <FormPanel/>: form + ProfileStatus + ProfileInstallPanel +
                                buttons + plan preview
                              <DependencyBanner/>: runtime install status + button
                              <ProfileInstallPanel/>: per-profile model weights state
                              <ResultPanel/>: status bar + segment timeline + final preview
                              <MediaArtifactPlayer/>-style inline <video> + Download
    api.ts                 — ltxApi (extension routes) + hostApi (dependencies) +
                              profileInstallApi (status, start). API_BASE =
                              /api/v1/extensions/nexus.video.ltx23.
    styles.css.ts          — vanilla-extract tokens. ~190 LOC.

contracts/                 — JSON Schema for runtime RPC. Not strictly enforced today.
```

### Host changes (the permitted startup-wiring seam — constitution Principle XIII)

```
Cargo.toml                  — workspace members += extensions/builtin/nexus-video-ltx23/rust

crates/nexus-core/
  Cargo.toml                — deps += nexus-video-ltx23-extension (path)
  src/app.rs                — providers vec appends
                              LtxRouterProvider with extension_dir + host_data_dir
                              wired from extension_registry.get_extension().

apps/web/src/components/media/
  media_artifact_player.tsx — generic audio+video player (host atom)
  media_artifact_player.css.ts
  media_artifact_player.test.tsx  — 9 vitest cases
  index.ts
```

NOTHING else in `crates/` or `apps/web/` touches LTX. Boundary audit
explicitly whitelists `crates/nexus-core/Cargo.toml` and
`crates/nexus-core/src/app.rs` as the wiring-seam files.

## Architecture (post-Rung-6)

```
┌──────────────────────────────────────────────────────────────────────┐
│ Browser SPA                                                          │
│  /extensions/<layoutId> → <ltx23-video-app> custom element           │
│  └─ React 19 root: FormPanel + ResultPanel                           │
└──────────────────────────────────────────────────────────────────────┘
              │ HTTP (fetch + SWR polling)
              ▼
┌──────────────────────────────────────────────────────────────────────┐
│ Host (axum) — nexus-core / nexus-api                                 │
│  GET  /api/v1/ui/layouts/<id>                — generic layout loader │
│  GET  /api/v1/extensions/<id>/dependencies   — install state         │
│  POST /api/v1/extensions/<id>/install        — global install        │
│  GET  /api/v1/extensions/<id>/ui/<path>      — bundle asset server   │
│                                                                      │
│  /api/v1/extensions/nexus.video.ltx23/{*rest}                        │
│      → dispatched into the extension's axum::Router via              │
│        ExtensionRouterProvider (the only permitted concrete-type     │
│        coupling in app.rs).                                          │
└──────────────────────────────────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────────────────────┐
│ Extension (Rust)                                                     │
│  api.rs       — 11 axum routes; uses ApiState{repos, runner,         │
│                  profile_install, runs_dir}                          │
│  runner.rs    — per-render: acquire lease → render.start →           │
│                  consume notifications → copy mp4 → release lease    │
│  profile_install.rs — per-profile model download via fake-mode lease │
│  storage.rs   — sqlx repos for ext_nexus_video_ltx23__runs/segments  │
│  lease.rs     — LtxLeaseFactory builds LaunchSpec, spawns StdioLease │
└──────────────────────────────────────────────────────────────────────┘
              │ stdio NDJSON JSON-RPC 2.0
              ▼
┌──────────────────────────────────────────────────────────────────────┐
│ Python worker (one subprocess per render OR per install)             │
│  __main__.py  → Worker(profile) + register_installer_handlers        │
│                + register_(fake|diffusers)_handlers per profile      │
│  pipeline_fake.py     — placeholder mp4/png via ffmpeg-python        │
│  pipeline_diffusers.py — LTX-2.3 LTXImageToVideoPipeline (real)      │
│  installer.py         — huggingface_hub.snapshot_download → dest     │
│  vram.py              — canonical drop sequence + memory_stats       │
└──────────────────────────────────────────────────────────────────────┘
```

## Live curl evidence (from Rung 6 smoke)

```
GET  /api/v1/health                          → 200
GET  /api/v1/extensions/nexus.video.ltx23/health
  → {"status":"ok","version":"0.1.0","extension_id":"nexus.video.ltx23"}

GET  /api/v1/extensions/nexus.video.ltx23/runtime-profiles
  → 4 profiles, fake installed=true/healthy=true, others not installed (P2)

POST /api/v1/extensions/nexus.video.ltx23/recipe/plan
     {"prompt":"...","duration_seconds":6,"runtime_profile":"auto"}
  → 200 RenderPlan{mode:"external_segments", segments:2, width:960,
      height:544, base_fps:24, output_fps:48, vram_risk:"safe", ...}

POST /api/v1/extensions/nexus.video.ltx23/renders
     same body
  → 202 {id:"01KRG…", status:"queued", segment_count:2, ...}

GET  /api/v1/extensions/nexus.video.ltx23/renders/01KRG…  (poll 700ms later)
  → 200 status=completed, progress=100%, completed_segments=2/2,
        final_artifact_id="ltx23-run-01KRG…-final",
        segments=[...two completed entries...]

GET  /api/v1/extensions/nexus.video.ltx23/artifacts/ltx23-run-01KRG…-final
  → 200 video/mp4, content-disposition inline,
        20741 bytes, file: "ISO Media, MP4 Base Media v1",
        ffprobe: codec=h264, 960×544, duration=6.000s

GET  /api/v1/extensions/nexus.video.ltx23/profiles/rtx40-fp8/install
  → 200 {"profile":"rtx40-fp8","installed":false,
         "repo":"Lightricks/LTX-2.3-fp8",
         "dest":"C:\\Users\\lazar\\.nexus\\models\\Lightricks\\LTX-2.3-fp8",
         "in_flight":false,"last_error":null}

POST /api/v1/extensions/nexus.video.ltx23/profiles/fake/install
  → 400 {"code":"InvalidRequest",
         "message":"invalid request: no installable model for profile 'fake' (fake profile has none)"}

GET  /api/v1/extensions/nexus.video.ltx23/dependencies
     (after first install run; ~30s the first time)
  → 200 all_satisfied=true
       python    → C:\Users\lazar\.nexus\extensions\nexus.video.ltx23\runtime\python  (python 3.11.13 cpu)
       ffmpeg    → c:\programdata\chocolatey\bin\ffmpeg.exe (system path)
       pkgs      → uv venv synced from worker/pyproject.toml
       validate  → previous handshake validated
       (marker: ~/.nexus/extensions/nexus.video.ltx23/.dep-installer/validation.ok)
```

## Repo-specific conventions to respect

1. **Host-extension boundary** (`.claude/rules/host-extension-boundary.md`, project-local).
   No LTX-specific code outside `extensions/builtin/nexus-video-ltx23/` except the
   permitted startup-wiring seam in `crates/nexus-core/{Cargo.toml,src/app.rs}`.
   Audit script `scripts/audit-boundary.sh` enforces this. ALWAYS run it after host changes.

2. **Spec number is 046** (not 045 — that's `b708ddb chore(045): cargo aliases for verbosity-aware
   TUI launchers` on main). Spec dir is `specs/046-ltx23-video-generation/`. `specs/` is
   gitignored so new files need `git add -f`.

3. **Operator yaml schema** (schemas/operator-definition.json):
   `operator: { id, version, display_name, description, category }` — NOTHING else
   (no extension_id, no invoke block).
   `inputs:` / `outputs:` are arrays of `{name, type, required?}` — NOT maps.

4. **Storage table prefix**: `ext_<alias>_*` where alias is from `manifest.storage.namespace.alias`.
   Indexes MUST be `ext_<alias>_idx_<name>` (NOT `idx_ext_<alias>_*`).
   For us alias = `nexus_video_ltx23`, prefix = `ext_nexus_video_ltx23_`, table names use `__` after
   the prefix (e.g. `ext_nexus_video_ltx23__runs`).

5. **Manifest schema** (schemas/extension-manifest.json):
   - `ui` block has `layouts`, `contributions`, `assets`, `custom_elements`. NO `workflows`, NO `openapi`.
   - `capabilities[]` must be values from the enum: filesystem.{read,write}, gpu.compute,
     network.{loopback,remote}, process.spawn, model.registry.read, workspace.{read,write},
     storage.schema_contribute, huggingface.{search,install}. NO `artifacts.*` (was an old assumption).

6. **Layout schema** (schemas/ui-layout.json): `root.type` enum doesn't list custom-element tags
   but the layout LOADER doesn't validate against the schema — it only reads `id` and `displayName`.
   So `root.type: ltx23-video-app` works in practice.

7. **Worker path convention**: host's `RealWorkerHandshake` hardcodes
   `<extension_dir>/worker/pyproject.toml`. Don't nest the worker dir.

8. **JSON-RPC handshake method**: host sends `handshake` (not `ltx.runtime.health`). Worker must
   register a `handshake` handler that returns `{protocol_version:"1.0", ...}`.

9. **Python 3.11.13** is what the host's embedded Python registry ships. pyproject must allow it
   (`requires-python = ">=3.11,<3.13"` — NOT `>=3.12`).

10. **uv lock** needs regenerating any time pyproject deps change. `cd worker && uv lock`.

11. **Frontend dist is committed** (emotion-tts precedent). Rebuild with `pnpm build` after src
    changes. `.gitignore` excludes node_modules + *.map.

12. **Port 3000 zombie sockets on Windows**: Use `NEXUS_PORT=3100` if default port is held by a
    crashed-but-not-released listener. `netstat -ano | grep :3000` shows the zombie PID; reboot
    or wait 2-4 min for kernel GC.

13. **No `--no-verify` on git** (block-no-verify hook). No force-push to main. Force-with-lease
    is OK on the feature branch.

14. **Tests location**: Rust tests in `crates/<crate>/src/foo.rs` `#[cfg(test)] mod tests`.
    Python tests in `worker/tests/test_*.py`, run with `uv run python -m pytest tests/`.

15. **Custom element bundle URL pattern**: `/api/v1/extensions/<ext_id>/ui/<relative-path>`
    served by host's `extension_ui::serve_extension_asset` from `<extension_dir>/<ui.assets.root>/`.

## What's NOT done

### Validation gaps (real hardware needed)
- **P0-T001**: never run. First real LTX-2.3 render attempt is still pending.
  Scripts exist at `specs/046-ltx23-video-generation/verification/p0_diffusers_smoke.py`
  + `p0_cold_spawn_bench.py`.
- **`pipeline_diffusers.py` against actual weights**: shipped-unverified. Module docstring
  says so. Code paths follow documented diffusers API as of 2026-05-13; could have drifted.
- **HF snapshot_download** end-to-end: plumbed, never exercised (would mean downloading
  ~20 GB of FP8 weights).
- **VRAM behaviour** under multi-segment real load (frag_ratio, num_alloc_retries readings)
  — only observable on real hardware.
- **RIFE rife-ncnn-vulkan-python branch**: currently falls through to ffmpeg minterpolate even
  when the wheel is installed. Wire the PIL-frame integration when frame-by-frame is wanted.

### Polish items deferred
- **diffusers extras install** (torch + diffusers + accelerate + …) is not part of any UI flow yet
  — currently `cd worker && uv sync --extra diffusers` manually. Could be grouped under
  "Install for real video generation" CTA next to "Download weights".
- **Idempotency-Key** on POST /renders (declared in openapi, not enforced).
- **Cancel + retry-segment** route handlers exist but aren't wired to the simulator's task
  cancellation (per-segment cancel just flips DB status; the running render task isn't aborted).
- **OpenAPI doesn't list profile install routes** yet (added in Rung 6).
- **Direct-URL load** `/extensions/ltx23-video.layout.main` fails (dots in path → SPA fallback
  treats as file request → 404). Navigation via gallery click works. Generic host bug.

### Out of scope for now
- ComfyUI runtime stack alternative (decided against in Define phase).
- Native looping sampler (v1 = external segments only).
- LTX 2.3 audio-track features.
- Multi-GPU / cloud-runtime execution.
- IC-LoRA / motion-track control.
- DAG view of the rendered workflow.
- Story-beats editor (advanced UI).

## What you can do next (in priority order)

A. **Run P0-T001** — first real-GPU test. On the RTX box:
   ```bash
   cd extensions/builtin/nexus-video-ltx23/worker
   uv sync --extra diffusers          # installs ~15 GB of torch + diffusers
   cd ../../../..
   NEXUS_PORT=3100 cargo dev-tui
   # In recipe UI:
   #   1. select runtime = rtx40-fp8 (or rtx50-fp8 on Blackwell)
   #   2. click "Download weights"  (20+ min, ~22 GB)
   #   3. once installed, click "Generate video"
   # Capture: torch.__version__, diffusers.__version__, peak_vram_mb, wall-clock,
   #          num_alloc_retries.
   ```

B. **Wire diffusers extras + weights into a single CTA**. Today user needs `uv sync --extra
   diffusers` manually OR the install endpoint should optionally do `uv sync --extra diffusers`
   before snapshot_download. Two host-side options:
   - Option 1: extend ProfileInstallService to also POST to the host's `/install` endpoint
     with a new `?profile=rtx40-fp8` query param (would require host-side schema work).
   - Option 2: add an extra step inside the Python installer.py that runs uv via subprocess
     in the worker's own venv before downloading. Self-contained.

C. **Finish RIFE frame loop** in `pipeline_diffusers.py::_try_interpolate_rife`. The current
   path imports the `rife_ncnn_vulkan_python` wheel successfully but falls through to ffmpeg
   minterpolate. Wire the actual PIL frame-by-frame interpolation.

D. **Cancel + retry-segment task abort**. Add `tokio_util::sync::CancellationToken` to the
   Runner's spawned task so POST /cancel + retry-segment actually stop the in-flight Python
   render (not just flip the DB row).

E. **OpenAPI parity**. Add `/profiles/{profile_id}/install` to
   `extensions/builtin/nexus-video-ltx23/openapi/extension.openapi.yaml`.

F. **Open the PR** at https://github.com/ldilov/nexus-dnn/compare/main...claude/unruffled-perlman-dd12e1?expand=1
   if you want to merge to main before the GPU validation completes (the SHIPPED-UNVERIFIED
   marker on pipeline_diffusers.py is honest about the state).

## Continuation prompt

A self-contained prompt for a fresh session is in `2026-05-13-resume-prompt.md` (sibling file
in this checkpoints dir).
