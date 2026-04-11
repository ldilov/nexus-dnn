import { createTheme } from "@vanilla-extract/css";
import { vars } from "./contract.css";

export const darkTheme = createTheme(vars, {
  color: {
    surface: {
      base: "#0f1117",
      raised: "#1a1d27",
      overlay: "#252830",
      sunken: "#0a0c10",
    },
    text: {
      primary: "#e4e4e7",
      secondary: "#a1a1aa",
      muted: "#71717a",
      inverse: "#09090b",
    },
    accent: {
      primary: "#6366f1",
      hover: "#818cf8",
      muted: "#312e81",
    },
    success: { base: "#22c55e", text: "#bbf7d0" },
    warning: { base: "#f59e0b", text: "#fef3c7" },
    error: { base: "#ef4444", text: "#fecaca" },
    border: {
      default: "#27272a",
      subtle: "#1e1e22",
      strong: "#3f3f46",
    },
  },
  font: {
    family: {
      body: "'Inter', system-ui, sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
    size: {
      xs: "0.75rem",
      sm: "0.8125rem",
      md: "0.875rem",
      lg: "1rem",
      xl: "1.25rem",
      xxl: "1.5rem",
    },
    weight: {
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    lineHeight: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
  },
  space: {
    xxs: "2px",
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    xxl: "32px",
    xxxl: "48px",
  },
  radius: {
    sm: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
    full: "9999px",
  },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.3)",
    md: "0 4px 6px rgba(0,0,0,0.3)",
    lg: "0 10px 15px rgba(0,0,0,0.4)",
  },
  z: {
    base: "0",
    dropdown: "100",
    modal: "200",
    toast: "300",
  },
});
