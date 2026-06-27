import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const panel = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  padding: vars.space.xl,
  borderRadius: vars.radius.lg,
  background: vars.color.surfaceGlass,
  backdropFilter: "blur(20px) saturate(1.2)",
  boxShadow: vars.shadow.subtle,
});

export const panelRaised = style({
  background: vars.color.surfaceGlassRaised,
  boxShadow: `${vars.shadow.raised}, ${vars.shadow.inset}`,
});

export const panelInset = style({
  padding: vars.space.lg,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceInset,
  backdropFilter: "none",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
});

export const panelHeader = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: vars.space.lg,
});

export const panelHeading = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  minWidth: 0,
});

export const panelActions = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  flexShrink: 0,
});

export const panelEyebrow = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textFaint,
});

export const panelTitle = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.subhead,
  fontWeight: vars.weight.display,
  letterSpacing: vars.tracking.display,
  color: vars.color.text,
});

export const panelDescription = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});
