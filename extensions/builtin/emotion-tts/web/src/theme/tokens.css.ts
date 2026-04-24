import { createGlobalTheme, globalStyle } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    surface: "var(--color-surface, #0c0e10)",
    surfaceMuted: "var(--color-surface-container-low, #111416)",
    surfaceRaised: "var(--color-surface-container, #171a1c)",
    surfaceHigh: "var(--color-surface-container-high, #1d2023)",
    surfaceHighest: "var(--color-surface-container-highest, #232629)",
    surfaceGlass: "rgba(29, 32, 35, 0.72)",
    text: "var(--color-on-surface, #f0f0f3)",
    textMuted: "var(--color-on-surface-variant, #aaabae)",
    textFaint: "var(--color-outline, #747578)",
    accent: "var(--color-primary, #ba9eff)",
    accentDim: "var(--color-primary-dim, #8455ef)",
    accentMuted: "var(--color-primary-dim, #8455ef)",
    accentOn: "var(--color-on-primary, #2b006e)",
    accentGlow: "0 0 16px rgba(132, 85, 239, 0.45)",
    secondary: "var(--color-secondary, #9093ff)",
    tertiary: "var(--color-tertiary, #ff8439)",
    danger: "var(--color-error, #ff6e84)",
    success: "var(--color-acid-green, #22c55e)",
    warning: "var(--color-tertiary, #ff8439)",
    borderGhost: "color-mix(in oklab, var(--color-outline-variant, #46484a) 85%, transparent)",
    borderSubtle: "color-mix(in oklab, var(--color-outline-variant, #46484a) 50%, transparent)",
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
    display: "-0.02em",
    body: "0",
    label: "0.08em",
  },
  space: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2.5rem",
    section: "4rem",
  },
  radius: {
    sm: "6px",
    md: "12px",
    lg: "20px",
    pill: "999px",
  },
  shadow: {
    subtle: "0 1px 2px rgba(0, 0, 0, 0.3)",
    raised: "0 12px 32px rgba(0, 0, 0, 0.4)",
    glow: "0 0 24px rgba(132, 85, 239, 0.28)",
  },
  motion: {
    fast: "var(--motion-card-hover-lift, 160ms) cubic-bezier(0.2, 0, 0, 1)",
    normal: "var(--motion-drawer-slide, 240ms) cubic-bezier(0.16, 1, 0.3, 1)",
    slow: "360ms cubic-bezier(0.16, 1, 0.3, 1)",
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
