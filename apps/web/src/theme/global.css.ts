import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./contract.css";

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
});

globalStyle("html, body, #root", {
  height: "100%",
  fontFamily: vars.font.family.body,
  fontSize: vars.font.size.md,
  color: vars.color.text.primary,
  backgroundColor: vars.color.surface.base,
  lineHeight: vars.font.lineHeight.normal,
});

globalStyle("a", {
  color: vars.color.accent.primary,
  textDecoration: "none",
});

globalStyle("a:hover", {
  color: vars.color.accent.hover,
});
