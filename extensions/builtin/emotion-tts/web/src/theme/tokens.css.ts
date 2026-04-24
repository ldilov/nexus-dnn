import { createGlobalTheme, globalStyle } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    surface: "#0c0e10",
    surfaceMuted: "#111416",
    surfaceRaised: "#171a1c",
    surfaceHigh: "#1d2023",
    surfaceHighest: "#232629",
    surfaceGlass: "rgba(29, 32, 35, 0.72)",
    text: "#f0f0f3",
    textMuted: "#aaabae",
    textFaint: "#747578",
    accent: "#ba9eff",
    accentDim: "#8455ef",
    accentMuted: "#8455ef",
    accentOn: "#2b006e",
    accentGlow: "0 0 16px rgba(132, 85, 239, 0.45)",
    secondary: "#9093ff",
    tertiary: "#ff8439",
    danger: "#ff6e84",
    success: "#22c55e",
    warning: "#ff8439",
    borderGhost: "rgba(70, 72, 74, 0.45)",
    borderSubtle: "rgba(70, 72, 74, 0.25)",
  },
  font: {
    display: `"Inter Display", "Inter", system-ui, -apple-system, sans-serif`,
    body: `"Inter", system-ui, -apple-system, sans-serif`,
    mono: `"JetBrains Mono", ui-monospace, monospace`,
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
    fast: "160ms cubic-bezier(0.2, 0, 0, 1)",
    normal: "240ms cubic-bezier(0.16, 1, 0.3, 1)",
    slow: "360ms cubic-bezier(0.16, 1, 0.3, 1)",
  },
});

globalStyle(":root", {
  colorScheme: "dark",
  background: vars.color.surface,
  color: vars.color.text,
});

globalStyle("body", {
  margin: 0,
  background: vars.color.surface,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  lineHeight: 1.5,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("code, pre", {
  fontFamily: vars.font.mono,
});

globalStyle("a", {
  color: vars.color.accent,
  textDecoration: "none",
});

globalStyle("a:hover", {
  textDecoration: "underline",
  textDecorationColor: vars.color.accentDim,
});

globalStyle("::selection", {
  background: vars.color.accentDim,
  color: vars.color.text,
});

globalStyle("::-webkit-scrollbar", {
  width: "10px",
  height: "10px",
});
globalStyle("::-webkit-scrollbar-track", {
  background: vars.color.surface,
});
globalStyle("::-webkit-scrollbar-thumb", {
  background: vars.color.surfaceHighest,
  borderRadius: "999px",
  border: `2px solid ${vars.color.surface}`,
});
globalStyle("::-webkit-scrollbar-thumb:hover", {
  background: vars.color.accentDim,
});
