import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const shell = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  padding: vars.space.lg,
  minHeight: "100vh",
  background: vars.color.surface,
  color: vars.color.text,
  fontFamily: vars.font.body,
});

export const header = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.md,
  flexWrap: "wrap",
});

export const title = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.head,
  margin: 0,
});

export const subtitle = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  margin: 0,
});

export const badge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  background: `oklch(from ${vars.color.warning} l c h / 0.16)`,
  color: vars.color.text,
  fontSize: vars.text.caption,
  fontWeight: 600,
});

export const canvas = style({
  background: vars.color.surfaceRaised,
  borderRadius: vars.radius.md,
  boxShadow: vars.shadow.subtle,
  padding: vars.space.lg,
  overflow: "auto",
});

export const svgRoot = style({
  display: "block",
  width: "100%",
  maxWidth: "1080px",
  margin: "0 auto",
  color: vars.color.text,
});

export const nodeCard = style({
  fill: vars.color.surface,
  stroke: vars.color.borderSubtle,
  strokeWidth: 1,
});

export const nodeCardCurated = style({
  fill: `oklch(from ${vars.color.accent} l c h / 0.08)`,
  stroke: `oklch(from ${vars.color.accent} l c h / 0.35)`,
});

export const nodeTitle = style({
  fontFamily: vars.font.body,
  fontSize: "14px",
  fontWeight: 600,
  fill: vars.color.text,
});

export const nodeOperator = style({
  fontFamily: vars.font.mono,
  fontSize: "11px",
  fill: vars.color.textMuted,
});

export const edgeLine = style({
  stroke: vars.color.textMuted,
  strokeOpacity: 0.45,
  strokeWidth: 1.5,
  fill: "none",
});

export const backLink = style({
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.borderSubtle}`,
  background: vars.color.surfaceRaised,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  textDecoration: "none",
  ":hover": { background: vars.color.surfaceMuted },
});

export const legend = style({
  display: "flex",
  gap: vars.space.md,
  flexWrap: "wrap",
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const legendSwatch = style({
  display: "inline-block",
  width: "10px",
  height: "10px",
  borderRadius: "2px",
  marginRight: vars.space.xs,
  verticalAlign: "middle",
});

export const nodeConfigBlock = style({
  fontFamily: vars.font.mono,
  fontSize: "10px",
  fill: vars.color.textMuted,
});

export const error = style({
  padding: vars.space.md,
  borderRadius: vars.radius.sm,
  background: `oklch(from ${vars.color.danger} l c h / 0.12)`,
  color: vars.color.text,
  fontSize: vars.text.body,
});
