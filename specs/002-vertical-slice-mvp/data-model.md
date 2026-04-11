# Data Model: Vertical Slice MVP

**Date**: 2026-04-11
**Feature**: 002-vertical-slice-mvp
**Builds on**: 001-arch-core-setup/data-model.md

This document covers entities added or modified in sprint 002. Entities defined in sprint 001 (Extension, Operator, Port, Workflow, NodeInstance, Edge, Stage, Run, NodeExecution, Artifact, LineageEdge, Worker, Event) remain as specified unless explicitly listed under "Modified Entities" below.

## New Entities

### Recipe

A curated workflow entry point contributed by an extension. Recipes give end users a simplified form over a workflow template, mapping user-facing fields to workflow inputs and node config values.

| Field | Type | Description |
|-------|------|-------------|
| id | String | Globally unique recipe identifier (dot-separated, e.g., `recipe.image.basic_transform`) |
| version | SemVer | Recipe version |
| display_name | String | Human-readable name shown in UI catalogs |
| summary | String | One-line description |
| category | String | Grouping category (e.g., `Image`, `Video`, `Audio`) |
| extension_id | String | Contributing extension identifier |
| extension_version | SemVer | Contributing extension version at registration time |
| workflow_template_ref | String | Relative path to the workflow YAML within the extension package |
| thumbnail | String (optional) | Relative path to a thumbnail image within the extension package |
| input_summary | String (optional) | Brief description of expected inputs |
| bindings | Vec<RecipeFieldBinding> | Field-to-workflow mappings |
| created_at | DateTime | Registration timestamp |

### RecipeFieldBinding

Maps a user-facing field name to a target location in the workflow.

| Field | Type | Description |
|-------|------|-------------|
| field | String | User-facing field name displayed in recipe form |
| maps_to | String | Target path: `input:<port_name>` for workflow inputs, `node:<node_id>.config.<key>` for node config |

### UIContribution

Metadata descriptor contributed by an extension for the host UI to surface. Extensions do not ship frontend bundles -- they declare structured metadata that the host interprets.

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique contribution identifier within the extension |
| kind | UIContributionKind | Category of contribution |
| extension_id | String | Contributing extension identifier |
| display_name | String | Human-readable name |
| description | String (optional) | Short description |
| target | String (optional) | Target operator or artifact type this contribution applies to |
| supported_types | Vec<String> (optional) | Artifact types this contribution handles (primarily for viewers) |
| priority | u32 | Priority for selection when multiple contributions match. Default `0`. |
| metadata | JsonValue (optional) | Kind-specific structured metadata |
| availability | String | Status: `available` or `unavailable`. Default `available`. |

### UIContributionKind (enum)

| Variant | Description |
|---------|-------------|
| `artifact_viewer` | Renders artifacts of specific types |
| `command` | User-invocable action (menu item, palette entry) |
| `config_widget` | Custom widget hint for an operator config field |
| `inspector_panel` | Additional panel in the right inspector sidebar |
| `recipe_card` | Display metadata for recipe catalog cards |
| `tool_metadata` | Additional metadata for tool catalog entries |

### Tool (projection)

Normalized user-facing capability surfaced from operators and recipes. This is a computed view, not a persisted entity. The host assembles it on demand from the operator and recipe registries.

| Field | Type | Description |
|-------|------|-------------|
| id | String | Composite identifier: `tool:operator:<operator_id>` or `tool:recipe:<recipe_id>` |
| kind | String | `"operator"` or `"recipe"` |
| target_id | String | Underlying operator or recipe ID |
| display_name | String | Human-readable name |
| description | String (optional) | Short description |
| category | String | Category for grouping |
| tags | Vec<String> | Search tags (from operator metadata + tool_metadata contributions) |
| icon | String (optional) | Icon reference (from tool_metadata contribution) |
| extension_id | String | Source extension identifier |
| availability | String | `"available"` if the source extension is active, `"unavailable"` otherwise |

---

## Modified Entities

### Extension (additions)

Three fields added to the Extension entity from sprint 001:

| Field | Type | Description |
|-------|------|-------------|
| recipe_count | u32 | Number of recipes contributed by this extension. Default `0`. |
| ui_contribution_count | u32 | Number of UI contributions contributed by this extension. Default `0`. |
| validation_errors | Vec<String> (optional) | Structured diagnostics from the most recent validation pass. `null` when the extension is valid. |

### ExtensionStatus (expanded)

The extension state machine gains two states:

| Status | Description |
|--------|-------------|
| `discovered` | Package found on disk, not yet validated |
| `validating` | Validation in progress |
| `valid` | Passed validation, not yet activated (transient) |
| `invalid` | Failed validation with diagnostics |
| `active` | Validated and serving operators, recipes, and UI contributions |
| `disabled` | Manually disabled by user; historical data preserved |
| `quarantined` | Automatically isolated due to runtime failures (repeated worker crashes, protocol violations) |

**State transitions**:

```text
discovered -> validating -> valid -> active
                         -> invalid
active -> disabled -> active
active -> quarantined -> validating -> valid -> active
                                    -> invalid
disabled -> validating (on re-enable with re-validation)
```

### Run (additions)

Two fields added to the Run entity from sprint 001:

| Field | Type | Description |
|-------|------|-------------|
| run_label | String (optional) | User-assigned or system-generated label for display |
| execution_profile | String (optional) | Execution profile hint (e.g., `fast`, `quality`, `debug`) |

---

## Enums (new)

### UIContributionKind

`artifact_viewer` | `command` | `config_widget` | `inspector_panel` | `recipe_card` | `tool_metadata`

### ExtensionStatus (revised, supersedes sprint 001 definition)

`discovered` | `validating` | `valid` | `invalid` | `active` | `disabled` | `quarantined`

---

## Relationships (additions to sprint 001)

```text
Extension 1--* Recipe             (extension contributes recipes)
Extension 1--* UIContribution     (extension contributes UI metadata)
Recipe    *--1 Workflow            (recipe references a workflow template)
```

Full relationship graph (sprint 001 + 002):

```text
Extension 1--* Operator           (extension owns operators)
Extension 1--* Recipe             (extension contributes recipes)
Extension 1--* UIContribution     (extension contributes UI metadata)
Workflow  1--* NodeInstance        (workflow contains nodes)
Workflow  1--* Edge                (workflow contains edges)
Workflow  1--* Stage               (workflow contains stages)
NodeInstance *--1 Operator         (node references operator)
Run       *--1 Workflow            (run executes workflow)
Run       1--* NodeExecution       (run tracks node states)
Run       1--* Artifact            (run produces artifacts)
Artifact  *--* Artifact            (lineage: input -> output via LineageEdge)
Worker    *--1 Extension           (worker serves extension)
Recipe    *--1 Workflow            (recipe references workflow template)
```

---

## Validation Rules (additions to sprint 001)

- Recipe ID must be globally unique across all active extensions
- Recipe version must be valid semver
- Recipe workflow_template_ref must resolve to an existing file within the extension package
- Recipe bindings maps_to paths must use recognized prefixes (`input:`, `node:`)
- UIContribution ID must be unique within its extension
- UIContribution kind must be one of the six recognized values
- UIContribution artifact_viewer must declare at least one supported_type
- UIContribution config_widget must declare target_operator and target_field
- Extension validation_errors field is populated on validation failure and cleared on successful re-validation
- Extension recipe_count and ui_contribution_count are computed during extension activation
- Run run_label is optional and may be set at creation or updated later
- Run execution_profile is optional and advisory (the host may ignore unknown profiles)
