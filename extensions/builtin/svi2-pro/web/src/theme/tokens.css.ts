import { createGlobalTheme, globalStyle } from "@vanilla-extract/css";

export const vars = createGlobalTheme("svi2-pro-app", {
  color: {
    surface: "var(--surface, #0c0e10)",
    surfaceMuted: "var(--surface-low, #111416)",
    surfaceRaised: "var(--surface-default, #171a1c)",
    surfaceHigh: "var(--surface-high, #1d2023)",
    surfaceHighest: "var(--surface-highest, #232629)",
    surfaceGlass: "rgba(29, 32, 35, 0.72)",
    canvas: "var(--surface, #0a0c0e)",
    text: "var(--on-surface, #f0f0f3)",
    textMuted: "var(--on-surface-variant, #aaabae)",
    textFaint: "var(--outline, #747578)",
    accent: "var(--accent, #ba9eff)",
    accentDim: "var(--accent-dim, #8455ef)",
    accentMuted: "var(--accent-dim, #8455ef)",
    accentOn: "var(--on-primary, #39008c)",
    accentGlow: "var(--accent-glow, rgba(132, 85, 239, 0.45))",
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
    subtle: "var(--shadow-sm, 0 4px 16px rgba(0, 0, 0, 0.32))",
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

globalStyle('svi2-pro-app[data-accent="primary"], svi2-pro-app:not([data-accent])', {
  vars: {
    "--accent": "#ba9eff",
    "--accent-dim": "#8455ef",
    "--accent-glow": "rgba(132, 85, 239, 0.27)",
  },
});
globalStyle('svi2-pro-app[data-accent="secondary"]', {
  vars: {
    "--accent": "#9093ff",
    "--accent-dim": "#6063ee",
    "--accent-glow": "rgba(96, 99, 238, 0.32)",
  },
});
globalStyle('svi2-pro-app[data-accent="tertiary"]', {
  vars: {
    "--accent": "#ff8439",
    "--accent-dim": "#fd761a",
    "--accent-glow": "rgba(253, 118, 26, 0.28)",
  },
});

globalStyle('svi2-pro-app[data-density="compact"]', {
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
  },
});
globalStyle('svi2-pro-app[data-density="cozy"], svi2-pro-app:not([data-density])', {
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
  },
});
globalStyle('svi2-pro-app[data-density="spacious"]', {
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
  },
});

globalStyle("svi2-pro-app", {
  display: "block",
  minHeight: "100%",
  background: vars.color.surface,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  lineHeight: 1.5,
});

globalStyle("svi2-pro-app *, svi2-pro-app *::before, svi2-pro-app *::after", {
  boxSizing: "border-box",
});

globalStyle("svi2-pro-app ::selection", {
  background: `color-mix(in oklab, ${vars.color.accent} 38%, transparent)`,
  color: vars.color.text,
});

globalStyle("svi2-pro-app code, svi2-pro-app pre", {
  fontFamily: vars.font.mono,
});

globalStyle(
  [
    "svi2-pro-app button:focus-visible",
    "svi2-pro-app a:focus-visible",
    "svi2-pro-app input:focus-visible",
    "svi2-pro-app textarea:focus-visible",
    "svi2-pro-app select:focus-visible",
    "svi2-pro-app [tabindex]:focus-visible",
  ].join(", "),
  {
    outline: "none",
    boxShadow: `${vars.shadow.focusRing}, ${vars.shadow.glow}`,
  },
);

globalStyle("svi2-pro-app *, svi2-pro-app *::before, svi2-pro-app *::after", {
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animationName: "none",
      animationDuration: "0.01ms",
      animationIterationCount: 1,
      transitionDuration: "0.01ms",
      scrollBehavior: "auto",
    },
  },
});

globalStyle("svi2-pro-app *", {
  scrollbarWidth: "thin",
  scrollbarColor: `${vars.color.borderGhost} transparent`,
});

globalStyle("svi2-pro-app *::-webkit-scrollbar", {
  width: "10px",
  height: "10px",
});

globalStyle("svi2-pro-app *::-webkit-scrollbar-track", {
  background: "transparent",
});

globalStyle("svi2-pro-app *::-webkit-scrollbar-thumb", {
  background: vars.color.borderGhost,
  borderRadius: vars.radius.pill,
  border: "2px solid transparent",
  backgroundClip: "padding-box",
  transition: `background ${vars.motion.fast}`,
});

globalStyle("svi2-pro-app *::-webkit-scrollbar-thumb:hover", {
  background: "color-mix(in oklab, var(--outline-variant, #46484a) 100%, transparent)",
  backgroundClip: "padding-box",
});

globalStyle("svi2-pro-app *::-webkit-scrollbar-thumb:active", {
  background: vars.color.accent,
  backgroundClip: "padding-box",
});
