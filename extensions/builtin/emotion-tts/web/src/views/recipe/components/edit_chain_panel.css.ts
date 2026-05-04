import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const headerRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,
  flexWrap: "wrap",
});

export const headerTitle = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.subhead,
  color: vars.color.text,
  fontWeight: 600,
  letterSpacing: vars.tracking.display,
});

export const headerActions = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
});

export const collapsedChip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  background: vars.color.surfaceMuted,
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: vars.radius.pill,
  letterSpacing: vars.tracking.label,
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.md,
  padding: vars.space.sm,
  margin: 0,
  listStyle: "none",
});

export const empty = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textFaint,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  padding: vars.space.md,
  textAlign: "center",
});

export const row = style({
  display: "grid",
  // audit-allow: px — sub-token spacing value, no density token at this step
  gridTemplateColumns: "auto 96px 1fr auto",
  gap: vars.space.sm,
  alignItems: "center",
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  selectors: {
    "&:hover": {
      background: vars.color.surfaceHigh,
    },
  },
});

export const opId = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textFaint,
  letterSpacing: vars.tracking.label,
  fontVariantNumeric: "tabular-nums",
});

export const modeLabel = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  color: vars.color.text,
  fontWeight: 600,
});

export const params = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const builderRow = style({
  display: "flex",
  alignItems: "flex-start",
  gap: vars.space.sm,
  flexWrap: "wrap",
  position: "relative",
});

export const dropdown = style({
  position: "absolute",
  top: "100%",
  left: 0,
  marginTop: vars.space.xs,
  background: vars.color.surfaceGlass,
  // audit-allow: px — sub-token spacing value, no density token at this step
  backdropFilter: "blur(20px) saturate(1.2)",
  borderRadius: vars.radius.md,
  boxShadow: vars.shadow.raised,
  padding: vars.space.xs,
  display: "flex",
  flexDirection: "column",
  gap: "1px", // audit-allow: px — sub-token list separator
  minWidth: "200px", // audit-allow: px — dropdown minimum width
  zIndex: 10,
});

export const dropdownItem = style({
  background: "transparent",
  border: "none",
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  textAlign: "left",
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: vars.radius.sm,
  cursor: "pointer",
  selectors: {
    "&:hover": {
      background: vars.color.surfaceHigh,
      color: vars.color.accent,
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow: vars.shadow.focusRing,
    },
  },
});

export const summaryFooter = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  letterSpacing: vars.tracking.label,
});
