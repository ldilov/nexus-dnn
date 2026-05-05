import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const wrapper = style({
  position: "relative",
  display: "inline-flex",
  flex: "0 0 auto",
});

/* Trigger pill — voice icon + name + meta + mini-wave + caret. Reads as a
 * single tappable surface even though it carries 4 visual segments. */
export const trigger = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — design-system-spec'd sub-token gap
  gap: "10px",
  // audit-allow: px — design-system-spec'd pill height
  height: "44px",
  // audit-allow: px — design-system-spec'd asymmetric pill inset
  padding: "4px 10px 4px 4px",
  background: vars.color.surface,
  border: `1px solid ${vars.color.borderGhost}`,
  borderRadius: vars.radius.md,
  color: vars.color.text,
  cursor: "pointer",
  // audit-allow: px — minimum width keeps the meta line readable
  minWidth: "240px",
  transition: "border-color 140ms, background 140ms",
  selectors: {
    "&:hover, &:focus-visible": {
      borderColor: vars.color.accent,
      background: `color-mix(in oklab, ${vars.color.accent} 5%, ${vars.color.surface})`,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "2px",
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.55,
    },
  },
});

export const triggerOpen = style({
  borderColor: vars.color.accent,
  background: `color-mix(in oklab, ${vars.color.accent} 8%, ${vars.color.surface})`,
});

export const triggerIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  // audit-allow: px — design-system-spec'd icon square
  width: "32px",
  // audit-allow: px — design-system-spec'd icon square
  height: "32px",
  flex: "0 0 32px",
  borderRadius: vars.radius.sm,
  background: `color-mix(in oklab, ${vars.color.accent} 18%, transparent)`,
  color: vars.color.accent,
  // audit-allow: px — material symbol size override
  fontSize: "18px",
});

export const triggerBody = style({
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
  minWidth: 0,
  flex: "1 1 auto",
  // audit-allow: px — sub-token line spacing
  gap: "1px",
  lineHeight: 1.2,
});

export const triggerName = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.text,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  // audit-allow: px — keeps long filenames from pushing the wave + caret off the right
  maxWidth: "180px",
});

export const triggerMeta = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const triggerWave = style({
  display: "flex",
  alignItems: "center",
  // audit-allow: px — sub-token bar gap
  gap: "1px",
  // audit-allow: px — wave column height
  height: "22px",
  // audit-allow: px — wave column width
  width: "36px",
  flex: "0 0 36px",
});

globalStyle(`${triggerWave} > i`, {
  display: "block",
  // audit-allow: px — bar width; values < 2 collapse on some screens
  width: "2px",
  background: vars.color.accent,
  opacity: 0.7,
  // audit-allow: px — minimum bar height
  minHeight: "2px",
  borderRadius: "1px",
});

export const triggerCaret = style({
  // audit-allow: px — caret glyph size
  fontSize: "18px",
  color: vars.color.textMuted,
  flex: "0 0 auto",
});

/* Anchored dropdown menu */
export const menu = style({
  position: "absolute",
  // audit-allow: px — anchor offset below trigger
  top: "calc(100% + 6px)",
  right: 0,
  zIndex: 30,
  // audit-allow: px — design-system-spec'd dropdown width
  minWidth: "320px",
  // audit-allow: px — caps height on small viewports
  maxHeight: "360px",
  overflowY: "auto",
  background: vars.color.surfaceMuted,
  border: `1px solid ${vars.color.borderGhost}`,
  borderRadius: vars.radius.md,
  boxShadow: vars.shadow.raised,
  padding: "6px",
});

export const menuHead = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  // audit-allow: px — design-system-spec'd head inset
  padding: "8px 10px 6px",
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
  marginBottom: "4px",
});

export const menuHeadLabel = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textMuted,
});

export const menuError = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.danger,
  padding: "6px 10px",
});

export const group = style({
  padding: "4px 0",
  selectors: {
    "& + &": {
      borderTop: `1px solid ${vars.color.borderSubtle}`,
      marginTop: "4px",
      paddingTop: "8px",
    },
  },
});

export const groupLabel = style({
  // audit-allow: px — design-system-spec'd group-label inset
  padding: "4px 10px 6px",
  fontFamily: vars.font.mono,
  // audit-allow: px — sub-token group-label sizing
  fontSize: "10px",
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textMuted,
});

export const menuItem = style({
  appearance: "none",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  width: "100%",
  // audit-allow: px — design-system-spec'd row inset
  padding: "8px 10px",
  background: "transparent",
  border: "none",
  color: vars.color.text,
  fontSize: vars.text.body,
  textAlign: "left",
  cursor: "pointer",
  borderRadius: vars.radius.sm,
  transition: "background 120ms, color 120ms",
  selectors: {
    "&:hover": {
      background: `color-mix(in oklab, ${vars.color.accent} 8%, transparent)`,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "-2px",
    },
  },
});

export const menuItemActive = style({
  background: `color-mix(in oklab, ${vars.color.accent} 14%, transparent)`,
  color: vars.color.accent,
  selectors: {
    "&:hover": {
      background: `color-mix(in oklab, ${vars.color.accent} 18%, transparent)`,
    },
  },
});

export const menuItemDot = style({
  display: "inline-block",
  // audit-allow: px — sub-token dot size
  width: "8px",
  // audit-allow: px — sub-token dot size
  height: "8px",
  borderRadius: "50%",
  background: vars.color.accent,
  flex: "0 0 8px",
});

export const menuItemName = style({
  flex: "1 1 auto",
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  fontWeight: 500,
  // audit-allow: px — keeps long names from pushing meta off
  maxWidth: "200px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const menuItemMeta = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  flex: "0 0 auto",
});

export const menuItemCheck = style({
  // audit-allow: px — material check size
  fontSize: "16px",
  color: vars.color.accent,
  flex: "0 0 auto",
});

/* Inline status text — used when there are no voices or while loading. */
export const muted = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  margin: 0,
});
