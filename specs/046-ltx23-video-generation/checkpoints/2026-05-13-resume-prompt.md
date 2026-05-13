# Resume prompt — Spec 046 (LTX-2.3 video extension), Rung 7+

**Paste the section below into a fresh Claude Code session.** It's
self-contained — no need to attach the original requirements zip or
re-run any discovery work.

---

## Context (do not re-derive)

I'm continuing work on **spec 046 — LTX-2.3 video generation extension**
in the `nexus-dnn` Rust monorepo. The branch
`claude/unruffled-perlman-dd12e1` is pushed to `origin` at HEAD
`92c1267` and represents the end of "Rung 6" in a phased build-up:

- **Rung 1** ✅ `90978b6` — fake-mode end-to-end (in-Rust simulator)
- **Rung 2** ✅ `60a9d9e` — React 19 + vanilla-extract recipe UI bundle
- **Rung 3** ✅ `89a9846` — host dependency installer green for our manifest
- **Rung 4** ✅ `9b904e1` — real Python subprocess + StdioLease + JSON-RPC
- **Rung 5** ✅ `0973a9d` — `pipeline_diffusers.py` (real LTX-2.3, shipped-unverified)
- **Rung 6** ✅ `92c1267` — per-profile HF model install + RIFE skeleton

The fake-profile path is fully exercised end-to-end (POST /renders →
Python subprocess → JSON-RPC notifications → real ffmpeg-encoded MP4 →
download). The real-profile path is code-complete but never validated
against actual LTX-2.3 weights (needs a 16 GB NVIDIA GPU + the P0-T001
spike).

**Detailed checkpoint with file inventory, architecture diagram, live
curl evidence, and repo-specific conventions**:
`specs/046-ltx23-video-generation/checkpoints/2026-05-13-rung6-complete.md`

**Read that file first** before doing anything. It documents the 14
repo conventions that bit us during Rungs 3–6 and will bite again
(operator yaml schema is strict, storage prefix is alias-derived,
worker dir lives at extension root not nested, JSON-RPC method is
`handshake` not `ltx.runtime.health`, etc.).

## Where I am right now

- Worktree: `D:\Workspace\repos\nexus-dnn\.claude\worktrees\unruffled-perlman-dd12e1`
- Branch: `claude/unruffled-perlman-dd12e1`
- All validation gates green: cargo clippy `-D warnings` (pedantic+nursery),
  16/16 Rust tests, 25/25 Python tests, boundary audit PASS.
- PR not opened. URL when ready:
  `https://github.com/ldilov/nexus-dnn/compare/main...claude/unruffled-perlman-dd12e1?expand=1`

## Sanity-check the state before doing anything

```bash
cd D:/Workspace/repos/nexus-dnn/.claude/worktrees/unruffled-perlman-dd12e1
git log --oneline -1                                              # should show 92c1267
git status --short                                                # apps/web/package-lock.json may show as M (pre-existing)
cargo clippy -p nexus-video-ltx23-extension --all-targets -- -D warnings
cargo test -p nexus-video-ltx23-extension --lib                   # 16/16
bash extensions/builtin/nexus-video-ltx23/scripts/audit-boundary.sh
cd extensions/builtin/nexus-video-ltx23/worker && uv run python -m pytest tests/ -v
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

### Rung 7A — Real-GPU validation spike (P0-T001) [if user has GPU access]

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

### Rung 7B — Unified "Install for real video generation" CTA

Goal: collapse the two-step user flow (diffusers extras install, then
weights download) into a single button that does both. Today the user
has to run `uv sync --extra diffusers` manually before "Download weights"
can land usable weights — pipeline_diffusers.py would still fail with
`torch not importable` even after weights are present.

Approach:
1. Add a `ltx.video.runtime.install` JSON-RPC method to
   `worker/src/ltx_video_worker/installer.py` that:
   - Runs `uv sync --extra diffusers` via subprocess inside the
     worker's own venv. Emits `ltx.video.runtime.install.progress`
     notifications by capturing uv stdout/stderr.
   - On success, runs `ltx.video.install.start` for the same profile.
2. In Rust, extend `ProfileInstallService` so `start()` calls
   `ltx.video.runtime.install` (the bigger combined flow) instead of
   just the weights download.
3. Update the UI button label: "Download weights" → "Install runtime &
   download weights". Surface uv progress in a collapsible textarea
   so the user sees what's happening for the ~5 min of pip resolves.
4. New tests: mock-subprocess for uv. (Don't actually invoke uv in CI.)

Deliverable: single-click install for a real profile from
"not-installed" to "ready to render".

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

### Rung 7D — Cancel + retry-segment task abort

Goal: `POST /renders/{id}/cancel` and `POST /renders/{id}/retry-segment`
currently just flip DB rows. They don't actually stop the running
Python subprocess.

Approach:
1. In `runner.rs`, store a `CancellationToken` per run_id in a
   `DashMap` keyed on run_id.
2. `spawn_render` selects on `cancellation_token.cancelled()` + the
   notification loop. On cancel: send `ltx.video.render.cancel` RPC,
   wait for the worker to emit `ltx.video.error` with code
   RENDER_CANCELLED, release the lease.
3. `cancel_render` handler in api.rs looks up the token and calls
   `.cancel()`.
4. `retry_segment` is harder — Python worker currently doesn't expose
   a retry RPC. Two options: (a) full restart with seed offset (kills
   completed segments, restart from index 0 with shifted seed),
   (b) add `ltx.video.segment.retry` JSON-RPC method.
5. Test: spawn a render, cancel mid-render, verify the Python
   subprocess dies + run row is `cancelled`.

Deliverable: cancel actually cancels.

### Rung 7E — OpenAPI parity

Goal: `extensions/builtin/nexus-video-ltx23/openapi/extension.openapi.yaml`
is out of date — missing `/profiles/{profile_id}/install` (Rung 6) and
the `/renders/{run_id}/segments` GET route.

Approach: just extend the YAML. Run `cargo run --bin api_doc_check`
after to confirm aggregation still works.

Deliverable: openapi fragment matches what api.rs actually exposes.

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
