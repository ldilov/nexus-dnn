import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const shell = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  padding: vars.space.lg,
  minHeight: "100vh",
  background: vars.color.surface,
  backgroundImage: `radial-gradient(900px 520px at 50% -10%, color-mix(in oklab, ${vars.color.accent} 10%, transparent), transparent 65%)`,
  color: vars.color.text,
  fontFamily: vars.font.body,
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,
  flexWrap: "wrap",
  padding: `${vars.space.md} ${vars.space.lg}`,
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.lg,
});

export const title = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.head,
  letterSpacing: vars.tracking.display,
  margin: 0,
});

export const subtitle = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  margin: 0,
  marginTop: "4px",
  fontFamily: vars.font.mono,
});

export const badge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: vars.radius.pill,
  background: `color-mix(in oklab, ${vars.color.warning} 18%, ${vars.color.surfaceRaised})`,
  color: vars.color.text,
  fontSize: vars.text.micro,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  "::before": {
    content: '""',
    width: "6px",
    height: "6px",
    borderRadius: vars.radius.pill,
    background: vars.color.warning,
    display: "inline-block",
  },
});

export const canvas = style({
  background: vars.color.surfaceRaised,
  borderRadius: vars.radius.lg,
  padding: vars.space.lg,
  overflow: "auto",
  boxShadow: vars.shadow.raised,
});

export const svgRoot = style({
  display: "block",
  width: "100%",
  maxWidth: "1080px",
  margin: "0 auto",
  color: vars.color.text,
});

export const nodeCard = style({
  fill: vars.color.surfaceMuted,
  stroke: vars.color.borderGhost,
  strokeWidth: 1,
});

export const nodeCardCurated = style({
  fill: `color-mix(in oklab, ${vars.color.accent} 12%, ${vars.color.surfaceMuted})`,
  stroke: `color-mix(in oklab, ${vars.color.accent} 55%, transparent)`,
  strokeWidth: 1,
});

export const nodeTitle = style({
  fontFamily: vars.font.body,
  fontSize: "14px",
  fontWeight: 600,
  fill: vars.color.text,
  letterSpacing: vars.tracking.display,
});

export const nodeOperator = style({
  fontFamily: vars.font.mono,
  fontSize: "11px",
  fill: vars.color.textMuted,
});

export const edgeLine = style({
  stroke: vars.color.textFaint,
  strokeOpacity: 0.5,
  strokeWidth: 1.5,
  fill: "none",
});

export const backLink = style({
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: vars.radius.sm,
  background: "transparent",
  color: vars.color.accent,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  fontWeight: 600,
  textDecoration: "none",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
  transition: `background ${vars.motion.fast}`,
  ":hover": { background: vars.color.surfaceHigh },
});

export const legend = style({
  display: "flex",
  gap: vars.space.lg,
  flexWrap: "wrap",
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  padding: `${vars.space.sm} ${vars.space.md}`,
});

export const legendSwatch = style({
  display: "inline-block",
  width: "10px",
  height: "10px",
  borderRadius: "2px",
  marginRight: vars.space.xs,
  verticalAlign: "middle",
});

export const legendSwatchCurated = style({
  background: `color-mix(in oklab, ${vars.color.accent} 55%, ${vars.color.surfaceMuted})`,
});

export const legendSwatchCustom = style({
  background: vars.color.surfaceMuted,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
});

export const nodeConfigBlock = style({
  fontFamily: vars.font.mono,
  fontSize: "10px",
  fill: vars.color.textMuted,
});

export const error = style({
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  background: `color-mix(in oklab, ${vars.color.danger} 14%, ${vars.color.surfaceRaised})`,
  color: vars.color.text,
  fontSize: vars.text.body,
});
