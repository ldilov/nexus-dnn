import { createGlobalTheme, globalStyle } from "@vanilla-extract/css";

// Spec 037 / T060 — Spectral Graphite token bridge for the emotion-tts
// custom element.
//
// Per FR-040 and research R13 the extension is custom-element scoped — its
// CSS variables are declared on `emotion-tts-app` (NOT on `:root`), so the
// host's tokens cannot leak in and our tokens cannot leak out. The variable
// NAMES match the production Spectral Graphite contract
// (`specs/037-spectral-graphite-redesign/contracts/tokens.contract.md`)
// so live tweaks (`data-accent` / `data-density` / `data-card`) propagated
// from the host body via T061's MutationObserver re-bind the same names
// inside the extension and visually re-skin without code changes.
//
// The `vars.X.Y` JS object shape (consumed by every `*.css.ts` in this
// subtree) is preserved verbatim — only the underlying CSS-var names and
// fallback values change.

export const vars = createGlobalTheme("emotion-tts-app", {
  color: {
    // Surface tiers
    surface: "var(--surface, #0c0e10)",
    surfaceMuted: "var(--surface-low, #111416)",
    surfaceRaised: "var(--surface-default, #171a1c)",
    surfaceHigh: "var(--surface-high, #1d2023)",
    surfaceHighest: "var(--surface-highest, #232629)",
    surfaceGlass: "rgba(29, 32, 35, 0.72)",
    // Foreground
    text: "var(--on-surface, #f0f0f3)",
    textMuted: "var(--on-surface-variant, #aaabae)",
    textFaint: "var(--outline, #747578)",
    // Accents — `accent` resolves through the data-accent indirection so
    // toggling the host tweak panel re-skins the extension live (FR-009a).
    accent: "var(--accent, #ba9eff)",
    accentDim: "var(--accent-dim, #8455ef)",
    accentMuted: "var(--accent-dim, #8455ef)",
    accentOn: "var(--on-primary, #39008c)",
    accentGlow: "var(--accent-glow, 0 0 16px rgba(132, 85, 239, 0.45))",
    secondary: "var(--secondary, #9093ff)",
    tertiary: "var(--tertiary, #ff8439)",
    danger: "var(--error, #ff6e84)",
    success: "var(--acid-green, #22c55e)",
    warning: "var(--tertiary, #ff8439)",
    borderGhost:
      "color-mix(in oklab, var(--outline-variant, #46484a) 85%, transparent)",
    borderSubtle:
      "color-mix(in oklab, var(--outline-variant, #46484a) 50%, transparent)",
  },
  font: {
    display: `var(--font-ui, "Inter", system-ui, -apple-system, sans-serif)`,
    body: `var(--font-ui, "Inter", system-ui, -apple-system, sans-serif)`,
    mono: `var(--font-mono, "JetBrains Mono", ui-monospace, monospace)`,
  },
  text: {
    micro: "0.6875rem",
    caption: "0.75rem",
    body: "0.9375rem",
    subhead: "1.0625rem",
    head: "1.5rem",
    display: "2.5rem",
  },
  tracking: {
    display: "var(--tracking-tight, -0.02em)",
    body: "0",
    label: "var(--tracking-widest, 0.18em)",
  },
  space: {
    xs: "var(--d-1, 4px)",
    sm: "var(--d-2, 8px)",
    md: "var(--d-3, 12px)",
    lg: "var(--d-4, 16px)",
    xl: "var(--d-6, 24px)",
    section: "var(--d-8, 44px)",
  },
  radius: {
    sm: "var(--r-sm, 6px)",
    md: "var(--r-md, 10px)",
    lg: "var(--r-lg, 14px)",
    pill: "var(--r-pill, 999px)",
  },
  shadow: {
    subtle: "0 1px 2px rgba(0, 0, 0, 0.3)",
    raised: "var(--shadow-md, 0 12px 32px rgba(0, 0, 0, 0.4))",
    glow: "var(--glow-accent, 0 0 24px rgba(132, 85, 239, 0.28))",
    focusRing: "0 0 0 2px var(--accent-glow, rgba(132, 85, 239, 0.55))",
  },
  motion: {
    fast: "160ms cubic-bezier(0.2, 0, 0, 1)",
    normal: "240ms cubic-bezier(0.16, 1, 0.3, 1)",
    slow: "360ms cubic-bezier(0.16, 1, 0.3, 1)",
  },
});

// ─── Live tweak propagation ───────────────────────────────────────────────
// T061 mirrors the host's `body[data-*]` onto our `emotion-tts-app` element
// so the same selectors here re-bind tokens inside the extension. The
// fallbacks below match the production Spectral Graphite values when the
// host happens to be a different page (e.g. running the bundle in isolation
// for the visual baseline test).

// Accent indirection — the three values must match the production
// `apps/web/src/styles/tokens.css` accent block bytes-for-bytes so a tweak
// to the host re-renders identically here.
globalStyle('emotion-tts-app[data-accent="primary"], emotion-tts-app:not([data-accent])', {
  vars: {
    "--accent": "#ba9eff",
    "--accent-dim": "#8455ef",
    "--accent-glow": "color-mix(in oklch, #ba9eff 28%, transparent)",
  },
});
globalStyle('emotion-tts-app[data-accent="secondary"]', {
  vars: {
    "--accent": "#9093ff",
    "--accent-dim": "#6063ee",
    "--accent-glow": "color-mix(in oklch, #9093ff 28%, transparent)",
  },
});
globalStyle('emotion-tts-app[data-accent="tertiary"]', {
  vars: {
    "--accent": "#ff8439",
    "--accent-dim": "#fd761a",
    "--accent-glow": "color-mix(in oklch, #ff8439 28%, transparent)",
  },
});

// Density indirection — three modes per FR-009 / contract §3.
globalStyle('emotion-tts-app[data-density="compact"]', {
  vars: {
    "--d-1": "2px",
    "--d-2": "6px",
    "--d-3": "8px",
    "--d-4": "12px",
    "--d-5": "14px",
    "--d-6": "16px",
    "--d-7": "22px",
    "--d-8": "32px",
    "--d-9": "48px",
    "--pad-card": "16px",
    "--pad-section": "22px",
    "--row-h": "44px",
    "--gap-card": "10px",
  },
});
globalStyle('emotion-tts-app[data-density="cozy"], emotion-tts-app:not([data-density])', {
  vars: {
    "--d-1": "4px",
    "--d-2": "8px",
    "--d-3": "12px",
    "--d-4": "16px",
    "--d-5": "20px",
    "--d-6": "24px",
    "--d-7": "32px",
    "--d-8": "44px",
    "--d-9": "64px",
    "--pad-card": "22px",
    "--pad-section": "28px",
    "--row-h": "52px",
    "--gap-card": "14px",
  },
});
globalStyle('emotion-tts-app[data-density="spacious"]', {
  vars: {
    "--d-1": "6px",
    "--d-2": "10px",
    "--d-3": "16px",
    "--d-4": "22px",
    "--d-5": "28px",
    "--d-6": "36px",
    "--d-7": "48px",
    "--d-8": "64px",
    "--d-9": "96px",
    "--pad-card": "32px",
    "--pad-section": "44px",
    "--row-h": "64px",
    "--gap-card": "20px",
  },
});

globalStyle("emotion-tts-app", {
  display: "block",
  minHeight: "100%",
  background: vars.color.surface,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  lineHeight: 1.5,
});

globalStyle("emotion-tts-app *, emotion-tts-app *::before, emotion-tts-app *::after", {
  boxSizing: "border-box",
});

globalStyle("emotion-tts-app code, emotion-tts-app pre", {
  fontFamily: vars.font.mono,
});

// Accessibility: keyboard-only focus ring honours the Spectral Graphite
// no-borders aesthetic by using a spectral glow instead of a flat outline.
globalStyle(
  [
    "emotion-tts-app button:focus-visible",
    "emotion-tts-app a:focus-visible",
    "emotion-tts-app input:focus-visible",
    "emotion-tts-app textarea:focus-visible",
    "emotion-tts-app select:focus-visible",
    "emotion-tts-app [tabindex]:focus-visible",
  ].join(", "),
  {
    outline: "none",
    boxShadow: `${vars.shadow.focusRing}, ${vars.shadow.glow}`,
  },
);

// Respect prefers-reduced-motion — strip animations to near-instant so the
// editorial cascades don't become a barrier.
globalStyle("emotion-tts-app *", {
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animationDuration: "0.01ms",
      animationIterationCount: 1,
      transitionDuration: "0.01ms",
    },
  },
});
