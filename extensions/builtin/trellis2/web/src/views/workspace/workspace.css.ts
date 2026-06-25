import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const shell = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xl,
  width: "100%",
  maxWidth: "1320px",
  margin: "0 auto",
  padding: vars.space.xl,
});

export const header = style({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: vars.space.lg,
  flexWrap: "wrap",
});

export const titleBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const eyebrow = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textFaint,
});

export const title = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.head,
  fontWeight: 700,
  letterSpacing: vars.tracking.display,
  color: vars.color.text,
});

export const subtitle = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  maxWidth: "62ch",
});

export const tabs = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: vars.space.xs,
  borderRadius: vars.radius.pill,
  background: vars.color.surfaceInset,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
});

export const tab = style({
  appearance: "none",
  border: "none",
  background: "transparent",
  color: vars.color.textMuted,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  fontWeight: 600,
  padding: `${vars.space.sm} ${vars.space.lg}`,
  borderRadius: vars.radius.pill,
  cursor: "pointer",
  textDecoration: "none",
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}`,
  selectors: {
    "&:hover": { color: vars.color.text },
    "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focusRing },
  },
});

export const tabActive = style({
  background: vars.color.surfaceHigh,
  color: vars.color.text,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
});

export const main = style({
  display: "flex",
  flexDirection: "column",
});
