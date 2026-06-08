import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const shell = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xl,
  width: "100%",
  maxWidth: "1480px",
  margin: "0 auto",
  padding: vars.space.xl,
});

export const header = style({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: vars.space.lg,
  flexWrap: "wrap",
});

export const titleBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const title = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.head,
  fontWeight: 700,
  letterSpacing: vars.tracking.display,
  color: vars.color.text,
});

export const subtitle = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  maxWidth: "60ch",
});

export const tabs = style({
  display: "inline-flex",
  gap: "2px",
  padding: "3px",
  borderRadius: vars.radius.pill,
  background: vars.color.surfaceMuted,
});

export const tab = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `${vars.space.sm} ${vars.space.lg}`,
  borderRadius: vars.radius.pill,
  border: "none",
  background: "transparent",
  color: vars.color.textMuted,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  fontWeight: 600,
  cursor: "pointer",
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}`,
  selectors: {
    "&:hover": { color: vars.color.text },
    "&:focus-visible": { outline: `2px solid ${vars.color.accent}`, outlineOffset: "2px" },
  },
});

export const tabActive = style({
  background: vars.color.accent,
  color: vars.color.accentOn,
  selectors: {
    "&:hover": { color: vars.color.accentOn },
  },
});

export const main = style({
  display: "flex",
  flexDirection: "column",
});
