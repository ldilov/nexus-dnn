import { globalStyle, keyframes, style } from "@vanilla-extract/css";
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
  width: "min(880px, 100%)",
  height: "min(720px, 92vh)",
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

export const headerLeft = style({
  display: "flex",
  alignItems: "baseline",
  gap: vars.density.d3,
});

export const title = style({
  fontSize: vars.font.size.headingSm,
  fontWeight: 600,
  margin: 0,
  letterSpacing: "-0.01em",
});

export const countChip = style({
  display: "inline-flex",
  alignItems: "center",
  height: vars.control.heightSm,
  paddingInline: vars.density.d3,
  borderRadius: vars.radius.full,
  background: `color-mix(in oklch, ${vars.color.accent.primary} 12%, transparent)`,
  color: vars.color.accent.primary,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  fontVariantNumeric: "tabular-nums",
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
  gridTemplateColumns: "320px 1fr",
  minHeight: 0,
  overflow: "hidden",
});

export const listColumn = style({
  display: "flex",
  flexDirection: "column",
  borderRight: `1px solid ${vars.color.outline.variant}`,
  minHeight: 0,
  minWidth: 0,
  overflow: "hidden",
});

export const searchWrap = style({
  position: "relative",
  padding: `${vars.density.d3} ${vars.density.d4}`,
});

export const search = style({
  width: "100%",
  // audit-allow: px — sub-density input padding tuned to leading glyph
  padding: "8px 36px 8px 36px",
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

export const searchGlyph = style({
  position: "absolute",
  left: `calc(${vars.density.d4} + 12px)`,
  top: "50%",
  transform: "translateY(-50%)",
  fontFamily: "Material Symbols Outlined",
  fontSize: "16px",
  lineHeight: 1,
  color: vars.color.text.muted,
  pointerEvents: "none",
});

export const searchClear = style({
  position: "absolute",
  right: `calc(${vars.density.d4} + 8px)`,
  top: "50%",
  transform: "translateY(-50%)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "20px",
  height: "20px",
  padding: 0,
  background: "transparent",
  color: vars.color.text.muted,
  border: "none",
  borderRadius: vars.radius.full,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
});

globalStyle(`${searchClear} > .material-symbols-outlined`, {
  fontSize: "14px",
  lineHeight: 1,
});

export const searchHotkey = style({
  position: "absolute",
  right: `calc(${vars.density.d4} + 12px)`,
  top: "50%",
  transform: "translateY(-50%)",
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.06em",
  color: vars.color.text.muted,
  pointerEvents: "none",
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
  minWidth: 0,
  overflow: "hidden",
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
  justifyContent: "space-between",
  gap: vars.density.d2,
});

export const optionLabel = style({
  fontSize: vars.font.size.bodySm,
  fontWeight: 600,
  color: vars.color.text.primary,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  flex: 1,
  minWidth: 0,
});

export const optionMetaInline = style({
  flex: "0 0 auto",
  display: "inline-flex",
  alignItems: "baseline",
  gap: vars.density.d2,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.secondary,
  fontVariantNumeric: "tabular-nums",
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
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.density.d3,
  padding: `${vars.density.d7} ${vars.density.d4}`,
  textAlign: "center",
  color: vars.color.text.secondary,
  fontSize: vars.font.size.bodySm,
});

export const emptyGlyph = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.headingLg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.muted,
  fontVariantNumeric: "tabular-nums",
  letterSpacing: "0.04em",
});

export const emptyTitle = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  margin: 0,
});

export const emptyHint = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const emptyCta = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d2,
  height: vars.control.heightMd,
  paddingInline: vars.density.d4,
  borderRadius: vars.radius.control,
  background: vars.color.accent.primary,
  color: vars.color.onColor.primary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  border: "none",
  cursor: "pointer",
  textDecoration: "none",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.accent.primaryHover,
  },
});

export const footer = style({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: vars.density.d3,
  padding: `${vars.density.d4} ${vars.density.d5}`,
  boxShadow: `0 -1px 0 ${vars.color.outline.variant}`,
});

export const kbdHint = style({
  display: "inline-flex",
  alignItems: "center",
  marginInlineStart: vars.density.d2,
  paddingInline: vars.density.d2,
  paddingBlock: 0,
  // audit-allow: px — sub-density kbd hint height tuned to footer button line-height
  height: "18px",
  borderRadius: vars.radius.control,
  background: `color-mix(in oklch, currentColor 8%, transparent)`,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.04em",
  fontWeight: vars.font.weight.regular,
  opacity: 0.8,
});
