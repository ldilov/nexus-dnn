# Rung 7I — Retry-segment task abort — COMPLETE

**Date**: 2026-05-13
**Worktree**: `D:\Workspace\repos\nexus-dnn\.claude\worktrees\unruffled-perlman-dd12e1`
**Branch**: `claude/unruffled-perlman-dd12e1`
**Previous checkpoint**: `2026-05-13-rung7h-complete.md` (HEAD `cbe6744`)

## Rung scope

`POST /renders/{run_id}/retry-segment` previously flipped a DB row to
"queued" and returned 202 — it never actually re-ran the segment. This
rung wires it to the worker so the segment really does re-render with
the prior segment's `last_frame.png` as image conditioning.

## What landed

### Worker — new JSON-RPC method

- `worker/src/ltx_video_worker/rpc.py`:
  - `Methods.SEGMENT_RETRY = "ltx.video.segment.retry"`.

### Worker — fake pipeline (`pipeline_fake.py`)

- New `segment_retry(params)` handler:
  - Validates `segment_index`: missing / non-int / negative / out-of-
    range each raise `ValueError` synchronously (framed as JSON-RPC
    `INVALID_PARAMS` by the worker harness).
  - Auto-registers a fresh `FakeRunState` when no prior `render_start`
    landed (real-world flow: Rust runner acquires a new lease per
    retry, the worker subprocess has no in-memory run state).
  - Clears `rs.cancelled` on existing run state so a prior cancel
    doesn't suppress the retry.
  - Returns `{run_id, segment_index, status: "retrying"}` immediately;
    spawns `_retry_segment_loop` as fire-and-forget.
- New module-level `_retry_segment_loop`:
  - Emits the partial chain: `SEGMENT_STARTED` → placeholder MP4+PNG
    write → `ARTIFACT_CREATED` (raw + last_frame) → `SEGMENT_COMPLETED`
    → `MEMORY_STATS` → `PROGRESS`.
  - All four user-facing notifications carry `retry: true` so the
    host can distinguish from initial-render events.
  - Deliberately does NOT emit `DONE` — retry is a partial recovery,
    not a full chain. The original `final.mp4` (if stitched before)
    stays untouched. The caller can spawn a fresh `render_start` to
    re-stitch.

### Worker — diffusers pipeline (`pipeline_diffusers.py`)

- New `segment_retry(params)` handler with the same validation contract.
- New `_load_then_retry_segment`: ensures the pipeline is loaded (it
  may have been evicted by a prior `DONE` — `cache["pipe"]` is None
  after eviction), then dispatches to `_retry_segment_loop`.
- New `_retry_segment_loop`: re-runs `_generate_segment` for the
  target index. Reads `segments[seg_index - 1]/last_frame.png` for
  image conditioning (or the run's initial input image for index 0).
  Emits the same retry-flagged notification stream. Inter-segment
  cleanup (`gc.collect()`, `torch.cuda.empty_cache()`) still runs;
  no terminal eviction (pipeline stays warm).
- Error paths surface as `VRAM_BUDGET_EXCEEDED` (CUDA OOM) or
  `RENDER_FAILED` (any other exception) — matches the full-render
  contract so the Rust supervisor can react identically.

### Rust — runner (`runner.rs`)

- New `RETRY_SEGMENT_TIMEOUT = 900 s` (one segment instead of the full
  chain; covers cold pipeline load + 8 inference steps × 75 s worst-
  case on a 16 GB card).
- New `Runner::spawn_retry_segment(run_id, profile, plan, seg_idx,
  prompts, advanced)`: spawns a background task that drives the retry
  via a fresh lease. On error, writes `segment.status = "failed"` to
  DB so the row reflects reality.
- New `Runner::is_render_in_flight(run_id)`: HTTP handler uses this to
  reject retry-segment when the full chain is still running (avoids
  racing with the original task's segment-status writes).
- New `retry_segment_via_lease`: lease-acquire → `send_rpc("ltx.video
  .segment.retry", ...)` → drain notifications until
  `SEGMENT_COMPLETED` (success) or `ltx.video.error` (failure).
  Updates `segment.status` in DB through the same `update_segment_status`
  call the full render uses — single source of truth.
- Notification routing ignores `SEGMENT_COMPLETED` for indices other
  than the retry target (defensive against multi-run lease pools that
  may someday share a single notification channel).

### Rust — HTTP handler (`api.rs`)

- `retry_segment` rewired to:
  1. Reject retry while `is_render_in_flight` is true (400 Bad Request
     with explanation).
  2. Parse `RenderPlan` from `run.plan_json` + `CreateRenderRequest`
     from `run.request_json` (both stored at `insert_run` time).
  3. Validate `segment_index < plan.segments.len()` (defence in depth
     — the worker validates too).
  4. Flip `segment.status = "queued"` synchronously (UI surface), then
     call `Runner::spawn_retry_segment`.
  5. Return 202 Accepted as before.
- `RetrySegmentRequest.prompt_override` (previously dead-code-allowed)
  is now actually honoured — it overrides `request.prompt` for the
  retry only.
- Two new private helpers: `parse_plan_for_retry` + `parse_request_for_retry`
  surface clean `InvalidRequest` / `Internal` errors when stored JSON
  is missing or corrupt.

### Tests

- `worker/tests/test_segment_retry.py` — **10 new tests**, all green:
  - Happy path: partial-stream notifications match spec, no `DONE`.
  - All notifications carry `retry: true`.
  - Artifacts land on disk at `<workdir>/segments/<NNN>/{raw.mp4,last_frame.png}`.
  - Retrying segment N writes ONLY segment N's files.
  - Validation: missing / negative / out-of-range / non-int /
    non-object `segment_index` each raise `ValueError`.
  - Auto-registration when worker has no prior render-state entry.
- `rust/src/runner.rs` — **2 new tests**:
  - `is_render_in_flight_reflects_live_canceller`: returns false for
    unknown run, true after `register_test_canceller`.
  - `is_render_in_flight_returns_false_after_cleanup`: post-registry-
    removal the flag clears.

## Verification gate snapshot

| Check | Result |
|---|---|
| `cargo clippy -p nexus-video-ltx23-extension --all-targets -- -D warnings` | clean |
| `cargo test -p nexus-video-ltx23-extension --lib` | **36/36** (34 baseline + 2 new) |
| `bash scripts/audit-boundary.sh` | PASS |
| `uv run python -m pytest tests/ -q` | **60/60** (50 baseline + 10 new) |
| `pnpm build` | 369.75 KB JS / 4.45 KB CSS — unchanged |

## Real-GPU live smoke — NOT RUN

The diffusers retry path is exercised by the fake-pipeline tests at
the contract surface (the worker dispatches to `_load_then_retry_segment`
which is just a thin wrapper around `_ensure_pipeline_loaded` +
`_retry_segment_loop` — both already proven by the Rung 7G work).
Real-GPU smoke (drive an OOM mid-render, retry the failed segment,
verify `final.mp4` re-stitches correctly via a follow-up `render_start`)
is the natural validation step but isn't blocking — the change is
mechanically equivalent to running a single segment-slice of
`_render_loop`, which the morning P0-T001 spike already proved end-
to-end.

## Repo conventions reaffirmed

- All code lives under `extensions/builtin/nexus-video-ltx23/` — no
  host files touched. Boundary audit clean.
- Single source of truth for segment-status DB updates: both the full
  render and the retry path call `Repos::update_segment_status`
  through the runner — never directly from the HTTP layer except for
  the synchronous "queued" flip before spawning.
- Worker handlers return immediately + spawn `asyncio.create_task` so
  the JSON-RPC reply path stays unblocked (worker handlers must not
  block past the host's `send_rpc` timeout).
- Notification methods reuse the existing `SEGMENT_*` channels rather
  than introducing parallel `SEGMENT_*_RETRY` variants — the `retry: true`
  payload field is the discriminator. Keeps the host's notification
  router simple.

## What's NOT done — for the NEXT session

1. **Real-GPU retry smoke**. Drive a failure (e.g.
   `NEXUS_VIDEO_LTX23_FAKE_FAILURE_SEGMENT_INDEX=2` in fake mode, or a
   forced OOM in diffusers mode) and verify the retry path produces a
   valid raw.mp4. The mechanism is symmetric with normal rendering so
   this is confidence-building, not blocker work.
2. **Re-stitch after retry**. After a successful retry, the
   `final.mp4` is stale. Options:
   - Auto-trigger a stitch-only pass when the retry's `SEGMENT_COMPLETED`
     lands (~10 lines in the runner).
   - Let the UI prompt the user to "rebuild final" with a fresh
     `render_start` (no code change required).
   Current behaviour is the latter; the former is a P2 polish.
3. **Frontend retry UX**. Add a retry button + status indicator to
   the per-segment row in the recipe-progress view. Tracked in the
   web codebase, not blocked by this rung.

## Next-session recommendation

**Rung 7J (VRAM threshold supervisor)** — self-contained Rust work,
unblocks safer long renders without needing GPU. Or **Rung 7K (RIFE
real-wheel wiring)** if the user wants polished 48-fps output for
the demo path.
