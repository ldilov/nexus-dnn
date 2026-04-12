# Feature Specification: Frontend Rework — Spectral Graphite UI

**Feature Branch**: `feature/003-design-system-ui`
**Created**: 2026-04-12
**Status**: Draft
**Input**: Reference mockups from stitch_workflow_canvas_engine.zip + Spectral Graphite DESIGN.md + existing design system spec

## Overview

Rework the Nexus-DNN frontend from its current minimal token-based shell into the "Spectral Graphite" visual system — a dark, editorial, high-density interface built for developer workflows. The UI transitions from blue accent + border-based separation to violet-primary + tonal depth layering with glassmorphism, a hybrid expandable sidebar, integrated AI assistant, and full view implementations for all 6 workflow lenses.

### Visual North Star: The Kinetic Observatory

The UI is a dark, expansive void where data points are luminous celestial bodies. Deep Graphite surfaces provide depth through tonal layering. Borders are eliminated in favor of background color shifts between regions. Floating elements (modals, palettes, chat panels) use glassmorphism to let the workspace bleed through. The spectral palette — violet, indigo, orange, cyan, green — assigns semantic meaning to every color, preventing "rainbow fatigue."

### Key Departures from Current Implementation

| Current (003 Phase 1) | Target (Spectral Graphite) |
|---|---|
| Blue primary (#5EA1FF) | Violet primary (#ba9eff) |
| Border-based panel separation | No-Line Rule — tonal shifts only |
| Fixed icon rail (56px) + secondary panel (240px) | Hybrid sidebar: 64px collapsed, 256px on hover, pinnable |
| Geist font | Space Grotesk (headlines) + Inter (body) |
| No AI assistant | Neural Assistant chat panel |
| Flat elevated surfaces | Glassmorphism on floating elements |
| Unicode placeholder icons | Material Symbols Outlined |

---

## User Scenarios & Testing

### User Story 1 — Spectral Token System & Surface Layering (Priority: P1)

The developer opens the app and sees a dark, layered interface where panels are distinguished by tonal shifts in surface color — not borders. The violet accent appears on active navigation, focused inputs, and primary CTAs. Every color has a specific semantic job.

**Why this priority**: The token system is the foundation everything else is built on. Every view, component, and interaction depends on correct surface layering, accent assignment, and the No-Line Rule. Without this, nothing looks right.

**Independent Test**: Replace current token primitives and dark theme values. The shell renders with correct Spectral Graphite palette. No visible 1px borders between layout regions — only tonal shifts.

**Acceptance Scenarios**:

1. **Given** the app loads, **When** the user sees the shell, **Then** the background is Deep Graphite (#0c0e10), panels use tonal surface tiers (surface_container_low through highest), and no 1px solid borders separate the sidebar from the canvas or the canvas from the inspector.
2. **Given** a navigation item is active, **When** the user views the sidebar, **Then** the active item shows violet (#ba9eff) icon color with a 2px left border accent, and inactive items are at 40% opacity of on-surface color.
3. **Given** a modal or command palette opens, **When** it renders, **Then** it uses glassmorphism — surface_container_high at 80% opacity with 20px backdrop-blur, allowing content beneath to bleed through.
4. **Given** the user focuses an input, **When** the input receives focus, **Then** the bottom border transitions from outline_variant to violet primary with a subtle 2px outer glow.

### Functional Requirements (US-1):

- **FR-001**: Token primitives MUST define the Spectral Palette: primary (#ba9eff), secondary/intelligence (#9093ff), tertiary/manual (#ff8439), acid-green (#22C55E), error (#ff6e84).
- **FR-002**: Token primitives MUST define the Graphite surface scale: surface (#0c0e10), surface_container_lowest (#000000), surface_container_low (#111416), surface_container (#1c2025), surface_container_high (#262a30), surface_container_highest (#31353b).
- **FR-003**: Text MUST use on-surface (#e0e2ea) at full, 60%, and 40% opacity tiers — never pure white (#FFFFFF).
- **FR-004**: The No-Line Rule MUST be enforced: standard 1px solid borders are prohibited for layout sectioning. Layout regions MUST be separated by background color shifts between surface tiers.
- **FR-005**: Ghost borders (outline_variant at 15% opacity) MAY be used for data tables and high-density list separation where tonal shift alone is insufficient.
- **FR-006**: Floating elements (modals, command palette, dropdowns, AI chat) MUST use glassmorphism: surface_container_high at 80% opacity with backdrop-filter: blur(20px).
- **FR-007**: Shadows MUST be tinted (never pure black): rgba(0, 0, 0, 0.4) with 32px blur and 12px Y-offset for high-elevation elements.
- **FR-008**: Primary hover effects MUST use a dim glow: box-shadow: 0 0 12px 0 rgba(132, 85, 239, 0.27).

---

### User Story 2 — Hybrid Expandable Sidebar with Material Icons (Priority: P1)

The developer sees a compact icon sidebar (64px) on the left. When they hover over it, it smoothly expands to 256px revealing labels in JetBrains Mono uppercase. They can pin it open via a pin button, at which point it stays expanded and shows secondary panel content (operator library, filter lists, etc.) below the navigation items.

**Why this priority**: The sidebar is the primary navigation mechanism and directly affects layout calculations for every view.

**Independent Test**: Sidebar renders at 64px with Material Symbols icons. On hover, it expands to 256px with labels. Click the pin icon to lock it open. Unpinning collapses it back to hover-expand mode.

**Acceptance Scenarios**:

1. **Given** the app loads, **When** the sidebar is in collapsed state, **Then** it renders at 64px width showing only Material Symbols Outlined icons (20px, FILL 0, wght 400) with the active icon in primary color and a 2px left accent bar.
2. **Given** the sidebar is collapsed, **When** the user hovers over it, **Then** it expands to 256px with a cubic-bezier(0.4, 0, 0.2, 1) transition over 300ms, revealing JetBrains Mono uppercase labels (11px, tracking 0.05em) that fade in via opacity transition.
3. **Given** the sidebar is expanded (hovered), **When** the user clicks the pin button, **Then** the sidebar locks at 256px and a secondary panel content area appears below the nav items. The canvas and inspector areas reflow to accommodate the wider sidebar.
4. **Given** the sidebar is pinned, **When** the user clicks the unpin button, **Then** it returns to hover-expand behavior and the canvas reclaims the space.
5. **Given** the sidebar is pinned and the user is in the Graph view, **When** the secondary content shows the operator library, **Then** it displays a search input and categorized operator lists (INPUT/OUTPUT, PROCESSING, GENERATION, UTILITY) with drag-to-canvas support.

### Functional Requirements (US-2):

- **FR-009**: Sidebar MUST be 64px collapsed, 256px expanded. Expansion triggered by hover (unpinned) or permanently via pin toggle.
- **FR-010**: Navigation items: Home, Recipes, Workflows, Runs, Artifacts, Extensions, Models. Utility items (bottom): Settings, Help/Docs.
- **FR-011**: Icons MUST use Material Symbols Outlined (Google Fonts), variation settings: FILL 0, wght 400, GRAD 0, opsz 24. Active icon: FILL 1.
- **FR-012**: Active nav item: primary color icon, 2px left border in primary, surface_container_high background. Inactive: on-surface at 40% opacity.
- **FR-013**: Labels MUST be JetBrains Mono, 11px, uppercase, letter-spacing 0.05em.
- **FR-014**: When pinned, the sidebar MUST show a secondary content area below navigation that changes based on active nav item and current view.
- **FR-015**: Sidebar background MUST be surface_container_low (#111416). No right border — separation is achieved via tonal contrast with the canvas surface (#0c0e10).

---

### User Story 3 — Home Dashboard (Priority: P1)

The developer lands on the Home Dashboard after logging in. They see a welcome hero section, quick-start actions (New Workflow, Import Recipe), recent workflow cards, an active runs table, and a runtime health panel. The AI assistant is available in a right-side chat panel.

**Why this priority**: The dashboard is the entry point and first impression. It establishes the product's visual language and provides the primary navigation to workflows.

**Independent Test**: Dashboard renders with hero section, workflow grid, runs table, and health panel. All data fetched from host APIs. AI assistant panel visible on right.

**Acceptance Scenarios**:

1. **Given** the user navigates to Home, **When** the dashboard loads, **Then** the hero section shows "Welcome back, Developer." in Space Grotesk bold (2.5rem, tracking -0.02em) with a system health summary line beneath.
2. **Given** the dashboard is loaded, **When** the user views Quick Start, **Then** two cards appear: "Start with Recipe" (browse curated templates) and "Build from Scratch" (open canvas). Each has an icon, heading, description, and CTA button.
3. **Given** workflows exist, **When** the Recent Workflows section renders, **Then** it shows a horizontal scrollable row of workflow cards with: title, pipeline ID (mono), last run timestamp, status dot, and a thumbnail/icon.
4. **Given** runs are active, **When** the Active Runs table renders, **Then** it shows columns: Process (mono), Pipeline ID (mono), Status (colored dot + label), Condition (colored text), Worker (mono), Runtime (mono, right-aligned). Row hover uses surface_container_highest.
5. **Given** the runtime is healthy, **When** the Runtime Health section renders, **Then** it shows: CPU/GPU/VRAM usage meters (bar gauges with threshold coloring), local cache stats (artifact count + size), worker activity sparkline, and system status badge.

### Functional Requirements (US-3):

- **FR-016**: Dashboard MUST use a full-canvas layout (no secondary panel, no inspector).
- **FR-017**: Welcome hero: Space Grotesk bold, tracking-tight, on-surface color. Subtext: Inter, on-surface-variant.
- **FR-018**: Quick Start cards: two cards side by side. Primary card uses a primary-gradient background. Secondary card uses surface_container_high with ghost border.
- **FR-019**: Recent Workflows: horizontal scrollable card row. Each card: surface_container_low background, hover → surface_container_high. Pipeline ID in JetBrains Mono. Status dot using state semantic colors.
- **FR-020**: Active Runs table: no visible row borders (No-Line Rule). Separation via 4px vertical space between rows. Hover → surface_container_high background. Status column uses colored dots: green (Running → acid-green), amber (Paused), red (Failed), slate (Completed).
- **FR-021**: Runtime Health: right column panel. Meter bars for CPU/VRAM with threshold coloring (green 0-60%, amber 60-85%, red 85-100%). Cache stats in mono. Worker sparkline using primary color.
- **FR-022**: Notification card for updates: surface_container_low background with primary left accent bar. Includes title, description, and action link.

---

### User Story 4 — Workflow Graph Editor with Custom Nodes (Priority: P1)

The developer opens a workflow and switches to the Graph view. They see a full node editor canvas with custom-rendered nodes showing inline video previews, typed ports color-coded by modality, real-time execution status, and an operator library in the (pinned) sidebar. A bottom performance drawer shows node latency, diagnostics, and a console.

**Why this priority**: The graph editor is the core power-user tool and the most complex view. It defines the product's differentiation.

**Independent Test**: Graph canvas renders with @xyflow/react, custom node components, modality-colored ports, operator library sidebar, bottom performance drawer, and inspector panel showing selected node configuration.

**Acceptance Scenarios**:

1. **Given** the user opens Graph view, **When** the canvas loads, **Then** it renders using @xyflow/react with colorMode="dark", custom CSS overriding --xy-* variables to match the Spectral Graphite palette. Background uses a subtle dot grid on surface (#0c0e10).
2. **Given** nodes exist in the workflow, **When** they render, **Then** each node shows: header with operator name + kebab menu, typed input/output ports on left/right edges, optional inline preview (image/video thumbnail), optional config fields, and a footer with execution time + cache indicator.
3. **Given** a node is actively running, **When** the user views it, **Then** the node border shows primary color with a subtle pulse animation (opacity 0.6→1.0 over 2s) and an "ACTIVE" badge appears in the header.
4. **Given** the operator library sidebar is open (pinned), **When** the user searches, **Then** operators are filtered by fuzzy match and displayed in categorized sections (INPUT/OUTPUT, PROCESSING, GENERATION, UTILITY) with drag handles for drag-to-canvas creation.
5. **Given** the bottom drawer is expanded, **When** the user views Performance tab, **Then** it shows: node latency bar chart (one bar per node, colored by state), status code listing (mono), global throughput (large numeric display with FPS unit), and a "LIVE" indicator badge.

### Functional Requirements (US-4):

- **FR-023**: Graph canvas MUST use @xyflow/react with base.css import only. All --xy-* CSS variables overridden to match Spectral Graphite tokens.
- **FR-024**: Custom node component: surface_container_low background, 10px radius, no border (No-Line Rule — use tonal shift from canvas). Header: 28px, operator name in Inter medium, kebab menu on hover.
- **FR-025**: Node ports: 10px circles. Filled with modality color when connected, hollow outline when unconnected. Modality colors: image (#B57CFF), video (#21C7D9), audio (#34D399), text (#F5B942), model (#ba9eff), system (#94A3B8).
- **FR-026**: Node state styling: Running → primary border + pulse. Completed → acid-green border, fades after 3s. Failed → error border, persists. Cache hit → cyan dashed border.
- **FR-027**: Edges: bezier curves, 2px stroke, source port modality color at 40% opacity. Hover → 80%. Selected → 100% with glow.
- **FR-028**: Inline previews: image/video nodes show a thumbnail (max 120px height) in the node body. Video previews use a poster frame.
- **FR-029**: Canvas controls: zoom in/out/fit/lock. Pan via middle mouse or Space+drag. Quick add via double-click canvas → operator search at cursor.
- **FR-030**: Minimap: bottom-right, 160x120px, glass-effect background. Node colors from nodeColor callback mapped to state tokens.
- **FR-031**: Bottom drawer: tab bar with Performance | Diagnostics | Console. Resizable (snap to 0/160/240/400px). Node latency bar chart, status code listing, global throughput display.

---

### User Story 5 — Workflow Recipe View with Step Cards (Priority: P2)

The developer opens a recipe workflow. They see a guided input configuration panel on the left, numbered process step cards in the center with progression markers, a live preview canvas below, and a summary inspector on the right.

**Why this priority**: Recipe view is the beginner-friendly entry point. Important for adoption but less technically complex than Graph view.

**Independent Test**: Recipe view renders with input config panel, numbered step cards, preview canvas, and inspector. Toggling input parameters updates the workflow.

**Acceptance Scenarios**:

1. **Given** the user opens a recipe, **When** the Recipe view loads, **Then** the sidebar (pinned) shows input configuration with: source media selector (thumbnail + "Select Source Video"), toggle cards (Temporal Denoising, Face Enhancement), dropdown selectors (Upscale Factor), and model architecture segmented control.
2. **Given** step cards render in the center, **When** the user views them, **Then** each card shows: step number + title ("1. Frame Analysis & Pre-processing"), description text, right-aligned parameter badges (Auto-Scaled, FP16, Tiling On), and a left-edge progression line connecting all steps with dots.
3. **Given** the workflow is running, **When** a step completes, **Then** its progression dot transitions from running (primary pulse) to completed (acid-green + checkmark animation).
4. **Given** the user modifies advanced parameters, **When** the workflow diverges from recipe constraints, **Then** an amber warning badge appears: "Customized beyond recipe" with a link to "Open Advanced Graph →".
5. **Given** a preview canvas exists, **When** the workflow produces visual output, **Then** the preview area shows a live-updating image/video in a 16:9 aspect ratio container with fullscreen/snapshot controls.

### Functional Requirements (US-5):

- **FR-032**: Recipe view: three-column layout. Left: input configuration in pinned sidebar. Center: process steps + preview canvas. Right: summary inspector (estimated time, GPU memory, target format, model info).
- **FR-033**: Input config: cards with surface_container_low background. Toggles, dropdowns, segmented controls using Spectral Graphite component tokens.
- **FR-034**: Step cards: surface_container background, 10px radius. Step number in primary color circle. Title in Inter semibold. Description in on-surface-variant. Parameter badges as chips.
- **FR-035**: Progression line: 2px vertical line, outline_variant color, connecting step dots. Active dot: primary pulse. Completed dot: acid-green.
- **FR-036**: Advanced section: collapsed by default with chevron toggle. "Customized" badge appears when any advanced parameter deviates from defaults.
- **FR-037**: Preview canvas: surface_container_lowest background, 16:9 container. "Waiting for input stream..." placeholder text in on-surface at 40%.
- **FR-038**: Bottom area: Terminal Logs | Events | Problems tabs. Log stream with severity coloring (mono font, timestamps).

---

### User Story 6 — Artifact Browser with Modality Filtering (Priority: P2)

The developer navigates to Artifacts. They see a full-page browser with modality filter tabs (Image, Video, Audio, Text), a search bar, and a responsive grid of artifact cards showing rich previews with metadata overlays.

**Why this priority**: Artifact browsing is a core workflow step — users need to find, inspect, and trace outputs. Critical for the "artifacts are first-class" principle.

**Independent Test**: Artifact browser renders with filter tabs, search, and a grid of cards. Clicking a card opens the detail inspector. Hover on video cards shows frame scrub.

**Acceptance Scenarios**:

1. **Given** the user navigates to Artifacts, **When** the browser loads, **Then** a search bar appears at top with modality filter tabs: ALL, IMAGE, VIDEO, AUDIO, TEXT. Active tab uses primary underline.
2. **Given** artifacts exist, **When** the grid renders, **Then** each artifact card shows: full-bleed thumbnail preview (image/video poster/waveform/text excerpt), modality chip (colored by modality tokens), metadata overlay at bottom (artifact name in mono, dimensions/duration, producing pipeline + timestamp, file size).
3. **Given** the user hovers on a video artifact, **When** the cursor moves across the thumbnail, **Then** the video scrubs through frames based on cursor X position (canvas-based frame extraction, not video player).
4. **Given** the user clicks an artifact, **When** the inspector opens, **Then** it shows: full-size preview, provenance (workflow → run → node chain, all clickable), cache key (mono), manifest as collapsible JSON, lineage graph (upstream artifacts), and action buttons (download, compare, trace back).

### Functional Requirements (US-6):

- **FR-039**: Artifact browser: full-canvas layout with filter tabs at top and grid below.
- **FR-040**: Search bar: full-width input with search icon. Filters by artifact name, pipeline, modality, run ID.
- **FR-041**: Modality tabs: ALL | IMAGE | VIDEO | AUDIO | TEXT. Active tab: primary underline, primary text. Inactive: on-surface at 60%.
- **FR-042**: Artifact cards: surface_container_low background, 10px radius. Full-bleed preview with aspect-ratio preservation. Metadata overlay: surface_container at 90% opacity, positioned at bottom. Hover → subtle border glow in modality color.
- **FR-043**: Modality chips on cards: pill-shaped, modality color at 10% background, full color text. Position: top-left overlay on preview.
- **FR-044**: Video hover-scrub: implemented via canvas element extracting frames. Not a full video player.
- **FR-045**: Artifact detail inspector: right panel, 360px. Tabs: Preview | Provenance | Manifest. Lineage shown as mini DAG or breadcrumb chain.

---

### User Story 7 — Neural Assistant Chat Panel (Priority: P2)

The developer sees an AI assistant panel in the inspector area (or as a floating panel in Graph view). They can ask questions about their workflow, get optimization suggestions, and receive schema fix recommendations. The assistant is context-aware — it knows the current workflow, selected node, and run state.

**Why this priority**: The AI assistant is a differentiating feature that adds intelligence to the tool. Including it in the spec ensures the layout accommodates it from the start.

**Independent Test**: AI chat panel renders in the inspector area with message history, input field, and streaming response display. Context badges show what the assistant knows about.

**Acceptance Scenarios**:

1. **Given** the user is on any view, **When** the AI assistant panel is visible in the inspector, **Then** it shows: a header ("Neural Assistant" with model identifier), a scrollable message history, and a bottom input field with send button.
2. **Given** the user types a question, **When** they send it, **Then** the assistant streams a response with JetBrains Mono formatting for code/values and Inter for natural language.
3. **Given** the user is in Graph view with a node selected, **When** they ask about a validation error, **Then** the assistant receives context about the selected node (operator, config, connections, validation errors) and provides specific fix suggestions with "FIX SCHEMA" action buttons.
4. **Given** the assistant panel is in Graph view, **When** it renders, **Then** it appears as a floating glass-effect panel (glassmorphism) overlaying the inspector area, with a resize handle.

### Functional Requirements (US-7):

- **FR-046**: AI assistant panel MUST be rendered in the inspector area as a tab ("Assistant") alongside Overview, Config, I/O, Validation, Diagnostics, Provenance tabs.
- **FR-047**: In Graph view, the assistant MAY also appear as a floating glass-effect panel overlaying the canvas, dismissible via close button.
- **FR-048**: Message bubbles: user messages right-aligned with surface_container_high background. Assistant messages left-aligned with surface_container background. Code blocks in JetBrains Mono with surface_container_lowest background.
- **FR-049**: Context badges: show what the assistant knows about (e.g., "Workflow: Image Gen Pipeline", "Node: Prompt Encoder", "Run: #4521"). Badge style: surface_container_high, on-surface-variant text.
- **FR-050**: Action buttons in responses: "FIX SCHEMA", "APPLY SUGGESTION" — primary ghost button style with primary text color.
- **FR-051**: Input field: recessed style (surface_container_lowest, bottom-border only). Placeholder: "Ask about your workflow..."
- **FR-052**: Streaming responses: text appears token-by-token with a blinking cursor indicator.

---

### User Story 8 — Top Bar with Runtime Controls (Priority: P1)

The developer sees a slim top bar with the product name, workflow context breadcrumb, execution controls (Validate, Run, Pause, Cancel), runtime health badge, and profile selector.

**Why this priority**: The top bar is always visible and contains the primary execution controls.

**Independent Test**: Top bar renders with product name, run controls, health badge, and profile selector. Run button triggers workflow execution. Health badge updates in real-time.

**Acceptance Scenarios**:

1. **Given** the app loads, **When** the top bar renders, **Then** it shows: product name ("Spectral Graphite" or project name) in Space Grotesk bold with primary color, navigation breadcrumb (Validate | Run | Pause | Cancel as text links), and right-aligned runtime info.
2. **Given** no workflow is running, **When** the user clicks Run, **Then** the run executes and the top bar shows "Runtime Health: Optimal" in primary color with profile selector ("Active Profile: Development").
3. **Given** a workflow is running, **When** the user views the top bar, **Then** Run is highlighted with primary color and the health indicator pulses subtly.

### Functional Requirements (US-8):

- **FR-053**: Top bar height: 48px. Background: surface_container_low (#181c21).
- **FR-054**: Left zone: product name in Space Grotesk bold, primary color (#ba9eff). Version tag below in JetBrains Mono 9px.
- **FR-055**: Center zone: text-link style nav items (Validate, Run, Pause, Cancel) in on-surface at 60%. Hover → surface_container_high background. Active (Run during execution) → primary color.
- **FR-056**: Right zone: runtime health badge (uppercase 10px, tracking-widest, primary color), active profile label (on-surface-variant at 60%), user avatar button with primary hover.
- **FR-057**: No visible bottom border on the top bar (No-Line Rule). Separation from content via tonal shift.

---

### User Story 9 — Trace View with Execution Timeline (Priority: P2)

The developer opens Trace view to debug a run. They see a Gantt-chart execution timeline showing when each node started, its duration, and overlap with parallel nodes. Clicking a bar navigates to that node's logs, retry history, and resource usage.

**Why this priority**: Trace view is essential for debugging and understanding execution behavior. Critical for the "debugging feels native" principle.

**Independent Test**: Trace view renders with run selector, Gantt timeline, and node detail inspector.

**Acceptance Scenarios**:

1. **Given** the user opens Trace view, **When** a run is selected, **Then** the timeline renders as a horizontal Gantt chart with nodes on the Y-axis (ordered by start time) and time on X-axis (relative to run start).
2. **Given** the timeline renders, **When** bars are displayed, **Then** each bar is colored by execution state: running (primary), completed (acid-green), failed (error), cache_hit (tertiary/cyan). Bar width represents duration.
3. **Given** the user clicks a timeline bar, **When** the inspector updates, **Then** it shows: state transition log (timestamps), filtered node logs, worker assignment, peak VRAM, retry history, cache key.

### Functional Requirements (US-9):

- **FR-058**: Trace view: three-column layout. Left (pinned sidebar): run selector dropdown + node filter list. Center: Gantt timeline. Right: node detail inspector.
- **FR-059**: Timeline bars: radius 4px, colored by state tokens. Parallel nodes shown as overlapping swim lanes.
- **FR-060**: Timeline hover tooltip: node name, start time, duration, worker ID, peak VRAM. Glass-effect background.
- **FR-061**: Node filter list: searchable, each row shows node name, status dot, duration badge (mono).

---

### User Story 10 — Bottom Performance Drawer (Priority: P2)

The developer expands the bottom drawer from any workflow view. They see tabbed panels for Performance, Diagnostics, and Console. Performance shows node latency charts and global throughput. Console shows the live log stream.

**Why this priority**: The bottom drawer provides the always-available observability layer that makes debugging feel native.

**Independent Test**: Bottom drawer renders with tabs, is resizable, shows performance metrics and log stream.

**Acceptance Scenarios**:

1. **Given** the user is in any workflow view, **When** they expand the bottom drawer, **Then** it slides up with a 300ms cubic-bezier transition to one of the snap heights (160/240/400px) and shows a tab bar: PERFORMANCE | DIAGNOSTICS | CONSOLE.
2. **Given** the Performance tab is active, **When** the user views it, **Then** it shows: node latency bar chart (vertical bars per node, primary/acid-green coloring), status code listing in mono (0x00A: OK, 0x0F2: TYPE_ERR, 0x10B: IDLE), global throughput display (large number + "fps" unit with trend indicator), and a "LIVE" badge.
3. **Given** the Console tab is active, **When** logs stream in, **Then** they appear in JetBrains Mono with timestamps, severity-based coloring (info: on-surface-variant, warn: warning, error: error), and auto-scroll with a "Jump to latest" button when scrolled up.

### Functional Requirements (US-10):

- **FR-062**: Bottom drawer: spans canvas width (column 3 in grid). Resizable via drag handle. Snap points: 0 (collapsed), 160, 240, 400px.
- **FR-063**: Drag handle: centered horizontal bar (32x4px, radius full, surface_container_highest).
- **FR-064**: Tab bar: uppercase labels in JetBrains Mono 11px. Active tab: primary underline. Tab badge for problem counts.
- **FR-065**: Performance tab: node latency bar chart (one bar per node), status code listing, throughput metric (large display number), VRAM meter.
- **FR-066**: Console tab: mono log stream with severity coloring. Search within logs. Level filter toggles (INFO/WARN/ERROR). Auto-scroll with pause-on-scroll-up.

---

### Edge Cases

- What happens when the sidebar transitions from hovered to pinned while the user is dragging an operator? The drag operation MUST NOT be interrupted by sidebar state changes.
- What happens when the AI assistant is in a floating panel in Graph view and the user scrolls? The panel MUST stay fixed relative to the viewport, not the canvas.
- What happens when glassmorphism backdrop-filter is not supported? Fallback to solid surface_container_high at 95% opacity.
- What happens when the user has prefers-reduced-motion? All transitions become instant. Pulse animations become static borders. The sidebar expands immediately without animation.

---

## Requirements Summary

### Typography

- **FR-067**: Headlines MUST use Space Grotesk (300-700 weights). Tight tracking (-0.02em) for display sizes.
- **FR-068**: Body text MUST use Inter (300-700 weights). Default UI text: 13px Inter medium.
- **FR-069**: Code/data MUST use JetBrains Mono (400-500 weights). All IDs, hashes, timestamps, coordinates, log output, and user-generated values.
- **FR-070**: Category headers and sidebar labels MUST be JetBrains Mono, 11px, ALL-CAPS, tracking +0.05em.
- **FR-071**: Display headings: Space Grotesk, large sizes (2rem+), tight tracking. Used for dashboard hero and empty states only.

### Iconography

- **FR-072**: All icons MUST use Material Symbols Outlined loaded from Google Fonts CDN. Default variation settings: FILL 0, wght 400, GRAD 0, opsz 24.
- **FR-073**: Active navigation icons: FILL 1. All other icons: FILL 0.
- **FR-074**: Icon sizes: 20px for sidebar nav, 16px for inline actions, 24px for display/hero contexts.

### Component Rules

- **FR-075**: Buttons: Primary → primary background, on-primary text, dim glow on hover. Secondary → transparent, ghost border, primary text. Tertiary → tertiary_container background for destructive/manual actions.
- **FR-076**: Inputs: Recessed style — surface_container_lowest background, 1px bottom-border only (outline_variant). Focus → bottom border transitions to primary with 2px outer glow.
- **FR-077**: Cards: surface_container_low background. No border (No-Line Rule). Hover → surface_container_high. Selected → primary dim glow.
- **FR-078**: Chips/Tags: pill-shaped, surface_container_high background, 6px colored circle indicator using spectral colors. AI-related tags use secondary (#9093ff) with mesh gradient hint.
- **FR-079**: Tables: no row dividers. 4px vertical spacing between rows. Hover → surface_container_highest. Sort arrows in on-surface-variant.
- **FR-080**: Divider lines are forbidden in lists. Use spacing + typography weight hierarchy for structure.

### Motion

- **FR-081**: Sidebar expand/collapse: 300ms cubic-bezier(0.4, 0, 0.2, 1).
- **FR-082**: Surface transitions (hover, focus): 150ms ease.
- **FR-083**: Running node pulse: opacity 0.6→1.0, 2s infinite, ease-in-out.
- **FR-084**: Modal/palette entry: scale 0.95→1.0 + opacity 0→1, 250ms spring easing.
- **FR-085**: Bottom drawer snap: 300ms cubic-bezier(0.4, 0, 0.2, 1).
- **FR-086**: prefers-reduced-motion: ALL animations become instant except essential state indicators (which become static color).

### Accessibility

- **FR-087**: Text contrast MUST meet WCAG 2.2 AA: 4.5:1 for body, 3:1 for large text. On-surface (#e0e2ea) on surface (#0c0e10) = ~15:1.
- **FR-088**: Status indicators MUST combine color + icon + label. Never color alone.
- **FR-089**: All interactive elements MUST have visible focus indicators (3px primary outline, 2px offset).
- **FR-090**: Graph editor MUST provide an alternative list view for keyboard/screen-reader users.
- **FR-091**: All icon-only buttons MUST have aria-label.
- **FR-092**: Glassmorphism MUST have a solid-color fallback for unsupported browsers.

---

## Key Entities

- **SpectralToken**: Primitive color/spacing/typography/motion value (raw palette)
- **SemanticToken**: Mapped meaning referencing a primitive (e.g., surface_container_low → #111416)
- **ComponentToken**: Scoped to a component (e.g., node.header.bg → surface_container)
- **SidebarState**: collapsed | hovered | pinned
- **ViewMode**: home | recipe | stage | graph | trace | timeline | artifacts
- **AssistantContext**: Current workflow, selected node, run state, validation errors

---

## Success Criteria

- **SC-001**: All 6 views (Home, Recipe, Graph, Trace, Timeline, Artifacts) render correctly with Spectral Graphite palette.
- **SC-002**: No visible 1px solid borders between layout regions (No-Line Rule enforced).
- **SC-003**: Sidebar hover-expand and pin/unpin work smoothly with no layout jank.
- **SC-004**: TypeScript build (`tsc --noEmit`) and Vite build pass with zero errors.
- **SC-005**: Graph editor renders custom nodes with modality-colored ports and state-based styling.
- **SC-006**: Bottom drawer resizes with snap behavior and renders Performance/Diagnostics/Console tabs.
- **SC-007**: AI assistant panel renders in inspector with streaming message display.
- **SC-008**: All WCAG 2.2 AA contrast requirements met across all views.

---

## Assumptions

- Material Symbols Outlined font will be loaded via Google Fonts CDN (no self-hosting in v1).
- Space Grotesk and Inter loaded via Google Fonts CDN.
- The existing @xyflow/react 12 library supports all required custom node/edge rendering.
- The host API (Rust backend) already provides all data endpoints needed by these views.
- AI assistant backend (LLM inference) is out of scope — only the chat UI panel is specified here.
- Mobile/responsive layout is out of scope for v1. Desktop-first (1280px+ viewport).
