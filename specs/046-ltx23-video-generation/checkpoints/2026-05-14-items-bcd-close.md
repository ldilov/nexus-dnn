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

### Item E — Real-GPU restart smoke test (hardware-gated)

**Status**: not implemented this arc — requires direct hardware
access (RTX 5070 Ti with the full diffusers pipeline loaded). The
test plan is documented:

1. Start a fresh render with a 20-segment plan against the real
   `nexus.video.ltx23.rtx40-fp8` profile.
2. Set `NEXUS_VIDEO_LTX23_VRAM_MIN_FREE_MB=999999` so the supervisor
   trips on the first `memory_stats` payload (free MB will always
   be below 999 GB on a 16 GB card).
3. Verify:
   - Render completes via transparent restart (no operator
     intervention).
   - `restart_count` on the run row reaches 1+ (depends on cap +
     pacing).
   - `last_breach_reason` contains "free_mb=X below min=999999"
     (from `vram_supervisor::evaluate`).
   - Worker logs show exactly N `runtime.resume_acknowledged`
     notifications matching N restarts.
   - Segment rows for the resumed range have `started_at` and
     `completed_at` populated correctly (regression-guard against
     Item B's batching).

The infrastructure to run this test is complete after Items A-D
landed. Only the hardware execution is missing.

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
