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
  background: vars.color.surfaceMuted,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
  transition: `box-shadow ${vars.motion.fast}, background ${vars.motion.fast}`,
  selectors: {
    "&:focus-within": {
      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 32%, transparent), ${vars.shadow.focusRing}`,
      background: vars.color.surfaceRaised,
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
  padding: `0 ${vars.space.xs}`,
  borderRadius: vars.radius.sm,
  fontFamily: vars.font.body,
  fontWeight: 600,
  color: vars.color.accentOn,
  background: vars.color.accent,
  boxShadow: `0 0 0 1px ${vars.color.accentDim}`,
});

export const emotionBadge = style({
  display: "inline",
  padding: `0 ${vars.space.xs}`,
  borderRadius: vars.radius.sm,
  fontFamily: vars.font.body,
  fontWeight: 600,
  color: vars.color.text,
  background: `color-mix(in oklab, ${vars.color.tertiary} 22%, ${vars.color.surfaceHigh})`,
  boxShadow: `0 0 0 1px ${vars.color.tertiary}`,
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
  padding: `${vars.space.xs} ${vars.space.sm}`,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textFaint,
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
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  cursor: "pointer",
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.text,
  background: "transparent",
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}`,
  selectors: {
    "&[data-active='true']": {
      background: `color-mix(in oklab, ${vars.color.accent} 22%, transparent)`,
      color: vars.color.text,
    },
    "&:hover": {
      background: `color-mix(in oklab, ${vars.color.accent} 12%, transparent)`,
    },
  },
});

export const popoverItemHint = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textFaint,
});

export const popoverEmpty = style({
  padding: `${vars.space.sm} ${vars.space.md}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  textAlign: "center",
});

export const helpRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
  flexWrap: "wrap",
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  color: vars.color.textMuted,
});

export const helpKbd = style({
  display: "inline-flex",
  alignItems: "center",
  padding: `0 ${vars.space.xs}`,
  height: "1.25rem",
  background: vars.color.surfaceHigh,
  borderRadius: vars.radius.sm,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
  color: vars.color.text,
  fontFamily: vars.font.mono,
});
