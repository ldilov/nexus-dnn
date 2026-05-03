import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

const fadeUp = keyframes({
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  from: { opacity: 0, transform: "translateY(10px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const shell = style({
  minHeight: "100vh",
  background: vars.color.surface,
  // audit-allow: px — px — fixed layout breakpoint
  backgroundImage: `radial-gradient(1100px 620px at 18% -10%, color-mix(in oklab, ${vars.color.accent} 14%, transparent), transparent 60%), radial-gradient(800px 520px at 110% 110%, color-mix(in oklab, ${vars.color.secondary} 10%, transparent), transparent 60%)`,
  color: vars.color.text,
  fontFamily: vars.font.body,
  padding: `${vars.space.xl} ${vars.space.lg}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.xl,
});

export const hero = style({
  width: "100%",
  // audit-allow: px — px — fixed layout breakpoint
  maxWidth: "960px",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const eyebrow = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.accent,
  margin: 0,
});

export const title = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.display,
  fontWeight: 600,
  letterSpacing: vars.tracking.display,
  margin: 0,
  lineHeight: 1.05,
});

export const lede = style({
  fontSize: vars.text.subhead,
  color: vars.color.textMuted,
  margin: 0,
  maxWidth: "62ch",
  lineHeight: 1.5,
});

export const heroMeta = style({
  display: "flex",
  alignItems: "baseline",
  gap: vars.space.sm,
  margin: 0,
  marginTop: vars.space.xs,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textMuted,
});

export const heroCount = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.subhead,
  fontVariantNumeric: "tabular-nums",
  color: vars.color.text,
  fontWeight: 600,
  letterSpacing: 0,
  textTransform: "none",
});

export const listPanel = style({
  width: "100%",
  // audit-allow: px — px — fixed layout breakpoint
  maxWidth: "960px",
});

export const list = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const card = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: vars.space.md,
  padding: `${vars.space.md} ${vars.space.lg}`,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceMuted,
  color: vars.color.text,
  textDecoration: "none",
  animationName: fadeUp,
  animationDuration: "280ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  transition: `background ${vars.motion.fast}, transform ${vars.motion.fast}, box-shadow ${vars.motion.fast}`,
  ":hover": {
    background: vars.color.surfaceHigh,
    // audit-allow: px — px — below minimum token granularity (sub-10px)
    transform: "translateX(4px)",
    // audit-allow: px — px — below minimum token granularity (sub-10px)
    boxShadow: `inset 3px 0 0 ${vars.color.accent}`,
    textDecoration: "none",
  },
});

export const cardInitial = style({
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  width: "40px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  height: "40px",
  borderRadius: "50%",
  background: `color-mix(in oklab, ${vars.color.accent} 22%, transparent)`,
  color: vars.color.accent,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: vars.font.display,
  fontWeight: 600,
  fontSize: vars.text.subhead,
});

export const cardTitle = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.subhead,
  fontWeight: 600,
  margin: 0,
  color: vars.color.text,
});

export const cardMeta = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  margin: 0,
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  marginTop: "2px",
});

export const chevron = style({
  color: vars.color.textMuted,
  fontSize: vars.text.subhead,
});

