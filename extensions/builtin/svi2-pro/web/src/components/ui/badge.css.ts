import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

const base = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `2px ${vars.space.sm}`,
  borderRadius: vars.radius.pill,
  fontSize: vars.text.micro,
  fontWeight: 600,
  letterSpacing: "0.02em",
  whiteSpace: "nowrap",
});

export const toneStyle = styleVariants({
  neutral: [
    base,
    {
      background: `color-mix(in oklab, ${vars.color.textMuted} 14%, transparent)`,
      color: vars.color.textMuted,
    },
  ],
  accent: [
    base,
    {
      background: `color-mix(in oklab, ${vars.color.accent} 16%, transparent)`,
      color: vars.color.accent,
    },
  ],
  warning: [
    base,
    {
      background: `color-mix(in oklab, ${vars.color.warning} 16%, transparent)`,
      color: vars.color.warning,
    },
  ],
  success: [
    base,
    {
      background: `color-mix(in oklab, ${vars.color.success} 16%, transparent)`,
      color: vars.color.success,
    },
  ],
});

export type BadgeTone = keyof typeof toneStyle;
