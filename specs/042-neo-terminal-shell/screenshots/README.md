# Spec 042 — Quickstart smoke walkthrough

This directory captures the manual smoke walkthrough referenced by tasks.md T079. The walkthrough cannot be executed from a CI sub-agent — it requires a developer machine with Tauri CLI 2.x, GPU drivers, a real GGUF model file, and the system tray host environment. This README documents what each smoke test would do, the exact commands, the expected observations, and the screenshot filenames a human verifier should drop here on completion.

The walkthrough covers all four success criteria that depend on the desktop shell + Lattice composite: SC-001 (≤ 5s OOM identification), SC-002 (< 200 ms tray-restore), SC-004 (CPU-offload pattern at-a-glance), SC-005 (anomaly trace recognition).

## Prerequisites

Per [`../quickstart.md`](../quickstart.md):

- Rust 1.84+, Node ≥ 20, pnpm 9+.
- Tauri CLI 2.x — `cargo install tauri-cli --version "^2"`.
- OS-specific toolchains: macOS Xcode CLT; Windows MSVC + WebView2; Linux `webkit2gtk-4.1-dev` and `libayatana-appindicator3-dev`.
- A canonical GGUF for the load smoke (e.g. `Llama-3-8B-Instruct-Q4_K_M.gguf`).

## One-time setup

```bash
git clone <repo>
cd nexus-dnn
git checkout 042-neo-terminal-shell
pnpm install
cargo fetch --workspace
cd apps/web
pnpm tauri --version           # confirms CLI 2.x is reachable
```

## Smoke test 1 — Lattice load happy path

Verifies the Block primitive, the Lattice projection layers, the inspector drawer, and the Ladder of Abstraction.

```bash
cd apps/web
pnpm tauri dev
```

Open the runtime view (route `/runtime`), click **Load model**, select the GGUF.

Expected observations:

1. The Lattice Block renders with prompt-style header `$ load llama3-8b --layers 33 --kv-cache f16` (numeric values vary by model).
2. Cells transition through `pending → discovered → assigned → reserved → ready` as the scraper consumes llama.cpp stderr.
3. The single phosphor block cursor (US4) sits in the active Block; pulse rate climbs from ~1 Hz at rest to ~3 Hz during the load.
4. After load completes, clicking any cell opens the inspector drawer with `{ tensor_name, dtype, bytes, target, gguf_offset }`.
5. Pressing `1` / `2` / `3` / `4` switches the Ladder rung; the same data renders correctly at each rung.
6. The Pulse-Floor's VRAM trace settles at `(model_buffer + kv_buffer + compute_buffer) / total_vram`.

Screenshots to capture: `01-lattice-load-happy.png`, `02-inspector-drawer.png`, `03-ladder-rungs.png`.

## Smoke test 2 — System-tray persistence

Verifies SC-002 (window restore from tray < 200 ms with host state preserved).

With a model still loaded from smoke test 1:

1. Click the custom titlebar's close button.
2. Window disappears; tray icon stays visible; the host process keeps running and the model stays loaded.
3. Right-click the tray icon → **Open nexus-dnn**. The window reappears with the same model loaded; user-perceived restore < 200 ms.
4. Right-click → **Quit nexus-dnn**. The host shuts down cleanly; the tray icon disappears.

Screenshots to capture: `04-tray-icon-loaded.png`, `05-tray-restore.png`.

## Smoke test 3 — Anomaly recognition

Verifies SC-005 (Pulse-Floor anomaly state visible within 1 s of crossing threshold).

1. Load a model that nearly fills VRAM.
2. Initiate inference at high context (e.g. 4096-token prompt).
3. Watch the Pulse-Floor's VRAM trace — within 1 s of crossing the 92 % threshold the trace brightens dramatically with phosphor leading-edge glow (FR-053).
4. Stop the inference; the trace fades back to its quiet state within ~3 s.

Screenshots to capture: `06-pulse-floor-quiet.png`, `07-pulse-floor-anomaly.png`.

## Failure-mode visualizations

These exercises drive the spatial failure shapes that justify the Lattice (FR-031 / FR-037).

### VRAM OOM — red point

Load a GGUF with `--n-gpu-layers 999` on a model that does not fit on the GPU.

Expected: a single red cell at the offending layer's tensor group.

Screenshot: `08-vram-oom-red-point.png`.

### CPU offload — amber column

Load with `--n-cpu-moe 1` (set via the model picker's runtime tuning sliders, spec 039).

Expected: amber `cpu_offloaded` cells running down the FFN column at the trailing layers.

Screenshot: `09-cpu-offload-amber-column.png`.

### Cancelled load

Start a load and immediately click **Cancel**.

Expected: cells frozen in their last state; a `Gap` indicator highlights the cancellation point.

Screenshot: `10-cancelled-load-gap.png`.

### Verbose-off fallback

If `--log-verbosity 1` is removed from the spawn flags (don't do this in production), the histogram is gated off and the Lattice shows estimated bytes per cell with a `?` indicator on every cell.

Screenshot: `11-verbose-off-fallback.png`.

## Distribution build smoke

Verifies the production bundle compiles and the artifacts land in the expected location.

```bash
cd apps/web
pnpm tauri build
```

Expected outputs in `apps/web/src-tauri/target/release/bundle/`:

- macOS: `.dmg` and `.app`.
- Windows: `.exe` (NSIS) and `.msi`.
- Linux: `.AppImage`, `.deb`.

Screenshots: not needed; capture file listings.

## When you've completed the walkthrough

Drop the eleven screenshots into this directory using the filenames above. Update tasks.md T079 to `[X]` and link this directory in the merge-gate evidence section of the PR.

If any smoke step regresses, file a follow-up in [`../followups.md`](../followups.md) describing the divergence — do not paper over the regression with a gentler smoke definition.
