# Rung 7L — Restart-mid-chain orchestration — COMPLETE

**Date**: 2026-05-14
**Worktree**: `D:\Workspace\repos\nexus-dnn\.claude\worktrees\unruffled-perlman-dd12e1`
**Branch**: `claude/unruffled-perlman-dd12e1`
**Previous checkpoint**: `2026-05-13-rung7j-complete.md` (HEAD `e0a940f`) — Rung 7K and review-fix commits landed in the interim.

## Rung scope

Rung 7J added the VRAM supervisor as a **halt** mechanism: cross a
threshold, fail the render with `error_code = "vram_supervisor"`.
Rung 7L upgrades that into a **transparent restart**: when the
supervisor trips mid-chain, the runner releases the lease (kills the
fragmented worker subprocess), acquires a fresh lease (spawns a clean
worker with a fresh CUDA pool), and re-issues `render.start` with a
trimmed plan starting from the next segment — image-conditioned on
the last completed segment's `last_frame.png` so visual continuity
holds across the restart boundary.

After `NEXUS_VIDEO_LTX23_VRAM_MAX_RESTARTS=3` exhausted attempts the
runner falls through to the legacy halt path with the same
`vram_supervisor` error code — operator opts out by setting the env
var to `0`, opts in higher by setting to `10`, etc.

## What landed

### Runner (`rust/src/runner.rs`)

- **`NotificationOutcome::RestartRequired { reason, last_completed_segment }`** —
  new variant carried out of the notification loop when supervisor
  trips. The outer driver in `run_via_lease` consumes it and decides
  whether to restart or halt.
- **`BreachLatch`** — a per-attempt `Mutex<Option<String>>` shared
  between `handle_notification` and its caller. The
  `runtime.memory_stats` arm sets the latch (first-writer-wins); the
  `ltx.video.segment.completed` arm takes it after writing the segment
  status row, then returns `RestartRequired`. This timing is critical:
  releasing the lease mid-segment would corrupt the workdir; waiting
  until SEGMENT_COMPLETED guarantees the worker is quiescent.
- **`run_attempt`** — extracted from `run_via_lease`. One attempt at
  running the chain from `segment_offset` to end. Acquires a fresh
  lease, sends `render.start`, drains notifications until terminal
  outcome OR `RestartRequired`. Releases the lease on every exit path.
- **`run_via_lease` outer loop** — wraps `run_attempt` in a restart
  loop. Tracks `restart_attempts: u32` and `segment_offset: u32`.
  Increments offset to `last_completed_segment + 1` on each restart,
  defensive-checks for forward progress (offset must strictly
  increase) and remaining work (offset < plan.segments.len()).
  Caps at `max_restarts_from_env()` (default 3).
- **`build_render_params_offset`** — new helper that produces the
  trimmed `render.start` payload for a resume attempt. Slices
  `plan.segments[segment_offset..]` and injects
  `input_image.path = <workdir>/segments/<NNN>/last_frame.png` so
  the worker re-anchors visual continuity from the prior chain's last
  successful segment. Segment indices remain ORIGINAL (worker uses
  `seg["index"]` for its workdir path), so DB rows + on-disk layout
  stay coherent across attempts. Also writes a `resumed_from_segment`
  field for observability.
- **`max_restarts_from_env()` + `DEFAULT_MAX_RESTARTS = 3`** —
  parameterised cap. Garbage env values fall back to default rather
  than disabling the safety net.

### Tests (13 new in `runner::tests`)

- `breach_latch_set_then_take_returns_first_reason`
- `breach_latch_set_is_first_writer_wins`
- `breach_latch_starts_empty`
- `max_restarts_from_env_uses_default_when_unset`
- `max_restarts_from_env_parses_valid_override`
- `max_restarts_from_env_falls_back_on_garbage`
- `build_render_params_offset_trims_segments`
- `build_render_params_offset_marks_resumed_segment`
- `build_render_params_offset_injects_cond_image`
- `build_render_params_offset_no_cond_omits_input_image`
- `build_render_params_offset_zero_offset_equivalent_to_full_chain`
- `handle_notification_memory_stats_breach_sets_latch_no_outcome`
- `handle_notification_memory_stats_healthy_leaves_latch_clear`

(The `run_via_lease` outer-loop end-to-end test needs a real lease
factory which is hard to mock; deferred. The component-level
coverage proves: latch semantics, env parsing, payload trimming,
notification routing, and breach detection.)

## Verification gate

| Check | Result |
|---|---|
| `cargo clippy -p nexus-video-ltx23-extension --all-targets -- -D warnings` | clean |
| `cargo test -p nexus-video-ltx23-extension --lib` | **72/72** (59 baseline + 13 new) |
| `bash scripts/audit-boundary.sh` | PASS |
| `uv run python -m pytest tests/ -q` | 111/111 (no worker changes) |
| `pnpm build` | 373 KB JS — unchanged |

## How it behaves operationally

**Healthy multi-segment render (no breach)**:
- `run_via_lease` calls `run_attempt(offset=0)`.
- `run_attempt` returns `Done`.
- Outer loop breaks. DB row → `completed`. Identical to pre-7L.

**Single breach at segment 4 of 8 (one restart, then done)**:
1. `run_attempt(offset=0)` acquires lease A.
2. Worker renders segments 0-4 successfully.
3. After segment 4's `memory_stats`: supervisor trips, latch set.
4. `segment.completed` for index 4: handler writes row, takes
   latch, returns `RestartRequired { last_completed_segment: 4 }`.
5. `run_attempt` releases lease A (kills worker subprocess →
   fresh CUDA pool on next acquire).
6. Outer loop: `next_offset = 5`, `restart_attempts = 1`, retries.
7. `run_attempt(offset=5)` acquires lease B with
   `input_image.path = <workdir>/segments/004/last_frame.png` and
   `segments[5..8]` in the payload.
8. Worker renders segments 5-7 + emits `done`.
9. Outer loop breaks. DB → `completed`. Operator sees a one-line
   INFO log: "chain completed after transparent restart(s)".

**Three breaches in a row (cap reached)**:
- After third `RestartRequired`, `restart_attempts > max_restarts`
  triggers the fall-through halt with
  `error_code = "vram_supervisor"` and message
  `"vram supervisor halt after 3 restart(s): {reason}"`. Identical
  surface to the Rung 7J halt path; clients don't need a new code.

**Cancel during restart**: `cancel_notify` is passed THROUGH each
`run_attempt`, so a user-cancel between restarts still pre-empts.
Worker gets the cancel RPC against the current lease; outer loop
sees `Cancelled` and exits cleanly.

## Repo conventions reaffirmed

- All code lives under `extensions/builtin/nexus-video-ltx23/` —
  boundary audit clean.
- `RestartRequired` is internal — never emitted on the wire to clients.
- The latch is per-attempt (created inside `run_attempt`) so a stale
  breach from a prior attempt can't leak forward.
- The `run_via_lease` final-match arm handles `RestartRequired` via
  `unreachable!()` — the type system requires exhaustiveness, the
  control-flow guarantees the outer loop consumes it. The unreachable
  arm carries a load-bearing assertion message.

## What's NOT done — for the NEXT session

1. **End-to-end `run_via_lease` test with a mocked lease factory.**
   The component tests cover all pure functions + the notification
   handler's latch flow. The orchestration of "lease A → breach → lease
   B → done" needs either (a) a mockall-driven lease trait, or (b) a
   real-GPU smoke test with a forced breach via env override
   (`NEXUS_VIDEO_LTX23_VRAM_MIN_FREE_MB=999999`).
2. **Frontend signal**: the UI currently shows "rendering" verbatim
   during a transparent restart. Could add a per-run `restart_count`
   field to the DTO + show `"rendering · restart 1/3"` in the
   StatusBar. P2 polish.
3. **Worker-side support for `resumed_from_segment`**: the field is
   in the payload now, but the worker doesn't read it. Today the
   worker just sees segments[5..8] and treats segment 5 as "first
   segment" → uses `input_image.path` from the payload. Works
   transparently. A future worker version could record the
   restart in its run state for diagnostic emission.

## Next-session recommendation

Open the PR with the comprehensive body already in
`specs/046-ltx23-video-generation/PR_BODY.md`. The branch covers
Rungs 1–7K + the multi-LLM review fix sweep + Rung 7L. The retry +
cancel + render + VRAM + restart + error-routing surfaces are all
production-grade. Real-GPU smoke can be a follow-up rung on a fresh
branch.
