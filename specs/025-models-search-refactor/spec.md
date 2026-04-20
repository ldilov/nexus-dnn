# Feature Specification: Models Search Refactor — Universal Model Catalog

**Feature Branch**: `025-models-search-refactor`
**Created**: 2026-04-19
**Status**: Draft
**Input**: User description: "Refactor the Models Search page into a universal, format-aware, backend-aware model catalog. Reference: `model-search.zip` mockup (Spectral Graphite / Kinetic Observatory direction) and `models-search-refactor-spec.md` requirements brief."

## Overview

Today's Models Search page is a Hugging Face search optimised almost exclusively for `llama.cpp` / GGUF workflows. It treats "a model" as "one downloadable file," flattens GGUF quantizations into a single "GGUF available" state, ignores non-LLM modalities, and hard-codes the idea that `llama.cpp` is the only runtime that matters.

This feature refactors the page — and the supporting backend surface **required by the page** — into a **universal model catalog** that can discover, classify, filter, and download multiple model artifact types across multiple AI domains (LLM, image, video, upscaler, audio, embedding) while staying first-class for the current GGUF / `llama.cpp` experience.

**Scope boundary:** All UI changes are strictly confined to the Models Search page. Global navigation, shell chrome, side nav, top nav, and every other surface in the application are out of scope. Backend changes are limited to what this page needs in order to behave correctly.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Selectable GGUF quantizations (Priority: P1)

A power user searches for a Llama-family chat model. The repository publishes six GGUF quantizations (`Q2_K`, `Q4_K_M`, `Q5_K_M`, `Q6_K`, `Q8_0`, `F16`). The user wants to pick the `Q5_K_M` variant because it fits their VRAM budget and download only that one.

**Why this priority**: This is the single most-used flow today. GGUF + `llama.cpp` is the product's current strength; flattening it into a generic "GGUF available" chip is the single biggest UX regression in the current implementation. MVP must preserve and upgrade this path before anything else.

**Independent Test**: Open the Models Search page, query `llama-3`, locate a GGUF repository card, expand its variant list, click download on `Q5_K_M`, and confirm a download job is created that targets exactly that file (not the whole repo, not a different quant). The installed-variant indicator on the card then shows `Q5_K_M` as installed, and re-clicking is a no-op / "already installed" state.

**Acceptance Scenarios**:

1. **Given** a GGUF repository with multiple quantizations, **When** the card renders, **Then** each quantization appears as a distinct row with its own filename, size, and download control.
2. **Given** the card shows variants `Q4_K_M`, `Q5_K_M`, `Q8_0`, **When** the user clicks download on `Q5_K_M`, **Then** the system creates a download job whose target is the `Q5_K_M` artifact's filename and URL, not the parent repository id.
3. **Given** a quantization is already installed locally, **When** the variant row renders, **Then** it shows an "installed" indicator and the download control is replaced by a state-appropriate control (remove, re-verify, or disabled).
4. **Given** a repository has a recommended or default quant (e.g. a `Q4_K_M` tagged as recommended by upstream metadata or heuristic), **When** the card renders, **Then** that variant is visually distinguished as default.

---

### User Story 2 — Backend-aware compatibility filtering (Priority: P1)

A user with only `llama.cpp` installed opens the page and wants to see only models that will actually run on their machine. They pick the `llama.cpp` backend filter; the grid narrows to GGUF/GGML results. Later, when a hypothetical second backend is added to the registry, the same UI mechanism must start offering that backend without code changes to the page.

**Why this priority**: This is the structural guarantee of the refactor. If compatibility filtering stays hard-coded to "format == gguf," every future backend becomes an expensive UI migration. The fix is to have the page consume a runtime capability registry instead of embedded rules.

**Independent Test**: Call the backends capability endpoint and confirm it lists `llama.cpp` with supported formats `["gguf", "ggml"]`. Then, in the page, toggle the `llama.cpp` backend filter on — only results classified as compatible with those formats remain visible. Temporarily stub a second backend into the registry (e.g. `diffusers` supporting `safetensors`); the filter list updates to include it without any page-code changes.

**Acceptance Scenarios**:

1. **Given** the backends endpoint returns a list of enabled backends, **When** the page loads, **Then** the backend filter control is populated from that list and not from a hard-coded enum.
2. **Given** backend `llama.cpp` advertises `supportedFormats = ["gguf", "ggml"]`, **When** the user selects it, **Then** only repositories that expose at least one `gguf` or `ggml` artifact remain visible.
3. **Given** the backends endpoint fails or times out, **When** the page recovers, **Then** format-based filtering still works (the page does not become unusable) and the user is shown a non-blocking notice that backend-aware filtering is degraded.
4. **Given** a backend advertises `status = "experimental"`, **When** the filter is rendered, **Then** it is labelled as experimental so the user does not mistake it for a production target.

---

### User Story 3 — Multi-format discovery beyond GGUF (Priority: P1)

A user searches for `stable-diffusion-xl`. The primary result is a Hugging Face repository that publishes `diffusion_pytorch_model.safetensors`, a required `vae.safetensors`, a text encoder, and a tokenizer. The current page would show this as one undifferentiated card with no safe action. The refactored page must render it as a single model family, show that it is a multi-artifact model with a required VAE dependency, classify it as "downloadable but not runnable in the current runtime," and let the user pull the whole bundle or only the primary weights.

**Why this priority**: This is the core of "universal model store." Without it, the refactor is cosmetic. It also forces the domain model (Repository → Family → Artifact → Variant → Dependency) to be real rather than theoretical.

**Independent Test**: Query `stable-diffusion-xl`, locate the SDXL card, confirm it exposes `format = safetensors`, `modality = image`, a VAE dependency marker, and a compatibility badge reading `downloadable_but_not_runnable` (because no image backend is enabled). Click "Download bundle" — the system creates a download job whose resolved artifact list contains the primary weights **and** the VAE. Click "Download primary only" on a different model — the job contains only the primary weights.

**Acceptance Scenarios**:

1. **Given** a repository with `safetensors`, `pytorch_model.bin`, or `.pth` primary artifacts, **When** the card renders, **Then** the format is shown explicitly and the download action is enabled.
2. **Given** a model family with a declared required VAE, **When** the card renders, **Then** a dependency indicator is visible and the action set includes at minimum "Download primary" and "Download bundle."
3. **Given** the user clicks "Download bundle" on such a model, **When** the download job is created, **Then** the resolved artifact list contains the primary artifact plus every `required` dependency, and the response carries any compatibility or conflict warnings.
4. **Given** no enabled backend supports the model's format, **When** the card renders, **Then** the compatibility badge reads `downloadable_but_not_runnable` and the action set must not imply the model is runnable (no "Run" / "Deploy" affordance).

---

### User Story 4 — Precision transparency (Priority: P2)

A user inspects a safetensors model whose metadata does not declare precision. The system should not lie. It should show `fp16 (assumed)` (or an equivalent "inferred" treatment) rather than `fp16` as if authoritative, so the user can make an informed decision.

**Why this priority**: Correctness and trust. Misrepresenting inferred metadata as authoritative is the kind of bug that silently burns a user who budgeted VRAM on a wrong assumption. Low implementation cost; high credibility payoff.

**Independent Test**: Ingest a fixture repository whose safetensors file has no precision metadata. The normalized artifact record carries `precision = "fp16"` and `precisionSource = "inferred"`. The card renders a visually distinct "inferred" treatment (tooltip, typography, or suffix) and never presents inferred values as authoritative.

**Acceptance Scenarios**:

1. **Given** precision is explicitly present in repository metadata, **When** the artifact is normalized, **Then** `precisionSource = "explicit"` and the UI renders the value plainly.
2. **Given** precision is not present but can be inferred from filename/format heuristics, **When** the artifact is normalized, **Then** `precisionSource = "inferred"` and the UI disambiguates the value (e.g. `fp16 · assumed`).
3. **Given** precision cannot be inferred, **When** the artifact is normalized, **Then** `precision = "unknown"` and the UI reads `precision unspecified`.

---

### User Story 5 — Download lifecycle and progress (Priority: P2)

A user triggers a download for `Llama-3-8B-Q4_K_M.gguf`. The UI must reflect state transitions (`queued → downloading → downloaded`), expose progress, survive a page refresh, and refuse to re-queue a download for an already-installed artifact.

**Why this priority**: Without visible lifecycle, the "download" button is a prayer. Also the natural moment to prevent duplicate downloads.

**Independent Test**: Start a download, refresh the page mid-transfer — progress picks up where it left off (or at worst re-reads state from the backend). Try to re-trigger the same variant while it is downloading — the control is idempotent or explicitly "already queued." After completion, the variant shows `downloaded` and the control becomes "remove / re-verify," not another download.

**Acceptance Scenarios**:

1. **Given** a download job is created, **When** its state changes, **Then** the card reflects one of `{not_downloaded, queued, downloading, paused, downloaded, failed, incompatible}` per artifact.
2. **Given** a download fails, **When** the card renders the state, **Then** the user sees a non-technical error message and a retry affordance.
3. **Given** an artifact is already `downloaded`, **When** the user re-clicks download, **Then** the system does not create a duplicate job.
4. **Given** the page is reloaded mid-download, **When** the card renders, **Then** progress and state are read from the backend job, not reset.

---

### User Story 6 — Filters, sort, and URL-persisted state (Priority: P2)

A user composes a query (`"llama" + format=gguf + backend=llama.cpp + license=Apache-2.0`, sorted by "most downloaded"), shares the URL with a teammate, and the teammate opens the same page in the same state.

**Why this priority**: Power-user polish and shareability. Low technical cost once the routing is wired.

**Independent Test**: Apply filters, sort, view mode, and query. Copy the URL. Open it in a fresh tab. The page restores identical state without any additional clicks.

**Acceptance Scenarios**:

1. **Given** the user changes query, filters, sort, or view mode, **When** the URL updates, **Then** it reflects the current state in a stable, parseable form.
2. **Given** the user lands directly on such a URL, **When** the page loads, **Then** it restores query, filters, sort, and view mode from the URL before the first render of results.
3. **Given** the user clears all filters, **When** the URL updates, **Then** no stale filter parameters remain.

---

### User Story 7 — Safe handling of unsupported repositories (Priority: P3)

The search returns a repository whose file layout the normalization layer cannot classify with confidence. The page must still render the result (not crash, not hide it by default unless the user asked), mark it clearly as "unsupported" or "unknown," and degrade its action set to safe, non-misleading options.

**Why this priority**: Reliability at the long tail. Hugging Face is messy; the page must tolerate mess.

**Independent Test**: Point the normalizer at a fixture repo with an ambiguous layout. The search result renders, the compatibility badge reads `unsupported` or `unknown`, and the action set contains "View details" / "Open source" but no enabled "Download" or "Run."

**Acceptance Scenarios**:

1. **Given** a repository yields no classifiable primary artifact, **When** the card renders, **Then** it is visibly marked as unsupported/unknown.
2. **Given** such a card, **When** the user interacts with it, **Then** no action implies that the model is installable or runnable.
3. **Given** such a card, **When** the page is rendered at scale alongside classifiable cards, **Then** the page layout does not break or shift because of the unsupported entry.

---

### Edge Cases

- **Repository with mixed artifact types** (e.g. both GGUF and safetensors): must render as one family with multiple artifacts and multiple variants; backend filter narrows which are considered compatible.
- **Repository with duplicate filenames** across shards or revisions: must be de-duplicated deterministically (stable ordering, stable artifact identity).
- **Upstream search timeout** or rate-limit: must surface an error state with retry, not a blank grid.
- **Partial metadata**: missing size, missing sha, missing license. The card must render; missing fields must read as "unknown," never as `0 bytes` or `null`.
- **Disk full / write failure during download**: the job must transition to `failed` with a useful message; the card must not remain stuck at `downloading` forever.
- **Backend registry returns empty list**: backend filter disables itself with a clear explanation; format-based filtering continues to work.
- **Reduced-motion preference**: any motion in the page (skeleton shimmer, hover reveals) respects `prefers-reduced-motion`.
- **Narrow viewport**: grid collapses to list view without losing the variant picker or action set.
- **GGUF repo with dozens of quantizations**: variant list is scrollable within the card; page does not become unusably tall.
- **License field absent**: filter chip for license must not crash; such results do not match any specific license filter but remain visible when no license filter is applied.

## Requirements *(mandatory)*

### Functional Requirements — Search & Indexing

- **FR-001**: The page MUST allow free-text search across repository name, owner, tags, description, and known architecture/type fields.
- **FR-002**: The page MUST normalize every result into the application's internal model representation before rendering.
- **FR-003**: The system MUST NOT assume all results are LLMs; non-LLM repositories MUST be representable and filterable by modality.
- **FR-004**: Classification of a repository's artifacts MUST consult repository metadata first, and fall back to filename-based heuristics only when metadata is absent or inconclusive.
- **FR-005**: Unsupported or partially classified repositories MUST still be returned in results and rendered; they MUST be explicitly marked as such (see FR-062). By default, results classified as `unsupported` or `unknown` are **hidden** from the grid; a `Show unsupported` toggle in the filter bar reveals them, and that toggle state MUST be persisted in the URL (see FR-093).

### Functional Requirements — Format Support

- **FR-010**: The system MUST recognize and classify, at minimum, these artifact formats: `gguf`, `ggml`, `safetensors`, PyTorch `.bin`, and `.pth`.
- **FR-011**: GGUF and GGML artifacts MUST be represented as backend-eligible, quantization-bearing artifacts.
- **FR-012**: `.safetensors` and PyTorch `.bin` MUST be treated as canonical PyTorch-family artifacts by default, subject to future backend-specific overrides.
- **FR-013**: `.pth` artifacts MUST remain classifiable even when repository metadata is sparse.
- **FR-014**: An artifact whose format cannot be determined MUST be recorded with `format = "unknown"` and MUST NOT break normalization.

### Functional Requirements — Variants

- **FR-020**: GGUF quantizations (e.g. `Q4_K_M`, `Q5_K_M`, `Q6_K`, `Q8_0`, `F16`) MUST be first-class selectable variants in the domain model, not a single collapsed state.
- **FR-021**: The download contract MUST accept a specific variant identity; it MUST NOT be possible to "download the GGUF repo" generically.
- **FR-022**: For each variant, the UI MUST show availability, local install state, file size (when known), and (when determinable) a default / recommended marker.
- **FR-023**: The system SHOULD surface a recommended default variant when one can be determined from metadata or heuristic (e.g. `Q4_K_M` for 8B-class models as a common sweet-spot).
- **FR-024**: Variant state MUST include `{not_downloaded, queued, downloading, paused, downloaded, failed, incompatible}`.

### Functional Requirements — Precision

- **FR-030**: When precision is explicitly known from repository metadata, the system MUST record `precisionSource = "explicit"`.
- **FR-031**: When precision is not explicit but can be reasonably inferred, the system MUST record both the inferred value and `precisionSource = "inferred"`.
- **FR-032**: The UI MUST NOT present inferred precision identically to explicit precision; inferred values MUST be visually disambiguated (text suffix, tooltip, or equivalent treatment).
- **FR-033**: When precision cannot be determined, the system MUST record `precision = "unknown"` and render `precision unspecified` in the UI.

### Functional Requirements — Dependencies & Bundles

- **FR-040**: The data model MUST support a primary artifact plus zero or more dependencies of roles such as `vae`, `text_encoder`, `tokenizer`, `controlnet`, `lora`, `scheduler`, `other`.
- **FR-041**: Dependencies MUST be expressible as `required` or `optional`.
- **FR-042**: Download actions MUST support requesting (a) the primary artifact only, (b) a specific selected variant, and (c) a full bundle including required dependencies. Named bundle presets (`minimal` / `recommended` / `full`) and an advanced per-dependency picker are **out of scope for v1**; the v1 card action set for dependency-bearing families is exactly `Primary` and `Bundle (required deps)`.
- **FR-043**: The UI MUST indicate when a model is incomplete without a required dependency.
- **FR-044**: The dependency model MUST be extensible so future roles can be added without changing the page contract. Future preset or advanced-picker additions MUST NOT require changes to the download API's request shape (the v1 `includeDependencies` flag is the extension point).

### Functional Requirements — Backend Capability Registry

- **FR-050**: The page MUST fetch the list of runtime backends and their capabilities dynamically from a backend capability registry, not from hard-coded UI logic.
- **FR-051**: For each backend, the registry MUST expose at minimum: identifier, display name, supported formats, quantization support, multi-artifact support, and enablement status (`enabled`, `experimental`, `disabled`).
- **FR-052**: Selecting a backend in the filter MUST restrict compatible results to formats that backend supports.
- **FR-053**: If only one backend exists today, the UX MUST still be registry-driven; adding a second backend MUST NOT require page-code changes.
- **FR-054**: If the backend registry fetch fails, the page MUST degrade gracefully: backend filter disables or shows an error, format filter still works, search still works.

### Functional Requirements — Compatibility Classification

- **FR-060**: Each search result MUST carry a compatibility classification chosen from: `compatible`, `compatible_with_requirements`, `downloadable_but_not_runnable`, `unsupported`, `unknown`.
- **FR-061**: The classification MUST be derived from the intersection of the result's formats and the enabled backends' supported formats, plus presence of required dependencies.
- **FR-062**: The UI MUST render compatibility status without relying on color alone (shape, icon, or text label MUST be present).

### Functional Requirements — Filtering & Sorting

- **FR-070**: The page MUST support filtering by: query, format, backend, modality, license, compatibility state, install state, and a `Show unsupported` toggle (default: off; hides results whose compatibility classification is `unsupported` or `unknown`).
- **FR-071**: The page SHOULD additionally support filtering by owner/publisher, parameter size bucket, precision, and quantization family when upstream data quality permits.
- **FR-072**: The page MUST support sorting by at minimum: relevance, most downloaded, trending / most liked, recently updated, and alphabetical.
- **FR-073**: The page SHOULD support secondary sorts: smallest download size, largest model size, compatible-first.
- **FR-074**: Filters and sort SHOULD be server-driven where the upstream source supports it.

### Functional Requirements — Download & Install Flow

- **FR-080**: Downloads MUST work for every recognized artifact format (`gguf`, `ggml`, `safetensors`, `.bin`, `.pth`).
- **FR-081**: Every download request MUST identify the exact artifact or variant being downloaded.
- **FR-082**: Download state MUST be tracked per artifact and expose: `not_downloaded`, `queued`, `downloading`, `paused`, `downloaded`, `failed`, `incompatible`, `auth_required`.
- **FR-083**: Progress MUST be trackable per artifact.
- **FR-084**: Downloads SHOULD be resumable where the storage layer permits.
- **FR-085**: Duplicate download requests for the same already-installed artifact MUST be prevented or merged into the existing job.
- **FR-086**: The system MUST persist enough metadata locally to map an installed artifact back to its upstream family, variant, format, and source provider.
- **FR-087**: The host MUST enforce a **fixed cap of 2 concurrent active download jobs**. When the cap is reached, additional download requests MUST be accepted and persisted in the `queued` state, and MUST transition to `downloading` automatically as slots free (FIFO order by job creation time, except that `paused → resumed` jobs reclaim their prior slot when one is available).
- **FR-088**: The concurrency cap value is a single host-level constant (not a user-facing setting in v1) and MUST be represented as one named constant in the host code so it can be lifted without touching UI or contract.

### Functional Requirements — UI / Page-Level Behaviors

- **FR-090**: The page MUST support grid and list view modes.
- **FR-091**: The page MUST provide skeleton loading, empty, and error states that are distinct and visually unambiguous.
- **FR-092**: Search input MUST be debounced.
- **FR-093**: Query, filter, sort, view state, `Show unsupported` toggle, current `page`, and `pageSize` MUST all be reflected in the URL so the page is shareable and reloadable.
- **FR-094**: Cards MUST be composed from reusable sections (header, modality/type badges, compatibility badge, artifact summary, variant selector, dependency summary, actions, local state) rather than being branched end-to-end per model type.
- **FR-095**: Format-specific card behaviors:
  - GGUF / GGML cards MUST expose selectable quantization variants directly on the card; the installed or selected variant MUST be visually distinct; a recommended default variant MAY be highlighted.
  - Safetensors / PyTorch cards MUST show canonical format and precision; when dependencies are declared the card MUST expose them; image/video model cards MUST surface dependency status such as "VAE required" or "Bundle available."
  - Unsupported / partially recognized cards MUST still render with safe, degraded actions (e.g. disabled install, "View details").
- **FR-096**: Card action set MUST be deterministic for a given classification and MUST NOT hide backend assumptions behind buttons (no "Install" button on a model no backend can run).
- **FR-097**: Filters, sort controls, variant selectors, and action buttons MUST be keyboard-accessible and have visible focus states.

### Functional Requirements — Backend (supporting this page only)

- **FR-100**: A normalization layer MUST transform upstream repository data into internal DTOs covering repository, family, artifact, variant, dependency, and compatibility fields defined in this spec.
- **FR-101**: A capability registry MUST expose the enabled backends and their supported formats, quantization support, and multi-artifact support.
- **FR-102**: A download API MUST accept an exact artifact or variant identity and optionally `includeDependencies`; it MUST return a job identity, resolved artifact list, dependency list, and any compatibility or conflict warnings.
- **FR-103**: A download-job status API MUST return current state and progress for a given job id.
- **FR-104**: A single-model API MUST return a normalized family with all its artifacts, variants, dependencies, and per-backend compatibility.
- **FR-105**: Normalization MUST tolerate unknown, partial, or duplicate upstream data without crashing: unknowns become explicit "unknown" markers, partials render as far as possible, duplicates collapse deterministically.
- **FR-106**: Adding a new runtime backend MUST require only: capability registration, format mapping, optional install logic — and MUST NOT require edits to the search page's contract.
- **FR-107**: File classification heuristics MUST be isolated and testable with fixtures representing realistic repository layouts.

### Functional Requirements — Upstream Authentication

- **FR-110**: The host MUST support an **optional** user-supplied Hugging Face access token stored in host settings (reusing the existing settings/secret mechanism; the token value MUST NOT be exposed to the frontend after it is saved).
- **FR-111**: When an HF token is present, the host MUST attach it to both the search request and every download request issued to Hugging Face.
- **FR-112**: When an HF token is absent, search and download MUST still function for public repositories; gated or private repositories MUST surface a dedicated failure reason (e.g. `auth_required`) rather than a generic `failed` state.
- **FR-113**: The UI MUST represent `auth_required` as a distinct, non-color-dependent state on the card (e.g. an "Access gated — add HF token in settings" affordance) and MUST NOT leak the token itself into URLs, logs, or error messages.
- **FR-114**: Changing the HF token in settings MUST invalidate any cached compatibility/search result that previously failed with `auth_required`, so the user sees recovered results on next search without a full app restart.

### Non-Functional Requirements

- **NFR-001 (Performance)**: Typing in the search input MUST feel immediate; the input itself MUST not block on search (debounced dispatch).
- **NFR-002 (Performance)**: The page MUST paginate results using **numbered pages**. Current page number and page size MUST be expressed as URL parameters (`page`, `pageSize`) and MUST round-trip through FR-093. Back/forward navigation MUST restore the previous page deterministically without re-fetching already-cached pages. Infinite scroll and "Load more" are explicitly out of scope.
- **NFR-003 (Performance)**: Rendering variants for a card with many quantizations MUST NOT cause noticeable re-render cost across the rest of the grid.
- **NFR-004 (Reliability)**: The page MUST behave predictably for incomplete or malformed upstream metadata (see FR-105).
- **NFR-005 (Reliability)**: Download status MUST survive page refresh and navigation.
- **NFR-006 (Accessibility)**: All interactive controls (filters, sort, variant selector, actions) MUST be reachable and operable via keyboard.
- **NFR-007 (Accessibility)**: Status, compatibility, and state indicators MUST NOT rely on color alone.
- **NFR-008 (Maintainability)**: Artifact-format logic MUST live in a shared normalization/business layer and MUST NOT be duplicated across components.
- **NFR-009 (Maintainability)**: Card sections MUST be componentized; one-off per-model branches inside a monolithic card are disallowed.
- **NFR-010 (Scope containment)**: No files outside the Models Search page's module(s) and the backend modules directly powering it MUST be modified.

## Key Entities

- **Model Repository**: The upstream source entry (typically a Hugging Face repo). Attributes: repo id, source provider, owner, name, description, license, tags, download count, like count, last updated, modality (`llm`, `image`, `video`, `audio`, `upscaler`, `embedding`, `other`).
- **Model Family**: A normalized app-level representation of a model that may span multiple artifacts (e.g. `meta-llama/Llama-3-8B-Instruct`, `stabilityai/stable-diffusion-xl-base-1.0`). A family owns artifacts, variants, and dependencies.
- **Artifact**: A concrete downloadable asset. Attributes: artifact id, role (`primary`, `vae`, `text_encoder`, `tokenizer`, `controlnet`, `lora`, `scheduler`, `other`), format (`gguf`, `ggml`, `safetensors`, `pytorch-bin`, `pth`, `unknown`), precision (`fp32`, `fp16`, `bf16`, `int8`, `quantized`, `unknown`), precision source (`explicit`, `inferred`, `unknown`), size bytes, filename, download URL, sha256 if available.
- **Variant**: A selectable option within a family or artifact set. Attributes: variant id, type (`quantization`, `precision`, `checkpoint`, `other`), human label, artifact id(s) it maps to, default flag.
- **Dependency**: A relation between a primary artifact and a companion artifact. Attributes: role, required/optional, target artifact id (same family) or external pointer.
- **Backend Capability**: A runtime backend and its capabilities. Attributes: backend id, display name, supported formats, supports quantized variants (bool), supports multi-artifact models (bool), status (`enabled`, `experimental`, `disabled`).
- **Compatibility Status**: A per-result classification chosen from `compatible`, `compatible_with_requirements`, `downloadable_but_not_runnable`, `unsupported`, `unknown`.
- **Download Job**: An installation job for a selected artifact, variant, or bundle. Attributes: job id, target artifact id(s), state (`not_downloaded | queued | downloading | paused | downloaded | failed | incompatible`), progress, bytes done / total, created at, finished at, warnings.

## Clarifications

### Session 2026-04-19

- Q: Bundle download surface for dependency-heavy models — ship presets, advanced picker, or minimal? → A: Option A — `Primary` + `Bundle (required deps)` only in v1; no presets, no advanced picker.
- Q: Default visibility of unsupported-but-downloadable results — show by default, hide + toggle, or conditional? → A: Option B — hide by default; reveal via a `Show unsupported` toggle; state is URL-persisted.
- Q: Authentication for gated / private Hugging Face repositories — anonymous only, optional token, or required token? → A: Option B — optional user-supplied HF token stored in host settings; attached to search and download when present; absence is tolerated (gated repos simply 403).
- Q: Pagination / result-set loading strategy — infinite scroll, load-more, or numbered pages? → A: Option C — numbered pages with `page` + `pageSize` URL parameters; back-navigation deterministic; SWR cache keyed per page.
- Q: Concurrent download cap — serial, fixed 2, unbounded, or user-configurable? → A: Option B — fixed cap of 2 concurrent active download jobs; additional requests enter `queued` and start as slots free.

### Resolved with defaults (see Assumptions)

- **Direct import of external model URLs/repos**: **Out of scope for v1.** Discovery is search-based only. (Mockup's "Import External Model" tile renders as a disabled / coming-soon affordance.)
- **Install-state scope**: **Local-machine-specific for v1.** Same upstream artifact installed on two machines counts as two independent local installs; no cross-device sync in this feature.
- **Precision display format when inferred**: **Deferred — default applied.** UI renders inferred precision as `fp16 · assumed` (mid-dot suffix) to match the Spectral Graphite editorial tone. Low impact; revisitable at plan or implementation time without structural change.

## Success Criteria

### Measurable Outcomes

- **SC-001**: A power user can search for a GGUF model, pick a specific quantization, and start a download in under **3 clicks and under 5 seconds** from the moment the page is in focus (query already typed).
- **SC-002**: For a representative sample of 50 Hugging Face repositories covering GGUF, safetensors, `.bin`, `.pth`, mixed-format, and dependency-bearing cases, normalization produces a result without crashing for **100%** and classifies primary format correctly for at least **95%**.
- **SC-003**: **Zero** hard-coded references to `llama.cpp` or to the string `gguf` remain in the search page's compatibility-filter code path; the filter's compatible-format set is derived entirely from the backend capability registry at runtime.
- **SC-004**: Adding a new runtime backend to the capability registry (simulated in tests) causes the backend filter to update and restrict results correctly **without any changes to the Models Search page code**.
- **SC-005**: For every search result, compatibility status is conveyed by at least one non-color channel (text, icon shape, or position) — verified via accessibility audit.
- **SC-006**: On a result page of 30 cards, typing a new query and seeing re-rendered results feels immediate (debounced dispatch; perceived wait under **300 ms** after the debounce fires).
- **SC-007**: A download job's state change (e.g. `queued → downloading`, `downloading → downloaded`) is reflected in the card within **2 seconds** of the backend state transition.
- **SC-008**: The URL fully round-trips query, filters, sort, and view mode: opening a URL captured after any interaction restores identical visible state in **100%** of tested combinations.
- **SC-009**: A repository whose file layout cannot be classified still renders as a result and never produces a runtime error in the grid (zero unhandled exceptions across the 50-repo test sample).
- **SC-010**: Outside the Models Search page and its directly-supporting backend modules, **zero** source files are modified by this feature (verifiable via a scoped-diff check in review).

## Test Strategy

Per Principle VI **design-heavy-UI carve-out (2026-04-16 amendment)**, this feature invokes the carve-out **only for per-component vitest**, and **only** for the dumb `.ui.tsx` + presentational sub-components under `apps/web/src/views/models-search/components/`. Every other layer carries full, test-first coverage:

| Layer | Coverage | Rationale |
|---|---|---|
| `nexus-models-store::normalize` (classify, variants, precision, deps, compat) | Unit tests with per-function fixtures; integration sweep over 50 real HF repo snapshots. | Pure functions — core correctness. SC-002, SC-009. |
| `nexus-models-store::capabilities` | Unit tests for registry; integration test for the "add a second backend" scenario. | SC-003, SC-004. |
| `nexus-models-store::downloads` | Unit tests for the 2-slot semaphore, FIFO, duplicate prevention (FR-085), pause/resume. | FR-087, FR-088. |
| `nexus-api::handlers::model_store::*` | REST contract tests per endpoint — happy path + each error class (auth_required, unsupported, partial metadata, empty page). | FR-100 through FR-104. |
| `apps/web/src/services/model_store.ts` | Vitest with fetch mock — verifies request shape, error propagation, and `parseSearchParams` ↔ `serializeSearchParams` round-trip. | Sole I/O boundary (Principle XII.4). |
| `apps/web/src/views/models-search/models_search.view.tsx` | Vitest: URL → loader args, loader data → handler calls, `Show unsupported` toggle round-trip. | Smart container is load-bearing logic. |
| `apps/web/src/views/models-search/models_search.ui.tsx` + sub-components | **Carve-out invoked: no per-component vitest in v1.** Visual / a11y regression covered by a dedicated Playwright spec (`models-search.a11y.spec.ts`, T117) exercising keyboard navigation, non-color status indicators, and the shareable-URL round-trip. | Design churn is high during the Spectral Graphite rollout; re-write cost outweighs value. The follow-up coverage ticket is tracked in `tasks.md` phase 10 and in `quickstart.md § Deferred coverage`. |
| End-to-end | Playwright journey: `?q=llama&format=gguf&page=2&pageSize=30&sort=most_downloaded` → results render → click `Q5_K_M` row download → job appears in status → refresh → URL preserved, job state re-read from backend. | SC-001, SC-005, SC-007, SC-008. |

**Follow-up coverage ticket**: T117 (`models-search.a11y.spec.ts`) covers the a11y + keyboard-nav surface of the carved-out components; once the visual direction stabilises, per-component vitest will be added in a dedicated follow-up (tracked under spec 025 polish phase).

## Assumptions

- **Discovery source**: Hugging Face is the only upstream provider in v1. The source-provider field exists in the domain model so additional providers can be added without schema changes, but they are out of scope here.
- **Upstream authentication**: A Hugging Face access token is optional. The host stores it in the existing settings mechanism and attaches it to search/download calls when present; absence is tolerated and gated repos surface a dedicated `auth_required` state rather than a generic failure. Token provisioning UI lives in host Settings, not on the Models Search page (scope containment).
- **Runtime backend**: `llama.cpp` is the only `enabled` backend in v1. The page MUST still consume this fact via the capability registry rather than hard-coding it (FR-050 / FR-053).
- **Import-by-URL**: Out of scope for v1. Any mockup element suggesting manual import renders as a disabled / coming-soon affordance.
- **Install state scope**: Local-machine-specific. Cross-device sync of install state is not a requirement.
- **Shell and navigation**: The mockup's top nav, side nav, "Deploy Model" button, benchmark/registry links, notifications, avatar menu, and the sidebar download-manager widget are treated as **non-functional visual reference**. They are out of scope and MUST NOT be altered.
- **Visual direction**: The Spectral Graphite / Kinetic Observatory design system applies (already in project memory). No 1px layout borders for sectioning; depth via surface tiers; glassmorphism only for floating UI; dual typography (Inter for UI, JetBrains Mono for technical values); status never carried by color alone.
- **Accessibility baseline**: WCAG 2.1 AA is the minimum bar for interactive controls added or modified by this feature.
- **Storage substrate**: Existing persistence layer used by the current models/backends subsystem is reused. No new storage engines introduced.
- **Packaging**: The refactor ships as one feature, not a sequence of ten. User stories P1–P3 are the release order within this feature.

## Out of Scope

- Any UI outside the Models Search page: global navigation, shell, top nav, side nav, sidebar download-manager widget design, "Deploy Model" button, benchmark page, registry page, documentation link, notifications, account menu.
- Runtime execution UX outside what is necessary to display compatibility and install/download state.
- Non-search discovery flows (import-by-URL, upload local weights, drag-drop directory).
- Cross-device sync of install state.
- Shipping additional runtime backends (the registry must be ready to receive them; actually shipping a second backend is a separate feature).
- Full redesign of broader application information architecture.
- Changes to the existing manifest-icon / extension-registry contracts.

## Acceptance Criteria (traceable to source brief, Section 11)

1. The Models Search page can display repositories containing GGUF, safetensors, `.bin`, and `.pth` artifacts. **(FR-001, FR-010, FR-090, FR-094)**
2. GGUF repositories expose selectable quantization variants in both UI and backend contracts. **(FR-020, FR-021, FR-095)**
3. The page distinguishes model families from concrete artifacts and variants. **(Key Entities, FR-100)**
4. Backend filter options are fetched dynamically from the capability registry, not hard-coded. **(FR-050, FR-053, SC-003)**
5. Selecting `llama.cpp` restricts compatible results to GGUF/GGML without page-specific hardcoding. **(FR-052, SC-003, SC-004)**
6. Image/video models that require companion assets can express those dependencies and request bundled downloads. **(FR-040, FR-042, FR-043)**
7. Downloads target exact artifacts or variants and expose progress/state. **(FR-081, FR-082, FR-083, SC-007)**
8. Unsupported or partially classified repositories do not break the page and render safely. **(FR-005, FR-105, User Story 7, SC-009)**
9. No visual or behavioral changes are introduced outside the Models Search page. **(NFR-010, SC-010)**
10. The implementation is structured so future backends can be added without redesigning the page contract. **(FR-053, FR-106, SC-004)**
