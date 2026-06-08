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
