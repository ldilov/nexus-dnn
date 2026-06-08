import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const modeRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.sm,
});

export const modeToggle = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
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

export const notice = style({
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
  lineHeight: 1.5,
  padding: vars.space.sm,
  borderRadius: vars.radius.sm,
  background: `color-mix(in oklab, ${vars.color.warning} 10%, transparent)`,
});

export const textarea = style({
  width: "100%",
  minHeight: "92px",
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  background: vars.color.surface,
  color: vars.color.text,
  border: "none",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  lineHeight: 1.5,
  resize: "vertical",
  transition: `box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:hover": { boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}` },
    "&:focus-visible": {
      outline: "none",
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, ${vars.shadow.focusRing}`,
    },
  },
});

export const clipRow = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const clipLabel = style({
  fontSize: vars.text.micro,
  fontWeight: 600,
  color: vars.color.textMuted,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
});

export const hint = style({
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
  lineHeight: 1.5,
  padding: vars.space.sm,
  borderRadius: vars.radius.sm,
  background: `color-mix(in oklab, ${vars.color.accent} 7%, transparent)`,
});

export const errorText = style({
  fontSize: vars.text.micro,
  color: vars.color.danger,
});
