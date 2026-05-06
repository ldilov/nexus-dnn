import { createVar, globalStyle, keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/tokens.css";

const pillColor = createVar();
const pillFg = createVar();
const pillGlow = createVar();
const pillRestGlowPct = createVar();
const pillActiveHaloPct = createVar();

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
  paddingBlock: "0.12em",
  paddingInline: "0.42em",
  marginInline: "-0.42em",
  border: "none",
  fontFamily: vars.font.body,
  fontSize: "1em",
  fontWeight: "inherit",
  fontStyle: "inherit",
  letterSpacing: "inherit",
  borderRadius: "999px",
  WebkitBoxDecorationBreak: "clone",
  boxDecorationBreak: "clone",
  transition: `box-shadow ${vars.motion.normal}, background ${vars.motion.normal}, text-shadow ${vars.motion.fast}`,
} as const;

export const badgeSigil = style({
  opacity: 0.62,
  fontWeight: "inherit",
  "@media": {
    "(forced-colors: active)": {
      opacity: 1,
    },
  },
});

/**
 * Story pill — single style, two color variants via `data-kind`.
 *
 * Contrast (verified):
 *   character: #39008c on #ba9eff = 6.46:1 (WCAG AA)
 *   emotion:   #1a0a00 on #ff8439 = 8.27:1 (WCAG AAA)
 *
 * Both pills are opaque, so the underlying surfaceMuted (#111416) only
 * meets the badge at the rounded edges (>3:1, anti-alias safe).
 *
 * In forced-colors mode both kinds render with Highlight/HighlightText so
 * they read as non-text affordances; the @ vs / sigil opacity is bumped
 * to 1 in `badgeSigil` so the kind remains distinguishable in high contrast.
 */
export const storyPill = style({
  ...badgeBase,
  vars: {
    [pillColor]: vars.color.accent,
    [pillFg]: vars.color.accentOn,
    [pillGlow]: vars.color.accentGlow,
    [pillRestGlowPct]: "38%",
    [pillActiveHaloPct]: "55%",
  },
  color: pillFg,
  background: `linear-gradient(180deg, color-mix(in oklab, ${pillColor} 88%, white 12%) 0%, ${pillColor} 55%, color-mix(in oklab, ${pillColor} 92%, black 8%) 100%)`,
  boxShadow: [
    `inset 0 1px 0 0 color-mix(in oklab, white 32%, transparent)`,
    `inset 0 -1px 0 0 color-mix(in oklab, black 18%, transparent)`,
    `0 0 0 0.5px color-mix(in oklab, ${pillColor} 60%, black 40%)`,
    `0 1px 2px -0.5px color-mix(in oklab, black 55%, transparent)`,
    `0 0 14px -3px color-mix(in oklab, ${pillColor} ${pillRestGlowPct}, transparent)`,
  ].join(", "),
  selectors: {
    '&[data-kind="emotion"]': {
      vars: {
        [pillColor]: vars.color.tertiary,
        [pillFg]: "#1a0a00",
        [pillGlow]: `color-mix(in oklab, ${vars.color.tertiary} 60%, transparent)`,
        [pillRestGlowPct]: "32%",
        [pillActiveHaloPct]: "50%",
      },
    },
    '&[data-active="true"]': {
      background: `linear-gradient(180deg, color-mix(in oklab, ${pillColor} 76%, white 24%) 0%, ${pillColor} 55%, color-mix(in oklab, ${pillColor} 92%, black 8%) 100%)`,
      boxShadow: [
        `inset 0 1px 0 0 color-mix(in oklab, white 44%, transparent)`,
        `inset 0 -1px 0 0 color-mix(in oklab, black 18%, transparent)`,
        `0 0 0 0.5px color-mix(in oklab, ${pillColor} 60%, black 40%)`,
        `0 1px 2px -0.5px color-mix(in oklab, black 55%, transparent)`,
        `0 0 0 3px color-mix(in oklab, ${pillGlow} 65%, transparent)`,
        `0 0 22px -2px color-mix(in oklab, ${pillColor} ${pillActiveHaloPct}, transparent)`,
      ].join(", "),
      textShadow: `0 0 6px color-mix(in oklab, ${pillFg} 35%, transparent)`,
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
