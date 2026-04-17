# Research — Backends + Models page polish (Q1 / Q3 / Q4)

## 1. Clarification resolutions

### FR-Q3-04 — should `installed_by` ship now?

- **Decision**: Defer. `owner_extension_id = NULL` is sufficient provenance.
- **Rationale**: (a) `nexus-models-store` schema change is explicitly out of scope in the spec; (b) no caller yet reads user identity from install rows; (c) install task telemetry (emitted on the WS channel) already records who initiated the install for post-hoc audit; (d) YAGNI per Appendix A.
- **Alternatives considered**:
  - Add `installed_by TEXT NULL` via migration 013 — rejected: adds a column no code reads, violating Single-Choice (two provenance sources: task events + column).
  - Piggyback on `owner_extension_id` — rejected: a user is not an extension; overloading the column loses type meaning.

### FR-Q3-06 — ship `/host-models/{install_id}/dependents` now?

- **Decision**: Ship in this spec.
- **Rationale**: `host_model_leases` already tracks which extensions lease a model; the endpoint is a thin read projection (~30 lines). SC-Q3-03 requires an accurate N; a placeholder "Shared" chip would land without its backing data and rot until replaced.
- **Alternatives considered**:
  - Render "Shared" without count — rejected per SC-Q3-03 ("accurate N").
  - Fold into `GET /host-models` as an array on every row — rejected: N+1 cost on the list endpoint; per-install lookup is a pure fan-out and stays cheap.

## 2. Reuse audit (Principle I — Ecosystem-First)

### Frontend

| Need | Reuse source | Action |
|---|---|---|
| Install progress modal | `apps/web/src/backends/install_modal.tsx` (already consumes `AsyncIterable<InstallStreamEvent>`) | Mount unchanged |
| HF search | `apps/web/src/api/client.ts#hfSearch()` (already host-scoped in path) | Call directly from new `HfSearchPanel` |
| HF result card + install button | `apps/web/src/models/ModelsPanel.tsx#HfResultCard` | Extract into `hf_search_panel.tsx` as a shared component |
| Log console | `apps/web/src/backends/log_console.tsx` | Mount inside `backend_detail_drawer.tsx` |
| Toast | `sonner` (already in `package.json`) | `toast.error(err.message)` on install failure |
| WS event stream | `apps/web/src/hooks/use_event_stream.ts` | Wrap in `use_install_stream` to filter by `backendId` and project to `InstallStreamEvent` shape |
| Drawer UX | No existing drawer primitive — build thin one (positioned `<aside>` with scrim + `role="dialog"`) | New file; reuse vanilla-extract tokens from `apps/web/src/styles/tokens.css.ts` |
| React Flow state | `@xyflow/react` + existing `use_canvas_state` / `use_workflow_editor` | Add `use_draft_nodes` hook alongside |

### Backend

| Need | Reuse source | Action |
|---|---|---|
| Variant list (Q1) | `VersionManifest` loaded per-adapter (`crates/nexus-backend-runtimes/src/manifest/version.rs`) + `MachineDescriptor::detect()` | New handler `variants()` in `catalog.rs` projects manifest → `Vec<BackendVariantDto>` |
| Host model install (Q3) | `nexus-models-store::install::pipeline` already supports `owner_extension_id: Option<String>` | New handler `install_host_model()` in `host_models.rs` that passes `None` |
| Dependents (Q3) | `host_model_leases` + `extensions` tables | New handler `list_dependents()` in `host_models.rs` doing a JOIN aggregation |
| Envelope | `crate::envelope::ApiResponse` | Reuse |
| Error mapping | `RuntimeAdapterError` + existing `map_error()` helper | Reuse |

## 3. Best-practices notes

### Drawer patterns (web)

- Use a `<dialog>` element with `showModal()` where supported, else a positioned `<aside role="dialog" aria-modal="true">` with focus trap. Keep it small (~150 LOC per drawer file). Escape key + scrim click close, matching existing `InstallModal` behavior.

### WS stream → AsyncIterable

- Use a `ReadableStream` around the existing EventSource/WebSocket, yielding events matching `topic.startsWith("llm.backend.install.")` filtered to `backendId`. This keeps `InstallModal` unchanged and contains the adapter in `use_install_stream`.

### React Flow draft-node visual

- React Flow supports per-node `className` via the node's `className` prop. Add `draft` class when `draftNodeIds.has(nodeId)`; style `.draft` with `border: 1.5px dashed var(--amber-500)` via vanilla-extract recipe. No library-level patch needed.

### Variant filter rules

- Filter `VersionManifest.releases.*.assets` by `MachineDescriptor.platform` and `accelerator_profile`. Mark one row `recommended = true` by matching the machine's best-available accelerator (CUDA 13 > CUDA 12 > CPU for NVIDIA; ROCm > CPU for AMD). Unsupported rows are **included** in the response with `supported: false` + `disabled_reason` — the UI grays them out instead of hiding them so the user can see why a variant is unavailable (per Q1-edge1 — headless no-GPU machine).

### Dedup short-circuit

- `nexus_models_store::install::dedup::find_existing_by_key(sha256)` already returns the existing row. The new `POST /host-models` handler should call it pre-download and return `HTTP 200 OK` (not 201) with the existing row's `install_id` when matched — the UI branches on the status code to skip opening the progress modal and show the "already installed — shared with N extension(s)" chip.

## 4. Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| WS channel currently broadcasts all install events to all clients; filtering by `backendId` client-side works but is noisy | Medium | Low | Filter inside `use_install_stream`; defer server-side filtering to a future slice |
| Version manifest yaml missing on some adapters (e.g. `tensorrt_llm` unavailable builds) | High | Medium (Q1-edge3) | `variants()` returns `404` with envelope `code = CATALOG_UNAVAILABLE`; UI disables Install CTA with that message |
| HF rate-limits on search (Q3-edge1) | Medium | Low | Existing `hfSearch` already surfaces envelope `429`; UI shows toast with retry-after |
| React Flow re-creates node instances on every edge mutation — draft set could leak | Low | Low | Keyed on stable `node.id`; `use_draft_nodes` garbage-collects on workflow switch via `useEffect(..., [workflow.id])` |
| `host_model_leases` schema may have drifted since spec 017 | Low | Medium | First implementation task verifies current columns; endpoint query adjusts before UI work starts |

## 5. Out-of-scope (restated for clarity)

- `nexus-models-store` schema change for per-user provenance (depends on FR-Q3-04 — deferred).
- llamacpp adapter migration to `host_runtime_installs` (tracked separately).
- `chat.yaml` "Choose Model" rewiring (tracked separately).
- VRAM lease on `/backends/load-model` (tracked separately).
- Server-side WS install-event filtering (future slice).
