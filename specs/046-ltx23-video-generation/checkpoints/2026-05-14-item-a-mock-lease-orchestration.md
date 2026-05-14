# Item A close — 2026-05-14 — mock-lease orchestration tests

**HEAD on branch**: `55803fd` (one commit beyond the prior session
`8f4baed`)
**Branch**: `claude/unruffled-perlman-dd12e1`
**Origin/main**: `dd79ba8` (merge commit folding `55803fd` into the
prior main tip `dda5f04`)
**Worktree**: `D:\Workspace\repos\nexus-dnn\.claude\worktrees\unruffled-perlman-dd12e1`

## What landed this arc

Single commit `55803fd test(046): mock-lease orchestration covers
Rung 7L restart loop` — Item A from the
[2026-05-14-resume-prompt.md](2026-05-14-resume-prompt.md) backlog.

Closes the deferred entry in the prior session-close checkpoint:

> 2. **End-to-end mock-lease orchestration test** — the component-
>    level coverage (latch state machine, payload trimming, etc.) is
>    complete; the multi-attempt outer loop's lease-acquire / break-
>    on-RestartRequired choreography would need a mockall-driven
>    `BackendRuntimeLease` trait. Medium effort, real value.

Mockall was *not* used — hand-rolled `FakeLease` /
`FakeLeaseAcquirer` doubles read cleaner against
`subscribe_notifications -> broadcast::Receiver`. Mockall's
stateless `.returning()` model doesn't compose well with
broadcast-channel semantics. Decision documented inline + in the
commit body.

### Refactor (extension-internal only)

| Change | File | Lines |
|---|---|---|
| New `LeaseAcquirer` async trait | `lease.rs` | +22 |
| `impl LeaseAcquirer for LtxLeaseFactory` delegating to inherent `acquire` | `lease.rs` | +6 |
| `RunnerConfig::factory: Arc<dyn LeaseAcquirer>` (was `Arc<LtxLeaseFactory>`) | `runner.rs` | 1 |
| Two callsites `acquire(...)` → `acquire_lease(...)` | `runner.rs` | 2 |
| `serial_test = "3"` added to `[dev-dependencies]` | `Cargo.toml` | +3 |

Production wiring in `register.rs` was untouched — the
`Arc::new(LtxLeaseFactory::new(...))` literal coerces transparently
into the trait-object field via the standard `Arc<T> -> Arc<dyn Trait>`
unsized coercion. Verified by 74/74 tests + clippy clean.

### Test infrastructure (~470 lines under `tests::orchestration`)

- `FakeLease` implements `BackendRuntimeLease` directly. Each
  instance owns a `broadcast::Sender<LeaseNotification>` the test
  drives + AtomicUsize counters for subscribe/release lifecycle
  assertions. `send_rpc` just acks; the test side does all worker
  emulation through broadcasts.
- `FakeLeaseAcquirer` implements `LeaseAcquirer`. Records every
  acquired lease's handle for the test to drive. Signals new
  acquires via a `Notify` so the test doesn't busy-poll.
- `apply_test_migrations` inline helper applies the 4 migration SQL
  scripts to an in-memory SQLite pool (the extension's
  `register::apply_migrations` is private; small duplication for
  test isolation).
- `linear_plan(n)` builds a `RenderPlan` with `n` deterministic
  4-second segments and the `nexus.video.ltx23.fake` profile.
- `insert_test_run` + `note` + `drive_segment` helpers keep test
  bodies readable.

### Tests added

1. **`rung7l_outer_loop_resumes_after_one_breach`**
   - 4-segment plan, default `max_restarts=3`.
   - Lease 1: drive seg 0 → memory_stats with `num_ooms=7` (trips
     default cap=1) → drive seg 1 (consumes latch →
     `RestartRequired{last_completed_segment:1}`).
   - Lease 2: drive seg 2, seg 3, emit `done` with a pre-staged
     `final.mp4` inside workdir.
   - Asserts: `run_via_lease` returns `Ok(())`, DB row shows
     `restart_count=1`, `status="completed"`, `acquire_count=2`,
     both leases released exactly once.

2. **`rung7l_outer_loop_halts_when_restart_budget_exhausted`**
   - 6-segment plan, `NEXUS_VIDEO_LTX23_VRAM_MAX_RESTARTS=1`.
   - Lease 1: seg 0 → breach → seg 1 → `RestartRequired`
     (restart_attempts becomes 1, ≤ budget; persisted +1).
   - Lease 2: seg 2 → breach → seg 3 → `RestartRequired`
     (restart_attempts becomes 2, > budget=1; break with
     vram_supervisor halt; no further restart_count bump).
   - Asserts: returns `Err(RenderFailed)` with "vram supervisor
     halt after 2 restart" substring, DB row shows
     `restart_count=1`, `error_code="vram_supervisor"`,
     `status="failed"`, `acquire_count=2`, both leases released.

### Review-driven fix landed before commit

Rust-reviewer flagged HIGH on env-var racing under cargo's default
parallel runner. Three pre-existing `max_restarts_from_env_*` tests
were already racy (independent of this PR); adding a fourth test
that holds the var set for the duration of an async render would
widen the window meaningfully. Fix:

- New dev-dep: `serial_test = "3"`
- All four env-mutating tests now carry
  `#[serial_test::serial(max_restarts_env)]` so they run
  sequentially even with `--test-threads > 1`.

## Validation gate (all green, run before commit)

| Gate | Result |
|---|---|
| `cargo clippy -p nexus-video-ltx23-extension --all-targets -- -D warnings` | clean |
| `cargo test -p nexus-video-ltx23-extension --lib` | **74 passed** (was 72) |
| `bash extensions/builtin/nexus-video-ltx23/scripts/audit-boundary.sh` | PASS |
| `uv run python -m pytest tests/ -q` (worker) | 111 passed |
| `pnpm tsc --noEmit` (web) | clean |
| `cargo fmt --check` (whole crate) | pre-existing drift in `api.rs` / `lease.rs` / `vram_supervisor.rs` — **not my code**, grandfathered |

No worker, web, or host changes. Boundary clean: every new trait
and test stays inside `extensions/builtin/nexus-video-ltx23/rust/`.

## Branch state at arc close

- **HEAD**: `55803fd` (one commit beyond `8f4baed`, pushed)
- **Origin main**: `dd79ba8` (the merge of `55803fd` into the prior
  `dda5f04`)
- **Worktree**: clean
- The pre-existing local-main WIP files
  (`apps/web/src/hooks/use_model_load_state.ts`, etc.) remain
  untouched — none of them are in spec 046's reach.

## What's still deferred (priority order)

| # | Item | Priority | Why |
|---|---|---|---|
| 1 | Notification-batch coalescing for high-segment renders | HIGH | Perf — 60+ segment renders fan out 180-240 serialised DB writes today; batching with a 50ms flusher cuts to ~5/sec |
| 2 | Worker-side `resumed_from_segment` diagnostic + `runtime.resume_acknowledged` notification | MED | Operator UX — lets log-correlation succeed without inferring restarts from the runner's badge |
| 3 | Per-restart breach reason in UI tooltip (migration 005 + DTO field) | MED | Operator UX — the badge says "restart 1/3" but no explanation |
| 4 | Real-GPU restart smoke test on RTX 5070 Ti | MED | Confidence — `NEXUS_VIDEO_LTX23_VRAM_MIN_FREE_MB=999999` should force a real breach; needs hardware access |
| 5 | Workspace clippy noise (grandfathered fmt drift in api.rs / lease.rs / vram_supervisor.rs) | LOW | `cargo fmt --check` shows pre-existing drift unrelated to this work |

Next item to tackle: **Item B (notification-batch coalescing)** —
the new mock-lease infrastructure from this arc makes a `60-segment
load test` test much easier to write. Same `FakeLease` pattern, just
fire 240 notifications and assert the DB sees < N writes within the
flush window.

## Next-session pointer

The structured resume prompt at
[2026-05-14-resume-prompt.md](2026-05-14-resume-prompt.md) is still
valid; just update the "Branch state at session start" block to
reflect `55803fd` instead of `f59475f` (already done in
`MEMORY.md`'s index pointer).
