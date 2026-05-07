import { keyframes, style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

const fadeRise = keyframes({
  "0%": { opacity: 0, transform: "translateY(4px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

export const row = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d2,
  width: "100%",
  maxWidth: "720px",
  alignSelf: "center",
  animation: `${fadeRise} 200ms ${vars.motion.easingDefault}`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const rowUser = style({});
export const rowAssistant = style({});
export const rowSystem = style({
  maxWidth: "100%",
});

export const bubble = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d3,
  padding: vars.density.d4,
  borderRadius: vars.radius.card,
  border: `1px solid ${vars.color.outline.variant}`,
  background: vars.color.bg.elevated,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.primary,
});

export const bubbleAssistant = style({
  selectors: {
    "&::before": {
      content: "''",
      position: "absolute",
      insetBlock: vars.density.d3,
      insetInlineStart: 0,
      width: "1.5px",
      borderRadius: vars.radius.full,
      background: `linear-gradient(180deg, ${vars.color.accent.primary}, ${vars.color.accent.secondary})`,
      opacity: 0.3,
      pointerEvents: "none",
    },
  },
});

export const bubbleUser = style({
  background: `color-mix(in oklch, ${vars.color.accent.primary} 8%, ${vars.color.bg.canvas})`,
  borderColor: `color-mix(in oklch, ${vars.color.accent.primary} 18%, ${vars.color.outline.variant})`,
});

export const bubbleSystem = style({
  background: `color-mix(in oklab, ${vars.color.warning.base} 6%, ${vars.color.bg.elevated})`,
  borderColor: `color-mix(in oklab, ${vars.color.warning.base} 22%, ${vars.color.outline.variant})`,
});

export const bubbleSchemaMismatch = style({
  background: `color-mix(in oklab, ${vars.color.warning.base} 12%, transparent)`,
  borderColor: `color-mix(in oklab, ${vars.color.warning.base} 38%, transparent)`,
  color: vars.color.warning.text,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
});

export const bubbleFailed = style({
  background: `color-mix(in oklab, ${vars.color.error.base} 14%, ${vars.color.bg.elevated})`,
  borderColor: `color-mix(in oklab, ${vars.color.error.base} 42%, transparent)`,
});

export const bubbleInterrupted = style({
  background: `color-mix(in oklab, ${vars.color.warning.base} 10%, ${vars.color.bg.elevated})`,
  borderColor: `color-mix(in oklab, ${vars.color.warning.base} 38%, transparent)`,
});

export const header = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d3,
  fontFamily: vars.font.ui,
});

export const avatar = style({
  flex: "0 0 auto",
  width: "24px",
  height: "24px",
  borderRadius: "6px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.04em",
  color: vars.color.text.inverse,
  textTransform: "uppercase",
  userSelect: "none",
});

export const avatarUser = style({
  background: vars.color.accent.primary,
});

export const avatarAssistant = style({
  background: `linear-gradient(135deg, ${vars.color.accent.primary}, ${vars.color.accent.secondary})`,
});

export const avatarSystem = style({
  background: vars.color.bg.bright,
  color: vars.color.text.muted,
});

export const avatarGlyph = style({
  fontFamily: "Material Symbols Outlined",
  fontSize: "16px",
  fontWeight: vars.font.weight.regular,
  lineHeight: 1,
});

export const name = style({
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const statusChip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d1,
  paddingInline: vars.density.d2,
  paddingBlock: vars.density.d1,
  marginInlineStart: "auto",
  borderRadius: vars.radius.full,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  selectors: {
    '&[data-tone="streaming"]': {
      background: `color-mix(in oklch, ${vars.color.accent.primary} 14%, transparent)`,
      color: vars.color.accent.primary,
    },
    '&[data-tone="failed"]': {
      background: `color-mix(in oklab, ${vars.color.error.base} 16%, transparent)`,
      color: vars.color.error.text,
    },
    '&[data-tone="interrupted"]': {
      background: `color-mix(in oklab, ${vars.color.warning.base} 16%, transparent)`,
      color: vars.color.warning.text,
    },
  },
});

const dotPulse = keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.35 },
});

export const statusDot = style({
  width: "6px",
  height: "6px",
  borderRadius: vars.radius.full,
  background: "currentColor",
  animation: `${dotPulse} 1.4s ease-in-out infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const timestamp = style({
  marginInlineStart: "auto",
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
});

export const body = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.primary,
  wordWrap: "break-word",
  overflowWrap: "anywhere",
});

globalStyle(`${body} p`, {
  margin: 0,
  marginBlockEnd: vars.density.d3,
});
globalStyle(`${body} > p:last-child, ${body} p:last-child`, {
  marginBlockEnd: 0,
});
globalStyle(`${body} ul, ${body} ol`, {
  marginBlock: vars.density.d3,
  paddingInlineStart: vars.density.d6,
});
globalStyle(`${body} li`, {
  marginBlock: vars.density.d1,
});
globalStyle(`${body} h1, ${body} h2, ${body} h3, ${body} h4`, {
  marginBlock: vars.density.d4,
  fontFamily: vars.font.headline,
  lineHeight: vars.font.lineHeight.tight,
});
globalStyle(`${body} h1`, { fontSize: vars.font.size.headingLg });
globalStyle(`${body} h2`, { fontSize: vars.font.size.heading });
globalStyle(`${body} h3`, { fontSize: vars.font.size.headingSm });
globalStyle(`${body} h4`, { fontSize: vars.font.size.bodyLg });
globalStyle(`${body} blockquote`, {
  borderInlineStart: `2px solid ${vars.color.outline.variant}`,
  paddingInlineStart: vars.density.d3,
  marginBlock: vars.density.d3,
  color: vars.color.text.secondary,
});
globalStyle(`${body} hr`, {
  border: 0,
  borderTop: `1px solid ${vars.color.outline.variant}`,
  marginBlock: vars.density.d4,
});
globalStyle(`${body} table`, {
  borderCollapse: "collapse",
  width: "100%",
  marginBlock: vars.density.d3,
  fontSize: vars.font.size.bodySm,
});
globalStyle(`${body} th, ${body} td`, {
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  paddingBlock: vars.density.d2,
  paddingInline: vars.density.d3,
  textAlign: "start",
});
globalStyle(`${body} th`, {
  color: vars.color.text.secondary,
  fontWeight: vars.font.weight.semibold,
});

export const inlineCode = style({
  fontFamily: vars.font.code,
  fontSize: "0.92em",
  paddingInline: "0.4em",
  paddingBlock: "0.12em",
  borderRadius: vars.radius.control,
  background: `color-mix(in oklch, ${vars.color.text.primary} 8%, transparent)`,
  color: vars.color.text.primary,
});

export const link = style({
  color: vars.color.accent.primary,
  textDecorationColor: `color-mix(in oklch, ${vars.color.accent.primary} 50%, transparent)`,
  textUnderlineOffset: "2px",
  ":hover": { color: vars.color.accent.primaryHover },
});

const blink = keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.3 },
});

export const cursor = style({
  display: "inline-block",
  width: "0.55em",
  height: "1em",
  marginInlineStart: "2px",
  background: vars.color.accent.primary,
  verticalAlign: "text-bottom",
  animation: `${blink} 0.9s ease-in-out infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      opacity: 0.6,
    },
  },
});

export const footer = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
  paddingTop: vars.density.d3,
  borderTop: `1px solid ${vars.color.outline.variant}`,
});

export const iconBtn = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d1,
  paddingInline: vars.density.d2,
  paddingBlock: vars.density.d1,
  background: "transparent",
  border: "none",
  borderRadius: vars.radius.control,
  color: vars.color.text.muted,
  cursor: "pointer",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  transition: `color ${vars.motion.durationFast} ${vars.motion.easingDefault}, background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    color: vars.color.text.primary,
    background: vars.color.bg.hover,
  },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid ${vars.color.accent.primary}`,
    outlineOffset: vars.focus.offset,
  },
});

export const iconBtnGlyph = style({
  fontFamily: "Material Symbols Outlined",
  fontSize: "18px",
  lineHeight: 1,
});

export const spacer = style({
  flex: 1,
});

export const stats = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  letterSpacing: "0.02em",
});

export const contextChip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d2,
  paddingInline: vars.density.d2,
  paddingBlock: "2px",
  borderRadius: vars.radius.full,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  letterSpacing: "0.02em",
  selectors: {
    '&[data-tone="warn"]': {
      color: vars.color.warning.text,
    },
    '&[data-tone="danger"]': {
      color: vars.color.error.text,
    },
  },
});

export const contextLabel = style({
  whiteSpace: "nowrap",
});

export const contextBar = style({
  display: "inline-block",
  position: "relative",
  width: "60px",
  height: "4px",
  borderRadius: vars.radius.full,
  background: `color-mix(in oklch, ${vars.color.text.primary} 8%, transparent)`,
  overflow: "hidden",
});

export const contextFill = style({
  display: "block",
  height: "100%",
  borderRadius: vars.radius.full,
  background: `color-mix(in oklch, ${vars.color.accent.primary} 60%, transparent)`,
  transition: `width ${vars.motion.durationNormal} ${vars.motion.easingDefault}`,
  selectors: {
    '&[data-tone="warn"]': {
      background: `color-mix(in oklab, ${vars.color.warning.base} 70%, transparent)`,
    },
    '&[data-tone="danger"]': {
      background: `color-mix(in oklab, ${vars.color.error.base} 75%, transparent)`,
    },
  },
});

export const meta = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d3,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
});

export const retryBtn = style({
  background: "transparent",
  border: "none",
  color: vars.color.accent.primary,
  cursor: "pointer",
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  padding: 0,
  ":hover": { color: vars.color.accent.primaryHover },
});
