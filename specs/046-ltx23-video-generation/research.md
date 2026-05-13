# Spec 046 — Research

## Inputs

- Full requirements package: `C:\Users\lazar\Downloads\ltx23_video_extension_requirements_spec.zip` (17 docs + manifests + diagrams + schemas + audit script + templates).
- Octopus probe synthesis: `~/.claude-octopus/results/probe-synthesis-20260513-ltx23-video.md`.
- Octopus Define consensus (revised): `~/.claude-octopus/results/grasp-consensus-20260513-ltx23-video-REVISED.md`.

## Multi-LLM dispatch report

| Provider | Status |
|---|---|
| Codex CLI | Failed via orchestrate.sh — 4/6 sub-agents stalled at 0B after 3m15s. Matches documented codex-plugin wall (`~/.claude/feedback_octo_codex_plugin.md` 2026-05-07). |
| Gemini CLI | Missing on this host. |
| Perplexity | No API key. |
| OpenCode | Missing. |
| Copilot CLI | Available, not dispatched by orchestrate.sh's `research` command. |
| Claude parallel sub-agents | 3 dispatched (VRAM, ComfyUI-vs-diffusers, CUDA13+RTX50 reality check) + 1 adversarial debate. All returned high-quality, convergent findings. |

Per user's global feedback rule, fallback to Claude sub-agents is the correct action when codex-plugin is unresponsive.

## Phase-0 verification gate (BLOCKING for P2+ tasks)

| ID | Verification | Status | Notes |
|---|---|---|---|
| P0-T001 | diffusers LTX-2.3 image-to-video pipeline loads FP8 checkpoint + generates one 4s segment on a 16 GB GPU | **PENDING** | Run before P2. Record `torch.__version__`, `diffusers.__version__`, peak VRAM, wall-clock. |
| P0-T002 | If P0-T001 fails: Lightricks' native `LTX-Video/inference.py` does the same | **N/A until T001 known** | |
| P0-T003 | Cold-spawn benchmark (Python start + torch import + LTX load + 1 segment + clean exit) | **PENDING** | If `< 15%` of duration=120s wall-clock, switch D2 to process-per-segment. |
| P0-T004 | HuggingFace repos `Lightricks/LTX-2.3` + `Lightricks/LTX-2.3-nvfp4` exist with claimed file paths | **PENDING** | Verify via `huggingface_hub` API. Update backend-runtime descriptors if names differ. |

## Key findings (synthesised from sub-agents)

### VRAM management on 16GB

- **Process-per-render** (entire video): bulletproof but 5-15s × 9 segments = 45-135s overhead per 30s video. Rejected.
- **Process-per-SEGMENT**: cheaper than per-render but still tens of seconds × N segments. Reconsider after P0-T003 benchmark.
- **Warm-runtime + cleanup_models() only**: fragmentation eats 16GB headroom within 5-8 segments empirically. Rejected.
- **Warm-runtime + force-restart on threshold** (chosen for v1 pending P0-T003):
  - Restart at run completion (always — AC13 guarantee).
  - Restart mid-run on: `num_alloc_retries > 0` (gold standard) OR `generation_count ≥ 6` OR `frag_ratio > 0.30 AND reserved > 12 GB` OR `free_mb < 2500` post-cleanup OR `rss growth > 500 MB/segment`.
  - `PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True,garbage_collection_threshold:0.8`.
- **Canonical drop sequence** (between segments, before restart): `pipe.to("cpu"); del pipe.transformer; del pipe.vae; del pipe; torch._dynamo.reset(); gc.collect() × 2; torch.cuda.synchronize(); torch.cuda.empty_cache(); torch.cuda.ipc_collect(); torch.cuda.reset_peak_memory_stats()`. **`gc.collect()` BEFORE `empty_cache()` is the #1 omission.**
- Tiled-VAE + sequential CPU offload: shift peak lower, do NOT eliminate fragmentation. Restart-on-threshold still required.

### Runtime stack — diffusers vs ComfyUI vs native Lightricks

| Aspect | diffusers | ComfyUI + LTXVideo custom nodes | Lightricks native `inference.py` |
|---|---|---|---|
| Deterministic VRAM control | Best — manual `.to("cpu")` / `del` / explicit offload | Fights you — `model_management` decides | Good — direct control |
| Install surface | ~6 pip deps | core + 3 custom-node repos + transitive | medium — Lightricks pin list |
| Long-term maintenance | Stable API surface | Custom nodes drift constantly | Lightricks-controlled |
| LTX-2.3 support today (2026-05-13) | **unknown — verify in P0-T001** | likely current upstream | likely current |
| ComfyUI dependency justification | n/a | "leverage VHS + RIFE nodes" — weak (FFmpeg already a system_binary; RIFE has standalone pip impls) | n/a |

**Decision**: diffusers primary, native fallback, ComfyUI deferred.

### CUDA 13.0 + RTX 50 Blackwell reality check (2026-05-13)

- Driver R580+ available on Studio / Production channels Q1 2026. Need `≥ 580.65` Linux / `≥ 580.88` Windows. Early R580 had WDDM TDR regression under sustained NVFP4 GEMM.
- `torch 2.10.0 + cu130`: **unknown availability — verify at install time**. Fallback: 2.10 nightly cu130 OR `torch 2.9.x + cu129` (first stable line with Blackwell SM_120 + NVFP4 dispatch).
- **Never silently fall back to cu128 on Blackwell for the NVFP4 path** — requires cu129+.
- `torch 2.10 + cu128` for RTX 40 + Blackwell FP8 path: stable, safe.
- NVFP4 maturity on Blackwell as of mid-2026: still rough; occasional NaN bursts on >121-frame contexts; quant-scale drift. → `rtx50-nvfp4` profile marked **experimental, opt-in flag required**.
- Default Blackwell path: `rtx50-fp8` (cu128, e4m3, ~25-35% slower than NVFP4 but rock-solid).
- 16 GB safe fallback: BF16 at 768×512 / 97 frames if FP8 still OOMs (informational; not a v1 profile).
- uv venv on Windows: `--python 3.12 --seed`, `UV_PYTHON_PREFERENCE=only-managed`, clear `PYTHONPATH`, prepend `Lib/site-packages/torch/lib` to PATH, enable `LongPathsEnabled`.
- Pre-flight install check: parse `nvidia-smi --query-gpu=driver_version,compute_cap --format=csv,noheader`. Assert `compute_cap ≥ 12.0` for NVFP4 + driver gate. One-click fix: deep-link NVIDIA drivers + "Switch to FP8 path" button.

### Existing-pattern findings

emotion-tts is a near-perfect template for nexus.video.ltx23:

- `manifest.yaml` dependencies.steps[] graph: `runtime → package_set → system_binary → model_artifact → validation`. **Already exactly the LTX needs.**
- `backend-runtime.yaml` in `backends/<name>/`: `runtime_id`, `family: python`, `transport: stdio`, `worker_entrypoint`, `capability_tags`, `runtime_settings`, `failure_categories`.
- Python worker: pyproject.toml + uv.lock + stdio NDJSON JSON-RPC. **stdout-swap trick** (`sys.__nexus_jsonrpc_stdout__`) prevents rogue prints corrupting the wire protocol — must replicate.
- Frontend custom-element bundle pattern: `web/dist/<name>.js` + `.css` registered via `ui.custom_elements`. **Same approach for LTX.**
- Storage: `prefix_mode: host_derived` → host computes prefix from extension id slug. **For LTX → `ext_nexus_video_ltx23__`**.

### Host machinery available (no new host crates needed)

- `crates/nexus-extension-deps/handlers/` has all 5 step types (runtime/package_set/system_binary/model_artifact/validation).
- `crates/nexus-backend-runtimes::family_python` already drives uv venv + torch install + worker spawn (used by emotion-tts/indextts).
- `crates/nexus-api::extension_router::dispatcher` already handles `/api/v1/extensions/{ext_id}/{*rest}`.
- `crates/nexus-extension::storage` already supports `prefix_mode: host_derived` schema-contribute.
- `crates/nexus-api::bin::api_doc_check` already aggregates OpenAPI fragments from `extensions/builtin/*/openapi/`.
- `crates/nexus-events` provides SSE event bus (spec 044 territory).
- `crates/nexus-artifact` provides artifact store.

## Open dispositive verifications

All open items roll into Phase-0 gate above. Until P0-T001/T003/T004 are answered, P2+ work is speculative; P0-P1 scaffolding work is safe to proceed (fake runtime never touches diffusers / LTX checkpoints).
