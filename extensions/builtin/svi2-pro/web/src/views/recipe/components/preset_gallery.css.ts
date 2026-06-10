import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(224px, 1fr))",
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

export const cardWide = style({
  gridColumn: "1 / -1",
});

export const cardCanonical = style({
  gridColumn: "1 / -1",
  padding: vars.space.lg,
  background: `
    radial-gradient(120% 180% at 0% 0%, color-mix(in oklab, ${vars.color.accent} 10%, transparent) 0%, transparent 55%),
    color-mix(in oklab, ${vars.color.accent} 4%, ${vars.color.surfaceRaised})
  `,
  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 18%, transparent)`,
  selectors: {
    "&:hover": {
      background: `
        radial-gradient(120% 180% at 0% 0%, color-mix(in oklab, ${vars.color.accent} 14%, transparent) 0%, transparent 55%),
        color-mix(in oklab, ${vars.color.accent} 6%, ${vars.color.surfaceRaised})
      `,
      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 30%, transparent)`,
    },
  },
});

const selectedRing = `inset 0 0 0 1.5px ${vars.color.accent}, 0 0 0 3px ${vars.color.accentGlow}, ${vars.shadow.glow}`;

export const cardSelected = style({
  background: `color-mix(in oklab, ${vars.color.accent} 12%, ${vars.color.surfaceMuted})`,
  boxShadow: selectedRing,
  selectors: {
    "&:hover": {
      boxShadow: selectedRing,
      transform: "none",
    },
  },
});

export const checkSlot = style({
  display: "inline-flex",
  width: "20px",
  height: "20px",
  marginLeft: "auto",
  flexShrink: 0,
  color: vars.color.accent,
  opacity: 0,
  transform: "scale(0.7)",
  transition: `opacity ${vars.motion.fast}, transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
  selectors: {
    [`${cardSelected} &`]: {
      opacity: 1,
      transform: "scale(1)",
    },
  },
});

export const titleRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
});

export const cardTitle = style({
  flex: 1,
  minWidth: 0,
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
  lineHeight: 1.45,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  selectors: {
    [`${cardCanonical} &`]: {
      display: "block",
      overflow: "visible",
    },
  },
});

export const badgeRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.xs,
  marginTop: vars.space.xs,
});

export const stack = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const legacyRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  marginTop: vars.space.xs,
});

export const legacyLine = style({
  flex: 1,
  height: 1,
  background: `linear-gradient(90deg, transparent, ${vars.color.borderSubtle}, transparent)`,
});

export const legacyToggle = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: "999px",
  border: "none",
  background: vars.color.surfaceMuted,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  color: vars.color.textMuted,
  fontSize: vars.text.caption,
  letterSpacing: "0.02em",
  cursor: "pointer",
  transition: `color ${vars.motion.fast}, background ${vars.motion.fast}, box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      color: vars.color.text,
      background: vars.color.surfaceHigh,
      boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, ${vars.shadow.focusRing}`,
    },
  },
});

export const legacyCaret = style({
  width: 0,
  height: 0,
  borderLeft: "4px solid transparent",
  borderRight: "4px solid transparent",
  borderTop: "5px solid currentColor",
  transform: "rotate(-90deg)",
  transition: `transform ${vars.motion.fast}`,
  selectors: {
    [`${legacyToggle}[aria-expanded="true"] &`]: {
      transform: "rotate(0deg)",
    },
  },
});
