import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  borderRadius: vars.radius.lg,
  background: vars.color.surfaceMuted,
  overflow: "hidden",
});

export const header = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  width: "100%",
  padding: `${vars.space.md} ${vars.space.lg}`,
  background: "transparent",
  border: "none",
  color: vars.color.text,
  cursor: "pointer",
  textAlign: "left",
  transition: `background ${vars.motion.fast}`,
  selectors: {
    "&:hover": { background: vars.color.surfaceHigh },
    "&:disabled": { cursor: "default" },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "-2px",
    },
  },
});

export const chevron = style({
  display: "inline-flex",
  width: "16px",
  height: "16px",
  color: vars.color.textMuted,
  transition: `transform ${vars.motion.fast}`,
});

export const chevronCollapsed = style({
  transform: "rotate(-90deg)",
});

export const titleBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  flex: 1,
  minWidth: 0,
});

export const title = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.text,
});

export const description = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const badgeSlot = style({
  display: "inline-flex",
  alignItems: "center",
  marginLeft: "auto",
});

export const body = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  padding: `0 ${vars.space.lg} ${vars.space.lg}`,
});
