# Feature Specification: Model Catalog & Backend Lifecycle

**Feature Branch**: `010-model-catalog-lifecycle`
**Created**: 2026-04-15
**Status**: **Scope-adjusted (Path A)** — shipped scope defined in "Scope Adjustments" below. Items descoped to spec 011 are labeled `→ 011` inline.
**Input**: User description: "Sprint: 1 bug fix + 1 feature. Fix: backend install/activation state not persisted across page reload; after activation, 'model loaded' prompt appears with empty models list. Feature: Hugging Face model search, list installed models, install/download from HF with routing (GGUF→llama.cpp, TRT-compatible→TensorRT-LLM), load selected model into active backend, configure and persist inference hyperparameters."

## Scope Adjustments (post-analysis, 2026-04-15)

After implementation and `/speckit.analyze` review, three capability areas were explicitly descoped from spec 010 because they depend on a host-level process supervisor that does not yet exist:

1. **Actually swapping the model in a running llama-server process (FR-012)** — the `POST /models/{id}/load` endpoint is present and validates inputs, but the runtime-side model swap is **not implemented**. Blocked on spec 011 (`host-runtime-pool`) which introduces the shared process supervisor. Until then, "load" is an advisory operation that records intent.
2. **Resumable long-running operations (FR-017)** — model installs today run synchronously over HTTP. Mid-flight page reload breaks. Progress streaming over the event bus is **deferred**; requires the same process-supervisor plumbing in spec 011.
3. **Backend-state reconciler rewrite (US1 AS2-AS3, FR-002)** — frontend-side phantom "Not installed" and phantom "Model loaded" bugs are fixed by the `/load-state` truth endpoint + useEffect hydration. The deeper reconciler policy (probe can only transition `installed → needs_repair`, never to `not_installed`) is **deferred to spec 011**, where runtime install state will also move to host-level tables.

**What DID ship in spec 010**:
- Shared `nexus-huggingface` capability (search, detail, download, cache, token).
- Generic `/api/v1/huggingface/*` routes + per-extension `/api/v1/extensions/{extId}/huggingface/*` family (Option C architecture).
- End-to-end model install flow: HF search → routing decision → download → checksum → DB commit.
- Conservative format-aware routing (GGUF → llama.cpp; prebuilt TRT engine → TRT; YAML-driven architecture allowlist).
- Hyperparameter persistence + validation against per-model limits extracted from `config.json` at install time.
- Truthful `/load-state` endpoint driven from the backend adapter registry.
- Fake "Model loaded" client-side timeout removed; real API check in its place.
- ModelsPanel frontend wired into the extension's chat layout.

Items below annotated with `→ 011` are blocked on spec 011 and not part of 010's acceptance.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Backend Install/Activation State Persists Across Reload (Priority: P1)

As a user who has installed and activated a local inference backend (e.g., Llama.cpp), I expect the app to remember that state after closing or reloading the page, so I don't have to reinstall the runtime every session.

**Why this priority**: Today the app is unusable across sessions — every reload forces the user back to a "not installed" empty state. This blocks every downstream LLM workflow (chat, RAG, evaluations). It is the P1 correctness gate; nothing else in this sprint matters if the backend state silently resets.

**Independent Test**: Install a backend, activate it, hard-reload the app, and observe that the backend card shows "Installed / Active" with its real version and path — and that no install prompt appears.

**Acceptance Scenarios**:

1. **Given** no backend is installed, **When** the user completes the Llama.cpp install and activation flow, **Then** the backend card transitions to an "Installed" state and this state is persisted to durable storage before the flow reports success.
2. **Given** a backend is installed and active, **When** the user reloads the page, **Then** the backend card reads "Installed / Active" from durable storage on first render — without re-running the install probe or prompting to install again. `→ 011` *(reconciler policy moves to host pool; spec 010 ships a frontend-side fix that queries `/load-state` on mount and overrides hardcoded YAML defaults)*
3. **Given** a backend was installed but its binary has been deleted or corrupted on disk, **When** the app starts, **Then** the backend is shown as "Needs repair" (not "Never installed") and the user is offered a targeted re-download, preserving any associated settings. `→ 011`
4. **Given** a backend is installed and active, **When** the user opens the Local Chat surface, **Then** the UI does not display "Model loaded" unless a concrete model is actually loaded and present in the active backend. ✅ *(shipped via `/load-state` endpoint + `backend_selector.tsx` real-API check; fake timeout removed)*

---

### User Story 2 - Unified Model Catalog: Installed + Hugging Face Search (Priority: P1)

As a user, I want a single model catalog surface that shows every model already installed locally and lets me search Hugging Face for new ones, so I can discover, compare, and choose models without leaving the app.

**Why this priority**: Model discovery/install is the first real user-facing capability once the backend state bug is fixed. Without it, users have to manually drop GGUF files into a folder. Installing one model end-to-end from this surface is the smallest viable MVP slice that proves the whole feature loop (search → install → appear in installed list).

**Independent Test**: Open the Models panel, confirm already-installed models appear, type a search query (e.g. "qwen2.5 gguf"), see Hugging Face results with relevant metadata, and install one — it should then appear in the "Installed" section.

**Acceptance Scenarios**:

1. **Given** the Models panel is open, **When** it first renders, **Then** it lists all locally-installed models with name, size on disk, format (GGUF / safetensors / TRT engine), and the backend that can serve them.
2. **Given** the user enters a search query, **When** results return from Hugging Face, **Then** each result shows model id, author, downloads, license, size, quantization variants (for GGUF), and a badge indicating which local backend (if any) can run it.
3. **Given** the user filters by format, license, or size, **When** filters are applied, **Then** both the HF result set and installed list respect the filter consistently.
4. **Given** the user clicks "Install" on an HF model, **When** the download begins, **Then** a progress indicator shows bytes transferred and ETA, and the operation can be cancelled without leaving a partial file registered as "installed".
5. **Given** a model is installed, **When** installation completes, **Then** it appears in the "Installed" section within 2 seconds without requiring a manual refresh, and its checksum has been verified against the source manifest.

---

### User Story 3 - Format-Aware Backend Routing on Install (Priority: P2)

As a user picking a model from Hugging Face, I don't want to think about which runtime can serve it — the app should route GGUF to Llama.cpp automatically, flag TensorRT-LLM-compatible models as such, and refuse (with an explanation) combinations that cannot run on any installed backend.

**Why this priority**: Prevents the common failure mode of "model installed but nothing can run it". Ships on top of US2, but US2 is still useful for GGUF-only users without it.

**Independent Test**: Search HF, filter to TensorRT-LLM-compatible models, install one; observe it is tagged with the TRT backend and excluded from Llama.cpp's usable list. Then install a GGUF model and observe the inverse.

**Acceptance Scenarios**:

1. **Given** a GGUF model in HF results, **When** the user installs it, **Then** it is registered under the Llama.cpp backend and appears selectable only when Llama.cpp is the active runtime.
2. **Given** an HF model that publishes a prebuilt TensorRT-LLM engine or has officially supported safetensors conversion, **When** shown in results, **Then** it is badged "TensorRT-LLM compatible" with a tooltip explaining the detection signal (engine artifact present, architecture in TRT-LLM support list, or conversion recipe available).
3. **Given** a model has no path to any installed backend, **When** the user attempts to install, **Then** the UI blocks the action and explains what backend (or conversion step) would be needed.

---

### User Story 4 - Configure Hyperparameters (Priority: P2) — (load-into-process `→ 011`)

As a user, I want to configure inference hyperparameters (temperature, top_p, top_k, repetition penalty, context length, GPU layers, etc.) per model — and have those settings persist so I don't reconfigure on every session.

**Why this priority**: Hyperparameter persistence is user-visible value even before the runtime can "load" a model into a running process. Configuration outlives any single process lifecycle.

**Scope split (post-analyze)**: Persisting and validating hyperparameter profiles ships in spec 010. **Actually applying them to a running llama-server process** (swap-in-place) ships in spec 011 together with the process supervisor.

**Independent Test**: Install a model, set hyperparameters via PATCH, reload the page, reopen the model — values are preserved. Invalid values (e.g., context length exceeding the model's declared max) return 422 with the offending field named.

**Acceptance Scenarios**:

1. **Given** a model is installed and its backend is active, **When** the user clicks "Load", **Then** the system records the load intent and returns a load task handle. `→ 011` *(spec 010 endpoint returns a task id but does not actually swap the model in a running process)*
2. **Given** a model is installed, **When** the user adjusts a hyperparameter and applies it, **Then** the change is persisted per-model. ✅ *(shipped; `PATCH /hyperparameters` validates + stores)* — the "takes effect on subsequent inference turns" half `→ 011`.
3. **Given** the user reloads the page, **When** the Models panel reopens, **Then** the persisted hyperparameter profile is visible; whether the model itself is resident in a running backend process `→ 011`.
4. **Given** an invalid hyperparameter combination (e.g., context length larger than the model's max), **When** the user tries to apply, **Then** the API returns **422 `HYPERPARAMETERS_OUT_OF_RANGE`** naming the offending field and limit. ✅ *(shipped)*

---

### Edge Cases

- HF is unreachable (offline, rate-limited, auth required for gated model) — search degrades gracefully and clearly distinguishes "no results" from "could not reach Hugging Face".
- Gated / license-locked models — user is shown the license gate and the install is blocked until acceptance is done on HF's side (app does not accept licenses on the user's behalf).
- Disk full or download interrupted — partial files are cleaned up; the model is not listed as installed.
- Checksum mismatch on a downloaded artifact — install is rejected and a user-visible reason is shown.
- Concurrent installs of the same model — deduplicated; only one download runs.
- Backend binary disappears while a model is loaded — UI transitions to "Backend unavailable" rather than falsely showing "model loaded".
- User uninstalls a backend that has loaded models — those models are marked unavailable, their settings are preserved, and re-installing the backend restores them.
- Hyperparameter profile exists for a model that has since been deleted — settings are retained but hidden until the model reappears.

## Requirements *(mandatory)*

### Functional Requirements

**Backend lifecycle (bug-fix scope)**

- **FR-001**: The system MUST persist backend installation state (installed / not installed, version, install path, activation status) to durable storage atomically before reporting install success to the UI. *(existing install pipeline already transactional; formal `tracing::instrument` span on `backend.install.commit` `→ 011`)*
- **FR-002**: On app start, the system MUST hydrate backend cards from durable storage without requiring a fresh install probe, and only run a lightweight presence check to detect drift (e.g., binary removed externally). `→ 011` *(hydration works today; the probe-as-reconciler policy moves with the runtime pool)*
- **FR-003**: The system MUST distinguish three backend states in the UI: *Not installed*, *Installed & active*, *Installed but unavailable / needs repair* — with no false "Not installed" after a successful prior install. `→ 011` *(requires `needs_repair` state propagated through the host runtime registry)*
- **FR-004**: The system MUST NOT display a "Model loaded" indicator unless a concrete model is currently loaded in the active backend and is addressable by the inference layer. ✅

**Model catalog & Hugging Face search**

- **FR-005**: Users MUST be able to open a unified Models surface that shows installed models and Hugging Face search results in clearly separated sections.
- **FR-006**: The system MUST support Hugging Face model search by free-text query with filters for format (GGUF, safetensors, TRT engine), license, approximate size, and backend compatibility.
- **FR-007**: For each HF result, the system MUST show: model id, author, license, downloads, total artifact size, available quantization variants (if GGUF), and a backend-compatibility badge.
- **FR-008**: Users MUST be able to install an HF model with a cancellable, progress-tracked download, including checksum / content-hash verification against the upstream manifest before the model is marked installed.
- **FR-009**: The system MUST automatically route installed models to a compatible backend — GGUF to Llama.cpp; models with a prebuilt TensorRT-LLM engine or a supported conversion path to the TensorRT-LLM backend — and record the routing decision in durable storage.
- **FR-010**: The system MUST block installation and explain the reason when no installed backend can run a chosen model.
- **FR-011**: Users MUST be able to delete an installed model; the system MUST free the backing storage and remove it from selectable lists while retaining the user's per-model hyperparameter profile (hidden, restorable on reinstall). **DEFERRED** *(no delete endpoint in spec 010; backlog)*

**Load & hyperparameters**

- **FR-012**: Users MUST be able to load a specific installed model into the currently active backend and receive truthful load-progress feedback. `→ 011` *(endpoint scaffold present in spec 010; the actual model-swap into a running process requires the spec 011 process supervisor)*
- **FR-013**: The system MUST expose an editable hyperparameter panel per model covering at minimum: temperature, top_p, top_k, repetition penalty, max context length, and GPU layer count. **PARTIAL** — API side shipped (PATCH + validation); the React form component is scaffolded but not a full UI. Backlog item.
- **FR-014**: The system MUST validate hyperparameter inputs against per-model limits (e.g., model's declared max context length) and reject invalid combinations with a clear reason. ✅ *(shipped — 422 `HYPERPARAMETERS_OUT_OF_RANGE` with field + reason)*
- **FR-015**: The system MUST persist hyperparameter profiles per model across sessions and restore them on reload. ✅
- **FR-016**: The system MUST surface the live "which model is loaded" state from the backend (not from stale client cache) whenever the Models or Chat surface is opened. **PARTIAL** — `/load-state` endpoint returns truth (`loaded_model_id: null` today until supervisor exists in spec 011); ModelsPanel doesn't yet highlight the loaded model. Backlog.

**Cross-cutting**

- **FR-017**: All long-running operations (install, load, unload) MUST be resumable at UI level. `→ 011` *(spec 010 installs are synchronous-over-HTTP; resumable streaming rides on the host event-bus plumbing shipped with the process supervisor)*
- **FR-018**: The system MUST log backend- and model-lifecycle transitions with enough detail to diagnose "phantom state" bugs. ✅ *(`#[tracing::instrument(name = "model.install", ...)]` span landed)*

### Key Entities

- **Backend Runtime Installation**: represents an installable inference engine (Llama.cpp, TensorRT-LLM). Attributes: engine id, installed version, binary/library paths, install state, activation state, last health check.
- **Installed Model**: a locally-resident model artifact set. Attributes: model id, source (HF repo id or local import), format, quantization variant, total size on disk, checksum, routed backend, installation timestamp.
- **Hugging Face Model Result**: a non-persistent search hit. Attributes: HF repo id, author, license, downloads, declared formats and variants, inferred backend compatibility.
- **Hyperparameter Profile**: per-model, per-user settings. Attributes: model id, temperature, top_p, top_k, repetition penalty, context length, GPU layers, other backend-specific knobs, updated_at.
- **Load State**: ephemeral runtime fact owned by the backend. Attributes: active model id (nullable), load progress, last error.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: After reloading the app with a prior install, the UI no longer shows the fake "Model loaded" indicator from a client-side timer. Manually smoke-verified; 50-reload automated run `→ 011`.
- **SC-002**: Users can find and install a compatible GGUF model from Hugging Face end-to-end (search → select → install → see in Installed list). Target <2 min for <5 GB artifact on broadband *(install is synchronous in spec 010; streaming progress UX `→ 011`)*.
- **SC-003**: HF results are labeled "backend-compatible" only from conservative signals (GGUF file present, or prebuilt TRT engine artifact, or architecture in YAML allowlist). ✅
- **SC-004**: Hyperparameter changes persist across host-process restarts. ✅ *(JSON round-tripped through `ext_local_llm_model_installs.hyperparameters`)*
- **SC-005**: Automated coverage of the install/load/reload/unload flow. **DEFERRED** — blocked on process supervisor (`→ 011`); until then, `/load-state` returns `loaded_model_id: null` and automation has nothing to verify beyond the persistence path.
- **SC-006**: The count of user-reported "had to reinstall my backend after reload" issues drops to zero. Partial — the *frontend* phantom-state bug is fixed; the reconciler-side policy `→ 011`.

## Assumptions

- Hugging Face public API is the model-discovery source of truth; authenticated/gated models require the user to authorize on HF directly.
- Llama.cpp (GGUF) is the guaranteed local backend; TensorRT-LLM support ships where the runtime is installable on the user's host (NVIDIA GPU + supported CUDA), and gracefully hides otherwise.
- Existing extension-storage namespacing (`ext_local_llm_*` tables established in spec 004/005/007) is the durable home for backend install state, installed model registry, and hyperparameter profiles — this sprint extends those tables rather than introducing a new store.
- Model downloads use the user's default network egress; no built-in proxy/mirror is in scope for this sprint.
- The sprint targets the Local Chat surface and the Backend Runtimes panel; other surfaces (RAG, evaluations) continue to consume backend/model state read-only.
- "Backend compatibility" for TensorRT-LLM is inferred from (a) presence of a prebuilt TRT-LLM engine artifact in the HF repo, or (b) a known-supported architecture with a documented conversion recipe — anything else is marked "unknown", never falsely "compatible".
