import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: vars.space.md,
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  padding: vars.space.lg,
  borderRadius: vars.radius.lg,
  background: vars.color.surfaceMuted,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  cursor: "pointer",
  textAlign: "left",
  border: "none",
  color: vars.color.text,
  transition: `box-shadow ${vars.motion.fast}, transform ${vars.motion.fast}, background ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      background: vars.color.surfaceHigh,
      boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
      transform: "translateY(-2px)",
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, ${vars.shadow.focusRing}`,
    },
  },
});

export const cardSelected = style({
  background: `color-mix(in oklab, ${vars.color.accent} 10%, ${vars.color.surfaceMuted})`,
  boxShadow: `inset 0 0 0 1px ${vars.color.accent}, ${vars.shadow.glow}`,
});

export const titleRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.sm,
});

export const cardTitle = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.text,
});

export const cardDescription = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  lineHeight: 1.5,
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const badgeRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.xs,
  marginTop: "auto",
});

export const recommendedHint = style({
  fontSize: vars.text.micro,
  color: vars.color.accent,
  fontWeight: 600,
});
