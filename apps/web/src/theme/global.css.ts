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
  // Shell (`shell.css.ts`) and each page own their own scroll container.
  // Body-level scrolling is forbidden — do not introduce content that
  overflow: "hidden",
});

globalStyle("a", {
  color: vars.color.accent.primary,
  textDecoration: "none",
});

globalStyle("a:hover", {
  color: vars.color.accent.primaryHover,
});

globalStyle(":focus-visible", {
  // audit-allow: px — below minimum token granularity (sub-10px)
  outline: `3px solid ${vars.color.accent.primary}`,
  // audit-allow: px — below minimum token granularity (sub-10px)
  outlineOffset: "2px",
});

globalStyle("::selection", {
  backgroundColor: vars.color.accent.primaryDim,
  color: vars.color.text.primary,
});

globalStyle("h1, h2, h3, h4, h5, h6", {
  fontFamily: vars.font.headline,
  letterSpacing: "-0.02em",
  lineHeight: vars.font.lineHeight.tight,
});

globalStyle("h1", {
  fontSize: vars.font.size.display,
  fontWeight: vars.font.weight.bold,
});

globalStyle("h2", {
  fontSize: vars.font.size.headingLg,
  fontWeight: vars.font.weight.semibold,
});

globalStyle("h3", {
  fontSize: vars.font.size.heading,
  fontWeight: vars.font.weight.semibold,
});

globalStyle("h4", {
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.medium,
});

globalStyle("h5, h6", {
  fontSize: vars.font.size.bodyLg,
  fontWeight: vars.font.weight.medium,
});

globalStyle("code, pre, kbd, samp", {
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
});

globalStyle("pre", {
  backgroundColor: vars.color.bg.lowest,
  padding: vars.space.insetLg,
  borderRadius: vars.radius.card,
  overflowX: "auto",
});

globalStyle("button", {
  fontFamily: "inherit",
  fontSize: "inherit",
});

globalStyle("*", {
  scrollbarWidth: "thin",
  scrollbarColor: `${vars.color.outline.variant} transparent`,
});

globalStyle("::-webkit-scrollbar", {
  // audit-allow: px — scrollbar dimensions are intentionally fixed
  width: "10px",
  // audit-allow: px — scrollbar dimensions are intentionally fixed
  height: "10px",
});

globalStyle("::-webkit-scrollbar-track", {
  background: "transparent",
});

globalStyle("::-webkit-scrollbar-thumb", {
  background: vars.color.outline.variant,
  borderRadius: vars.radius.full,
  // audit-allow: px — inset padding around the thumb to inset it from the track
  border: "2px solid transparent",
  backgroundClip: "padding-box",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
});

globalStyle("::-webkit-scrollbar-thumb:hover", {
  background: vars.color.outline.base,
  backgroundClip: "padding-box",
});

globalStyle("::-webkit-scrollbar-thumb:active", {
  background: vars.color.accent.primary,
  backgroundClip: "padding-box",
});

globalStyle("::-webkit-scrollbar-corner", {
  background: "transparent",
});

globalStyle(".material-symbols-outlined", {
  fontFamily: "'Material Symbols Outlined'",
  fontWeight: "normal",
  fontStyle: "normal",
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "24px",
  lineHeight: 1,
  letterSpacing: "normal",
  textTransform: "none",
  display: "inline-block",
  whiteSpace: "nowrap",
  wordWrap: "normal",
  direction: "ltr",
  fontFeatureSettings: "'liga'",
  WebkitFontFeatureSettings: "'liga'",
  WebkitFontSmoothing: "antialiased",
  fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
});
