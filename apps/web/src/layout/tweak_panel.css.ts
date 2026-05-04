import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const wrapper = style({
  position: "relative",
  display: "inline-flex",
});

export const triggerButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: vars.control.heightLg,
  height: vars.control.heightLg,
  padding: 0,
  background: "transparent",
  color: vars.color.text.secondary,
  border: "none",
  borderRadius: vars.radius.control,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid var(--accent)`,
    outlineOffset: vars.focus.offset,
  },
  "@media": {
    "(forced-colors: active)": {
      forcedColorAdjust: "none",
      border: "1px solid CanvasText",
      background: "Canvas",
      color: "CanvasText",
    },
  },
});

export const triggerActive = style({
  background: vars.color.bg.hover,
  color: vars.color.text.primary,
  "@media": {
    "(forced-colors: active)": {
      background: "Highlight",
      color: "HighlightText",
      forcedColorAdjust: "none",
    },
  },
});

export const popover = style({
  position: "absolute",
  top: "calc(100% + var(--d-2))",
  right: 0,
  zIndex: 50,
  width: 360,
  padding: "var(--d-5)",
  display: "flex",
  flexDirection: "column",
  gap: "var(--d-4)",
  background: vars.card.bg,
  borderRadius: vars.radius.panel,
  boxShadow: vars.shadow.lg,
  backdropFilter: vars.card.backdrop,
  fontFamily: vars.font.ui,
  color: vars.color.text.primary,
  "@media": {
    "(forced-colors: active)": {
      forcedColorAdjust: "none",
      background: "Canvas",
      color: "CanvasText",
      border: "1px solid CanvasText",
    },
  },
});

export const popoverHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: "var(--d-1)",
  paddingBottom: "var(--d-3)",
  borderBottom: `1px solid ${vars.color.outline.variant}`,
});

export const popoverHeaderRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "var(--d-2)",
});

export const popoverTitle = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodyLg,
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: vars.color.text.primary,
});

export const popoverHint = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  letterSpacing: "0.01em",
});

export const triggerHotkey = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  letterSpacing: "0.05em",
  color: vars.color.text.muted,
  paddingInline: "var(--d-2)",
  paddingBlock: "1px",
  borderRadius: vars.radius.control,
  background: vars.color.bg.lowest,
  border: `1px solid ${vars.color.outline.variant}`,
});

export const fieldLabel = style({
  display: "flex",
  flexDirection: "column",
  gap: "var(--d-2)",
});

export const fieldHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: "var(--d-2)",
});

export const fieldName = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: 600,
  color: vars.color.text.primary,
});

export const fieldValue = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
});

export const segmentedRoot = style({
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "1fr",
  gap: 2,
  background: vars.color.bg.lowest,
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: vars.radius.control,
  padding: 3,
});

export const segmentedOption = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: vars.control.heightMd,
  paddingInline: "var(--d-2)",
  background: "transparent",
  color: vars.color.text.secondary,
  border: "none",
  borderRadius: `calc(${vars.radius.control} - 2px)`,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: 500,
  cursor: "pointer",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}, transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid var(--accent)`,
    outlineOffset: vars.focus.offset,
  },
  "@media": {
    "(forced-colors: active)": {
      forcedColorAdjust: "none",
      color: "CanvasText",
    },
  },
});

export const segmentedOptionActive = style({
  background: `linear-gradient(135deg, var(--accent) 0%, var(--accent-dim) 100%)`,
  color: vars.color.onColor.primary,
  fontWeight: 600,
  boxShadow: vars.shadow.sm,
  ":hover": {
    background: `linear-gradient(135deg, var(--accent) 0%, var(--accent-dim) 100%)`,
    color: vars.color.onColor.primary,
  },
  "@media": {
    "(forced-colors: active)": {
      background: "Highlight",
      color: "HighlightText",
      forcedColorAdjust: "none",
    },
  },
});

export const resetRow = style({
  display: "flex",
  justifyContent: "flex-end",
  paddingTop: "var(--d-3)",
  borderTop: `1px solid ${vars.color.outline.variant}`,
});

export const resetButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--d-1)",
  height: vars.control.heightMd,
  paddingInline: "var(--d-3)",
  background: "transparent",
  color: vars.color.text.muted,
  border: "none",
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: 500,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid var(--accent)`,
    outlineOffset: vars.focus.offset,
  },
});
