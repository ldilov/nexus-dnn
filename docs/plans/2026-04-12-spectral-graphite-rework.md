# Spectral Graphite Frontend Rework Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Pivot the existing frontend from blue accent + border-based separation to the Spectral Graphite visual system — violet primary, No-Line Rule (tonal depth instead of borders), glassmorphism on floating elements, Space Grotesk headlines, and hybrid expandable sidebar.

**Architecture:** The existing three-tier token system (primitives → contract → dark theme) stays intact. Primitive color values are swapped (blue → violet, surface colors → deeper graphite). All 21 border declarations across .css.ts files are removed and replaced with tonal surface shifts or subtle shadows. The shell sidebar component gains hover-expand + pin behavior. Typography adds Space Grotesk for headlines alongside Inter for body.

**Tech Stack:** React 19, TypeScript 5.7, vanilla-extract (css + recipes), @xyflow/react 12, Space Grotesk + Inter + JetBrains Mono (Google Fonts), Material Symbols Outlined

**Spec Reference:** `specs/003-frontend-rework/spec.md` (FR-001 through FR-092)
**Design Reference:** `specs/003-frontend-rework/reference/SPECTRAL_GRAPHITE_DESIGN.md`

---

## Phase 1: Token Migration — Spectral Palette

### Task 1: Update primitive color palette

**Files:**
- Modify: `apps/web/src/tokens/primitives.ts`

**Step 1: Replace color primitives with Spectral Graphite palette**

The primary change: blue accent becomes violet. Surface colors shift to deeper graphite. Add new spectral accent colors.

Replace the entire `color` object:

```typescript
export const color = {
  surface: {
    base: "#0c0e10",
    containerLowest: "#000000",
    containerLow: "#111416",
    container: "#1c2025",
    containerHigh: "#262a30",
    containerHighest: "#31353b",
    bright: "#36393f",
    variant: "#31353b",
  },
  onSurface: {
    base: "#e0e2ea",
    variant: "#c1c6d4",
  },
  primary: {
    base: "#ba9eff",
    dim: "#8455ef",
    container: "#6a3de8",
    onPrimary: "#1c0062",
  },
  secondary: {
    base: "#9093ff",
    container: "#4816cb",
    onSecondary: "#1c0062",
  },
  tertiary: {
    base: "#ff8439",
    container: "#5a3200",
  },
  acidGreen: "#22C55E",
  error: {
    base: "#ff6e84",
    container: "#93000a",
  },
  warning: {
    base: "#F5B942",
    text: "#fef3c7",
  },
  outline: {
    base: "#8b919d",
    variant: "#414752",
  },
  modality: {
    image: "#B57CFF",
    video: "#21C7D9",
    audio: "#34D399",
    text: "#F5B942",
    model: "#ba9eff",
    system: "#94A3B8",
  },
} as const;
```

**Step 2: Update typography to add Space Grotesk**

Replace the `typography.family` section:

```typescript
family: {
  headline: "'Space Grotesk', system-ui, sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
  code: "'JetBrains Mono', 'Fira Code', monospace",
},
```

**Step 3: Verify build**

Run: `cd apps/web && npx tsc --noEmit`
Expected: FAIL — dark.css.ts references old color paths (color.navy, color.blue, etc.). Expected.

**Step 4: Commit**

```bash
git add apps/web/src/tokens/primitives.ts
git commit -m "feat(tokens): replace palette with Spectral Graphite colors and Space Grotesk"
```

---

### Task 2: Expand contract for Spectral Graphite token structure

**Files:**
- Modify: `apps/web/src/theme/contract.css.ts`

**Step 1: Replace the contract**

The contract needs new slots for the spectral color system. Key changes: `color.bg` becomes surface-tier based, accent becomes `primary`/`secondary`/`tertiary`, add `outline` tokens, add `font.headline`.

```typescript
import { createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
  color: {
    bg: {
      app: "",
      canvas: "",
      panel: "",
      elevated: "",
      hover: "",
      lowest: "",
      bright: "",
    },
    text: {
      primary: "",
      secondary: "",
      muted: "",
      inverse: "",
    },
    accent: {
      primary: "",
      primaryDim: "",
      primaryHover: "",
      secondary: "",
      tertiary: "",
      cyan: "",
    },
    state: {
      created: "",
      planning: "",
      running: "",
      cacheHit: "",
      completed: "",
      paused: "",
      cancelled: "",
      failed: "",
    },
    mod: {
      image: "",
      video: "",
      audio: "",
      text: "",
      model: "",
      system: "",
    },
    success: { base: "", text: "" },
    warning: { base: "", text: "" },
    error: { base: "", text: "" },
    outline: {
      base: "",
      variant: "",
    },
  },
  font: {
    headline: "",
    ui: "",
    code: "",
    size: {
      caption: "",
      bodySm: "",
      body: "",
      bodyLg: "",
      headingSm: "",
      heading: "",
      headingLg: "",
      display: "",
    },
    weight: {
      regular: "",
      medium: "",
      semibold: "",
      bold: "",
    },
    lineHeight: {
      tight: "",
      normal: "",
      relaxed: "",
    },
  },
  space: {
    insetXs: "",
    insetSm: "",
    insetMd: "",
    insetLg: "",
    insetXl: "",
    gapXs: "",
    gapSm: "",
    gapMd: "",
    gapLg: "",
    gapXl: "",
  },
  radius: {
    control: "",
    card: "",
    panel: "",
    container: "",
    full: "",
  },
  control: {
    heightSm: "",
    heightMd: "",
    heightLg: "",
  },
  icon: {
    sm: "",
    md: "",
    lg: "",
  },
  motion: {
    durationInstant: "",
    durationFast: "",
    durationNormal: "",
    durationSlow: "",
    durationSlower: "",
    easingDefault: "",
    easingSpring: "",
    easingExit: "",
  },
  shadow: {
    sm: "",
    md: "",
    lg: "",
  },
  z: {
    base: "",
    dropdown: "",
    drawer: "",
    modal: "",
    toast: "",
    overlay: "",
  },
});
```

Key additions vs current contract:
- `color.bg.lowest` and `color.bg.bright` (new surface tiers)
- `color.accent.primaryDim` and `color.accent.tertiary` (spectral accents)
- `color.outline.base` and `color.outline.variant` (replaces `color.border.*`)
- `font.headline` (Space Grotesk slot)
- Removed: `color.border.subtle`, `color.border.strong` (replaced by `color.outline.*`)

**Step 2: Commit**

```bash
git add apps/web/src/theme/contract.css.ts
git commit -m "feat(tokens): expand contract for spectral graphite surface tiers and outline tokens"
```

---

### Task 3: Rewrite dark theme with Spectral Graphite mappings

**Files:**
- Modify: `apps/web/src/theme/dark.css.ts`

**Step 1: Replace entire dark theme**

Map the new spectral primitives to the expanded contract:

```typescript
import { createTheme } from "@vanilla-extract/css";
import { vars } from "./contract.css";
import { color, spacing, radii, typography, motion } from "../tokens/primitives";

export const darkTheme = createTheme(vars, {
  color: {
    bg: {
      app: color.surface.base,
      canvas: color.surface.base,
      panel: color.surface.containerLow,
      elevated: color.surface.containerHigh,
      hover: color.surface.containerHighest,
      lowest: color.surface.containerLowest,
      bright: color.surface.bright,
    },
    text: {
      primary: color.onSurface.base,
      secondary: color.onSurface.variant,
      muted: color.outline.base,
      inverse: color.primary.onPrimary,
    },
    accent: {
      primary: color.primary.base,
      primaryDim: color.primary.dim,
      primaryHover: color.primary.container,
      secondary: color.secondary.base,
      tertiary: color.tertiary.base,
      cyan: "#21C7D9",
    },
    state: {
      created: color.outline.base,
      planning: color.primary.base,
      running: color.primary.base,
      cacheHit: "#21C7D9",
      completed: color.acidGreen,
      paused: color.warning.base,
      cancelled: color.outline.base,
      failed: color.error.base,
    },
    mod: {
      image: color.modality.image,
      video: color.modality.video,
      audio: color.modality.audio,
      text: color.modality.text,
      model: color.modality.model,
      system: color.modality.system,
    },
    success: { base: color.acidGreen, text: "#bbf7d0" },
    warning: { base: color.warning.base, text: color.warning.text },
    error: { base: color.error.base, text: "#fecaca" },
    outline: {
      base: color.outline.base,
      variant: color.outline.variant,
    },
  },
  font: {
    headline: typography.family.headline,
    ui: typography.family.body,
    code: typography.family.code,
    size: {
      caption: typography.size[11],
      bodySm: typography.size[12],
      body: typography.size[13],
      bodyLg: typography.size[14],
      headingSm: typography.size[16],
      heading: typography.size[20],
      headingLg: typography.size[24],
      display: typography.size[32],
    },
    weight: {
      regular: typography.weight[400],
      medium: typography.weight[500],
      semibold: typography.weight[600],
      bold: typography.weight[700],
    },
    lineHeight: {
      tight: typography.lineHeight[1.2],
      normal: typography.lineHeight[1.5],
      relaxed: typography.lineHeight[1.6],
    },
  },
  space: {
    insetXs: spacing[2],
    insetSm: spacing[3],
    insetMd: spacing[4],
    insetLg: spacing[6],
    insetXl: spacing[8],
    gapXs: spacing[2],
    gapSm: spacing[4],
    gapMd: spacing[6],
    gapLg: spacing[8],
    gapXl: spacing[12],
  },
  radius: {
    control: radii[6],
    card: radii[10],
    panel: radii[14],
    container: radii[16],
    full: radii.full,
  },
  control: {
    heightSm: "28px",
    heightMd: "32px",
    heightLg: "40px",
  },
  icon: {
    sm: "14px",
    md: "16px",
    lg: "20px",
  },
  motion: {
    durationInstant: motion.duration.instant,
    durationFast: motion.duration.fast,
    durationNormal: motion.duration.normal,
    durationSlow: motion.duration.slow,
    durationSlower: motion.duration.slower,
    easingDefault: motion.easing.default,
    easingSpring: motion.easing.spring,
    easingExit: motion.easing.exit,
  },
  shadow: {
    sm: "0 2px 4px rgba(0,0,0,0.3)",
    md: "0 4px 12px rgba(0,0,0,0.4)",
    lg: "0 12px 32px rgba(0,0,0,0.4)",
  },
  z: {
    base: "0",
    dropdown: "100",
    drawer: "200",
    modal: "300",
    toast: "400",
    overlay: "500",
  },
});
```

**Step 2: Commit**

```bash
git add apps/web/src/theme/dark.css.ts
git commit -m "feat(tokens): map spectral graphite palette to semantic tokens"
```

---

### Task 4: Update global styles for spectral typography and focus

**Files:**
- Modify: `apps/web/src/theme/global.css.ts`

**Step 1: Update global styles**

Add Space Grotesk to the headline rendering, update selection to use primaryDim, keep focus ring:

```typescript
import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./contract.css";

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
});

globalStyle("html, body, #root", {
  height: "100%",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  color: vars.color.text.primary,
  backgroundColor: vars.color.bg.app,
  lineHeight: vars.font.lineHeight.normal,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});

globalStyle("a", {
  color: vars.color.accent.primary,
  textDecoration: "none",
});

globalStyle("a:hover", {
  color: vars.color.accent.primaryHover,
});

globalStyle(":focus-visible", {
  outline: `3px solid ${vars.color.accent.primary}`,
  outlineOffset: "2px",
});

globalStyle("::selection", {
  backgroundColor: vars.color.accent.primaryDim,
  color: vars.color.text.primary,
});
```

**Step 2: Commit**

```bash
git add apps/web/src/theme/global.css.ts
git commit -m "feat(tokens): update global styles for spectral typography and primaryDim selection"
```

---

## Phase 2: No-Line Rule — Remove All Borders

### Task 5: Remove borders from shell layout

**Files:**
- Modify: `apps/web/src/layout/shell.css.ts`

**Step 1: Remove all 5 border declarations**

For every border declaration in this file, REMOVE the `border*` property entirely. The No-Line Rule means layout regions are separated by tonal shift (different `bg.*` values), not borders.

Specifically remove:
- `topBar`: remove `borderBottom`
- `iconRail`: remove `borderRight` (the `bg.panel` vs `bg.app` tonal shift provides separation)
- `secondaryPanel`: remove `borderRight`
- `inspector`: remove `borderLeft`
- `bottomDrawer`: replace `borderTop: 1px solid ...` with `borderTop: "none"`. The drawer uses `bg.panel` against the canvas `bg.app`, providing natural tonal separation.

Also update `secondaryPanelCollapsed` and `inspectorCollapsed` — remove `borderRight: "none"` and `borderLeft: "none"` since there are no borders to remove.
For `bottomDrawerCollapsed`, remove `borderTop: "none"`.

**Step 2: Verify no regressions**

Run: `cd apps/web && npx tsc --noEmit`
Expected: May still fail from other files. That's OK.

**Step 3: Commit**

```bash
git add apps/web/src/layout/shell.css.ts
git commit -m "refactor: remove shell borders — No-Line Rule (tonal separation)"
```

---

### Task 6: Remove borders from all components and views

**Files (batch edit):**
- Modify: `apps/web/src/layout/top_bar.css.ts` — remove `border` from commandTrigger, `borderColor` from hover
- Modify: `apps/web/src/layout/left_rail.css.ts` — remove `borderBottom` from tabStrip, `borderBottom` + `borderBottomColor` from tab styles
- Modify: `apps/web/src/components/button.css.ts` — remove `border` from secondary variant, `borderColor` from hover
- Modify: `apps/web/src/components/input.css.ts` — remove `border` from base, change focus to bottom-border-only style per spectral spec (recessed input: `borderBottom: 1px solid ${vars.color.outline.variant}`, focus → `borderBottomColor: vars.color.accent.primary`)
- Modify: `apps/web/src/components/card.css.ts` — remove `border` from base, `borderColor` from hover and selected. Selected uses shadow glow instead: `boxShadow: 0 0 12px 0 ${vars.color.accent.primaryDim}44`
- Modify: `apps/web/src/components/tabs.css.ts` — remove `borderBottom` from underline variant. Active underline: use `boxShadow: inset 0 -2px 0 0 ${vars.color.accent.primary}` instead of borderBottom
- Modify: `apps/web/src/app.css.ts` — remove `borderBottom` from canvasTabBar
- Modify: `apps/web/src/views/stage_view.css.ts` — remove `borderBottom` from stageHeader, `border` from nodeCard, `borderColor` from nodeCardSelected
- Modify: `apps/web/src/views/graph_view.css.ts` — remove `border` from graphNode
- Modify: `apps/web/src/views/run_trace_view.css.ts` — remove `border` from eventRow (if present)
- Modify: `apps/web/src/views/artifact_browser.css.ts` — remove all `border` declarations
- Modify: `apps/web/src/catalog/catalog.css.ts` — remove all `border` declarations

For every file: search for any string containing `border` (borderBottom, borderRight, borderLeft, borderTop, borderColor, border:) that references `vars.color.border.*` or `vars.color.outline.*` and REMOVE IT, UNLESS it is:
- A `boxShadow` (keep these)
- The input focus bottom-border (keep per spectral recessed input spec)
- The icon rail active indicator left bar (keep the `::before` pseudo-element 3px bar)

Also update all remaining references from `vars.color.border.subtle` → `vars.color.outline.variant` and `vars.color.border.strong` → `vars.color.outline.base` since the contract renamed these.

**Step 2: Verify build**

Run: `cd apps/web && npx tsc --noEmit`
Expected: Should get closer to passing. May still fail on `vars.color.border.*` references if any missed.

**Step 3: Commit**

```bash
git add -A apps/web/src/
git commit -m "refactor: enforce No-Line Rule — remove all layout borders, use tonal separation"
```

---

## Phase 3: Glassmorphism & Shadow Enhancements

### Task 7: Add glass-effect utility and enhance shadows

**Files:**
- Create: `apps/web/src/theme/utilities.css.ts`
- Modify: `apps/web/src/components/card.css.ts`

**Step 1: Create glass-effect utility style**

```typescript
import { style } from "@vanilla-extract/css";
import { vars } from "./contract.css";

export const glassEffect = style({
  backgroundColor: `${vars.color.bg.elevated}cc`,
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  "@supports": {
    "not (backdrop-filter: blur(20px))": {
      backgroundColor: `${vars.color.bg.elevated}f2`,
    },
  },
});

export const ghostBorder = style({
  outline: `1px solid ${vars.color.outline.variant}26`,
});

export const primaryGlow = style({
  boxShadow: `0 0 12px 0 ${vars.color.accent.primaryDim}44`,
});
```

**Step 2: Update card.css.ts for glassmorphism**

Replace selected variant's border with a subtle glow:

In card.css.ts, the `selected: true` variant should use:
```typescript
selected: {
  true: {
    boxShadow: `0 0 12px 0 ${vars.color.accent.primaryDim}44`,
  },
},
```

**Step 3: Commit**

```bash
git add apps/web/src/theme/utilities.css.ts apps/web/src/components/card.css.ts
git commit -m "feat: add glassmorphism utility styles and primary glow for selections"
```

---

## Phase 4: Hardcoded Color Cleanup

### Task 8: Replace all inline hardcoded colors with token references

**Files:**
- Modify: `apps/web/src/components/extensions_list.tsx` — replace `"#e55"` with import and use of error token
- Modify: `apps/web/src/components/operators_list.tsx` — replace `"#e55"` with error token
- Modify: `apps/web/src/components/run_progress.tsx` — replace `"#6d6"`, `"#e55"`, `"#333"` with success/error/elevated tokens
- Modify: `apps/web/src/components/stage_view.tsx` — replace `"#e55"`, `"#555"`, `"#2a2a2a"` with tokens

For each file:
1. Read the file
2. Find all hardcoded hex colors (search for `#` followed by 3 or 6 hex chars)
3. Replace with the appropriate `vars.*` token imported from `../theme/contract.css`
4. If the component uses inline `style={{}}` with hardcoded colors, move them to a co-located `.css.ts` file or use the token directly

Mapping:
- `"#e55"` or `"#ef4444"` → `vars.color.error.base`
- `"#6d6"` or `"#22c55e"` → `vars.color.success.base`
- `"#333"` → `vars.color.bg.elevated`
- `"#2a2a2a"` → `vars.color.bg.elevated`
- `"#555"` → `vars.color.outline.variant`

**Step 2: Verify build**

Run: `cd apps/web && npx tsc --noEmit`
Expected: Getting very close to passing.

**Step 3: Commit**

```bash
git add -A apps/web/src/components/
git commit -m "fix: replace hardcoded hex colors with design system tokens"
```

---

## Phase 5: Sidebar Hover-Expand + Pin Behavior

### Task 9: Implement hybrid expandable sidebar

**Files:**
- Modify: `apps/web/src/layout/shell.css.ts`
- Modify: `apps/web/src/layout/shell.tsx`
- Modify: `apps/web/src/layout/icon_rail.css.ts`
- Modify: `apps/web/src/layout/icon_rail.tsx`
- Modify: `apps/web/src/App.tsx`

**Step 1: Rework shell grid for expandable sidebar**

The shell grid column 1 (icon rail) and column 2 (secondary panel) merge into a single sidebar column that changes width based on state:
- Collapsed: 64px (icon-only)
- Hovered: 256px (icons + labels, overlays canvas)
- Pinned: 256px (icons + labels + secondary content, pushes canvas)

Update `shell.css.ts`:
- Remove the separate `iconRail` and `secondaryPanel` grid areas
- Replace with a single `sidebar` area that is either 64px or 256px wide
- The sidebar has `position: relative` when collapsed, becomes part of the flow when pinned
- When hovered (not pinned), the sidebar uses `position: absolute` at 256px width to overlay the canvas

Update `shell.tsx`:
- Remove `iconRail` and `secondaryPanel` props
- Add single `sidebar` prop
- Add `sidebarPinned` boolean prop
- The `Shell` component renders one `<aside>` for the sidebar

Update `icon_rail.tsx` → rename to `sidebar.tsx`:
- Add hover detection (onMouseEnter/onMouseLeave)
- Add pin toggle button (visible when expanded)
- When expanded: show labels alongside icons
- When pinned: show secondary content area below nav items
- Labels: JetBrains Mono, 11px, uppercase, tracking 0.05em
- Labels animate in via opacity transition (0→1, 200ms)
- Pin button: pushpin icon from Material Symbols, top-right of sidebar header

Update `icon_rail.css.ts` → rename to `sidebar.css.ts`:
- Collapsed: 64px, overflow hidden
- Expanded: 256px, transition width 300ms cubic-bezier(0.4, 0, 0.2, 1)
- Background: surface_container_low (#111416)
- No right border (No-Line Rule)
- Navigation items: 40px height, full width, padding-left 20px
- Labels: opacity 0 when collapsed, opacity 1 when expanded

Update `App.tsx`:
- Add `sidebarPinned` / `setSidebarPinned` state
- Pass sidebar component with pin state to Shell

**Step 2: Verify build**

Run: `cd apps/web && npx tsc --noEmit`

**Step 3: Commit**

```bash
git add -A apps/web/src/layout/ apps/web/src/App.tsx
git commit -m "feat: implement hybrid sidebar with hover-expand and pin behavior"
```

---

## Phase 6: Typography & Icon System

### Task 10: Add Google Fonts and Material Symbols to index.html

**Files:**
- Modify: `apps/web/index.html`

**Step 1: Add font links**

Add these `<link>` tags to the `<head>` section of index.html:

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
```

**Step 2: Add Material Symbols base style to global.css.ts**

Add a globalStyle for `.material-symbols-outlined`:

```typescript
globalStyle(".material-symbols-outlined", {
  fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
});
```

**Step 3: Update sidebar icons from Unicode to Material Symbols**

In the sidebar component (formerly icon_rail.tsx), replace Unicode characters with Material Symbols span elements:

```
home → <span class="material-symbols-outlined">home</span>
recipes → <span class="material-symbols-outlined">description</span>
workflows → <span class="material-symbols-outlined">account_tree</span>
runs → <span class="material-symbols-outlined">play_arrow</span>
artifacts → <span class="material-symbols-outlined">inventory_2</span>
extensions → <span class="material-symbols-outlined">extension</span>
models → <span class="material-symbols-outlined">settings_input_component</span>
settings → <span class="material-symbols-outlined">settings</span>
help → <span class="material-symbols-outlined">help</span>
```

Active icons get `style="font-variation-settings: 'FILL' 1"` (filled variant).

**Step 4: Commit**

```bash
git add apps/web/index.html apps/web/src/theme/global.css.ts apps/web/src/layout/
git commit -m "feat: add Google Fonts (Space Grotesk, Material Symbols) and replace icon placeholders"
```

---

## Phase 7: Build Verification & Integration

### Task 11: Fix all remaining TypeScript errors and verify build

**Step 1: Run TypeScript check**

Run: `cd apps/web && npx tsc --noEmit 2>&1`

Fix any remaining errors. The most likely issues:
- References to `vars.color.border.subtle` or `vars.color.border.strong` that should now be `vars.color.outline.variant` or `vars.color.outline.base`
- References to old icon_rail imports if file was renamed
- References to `vars.color.accent.primaryHover` if the contract shape changed
- Missing `font.headline` usage (new token)

For each error: read the file, identify the old token path, replace with the new equivalent.

**Step 2: Run Vite build**

Run: `cd apps/web && npx vite build`
Expected: PASS with zero errors.

**Step 3: Visual smoke test**

Run: `cd apps/web && npx vite preview`
Expected:
- Dark graphite background (#0c0e10), significantly darker than before
- Violet accent on active sidebar icon and primary buttons
- No visible 1px borders between layout regions
- Sidebar shows icons only at 64px, expands on hover
- Space Grotesk for any headline text
- Material Symbols icons in sidebar

**Step 4: Commit**

```bash
git add -A apps/web/
git commit -m "fix: resolve all TypeScript errors for spectral graphite migration"
```

---

## Phase 8: Left Rail Secondary Content

### Task 12: Wire secondary content into pinned sidebar

**Files:**
- Modify: `apps/web/src/layout/sidebar.tsx` (formerly left_rail.tsx / icon_rail.tsx)
- Modify: `apps/web/src/App.tsx`

**Step 1: Add secondary content slot to sidebar**

When the sidebar is pinned, render a secondary content area below the navigation items. This content changes based on which nav item is active:

- Home: empty (dashboard is full canvas)
- Recipes: RecipeCatalog component
- Workflows: ToolCatalog component (operator library when in graph view)
- Runs: empty for now
- Artifacts: empty for now
- Extensions: ExtensionList component
- Models: empty for now

The secondary content area gets: padding 12px, overflow-y auto, flex 1.

A thin horizontal divider line (outline_variant at 15% opacity — this is the one exception to No-Line Rule for functional separation) separates nav items from secondary content.

**Step 2: Verify build**

Run: `cd apps/web && npx tsc --noEmit && npx vite build`

**Step 3: Commit**

```bash
git add apps/web/src/layout/ apps/web/src/App.tsx
git commit -m "feat: wire secondary content into pinned sidebar with context-sensitive panels"
```

---

## Deferred to Follow-Up Plans

The following are specified in `specs/003-frontend-rework/spec.md` but not implemented in this plan:

1. **US-3: Home Dashboard** — full Bento grid layout with workflow cards, health gauges, sparklines
2. **US-4: Graph Editor Custom Nodes** — custom @xyflow/react node components with inline previews, modality ports
3. **US-5: Recipe View** — input configuration panel, numbered step cards, progression line, preview canvas
4. **US-6: Artifact Browser** — modality filtering, thumbnail grid, hover-scrub, detail inspector
5. **US-7: Neural Assistant** — chat panel, streaming responses, context badges
6. **US-8: Top Bar** — Space Grotesk branding, text-link nav style (matches mockups)
7. **US-9: Trace View** — Gantt timeline, node detail inspector
8. **US-10: Bottom Drawer** — performance charts, diagnostics, console with live log stream
