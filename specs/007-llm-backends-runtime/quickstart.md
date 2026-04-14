# Quickstart — LLM Backends Runtime (llama.cpp first slice)

**Feature**: 007-llm-backends-runtime
**Audience**: developers implementing or validating this feature, and users walking through the happy path the first time.

This quickstart exercises the end-to-end install → validate → configure → observe-logs → detect-compatibility flow on a supported machine.

---

## Prerequisites

- Windows x64 or Linux x64 host with 10 GB free disk.
- NVIDIA GPU with CUDA 12 or CUDA 13 driver installed (optional; CPU-only works too).
- nexus-dnn host built and running (`cargo run -p nexus-core`).
- Web UI built and served.
- Network access to the GitHub Releases host that serves the pinned llama.cpp asset.

---

## 1. Open the Backends page

1. Start the host and web app.
2. Navigate to **Backends** in the left sidebar.
3. Confirm the page header shows `Backends / Install and configure local inference runtimes` and the summary chips.

Expected result: two cards — `llama.cpp` and `TensorRT-LLM`. The latter shows `UNAVAILABLE IN THIS BUILD` with no Install/Activate CTA.

## 2. Install llama.cpp

1. On the `llama.cpp` card (state `NOT INSTALLED`), click **Install**.
2. The Install modal opens with 8 phases. Watch it progress through `Resolve release` → `Download package` (progress bar) → `Verify package` (checksum) → `Extract files` → `Detect binaries` → `Validate runtime` → `Save install manifest` → `Complete`.
3. Modal shows `completed` terminal state. Close it.

Expected result: card transitions to `READY`, footer shows `b7472 · windows-x64 · cuda12` (or equivalent for your machine), and the page summary shows `Installed 1 / Validated 1 / Issues 0`.

## 3. Inspect settings and preview the launch spec

1. On the `llama.cpp` card, click **Settings**.
2. Set `Threads = 12`, `Batch threads = 12`, `Default context = 8192`, `Parallel requests = 2`.
3. Leave `Bind address = 127.0.0.1`, `Port mode = Auto`.
4. Confirm the **Argument preview** shows:

   ```
   --host 127.0.0.1 --port <auto> --threads 12 --threads-batch 12 --ctx-size 8192 --parallel 2
   ```

5. Click **Save settings**.

Expected result: a success state appears. Restart the host and confirm values persist.

## 4. Re-run validation

1. On the `llama.cpp` card, click **Validate**.
2. Watch the 7-step validation run: binary exists, version probe, dependent libraries, profile match, health probe starts, health endpoint reachable, health probe shuts down.

Expected result: all checks pass; `last validated` timestamp updates.

## 5. Break and repair the install

1. Manually rename `llama-server.exe` (or `llama-server` on Linux) inside the install directory.
2. Click **Validate** on the card.
3. Card transitions to `ISSUE (broken)` with category `required_binary_missing`.
4. Click **Repair**.

Expected result: install task re-runs, card returns to `READY`.

## 6. Observe namespaced logs

1. Open the bottom Log Console.
2. Filter by source `llama.cpp` and level `INFO`.
3. Trigger a **Validate** run.

Expected result: lines tagged with `extension.local-llm.llama.cpp` appear, including subprocess stdout/stderr (e.g., `llama_model_loader: ...` during the short-lived probe).

## 7. GGUF compatibility guidance

1. In the forthcoming Deployments surface (or the model-selection surface available in the current build), select a `.gguf` model with llama.cpp still `READY`.
2. Confirm llama.cpp-compatible deployment options are preferred.
3. Uninstall llama.cpp (manually remove the runtime directory for this exercise) and re-select the same GGUF model.
4. Confirm the message `This model requires llama.cpp. Install the llama.cpp runtime to continue.` and an `Install llama.cpp` CTA that opens the Backends install modal.

Expected result: matches FR-073.

## 8. Truthfulness audit

1. Inspect every visible CTA on every card in every card state (use the Playwright snapshot suite).
2. Confirm no `Start`, `Stop`, `Restart`, `Load model`, `n_gpu_layers`, `model path`, or other model-bound control appears on any card or in Settings.

Expected result: matches FR-013 and FR-056, and SC-002/SC-003.

---

## Troubleshooting

| Symptom | Likely category | Next step |
|---|---|---|
| Download stalls at 0 % | `download_failed` | Retry; check proxy/firewall. |
| Verify phase fails | `checksum_mismatch` | Retry; open an issue with the diagnostics bundle. |
| Validate `dependent_libraries` fails | `dependency_load_failure` / `cuda_mismatch` | Install the matching CUDA runtime; retry `Validate`. |
| Validate `health_endpoint_reachable` timeouts | `runtime_validation_timeout` | Inspect logs — likely another process bound the port; switch `Port mode = Fixed` to an open port. |
| Save settings blocked with `conflict_with_managed_flag` | — | Remove the offending extra-arg (e.g., `--threads` — it is managed). |

For any failure, click **Copy diagnostics** on the card's Diagnostics tab and attach the report when filing an issue.
