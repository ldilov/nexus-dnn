# Rung 7J — VRAM threshold supervisor — COMPLETE

**Date**: 2026-05-13 (and 14 — session bled past midnight)
**Worktree**: `D:\Workspace\repos\nexus-dnn\.claude\worktrees\unruffled-perlman-dd12e1`
**Branch**: `claude/unruffled-perlman-dd12e1`
**Previous checkpoint**: `2026-05-13-rung7i-complete.md` + the
`/octo:review` hardening commit `0546860`.

## Rung scope

Watch `runtime.memory_stats` notifications during a render and trip a
clean halt when usage crosses configured thresholds. Prevents the
multi-segment OOM regression where the CUDA pool fragments across
segments 6–8 and the next allocation crashes the worker mid-segment
— much better to halt cleanly between segments with a distinct
error code than to crash on the next allocation.

The resume prompt also hinted at "release lease + re-acquire +
continue rendering remaining segments". That orchestration is
deferred to a future rung — today's surface is the safety net
(halt with diagnostic) + the infrastructure to drive the future
restart-mid-chain work.

## What landed

### New module `vram_supervisor.rs` (~210 LOC)

- **`VramSupervisorConfig`**: four tunable thresholds with defaults
  picked from the P0-T001 spike measurements:
  - `max_alloc_retries = 6`
  - `max_frag_ratio = 0.30`
  - `min_free_mb = 2_560` (2.5 GB)
  - `max_num_ooms = 1`
- **`VramSupervisorConfig::from_env()`** + **`from_reader(closure)`**:
  the closure variant exists because the workspace forbids
  `unsafe_code`, and Rust 2024's `env::set_var` requires it. The
  reader closure lets tests feed deterministic values without
  touching the process environment.
- **`VramVerdict`** enum: `Healthy` | `Breach { reason: String }`.
  Reason string is human-readable and gets persisted to the run
  row's `error_message` field so an operator can diagnose without
  grepping logs.
- **`VramSupervisor::evaluate(&Value)`**: walks the four checks in
  priority order (OOMs → alloc_retries → frag_ratio → free_mb).
  Returns the FIRST threshold that breaches so the reason message
  stays short and signals the dominant issue.

### Wiring into `runner.rs`

- New `VRAM_SUPERVISOR_BREACH_CODE = -32110` constant (the worker's
  ErrorCodes namespace occupies `-32100..-32109`, we claim the
  next slot for host-side halts).
- `RunnerConfig` grows a `vram_supervisor: VramSupervisor` field.
  `register.rs` builds the runner with `VramSupervisor::from_env()`
  so operators can tune thresholds without rebuilding.
- `handle_notification`'s `match` adds a `"runtime.memory_stats"`
  arm: calls `evaluate`, on `Breach` logs WARN + returns
  `Some(NotificationOutcome::Error { code, message })`. The
  existing notification-loop pattern releases the lease cleanly
  + writes `status = failed` to DB.
- Outcome handler now distinguishes the supervisor's error code
  from generic worker errors: `error_code` field gets the literal
  string `"vram_supervisor"` instead of `"worker_error:-32110"`,
  giving the UI a clean discriminator for halt-by-policy vs
  halt-by-OOM.
- All error messages written to DB now flow through
  `truncate_status_msg` (carried over from the /octo:review
  hardening commit).

### Tests

- **12 new cargo tests** in `vram_supervisor::tests` covering:
  - Healthy / missing-fields / each-of-four-breach-paths.
  - Zero `free_mb` does NOT trip (fake runtime emits zeros — without
    this carve-out every CI run would halt instantly).
  - Multi-threshold breach reports only the first (priority).
  - Default config matches spec values exactly.
  - `from_reader` honours overrides + falls back on
    unparseable/empty values + returns default for no-overrides.

## Verification gate snapshot

| Check | Result |
|---|---|
| `cargo clippy -p nexus-video-ltx23-extension --all-targets -- -D warnings` | clean |
| `cargo test -p nexus-video-ltx23-extension --lib` | **56/56** (44 baseline + 12 new) |
| `bash scripts/audit-boundary.sh` | PASS |
| `uv run python -m pytest tests/ -q` | 94/94 (worker unchanged) |
| `pnpm build` | 369.75 KB JS — unchanged |

## How an operator tunes the supervisor

```bash
export NEXUS_VIDEO_LTX23_VRAM_MAX_ALLOC_RETRIES=10
export NEXUS_VIDEO_LTX23_VRAM_MAX_FRAG_RATIO=0.45
export NEXUS_VIDEO_LTX23_VRAM_MIN_FREE_MB=1500
export NEXUS_VIDEO_LTX23_VRAM_MAX_NUM_OOMS=2
```

Unparseable values silently fall back to defaults — a typo in a
threshold name never disables the supervisor.

To effectively disable, set very high caps:
```bash
export NEXUS_VIDEO_LTX23_VRAM_MAX_ALLOC_RETRIES=18446744073709551615
export NEXUS_VIDEO_LTX23_VRAM_MAX_FRAG_RATIO=999.0
export NEXUS_VIDEO_LTX23_VRAM_MIN_FREE_MB=0
export NEXUS_VIDEO_LTX23_VRAM_MAX_NUM_OOMS=18446744073709551615
```

## What's NOT done — for the NEXT session

1. **Restart-mid-chain orchestration**. The resume prompt asked for
   "release lease + re-acquire and resume rendering remaining
   segments". That requires either:
   - A new worker contract (`render.resume_from(segment_index)`) +
     trimmed-plan reconstruction in the runner, OR
   - A subset of `RenderPlan.segments[]` sent as a fresh
     `render.start` against the same run_id (the existing path; we
     just need the trim + lease re-acquire).
   Today's halt is the safety net; restart is the bigger ergonomic.
2. **Supervisor on the retry path**. `retry_segment_via_lease` has
   its own inline notification loop that doesn't go through
   `handle_notification`. A breach during retry currently has no
   effect. Should mirror the main-render integration in the next
   pass.
3. **Real-GPU smoke**. Run a 20-segment chain at high VRAM pressure
   on the RTX 5070 Ti, verify the supervisor actually fires before
   the worker OOMs. The unit tests cover the logic; the empirical
   threshold tuning needs hardware.
4. **Frontend surface**. The UI currently shows the same "Failed"
   chip regardless of error_code. Adding a "Halted by VRAM
   supervisor" chip + a tooltip with the `error_message` reason
   would help users distinguish supervisor-policy from real bugs.

## Next-session recommendation

**Rung 7F (open the PR)** — branch is now 4 hardened commits past
the prior session-close (7H + 7I + review-fixes + 7J). The PR body
can summarise the whole arc. Then either tackle restart-mid-chain
(Rung 7L?) or the frontend supervisor-chip work.
