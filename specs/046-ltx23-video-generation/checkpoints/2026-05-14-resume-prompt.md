# Resume prompt — Spec 046 (LTX-2.3 video extension) — 2026-05-14 session close

**Paste the section below into a fresh Claude Code session.** It is
self-contained — no need to attach prior transcripts. The prompt
follows the meta-prompt pattern: role → context → phases → output
spec → uncertainty disclaimer.

---

## Role

You are the **continuing implementation lead** for `spec 046 —
LTX-2.3 video generation extension` in the `nexus-dnn` Rust + Python
+ React monorepo. Spec 046 is **functionally complete** and merged
to `main`. Your job is to pick from the documented deferred backlog,
ship one clean vertical slice, validate, commit, and merge to
`main` via local fast-forward.

Operate as a **semi-autonomous engineer**: proceed when the path is
clear, ask only when ambiguity would cause rework. Run the full
validation gate after every commit. Merge to `main` after each
clean arc (the user prefers main-tracking, no long-lived feature
branches).

## Branch state at session start

- **Worktree**: `D:\Workspace\repos\nexus-dnn\.claude\worktrees\unruffled-perlman-dd12e1`
- **Branch**: `claude/unruffled-perlman-dd12e1` (pushed)
- **HEAD**: `f59475f` (`feat(046): surface Rung 7L restart_count on the run row + UI badge`)
- **`origin/main`**: also at `f59475f` (branch + main fully synced)
- **34 commits ahead of pre-spec baseline** (`d009334`)
- **Working tree**: clean
- **Pre-existing WIP on local main** (unrelated to spec 046): some
  files modified in `apps/web/src/hooks/`, `apps/web/src/layout/local_llm/`,
  `crates/nexus-tui/`, `extensions/builtin/local-llm/`. Don't touch
  them — they belong to a different work stream.

**Read first** before doing anything:
`specs/046-ltx23-video-generation/checkpoints/2026-05-14-session-close.md`
— that file documents the 3 commits from the prior session, the
deferred backlog, and the cross-session-continuity memory notes.

## Phase 0 — Sanity gate (MANDATORY)


```bash
cd D:/Workspace/repos/nexus-dnn/.claude/worktrees/unruffled-perlman-dd12e1
git log --oneline -1                                                # → f59475f
git status --short                                                  # → clean
cargo clippy -p nexus-video-ltx23-extension --all-targets -- -D warnings
cargo test -p nexus-video-ltx23-extension --lib                     # → 72/72
bash extensions/builtin/nexus-video-ltx23/scripts/audit-boundary.sh # → PASS
cd extensions/builtin/nexus-video-ltx23/worker && uv run python -m pytest tests/ -q  # → 111/111
cd ../web && pnpm tsc --noEmit                                      # → clean
cd ../web && pnpm build                                             # → 376 KB JS
cd ../../../..
```



If any of those fails — STOP and read the 2026-05-14 session-close
checkpoint; something regressed.

## Phase 1 — Pick ONE item from the deferred backlog

In priority order:

### Item A — End-to-end mock-lease orchestration test (Recommended)

**Goal**: verify the Rung 7L multi-attempt outer loop choreography
(lease A → breach → lease B → done) without GPU hardware. The
component-level tests already cover `BreachLatch`, `build_render_params_offset`,
notification routing, env parsing, and the `RestartRequired` outcome
shape — but the "lease lifecycle across restart" path is untested.

**Steps**:
1. Add `mockall = "0.13"` to `extensions/builtin/nexus-video-ltx23/rust/Cargo.toml`
   under `[dev-dependencies]`.
2. Look at `crates/nexus-backend-runtimes/src/generic/leases/trait_def.rs`
   for the `BackendRuntimeLease` trait shape. The trait is the
   abstraction the runner depends on; mock it.
3. Build a fake `LtxLeaseFactory` test double that hands out mock
   leases backed by a `broadcast::Sender` for synthetic notifications.
   Each acquire returns a new mock; track acquire count for assertions.
4. Write a test that:
   - Configures supervisor thresholds to trip on a known
     `memory_stats` payload
   - Spawns `run_via_lease` against the fake factory
   - Drives the broadcast: `segment.started 0` → `segment.completed 0`
     → `memory_stats {breaching}` → `segment.completed 1` → expect
     restart (factory acquires second lease) → on second lease send
     `done` → expect `Ok(())` from run_via_lease, `restart_count = 1`
     persisted in DB
5. Add a second test that injects 4 breaches in a row and asserts
   the run terminates with `error_code = "vram_supervisor"` after
   `MAX_RESTARTS = 3` exhausted.

**Expected commit message**: `test(046): mock-lease orchestration covers Rung 7L restart loop`

### Item B — Notification-batch coalescing for high-segment renders

**Goal**: reduce DB round-trips for 60+ segment renders. Today each
SEGMENT_STARTED / SEGMENT_COMPLETED triggers an `await` against
SQLite. At 60 segments × 3-4 notifications each + memory_stats
post-segment, that's ~180-240 serialised writes per render. The
fix: batch with a periodic flusher (50ms tick) that coalesces
status updates per (run_id, segment_index).

**Steps**:
1. New `notification_buffer.rs` module under `rust/src/` with a
   `NotificationBuffer { pending: Mutex<HashMap<(String, i64), String>>, flush_interval }`
2. `flush_loop` task: every 50ms, drain map → batch `update_segment_status`
   in a single transaction
3. `run_attempt`'s notification handler enqueues instead of awaiting
   the DB directly
4. Tests:
   - Pending map merges multiple status updates for the same
     (run, segment) — latest-wins
   - Flush is atomic (transaction)
   - Cancel pre-empts the flusher cleanly

### Item C — Worker-side `resumed_from_segment` diagnostic

**Goal**: when the worker sees `resumed_from_segment > 0` in the
payload (set by `build_render_params_offset`), record it in
`DiffusersRunState` and emit a `runtime.resume_acknowledged`
notification so operators can correlate worker logs with the
runner's restart counter.

**Steps**:
1. `worker/src/ltx_video_worker/pipeline_diffusers.py` reads the
   field in `render_start` and stashes it on `rs.resumed_from`
2. Emit a one-time `runtime.resume_acknowledged { run_id,
   resumed_from_segment }` notification before the first
   SEGMENT_STARTED
3. Same wiring in `pipeline_fake.py`
4. New pytest covering both pipelines

### Item D — Per-restart breach reason in UI tooltip

**Goal**: the badge currently shows "restart 1/3" but no
explanation. Add a DTO field for the most recent breach reason +
render as a tooltip on the badge.

**Steps**:
1. Migration 005 adds `last_breach_reason TEXT` to runs
2. Runner persists the reason from `RestartRequired` alongside
   `increment_restart_count`
3. DTO + TS interface + React `title=` attribute on the badge

### Item E — Real-GPU restart smoke test

**Goal**: drive a real render with `NEXUS_VIDEO_LTX23_VRAM_MIN_FREE_MB=999999`
(forces supervisor breach on first memory_stats) on the RTX 5070 Ti
and verify the chain transparently restarts. **Needs hardware** —
skip if you don't have it.

## Phase 2 — Implementation

Follow standard discipline:
- Use **Skill** tool for `superpowers:using-superpowers` if it
  applies.
- **TodoWrite** for any multi-step task. Mark completed immediately.
- For complex implementation, use **planner** agent first.
- Use **code-reviewer** + **rust-reviewer** / **python-reviewer**
  agents on the diff before committing.

Hard rules:
- No `--no-verify` git commits. Block-no-verify hook will catch.
- No force-push to `main`. Force-with-lease on the feature branch is OK.
- Cross-worktree work: this branch lives in `unruffled-perlman-dd12e1/`.
  Operate via absolute paths if your session was opened elsewhere.

## Phase 3 — Verification gate (every commit must pass)


```bash
cd D:/Workspace/repos/nexus-dnn/.claude/worktrees/unruffled-perlman-dd12e1
cargo clippy -p nexus-video-ltx23-extension --all-targets -- -D warnings
cargo test -p nexus-video-ltx23-extension --lib
bash extensions/builtin/nexus-video-ltx23/scripts/audit-boundary.sh
cd extensions/builtin/nexus-video-ltx23/worker && uv run python -m pytest tests/ -q
cd ../web && pnpm tsc --noEmit && pnpm build
cd ../../../..
```



Additionally:
- **Worker pyproject changes**: `cd worker && uv lock` + commit the lockfile.
- **Web bundle**: `pnpm build` rebuilds `dist/`. Commit the dist.
- **Boundary**: if a literal slipped into the host tree, fix it
  BEFORE committing rather than adding to the allowlist.

## Phase 4 — Commit + merge to main

The user's pattern this arc:
1. Commit on the feature branch with a verbose subject + body
   (3-line summary + per-file change list + validation gate block).
2. Push.
3. Switch to the main repo at `D:/Workspace/repos/nexus-dnn` (the
   parent of the worktree) and fast-forward `main` to the branch tip.
4. Push `main` to `origin`.

The local main may have unrelated WIP files modified — fast-forward
is still safe because the branch only touches
`extensions/builtin/nexus-video-ltx23/`.


```bash
# After pushing the branch:
cd D:/Workspace/repos/nexus-dnn
git fetch origin
git merge origin/claude/unruffled-perlman-dd12e1   # fast-forward
git push origin main
```


## Phase 5 — Checkpoint

When stopping:
1. **Commit + push** the current diff.
2. **Merge to main** + push origin/main.
3. **Append** a fresh checkpoint to
   `specs/046-ltx23-video-generation/checkpoints/` with today's
   date + the rung/item suffix. Mirror the structure of
   `2026-05-14-session-close.md`.
4. **Update** this resume prompt's "Branch state at session start"
   block with the new HEAD SHA + commit list.

## Phase 6 — Output specification

When you finish, output one tight summary:
- **Single sentence** stating which item landed + commit SHA.
- **Bullet** list of 3-5 most important code changes (file path + one-line role).
- **Validation table**: clippy / cargo test / pytest / boundary / pnpm build.
- **Next-session pointer**: which deferred item to tackle next + why.

Do NOT write a paragraph-essay. Do NOT restate the item description.
Do NOT include the full diff inline.

## Expert assignments

- **Architecture decisions** (new module shape, trait API):
  `architect` agent.
- **Rust review** (clippy lint discipline, borrow-checker
  refactorings): `rust-reviewer` agent on the diff before commit.
- **Python review** (PEP 8, type hints, async pitfalls):
  `python-reviewer` agent.
- **Security review** (only if touching auth / input parsing / new
  HTTP routes): `security-reviewer` agent.
- **Test design** (especially for mock-lease orchestration in Item A):
  `tdd-guide` agent for the red → green flow.

## Uncertainty disclaimer

If you encounter ANY of the following — STOP and explicitly report it
rather than guessing:

- A repo-convention conflict. Read existing files in the same role
  to ground the answer.
- An upstream-broken dependency. Document precisely + escape via the
  lowest-effort workaround OR defer the item.
- A divergence between what this prompt says and what the
  `2026-05-14-session-close.md` checkpoint says — the checkpoint is
  canonical (snapshot of reality at session end).
- A test that passes when it shouldn't. Tighten the mock before
  claiming green.

Memory file: `MEMORY.md` index says HEAD is `f59475f`. If your
sanity gate disagrees, somebody landed work between sessions;
reconcile before proceeding.

---

## Quick reference for the next session

| Need | Where |
|---|---|
| Architecture overview | `2026-05-14-session-close.md` |
| All acceptance criteria | `specs/046-ltx23-video-generation/spec.md` |
| Rung 7L design + restart loop | `runner.rs` (~lines 380-540, multi-attempt outer loop) |
| BreachLatch state machine | `runner.rs` (~lines 660-690) |
| build_render_params_offset | `runner.rs` (~lines 1020-1080) |
| restart_count migration | `storage/migrations/004_runs_restart_count.sql` |
| `renderRestartBadge` UI | `web/src/App.tsx` (~lines 1230-1260) |
| Boundary rule | `.claude/rules/host-extension-boundary.md` |

## My pick of next item

**Item A (end-to-end mock-lease orchestration test)** —
component-level coverage is complete; the restart-loop choreography
is the last untested piece of Rung 7L. mockall setup is a one-time
investment that unblocks similar tests for future runner work
(notification-batch coalescing in Item B would use the same
infrastructure).
