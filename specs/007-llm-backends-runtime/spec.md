# Feature Specification: LLM Backends — Runtime Management, Installer, and llama.cpp First Slice

**Feature Branch**: `007-llm-backends-runtime`
**Created**: 2026-04-14
**Status**: Draft
**Input**: User description: Nexus DNN — LLM Backends Requirements (2026-04-14). Covers Backends page truthfulness cleanup, runtime installation UX, persistent backend settings, llama.cpp upstream release wrapper, and model/backend compatibility detection. Some items may already be partially implemented; the specification must still capture them so they can be validated end-to-end.

---

## Overview

The Local LLM extension currently conflates three different concerns on one page — runtime packaging, model deployments, and running services. This feature refactors the **Backends page** into a truthful, runtime-focused surface, ships the **llama.cpp installer** as the first complete vertical slice (install → validate → configure → diagnose), and moves model-bound concerns (start/stop, GPU layer offload, model paths) to a forthcoming Deployments surface. TensorRT-LLM remains visible but must not show misleading active controls until its runtime is actually implemented.

The specification intentionally re-states behaviors that may already exist in the codebase (wrapper, manifest resolution, logging namespace) so that the delivered system can be verified against a single source of truth.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Install llama.cpp from the Backends page on a fresh machine (Priority: P1)

A user opens the extension on a clean Windows x64 machine with an NVIDIA CUDA 12 GPU. The llama.cpp card shows `NOT INSTALLED`. They click **Install**, the system resolves the correct pinned release asset for their platform/accelerator profile, downloads it, verifies its checksum, extracts it into an extension-private runtime directory, detects the `llama-server` binary, runs validation, and persists an install manifest. The card transitions to `READY` and shows version/profile labels. No manual file handling is required.

**Why this priority**: Without a working one-click installer the entire local LLM experience is blocked. This is the onboarding path every new user hits first.

**Independent Test**: Provision a clean VM, load the extension, click **Install** on the llama.cpp card, wait for the install modal to reach the `Complete` phase, and verify the card badge is `READY` with a version string. No terminal use is required.

**Acceptance Scenarios**:

1. **Given** llama.cpp is not installed and the machine is Windows x64 with CUDA 12, **When** the user clicks **Install**, **Then** the install modal opens showing the 8 required phases, the correct Windows/CUDA 12 release asset is resolved and downloaded, checksum is verified, files are extracted, `llama-server` is located, validation passes, and the card badge becomes `READY`.
2. **Given** llama.cpp is not installed and the machine is Windows x64 with no supported GPU, **When** the user clicks **Install**, **Then** the CPU asset is resolved and installed, and the card footer reflects the `windows-x64-cpu` profile.
3. **Given** an install is in progress, **When** the user clicks **Cancel** while the flow is still safely cancellable (resolve/download/extract phases), **Then** the install stops, partial files are cleaned up, the card returns to `NOT INSTALLED`, and a `cancelled` terminal state is shown.
4. **Given** the download completes but checksum verification fails, **When** the install finishes, **Then** a `checksum mismatch` failure is shown with a plain-language summary, remediation actions, the local package path, and a **Copy diagnostics** button.

---

### User Story 2 — Remove model lifecycle controls from runtime cards (Priority: P1)

A user familiar with previous builds no longer sees **Start** or **Stop** buttons on runtime cards. The Backends page only exposes runtime-scoped actions (`Install`, `Settings`, `Validate`, `Repair`, `Diagnostics`, `View details`). Model loading and service lifecycle are moved to Deployments. The user is not misled into thinking a backend card operates a running model.

**Why this priority**: The current UI implies runtime cards can "run a model", which is semantically wrong and has caused repeated confusion. Truthfulness is a prerequisite for every other action.

**Independent Test**: Open the Backends page in any runtime state (installed or not). Confirm that no card exposes Start/Stop/model-path/GPU-layers controls, and that all CTAs map to a real backend capability.

**Acceptance Scenarios**:

1. **Given** a `READY` llama.cpp card, **When** the user inspects it, **Then** the primary CTA is `Settings` and the secondary CTA is `Validate`. No `Start`, `Stop`, `Restart`, `Load model`, or `n_gpu_layers` control appears.
2. **Given** a `BROKEN` llama.cpp card, **When** the user inspects it, **Then** the primary CTA is `Repair` and the secondary CTA is `Diagnostics`.
3. **Given** the TensorRT-LLM card in the current build (runtime not yet functional), **When** the user inspects it, **Then** the badge is `UNAVAILABLE IN THIS BUILD` or `PLANNED`, no `Install`/`Activate` CTA is shown, and the details panel explains why it is unavailable.

---

### User Story 3 — Configure persistent runtime defaults for llama.cpp (Priority: P1)

A user with llama.cpp installed opens the **Settings** tab on the selected backend detail panel. They adjust threads, batch threads, default context window, parallel request limit, bind address, port mode (Auto/Fixed), and an advanced extra-arguments escape hatch. A live-generated CLI preview reflects their choices. Clicking **Save settings** persists a normalized structured config (not raw CLI text) that future deployments will use as defaults.

**Why this priority**: Without persistent defaults the user must retune every deployment, and without a CLI preview they cannot verify what will actually be executed. This is the minimum to make the runtime usable beyond a demo.

**Independent Test**: Change threads from 8 to 12, flip port mode to Fixed=43127, add an extra arg `--mlock`, click Save, restart the host, reopen Settings, confirm the values persisted, and confirm the generated CLI preview matches.

**Acceptance Scenarios**:

1. **Given** a `READY` llama.cpp runtime, **When** the user edits threads, context window, and parallel request limit and clicks **Save settings**, **Then** the values persist as structured JSON, the generated CLI preview updates live before save, and a success state is shown.
2. **Given** the user enters an invalid value (e.g., negative threads, port outside 1–65535, extra-arg that conflicts with a managed field), **When** they click **Save**, **Then** the save is blocked with an inline error explaining the conflict.
3. **Given** saved settings exist, **When** the host restarts, **Then** reopening the Settings tab shows the previously saved values unchanged.
4. **Given** port mode is `Auto`, **When** a deployment launches the runtime, **Then** an ephemeral port is chosen at launch time and recorded in runtime state; **When** port mode is `Fixed`, **Then** the specified port is always used and a bind failure surfaces a `port bind failure` diagnostic.

---

### User Story 4 — Validate an existing install and repair a broken one (Priority: P2)

A user whose machine was updated (CUDA driver upgrade, antivirus quarantine, partial disk loss) opens the Backends page and sees the llama.cpp card transition to `ISSUE`. They click **Repair**, which re-runs the install flow targeting the same release/profile without requiring manual cleanup. On success the badge returns to `READY`. Separately, they can re-run **Validate** at any time.

**Why this priority**: Without a structured repair path the only recovery is manual extraction — exactly what we promised to eliminate.

**Independent Test**: From a `READY` install, delete the `llama-server` binary, trigger validation, confirm the card moves to `broken`, click **Repair**, and confirm the card returns to `ready` without user-level filesystem work.

**Acceptance Scenarios**:

1. **Given** a `READY` install, **When** the user clicks **Validate** with no changes, **Then** the 7-step validation checklist passes and the `last validated` timestamp updates.
2. **Given** the `llama-server` binary has been removed, **When** validation runs, **Then** the card transitions to `broken` with the `required binary missing` failure category and offers `Repair` as primary CTA.
3. **Given** a short-lived health probe fails to expose the expected HTTP endpoint within timeout, **When** validation runs, **Then** the failure is recorded as `runtime validation timeout`, the probe subprocess is shut down cleanly, and structured diagnostics are persisted.

---

### User Story 5 — GGUF model selection routes the user to llama.cpp (Priority: P2)

A user chooses a local `.gguf` model in the forthcoming Deployments UI (or any model-selection surface that already exists). The system tags the model with `requires_backend_family = llama.cpp`. If llama.cpp is not installed, the UI surfaces a clear message and a **Install llama.cpp** CTA that opens the Backends install modal directly. Attempting to pair a GGUF model with a non-llama.cpp deployment is blocked early with an explanation.

**Why this priority**: Prevents wasted cycles and confusing errors when users mismatch model formats with runtimes. Directly ties the runtime layer to the most common onboarding friction.

**Independent Test**: Select a `.gguf` model with llama.cpp uninstalled; confirm the copy `This model requires llama.cpp. Install the llama.cpp runtime to continue.` appears with an `Install llama.cpp` CTA. Click the CTA and confirm the Backends install modal opens.

**Acceptance Scenarios**:

1. **Given** a `.gguf` model is selected and llama.cpp is `NOT INSTALLED`, **When** the user views model compatibility, **Then** they see the guidance copy and an `Install llama.cpp` CTA that launches the install modal.
2. **Given** a `.gguf` model is selected and llama.cpp is `READY`, **When** the user continues, **Then** llama.cpp-compatible deployment options are preferred and pre-selected where possible.
3. **Given** a TensorRT-LLM engine directory is registered as a model, **When** the user tries to pair it with a llama.cpp deployment, **Then** the combination is blocked early with a message explaining the incompatibility.

---

### User Story 6 — Observe unified, namespaced logs for installer and runtime (Priority: P2)

A user investigating a failure opens the bottom **Log Console** on the Backends page. They can filter logs by source (`All`, `Host`, `Extension`, `llama.cpp`, `TensorRT-LLM`) and level (`INFO`, `WARN`, `ERROR`). Every log line from the installer subprocess, the wrapped `llama-server` stdout/stderr, and the host is present, carries a structured extension namespace (e.g., `extension.local-llm.llama.cpp`), and includes timestamps, source, runtime id, deployment id (when applicable), and severity.

**Why this priority**: Without unified logs users cannot self-diagnose; support burden stays high. This was an explicit ask in the prior session.

**Independent Test**: Trigger an install that fails on checksum. Filter the log console to `llama.cpp` and `ERROR` and confirm the failure line appears with namespace and structured metadata. Launch a short-lived `--version` probe and confirm its stdout line shows under the `llama.cpp` source with the extension namespace.

**Acceptance Scenarios**:

1. **Given** an install is in progress, **When** the download phase emits progress, **Then** both structured events and raw line logs appear in the log console under the `llama.cpp` source.
2. **Given** a validation probe runs `llama-server --version`, **When** stdout or stderr emits lines, **Then** those lines appear line-by-line in the log console under the `llama.cpp` source AND are mirrored to the host log sink with the extension namespace.
3. **Given** the host is running, **When** the user selects the `All` filter, **Then** host, extension, and backend-scoped logs are interleaved in chronological order with each line tagged by its source.

---

### User Story 7 — See truthful status chips and summary at the page level (Priority: P3)

The Backends page header shows a concise, truthful summary: `Installed runtimes: N`, `Validated: N`, `Issues: N`. The page title/subtitle make the runtime-only scope unambiguous.

**Why this priority**: Small UI clarity win that reinforces the runtime-vs-deployment separation at a glance. Depends on per-card state being correct.

**Independent Test**: With one `READY` llama.cpp install, confirm the header shows `Installed 1 / Validated 1 / Issues 0`. Corrupt the install, refresh, and confirm `Installed 1 / Validated 0 / Issues 1`.

**Acceptance Scenarios**:

1. **Given** one `READY` runtime and one `UNAVAILABLE` runtime, **When** the page loads, **Then** header chips reflect only genuinely installed/validated runtimes (1/1/0).
2. **Given** a `broken` runtime, **When** the page loads, **Then** the `Issues` chip increments and the subtitle still reads `Install and configure local inference runtimes`.

---

### User Story 8 — Model-load options are authored in Deployments, not Backends (Priority: P3)

A user looking for `n_gpu_layers`, model path, draft model, LoRA attachments, grammar files, or per-model chat template overrides does not find them in Backends. They find them under Deployments (or equivalent model-load surface). The Backends settings page does not expose any of these model-bound fields.

**Why this priority**: Completes the semantic separation. Enforced by the absence of fields rather than a new surface, so it can land with the first slice even before Deployments is fully built.

**Independent Test**: Open Backends → Settings for llama.cpp and confirm none of the disallowed fields (see §11.3 of the requirements) are present.

**Acceptance Scenarios**:

1. **Given** the llama.cpp Settings tab, **When** the user inspects the form, **Then** no `GPU layers`, `model path`, `draft model path`, `embedding mode`, `reranking mode`, `speculative decoding pairing`, `grammar files`, `LoRA attachments`, or `per-model chat template override` fields are present.
2. **Given** a user attempts to inject a disallowed field via the `Extra arguments` escape hatch (e.g., `--n-gpu-layers`), **When** they save, **Then** the save is blocked or warned because the extra arg conflicts with a managed/forbidden field, and the conflict is explained.

---

### Edge Cases

- **Unsupported profile on current machine**: Card state resolves to `unsupported`. No misleading `Install` button appears; only `View details` explains the constraint.
- **Accelerator profile mismatch after install**: User installed CUDA 12 then the driver downgraded to CUDA 11. Validation must detect the `CUDA mismatch` and move the card to `broken`.
- **Concurrent install clicks**: Only one install flow per backend may be active. Additional clicks while `installing`/`updating` are disabled; the primary CTA reads `Installing…` / `Updating…`.
- **Network interruption mid-download**: Install surfaces `download failed` with remediation; partial files are cleaned up before retry.
- **Extraction failure due to disk full / AV quarantine**: Surfaces `extraction failed` with local package path and remediation.
- **Port bind failure when port mode is Fixed**: Runtime emits a `port bind failure` diagnostic; validation fails with the same category.
- **Process exits unexpectedly during validation probe**: Emits `unexpected process exit`, captures the final stdout/stderr lines into logs, cleans up, and marks validation failed.
- **Extra arguments clashing with managed fields**: Save is blocked with an inline conflict explanation.
- **Antivirus or OS signing block on `llama-server.exe`**: Surfaces `dependency load failure` with a remediation hint.
- **Resuming an interrupted install when safe**: Where extraction has partially completed and the downloaded package is still valid, the flow resumes from the last safe phase rather than re-downloading.
- **TensorRT-LLM card after runtime becomes available in a future build**: Card transitions from `UNAVAILABLE` to the normal state ladder without UI regressions.
- **Backends card shown on a machine with a single supported profile**: Card shows the supported profile summary line; no profile picker is exposed in the runtime card UI for the first slice.

---

## Requirements *(mandatory)*

### Functional Requirements — Page & Navigation

- **FR-001**: The Backends page MUST be scoped strictly to runtime management (install, validate, configure, diagnose, logs) and MUST NOT expose model selection, service lifecycle (Start/Stop/Restart), or model-load options.
- **FR-002**: Left navigation MUST reflect the separation: `Backends` = runtimes; `Deployments` = model loading and running services; `Metrics` = normalized telemetry; `Settings` = global extension/host preferences.
- **FR-003**: The Backends page header MUST display the title `Backends`, the subtitle `Install and configure local inference runtimes`, and three status chips `Installed runtimes: N`, `Validated: N`, `Issues: N` computed from real runtime state.
- **FR-004**: The Backends page MUST present one card per backend family, with llama.cpp and TensorRT-LLM as the first two cards in the initial slice.
- **FR-005**: The Backends page MUST NOT contain a separate "service control" section in the first slice.
- **FR-006**: The Backends page MUST include a selected backend detail panel with tabs/sections for Overview, Settings, Install Info, and Diagnostics, and a bottom Log Console.

### Functional Requirements — Runtime Cards

- **FR-010**: Every backend card MUST contain: backend icon, display name, one-line value proposition, implementation status badge, install status badge, installed version or pinned release id (when installed), supported platform summary for the current machine, primary CTA, secondary CTA area, and `last validated` / `not yet validated` text.
- **FR-011**: Each card MUST resolve to exactly one of the following states at any time: `unsupported`, `not_installed`, `installing`, `installed_unvalidated`, `ready`, `broken`, `updating`.
- **FR-012**: CTAs on the llama.cpp card MUST match the following contract per state:
  - `unsupported` → primary: none; secondary: `View details`.
  - `not_installed` → primary: `Install`; secondary: `View details`.
  - `installing` → primary: `Installing…` (disabled); secondary: `View progress`.
  - `installed_unvalidated` → primary: `Validate`; secondary: `Settings`.
  - `ready` → primary: `Settings`; secondary: `Validate` / `Repair`.
  - `broken` → primary: `Repair`; secondary: `View diagnostics`.
  - `updating` → primary: `Updating…` (disabled); secondary: `View progress`.
- **FR-013**: No card MUST expose `Start`, `Stop`, `Restart`, or any model-scoped action.
- **FR-014**: The TensorRT-LLM card MUST follow the full CTA contract **only when the runtime is implemented in the current build**. Otherwise, its badge MUST be `UNAVAILABLE IN THIS BUILD` or `PLANNED`, it MUST have no `Install`/`Activate` CTA, and its details panel MUST explain why it is unavailable.
- **FR-015**: Required copy for the llama.cpp card in key states MUST match the requirements document (§7.4), including "GGUF-first local runtime using the upstream llama-server executable" (not installed) and "Use this runtime from Deployments to load GGUF models" (ready).

### Functional Requirements — Installer

- **FR-020**: The Local LLM extension MUST ship a **pinned version manifest** listing supported llama.cpp releases by id/tag, per OS family, CPU architecture, and accelerator profile, including source URLs and (when present) checksums.
- **FR-021**: The installer MUST resolve a runtime asset matching OS family, CPU architecture, accelerator profile, and CUDA line (when applicable) based on the current machine.
- **FR-022**: The installer MUST NOT require source compilation in the normal install flow. It MUST wrap the upstream release executable package.
- **FR-023**: The installer MUST execute the 8 phases in order: `Resolve release`, `Download package`, `Verify package`, `Extract files`, `Detect binaries`, `Validate runtime`, `Save install manifest`, `Complete`.
- **FR-024**: The install modal MUST show the phase list with status icons, a progress bar, bytes downloaded / total (when known), elapsed time, a scrolling live log, a **Cancel** button while cancellation is safe, and a **Close** button only after a terminal state (`completed`, `cancelled`, `failed`).
- **FR-025**: On failure, the modal MUST expose a failure panel with: failure category, user-facing summary, actionable remediation, local package path (when one was created), raw command (when safe to expose), and a **Copy diagnostics** action.
- **FR-026**: The installer MUST extract into an extension-private runtime directory following the layout `<workspace>/extensions/builtin/local-llm/runtimes/llama.cpp/<release_id>/<profile>/package/` with a sibling `manifest.json`.
- **FR-027**: Each install manifest MUST include: backend id, release id/tag, source URL, checksum (when available), platform, accelerator profile, `installed_at`, binary paths, validation status, validation timestamp.
- **FR-028**: The installer MUST persist the install manifest only after the install phase succeeds, and MUST update validation status/timestamp atomically when validation completes.
- **FR-029**: Supported first-slice profiles MUST be: Windows x64 (CPU, CUDA 12, CUDA 13), Linux x64 (CPU, CUDA 12, CUDA 13). Vulkan / HIP / SYCL are out of scope for the first slice and MUST NOT be exposed in UI unless the resolver and validator fully support them.
- **FR-030**: The installer MUST be cancellable during `Resolve release`, `Download package`, `Verify package`, and `Extract files`. Cancellation MUST clean up any partial files and end in the `cancelled` terminal state.
- **FR-031**: The installer MUST be re-runnable via a **Repair** CTA that targets the same release/profile without requiring manual cleanup.

### Functional Requirements — Validation

- **FR-040**: Validation MUST be separate from installation and MUST be re-runnable at any time from the card (`Validate` CTA) or the Diagnostics tab.
- **FR-041**: llama.cpp validation MUST execute the following 7 checks in order: (1) `llama-server` binary exists; (2) binary executes `--version` or equivalent probe successfully; (3) required dependent libraries load; (4) the runtime package matches the selected profile metadata; (5) a short-lived health probe process starts; (6) the expected HTTP health endpoint is reachable within timeout; (7) the health probe shuts down cleanly.
- **FR-042**: Validation output MUST be persisted as structured diagnostics (category, title, plain-language explanation, likely cause, suggested actions, technical details block, copy-report action).
- **FR-043**: Validation failure MUST move the card state to `broken` or `installed_unvalidated` as appropriate, with failure categories drawn from §15 of the requirements document.

### Functional Requirements — Persistent Backend Settings (llama.cpp)

- **FR-050**: The Settings tab MUST expose only persistent runtime defaults. It MUST NOT expose per-chat-session or model-bound controls.
- **FR-051**: Section A (General) MUST expose: `Accelerator profile` (`CPU`, `CUDA 12`, `CUDA 13`), `Threads` (integer), `Batch threads` (integer), `Default context window` (integer), `Parallel request limit` (integer).
- **FR-052**: Section B (Network) MUST expose: `Bind address` (default `127.0.0.1`, MUST NOT default to `0.0.0.0`), `Port mode` (`Auto`, `Fixed`), and `Fixed port` (visible only when `Port mode = Fixed`).
- **FR-053**: Section C (Advanced) MUST expose: `Extra arguments` (multiline text or tokenized list, appended after validated generated args) and a read-only `Argument preview` showing the final generated command.
- **FR-054**: The Argument preview MUST update live as the user edits form fields, before save.
- **FR-055**: Saving MUST be explicit (`Save settings` action); invalid values MUST block save with inline errors; saved data MUST be written as normalized structured JSON (not raw CLI text).
- **FR-056**: The following fields MUST NOT be on the Backends Settings tab for the first slice: GPU layers to offload, model path, draft model path, embedding mode toggle, reranking mode toggle, speculative decoding pairing, grammar files, LoRA attachments, per-model chat template overrides.
- **FR-057**: Extra arguments that conflict with a managed field MUST be detected at save-time and either blocked or warned with a clear explanation.

### Functional Requirements — Launch Spec Generation

- **FR-060**: The host/runtime adapter MUST convert normalized runtime settings into a deterministic launch spec (binary path + arg vector).
- **FR-061**: For llama.cpp, the generator MUST map normalized fields to CLI args as follows (at minimum): `bind_address` → `--host`, selected port → `--port`, `threads` → `--threads`, `threads_batch` → `--threads-batch`, `default_context` → `--ctx-size`, `parallel_requests` → `--parallel`. Extra arguments MUST be appended after managed args.
- **FR-062**: In `Auto` port mode the effective port MUST be selected at launch time and recorded in runtime state.
- **FR-063**: Generated launch specs MUST be deterministic: given the same normalized settings and the same Auto-picked port, the generator MUST produce the same arg vector byte-for-byte.

### Functional Requirements — Model/Backend Compatibility

- **FR-070**: Any local model asset with a `.gguf` extension MUST be tagged `requires_backend_family = llama.cpp`.
- **FR-071**: A model registered as a TensorRT-LLM engine/checkpoint directory MUST be tagged for TensorRT-LLM and MUST NOT be offered for llama.cpp deployments.
- **FR-072**: Pairing a GGUF model with a non-llama.cpp deployment, or a TensorRT engine directory with a llama.cpp deployment, MUST be blocked early with an explanation.
- **FR-073**: When the user selects a GGUF model and llama.cpp is `NOT INSTALLED`, the UI MUST display the exact guidance `This model requires llama.cpp. Install the llama.cpp runtime to continue.` with an `Install llama.cpp` CTA that opens the Backends install modal.
- **FR-074**: `n_gpu_layers` and all other model-load settings that depend on model size, quantization, or GPU/VRAM budget MUST live on the deployment model-load form, not on the Backends Settings tab.

### Functional Requirements — Logging & Observability

- **FR-080**: All installer steps (release resolution, HTTP download, checksum verification, extraction, binary detection, validation subprocess) MUST emit both structured log events and raw line logs.
- **FR-081**: When any wrapped llama.cpp process runs (validation probe, deployment launch, repair), stdout and stderr MUST be captured line-by-line and written to: the extension log stream, the host log sink, and (when running under a deployment) the deployment-scoped runtime log history.
- **FR-082**: Every captured log line MUST include metadata: timestamp, source = `llama.cpp`, runtime id, deployment id (when applicable), severity (when inferred), and raw message.
- **FR-083**: Logs originating from the wrapped llama.cpp process MUST be namespaced under the extension (e.g., `extension.local-llm.llama.cpp`) so host log filters can isolate them.
- **FR-084**: The host global log view MUST support filtering by: All, Host, Extension, llama.cpp, TensorRT-LLM, and by standard levels (INFO, WARN, ERROR).
- **FR-085**: The runtime adapter MUST emit structured events for: install started/progress/completed/failed, validation started/passed/failed, runtime settings updated, process launch requested, process started, process healthy, process unhealthy, process stopped, process exited unexpectedly.

### Functional Requirements — Diagnostics

- **FR-090**: Diagnostics for llama.cpp MUST classify failures into at least the following categories: `asset resolution failed`, `download failed`, `checksum mismatch`, `extraction failed`, `required binary missing`, `dependency load failure`, `port bind failure`, `invalid runtime settings`, `runtime validation timeout`, `model file missing`, `model incompatible`, `model load failure`, `CUDA mismatch`, `GPU unavailable`, `out of memory`, `unexpected process exit`.
- **FR-091**: The Diagnostics panel MUST expose per-failure: category, title, plain-language explanation, likely cause, suggested next actions, a collapsible technical-details block, and a `Copy report` button that emits a single shareable diagnostics bundle.

### Functional Requirements — APIs

- **FR-100**: The host MUST expose the following endpoints for the Backends page:
  - `GET  /api/v1/llm/backends`
  - `GET  /api/v1/llm/backends/{backendId}`
  - `POST /api/v1/llm/backends/{backendId}/install`
  - `POST /api/v1/llm/backends/{backendId}/validate`
  - `POST /api/v1/llm/backends/{backendId}/repair`
  - `GET  /api/v1/llm/backends/{backendId}/settings`
  - `PUT  /api/v1/llm/backends/{backendId}/settings`
  - `GET  /api/v1/llm/backends/{backendId}/logs`
  - `GET  /api/v1/llm/backends/{backendId}/diagnostics`
- **FR-101**: The host MUST publish the following progress/event stream topics: `llm.backend.install.progress`, `llm.backend.install.completed`, `llm.backend.install.failed`, `llm.backend.validation.completed`, `llm.backend.settings.updated`, `llm.backend.log`.
- **FR-102**: API responses MUST use the project's consistent response envelope (success/status indicator, data payload, error field, metadata for paginated responses).

### Functional Requirements — Persistence & Lifecycle

- **FR-110**: Runtime install manifests and runtime settings records MUST persist across host restarts and MUST be queryable by backend family and profile.
- **FR-111**: Deleting a runtime install MUST be an explicit, confirmed action; it MUST NOT be triggered as a side effect of validation or repair.
- **FR-112**: A deployment record (in the forthcoming Deployments surface) MUST reference exactly one backend family, one runtime install, one runtime settings record, one model identity, and one model-load policy record. The Backends feature MUST expose stable identifiers that deployments can reference.

---

### Key Entities

- **Backend family**: A normalized adapter identity (e.g., `llama.cpp`, `TensorRT-LLM`). Independent of any installed package.
- **Runtime install record**: A validated local installation of a backend-family package. Key attributes: `runtime_install_id`, `backend`, `release_id`, `platform`, `accelerator_profile`, `install_path`, `binary_path`, `status`, `installed_at`, `validated_at`.
- **Runtime settings record**: Persistent launch defaults for a given backend family (optionally bound to a specific install ref). Key attributes: `runtime_settings_id`, `backend`, `install_ref`, `threads`, `threads_batch`, `default_context`, `parallel_requests`, `bind_address`, `port_mode`, `fixed_port`, `extra_args`.
- **Version manifest entry**: A pinned release description shipped with the extension that enumerates per-OS/arch/accelerator assets with source URLs and checksums.
- **Install task**: An in-flight installation with current phase, progress, captured logs, cancellation token, and terminal state.
- **Validation result**: Structured record of each of the 7 validation checks with pass/fail, message, timestamp, and failure category when applicable.
- **Diagnostic record**: Classified failure with category, title, explanation, cause, actions, technical details, and originating event ids.
- **Runtime log line**: Structured log entry with timestamp, source, runtime id, deployment id (optional), severity, raw message, and extension namespace.
- **Deployment reference (forward-compat only)**: A stable identifier shape that the Deployments feature will resolve to `(backend_family, runtime_install, runtime_settings, model_identity, model_load_policy)`; this specification commits to the reference surface only.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user on a clean, supported machine installs llama.cpp and reaches the `READY` state in under 5 minutes over a typical broadband connection, without manual extraction or terminal use.
- **SC-002**: 100% of Backends page cards map every visible CTA to a real backend or host capability (verified by a UI audit that enumerates every button and traces it to a backing endpoint).
- **SC-003**: 0 Start/Stop/model-bound controls exist on runtime cards across all defined card states (verified automatically in CI via a layout snapshot test).
- **SC-004**: ≥95% of llama.cpp installs that reach the `Verify package` phase complete successfully across the supported profiles in the first slice (Windows x64 CPU/CUDA 12/CUDA 13, Linux x64 CPU/CUDA 12/CUDA 13).
- **SC-005**: When validation fails, ≥90% of failures are classified into a specific category from §15 of the requirements document (not "unknown") and include an actionable remediation string.
- **SC-006**: Saved runtime settings persist across ≥10 host restarts with zero drift (byte-identical normalized JSON on reload).
- **SC-007**: Generated launch specs are deterministic: identical normalized settings + identical Auto-picked port produce byte-identical arg vectors in 100% of test runs.
- **SC-008**: Selecting a `.gguf` model with llama.cpp uninstalled surfaces the install CTA in under 1 second of page-load time in ≥95% of sessions.
- **SC-009**: 100% of stdout/stderr lines from wrapped llama.cpp processes during validation probes and installer subprocesses are captured and visible in the log console under the correct namespace (verified by a log-coverage test that launches a probe and asserts line counts match).
- **SC-010**: A broken install is detected by validation and surfaced as `broken` (not silently failing later) in ≥99% of tested corruption scenarios (missing binary, removed dependent library, truncated package).
- **SC-011**: The TensorRT-LLM card shows no installable/activatable control until its runtime is actually implemented; this is verified by a CI assertion against the TensorRT-LLM card's CTA contract.
- **SC-012**: Users who encounter a failure can copy a single diagnostics report that contains category, explanation, cause, suggested actions, and technical details in ≥99% of failure scenarios.

---

## Assumptions

- The existing Local LLM extension (spec `005-local-llm-chat-extension`) already defines the normalized backend adapter contract, the Python SDK v2 surface, and the namespaced SQLite tables for the extension, and this feature extends — not replaces — those contracts.
- The existing UI extension-layout renderer introduced in recent work (see uncommitted `apps/web/src/layout/layout_renderer.tsx` and `component_registry.tsx`) is the rendering surface for the Backends page; this specification does not dictate component file names or the renderer's internals.
- The host already supports the extension-storage contributions defined in spec `004-extension-storage-contributions`; runtime install and settings records will be stored in `ext_local_llm_*` tables consistent with that spec.
- The host already supports structured event streaming; the `llm.backend.*` topics will be published on that existing stream.
- Python-side adapter work (ServiceWorker, ManagedProcess, StreamingExecution, HealthReporter, ArtifactIO from `nexus_sdk 0.2.0`) is available and will be used rather than reintroduced.
- First-slice platforms are Windows x64 and Linux x64. macOS, Vulkan, HIP, and SYCL are explicitly out of scope for this slice.
- "Pinned version manifest" ships inside the builtin `local-llm` extension. Updating the manifest is an extension update, not a user action.
- The Deployments surface is not delivered by this feature. This feature delivers only the reference surface (stable runtime install ids and settings ids) that Deployments will consume.
- Documents, pitch decks, or external integrations are out of scope.
- Security: all wrapped processes bind to loopback by default; exposure on `0.0.0.0` requires an explicit, audited user action and is not in the first slice.
- Some items in this specification may already be partially implemented in the working tree. Those items are retained so the delivered system can be verified end-to-end rather than assumed correct.

---

## Out of Scope

- Multi-backend orchestration on one page.
- Arbitrary advanced llama.cpp flags exposed as first-class UI controls (beyond the Section A–C fields).
- Embeddings and reranking-specific controls on the runtime page.
- Model Start/Stop on runtime cards.
- TensorRT-LLM installer (only the truthful unavailable card is in scope).
- Remote runtimes and cluster scenarios.
- Vulkan, HIP, SYCL accelerator profiles.
- macOS packaging.
- Building llama.cpp from source as part of the normal install flow.

---

## Phased Delivery (informational)

The following order is recommended to keep each slice independently demonstrable:

- **Phase 1 — UI truthfulness cleanup**: remove model-lifecycle semantics from runtime cards; scope Backends to runtime only.
- **Phase 2 — llama.cpp installer vertical slice**: version manifest, asset resolver, downloader/extractor, install manifest persistence, validation flow, install modal with phase progress and live logs.
- **Phase 3 — llama.cpp settings + launch spec**: persistent settings UI, normalized settings storage, generated CLI preview, diagnostics panel.
- **Phase 4 — model compatibility routing**: GGUF tagging, backend recommendation, blocking incompatible combinations, offload-layer surface migrated to deployment model-load form.
- **Phase 5 — telemetry integration**: stdout/stderr capture, host log mirroring, backend event stream, diagnostics and repair UX.

The recommended immediate next slice after this specification is approved is **Phase 2**, scoped to: install, validate, settings, diagnostics, logs — and explicitly excluding start, stop, model selection, and GPU layers.
