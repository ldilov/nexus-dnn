# Checkpoint 2026-05-13 — session close

**Branch**: `claude/unruffled-perlman-dd12e1` (pushed to origin)
**HEAD**: `9de8e28` `docs(046): close OpenAPI + quickstart + release-notes spec gaps`
**Worktree**: `D:\Workspace\repos\nexus-dnn\.claude\worktrees\unruffled-perlman-dd12e1`
**Other worktree**: this session ran from
`D:\Workspace\repos\nexus-dnn\.claude\worktrees\elegant-aryabhata-d201fa`
via absolute paths.
**PR URL when ready**: <https://github.com/ldilov/nexus-dnn/compare/main...claude/unruffled-perlman-dd12e1?expand=1>

## What this session shipped

20 commits ahead of `main`. Highest-impact landings, newest first:

| SHA | What | Why it matters |
|---|---|---|
| `9de8e28` | OpenAPI + Quickstart + Release notes | Spec docs P6-T602/T604 closed; OpenAPI parity with code |
| `aae4564` | Idempotency-Key + per-step heartbeats + real profile state | 3 functional spec gaps; +4 lib tests (34/34) |
| `a842595` | Multi-scene chains preserve character + art style | Three-anchor prompt model + `scenes[]` script + planner zip + 4 new tests |
| `6253638` | Image-conditioned pipeline + hyperparameter controls | `LTX2ImageToVideoPipeline` + `guidance_scale` + `num_inference_steps` |
| `643fac3` | Quant + selective-offload survey (research) | 4 dead ends documented; `dg845 BF16 + sequential_cpu_offload` stays canonical |
| `1fed6f4` | LTX-2.3 fits in 16 GB VRAM | One-line fix: `enable_sequential_cpu_offload()` → **4.69 GB peak** vs 37 GB spill |
| `5cbce86` | First real LTX-2.3 frames on RTX 5070 Ti | Validated end-to-end: 49 frames, prompt-matching, saved PNGs |
| `58b2fc6` | Extension-runtime requirements + NVFP4-on-Ada clarification | `docs/requirements.md` (uv mandatory, GPU matrix) |

## Validation gates

| Gate | Command | Status |
|---|---|---|
| Rust clippy | `cargo clippy -p nexus-video-ltx23-extension --all-targets -- -D warnings` (pedantic+nursery) | ✓ clean |
| Rust tests | `cargo test -p nexus-video-ltx23-extension --lib` | ✓ **34/34** |
| Python tests | `cd extensions/builtin/nexus-video-ltx23/worker && uv run python -m pytest tests/` | ✓ **31/31** |
| Boundary audit | `bash extensions/builtin/nexus-video-ltx23/scripts/audit-boundary.sh` | ✓ PASS |
| Frontend build | `cd extensions/builtin/nexus-video-ltx23/web && pnpm build` | ✓ 369.75 KB JS + 4.45 KB CSS |
| Standalone real-GPU render (commit `5cbce86`) | RTX 5070 Ti Blackwell sm_120 CUDA 12.8 | ✓ 49 frames, 4.69 GB peak |

## Acceptance criteria — all 13 from `spec.md`

| AC | Status |
|---|---|
| AC1 (test coverage) | ✓ 34 Rust + 31 Python |
| AC2 (UI states) | ✓ loading / empty / error / success render |
| AC3 (no secrets / safe inputs) | ✓ schema-validated |
| AC4 (build/lint/test pass) | ✓ all gates green |
| AC5 (OpenAPI v3 maintained) | ✓ fragment mirrors `api::http_routes()`, schemas mirror request DTOs |
| AC6 (no host coupling) | ✓ `audit-boundary.sh` PASS |
| AC7 (recipe UI complete) | ✓ all form fields including new character/style/scenes/advanced |
| AC8 (same paradigm) | ✓ custom-element bundle at `web/dist/ltx23-video.js` |
| AC9 (reusable components) | ✓ `MediaArtifactPlayer` accepts generic `ArtifactRef` |
| AC10 (few comments) | ✓ comments explain WHY not WHAT |
| AC11 (preview + download) | ✓ inline `<video>` + Download MP4 button |
| AC12 (16 GB VRAM) | ✓ **4.69 GB peak** measured on real Blackwell |
| AC13 (models cleared post-run) | ✓ canonical drop sequence in `vram.py` |

## Architecture as of this checkpoint

```
┌────────────────────────────────────────────────────────────────────────┐
│ Browser SPA — recipe form                                              │
│   prompt + character_prompt + style_prompt + scenes[] + seed +         │
│   duration + runtime_profile + quality_preset + advanced.{gs,steps}    │
│   ScenesEditor (collapsible) · AdvancedKnobs (collapsible)             │
└────────────────────────────────────────────────────────────────────────┘
              │ HTTP (Idempotency-Key supported)
              ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Host (axum) — /api/v1/extensions/nexus.video.ltx23/{*rest}             │
│   10 routes documented in openapi/extension.openapi.yaml               │
└────────────────────────────────────────────────────────────────────────┘
              │
              ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Extension (Rust)                                                       │
│   api.rs       — 10 routes + idempotency cache (1024-cap, 10 min TTL)  │
│   planning.rs  — scene-prompt zip + scene-seed override + splitmix     │
│   runner.rs    — per-render task with Notify-based cancel + step trace │
│   profile_install.rs — unified runtime install (uv sync + weights)     │
│   storage.rs   — sqlx repos for ext_nexus_video_ltx23__runs/segments   │
│   schemas.rs   — CreateRenderRequest, SceneSpec, AdvancedSettings, …   │
└────────────────────────────────────────────────────────────────────────┘
              │ stdio NDJSON JSON-RPC 2.0
              ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Python worker (one subprocess per render OR per install)               │
│   pipeline_diffusers.py:                                               │
│     - imports LTX2ImageToVideoPipeline (image-conditioned)             │
│     - enable_sequential_cpu_offload (4.69 GB peak on Blackwell 16 GB)  │
│     - _compose_prompt(character + action + style) per segment          │
│     - callback_on_step_end → ltx.video.segment.step heartbeats         │
│     - cond_image = previous segment's last frame (chain coherence)     │
│   installer.py: uv sync + snapshot_download (runtime venv targeted)    │
│   vram.py: canonical drop sequence + memory_stats notifications        │
└────────────────────────────────────────────────────────────────────────┘
              │
              ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Model on disk (~88 GB)                                                 │
│   C:\Users\lazar\.nexus\models\dg845\LTX-2.3-Distilled-Diffusers       │
│   (community diffusers-format port; transformer in BF16,               │
│    text_encoder is Gemma3, VAE/scheduler/tokenizer/audio_vae stack)    │
└────────────────────────────────────────────────────────────────────────┘
```

## Live evidence — what's been observed end-to-end

| Action | Observed result |
|---|---|
| `POST /renders` (fake profile) | 202 → status walks queued→rendering→completed → valid 20 KB MP4 in 700 ms warm |
| `POST /profiles/rtx50-fp8/install` | Phase progresses `starting → resolving_deps → downloading_weights → done`; uv subprocess output streams into `recent_progress`; 88.45 GB downloaded in 9 minutes |
| Standalone Python real render (commit `5cbce86`) | 49 frames generated on RTX 5070 Ti, peak 4.69 GB VRAM, frames match prompt visually (futuristic city at dusk) |
| Scene-chain standalone test (commit `6253638`) | Scene 1 + scene 2 conditioned on scene 1's last frame — visual seam coherent (same skyline composition + colour palette) |
| `POST /renders/{id}/cancel` | Worker exits at next segment boundary; DB flips to `cancelled` with partial progress preserved |
| Repeat POST with same `Idempotency-Key` | Returns cached `{run_id, runtime_profile, segment_count, created_at}` |

## What's NOT done — for the next session

### Known gaps remaining (Rung 7H+ — not blocking shipment)

1. **Host-driven multi-segment real render through to MP4 download** — the standalone path works; the host subprocess path runs but is genuinely slow (97-frame × 832×480 × 8 steps takes 30+ min per segment with sequential offload). Either reduce defaults or wait for quant-loader work below.

2. **Custom GGUF loader for diffusers** — the most popular quant format (`unsloth/LTX-2.3-GGUF` 309k DLs) is blocked by a diffusers 0.39.0.dev0 utf-8 sniff regression. Bypass via `gguf` python package + `state_dict=` override. Expected to land peak ~12 GB on the Q4_K_M variant.

3. **Custom ComfyUI key remap for `Lightricks/LTX-2.3-fp8`** — 50–100 lines mapping `model.diffusion_model.*` → diffusers naming. Unblocks the official Lightricks single-file repos.

4. **Retry-segment task abort** — `POST /renders/{run_id}/retry-segment` is DB-only flip. Worker needs an `ltx.video.segment.retry` RPC + Runner needs to route it.

5. **VRAM threshold supervisor** (P2-T206) — auto-restart on `num_alloc_retries` / `frag_ratio` thresholds reported by `runtime.memory_stats` notifications.

6. **RIFE 2× real wheel wiring** (P2-T201) — `_try_interpolate_rife` currently falls through to `ffmpeg minterpolate`. Wire the `rife-ncnn-vulkan-python` PIL frame-by-frame loop when the wheel is present.

7. **Frame-diff continuity test** (P3-T301) — RMSE between restarted vs non-restarted control across segment boundaries.

8. **Model Foundry decoupling** — user noted (2026-05-13 evening) that the extension shouldn't bake model installs long-term; consume the host's existing `model-store` / `host-models` surface instead. Kept current extension install for testing per user direction; the migration is its own rung.

9. **Spec doc updates from `tasks.md`** — P2/P3/P4/P5 task rows still show `⊘`. After P2-T200/201 close (above), the table should reflect ✅ across the board.

### Disk hygiene before next session

```
C:\Users\lazar\.nexus\models\
├── dg845\LTX-2.3-Distilled-Diffusers\         88.45 GB  ← production
├── Lightricks\LTX-2.3-fp8\                    55.90 GB  ← keep for ComfyUI key-remap rung
├── OzzyGT\LTX-2.3-Distilled-bnb-nf4\          28.84 GB  ← keep until bnb+accelerate seq-offload bug fixed
├── Abiray\LTX-2.3-22B-DISTILLED-1.1-GGUF\     16.54 GB  ← keep for custom GGUF loader rung
└── rockapaper\LTX-2.3-..._sdnq_r64_s16\       39.70 GB  ← DROP (SDNQ unsupported by diffusers)
```

Total: ~230 GB. Drop `rockapaper\...sdnq...\` to reclaim 40 GB; everything else has a plausible follow-up use.

## Repo-specific conventions to respect (still relevant)

These bit us repeatedly during Rungs 3–7 and will bite the next session:

1. **Host-extension boundary** (`.claude/rules/host-extension-boundary.md`) — `audit-boundary.sh` enforces. No LTX literals outside `extensions/builtin/nexus-video-ltx23/` except `crates/nexus-core/{Cargo.toml,src/app.rs}`.
2. **Spec number is 046** (not 045 — that's `b708ddb chore(045): cargo aliases…` on main). `specs/` is gitignored → `git add -f` for new files.
3. **Operator yaml schema is strict** — `operator: { id, version, display_name, description, category }` only. `inputs:` / `outputs:` are arrays, not maps.
4. **Storage table prefix**: `ext_<alias>__<table>` where alias is from `manifest.storage.namespace.alias`. Indexes: `ext_<alias>_idx_<name>`.
5. **Manifest schema**: `ui` block has `layouts/contributions/assets/custom_elements` (NO `workflows`, NO `openapi`). `capabilities[]` is enum-restricted (no `artifacts.*`).
6. **Worker path**: host hardcodes `<extension_dir>/worker/pyproject.toml` — don't nest.
7. **JSON-RPC handshake method**: `handshake` (not `ltx.runtime.health`).
8. **Python 3.11.13** is what the host's embedded Python ships. pyproject `requires-python = ">=3.11,<3.13"`.
9. **uv lock** after pyproject changes. Commit the lockfile.
10. **Frontend dist is committed** (emotion-tts precedent). Rebuild with `pnpm build`; `.gitignore` excludes `*.map`.
11. **Port 3000 zombie sockets on Windows** — use `NEXUS_PORT=3100` if default is held.
12. **No `--no-verify`** on git (block-no-verify hook). No force-push to main.
13. **`uv sync --extra <extra>`** with a missing other-extras config will REMOVE them (uv treats `--extra` as the complete extras set). Add `--extra test` alongside `--extra diffusers` in dev workflows.
14. **`enable_sequential_cpu_offload()` requires omitting `pipe.to(device)`** — calling .to() first defeats the offload. See `pipeline_diffusers.py::_ensure_pipeline_loaded` comment.
15. **diffusers pinned to git commit `adff1cae9f3d4f79dcff6a3ceb02e0a56982f88c`** (HEAD of main as of 2026-05-13) for LTX-2.3 9-channel support. Released 0.37.1 drops the schema.

## Sanity gate for the next session

```bash
cd D:/Workspace/repos/nexus-dnn/.claude/worktrees/unruffled-perlman-dd12e1
git log --oneline -1                                                # → 9de8e28
git status --short                                                  # apps/web/package-lock.json M (pre-existing)
cargo clippy -p nexus-video-ltx23-extension --all-targets -- -D warnings
cargo test -p nexus-video-ltx23-extension --lib                     # 34/34
bash extensions/builtin/nexus-video-ltx23/scripts/audit-boundary.sh # PASS
cd extensions/builtin/nexus-video-ltx23/worker && uv run python -m pytest tests/ -q  # 31/31
cd ../web && pnpm build                                             # 369.75 KB JS
cd ../../../..
```

If any of the above fails — STOP and read this checkpoint; something regressed.

## Reference

- Continuation prompt for the next session: sibling
  [`2026-05-13-resume-prompt-v2.md`](2026-05-13-resume-prompt-v2.md)
- Earlier checkpoints in this directory:
  - `2026-05-13-rung6-complete.md` — Rung 6 inventory + 14 conventions
  - `2026-05-13-rung7b-complete.md` — Unified install CTA
  - `2026-05-13-rung7d-complete.md` — Cancel actually cancels
  - `2026-05-13-resume-prompt.md` — Earlier resume (now superseded)
- Verification: [`verification/p0-t001-results.md`](../verification/p0-t001-results.md) — full real-GPU spike findings + dead-end paths
- Release notes: [`release-notes.md`](../release-notes.md) — feature-level summary
- Quickstart: [`quickstart.md`](../quickstart.md) — end-to-end walkthrough
