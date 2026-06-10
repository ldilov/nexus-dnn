import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const toggleRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
});

export const toggleLabel = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export const toggleTitle = style({
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.text,
});

export const toggleHint = style({
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
});

export const textarea = style({
  width: "100%",
  minHeight: "72px",
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  background: vars.color.surface,
  color: vars.color.text,
  border: "none",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  resize: "vertical",
  selectors: {
    "&:focus-visible": {
      outline: "none",
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, ${vars.shadow.focusRing}`,
    },
  },
});

export const switchBtn = style({
  position: "relative",
  width: "40px",
  height: "22px",
  flexShrink: 0,
  borderRadius: vars.radius.pill,
  background: vars.color.surfaceHigh,
  border: "none",
  cursor: "pointer",
  transition: `background ${vars.motion.fast}`,
  selectors: {
    "&[aria-checked='true']": { background: vars.color.accent },
    "&:focus-visible": { outline: `2px solid ${vars.color.accent}`, outlineOffset: "2px" },
  },
});

export const switchThumb = style({
  position: "absolute",
  top: "3px",
  left: "3px",
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  background: vars.color.text,
  transition: `transform ${vars.motion.fast}`,
  selectors: { "[aria-checked='true'] &": { transform: "translateX(18px)" } },
});
