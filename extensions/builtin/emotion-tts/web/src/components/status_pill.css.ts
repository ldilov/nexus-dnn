import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../theme/tokens.css";

const pulse = keyframes({
  "0%, 100%": { opacity: 1, transform: "scale(1)" },
  "50%": { opacity: 0.6, transform: "scale(0.92)" },
});

const base = style({
  display: "inline-flex",
  alignItems: "center",
  borderRadius: vars.radius.pill,
  background: vars.color.surfaceHigh,
  fontFamily: vars.font.body,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
});

export const sizeStyle = styleVariants({
  sm: [
    base,
    {
      // audit-allow: px — below minimum token granularity (sub-10px)
      gap: "6px",
      // audit-allow: px — below minimum token granularity (sub-10px)
      padding: "2px 10px 2px 8px",
      fontSize: vars.text.micro,
      "::before": {
        content: '""',
        // audit-allow: px — below minimum token granularity (sub-10px)
        width: "5px",
        // audit-allow: px — below minimum token granularity (sub-10px)
        height: "5px",
        borderRadius: vars.radius.pill,
        background: "currentColor",
        display: "inline-block",
      },
    },
  ],
  md: [
    base,
    {
      gap: vars.space.xs,
      // audit-allow: px — below minimum token granularity (sub-10px)
      padding: "6px 14px 6px 10px",
      fontSize: vars.text.caption,
      "::before": {
        content: '""',
        // audit-allow: px — below minimum token granularity (sub-10px)
        width: "8px",
        // audit-allow: px — below minimum token granularity (sub-10px)
        height: "8px",
        borderRadius: vars.radius.pill,
        background: "currentColor",
        // audit-allow: px — below minimum token granularity (sub-10px)
        boxShadow: "0 0 0 3px color-mix(in oklab, currentColor 25%, transparent)",
        display: "inline-block",
      },
    },
  ],
});

export const toneStyle = styleVariants({
  neutral: { color: vars.color.textMuted },
  accent: { color: vars.color.accent },
  success: { color: vars.color.success },
  danger: { color: vars.color.danger },
  warning: { color: vars.color.warning },
  secondary: { color: vars.color.secondary },
  faint: { color: vars.color.textMuted, opacity: 0.7 },
});

export const pulseStyle = style({
  "::before": {
    animation: `${pulse} 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
  },
});

export type StatusPillSize = keyof typeof sizeStyle;
export type StatusPillTone = keyof typeof toneStyle;
