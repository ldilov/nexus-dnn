import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflow: "hidden",
  background: vars.color.bg.panel,
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
  padding: vars.space.insetLg,
  borderBottom: `1px solid ${vars.color.outline.variant}`,
});

export const title = style({
  margin: 0,
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.heading,
  color: vars.color.text.primary,
});

export const tagLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.accent.primary,
});

export const description = style({
  margin: 0,
  color: vars.color.text.secondary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
});

export const editorWrap = style({
  flex: 1,
  overflowY: "auto",
});

export const snippets = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  padding: vars.space.insetLg,
  borderTop: `1px solid ${vars.color.outline.variant}`,
  background: vars.color.bg.elevated,
});

export const snippetBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const snippetHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const snippetLabel = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
});

export const copyButton = style({
  padding: `${vars.space.insetXs} ${vars.space.insetMd}`,
  borderRadius: vars.radius.control,
  border: "1px solid transparent",
  background: vars.color.bg.hover,
  color: vars.color.text.primary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,

  ":hover": {
    borderColor: vars.color.accent.primary,
    background: vars.color.bg.bright,
  },
});

export const snippetBody = style({
  margin: 0,
  padding: vars.space.insetMd,
  borderRadius: vars.radius.control,
  background: vars.color.bg.canvas,
  color: vars.color.text.primary,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  whiteSpace: "pre",
  overflowX: "auto",
});

export const empty = style({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: vars.space.insetLg,
  color: vars.color.text.muted,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontStyle: "italic",
});
