# Checkpoint 2026-05-13 — Spec 046 Rung 7B complete

**Branch**: `claude/unruffled-perlman-dd12e1`
**Worktree**: `D:\Workspace\repos\nexus-dnn\.claude\worktrees\unruffled-perlman-dd12e1`
**HEAD before this commit**: `4e18804`
**Spec**: 046 (LTX-2.3 video generation extension)
**Rung**: 7B — unified "install runtime & download weights" CTA

## What changed

Single-button install flow that collapses the two prior manual steps
(`uv sync --extra diffusers` then weights download) into one click.

### New JSON-RPC method (worker)

`ltx.video.runtime.install` — chains:
1. `uv sync --extra diffusers` inside the worker's own pyproject. Output
   from both stdout and stderr is streamed to
   `ltx.video.runtime.install.progress` notifications, one per line.
2. After uv exits with code 0, the existing `snapshot_download` path
   downloads the LTX-2.3 FP8/NVFP4 weights.

Notification schema:
- `ltx.video.runtime.install.progress { profile, repo, phase, stream?, output? }`
  where `phase ∈ {"resolving_deps", "downloading_weights"}` and
  `stream ∈ {"stdout", "stderr"}` for uv pipe output.
- `ltx.video.runtime.install.done { profile, repo, dest }`
- `ltx.video.runtime.install.error { profile, repo, code, message, phase }`

The legacy `ltx.video.install.start` RPC remains registered for
backwards compatibility but `ProfileInstallService::start()` no longer
calls it — the unified runtime flow replaces it.

### `UvSyncRunner` injection point

`register_installer_handlers(worker, *, uv_sync_runner=...)` accepts a
pluggable async runner so tests can replace the real `uv` subprocess
without touching the network or filesystem. The default runner shells
out to `uv sync --extra diffusers` via `asyncio.create_subprocess_exec`
with concurrent stdout/stderr draining.

### `ProfileInstallStatus` DTO additions

Two new fields surface through `GET /profiles/{profile_id}/install`:
- `phase: string | null` — most-recent worker-emitted phase
  (`"starting"`, `"resolving_deps"`, `"downloading_weights"`, `"done"`,
  or `"error:<phase>"`).
- `recent_progress: string[]` — bounded ring buffer of the last 200
  progress lines (each capped at 1024 chars, prefixed with
  `"<stream>: "`).

### UI

`ProfileInstallPanel` button label flips from `"Download weights"` to
`"Install runtime & download weights"`. While `in_flight`, the button
shows a phase-derived label (`"Resolving deps…"`, `"Downloading
weights…"`).

A new collapsible `<details>` block (`InstallProgressLog`) renders the
`recent_progress` buffer in a monospace `<pre>` with `max-height: 240px`
and overflow scroll — invisible by default, opens on click.

### Tests

- Python (`tests/test_runtime_install.py`, 6 new):
  - chains uv sync then snapshot_download (success path)
  - emits progress notifications for each uv stdout/stderr line
  - reports `runtime.install.error` when uv exits non-zero
  - reports `runtime.install.error` when uv binary is missing
  - rejects unknown profiles
  - dedupes concurrent install requests

- Rust (`profile_install.rs` `#[cfg(test)] mod tests`, 6 new):
  - status for unknown profile returns repo=None
  - status resolves per-profile repo correctly
  - start rejects unknown profile
  - progress buffer caps at 200 lines
  - progress lines truncated to 1024 chars with `…` suffix
  - phase overwrites previous phase

## Validation gates

| Gate | Status |
|---|---|
| `cargo clippy -p nexus-video-ltx23-extension --all-targets -- -D warnings` | ✓ clean |
| `cargo test -p nexus-video-ltx23-extension --lib` | ✓ 22/22 (was 16, +6) |
| `cd extensions/builtin/nexus-video-ltx23/worker && uv run python -m pytest tests/` | ✓ 31/31 (was 25, +6) |
| `bash extensions/builtin/nexus-video-ltx23/scripts/audit-boundary.sh` | ✓ PASS |
| `cd extensions/builtin/nexus-video-ltx23/web && pnpm build` | ✓ 360 KB JS + 4.5 KB CSS |
| Live host smoke (POST `/profiles/rtx40-fp8/install`) | ✓ uv subprocess streams output into `recent_progress` |

## Live smoke evidence

```bash
NEXUS_PORT=3100 ./target/debug/nexus-dnn.exe &
# wait for /api/v1/health 200

curl -X POST .../profiles/rtx40-fp8/install
# → { "profile": "rtx40-fp8", "in_flight": true, "phase": "starting",
#     "recent_progress": [] }

# (6 seconds later, while uv is actively resolving)
curl .../profiles/rtx40-fp8/install
# → { "in_flight": true, "phase": "resolving_deps",
#     "recent_progress": [
#       "info: running uv sync --extra diffusers in <worker_dir>",
#       "stderr: Resolved 78 packages in 1ms",
#       "stderr: Downloading torch (109.2MiB)",
#       "stderr: Downloading tokenizers (2.6MiB)",
#       "stderr: Downloading diffusers (4.8MiB)",
#       "stderr: Downloading transformers (10.1MiB)",
#       "stderr: Downloading torchvision (4.1MiB)",
#       "stderr:  Downloaded tokenizers",
#       "stderr:  Downloaded torchvision",
#       "stderr:  Downloaded diffusers",
#       "stderr:  Downloaded transformers"
#     ] }
```

Worker subprocess was killed mid-install to avoid committing to the
full ~15 GB torch + diffusers download. The chain of behaviour proven:

1. Rust `ProfileInstallService::start()` acquires a fake-mode lease.
2. Lease sends `ltx.video.runtime.install` RPC to the Python worker.
3. Worker registers the new handler at boot (via
   `register_installer_handlers`).
4. Handler spawns the `UvSyncRunner` which exec's the real `uv` binary.
5. uv stderr is streamed line-by-line to
   `ltx.video.runtime.install.progress` notifications.
6. Rust service consumes notifications, captures `phase` + appends to
   `recent_progress`.
7. Frontend SWR poll on `/profiles/.../install` surfaces both fields
   into the new `InstallProgressLog` `<details>` block.

## Files touched

- `extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/installer.py`
  (rewritten — chains uv sync + snapshot_download)
- `extensions/builtin/nexus-video-ltx23/worker/tests/test_runtime_install.py`
  (new — 6 tests with mocked uv + huggingface_hub)
- `extensions/builtin/nexus-video-ltx23/rust/src/profile_install.rs`
  (extended — phase tracker, progress ring buffer, runtime.install RPC,
  6 new unit tests)
- `extensions/builtin/nexus-video-ltx23/web/src/api.ts`
  (added `phase` + `recent_progress` to `ProfileInstallStatus`)
- `extensions/builtin/nexus-video-ltx23/web/src/App.tsx`
  (button relabel, phase-aware label, `InstallProgressLog` component)
- `extensions/builtin/nexus-video-ltx23/web/src/styles.css.ts`
  (new `progressDetails` + `progressSummary` + `progressBlock` tokens)
- `extensions/builtin/nexus-video-ltx23/web/dist/{ltx23-video.js,ltx23-video.css}`
  (rebuilt via `pnpm build`)

No host-path changes. Boundary audit clean.

## What's still open from Rung 7

- **7A** real-GPU P0-T001 spike (needs 16 GB NVIDIA GPU + ~22 GB
  weights download — user-driven).
- **7C** wire `rife_ncnn_vulkan_python` frame-by-frame loop in
  `pipeline_diffusers.py::_try_interpolate_rife` (currently falls
  through to ffmpeg minterpolate).
- **7D** wire `tokio_util::sync::CancellationToken` into `Runner` so
  POST `/cancel` actually aborts the Python subprocess.
- **7E** add `/profiles/{profile_id}/install` to
  `openapi/extension.openapi.yaml` (was missing from Rung 6 too, plus
  the new `phase` / `recent_progress` schema).
- **7F** open the PR.
