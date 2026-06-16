# 🌱 Environment Variables

Complete reference of every environment variable read across the host, extensions, frontend, workers, and tooling.

Resolution order for host config is **CLI flag → environment variable → `config.toml` → built-in default** (see [configuration.md](configuration.md)). Most variables below are optional overrides — the system runs with defaults when they are unset.

Legend for **Scope**:

| Scope | Meaning |
|-------|---------|
| `host-runtime` | Read by the host process / generic runtime layer (`crates/`). |
| `extension-rust` | Read by an extension's Rust shim. |
| `worker-python` | Read by an extension's Python worker at render/inference time. |
| `frontend-build` | Vite build-time / browser-runtime flag (`apps/web`, extension `web/`). |
| `dev-test` | Only used by tests, smoke scripts, or benches — **not needed in normal operation**. |
| `ci-docker-manifest` | Build, CI, container, or spec-kit tooling. |
| `sdk` | Python SDK. |

> Generic OS variables (`PATH`, `HOME`, `USERPROFILE`, `APPDATA`, `XDG_CONFIG_HOME`, `TERM`, `COLORTERM`, `NO_COLOR`) are consumed only for platform/terminal detection and are listed at the end.

---

## Host runtime — core configuration

These bind to CLI flags via clap (`crates/nexus-core/src/config.rs`) and also read from the environment. See [configuration.md](configuration.md) for the matching `--flags` and `config.toml` keys.

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXUS_CONFIG` | `<data-dir>/config.toml` | Path to the host config file. |
| `NEXUS_DATA_DIR` | `~/.nexus` | Root for all persistent state (db, artifacts, extensions, logs). |
| `NEXUS_PORT` | `3000` | Host HTTP listen port (`--port`). |
| `NEXUS_LOG_LEVEL` | `info,tower_http=debug` | Tracing filter baseline (`--log-level`). |
| `NEXUS_DEBUG_ASYNC` | `false` | Async diagnostics toggle (`--debug-async`). |
| `NEXUS_HOST_PORT` | `3000` | Port published by the host to **child processes** so workers/subprocesses can call the host API back. Injected post-bind. (`crates/nexus-core/src/app.rs:490`) |
| `NEXUS_HOST_URL` | `http://127.0.0.1:3000` | Base URL of the host, used by the TUI client. (`crates/nexus-tui/src/main.rs:27`) |
| `NEXUS_WORKSPACE_ROOT` | compile-time `option_env!` → cwd | Dev-time workspace root for discovering extensions/config; runtime override of the baked-in value. (`crates/nexus-core/src/config.rs:259`) |
| `NEXUS_BUILTIN_EXTENSIONS_DIR` | installed/relative paths → workspace | Override the built-in extensions source directory. (`crates/nexus-core/src/config.rs:103`) |
| `HF_TOKEN` | — | Hugging Face token for API access + model downloads. (`crates/nexus-core/src/app.rs:307`, `crates/nexus-huggingface/src/token.rs:6`) |

## Host runtime — TUI

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXUS_TUI_RING_BUFFER_CAPACITY` | `50000` (config) | Event ring-buffer size for the TUI. |
| `NEXUS_TUI_TRACING_BRIDGE_ENABLED` | enabled | Enable/disable the tracing → TUI bridge. |
| `NEXUS_TUI_TRACING_BRIDGE_EXTRA_SENSITIVE_PATTERNS` | — | Comma-separated extra redaction patterns. |

## Host runtime — embedded Python bootstrap

Override the bundled CPython runtime the host extracts for Python-family workers (`crates/nexus-backend-runtimes/src/family_python/config.rs`).

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXUS_EMBEDDED_PYTHON_URL` | — (optional) | URL for the embedded Python distribution archive. |
| `NEXUS_EMBEDDED_PYTHON_SHA256` | — (optional) | SHA256 of the archive for integrity verification. |
| `NEXUS_EMBEDDED_PYTHON_SIZE` | — (optional) | Archive size in bytes, for download progress. |
| `NEXUS_EMBEDDED_PYTHON_KIND` | `tar.gz` | Archive format (`tar.gz`/`tgz`/`zip`). |
| `NEXUS_EMBEDDED_PYTHON_STRIP` | `python` | Archive prefix path to strip on extract. |
| `NEXUS_EMBEDDED_PYTHON_EXTRACT` | `python` | Subdirectory to extract the runtime into. |

## Host runtime — local-LLM worker pool

Tune the pooled local-LLM completions runtime (`crates/nexus-local-llm-worker/src/config.rs`).

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXUS_LOCAL_LLM_POOL_CAP` | `2` | **Max concurrent LLM runtime instances** in the worker process pool. |
| `NEXUS_LOCAL_LLM_IDLE_TIMEOUT` | `600` s | Idle timeout before an unused LLM runtime is evicted. |
| `NEXUS_LOCAL_LLM_ACQUIRE_LEASE_TIMEOUT` | `120` s | Timeout when acquiring a lease from the LLM pool. |
| `NEXUS_LOCAL_LLM_DATA_ROOT` | `~/.nexus/local-llm` | Custom data directory for the LLM worker model cache/state. |
| `NEXUS_LOCAL_LLM_LOG_TAIL_CAPACITY` | `200` | Ring-buffer capacity for recent LLM runtime logs. |

---

## Extension — emotion-tts (audio)

| Variable | Scope | Default | Purpose |
|----------|-------|---------|---------|
| `EMOTIONTTS_MAX_WORKERS` | `extension-rust` | `1` | **Concurrent-worker ceiling.** Each worker is a full resident IndexTTS-2 model (~N× VRAM). Sizes the `LeaseProvider` pool + caps how many runs the queue executes in parallel. The recipe UI lets users pick `1..ceiling` at runtime start. Clamped to `[1, 8]`. Default `1` = serial (historical behaviour). (`.../emotion-tts/rust/src/dispatcher/mod.rs`) |
| `EMOTIONTTS_LEASE_IDLE_SECS` | `extension-rust` | `600` | Idle seconds before a TTS worker is stopped and its VRAM freed (applied per pool worker). (`.../emotion-tts/rust/src/dispatcher/mod.rs`) |
| `EMOTIONTTS_FFPROBE_BIN` | `extension-rust` | `ffprobe` | Override the `ffprobe` binary used for voice-asset audio probing. (`.../emotion-tts/rust/src/router/voice_assets.rs:561`) |

## Extension — video (svi2-pro, longcat, ltx23) runtime

Production worker knobs read at render time.

| Variable | Scope | Default | Purpose |
|----------|-------|---------|---------|
| `NEXUS_HOST_DATA_DIR` | `worker-python` | `D:/longcat_install` | Default data-directory root holding model artifacts (fallback when a model-specific dir is unset). |
| `NEXUS_VIDEO_SVI2_RUNTIME` | `host-runtime` | default profile | Override the svi2-pro runtime profile. (`crates/nexus-builtins/src/lib.rs:101`) |
| `NEXUS_VIDEO_LTX23_VRAM_MAX_RESTARTS` | `extension-rust` | `3` | Max transparent restart-mid-chain attempts before surfacing a supervisor halt. (`.../ltx23/rust/src/runner.rs:82`) |
| `NEXUS_VIDEO_LONGCAT_ATTN` | `worker-python` | `auto` | Attention backend for the LongCat DiT (`auto`/`flash`/`sage`/`sdpa`/`xformers`). |
| `NEXUS_VIDEO_LONGCAT_OFFLOAD_MODE` | `worker-python` | `none` | VRAM offload strategy for LongCat (`none`/`block_swap`). |
| `NEXUS_VIDEO_LONGCAT_BLOCK_SWAP` | `worker-python` | `0` | Number of transformer blocks cached during block-swap offload. |
| `NEXUS_VIDEO_LTX23_RUNTIME` | `worker-python` | `fake` | Which LTX-23 pipeline handler to register (`fake`/`ltxv097`/`ltx2`/`diffusers`). |
| `NEXUS_VIDEO_LTX23_LTX2_BASE_DIR` | `worker-python` | — | Base dir for the LTX-2 Kijai stack (models, upsampler, safetensors). |
| `NEXUS_VIDEO_LTX23_LTX2_GGUF` | `worker-python` | — | Explicit LTX-2 GGUF model path (overrides Kijai resolution). |
| `NEXUS_VIDEO_LTX23_LTX2_SAFETENSORS` | `worker-python` | — | Explicit LTX-2 safetensors model path. |
| `NEXUS_VIDEO_LTX23_LTX2_SAFETENSORS_OFFLOAD` | `worker-python` | `none` | LTX-2 safetensors offload (`none`/`sequential`/`block_swap`). |
| `NEXUS_VIDEO_LTX23_LTX2_SAFETENSORS_OFFLOAD_FOLDER` | `worker-python` | — | Persistent layer-cache dir for block-swap offload. |
| `NEXUS_VIDEO_LTX23_LTX2_UPSAMPLER` | `worker-python` | — | Explicit LTX-2 upsampler model path. |
| `NEXUS_VIDEO_LTX23_RIFE_BIN` | `worker-python` | — | Explicit RIFE interpolation binary path (overrides auto-resolve). |
| `NEXUS_VIDEO_LTX23_RIFE_URL` | `worker-python` | platform default | Override URL for RIFE binary download. |
| `NEXUS_VIDEO_LTX23_RIFE_AUTOSTAGE` | `worker-python` | — | Auto-stage the RIFE binary into the cache dir. |
| `SVI2_ATTENTION` | `worker-python` | `auto` | svi2-pro attention backend (`auto`/`flash`/`sage`/`sdpa`). |
| `SVI2_ATTENTION_STRICT` | `worker-python` | — | Fail if the requested attention backend is unavailable. |
| `SVI2_FP8_COMPUTE` | `worker-python` | `bf16` | FP8 linear compute path (`bf16`/`fp8_e4m3fn`/`fp8_e5m2`). |
| `SVI2_MODELS_DIR` | `worker-python` | — | Explicit svi2 model dir (overrides `NEXUS_HOST_DATA_DIR`). |
| `SVI2_VERSIONS_YAML` | `worker-python` | — | Override path to the svi2 versions manifest. |
| `SVI2_VRAM_TRACE` | `worker-python` | — | Enable detailed VRAM logging during generation. |

---

## Frontend (build-time / browser)

| Variable | Default | Purpose |
|----------|---------|---------|
| `import.meta.env.PROD` | — | Vite: production build flag (gates service-worker registration). (`apps/web/src/services/sw_registration.ts:17`) |
| `import.meta.env.DEV` | — | Vite: development build flag. |
| `import.meta.env.TEST` | — | Vite: test build flag (gates broker test reset). |
| `process.env.NODE_ENV` | `production` | Statically injected as `production` in extension Vite builds. (`.../emotion-tts/web/vite.config.ts:9`) |
| `VITE_HOST_BASE` | `localhost:3000` | Override the host base URL for HTTP transport in browser-dev mode. (`apps/web/src/services/http_transport.ts:35`) |

---

## OS / terminal detection (host)

Consumed only to detect platform paths and terminal capabilities — never set these for app behavior.

| Variable | Purpose |
|----------|---------|
| `HOME` / `USERPROFILE` / `APPDATA` / `XDG_CONFIG_HOME` | Resolve the user data/config directory per OS. |
| `TERM` / `COLORTERM` | Terminal type + truecolor detection for TUI rendering. |
| `NO_COLOR` | Disable ANSI colors per the `NO_COLOR` standard. |
| `PATH` | Probe for `ffmpeg`/`ffprobe`/`nvcc` to detect capabilities. |

---

## Dev / test / smoke (not used in normal operation)

These configure unit tests, Playwright E2E, GPU smoke scripts, and benches. They have no effect on a normally-running app.

| Variable | Default | Purpose |
|----------|---------|---------|
| `RUN_E2E` / `RUN_VISUAL` / `RUN_BENCH` | — | Gate emotion-tts E2E / visual-regression / bench suites. |
| `CI` | — | Playwright CI behavior (retries, workers, reporter). |
| `PLAYWRIGHT_SKIP_WEBSERVER` | — | Reuse an existing dev server instead of launching Vite. |
| `WEB_HOST` / `WEB_PORT` | `localhost` / `5173` | Vite dev-server host/port for Playwright. |
| `EMOTIONTTS_HOST` / `EMOTIONTTS_DEPLOYMENT_ID` | `http://127.0.0.1:3000` / `dep_smoke` | E2E target host + deployment id. |
| `RECIPE_URL` / `RUN_DETAIL_URL` | example recipe/runs URLs | E2E target views. |
| `GIT_SHA` | `unknown` | Captured during constitution scanning for baseline reporting. |
| `DGX_HOST` / `DGX_USER` / `DGX_KEY` / `DGX_PP` / `DGX_MODELS_DIR` / `DGX_REMOTE_ROOT` / `DGX_TORCH_SPEC` | see [memory] | SSH-delegated svi2 GPU smoke on the remote DGX Spark box. |
| `PYTORCH_CUDA_ALLOC_CONF` | — | PyTorch CUDA allocator config for GPU smokes. |
| `NEXUS_I2V_*` (`COLOR_ANCHOR`, `GUIDANCES`, `LONGMP`, `SECONDS`, `TWO_PASS`, `VRAM_CEILING`) | per-script | ltx23 image-to-video smoke knobs. |
| `NEXUS_RCA_*` / `NEXUS_MSV_*` / `NEXUS_RFE_*` / `NEXUS_SD_*` / `NEXUS_AB_NF` | per-script | ltx23 render-comparison / multiscene / RIFE / seam-detail smoke knobs. |
| `NEXUS_VIDEO_LTX23_OFFLOAD_MODE` / `NEXUS_VIDEO_LTX23_FILM_AUTOSTAGE` / `NEXUS_VIDEO_LTX23_UPSCALER` / `NEXUS_VIDEO_LTX23_LTXV097_GGUF` / `NEXUS_LTXV2_SMOKE_IMAGE` | per-script | ltx23 smoke-script overrides. |
| `RCA_SKIP_B` | — | Skip the framewise-ON pass in the RCA VRAM bench. |
| `CARGO_MANIFEST_DIR` | cargo-set | Locate the workspace root for OpenAPI drift + boundary tests. |

---

## CI / build / container / spec-kit tooling

| Variable | Scope | Default | Purpose |
|----------|-------|---------|---------|
| `PYTHONUNBUFFERED` | `ci-docker-manifest` | `1` | Disable Python stdout buffering for real-time worker output. |
| `PYTHONPATH` | `sdk` | — | Prepend an extension worker `src/` to the Python module path. |
| `NEXUS_VIDEO_LONGCAT_RUNTIME` | `ci-docker-manifest` | `fake` | Video runtime mode for longcat smoke runs. |
| `LONGCAT_PLAN_EXPAND_WALL_BUDGET_S` | `ci-docker-manifest` | `60` | Wall-time budget for the LLM `plan.expand` subprocess in smoke. |
| `WALL_BUDGET_S` | `ci-docker-manifest` | `180` | Wall-time budget for a render/completion op in smoke. |
| `SCENE_COUNTS` | `ci-docker-manifest` | `2 3 5` | Scene counts to iterate in multi-scene smoke. |
| `STRICT` | `ci-docker-manifest` | `1` | Fail smoke if the compiler isn't `llm` (no fallback). |
| `PROMPT` | `ci-docker-manifest` | built-in | Override the smoke video prompt. |
| `GIT_TERMINAL_PROMPT` | `ci-docker-manifest` | — | `0` suppresses interactive git prompts during feature-branch creation. |
| `SPECIFY_FEATURE` / `SPECIFY_FEATURE_DIRECTORY` | `ci-docker-manifest` | — | spec-kit active feature branch / directory override. |

---

## See also

- [configuration.md](configuration.md) — CLI flags, `config.toml`, priority order, data-directory layout.
- [getting-started.md](getting-started.md)
- [platform-support.md](platform-support.md)
