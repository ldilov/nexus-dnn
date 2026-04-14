# Feature Specification: LLM Extension UI & Backend Management Console

**Feature ID**: 006
**Feature Branch**: `feature/006-llm-extension-ui-backend-console`
**Created**: 2026-04-14
**Status**: Draft
**Depends On**: 005 (Local LLM Chat Extension)

---

## 1. Problem Statement

The Local LLM extension (spec 005) defines the data model, SDK abstractions, and layout schemas for chat, model management, and backend management. However, several UI and lifecycle gaps remain before users can operate the extension end-to-end:

1. **Branding inconsistency** -- layout files reference "Spectral Chat" placeholder names that do not match the extension identity "Local LLM Chat & RAG."
2. **No extension enable/disable UI** -- the API handlers for `enable_extension` / `disable_extension` exist, but the Extensions page has no buttons to invoke them. Users cannot toggle builtin extensions without direct API calls.
3. **Backend lifecycle is flat** -- the Backends screen conflates runtime installation, profile configuration, and running service management into a single list. Users need distinct visual separation of these concepts with contextual CTAs that reflect each profile's current state.
4. **No generation parameters** -- the chat inspector panel shows session metadata but provides no controls for temperature, top_p, top_k, max_tokens, repeat_penalty, or system prompt. Users cannot tune inference behavior.
5. **Backend lifecycle operations are incomplete** -- install, validate, start, stop, restart, and diagnose actions need clear state-machine CTAs rather than static buttons.

## 2. Solution

### 2.1 Rename to "LLM Chat"

Replace all "Spectral Chat" / "Spectral" placeholder references in the `local-llm` extension with "LLM Chat." This applies to:
- `ui/layouts/chat.yaml` displayName and sidebar header
- Welcome text and model labels inside the chat panel
- No changes to the extension manifest `name` field (it already reads "Local LLM Chat & RAG")

### 2.2 Extension Enable/Disable UI

The Extensions page (`ExtensionList` component) gains per-extension action buttons:
- **Active** extensions show a "Disable" button
- **Disabled** extensions show an "Enable" button
- **AvailableBuiltin** extensions show an "Activate" button (calls enable)
- Clicking a button calls the existing API endpoint and re-fetches the extension list
- When an extension is disabled, `list_layouts()` filters it out via `is_active()` -- sidebar nav items disappear automatically

### 2.3 Backend Management Console

Restructure the Backends layout into three conceptual zones:

1. **Runtime Installations** -- discovered/installed backend runtimes (llama.cpp, TensorRT-LLM). Each shows install status, version, path. CTA: Install / Uninstall / Validate.
2. **Backend Profiles** -- user-created configurations binding a runtime + model + parameters. CTA varies by state: Configure / Start / Stop / Restart / Delete.
3. **Running Services** -- live backend instances with health, metrics, logs. CTA: Stop / Restart / Diagnose.

The profile list sidebar in `backends.yaml` already supports this separation via `itemTemplate` badges. The detail pane's action bar buttons should be conditionally shown based on profile state.

### 2.4 Generation Parameters

Add a "Settings" tab to the chat inspector (right panel) containing:
- `temperature` (slider 0.0-2.0, step 0.1, default 0.8)
- `top_p` (slider 0.0-1.0, step 0.05, default 0.95)
- `top_k` (number 1-100, default 40)
- `max_tokens` (number 1-32768, default 4096)
- `repeat_penalty` (slider 0.0-2.0, step 0.1, default 1.1)
- `system_prompt` (textarea, default "You are a helpful assistant.")

Parameters are submitted as part of the `llm.send_message` action payload. Backend-capability-aware: fields unsupported by the active backend are shown as disabled with a tooltip.

### 2.5 Backend Lifecycle State Machine

A backend profile transitions through these states:

```
not_installed -> installing -> installed -> starting -> running -> stopping -> stopped
                                        \-> start_failed
              \-> install_failed
running -> restarting -> running
any -> error (recoverable via diagnose)
```

Each state determines the available CTAs:
- `not_installed`: Install Runtime
- `installed` / `stopped`: Start, Delete
- `running`: Stop, Restart, Diagnose
- `installing` / `starting` / `stopping` / `restarting`: Cancel (if supported), progress indicator
- `install_failed` / `start_failed` / `error`: Retry, Diagnose, Delete

## 3. User Scenarios

### US-1: Rename verification
**As a** user opening the LLM Chat layout,
**I want** the sidebar and welcome screen to say "LLM Chat" (not "Spectral Chat"),
**So that** the branding matches the extension name.
**Acceptance**: displayName reads "LLM Chat"; sidebar header reads "LLM Chat"; welcome text references "LLM Chat."

### US-2: Disable a builtin extension
**As a** user on the Extensions page,
**I want** to click "Disable" on the Local LLM extension,
**So that** Chat, Models, and Backends nav items disappear from the sidebar.
**Acceptance**: After clicking Disable, extension status shows "disabled," sidebar nav items for the extension are removed, re-enabling restores them.

### US-3: Enable a builtin extension
**As a** user on the Extensions page,
**I want** to click "Enable" on a disabled extension,
**So that** its UI layouts reappear in the sidebar.
**Acceptance**: API returns status "active," `fetchLayouts()` returns the extension's layouts, sidebar shows the nav items.

### US-4: Tune generation parameters
**As a** user in the Chat view,
**I want** to adjust temperature, top_p, top_k, max_tokens, repeat_penalty, and system prompt,
**So that** my next message uses the configured inference settings.
**Acceptance**: Settings tab visible in right inspector; slider/number/textarea controls present with defaults; values included in `llm.send_message` payload.

### US-5: Install and start a backend
**As a** user on the Backends page,
**I want** to install the llama.cpp runtime, create a profile, and start the service,
**So that** I can chat with a local model.
**Acceptance**: Install button triggers download with progress; profile creation form accepts model + config; Start transitions profile to "running" with health metrics visible.

### US-6: Diagnose a failed backend
**As a** user whose backend failed to start,
**I want** to click "Diagnose" and see actionable error information,
**So that** I can fix the issue without reading raw logs.
**Acceptance**: Diagnose action runs health checks (port availability, GPU detection, model file integrity); results shown in a structured panel with suggested fixes.

## 4. Functional Requirements

### P0 -- Must Have

| ID | Requirement |
|----|-------------|
| FR-01 | Rename "Spectral Chat" to "LLM Chat" in `chat.yaml` displayName |
| FR-02 | Rename sidebar header title from "Spectral Chat" to "LLM Chat" |
| FR-03 | Update welcome text to reference "LLM Chat" instead of "Spectral" |
| FR-04 | Extension list shows Enable button for disabled extensions |
| FR-05 | Extension list shows Disable button for active extensions |
| FR-06 | Enable/Disable buttons call `/extensions/{id}/enable` and `/extensions/{id}/disable` |
| FR-07 | Extension list re-fetches after enable/disable to reflect new status |
| FR-08 | Sidebar nav items disappear when extension is disabled (via `list_layouts` `is_active` filter) |
| FR-09 | Sidebar nav items reappear when extension is re-enabled |
| FR-10 | Chat inspector right panel has a "Settings" tab with generation parameters |
| FR-11 | Temperature slider: range 0.0-2.0, step 0.1, default 0.8 |
| FR-12 | top_p slider: range 0.0-1.0, step 0.05, default 0.95 |
| FR-13 | top_k number input: range 1-100, default 40 |
| FR-14 | max_tokens number input: range 1-32768, default 4096 |
| FR-15 | repeat_penalty slider: range 0.0-2.0, step 0.1, default 1.1 |
| FR-16 | system_prompt textarea: default "You are a helpful assistant." |

### P1 -- Should Have

| ID | Requirement |
|----|-------------|
| FR-17 | Backend profile action bar shows state-aware CTAs (Start when stopped, Stop when running) |
| FR-18 | Backend profile detail shows distinct Runtime, Profile, and Service sections |
| FR-19 | Install Runtime action with progress tracker |
| FR-20 | Stop/Restart backend actions with confirmation |
| FR-21 | Diagnose action runs health checks and shows structured results |
| FR-22 | Generation parameters disabled with tooltip when unsupported by active backend |

### P2 -- Nice to Have

| ID | Requirement |
|----|-------------|
| FR-23 | Backends page separated into three tabs: Runtimes, Profiles, Services |
| FR-24 | Pre-built profile templates for common setups (llama.cpp + Q4_K_M, TensorRT-LLM + FP16) |
| FR-25 | Export/import backend profile configurations |

## 5. Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR-01 | Enable/disable round-trip under 200ms (UI responsiveness) |
| NFR-02 | Extension list re-render after toggle completes without full page reload |
| NFR-03 | Backend health metrics refresh at 5s intervals without layout thrashing |
| NFR-04 | Generation parameter changes apply to the next message only (no retroactive changes) |
| NFR-05 | Layout YAML files remain under 200 lines each |
| NFR-06 | TypeScript compiles cleanly with `tsc --noEmit` |
| NFR-07 | Rust compiles cleanly with `cargo check` |
| NFR-08 | No regressions in existing tests |

## 6. Success Criteria

1. "Spectral Chat" text no longer appears anywhere in the codebase
2. Extension list shows enable/disable/activate buttons wired to the API
3. Disabling the LLM extension removes its three nav items from the sidebar
4. Re-enabling the extension restores the nav items
5. Chat right panel Settings tab renders all six generation parameter controls
6. Backend profile action bar reflects current profile state
7. `cargo check` and `npx tsc --noEmit` pass without errors

## 7. Implementation Slices

### Slice 1: Branding & Naming (P0, 1-2 hours)
- FR-01, FR-02, FR-03
- Update `chat.yaml`: displayName, headerTitle, welcome text
- Search-and-replace any remaining "Spectral" references

### Slice 2: Extension Enable/Disable UI (P0, 2-3 hours)
- FR-04 through FR-09
- Update `ExtensionList` component with action buttons per status
- Wire to `enableExtension()` / `disableExtension()` API functions
- Verify sidebar dynamic behavior via `list_layouts` `is_active` filter

### Slice 3: Generation Parameters (P0, 2-3 hours)
- FR-10 through FR-16
- Add "Settings" tab with form fields to chat layout YAML
- Define parameter schema for `llm.send_message` payload

### Slice 4: Backend Lifecycle Console (P1, 3-5 hours)
- FR-17 through FR-22
- Restructure `backends.yaml` action bar with conditional visibility
- Add state-aware CTA logic
- Add Diagnose action and health check display

### Slice 5: Advanced Backend Features (P2, future)
- FR-23 through FR-25
- Tab-separated Runtimes/Profiles/Services view
- Profile templates and export/import
