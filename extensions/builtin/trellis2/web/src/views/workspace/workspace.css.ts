import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const shell = style({
  position: "relative",
  isolation: "isolate",
  overflowX: "clip",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xl,
  width: "100%",
  maxWidth: "1320px",
  margin: "0 auto",
  padding: vars.space.xl,
});

/** Fixed radial accent bloom in the upper-left — the Spectral Graphite
 * "powered-on" atmosphere. Decorative, behind all content, never interactive. */
export const glow = style({
  position: "absolute",
  top: "-220px",
  left: "-180px",
  width: "640px",
  height: "640px",
  zIndex: -1,
  pointerEvents: "none",
  background: `radial-gradient(circle at center, ${vars.color.accentGlow}, transparent 68%)`,
  filter: "blur(60px)",
  opacity: 0.7,
});

export const header = style({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: vars.space.lg,
  flexWrap: "wrap",
});

export const titleBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  maxWidth: "64ch",
  minWidth: 0,
});

export const eyebrow = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textFaint,
});

export const title = style({
  margin: 0,
  fontFamily: vars.font.display,
  fontSize: "clamp(2rem, 1.35rem + 2.4vw, 2.875rem)",
  fontWeight: vars.weight.semibold,
  letterSpacing: vars.tracking.display,
  lineHeight: 1.02,
  color: vars.color.text,
  textWrap: "balance",
});

export const subtitle = style({
  margin: 0,
  fontSize: vars.text.body,
  lineHeight: 1.55,
  color: vars.color.textMuted,
  maxWidth: "62ch",
});

export const tabs = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: vars.space.xs,
  borderRadius: vars.radius.pill,
  background: vars.color.surfaceInset,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
});

export const tab = style({
  appearance: "none",
  border: "none",
  background: "transparent",
  color: vars.color.textMuted,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  fontWeight: 600,
  padding: `${vars.space.sm} ${vars.space.lg}`,
  borderRadius: vars.radius.pill,
  cursor: "pointer",
  textDecoration: "none",
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}`,
  selectors: {
    "&:hover": { color: vars.color.text },
    "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focusRing },
  },
});

export const tabActive = style({
  background: vars.color.surfaceHigh,
  color: vars.color.text,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
});

export const main = style({
  display: "flex",
  flexDirection: "column",
});
