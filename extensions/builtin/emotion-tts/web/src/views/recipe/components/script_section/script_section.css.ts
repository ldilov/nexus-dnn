import { style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

/* Quick-mode toolbar — accent-anchored editorial bar.
 * Default state: muted left-rail.
 * the same left-rail repeats on the textarea below for visual continuity. */
export const quickBar = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
  // audit-allow: px — design-system-spec'd toolbar inset
  padding: "10px 12px",
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.md,
  borderLeft: `2px solid ${vars.color.borderGhost}`,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  flexWrap: "wrap",
  transition:
    "border-color 200ms cubic-bezier(0.2, 0, 0, 1), background 200ms cubic-bezier(0.2, 0, 0, 1), box-shadow 200ms cubic-bezier(0.2, 0, 0, 1)",
});

export const quickBarOn = style({
  borderLeftColor: vars.color.accent,
  background: `linear-gradient(90deg, color-mix(in oklab, ${vars.color.accent} 8%, ${vars.color.surfaceMuted}) 0%, ${vars.color.surface} 70%)`,
  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 22%, transparent)`,
});

export const counters = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.md,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  marginLeft: "auto",
});

export const counterValue = style({
  color: vars.color.accent,
  fontFamily: vars.font.mono,
});

export const modeCaption = style({
  margin: 0,
  paddingLeft: vars.space.sm,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textMuted,
});
