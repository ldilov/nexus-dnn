import { style } from "@vanilla-extract/css";
import { vars } from "../theme/tokens.css";

export const wrapper = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — design-system-spec'd touch-zone gap
  gap: "12px",
  cursor: "pointer",
  userSelect: "none",
  selectors: {
    "&[data-disabled='true']": {
      cursor: "not-allowed",
      opacity: 0.55,
    },
  },
});

export const wrapperEmphasised = style({});

export const input = style({
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
  width: 0,
  height: 0,
});

export const box = style({
  display: "grid",
  placeItems: "center",
  // audit-allow: px — design-system-spec'd checkbox dimension
  width: "18px",
  // audit-allow: px — design-system-spec'd checkbox dimension
  height: "18px",
  flex: "0 0 auto",
  background: vars.color.surface,
  border: `1px solid ${vars.color.borderGhost}`,
  borderRadius: vars.radius.sm,
  color: "transparent",
  transition:
    "background 160ms cubic-bezier(0.2, 0, 0, 1), border-color 160ms cubic-bezier(0.2, 0, 0, 1), color 160ms cubic-bezier(0.2, 0, 0, 1), box-shadow 160ms cubic-bezier(0.2, 0, 0, 1)",
  selectors: {
    [`${wrapper}:hover &`]: {
      borderColor: vars.color.accent,
    },
    [`${input}:focus-visible + &`]: {
      boxShadow: `0 0 0 2px ${vars.color.accent}`,
    },
    [`${input}:checked + &`]: {
      background: vars.color.accent,
      borderColor: vars.color.accent,
      color: "var(--on-primary, #0c0e10)",
    },
  },
});

export const glyph = style({
  // audit-allow: px — design-system-spec'd glyph size
  fontSize: "14px",
  fontWeight: 700,
  pointerEvents: "none",
});

export const labelBlock = style({
  display: "inline-flex",
  alignItems: "baseline",
  // audit-allow: px — design-system-spec'd label gap
  gap: "10px",
  flexWrap: "wrap",
  fontSize: vars.text.body,
  color: vars.color.text,
});

export const label = style({
  fontFamily: vars.font.body,
  fontWeight: 600,
  // audit-allow: px — sub-token tracking
  letterSpacing: "-0.01em",
  fontSize: vars.text.body,
  color: vars.color.text,
  selectors: {
    [`${wrapperEmphasised} &`]: {
      color: vars.color.accent,
    },
  },
});

export const hint = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  letterSpacing: 0,
  textTransform: "none",
});
