# Resume prompt — Spec 046 — operator-controlled offload + nvfp4 gate drop

Paste into a fresh Claude Code session. Self-contained — no need to attach prior transcripts.

---

## Role

You are the **continuing implementation lead** for spec 046 (LTX-2.3 video generation extension). Spec 046 is functionally complete and merged to `main`; the first real-GPU render landed yesterday (2026-05-15) on an RTX 5070 Ti. Your job today: implement the **v2 offload-control plan** at `.claude/session-plan.md` and **drop the silent nvfp4 → fp8 gate** at `api.rs:246,304`.

Operate as a semi-autonomous engineer. The plan was already adversarially debated (3 independent voices: code-reviewer, rust-reviewer, codex-rescue) and corrected. Follow the file-by-file build order.

## Branch state at session start

- **Worktree**: `D:\Workspace\repos\nexus-dnn\.claude\worktrees\unruffled-perlman-dd12e1`
- **Branch**: `claude/unruffled-perlman-dd12e1` (pushed)
- **Main repo**: `D:\Workspace\repos\nexus-dnn` (pushed `origin/main` at `a2ab8bd`)
- **Recent commits** (all on main):
  - `a2ab8bd fix(046): finish null-default guard + surface bg-task exceptions`
  - `903394d fix(046): unblock real-GPU render — LoaderLock + null defaults`
  - `791c2ba fix(046): keep strong reference to worker background tasks`
- **CRITICAL gotcha**: the worker's editable Python install at `C:\Users\lazar\.nexus\extensions\nexus.video.ltx23\runtime\packages\.venv\` points at the **WORKTREE** path, not the main repo. Edits to `extensions/builtin/nexus-video-ltx23/worker/...` MUST land in the worktree for the running worker to see them. Sync both with `cp` or `git pull` in the worktree after committing to main.

## Read first

1. `specs/046-ltx23-video-generation/checkpoints/2026-05-15-offload-control-plan.md` — yesterday's session-close summary
2. `.claude/session-plan.md` — the v2 implementation plan (debate-corrected). This is your primary spec for the work.
3. `.claude/session-intent.md` — success criteria
4. `~/.claude-octopus/debates/ltx23-offload-plan-20260515-155719/SYNTHESIS.md` — the debate verdict (APPROVE-WITH-CHANGES) with 7 specific corrections folded into the v2 plan

## Phase 0 — Sanity gate (MANDATORY before any code)

```bash
cd D:/Workspace/repos/nexus-dnn
git log --oneline -3                                                # → a2ab8bd, 903394d, 791c2ba on main
git status --short                                                  # likely has unrelated local-llm WIP — leave alone
cargo clippy -p nexus-video-ltx23-extension --all-targets -- -D warnings   # → clean
cargo test -p nexus-video-ltx23-extension --lib                            # → 78 passed
bash extensions/builtin/nexus-video-ltx23/scripts/audit-boundary.sh        # → PASS
cd extensions/builtin/nexus-video-ltx23/worker
uv run --extra test python -m pytest tests/ -q --ignore=tests/test_gguf_loader.py   # → 96 passed
cd ../web && pnpm tsc --noEmit                                              # → clean
cd ../../../..
```

Any failure here → STOP and investigate before proceeding.

## Phase 1 — Implement v2 plan (file-by-file build order)

Follow the order in `.claude/session-plan.md` "DEVELOP (40%) — Files to touch, in build order" section. Highlights:

### Step 1 — Rust schema
File: `extensions/builtin/nexus-video-ltx23/rust/src/schemas.rs`

Add a new `OffloadMode` enum and a field on `AdvancedSettings`:
```rust
#[derive(Debug, Clone, Copy, Default, Deserialize, Serialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum OffloadMode {
    #[default]
    Auto,
    None,
    Model,
    Sequential,
}
```

Inside `AdvancedSettings`:
```rust
#[serde(default)]
pub offload_mode: OffloadMode,
```

NOT `Option<OffloadMode>`. The default + `#[serde(default)]` handles missing-key cleanly without a redundant Option wrapper.

### Step 2 — Drop the nvfp4 gate
Files: `extensions/builtin/nexus-video-ltx23/rust/src/runtime_selection.rs`, `extensions/builtin/nexus-video-ltx23/rust/src/api.rs`

The actual bug:
```rust
// api.rs:246 (create_plan)
resolve_runtime_id(req.runtime_profile, false)
// api.rs:304 (create_render) — same
```

The `false` hardcodes `experimental_nvfp4_opt_in: false`, which makes `runtime_selection.rs::resolve_runtime_id` silently return `"nexus.video.ltx23.rtx50-fp8"` whenever the user requests `Rtx50Nvfp4`.

Fix: drop the parameter entirely.
- `runtime_selection.rs::resolve_runtime_id`: change signature from `(pref, _: bool)` to `(pref)`.
- Remove the `Rtx50Nvfp4 → rtx50-fp8` fallback arm.
- `api.rs:246` + `:304`: drop the `false` argument.

If `Rtx50Nvfp4` is requested but the profile isn't installed, let the existing profile-install check return its 503 (already wired). That's the right error mode.

Also add `default_offload_mode_for_profile(&str) -> OffloadMode` in `runtime_selection.rs`:
```rust
pub const fn default_offload_mode_for_profile(profile: &str) -> OffloadMode {
    match profile {
        "rtx50-nvfp4" => OffloadMode::None,
        "rtx50-fp8" | "rtx40-fp8" => OffloadMode::Sequential,  // NOT Model — see plan
        "fake" => OffloadMode::Sequential,
        _ => OffloadMode::Sequential,
    }
}
```

### Step 3 — Rust runner payload propagation
File: `extensions/builtin/nexus-video-ltx23/rust/src/runner.rs`

In `build_render_params`, resolve `Auto` BEFORE serialising:
```rust
let offload_mode = match advanced.offload_mode {
    OffloadMode::Auto => default_offload_mode_for_profile(short_profile(&plan.runtime_profile)),
    other => other,
};
// Serialise as snake_case string in the advanced JSON block.
```

`short_profile()` already exists in runner.rs around line 1335. The worker never sees `"auto"` — only `"none"|"model"|"sequential"`.

`build_render_params_offset` needs the same resolution. `retry_segment_via_lease` (around line 972) calls `build_render_params` directly so it auto-propagates — but add an explicit test.

### Step 4 — Worker dispatch
File: `extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/pipeline_diffusers.py`

In `_ensure_pipeline_loaded`, after the pipeline is created and BEFORE moving to device:
```python
offload_mode = raw_params.get("advanced", {}).get("offload_mode", "sequential")
import torch
if offload_mode == "none":
    free, total = torch.cuda.mem_get_info()
    if total < 16 * 1024**3:
        raise _ModelLoadFailed(
            f"offload_mode=none requires 16 GB+ VRAM, card has {total / 1e9:.1f} GB"
        )
    pipe = pipe.to("cuda")
elif offload_mode == "model":
    pipe.enable_model_cpu_offload()
elif offload_mode == "sequential":
    pipe.enable_sequential_cpu_offload()
else:
    raise _ModelLoadFailed(f"unknown offload_mode: {offload_mode!r}")
```

`_load_then_render` + `_load_then_retry_segment` thread `raw_params` through (they already do).

Also add a new notification for the smoke test:
```python
# In rpc.py Notifications class:
WEIGHTS_RESIDENT = "runtime.weights_resident"

# In _load_then_render after _ensure_pipeline_loaded returns:
await worker.emit_notification(
    Notifications.WEIGHTS_RESIDENT,
    {
        "run_id": rs.run_id,
        "transformer_device": next(pipe.transformer.parameters()).device.type,
        "memory_reserved_bytes": torch.cuda.memory_reserved(),
    },
)
```

### Step 5 — Frontend
File: `extensions/builtin/nexus-video-ltx23/web/src/api.ts`

Add:
```typescript
export type OffloadMode = "auto" | "none" | "model" | "sequential";
```
And `offload_mode?: OffloadMode` on `AdvancedSettings`.

File: `extensions/builtin/nexus-video-ltx23/web/src/App.tsx`

Add a `<select>` dropdown to the advanced form section. Options:
- Auto (profile default)
- None — Full GPU resident (fastest, needs 16 GB+)
- Model — Mid-grained offload (balanced)
- Sequential — Per-layer offload (slowest, lowest VRAM)

### Step 6 — Tests
- Rust unit tests in `schemas.rs` + `runtime_selection.rs` + `runner.rs` covering: serde round-trips, default propagation, retry payloads.
- Python unit test in `tests/test_diffusers_resolver.py` (or new file) — mock `pipe` with MagicMock, assert correct helper called for each mode + insufficient-VRAM raises.
- Boundary audit + cargo + pytest + tsc + build all green.

## Phase 2 — Real-GPU smoke (requires running host)

Per the v2 plan's DELIVER section:
1. Restart host with rebuilt binary (the runner.rs + runtime_selection.rs changes need a fresh compile).
2. Submit a render: `runtime_profile: "rtx50-nvfp4"`, `advanced: { offload_mode: "none" }`, smallest plan (4 sec, 1 segment, 4 steps).
3. Worker log MUST show `profile: "rtx50-nvfp4"` (not silently downgraded — proves the gate drop).
4. Look for the new `runtime.weights_resident` notification — `transformer_device` should be `"cuda"`, `memory_reserved_bytes >= 9 GB`.
5. Inference: 4 steps in < 40 seconds (vs 70-second baseline with sequential FP8).
6. Run reaches status `completed` with a final artifact.

If supervisor halts on `frag_ratio=0.995` again (the false-positive that bit us yesterday), it's a separate issue — spawn a follow-up to raise `max_frag_ratio` for FP4/FP8 profiles.

## Commit cadence

After each phase passes its local gate:
- Step 1 (schema): commit `feat(046): add OffloadMode enum + AdvancedSettings field`
- Step 2 (downgrade fix): commit `fix(046): drop experimental_nvfp4_opt_in gate — surface 503 if profile missing`
- Step 3 (runner): commit `feat(046): resolve OffloadMode::Auto in runner, propagate to worker`
- Step 4 (worker): commit `feat(046): dispatch offload_mode + emit weights_resident notification`
- Step 5 (frontend): commit `feat(046): offload_mode dropdown in advanced render form`
- Step 6 (tests): commit `test(046): coverage for OffloadMode round-trip + dispatch + retry`

Push after each, fast-forward main, merge to main. Per the user's preference established in earlier sessions.

**REMEMBER**: use `git commit -F file` for multi-paragraph bodies, not `-m "..."` — the `block-no-verify` hook substring-matches commit messages and rejects certain phrases.

## Constraints

- Stay on `claude/unruffled-perlman-dd12e1` branch unless told otherwise.
- Honor the host-extension boundary rule (no LTX-specific literal in host scan paths; `audit-boundary.sh` must stay green).
- Worker venv is editable-install pointing at the WORKTREE — sync both copies (worktree + main repo) when editing worker Python files.
- Don't use `--no-verify` on git commits.
- If the host needs to be restarted, just say so explicitly — don't try to kill the host process yourself.

## Output expectations at session close

1. All 6 commits on `origin/main`
2. Real-GPU smoke render reaches `status: completed` with `transformer_device: cuda` + `memory_reserved >= 9 GB`
3. Wall time per inference step < 10 seconds (vs 17.7 s/step baseline)
4. A new session-close checkpoint at `specs/046-ltx23-video-generation/checkpoints/2026-05-{N}-offload-control-shipped.md` describing what landed + any follow-ups
5. If the supervisor frag_ratio false-positive trips again, leave a `spawn_task` chip rather than fighting it in-line

## Phase deferral — Item Q (operator-tunable VRAM supervisor)

The frag_ratio default of 0.30 doesn't fit FP8/NVFP4 sequential offload (which naturally produces 0.995 right after a render). If this trips during the smoke test:

- Document the trip in your session checkpoint with the exact frag_ratio observed.
- Spawn a follow-up task: "Add per-profile `max_frag_ratio` defaults + a 'breach is benign if all segments completed' guard to the runner's supervisor loop."
- Do NOT block this session's work on it — the smoke test passing the OTHER 5 criteria (status, device, reserved, log, speed) is still a successful outcome.

Good luck.
