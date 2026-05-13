# Resume prompt — Spec 046 (LTX-2.3 video extension), Rung 7+

**Paste the section below into a fresh Claude Code session.** It's
self-contained — no need to attach the original requirements zip or
re-run any discovery work.

---

## Context (do not re-derive)

I'm continuing work on **spec 046 — LTX-2.3 video generation extension**
in the `nexus-dnn` Rust monorepo. The branch
`claude/unruffled-perlman-dd12e1` is pushed to `origin` at HEAD
`e6388d5` and represents the end of "Rung 7B" in a phased build-up:

- **Rung 1** ✅ `90978b6` — fake-mode end-to-end (in-Rust simulator)
- **Rung 2** ✅ `60a9d9e` — React 19 + vanilla-extract recipe UI bundle
- **Rung 3** ✅ `89a9846` — host dependency installer green for our manifest
- **Rung 4** ✅ `9b904e1` — real Python subprocess + StdioLease + JSON-RPC
- **Rung 5** ✅ `0973a9d` — `pipeline_diffusers.py` (real LTX-2.3, shipped-unverified)
- **Rung 6** ✅ `92c1267` — per-profile HF model install + RIFE skeleton
- **Rung 7B** ✅ `e6388d5` — unified runtime install CTA (uv sync chained with weights)
- **Rung 7E** ✅ `25246fe` — openapi fragment parity (10 routes + new schemas)
- **Rung 7D** ✅ `d901295` — cancel actually cancels (Notify-based registry)
- **Rung 7A** ⏳ spike on user's RTX 5070 Ti — 4 of 5 blockers fixed
  (`5d53ef8` CUDA wheels + runtime venv + LTX2 class; commit
  shipping the async render_start fix). 5th blocker fully diagnosed
  + recipe for Rung 7G written into
  `verification/p0-t001-results.md`. NOT yet rendered a real video.

The fake-profile path is fully exercised end-to-end (POST /renders →
Python subprocess → JSON-RPC notifications → real ffmpeg-encoded MP4 →
download). The real-profile path is code-complete but never validated
against actual LTX-2.3 weights (needs a 16 GB NVIDIA GPU + the P0-T001
spike).

**Detailed checkpoint with file inventory, architecture diagram, live
curl evidence, and repo-specific conventions**:
`specs/046-ltx23-video-generation/checkpoints/2026-05-13-rung6-complete.md`

**Rung 7B addendum** (uv-sync-chained-with-weights install button):
`specs/046-ltx23-video-generation/checkpoints/2026-05-13-rung7b-complete.md`

**Read that file first** before doing anything. It documents the 14
repo conventions that bit us during Rungs 3–6 and will bite again
(operator yaml schema is strict, storage prefix is alias-derived,
worker dir lives at extension root not nested, JSON-RPC method is
`handshake` not `ltx.runtime.health`, etc.).

## Where I am right now

- Worktree: `D:\Workspace\repos\nexus-dnn\.claude\worktrees\unruffled-perlman-dd12e1`
- Branch: `claude/unruffled-perlman-dd12e1` (pushed at `d901295`)
- All validation gates green: cargo clippy `-D warnings` (pedantic+nursery),
  26/26 Rust tests, 31/31 Python tests, boundary audit PASS, `pnpm build`
  green (360 KB JS + 4.5 KB CSS).
- "Install runtime & download weights" CTA is wired end-to-end (Rung 7B):
  live smoke confirmed uv subprocess streams real package lines into the
  `recent_progress` ring buffer.
- OpenAPI fragment matches `api::http_routes()` exactly (Rung 7E).
- Cancel propagates end-to-end (Rung 7D): live smoke confirmed
  `POST /renders/.../cancel` stops the Python worker mid-render and
  leaves the DB at `status=cancelled` with partial-segment progress
  preserved.
- PR not opened. URL when ready:
  `https://github.com/ldilov/nexus-dnn/compare/main...claude/unruffled-perlman-dd12e1?expand=1`

## Sanity-check the state before doing anything

```bash
cd D:/Workspace/repos/nexus-dnn/.claude/worktrees/unruffled-perlman-dd12e1
git log --oneline -1                                              # should show d901295
git status --short                                                # apps/web/package-lock.json may show as M (pre-existing)
cargo clippy -p nexus-video-ltx23-extension --all-targets -- -D warnings
cargo test -p nexus-video-ltx23-extension --lib                   # 26/26
bash extensions/builtin/nexus-video-ltx23/scripts/audit-boundary.sh
cd extensions/builtin/nexus-video-ltx23/worker && uv run python -m pytest tests/ -v   # 31/31
cd ../../../..
```

If any of those fail, STOP and read the checkpoint — something
regressed since 2026-05-13.

For a live smoke test (verify nothing rotted):

```bash
powershell -NoProfile -Command "Get-Process nexus-dnn -ErrorAction SilentlyContinue | Stop-Process -Force"
sleep 1
cargo build -p nexus-core --bin nexus-dnn
NEXUS_PORT=3100 ./target/debug/nexus-dnn.exe > /tmp/ltx_host.log 2>&1 &
for i in 1 2 3 4 5 6 7 8 9 10; do
  curl -sf -o /dev/null --max-time 1 http://127.0.0.1:3100/api/v1/health 2>/dev/null && { echo "ready in ${i}s"; break; }
  sleep 1
done
grep "extension activated extension_id=nexus.video.ltx23" /tmp/ltx_host.log

# Fake render end-to-end:
RUN=$(curl -s -X POST http://127.0.0.1:3100/api/v1/extensions/nexus.video.ltx23/renders \
  -H "Content-Type: application/json" \
  -d '{"prompt":"sanity check","duration_seconds":4}')
ID=$(echo "$RUN" | python -c "import json,sys; print(json.load(sys.stdin)['id'])")
sleep 3
curl -s "http://127.0.0.1:3100/api/v1/extensions/nexus.video.ltx23/renders/$ID" | python -m json.tool | grep -E "status|progress|final_artifact"
# Expect: status=completed, progress=100%, final_artifact_id=ltx23-run-<id>-final

powershell -NoProfile -Command "Get-Process nexus-dnn -ErrorAction SilentlyContinue | Stop-Process -Force"
```

## What I want to do next

Pick **ONE** rung from below. Use semi-autonomous mode (proceed unless
ambiguity would cause rework). Commit + push when each rung's quality
gates are green. After each commit, append a brief checkpoint to
`specs/046-ltx23-video-generation/checkpoints/` and update this resume
prompt's "where I am" section.

### Rung 7G (formerly 7A continuation) — Switch to community-port diffusers repo + real render

**Read first**: `specs/046-ltx23-video-generation/verification/p0-t001-results.md`

What's done (Rung 7A spike, this branch):
- CUDA torch wheels resolve via `pytorch-cu128` index (commit `5d53ef8`).
- uv sync targets the host's runtime venv via `UV_PROJECT_ENVIRONMENT`
  (commit `5d53ef8`).
- `LTX2ImageToVideoPipeline` (LTX 2.x) replaces `LTXImageToVideoPipeline`
  (LTX v1) in `_ensure_pipeline_loaded` (commit `5d53ef8`).
- `render_start` returns immediately; pipeline load + render happen in
  `_load_then_render` (commit included in the diagnosis push).
- 56 GB downloaded for `Lightricks/LTX-2.3-fp8` (transformer-only single
  files — `model_index.json` missing, can't load standalone).
- 99.6 GB downloaded for `Lightricks/LTX-2` components — **wrong
  architecture** (9 conditioning channels in LTX-2.3 vs 6 in LTX-2,
  mismatch across all 48 transformer blocks). DELETE THIS BEFORE
  STARTING 7G:
  ```bash
  rm -rf C:/Users/lazar/.nexus/models/Lightricks/LTX-2
  ```

What to do in Rung 7G:
1. Edit `installer.py::PROFILE_REPO` so `rtx40-fp8` / `rtx50-fp8` map
   to `dg845/LTX-2.3-Distilled-Diffusers` (the community port — 88 GB,
   full diffusers-format with the right transformer config). Optionally
   keep `Lightricks/LTX-2.3-fp8` as a fallback override repo for the
   FP8 quantization variant once upstream diffusers supports it.
2. Update `pipeline_diffusers.py::_ensure_pipeline_loaded` to use the
   straightforward `LTX2ImageToVideoPipeline.from_pretrained(model_dir,
   torch_dtype=torch.bfloat16, local_files_only=True)`. Remove the
   transformer-override scaffolding (we tried it; doesn't work for
   LTX-2.3 with `Lightricks/LTX-2` config — see results doc).
3. Trigger the unified install via `POST
   /api/v1/extensions/nexus.video.ltx23/profiles/rtx50-fp8/install`
   (Rung 7B flow). Wait ~10–30 min for 88 GB.
4. Submit a 4-second draft render at `runtime_profile=rtx50-fp8`.
5. Capture in `verification/p0-t001-results.md`:
   - first-load time (`from_pretrained` wall-clock)
   - per-segment wall-clock
   - peak `torch.cuda.max_memory_allocated()`
   - `num_alloc_retries` (from `vram.memory_stats`)
   - downloaded MP4 plays + has correct frame count

If the BF16 88 GB pipeline OOMs on 16 GB VRAM even with
`enable_model_cpu_offload + vae.enable_tiling`, the next iteration is
to add `pipe.enable_sequential_cpu_offload()` (slower but tighter
per-component swapping) OR pursue an FP8 quant path via diffusers
0.38+ once it ships proper LTX-2.3 config support.

Deliverable: a `final.mp4` artifact + filled-in P0-T001 telemetry
table. Branch should then be PR-ready (Rung 7F).

Goal: get the first real LTX-2.3 render to complete on the user's RTX
hardware. This requires the user — not Claude — to be at a machine
with a 16 GB NVIDIA GPU. If Claude is being run on the same machine
with GPU access, drive this directly. Otherwise generate a step-by-step
runbook the user can execute and report telemetry from.

Steps:
1. `cd extensions/builtin/nexus-video-ltx23/worker && uv sync --extra diffusers`
2. Start the host, navigate to the LTX recipe in the SPA.
3. Select profile = `rtx40-fp8` (Ada/Ampere) OR `rtx50-fp8` (Blackwell).
4. Click "Download weights" → wait ~20 GB / 5–30 min.
5. After install completes, click "Generate video" with a short prompt
   and duration=4s.
6. Capture: torch version, diffusers version, peak VRAM, wall-clock per
   segment, `num_alloc_retries`, any errors.
7. If `LTXImageToVideoPipeline.from_pretrained` fails, diagnose:
   - Was the class renamed in the diffusers version installed?
   - Are the safetensors files at the expected paths in the snapshot?
   - Is `local_files_only=True` blocking a missing tokenizer?
8. Once one render completes, update `specs/046-ltx23-video-generation/
   verification/p0-t001-results.md` with the captured telemetry.

Deliverable: green E2E real-render OR a precise diagnosis of why
`pipeline_diffusers.py` doesn't match the actually-installed diffusers
API, with a fix.

### Rung 7B — ✅ DONE (commit `e6388d5`)

Delivered the unified "Install runtime & download weights" CTA. New
`ltx.video.runtime.install` JSON-RPC chains `uv sync --extra diffusers`
with the existing weight snapshot_download. UI surfaces a phase label
and a collapsible `<details>` block with the last 200 uv output lines
(ring buffer, 1024-char per-line cap). Live smoke confirmed real uv
stdout reaches the DTO. See
`specs/046-ltx23-video-generation/checkpoints/2026-05-13-rung7b-complete.md`
for the full breakdown.

### Rung 7C — Wire `rife_ncnn_vulkan_python` frame-by-frame loop

Goal: replace the ffmpeg-minterpolate fallback with real RIFE 2× when
the wheel is installed. Today
`pipeline_diffusers._try_interpolate_rife` imports the wheel
successfully but falls through to ffmpeg.

Approach:
1. In `pipeline_diffusers.py`, write a new helper
   `_interpolate_via_rife_ncnn(src: Path, dst: Path, base_fps: int,
   target_fps: int) -> bool`:
   - Read all frames from `src` via ffmpeg → PIL.
   - Initialize `RifeNCNNVulkan(gpuid=0)`.
   - For each frame pair `(f_n, f_n+1)`: call `rife.process(f_n, f_n+1)`
     to get the interpolated middle frame `f_{n+0.5}`. Write
     `[f_n, f_{n+0.5}]` to the output stream.
   - After the last input frame, write `f_last`.
   - Encode all output frames via ffmpeg → `dst` at `target_fps`.
2. `_try_interpolate_rife` calls this on success; falls back to
   ffmpeg minterpolate on ImportError or RIFE init failure.
3. Add a fake test that doesn't need the wheel — mock
   `rife_ncnn_vulkan_python.RifeNCNNVulkan`.

Deliverable: `_try_interpolate_rife` actually uses RIFE when present;
output_fps = 2× base_fps videos have smooth motion (vs minterpolate's
slightly muddy interpolation).

### Rung 7D — ✅ DONE (commit `d901295`)

`POST /renders/{id}/cancel` now propagates end-to-end via an
`Arc<Mutex<HashMap<String, Arc<Notify>>>>` registry on the `Runner`,
a 3-way `select!` in `run_via_lease` (notification stream + cancel
notify + 15s grace deadline), and `Runner::cancel(run_id)` returning
`Signalled` / `NotInFlight`. Live smoke confirmed: 4-segment fake
render, cancel after segment 1 completes, DB flips to `cancelled` at
25 % with the partial work preserved. Caught + fixed a status-clobber
bug in `spawn_render`'s outer error handler in the same commit.

`retry-segment` is still a DB-only flip — Python worker doesn't expose
a retry RPC and the two redesign options (full restart vs. new RPC)
are still open. Leaving deferred until there's a real product use case.

Full details: `checkpoints/2026-05-13-rung7d-complete.md`.

### Rung 7E — ✅ DONE (commit `25246fe`)

The extension's openapi fragment now mirrors `api::http_routes()` exactly:
10 paths documented, plus new `Ltx23SegmentSummary` /
`Ltx23ProfileInstallStatus` schemas, the reusable `ProfileId` parameter,
and an extended `Ltx23RenderRun` matching the live `RenderStateResponse`.
Boundary audit clean; `cargo run -p nexus-api --bin api-doc-check`
baseline (22 missing extension routes in host doc) is unchanged — extensions
own their own fragments per the host-extension boundary rule.

### Rung 7F — Open the PR

If the user wants to ship to main before any further work, just open
the PR. Title:
`feat(046): LTX-2.3 video generation extension (Rungs 1–6)`
Body should summarize the 7 commits + link to the checkpoint doc +
flag pipeline_diffusers as SHIPPED-UNVERIFIED.

## Discipline reminders

1. **Use the Skill tool** before any creative work — the `using-superpowers`
   skill is the system contract.
2. **Don't re-run `/octo:embrace`** — the Discover/Define/Develop/Deliver
   work is already done and recorded at
   `~/.claude-octopus/results/{probe-synthesis,grasp-consensus,delivery}-20260513-*.md`.
3. **Spec is 046, not 045**. `b708ddb` on main reserved 045 for the
   verbosity-launchers feature.
4. **Boundary audit must stay PASS**. Run after every host-side change.
   Whitelist `crates/nexus-core/{Cargo.toml,src/app.rs}` is the only
   permitted seam.
5. **Don't introduce a global `models` step in the manifest**. Model
   installs are per-profile via `ProfileInstallService`.
6. **Frontend dist/ is committed** (emotion-tts precedent). `pnpm build`
   after every src change; `*.map` excluded via web/.gitignore.
7. **uv lock** the worker pyproject any time deps change:
   `cd worker && uv lock`. Commit the lockfile.
8. **No `--no-verify`** on git; **no force-push to main**. Force-with-lease
   on the feature branch is OK.
9. **Port 3000** may be a Windows zombie; use `NEXUS_PORT=3100` to sidestep.
10. **Constitution Principle XIII** (Host ↔ Extension Boundary, NON-NEGOTIABLE)
    + project rule at `.claude/rules/host-extension-boundary.md` — extensions
    own everything LTX-specific.

## My pick of next rung

[user fills this in when they paste this prompt — typically "do A" or "do B"]
