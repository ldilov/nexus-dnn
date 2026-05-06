import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/tokens.css";

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
  userSelect: "none",
  WebkitUserSelect: "none",
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
  color: "transparent",
  caretColor: vars.color.accent,
  WebkitTextFillColor: "transparent",
  selectors: {
    "&::placeholder": { color: vars.color.textFaint, WebkitTextFillColor: vars.color.textFaint },
    "&::selection": {
      background: `color-mix(in oklab, ${vars.color.accent} 45%, transparent)`,
    },
    "&::-moz-selection": {
      background: `color-mix(in oklab, ${vars.color.accent} 45%, transparent)`,
    },
  },
}]);

export const tokenText = style({
  color: vars.color.text,
});

const badgeBase = {
  display: "inline",
  padding: 0,
  margin: 0,
  border: "none",
  fontFamily: vars.font.body,
  fontSize: "1em",
  fontWeight: "inherit",
  fontStyle: "inherit",
  letterSpacing: "inherit",
  borderRadius: "999px",
  WebkitBoxDecorationBreak: "clone",
  boxDecorationBreak: "clone",
  transition: `box-shadow ${vars.motion.fast}, text-shadow ${vars.motion.fast}`,
} as const;

export const characterBadge = style({
  ...badgeBase,
  color: vars.color.accentOn,
  background: vars.color.accent,
  boxShadow: `0 0 0 1px ${vars.color.accent}, inset 0 0 0 1px color-mix(in oklab, white 22%, transparent)`,
  selectors: {
    '&[data-active="true"]': {
      boxShadow: `0 0 0 1px ${vars.color.accent}, 0 0 0 3px color-mix(in oklab, ${vars.color.accentGlow} 60%, transparent), inset 0 0 0 1px color-mix(in oklab, white 38%, transparent)`,
      textShadow: `0 0 6px color-mix(in oklab, ${vars.color.accentOn} 40%, transparent)`,
    },
  },
  "@media": {
    "(forced-colors: active)": {
      background: "Highlight",
      color: "HighlightText",
      forcedColorAdjust: "none",
      boxShadow: "none",
    },
  },
});

export const emotionBadge = style({
  ...badgeBase,
  color: "#1a0a00",
  background: vars.color.tertiary,
  boxShadow: `0 0 0 1px ${vars.color.tertiary}, inset 0 0 0 1px color-mix(in oklab, white 24%, transparent)`,
  selectors: {
    '&[data-active="true"]': {
      boxShadow: `0 0 0 1px ${vars.color.tertiary}, 0 0 0 3px color-mix(in oklab, ${vars.color.tertiary} 35%, transparent), inset 0 0 0 1px color-mix(in oklab, white 42%, transparent)`,
      textShadow: "0 0 6px rgba(26, 10, 0, 0.45)",
    },
  },
  "@media": {
    "(forced-colors: active)": {
      background: "Canvas",
      color: "CanvasText",
      forcedColorAdjust: "none",
      boxShadow: "inset 0 0 0 1px CanvasText",
    },
  },
});

// Contrast: character #39008c on #ba9eff = 6.46:1 (WCAG AA). emotion #1a0a00 on #ff8439 = 8.27:1 (AAA).
// Both badges are opaque, so surfaceMuted (#111416) only meets the badge at the rounded edges (>3:1, anti-alias safe).

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
