import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../theme/tokens.css";

/* ── Button — canonical contract (emotion-tts extension) ──────────────────
 * Mirror of apps/web/src/components/base/button.css.ts. The two primitives
 * ─────────────────────────────────────────────────────────────────────── */

const base = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.xs,
  borderRadius: vars.radius.md,
  border: "none",
  fontFamily: vars.font.body,
  fontWeight: 600,
  lineHeight: 1,
  whiteSpace: "nowrap",
  cursor: "pointer",
  transition: `background ${vars.motion.fast}, box-shadow ${vars.motion.fast}, color ${vars.motion.fast}, opacity ${vars.motion.fast}, border-color ${vars.motion.fast}`,
  selectors: {
    "&:active:not(:disabled)": { transform: "translateY(1px)" },
    "&:disabled, &[aria-disabled='true']": {
      cursor: "not-allowed",
      opacity: 0.55,
      transform: "none",
    },
    "&[aria-busy='true']": { cursor: "progress" },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "2px",
    },
  },
});

export const variantStyle = styleVariants({
  primary: [
    base,
    {
      background: vars.color.accent,
      color: vars.color.accentOn,
      selectors: {
        "&:hover:not(:disabled)": {
          background: vars.color.accentDim,
        },
      },
    },
  ],
  secondary: [
    base,
    {
      background: "transparent",
      color: vars.color.text,
      boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
      selectors: {
        "&:hover:not(:disabled)": {
          boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
          background: `color-mix(in oklab, ${vars.color.accent} 6%, transparent)`,
        },
      },
    },
  ],
  ghost: [
    base,
    {
      background: "transparent",
      color: vars.color.textMuted,
      selectors: {
        "&:hover:not(:disabled)": {
          color: vars.color.text,
          background: `color-mix(in oklab, ${vars.color.accent} 8%, transparent)`,
        },
      },
    },
  ],
  danger: [
    base,
    {
      background: vars.color.danger,
      color: vars.color.accentOn,
      selectors: {
        "&:hover:not(:disabled)": { opacity: 0.9 },
      },
    },
  ],
  // Alias — kept so any legacy `variant="warning"` call sites keep rendering.
  warning: [
    base,
    {
      background: `color-mix(in oklab, ${vars.color.warning} 14%, transparent)`,
      color: vars.color.warning,
      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.warning} 35%, transparent)`,
      selectors: {
        "&:hover:not(:disabled)": {
          background: `color-mix(in oklab, ${vars.color.warning} 22%, transparent)`,
        },
      },
    },
  ],
});

export const sizeStyle = styleVariants({
  // audit-allow: px — Button-specific touch-target scale.
  xs: { height: "24px", padding: `0 ${vars.space.sm}`, fontSize: vars.text.caption },
  // audit-allow: px — Button-specific touch-target scale.
  sm: { height: "32px", padding: `0 ${vars.space.md}`, fontSize: vars.text.caption },
  // audit-allow: px — Button-specific touch-target scale.
  md: { height: "40px", padding: `0 ${vars.space.lg}`, fontSize: vars.text.body },
  // audit-allow: px — Button-specific touch-target scale.
  lg: { height: "48px", padding: `0 ${vars.space.xl}`, fontSize: vars.text.body },
});

export const iconOnlyStyle = styleVariants({
  // audit-allow: px — square aspect for icon-only buttons.
  xs: { width: "24px", padding: 0, borderRadius: vars.radius.pill },
  // audit-allow: px — square aspect for icon-only buttons.
  sm: { width: "32px", padding: 0, borderRadius: vars.radius.pill },
  // audit-allow: px — square aspect for icon-only buttons.
  md: { width: "40px", padding: 0, borderRadius: vars.radius.pill },
  // audit-allow: px — square aspect for icon-only buttons.
  lg: { width: "48px", padding: 0, borderRadius: vars.radius.pill },
});

const spin = keyframes({
  to: { transform: "rotate(360deg)" },
});

export const spinner = style({
  display: "inline-block",
  // audit-allow: px — spinner glyph size sub-token.
  width: "14px",
  // audit-allow: px — spinner glyph size sub-token.
  height: "14px",
  // audit-allow: px — spinner border thickness sub-token.
  border: "2px solid color-mix(in oklab, currentColor 25%, transparent)",
  borderTopColor: "currentColor",
  borderRadius: "50%",
  animation: `${spin} 0.8s linear infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export type ButtonVariant = keyof typeof variantStyle;
export type ButtonSize = keyof typeof sizeStyle;
