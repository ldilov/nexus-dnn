import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  padding: vars.space.lg,
  borderRadius: vars.radius.md,
  background: vars.color.surface,
});

export const header = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.md,
});

export const title = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  color: vars.color.textMuted,
});

export const summaryRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.sm,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const summaryAxis = style({
  display: "inline-flex",
  alignItems: "baseline",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "2px",
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.pill,
  background: `color-mix(in oklab, ${vars.color.accent} 10%, transparent)`,
  color: vars.color.text,
});

export const axisValue = style({
  color: vars.color.tertiary,
  fontVariantNumeric: "tabular-nums",
});

export const composerRow = style({
  display: "flex",
  gap: vars.space.sm,
  alignItems: "center",
});

export const input = style({
  flex: "1 1 auto",
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceMuted,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  border: "none",
  outline: "none",
  transition: `box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:focus": {
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}`,
    },
  },
});

export const presetGrid = style({
  display: "grid",
  // audit-allow: px — sub-token spacing value, no density token at this step
  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  gap: vars.space.sm,
});

export const presetCard = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: vars.space.sm,
  padding: vars.space.sm,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceMuted,
  border: "none",
  textAlign: "left",
  cursor: "pointer",
  transition: `background ${vars.motion.fast}`,
  ":hover": {
    background: vars.color.surfaceRaised,
  },
});

export const presetCardActive = style({
  background: `color-mix(in oklab, ${vars.color.accent} 14%, transparent)`,
  outline: `1px solid ${vars.color.accent}`,
});

export const presetCardName = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.body,
  color: vars.color.text,
  fontWeight: 600,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const presetCardDelete = style({
  border: "none",
  background: "transparent",
  color: vars.color.textFaint,
  cursor: "pointer",
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  ":hover": {
    color: vars.color.danger,
  },
});

export const sectionTitle = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  color: vars.color.textMuted,
  marginBottom: vars.space.sm,
});
