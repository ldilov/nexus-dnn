import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

const VP_MIN = "420px";
const VP_MIN_SM = "320px";

export const stage = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.25fr) minmax(260px, 0.82fr)",
  borderRadius: vars.radius.lg,
  overflow: "hidden",
  background: vars.color.surfaceMuted,
  boxShadow: vars.shadow.subtle,
  "@media": {
    "screen and (max-width: 760px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
});

export const viewport = style({
  position: "relative",
  minWidth: 0,
  minHeight: VP_MIN,
  background: `radial-gradient(120% 120% at 30% 18%, ${vars.color.surfaceHigh}, ${vars.color.canvas} 70%)`,
  cursor: "grab",
  "@media": {
    "screen and (max-width: 760px)": { minHeight: VP_MIN_SM },
  },
});

/** The viewer paints its own chrome; the stage owns the rounded clip, so strip
 * the embedded radius/shadow and let it fill the viewport cell flush. */
export const viewer = style({
  borderRadius: "0 !important",
  boxShadow: "none !important",
});

export const grid = style({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  backgroundImage: `linear-gradient(color-mix(in oklab, ${vars.color.accent} 6%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, ${vars.color.accent} 6%, transparent) 1px, transparent 1px)`,
  backgroundSize: "34px 34px",
  maskImage: "radial-gradient(circle at 50% 62%, #000 0%, transparent 62%)",
  WebkitMaskImage: "radial-gradient(circle at 50% 62%, #000 0%, transparent 62%)",
});

export const eyebrow = style({
  position: "absolute",
  top: "14px",
  left: "16px",
  fontFamily: vars.font.mono,
  fontSize: "9.5px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: vars.color.textFaint,
  pointerEvents: "none",
});

export const empty = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.md,
  pointerEvents: "none",
});

export const emptyIcon = style({
  fontFamily: "'Material Symbols Outlined'",
  fontSize: "40px",
  lineHeight: 1,
  color: vars.color.textFaint,
  opacity: 0.5,
});

export const emptyText = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const meta = style({
  display: "flex",
  flexDirection: "column",
  padding: vars.space.xl,
  minWidth: 0,
  boxShadow: `inset 1px 0 0 ${vars.color.borderSubtle}`,
  "@media": {
    "screen and (max-width: 760px)": {
      boxShadow: `inset 0 1px 0 ${vars.color.borderSubtle}`,
    },
  },
});

export const metaHead = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  marginBottom: vars.space.xs,
});

const pulse = keyframes({
  "0%, 100%": { opacity: 1, transform: "scale(1)" },
  "50%": { opacity: 0.5, transform: "scale(0.88)" },
});

export const statusDot = style({
  width: "8px",
  height: "8px",
  flexShrink: 0,
  borderRadius: "50%",
  background: vars.color.textFaint,
});

export const dotIdle = style({ background: vars.color.textFaint });

export const dotRunning = style({
  background: vars.color.accent,
  boxShadow: `0 0 8px ${vars.color.accentGlow}`,
  animation: `${pulse} 1.5s ease-in-out infinite`,
  "@media": { "(prefers-reduced-motion: reduce)": { animation: "none" } },
});

export const dotDone = style({
  background: vars.color.success,
  boxShadow: "0 0 8px color-mix(in oklab, #22c55e 60%, transparent)",
});

export const dotError = style({
  background: vars.color.danger,
  boxShadow: `0 0 8px color-mix(in oklab, ${vars.color.danger} 50%, transparent)`,
});

export const metaTitle = style({
  fontSize: vars.text.subhead,
  fontWeight: vars.weight.semibold,
  color: vars.color.text,
});

export const metaId = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textFaint,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const rows = style({
  marginTop: vars.space.lg,
  display: "flex",
  flexDirection: "column",
});

export const kvRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,
  padding: `${vars.space.md} 0`,
  boxShadow: `inset 0 1px 0 ${vars.color.borderSubtle}`,
});

export const kvKey = style({
  fontFamily: vars.font.mono,
  fontSize: "9.5px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: vars.color.textFaint,
});

export const kvVal = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.text,
  fontVariantNumeric: "tabular-nums",
});

export const actions = style({
  marginTop: "auto",
  paddingTop: vars.space.lg,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const actionRow = style({
  display: "flex",
  gap: vars.space.md,
});

export const download = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.xs,
  flex: 1,
  height: "42px",
  padding: `0 ${vars.space.lg}`,
  borderRadius: vars.radius.md,
  background: vars.color.accent,
  color: vars.color.accentOn,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  fontWeight: vars.weight.semibold,
  textDecoration: "none",
  transition: `background ${vars.motion.fast}, box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:hover": { background: vars.color.accentDim, boxShadow: vars.shadow.glow },
    "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focusRing },
  },
});

export const downloadDisabled = style({
  background: vars.color.surfaceHigh,
  color: vars.color.textFaint,
  cursor: "not-allowed",
  selectors: {
    "&:hover": { background: vars.color.surfaceHigh, boxShadow: "none" },
  },
});

export const downloadIcon = style({
  fontFamily: "'Material Symbols Outlined'",
  fontSize: "18px",
  lineHeight: 1,
});

/** Download steps down to a quiet outlined treatment so the accent-filled
 * "Refine detail" reads as the primary next action on a finished mesh. */
export const downloadSecondary = style({
  background: "transparent",
  color: vars.color.text,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  selectors: {
    "&:hover": {
      background: `color-mix(in oklab, ${vars.color.accent} 6%, transparent)`,
      boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
    },
  },
});

export const refine = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.xs,
  flex: 1,
  height: "42px",
  padding: `0 ${vars.space.lg}`,
  border: "none",
  borderRadius: vars.radius.md,
  background: vars.color.accent,
  color: vars.color.accentOn,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  fontWeight: vars.weight.semibold,
  cursor: "pointer",
  transition: `background ${vars.motion.fast}, box-shadow ${vars.motion.fast}, opacity ${vars.motion.fast}`,
  selectors: {
    "&:hover:not(:disabled)": {
      background: vars.color.accentDim,
      boxShadow: vars.shadow.glow,
    },
    "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focusRing },
    "&:disabled": { cursor: "not-allowed", opacity: 0.55 },
  },
});

export const refineIcon = style({
  fontFamily: "'Material Symbols Outlined'",
  fontSize: "18px",
  lineHeight: 1,
});

export const qualityRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.sm,
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceInset,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
});

export const qualityLabel = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: "0.04em",
  color: vars.color.textMuted,
});

export const qualityIcon = style({
  fontFamily: "'Material Symbols Outlined'",
  fontSize: "16px",
  lineHeight: 1,
  color: vars.color.textFaint,
  flexShrink: 0,
});

export const qualitySelect = style({
  flexShrink: 0,
  appearance: "none",
  background: "transparent",
  border: "none",
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  fontWeight: vars.weight.medium,
  color: vars.color.text,
  cursor: "pointer",
  transition: `background ${vars.motion.fast}`,
  selectors: {
    "&:hover:not(:disabled)": {
      background: `color-mix(in oklab, ${vars.color.accent} 8%, transparent)`,
    },
    "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focusRing },
    "&:disabled": { cursor: "not-allowed", opacity: 0.55 },
  },
});

export const cropSlot = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.sm,
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceInset,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
});

export const cropLabel = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: "0.04em",
  color: vars.color.textMuted,
  minWidth: 0,
});

export const cropLabelIcon = style({
  fontFamily: "'Material Symbols Outlined'",
  fontSize: "16px",
  lineHeight: 1,
  color: vars.color.textFaint,
  flexShrink: 0,
});

export const cropName = style({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: vars.color.text,
});

export const cropButton = style({
  flexShrink: 0,
  background: "transparent",
  border: "none",
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  fontWeight: vars.weight.medium,
  color: vars.color.textMuted,
  cursor: "pointer",
  transition: `color ${vars.motion.fast}, background ${vars.motion.fast}`,
  selectors: {
    "&:hover:not(:disabled)": {
      color: vars.color.text,
      background: `color-mix(in oklab, ${vars.color.accent} 8%, transparent)`,
    },
    "&:disabled": { cursor: "not-allowed", opacity: 0.55 },
  },
});

export const cropInput = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
});
