# Research: Vertical Slice MVP

**Date**: 2026-04-11
**Feature**: 002-vertical-slice-mvp

## R-001: Frontend Design Token System

**Decision**: vanilla-extract + @vanilla-extract/sprinkles + @vanilla-extract/recipes + @vanilla-extract/vite-plugin
**Rationale**: Zero-runtime CSS extraction with full TypeScript type safety. createThemeContract + createTheme enables runtime theme switching via CSS custom properties. Sprinkles provides type-safe atomic utility layer. No external framework dependency beyond the build plugin.
**Alternatives considered**: styled-components (maintenance mode, deprecated APIs — rejected), Tailwind CSS (adds framework dependency, utility class sprawl, lacks compile-time token enforcement — rejected), pure CSS custom properties + CSS Modules (no TypeScript enforcement of token usage — rejected)

## R-002: Python Image Processing

**Decision**: Pillow 12.2 (PIL Fork)
**Rationale**: Industry standard for Python image processing. Resize = image.resize((w,h)), grayscale = image.convert('L'). Pure Python install, no system dependencies. Every Python developer knows it.
**Alternatives considered**: Mahotas (lighter but obscure — rejected), OpenCV (massive footprint — rejected), scikit-image (pulls scipy — rejected)

## R-003: API Response Envelope Pattern

**Decision**: Generic ApiResponse<T: Serialize> struct implementing IntoResponse
**Rationale**: Type-level approach catches envelope violations at compile time. No middleware needed. 40 lines of code, full control over field names. Pair with convenience constructors: ApiResponse::ok(data), ApiResponse::paginated(data, meta), ApiResponse::err(status, code, msg).
**Alternatives considered**: Middleware wrapping (double-serialization, fragile — rejected), axum_responses crate (external dependency with own opinions — rejected)

## R-004: Read-Only Graph Rendering

**Decision**: @xyflow/react (React Flow) + @dagrejs/dagre
**Rationale**: Native React integration (nodes are JSX components). First-class dagre DAG layout support with official examples. Read-only mode is trivial (nodesDraggable=false, nodesConnectable=false). MIT licensed, actively maintained.
**Alternatives considered**: Cytoscape.js (canvas/WebGL, no native React — rejected), dagre-d3 (unmaintained — rejected), custom SVG (reimplements everything — rejected), elkjs (heavier, slower — rejected for v0)

## R-005: Recipe Schema

**Decision**: YAML format matching the existing extension manifest pattern. Recipe ID, version, display name, summary, category, workflow template reference, and field bindings. JSON Schema validation like operators.
**Rationale**: Consistent with the established manifest-driven approach. Extensions already reference recipe files from manifests.
**Alternatives considered**: None — the architecture docs already specified this shape.

## R-006: UI Contribution Schema

**Decision**: YAML format with 6 contribution kinds (artifact_viewer, command, config_widget, inspector_panel, recipe_card, tool_metadata). Each contribution has id, kind, extension_id, display_name, target, supported_types, priority, and metadata.
**Rationale**: Defined in requirements doc 07. Metadata-only in v0 — no custom frontend bundles.
**Alternatives considered**: None — architecture specified.

## R-007: Extension State Machine Enhancement

**Decision**: Add quarantined state to the existing state model. Transitions: discovered -> validating -> valid/invalid, valid -> active, active -> disabled/quarantined, disabled -> active, quarantined -> discovered (re-scan).
**Rationale**: Requirements doc 05 specifies quarantined state for repeatedly failing extensions.
**Alternatives considered**: None — specified in requirements.

## Dependency Summary (NEW additions for this sprint)

| Domain | Package | Version | Side |
|--------|---------|---------|------|
| Token system | @vanilla-extract/css | latest | Frontend |
| Token utilities | @vanilla-extract/sprinkles | latest | Frontend |
| Component variants | @vanilla-extract/recipes | latest | Frontend |
| Vite integration | @vanilla-extract/vite-plugin | ^5.2 | Frontend |
| Graph renderer | @xyflow/react | latest | Frontend |
| DAG layout | @dagrejs/dagre | latest | Frontend |
| Image processing | Pillow | >=12.2 | Python |
