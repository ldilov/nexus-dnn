import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — sub-token spacing for tight bar list
  gap: "2px",
  width: "100%",
});

export const row = style({
  display: "grid",
  // audit-allow: px — fixed label column for vertical alignment
  gridTemplateColumns: "84px 1fr 36px",
  alignItems: "center",
  gap: vars.space.sm,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  background: "transparent",
  border: "none",
  borderRadius: vars.radius.sm,
  textAlign: "left",
  cursor: "pointer",
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}`,
  ":hover": {
    background: vars.color.surfaceMuted,
  },
  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.55,
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow: vars.shadow.focusRing,
    },
  },
});

export const rowOn = style({
  color: vars.color.text,
});

export const rowActive = style({
  background: vars.color.surfaceMuted,
});

export const name = style({
  textTransform: "capitalize",
  fontFamily: vars.font.display,
  letterSpacing: vars.tracking.body,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const track = style({
  display: "block",
  position: "relative",
  // audit-allow: px — bar height below sub-token granularity
  height: "4px",
  background: vars.color.borderSubtle,
  borderRadius: vars.radius.pill,
  overflow: "hidden",
  pointerEvents: "none",
});

export const fill = style({
  display: "block",
  height: "100%",
  background: vars.color.accent,
  boxShadow: `0 0 6px ${vars.color.accentGlow}`,
  borderRadius: "inherit",
  transition: `width ${vars.motion.fast}`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: "none",
    },
  },
});

export const value = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textFaint,
  textAlign: "right",
  fontVariantNumeric: "tabular-nums",
  selectors: {
    [`${rowOn} &`]: {
      color: vars.color.accent,
    },
  },
});
