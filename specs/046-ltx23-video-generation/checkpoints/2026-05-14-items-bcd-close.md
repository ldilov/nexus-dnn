# Items B + C + D close — 2026-05-14

**Branch HEAD**: `1fcd38c` (3 feature commits beyond Item A's
`55803fd` + docs commit `50c5b45`)
**Origin/main**: `f21576f` (merge commit folding `1fcd38c` into the
prior main at `dd79ba8`)
**Worktree**: `D:\Workspace\repos\nexus-dnn\.claude\worktrees\unruffled-perlman-dd12e1`

## What landed this arc

Three feature commits closing the rest of the documented backlog
except the hardware-gated Item E. User said "all of them" so all
three shipped together; pushed individually to keep the diffs
reviewable.

| Commit | Item | Subject | Surface |
|---|---|---|---|
| `6e82e1c` | D | Per-restart breach reason tooltip on the restart badge | migration 005 + `RenderRunRow.last_breach_reason` + runner persists + DTO field + React `title=` attribute |
| `5af701b` | C | Worker emits `runtime.resume_acknowledged` for Rung 7L resumes | `Notifications.RESUME_ACKNOWLEDGED` + `DiffusersRunState` / `FakeRunState` `resumed_from_segment` + both `_render_loop` arms emit once before first segment + 3 pytest cases |
| `1fcd38c` | B | `notification_buffer` coalesces segment-status writes | new `notification_buffer.rs` module + `Repos::update_segment_status_batch` + wired into `RunnerConfig` + flush_now at terminal exits + 4 unit tests |

## Validation gate (run after each commit, all green)

| Gate | Item A end | Item D end | Item C end | Item B end |
|---|---|---|---|---|
| `cargo clippy --all-targets -- -D warnings` | clean | clean | clean | **clean** |
| `cargo test --lib` | 74/74 | 74/74 | 74/74 | **78/78** |
| `audit-boundary.sh` | PASS | PASS | PASS | **PASS** |
| `worker pytest` | 111/111 | 111/111 | **114/114** | 114/114 |
| `pnpm tsc --noEmit` | clean | **clean** | clean | clean |
| `pnpm build` | 376 KB | **376 KB** | 376 KB | 376 KB |

## Per-item notes

### Item D — breach reason tooltip (`6e82e1c`)

- Vertical slice across migration + Rust storage + Rust DTO + React.
- Runner persists `last_breach_reason` BEFORE the budget-exhausted
  check so even the halt-path DB row reflects the breach that ended
  the chain. One extra UPDATE per restart, negligible cost.
- React tooltip falls back to a generic message for runs that landed
  before migration 005 (the column is NULL for them).
- Orchestration tests in `runner::tests::orchestration` extended
  with new asserts that `last_breach_reason` survives both happy
  and halt paths.

### Item C — worker `resume_acknowledged` (`5af701b`)

- New `Notifications.RESUME_ACKNOWLEDGED` constant + both Python
  pipelines parse the host's `resumed_from_segment` defensively
  (`max(0, int(...))`, fall back to 0 on TypeError/ValueError).
- Each pipeline emits the ack exactly once, BEFORE the first
  SEGMENT_STARTED of the resumed chain. Operators correlate this
  against the host's `restart_count` to confirm the worker saw the
  offset the runner believes it sent.
- 3 new pytest cases on the fake pipeline — diffusers branch is
  structurally identical, fake coverage carries the contract.
- No host-side change required; the runner has been sending
  `resumed_from_segment` on restart payloads since the original
  Rung 7L commit.

### Item B — notification batching (`1fcd38c`)

- **Decision recorded**: NO latest-wins coalescing. A naive map
  keyed on (run_id, segment_index) would drop `started_at`
  timestamps when `started` + `completed` for the same segment
  land in the same 50ms window. Easy to trigger under the fake
  runtime fixture, and would break under high-throughput
  concurrent renders. Preserving every update in order through
  a `Vec` is cheap (~hundreds of bytes per render).
- Module shape: mpsc channel → batching task → single sqlx
  transaction per tick. `flush_now()` via a oneshot ack for
  manual drains at terminal-state boundaries.
- 4 unit tests cover: manual flush wins over tick, periodic tick
  fires without explicit call, started_at survives ordered batch
  (the regression-guard), drop-buffer drains final batch then
  exits cleanly.
- Wired through `RunnerConfig` — `register.rs` builds the buffer
  alongside the runner; flusher JoinHandle is detached (exits
  cleanly when runner drops at process exit). `handle_notification`
  enqueues via a new `enqueue_segment_status` helper (extracted to
  stay under clippy's 100-line cap).
- `run_via_lease` calls `flush_now()` once at terminal exit so
  polling clients see consistent state when the row flips to
  `completed`/`failed`/`cancelled`.

## Branch state at arc close

- 4 commits beyond Item A's `55803fd`:
  - `50c5b45` docs(046)
  - `6e82e1c` feat(046) Item D
  - `5af701b` feat(046) Item C
  - `1fcd38c` feat(046) Item B
- Branch + origin/main fully synced at `f21576f` (the final merge
  commit). Tree clean in the worktree.
- 39 commits ahead of pre-spec baseline `d009334`.
- Pre-existing local-main WIP files
  (`apps/web/src/hooks/use_model_load_state.ts`,
  `apps/web/src/layout/local_llm/inspector_panel.{css.ts,tsx}`,
  `crates/nexus-tui/src/controller.rs`,
  `extensions/builtin/local-llm/rust/src/chat/handlers.rs`,
  `extensions/builtin/local-llm/rust/src/chat/load_registry.rs`,
  `crates/nexus-tui/tests/inspector_click_resolution_test.rs`)
  remain untouched — none are in spec 046's reach.

## What's still deferred

### Item E — Real-GPU restart smoke test

**Status**: scripted, ready to run on hardware. See
`extensions/builtin/nexus-video-ltx23/scripts/smoke-vram-supervisor.sh`.

Usage:
```bash
# 1. Start the host with the impossible MIN_FREE_MB so the
#    supervisor trips on the first memory_stats event.
export NEXUS_VIDEO_LTX23_VRAM_MIN_FREE_MB=999999
cargo run -p nexus-core --release
# 2. From another shell, run the smoke test.
./extensions/builtin/nexus-video-ltx23/scripts/smoke-vram-supervisor.sh \
    --host http://127.0.0.1:8085 --profile rtx40-fp8 --duration 20
```

The script checks 4 acceptance criteria + a regression-guard for
Item B's no-coalescing rule:

1. final status == `completed` (chain finished via transparent
   restart, not failed/cancelled).
2. `restart_count >= 1` (the impossible MIN_FREE_MB env tripped
   the supervisor at least once).
3. `last_breach_reason` mentions `free_mb` (the threshold the env
   knob targets — proves the supervisor saw the breach the test
   intended to force).
4. `final_artifact_id` is present (worker DONE landed + runner
   copied the final.mp4 into place).
5. Bonus: every segment row has both `started_at` and `completed_at`
   populated. NULL on a completed segment would mean Item B's
   batching dropped the `rendering` write — exactly the regression
   the `ordered_started_then_completed_preserves_started_at` unit
   test guards against, here verified end-to-end.

Exit codes: 0 = PASS, 1 = real test failure, 2 = prereqs missing
(host unreachable, profile not installed, etc.).

Pre-flight (host-reachability + profile-install probes) is
verified non-hardware. The actual restart-loop test takes ~25 min
of real GPU time on a single RTX 5070 Ti at 832×480 / 8 inference
steps / 20-segment chain. Re-runnable any time.

### Other backlog (not in this prompt's scope)

- Worker-side per-segment-step diagnostic event throttling
  (current TRACE-level log may spam under torch.compile)
- UI: render the `last_breach_reason` as a dedicated badge
  rather than just a tooltip (operator wants it visible
  without hover)
- Migration squash — five migrations for one feature path is
  cosmetic clutter; could fold 4+5 into a single migration on
  the next major bump

## Memory pointer

`MEMORY.md` index will need:
- New entry pointing at this checkpoint
- Update of the existing 2026-05-14 Item A close pointer to
  cross-link this arc's continuation
