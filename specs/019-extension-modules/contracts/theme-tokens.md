# Contract: Spectral Graphite Theme Tokens

**Feature**: 019-extension-modules
**Status**: Draft (Phase 1)
**Spec ref**: FR-035..FR-041, FR-TP04, SC-007, SC-022

## 1. Single source of truth

```
apps/web/src/styles/
├── theme.css.ts          # vanilla-extract, authoritative
├── tokens.css            # CSS custom properties (mirrored at build time from theme.css.ts)
├── typography.css.ts     # Inter + JBM + Material Symbols @font-face
├── elevation.css.ts      # ghost-border + glass-panel + primary-dim glow
└── motion.css.ts         # duration + easing budgets (FR-041)
```

No component file (`apps/web/src/**/*.{tsx,ts,css.ts,css}` excluding `styles/`) may contain a hex color literal, `rgb(`, `hsl(`, `oklch(`, a raw `Inter` / `JetBrains Mono` font-family string, or a raw duration literal (`200ms`, `0.2s`). CI-gated by `apps/web/scripts/scan-theme-leaks.mjs` (SC-007).

## 2. Color palette (FR-036)

Tokens in `theme.css.ts`:

```ts
// Accent palette — semantic
vars.color.primary           = "#ba9eff"
vars.color.primaryDim        = "#8455ef"
vars.color.onPrimary         = "#39008c"
vars.color.primaryContainer  = "#ae8dff"
vars.color.onPrimaryContainer= "#2b006e"

vars.color.secondary         = "#9093ff"
vars.color.secondaryDim      = "#6063ee"
vars.color.onSecondary       = "#080079"
vars.color.secondaryContainer= "#2f2ebe"
vars.color.onSecondaryContainer = "#ccccff"

vars.color.tertiary          = "#ff8439"
vars.color.tertiaryDim       = "#fd761a"
vars.color.onTertiary        = "#471a00"
vars.color.tertiaryContainer = "#f77113"
vars.color.onTertiaryContainer = "#321000"

vars.color.acidGreen         = "#22C55E"
vars.color.error             = "#ff6e84"
vars.color.errorDim          = "#d73357"
vars.color.onError           = "#490013"
vars.color.errorContainer    = "#a70138"
vars.color.onErrorContainer  = "#ffb2b9"

// Neutral foundation — graphite tiers
vars.color.surface                 = "#0c0e10"
vars.color.surfaceContainerLowest  = "#000000"
vars.color.surfaceContainerLow     = "#111416"
vars.color.surfaceContainer        = "#171a1c"
vars.color.surfaceContainerHigh    = "#1d2023"
vars.color.surfaceContainerHighest = "#232629"
vars.color.surfaceBright           = "#292c30"
vars.color.surfaceDim              = "#0c0e10"
vars.color.surfaceTint             = "#ba9eff"

vars.color.onSurface         = "#f0f0f3"
vars.color.onSurfaceVariant  = "#aaabae"
vars.color.outline           = "#747578"
vars.color.outlineVariant    = "#46484a"

vars.color.inverseSurface    = "#f9f9fc"
vars.color.inverseOnSurface  = "#535558"
vars.color.inversePrimary    = "#6e3bd7"
```

**Ghost-border utility**: `outline-variant` at 15 % opacity, rendered via `border: 1px solid rgba(116, 117, 120, 0.15)` composed from the token — NOT a raw hex in the component.

## 3. Typography (FR-037)

```ts
vars.font.ui      = `'Inter', system-ui, -apple-system, sans-serif`
vars.font.mono    = `'JetBrains Mono', ui-monospace, monospace`
vars.font.symbols = `'Material Symbols Outlined'`

// Tracking
vars.tracking.tight     = "-0.02em"  // headlines
vars.tracking.normal    = "0"
vars.tracking.wide      = "+0.05em"  // uppercase labels
vars.tracking.widest    = "+0.2em"   // category headers
```

Rule enforcement: every JSX that renders an alphanumeric *value* (ID, hash, timestamp, metric, coordinate) uses `font-family: vars.font.mono`; every UI label / headline uses `vars.font.ui`. `scan-theme-leaks.mjs` greps for `font-family:` literal strings and fails on any non-token reference.

## 4. Elevation (FR-038)

No 1 px solid border for layout sectioning. Use tonal layer changes:

```ts
// composition in components:
Surface > surfaceContainerLow  // card on base
surface > surfaceContainerLow > surfaceContainerHigh  // hovered card
```

Ghost-border utility (data tables only):

```ts
export const ghostBorder = style({
  border: `1px solid ${vars.color.outlineVariant}26`,  // 26 hex = 15% alpha
});
```

Primary-dim glow (active/LED effect) — FR-040:

```ts
export const primaryDimGlow = style({
  boxShadow: `0 0 12px 0 ${vars.color.primaryDim}44`,  // 44 hex = ~27% alpha
});
```

`prefers-reduced-motion` block:

```ts
"@media": {
  "(prefers-reduced-motion: reduce)": {
    boxShadow: "none",
  },
},
```

## 5. Glass panel (FR-039)

```ts
export const glassPanel = style({
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  background: `${vars.color.surfaceContainerHigh}cc`,   // cc = 80% alpha
});
```

Consumer: Install drawer, revision picker popover, command palette (future).

## 6. Motion budgets (FR-041, SC-022)

```ts
// apps/web/src/styles/motion.css.ts
export const motion = {
  cardHoverLift:         "160ms",
  cardGlow:              "200ms",
  focusRing:             "120ms",
  tabCrossfade:          "200ms",
  sidebarSettle:         "200ms",
  drawerSlide:           "240ms",
  optimisticInsert:      "200ms",
  statusDotPulseCycle:   "1500ms",
  viewingBannerEntrance: "160ms",
  ease: {
    out:    "cubic-bezier(0.16, 1, 0.3, 1)",
    outExpo:"cubic-bezier(0.16, 1, 0.3, 1)",
  },
};
```

Mirrored as CSS custom properties in `tokens.css`:

```css
:root {
  --motion-card-hover-lift: 160ms;
  --motion-card-glow: 200ms;
  /* … */
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --motion-card-hover-lift: 0s;
    --motion-card-glow: 0s;
    --motion-focus-ring: 0s;
    --motion-tab-crossfade: 0s;
    --motion-sidebar-settle: 0s;
    --motion-drawer-slide: 0s;
    --motion-optimistic-insert: 0s;
    --motion-status-dot-pulse-cycle: 999999s;  /* effectively off */
    --motion-viewing-banner-entrance: 0s;
  }
}
```

SC-022 Playwright test reads these custom properties via `getComputedStyle(document.documentElement)` and asserts the `reduce` variant returns 0s for every key.

## 7. Self-hosted fonts (FR-TP04)

```css
/* apps/web/src/styles/typography.css.ts @font-face declarations */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/jetbrains-mono.woff2') format('woff2-variations');
  font-weight: 100 800;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: 'Material Symbols Outlined';
  src: url('/fonts/material-symbols-outlined.woff2') format('woff2-variations');
  font-weight: 100 700;
  font-display: block;
  font-style: normal;
}
```

**Build-time**: `apps/web/vite.config.ts` is unchanged; static assets under `public/fonts/` ship as-is. License files under `apps/web/public/fonts/LICENSES.txt`. `apps/web/scripts/scan-remote-cdns.mjs` verifies no `dist/**/*.{js,css,html}` references `fonts.googleapis.com`, `fonts.gstatic.com`, or any other remote origin.

## 8. Theme-leak CI scanner (SC-007)

```js
// apps/web/scripts/scan-theme-leaks.mjs — sketch
import fg from "fast-glob";
import fs from "node:fs";

const RE = {
  hex:    /#[0-9A-Fa-f]{3,8}\b/g,
  rgb:    /\brgb\s*\(/g,
  hsl:    /\bhsl\s*\(/g,
  oklch:  /\boklch\s*\(/g,
  font:   /'Inter'|'JetBrains Mono'/g,
  duration: /\b\d+(ms|s)\b(?!\s*\*)/g,
};

const EXCLUDE = ["apps/web/src/styles/**/*"];

const files = await fg(["apps/web/src/**/*.{tsx,ts,css.ts,css}"], { ignore: EXCLUDE });
let failures = [];
for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  for (const [name, re] of Object.entries(RE)) {
    const m = src.match(re);
    if (m) failures.push({ file: f, rule: name, samples: m.slice(0, 3) });
  }
}
if (failures.length) {
  console.error("theme-leak scan failed:", JSON.stringify(failures, null, 2));
  process.exit(1);
}
```

Runs as part of `pnpm build` and as a GitHub Action pre-merge step.

## 9. Accessibility audits (SC-008)

Automated axe-core scan wired via `tests/e2e/a11y_axe.spec.ts`:

```ts
test.each([
  "/modules",
  "/modules/ext:chatllm",
  "/modules/ext:chatllm/blueprint",
  "/deployments/dpl_fixture_1",
])("no serious/critical a11y violations on %s", async ({ page }, route) => {
  await page.goto(`http://localhost:5173/#${route}`);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(v => ["serious", "critical"].includes(v.impact))).toEqual([]);
});
```

## 10. Terminology-compliance CI gate (SC-014)

Parallel scanner at `apps/web/scripts/scan-terminology.mjs`:

- Grep all JSX text children and `aria-label`/`title`/`alt` attribute values for the word "Deployment"/"deployment" (case-insensitive whole-word match).
- Exclude: type-annotation files (`*.d.ts`), API-client type definitions, test fixtures, e2e specs whose purpose is to assert on API payloads.
- Failing file list is printed with file:line:column and the offending substring.

Pre-existing allowed usage (e.g. the current `DeploymentsView` label on the sidebar's "Deployments" item) must be transitioned — the sidebar label itself remains "Deployments" because it is the canonical page name; this is a specific carve-out documented in the scanner config.

## 11. Summary

One vanilla-extract source, one CSS custom-property mirror, two CI gates (theme-leak + terminology). No component ever imports raw values. Accessibility and reduced-motion are first-class concerns with explicit failing-gate coverage.
