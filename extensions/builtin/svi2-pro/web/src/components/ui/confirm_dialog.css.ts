import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const scrim = style({
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: vars.space.xl,
  background: vars.color.scrim,
  zIndex: 1000,
});

export const dialog = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  width: "min(420px, 100%)",
  padding: vars.space.xl,
  borderRadius: vars.radius.lg,
  background: vars.color.surfaceGlassRaised,
  backdropFilter: "blur(20px) saturate(1.2)",
  boxShadow: `${vars.shadow.raised}, ${vars.shadow.inset}`,
});

export const title = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.subhead,
  fontWeight: vars.weight.display,
  letterSpacing: vars.tracking.display,
  color: vars.color.text,
});

export const message = style({
  fontSize: vars.text.body,
  color: vars.color.textMuted,
});

export const actions = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: vars.space.sm,
});
