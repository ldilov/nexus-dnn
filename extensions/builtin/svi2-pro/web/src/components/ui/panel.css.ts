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

export const panelHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const panelTitle = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.subhead,
  fontWeight: 600,
  letterSpacing: vars.tracking.display,
  color: vars.color.text,
});

export const panelDescription = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});
