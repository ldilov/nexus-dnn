import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const wrap = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const label = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textFaint,
});

export const select = style({
  appearance: "none",
  width: "100%",
  height: "40px",
  padding: `0 ${vars.space.md}`,
  borderRadius: vars.radius.md,
  background: vars.color.canvas,
  border: "none",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  color: vars.color.text,
  cursor: "pointer",
  selectors: {
    "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focusRing },
    "&:disabled": { cursor: "not-allowed", opacity: 0.55 },
  },
});

export const hiddenInput = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
});

export const selected = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceFloor,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
});

export const selectedIcon = style({
  fontFamily: "'Material Symbols Outlined'",
  fontSize: "18px",
  lineHeight: 1,
  color: vars.color.textFaint,
  flexShrink: 0,
});

export const selectedName = style({
  flex: 1,
  minWidth: 0,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.text,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const clearBtn = style({
  flexShrink: 0,
  background: "transparent",
  border: "none",
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  fontWeight: vars.weight.medium,
  color: vars.color.textMuted,
  cursor: "pointer",
  selectors: {
    "&:hover:not(:disabled)": { color: vars.color.text },
    "&:disabled": { cursor: "not-allowed", opacity: 0.55 },
  },
});

export const hint = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});
