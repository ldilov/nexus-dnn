import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
  gap: vars.space.sm,
  padding: 0,
  margin: 0,
});

const cardBase = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "2px",
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceMuted,
  border: `1px solid transparent`,
  cursor: "pointer",
  textAlign: "left",
  transition: `background ${vars.motion.fast}, border-color ${vars.motion.fast}, box-shadow ${vars.motion.fast}`,
  ":hover": {
    background: vars.color.surfaceHigh,
    borderColor: vars.color.borderSubtle,
  },
  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.55,
  },
});

export const card = style([cardBase, {}]);

export const cardSelected = style([
  cardBase,
  {
    background: `color-mix(in oklab, ${vars.color.accent} 14%, ${vars.color.surfaceMuted})`,
    borderColor: vars.color.accent,
    boxShadow: `0 0 0 1px ${vars.color.accent}`,
  },
]);

export const cardName = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.text,
});

export const cardMeta = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
});

export const loading = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  margin: 0,
});

export const error = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.danger,
  margin: 0,
});
