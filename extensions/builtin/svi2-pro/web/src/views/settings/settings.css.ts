import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const form = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: vars.space.lg,
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const label = style({
  fontSize: vars.text.caption,
  fontWeight: 600,
  color: vars.color.text,
});

export const help = style({
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
});

export const input = style({
  width: "100%",
  height: "38px",
  padding: `0 ${vars.space.md}`,
  borderRadius: vars.radius.md,
  background: vars.color.surface,
  color: vars.color.text,
  border: "none",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  selectors: {
    "&:focus-visible": {
      outline: "none",
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, ${vars.shadow.focusRing}`,
    },
  },
});

export const select = style([input, { cursor: "pointer", appearance: "none" }]);

export const actions = style({
  display: "flex",
  gap: vars.space.sm,
  marginTop: vars.space.lg,
});
