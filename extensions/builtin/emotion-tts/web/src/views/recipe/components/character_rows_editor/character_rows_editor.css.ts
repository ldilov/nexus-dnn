import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/tokens.css";

const rowSettle = keyframes({
  "0%": { opacity: 0, transform: "translateY(-6px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const nudge = keyframes({
  "0%, 100%": { transform: "translateX(0)" },
  "30%": { transform: "translateX(-3px)" },
  "60%": { transform: "translateX(3px)" },
});

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const header = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.md,
});

export const headerEyebrow = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textMuted,
});

export const counter = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textFaint,
  display: "inline-flex",
  alignItems: "baseline",
  gap: vars.space.xs,
});

export const counterValue = style({
  fontSize: vars.text.body,
  color: vars.color.accent,
  fontVariantNumeric: "tabular-nums",
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  margin: 0,
  padding: 0,
  listStyle: "none",
});

export const row = style({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "auto auto 160px 160px 120px 1fr auto",
  alignItems: "center",
  gap: vars.space.sm,
  padding: vars.space.md,
  paddingBottom: `calc(${vars.space.md} + 4px)`,
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.md,
  animation: `${rowSettle} 200ms cubic-bezier(0.16, 1, 0.3, 1)`,
  transition: [
    `background ${vars.motion.fast}`,
    `box-shadow ${vars.motion.normal}`,
    `transform ${vars.motion.fast}`,
    `opacity ${vars.motion.fast}`,
  ].join(", "),
  selectors: {
    "&:hover": {
      background: vars.color.surfaceRaised,
      transform: "translateY(-1px)",
      boxShadow: vars.shadow.subtle,
    },
    "&[data-mapped]": {
      boxShadow: `inset 2px 0 0 ${vars.color.accentDim}`,
    },
    "&:focus-within": {
      background: vars.color.surfaceRaised,
      boxShadow: `inset 2px 0 0 ${vars.color.accent}, 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 18%, transparent), 0 8px 24px -12px ${vars.color.accentGlow}`,
    },
    "&[data-dragging]": {
      opacity: 0.4,
      transform: "scale(0.99)",
    },
    "&[data-drag-over]": {
      boxShadow: `0 -2px 0 ${vars.color.accent}, ${vars.shadow.subtle}`,
    },
  },
  "@media": {
    "(max-width: 960px)": {
      gridTemplateColumns: "auto auto 1fr 1fr auto",
      gridTemplateAreas: `
        "drag ord char preset rm"
        "alpha alpha alpha alpha alpha"
        "text text text text text"
      `,
    },
  },
});

export const dragHandle = style({
  appearance: "none",
  width: "1.5rem",
  height: "1.5rem",
  padding: 0,
  background: "transparent",
  color: vars.color.textFaint,
  border: "none",
  borderRadius: vars.radius.sm,
  cursor: "grab",
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  lineHeight: 1,
  letterSpacing: "-0.05em",
  opacity: 0.4,
  transition: `opacity ${vars.motion.fast}, color ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      opacity: 1,
      color: vars.color.accent,
    },
    "&:focus-visible": {
      opacity: 1,
      color: vars.color.accent,
    },
    "&:active": {
      cursor: "grabbing",
    },
  },
  "@media": {
    "(max-width: 960px)": { gridArea: "drag" },
  },
});

globalStyle(`${row}:hover ${dragHandle}`, {
  opacity: 1,
});

export const interRowAdd = style({
  position: "absolute",
  bottom: "-12px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "1.5rem",
  height: "1.5rem",
  padding: 0,
  background: vars.color.surfaceHigh,
  color: vars.color.accent,
  border: "none",
  borderRadius: vars.radius.pill,
  boxShadow: `0 0 0 1px ${vars.color.borderGhost}, ${vars.shadow.subtle}`,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  lineHeight: 1,
  cursor: "pointer",
  opacity: 0,
  pointerEvents: "none",
  zIndex: 2,
  transition: `opacity ${vars.motion.fast}, transform ${vars.motion.fast}, box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      transform: "translateX(-50%) scale(1.1)",
      boxShadow: `0 0 0 1px ${vars.color.accent}, ${vars.shadow.glow}`,
    },
  },
  "@media": {
    "(max-width: 960px)": {
      display: "none",
    },
  },
});

globalStyle(`${row}:hover ${interRowAdd}, ${row}:focus-within ${interRowAdd}`, {
  opacity: 1,
  pointerEvents: "auto",
});

export const ordinal = style({
  position: "relative",
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  fontWeight: 500,
  letterSpacing: "-0.01em",
  color: vars.color.textFaint,
  width: "2.5rem",
  textAlign: "right",
  paddingRight: vars.space.sm,
  fontVariantNumeric: "tabular-nums",
  userSelect: "none",
  transition: `color ${vars.motion.fast}`,
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      right: 0,
      top: "50%",
      width: vars.space.sm,
      height: "1px",
      background: vars.color.borderGhost,
      transform: "translateY(-0.5px)",
      transition: `background ${vars.motion.fast}`,
    },
  },
  "@media": {
    "(max-width: 960px)": { gridArea: "ord" },
  },
});

globalStyle(`${row}:focus-within ${ordinal}`, {
  color: vars.color.accent,
});

globalStyle(`${row}:focus-within ${ordinal}::after`, {
  background: vars.color.accent,
});

const inputBase = style({
  appearance: "none",
  width: "100%",
  height: "2rem",
  padding: `0 ${vars.space.sm}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.text,
  background: vars.color.surface,
  border: "none",
  borderRadius: vars.radius.sm,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
  outline: "none",
  transition: `box-shadow ${vars.motion.fast}, background ${vars.motion.fast}`,
  selectors: {
    "&::placeholder": { color: vars.color.textFaint },
    "&:hover:not(:focus)": {
      boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
    },
  },
});

export const characterInput = style([inputBase, {
  "@media": {
    "(max-width: 960px)": { gridArea: "char" },
  },
}]);

export const presetSelect = style([inputBase, {
  paddingRight: vars.space.lg,
  cursor: "pointer",
  "@media": {
    "(max-width: 960px)": { gridArea: "preset" },
  },
}]);

export const alphaWrap = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  "@media": {
    "(max-width: 960px)": { gridArea: "alpha" },
  },
});

export const alphaSlider = style({
  width: "100%",
  paddingTop: vars.space.xs,
  paddingBottom: vars.space.xs,
  accentColor: vars.color.tertiary,
  cursor: "pointer",
  background: "transparent",
});

export const alphaValue = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  fontVariantNumeric: "tabular-nums",
  color: vars.color.textMuted,
  minWidth: "2.5rem",
  textAlign: "right",
  transition: `color ${vars.motion.fast}`,
  selectors: {
    '&[data-hot="true"]': {
      color: vars.color.tertiary,
    },
  },
});

export const textInput = style([inputBase, {
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  height: "2rem",
  "@media": {
    "(max-width: 960px)": { gridArea: "text" },
  },
}]);

export const removeButton = style({
  appearance: "none",
  width: "2rem",
  height: "2rem",
  padding: 0,
  background: "transparent",
  color: vars.color.textFaint,
  border: "none",
  borderRadius: vars.radius.sm,
  cursor: "pointer",
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  lineHeight: 1,
  opacity: 0,
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}, opacity ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      color: vars.color.danger,
      background: `color-mix(in oklab, ${vars.color.danger} 12%, transparent)`,
    },
    "&:focus-visible": {
      color: vars.color.danger,
      opacity: 1,
    },
  },
  "@media": {
    "(max-width: 960px)": { gridArea: "rm" },
    "(forced-colors: active)": {
      border: "1px solid CanvasText",
      opacity: 1,
    },
  },
});

globalStyle(`${row}:hover ${removeButton}, ${row}:focus-within ${removeButton}`, {
  opacity: 1,
});

export const unmappedAnchor = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  marginLeft: vars.space.xs,
});

export const unmappedPopover = style({
  position: "absolute",
  top: "calc(100% + 6px)",
  right: 0,
  minWidth: "16rem",
  maxWidth: "22rem",
  padding: vars.space.md,
  background: vars.color.surfaceHighest,
  borderRadius: vars.radius.md,
  boxShadow: `${vars.shadow.raised}, 0 0 0 1px ${vars.color.borderGhost}, inset 0 2px 0 ${vars.color.warning}`,
  zIndex: 10,
});

export const unmappedPopoverHint = style({
  margin: 0,
  marginBottom: vars.space.sm,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const unmappedList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  margin: 0,
  padding: 0,
  listStyle: "none",
  maxHeight: "12rem",
  overflowY: "auto",
});

export const unmappedListItem = style({
  appearance: "none",
  display: "block",
  width: "100%",
  padding: `${vars.space.xs} ${vars.space.sm}`,
  background: "transparent",
  border: "none",
  borderRadius: vars.radius.sm,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.text,
  textAlign: "left",
  cursor: "pointer",
  transition: `background ${vars.motion.fast}, box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      background: `color-mix(in oklab, ${vars.color.accent} 12%, transparent)`,
      boxShadow: `inset 2px 0 0 ${vars.color.accent}`,
    },
    "&:focus-visible": {
      background: `color-mix(in oklab, ${vars.color.accent} 18%, transparent)`,
      boxShadow: `inset 2px 0 0 ${vars.color.accent}`,
      outline: "none",
    },
  },
});

export const addRowButton = style({
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.xs,
  alignSelf: "flex-start",
  padding: `${vars.space.xs} ${vars.space.md}`,
  background: "transparent",
  color: vars.color.text,
  border: "none",
  borderRadius: vars.radius.sm,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  fontWeight: 600,
  cursor: "pointer",
  transition: `background ${vars.motion.fast}, box-shadow ${vars.motion.fast}, transform ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      background: vars.color.surfaceMuted,
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, ${vars.shadow.glow}`,
    },
    "&:active": { transform: "translateY(1px)" },
  },
});

export const addGlyph = style({
  display: "inline-block",
  fontFamily: vars.font.mono,
  color: vars.color.accent,
  transition: `transform ${vars.motion.normal}`,
});

globalStyle(`${addRowButton}:hover ${addGlyph}`, {
  transform: "rotate(90deg)",
});

export const emptyHint = style({
  margin: 0,
  padding: `${vars.space.lg} ${vars.space.md}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  textAlign: "center",
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.md,
});

export const srOnly = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
  border: 0,
});

export const headerEyebrowHint = style({
  marginLeft: vars.space.xs,
  color: vars.color.textFaint,
  fontWeight: 400,
});

export const unmappedBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `0 ${vars.space.sm}`,
  height: "1.5rem",
  marginLeft: vars.space.xs,
  background: `color-mix(in oklab, ${vars.color.warning} 18%, ${vars.color.surfaceMuted})`,
  color: vars.color.warning,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  fontWeight: 600,
  borderRadius: vars.radius.sm,
  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.warning} 60%, transparent)`,
  animation: `${nudge} 200ms cubic-bezier(0.2, 0, 0, 1)`,
});
