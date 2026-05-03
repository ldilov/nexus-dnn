import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../theme/tokens.css";

const base = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.xs,
  borderRadius: vars.radius.sm,
  border: "1px solid transparent",
  fontFamily: vars.font.body,
  fontWeight: 600,
  cursor: "pointer",
  transition: `background ${vars.motion.fast}, box-shadow ${vars.motion.fast}, transform ${vars.motion.fast}, color ${vars.motion.fast}, border-color ${vars.motion.fast}`,
  ":active": { transform: "translateY(1px)" },
  ":disabled": { cursor: "not-allowed", opacity: 0.55, transform: "none" },
});

export const variantStyle = styleVariants({
  primary: [
    base,
    {
      background: vars.color.accent,
      color: vars.color.accentOn,
      boxShadow: `0 0 0 1px ${vars.color.accent}`,
      ":hover": {
        boxShadow: `0 0 0 1px ${vars.color.accent}, ${vars.color.accentGlow}`,
      },
    },
  ],
  secondary: [
    base,
    {
      background: vars.color.surfaceHigh,
      color: vars.color.text,
      borderColor: vars.color.borderSubtle,
      ":hover": {
        borderColor: vars.color.accent,
        boxShadow: vars.shadow.subtle,
      },
    },
  ],
  ghost: [
    base,
    {
      background: "transparent",
      color: vars.color.textMuted,
      borderColor: vars.color.borderGhost,
      ":hover": {
        color: vars.color.text,
        borderColor: vars.color.borderSubtle,
      },
    },
  ],
  danger: [
    base,
    {
      background: vars.color.danger,
      color: vars.color.accentOn,
      ":hover": {
        // audit-allow: px — sub-token spacing value, no density token at this step
        boxShadow: `0 0 0 1px ${vars.color.danger}, 0 0 24px color-mix(in oklab, ${vars.color.danger} 35%, transparent)`,
      },
    },
  ],
  warning: [
    base,
    {
      background: `color-mix(in oklab, ${vars.color.warning} 14%, transparent)`,
      color: vars.color.warning,
      borderColor: `color-mix(in oklab, ${vars.color.warning} 35%, transparent)`,
      ":hover": {
        background: `color-mix(in oklab, ${vars.color.warning} 22%, transparent)`,
      },
    },
  ],
});

export const sizeStyle = styleVariants({
  sm: { padding: `${vars.space.xs} ${vars.space.md}`, fontSize: vars.text.caption },
  md: { padding: `${vars.space.sm} ${vars.space.md}`, fontSize: vars.text.body },
  lg: { padding: `${vars.space.sm} ${vars.space.lg}`, fontSize: vars.text.body },
});

export type ButtonVariant = keyof typeof variantStyle;
export type ButtonSize = keyof typeof sizeStyle;
