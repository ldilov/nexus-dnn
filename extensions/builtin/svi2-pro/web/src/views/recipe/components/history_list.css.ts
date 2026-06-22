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
  gap: vars.space.sm,
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

export const deleteBtn = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: "26px",
  height: "26px",
  padding: 0,
  borderRadius: vars.radius.sm,
  background: "transparent",
  border: "none",
  color: vars.color.textFaint,
  cursor: "pointer",
  transition: `color ${vars.motion.fast}, background ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      color: vars.color.danger,
      background: `color-mix(in oklab, ${vars.color.danger} 14%, transparent)`,
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow: vars.shadow.focusRing,
    },
  },
});

export const meta = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: 0,
});

export const preset = style({
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.text,
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
