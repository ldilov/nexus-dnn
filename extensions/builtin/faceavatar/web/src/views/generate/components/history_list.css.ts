import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const row = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceMuted,
  width: "100%",
  color: vars.color.text,
  transition: `background ${vars.motion.fast}`,
  selectors: {
    "&:hover": { background: vars.color.surfaceHigh },
  },
});

export const thumb = style({
  width: "44px",
  height: "44px",
  flexShrink: 0,
  objectFit: "cover",
  borderRadius: vars.radius.sm,
  background: vars.color.canvas,
});

export const thumbFallback = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "44px",
  height: "44px",
  flexShrink: 0,
  borderRadius: vars.radius.sm,
  background: vars.color.canvas,
  color: vars.color.textFaint,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
});

export const openBtn = style({
  flex: 1,
  minWidth: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,
  padding: 0,
  background: "transparent",
  border: "none",
  textAlign: "left",
  cursor: "pointer",
  color: "inherit",
  selectors: {
    "&:focus-visible": {
      outline: "none",
      boxShadow: vars.shadow.focusRing,
      borderRadius: vars.radius.sm,
    },
  },
});

export const meta = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: 0,
});

export const jobId = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  fontWeight: 600,
  color: vars.color.text,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const summary = style({
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const right = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  flexShrink: 0,
});

export const time = style({
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
  whiteSpace: "nowrap",
});

const iconBtnBase = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: "28px",
  height: "28px",
  padding: 0,
  borderRadius: vars.radius.sm,
  background: "transparent",
  border: "none",
  color: vars.color.textFaint,
  cursor: "pointer",
  textDecoration: "none",
  transition: `color ${vars.motion.fast}, background ${vars.motion.fast}`,
  selectors: {
    "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focusRing },
  },
});

export const downloadBtn = style([
  iconBtnBase,
  {
    selectors: {
      "&:hover": {
        color: vars.color.accent,
        background: `color-mix(in oklab, ${vars.color.accent} 14%, transparent)`,
      },
    },
  },
]);

export const downloadDisabled = style({
  opacity: 0.4,
  pointerEvents: "none",
});

export const deleteBtn = style([
  iconBtnBase,
  {
    selectors: {
      "&:hover": {
        color: vars.color.danger,
        background: `color-mix(in oklab, ${vars.color.danger} 14%, transparent)`,
      },
    },
  },
]);

export const srOnly = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
});
