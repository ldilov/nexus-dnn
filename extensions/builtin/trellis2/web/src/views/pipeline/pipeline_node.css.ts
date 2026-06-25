import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

const pulse = keyframes({
  "0%, 100%": { boxShadow: `0 0 0 1px ${vars.color.accent}` },
  "50%": { boxShadow: `0 0 0 3px ${vars.color.accentGlow}` },
});

const base = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  minWidth: "132px",
  padding: `${vars.space.md} ${vars.space.lg}`,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceRaised,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
});

export const node = styleVariants({
  idle: [base],
  active: [
    base,
    {
      animation: `${pulse} 1.5s ease-in-out infinite`,
      "@media": {
        "(prefers-reduced-motion: reduce)": {
          animation: "none",
          boxShadow: `0 0 0 2px ${vars.color.accent}`,
        },
      },
    },
  ],
  done: [base, { boxShadow: `inset 0 0 0 1px ${vars.color.success}` }],
  error: [base, { boxShadow: `inset 0 0 0 1px ${vars.color.danger}` }],
});

export const label = style({
  fontSize: vars.text.caption,
  fontWeight: 600,
  color: vars.color.text,
});

export const stateText = styleVariants({
  idle: [{ fontSize: vars.text.micro, color: vars.color.textFaint }],
  active: [{ fontSize: vars.text.micro, color: vars.color.accent }],
  done: [{ fontSize: vars.text.micro, color: vars.color.success }],
  error: [{ fontSize: vars.text.micro, color: vars.color.danger }],
});

export const handle = style({
  width: "7px",
  height: "7px",
  background: vars.color.borderGhost,
  border: "none",
});
