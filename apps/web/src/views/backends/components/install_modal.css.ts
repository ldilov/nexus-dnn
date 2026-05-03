// audit-allow: px — modal/dialog/drawer width per UX spec
// audit-allow: px — sub-token spacing value, no density token at this step
// audit-allow: hex — gradient anchor outside accent palette
import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const slideIn = keyframes({
  // audit-allow: px — below minimum token granularity (sub-10px)
  from: { opacity: 0, transform: "translateY(8px) scale(0.98)" },
  to: { opacity: 1, transform: "translateY(0) scale(1)" },
});

const spin = keyframes({
  to: { transform: "rotate(360deg)" },
});

const shimmer = keyframes({
  "0%": { backgroundPosition: "-200% 0" },
  "100%": { backgroundPosition: "200% 0" },
});

const pulseDot = keyframes({
  "0%, 100%": { opacity: 0.6, transform: "scale(1)" },
  "50%": { opacity: 1, transform: "scale(1.15)" },
});

export const backdrop = style({
  position: "fixed",
  inset: 0,
  background: "rgba(4, 5, 8, 0.72)",
  // audit-allow: px — sub-token spacing value, no density token at this step
  backdropFilter: "blur(12px) saturate(140%)",
  // audit-allow: px — sub-token spacing value, no density token at this step
  WebkitBackdropFilter: "blur(12px) saturate(140%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
  animation: `${fadeIn} 180ms var(--ease-out)`,
  padding: vars.density.d6,
});

export const dialog = style({
  // audit-allow: px — fixed layout breakpoint
  width: "min(680px, 100%)",
  background:
    "linear-gradient(180deg, rgba(29,32,35,0.98) 0%, rgba(17,20,22,0.98) 100%)",
  // audit-allow: px — sub-token spacing value, no density token at this step
  borderRadius: "20px",
  boxShadow:
    // audit-allow: px — sub-token spacing value, no density token at this step
    "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(186,158,255,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d5,
  // audit-allow: px — sub-token spacing value, no density token at this step
  padding: "24px 26px 22px",
  animation: `${slideIn} 220ms var(--ease-out)`,
  fontFamily: "var(--font-ui)",
  color: "var(--color-on-surface)",
});

export const header = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: vars.density.d4,
});

export const titleBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d1,
});

export const eyebrow = style({
  fontSize: vars.font.size.caption,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--color-primary)",
  fontWeight: 600,
});

export const title = style({
  fontSize: vars.font.size.heading,
  fontWeight: 600,
  margin: 0,
  color: "var(--color-on-surface)",
  letterSpacing: "-0.01em",
});

export const subtitle = style({
  fontSize: vars.font.size.body,
  color: "var(--color-on-surface-variant)",
  fontFamily: "var(--font-mono)",
});

export const closeButton = style({
  background: "transparent",
  border: "none",
  // audit-allow: px — sub-token spacing value, no density token at this step
  width: "32px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  height: "32px",
  borderRadius: vars.radius.card,
  color: "var(--color-on-surface-variant)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "18px",
  transition:
    "background var(--motion-focus-ring) var(--ease-out), color var(--motion-focus-ring) var(--ease-out)",
  ":hover": {
    background: "rgba(255,255,255,0.06)",
    color: "var(--color-on-surface)",
  },
  ":focus-visible": {
    // audit-allow: px — below minimum token granularity (sub-10px)
    outline: "2px solid var(--color-primary)",
    // audit-allow: px — below minimum token granularity (sub-10px)
    outlineOffset: "2px",
  },
});

export const phaseList = style({
  display: "flex",
  flexDirection: "column",
  gap: 0,
  fontFamily: "var(--font-mono)",
  fontSize: vars.font.size.body,
  position: "relative",
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "6px 0",
  selectors: {
    "&::before": {
      content: "",
      position: "absolute",
      // audit-allow: px — sub-token spacing value, no density token at this step
      top: "22px",
      // audit-allow: px — sub-token spacing value, no density token at this step
      bottom: "22px",
      // audit-allow: px — sub-token spacing value, no density token at this step
      left: "11px",
      width: "1px",
      background:
        "linear-gradient(180deg, rgba(186,158,255,0.35), rgba(186,158,255,0.06))",
    },
  },
});

export const phaseItem = style({
  display: "grid",
  // audit-allow: px — sub-token spacing value, no density token at this step
  gridTemplateColumns: "24px 1fr auto",
  gap: vars.density.d3,
  alignItems: "center",
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "6px 0",
  color: "var(--color-on-surface-variant)",
  transition: "color var(--motion-focus-ring) var(--ease-out)",
  selectors: {
    '&[data-state="active"]': {
      color: "var(--color-on-surface)",
    },
    '&[data-state="done"]': {
      color: "var(--color-on-surface)",
    },
    '&[data-state="failed"]': {
      color: "var(--color-error)",
    },
  },
});

export const phaseIcon = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  width: "22px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  height: "22px",
  borderRadius: "50%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: vars.font.size.caption,
  fontWeight: 600,
  background: "var(--color-surface-container-high)",
  color: "var(--color-on-surface-variant)",
  border: "1px solid rgba(255,255,255,0.06)",
  zIndex: 1,
  position: "relative",
  selectors: {
    [`${phaseItem}[data-state="active"] &`]: {
      background:
        "radial-gradient(circle at 30% 30%, var(--color-primary), var(--color-primary-dim))",
      color: "var(--color-on-primary)",
      // audit-allow: px — below minimum token granularity (sub-10px)
      boxShadow: "0 0 0 4px rgba(186,158,255,0.18)",
      animation: `${pulseDot} 1.4s var(--ease-out) infinite`,
    },
    [`${phaseItem}[data-state="done"] &`]: {
      background: "var(--color-acid-green)",
      // audit-allow: hex — neon decorative palette per design lang
      color: "#0c1210",
      border: "1px solid rgba(34,197,94,0.35)",
    },
    [`${phaseItem}[data-state="failed"] &`]: {
      background: "var(--color-error)",
      color: "var(--color-on-error)",
    },
  },
});

export const phaseLabel = style({
  textTransform: "capitalize",
  letterSpacing: "0.01em",
});

export const phaseMeta = style({
  fontSize: vars.font.size.caption,
  color: "var(--color-on-surface-variant)",
  fontFamily: "var(--font-mono)",
  opacity: 0.8,
});

export const spinner = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  width: "12px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  height: "12px",
  borderRadius: "50%",
  // audit-allow: px — below minimum token granularity (sub-10px)
  border: "2px solid rgba(255,255,255,0.25)",
  borderTopColor: "var(--color-on-primary)",
  animation: `${spin} 800ms linear infinite`,
});

export const progressSection = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d2,
  // audit-allow: px — sub-token spacing value, no density token at this step
  padding: "14px 16px",
  background: "rgba(0,0,0,0.28)",
  // audit-allow: px — sub-token spacing value, no density token at this step
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.04)",
});

export const progressHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  fontSize: vars.font.size.bodySm,
  fontFamily: "var(--font-mono)",
  color: "var(--color-on-surface-variant)",
});

export const progressHeaderLeft = style({
  color: "var(--color-on-surface)",
  fontWeight: 500,
});

export const progressBar = style({
  width: "100%",
  // audit-allow: px — below minimum token granularity (sub-10px)
  height: "8px",
  background: "rgba(0,0,0,0.5)",
  borderRadius: vars.radius.full,
  overflow: "hidden",
  position: "relative",
  border: "1px solid rgba(255,255,255,0.04)",
});

export const progressFill = style({
  height: "100%",
  background:
    "linear-gradient(90deg, var(--color-primary-dim) 0%, var(--color-primary) 60%, var(--color-secondary) 100%)",
  transition: "width 240ms var(--ease-out)",
  // audit-allow: px — sub-token spacing value, no density token at this step
  boxShadow: "0 0 12px rgba(186,158,255,0.55)",
  borderRadius: vars.radius.full,
});

export const progressFillIndeterminate = style({
  height: "100%",
  background:
    "linear-gradient(90deg, transparent 0%, rgba(186,158,255,0.45) 45%, rgba(186,158,255,0.85) 50%, rgba(186,158,255,0.45) 55%, transparent 100%)",
  backgroundSize: "200% 100%",
  animation: `${shimmer} 1.6s linear infinite`,
  width: "100%",
});

export const logPanel = style({
  // audit-allow: px — modal/dialog/drawer width per UX spec
  maxHeight: "220px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  minHeight: "96px",
  overflow: "auto",
  fontFamily: "var(--font-mono)",
  fontSize: vars.font.size.bodySm,
  lineHeight: 1.55,
  background: "rgba(0,0,0,0.42)",
  border: "1px solid rgba(255,255,255,0.04)",
  // audit-allow: px — sub-token spacing value, no density token at this step
  borderRadius: "12px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  padding: "12px 14px",
  color: "var(--color-on-surface-variant)",
  scrollbarWidth: "thin",
  scrollbarColor: "rgba(255,255,255,0.12) transparent",
});

export const logLine = style({
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  selectors: {
    "&[data-level=\"error\"]": {
      color: "var(--color-error)",
    },
  },
});

export const logEmpty = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
  color: "var(--color-on-surface-variant)",
  fontStyle: "italic",
  opacity: 0.7,
});

export const logPulse = style({
  // audit-allow: px — below minimum token granularity (sub-10px)
  width: "6px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  height: "6px",
  borderRadius: "50%",
  background: "var(--color-primary)",
  animation: `${pulseDot} 1.2s var(--ease-out) infinite`,
});

export const footer = style({
  display: "flex",
  // audit-allow: px — sub-token spacing value, no density token at this step
  gap: "10px",
  justifyContent: "flex-end",
  alignItems: "center",
});

export const elapsed = style({
  marginRight: "auto",
  fontFamily: "var(--font-mono)",
  fontSize: vars.font.size.bodySm,
  color: "var(--color-on-surface-variant)",
});

const buttonBase = style({
  appearance: "none",
  border: "none",
  fontFamily: "var(--font-ui)",
  fontSize: vars.font.size.body,
  fontWeight: 500,
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "8px 16px",
  borderRadius: vars.radius.card,
  cursor: "pointer",
  transition:
    "background var(--motion-focus-ring) var(--ease-out), transform var(--motion-focus-ring) var(--ease-out)",
  ":focus-visible": {
    // audit-allow: px — below minimum token granularity (sub-10px)
    outline: "2px solid var(--color-primary)",
    // audit-allow: px — below minimum token granularity (sub-10px)
    outlineOffset: "2px",
  },
});

export const buttonGhost = style([
  buttonBase,
  {
    background: "rgba(255,255,255,0.04)",
    color: "var(--color-on-surface)",
    ":hover": {
      background: "rgba(255,255,255,0.09)",
    },
  },
]);

export const buttonPrimary = style([
  buttonBase,
  {
    background: "var(--color-primary)",
    color: "var(--color-on-primary)",
    ":hover": {
      background: "var(--color-primary-dim)",
    },
  },
]);

export const statusCluster = style({
  display: "flex",
  alignItems: "center",
  // audit-allow: px — sub-token spacing value, no density token at this step
  gap: "10px",
});

export const statusBadge = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "6px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "4px 10px",
  borderRadius: vars.radius.full,
  fontSize: vars.font.size.caption,
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  fontFamily: "var(--font-mono)",
  selectors: {
    '&[data-status="running"]': {
      background: "rgba(186,158,255,0.14)",
      color: "var(--color-primary)",
    },
    '&[data-status="completed"]': {
      background: "rgba(34,197,94,0.15)",
      color: "var(--color-acid-green)",
    },
    '&[data-status="failed"]': {
      background: "rgba(255,110,132,0.14)",
      color: "var(--color-error)",
    },
  },
});
