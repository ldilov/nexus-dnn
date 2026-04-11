# Nexus-DNN Design System Specification

**Date**: 2026-04-12
**Branch**: feature/003-design-system-ui
**Status**: Approved
**Visual Direction**: Dark-first "Technical Cinema"

---

## Design Philosophy

Developer-grade, local-first, extensible, reproducible, and progressively approachable. The UI is a projection over one canonical workflow model, with the host as the single source of truth.

**Visual language**: Dark neutral base so image/video/audio artifacts look great. Strong information hierarchy, restrained accent colors for state/selection/lineage/modality. Pro-tool density with clean spacing.

**Core principles**:
- One workflow, many views (Recipe, Stage, Graph, Trace, Timeline are lenses, not separate tools)
- Progressive disclosure (beginners start in Recipe, power users drop into Graph and Trace)
- Artifacts are first-class (preview, type, lineage, producing node, run ID, cache status)
- Debugging feels native (logs, events, timings, cache, worker health always one click away)

---

## 1. Token Architecture

Three-tier system: Primitive (raw palette) -> Semantic (mapped meaning) -> Component (scoped to use).

### 1.1 Primitive Tokens

Raw values. Never referenced directly by components.

#### Colors (navy-blue tinted scale)

```
navy.50:   #E8EEF8    navy.100:  #A8B3C7    navy.200:  #718096
navy.300:  #334155    navy.400:  #253041    navy.500:  #212C3A
navy.600:  #1B2430    navy.700:  #151C24    navy.800:  #0F141B
navy.900:  #0B0F14
```

#### Accent primitives

```
blue.400:   #5EA1FF    blue.500:   #4A8FE8    blue.600:   #3A7BD4
violet.400: #7C5CFF    violet.500: #6B4FE0    violet.600: #5A42C0
cyan.400:   #21C7D9    cyan.500:   #1AB3C4    cyan.600:   #158FA0
green.400:  #22C55E    green.500:  #1DAF52    green.600:  #189A47
amber.400:  #F5B942    amber.500:  #E0A838    amber.600:  #C9952F
red.400:    #F05D5E    red.500:    #D94F50    red.600:    #C24344
slate.400:  #94A3B8    slate.500:  #7C8B9E
```

#### Spacing (8px grid)

```
0: 0px    1: 2px    2: 4px    3: 6px    4: 8px    5: 10px
6: 12px   8: 16px   10: 20px  12: 24px  16: 32px  20: 40px  24: 48px
```

#### Radius

```
2: 2px   4: 4px   6: 6px   8: 8px   10: 10px   12: 12px
14: 14px   16: 16px   full: 9999px
```

#### Typography

```
families:     Geist (UI), JetBrains Mono (code)
sizes:        11, 12, 13, 14, 16, 18, 20, 24, 28, 32
weights:      400, 500, 600, 700
line-heights: 1.0, 1.2, 1.4, 1.5, 1.6
```

### 1.2 Semantic Tokens

Reference primitives. Carry intent. Components use these.

#### Surface hierarchy (elevation via lightness)

```
bg.app       -> navy.900  (#0B0F14)   outermost background
bg.canvas    -> navy.800  (#0F141B)   main content area
bg.panel     -> navy.700  (#151C24)   side panels, drawers
bg.elevated  -> navy.600  (#1B2430)   cards, dropdowns, modals
bg.hover     -> navy.500  (#212C3A)   hover states on surfaces
```

#### Border

```
border.subtle -> navy.400 (#253041)   panel separators
border.strong -> navy.300 (#334155)   focused/selected borders
```

#### Text

```
text.primary   -> navy.50  (#E8EEF8)  headings, labels
text.secondary -> navy.100 (#A8B3C7)  descriptions, metadata
text.muted     -> navy.200 (#718096)  placeholders, disabled
text.inverse   -> navy.900 (#0B0F14)  text on bright backgrounds
```

#### Accent roles

```
accent.primary   -> blue.400   (#5EA1FF)  selection, primary CTA, brand
accent.secondary -> violet.400 (#7C5CFF)  graph intelligence, AI features
accent.cyan      -> cyan.400   (#21C7D9)  live execution, flow, video
```

#### State colors (mapped to backend runtime states)

```
state.created   -> slate.400  (#94A3B8)  created, queued
state.planning  -> violet.400 (#7C5CFF)  planning phase
state.running   -> blue.400   (#5EA1FF)  active execution
state.cache_hit -> cyan.400   (#21C7D9)  served from cache
state.completed -> green.400  (#22C55E)  finished successfully
state.paused    -> amber.400  (#F5B942)  user-paused
state.cancelled -> slate.400  (#94A3B8)  cancelled
state.failed    -> red.400    (#F05D5E)  errored
```

#### Modality colors (data type indicators)

```
mod.image  -> #B57CFF  purple
mod.video  -> #21C7D9  cyan
mod.audio  -> #34D399  mint green
mod.text   -> #F5B942  amber
mod.model  -> #5EA1FF  blue
mod.system -> #94A3B8  slate
```

#### Typography semantic

```
font.ui          -> Geist
font.code        -> JetBrains Mono
size.caption     -> 11px
size.body-sm     -> 12px
size.body        -> 13px    default UI text
size.body-lg     -> 14px
size.heading-sm  -> 16px
size.heading     -> 20px
size.heading-lg  -> 24px
size.display     -> 32px
```

#### Spacing semantic

```
space.inset.xs   -> 4px    tight padding inside small controls
space.inset.sm   -> 6px    badge/chip padding
space.inset.md   -> 8px    button/input padding
space.inset.lg   -> 12px   card padding
space.inset.xl   -> 16px   panel padding
space.gap.xs     -> 4px    between inline elements
space.gap.sm     -> 8px    between form controls
space.gap.md     -> 12px   between card sections
space.gap.lg     -> 16px   between major sections
space.gap.xl     -> 24px   between page zones
```

#### Radius semantic

```
radius.control   -> 6px     buttons, inputs, badges
radius.card      -> 10px    cards, panels, nodes
radius.panel     -> 14px    major panels, modal
radius.container -> 16px    outer app frame
radius.full      -> 9999px  pills, avatars
```

### 1.3 Density Modes

Two modes. Compact is default. Applied via CSS class on body.

| Token                | Compact | Comfortable |
|----------------------|---------|-------------|
| size.body            | 13px    | 14px        |
| control.height.sm    | 28px    | 32px        |
| control.height.md    | 32px    | 36px        |
| control.height.lg    | 40px    | 44px        |
| space.inset.md       | 8px     | 10px        |
| space.gap.sm         | 8px     | 10px        |
| space.gap.md         | 12px    | 16px        |
| row.height           | 32px    | 40px        |
| icon.size.sm         | 14px    | 16px        |
| icon.size.md         | 16px    | 18px        |

### 1.4 Motion Tokens

Expressive motion with spring-based easing. Respects prefers-reduced-motion.

```
motion.duration.instant  -> 100ms   tooltips, focus rings
motion.duration.fast     -> 150ms   hover states, micro-interactions
motion.duration.normal   -> 250ms   panel transitions, state changes
motion.duration.slow     -> 400ms   modal open/close, view transitions
motion.duration.slower   -> 600ms   page transitions, large animations

motion.easing.default    -> cubic-bezier(0.2, 0, 0, 1)        standard ease
motion.easing.spring     -> cubic-bezier(0.34, 1.56, 0.64, 1)  overshoot
motion.easing.exit       -> cubic-bezier(0.4, 0, 1, 1)        accelerate out

motion.pulse.running     -> keyframes: opacity 0.6-1.0, 2s infinite
motion.glow.selected     -> box-shadow: 0 0 0 2px accent.primary/30%
motion.edge.flow         -> dash-offset animation, 1s linear infinite
```

prefers-reduced-motion: reduce disables all animations except instant transitions.

---

## 2. Shell Architecture

### 2.1 Layout Grid

```
+-------------------------------------------------------------+
|                      top-bar (48px)                          |
+----+---------+------------------------+---------------------+
|icon|secondary|                        |                     |
|rail| panel   |      canvas            |    inspector        |
|56px| 240px   |      fluid             |    320px            |
|    |collapsbl|                        |    collapsible      |
|    |         +------------------------+                     |
|    |         |   bottom drawer        |                     |
|    |         |   resizable            |                     |
+----+---------+------------------------+---------------------+
```

Grid definition:
- columns: [icon-rail 56px] [secondary auto] [canvas 1fr] [inspector auto]
- rows: [top-bar 48px] [main 1fr] [drawer auto]

All panels collapsible and remember state.

### 2.2 Top Bar

48px height. Three zones.

**Left**: App logo mark (24px), workspace/project name (truncated), dirty/saved dot.

**Center**: Command palette trigger (Ctrl+K), 280px max width, search bar style.

**Right**: Execution controls (Validate, Run, Pause, Cancel, Resume), runtime health badge (dot + label), active profile selector dropdown, user avatar (24px).

Run button is primary (blue). Validate is ghost. Pause/Cancel/Resume are ghost and shown conditionally.

### 2.3 Icon Rail

56px wide. bg.panel. Icons 20px centered in 40px hit targets.

Navigation items (top-aligned):

| Icon       | Label (tooltip) | Target                    |
|------------|-----------------|---------------------------|
| Home       | Home            | Dashboard view            |
| FileText   | Recipes         | Recipe browser / catalog  |
| GitBranch  | Workflows       | Workflow list & management|
| Play       | Runs            | Active/historical runs    |
| Package    | Artifacts       | Artifact browser          |
| Puzzle     | Extensions      | Extension manager         |
| Cpu        | Models          | Model & profile inventory |

Utility items (bottom-aligned, separated by divider):

| Icon        | Label    | Target       |
|-------------|----------|--------------|
| Settings    | Settings | App settings |
| HelpCircle  | Help     | Docs/support |

Active state: accent.primary fill + left 3px accent bar.
Inactive: text.muted. Hover: text.secondary + bg.hover.

### 2.4 Secondary Panel

240px default, collapsible. Content determined by active nav item AND active editor view.

- Home active: No secondary panel (dashboard is full canvas)
- Recipes active: Recipe catalog with search, categories, thumbnails
- Workflows active: Workflow list with status indicators, search, filters
- Inside workflow editor: depends on view mode
  - Recipe view: Input Configuration (source media, toggles, dropdowns, model selector)
  - Stage view: Stage list with status, timing, cache info
  - Graph view: Operator Library with search, categorized sections
  - Trace view: Run selector, node filter
  - Timeline view: Clip/chunk navigator

### 2.5 Canvas Views

Center canvas hosts 6 view modes. Within a workflow, view mode tabs:

```
[ Recipe ] [ Stage ] [ Graph ] [ Trace ] [ Timeline ]
```

Switching views preserves selection context. Each view is a lens on the same canonical workflow model.

- Dashboard (Home): Full canvas. Hero greeting, workflow grid, active runs, quick actions.
- Recipe: Guided workflow. Stacked process step cards. Preview canvas.
- Stage: Pipeline lanes. Horizontal stage cards with health/timing/artifacts.
- Graph: Full node editor (@xyflow/react). Custom nodes, typed ports, minimap.
- Trace: Per-node execution timeline. Gantt chart. State transitions, logs, metrics.
- Timeline: Temporal view for video/audio. Clip/chunk tracks, resume points.

### 2.6 Inspector Panel

320px, collapsible. Tabs at top:

- Overview: Recipe/workflow summary, model, estimated time, GPU memory, format
- Config: Full configuration, environment variables, runtime overrides
- I/O: Selected node inputs/outputs with type badges
- Validation: Results, warnings, connection issues
- Diagnostics: Selected node logs, timings, retry history, cache status
- Provenance: Artifact lineage, producing node, run ID, cache key

Empty state (nothing selected): workflow-level summary.

### 2.7 Bottom Drawer

Full-width below canvas. Resizable via drag handle. Collapsible.

Tab bar:
```
Terminal Logs | Events | Problems (3) | Workers | Protocol | Performance
```

Snap points: collapsed (0px), compact (160px), default (240px), expanded (400px).
Spring animation between snaps.

- Terminal Logs: Timestamped, filterable, mono font. Severity coloring.
- Events: Structured event stream, filterable by type.
- Problems: Aggregated warnings/errors with source links.
- Workers: Activity table (name, status, current task, resource usage).
- Protocol: Raw JSON-RPC messages.
- Performance: Node latency bar chart, execution timeline, peak VRAM.

---

## 3. Component Library

### 3.1 Primitives

#### Button
- Variants: primary (blue fill), secondary (border), ghost (no border), danger (red), success (green)
- Sizes: sm (28/32px), md (32/36px), lg (40/44px) per density
- States: default, hover, active, disabled, loading (spinner replaces icon)
- Icon-only with radius.full. Group variant for connected sets.

#### Input
- Variants: default, ghost (borderless inline editing)
- Sizes: sm, md, lg
- States: default, focused (accent border + glow), error (red border), disabled
- Addons: left/right icon, prefix/suffix text, clear button
- Mono variant for code/hash/ID inputs

#### Select / Dropdown
- Same sizing as Input. Searchable variant. Grouped options. Multi-select with chips.

#### Toggle
- Track: 36x20px (compact), 40x22px (comfortable)
- Active: accent.primary fill, white knob. Inactive: bg.hover, muted knob.
- Spring animation on toggle.

#### Checkbox / Radio
- 16px (compact), 18px (comfortable). Checked: accent.primary fill. Indeterminate for checkbox.

#### Slider
- 4px track, accent.primary fill, 14px thumb with glow on drag.
- Tooltip on hover/drag. Range variant with two thumbs.

#### TextArea
- Same border/focus as Input. Auto-resize. Line numbers option. Mono variant.

### 3.2 Display Components

#### Badge / Chip
- By intent: neutral, info, success, warning, error
- By modality: image, video, audio, text, model, system (modality colors)
- Sizes: sm (20px), md (24px). Pill shape. Optional dot, dismiss button.

#### Status Indicator
- 8px dot + label. Colors map to state.* tokens. Pulse for running.

#### Progress Bar
- Heights: thin (2px), default (4px), thick (8px)
- Determinate with percentage label. Indeterminate shimmer.
- Segmented variant for multi-stage progress.

#### Meter / Gauge
- Horizontal bar for resource usage. Fill color transitions green/amber/red by threshold.
- Label left, value right. Optional threshold marker.

#### Tooltip
- bg.elevated, radius.control. Arrow. 400ms show delay. Max 280px. Mono variant.

#### Avatar
- Sizes: xs (20px), sm (24px), md (32px), lg (40px). Circle. Initials fallback.

### 3.3 Layout Components

#### Card
- bg.elevated, radius.card, border.subtle
- Optional header/footer. Hover: border.strong + 1px lift.
- Selected: accent.primary border + glow.
- Variants: default, interactive, outlined.

#### Panel
- bg.panel, collapsible with animation. Header with title, chevron, actions.
- Resizable variant with drag handle.

#### Divider
- Horizontal/vertical. Colors: subtle, strong. Optional centered label.

#### Tabs
- Variants: underline, segmented (pill backgrounds), pills
- Active: accent.primary indicator. Badge counts. Overflow handling.

#### Table
- Dark minimal, no heavy gridlines. Row hover: bg.hover.
- Row selection: accent.primary/10% bg + left bar.
- Sortable columns. Fixed header. Status dot and mono column types.

#### Drawer (Bottom)
- bg.panel, top border.strong. Drag handle (32x4px centered bar).
- Snap points: 0/160/240/400px. Spring animation.

#### Modal / Dialog
- bg.elevated, radius.panel. Backdrop black/60%.
- Sizes: sm (400px), md (560px), lg (720px), full.
- Entry: scale 0.95->1.0 + opacity spring. Exit: opacity fast.

#### Command Palette
- Centered overlay, 560px. Search input auto-focused.
- Keyboard navigation. Section groups. Shortcut hints.

### 3.4 Navigation Components

#### Icon Rail Item
- 40x40px hit target in 56px rail. 20px icon.
- Active: accent.primary + left 3px bar. Hover: bg.hover + text.secondary.

#### Breadcrumb
- / separator. Current non-interactive. Ancestors clickable. Middle truncation.

#### Segmented Control
- View mode switching. bg.panel container. Active: bg.elevated.
- Sliding indicator spring animation.

### 3.5 Feedback Components

#### Toast / Notification
- Bottom-right, stacks up. Variants: info, success, warning, error.
- Auto-dismiss 5s. Entry: slide up + spring. Exit: slide right + fast.

#### Inline Alert
- Full-width banner. Left 4px accent bar. Icon + message + action link.

#### Skeleton Loader
- Matches component shape. Shimmer gradient sweep 1.5s infinite.

#### Empty State
- Centered. Muted icon (48px), heading, description, action button.

---

## 4. Graph Editor Components

### 4.1 Custom Node Anatomy

```
+--------------------------------------+
| * [Icon] Operator Name           :   |  header (28px)
+--------------------------------------+
|                                      |
|  o input_1 (image)    output_1 o     |  port row
|  o input_2 (text)     output_2 o     |  port row
|                                      |
|  +------------------------------+    |
|  |   inline preview / config    |    |  body (optional)
|  +------------------------------+    |
|                                      |
|  T 2.4s          cache check  FP16   |  footer badges
+--------------------------------------+
```

Header (28px): status dot + category icon + operator name + kebab menu (on hover).
Background uses operator category color at 8% opacity.

Ports: 10px circles on edges. Filled = connected (modality color). Hollow = unconnected.
Labels: size.caption, text.secondary. Type tooltip on hover.
Compatible ports glow when dragging. Incompatible dim to 30%.

Body (optional): thumbnail preview for image ops, inline params for config-heavy ops.

Footer (20px, optional): execution time, cache indicator, precision badge, VRAM badge.

Node sizing: 180px min, 320px max width. Auto height. User-resizable.

### 4.2 Node Visual States

| State      | Border                    | Effect                            |
|------------|---------------------------|-----------------------------------|
| Default    | border.subtle             | none                              |
| Hovered    | border.strong             | none                              |
| Selected   | accent.primary 2px        | soft glow                         |
| Running    | accent.primary 2px        | border pulse animation            |
| Completed  | state.completed 2px       | brief green flash, fades after 3s |
| Failed     | state.failed 2px          | persists until acknowledged       |
| Cache hit  | accent.cyan 2px dashed    | brief cyan flash                  |
| Disabled   | border.subtle, 50% opacity| all content dimmed                |

### 4.3 Edges

Bezier curves. 2px stroke. Color from source port modality at 40% opacity.

| State         | Stroke                   | Animation                       |
|---------------|--------------------------|----------------------------------|
| Default       | modality/40%             | subtle dash flow                 |
| Hovered       | modality/80%, 3px        | faster dash flow                 |
| Selected      | modality/100%, 3px       | glow                             |
| Data flowing  | modality/100%, 3px       | bright pulse along path          |
| Invalid       | state.failed/60%, dashed | static                           |
| Dragging      | accent.primary/60%       | follows cursor with snap preview |

### 4.4 Ports and Type System

Shape encodes behavior, color encodes modality:

| Shape    | Meaning                    |
|----------|----------------------------|
| Circle   | Single value               |
| Diamond  | Optional (may be null)     |
| Square   | Collection/batch           |

Connection validation during drag: compatible ports glow, incompatible dim.
Magnetic snap zone: 24px radius on closest compatible port.

### 4.5 Operator Library Panel

Secondary panel in Graph view. Search input at top with fuzzy matching.

Category sections (collapsible, uppercase):
- INPUT / OUTPUT: Video Loader, Image Loader, Artifact Exporter, Preview Display
- PROCESSING: Prompt Encoder, Latent Upscaler, Frame Splitter, Color Correction
- GENERATION: Text-to-Image, Image-to-Image, Inpainting
- UTILITY: Switch/Router, Loop Controller, Value Mapper

Drag to canvas to create node. Double-click canvas opens same search at cursor.
Right-click canvas also opens operator search at cursor (unified pattern).

### 4.6 Minimap

React Flow MiniMap with custom styling. Bottom-right, 160x120px.
bg.panel/80% backdrop-blur. Node colors from nodeColor callback mapped to state tokens.
Viewport indicator: accent.primary/30%. Interactive (pannable + zoomable). Collapsible.

### 4.7 Canvas Controls

Zoom in/out/fit/lock buttons (ghost, vertical stack, bottom-right above minimap).

Pan: middle mouse or Space+left drag. Zoom: scroll wheel or pinch.
Select: left click. Multi: Shift+click or marquee drag.
Quick add: double-click canvas. Delete: Backspace/Delete.
Auto-layout: Ctrl+Shift+L, uses dagre, spring animation to positions.

### 4.8 Subgraph / Group

Frame group (visual only): dashed border, user color at 5% fill, label top-left.
Created via select -> right-click -> "Group into Frame".

Subgraph (logical): collapsed = single node with aggregated ports.
Expanded = inline or navigation via breadcrumb (Root / Stage 1 / Subgraph A).
Created via select -> right-click -> "Create Subgraph".

### 4.9 Graph Accessibility

Nodes and edges focusable via Tab. Arrow keys move selected. Enter/Space to select.
Focus ring: 3px solid accent.primary, 2px offset.
aria-label on every node: "{name} node, {n} inputs, {m} outputs, status: {state}".
Alternative list view: accessible table (Node, Inputs From, Outputs To, Status, Parameters).
Toggle via Ctrl+Shift+A or View menu.

---

## 5. View-Specific Patterns

### 5.1 Dashboard (Home)

Full canvas, no secondary panel.

Hero section: greeting (heading-lg), status line (body, text.secondary), two CTA buttons.

Workflow cards (2x2 grid): Card interactive variant. Workflow ID badge (mono), kebab menu,
title (body-lg), last run timestamp, thin progress bar. "New Canvas" card: dashed, + icon.

Active Runs table: compact rows. Columns: Process (mono), Status (dot + label),
Worker (mono), Runtime (mono). Row click navigates to run.

Runtime Health sidebar (right, 280px): Meter components for CPU/VRAM. Cache stats.
Worker sparkline. Update announcement card.

### 5.2 Recipe View

Secondary panel (Input Configuration) + Canvas (Steps + Preview) + Inspector (Summary).

Input Configuration panel:
- Source media card: circular thumbnail, format labels, file picker
- Toggle cards: title + helper text + toggle (Temporal Denoising, Face Enhancement)
- Dropdown cards: label + select (Upscale Factor: "4x 8K Ready")
- Segmented control: Model Architecture (ESRGAN-V2 | SWIN-IR)
- Advanced section: collapsed by default, chevron toggle, "customized" badge
- Escape hatch: "Open Advanced Graph ->" ghost button

Process step cards (center): vertically stacked, connected by progression line/dots.
Each card: step number + title, description, right-side badges (Auto-Scaled, FP16, Tiling On).
Running: progression dot pulses. Completed: dot turns green + checkmark.

Preview canvas (below steps): 16:9 aspect. "Waiting for input stream..." empty state.
Live preview during execution. Overlay controls: fullscreen, snapshot.

Recipe constraint indicator: amber alert when workflow customized beyond recipe.

### 5.3 Stage View

Secondary panel (Stage List) + Canvas (Stage Detail) + Inspector.

Stage list: vertical cards ordered by pipeline. Status dot + timing + cache summary + thumbnail.

Stage detail: header with status/timing, horizontal lane of nodes within stage,
artifacts produced as thumbnail grid. "Retry from this stage" action.

### 5.4 Trace View

Secondary panel (Run Selector + Node Filter) + Canvas (Execution Timeline) + Inspector.

Run selector: dropdown with metadata (ID mono, time, duration, status).
Node filter: searchable list with status dots and durations.

Execution timeline (Gantt chart):
- Y-axis: nodes by execution start. X-axis: time relative to run start.
- Bars colored by state. Parallel nodes as overlapping swimlanes.
- Hover: tooltip (start, duration, worker, peak VRAM). Click: selects, inspector shows detail.

Node detail in inspector: state transitions, filtered logs, worker assignment,
resource usage, retry history, cache status, input/output previews.

### 5.5 Timeline View

Secondary panel (Clip Navigator) + Canvas (Timeline Tracks) + Inspector.

Clip navigator: list with thumbnails, duration, format, status per clip.

Timeline tracks: horizontal scrolling, time ruler at top. Track lanes per stage.
Chunk segments colored by state. Overlap/blend boundaries as gradients.
Resume point markers. Draggable playhead for preview scrubbing.

### 5.6 Artifact Browser

Secondary panel (Filters) + Canvas (Artifact Grid/List) + Inspector (Detail).

Filters: modality checkboxes, status, date range, workflow/run dropdowns, search, sort.

Artifact grid: responsive card grid. Toggle grid/list view.

ArtifactCard: modality preview, dot + name, type + dimensions, provenance, size + age.
Hover: overlay action buttons. Video hover: frame scrub. Audio hover: waveform preview.

Artifact detail inspector: large preview, provenance (workflow/run/node links), cache key,
manifest JSON, lineage DAG/list, actions (download, delete, compare, trace).

Artifact preview by modality:
- Image: scaled thumbnail -> hover zoom 1:1 -> detail pan/zoom
- Video: poster frame -> hover scrub -> embedded player
- Audio: waveform thumbnail -> hover play -> full waveform with playback
- Text: first 3 lines -> hover expand -> full with syntax highlighting
- Model: icon + size -> architecture tooltip -> metadata table
- System: file icon -> filename tooltip -> raw/hex preview

### 5.7 Extension Manager

Secondary panel (Extension List) + Canvas (Detail) + Inspector (Capabilities).

Extension list: icon, name, publisher, version, status (enabled/disabled/incompatible/error), toggle.

Detail: header, description, provided operators, recipes, UI contributions, runtime family.

Capabilities inspector: permissions, GPU requirements, platform, dependencies.

### 5.8 Models & Profiles

Model inventory table: name, family, size, format, location, status.
Profile management: hardware profiles, GPU config, precision, warm worker settings.

---

## 6. Interaction Rules

### 6.1 Selection
- accent.primary 2px border + soft glow, never neon fills
- Single source of selection across panels (except Shift multi-select)
- Persists across view switches where contextually meaningful

### 6.2 Hover
- 150ms transitions. bg.hover background, never brightness explosion.
- No hover effects on touch (@media (hover: hover)).

### 6.3 Running State
- Subtle pulse: opacity 0.6-1.0, 2s. Not Christmas tree.
- Running edges: traveling pulse. One intensity level only.

### 6.4 Graph Edges
- Default muted at 40%. Brighten only on hover/selection/trace. Never all bright.

### 6.5 Invalid State
- Always shows reason, not just red. Tooltip with specific message.

### 6.6 Preview-First
- Show preview before metadata. Progressive image loading.

### 6.7 Drag and Drop
- Library -> canvas: creates node. Artifact -> port: attaches.
- Ghost at 60% opacity. Drop targets pulse accent border.
- Invalid: not-allowed cursor, spring snap back.

### 6.8 Context Menus
- Node: Edit, Duplicate, Disable, Delete, Group, View Logs
- Edge: Delete, Inspect Type
- Canvas: operator search at cursor
- Stage: Retry, View as Graph, Inspect
- All support keyboard navigation.

### 6.9 Undo/Redo
- All graph mutations undoable. Ctrl+Z / Ctrl+Shift+Z.
- Per-session stack. Toast with "Redo" link.

---

## 7. Keyboard Shortcuts

### Global

| Shortcut         | Action                  |
|------------------|-------------------------|
| Ctrl+K           | Command palette         |
| Ctrl+S           | Save workflow           |
| Ctrl+Shift+P     | Run/execute workflow    |
| Ctrl+.           | Validate workflow       |
| Ctrl+,           | Open settings           |
| Ctrl+\           | Toggle inspector        |
| Ctrl+J           | Toggle bottom drawer    |
| Ctrl+B           | Toggle secondary panel  |
| Ctrl+1-7         | Switch nav items        |
| ?                | Shortcut cheat sheet    |
| Escape           | Close/deselect          |

### Graph Editor

| Shortcut          | Action                       |
|-------------------|------------------------------|
| Space+drag        | Pan canvas                   |
| Ctrl+= / Ctrl+-   | Zoom in/out                  |
| Ctrl+0            | Fit view                     |
| Ctrl+Shift+L      | Auto-layout                  |
| Ctrl+L            | Lock/unlock layout           |
| Tab               | Cycle focus through nodes    |
| Delete/Backspace  | Delete selected              |
| Ctrl+C / Ctrl+V   | Copy/paste                   |
| Ctrl+D            | Duplicate selected           |
| Ctrl+G            | Group into frame             |
| Ctrl+Shift+G      | Create subgraph              |
| Ctrl+A            | Select all                   |
| Double-click      | Open operator search         |
| N                 | Quick add node               |
| F                 | Focus on selected            |

### View Switching

| Shortcut | View     |
|----------|----------|
| Alt+1    | Recipe   |
| Alt+2    | Stage    |
| Alt+3    | Graph    |
| Alt+4    | Trace    |
| Alt+5    | Timeline |

### Bottom Drawer Tabs

| Shortcut       | Tab         |
|----------------|-------------|
| Ctrl+Shift+1   | Logs        |
| Ctrl+Shift+2   | Events      |
| Ctrl+Shift+3   | Problems    |
| Ctrl+Shift+4   | Workers     |
| Ctrl+Shift+5   | Protocol    |
| Ctrl+Shift+6   | Performance |

---

## 8. Accessibility

### Contrast
- WCAG 2.2 AA: 4.5:1 body text, 3:1 large text (18px+)
- Target 7:1 to 15:1. Avoid max 21:1 (halation).
- Support prefers-contrast: more (10:1+ text, enlarged focus rings).
- Verified: text.primary on bg.panel = ~11.5:1. text.secondary on bg.panel = ~6.8:1.

### Color Independence
- Every status: icon + label + color. Never color alone.
- Graph ports: shape = behavior, color = modality.
- Edges: dash pattern distinguishes types alongside color.
- Modality badges always include text label.

### Focus Management
- 3px solid accent.primary focus ring, 2px offset. Never removed.
- Focus order follows visual reading order.
- Focus trap in modals. Return focus on close. Skip-to-content link.

### Screen Readers
- Icon-only buttons: aria-label.
- State changes: aria-live="polite". Critical errors: aria-live="assertive".
- Graph nodes: aria-label="{name} node, {n} inputs, {m} outputs, status: {state}"
- Alternative graph list view: table with Node, Inputs From, Outputs To, Status, Parameters.
- Toggle: Ctrl+Shift+A or View menu.

### Motion
- prefers-reduced-motion: reduce replaces all animations with instant changes.
- Running pulse -> static blue border. Edge flow -> static line. Springs -> instant.

### Touch/Pointer
- Minimum: 44x44px mobile, 32x32px desktop. No hover-only functionality.

### Zoom
- Functional to 200% browser zoom. Panels reflow/collapse gracefully.

---

## 9. Extension Theming Boundaries

Extensions must use host semantic tokens via --nx-* CSS custom properties.

Namespace: --nx-color-bg-app, --nx-color-text-primary, --nx-color-accent-primary,
--nx-color-state-running, --nx-color-mod-image, --nx-space-inset-md,
--nx-radius-card, --nx-font-ui, --nx-font-code, etc.

Rules:
- Extensions MUST use semantic tokens, not hardcoded colors
- Extension panels inherit density mode automatically
- Extension-specific accents declared in manifest, mapped to --nx-ext-accent
- Host validates contrast compliance at registration
- Extensions cannot override host shell styles

---

## Technology Stack

- Token system: vanilla-extract (createThemeContract + createTheme)
- Primitives: tokens/primitives.css.ts (createGlobalTheme)
- Semantic: tokens/theme.css.ts (contract + dark theme)
- Components: @vanilla-extract/recipes for multi-variant components
- Atomic utilities: @vanilla-extract/sprinkles (small property set)
- Graph: @xyflow/react 12.x with colorMode="dark", base.css import, --xy-* overrides
- Layout: dagre for auto-layout
- Fonts: Geist (UI), JetBrains Mono (code)
- Color space: OKLCH for perceptual uniformity in token generation
