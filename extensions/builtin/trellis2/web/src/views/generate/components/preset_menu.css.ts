import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const wrap = style({
  position: "relative",
  display: "inline-flex",
  alignSelf: "flex-start",
});

export const trigger = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceMuted,
  border: `1px solid ${vars.color.borderSubtle}`,
  color: vars.color.text,
  cursor: "pointer",
  transition: `border-color ${vars.motion.fast}, background ${vars.motion.fast}`,
  selectors: {
    "&:hover:not(:disabled)": { borderColor: vars.color.accent },
    "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
    "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focusRing },
  },
});

export const triggerIcon = style({
  fontFamily: "'Material Symbols Outlined'",
  fontSize: "18px",
  lineHeight: 1,
  color: vars.color.textMuted,
});

export const triggerLabel = style({
  fontSize: vars.text.body,
  fontWeight: 600,
});

export const triggerValue = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.accent,
});

export const triggerChevron = style({
  fontFamily: "'Material Symbols Outlined'",
  fontSize: "18px",
  lineHeight: 1,
  color: vars.color.textMuted,
  transition: `transform ${vars.motion.fast}`,
  selectors: {
    "&[data-open='true']": { transform: "rotate(180deg)" },
  },
});

export const menu = style({
  position: "absolute",
  top: "calc(100% + 6px)",
  left: 0,
  zIndex: 20,
  minWidth: "220px",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  padding: vars.space.xs,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceRaised,
  border: `1px solid ${vars.color.borderSubtle}`,
  boxShadow: vars.shadow.raised,
});

export const item = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "2px",
  width: "100%",
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.sm,
  background: "transparent",
  border: "1px solid transparent",
  color: vars.color.text,
  cursor: "pointer",
  textAlign: "left",
  transition: `background ${vars.motion.fast}, border-color ${vars.motion.fast}`,
  selectors: {
    "&:hover:not(:disabled)": { background: vars.color.surfaceHigh },
    "&[data-active='true']": {
      borderColor: vars.color.accent,
      background: vars.color.surfaceHigh,
    },
    "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
    "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focusRing },
  },
});

export const itemLabel = style({
  fontSize: vars.text.body,
  fontWeight: 600,
});

export const itemHint = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
});
