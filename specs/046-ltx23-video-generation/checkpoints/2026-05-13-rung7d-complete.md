# Checkpoint 2026-05-13 — Spec 046 Rung 7D complete

**Branch**: `claude/unruffled-perlman-dd12e1`
**Worktree**: `D:\Workspace\repos\nexus-dnn\.claude\worktrees\unruffled-perlman-dd12e1`
**HEAD before this commit**: `25246fe`
**Spec**: 046 (LTX-2.3 video generation extension)
**Rung**: 7D — cancel actually cancels

## What changed

`POST /renders/{run_id}/cancel` previously only flipped the DB row to
`cancelled` — the running Python subprocess kept going. Now the cancel
signal propagates: HTTP handler signals the live render task, task
sends `ltx.video.render.cancel` to the worker, worker exits at the
next segment boundary, run flips to `cancelled` with the partial
progress preserved.

### Cancel registry

`Runner` now owns an `Arc<Mutex<HashMap<String, Arc<Notify>>>>` keyed
by run id. `spawn_render` inserts a `Notify` before kicking off the
render task and removes it on terminal completion (success, failure,
or cancel). `Runner::cancel(run_id)` returns one of two outcomes:

- `Signalled` — token found, `notify_waiters()` called.
- `NotInFlight` — no live token; the HTTP handler falls back to a
  direct DB flip so queued-but-never-spawned runs still cancel.

### Notification-loop integration

`run_via_lease` now `select!`s on three futures:

1. The notification stream from the lease.
2. `cancel_notify.notified()` (one-shot — guarded with `if !cancel_requested`).
3. A grace-window deadline (`CANCEL_GRACE = 15s`) that only arms after
   the cancel signal lands.

On cancel: send `ltx.video.render.cancel` RPC, keep consuming
notifications, finish cleanly when the worker emits
`ltx.video.error{code:RENDER_CANCELLED}` (-32107). If the worker
doesn't ack within 15s, the deadline branch fires `Cancelled` and the
lease is force-released.

### Status-clobber bug caught + fixed

Live smoke caught: the outer `spawn_render` error handler was
overwriting the `cancelled` row (already set by `run_via_lease`'s
inner cleanup) with `failed` because `RenderCancelled` returns
`Err(...)`. Fixed by matching the variant in `spawn_render` and
skipping the failure write when the error is the expected cancel
sentinel.

### Tests

`runner.rs` `#[cfg(test)] mod tests` — 4 new unit tests using
in-memory SQLite + a non-existent lease factory (registry ops don't
touch either):

- `cancel_unknown_run_returns_not_in_flight`
- `cancel_signals_registered_canceller` — proves Notify wakes the
  parked task.
- `cancel_is_idempotent_after_registry_cleanup`
- `cancel_targets_only_requested_run_id` — kept-waiter must NOT wake.

Test-only helper `Runner::register_test_canceller` lets tests inject
a `Notify` without going through `spawn_render`.

## Validation gates

| Gate | Status |
|---|---|
| `cargo clippy -p nexus-video-ltx23-extension --all-targets -- -D warnings` | ✓ clean |
| `cargo test -p nexus-video-ltx23-extension --lib` | ✓ 26/26 (was 22, +4) |
| `cd extensions/builtin/nexus-video-ltx23/worker && uv run python -m pytest tests/` | ✓ 31/31 |
| `bash extensions/builtin/nexus-video-ltx23/scripts/audit-boundary.sh` | ✓ PASS |
| Live host smoke (4-segment fake render, cancel mid-flight) | ✓ status=cancelled at 25%, 1/4 segments preserved |

## Live smoke evidence

```bash
# 4-segment render with 2.5s per segment via fake delay
POST /renders {"duration_seconds":12} → run_id=01KRGAX4WZ9914KR3H396VRC0P
sleep 2
GET /renders/01KRGAX4… → status=rendering progress=0.0

POST /renders/01KRGAX4…/cancel → HTTP 202

sleep 3
GET /renders/01KRGAX4… → status=cancelled progress=25.0 completed_segments=1/4

host log:
  INFO runner: cancel signalled to worker  run_id=01KRGAX4…
  INFO runner: render cancelled            run_id=01KRGAX4…
```

The Python worker subprocess exited at the segment boundary. Lease was
released. DB row reflects the partial completion (segment 0 finished
just before cancel landed) rather than discarding the work.

## Files touched

- `extensions/builtin/nexus-video-ltx23/rust/src/runner.rs`
  - `CancelRegistry = Arc<Mutex<HashMap<String, Arc<Notify>>>>`
  - `Runner::cancel(run_id) -> CancelOutcome`
  - `run_via_lease` accepts `Arc<Notify>` + 3-way `select!`
  - `NotificationOutcome::Cancelled` variant + RENDER_CANCELLED -32107
    re-mapping
  - `spawn_render` error handler skips clobber on `RenderCancelled`
  - 4 new unit tests + test-only `register_test_canceller`
- `extensions/builtin/nexus-video-ltx23/rust/src/api.rs`
  - `cancel_render` now calls `Runner::cancel` first, only flips DB
    when no live task exists (`NotInFlight`)

No host-path changes. Boundary audit clean.

## What's still open from Rung 7

- **7A** real-GPU P0-T001 spike (needs 16 GB NVIDIA GPU — user-driven).
- **7C** wire `rife_ncnn_vulkan_python` frame-by-frame loop.
- **7F** open the PR (everything else is shippable).
