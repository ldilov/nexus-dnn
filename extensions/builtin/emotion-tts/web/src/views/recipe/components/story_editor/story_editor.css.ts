import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/tokens.css";

const sigilPulse = keyframes({
  "0%": { boxShadow: `0 0 0 0 ${vars.color.accentGlow}` },
  "60%": { boxShadow: `0 0 0 6px transparent` },
  "100%": { boxShadow: `0 0 0 0 transparent` },
});

export const root = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const stage = style({
  position: "relative",
  borderRadius: vars.radius.md,
  background: `linear-gradient(180deg, ${vars.color.surfaceMuted} 0%, ${vars.color.surface} 100%)`,
  boxShadow: "none",
  transition: [
    `background ${vars.motion.fast}`,
    `box-shadow ${vars.motion.normal}`,
  ].join(", "),
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: vars.space.lg,
      bottom: vars.space.lg,
      width: "3px",
      borderRadius: vars.radius.pill,
      background: vars.color.borderGhost,
      transition: `background ${vars.motion.normal}, box-shadow ${vars.motion.normal}`,
    },
    "&:focus-within": {
      background: vars.color.surfaceRaised,
      boxShadow: `0 16px 48px -24px ${vars.color.accentGlow}`,
    },
    "&:focus-within::before": {
      background: vars.color.accent,
      boxShadow: `0 0 12px ${vars.color.accentGlow}`,
    },
  },
  "@media": {
    "(forced-colors: active)": {
      border: "1px solid CanvasText",
      boxShadow: "none",
    },
  },
});

const sharedSurface = style({
  width: "100%",
  minHeight: "14rem",
  margin: 0,
  padding: vars.space.lg,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  lineHeight: 1.55,
  letterSpacing: vars.tracking.body,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  overflowWrap: "break-word",
  border: "none",
  background: "transparent",
});

export const overlay = style([sharedSurface, {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  color: "transparent",
}]);

globalStyle(`${overlay}::selection, ${overlay} *::selection`, {
  background: "transparent",
});

export const textarea = style([sharedSurface, {
  position: "relative",
  display: "block",
  resize: "vertical",
  outline: "none",
  color: vars.color.text,
  caretColor: vars.color.accent,
  selectors: {
    "&::placeholder": { color: vars.color.textFaint },
  },
}]);

export const tokenText = style({
  color: vars.color.text,
});

export const characterBadge = style({
  display: "inline",
  padding: `0 ${vars.space.sm}`,
  borderRadius: vars.radius.pill,
  fontFamily: vars.font.body,
  fontWeight: 600,
  fontSize: "0.92em",
  color: vars.color.accentOn,
  background: vars.color.accent,
  boxShadow: `0 0 0 1px ${vars.color.accentDim}, 0 0 18px -6px ${vars.color.accentGlow}`,
  selectors: {
    '&[data-active="true"]': {
      animation: `${sigilPulse} 360ms cubic-bezier(0.16, 1, 0.3, 1) 1`,
    },
  },
  "@media": {
    "(forced-colors: active)": {
      background: "Highlight",
      color: "HighlightText",
      border: "1px solid HighlightText",
      forcedColorAdjust: "none",
    },
  },
});

export const emotionBadge = style({
  display: "inline",
  padding: `0 ${vars.space.xs} 0 0.55rem`,
  borderRadius: `0 ${vars.radius.sm} ${vars.radius.sm} 0`,
  clipPath: "polygon(0.35rem 0, 100% 0, 100% 100%, 0.35rem 100%, 0 50%)",
  fontFamily: vars.font.mono,
  fontSize: "0.88em",
  fontWeight: 600,
  color: vars.color.tertiary,
  background: `color-mix(in oklab, ${vars.color.tertiary} 28%, ${vars.color.surfaceHigh})`,
  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.tertiary} 55%, transparent)`,
  selectors: {
    '&[data-active="true"]': {
      animation: `${sigilPulse} 360ms cubic-bezier(0.16, 1, 0.3, 1) 1`,
    },
  },
  "@media": {
    "(forced-colors: active)": {
      background: "Canvas",
      color: "CanvasText",
      border: "2px dashed CanvasText",
      forcedColorAdjust: "none",
      clipPath: "none",
    },
  },
});

export const popoverPop = keyframes({
  "0%": { opacity: 0, transform: "translateY(-4px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

export const popover = style({
  position: "absolute",
  zIndex: 5,
  minWidth: "12rem",
  maxWidth: "20rem",
  maxHeight: "16rem",
  overflowY: "auto",
  padding: vars.space.xs,
  background: vars.color.surfaceHighest,
  borderRadius: vars.radius.md,
  boxShadow: `${vars.shadow.raised}, 0 0 0 1px ${vars.color.borderGhost}`,
  animation: `${popoverPop} 120ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

export const popoverHeader = style({
  padding: `${vars.space.sm} ${vars.space.md}`,
  marginBottom: vars.space.xs,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textMuted,
  boxShadow: `inset 0 -1px 0 ${vars.color.borderGhost}`,
});

export const popoverList = style({
  display: "flex",
  flexDirection: "column",
  gap: 0,
  margin: 0,
  padding: 0,
  listStyle: "none",
});

export const popoverItem = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.sm,
  minHeight: "1.75rem",
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: vars.radius.sm,
  cursor: "pointer",
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.text,
  background: "transparent",
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}, box-shadow ${vars.motion.fast}`,
  selectors: {
    "&[data-active='true']": {
      background: `color-mix(in oklab, ${vars.color.accent} 18%, transparent)`,
      color: vars.color.text,
      boxShadow: `inset 2px 0 0 ${vars.color.accent}`,
    },
    "&:hover": {
      background: `color-mix(in oklab, ${vars.color.accent} 10%, transparent)`,
      boxShadow: `inset 2px 0 0 color-mix(in oklab, ${vars.color.accent} 50%, transparent)`,
    },
  },
  "@media": {
    "(forced-colors: active)": {
      selectors: {
        "&[data-active='true']": {
          background: "Highlight",
          color: "HighlightText",
          forcedColorAdjust: "none",
        },
      },
    },
  },
});

export const popoverItemHint = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textFaint,
});

export const helpRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.lg,
  flexWrap: "wrap",
  paddingTop: vars.space.xs,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textFaint,
});

globalStyle(`${helpRow} > *`, {
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
});

export const helpKbd = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "1.4rem",
  height: "1.4rem",
  padding: `0 ${vars.space.xs}`,
  background: "transparent",
  borderRadius: vars.radius.sm,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  color: vars.color.accent,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  textTransform: "none",
  "@media": {
    "(forced-colors: active)": {
      border: "1px solid CanvasText",
      boxShadow: "none",
    },
  },
});

export const popoverEmpty = style({
  padding: `${vars.space.sm} ${vars.space.md}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  textAlign: "center",
});
