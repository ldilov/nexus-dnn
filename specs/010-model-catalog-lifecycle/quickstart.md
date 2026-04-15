# Quickstart: Model Catalog & Backend Lifecycle

**Feature**: 010-model-catalog-lifecycle | **Audience**: QA engineer or returning developer

This walk-through exercises all four user stories end-to-end against a fresh SQLite database.

## Preconditions

- Clean `~/.nexus-dnn/` (or equivalent host data dir).
- Internet access to `https://huggingface.co`.
- At least 8 GB free disk for the model download step.
- (Optional, for US3 TRT path) NVIDIA GPU with CUDA 12+ and TensorRT-LLM runtime installable.

## Steps

### 1. Fresh start (baseline)

```bash
cargo run -p nexus-core
```

1. Open `http://localhost:5173`.
2. Navigate to **Backends**. Both cards read **Not installed**.
3. **Expected**: no "Model loaded" indicator anywhere.

### 2. US1 — Install & reload persistence

1. Click **Install** on the Llama.cpp card. Wait for completion.
2. Card transitions to **Installed & Active**.
3. **Hard reload** the page (Ctrl+Shift+R).
4. **Expected**: card still reads **Installed & Active** on first paint (< 150 ms hydration). No install prompt. No "Model loaded" toast (no model has been loaded yet).
5. Stop the host (`Ctrl+C`), rename the `llama-server` binary to simulate drift, restart the host.
6. **Expected**: card transitions to **Needs repair**, offers a targeted re-download, retains any associated settings.

### 3. US2 — Unified catalog + HF search

1. Navigate to **Models**.
2. **Expected**: "Installed" section is empty; "Hugging Face" section shows empty state with a search prompt.
3. Search `qwen2.5 gguf`.
4. **Expected**: ≥ 1 result within 3 s cold, < 1.2 s on a subsequent identical search (cache hit).
5. Each result card shows repo id, author, license, 30-day downloads, file list with sizes, quantization variants, and a **compatibility badge** tied to Llama.cpp (green for GGUF).
6. Pick a small Q4_K_M file (~4 GB), click **Install**.
7. **Expected**: progress bar updates at ≥ 2 Hz; the **Cancel** button halts the download and removes partial files within 500 ms.
8. Let the install complete. Model appears in the **Installed** section within 2 s (no manual refresh).

### 4. US3 — Format-aware routing

1. Search `nvidia tensorrt-llm` (or any repo with a pre-built `*.engine` artifact).
2. **Expected**: compatibility badge reads **TRT-LLM compatible** with a tooltip quoting the signal ("prebuilt engine artifact detected").
3. With TRT-LLM *not* installed, click **Install**.
4. **Expected**: 409 error surfaced in the UI with message "Install TensorRT-LLM runtime from the Backends panel." No download starts.
5. Search a safetensors-only repo whose architecture is **not** in the allowlist.
6. **Expected**: badge reads **Compatibility: not detected**, never a false green.

### 5. US4 — Load & hyperparameters

1. In the **Installed** section, pick the Qwen model from step 3. Click **Load**.
2. **Expected**: live progress (queued → loading → ready) sourced from the backend process, not client guesses.
3. Open the **Hyperparameters** form. Current values are shown (project defaults).
4. Edit `temperature` to `0.6` and `max_context_length` to `4096`. Apply.
5. **Expected**: changes take effect on the next chat turn; values persist across reload.
6. Try setting `max_context_length` to `99999`.
7. **Expected**: inline validation error "exceeds this model's declared max (8192)". No API round-trip side effects.
8. Reload the page.
9. **Expected**: Models panel reopens to the previously loaded model; `GET /load-state` returns the truth. If the host was restarted, UI shows "Ready — model not resident; reload?" with a one-click repair.

## Pass criteria

All ✓ boxes above met. If any step diverges, open an issue tagged `spec/010-model-catalog-lifecycle` with the failing step number and observed behavior.
