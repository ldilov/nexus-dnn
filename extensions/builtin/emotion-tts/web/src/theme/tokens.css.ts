import { createGlobalTheme, createTheme } from "@vanilla-extract/css";

export const [themeClass, vars] = createTheme({
  color: {
    surface: "oklch(98% 0.005 250)",
    surfaceMuted: "oklch(96% 0.01 250)",
    surfaceRaised: "oklch(100% 0 0)",
    text: "oklch(20% 0.02 260)",
    textMuted: "oklch(45% 0.02 260)",
    accent: "oklch(62% 0.22 265)",
    accentMuted: "oklch(68% 0.15 265)",
    danger: "oklch(58% 0.21 22)",
    success: "oklch(62% 0.18 145)",
    warning: "oklch(70% 0.15 75)",
    borderSubtle: "oklch(90% 0.01 250)",
  },
  font: {
    display: `"Inter Display", "Inter", system-ui, sans-serif`,
    body: `"Inter", system-ui, sans-serif`,
    mono: `"JetBrains Mono", ui-monospace, monospace`,
  },
  text: {
    caption: "0.75rem",
    body: "0.95rem",
    subhead: "1.05rem",
    head: "1.5rem",
    display: "2.5rem",
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
  },
  shadow: {
    subtle: "0 1px 2px oklch(0% 0 0 / 0.06)",
    raised: "0 8px 24px oklch(0% 0 0 / 0.08)",
  },
  motion: {
    fast: "150ms cubic-bezier(0.2, 0, 0.2, 1)",
    normal: "300ms cubic-bezier(0.16, 1, 0.3, 1)",
  },
});

createGlobalTheme(":root", vars, vars as unknown as Parameters<typeof createGlobalTheme>[2]);
