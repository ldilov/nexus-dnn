# feat(046): LTX-2.3 video generation extension (Rungs 1–7J)

Closes spec [046-ltx23-video-generation](specs/046-ltx23-video-generation/spec.md).

Ships the full `nexus.video.ltx23` extension: recipe UI, install
pipeline, JSON-RPC worker, multi-segment renders, scene-chain
conditioning, real-GPU validation, retry-segment recovery, and a
VRAM-supervisor safety net. Validated end-to-end on RTX 5070 Ti (16 GB)
with `dg845/LTX-2.3-Distilled-Diffusers` BF16 weights via sequential
CPU offload (peak 4.7 GB VRAM, 13.7 s/step).

## Architecture

```
HTTP (axum)                       JSON-RPC stdio (NDJSON)
─────────────                     ──────────────────────
POST /renders          ──┐        ltx.runtime.health
GET  /renders/{id}     ──┤        ltx.video.models.list
POST /renders/{id}/cancel ─┤      ltx.video.plan.validate
POST /renders/{id}/retry-segment──┤  ltx.video.render.start
GET  /artifacts/{id}   ──┤   ┌──▶ ltx.video.render.cancel
POST /profiles/{id}/install─┤    │ ltx.video.segment.retry  (Rung 7I)
                          │    │
              Runner ─────┴────┘  Notifications:
              + VramSupervisor    ltx.video.{segment.started,
              + Retry registry     segment.step, segment.completed,
                                   artifact.created, progress,
                                   done, error}
                                  runtime.memory_stats
                                  → VramSupervisor (Rung 7J)
```

## What's in the PR

### Rungs 1–6 (foundation, prior sessions)
- Rung 1: Extension scaffold + fake runtime end-to-end.
- Rung 2: Recipe UI bundle (web/) + storage/manifest fixes.
- Rung 3: Install pipeline runs end-to-end + UI dependency banner.
- Rung 4: Real Python subprocess + lease + JSON-RPC notifications.
- Rung 5: Real diffusers pipeline + per-profile model resolver.
- Rung 6: Per-profile model install + RIFE interpolation skeleton.

### Rung 7B – Unified runtime install CTA
`uv sync` + weights snapshot resolved against the extension's
manifest, single button in the recipe form.

### Rungs 7D + 7E – Cancel + OpenAPI parity
Cancel actually cancels (notify-based with 15s grace). OpenAPI
spec for every endpoint added in Rungs 6+7B.

### Rung 7A + 7G – Real-GPU enablement + spike
First prompt-matching frames generated on RTX 5070 Ti. CUDA 12.8
wheels + LTX2ImageToVideoPipeline + runtime-profile probe + the
`enable_sequential_cpu_offload` discovery that makes 22B BF16 fit
in 16 GB. Documented in [verification/p0-t001-results.md](specs/046-ltx23-video-generation/verification/p0-t001-results.md)
with the 4 dead-end paths (bnb 4-bit, Abiray GGUF, Lightricks FP8,
quanto INT8) that didn't work and why.

### Scene-chain + spec gaps
Image conditioning across segments + character/style anchors +
Idempotency-Key + step heartbeats + real profile-install state.

### Rung 7H – Custom GGUF transformer loader (infrastructure)
Generic, schema-validating loader bypasses the diffusers
0.39.0.dev0 `from_single_file` utf-8-sniff regression. Loads via
diffusers' own `load_gguf_checkpoint` + meta-init +
`_replace_with_gguf_linear`. Raises `GGUFSchemaMismatch` cleanly
when the GGUF schema doesn't align with the base config (the
Abiray Q4_K_M reality today — needs a future diffusers commit
bump to use). Documented in
[checkpoints/2026-05-13-rung7h-complete.md](specs/046-ltx23-video-generation/checkpoints/2026-05-13-rung7h-complete.md).

### Rung 7I – Retry-segment actually re-runs the segment
`POST /renders/{id}/retry-segment` used to be a DB-flip stub.
Now sends `ltx.video.segment.retry` to the worker, which re-runs
`_generate_segment` for the target index using the previous
segment's `last_frame.png` for image conditioning. Emits the
standard `SEGMENT_STARTED → STEP → COMPLETED` stream with
`retry: true` on every payload.

### Multi-LLM review fixes (commit `0546860`)
Addressed 13 findings from `/octo:review` on Rung 7I:
- **Concurrent retries race fix**: `RetrySpawnOutcome::Duplicate`
  + `HashSet<(run_id, segment_index)>` registry. `is_render_in_flight`
  now covers both full-render and retry tasks.
- **Silent `fake` fallback removed**: retry refuses when
  `runtime_profile` is NULL instead of overwriting real artifacts.
- **Lease leak on timeout fixed**: single-exit refactor of
  `retry_segment_via_lease` — `lease.release()` runs on every path.
- **New `io_safety.py` module**: `sanitize_run_id` +
  `sanitize_workdir` (rejects `..`) + `ensure_dict` +
  `truncate_for_log`. Fallback only applies to None/empty —
  malformed values always raise.
- **`validate_run_id` in HTTP layer**: ULID-class characters only.
- **`notification_matches_run`**: defends against future multi-run
  lease pools.
- **`truncate_status_msg`**: caps DB error messages at 2 KB.

### Rung 7J – VRAM threshold supervisor
Watches `runtime.memory_stats` notifications and halts cleanly
when usage crosses configured thresholds. Defaults match the
P0-T001 spike measurements (max_alloc_retries=6, max_frag_ratio=0.30,
min_free_mb=2560, max_num_ooms=1). Tunable via
`NEXUS_VIDEO_LTX23_VRAM_*` env vars. On Breach: writes
`error_code = "vram_supervisor"` to the run row, distinguishing
halt-by-policy from halt-by-OOM.

## Test coverage

| Suite | Count | What |
|---|---|---|
| `cargo test -p nexus-video-ltx23-extension --lib` | **56** | Runner, planner, schemas, supervisor, validators |
| `worker pytest tests/` | **94** | Fake-pipeline e2e, retry contract, RPC framing, io_safety, GGUF loader |
| `bash scripts/audit-boundary.sh` | PASS | No host-tree leaks |
| `pnpm build` | 369.75 KB JS | Web bundle |

## Boundary cleanliness

The extension lives entirely under `extensions/builtin/nexus-video-ltx23/`.
No host files touched (`.claude/rules/host-extension-boundary.md`).

## Real-GPU smoke + known gaps

- ✅ End-to-end render generates prompt-matching frames at 832×480×97 frames.
- ✅ Sequential CPU offload makes 22B BF16 fit in 16 GB (peak 4.7 GB).
- ⚠️ Abiray Q4_K_M GGUF: loader works, but the GGUF's dev schema diverges
  from today's dg845 config (9-channel vs 2-channel scale_shift, extra
  `prompt_*`/`av_ca_*` adaln modules). Needs a future diffusers commit
  bump to use end-to-end. Loader correctly raises `GGUFSchemaMismatch`.
- ⚠️ Real-GPU retry-segment smoke not run yet (fake pytest covers contract).
- ⚠️ RIFE 2× falls back to ffmpeg `minterpolate` until the
  `rife-ncnn-vulkan-python` wheel is wired in a follow-up rung.

## Test plan

- [ ] `cargo test -p nexus-video-ltx23-extension --lib` — 56 tests green
- [ ] `worker $ uv run python -m pytest tests/ -q` — 94 tests green
- [ ] `worker boundary audit` — PASS
- [ ] `web $ pnpm build` — clean
- [ ] Spin up host + run a 4-segment fake-profile render via the recipe UI
- [ ] (On 16 GB GPU): real BF16 render with `dg845/LTX-2.3-Distilled-Diffusers`
- [ ] (On 16 GB GPU): induce VRAM breach via low `min_free_mb` env override
      and verify clean halt with `error_code = vram_supervisor`

## Files added/modified

```
46 files changed, ~6,000 insertions
extensions/builtin/nexus-video-ltx23/   ← all extension code lives here
specs/046-ltx23-video-generation/        ← spec docs + 10 checkpoints
```
