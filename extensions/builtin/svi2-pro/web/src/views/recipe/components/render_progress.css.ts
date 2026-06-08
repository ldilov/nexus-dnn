import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const statRow = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  gap: vars.space.md,
});

export const stat = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceMuted,
});

export const statLabel = style({
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
});

export const statValue = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.subhead,
  color: vars.color.text,
});

export const progressTrack = style({
  position: "relative",
  width: "100%",
  height: "8px",
  borderRadius: vars.radius.pill,
  background: vars.color.surfaceHigh,
  overflow: "hidden",
});

export const progressFill = style({
  position: "absolute",
  inset: 0,
  transformOrigin: "left center",
  background: `linear-gradient(90deg, ${vars.color.accentDim}, ${vars.color.accent})`,
  transition: `transform ${vars.motion.normal}`,
});

export const actions = style({
  display: "flex",
  gap: vars.space.sm,
});

export const reportGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: vars.space.sm,
});

export const reportItem = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export const reportKey = style({
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
});

export const reportValue = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.text,
  wordBreak: "break-all",
});

export const errorBox = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  padding: vars.space.lg,
  borderRadius: vars.radius.md,
  background: `color-mix(in oklab, ${vars.color.danger} 10%, transparent)`,
  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.danger} 40%, transparent)`,
});

export const errorTitle = style({
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.danger,
});

export const errorHint = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});
