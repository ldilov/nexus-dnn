import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const node = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  minWidth: "160px",
  padding: `${vars.space.md} ${vars.space.lg}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surfaceGlass,
  backdropFilter: "blur(16px)",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  color: vars.color.text,
  transition: `box-shadow ${vars.motion.normal}`,
});

export const stateNode = styleVariants({
  idle: {},
  active: {
    boxShadow: `inset 0 0 0 1px ${vars.color.accent}, ${vars.shadow.glow}`,
  },
  done: {
    boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.success} 60%, transparent)`,
  },
  error: {
    boxShadow: `inset 0 0 0 1px ${vars.color.danger}`,
  },
});

export const titleRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.sm,
});

export const title = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.caption,
  fontWeight: 600,
});

export const subtitle = style({
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
});

export const dot = styleVariants({
  idle: { background: vars.color.textFaint },
  active: { background: vars.color.accent },
  done: { background: vars.color.success },
  error: { background: vars.color.danger },
});

export const dotBase = style({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  flexShrink: 0,
});
