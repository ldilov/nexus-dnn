import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const segment = style({
  display: "inline-flex",
  padding: "2px",
  borderRadius: vars.radius.sm,
  background: vars.color.surfaceInset,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
});

const tabBase = style({
  appearance: "none",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: vars.radius.sm,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: vars.color.textMuted,
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}`,
  selectors: {
    "&:hover": { color: vars.color.text },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "1px",
    },
  },
});

export const tab = style([tabBase]);

export const tabActive = style([
  tabBase,
  {
    background: `color-mix(in oklab, ${vars.color.accent} 20%, transparent)`,
    color: vars.color.text,
    boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 40%, transparent)`,
  },
]);
