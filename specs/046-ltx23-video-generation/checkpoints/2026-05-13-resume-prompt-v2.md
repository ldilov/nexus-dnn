# Resume prompt — Spec 046 (LTX-2.3 video extension) — 2026-05-13 session close

**Paste the section below into a fresh Claude Code session.** It is
self-contained — no need to attach prior session transcripts. The prompt
follows the meta-prompt pattern: role → phases → verification → output
spec → expert assignments → uncertainty disclaimer.

---

## Role

You are the **continuing implementation lead** for `spec 046 — LTX-2.3
video generation extension` in the `nexus-dnn` Rust monorepo. The
extension is shipping-ready for the fake path AND has produced real
prompt-matching video frames on a real RTX 5070 Ti GPU. Your job is to
close the remaining Rung 7H+ gaps documented below, in priority order,
on the same branch.

Operate as a **semi-autonomous engineer**: proceed when the path is
clear, ask only when ambiguity would cause rework. Commit + push at
each clean gate; produce a fresh checkpoint when you stop.

## Branch state at session start

- **Worktree**: `D:\Workspace\repos\nexus-dnn\.claude\worktrees\unruffled-perlman-dd12e1`
- **Branch**: `claude/unruffled-perlman-dd12e1` (pushed)
- **HEAD**: `9de8e28` (`docs(046): close OpenAPI + quickstart + release-notes spec gaps`)
- **20 commits ahead of `main`**
- **PR URL**: <https://github.com/ldilov/nexus-dnn/compare/main...claude/unruffled-perlman-dd12e1?expand=1>

**Read first** before doing anything:
`specs/046-ltx23-video-generation/checkpoints/2026-05-13-session-close.md`
— that file documents the 15 repo conventions, the architecture
diagram, what's verified vs pending, and where the model weights live
on disk.

## Phase 0 — Sanity gate (MANDATORY, run before any change)

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

If any of those fails — STOP and read the session-close checkpoint;
something regressed.

## Phase 1 — Pick ONE gap from the prioritised backlog

Open gaps from the spec, ordered by **value × tractability**. Pick the
highest item you can complete in your session budget. Do not start
multiple rungs in parallel; pick one and ship it cleanly.

### Rung 7H — Custom GGUF transformer loader (**recommended first**)

**Goal**: bypass the diffusers 0.39.0.dev0 utf-8-sniff regression so
the LTX-2.3 GGUF Q4_K_M variant (16.5 GB, already downloaded at
`C:\Users\lazar\.nexus\models\Abiray\LTX-2.3-22B-DISTILLED-1.1-GGUF\
LTX-2.3-22B-distilled-1.1-Q4_K_M.gguf`) loads cleanly into the
`LTX2VideoTransformer3DModel` class with diffusers-native `state_dict=`
injection.

**Why it matters**: drops the model footprint from 88 GB BF16 to 16.5 GB
4-bit + unblocks the `unsloth/LTX-2.3-GGUF` repo family (309 k+ HF
downloads — the de-facto community quant format).

**Steps**:
1. Add `gguf>=0.10` to `worker/pyproject.toml` `[diffusers]` extra.
2. Write a `gguf_state_dict(path) -> dict[str, Tensor]` helper in a new
   `worker/src/ltx_video_worker/gguf_loader.py`:
   - Use `gguf.GGUFReader(path)`. Walk tensors. Map GGUF's quant tags
     (Q4_K_M, Q5_K_M, Q8_0, BF16, F16) to diffusers'
     `GGUFParameter`/`GGUFLinearLayer` runtime ops if the bnb-style
     dequant path is needed at compute time. Reference impl: the
     `diffusers/quantizers/gguf/` module in 0.39.0.dev0 has the
     non-broken inner machinery; only `from_single_file` is buggy.
   - Map GGUF key names → diffusers transformer key names. The Abiray
     repo uses `transformer.blocks.<i>.<...>` style keys aligned with
     LTX-2.3 — confirm via `gguf.GGUFReader(path).fields`.
3. Wire `_ensure_pipeline_loaded` in `pipeline_diffusers.py` to call
   `LTX2VideoTransformer3DModel.from_pretrained(... state_dict=...)`
   when the resolved model dir contains a `.gguf` file at the
   transformer-config level. Pair with the dg845 base for the other
   sub-components (tokenizer, vae, scheduler, text_encoder).
4. Measure peak VRAM on RTX 5070 Ti. Expect ~12 GB. Standalone-test
   first; host integration is downstream.
5. Add a pytest that mocks `gguf.GGUFReader` and asserts the
   key-remap + dtype map are correct.

**Disclaimer**: if `gguf` python package can't read the Abiray file
(version skew between writer + reader), document the exact error and
fall back to **Rung 7H-alt** below.

### Rung 7H-alt — Custom ComfyUI key remap for `Lightricks/LTX-2.3-fp8`

**Goal**: 50–100 lines of key remapping so the official Lightricks FP8
single-file (`model.diffusion_model.*` ComfyUI-style prefix, 56 GB
already downloaded at `C:\Users\lazar\.nexus\models\Lightricks\
LTX-2.3-fp8\`) becomes loadable as an `LTX2VideoTransformer3DModel`.

**Why it matters**: native FP8 inference on Ada FP8 tensor cores + on
Blackwell. Avoids the BF16 size + spill regime.

**Steps**:
1. Inspect FP8 file structure (already done in verification doc):
   8871 keys, all `model.diffusion_model.*`-prefixed, full pipeline
   bundled.
2. Write `lightricks_fp8_state_dict(path) -> dict[str, Tensor]` that:
   - Reads safetensors keys via `safetensors.safe_open`.
   - Strips `model.diffusion_model.` prefix.
   - Drops `audio_vae.*`, `vocoder.*`, `connectors.*`, `latent_upsampler.*`
     keys (the FP8 file packages them all; we want only `transformer.*`).
   - Validates shape against the dg845 `transformer/config.json` —
     particularly the 9-channel `(audio_)scale_shift_table` rows that
     the morning Rung 7G work proved are the LTX-2.3 schema marker.
3. Same wiring point in `_ensure_pipeline_loaded` as Rung 7H.

### Rung 7I — Retry-segment task abort

**Goal**: `POST /renders/{run_id}/retry-segment` actually re-runs a
single segment instead of just flipping the DB row.

**Steps**:
1. Add `ltx.video.segment.retry` JSON-RPC method to
   `pipeline_diffusers.py`. Worker re-runs `_generate_segment` for the
   specified index, using the previous segment's `last_frame.png` as
   `cond_image`. Emits the standard SEGMENT_STARTED/STEP/COMPLETED
   notification stream.
2. Rust `Runner` gets a `retry_segment(run_id, segment_index)` method
   that resolves the existing lease (or acquires a new one) and sends
   the RPC.
3. `api::retry_segment` handler calls the new Runner method instead of
   the DB-only flip.
4. Test: spawn a render, simulate a single-segment failure, verify
   retry produces a valid raw.mp4 + downstream stitch.

### Rung 7J — VRAM threshold supervisor (P2-T206)

**Goal**: auto-restart worker subprocess when `runtime.memory_stats`
notifications cross configured thresholds.

**Steps**:
1. Define thresholds in `register.rs` config: `max_alloc_retries=6`,
   `max_frag_ratio=0.30`, `min_free_gb=2.5`.
2. Runner's notification loop subscribes to `runtime.memory_stats`,
   tracks deltas, and triggers `lease.release()` + lease re-acquire
   when any threshold breaches mid-render. The render continues from
   the next segment (existing chain mechanism handles state).
3. Test: inject synthetic stats notifications from a fake worker;
   assert lease lifecycle behaviour.

### Rung 7K — RIFE 2× real wheel wiring (P2-T201)

**Goal**: `_try_interpolate_rife` actually calls `rife-ncnn-vulkan-python`
when installed instead of falling through to `ffmpeg minterpolate`.

**Steps**:
1. Add an `[interpolation]` extras install path to the unified install
   CTA (worker pyproject already declares it).
2. Wire `RifeNCNNVulkan(gpuid=0)`. Frame-by-frame loop on the
   stitched MP4 → encode 2× FPS.
3. Mock the wheel in a pytest so the unit test runs without the binary
   present.

### Rung 7F — Open the PR (lowest-friction)

If the user wants to merge to `main` before any further code work:

1. Verify all 13 ACs from `spec.md` still report ✅ in
   `release-notes.md`.
2. `gh pr create` with title
   `feat(046): LTX-2.3 video generation extension (Rungs 1–7G)`.
3. PR body: bullet-summarise the 20 commits + link to
   `release-notes.md` and `verification/p0-t001-results.md`.
4. Flag the Rung 7H+ items as explicitly out-of-scope-for-this-PR.

## Phase 2 — Implementation (the chosen rung)

Follow standard discipline:
- Use **Skill** tool for `superpowers:using-superpowers` if it applies.
- **TodoWrite** for any multi-step task. Mark completed immediately.
- For complex implementation, use **planner** agent first.
- Use **code-reviewer** + **rust-reviewer** / **python-reviewer** agents
  on the diff before committing.

Hard rules:
- No `--no-verify` git commits. Block-no-verify hook will catch anyway.
- No force-push to `main`. Force-with-lease on the feature branch is OK.
- Cross-worktree work: this branch lives in `unruffled-perlman-dd12e1/`.
  If your session was opened in a different worktree, operate via
  absolute paths (`D:\Workspace\repos\nexus-dnn\.claude\worktrees\
  unruffled-perlman-dd12e1\...`).

## Phase 3 — Verification (every commit must pass)

```bash
cd D:/Workspace/repos/nexus-dnn/.claude/worktrees/unruffled-perlman-dd12e1
cargo clippy -p nexus-video-ltx23-extension --all-targets -- -D warnings
cargo test -p nexus-video-ltx23-extension --lib
bash extensions/builtin/nexus-video-ltx23/scripts/audit-boundary.sh
cd extensions/builtin/nexus-video-ltx23/worker && uv run python -m pytest tests/ -q
cd ../web && pnpm build
cd ../../../..
```

Additionally for code that touches:
- **The worker pyproject**: `cd worker && uv lock` and commit the lockfile.
- **The web bundle**: `pnpm build` rebuilds `dist/`. Commit the dist.
- **Anything that crosses host/extension boundary**: re-run the boundary
  audit. If a literal slipped into the host tree, fix it BEFORE
  committing rather than adding to the allowlist.

## Phase 4 — Live smoke (if the chosen rung is real-GPU-affecting)

```bash
powershell -NoProfile -Command "Get-Process nexus-dnn,python -ErrorAction SilentlyContinue | Stop-Process -Force"
sleep 1
cargo build -p nexus-core --bin nexus-dnn
NEXUS_PORT=3100 ./target/debug/nexus-dnn.exe > /tmp/ltx_host.log 2>&1 &

# Fast fake-mode smoke (should always work):
RUN=$(curl -s -X POST http://127.0.0.1:3100/api/v1/extensions/nexus.video.ltx23/renders \
  -H 'Content-Type: application/json' \
  -d '{"prompt":"sanity check","duration_seconds":4}')
echo "$RUN"

# For Rungs 7H/7H-alt/7K: real-GPU smoke with whatever new loader landed.
# Note real-GPU multi-segment runs are slow — expect 10–30 min per segment
# at 832×480×97-frame defaults. Test at small sizes first
# (e.g. width=512 height=320 duration_seconds=2).
```

## Phase 5 — Checkpoint + commit

When stopping (whether at clean rung close OR a partial milestone):

1. **Commit + push** the current diff. Use a body that names the rung
   ID and what specifically landed vs deferred.
2. **Append** a fresh checkpoint file to
   `specs/046-ltx23-video-generation/checkpoints/` with today's date
   and the rung suffix. Mirror the structure of
   `2026-05-13-session-close.md`:
   - HEAD SHA + commit list since prior checkpoint
   - Validation gate snapshot
   - What's NOT done — for the NEXT session
   - Repo-specific gotchas if you discovered new ones
3. **Update** this resume prompt's "Branch state at session start"
   block with the new HEAD SHA so the next paste is current.

## Phase 6 — Output specification

When you finish, output one tight summary message:

- **Single sentence** stating which rung landed + commit SHA.
- **Bullet** list of the 3–5 most important code changes (file paths + one-line role).
- **Validation table**: clippy / cargo test / pytest / boundary / pnpm build / live smoke (if applicable).
- **Next-session pointer**: which rung you'd recommend next and why.

Do NOT write a paragraph-essay summary. Do NOT restate the rung
description from this prompt. Do NOT include the full diff inline.

## Expert assignments

- **Architecture decisions** (pipeline class selection, loader API
  shape, retry-RPC contract): `architect` agent before coding.
- **Rust review** (clippy lint discipline, borrow-checker
  refactorings): `rust-reviewer` agent on the diff before commit.
- **Python review** (PEP 8, type hints, async pitfalls):
  `python-reviewer` agent.
- **Security review** (only if touching auth / input parsing / new
  HTTP routes): `security-reviewer` agent.
- **Test design** (especially for the Rung 7J supervisor): `tdd-guide`
  agent for the red → green flow.

## Uncertainty disclaimer

If you encounter ANY of the following — STOP and explicitly report it
rather than guessing:

- A repo-convention conflict (e.g., where a new file should live, what
  capability enum to add). Read the existing files in the same role
  to ground the answer.
- An upstream-broken dependency (we already hit five of these — see
  `verification/p0-t001-results.md`'s "Dead ends explored" section).
  Document precisely + escape via the lowest-effort workaround OR
  defer the rung.
- A divergence between what this prompt says and what the
  `session-close.md` checkpoint says — the checkpoint is canonical
  (it's the snapshot of reality at session end).
- A test that passes when it shouldn't (e.g. a mock that's too
  permissive). Tighten the mock before claiming green.

Memory file: `MEMORY.md` index says HEAD is `9de8e28` and we shipped
20 commits in this batch — if your sanity gate disagrees, somebody
landed work on the branch between sessions; reconcile before
proceeding.

---

## Quick reference for the next session

| Need | Where |
|---|---|
| Architecture diagram | `checkpoints/2026-05-13-session-close.md` |
| Real-GPU spike findings | `verification/p0-t001-results.md` |
| All 13 acceptance criteria | `spec.md` lines 40–52 |
| Hyperparameter defaults | `pipeline_diffusers.py::_render_loop` |
| Idempotency cache internals | `api.rs::lookup_idempotent` / `store_idempotent` |
| Scene-prompt timeline walk | `planning.rs::pick_scene_prompt` |
| 16 GB VRAM trick | `pipeline_diffusers.py::_ensure_pipeline_loaded` (`enable_sequential_cpu_offload`) |
| Boundary rule | `.claude/rules/host-extension-boundary.md` |
| Host requirements + uv mandate | `docs/requirements.md` |
| Recipe-form layout | `web/src/App.tsx` (FormPanel, ScenesEditor, AdvancedKnobs) |

## My pick of next rung

[user fills this in when they paste this prompt. Default recommendation:
**Rung 7H custom GGUF loader** — single contained change, highest
leverage (drops 88 GB → 16.5 GB on disk + unblocks the 309 k-download
unsloth repo family + likely fits Blackwell in <8 GB VRAM).]
