import { globalFontFace, globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

globalFontFace("Inter", {
  src: `url("/fonts/inter.woff2") format("woff2-variations")`,
  fontWeight: "100 900",
  fontDisplay: "swap",
  fontStyle: "normal",
});

globalFontFace("JetBrains Mono", {
  src: `url("/fonts/jetbrains-mono.woff2") format("woff2-variations")`,
  fontWeight: "100 800",
  fontDisplay: "swap",
  fontStyle: "normal",
});

globalFontFace("Material Symbols Outlined", {
  src: `url("/fonts/material-symbols-outlined.woff2") format("woff2-variations")`,
  fontWeight: "100 700",
  fontDisplay: "block",
  fontStyle: "normal",
});

globalStyle("html, body", {
  fontFamily: vars.font.ui,
  fontSize: vars.text.base,
  backgroundColor: vars.color.surface,
  color: vars.color.onSurface,
  margin: 0,
  padding: 0,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});

globalStyle("code, pre, .mono", {
  fontFamily: vars.font.mono,
});

globalStyle(".material-symbols-outlined", {
  fontFamily: vars.font.symbols,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: "1",
  letterSpacing: "normal",
  textTransform: "none",
  display: "inline-block",
  whiteSpace: "nowrap",
  wordWrap: "normal",
  direction: "ltr",
  fontFeatureSettings: "'liga'",
  fontVariationSettings: `"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24`,
  WebkitFontSmoothing: "antialiased",
});

globalStyle("::selection", {
  background: `${vars.color.primary}4d`,
  color: vars.color.onSurface,
});
