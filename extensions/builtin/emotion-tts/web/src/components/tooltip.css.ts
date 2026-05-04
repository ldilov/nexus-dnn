import { style } from "@vanilla-extract/css";
import { vars } from "../theme/tokens.css";

export const wrapper = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — sub-token gap for inline help dot next to text
  marginLeft: "4px",
});

export const dot = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  // audit-allow: px — design-system-spec'd compact help-dot size
  width: "16px",
  // audit-allow: px — design-system-spec'd compact help-dot size
  height: "16px",
  borderRadius: vars.radius.pill,
  background: "transparent",
  color: vars.color.textMuted,
  border: `1px solid ${vars.color.borderGhost}`,
  fontFamily: vars.font.mono,
  // audit-allow: px — sub-token font sizing for inline icon glyph
  fontSize: "10px",
  fontWeight: 600,
  lineHeight: 1,
  cursor: "help",
  padding: 0,
  transition: `color ${vars.motion.fast}, border-color ${vars.motion.fast}, background ${vars.motion.fast}`,
  selectors: {
    "&:hover, &:focus-visible": {
      color: vars.color.text,
      borderColor: vars.color.accent,
      background: `color-mix(in oklab, ${vars.color.accent} 10%, transparent)`,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "2px",
    },
  },
});

export const bubble = style({
  position: "absolute",
  zIndex: 100,
  // audit-allow: px — fixed offset for tooltip anchor
  bottom: "calc(100% + 8px)",
  left: "50%",
  transform: "translateX(-50%)",
  // audit-allow: px — readable line length cap
  maxWidth: "280px",
  // audit-allow: px — readable line length cap
  width: "max-content",
  padding: `${vars.space.sm} ${vars.space.md}`,
  background: vars.color.surfaceMuted,
  color: vars.color.text,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.borderSubtle}`,
  boxShadow: vars.shadow.raised,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  fontWeight: 400,
  lineHeight: 1.45,
  letterSpacing: 0,
  textTransform: "none",
  whiteSpace: "normal",
  pointerEvents: "none",
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      // audit-allow: px — caret triangle size
      bottom: "-5px",
      left: "50%",
      // audit-allow: px — caret triangle anchor
      marginLeft: "-5px",
      // audit-allow: px — caret triangle size
      width: "10px",
      // audit-allow: px — caret triangle size
      height: "10px",
      background: vars.color.surfaceMuted,
      borderRight: `1px solid ${vars.color.borderSubtle}`,
      borderBottom: `1px solid ${vars.color.borderSubtle}`,
      transform: "rotate(45deg)",
    },
  },
});
