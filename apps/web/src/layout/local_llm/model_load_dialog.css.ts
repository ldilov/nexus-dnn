import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const slideIn = keyframes({
  from: { opacity: 0, transform: "translateY(8px) scale(0.985)" },
  to: { opacity: 1, transform: "translateY(0) scale(1)" },
});

const reducedMotion = "(prefers-reduced-motion: reduce)";

export const backdrop = style({
  position: "fixed",
  inset: 0,
  background:
    "radial-gradient(ellipse at top, rgba(10,12,18,0.55) 0%, rgba(2,3,6,0.82) 60%, rgba(2,3,6,0.92) 100%)",
  backdropFilter: "blur(16px) saturate(140%)",
  WebkitBackdropFilter: "blur(16px) saturate(140%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 120,
  animation: `${fadeIn} 200ms ease-out`,
  padding: `${vars.density.d7} ${vars.density.d6}`,
  "@media": {
    [reducedMotion]: { animation: "none" },
  },
});

export const dialog = style({
  width: "min(720px, 100%)",
  height: "min(640px, 90vh)",
  background:
    "linear-gradient(180deg, rgba(30,33,38,0.98) 0%, rgba(15,17,20,0.98) 100%)",
  borderRadius: "20px",
  boxShadow: [
    `0 40px 120px ${vars.color.scrim}`,
    `0 0 0 1px color-mix(in oklch, ${vars.color.accent.primary} 10%, transparent)`,
    `inset 0 1px 0 ${vars.color.outline.variant}`,
  ].join(", "),
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
  fontFamily: vars.font.ui,
  color: vars.color.text.primary,
  overflow: "hidden",
  animation: `${slideIn} 240ms cubic-bezier(0.16, 1, 0.3, 1)`,
  "@media": {
    [reducedMotion]: { animation: "none" },
  },
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${vars.density.d4} ${vars.density.d5}`,
  boxShadow: `0 1px 0 ${vars.color.outline.variant}`,
});

export const title = style({
  fontSize: vars.font.size.headingSm,
  fontWeight: 600,
  margin: 0,
  letterSpacing: "-0.01em",
});

export const closeButton = style({
  appearance: "none",
  background: "transparent",
  color: vars.color.text.secondary,
  border: "none",
  fontSize: vars.font.size.headingLg,
  lineHeight: 1,
  cursor: "pointer",
  padding: "4px 10px",
  borderRadius: vars.radius.control,
  transition: `background ${vars.motion.durationFast} ease, color ${vars.motion.durationFast} ease`,
  ":hover": {
    background: `color-mix(in oklch, ${vars.color.text.primary} 6%, transparent)`,
    color: vars.color.text.primary,
  },
});

export const body = style({
  display: "grid",
  gridTemplateColumns: "280px 1fr",
  minHeight: 0,
  overflow: "hidden",
});

export const listColumn = style({
  display: "flex",
  flexDirection: "column",
  borderRight: `1px solid ${vars.color.outline.variant}`,
  minHeight: 0,
});

export const searchWrap = style({
  padding: `${vars.density.d3} ${vars.density.d4}`,
});

export const search = style({
  width: "100%",
  padding: "8px 12px",
  fontSize: vars.font.size.bodySm,
  fontFamily: vars.font.ui,
  color: vars.color.text.primary,
  background: `color-mix(in oklch, ${vars.color.text.primary} 3.5%, transparent)`,
  border: "none",
  borderRadius: vars.radius.control,
  outline: "none",
  boxShadow: `inset 0 0 0 1px ${vars.color.outline.variant}`,
  ":focus": {
    background: `color-mix(in oklch, ${vars.color.accent.primary} 6%, transparent)`,
    boxShadow: `inset 0 0 0 1.5px color-mix(in oklch, ${vars.color.accent.primary} 45%, transparent)`,
  },
  "::placeholder": { color: vars.color.text.secondary },
});

export const list = style({
  listStyle: "none",
  padding: `0 ${vars.density.d3} ${vars.density.d3}`,
  margin: 0,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d1,
  minHeight: 0,
  flex: 1,
});

export const option = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d1,
  padding: `${vars.density.d3} ${vars.density.d4}`,
  borderRadius: vars.radius.card,
  cursor: "pointer",
  outline: "none",
  background: "transparent",
  transition:
    `background ${vars.motion.durationFast} ease, box-shadow 200ms ease`,
  ":hover": {
    background: `color-mix(in oklch, ${vars.color.accent.primary} 6%, transparent)`,
  },
});

export const optionSelected = style({
  background: `color-mix(in oklch, ${vars.color.accent.primary} 12%, transparent)`,
  boxShadow: `0 0 0 1px color-mix(in oklch, ${vars.color.accent.primary} 38%, transparent)`,
});

export const optionRowTop = style({
  display: "flex",
  alignItems: "baseline",
  gap: vars.density.d2,
});

export const optionIndex = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.secondary,
  minWidth: "1.5em",
});

export const optionLabel = style({
  fontSize: vars.font.size.bodySm,
  fontWeight: 600,
  color: vars.color.text.primary,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  flex: 1,
});

export const optionMeta = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.secondary,
  paddingLeft: "1.7em",
});

export const detailColumn = style({
  display: "flex",
  flexDirection: "column",
  padding: `${vars.density.d4} ${vars.density.d5}`,
  overflowY: "auto",
  minHeight: 0,
});

export const placeholder = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  color: vars.color.text.secondary,
  fontSize: vars.font.size.bodySm,
  textAlign: "center",
  padding: vars.density.d5,
});

export const empty = style({
  padding: `${vars.density.d6} ${vars.density.d4}`,
  textAlign: "center",
  color: vars.color.text.secondary,
  fontSize: vars.font.size.bodySm,
});

export const footer = style({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: vars.density.d3,
  padding: `${vars.density.d4} ${vars.density.d5}`,
  boxShadow: `0 -1px 0 ${vars.color.outline.variant}`,
});

export const cancelButton = style({
  appearance: "none",
  background: "transparent",
  color: vars.color.text.secondary,
  border: "none",
  cursor: "pointer",
  padding: "8px 14px",
  borderRadius: vars.radius.control,
  fontSize: vars.font.size.bodySm,
  fontFamily: vars.font.ui,
  fontWeight: 500,
  transition: `background ${vars.motion.durationFast} ease, color ${vars.motion.durationFast} ease`,
  ":hover": {
    background: `color-mix(in oklch, ${vars.color.text.primary} 6%, transparent)`,
    color: vars.color.text.primary,
  },
});

export const loadButton = style({
  appearance: "none",
  border: "none",
  cursor: "pointer",
  // audit-allow: px — sub-density button padding tuned to the dialog footer rhythm
  padding: "8px 16px",
  borderRadius: vars.radius.control,
  fontSize: vars.font.size.bodySm,
  fontFamily: vars.font.ui,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.onColor.primary,
  background: `linear-gradient(180deg, color-mix(in oklch, ${vars.color.accent.primary} 88%, white) 0%, ${vars.color.accent.primary} 100%)`,
  boxShadow: `0 6px 16px color-mix(in oklch, ${vars.color.accent.primary} 25%, transparent), inset 0 1px 0 color-mix(in oklch, ${vars.color.text.primary} 40%, transparent)`,
  transition: `transform ${vars.motion.durationFast} ease, box-shadow ${vars.motion.durationFast} ease, opacity ${vars.motion.durationFast} ease`,
  ":hover": {
    transform: "translateY(-1px)",
    boxShadow: `0 10px 22px color-mix(in oklch, ${vars.color.accent.primary} 32%, transparent), inset 0 1px 0 color-mix(in oklch, ${vars.color.text.primary} 50%, transparent)`,
  },
  ":disabled": {
    opacity: 0.45,
    cursor: "not-allowed",
    transform: "none",
    boxShadow: "none",
  },
});
