# Manual Perf Trace Protocol (Spec 021 T078)

SC-007 requires long-task duration ≤ 50 ms during route navigation under 4× CPU
throttling. Automate where possible; this doc is the fallback manual recipe.

## Prerequisites

- Rust backend running (`cargo run --bin nexus-host`).
- Web dev server running (`cd apps/web && pnpm dev`), listening on `http://localhost:5173`.

## Recording

1. Open Chrome → `http://localhost:5173/#/`.
2. DevTools → Performance → gear icon → CPU: **4× slowdown**.
3. Click **Record** (⏺).
4. Navigate `/` → `/backends` via the sidebar.
5. Stop recording after the destination renders.
6. Export profile via **Save profile…** → commit as `perf-traces/home-to-backends-<yyyy-mm-dd>.json` under the PR branch (gitignored under `perf-traces/`; attach to the PR description instead).

## Assertions

- **No long task > 50 ms** in the Main thread track during the navigation.
- **No dropped frames** in the Frames track (all bars green/yellow, no red).
- First contentful paint on the destination within 1 animation frame (≈ 16 ms uncongested).

## Why not automated

Playwright's tracing API reports long-task durations but does not reliably
enforce 4× CPU throttling across OS/browser versions. Human review of the
Performance panel remains the canonical verification for SC-007.
