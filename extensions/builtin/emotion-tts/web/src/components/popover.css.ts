import { style } from "@vanilla-extract/css";
import { vars } from "../theme/tokens.css";

export const anchor = style({
  position: "relative",
  display: "inline-flex",
});

export const trigger = style({
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  color: vars.color.textMuted,
  background: "transparent",
  border: `1px solid ${vars.color.borderSubtle}`,
  borderRadius: vars.radius.pill,
  cursor: "pointer",
  transition: `color ${vars.motion.fast}, border-color ${vars.motion.fast}, background ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      color: vars.color.text,
      borderColor: `color-mix(in oklab, ${vars.color.accent} 45%, transparent)`,
    },
    '&[aria-expanded="true"]': {
      color: vars.color.accent,
      borderColor: `color-mix(in oklab, ${vars.color.accent} 60%, transparent)`,
      background: `color-mix(in oklab, ${vars.color.accent} 10%, transparent)`,
    },
  },
});

export const triggerGlyph = style({
  width: "14px",
  height: "14px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: vars.radius.pill,
  border: `1px solid currentColor`,
  fontSize: "0.6875rem",
  fontWeight: 700,
  fontFamily: vars.font.body,
  lineHeight: 1,
});

export const content = style({
  position: "absolute",
  insetBlockStart: "calc(100% + 8px)",
  insetInlineEnd: 0,
  zIndex: 30,
  minWidth: "320px",
  maxWidth: "420px",
  padding: vars.space.lg,
  background: vars.color.surfaceHigh,
  color: vars.color.text,
  borderRadius: vars.radius.lg,
  boxShadow: `${vars.shadow.raised}, 0 0 0 1px ${vars.color.borderSubtle}`,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  fontSize: vars.text.caption,
  lineHeight: 1.55,
  animation: "etts-popover-in 160ms ease-out",
});

export const heading = style({
  margin: 0,
  fontFamily: vars.font.display,
  fontSize: vars.text.subhead,
  fontWeight: 600,
  letterSpacing: vars.tracking.display,
});

export const sectionTitle = style({
  margin: 0,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  color: vars.color.textMuted,
});

export const itemList = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const item = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export const itemSyntax = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.accent,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const itemHelp = style({
  color: vars.color.textMuted,
});

export const note = style({
  margin: 0,
  paddingTop: vars.space.sm,
  borderTop: `1px solid ${vars.color.borderSubtle}`,
  color: vars.color.textMuted,
});

export const noteStrong = style({
  color: vars.color.text,
  fontWeight: 600,
});
