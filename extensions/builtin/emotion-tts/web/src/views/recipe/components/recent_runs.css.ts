import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const headerRow = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.md,
});

export const link = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  color: vars.color.accent,
  textDecoration: "none",
  transition: `color ${vars.motion.fast}`,
  ":hover": {
    color: vars.color.accentDim,
  },
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  margin: 0,
  padding: 0,
  listStyle: "none",
});

export const row = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 2fr) auto auto auto",
  alignItems: "center",
  gap: vars.space.lg,
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  background: vars.color.surface,
  textAlign: "left",
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  transition: `background ${vars.motion.fast}`,
  border: "none",
  cursor: "pointer",
  width: "100%",
  ":hover": {
    background: vars.color.surfaceRaised,
    color: vars.color.text,
  },
  "@media": {
    // audit-allow: px — fixed layout breakpoint
    "(max-width: 768px)": {
      gridTemplateColumns: "1fr auto",
      gap: vars.space.sm,
    },
  },
});

export const runId = style({
  color: vars.color.text,
  fontVariantNumeric: "tabular-nums",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const meta = style({
  color: vars.color.textMuted,
  fontVariantNumeric: "tabular-nums",
});

export const empty = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  color: vars.color.textMuted,
  margin: 0,
});

export const emptyHint = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textFaint,
  marginTop: vars.space.xs,
});
