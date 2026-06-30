import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,
  width: "100%",
  padding: 0,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: vars.color.text,
});

export const title = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textMuted,
});

export const chevron = style({
  fontFamily: "'Material Symbols Outlined'",
  fontSize: "20px",
  lineHeight: 1,
  color: vars.color.textMuted,
  transition: `transform ${vars.motion.fast}`,
  selectors: {
    "&[data-open='true']": { transform: "rotate(180deg)" },
  },
});

export const intro = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  lineHeight: 1.45,
  margin: 0,
});

export const body = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const stage = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  margin: 0,
  padding: vars.space.md,
  border: "none",
  borderRadius: vars.radius.md,
  background: vars.color.surfaceRaised,
});

export const legend = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  padding: 0,
  marginBottom: vars.space.xs,
});

export const stageTitle = style({
  fontSize: vars.text.body,
  fontWeight: vars.weight.semibold,
  color: vars.color.text,
});

export const stageBlurb = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: vars.space.md,
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: "7px",
});

export const label = style({
  fontSize: "11px",
  fontWeight: vars.weight.semibold,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: vars.color.textMuted,
});

export const input = style({
  width: "100%",
  height: "40px",
  padding: "0 12px",
  borderRadius: "9px",
  background: vars.color.surface,
  color: vars.color.text,
  border: "none",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  fontFamily: vars.font.mono,
  fontSize: "15px",
  fontWeight: vars.weight.semibold,
  fontVariantNumeric: "tabular-nums",
  transition: `box-shadow ${vars.motion.fast}`,
  selectors: {
    "&::placeholder": {
      color: vars.color.textFaint,
      fontWeight: vars.weight.body,
    },
    "&:hover": { boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}` },
    "&:focus-visible": {
      outline: "none",
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, 0 0 0 3px ${vars.color.accentGlow}`,
    },
    "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
  },
});

export const help = style({
  fontSize: "11px",
  color: vars.color.textFaint,
  lineHeight: 1.4,
});
