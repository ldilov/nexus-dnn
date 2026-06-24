import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapLg,
  width: "100%",
  maxWidth: "920px",
  fontFamily: vars.font.ui,
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const title = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.heading,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  margin: 0,
});

export const subtitle = style({
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.muted,
});

export const step = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  padding: vars.space.insetMd,
  background: vars.color.bg.panel,
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: vars.radius.card,
});

export const stepTitle = style({
  display: "flex",
  alignItems: "baseline",
  gap: vars.space.gapSm,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  margin: 0,
});

export const stepIndex = style({
  fontFamily: vars.font.code,
  color: vars.color.accent.secondary,
});

export const fieldRow = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const inlineRow = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: vars.space.gapSm,
});

export const label = style({
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.secondary,
});

export const input = style({
  appearance: "none",
  background: vars.color.bg.canvas,
  color: vars.color.text.primary,
  border: `1px solid ${vars.color.outline.base}`,
  borderRadius: vars.radius.control,
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid ${vars.color.accent.primary}`,
    outlineOffset: vars.focus.offset,
  },
});

export const select = style([input, { cursor: "pointer" }]);

export const targetList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const targetRow = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  padding: vars.space.insetSm,
  borderRadius: vars.radius.control,
  border: `1px solid ${vars.color.outline.variant}`,
});

export const targetRowExposed = style({
  borderColor: vars.color.accent.secondary,
  background: vars.color.bg.hover,
});

export const targetHead = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
});

export const targetName = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.primary,
});

export const targetKind = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
});

export const targetMeta = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: vars.space.gapSm,
});

export const presetList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const presetItem = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.gapSm,
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  borderRadius: vars.radius.control,
  border: `1px solid ${vars.color.outline.variant}`,
});

export const button = style({
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.gapXs,
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  background: "transparent",
  color: vars.color.text.secondary,
  border: `1px solid ${vars.color.outline.base}`,
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.medium,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
  ":disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid ${vars.color.accent.primary}`,
    outlineOffset: vars.focus.offset,
  },
});

export const primaryButton = style([
  button,
  {
    background: vars.color.accent.primary,
    color: vars.color.onColor.primary,
    border: "none",
    fontWeight: vars.font.weight.semibold,
    selectors: {
      "&:hover:not(:disabled)": {
        background: vars.color.accent.primaryHover,
        color: vars.color.onColor.primary,
      },
    },
  },
]);

export const warning = style({
  fontSize: vars.font.size.caption,
  color: vars.color.error.text,
});

export const success = style({
  fontSize: vars.font.size.caption,
  color: vars.color.state.completed,
});

export const emptyNote = style({
  fontSize: vars.font.size.bodySm,
  fontStyle: "italic",
  color: vars.color.text.muted,
});

export const preview = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  padding: vars.space.insetMd,
  background: vars.color.bg.canvas,
  border: `1px dashed ${vars.color.outline.variant}`,
  borderRadius: vars.radius.card,
});

export const saveRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
});
