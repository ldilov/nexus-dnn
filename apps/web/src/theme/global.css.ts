import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./contract.css";

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
});

globalStyle("html, body, #root", {
  height: "100%",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  color: vars.color.text.primary,
  backgroundColor: vars.color.bg.app,
  lineHeight: vars.font.lineHeight.normal,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});

globalStyle("a", {
  color: vars.color.accent.primary,
  textDecoration: "none",
});

globalStyle("a:hover", {
  color: vars.color.accent.primaryHover,
});

globalStyle(":focus-visible", {
  outline: `3px solid ${vars.color.accent.primary}`,
  outlineOffset: "2px",
});

globalStyle("::selection", {
  backgroundColor: vars.color.accent.primaryDim,
  color: vars.color.text.primary,
});

globalStyle(".material-symbols-outlined", {
  fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
});
