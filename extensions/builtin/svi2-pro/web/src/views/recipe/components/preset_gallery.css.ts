import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(196px, 1fr))",
  gap: vars.space.sm,
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  padding: vars.space.md,
  borderRadius: vars.radius.md,
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

export const cardCanonical = style({
  gridColumn: "1 / -1",
  padding: vars.space.lg,
  background: `color-mix(in oklab, ${vars.color.accent} 7%, ${vars.color.surfaceRaised})`,
  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 40%, transparent)`,
});

export const cardSelected = style({
  background: `color-mix(in oklab, ${vars.color.accent} 12%, ${vars.color.surfaceMuted})`,
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
  fontWeight: vars.weight.semibold,
  letterSpacing: vars.tracking.display,
  color: vars.color.text,
  selectors: {
    [`${cardCanonical} &`]: {
      fontSize: vars.text.subhead,
      fontWeight: vars.weight.display,
    },
  },
});

export const cardTagline = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  lineHeight: 1.4,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  selectors: {
    [`${cardCanonical} &`]: {
      whiteSpace: "normal",
    },
  },
});

export const badgeRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.xs,
  marginTop: vars.space.xs,
});
