# Feature Specification: Workflow Extension Catalog

**Feature Branch**: `009-workflow-extension-catalog`
**Created**: 2026-04-14
**Status**: Draft
**Input**: User description: "I have recipes loaded by extension, each extension adds recipes to the list, however that seems not to be the case for workflows. Can we make similar choice for the workflows, in general graph workflow is bound to an extension and what happens if I have multiple extensions, let's create a nice UI + backend for selecting the right workflow from the ones loaded by the extensions and then open stage and graph view and the other things. The idea is to select the workflow that you want to examine before actually examining it. You should be able to search by name and by extension in both recipes and workflows."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse workflows grouped by extension (Priority: P1)

A power user working with several installed extensions opens the Workflows section and needs to find a specific workflow among dozens of entries contributed by different extensions. They expect to see workflows organized under the extension that contributed them — the same mental model that already works for recipes — so they can scan by source, recognize which extension owns what, and avoid loading the wrong one.

**Why this priority**: This is the core problem the feature exists to solve. Without per-extension grouping, a multi-extension install surfaces workflows as a flat, unattributed list, which breaks the user's ability to reason about provenance and scope. This is the MVP: delivering grouping alone — even without search or filters — already restores clarity.

**Independent Test**: Install at least two extensions that contribute workflows, open the Workflows section, and verify each extension appears as a distinct, labeled group containing only its own workflows. Workflows authored by the user (not shipped by any extension) appear under a separate "User Workflows" group. The current flat-grid layout is replaced.

**Acceptance Scenarios**:

1. **Given** two extensions are installed and each contributes at least one workflow, **When** the user navigates to the Workflows section, **Then** two extension-labeled groups render, each containing only the workflows contributed by that extension, and no workflow appears under the wrong group.
2. **Given** the user has created or imported a workflow that does not belong to any extension, **When** the user opens the Workflows section, **Then** that workflow appears in a dedicated "User Workflows" group and not under any extension group.
3. **Given** an extension contributes workflows and the user has edited one of them in the graph editor, **When** the user reopens the Workflows section, **Then** the edited workflow still appears under its originating extension group and is visually marked as "Modified."
4. **Given** an extension is later uninstalled or disabled, **When** the user opens the Workflows section, **Then** workflows previously contributed by that extension are no longer listed under an active extension group; any user-edited copies remain accessible under "User Workflows" or an equivalent preserved-content group.

---

### User Story 2 - Select a workflow before examining it (Priority: P1)

When the Workflows section is opened, the user wants to browse and explicitly pick a workflow before any graph, stage, or inspector panel loads. Today the interface silently auto-selects the first workflow, which hides the catalog and forces users to hunt back to switch context. The user wants an intentional "pick first, examine after" flow.

**Why this priority**: Auto-loading the first workflow defeats the grouping and search work entirely — users never reach the catalog. Fixing the selection flow is as important as building the grouped catalog itself; the two together form the MVP.

**Independent Test**: With one or more workflows present, open the Workflows section and verify the catalog is the first view shown. No graph or stage view is rendered until the user activates a workflow. Activating a workflow transitions to the editor views (stage / graph / trace) for the chosen workflow and retains that selection when switching between those views.

**Acceptance Scenarios**:

1. **Given** at least one workflow exists, **When** the user navigates to Workflows, **Then** the catalog is shown and no graph, stage, or run-trace view is pre-rendered.
2. **Given** the catalog is visible, **When** the user activates (clicks/Enter) a workflow card, **Then** the system transitions to the previously-selected editor view (stage by default) for that workflow and the workflow remains selected when the user switches between stage, graph, and trace views.
3. **Given** a workflow is open in the editor, **When** the user returns to the Workflows section, **Then** the catalog is shown again (not the editor) and a clear affordance exists to return to the previously open workflow.
4. **Given** no workflows exist, **When** the user navigates to Workflows, **Then** the catalog shows an empty state that directs the user to install an extension or create a new workflow — not a blank editor.

---

### User Story 3 - Search and filter workflows and recipes (Priority: P2)

A user with many installed extensions wants to narrow the catalog by typing a name fragment, an extension name, or by toggling status filters (e.g., show only stable, show only user-modified, show only a specific extension). The same capability should apply to both the Workflows and the Recipes catalogs so the two views feel like one cohesive system.

**Why this priority**: Grouping alone scales to a handful of extensions. Search and filtering are required once the user has many extensions or many workflows per extension. This builds directly on Story 1 and requires it to exist first, so it ships second.

**Independent Test**: With multiple extensions and multiple workflows/recipes, type a name fragment in the search box and verify only matching items remain visible, with their extension group headers hidden when empty. Toggle a status filter (e.g., "Modified") and verify only matching items remain. Clear the search/filters and verify all items return. The same behavior works identically for Recipes.

**Acceptance Scenarios**:

1. **Given** multiple workflows across multiple extensions are listed, **When** the user types a fragment of a workflow title into the search field, **Then** only workflows whose title, identifier, description, or owning-extension name matches the fragment remain visible, and extension groups with zero matches are hidden.
2. **Given** the catalog is visible, **When** the user activates the "Modified" status filter, **Then** only workflows marked as user-edited remain visible across all groups.
3. **Given** an active search query and filter combination, **When** the user clears the search, **Then** the filter remains active but all non-search-constrained items matching the filter return to view; clearing both restores the full catalog.
4. **Given** the user is on the Recipes catalog, **When** they use the search and filter controls, **Then** the controls behave identically to the Workflows catalog (same keyboard shortcuts, same filter semantics, same empty-state behavior).

---

### User Story 4 - Quick access to the source extension folder (Priority: P3)

When examining a workflow or recipe, the user occasionally needs to inspect the underlying files on disk (e.g., to see the shipped YAML). Each extension group header should offer a quick action to reveal that extension's folder, mirroring the affordance shown in the reference design.

**Why this priority**: A convenience for advanced users. Not required for the catalog to function, but significantly reduces friction when debugging or authoring extensions. Ships after the search/filter layer is stable.

**Independent Test**: With at least one extension installed, open the Workflows catalog, activate the "Open extension folder" affordance on a group header, and verify the user is given a reliable way to access the extension's on-disk directory (e.g., reveal in OS file manager, or the absolute path is copied to the clipboard with a visible confirmation).

**Acceptance Scenarios**:

1. **Given** an extension group header is visible, **When** the user activates its "Open extension folder" affordance, **Then** the system provides access to the extension's directory on disk by revealing it in the host OS file manager or by copying the absolute path to the clipboard and confirming the action visually.
2. **Given** the extension directory cannot be opened (e.g., path missing, permission denied), **When** the user activates the affordance, **Then** a clear, non-blocking error message is shown without disrupting the catalog view.

---

### Edge Cases

- An extension contributes zero workflows: its group header is suppressed in the Workflows catalog (it still appears in the Extensions section).
- An extension is disabled after contributing workflows: its workflows stop being re-seeded at boot, but any copies the user has edited remain accessible and marked as such.
- Two different extensions contribute workflows with the same identifier: treated as an extension packaging error; each workflow is shown under its contributing extension and a warning badge indicates the conflict.
- A user-edited workflow whose originating extension has been uninstalled: remains listed under "User Workflows" (or equivalent preserved-content group) with a badge noting the missing source extension.
- Search query produces zero matches: the catalog shows an explicit "No results for '…'" empty state with a clear reset action.
- The user deep-links to a workflow id that no longer exists (e.g., the extension was uninstalled): the catalog is shown with an inline notice explaining why the target could not be opened.
- Extremely large catalogs (hundreds of workflows across many extensions): the catalog remains responsive; scrolling and search feel smooth and do not stall the UI.

## Requirements *(mandatory)*

### Functional Requirements

**Data model & provenance**

- **FR-001**: The system MUST record, for every workflow, the identifier of the extension (if any) that contributed it and the version of that extension at contribution time.
- **FR-002**: The system MUST allow a workflow to have no originating extension, representing user-authored or externally imported workflows.
- **FR-003**: The system MUST preserve the extension-origin information across application restarts and across re-seeding of extension-shipped workflows at boot.
- **FR-004**: The system MUST continue to honor the existing user-edit protection: once a user edits a shipped workflow, subsequent boots MUST NOT overwrite that workflow from the extension YAML, and the edit MUST be reflected as a "Modified" status in the catalog.

**Catalog listing**

- **FR-005**: The system MUST expose workflows to the UI together with their extension identifier, extension version, and a status signaling whether the workflow tracks the shipped extension content or has been user-modified.
- **FR-006**: The Workflows catalog MUST group workflows under the extension that contributed them, with a distinct group for workflows that have no originating extension.
- **FR-007**: Each extension group MUST display the extension's human-readable name and version and MUST list only the workflows contributed by that extension.
- **FR-008**: The Recipes catalog MUST apply the same extension-grouped layout as the Workflows catalog, using the existing recipe → extension association.

**Search & filter**

- **FR-009**: Both the Workflows and Recipes catalogs MUST provide a search input that matches against item name/title, item identifier, item summary/description, and owning-extension name, updating results as the user types.
- **FR-010**: Both catalogs MUST provide filter controls that allow the user to narrow results by at least: status (stable vs. user-modified) and originating extension.
- **FR-011**: When a search query or filter hides all items in a group, the group header MUST be suppressed so only groups with visible items remain.
- **FR-012**: The system MUST provide a visible, single-action way to clear all active search and filter state and return to the full catalog.

**Selection-first navigation**

- **FR-013**: Opening the Workflows section MUST show the catalog first; the system MUST NOT auto-open any workflow in the graph, stage, or run-trace views when the user navigates to Workflows.
- **FR-014**: Activating a workflow in the catalog MUST transition the user to the workflow editor views (stage / graph / trace) for that workflow and MUST retain that selection while the user switches between those views.
- **FR-015**: From an open workflow, the user MUST be able to return to the catalog and re-select a different workflow without losing their current session/UI context.
- **FR-016**: The catalog MUST display a meaningful empty state when no workflows exist, directing the user toward installing an extension or creating a new workflow.

**Status & badges**

- **FR-017**: Each workflow card MUST clearly indicate its status using at minimum: a "Stable" / "Modified" distinction for extension-shipped workflows and a "User" distinction for workflows without an originating extension.
- **FR-018**: Each workflow card MUST show at-a-glance technical context — at minimum, its identifier, version, and a count of nodes and/or stages — alongside its human-readable title and summary.

**Source access**

- **FR-019**: Each extension group header MUST expose an action that provides access to the extension's on-disk directory, either by revealing it in the host OS file manager or by copying its absolute path to the clipboard with visible confirmation.
- **FR-020**: The source-access action MUST fail gracefully with a clear, non-blocking error when the path cannot be opened (e.g., missing or permission-denied).

**Visual language**

- **FR-021**: The redesigned catalog surfaces MUST conform to the project's Spectral Graphite design system: dark graphite surface tiers with tonal-shift sectioning (no hairline borders for layout), violet primary accents, a dual typeface scheme that uses a sans-serif for interface labels and a monospaced face for identifiers/versions, and compositor-friendly hover/focus motion.

**Integrity of existing behavior**

- **FR-022**: Changes to the workflow data model MUST be backward compatible with existing persisted workflows, existing runs, and existing artifact lineage records; no user data is lost on upgrade.
- **FR-023**: Workflows whose originating extension cannot be determined at migration time MUST be treated as user-authored (no originating extension) rather than being discarded or misattributed.

### Key Entities

- **Workflow**: A graph of operator invocations with inputs, outputs, nodes, edges, stages, and a user-edit timestamp. New attributes capture the originating extension identifier and version (both optional) so the catalog can attribute provenance.
- **Extension**: An installable contributor that may ship workflows, recipes, operators, UI layouts, and storage. The catalog surfaces the extension's human-readable name, version, and on-disk directory for group headers and the source-folder action.
- **Recipe**: Already linked to an extension; used by the same catalog presentation so Recipes and Workflows share grouping, search, and filter behavior.
- **Workflow Status**: A derived attribute per workflow indicating whether it is still tracking the shipped extension YAML ("Stable"), has been edited by the user ("Modified"), or has no originating extension ("User").
- **Catalog Group**: A presentational grouping tied either to a specific extension (with name, version, source folder) or to the implicit "User Workflows" collection.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In a user test with at least two installed extensions, users identify the extension that owns a given workflow in under 5 seconds with no prior hint — correct identification rate ≥ 95%.
- **SC-002**: Users locate a specific workflow by name in a catalog of 50+ entries in under 10 seconds using search — with a success rate ≥ 90% on first attempt.
- **SC-003**: Zero incidents in a usability round where the user intended to browse workflows but instead landed on a pre-opened editor (i.e., the "selection-first" flow is honored in 100% of navigations to the Workflows section).
- **SC-004**: 100% of extension-contributed workflows display the correct originating extension and version in the catalog on a fresh install; 100% of user-edited workflows display the "Modified" status and retain their edits across an app restart.
- **SC-005**: The Recipes and Workflows catalogs share the same keyboard-level interaction model (search focus, clear, activate) with zero observed inconsistency in a side-by-side review.
- **SC-006**: Catalog responsiveness: search filtering feels instantaneous (perceived latency under 100 ms) for catalogs of up to 500 combined entries across all extensions.
- **SC-007**: Upgrading an existing installation populates extension attribution for all pre-existing extension-shipped workflows with zero data loss, as verified by comparing pre- and post-upgrade run history and artifact lineage counts.

## Assumptions

- The project's existing Spectral Graphite design system is the source of truth for visual tokens; this feature adopts it rather than defining new tokens.
- Recipes already carry an extension identifier and their grouping logic can be reused; no backend change is needed for recipe → extension attribution.
- Extension identifiers and versions shipped in extension manifests are stable enough to serve as the grouping key across restarts.
- The "User Workflows" concept covers both workflows the user creates inside the app and any workflows whose originating extension is unknown after upgrade — a single bucket is acceptable for the MVP.
- The on-disk reveal action uses the host OS's native file manager where available; when it is not available, falling back to copying the absolute path to the clipboard is acceptable.
- Multi-extension conflicts (two extensions shipping a workflow with the same identifier) are rare and are treated as packaging errors surfaced via a conflict badge, not reconciled automatically.
- Search matches are case-insensitive substring matches across the documented fields; advanced query syntax is out of scope for this feature.
- Pagination is out of scope for v1; the catalog is expected to remain performant for the anticipated number of workflows (hundreds, not tens of thousands).
- Deep-linking to a specific workflow via URL is out of scope for this feature and can be layered on later without breaking the catalog contract.
