# Quickstart — Install llama.cpp CUDA 12 and grab a model, end-to-end

Target: fresh DB → working local LLM pipeline in under 90 seconds (SC-Q1-01).

## Prerequisites

- Clean workspace (`cargo clean && rm -rf .nexus-data/`)
- A machine with an NVIDIA GPU exposing CUDA 12 (verified via `nvidia-smi`)
- Dev server running: `cd apps/web && pnpm dev` + `cargo run -p nexus-cli -- serve`

## Step 1 — Open `/backends`

Expected: llama.cpp card renders in `NOT INSTALLED` state.

## Step 2 — Click **Install**

Expected:
- `VariantPickerDrawer` slides in from the right.
- List includes at least: `b6859 · windows-x64 · cpu`, `b6859 · windows-x64 · cuda12`, `b6859 · windows-x64 · cuda13`.
- `cuda12` carries the **Recommended** badge (the machine-detected default for a machine running CUDA 12 drivers).
- The `Install` button in the drawer is disabled until a row is selected.

## Step 3 — Select `cuda12` and click **Install**

Expected:
- `POST /api/v1/llm/backends/llama.cpp/install` with `{release_id: "b6859", accelerator_profile: "cuda12"}`.
- Drawer closes.
- `InstallModal` opens, stepping through 8 phases: resolve → download → verify → extract → detect → validate → persist → complete.
- Progress bar fills during download phase.

## Step 4 — On `install.completed`

Expected:
- Modal shows `Close` button; clicking closes it.
- SWR `mutate("host-backends")` fires; card re-renders as `INSTALLED · UNVALIDATED`.
- Total wall time < 90 s (dominated by the download of the CUDA 12 archive).

## Step 5 — Click **View Details** on the card

Expected:
- `BackendDetailDrawer` opens with full `install` metadata (release_id, platform, accelerator_profile, checksum_sha256, installed_at).
- `LogConsole` mounts and starts tailing the live WS log feed.
- Actions visible: `Validate`, `Uninstall`, `Open Settings`.

## Step 6 — Click **Validate**

Expected:
- `POST /api/v1/llm/backends/llama.cpp/validate` runs.
- Card transitions to `READY` on success.

## Step 7 — Navigate to `/models`

Expected:
- Host-installed list renders (empty on fresh DB).
- Below it, an "Hugging Face" section with a search input and format filter.

## Step 8 — Search `llama-3-8b` with format filter `gguf`

Expected:
- Search debounces 300 ms, then `GET /api/v1/huggingface/search?q=llama-3-8b&format=gguf`.
- First page returns within 1.5 s (SC-Q3-01).
- Result grid shows ~20 repos with license + downloads + file count.

## Step 9 — Click **Install** on the top result

Expected:
- `POST /api/v1/host-models` with the repo_id + default `.gguf` file.
- Progress modal opens streaming install phases.
- On complete, the host models list refreshes; the new row shows `"Shared by 0 extension(s)"`.

## Step 10 — Activate the `local-llm` extension

Expected:
- The extension's model dependency resolves against the already-installed host row (dedup by SHA).
- No second download fires (< 500 ms — SC-Q3-02).
- Back on `/models`, the row now reads `"Shared by 1 extension(s)"`.

## Bonus — Verify Q4 in the DAG editor

1. Open any workflow in the Blueprint → Workflow Graph tab.
2. Drag an operator node from the palette onto the canvas.
3. Expected: node renders with an **orange dashed border**. Error panel is silent.
4. Wire all required input ports. Expected: border transitions to solid; validation runs.
5. Delete one of the required edges. Expected: node stays solid; normal "required input disconnected" error appears (FR-Q4-03).
