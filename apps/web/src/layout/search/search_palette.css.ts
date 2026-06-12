import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

const reducedMotion = "(prefers-reduced-motion: reduce)";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const dropIn = keyframes({
  from: { opacity: 0, transform: "translateY(-8px) scale(0.99)" },
  to: { opacity: 1, transform: "translateY(0) scale(1)" },
});

export const backdrop = style({
  position: "fixed",
  inset: 0,
  background:
    "radial-gradient(ellipse at top, rgba(10,12,18,0.5) 0%, rgba(2,3,6,0.74) 70%)",
  backdropFilter: "blur(10px) saturate(130%)",
  WebkitBackdropFilter: "blur(10px) saturate(130%)",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  paddingTop: "12vh",
  paddingInline: vars.density.d5,
  zIndex: vars.z.overlay,
  animation: `${fadeIn} 160ms ${vars.motion.easingDefault}`,
  "@media": { [reducedMotion]: { animation: "none" } },
});

export const palette = style({
  width: "min(560px, 100%)",
  maxHeight: "70vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: `${vars.color.bg.elevated}f2`,
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  borderRadius: vars.radius.panel,
  boxShadow: [
    `0 32px 90px ${vars.color.scrim}`,
    `0 0 0 1px color-mix(in oklch, ${vars.color.accent.primary} 12%, transparent)`,
    `inset 0 1px 0 ${vars.color.outline.variant}`,
  ].join(", "),
  fontFamily: vars.font.ui,
  color: vars.color.text.primary,
  overflow: "hidden",
  animation: `${dropIn} 200ms ${vars.motion.easingSpring}`,
  "@media": { [reducedMotion]: { animation: "none" } },
});

export const inputRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d3,
  padding: `${vars.density.d4} ${vars.density.d5}`,
  borderBottom: `1px solid ${vars.color.outline.variant}40`,
});

export const inputIcon = style({
  fontSize: vars.icon.md,
  color: vars.color.accent.primary,
  flexShrink: 0,
});

export const input = style({
  flex: 1,
  border: "none",
  outline: "none",
  background: "transparent",
  color: vars.color.text.primary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodyLg,
  letterSpacing: "0.01em",
  "::placeholder": { color: vars.color.text.muted },
});

export const kbdHint = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  color: vars.color.text.muted,
  padding: `2px ${vars.density.d2}`,
  borderRadius: vars.radius.control,
  backgroundColor: `${vars.color.bg.hover}80`,
  flexShrink: 0,
});

export const list = style({
  overflowY: "auto",
  padding: vars.density.d2,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export const groupTitle = style({
  fontSize: vars.text.eyebrow,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.muted,
  padding: `${vars.density.d3} ${vars.density.d3} ${vars.density.d2}`,
});

export const row = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d3,
  padding: `${vars.density.d3} ${vars.density.d3}`,
  borderRadius: vars.radius.card,
  cursor: "pointer",
  textAlign: "left",
  border: "none",
  background: "transparent",
  color: "inherit",
  width: "100%",
  transition: `background-color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": { backgroundColor: `${vars.color.bg.hover}66` },
  },
});

export const rowActive = style({
  backgroundColor: `color-mix(in oklch, ${vars.color.accent.primary} 18%, transparent)`,
  boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${vars.color.accent.primary} 40%, transparent)`,
  selectors: {
    "&:hover": {
      backgroundColor: `color-mix(in oklch, ${vars.color.accent.primary} 22%, transparent)`,
    },
  },
});

export const rowIcon = style({
  fontSize: vars.icon.md,
  color: vars.color.text.secondary,
  flexShrink: 0,
});

export const rowBody = style({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  flex: 1,
});

export const rowLabel = style({
  fontSize: vars.font.size.body,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.primary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const rowSub = style({
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  fontFamily: vars.font.code,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const stateChip = style({
  fontSize: vars.font.size.kbd,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.secondary,
  padding: `2px ${vars.density.d2}`,
  borderRadius: vars.radius.full,
  backgroundColor: `${vars.color.bg.hover}99`,
  flexShrink: 0,
});

export const enterHint = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  color: vars.color.accent.primary,
  flexShrink: 0,
  opacity: 0.85,
});

export const empty = style({
  padding: `${vars.density.d6} ${vars.density.d5}`,
  textAlign: "center",
  color: vars.color.text.muted,
  fontSize: vars.font.size.bodySm,
});
