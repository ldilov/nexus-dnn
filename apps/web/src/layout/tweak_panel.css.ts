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
  // WCAG 2.5.5 minimum touch target: 44×44 (use the heightLg token).
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
  width: 320,
  padding: "var(--d-4)",
  display: "flex",
  flexDirection: "column",
  gap: "var(--d-3)",
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
      // Forced-colors removes box-shadow → use a hairline to keep the
      // popover distinguishable from the topbar behind it.
      border: "1px solid CanvasText",
    },
  },
});

export const popoverHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: "var(--d-1)",
});

export const popoverTitle = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodyLg,
  fontWeight: 600,
  color: vars.color.text.primary,
});

export const popoverHint = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
});

export const popoverHeaderRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: "var(--d-2)",
});

export const triggerHotkey = style({
  // Mirrors the topbar searchHotkey treatment so the two affordances
  // read as siblings — both icon-button surfaces with a tiny mono kbd.
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  letterSpacing: "0.05em",
  color: vars.color.text.muted,
  paddingInline: "var(--d-2)",
  paddingBlock: "1px",
  borderRadius: vars.radius.control,
  background: vars.color.bg.hover,
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
});

export const fieldName = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: 600,
  color: vars.color.text.primary,
});

export const fieldValue = style({
  // Word labels (e.g. "Spacious") render in UI font, not mono — mono is
  // reserved for IDs/counts/timestamps per the design-system rule.
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
});

export const segmentedRoot = style({
  display: "inline-grid",
  gridAutoFlow: "column",
  gridAutoColumns: "1fr",
  gap: 0,
  background: vars.color.bg.lowest,
  borderRadius: vars.radius.control,
  padding: 2,
});

export const segmentedOption = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  // WCAG 2.5.5 minimum touch target: bumped from heightSm to heightMd.
  height: vars.control.heightMd,
  padding: "0 var(--d-3)",
  background: "transparent",
  color: vars.color.text.secondary,
  border: "none",
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: 500,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
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
  // Match the design-system active treatment used by `pillActive` in
  // `components/base/pill.css.ts` — accent gradient with on-color text.
  background: `linear-gradient(135deg, var(--accent) 0%, var(--accent-dim) 100%)`,
  color: vars.color.onColor.primary,
  fontWeight: 600,
  boxShadow: vars.shadow.sm,
  ":hover": {
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
  marginTop: "var(--d-1)",
});

export const resetButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--d-1)",
  height: vars.control.heightMd,
  padding: "0 var(--d-3)",
  background: "transparent",
  // Recovery affordance — quieter than a primary CTA.
  color: vars.color.text.muted,
  border: "none",
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: 600,
  cursor: "pointer",
  ":hover": {
    color: "var(--accent)",
  },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid var(--accent)`,
    outlineOffset: vars.focus.offset,
  },
});
