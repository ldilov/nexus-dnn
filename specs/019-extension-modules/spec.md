# Feature Specification: Extension Modules Page — Spectral Graphite UI + Backend Module Surface

**Feature Branch**: `019-extension-modules`
**Created**: 2026-04-16
**Status**: Draft
**Input**: User description: "Merge Workflows and Recipes into a single Modules (Instances) page. Each extension is a module; one extension can have multiple deployments. From a module card the user can view the blueprint (read-only recipe) or Deploy Instance (creates a new deployment with default settings). Apply the Spectral Graphite design system from the attached mockups. Make the necessary backend changes."

**Source references**:

- Mockup assets: `stitch_workflow_canvas_engine_deployments.zip` (module_registry_standardized, deployment_cinema_engine_editable, blueprint_cinema_engine_recipe, spectral_graphite/DESIGN.md) and `stitch_workflow_canvas_extensions.zip` (bento grid of extension modules).
- Current UI: `apps/web/src/layout/sidebar.tsx`, `apps/web/src/App.tsx`, `apps/web/src/views/deployments_view.tsx`, `apps/web/src/catalog/recipe_catalog.tsx`, `apps/web/src/catalog/workflow_catalog.tsx`.
- Backend: `crates/nexus-deployments/src/`, `crates/nexus-api/src/handlers/deployments/`, `crates/nexus-extension/`, and the 018-deployments spec + schema.

---

## Clarifications

### Session 2026-04-16

- Q: Does the existing "Deployments" sidebar item disappear when "Modules" is added, or do both coexist? → A: **Both coexist.** "Modules" is the primary extension-centric entry point (vertical hierarchy: extension → deployments). "Deployments" remains as a flat, cross-cutting list view for search/filter/bulk operations across all deployments regardless of extension. The "Recipes" and "Workflows" top-level sidebar items are removed.
- Q: How do user-defined workflows that are NOT tied to an extension appear on the Modules page? → A: They surface under a synthetic **"User Modules"** group (grouped by `workflow.source_kind=user`). Each user workflow renders as a module card with the same blueprint/deploy-instance affordances as extension modules; its "blueprint" is the user workflow itself. A plain empty Graph canvas is also reachable as a "Blank Module" card at the top of this group for bring-your-own flows.
- Q: In the deployment editor, is the "Recipe" tab editable or locked to blueprint read-only? → A: **Editable overlay, with an in-tab segmented control to flip to read-only blueprint mode.** The Recipe tab shows the recipe projection with overlay-aware editable fields (parameter overlays, runtime binding selection, model binding selection). Editing the recipe fields does not mutate the base recipe — changes are captured into the deployment's overlay and become a new revision on save. A segmented control **`[Overlay | Blueprint]`** at the top of the Recipe tab switches between editable-overlay mode and read-only canonical-source mode; a keyboard shortcut **Cmd/Ctrl+B** toggles the same control for power users. (Amended after P5 — the originally-proposed chip affordance was replaced with the segmented control for discoverability and keyboard parity.)
- Q: How does a module card represent an extension that contributes N recipes, and what shape does `GET /api/v1/modules` return for it? → A: **One card per extension; `blueprints: RecipeRef[]` array; primary pinned first.** Each `extensions` row produces exactly one module card. The `GET /api/v1/modules` response carries `blueprints: RecipeRef[]` ordered with the extension's primary recipe first (resolved from `extensions.primary_recipe_id`) and the rest sorted by `recipe.sort_order` then lexically. The card shows a "Blueprints (N) ▾" quick-pick when `N > 1`. "Deploy Instance" defaults to the primary blueprint; the quick-pick lets the user pick a different recipe before deploying, which is forwarded as `recipe_id` in `POST /api/v1/modules/{module_id}/deployments`. This preserves the 1:1 "extension = module" framing while exposing multi-recipe extensions as first-class without exploding the grid.
- Q: What is the canonical user-facing term — "Instance" or "Deployment" — and how does it map to the data layer? → A: **Three-tier glossary: Module → Instance → Deployment.** "Module" is the template (extension + blueprints). "Instance" is the user-facing label for a running copy of a module (CTAs, counts, headers, banners). "Deployment" is the persisted data row (API paths, URL segments, events, logs). UI copy prefers "Instance"; API/URL/events stay unchanged. A11y labels that expose the data id use the form `"Instance — deployment id 0xFF92A"`. A glossary is added to this spec (see Glossary section) and must remain the single source of truth for docs, UI strings, and test assertions.
- Q: Where does each extension's module-icon come from, and what is the fallback when an extension doesn't provide one? → A: **Manifest-provided Material Symbol name + optional inline SVG, with a deterministic hashed-fallback.** Extension manifests (`crates/nexus-extension/src/manifest.rs`) gain an optional `icon: { symbol?: string, svg?: string }` field. `symbol` is a Material Symbols Outlined glyph name; `svg` is a sanitized inline SVG string (≤ 2 kB). If both are supplied, `svg` wins. If neither, the host picks a glyph deterministically from a fixed 16-item fallback set, keyed by `stable_hash(extension_id) mod 16`. User modules always render `"account_tree"`. The `GET /api/v1/modules` response carries `icon: { kind: "symbol" \| "svg" \| "fallback", value, fallback_hash?: u32 }`. Substring-heuristic icon selection (today's `apps/web/src/App.tsx:94-100`) is removed.
- Q: When the user opens the revision picker on an Instance and selects a non-current revision, what does the editor do? → A: **Switch to a read-only "Viewing revision N" mode; offer an explicit "Make this the current revision" CTA.** The editor disables all write affordances and displays a prominent banner identifying the viewed revision. Any in-flight draft on the current revision is preserved in client memory (not discarded). A "Make this the current revision" CTA creates a new revision with `save_mode=save_as_version` whose payload is a copy-forward of revision N and advances `current_revision_id` atomically. This honors 018's append-only invariant (FR-003) — historical revisions are never mutated, no branching semantics are introduced, and revert-to-N is a one-click operation that produces an auditable forward revision. Returning to "Editing current revision" mode (via the picker or a "Back to current" pill) re-enables write affordances and restores the preserved draft.
- Q: Must the user be able to install a new extension (and thereby add a new module) directly from the Modules page? → A: **Yes — via an "Install Extension" drawer on the Modules page that accepts a ZIP file, with the same ZIP install also available from the Extensions sidebar page.** The Modules page gets a secondary "+ Install Extension" CTA next to the search input that opens a glass-panel right drawer containing a drag-and-drop zone + file picker + staged-install progress. The Extensions sidebar page gains the same ZIP install affordance for lifecycle parity. Today `crates/nexus-extension/src/` has zero ZIP support (only directory-scan via `InMemoryExtensionRegistry::from_directory`), so this introduces a new install pipeline (`install/zip_install.rs`) with explicit Zip-Slip protection, manifest validation, size caps, and atomic staging. A catalog-of-installable-extensions (remote registry) is explicitly out of scope for v1 — the drawer in v1 handles ZIP only.
- Q: At what point does a "Blank Module" materialize as a persisted `workflows` row + a discoverable user module? → A: **Lazy — defer persistence until first save; route through a synthetic `user:draft:{client_uuid}` module that does not appear in the grid until first save.** Clicking "Blank Module" mints a client UUID (`crypto.randomUUID()`) and routes to `/modules/user:draft:{uuid}` (Graph-mode editor) without any backend call. The editor holds the workflow payload in memory, mirrors it to `sessionStorage` keyed by the UUID so a page reload survives, and the draft module never appears in the Modules grid while it is still `user:draft:*`. On first explicit Save Draft / Deploy Changes, the client calls `POST /api/v1/modules/user:draft:{uuid}/materialize` which — in a single host transaction — creates a `workflows` row with `source_kind=user` and the in-memory payload, creates a `deployments` row backed by that workflow, returns `{ module_id: "user:{workflow_id}", deployment_id, revision_id }`, and the client rewrites its URL from `user:draft:{uuid}` to `user:{workflow_id}` without a full reload. Zero orphan rows on accidental clicks; the `sessionStorage` draft is cleared on successful materialize or when the user explicitly discards.

---

## Glossary

This spec — and all downstream code, copy, docs, a11y labels, and tests — MUST use these terms consistently:

| Term | Layer | Meaning | Example |
|------|-------|---------|---------|
| **Module** | conceptual / UI | A template backed by an extension (or a user workflow). One extension = one module. | "Cinema Engine module", "User Module: my-experiments" |
| **Blueprint** | conceptual / UI | The read-only recipe projection that defines what a module does. A module has `N ≥ 1` blueprints. | "Cinema Engine has 3 blueprints" |
| **Instance** | UI label | A user-facing copy of a module configured with its own runtime/model/parameters. Rendered as the primary noun in buttons, counts, headers, banners, breadcrumbs. | "Deploy Instance", "3 Instances", "Instance ID: 0xFF92A" |
| **Deployment** | data / API / URL / events | The persisted row that backs an Instance. Unchanged from spec 018. | `deployments` table, `POST /api/v1/deployments`, `deployment.revision.created` event, `/deployments/{id}` URL |
| **Revision** | data | An append-only snapshot of a Deployment (spec 018 FR-002/FR-003). Surfaced in the UI as "Revision N" next to the Instance ID. | `deployment_revisions.revision_number` |

**Mapping rules**:
- One Module → many Instances (= many Deployments, 1:1 mapping between Instance and Deployment).
- UI strings, copy, and visible labels MUST say "Instance" where a user-facing noun is needed. Never say "Deployment" in a visible label.
- API paths, URL segments, JSON field names, event names, log fields, and test-fixture IDs MUST say "deployment" as in spec 018. Never rename them.
- A11y labels that expose the data id to assistive tech MUST use the form: `"Instance — deployment id {id}"` so screen-reader users can still hear the canonical id when they need it.
- In error messages: use "Instance" in the human-readable message and include the data id in a code-formatted suffix — e.g., `"This Instance cannot be deployed (deployment_id=abc123)"`.

---

## Semantic Model (amended 2026-04-16)

**Core correction**: Instances are strictly read-only surfaces. Deployments are the only mutable entity. Edits made while viewing an Instance fork into a client-side Draft that never auto-persists; saving the Draft mints a new Deployment.

```
Extension (installed, ZIP or builtin)
   │
   ▼
Module = Instance          ← read-only, never mutated by any user action
   │                       (one per installed extension, one per user workflow,
   │                        plus the synthetic Blank Module)
   │
   ├── Review ────────────► /#/modules/{id}
   │                        /#/modules/{id}/blueprint
   │
   ├── Deploy Instance ───► POST /modules/{id}/deployments
   │                        → Deployment created with instance defaults
   │                        → /#/deployments/{id}
   │
   └── Edit ──────────────► /#/modules/{id}/draft/{uuid}
                            (client-side Draft; sessionStorage only)
                            │
                            └─ Save Draft ────► POST /modules/{id}/draft/{uuid}/materialize
                                                → Deployment created
                                                → /#/deployments/{id}
                                                → sessionStorage cleared

Deployment                 ← persistent, editable (spec 018)
   │
   ├── Open  ─► /#/deployments/{id}   (full editor, revisions, overlays)
   ├── Edit  ─► POST /deployments/{id}/revisions (new revision saved)
   ├── Fork  ─► Clone to new deployment (v2)
   └── Archive / Restore / Export
```

**Two invariants**:

1. **Instance edits never persist.** The "Edit" button on any instance view does not mutate the instance — it forks a client-side draft. Closing the browser loses unsaved drafts (the draft-preservation window is sessionStorage-scoped, not cross-session).
2. **Draft is the universal fork mechanism.** Blank Module, "edit from instance", and (future) "fork from deployment" all land in the same `/#/modules/{id}/draft/{uuid}` surface with the same `materialize` endpoint. The fork source is carried in the draft payload envelope, not the URL.

Consequence: the "Instance editor" concept from earlier drafts of this spec is **retired**. What was called the Instance editor is now the **Instance view** (read-only) plus the pre-existing Deployment editor (editable). The four-tab surface (Recipe / Stage / Graph / Trace) is kept on the Instance view as a read-only preview of what the default deployment would look like.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Modules page as the single entry point for extensions, recipes, and workflows (Priority: P1)

A user opens the app and wants to see what's installed and what they can do with it. Today they have two sidebar entries ("Recipes" and "Workflows") that split the same mental model across two pages. In the new design, both are gone and replaced by a single **Modules** page that lists every installed extension as a module card plus a "User Modules" group for bring-your-own workflows. Each card shows extension identity (name, version, icon, tags, status dot), a one-line description, and a count of existing deployment instances for that module.

**Why this priority**: This consolidation is the stated product goal. Without it, the hierarchy of "extension → module → deployment instances" remains invisible and users must memorize an arbitrary two-page split. Delivering just this story already eliminates a navigation dead-end.

**Independent Test**: Start the app with at least two installed extensions (e.g., `chatllm`, `llm-backends`) and at least one user-only workflow. Verify the sidebar has no "Recipes" and no "Workflows" items. Verify the new "Modules" sidebar item renders a bento grid with one card per installed extension plus a "User Modules" group; verify no module card is duplicated; verify the page loads its first paint in under 200 ms on a cached backend.

**Acceptance Scenarios**:

1. **Given** three installed extensions and two user-only workflows, **When** the user clicks "Modules" in the sidebar, **Then** the page renders five module cards (3 extension + 2 user) plus a persistent "Blank Module" card at the top of the User Modules group, and no card is missing an identity icon or version.
2. **Given** an extension is disabled, **When** the user opens the Modules page, **Then** its card renders with a "Disabled" status chip (`error` color token) and the "Deploy Instance" button is disabled with a tooltip explaining why.
3. **Given** an extension was just uninstalled, **When** the user opens the Modules page, **Then** the module card disappears but any deployments it produced remain visible via the flat "Deployments" sidebar page with `availability_state=unavailable` badges.

---

### User Story 2 — Deploy a new instance of a module with one click (Priority: P1)

A user sees a `Cinema Engine` module card in the grid and clicks "Deploy Instance." The host creates a new deployment from the module's primary blueprint (its default recipe + default workflow projection) pre-filled with the module's default runtime/model bindings, and opens the new deployment in the deployment editor with the Graph tab active. The user has not had to pick a recipe, pick a workflow, or hand-fill any field.

**Why this priority**: The core differentiator from today's UX. Today the user must navigate Recipes → pick → Workflows → pick → modify → Save Deployment. This story collapses all of that into one affordance driven by the module contract.

**Independent Test**: From a fresh session on the Modules page, click "Deploy Instance" on a module card; verify a `POST /api/v1/modules/{extension_id}/deployments` request returns 201 with a new `deployment_id`; verify the UI transitions to `/deployments/{id}` route with the editor pre-populated; verify no base recipe or workflow row was mutated (SC-001 of 018-deployments still holds).

**Acceptance Scenarios**:

1. **Given** the Cinema Engine module with a valid default blueprint, **When** the user clicks "Deploy Instance", **Then** a new deployment with `save_mode=create`, `mapping_state=fully_mapped`, and default runtime + model bindings is persisted, and the editor opens with the new `deployment_id` and revision 1 already saved.
2. **Given** a module whose default runtime binding is unavailable (e.g., runtime adapter disabled), **When** the user clicks "Deploy Instance", **Then** the deployment is still created but lands in `restore_state=restorable_with_degraded_features` with a blocking-or-warning diagnostic in category `runtime`, and the editor surfaces a banner explaining what to fix.
3. **Given** multiple clicks on "Deploy Instance" for the same module, **When** each click succeeds, **Then** each click produces an independent deployment with a distinct `id` and `effective_workflow_hash` (User Story 4 of spec 018 is preserved).

---

### User Story 3 — View the Blueprint (read-only Recipe projection) from a module card (Priority: P1)

Before deploying, the user wants to understand what the module does. They click "View Blueprint" on a module card. The app opens a read-only, editorial **Blueprint view** showing the recipe as a numbered step list (Texture Synthesis → Light Field Injection → Final Color Grade, etc.), the input/output contract of each step, validation badges, compute-warning chips, and a list of every deployment currently derived from this module. The view is explicitly marked read-only (no edit affordances); the only two CTAs are "Dry Run" (ephemeral, no persistence) and "Clone to Deployment" (creates a new deployment identical to Deploy Instance).

**Why this priority**: Users must be able to inspect a module without risking a mutation. This mirrors the 018 invariant that base recipes are never mutated. Making "Deploy Instance" and "View Blueprint" equal-weight siblings on the module card is the safest default.

**Independent Test**: From the Modules page, click "View Blueprint" on a module card; verify the blueprint view renders with no editable inputs, verify every recipe step carries step-number + operator-ref + op-code label, verify the "Dry Run" CTA produces a non-persisted execution plan, and verify the "Clone to Deployment" CTA creates a new deployment identical to the Deploy Instance flow.

**Acceptance Scenarios**:

1. **Given** a module with a multi-step recipe, **When** the user opens the Blueprint view, **Then** every step renders with a status indicator (validated | high-compute | experimental), no form control is focusable, and the page's route is `/modules/{extension_id}/blueprint` (or `/workflows/{workflow_id}/blueprint` for user modules).
2. **Given** a Blueprint view, **When** the user triggers "Dry Run", **Then** a dry-run plan is generated and displayed inline (plan only — no runs row, no artifact creation) and the server returns a structured plan summary in under 500 ms.
3. **Given** a Blueprint view with existing deployments derived from this module, **When** the user scrolls to the "Instances" section, **Then** a list of deployments for this module renders with name, revision_number, state, restore_state, and last-run timestamp, each clickable to open in the deployment editor.

---

### User Story 4 — Instance view (read-only preview) + Edit-to-Draft fork (Priority: P1)

**Amended 2026-04-16**: Instances are **read-only preview surfaces**, not editable editors. Any change the user wants to make opens a client-side Draft that, when saved, mints a new Deployment. Instance edits are never preserved in place; the Draft → Deployment path is the only mutation route.

A user opens an instance from a module card and lands on a four-tab read-only surface: **Recipe** (read-only recipe projection), **Stage** (read-only step plan), **Graph** (read-only node canvas), **Trace** (historical runs across every deployment derived from this module). The identity banner carries three CTAs: **Edit** (forks a draft), **Deploy Instance** (one-click deploy with defaults), **View Blueprint** (full read-only recipe detail). Clicking Edit mints a UUID, copies the instance's resolved workflow payload into a client-side Draft under `/#/modules/{id}/draft/{uuid}`, and opens a Draft editor that behaves like the Instance view but with editable panels. Saving the draft POSTs to `/api/v1/modules/user:draft:{uuid}/materialize` which creates a new Deployment and routes the user to `/#/deployments/{new_id}`.

**Why this priority**: This is where the semantic model bites. Without a strict read-only instance surface, the distinction between "module template" (read-only) and "deployment instance" (editable) collapses and users accidentally mutate their installed extensions. The Draft fork is the universal fork mechanism — the same path serves Blank Module creation and instance-edit workflows.

**Independent Test**: Open an instance; switch between all four tabs; confirm every panel is read-only (zero focusable form controls beyond tab buttons and page CTAs). Click Edit on the instance; confirm the URL rewrites to `/#/modules/{id}/draft/{uuid}` and the payload is pre-populated from the instance. Close the tab before saving; reopen the browser; visit the draft URL → draft is restored from sessionStorage. Save the draft; confirm exactly one new deployment row is created and the URL rewrites to `/#/deployments/{new_id}`. Click Deploy Instance directly (without editing); confirm exactly one new deployment is created with instance defaults.

**Acceptance Scenarios**:

1. **Given** an installed extension with a default workflow, **When** the user opens the instance view, **Then** every tab renders and an axe-core scan finds zero focusable form controls beyond the three CTAs + four tab buttons + inline Dry Run.
2. **Given** an instance view, **When** the user clicks Edit, **Then** a UUID is minted, the instance's resolved payload is copied to sessionStorage under `nexus.module.draft.{uuid}`, the URL rewrites to `/#/modules/{id}/draft/{uuid}`, and zero network requests fire.
3. **Given** a draft with edits, **When** the user clicks Save, **Then** POST materialize returns 201 with a `deployment_id`, a new deployment row exists, and the URL rewrites to `/#/deployments/{id}`.
4. **Given** 50 fork actions (mix of Blank and instance-edit) without saves, **When** the user counts deployment rows, **Then** zero orphan rows exist.
5. **Given** a deployment (not an instance), **When** the user edits it via the flat Deployments view, **Then** the edit lands via spec 018's `POST /deployments/{id}/revisions` — no draft fork is needed (the deployment editor is the mutation surface).

---

### User Story 5 — Spectral Graphite design system applied end-to-end (Priority: P1)

The UI switches its visual language to the Spectral Graphite system: Deep Graphite surfaces (#0c0e10 / #111416 / #171a1c / #1d2023 / #232629 tiers), Spectral Palette accents (primary `#ba9eff`, secondary `#9093ff`, tertiary `#ff8439`, acid-green `#22C55E`, error `#ff6e84`), dual-typeface stack (Inter for UI chrome, JetBrains Mono for user-created values and identifiers), no standard 1px layout borders (depth via tonal shifts), ghost-border token `outline-variant` at 15% for high-density separators, glassmorphism (backdrop-blur 20 px + `surface_container_high` at 80%) for floating inspectors, primary-dim glow `box-shadow: 0 0 12px 0 #8455ef44` for active/LED-like affordances, and compositor-friendly motion only. Every hardcoded color in the current UI moves to a CSS custom property / vanilla-extract token.

**Why this priority**: The design refresh is the immediate user-visible change. Tokenizing the palette is a precondition for future theming and prevents the "template look" the mockup brief explicitly rejects. Delivering this story alone (even without the Modules page) raises the product's perceived quality.

**Independent Test**: After the change, run a stylesheet scan (grep/ripgrep) to prove no `#[0-9A-Fa-f]{3,8}` literals exist in component files (allowed only inside `styles/tokens.css` / `styles/theme.css.ts`). Open each top-level page and visually verify: dark graphite base, violet accents, acid-green status dots, JetBrains Mono on every alphanumeric value (IDs, hashes, versions, metrics, timestamps, coordinates), Inter on every UI label, ghost borders not visible as hard lines, and primary-dim glow on the currently-active sidebar icon.

**Acceptance Scenarios**:

1. **Given** any page, **When** a developer runs a token-leak audit on `apps/web/src/**/*.{tsx,css.ts,css}` excluding the tokens file, **Then** the scan finds zero hex-color literals, zero hardcoded font families, and zero hardcoded shadow values.
2. **Given** the active sidebar item, **When** the user observes the icon, **Then** the icon fill is animated (`font-variation-settings: 'FILL' 1`), the label is in primary violet, and a primary-dim box-shadow is visible at the item's left edge (2 px border + glow).
3. **Given** a deployment's identity banner, **When** the user looks at the Instance ID, revision number, VRAM figure, and timestamps, **Then** each is rendered in JetBrains Mono; section headers and labels render in Inter with uppercase + +0.05em tracking; no 1 px solid border separates banner from canvas (tonal layer change instead).

---

### User Story 6 — Backend "modules" read-surface and "deploy instance" shortcut (Priority: P1)

The UI needs structured data it can render as module cards without stitching together three separate APIs per module. The host exposes a new read-surface rooted at `/api/v1/modules` that aggregates installed extensions, their primary blueprint (default recipe + default workflow projection), their tags/icons/version, deployment counts grouped by state, and a compatibility-summary chip. The host also exposes a shortcut `POST /api/v1/modules/{extension_id}/deployments` that accepts an optional overlay and creates a new deployment from the module's default blueprint in a single round-trip.

**Why this priority**: The frontend cannot render the Modules page in a single paint without a purpose-built aggregate endpoint. The shortcut endpoint removes the client-side orchestration required to call four existing endpoints in sequence (resolve extension → resolve default recipe → resolve default workflow → POST /deployments).

**Independent Test**: Hit `GET /api/v1/modules` on a seeded database; verify the response shape contains every installed extension (and user-module group) with one row per module; verify counts match a direct SQL sum; verify latency on a 200-module fixture is ≤ 300 ms on warm cache. Hit `POST /api/v1/modules/{extension_id}/deployments` with an empty body; verify it returns 201 with a full deployment envelope identical to what `POST /api/v1/deployments` produces when supplied with the same module's default blueprint — byte-for-byte equivalent minus non-deterministic fields (id, timestamps, hashes derived from the id).

**Acceptance Scenarios**:

1. **Given** three installed extensions and seven user workflows, **When** `GET /api/v1/modules?include=counts,compat,bpref` is called, **Then** the response contains three extension-module rows and seven user-module rows each with `{ module_id, source_kind, extension_id | null, display_name, icon, version, tags, blueprint_ref, deployments: {total, by_state, by_restore_state}, compatibility_summary }`.
2. **Given** `POST /api/v1/modules/{extension_id}/deployments` with no body, **When** the module has a default blueprint, **Then** a new deployment is persisted with source lineage bound to this extension's primary recipe and default workflow, `save_mode=create`, and `mapping_state=fully_mapped`.
3. **Given** `POST /api/v1/modules/{extension_id}/deployments` with a body overlay `{ runtime_binding_overrides, model_binding_overrides, parameter_overlays }`, **When** the call succeeds, **Then** the resulting deployment has revision 1 with the supplied overlays applied and hashes computed per SI-07 of 018.

---

### User Story 7 — Existing Deployments flat view keeps working and gains module-provenance badges (Priority: P2)

The already-shipped "Deployments" sidebar item continues to show a flat, searchable list of all deployments regardless of extension. Every row gains a small **module badge** (extension icon + name) so users can see provenance at a glance. Filters gain a "Module" facet and a "User Modules only" toggle.

**Why this priority**: The Modules page is optimized for the vertical hierarchy, but users with hundreds of deployments still need a flat list for triage, bulk archive, and cross-extension search. Keeping the current surface alive with small adds protects existing workflows.

**Independent Test**: Load the Deployments page with a mix of extension-backed and user-backed deployments; verify every row renders a module badge; apply the "User Modules only" toggle and verify the flat list collapses to user-backed deployments; apply the "Module = Cinema Engine" facet and verify only Cinema Engine deployments remain.

**Acceptance Scenarios**:

1. **Given** a seeded database with 50 mixed-provenance deployments, **When** the user opens the Deployments page, **Then** every row shows a module badge with the extension icon and display name (or "User Module" for user-backed).
2. **Given** the Deployments page with the "Module = X" facet applied, **When** the user clicks a deployment row, **Then** the editor opens with the module badge preserved in the identity banner and the "← Back to Modules" breadcrumb returns to the module's detail view (not the flat list).

---

### User Story 8 — Accessibility, reduced motion, keyboard navigation (Priority: P2)

The new UI is keyboard-reachable end-to-end. The module card grid supports arrow-key navigation; Enter activates the default CTA (Deploy Instance); Shift+Enter activates the secondary CTA (View Blueprint). The deployment editor's tab bar is a proper `role=tablist` with arrow-key navigation and left/right/home/end semantics. Reduced-motion users never see the primary-dim glow transition; hover shadows collapse to a static ghost border. Color contrast meets WCAG 2.2 AA for all primary text (`on-surface` on `surface` ≥ 14.0:1 ratio) and all functional chips.

**Why this priority**: The design is dense and visually rich — without explicit a11y commitments, it risks becoming unusable on keyboard-only or low-vision setups. Baking a11y in at spec time avoids an expensive retrofit.

**Independent Test**: Run an automated axe-core scan on every new page and verify zero serious/critical violations. Navigate the app end-to-end using only the keyboard. Enable `prefers-reduced-motion` in dev tools and verify no module card glow transitions fire.

**Acceptance Scenarios**:

1. **Given** the Modules page, **When** the user presses Tab until a module card receives focus and then arrow keys, **Then** focus traverses cards in reading order and a visible focus ring (primary outline + 2 px primary-dim glow) is always present.
2. **Given** the deployment editor, **When** the user presses Left/Right/Home/End on the tab bar, **Then** focus moves to prev/next/first/last tab without requiring a mouse click.
3. **Given** a user with `prefers-reduced-motion: reduce`, **When** they hover a module card, **Then** no glow transition animates; only a static ghost-border change is applied.

---

### Edge Cases

- **Empty state**: no extensions installed and no user workflows → Modules page renders a friendly empty state with a "Browse Extensions" CTA (navigates to Extensions sidebar) and a "New Blank Module" CTA (creates an empty workflow in User Modules).
- **Extension installed but blueprint missing**: extension is present but has no `primary_recipe_id` → module card renders with a "No Blueprint" chip, "View Blueprint" disabled, "Deploy Instance" falls back to an empty workflow overlay and issues a `blueprint_missing` diagnostic.
- **Extension contributes multiple recipes**: the extension renders as exactly one module card. Its `blueprints: RecipeRef[]` array is ordered with `extensions.primary_recipe_id` first (or, if null, the recipe with lowest `recipe.sort_order` then lexical name). The "View Blueprint (N) ▾" and "Deploy Instance (N) ▾" CTAs open a quick-pick keyed by recipe; selecting a non-primary recipe and pressing Deploy forwards `recipe_id` in the body of `POST /api/v1/modules/{module_id}/deployments`. If an extension with `N > 1` has no `primary_recipe_id` set, the first array entry is treated as default and a `warning`-level diagnostic with code `module.missing_primary_blueprint` is surfaced on the module detail view (never blocking).
- **User workflow converted to extension-backed**: if a workflow's `source_kind` flips from `user` to `extension`, the card moves between the "User Modules" group and the extension-module group on next refresh; no data is lost.
- **Hundred-module pagination**: Modules page lazily renders above-the-fold cards first with virtualized grid; filter input above the grid narrows by name, tag, or extension id.
- **Dark mode is the only mode in v1**: a future "Light Spectral" palette will be introduced as a sibling theme — this spec does not ship one.
- **Search injection safety**: the Modules page search input is treated as untrusted and URL-encoded when echoed into the querystring; API treats it as a parameter, never as SQL fragment.
- **Deployment pointing at a now-uninstalled extension**: card for that extension disappears, but deployments remain visible in the flat Deployments page with `availability_state=unavailable`; their editor opens in `restore_state=restorable_read_only` (FR-018 of 018).
- **Fallback to legacy routes**: `/recipes` and `/workflows` redirect 302 to `/modules` for one release cycle before being removed. Deep links to `/workflows/{id}` redirect to `/modules/{synthetic_user_module_id}/blueprint`.

---

## Requirements *(mandatory)*

### Functional Requirements — Sidebar & routing

- **FR-001**: The sidebar MUST remove the top-level "Recipes" and "Workflows" items. A new top-level item "Modules" MUST be added with the Material Symbol `apps` (filled when active) and placed between "Home" and "Deployments".
- **FR-002**: The top-level "Deployments" sidebar item MUST remain in place. No functional behavior of its current list view changes in this increment (US7 add-ons notwithstanding).
- **FR-003**: The top-level "Extensions" sidebar item MUST remain in place. Clicking an extension in that page continues to open its extension-provided layout — Modules and Extensions are complementary, not overlapping.
- **FR-004**: Hash routes `/recipes` and `/workflows` MUST issue a client-side redirect to `/modules` for one release cycle; routes `/workflows/{id}` MUST redirect to `/modules/user:{id}/blueprint`. A release-over-release deprecation notice MUST appear in the CHANGELOG.

### Functional Requirements — Modules page (vertical, extension-centric)

- **FR-005**: The Modules page MUST render a bento-style grid (12-column responsive) where each card represents one module. Card identity fields: module name, version (JetBrains Mono), description (Inter body), status dot (`acid-green | tertiary | error | outline`), tag chips (capped at 3 visible + "+N"), and a right-aligned primary metric (e.g., `124 t/s`, `0.4ms`, `42.8 GB`) chosen by module kind (see FR-007).
- **FR-006**: Every module card MUST expose exactly two CTAs: **View Blueprint** (secondary, ghost border) and **Deploy Instance** (primary, `primary` background with primary-dim glow on hover). When the module carries more than one blueprint (`blueprints.length > 1`), both CTAs render with a compact "(N) ▾" suffix that opens a quick-pick of blueprints; the primary blueprint is the pre-selected default and is visually marked with a `primary`-tinted dot. No other CTAs appear on the card surface.
- **FR-007**: Module cards MUST be grouped into at least two sections rendered in this order: **Extension Modules** (cards derived from installed extensions) and **User Modules** (cards derived from `workflow.source_kind=user`). A "Blank Module" card MUST appear at the top of User Modules. Activating it MUST route to the Instance editor under a client-minted draft `module_id` without any backend call (FR-BM01..FR-BM05); the draft never appears in the grid while unsaved.
- **FR-008**: Each module card MUST display a deployment-instance count in the form `{n} instances` under the title. Clicking the count MUST open the module's detail view scrolled to the "Instances" section. Zero-instance cards MUST show a muted "No instances yet" chip instead.
- **FR-009**: The Modules page MUST offer a single search input above the grid that filters cards by name, tag, extension id, or version using case-insensitive substring match; a "Module kind" facet MUST filter Extension / User / All; a "Status" facet MUST filter by module status.
- **FR-010**: The Modules page MUST render its first paint in ≤ 200 ms on cached backend data and ≤ 1.5 s on cold data (one network round-trip per page load — see FR-027).
- **FR-011**: The Modules page MUST be virtualized for grids larger than 60 cards; below that, a native grid suffices.

### Functional Requirements — Module detail view

- **FR-012**: Clicking a module card's title area MUST open `/modules/{module_id}` which renders the **Module detail** view: module header, default blueprint summary (first 3 recipe steps + "+N more"), compatibility summary chip row, and a full list of deployments derived from this module.
- **FR-013**: The Module detail view's deployments list MUST render one row per deployment with name, revision_number, state, restore_state, module compatibility state, last-run timestamp (JetBrains Mono), and a primary "Open" CTA that navigates to `/deployments/{id}`.
- **FR-014**: The Module detail view MUST expose a "View Blueprint" CTA that navigates to `/modules/{module_id}/blueprint` and a "Deploy Instance" CTA that calls FR-028 and navigates to the new deployment's editor.

### Functional Requirements — Blueprint (read-only) view

- **FR-015**: The Blueprint view at `/modules/{module_id}/blueprint` MUST render the selected recipe as a numbered step list with step number, step title, op-code label (JetBrains Mono, `secondary` color), op description (Inter body), and a 3-column grid of defining parameters per step (value rendered in JetBrains Mono in the `tertiary` color). The recipe selection is controlled by the `recipe_id` query param; when omitted, the module's primary recipe is used. When the module has more than one blueprint, the view renders a recipe-picker pill row near the top (primary first, rest in `blueprints` order) so the user can switch without leaving the page.
- **FR-016**: The Blueprint view MUST NOT render a single focusable form input. All content is read-only. It MUST expose exactly two CTAs: "Dry Run" (calls FR-029 and renders the plan inline) and "Clone to Deployment" (calls FR-028).
- **FR-017**: The Blueprint view MUST render an "Instances" panel listing every deployment derived from this module with quick-navigation to `/deployments/{id}`.
- **FR-018**: The Blueprint view MUST render an "Export .nx" secondary affordance that calls the existing `POST /api/v1/deployments/import` counterpart only once a deployment exists for this module; when zero deployments exist, the affordance is hidden.

### Functional Requirements — Instance view (read-only preview)

Amended 2026-04-16: Instances are not editable. The "Instance editor" is retired; in its place the Instance view renders a read-only preview of what the default deployment of the module would look like. All mutation paths go through Draft → Deployment. Historical FRs in this block are preserved as strikethrough-equivalent prose for bisectable change tracking.

- **FR-019**: The Instance view MUST render an identity banner containing: the module_id (JetBrains Mono uppercase, `secondary` color), the `acid-green` status dot if the extension is healthy, the Instance display name (Inter `title-sm`), and the source badge (extension icon + name, clickable to module detail). It MUST expose exactly three CTAs in the banner: **Edit** (secondary — mints a client-side Draft copy of the instance payload and routes to `/#/modules/{id}/draft/{uuid}`, per FR-050), **Deploy Instance** (primary — calls FR-028 and routes to `/#/deployments/{new_id}`), and **View Blueprint** (secondary — routes to `/#/modules/{id}/blueprint`). The identity banner does not expose a revision picker — instances have no revisions.
- **FR-020**: The Instance view MUST render a tab bar with exactly four tabs in this order: **Recipe**, **Stage**, **Graph**, **Trace**. The tab bar uses `role=tablist` and supports arrow-key / home / end keyboard navigation. Every panel renders strictly read-only — no input accepts keystrokes, no drag handle accepts pointer events, no CTA issues a POST.
- **FR-021**: The Recipe tab MUST render the module's bound recipe as a read-only projection identical to the Blueprint view (FR-015), minus the recipe-picker pill (the Instance view is scoped to the module's default recipe; multi-recipe switching happens on the Blueprint view). There is no segmented control, no overlay editor, no dirty indicator — these concepts belong exclusively to the Deployment editor (spec 018 territory).
- **FR-022**: The Stage tab MUST render the default workflow's step-by-step execution plan read-only: per-step input bindings (values as rendered defaults, not editable), per-step validation badges, per-step "Dry Run" buttons (inline plan, no persistence).
- **FR-023**: The Graph tab MUST render the module's default workflow via the existing `GraphView` component in a read-only mode (no node drag, no port reconnect, no edge add/delete). Pan + zoom + node-selection-for-inspection remain interactive.
- **FR-024**: The Trace tab MUST render run telemetry for every deployment derived from this module, ordered newest-first, grouped by deployment, with status, duration (mono), and a "View run details" link that navigates to the run's deployment editor at `/#/deployments/{id}`.
- **FR-025** *(retired — replaced by FR-050..FR-054)*: "Save Draft" and "Deploy Changes" as Instance-view CTAs no longer exist. Editing semantics live on the Deployment editor; drafts are the universal fork mechanism.
- **FR-026**: The Instance view MUST render a warning banner (`tertiary_container` background, `on_tertiary_container` text) when the backing extension has `status=disabled` or a runtime-dependency is missing, and MUST disable the "Edit" and "Deploy Instance" CTAs with a tooltip explaining the block. "View Blueprint" remains enabled so the user can still inspect the module's recipes.

### Functional Requirements — Universal Draft (fork-to-deployment pipeline)

Amended 2026-04-16: drafts are no longer a Blank-Module-specific concept. Every user-authored mutation of a read-only surface (Blank Module, Instance view, future Deployment-fork) goes through the same draft pipeline.

- **FR-BM01**: Any fork affordance — including the "Blank Module" card, the Instance view's "Edit" CTA (FR-050), and future deployment-fork actions — MUST mint a client-side UUID v4 via `crypto.randomUUID()` and navigate to `/#/modules/{source_module_id}/draft/{uuid}` without issuing any backend request. For Blank Module, `source_module_id = "user:blank"`. The backend MUST recognize the `draft/{uuid}` suffix only within the `materialize` endpoint (FR-BM04) and MUST NOT accept it on any other module-scoped route.
- **FR-BM02**: The Instance view MUST recognize routes matching `^/#/modules/[^/]+/draft/[0-9a-f-]{36}$` and render with the Graph tab active by default, the forked payload loaded, and a banner (`surface_container_high` background, `on-surface` text) reading `"Unsaved draft forked from {source_display_name}. First save creates a new deployment."`. The identity banner MUST render: `Instance ID` shown as `— (draft)`, no revision field, and the source badge reflects the fork source (extension icon for `ext:*` sources, `"account_tree"` for `user:*` sources, `"add_box"` for `user:blank`).
- **FR-BM03**: The editor MUST mirror the draft payload envelope `{ source_module_id, forked_at, workflow_payload, display_name? }` to `sessionStorage` under the key `nexus.module.draft.{uuid}` on every debounced edit (debounce ≤ 500 ms). A page reload that lands on the same draft URL MUST re-hydrate the payload from `sessionStorage` without a backend call. The mirrored payload MUST be capped at `512 KiB`; payloads exceeding the cap MUST surface a warning banner and prompt the user to save.
- **FR-BM04**: The host MUST expose `POST /api/v1/modules/user:draft:{uuid}/materialize` accepting body `{ workflow_payload, display_name?, source_module_id?, parameter_overlays?, runtime_binding_overrides?, model_binding_overrides? }`. Handler behavior depends on `source_module_id`:
  - When `source_module_id` is `"user:blank"` or absent: create a `workflows` row with `source_kind=user`, `source_extension_id=NULL`, `display_name=body.display_name ?? "Untitled Module"`, payload = `body.workflow_payload`. Then delegate to `DeploymentSaveService::save` with `save_mode=create`. Return `{ deployment_id, deployment_revision_id }`.
  - When `source_module_id` matches `^ext:[A-Za-z0-9_.-]+$`: do NOT create a `workflows` row. Delegate to `DeploymentSaveService::save` with `save_mode=create`, `source.extension_id` set to the module's extension id, and `workflow_payload` from the request body. Return `{ deployment_id, deployment_revision_id }`.
  - When `source_module_id` matches `^user:[A-Za-z0-9_.-]+$` (a user workflow): do NOT create a `workflows` row. Delegate to `DeploymentSaveService::save` with `save_mode=create` and `source.workflow_id` set to the source module's workflow id. Return `{ deployment_id, deployment_revision_id }`.
  - If `{uuid}` does not match the UUID-v4 pattern, return HTTP 400 with `module.draft_uuid_invalid`. Idempotent per `{uuid}` — a repeat materialize with the same UUID and body hash MUST return the existing ids (HTTP 200). Different body hash MUST return HTTP 409 `module.draft_uuid_conflict`. Idempotency TTL: 10 min for Blank Module forks, 60 seconds for instance-forked drafts (they are short-lived by nature).
- **FR-BM05**: On successful materialize the client MUST: (a) rewrite the browser URL to `/#/deployments/{deployment_id}` via `history.replaceState` (no full reload) — the deployment editor is the new home, not a module route, (b) delete the `nexus.module.draft.{uuid}` sessionStorage entry, (c) trigger a background `GET /api/v1/deployments` revalidation so the new deployment surfaces in the flat Deployments list, (d) emit the existing `deployment.created` event (FR-033 of 018) — no new event is introduced.
- **FR-BM06** *(retired — replaced by FR-052)*: Discard affordance is now covered by the universal FR-052 on draft surfaces.
- **FR-BM07**: The Blank Module card on the Modules page MUST render distinctly from extension-module cards: ghost-border outline (no primary-dim glow), `"add_box"` glyph (FR-I05), and a single "Start Building" CTA (not "Deploy Instance" / "View Blueprint"). Clicking it invokes the shared Edit-to-Draft fork (FR-050) with `source_module_id = "user:blank"`. The card occupies exactly one grid cell — it does not expand to a hero.

### Functional Requirements — Instance → Draft fork pipeline (new, 2026-04-16)

- **FR-050**: The Instance view's **Edit** CTA MUST mint a draft UUID, copy the instance's currently-resolved workflow payload (as returned by `GET /api/v1/modules/{id}/blueprint` for extension instances, or the user workflow's `nodes`/`edges` for user instances, or an empty payload for Blank Module) into a sessionStorage envelope under `nexus.module.draft.{uuid}`, and navigate to `/#/modules/{source_module_id}/draft/{uuid}`. No server round-trip is issued before navigation; the first POST is the materialize call.
- **FR-051**: Draft routes MUST be namespaced under their fork source so the UI knows what to render in the "forked from" banner and so materialize knows which handler branch to take. URL shape: `/#/modules/{source_module_id}/draft/{uuid}`. The materialize endpoint learns the source from the request body (`source_module_id` field), not from the URL path — this keeps the backend endpoint shape flat and single-responsibility.
- **FR-052**: Every draft surface MUST expose a "Discard" affordance in the banner. Activating it MUST: prompt a confirm, clear the `nexus.module.draft.{uuid}` sessionStorage entry, and navigate to the draft's source — the source module's detail view for extension / user drafts, or `/#/modules` for Blank Module drafts. No backend call is made.
- **FR-053**: Instance views MUST enforce read-only at three defense-in-depth layers:
  1. **UI layer**: every input carries `readOnly` / `disabled`; every form-like control has no click handler that would issue a POST.
  2. **Backend layer**: the host MUST reject any `PATCH`, `PUT`, or `DELETE` on `/api/v1/modules/{id}` with HTTP 405 `module.read_only`. `POST /api/v1/modules/{id}/deployments` (deploy instance) and `POST /api/v1/modules/{id}/blueprint/dry-run` remain the only writes.
  3. **Constitution layer**: Instance views fail the design review if any edit affordance is merged. Reviewers treat a focusable input on an instance page the same as a constitution violation on Principle VII.
- **FR-054**: Deployments remain fully editable via spec 018 endpoints. The "Edit" button on a deployment row in the flat DeploymentsView does NOT fork to a draft — it opens the deployment editor at `/#/deployments/{id}` directly. Draft forks are the "fork a read-only surface to produce a new deployment" pathway; deployment-to-deployment editing has its own first-class editor and doesn't need drafts.

### Functional Requirements — Install Extension from ZIP

- **FR-IE01**: The Modules page header MUST render an "+ Install Extension" secondary CTA positioned to the right of the search input. Clicking it MUST open a right-docked glass-panel drawer (`right: 0; width: 480px; backdrop-blur: 20px; background: rgba(35,38,41,0.8)`; per FR-039). The Extensions sidebar page MUST render the same affordance as a primary CTA in its own header. Both surfaces delegate to the same backend endpoint (FR-IE03).
- **FR-IE02**: The install drawer MUST accept an extension ZIP via two input paths: (a) a drag-and-drop zone occupying the upper ~40% of the drawer, and (b) a "Choose file…" button that opens the native file picker filtered to `.zip`. The drawer MUST reject non-ZIP mime types client-side with a clear error before any upload. Only one ZIP may be uploaded at a time in v1.
- **FR-IE03**: The host MUST expose `POST /api/v1/extensions/install-from-zip` (multipart/form-data, field `file`, max request body `64 MiB` enforced at the axum layer). The handler MUST delegate to a new install pipeline at `crates/nexus-extension/src/install/zip_install.rs` which executes in this order: (1) write the upload to a per-request temp directory under the host data dir, (2) validate ZIP integrity (no corrupt central directory, no encryption), (3) reject if any entry's destination path escapes the staging root (**Zip-Slip protection**), (4) reject if the ZIP does not contain a top-level `manifest.toml` (or the project's configured manifest filename) at depth ≤ 2, (5) reject if the total uncompressed size exceeds `256 MiB` or the file count exceeds `8192`, (6) reject if any entry is an executable outside declared asset paths, (7) extract into staging, (8) run the existing manifest validator (reuse `crates/nexus-extension/src/validation.rs`), (9) sanitize any `icon.svg` per FR-I03, (10) atomically rename the staging directory into the extensions directory under `{extension_id}/` (if the target exists, return HTTP 409 with `extension.already_installed`), (11) call `InMemoryExtensionRegistry::refresh` (or equivalent) so the new extension is live without a host restart, (12) return `{ extension_id, module_id, manifest_summary, install_diagnostics }`. All steps before (10) MUST be pure filesystem operations against the staging dir — no live-registry mutation until (10) succeeds.
- **FR-IE04**: On success the Modules drawer MUST: emit `module.installed` (advisory, per FR-047 family), keep itself open for the user to install a second ZIP, trigger a background `GET /api/v1/modules` revalidation, and the underlying Modules grid MUST optimistically insert the new module card at the head of the Extension Modules group with a 200 ms slide-in transform (compositor-only per FR-041; suppressed under reduced motion per FR-040).
- **FR-IE05**: On any failure in FR-IE03 steps (1)–(11), the handler MUST delete the staging temp directory before returning. The response MUST be HTTP 422 with a structured error body enumerating the specific failure (`zip.corrupt`, `zip.slip_attempt`, `zip.missing_manifest`, `zip.size_limit`, `zip.file_count_limit`, `zip.executable_outside_assets`, `manifest.invalid`, `manifest.icon_invalid`, `extension.already_installed`, `io.stage_failed`). The drawer UI MUST render the error inline under the drop zone with the failing filename highlighted in `error` color.
- **FR-IE06**: The `crates/nexus-extension/src/install/zip_install.rs` module MUST NOT depend on any network or remote-registry primitive. It is a pure file-in → extracted-install-on-disk pipeline. A future v2 "remote catalog" can reuse steps (2)–(11) by replacing step (1) with a network fetch; this spec does not enable that path.
- **FR-IE07**: The install drawer MUST expose, after a successful install, two secondary links: "Open Module" (navigates to `/modules/ext:{extension_id}`) and "View in Extensions" (navigates to the existing Extensions sidebar page scrolled to the new extension). The drawer itself stays open until the user dismisses it.

### Functional Requirements — Revision viewing & revert

Amended 2026-04-16: revisions belong to Deployments, not Instances. The entire FR-RV block moves to the **Deployment editor** (spec 018 surface) and out of this spec's scope. The text below is preserved for traceability; implementation of FR-RV01..FR-RV06 is now scheduled against a separate Deployment-editor spec.

- **FR-RV01..FR-RV06** *(scope-moved to spec 018 follow-up)*: Revision picker, viewing mode, make-current flow, dirty-draft preservation on viewing-mode switch, compatibility-state-blocked revert — all belong on the Deployment editor. The Instance view has no revision controls (instances have no revisions).

### Functional Requirements — Backend modules surface

- **FR-027**: The host MUST expose `GET /api/v1/modules` returning an aggregate list of modules. Supported query params: `include=counts,compat,blueprints` (CSV), `q` (search), `kind=extension|user|all`, `status`, `limit`, `offset`. Response schema: `{ modules: ModuleSummary[], total, page }` where each `ModuleSummary = { module_id, source_kind, extension_id | null, display_name, icon: ModuleIcon, version, tags, blueprints: RecipeRef[], default_runtime_binding_ref, default_model_binding_ref, deployments: { total, by_state, by_restore_state }, compatibility_summary }`. `ModuleIcon = { kind: "symbol" \| "svg" \| "fallback", value: string, fallback_hash?: u32 }` per FR-I01..FR-I05. The `blueprints` array MUST be ordered with the primary recipe first (`extensions.primary_recipe_id`, or the lowest `recipe.sort_order` fallback), followed by the remaining recipes in sort-order/lexical order. For user-kind modules the array always has exactly one entry (the user workflow's synthetic recipe projection) and `icon.value` is always `"account_tree"` (FR-I05).
- **FR-028**: The host MUST expose `POST /api/v1/modules/{module_id}/deployments` that creates a new deployment from a chosen blueprint of the module. Accepts optional body `{ recipe_id?, runtime_binding_overrides?, model_binding_overrides?, parameter_overlays?, workflow_patch?, display_name? }`. When `recipe_id` is omitted, the module's primary blueprint is used (first entry of `blueprints`); when `recipe_id` is supplied it MUST reference a recipe in the module's `blueprints` array or the endpoint returns HTTP 422 with `module.recipe_not_in_module`. Returns the same envelope as `POST /api/v1/deployments`. Under the hood, this endpoint resolves `{selected_recipe, default_workflow_for_recipe, default_runtime_binding, default_model_binding}` from the extension record and delegates to `DeploymentSaveService::save` (§FR-013 of 018) — it is a sugar endpoint, not a new persistence path.
- **FR-029**: The host MUST expose `POST /api/v1/modules/{module_id}/blueprint/dry-run` that produces an ephemeral execution plan (no `runs` row, no artifact) from the module's primary recipe. Response: `{ plan_id, steps, warnings, diagnostics }`.
- **FR-030**: The host MUST expose `GET /api/v1/modules/{module_id}` returning the full module detail: module summary + blueprint summary + deployments-list (reuses `GET /api/v1/deployments?module_id=…` filter internally).
- **FR-031**: All module endpoints MUST honor the existing path-guard rules (§SI-04 of 018) and MUST NOT auto-install extensions or runtimes (§SI-03 of 018).

### Functional Requirements — Schema exposure (no new tables)

- **FR-032**: No new tables are introduced by this feature. Module surfaces are views / queries over existing tables (`extensions`, `recipes`, `workflows`, `deployments`, `deployment_revisions`).
- **FR-033**: A logical "module_id" MUST be derived as follows: extension-backed module_id = `ext:{extension_id}`, user-backed module_id = `user:{workflow_id}`, blank module_id = `user:blank`. This derivation MUST be documented in the OpenAPI schema and in the `nexus-api` handler.
- **FR-034**: The `extensions` table MUST already expose `primary_recipe_id` (nullable, forward-compat) and `default_workflow_id` (nullable). If absent on the current schema, this feature adds them as a schema-version-bump in `crates/nexus-storage/src/sqlite/migrations.rs` per FR-037 of spec 018.

### Functional Requirements — Extension manifest icon

- **FR-I01**: The extension manifest schema (`crates/nexus-extension/src/manifest.rs`) MUST gain an optional `icon: ManifestIcon` field. `ManifestIcon = { symbol?: string, svg?: string }`. Both fields are optional; at most one of the two SHOULD be set; if both are set, `svg` wins and a `warning`-level validation diagnostic is surfaced on extension load.
- **FR-I02**: `symbol` MUST be a valid Material Symbols Outlined glyph name (validated at load time against a compile-time allowlist generated from the Material Symbols font metadata). Invalid names are rejected with an `error` diagnostic; the manifest still loads but falls back to deterministic hashing (FR-I04). Name matching is case-sensitive and must be snake_case (`"movie_filter"`, not `"MovieFilter"`).
- **FR-I03**: `svg` MUST be an inline SVG string ≤ 2 kB, sanitized server-side at manifest-ingest time: no `<script>`, no `on*` handlers, no external `href`/`xlink:href`, no `<foreignObject>`, no CSS `@import`. Allowed elements: `svg`, `g`, `path`, `circle`, `rect`, `polygon`, `polyline`, `line`, `ellipse`, `defs`, `linearGradient`, `radialGradient`, `stop`, `title`, `desc`. Allowed attributes on those elements: `viewBox`, `width`, `height`, `fill`, `stroke`, `stroke-width`, `d`, `cx`, `cy`, `r`, `x`, `y`, `points`, `opacity`, `transform`, `id`, `offset`, `stop-color`, `stop-opacity`. Violations reject the whole icon (`error` diagnostic) and fall back to deterministic hashing.
- **FR-I04**: When neither `symbol` nor a valid `svg` is available, the host MUST pick a fallback glyph from this fixed 16-item set (determined once and frozen): `["hub", "memory", "dataset", "settings_input_component", "polyline", "api", "network_node", "device_hub", "schema", "flowsheet", "lan", "widgets", "layers", "tune", "insights", "view_agenda"]`. Selection is `FALLBACK_SET[stable_hash(extension_id) mod 16]`. `stable_hash` MUST be FNV-1a 64-bit over the UTF-8 bytes of `extension_id` for determinism across platforms. The resulting glyph is returned with `kind: "fallback"` and the raw `fallback_hash` (u32, low bits of the FNV-1a result) to aid debugging.
- **FR-I05**: User modules (`source_kind=user`) MUST always render the glyph `"account_tree"` with `kind: "symbol"`. The blank-module card renders `"add_box"`.
- **FR-I06**: The frontend MUST remove the current substring-heuristic icon selection in `apps/web/src/App.tsx:94-100` and render whatever `icon` comes from `GET /api/v1/modules` exactly. Icon rendering code MUST live in a single utility (`apps/web/src/components/module_icon.tsx`) that handles all three kinds (`symbol`, `svg`, `fallback`) and applies the `'FILL' 1` font-variation-settings on active state per FR-040.

### Functional Requirements — Design system (Spectral Graphite)

- **FR-035**: All visual tokens (colors, typography, radii, shadows, spacing) MUST be defined in a single source of truth: `apps/web/src/styles/theme.css.ts` (vanilla-extract) re-exported from `apps/web/src/styles/tokens.css` for CSS custom-property access. No component file may contain a hex color literal, a `rgb(` / `hsl(` / `oklch(` literal, or a raw `Inter` / `JetBrains Mono` font-family string.
- **FR-036**: The color palette MUST be exactly the Spectral Graphite tokens enumerated in the source DESIGN.md. Token names MUST use the kebab-case material convention (`primary`, `primary-dim`, `surface-container-low`, `on-surface`, etc.).
- **FR-037**: Typography MUST enforce the dual-typeface rule: every alphanumeric *value* the user created (IDs, hashes, timestamps, coordinates, metrics, code) renders in JetBrains Mono; every UI label / headline / body renders in Inter. Headings use tight tracking (`-0.02em`); uppercase category labels use `+0.05em` tracking.
- **FR-038**: Elevation MUST be expressed via tonal layering (surface tiers), not `1 px solid` borders. A `ghost-border` utility MUST exist that renders `outline-variant` at 15% opacity for high-density data tables only.
- **FR-039**: Floating elements (command palette, inspector panels, modals) MUST use the glass-panel utility: `backdrop-filter: blur(20px); background: rgba(35, 38, 41, 0.8)`.
- **FR-040**: The active-state glow (primary-dim LED look) MUST be `box-shadow: 0 0 12px 0 #8455ef44`, applied to active sidebar items, hovered primary buttons, and selected module cards. This glow MUST NOT animate under `prefers-reduced-motion: reduce`.
- **FR-041**: Animation MUST be restricted to compositor-friendly properties (`transform`, `opacity`, `clip-path`, `filter`). No `width/height/top/left/margin/padding` animations are permitted. Concrete duration budgets (all cubic-bezier, `ease-out` unless noted; all suppressed under `prefers-reduced-motion: reduce` per FR-040):
  - **Module card hover lift**: `transform: translateY(-2px)` + glow fade-in, ≤ 160 ms
  - **Module card glow transition** (primary-dim box-shadow appearing/fading): ≤ 200 ms
  - **Focus ring fade-in** (2 px primary outline + primary-dim glow, per FR-042): ≤ 120 ms
  - **Tab content crossfade** (Recipe ↔ Stage ↔ Graph ↔ Trace in the Instance editor): ≤ 200 ms, opacity-only, no translate
  - **Sidebar active-item settle** (when navigation changes which item is active): ≤ 200 ms
  - **Drawer slide-in / slide-out** (Install Extension drawer, revision picker drawer): ≤ 240 ms, `transform: translateX`, `ease-out-expo`
  - **Optimistic module card insert** (after ZIP install, FR-IE04): 200 ms slide-in `transform: translateY(-8px) → 0` + opacity `0 → 1`
  - **Status-dot pulse** (`acid-green` live indicator): 1.5 s cycle, `opacity: 1 → 0.5 → 1`, infinite. MUST stop (static opacity: 1) under reduced motion.
  - **Revision Viewing-mode banner entrance**: ≤ 160 ms, `transform: translateY(-4px) → 0` + opacity `0 → 1`
  - No animation on a single surface may chain-trigger a second animation more than 2 steps deep.

### Functional Requirements — Accessibility

- **FR-042**: Every interactive element MUST have a visible focus ring: 2 px `primary` outline + primary-dim glow (disabled under reduced motion).
- **FR-043**: The tab bar in the deployment editor MUST be `role=tablist` with `aria-selected`, `aria-controls`, and keyboard arrow-key / home / end semantics.
- **FR-044**: The module card grid MUST be `role=grid` with `aria-rowcount` / `aria-colcount` and arrow-key navigation.
- **FR-045**: All status chips MUST pair color with a text label or icon (never color-only) so color-blind users perceive state. "Live" chip includes `acid-green` dot AND the word "Live"; "Disabled" chip includes `error` color AND the word "Disabled".
- **FR-046**: Contrast ratios MUST meet WCAG 2.2 AA (4.5:1 for normal text, 3:1 for large text, 3:1 for UI components and graphical objects). Automated contrast audits MUST run on every PR touching `styles/theme.css.ts`.

### Functional Requirements — Terminology

- **FR-T01**: All user-visible UI strings (buttons, counts, headers, banners, tooltips, breadcrumbs, empty states, error toasts) MUST use **"Instance"** as the primary user-facing noun. The word "Deployment" MUST NOT appear in any visible label, chip, or copy string. "Deploy" as a verb ("Deploy Instance", "Deploy Changes") is permitted and canonical.
- **FR-T02**: All API paths, URL segments, JSON field names, event names, log fields, database columns, and test-fixture identifiers MUST use **"deployment"** exactly as defined by spec 018. This spec introduces no rename of the data layer.
- **FR-T03**: A11y labels that expose a data id to assistive technology MUST use the form `"Instance — deployment id {id}"` (example: `aria-label="Instance — deployment id 0xFF92A"`). Error messages exposed to the user MUST use "Instance" in the prose and include the data id in a code-formatted suffix, e.g. `"This Instance cannot be deployed (deployment_id=abc123)"`.
- **FR-T04**: The Glossary section of this spec is the single source of truth. Any future docs/PR/commit/test using alternative terms (e.g., "instance row", "deployment card", "module deployment") MUST be corrected to match the glossary before merge.

### Functional Requirements — Observability / events

- **FR-047**: The host MUST emit `module.viewed` (best-effort, rate-limited) when the Modules page is opened and `module.blueprint.viewed` when a Blueprint view is rendered. These events are advisory only; they MUST NOT be on the hot path and MUST NOT block the UI.
- **FR-048**: `POST /api/v1/modules/{module_id}/deployments` MUST emit the same events as `POST /api/v1/deployments` (FR-033 of 018) plus `module.deploy.instance` with `{ module_id, deployment_id, source_extension_id }`.

### Functional Requirements — Telemetry & Privacy

- **FR-TP01**: NexusDNN is a local-first application. All events introduced by this feature (`module.viewed`, `module.blueprint.viewed`, `module.deploy.instance`, `module.installed`) — and every field of their payloads — MUST be emitted only to in-process subscribers (the existing host event bus and the SSE stream consumed by the local UI). They MUST NOT be written to any outbound network socket, uploaded to any remote analytics service, mirrored to any cloud log sink, or persisted to any file readable outside the host's data directory.
- **FR-TP02**: Event payloads MUST NOT contain: user-provided prompt text, model inference inputs, model inference outputs, runtime-settings values (API keys, tokens, URLs), artifact contents, or file paths outside the host's workspace roots. IDs (`module_id`, `deployment_id`, `extension_id`, `workflow_id`) are permitted because they are opaque local identifiers with no extractable PII.
- **FR-TP03**: The client MUST NOT send any network request to any origin other than the local host API (`http://127.0.0.1` / `http://localhost` / the host-provided base URL) during Modules page, Blueprint view, Instance editor, or Install drawer operation. Verified by a Playwright network-interceptor test that fails the build on any non-local request observed.
- **FR-TP04**: The UI MUST NOT load remote fonts, remote icon sprites, remote image CDNs, remote analytics beacons, or remote telemetry pixels on any module-surface page. Fonts (Inter, JetBrains Mono, Material Symbols Outlined) MUST be self-hosted under `apps/web/public/fonts/` and referenced via `@font-face { src: url("/fonts/…") }`. The current Google-Fonts `@import` usage (if any) MUST be migrated to self-hosted during this feature — it is a FR, not a nice-to-have.
- **FR-TP05**: The existing `<img src="https://lh3.googleusercontent.com/…" />` avatar placeholders visible in the mockups are illustrative-only and MUST NOT ship in code. Avatars in the released UI MUST be locally-rendered initials or Material Symbol fallbacks until a proper local-avatar feature is specified.

### Key Entities

- **Module** *(virtual / aggregate)*: a logical grouping of `{ source_kind ∈ {extension, user}, source_id, display_name, icon, version, tags, blueprints: RecipeRef[], default_runtime_binding, default_model_binding, deployment_counts_by_state, compatibility_summary }`. Not a new table; composed at read time from `extensions` / `recipes` / `workflows` / `deployments` via `GET /api/v1/modules`. The synthetic `module_id` is `ext:{extension_id}` or `user:{workflow_id}` or `user:blank`. `blueprints` is always length ≥ 1 for extension-kind modules (if the extension contributes zero recipes, the module is suppressed from the list and a `warning` diagnostic is emitted); for user-kind modules it is always length 1 (the user workflow's synthetic recipe projection).
- **RecipeRef** *(virtual)*: a compact reference to a recipe that the UI can render without fetching the full recipe: `{ recipe_id, display_name, description, step_count, tags, is_primary }`. Returned inside `Module.blueprints`. The full recipe projection for the Blueprint view is fetched separately via `GET /api/v1/modules/{module_id}/blueprint?recipe_id={recipe_id}` (defaults to the primary recipe when `recipe_id` is omitted).
- **ModuleIcon** *(virtual)*: `{ kind: "symbol" \| "svg" \| "fallback", value: string, fallback_hash?: u32 }`. See FR-I01..FR-I05. `"symbol"` means `value` is a Material Symbols Outlined glyph name; `"svg"` means `value` is a sanitized inline SVG string; `"fallback"` means the host chose a glyph deterministically from the 16-item fallback set because the manifest didn't declare one.
- **ManifestIcon** *(persisted in extension manifest)*: `{ symbol?: string, svg?: string }`. Owned by `crates/nexus-extension/src/manifest.rs`. Validated at manifest-ingest time per FR-I02..FR-I03. If a malformed or oversized icon is supplied, an `error` diagnostic is emitted and the module falls back to deterministic hashing.
- **ZipInstallRequest** *(transient)*: multipart upload to `POST /api/v1/extensions/install-from-zip` carrying a single `file` field. Consumed by the new `crates/nexus-extension/src/install/zip_install.rs` pipeline. Not persisted beyond the staging directory.
- **ZipInstallResult** *(response)*: `{ extension_id, module_id, manifest_summary, install_diagnostics: Diagnostic[] }` returned on success (HTTP 201). `install_diagnostics` MAY carry `warning`-level entries (e.g., unrecognized optional manifest field) without blocking install.
- **Blueprint** *(virtual)*: the read-only projection of a module's primary recipe + default workflow summary. Not a new table; derived from `recipes` + `workflows`.
- **InstanceEditorSession** *(client-state)*: the in-memory UI state of an open Instance — `mode ∈ {editing, viewing, draft}`, `current_revision_id? | null` (null in `draft` mode), `viewed_revision_id?`, `active_tab`, `dirty_draft_payload?` (preserved across viewing-mode switches per FR-RV03), `last_save_attempt_status`, `draft_uuid?` (set only in `draft` mode per FR-BM01..FR-BM05). Not persisted server-side; `draft` mode mirrors to sessionStorage per FR-BM03. Backed by a single React reducer to make the state machine auditable.
- **DraftBlankModule** *(transient client-state + short-TTL server map)*: a client-minted UUID v4 that stands in for a not-yet-persisted User Module. Client holds `{ uuid, workflow_payload, display_name?, created_at }` in memory + sessionStorage; server holds `{ uuid → (workflow_id, deployment_id) }` in a short-TTL map (≤ 10 min) for materialize idempotency (FR-BM04). The UUID is never written to any durable table.
- **ThemeToken** *(CSS custom property / vanilla-extract token)*: a named design-system primitive (color, typography, spacing, shadow, radius). The complete token surface is defined in `apps/web/src/styles/theme.css.ts`; downstream components may only consume tokens, never introduce new literals.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: After the change, the sidebar contains zero "Recipes" and zero "Workflows" top-level items and exactly one "Modules" item between "Home" and "Deployments". Verified by a Playwright assertion over the rendered sidebar DOM.
- **SC-002**: The Modules page renders its first meaningful paint (≥ 1 module card visible) in ≤ 200 ms on cached backend data and ≤ 1.5 s on cold data for a 200-module fixture, measured via Performance API marks `nav → FMP`.
- **SC-003**: Clicking "Deploy Instance" on a module card produces exactly one `POST /api/v1/modules/{module_id}/deployments` network request and exactly one new `deployments` row, verified by HAR capture + SQL count diff. 100% of successful Deploy Instance flows result in navigation to `/deployments/{id}` with the editor's Graph tab active.
- **SC-004**: For every module derived from an installed extension, the `GET /api/v1/modules` response carries `{ blueprint_ref.primary_recipe_id != null, deployments.total >= 0, compatibility_summary }` — 100% coverage over a seed of at least 3 extensions.
- **SC-005**: On the Blueprint view AND every tab of the Instance view (Recipe, Stage, Graph, Trace), zero focusable form controls are rendered (automated axe-core + ARIA-role count assertion). The only focusable elements are the page-level CTAs: Edit, Deploy Instance, View Blueprint, Discard (on draft surfaces), tab buttons, back-links, and the inline Dry Run button.
- **SC-006** *(scope-moved to spec 018 follow-up)*: Save Draft / Deploy Changes revision semantics live on the Deployment editor now. This spec's test matrix no longer includes this criterion; it re-appears on the Deployment editor spec.
- **SC-007**: Design-token compliance: `grep -rE "#[0-9A-Fa-f]{3,8}|rgb\\(|hsl\\(|oklch\\(|'Inter'|'JetBrains"` across `apps/web/src/**/*.{tsx,css.ts,css}` excluding `styles/` returns zero matches. CI step fails if non-zero.
- **SC-008**: axe-core automated scan on each of `{ /modules, /modules/{id}, /modules/{id}/blueprint, /deployments/{id} }` returns zero `serious` or `critical` violations.
- **SC-009**: Keyboard-only traversal: a user can reach every interactive element on the Modules page, Module detail, Blueprint view, and deployment editor using only Tab / Shift+Tab / arrow keys / Enter / Space, verified by a Playwright test that disables pointer input.
- **SC-010**: Under `prefers-reduced-motion: reduce`, no primary-dim glow transition fires on hover/focus; verified via a Playwright test that sets the emulated media feature and inspects `animation-duration` on the glow class.
- **SC-011**: Backend: `POST /api/v1/modules/{module_id}/deployments` returns the same shape as `POST /api/v1/deployments` minus non-deterministic fields. Contract test passes.
- **SC-012**: Legacy route redirects: `GET /recipes` and `GET /workflows` respond with a client-side redirect to `/modules` in the released client; `GET /workflows/{id}` redirects to `/modules/user:{id}/blueprint`. Verified by a client-side route test.
- **SC-013**: Zero base-recipe or base-workflow row is mutated by any module-surface action, verified by the 018 byte-equality regression harness extended to cover the new endpoints.
- **SC-014**: Terminology compliance (FR-T01 / FR-T02): a CI-gated scan of all `apps/web/src/**/*.{tsx,ts,css.ts,css}` files excluding test fixtures and API client type files returns zero visible-label occurrences of the word "Deployment" / "deployment" in JSX text children or `aria-label` / `title` / `alt` attribute values (the noun "Deployment" is allowed only in code identifiers, URL strings, API types, and test fixture IDs). Inversely, every CTA and count that refers to an instance of a module MUST use the word "Instance".
- **SC-015**: Extension icons come from the manifest (FR-I01): seeded fixture of 3 extensions — one with `symbol`, one with `svg`, one with neither — produces `GET /api/v1/modules` responses with `icon.kind` values `"symbol"`, `"svg"`, `"fallback"` respectively. The `"fallback"` entry's `icon.value` is deterministic across two cold-start server runs (FNV-1a is stable). The pre-existing substring-heuristic in `apps/web/src/App.tsx:94-100` is removed — `grep` for `l.id.includes\(` in that file returns zero matches.
- **SC-016** *(scope-moved to spec 018 follow-up)*: Revision viewing & revert round-trip moves to the Deployment editor spec. Instance views have no revisions.
- **SC-017**: ZIP install happy path (FR-IE01..FR-IE04): a seeded valid extension ZIP (< 64 MiB, valid manifest.toml at root, no path-escaping entries) uploaded via `POST /api/v1/extensions/install-from-zip` returns HTTP 201 with `{ extension_id, module_id, manifest_summary, install_diagnostics: [] }` in under 5 s on a local filesystem. The Modules drawer optimistically inserts the new card, a subsequent `GET /api/v1/modules` revalidation lists the new module, and the extension is live without a host restart.
- **SC-018**: ZIP install security (FR-IE03, FR-IE05): an adversarial fixture-set of malformed ZIPs — one attempting Zip-Slip (`../../etc/x`), one exceeding 256 MiB uncompressed, one exceeding 8192 entries, one missing `manifest.toml`, one with an `on*`-handler in its `icon.svg`, one with a pre-existing `extension_id` on disk — MUST each produce a distinct structured error code from FR-IE05 and MUST leave the extensions directory byte-identical (no partial writes). Staging temp dirs MUST be absent after every failing request (verified via `ls` on the staging root returning no leftover directories older than 1 s after a completed failing request).
- **SC-019**: Universal draft zero-orphan guarantee (FR-BM01..FR-BM05, FR-050): perform 50 fork actions (mix of Blank Module clicks and Instance-view "Edit" clicks) without ever saving; count `workflows`, `deployments`, and `deployment_revisions` rows before and after — all three counters MUST be identical (zero orphan rows). Save the 51st draft; verify exactly one new `deployments` row (plus its initial revision) is created, plus one new `workflows` row IFF the source is Blank Module, and the URL rewrites to `/#/deployments/{deployment_id}` without a full page reload.
- **SC-020**: Materialize idempotency (FR-BM04): POST materialize twice with the same `{uuid}` within the server's TTL window and identical bodies; the second response MUST be HTTP 200 (not 201), MUST echo the same `{deployment_id, deployment_revision_id}` as the first, and a SQL count of `workflows` + `deployments` rows before vs after the second POST MUST be identical. Different body hash MUST return HTTP 409 `module.draft_uuid_conflict`.
- **SC-021**: Local-first network posture (FR-TP03, FR-TP04): a Playwright test with a network interceptor observes zero requests to any origin other than the local host API across a scripted session that opens Modules, a module detail, a Blueprint view, the Install drawer, an Instance editor, switches tabs, opens the revision picker, and triggers a Save Draft. The test fails on the first non-local request observed (DNS, HTTP, websocket, or beacon). A separate scan of the built `apps/web/dist/**/*.{html,js,css}` returns zero occurrences of `fonts.googleapis.com`, `fonts.gstatic.com`, `lh3.googleusercontent.com`, or any other remote CDN host.
- **SC-022**: Motion durations (FR-041): a visual-regression test measures the `transitionDuration` / `animationDuration` computed styles on each animated surface listed in FR-041 and asserts they fall within ±20 ms of the specified budget. Under `prefers-reduced-motion: reduce` all durations MUST be reported as `0s`.
- **SC-023** *(retired — FR-021 no longer mandates a segmented control)*: Overlay/Blueprint segmented control moved to the Deployment editor spec.
- **SC-024**: Clicking "Edit" on any Instance view MUST NOT issue a POST until the user explicitly saves the draft. Verified via a Playwright network interceptor: the click → navigate to `/#/modules/{id}/draft/{uuid}` sequence produces zero network requests. The first POST is the materialize call, and it only fires on user-initiated Save.
- **SC-025**: Instance views MUST pass `axe-core` with zero interactive widgets other than: Edit, Deploy Instance, View Blueprint, tab buttons (`role=tab`), and the inline Dry Run button. Verified over a 200-module fixture — no regressions slip in across future increments.

---

## Test strategy (amended 2026-04-16)

This spec ships **backend-heavy, frontend-light** on test coverage:

- **Backend (mandatory)**: every new endpoint on `/api/v1/modules/*` and `/api/v1/extensions/install-from-zip` ships with Rust contract tests covering shape, invariants, and error codes. The "no auto-install" invariant (FR-031), the "no base-row mutation" invariant (SC-013), and the fork-materialize idempotency window are all test-guarded. Current coverage: 27 passing contract tests + 15 unit tests.
- **Frontend (deferred)**: vitest and Playwright suites for the Modules page, Instance view, Install drawer, and Deployment editor are NOT mandatory for this spec to be called complete. Rationale: these surfaces are visual compositions over already-tested backend contracts; test churn during design-heavy rollout is high, and the backend contracts are the real invariant guard. The design-quality gate is enforced by the three CI scanners (`scan:theme`, `scan:terminology`, `scan:cdn`), not by e2e tests.
- **Frontend coverage follow-up**: a dedicated sprint will land vitest + Playwright suites against the frozen UX. That sprint will also cover SC-008/009/010/021/022/025 (a11y, reduced motion, local-first network posture, motion budgets, axe-core-on-Instance-view). Until that sprint, those SCs are tracked-but-not-gating.

This deviates from Principle VI (Test-First Verification) of the constitution. The deviation is documented in the constitution v1.1.2 amendment and scoped to spec 019 only; subsequent specs revert to the default test-first discipline.

---

## Assumptions

- The 018-deployments feature is merged and live (deployments tables, SQLite migrations, deployment services, and `POST /api/v1/deployments` exist). This feature builds on that contract; it does not re-litigate deployment persistence semantics.
- The `extensions` table already carries `primary_recipe_id` and `default_workflow_id` (nullable). If they do not, this feature adds them via a forward-compatible additive migration in `crates/nexus-storage/src/sqlite/migrations.rs` (per FR-037 of spec 018: all migrations are centralized there).
- "Each extension is a module" is interpreted as: one `extensions` row contributes one module card. Extensions that contribute multiple recipes still render as one module card with a "Blueprint ▾" quick-pick; this spec does not promote multi-recipe extensions to multi-module.
- The design system lives in `apps/web/src/styles/theme.css.ts` (vanilla-extract) — consistent with existing `apps/web/src/**/*.css.ts` patterns. No new styling framework is introduced.
- Icons come from Google Material Symbols Outlined (already loaded in current UI); fill variation (`'FILL' 1`) signals active state.
- The Modules page is dark-mode-only in v1. A "Light Spectral" theme is deferred.
- Routing uses the existing client-side routing approach (hash or history); no server-side route changes beyond the new API surface.
- Virtualization uses the project's existing grid component if present, otherwise pulls in a lightweight, already-vetted virtualization library (e.g., `@tanstack/react-virtual`) chosen at `/speckit.plan` time.
- The backend "modules" surface is a read-aggregate + one shortcut — it is not a new domain. No `nexus-modules` crate is introduced; the aggregator lives inside `nexus-api` (`crates/nexus-api/src/handlers/modules/`) and delegates to `nexus-deployments`, `nexus-extension`, and `nexus-storage` query helpers.
- Existing `DeploymentsView` component stays; the new `ModulesView`, `ModuleDetailView`, `BlueprintView`, and `DeploymentEditorShell` components are added alongside it. Old `RecipeCatalog` and `WorkflowCatalog` components are retained in-repo for one release to back the `/recipes` and `/workflows` redirect-tolerance period, then removed in a follow-up.
- Performance budget: the Modules page JS bundle (route-split) is ≤ 150 kB gzipped including vanilla-extract CSS; the Deployment editor shell remains within the current workflow-editor budget.
- Accessibility target is WCAG 2.2 AA; reduced-motion compliance is non-negotiable.
- Telemetry events are advisory; their absence never blocks user flow.
