import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  borderRadius: "16px",
  background: vars.color.surfaceRaised,
  boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--outline-variant, #46484a) 18%, transparent)",
  overflow: "hidden",
});

export const header = style({
  display: "flex",
  alignItems: "center",
  gap: "14px",
  width: "100%",
  padding: "18px 20px",
  background: "transparent",
  border: "none",
  color: vars.color.text,
  cursor: "pointer",
  textAlign: "left",
  transition: `background ${vars.motion.fast}`,
  selectors: {
    "&:hover": { background: vars.color.surfaceHigh },
    "&:disabled": { cursor: "default" },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "-2px",
    },
  },
});

export const chevron = style({
  display: "inline-flex",
  width: "20px",
  height: "20px",
  color: vars.color.textMuted,
  flexShrink: 0,
  transition: `transform ${vars.motion.slow}`,
});

export const chevronCollapsed = style({
  transform: "rotate(-90deg)",
});

export const titleBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: "3px",
  flex: 1,
  minWidth: 0,
});

export const title = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.text,
});

export const description = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const badgeSlot = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  marginLeft: "auto",
});

export const summaryChip = style({
  fontFamily: vars.font.mono,
  fontSize: "11px",
  letterSpacing: "0.02em",
  color: vars.color.textMuted,
  background: vars.color.surface,
  padding: "6px 11px",
  borderRadius: "8px",
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "nowrap",
});

export const bodyShell = style({
  display: "grid",
  gridTemplateRows: "0fr",
  opacity: 0,
  transition: "grid-template-rows 420ms cubic-bezier(0.2, 0, 0, 1), opacity 300ms ease",
});

export const bodyShellOpen = style({
  gridTemplateRows: "1fr",
  opacity: 1,
});

export const bodyClip = style({
  minHeight: 0,
  overflow: "hidden",
});

export const body = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  padding: "2px 20px 22px",
});
