import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

const fadeUp = keyframes({
  from: { opacity: 0, transform: "translateY(10px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

const pulse = keyframes({
  "0%": { opacity: 0.5, transform: "scale(1)" },
  "50%": { opacity: 1, transform: "scale(1.08)" },
  "100%": { opacity: 0.5, transform: "scale(1)" },
});

export const shell = style({
  minHeight: "100vh",
  background: vars.color.surface,
  backgroundImage: `radial-gradient(800px 460px at 85% -10%, color-mix(in oklab, ${vars.color.secondary} 14%, transparent), transparent 60%), radial-gradient(560px 400px at -10% 110%, color-mix(in oklab, ${vars.color.accent} 10%, transparent), transparent 60%)`,
  color: vars.color.text,
  fontFamily: vars.font.body,
  padding: `${vars.space.xl} ${vars.space.lg}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.xl,
});

export const frame = style({
  width: "100%",
  maxWidth: "960px",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const hero = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  animation: `${fadeUp} 320ms cubic-bezier(0.16, 1, 0.3, 1) both`,
});

export const eyebrow = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.accent,
  margin: 0,
});

export const titleRow = style({
  display: "flex",
  alignItems: "baseline",
  gap: vars.space.md,
  flexWrap: "wrap",
});

export const title = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.display,
  fontWeight: 600,
  letterSpacing: vars.tracking.display,
  lineHeight: 1.05,
  margin: 0,
});

export const liveChip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: "4px 10px",
  borderRadius: vars.radius.pill,
  background: `color-mix(in oklab, ${vars.color.success} 14%, transparent)`,
  color: vars.color.success,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  "::before": {
    content: '""',
    width: "6px",
    height: "6px",
    borderRadius: vars.radius.pill,
    background: "currentColor",
    animation: `${pulse} 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
  },
});

export const lede = style({
  margin: 0,
  fontSize: vars.text.body,
  color: vars.color.textMuted,
  maxWidth: "62ch",
});

export const panel = style({
  background: vars.color.surfaceRaised,
  borderRadius: vars.radius.lg,
  padding: vars.space.sm,
  boxShadow: vars.shadow.subtle,
  animation: `${fadeUp} 400ms 80ms cubic-bezier(0.16, 1, 0.3, 1) both`,
});

export const list = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export const row = style({
  display: "grid",
  gridTemplateColumns: "56px 1fr auto auto",
  alignItems: "center",
  gap: vars.space.md,
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  transition: `background ${vars.motion.fast}`,
  ":hover": { background: vars.color.surfaceMuted },
  "@media": {
    "(max-width: 640px)": {
      gridTemplateColumns: "56px 1fr",
      rowGap: vars.space.xs,
    },
  },
});

export const rowActive = style({
  background: `linear-gradient(90deg, color-mix(in oklab, ${vars.color.accent} 10%, transparent), transparent 70%)`,
  boxShadow: `inset 3px 0 0 ${vars.color.accent}`,
});

export const position = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.head,
  fontWeight: 600,
  color: vars.color.textMuted,
  letterSpacing: vars.tracking.display,
  fontVariantNumeric: "tabular-nums",
  textAlign: "center",
});

export const positionActive = style([
  position,
  {
    color: vars.color.accent,
  },
]);

export const identity = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: 0,
});

export const deployment = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.text,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const runId = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textFaint,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const kindBadge = style({
  display: "inline-flex",
  alignItems: "center",
  padding: "3px 10px",
  borderRadius: vars.radius.pill,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  fontWeight: 600,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  background: vars.color.surfaceHigh,
  color: vars.color.textMuted,
});

export const kindBadgeBatch = style([
  kindBadge,
  {
    color: vars.color.accent,
    background: `color-mix(in oklab, ${vars.color.accent} 12%, transparent)`,
  },
]);

export const kindBadgeTest = style([
  kindBadge,
  {
    color: vars.color.secondary,
    background: `color-mix(in oklab, ${vars.color.secondary} 14%, transparent)`,
  },
]);

export const kindBadgeResume = style([
  kindBadge,
  {
    color: vars.color.warning,
    background: `color-mix(in oklab, ${vars.color.warning} 14%, transparent)`,
  },
]);

export const eta = style({
  display: "flex",
  flexDirection: "column",
  gap: "0px",
  textAlign: "right",
  minWidth: "72px",
});

export const etaValue = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.text,
  fontVariantNumeric: "tabular-nums",
});

export const etaLabel = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.micro,
  color: vars.color.textFaint,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
});

export const errorBanner = style({
  padding: `${vars.space.md} ${vars.space.lg}`,
  borderRadius: vars.radius.md,
  background: `color-mix(in oklab, ${vars.color.danger} 14%, ${vars.color.surfaceRaised})`,
  color: vars.color.text,
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  "::before": {
    content: '"⚠"',
    fontSize: vars.text.subhead,
    color: vars.color.danger,
  },
});
