# 2026-05-15 — Session close: offload-control feature planned + first real-GPU render

**Day's outcome:** First successful real-GPU LTX-2.3 video render landed on RTX 5070 Ti — and immediately surfaced two follow-on issues (operator wants offload control, planner silently downgrades nvfp4 → fp8). A multi-voice adversarial debate refined the implementation plan into a v2 that's ready for execute next session.

## What landed (commits)

| SHA | Subject | Purpose |
|---|---|---|
| `791c2ba` | fix(046): keep strong reference to worker background tasks | CPython 3.11+ weak-ref-to-tasks GC bug — bg_task vanished before first await |
| `903394d` | fix(046): unblock real-GPU render — LoaderLock + null defaults | Pre-import torch on main thread (Windows LoaderLock deadlock workaround) + emit defaults instead of `Value::Null` for advanced fields |
| `a2ab8bd` | fix(046): finish null-default guard + surface bg-task exceptions | Re-applied `_or_default` to `_render_loop` (was lost in a sloppy cp), wrapped `_render_loop` in try/except so future bg-task crashes surface as `ltx.video.error` |

All three are on `origin/main`. The Rust portion of `903394d` (runner.rs `build_render_params` Value::Null fix) only takes effect after a host rebuild. The user rebuilt + the next render exercised the worker-side `_or_default` successfully.

## Real-GPU render proven (run `01KRNTPCDMQN0J35D3P7VV21WE`)

- Profile requested: `rtx50-nvfp4` (silently resolved to `rtx50-fp8` — this is the planner bug)
- 832×480 / 4 seconds / 4 inference steps / draft preset
- Pipeline cold-load: ~65 seconds (FP8 22B weights via sequential CPU offload)
- VRAM peak: 7189 MiB / 16303 MiB (~44 % utilisation — too low)
- Inference: 4 steps in 70 seconds → 17.7 s/step
- Final video: `interpolated.mp4` (255 KB, h264, 832×480 48 fps, 191 frames, 3.98 s)
- Run status: **failed** (VRAM supervisor tripped at frag_ratio=0.995 vs default 0.30 right AFTER segment 0 completed) — but the video file was generated correctly

## Plan for next session — v2 (debate-corrected)

The original plan named `runtime_selection.rs` as the location of the nvfp4 downgrade fix. A 3-voice adversarial debate (code-reviewer, rust-reviewer, codex:codex-rescue) independently traced the actual root cause: **`api.rs:246` + `api.rs:304` hardcode `experimental_nvfp4_opt_in: false`** at the call site. The gate inside `runtime_selection.rs` is deliberate; the API never opted in.

Four blocking corrections applied to the v2 plan (`.claude/session-plan.md`):
1. Fix downgrade in `api.rs`, NOT `runtime_selection.rs`. Recommended: drop the gate entirely now that nvfp4 is proven on real hardware.
2. Per-profile defaults: only `rtx50-nvfp4 → None`. Both fp8 profiles default to `Sequential` (NOT `Model`) because the codebase's own comments in `pipeline_diffusers.py:401-414` document that `enable_model_cpu_offload` spilled to unified memory on RTX 5070 Ti.
3. Schema shape: `OffloadMode` enum with `#[default] Auto` + `#[serde(default)]` field. NOT `Option<OffloadMode>` (redundant with `Auto` variant).
4. Smoke validation: `torch.cuda.memory_reserved() >= 9 GB` + `next(pipe.transformer.parameters()).device.type == "cuda"`. NOT `nvidia-smi memory.used > 9 GB` (proves nothing about weight residency).

Plus 3 strong recommendations:
5. Pre-VRAM check: `torch.cuda.mem_get_info()` returns `(free, total)` — original plan said `[1]` which is total, not free.
6. PlanWarning surface for any future downgrade (deferred since we're dropping the gate).
7. `retry_segment_via_lease` (`runner.rs:972+`) is a third payload-construction site — add explicit test.

Debate folder: `~/.claude-octopus/debates/ltx23-offload-plan-20260515-155719/`

## Open follow-ups (for next session)

1. **Execute the v2 plan** — implement the OffloadMode field + drop the experimental_nvfp4_opt_in gate. Estimated 2.5 hours total. See `.claude/session-plan.md` for the file-by-file build order.
2. **VRAM supervisor false-positive on `frag_ratio`** — defaults are 0.30 but FP8 sequential offload naturally fragments to 0.995 right after a render. Two options spawned earlier as chips (not addressed today): raise `max_frag_ratio` for FP8/NVFP4 profiles, OR ignore breach if it lands after all planned segments completed.
3. **Worker stdio buffering** — earlier spawned chip; not addressed today. Worker progress events arrived in bursts due to Python logging buffering.
4. **Two-file divergence between worktree + main repo** — observed today that an editable Python install points at the WORKTREE path, not `D:\Workspace\repos\nexus-dnn`. Future fixes need to land in both (or just sync the worktree before testing).

## Validation gate state at session end

| Gate | Result |
|---|---|
| `cargo clippy --all-targets -- -D warnings` | clean (78 tests) |
| `cargo test -p nexus-video-ltx23-extension --lib` | 78 passed |
| `pytest tests/test_fake_pipeline.py` (worker, --extra test) | 10 passed |
| `audit-boundary.sh` | PASS |
| Real-GPU smoke | Video generated, supervisor false-positive on cleanup (separate issue) |

## Files modified this session

- `extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/__main__.py` (LoaderLock pre-import)
- `extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/pipeline_diffusers.py` (_or_default helper + bg_task strong-ref + try/except wrapper)
- `extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/pipeline_fake.py` (matching bg_task pattern)
- `extensions/builtin/nexus-video-ltx23/worker/tests/test_fake_pipeline.py` (regression test for bg_task)
- `extensions/builtin/nexus-video-ltx23/rust/src/runner.rs` (Value::Null → explicit defaults)
- `.claude/session-intent.md` (NEW — intent contract)
- `.claude/session-plan.md` (NEW — v2 plan with debate corrections)
- `specs/046-ltx23-video-generation/checkpoints/2026-05-15-offload-control-plan.md` (THIS file)
- `specs/046-ltx23-video-generation/checkpoints/2026-05-15-offload-control-resume-prompt.md` (next session's brief)

## Next session begins by reading

1. `specs/046-ltx23-video-generation/checkpoints/2026-05-15-offload-control-resume-prompt.md` — copy-paste into fresh Claude session
2. `.claude/session-plan.md` (v2) — the actual implementation plan
3. This file — context for what happened today

If skipping the resume prompt, the next session should run `/octo:embrace "Implement operator-controlled offload + drop nvfp4 gate per session-plan.md v2"` to land all 4 phases end-to-end.
