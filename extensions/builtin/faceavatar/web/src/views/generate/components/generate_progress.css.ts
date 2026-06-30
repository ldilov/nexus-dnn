import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const stageLine = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  fontWeight: 500,
  color: vars.color.text,
});

const dotPulse = keyframes({
  "0%, 100%": { opacity: 1, transform: "scale(1)" },
  "50%": { opacity: 0.5, transform: "scale(0.88)" },
});

export const stageDot = style({
  width: "8px",
  height: "8px",
  flexShrink: 0,
  borderRadius: "50%",
  background: vars.color.accent,
  boxShadow: `0 0 8px ${vars.color.accentGlow}`,
  animation: `${dotPulse} 1.5s ease-in-out infinite`,
  "@media": { "(prefers-reduced-motion: reduce)": { animation: "none" } },
});

export const progressTrack = style({
  position: "relative",
  width: "100%",
  height: "6px",
  borderRadius: vars.radius.pill,
  background: vars.color.surfaceFloor,
  overflow: "hidden",
});

export const progressFill = style({
  position: "absolute",
  inset: 0,
  transformOrigin: "left center",
  borderRadius: vars.radius.pill,
  background: `linear-gradient(90deg, ${vars.color.accentDim}, ${vars.color.accent})`,
  transition: `transform ${vars.motion.normal}`,
});

export const statRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.section,
});

export const stat = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const statLabel = style({
  fontFamily: vars.font.mono,
  fontSize: "9.5px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: vars.color.textFaint,
});

export const statValue = style({
  fontFamily: vars.font.mono,
  fontSize: "1.3125rem",
  fontWeight: 500,
  lineHeight: 1,
  color: vars.color.text,
  fontVariantNumeric: "tabular-nums",
});

export const statValueAccent = style({
  color: vars.color.accent,
  textTransform: "capitalize",
});

export const actions = style({
  display: "flex",
  gap: vars.space.sm,
});

export const errorBox = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  padding: vars.space.lg,
  borderRadius: vars.radius.md,
  background: `color-mix(in oklab, ${vars.color.danger} 12%, transparent)`,
  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.danger} 40%, transparent)`,
});

export const errorTitle = style({
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.danger,
});

export const errorHint = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const resultCard = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const doneHead = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
});

export const doneDot = style({
  width: "8px",
  height: "8px",
  flexShrink: 0,
  borderRadius: "50%",
  background: vars.color.success,
  boxShadow: "0 0 8px color-mix(in oklab, #22c55e 60%, transparent)",
});

export const doneTitle = style({
  fontSize: vars.text.subhead,
  fontWeight: vars.weight.semibold,
  color: vars.color.text,
});

export const doneHint = style({
  margin: 0,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const reportGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
  gap: vars.space.md,
});

export const reportItem = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: 0,
});

export const reportKey = style({
  fontSize: vars.text.micro,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: vars.color.textFaint,
});

export const reportValue = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.text,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
