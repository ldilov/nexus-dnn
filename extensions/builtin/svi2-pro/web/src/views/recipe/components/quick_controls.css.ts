import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const group = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const groupLabel = style({
  fontSize: vars.text.caption,
  fontWeight: vars.weight.semibold,
  color: vars.color.text,
});

export const chipRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.xs,
});

export const chip = style({
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  border: "none",
  background: vars.color.surfaceMuted,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  color: vars.color.textMuted,
  fontSize: vars.text.caption,
  cursor: "pointer",
  transition: `box-shadow ${vars.motion.fast}, color ${vars.motion.fast}, background ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      color: vars.color.text,
      background: vars.color.surfaceHigh,
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, ${vars.shadow.focusRing}`,
    },
  },
});

export const chipSelected = style({
  color: vars.color.text,
  background: `color-mix(in oklab, ${vars.color.accent} 12%, ${vars.color.surfaceMuted})`,
  boxShadow: `inset 0 0 0 1px ${vars.color.accent}`,
});

export const chipMeta = style({
  display: "block",
  fontSize: "0.85em",
  color: vars.color.textMuted,
});

export const summary = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const customRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
});

export const customInput = style({
  width: "6rem",
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  border: "none",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  background: vars.color.surfaceMuted,
  color: vars.color.text,
  fontSize: vars.text.caption,
  selectors: {
    "&:focus-visible": {
      outline: "none",
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, ${vars.shadow.focusRing}`,
    },
  },
});

export const select = style({
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  border: "none",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  background: vars.color.surfaceMuted,
  color: vars.color.text,
  fontSize: vars.text.caption,
  selectors: {
    "&:focus-visible": {
      outline: "none",
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, ${vars.shadow.focusRing}`,
    },
  },
});

export const hint = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  fontStyle: "italic",
});
