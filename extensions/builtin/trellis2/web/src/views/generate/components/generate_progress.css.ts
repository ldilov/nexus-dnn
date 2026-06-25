import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const stageLine = style({
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.text,
});

export const progressTrack = style({
  position: "relative",
  width: "100%",
  height: "8px",
  borderRadius: vars.radius.pill,
  background: vars.color.surfaceInset,
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
  gap: vars.space.lg,
});

export const stat = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export const statLabel = style({
  fontSize: vars.text.micro,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: vars.color.textFaint,
});

export const statValue = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.text,
  fontVariantNumeric: "tabular-nums",
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

const pulse = keyframes({
  "0%, 100%": { opacity: 0.55 },
  "50%": { opacity: 1 },
});

export const resultCard = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const resultRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.lg,
  flexWrap: "wrap",
});

export const resultThumb = style({
  width: "140px",
  height: "140px",
  flexShrink: 0,
  objectFit: "cover",
  borderRadius: vars.radius.md,
  background: vars.color.canvas,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
});

export const thumbPlaceholder = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "140px",
  height: "140px",
  flexShrink: 0,
  borderRadius: vars.radius.md,
  background: vars.color.canvas,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  color: vars.color.textFaint,
  fontFamily: vars.font.mono,
  fontSize: "2rem",
  animation: `${pulse} 2.4s ease-in-out infinite`,
  "@media": { "(prefers-reduced-motion: reduce)": { animation: "none" } },
});

export const resultMeta = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  minWidth: 0,
  flex: 1,
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

export const downloadLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  height: "40px",
  padding: `0 ${vars.space.lg}`,
  borderRadius: vars.radius.md,
  background: vars.color.accent,
  color: vars.color.accentOn,
  fontWeight: 600,
  fontSize: vars.text.body,
  textDecoration: "none",
  alignSelf: "flex-start",
  transition: `background ${vars.motion.fast}, box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:hover": { background: vars.color.accentDim, boxShadow: vars.shadow.glow },
    "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focusRing },
  },
});
