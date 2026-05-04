import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

/* ── Generate panel — editorial direction ──────────────────────────
   The Generate slot is the recipe's hero call-to-action. We treat it as a
   single editorial card: dense diagnostic strip on the left, oversized
   primary CTA on the right with accent glow. Status banners and the
   progress table flow below as secondary information. */

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const card = style({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: vars.space.xl,
  alignItems: "center",
  padding: vars.space.xl,
  borderRadius: vars.radius.lg,
  background: `linear-gradient(135deg,
    color-mix(in oklab, ${vars.color.accent} 8%, ${vars.color.surfaceMuted}) 0%,
    ${vars.color.surfaceMuted} 60%)`,
  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 16%, transparent)`,
  overflow: "hidden",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: `radial-gradient(620px 200px at 100% 0%, color-mix(in oklab, ${vars.color.accent} 14%, transparent), transparent 70%)`,
    },
  },
  "@media": {
    "(max-width: 720px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
      gap: vars.space.lg,
    },
  },
});

export const diagnostics = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  minWidth: 0,
});

export const diagnosticsLabel = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  color: vars.color.textFaint,
  fontWeight: 600,
});

export const diagList = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.xs,
  listStyle: "none",
  padding: 0,
  margin: 0,
});

export const diagItem = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  paddingInline: vars.space.md,
  height: "30px",
  borderRadius: vars.radius.pill,
  background: vars.color.surface,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.text,
});

export const diagDot = style({
  width: "6px",
  height: "6px",
  borderRadius: "999px",
  flexShrink: 0,
  selectors: {
    '&[data-status="ok"]': { background: vars.color.success },
    '&[data-status="warn"]': { background: vars.color.warning },
    '&[data-status="fail"]': {
      background: vars.color.danger,
      boxShadow: `0 0 6px ${vars.color.danger}`,
    },
  },
});

export const diagLabel = style({
  fontWeight: 600,
});

export const diagDetail = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
});

export const cta = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  flexShrink: 0,
});

const ctaPulse = keyframes({
  "0%, 100%": {
    boxShadow: `0 0 0 0 color-mix(in oklab, ${vars.color.accent} 60%, transparent)`,
  },
  "50%": {
    boxShadow: `0 0 0 8px color-mix(in oklab, ${vars.color.accent} 0%, transparent)`,
  },
});

export const generateBtn = style({
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  height: "52px",
  paddingInline: vars.space.xl,
  border: "none",
  borderRadius: vars.radius.md,
  background: vars.color.accent,
  color: vars.color.accentOn,
  fontFamily: vars.font.display,
  fontSize: vars.text.subhead,
  fontWeight: 600,
  letterSpacing: "-0.005em",
  cursor: "pointer",
  boxShadow: `0 8px 24px -8px color-mix(in oklab, ${vars.color.accent} 60%, transparent), inset 0 1px 0 0 color-mix(in oklab, white 14%, transparent)`,
  transition: `transform ${vars.motion.fast}, box-shadow ${vars.motion.fast}, color ${vars.motion.fast}, background ${vars.motion.fast}`,
  selectors: {
    "&:hover:not(:disabled)": {
      color: vars.color.text,
      transform: "translateY(-1px)",
      boxShadow: `0 12px 32px -8px color-mix(in oklab, ${vars.color.accent} 80%, transparent), ${vars.shadow.glow}, inset 0 1px 0 0 color-mix(in oklab, white 24%, transparent)`,
    },
    "&:active:not(:disabled)": {
      transform: "translateY(0)",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "3px",
    },
    '&[data-state="running"]': {
      animation: `${ctaPulse} 1.6s ease-in-out infinite`,
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.55,
      filter: "saturate(0.6)",
      boxShadow: "none",
    },
  },
});

export const ctaIcon = style({
  fontSize: vars.text.subhead,
  lineHeight: 1,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

export const cancelBtn = style({
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  height: "52px",
  paddingInline: vars.space.lg,
  border: "none",
  borderRadius: vars.radius.md,
  background: "transparent",
  color: vars.color.textMuted,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  fontWeight: 500,
  cursor: "pointer",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}, box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:hover:not(:disabled)": {
      background: `color-mix(in oklab, ${vars.color.danger} 12%, transparent)`,
      color: vars.color.danger,
      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.danger} 50%, transparent)`,
    },
    "&:disabled": {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
});

const spinKeyframes = keyframes({
  to: { transform: "rotate(360deg)" },
});

export const spinner = style({
  display: "inline-block",
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  border: `2px solid color-mix(in oklab, currentColor 25%, transparent)`,
  borderTopColor: "currentColor",
  animation: `${spinKeyframes} 0.8s linear infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const queueChip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  paddingInline: vars.space.sm,
  height: "22px",
  borderRadius: vars.radius.pill,
  background: `color-mix(in oklab, ${vars.color.accent} 18%, transparent)`,
  color: vars.color.text,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  fontWeight: 600,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  marginLeft: vars.space.sm,
});

const queuePulseKeyframes = keyframes({
  "0%, 100%": { opacity: 1, transform: "scale(1)" },
  "50%": { opacity: 0.55, transform: "scale(0.9)" },
});

export const queueDot = style({
  width: "6px",
  height: "6px",
  borderRadius: "999px",
  background: vars.color.accent,
  animation: `${queuePulseKeyframes} 1.5s ease-in-out infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});
