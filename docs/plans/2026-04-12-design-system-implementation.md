# Design System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the existing minimal token system and 3-column shell with the full "Technical Cinema" design system as specified in `docs/plans/2026-04-12-design-system.md`.

**Architecture:** Three-tier token system (primitives -> semantic contract -> theme) implemented via vanilla-extract. Shell rebuilt as CSS Grid with icon rail, collapsible secondary panel, fluid canvas, collapsible inspector, and resizable bottom drawer. All existing components migrated to new tokens.

**Tech Stack:** React 19, TypeScript 5.7, vanilla-extract (css + recipes + sprinkles), @xyflow/react 12, Geist font, JetBrains Mono

**Scope:** Token foundation + shell redesign + core components + app integration. View-specific patterns (Dashboard, Recipe, Graph, Trace, Timeline) and graph editor node components are deferred to a follow-up plan.

---

## Phase 1: Token Foundation

### Task 1: Create primitive token constants

**Files:**
- Create: `apps/web/src/tokens/primitives.ts`

**Step 1: Create the primitives file**

This file exports raw values as plain TypeScript constants (NOT .css.ts). These are never imported by components directly — only by the theme contract and theme files.

```typescript
export const color = {
  navy: {
    50: "#E8EEF8",
    100: "#A8B3C7",
    200: "#718096",
    300: "#334155",
    400: "#253041",
    500: "#212C3A",
    600: "#1B2430",
    700: "#151C24",
    800: "#0F141B",
    900: "#0B0F14",
  },
  blue: {
    400: "#5EA1FF",
    500: "#4A8FE8",
    600: "#3A7BD4",
  },
  violet: {
    400: "#7C5CFF",
    500: "#6B4FE0",
    600: "#5A42C0",
  },
  cyan: {
    400: "#21C7D9",
    500: "#1AB3C4",
    600: "#158FA0",
  },
  green: {
    400: "#22C55E",
    500: "#1DAF52",
    600: "#189A47",
  },
  amber: {
    400: "#F5B942",
    500: "#E0A838",
    600: "#C9952F",
  },
  red: {
    400: "#F05D5E",
    500: "#D94F50",
    600: "#C24344",
  },
  slate: {
    400: "#94A3B8",
    500: "#7C8B9E",
  },
  modality: {
    image: "#B57CFF",
    video: "#21C7D9",
    audio: "#34D399",
    text: "#F5B942",
    model: "#5EA1FF",
    system: "#94A3B8",
  },
} as const;

export const spacing = {
  0: "0px",
  1: "2px",
  2: "4px",
  3: "6px",
  4: "8px",
  5: "10px",
  6: "12px",
  8: "16px",
  10: "20px",
  12: "24px",
  16: "32px",
  20: "40px",
  24: "48px",
} as const;

export const radii = {
  2: "2px",
  4: "4px",
  6: "6px",
  8: "8px",
  10: "10px",
  12: "12px",
  14: "14px",
  16: "16px",
  full: "9999px",
} as const;

export const typography = {
  family: {
    ui: "'Geist', 'Inter', system-ui, -apple-system, sans-serif",
    code: "'JetBrains Mono', 'Fira Code', monospace",
  },
  size: {
    11: "0.6875rem",
    12: "0.75rem",
    13: "0.8125rem",
    14: "0.875rem",
    16: "1rem",
    18: "1.125rem",
    20: "1.25rem",
    24: "1.5rem",
    28: "1.75rem",
    32: "2rem",
  },
  weight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeight: {
    none: "1",
    tight: "1.2",
    snug: "1.4",
    normal: "1.5",
    relaxed: "1.6",
  },
} as const;

export const motion = {
  duration: {
    instant: "100ms",
    fast: "150ms",
    normal: "250ms",
    slow: "400ms",
    slower: "600ms",
  },
  easing: {
    default: "cubic-bezier(0.2, 0, 0, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    exit: "cubic-bezier(0.4, 0, 1, 1)",
  },
} as const;
```

**Step 2: Verify build**

Run: `cd apps/web && npx tsc --noEmit`
Expected: PASS (no type errors, file is plain TS)

**Step 3: Commit**

```bash
git add apps/web/src/tokens/primitives.ts
git commit -m "feat: add primitive token constants for design system"
```

---

### Task 2: Expand theme contract

**Files:**
- Modify: `apps/web/src/theme/contract.css.ts`

**Step 1: Replace the contract with expanded semantic tokens**

Replace the entire file. The new contract adds: 5-level surface hierarchy, accent roles, state colors, modality colors, expanded typography, semantic spacing, motion tokens, density-aware control sizes, and z-index levels.

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
    },
    text: {
      primary: "",
      secondary: "",
      muted: "",
      inverse: "",
    },
    accent: {
      primary: "",
      primaryHover: "",
      secondary: "",
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
    border: {
      subtle: "",
      strong: "",
    },
  },
  font: {
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

**Step 2: Verify build**

Run: `cd apps/web && npx tsc --noEmit`
Expected: FAIL — dark.css.ts and all components reference old contract shape. This is expected; we fix it in Task 3.

**Step 3: Commit (even with broken build — contract is correct)**

```bash
git add apps/web/src/theme/contract.css.ts
git commit -m "feat: expand theme contract with semantic tokens for design system"
```

---

### Task 3: New dark theme implementation

**Files:**
- Modify: `apps/web/src/theme/dark.css.ts`

**Step 1: Replace dark theme with new palette**

Replace the entire file. Maps primitives to the new contract shape.

```typescript
import { createTheme } from "@vanilla-extract/css";
import { vars } from "./contract.css";
import { color, typography, spacing, radii, motion } from "../tokens/primitives";

export const darkTheme = createTheme(vars, {
  color: {
    bg: {
      app: color.navy[900],
      canvas: color.navy[800],
      panel: color.navy[700],
      elevated: color.navy[600],
      hover: color.navy[500],
    },
    text: {
      primary: color.navy[50],
      secondary: color.navy[100],
      muted: color.navy[200],
      inverse: color.navy[900],
    },
    accent: {
      primary: color.blue[400],
      primaryHover: color.blue[500],
      secondary: color.violet[400],
      cyan: color.cyan[400],
    },
    state: {
      created: color.slate[400],
      planning: color.violet[400],
      running: color.blue[400],
      cacheHit: color.cyan[400],
      completed: color.green[400],
      paused: color.amber[400],
      cancelled: color.slate[400],
      failed: color.red[400],
    },
    mod: {
      image: color.modality.image,
      video: color.modality.video,
      audio: color.modality.audio,
      text: color.modality.text,
      model: color.modality.model,
      system: color.modality.system,
    },
    success: { base: color.green[400], text: "#bbf7d0" },
    warning: { base: color.amber[400], text: "#fef3c7" },
    error: { base: color.red[400], text: "#fecaca" },
    border: {
      subtle: color.navy[400],
      strong: color.navy[300],
    },
  },
  font: {
    ui: typography.family.ui,
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
      regular: typography.weight.regular,
      medium: typography.weight.medium,
      semibold: typography.weight.semibold,
      bold: typography.weight.bold,
    },
    lineHeight: {
      tight: typography.lineHeight.tight,
      normal: typography.lineHeight.normal,
      relaxed: typography.lineHeight.relaxed,
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
    sm: "0 1px 2px rgba(0,0,0,0.4)",
    md: "0 4px 8px rgba(0,0,0,0.4)",
    lg: "0 12px 24px rgba(0,0,0,0.5)",
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

**Step 2: Verify build**

Run: `cd apps/web && npx tsc --noEmit`
Expected: FAIL — existing components still reference old `vars.color.surface.base`, `vars.font.family.body`, etc. This is expected; we fix components in later tasks.

**Step 3: Commit**

```bash
git add apps/web/src/theme/dark.css.ts
git commit -m "feat: implement dark theme with technical cinema palette"
```

---

### Task 4: Update global styles

**Files:**
- Modify: `apps/web/src/theme/global.css.ts`

**Step 1: Update global styles to use new token paths**

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
  backgroundColor: vars.color.accent.primary,
  color: vars.color.text.inverse,
});

globalStyle("@media (prefers-reduced-motion: reduce)", {});
```

**Step 2: Verify build**

Run: `cd apps/web && npx tsc --noEmit`
Expected: May still fail from component references. Continue to next task.

**Step 3: Commit**

```bash
git add apps/web/src/theme/global.css.ts
git commit -m "feat: update global styles for new token paths and Geist font"
```

---

## Phase 2: Shell Redesign

### Task 5: Rebuild shell layout

**Files:**
- Modify: `apps/web/src/layout/shell.tsx`
- Modify: `apps/web/src/layout/shell.css.ts`

**Step 1: Rewrite shell.css.ts with new grid**

```typescript
import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const shellContainer = style({
  display: "grid",
  gridTemplateColumns: "56px auto 1fr auto",
  gridTemplateRows: "48px 1fr auto",
  height: "100vh",
  backgroundColor: vars.color.bg.app,
  overflow: "hidden",
});

export const topBar = style({
  gridColumn: "1 / -1",
  gridRow: "1",
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapMd,
  padding: `0 ${vars.space.insetXl}`,
  borderBottom: `1px solid ${vars.color.border.subtle}`,
  backgroundColor: vars.color.bg.panel,
  zIndex: vars.z.base,
});

export const iconRail = style({
  gridColumn: "1",
  gridRow: "2 / -1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: vars.space.insetMd,
  borderRight: `1px solid ${vars.color.border.subtle}`,
  backgroundColor: vars.color.bg.panel,
  width: "56px",
  overflow: "hidden",
});

export const secondaryPanel = style({
  gridColumn: "2",
  gridRow: "2 / -1",
  width: "240px",
  borderRight: `1px solid ${vars.color.border.subtle}`,
  backgroundColor: vars.color.bg.panel,
  overflow: "auto",
});

export const secondaryPanelCollapsed = style({
  width: "0px",
  borderRight: "none",
  overflow: "hidden",
});

export const canvas = style({
  gridColumn: "3",
  gridRow: "2",
  overflow: "auto",
  backgroundColor: vars.color.bg.canvas,
});

export const inspector = style({
  gridColumn: "4",
  gridRow: "2 / -1",
  width: "320px",
  borderLeft: `1px solid ${vars.color.border.subtle}`,
  backgroundColor: vars.color.bg.panel,
  overflow: "auto",
});

export const inspectorCollapsed = style({
  width: "0px",
  borderLeft: "none",
  overflow: "hidden",
});

export const bottomDrawer = style({
  gridColumn: "3",
  gridRow: "3",
  borderTop: `1px solid ${vars.color.border.strong}`,
  backgroundColor: vars.color.bg.panel,
  overflow: "hidden",
});

export const bottomDrawerCollapsed = style({
  height: "0px",
  borderTop: "none",
});
```

**Step 2: Rewrite shell.tsx with new layout zones**

```typescript
import { type ReactNode } from "react";
import * as styles from "./shell.css";

type ShellProps = {
  topBar: ReactNode;
  iconRail: ReactNode;
  secondaryPanel: ReactNode;
  canvas: ReactNode;
  inspector: ReactNode;
  bottomDrawer: ReactNode;
  secondaryPanelVisible?: boolean;
  inspectorVisible?: boolean;
  bottomDrawerVisible?: boolean;
};

export function Shell({
  topBar,
  iconRail,
  secondaryPanel,
  canvas,
  inspector,
  bottomDrawer,
  secondaryPanelVisible = true,
  inspectorVisible = true,
  bottomDrawerVisible = false,
}: ShellProps) {
  const secondaryCls = secondaryPanelVisible
    ? styles.secondaryPanel
    : `${styles.secondaryPanel} ${styles.secondaryPanelCollapsed}`;

  const inspectorCls = inspectorVisible
    ? styles.inspector
    : `${styles.inspector} ${styles.inspectorCollapsed}`;

  const drawerCls = bottomDrawerVisible
    ? styles.bottomDrawer
    : `${styles.bottomDrawer} ${styles.bottomDrawerCollapsed}`;

  return (
    <div className={styles.shellContainer}>
      <header className={styles.topBar}>{topBar}</header>
      <nav className={styles.iconRail}>{iconRail}</nav>
      <aside className={secondaryCls}>{secondaryPanel}</aside>
      <main className={styles.canvas}>{canvas}</main>
      <aside className={inspectorCls}>{inspector}</aside>
      <section className={drawerCls}>{bottomDrawer}</section>
    </div>
  );
}
```

**Step 3: Commit**

```bash
git add apps/web/src/layout/shell.tsx apps/web/src/layout/shell.css.ts
git commit -m "feat: rebuild shell layout with icon rail, panels, and bottom drawer"
```

---

### Task 6: Create icon rail component

**Files:**
- Create: `apps/web/src/layout/icon_rail.tsx`
- Create: `apps/web/src/layout/icon_rail.css.ts`

**Step 1: Create icon_rail.css.ts**

```typescript
import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.gapXs,
  width: "100%",
  height: "100%",
});

export const topGroup = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.gapXs,
  flex: 1,
});

export const bottomGroup = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.gapXs,
  paddingBottom: vars.space.insetMd,
});

export const divider = style({
  width: "24px",
  height: "1px",
  backgroundColor: vars.color.border.subtle,
  margin: `${vars.space.gapSm} 0`,
});

export const railItemRecipe = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: vars.radius.control,
    border: "none",
    backgroundColor: "transparent",
    color: vars.color.text.muted,
    cursor: "pointer",
    position: "relative",
    transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
    fontFamily: vars.font.ui,
    fontSize: vars.icon.lg,
    ":hover": {
      backgroundColor: vars.color.bg.hover,
      color: vars.color.text.secondary,
    },
  },
  variants: {
    active: {
      true: {
        color: vars.color.accent.primary,
        backgroundColor: vars.color.bg.hover,
        "::before": {
          content: '""',
          position: "absolute",
          left: "-8px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "3px",
          height: "20px",
          backgroundColor: vars.color.accent.primary,
          borderRadius: "0 2px 2px 0",
        },
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});
```

**Step 2: Create icon_rail.tsx**

```typescript
import * as styles from "./icon_rail.css";

export type NavItemId =
  | "home"
  | "recipes"
  | "workflows"
  | "runs"
  | "artifacts"
  | "extensions"
  | "models";

type UtilityItemId = "settings" | "help";

type NavItem = {
  id: NavItemId;
  label: string;
  icon: string;
};

type UtilityItem = {
  id: UtilityItemId;
  label: string;
  icon: string;
};

const NAV_ITEMS: readonly NavItem[] = [
  { id: "home", label: "Home", icon: "\u2302" },
  { id: "recipes", label: "Recipes", icon: "\u2630" },
  { id: "workflows", label: "Workflows", icon: "\u2387" },
  { id: "runs", label: "Runs", icon: "\u25B6" },
  { id: "artifacts", label: "Artifacts", icon: "\u25A3" },
  { id: "extensions", label: "Extensions", icon: "\u29C9" },
  { id: "models", label: "Models", icon: "\u2338" },
] as const;

const UTILITY_ITEMS: readonly UtilityItem[] = [
  { id: "settings", label: "Settings", icon: "\u2699" },
  { id: "help", label: "Help", icon: "?" },
] as const;

type IconRailProps = {
  activeItem: NavItemId;
  onNavigate: (id: NavItemId) => void;
  onUtility?: (id: UtilityItemId) => void;
};

export function IconRail({ activeItem, onNavigate, onUtility }: IconRailProps) {
  return (
    <div className={styles.container}>
      <div className={styles.topGroup}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={styles.railItemRecipe({ active: item.id === activeItem })}
            onClick={() => onNavigate(item.id)}
            title={item.label}
            aria-label={item.label}
            aria-current={item.id === activeItem ? "page" : undefined}
          >
            {item.icon}
          </button>
        ))}
      </div>
      <div className={styles.divider} />
      <div className={styles.bottomGroup}>
        {UTILITY_ITEMS.map((item) => (
          <button
            key={item.id}
            className={styles.railItemRecipe({ active: false })}
            onClick={() => onUtility?.(item.id)}
            title={item.label}
            aria-label={item.label}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
```

**Step 3: Commit**

```bash
git add apps/web/src/layout/icon_rail.tsx apps/web/src/layout/icon_rail.css.ts
git commit -m "feat: add icon rail navigation component"
```

---

### Task 7: Rebuild top bar

**Files:**
- Modify: `apps/web/src/layout/top_bar.tsx`
- Modify: `apps/web/src/layout/top_bar.css.ts`

**Step 1: Rewrite top_bar.css.ts**

```typescript
import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const leftZone = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  flex: "0 0 auto",
});

export const logo = style({
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.bold,
  color: vars.color.accent.primary,
  lineHeight: 1,
});

export const projectName = style({
  fontSize: vars.font.size.body,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.primary,
  maxWidth: "200px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const savedDot = style({
  width: "6px",
  height: "6px",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.state.completed,
});

export const centerZone = style({
  display: "flex",
  justifyContent: "center",
  flex: 1,
});

export const commandTrigger = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  padding: `${vars.space.insetXs} ${vars.space.insetLg}`,
  backgroundColor: vars.color.bg.elevated,
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.control,
  color: vars.color.text.muted,
  fontSize: vars.font.size.bodySm,
  fontFamily: vars.font.ui,
  cursor: "pointer",
  minWidth: "240px",
  maxWidth: "280px",
  transition: `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    borderColor: vars.color.border.strong,
  },
});

export const shortcutHint = style({
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  fontFamily: vars.font.code,
  marginLeft: "auto",
});

export const rightZone = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  flex: "0 0 auto",
});

export const controlGroup = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapXs,
});

export const healthBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.gapXs,
  fontSize: vars.font.size.caption,
  color: vars.color.text.secondary,
});

export const healthDot = style({
  width: "6px",
  height: "6px",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.state.completed,
});
```

**Step 2: Rewrite top_bar.tsx**

```typescript
import { Button } from "../components/button";
import * as styles from "./top_bar.css";

type TopBarProps = {
  projectName: string;
  isDirty?: boolean;
  onRun: () => void;
  onCancel: () => void;
  onValidate: () => void;
  isRunning: boolean;
  onCommandPalette?: () => void;
};

export function TopBar({
  projectName,
  isDirty = false,
  onRun,
  onCancel,
  onValidate,
  isRunning,
  onCommandPalette,
}: TopBarProps) {
  return (
    <>
      <div className={styles.leftZone}>
        <span className={styles.logo}>N</span>
        <span className={styles.projectName} title={projectName}>
          {projectName}
        </span>
        {!isDirty && <span className={styles.savedDot} title="Saved" />}
      </div>

      <div className={styles.centerZone}>
        <button
          className={styles.commandTrigger}
          onClick={onCommandPalette}
          aria-label="Open command palette"
        >
          Search or run a command...
          <span className={styles.shortcutHint}>Ctrl+K</span>
        </button>
      </div>

      <div className={styles.rightZone}>
        <div className={styles.controlGroup}>
          <Button variant="ghost" size="sm" onClick={onValidate}>
            Validate
          </Button>
          {isRunning ? (
            <Button variant="ghost" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          ) : (
            <Button variant="primary" size="sm" onClick={onRun}>
              Run
            </Button>
          )}
        </div>
        <div className={styles.healthBadge}>
          <span className={styles.healthDot} />
          Healthy
        </div>
      </div>
    </>
  );
}
```

**Step 3: Commit**

```bash
git add apps/web/src/layout/top_bar.tsx apps/web/src/layout/top_bar.css.ts
git commit -m "feat: rebuild top bar with command palette trigger and run controls"
```

---

## Phase 3: Core Components Migration

### Task 8: Migrate Button component

**Files:**
- Modify: `apps/web/src/components/button.tsx`
- Modify: `apps/web/src/components/button.css.ts`

**Step 1: Rewrite button.css.ts with new tokens and variants**

```typescript
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme/contract.css";

export const buttonRecipe = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.space.gapXs,
    border: "none",
    borderRadius: vars.radius.control,
    fontSize: vars.font.size.bodySm,
    fontWeight: vars.font.weight.medium,
    fontFamily: vars.font.ui,
    lineHeight: vars.font.lineHeight.tight,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}, border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
    ":disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: vars.color.accent.primary,
        color: vars.color.text.inverse,
        ":hover": { backgroundColor: vars.color.accent.primaryHover },
      },
      secondary: {
        backgroundColor: "transparent",
        color: vars.color.text.primary,
        border: `1px solid ${vars.color.border.subtle}`,
        ":hover": {
          backgroundColor: vars.color.bg.hover,
          borderColor: vars.color.border.strong,
        },
      },
      ghost: {
        backgroundColor: "transparent",
        color: vars.color.text.secondary,
        ":hover": {
          backgroundColor: vars.color.bg.hover,
          color: vars.color.text.primary,
        },
      },
      danger: {
        backgroundColor: vars.color.error.base,
        color: vars.color.text.inverse,
        ":hover": { opacity: 0.9 },
      },
      success: {
        backgroundColor: vars.color.success.base,
        color: vars.color.text.inverse,
        ":hover": { opacity: 0.9 },
      },
    },
    size: {
      sm: {
        height: vars.control.heightSm,
        padding: `0 ${vars.space.insetMd}`,
        fontSize: vars.font.size.caption,
      },
      md: {
        height: vars.control.heightMd,
        padding: `0 ${vars.space.insetLg}`,
      },
      lg: {
        height: vars.control.heightLg,
        padding: `0 ${vars.space.insetXl}`,
        fontSize: vars.font.size.bodyLg,
      },
    },
    iconOnly: {
      true: {
        borderRadius: vars.radius.full,
        padding: 0,
      },
    },
  },
  compoundVariants: [
    { variants: { size: "sm", iconOnly: true }, style: { width: vars.control.heightSm } },
    { variants: { size: "md", iconOnly: true }, style: { width: vars.control.heightMd } },
    { variants: { size: "lg", iconOnly: true }, style: { width: vars.control.heightLg } },
  ],
  defaultVariants: {
    variant: "primary",
    size: "md",
    iconOnly: false,
  },
});
```

**Step 2: Rewrite button.tsx**

```typescript
import type { ButtonHTMLAttributes } from "react";
import { buttonRecipe } from "./button.css";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconOnly?: boolean;
};

export function Button({
  variant,
  size,
  iconOnly,
  className,
  ...rest
}: ButtonProps) {
  const cls = [buttonRecipe({ variant, size, iconOnly }), className]
    .filter(Boolean)
    .join(" ");
  return <button className={cls} {...rest} />;
}
```

**Step 3: Commit**

```bash
git add apps/web/src/components/button.tsx apps/web/src/components/button.css.ts
git commit -m "feat: expand button with danger/success variants and icon-only mode"
```

---

### Task 9: Migrate Input component

**Files:**
- Modify: `apps/web/src/components/input.tsx`
- Modify: `apps/web/src/components/input.css.ts`

**Step 1: Rewrite input.css.ts**

```typescript
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme/contract.css";

export const inputRecipe = recipe({
  base: {
    width: "100%",
    backgroundColor: vars.color.bg.app,
    color: vars.color.text.primary,
    border: `1px solid ${vars.color.border.subtle}`,
    borderRadius: vars.radius.control,
    fontFamily: vars.font.ui,
    fontSize: vars.font.size.body,
    lineHeight: vars.font.lineHeight.normal,
    outline: "none",
    transition: `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}, box-shadow ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
    "::placeholder": {
      color: vars.color.text.muted,
    },
    ":focus": {
      borderColor: vars.color.accent.primary,
      boxShadow: `0 0 0 2px ${vars.color.accent.primary}33`,
    },
    ":disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
  variants: {
    variant: {
      default: {},
      ghost: {
        border: "none",
        backgroundColor: "transparent",
        ":focus": {
          boxShadow: "none",
          backgroundColor: vars.color.bg.elevated,
        },
      },
      mono: {
        fontFamily: vars.font.code,
        fontSize: vars.font.size.bodySm,
      },
    },
    size: {
      sm: {
        height: vars.control.heightSm,
        padding: `0 ${vars.space.insetMd}`,
        fontSize: vars.font.size.caption,
      },
      md: {
        height: vars.control.heightMd,
        padding: `0 ${vars.space.insetLg}`,
      },
      lg: {
        height: vars.control.heightLg,
        padding: `0 ${vars.space.insetXl}`,
        fontSize: vars.font.size.bodyLg,
      },
    },
    hasError: {
      true: {
        borderColor: vars.color.error.base,
        ":focus": {
          borderColor: vars.color.error.base,
          boxShadow: `0 0 0 2px ${vars.color.error.base}33`,
        },
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    hasError: false,
  },
});
```

**Step 2: Rewrite input.tsx**

```typescript
import type { InputHTMLAttributes } from "react";
import { inputRecipe } from "./input.css";

type InputVariant = "default" | "ghost" | "mono";
type InputSize = "sm" | "md" | "lg";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: InputVariant;
  size?: InputSize;
  hasError?: boolean;
};

export function Input({
  variant,
  size,
  hasError,
  className,
  ...rest
}: InputProps) {
  const cls = [inputRecipe({ variant, size, hasError }), className]
    .filter(Boolean)
    .join(" ");
  return <input className={cls} {...rest} />;
}
```

**Step 3: Commit**

```bash
git add apps/web/src/components/input.tsx apps/web/src/components/input.css.ts
git commit -m "feat: expand input with ghost/mono variants and error state"
```

---

### Task 10: Create Badge component (replaces StatusBadge)

**Files:**
- Create: `apps/web/src/components/badge.tsx`
- Create: `apps/web/src/components/badge.css.ts`
- Keep: `apps/web/src/components/status_badge.tsx` (mark deprecated, re-export from badge)

**Step 1: Create badge.css.ts**

```typescript
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme/contract.css";

export const badgeRecipe = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: vars.space.gapXs,
    borderRadius: vars.radius.full,
    fontWeight: vars.font.weight.medium,
    lineHeight: vars.font.lineHeight.tight,
    fontFamily: vars.font.ui,
    whiteSpace: "nowrap",
  },
  variants: {
    size: {
      sm: {
        height: "20px",
        padding: `0 ${vars.space.insetSm}`,
        fontSize: vars.font.size.caption,
      },
      md: {
        height: "24px",
        padding: `0 ${vars.space.insetMd}`,
        fontSize: vars.font.size.bodySm,
      },
    },
    intent: {
      neutral: {
        backgroundColor: vars.color.bg.hover,
        color: vars.color.text.secondary,
      },
      info: {
        backgroundColor: `${vars.color.accent.primary}1a`,
        color: vars.color.accent.primary,
      },
      success: {
        backgroundColor: `${vars.color.success.base}1a`,
        color: vars.color.success.base,
      },
      warning: {
        backgroundColor: `${vars.color.warning.base}1a`,
        color: vars.color.warning.base,
      },
      error: {
        backgroundColor: `${vars.color.error.base}1a`,
        color: vars.color.error.base,
      },
    },
    modality: {
      image: {
        backgroundColor: `${vars.color.mod.image}1a`,
        color: vars.color.mod.image,
      },
      video: {
        backgroundColor: `${vars.color.mod.video}1a`,
        color: vars.color.mod.video,
      },
      audio: {
        backgroundColor: `${vars.color.mod.audio}1a`,
        color: vars.color.mod.audio,
      },
      text: {
        backgroundColor: `${vars.color.mod.text}1a`,
        color: vars.color.mod.text,
      },
      model: {
        backgroundColor: `${vars.color.mod.model}1a`,
        color: vars.color.mod.model,
      },
      system: {
        backgroundColor: `${vars.color.mod.system}1a`,
        color: vars.color.mod.system,
      },
    },
  },
  defaultVariants: {
    size: "sm",
    intent: "neutral",
  },
});

export const dot = recipe({
  base: {
    width: "6px",
    height: "6px",
    borderRadius: vars.radius.full,
    flexShrink: 0,
  },
  variants: {
    color: {
      neutral: { backgroundColor: vars.color.text.muted },
      info: { backgroundColor: vars.color.accent.primary },
      success: { backgroundColor: vars.color.success.base },
      warning: { backgroundColor: vars.color.warning.base },
      error: { backgroundColor: vars.color.error.base },
    },
  },
  defaultVariants: {
    color: "neutral",
  },
});
```

**Step 2: Create badge.tsx**

```typescript
import { badgeRecipe, dot as dotRecipe } from "./badge.css";

type BadgeIntent = "neutral" | "info" | "success" | "warning" | "error";
type BadgeModality = "image" | "video" | "audio" | "text" | "model" | "system";
type BadgeSize = "sm" | "md";

type BadgeProps = {
  label: string;
  size?: BadgeSize;
  intent?: BadgeIntent;
  modality?: BadgeModality;
  showDot?: boolean;
  className?: string;
};

export function Badge({
  label,
  size,
  intent,
  modality,
  showDot = false,
  className,
}: BadgeProps) {
  const cls = [badgeRecipe({ size, intent, modality }), className]
    .filter(Boolean)
    .join(" ");

  const dotColor = intent === "success"
    ? "success"
    : intent === "warning"
      ? "warning"
      : intent === "error"
        ? "error"
        : intent === "info"
          ? "info"
          : "neutral";

  return (
    <span className={cls}>
      {showDot && <span className={dotRecipe({ color: dotColor })} />}
      {label}
    </span>
  );
}
```

**Step 3: Update status_badge.tsx to re-export from badge**

```typescript
import { Badge } from "./badge";

type BadgeStatus = "active" | "disabled" | "invalid" | "running" | "completed" | "failed" | "pending";

const STATUS_TO_INTENT: Record<BadgeStatus, "neutral" | "info" | "success" | "warning" | "error"> = {
  active: "success",
  disabled: "neutral",
  invalid: "error",
  running: "info",
  completed: "success",
  failed: "error",
  pending: "neutral",
};

type StatusBadgeProps = {
  status: BadgeStatus;
  label?: string;
};

/** @deprecated Use Badge component directly */
export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <Badge
      label={label ?? status}
      intent={STATUS_TO_INTENT[status]}
      showDot
      size="sm"
    />
  );
}

export type { BadgeStatus };
```

**Step 4: Commit**

```bash
git add apps/web/src/components/badge.tsx apps/web/src/components/badge.css.ts apps/web/src/components/status_badge.tsx
git commit -m "feat: add Badge component with intent and modality variants"
```

---

### Task 11: Create Card component (replaces Panel)

**Files:**
- Create: `apps/web/src/components/card.tsx`
- Create: `apps/web/src/components/card.css.ts`

**Step 1: Create card.css.ts**

```typescript
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme/contract.css";

export const cardRecipe = recipe({
  base: {
    backgroundColor: vars.color.bg.elevated,
    borderRadius: vars.radius.card,
    border: `1px solid ${vars.color.border.subtle}`,
    padding: vars.space.insetLg,
    transition: `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}, transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  },
  variants: {
    variant: {
      default: {},
      interactive: {
        cursor: "pointer",
        ":hover": {
          borderColor: vars.color.border.strong,
          transform: "translateY(-1px)",
        },
      },
      outlined: {
        backgroundColor: "transparent",
      },
    },
    selected: {
      true: {
        borderColor: vars.color.accent.primary,
        boxShadow: `0 0 0 1px ${vars.color.accent.primary}4d`,
      },
    },
  },
  defaultVariants: {
    variant: "default",
    selected: false,
  },
});
```

**Step 2: Create card.tsx**

```typescript
import type { HTMLAttributes } from "react";
import { cardRecipe } from "./card.css";

type CardVariant = "default" | "interactive" | "outlined";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  selected?: boolean;
};

export function Card({
  variant,
  selected,
  className,
  ...rest
}: CardProps) {
  const cls = [cardRecipe({ variant, selected }), className]
    .filter(Boolean)
    .join(" ");
  return <div className={cls} {...rest} />;
}
```

**Step 3: Commit**

```bash
git add apps/web/src/components/card.tsx apps/web/src/components/card.css.ts
git commit -m "feat: add Card component with interactive and selected states"
```

---

### Task 12: Create Tabs and Segmented Control

**Files:**
- Create: `apps/web/src/components/tabs.tsx`
- Create: `apps/web/src/components/tabs.css.ts`

**Step 1: Create tabs.css.ts**

```typescript
import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const tabList = style({
  display: "flex",
  gap: vars.space.gapXs,
});

export const tabRecipe = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: vars.space.gapXs,
    border: "none",
    backgroundColor: "transparent",
    fontFamily: vars.font.ui,
    fontWeight: vars.font.weight.medium,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: `color ${vars.motion.durationFast} ${vars.motion.easingDefault}, background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  },
  variants: {
    variant: {
      underline: {
        padding: `${vars.space.insetMd} ${vars.space.insetSm}`,
        fontSize: vars.font.size.bodySm,
        color: vars.color.text.muted,
        borderBottom: "2px solid transparent",
        borderRadius: 0,
        ":hover": { color: vars.color.text.primary },
      },
      segmented: {
        padding: `${vars.space.insetXs} ${vars.space.insetMd}`,
        fontSize: vars.font.size.bodySm,
        color: vars.color.text.secondary,
        borderRadius: vars.radius.control,
        ":hover": {
          backgroundColor: vars.color.bg.hover,
          color: vars.color.text.primary,
        },
      },
    },
    active: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: { variant: "underline", active: true },
      style: {
        color: vars.color.accent.primary,
        borderBottomColor: vars.color.accent.primary,
      },
    },
    {
      variants: { variant: "segmented", active: true },
      style: {
        backgroundColor: vars.color.bg.elevated,
        color: vars.color.text.primary,
      },
    },
  ],
  defaultVariants: {
    variant: "underline",
    active: false,
  },
});

export const segmentedContainer = style({
  display: "inline-flex",
  gap: vars.space.gapXs,
  padding: vars.space.insetXs,
  backgroundColor: vars.color.bg.panel,
  borderRadius: vars.radius.control,
});

export const tabBadge = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "18px",
  height: "18px",
  padding: `0 ${vars.space.insetXs}`,
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.bg.hover,
  color: vars.color.text.muted,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
});
```

**Step 2: Create tabs.tsx**

```typescript
import * as styles from "./tabs.css";

type TabItem<T extends string> = {
  id: T;
  label: string;
  badge?: number;
};

type TabsProps<T extends string> = {
  items: readonly TabItem<T>[];
  activeId: T;
  onSelect: (id: T) => void;
  variant?: "underline" | "segmented";
  className?: string;
};

export function Tabs<T extends string>({
  items,
  activeId,
  onSelect,
  variant = "underline",
  className,
}: TabsProps<T>) {
  const containerCls = variant === "segmented"
    ? [styles.segmentedContainer, className].filter(Boolean).join(" ")
    : [styles.tabList, className].filter(Boolean).join(" ");

  return (
    <div className={containerCls} role="tablist">
      {items.map((item) => (
        <button
          key={item.id}
          role="tab"
          aria-selected={item.id === activeId}
          className={styles.tabRecipe({
            variant,
            active: item.id === activeId,
          })}
          onClick={() => onSelect(item.id)}
        >
          {item.label}
          {item.badge !== undefined && item.badge > 0 && (
            <span className={styles.tabBadge}>{item.badge}</span>
          )}
        </button>
      ))}
    </div>
  );
}
```

**Step 3: Commit**

```bash
git add apps/web/src/components/tabs.tsx apps/web/src/components/tabs.css.ts
git commit -m "feat: add Tabs component with underline and segmented variants"
```

---

## Phase 4: App Integration

### Task 13: Integrate new shell, remove old layout dependencies

**Files:**
- Modify: `apps/web/src/App.tsx`
- Modify: `apps/web/src/layout/left_rail.tsx`
- Modify: `apps/web/src/layout/left_rail.css.ts`
- Modify: `apps/web/src/layout/right_inspector.tsx`
- Modify: `apps/web/src/layout/right_inspector.css.ts`
- Delete: `apps/web/src/components/status_badge.css.ts` (logic moved to badge.css.ts)
- Delete: `apps/web/src/components/panel.tsx` (replaced by Card)
- Delete: `apps/web/src/components/panel.css.ts`

**Step 1: Update left_rail.css.ts to use new tokens**

Replace all old token paths (`vars.color.surface.*`, `vars.font.family.*`, etc.) with new paths (`vars.color.bg.*`, `vars.font.ui`, etc.). The left rail now becomes a simpler panel content area since the icon rail handles navigation.

```typescript
import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

export const header = style({
  padding: `${vars.space.insetLg} ${vars.space.insetLg} ${vars.space.insetMd}`,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export const content = style({
  flex: 1,
  overflow: "auto",
  padding: vars.space.insetMd,
});
```

**Step 2: Update left_rail.tsx to be a context-sensitive panel**

```typescript
import { ToolCatalog } from "../catalog/tool_catalog";
import { RecipeCatalog } from "../catalog/recipe_catalog";
import { ExtensionList } from "../catalog/extension_list";
import type { NavItemId } from "./icon_rail";
import * as styles from "./left_rail.css";

type SecondaryPanelProps = {
  activeNav: NavItemId;
};

function panelTitle(nav: NavItemId): string {
  const titles: Record<NavItemId, string> = {
    home: "",
    recipes: "Recipes",
    workflows: "Workflows",
    runs: "Runs",
    artifacts: "Artifacts",
    extensions: "Extensions",
    models: "Models",
  };
  return titles[nav];
}

export function SecondaryPanel({ activeNav }: SecondaryPanelProps) {
  const title = panelTitle(activeNav);

  return (
    <div className={styles.container}>
      {title && <div className={styles.header}>{title}</div>}
      <div className={styles.content}>
        {activeNav === "recipes" && <RecipeCatalog />}
        {activeNav === "extensions" && <ExtensionList />}
        {activeNav === "workflows" && <ToolCatalog />}
      </div>
    </div>
  );
}
```

**Step 3: Update right_inspector.css.ts to use new tokens**

```typescript
import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const container = style({
  padding: vars.space.insetXl,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapMd,
});

export const heading = style({
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
});

export const emptyState = style({
  color: vars.color.text.muted,
  fontSize: vars.font.size.body,
  padding: vars.space.insetXl,
  textAlign: "center",
});

export const fieldLabel = style({
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export const fieldValue = style({
  fontSize: vars.font.size.body,
  color: vars.color.text.primary,
  fontFamily: vars.font.code,
});

export const fieldGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});
```

**Step 4: Update right_inspector.tsx to use Badge**

```typescript
import type { WorkflowNode } from "../api/client";
import { Badge } from "../components/badge";
import * as styles from "./right_inspector.css";

type InspectorProps = {
  selectedNode: WorkflowNode | null;
  nodeStatus?: string;
};

function InspectorField({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.fieldGroup}>
      <span className={styles.fieldLabel}>{label}</span>
      <span className={styles.fieldValue}>{value}</span>
    </div>
  );
}

const STATUS_INTENT: Record<string, "neutral" | "info" | "success" | "warning" | "error"> = {
  running: "info",
  completed: "success",
  failed: "error",
  pending: "neutral",
  paused: "warning",
};

export function RightInspector({ selectedNode, nodeStatus }: InspectorProps) {
  if (!selectedNode) {
    return (
      <div className={styles.container}>
        <p className={styles.emptyState}>Select a node to inspect</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{selectedNode.id}</h2>
      {nodeStatus && (
        <Badge
          label={nodeStatus}
          intent={STATUS_INTENT[nodeStatus] ?? "neutral"}
          showDot
        />
      )}
      <InspectorField label="Operator" value={selectedNode.operator} />
      {Object.entries(selectedNode.inputs).map(([key, val]) => (
        <InspectorField key={key} label={key} value={val} />
      ))}
    </div>
  );
}
```

**Step 5: Rewrite App.tsx to wire the new shell**

```typescript
import { useState, useCallback, useEffect } from "react";
import { Shell } from "./layout/shell";
import { TopBar } from "./layout/top_bar";
import { IconRail, type NavItemId } from "./layout/icon_rail";
import { SecondaryPanel } from "./layout/left_rail";
import { RightInspector } from "./layout/right_inspector";
import { Tabs } from "./components/tabs";
import { useEventStream } from "./hooks/use_event_stream";
import {
  fetchWorkflows,
  fetchWorkflow,
  createRun,
  type Workflow,
  type WorkflowNode,
} from "./api/client";

type ViewId = "stage" | "graph" | "trace" | "timeline" | "artifacts";

const VIEW_TABS = [
  { id: "stage" as const, label: "Stage" },
  { id: "graph" as const, label: "Graph" },
  { id: "trace" as const, label: "Trace" },
  { id: "timeline" as const, label: "Timeline" },
  { id: "artifacts" as const, label: "Artifacts" },
] as const;

function latestProgressByNode(
  events: { node_id?: string; status?: string; progress?: number }[],
): Record<string, { status: string; progress: number }> {
  const map: Record<string, { status: string; progress: number }> = {};
  for (const e of events) {
    if (e.node_id && e.status !== undefined) {
      map[e.node_id] = { status: e.status, progress: e.progress ?? 0 };
    }
  }
  return map;
}

export function App() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [activeNav, setActiveNav] = useState<NavItemId>("workflows");
  const [activeView, setActiveView] = useState<ViewId>("stage");
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [_runId, setRunId] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const { events } = useEventStream();
  const nodeProgress = latestProgressByNode(events);

  useEffect(() => {
    fetchWorkflows()
      .then((wfs) => {
        setWorkflows(wfs);
        if (wfs[0]) {
          fetchWorkflow(wfs[0].id).then(setWorkflow);
        }
      })
      .catch(() => {});
  }, []);

  const handleRun = useCallback(() => {
    if (!workflow) return;
    setIsRunning(true);
    createRun(workflow.id)
      .then((run) => setRunId(run.id))
      .catch(() => setIsRunning(false));
  }, [workflow]);

  const handleCancel = useCallback(() => setIsRunning(false), []);
  const handleValidate = useCallback(() => {}, []);

  const showSecondary = activeNav !== "home";
  const showInspector = activeNav === "workflows";

  return (
    <Shell
      topBar={
        <TopBar
          projectName={workflow?.name ?? "Nexus DNN"}
          onRun={handleRun}
          onCancel={handleCancel}
          onValidate={handleValidate}
          isRunning={isRunning}
        />
      }
      iconRail={
        <IconRail activeItem={activeNav} onNavigate={setActiveNav} />
      }
      secondaryPanel={
        <SecondaryPanel activeNav={activeNav} />
      }
      canvas={
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          {activeNav === "workflows" && (
            <div style={{ padding: "8px 16px", borderBottom: "1px solid var(--border-subtle)" }}>
              <Tabs
                items={VIEW_TABS}
                activeId={activeView}
                onSelect={setActiveView}
                variant="segmented"
              />
            </div>
          )}
          <div style={{ flex: 1, overflow: "auto", padding: "16px" }}>
            {activeView === "stage" && <p>Stage view (placeholder)</p>}
            {activeView === "graph" && <p>Graph view (placeholder)</p>}
            {activeView === "trace" && <p>Trace view (placeholder)</p>}
            {activeView === "timeline" && <p>Timeline view (placeholder)</p>}
            {activeView === "artifacts" && <p>Artifact browser (placeholder)</p>}
          </div>
        </div>
      }
      inspector={
        <RightInspector
          selectedNode={selectedNode}
          nodeStatus={selectedNode ? nodeProgress[selectedNode.id]?.status : undefined}
        />
      }
      bottomDrawer={
        <div style={{ padding: "8px 16px" }}>
          <Tabs
            items={[
              { id: "logs", label: "Logs" },
              { id: "events", label: "Events" },
              { id: "problems", label: "Problems", badge: 0 },
              { id: "workers", label: "Workers" },
            ]}
            activeId="logs"
            onSelect={() => {}}
            variant="underline"
          />
        </div>
      }
      secondaryPanelVisible={showSecondary}
      inspectorVisible={showInspector}
      bottomDrawerVisible={false}
    />
  );
}
```

**Step 6: Delete old files**

```bash
rm apps/web/src/components/panel.tsx apps/web/src/components/panel.css.ts apps/web/src/components/status_badge.css.ts
```

**Step 7: Verify full build**

Run: `cd apps/web && npx tsc --noEmit && npx vite build`
Expected: PASS — all token references resolved, all components use new contract.

If catalog components (tool_catalog, recipe_catalog, extension_list) reference old tokens or old panel/status_badge imports, update those imports to Card and Badge respectively.

**Step 8: Commit**

```bash
git add -A apps/web/src/
git commit -m "feat: integrate new shell layout and migrate all components to design system tokens"
```

---

## Phase 5: Build Verification and Cleanup

### Task 14: Full build, lint, and visual smoke test

**Step 1: Run TypeScript check**

Run: `cd apps/web && npx tsc --noEmit`
Expected: PASS with 0 errors.

**Step 2: Run Vite build**

Run: `cd apps/web && npx vite build`
Expected: PASS, outputs to dist/.

**Step 3: Visual smoke test**

Run: `cd apps/web && npx vite preview`
Expected: Dark-themed app loads with navy-blue palette, icon rail on left, command palette trigger centered in top bar, Run button in blue.

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: verify design system build and clean up unused files"
```

---

## Deferred to Follow-Up Plans

The following are specified in `docs/plans/2026-04-12-design-system.md` but not yet implemented:

1. **View implementations**: Dashboard, Recipe, Stage, Graph, Trace, Timeline views with full functionality
2. **Graph editor components**: Custom node/edge components, operator library panel, minimap styling
3. **Remaining components**: Toggle, Slider, TextArea, Tooltip, Modal, Command Palette, Toast, Skeleton, Empty State, Divider, Breadcrumb, Avatar, Progress Bar, Meter
4. **Bottom drawer**: Full implementation with tab content (Logs, Events, Problems, Workers, Protocol, Performance)
5. **Density mode switching**: Comfortable theme variant
6. **Motion system**: Keyframe animations (pulse, glow, edge flow)
7. **Extension theming**: --nx-* CSS custom property exposition
8. **Font loading**: Geist and JetBrains Mono web font integration
9. **Accessibility**: Screen reader testing, alternative graph list view, keyboard shortcut system
