// audit-allow: hex — design token palette definitions (this IS the token source)
// audit-allow: px — fixed UX hit-target, not density-coupled
import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    // audit-allow: hex — hex — neon decorative palette per design lang
    primary: "#ba9eff",
    // audit-allow: hex — hex — neon decorative palette per design lang
    primaryDim: "#8455ef",
    // audit-allow: hex — hex — neon decorative palette per design lang
    onPrimary: "#39008c",
    // audit-allow: hex — hex — neon decorative palette per design lang
    primaryContainer: "#ae8dff",
    // audit-allow: hex — hex — neon decorative palette per design lang
    onPrimaryContainer: "#2b006e",
    // audit-allow: hex — hex — neon decorative palette per design lang
    primaryFixed: "#ae8dff",
    // audit-allow: hex — hex — neon decorative palette per design lang
    primaryFixedDim: "#a27cff",
    // audit-allow: hex — hex — pure-black contrast anchor
    onPrimaryFixed: "#000000",
    // audit-allow: hex — hex — neon decorative palette per design lang
    onPrimaryFixedVariant: "#370086",

    // audit-allow: hex — hex — neon decorative palette per design lang
    secondary: "#9093ff",
    // audit-allow: hex — hex — neon decorative palette per design lang
    secondaryDim: "#6063ee",
    // audit-allow: hex — hex — neon decorative palette per design lang
    onSecondary: "#080079",
    // audit-allow: hex — hex — neon decorative palette per design lang
    secondaryContainer: "#2f2ebe",
    // audit-allow: hex — hex — neon decorative palette per design lang
    onSecondaryContainer: "#ccccff",
    // audit-allow: hex — hex — neon decorative palette per design lang
    secondaryFixed: "#cdcdff",
    // audit-allow: hex — hex — neon decorative palette per design lang
    secondaryFixedDim: "#bdbeff",
    // audit-allow: hex — hex — neon decorative palette per design lang
    onSecondaryFixed: "#160bae",
    // audit-allow: hex — hex — neon decorative palette per design lang
    onSecondaryFixedVariant: "#3a3ac8",

    // audit-allow: hex — hex — neon decorative palette per design lang
    tertiary: "#ff8439",
    // audit-allow: hex — hex — neon decorative palette per design lang
    tertiaryDim: "#fd761a",
    // audit-allow: hex — hex — neon decorative palette per design lang
    onTertiary: "#471a00",
    // audit-allow: hex — hex — neon decorative palette per design lang
    tertiaryContainer: "#f77113",
    // audit-allow: hex — hex — neon decorative palette per design lang
    onTertiaryContainer: "#321000",
    // audit-allow: hex — hex — neon decorative palette per design lang
    tertiaryFixed: "#ff955a",
    // audit-allow: hex — hex — neon decorative palette per design lang
    tertiaryFixedDim: "#ff7f2f",
    // audit-allow: hex — hex — neon decorative palette per design lang
    onTertiaryFixed: "#2e0e00",
    // audit-allow: hex — hex — neon decorative palette per design lang
    onTertiaryFixedVariant: "#632800",

    // audit-allow: hex — hex — neon decorative palette per design lang
    acidGreen: "#22c55e",

    // audit-allow: hex — hex — neon decorative palette per design lang
    error: "#ff6e84",
    // audit-allow: hex — hex — neon decorative palette per design lang
    errorDim: "#d73357",
    // audit-allow: hex — hex — neon decorative palette per design lang
    onError: "#490013",
    // audit-allow: hex — hex — neon decorative palette per design lang
    errorContainer: "#a70138",
    // audit-allow: hex — hex — neon decorative palette per design lang
    onErrorContainer: "#ffb2b9",

    // audit-allow: hex — hex — neon decorative palette per design lang
    surface: "#0c0e10",
    // audit-allow: hex — hex — neon decorative palette per design lang
    surfaceDim: "#0c0e10",
    // audit-allow: hex — hex — neon decorative palette per design lang
    surfaceBright: "#292c30",
    // audit-allow: hex — hex — pure-black contrast anchor
    surfaceContainerLowest: "#000000",
    // audit-allow: hex — hex — neon decorative palette per design lang
    surfaceContainerLow: "#111416",
    // audit-allow: hex — hex — neon decorative palette per design lang
    surfaceContainer: "#171a1c",
    // audit-allow: hex — hex — neon decorative palette per design lang
    surfaceContainerHigh: "#1d2023",
    // audit-allow: hex — hex — neon decorative palette per design lang
    surfaceContainerHighest: "#232629",
    // audit-allow: hex — hex — neon decorative palette per design lang
    surfaceVariant: "#232629",
    // audit-allow: hex — hex — neon decorative palette per design lang
    surfaceTint: "#ba9eff",

    // audit-allow: hex — hex — neon decorative palette per design lang
    onSurface: "#f0f0f3",
    // audit-allow: hex — hex — neon decorative palette per design lang
    onSurfaceVariant: "#aaabae",
    // audit-allow: hex — hex — neon decorative palette per design lang
    onBackground: "#f0f0f3",
    // audit-allow: hex — hex — neon decorative palette per design lang
    outline: "#747578",
    // audit-allow: hex — hex — neon decorative palette per design lang
    outlineVariant: "#46484a",

    // audit-allow: hex — hex — neon decorative palette per design lang
    inverseSurface: "#f9f9fc",
    // audit-allow: hex — hex — neon decorative palette per design lang
    inverseOnSurface: "#535558",
    // audit-allow: hex — hex — neon decorative palette per design lang
    inversePrimary: "#6e3bd7",

    scrim: "rgba(0, 0, 0, 0.6)",
    shadowElevation: "rgba(0, 0, 0, 0.3)",
  },
  font: {
    ui: `'Inter', system-ui, -apple-system, sans-serif`,
    mono: `'JetBrains Mono', ui-monospace, monospace`,
    symbols: `'Material Symbols Outlined'`,
  },
  tracking: {
    tight: "-0.02em",
    normal: "0",
    wide: "0.05em",
    widest: "0.2em",
  },
  radius: {
    none: "0",
    sm: "0.125rem",
    md: "0.25rem",
    lg: "0.5rem",
    // audit-allow: px — px — sub-token spacing value, no density token at this step
    full: "999px",
  },
  space: {
    px: "1px",
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    "2xl": "2rem",
    "3xl": "3rem",
    "4xl": "4rem",
    section: "clamp(4rem, 3rem + 5vw, 10rem)",
  },
  text: {
    displayL: "clamp(3rem, 1.25rem + 6vw, 7rem)",
    displayM: "clamp(2.25rem, 1rem + 4vw, 5rem)",
    displayS: "clamp(1.75rem, 1rem + 2.5vw, 3.5rem)",
    titleL: "1.5rem",
    titleM: "1.25rem",
    titleS: "1rem",
    bodyL: "1rem",
    bodyM: "0.875rem",
    bodyS: "0.75rem",
    labelM: "0.75rem",
    labelS: "0.625rem",
    hero: "clamp(3rem, 1rem + 7vw, 8rem)",
    base: "clamp(1rem, 0.92rem + 0.4vw, 1.125rem)",
  },
  z: {
    below: "-1",
    base: "0",
    elevated: "10",
    sticky: "20",
    overlay: "30",
    drawer: "40",
    header: "50",
    modal: "60",
    toast: "70",
  },
});
