# Feature Specification: Local LLM Extension — Rust Port (Subprocess Orchestration)

**Feature Branch**: `024-local-llm-rust-port`
**Created**: 2026-04-18
**Status**: Draft
**Input**: User description: "Port the local-llm extension from Python to Rust using Option A (subprocess llama-server orchestration) — keep release-scanner installer flow, spawn llama-server as child process, supervise, proxy OpenAI-compatible HTTP, preserve extension API surface, handle model discovery/HF/GGUF/quant variants, zero Python runtime dependency"

---

## Clarifications

### Session 2026-04-18

- Q: Where does the `llama-server` child process live? → A (2026-04-18 **superseded**): Extension spawns it using binary path + model path supplied by host; host owns the registries (binaries + models) but not the running child.
- Q (revision): Where does the `llama-server` child process live? → **A (2026-04-18 revised, binding)**: **Spawn ownership follows registration ownership.** For runtimes registered in the host's Backend Runtime Registry (llama.cpp and any future universal runtime), the **host spawns and supervises** the child and hands the extension a `RuntimeLease` with a `RuntimeChannelDescriptor` pointing at the child's loopback URL. The extension holds the lease for the duration it needs the runtime and releases it on drop / pool eviction / shutdown. For runtimes shipped *privately* inside a future extension (e.g., a VLLM extension bundling its own Python environment), the extension may spawn and supervise its own child; that path is out of scope for this spec. Rationale: llama.cpp is a universal runtime consumable by multiple extensions; host-side supervision prevents per-extension supervisor code duplication and enables cross-extension sharing of loaded models.
- Q: How does the extension learn which binary/model to use for a request? → A: Pull at Operator-call time — requests carry logical IDs (`model_id`, `runtime_variant`); the extension calls host resolution APIs (`host.runtime.resolve(...)`, `host.models.resolve(...)`) to obtain `{binary_path}` and `{file_path, gguf_meta}`. The extension never reads paths directly and never hardcodes on-disk layout.
- Q: How many `llama-server` children may run concurrently, and how are they recycled? → A: Pool keyed by `(variant, model_id)`, idle-evicted. Multiple children coexist up to a user-configurable cap (default 2). A request for an already-loaded `(variant, model_id)` reuses the live child. Children idle beyond a configurable timeout (default 10 min) are gracefully stopped to free VRAM. Exceeding the cap triggers LRU eviction before the new spawn.
- Q: How does a Rust extension plug into the host? → A: Sidecar subprocess using the existing JSON-RPC-over-stdio protocol. Manifest's `runtime.family` becomes a Rust-native value (e.g., `native`); `runtime.entrypoint` points to a compiled worker binary shipped with the extension. Host spawns the binary, the existing `nexus-extension` transport and lifecycle machinery are reused unchanged, and the sandbox/crash-isolation properties of the Python sidecar are preserved.
- Q: What happens to pre-existing extension-owned binary installs and data on upgrade? → A: Auto-migrate on first launch. Rust worker scans legacy paths under `~/.nexus/local-llm/llamacpp/*` + any extension-local model registry, calls host APIs to register them into the centralized stores, writes a `migration_marker`, and thereafter treats host stores as sole source of truth. Zero user action. User chat sessions + RAG data stay in extension-owned SQL (unchanged by migration).

### Refinement pass 2026-04-18 (post-Q1 pivot drift cleanup)

Analysis pass (`/speckit-analyze`) flagged five FRs that were written before the Q1 host-spawn pivot and drifted out of alignment with the new ownership split. They are refined in place:

- **FR-019 (BackendBusy)** — reworded from "worker senses `--parallel`" to "worker propagates host-returned `BackendBusy` errors from `acquire_lease`." Capacity shaping is host-side.
- **FR-026 (RAG parity)** — demoted from byte-identity-with-Python to *deterministic within Rust*. Cross-implementation parity moves to a follow-up spec. Rationale: parity was load-bearing on running the Python baseline, and the decoupling pivot removes any reason the Rust output should track Python's exact float-math ordering.
- **FR-029 (child log capture)** — reworded to "consume host log channel via `lease.log_channel_id`." Child stdout/stderr is never read by the extension anymore.
- **FR-030 (on-disk layout)** — reworded to "host paths are opaque; extension owns only extension-local data." Pre-pivot wording asserted specific subdirectory conventions that are now host-owned.
- **FR-031 (file locking)** — narrowed from "binary/model registries" to "files the extension itself owns." Concurrent-writer correctness on host stores is host-side.

No new requirements added; no success criteria changed. The Out-of-Scope section is extended to capture the FR-026 parity deferral.

### Architectural Principle: Decoupled Capability-Based Resolution

The host exposes **two generic, format-agnostic registries** — they are explicitly not LLM-specific, and are intended to serve future video-generation, audio-generation, image-generation, and other AI extensions with zero changes:

- **Model Store (host-owned)** — every registered model has at minimum: `id`, `format` (e.g., `GGUF`, `safetensors`, `onnx`, …), `compatible_backends` (array of backend-runtime codenames it is known to load on, e.g., `["llamacpp"]`), `file_path`, `size`, `checksum`, and format-specific metadata (for GGUF: architecture, context length, quantization, chat template; for safetensors: config.json contents, tokenizer reference; etc.). The host is responsible for listing, filtering (by format, by compatible backend, by other metadata), downloading from HuggingFace or other sources, and verifying checksums.
- **Backend Runtime Registry (host-owned)** — every registered runtime has at minimum: `codename` (e.g., `llamacpp`), `variant` (e.g., `cuda13`, `cpu`, `vulkan`), `supported_formats` (e.g., `["GGUF", "GGML"]`), `binary_path`, `version`, and capability flags (e.g., supports embeddings, supports chat, max concurrent slots). The host is responsible for release scanning, variant downloads, checksum verification, and lifecycle of the installed binaries.

The **extension is a pure consumer** of these registries. Its canonical resolution flow is:

1. Host invokes an Operator on the extension with a logical `model_id`.
2. Extension calls `host.models.get(model_id)` → receives the model entity.
3. Extension reads `compatible_backends` from the model entity and calls `host.runtimes.list({codename in compatible_backends, supports_format == model.format})` → receives candidate runtime(s).
4. Extension picks a runtime (user-preferred variant, availability, capability match).
5. Extension spawns `{runtime.binary_path}` with `{model.file_path}` and proxies the Operator's chat/embed call to the child.

Consequences for this spec:
- The extension MUST NOT hardcode the string `"llamacpp"` as its required backend. Its required capability is expressed as *"a runtime whose `supported_formats` contains `GGUF`"*, not *"the llamacpp runtime"*. In practice there is only one such runtime today; the decoupling matters for extensibility, not for user-visible behavior.
- All release-scanner, variant-installer, HuggingFace-search, GGUF-download, GGUF-header-parsing, and checksum-verification responsibilities move out of the extension and into the host's Model Store + Backend Runtime Registry. The extension retains responsibility for: spawning, supervising, and proxying the child; chat session state; RAG embedding/retrieval orchestration; and extension-declared UI / recipes / workflows.

**Resulting ownership split (binding for this spec):**
- **Host** owns: llama.cpp binary installation + release-scanner + variant registry (in `nexus-backend-runtimes`), model store + HuggingFace download + GGUF-file storage (in `nexus-models-store` + `nexus-huggingface`, aligned with spec 017 host-managed-model-store), recipe/workflow runtime, UI shell, **and the `llama-server` child process lifecycle (spawn, health probe, crash recovery, graceful shutdown) via the existing `RuntimeLease` mechanism.**
- **Extension** owns: acquiring and holding a `RuntimeLease` for the runtime it needs, HTTP proxy of OpenAI-compatible calls to the leased child via `lease.channel.base_url`, Operators (`llm.chat.turn`, `llm.prompt.compose`, `llm.output.persist`, `llm.embed.text`, `llm.rag.retrieve`), chat session + RAG storage logic, and the manifest-declared UI layouts / UI contributions / recipes / workflows.
- **Flow**: Host routes a user action → Operator handler on extension → extension calls `host.runtimes.acquire_lease({install_id, model_id, settings_override})` → host spawns (or reuses an existing) `llama-server` and returns a `RuntimeLease` with `channel.base_url` → extension proxies the OpenAI-compatible call to that URL → response streams back through the Operator. On Operator completion (or Operator cancellation / pool eviction / extension shutdown), the extension releases the lease; the host decides whether to retire the child (reference-count drops to zero) or keep it alive for other lease-holders.

---

## Background & Motivation

The builtin `nexus.local-llm` extension is currently a Python `ServiceWorker` (~2000 LOC across `worker/`, `backends/`, `chat/`, `models/`, `rag/`, `operators/`, `methods/`) that:

- Runs under CPython 3.12 embedded per extension install.
- Spawns `llama-server.exe` (or equivalent) as a child process and talks to it over loopback HTTP.
- Declares `runtime_dependencies: llama.cpp >= b4000` with acceleration variants `cpu | cuda12 | cuda13` so the installer/release-scanner picks the correct upstream prebuilt.
- Bridges JSON-RPC over stdin/stdout with the Rust host; exposes Methods, Operators, Storage schema, and UI contributions.

Shipping a CPython interpreter per extension install is the largest single footprint in the Nexus bundle, complicates signing/notarization, adds Python-version drift risk (wheels, ABI, OpenSSL), and introduces a parallel dependency-management universe. Since the extension is already a **pure subprocess orchestrator** — it does not do heavy numeric work itself — the Python runtime is load-bearing only for glue code (process supervision, HTTP client, HF API, SQLite adapter, JSON-RPC). Rewriting that glue in Rust eliminates the Python runtime entirely with no loss of capability and reuses existing in-workspace crates (`nexus-extension`, `nexus-backend-runtimes`, `nexus-huggingface`, `nexus-storage`).

Critically, this port is **Option A** — llama.cpp is still consumed as a prebuilt upstream binary via the existing release scanner. No FFI, no `llama-cpp-2` link, no CUDA toolchain choice at Rust compile time. The user's GPU/variant decision remains a pure *download* decision at install/runtime, identical to today.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Drop-in Replacement Preserving GPU Variant Choice (Priority: P1)

As a **Nexus end user** who already installed the local-llm extension with a specific llama.cpp variant (e.g., CUDA 12), I should be able to upgrade to the new Rust-based extension release without re-choosing my GPU backend, without re-downloading the llama.cpp binaries, and without losing any installed GGUF model, chat session, or RAG corpus.

**Why this priority**: This is the entire point of Option A. If existing users lose their variant selection, models, or data, the port delivers negative value versus keeping Python.

**Independent Test**: Install current Python extension, pick CUDA 13, download a 7B GGUF model, run 10 chat turns with RAG. Upgrade to Rust extension. Verify: (a) the same `~/.nexus/local-llm/llamacpp/cuda13/` binary directory is reused without re-download, (b) the same GGUF model still appears in the model registry and loads, (c) prior chat sessions are readable, (d) RAG corpus returns the same retrieval hits.

**Acceptance Scenarios**:

1. **Given** an existing install with CUDA 13 llama.cpp variant at `~/.nexus/local-llm/llamacpp/cuda13/build-b4800/bin/llama-server.exe` and 3 GGUF models registered, **When** the user upgrades to the Rust extension, **Then** the Rust worker discovers the existing binary, reuses it without re-download, and lists all 3 models with identical IDs and paths.
2. **Given** a fresh install on a Blackwell (RTX 50xx) machine, **When** the user launches the model browser and selects "Install llama.cpp — CUDA 13", **Then** the Rust worker calls the existing release-scanner, downloads the upstream CUDA 13 prebuilt, verifies checksum, extracts to the same directory layout the Python extension used, and marks the variant "ready".
3. **Given** three variants installed side-by-side (cpu, cuda12, cuda13), **When** the user switches the active backend from CUDA 12 to CUDA 13 in backend settings, **Then** the currently-running `llama-server` child process is stopped gracefully, a new process is spawned using the CUDA 13 binary, and in-flight chat requests are either completed against CUDA 12 or cleanly failed with a retry-safe error.

---

### User Story 2 — Interactive Chat Against a Running llama-server Child (Priority: P1)

As a **Nexus end user**, I open the Chat layout, pick an installed GGUF model, type a prompt, and receive a streaming response — with cancel, regenerate, and multi-turn behavior identical to today. The UI layer must not change.

**Why this priority**: Chat is the primary user-visible surface. If streaming, cancellation, or the Operator contract regresses, the extension is unshippable regardless of other wins.

**Independent Test**: With a model loaded, open the Chat layout, send a prompt, verify tokens stream back, cancel mid-stream, verify the child process stays healthy, re-send, verify history is persisted to SQLite under the same `local_llm_*` table prefix.

**Acceptance Scenarios**:

1. **Given** an active backend and a loaded model, **When** the user sends a chat turn through the `llm.chat.turn` Operator, **Then** the Rust worker forwards the request to `llama-server`'s OpenAI-compatible `/v1/chat/completions` endpoint with `stream=true` and streams SSE chunks back to the host via the Operator event channel using the same `chunk` / `done` / `error` event names the Python worker emits.
2. **Given** a streaming response in progress, **When** the user cancels, **Then** the Rust worker aborts the in-flight HTTP request within 200 ms, `llama-server` is signaled to stop generation, and the chat session is marked "cancelled" in storage rather than "errored".
3. **Given** `llama-server` has not yet finished loading the model (startup is slow for 30B+ models), **When** a chat turn arrives, **Then** the worker queues the request and emits a `backend_status=loading` health event, rather than returning an error.

---

### User Story 3 — Backend Process Supervision & Crash Recovery (Priority: P1)

As a **Nexus end user**, if `llama-server` crashes (OOM, CUDA error, upstream bug), the extension recovers automatically: the crash is reported in the backend health panel, logs are captured, and either (a) a retry is attempted with backoff, or (b) the backend is marked "unhealthy" with a clear user-facing reason and a one-click "restart" action.

**Why this priority**: Subprocess orchestration is the core of Option A. A broken supervisor turns GPU OOM into a mystery hang. Without this, the port is a regression vs Python where supervision, while imperfect, exists.

**Independent Test**: Load a model that exceeds VRAM, observe crash. Verify: crash captured within 2 s, last 200 lines of `llama-server` stderr shown in UI, health state = `unhealthy`, retry button re-spawns the process, no zombie child remains.

**Acceptance Scenarios**:

1. **Given** a running `llama-server` child, **When** the process exits with non-zero status, **Then** the worker captures exit code + last N lines of stdout/stderr, publishes a `backend.crashed` event with those details, and attempts one automatic restart with the same args; if restart also fails, the backend is marked `unhealthy` and further chat requests fail fast with `BackendUnavailable`.
2. **Given** the Rust worker is shut down (host extension unload, app quit, OS signal), **When** shutdown begins, **Then** every child `llama-server` process receives a graceful stop (HTTP `/shutdown` if supported, else `SIGTERM` / `TerminateProcess`), is given up to 5 s to exit, and is force-killed thereafter. No orphaned child must survive worker exit.
3. **Given** `llama-server` becomes unresponsive (TCP connect succeeds but `/health` times out for > 15 s), **When** the supervisor's health probe fires, **Then** the worker treats the backend as hung, force-kills it, and reports a `backend.hung` event.

---

### User Story 4 — Model Discovery, HuggingFace Download, GGUF Metadata (Priority: P2)

As a **Nexus end user**, I open the Model Browser, search HuggingFace for a model (e.g., "Qwen2.5 7B Instruct GGUF"), pick a quantization (Q4_K_M, Q8_0), download it, and see GGUF metadata (architecture, ctx length, quant type, file size, SHA) on the model detail card.

**Why this priority**: Today's Python extension owns model discovery and GGUF parsing. If we port backend supervision but lose model management, users can't acquire models. P2 because US1–US3 alone deliver value for users who already have models on disk.

**Independent Test**: From a clean install, search `qwen2.5-7b`, see ≥1 GGUF result, pick Q4_K_M, download, verify progress reporting, verify the model registers automatically with correct `context_length`, `architecture`, and `quantization` parsed from GGUF header.

**Acceptance Scenarios**:

1. **Given** a valid HuggingFace search query, **When** the user searches, **Then** the worker returns results from the HF API including model ID, author, tags, size, and whether GGUF variants exist, with paginated / cancellable streaming updates.
2. **Given** a chosen quantization file, **When** the user initiates download, **Then** the worker downloads with resume support, emits progress events (`bytes_done`, `bytes_total`, `mbps`), validates SHA-256 against the HF-reported hash, and on success registers the model with metadata parsed from the GGUF header.
3. **Given** a malformed or truncated GGUF, **When** metadata parsing fails, **Then** the download is rolled back (partial file deleted), a `model.install.failed` event is emitted with a user-readable reason, and the registry is not mutated.

---

### User Story 5 — RAG Retrieval & Embeddings (Priority: P3)

As a **Nexus end user** using a recipe that composes chat with RAG, I expect the `llm.embed.text` and `llm.rag.retrieve` Operators to return results identical in shape and ordering to the Python extension so downstream recipes continue to work.

**Why this priority**: P3 because RAG is opt-in per recipe and the scope is well-bounded — same embedding calls, same cosine-similarity retrieval, same SQLite tables. Can ship Rust extension without RAG initially and enable behind flag.

**Independent Test**: Import 50 documents into a corpus, run an embedding batch, run a top-5 retrieval for a query, compare IDs and ranks to the Python baseline captured before the port.

**Acceptance Scenarios**:

1. **Given** a corpus of embedded documents, **When** `llm.rag.retrieve` is invoked with a query and `top_k=5`, **Then** the Rust worker produces the same top-5 document IDs in the same order as the Python implementation for a fixed embedding model and seed.
2. **Given** a batch of texts in `llm.embed.text`, **When** the backend does not expose `/v1/embeddings` (some llama.cpp builds do not), **Then** the worker emits a clear capability error rather than silently returning zero vectors.

---

### Edge Cases

- User has two Nexus installs sharing the same `~/.nexus/local-llm/` directory → extension-local state (chat SQL, RAG corpora, migration marker) is treated read-mostly with advisory locking on migration-marker writes; host-owned stores are the host's concurrency problem.
- Lease acquisition times out (host is slow to spawn / model still loading) → extension surfaces `LeaseAcquireTimeout { retry_safe: true }` at the Operator boundary rather than blocking indefinitely; user-visible surfaces may retry or back off.
- Host reports the held lease's state transitions to `Crashed` / `Hung` / `Unhealthy` mid-Operator → in-flight Operator fails fast with `BackendUnavailable { retry_safe: true }`; the pool slot is evicted; the next Operator invocation acquires a fresh lease.
- Host pushes `model.removed` for a model referenced by an active lease → extension evicts the slot within 5 s; in-flight Operators against that model fail with `ModelMissing`.
- CUDA driver / toolkit mismatch is surfaced by the host through `acquire_lease` returning `IncompatibleRuntime` or the lease's state stream transitioning to `Crashed` with a host-supplied reason → extension forwards the reason verbatim; it does not probe the driver itself.
- Concurrent chat turns against the same pool slot → handled by the host's lease concurrency model; the extension forwards `BackendBusy` verbatim rather than implementing its own queue.
- Clean worker shutdown (stdio EOF, `host.shutdown`, signal) → every live `LeaseGuard` is released within 2 s (FR-015); the host is then responsible for retiring orphan children.
- Two extensions of the same family co-installed share a single host-managed `llama-server` child (keyed by `(install_id, model_id)`) → host reference-counts leases; each extension releases its own lease on drop.

---

## Requirements *(mandatory)*

### Functional Requirements

**Scope & Compatibility**

- **FR-001**: The Rust extension MUST declare the same extension ID (`nexus.local-llm`), manifest `spec_version`, and `runtime_dependencies` family (`llama.cpp`) as the Python extension, with runtime `family` changed from `builtin` (Python entrypoint) to the workspace-native Rust family and acceleration set `{ cpu, cuda12, cuda13, vulkan }` preserved.
- **FR-002**: The Rust extension MUST implement every Method, Operator, Storage migration, and UI contribution declared by the current `extensions/builtin/local-llm/manifest.yaml` with byte-compatible request/response shapes so the frontend and host require zero changes.
- **FR-003**: The Rust extension MUST NOT ship, bundle, or require a CPython interpreter, `pip`, or any Python wheel in the release artifact.
- **FR-004**: The Rust extension MUST reuse the existing SQLite schema (migrations `001`–`005` under `storage/migrations/`) without modification; if schema changes are later needed, a new migration `006_*` is introduced, never a destructive rewrite.

**Backend Runtime Consumption (was: Backend Installer & Release Scanner — moved to host)**

- **FR-005**: Release scanning, variant download, variant installation, and variant uninstallation are **host responsibilities** (owned by `nexus-backend-runtimes`). The extension MUST NOT perform HTTP calls to upstream release sources, MUST NOT manage `versions.yaml`, and MUST NOT write binary files into any runtime store directory.
- **FR-006**: On first launch after upgrade, the extension MUST run a one-shot migration routine that scans legacy extension-owned paths (`~/.nexus/local-llm/llamacpp/<variant>/<build-tag>/bin/llama-server[.exe]` and any prior extension-local model registry), calls host APIs to register the discovered binaries and models into the host's Backend Runtime Registry and Model Store, then writes a `migration_marker` preventing re-execution. The migration MUST NOT delete legacy files until the host registry confirms successful registration, at which point legacy files MAY be moved to the host-owned layout.
- **FR-007**: When the extension needs a runtime to fulfill an Operator, it MUST call `host.runtimes.list({supports_format, codename?, variant?})`. Selection among multiple candidates MUST follow this precedence: explicit user preference (persisted per-model) → highest-capability match for current hardware (e.g., CUDA over CPU if a CUDA runtime is installed and the driver permits) → any healthy candidate. The extension MUST NOT hardcode `"llamacpp"` as the required codename; the capability it requires is a runtime whose `supported_formats` contains the model's declared `format`.
- **FR-008**: Checksum verification of downloaded binaries and models is a host responsibility; the extension MUST treat paths returned by host resolution APIs as trusted inputs but MUST still validate that the file exists and is executable at spawn time, surfacing a `RuntimeMissing` error if not.
- **FR-009**: The extension MUST NOT expose `backend.variants.*` Methods. User-facing install / uninstall / list UI actions for runtimes go through host-provided APIs (the extension's manifest MAY declare UI contributions that invoke host commands, but the extension worker MUST NOT implement the install/download logic).

**Runtime Lease Consumption (was: Process Supervision — moved to host)**

- **FR-010**: The worker MUST obtain a runnable runtime by calling `host.runtimes.acquire_lease({install_id, model_id, settings_override?})` with a settings override derived from the Operator request (context size, n_gpu_layers, parallelism, extra args). It MUST NOT invoke `tokio::process::Command` against `llama-server` or otherwise create a child of its own for host-registered runtimes.
- **FR-011**: Port / transport discovery is a host responsibility surfaced via `lease.channel` (a `RuntimeChannelDescriptor` carrying a `base_url` and protocol hint). The worker MUST use `lease.channel.base_url` for all HTTP proxy calls and MUST NOT parse `llama-server` startup logs.
- **FR-012**: The worker MUST subscribe to host-pushed `backend.state` events scoped to each lease it holds and mirror the current state into its pool-slot record. State names (`Spawning | LoadingModel | Ready | Draining | Stopped | Crashed | Hung`) come from the host's state machine; the extension does not own the state vocabulary.
- **FR-013**: The worker MUST expose `backend.logs.tail(pool_key, limit)` which proxies to host log-channel `lease.log_channel_id` — logs are retrieved from the host's child-log sink, not captured a second time by the extension.
- **FR-014**: Automatic restart on child crash is a host concern. The worker MUST treat a transition to `Crashed` or `Unhealthy` on its held lease as a reason to fail in-flight Operators with `BackendUnavailable { retry_safe: true }` and drop the lease; it MAY then attempt to acquire a fresh lease on the next Operator invocation. The worker MUST NOT restart the child itself.
- **FR-015**: On worker shutdown (host `host.shutdown` event, stdio EOF, or process signal), the worker MUST call `host.runtimes.release_lease(lease_id)` for every live lease within 2 s. Orphan-child prevention is guaranteed by the host's existing `kill_on_drop` + lease-release contract; the extension's obligation is only that leases are released so the host's refcount decrements correctly.
- **FR-016**: Health probing of the child is a host responsibility. The worker MAY additionally ping `{lease.channel.base_url}/health` for fast-fail of user-visible operations (e.g., refuse a chat turn if the last probe was > 10 s ago), but MUST NOT treat such a ping as authoritative — the host's `backend.state` event stream remains the source of truth.

**Chat & Streaming**

- **FR-017**: Chat turns MUST be proxied to `llama-server`'s `POST /v1/chat/completions` with `stream=true`; SSE chunks MUST be re-emitted on the Operator event channel with existing `chunk`/`done`/`error` event types and identical payload shape.
- **FR-018**: Chat cancellation MUST abort the in-flight HTTP request within 200 ms and signal `llama-server` to free its slot; a cancelled turn MUST be recorded in storage as `cancelled`, not `errored`.
- **FR-019**: When the host returns a `BackendBusy`-class error from `acquire_lease` (lease cap exceeded, `--parallel` slots saturated, or an equivalent host-side capacity signal), the extension MUST propagate that as a structured `BackendBusy { retry_safe: true }` error on the originating Operator rather than queueing indefinitely. The extension MUST NOT attempt to sense `llama-server`'s per-lease parallelism itself — concurrency shaping is a host concern surfaced through the lease API.
- **FR-020**: Prompt composition (`llm.prompt.compose`) MUST produce a deterministic composed prompt for a given `(template_id, variables)` tuple — stable across runs; template registry is extension-local. Output persistence (`llm.output.persist`) MUST accept the request shape documented in `contracts/operators.md` and return `{"persisted": true}` on success. **Byte-identical SQL row parity with the Python worker is deferred** to a follow-up spec that lands the `nexus-storage` integration; this FR binds only the Operator protocol shape, not DB write-through. Rationale: the Python-parity clause required running the Python baseline to capture expected rows — same constraint that was relaxed in FR-026.

**Model Consumption (was: Model Management — moved to host)**

- **FR-021**: HuggingFace search, GGUF download, GGUF header parsing, and checksum verification are **host responsibilities** (owned by `nexus-models-store` + `nexus-huggingface`, aligned with spec 017). The extension MUST NOT call HuggingFace APIs directly and MUST NOT parse GGUF files. When the UI triggers a model install, it invokes host-provided install actions; the extension is not involved.
- **FR-022**: For every Operator that references a model, the extension MUST resolve the model via `host.models.get(model_id)` at call time to obtain `{file_path, format, compatible_backends, metadata}`. If the model was uninstalled between recipe authoring and invocation, the Operator MUST return `ModelMissing` with the original `model_id`, not crash and not retry.
- **FR-023**: The extension MUST use the format-specific metadata supplied by the host (e.g., GGUF `context_length`, chat template, tokenizer hints) when launching `llama-server`, instead of re-parsing the file. If required metadata is absent from the host response, the extension MUST surface `ModelMetadataIncomplete` rather than silently fall back to defaults that could yield wrong outputs.
- **FR-024**: Active `llama-server` children whose backing model is uninstalled by the host MUST be gracefully stopped within 5 s of the host's `model.removed` event; any in-flight Operator against that model MUST fail cleanly with `ModelMissing`. The extension MUST NOT delete model files itself.

**Embeddings & RAG**

- **FR-025**: The `llm.embed.text` Operator MUST call `llama-server`'s `POST /v1/embeddings` if the active model/backend supports embeddings; otherwise it MUST return a structured `CapabilityUnavailable` error with remediation text, not silently return zero vectors.
- **FR-026**: The `llm.rag.retrieve` Operator MUST produce deterministic top-K results for a given `(corpus, query, embedding_model)` tuple — ordering stable across runs via an explicit chunk-id tiebreaker. Byte-identity with the Python implementation is **deferred to a follow-up spec** (see "Out of Scope" and the Phase 7 note in plan.md); this FR binds the Rust implementation to deterministic behaviour, not to cross-implementation equivalence. Acceptance tests run against a Rust-captured golden, refreshed intentionally rather than compared to Python.

**Observability & Errors**

- **FR-027**: All errors surfaced to the host MUST be structured with a stable `code` field (e.g., `BackendUnavailable`, `ModelMissing`, `ChecksumMismatch`, `DriverMismatch`, `OutOfMemory`, `CapabilityUnavailable`), a human message, and a `retry_safe: bool` hint.
- **FR-028**: The worker MUST emit structured logs (JSON) at levels `trace|debug|info|warn|error` with fields `extension_id`, `worker_pid`, `backend_variant`, `child_pid`, `model_id`, `correlation_id` so host-side log aggregation remains consistent.
- **FR-029**: Child `llama-server` log capture is a host responsibility surfaced through `lease.log_channel_id`. The extension MUST NOT read the child's stdout/stderr directly and MUST NOT maintain an in-extension log ring buffer for the child. When the extension needs to surface child logs (e.g., `backend.logs.tail` Method responses, error `details` payloads on `BackendUnavailable`), it MUST obtain them by querying the host's log channel referenced by the held lease.

**Data & Filesystem Layout**

- **FR-030**: Runtime-binary and model-file on-disk layouts are host-owned post-pivot; the extension MUST treat paths returned by `host.runtimes.*` and `host.models.*` as opaque. The extension retains ownership of its own extension-local data at `~/.nexus/local-llm/` limited to: (a) the one-shot migration marker file (FR-006), (b) extension-scoped SQLite tables (chat sessions, RAG corpora — migrations `001`–`005`), and (c) any extension-local caches it explicitly creates. The extension MUST NOT assume a particular directory layout for host-owned stores, even for inspection.
- **FR-031**: File locking for host-owned registries (backend-runtime registry, model store index) is a host concern and out of scope for this extension. The extension MUST use OS-level advisory locking only on files it owns outright (the migration marker, and any extension-local caches introduced in future revisions). Concurrent-writer correctness on host stores is delegated to the host per spec 017 / 020.

### Key Entities

**Host-owned (referenced by, not owned by, this extension):**
- **Model** *(host Model Store)*: `{ id, format (GGUF | safetensors | …), compatible_backends[], file_path, size, checksum, format_specific_metadata }`. The extension consumes this via `host.models.*` APIs.
- **Backend Runtime** *(host Backend Runtime Registry)*: `{ codename (e.g., "llamacpp"), variant (e.g., "cuda13" | "cpu" | "vulkan"), supported_formats[] (e.g., ["GGUF","GGML"]), binary_path, version, capabilities }`. The extension consumes this via `host.runtimes.*` APIs.

**Extension-owned:**
- **Runtime Lease** *(held by extension, issued by host — `nexus-backend-runtimes::RuntimeLease`)*: A handle on a running host-supervised child, carrying `lease_id`, `install_id`, `extension_id`, a `RuntimeChannelDescriptor` (loopback URL + protocol), `log_channel_id`, and creation/release timestamps. The extension holds at most one lease per pool slot; dropping the slot releases the lease.
- **Runtime Pool**: Bounded collection of `(PoolKey, Lease)` pairs keyed by `(variant, model_id)`. Configurable cap (default 2) and idle-timeout (default 10 min); LRU eviction beyond cap. Eviction releases the underlying lease; the host is free to keep the child alive if another lease-holder is still attached, or retire it.
- **Chat Session**: Persistent multi-turn conversation record — unchanged schema (`local_llm_chat_sessions` + related tables).
- **Corpus / Document / Chunk / Embedding**: RAG entities — unchanged schema.
- **User Runtime Preference** *(optional, per-model)*: Persisted user override of the "which variant to use" default; e.g., "for model X prefer cuda13 even if cpu is also installed."

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Zero Python runtime in the shipped Nexus bundle — verified by filesystem inventory of the release artifact having no `python*.exe`, `python3*.dll`, no `.pyd`, no `site-packages/` under the extension directory.
- **SC-002**: First-run cold start (worker spawn → `ready` state with a pre-installed model) is ≤ the Python worker's baseline time on the same hardware, measured at p50 and p95 over 20 runs.
- **SC-003**: Upgrade from the Python extension to the Rust extension on an existing install preserves 100% of installed variants, registered models, chat sessions, and RAG corpora with zero user action required beyond the upgrade itself.
- **SC-004**: Shipped Nexus bundle size reduction of at least 60 MB (embedded CPython + site-packages footprint) on Windows x86_64.
- **SC-005**: Simulated `llama-server` crash (SIGKILL of the child) is detected and surfaced in the backend-health UI within 2 seconds in 95% of trials.
- **SC-006**: Worker shutdown leaves zero orphan `llama-server` processes in 100% of trials across normal exit, SIGTERM, and forced host kill.
- **SC-007**: Frontend requires zero code changes — the existing UI layouts, contributions, and Operator consumers work against the Rust worker without modification; verified by running existing Playwright visual-regression suite unchanged.
- **SC-008**: Chat streaming latency (first-token from `/v1/chat/completions` → first Operator `chunk` event emitted to host) is within 10 ms of the Python worker's baseline at p95.
- **SC-009**: Model download throughput on a 1 Gbps link matches within 5% of the Python extension's throughput for a 4 GB GGUF.
- **SC-010**: 80% unit test coverage across the new crate(s); 100% coverage on the supervisor state machine (every transition tested).
- **SC-011**: RAG top-K retrieval is deterministic — for a fixed `(corpus, query, embedding_model)` tuple, repeated invocations return identical result IDs in identical order across 100 trials. Cross-implementation parity with the Python baseline is deferred (see Out of Scope).

---

## Assumptions

### Scope

- Extension manifest, UI layouts, UI contributions, Storage SQL migrations, Operators list, and Methods list are considered a **frozen contract** for this port. Anything that changes that contract is out of scope and will be split into a follow-up spec.
- TensorRT-LLM backend adapter is **deferred** — the Python extension has a stub `TensorRtAdapter` today and the Rust port ships with llama.cpp only. TensorRT-LLM will be a separate spec once the llama.cpp path is green.
- `MCP`, OpenAI-compatible API exposed to external tools (beyond the internal host→worker channel) is out of scope here; existing MCP surface, if any, is re-exposed from the Rust worker unchanged.
- The Rust worker runs in-process with the host (linked crate) or as a co-distributed sibling binary — the decision between those two embedding models is a planning-phase concern, not a spec concern.

### Technical Architecture (informative — not spec-normative)

These are *expected* crate choices to signal direction for the planning phase; the `/speckit.plan` step may adjust.

- `tokio` — async runtime for supervisor, HTTP, download tasks.
- `reqwest` (rustls-tls, stream feature) — HTTP client for proxying to `llama-server`, HuggingFace API, release-scanner downloads.
- `tokio::process::Command` + a thin state machine — child supervision; `shared_child` or equivalent for cross-platform graceful shutdown.
- `eventsource-stream` or manual SSE parsing — for re-emitting `/v1/chat/completions` streaming.
- `serde` / `serde_json` — JSON-RPC payloads and GGUF-adjacent structured data.
- `tracing` + `tracing-subscriber` — structured logs to match FR-028.
- `gguf` crate (or equivalent) — parse GGUF header metadata for FR-023.
- `sha2` — checksum verification for FR-008, FR-022.
- `sqlx` or the existing `nexus-storage` abstraction — reuse existing storage layer; no direct `rusqlite` where it bypasses `nexus-storage`.
- Existing workspace crates reused: `nexus-extension` (manifest, Operator/Method registration), `nexus-backend-runtimes` (release scanner), `nexus-huggingface` (HF search/download), `nexus-storage`, `nexus-protocol` (JSON-RPC contracts), `nexus-provenance`.

### Migration Path

- The new Rust crate is added under `crates/nexus-local-llm/` (or hosted inside `nexus-backend-runtimes` depending on plan-phase decision).
- The extension manifest's `runtime.entrypoint` changes from `worker/main.py` to the Rust worker binary path / symbol, family changed accordingly.
- The Python `worker/`, `backends/`, `chat/`, `models/`, `rag/`, `operators/`, `methods/` trees become **deprecated source** left in-tree for one minor release as reference, then removed in a follow-up spec.
- `manifest.yaml` `runtime.environment.python_version` is removed.
- First launch after upgrade runs a lightweight `migrate_v0_python_to_v1_rust()` routine that: (a) scans `~/.nexus/local-llm/llamacpp/` for existing variant installs and registers them, (b) leaves models/chat/RAG data untouched, (c) writes a `migration_marker` file so the routine runs at most once.
- Rollback path: reinstall the prior Python-based extension version; since the data dir and SQL schema are preserved, users recover identically.

### Environment

- Target OSes v1: Windows x86_64 (primary), Linux x86_64 (secondary). macOS Metal is out of scope for this spec.
- CUDA variant tags match the release scanner: `cuda12` for Toolkit 12.x builds, `cuda13` for Blackwell/Hopper-ready 13.x builds; Vulkan and CPU variants use their existing tags.
- The user is responsible for installing a matching NVIDIA driver; the worker only reports mismatches, it does not install drivers.

### Dependencies

- Dependent on upstream `ggml-org/llama.cpp` continuing to publish prebuilt `llama-server` artifacts per variant on GitHub releases.
- Dependent on HuggingFace public API remaining available for model search/download (unchanged from today).
- Dependent on `nexus-backend-runtimes` release-scanner contract staying compatible through this port.

---

## Out of Scope

- FFI-linked llama.cpp (Option B / Option C from research) — explicitly rejected; this spec is Option A.
- CUDA toolkit auto-install, driver install, or GPU detection heuristics beyond surfacing mismatch errors.
- Multi-GPU / tensor-parallel scheduling beyond what `llama-server` itself supports via CLI args.
- New Operators, new UI layouts, new Storage tables — covered by follow-up specs if needed.
- TensorRT-LLM backend (deferred to a dedicated spec).
- macOS Metal support (deferred).
- Changes to the host's JSON-RPC / Extension protocol — the port must fit existing protocol.
- **Definition or implementation of the host-side Model Store / Backend Runtime Registry APIs themselves.** Those are host concerns (specs 017 host-managed-model-store and 020 backends-and-models-polish already cover or will cover the contract). This spec only *consumes* those APIs and declares which fields it requires; if a field is missing from the current host API, it must be added by a host-spec follow-up, not by this extension.
- Generalizing the extension beyond LLM use cases (video / audio / image generation). This spec is scoped to LLM chat + embeddings + RAG; the decoupling principle merely ensures future extensions can reuse the same host APIs without the *host* changing.
- **Byte-identity parity with the Python RAG implementation** (previously FR-026 / SC-011). Deterministic Rust behavior is required (FR-026 revised), but cross-implementation parity — running the Python baseline, capturing golden output, diffing against Rust output — is deferred to a dedicated follow-up spec that covers the Python-worker deletion story. Rationale: the decoupling pivot moves embedding + search math entirely into Rust; there is no architectural reason Rust output should be float-exact with the Python implementation, and requiring it would force us to keep a Python baseline executable purely to capture golden data.
- **Byte-identical SQL row parity for `llm.output.persist` with the Python worker** (previously FR-020). Deferred to the same follow-up spec that lands `nexus-storage` integration. The Operator protocol shape is frozen here (FR-020 revised); actual column values are out-of-scope for this spec. Rationale identical to the RAG parity deferral above: running the Python baseline purely for golden capture is not worth the carry.
