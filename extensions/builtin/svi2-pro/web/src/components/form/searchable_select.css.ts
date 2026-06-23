import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const root = style({
  position: "relative",
  width: "100%",
});

export const trigger = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  width: "100%",
  height: "46px",
  background: vars.color.surface,
  border: "none",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  borderRadius: "10px",
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: "13.5px",
  textAlign: "left",
  padding: "0 14px",
  cursor: "pointer",
  transition: `box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, 0 0 0 3px ${vars.color.accentGlow}`,
    },
  },
});

export const triggerText = style({
  flex: "1 1 auto",
  minWidth: 0,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

export const triggerPlaceholder = style([
  triggerText,
  {
    color: vars.color.textMuted,
  },
]);

export const chevron = style({
  display: "inline-flex",
  flexShrink: 0,
  width: "16px",
  height: "16px",
  color: vars.color.textMuted,
});

const popoverIn = keyframes({
  from: { opacity: 0, transform: "translateY(-4px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const popover = style({
  position: "absolute",
  top: "calc(100% + 6px)",
  insetInline: 0,
  zIndex: 40,
  display: "flex",
  flexDirection: "column",
  maxHeight: "min(340px, 60vh)",
  background: vars.color.surfaceRaised,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}, ${vars.shadow.raised}`,
  borderRadius: "12px",
  overflow: "hidden",
  animation: `${popoverIn} ${vars.motion.fast}`,
});

export const searchRow = style({
  flexShrink: 0,
  padding: "8px",
  boxShadow: `inset 0 -1px 0 0 ${vars.color.borderSubtle}`,
});

export const searchInput = style({
  width: "100%",
  height: "38px",
  background: vars.color.surfaceMuted,
  border: "none",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  borderRadius: "8px",
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: "13px",
  padding: "0 12px",
  outline: "none",
  selectors: {
    "&:focus-visible": {
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, 0 0 0 3px ${vars.color.accentGlow}`,
    },
  },
});

export const list = style({
  listStyle: "none",
  margin: 0,
  padding: "4px",
  overflowY: "auto",
  flex: "1 1 auto",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export const option = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
  width: "100%",
  padding: "9px 11px",
  borderRadius: "8px",
  border: "none",
  background: "transparent",
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: "13px",
  textAlign: "left",
  cursor: "pointer",
  userSelect: "none",
});

export const optionActive = style({
  background: vars.color.surfaceHigh,
  "@media": {
    // Background is dropped in forced-colors mode; keep the keyboard-active row
    // visible with a system-color outline.
    "(forced-colors: active)": {
      outline: "2px solid Highlight",
      outlineOffset: "-2px",
    },
  },
});

export const optionSelected = style({
  fontWeight: vars.weight.semibold,
});

export const optionLabel = style({
  flex: "1 1 auto",
  minWidth: 0,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  textAlign: "left",
});

export const check = style({
  display: "inline-flex",
  flexShrink: 0,
  width: "16px",
  height: "16px",
  color: vars.color.accent,
});

export const empty = style({
  listStyle: "none",
  padding: "14px 12px",
  textAlign: "center",
  color: vars.color.textMuted,
  fontSize: "12.5px",
});
