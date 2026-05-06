import { createGlobalTheme, globalStyle } from "@vanilla-extract/css";

export const vars = createGlobalTheme("emotion-tts-app", {
  color: {
    surface: "var(--surface, #0c0e10)",
    surfaceMuted: "var(--surface-low, #111416)",
    surfaceRaised: "var(--surface-default, #171a1c)",
    surfaceHigh: "var(--surface-high, #1d2023)",
    surfaceHighest: "var(--surface-highest, #232629)",
    surfaceGlass: "rgba(29, 32, 35, 0.72)",
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

globalStyle('emotion-tts-app[data-accent="primary"], emotion-tts-app:not([data-accent])', {
  vars: {
    "--accent": "#ba9eff",
    "--accent-dim": "#8455ef",
    "--accent-glow": "rgba(132, 85, 239, 0.27)",
  },
});
globalStyle('emotion-tts-app[data-accent="secondary"]', {
  vars: {
    "--accent": "#9093ff",
    "--accent-dim": "#6063ee",
    "--accent-glow": "rgba(96, 99, 238, 0.32)",
  },
});
globalStyle('emotion-tts-app[data-accent="tertiary"]', {
  vars: {
    "--accent": "#ff8439",
    "--accent-dim": "#fd761a",
    "--accent-glow": "rgba(253, 118, 26, 0.28)",
  },
});

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

globalStyle('emotion-tts-app[data-card="flat"], emotion-tts-app:not([data-card])', {
  vars: {
    "--card-bg": "var(--surface-low, #111416)",
    "--card-border": "none",
    "--card-shadow": "none",
    "--card-backdrop": "none",
  },
});
globalStyle('emotion-tts-app[data-card="glass"]', {
  vars: {
    "--card-bg": "rgba(29, 32, 35, 0.62)",
    "--card-border": "1px solid rgba(186, 158, 255, 0.08)",
    "--card-shadow": "var(--shadow-sm, 0 4px 16px rgba(0, 0, 0, 0.32))",
    "--card-backdrop": "blur(20px) saturate(1.2)",
  },
});
globalStyle('emotion-tts-app[data-card="elevated"]', {
  vars: {
    "--card-bg": "var(--surface-high, #1d2023)",
    "--card-border": "1px solid rgba(70, 72, 74, 0.22)",
    "--card-shadow": "var(--shadow-md, 0 12px 32px rgba(0, 0, 0, 0.4))",
    "--card-backdrop": "none",
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

globalStyle("emotion-tts-app ::selection", {
  background: `color-mix(in oklab, ${vars.color.accent} 38%, transparent)`,
  color: vars.color.text,
});

globalStyle("emotion-tts-app code, emotion-tts-app pre", {
  fontFamily: vars.font.mono,
});

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

globalStyle("emotion-tts-app *", {
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animationDuration: "0.01ms",
      animationIterationCount: 1,
      transitionDuration: "0.01ms",
    },
  },
});

/* Scrollbars — mirror the host's contract so the look stays consistent
 * when the user crosses from host shell into the extension surface. */
globalStyle("emotion-tts-app *", {
  scrollbarWidth: "thin",
  scrollbarColor: `${vars.color.borderGhost} transparent`,
});

globalStyle("emotion-tts-app *::-webkit-scrollbar", {
  // audit-allow: px — scrollbar dimensions are intentionally fixed
  width: "10px",
  // audit-allow: px — scrollbar dimensions are intentionally fixed
  height: "10px",
});

globalStyle("emotion-tts-app *::-webkit-scrollbar-track", {
  background: "transparent",
});

globalStyle("emotion-tts-app *::-webkit-scrollbar-thumb", {
  background: vars.color.borderGhost,
  borderRadius: vars.radius.pill,
  // audit-allow: px — inset padding to float the thumb inside the track
  border: "2px solid transparent",
  backgroundClip: "padding-box",
  transition: `background ${vars.motion.fast}`,
});

globalStyle("emotion-tts-app *::-webkit-scrollbar-thumb:hover", {
  background: `color-mix(in oklab, var(--outline-variant, #46484a) 100%, transparent)`,
  backgroundClip: "padding-box",
});

globalStyle("emotion-tts-app *::-webkit-scrollbar-thumb:active", {
  background: vars.color.accent,
  backgroundClip: "padding-box",
});

globalStyle("emotion-tts-app *::-webkit-scrollbar-corner", {
  background: "transparent",
});
