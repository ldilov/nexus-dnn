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

const selectChevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23aaabae' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")";

export const select = style([
  input,
  {
    cursor: "pointer",
    appearance: "none",
    paddingRight: vars.space.xl,
    backgroundImage: selectChevron,
    backgroundRepeat: "no-repeat",
    backgroundPosition: `right ${vars.space.md} center`,
  },
]);

export const actions = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  marginTop: vars.space.lg,
});

export const dirtyHint = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  fontSize: vars.text.caption,
  fontWeight: vars.weight.semibold,
  color: vars.color.warning,
  selectors: {
    "&::before": {
      content: "''",
      width: "7px",
      height: "7px",
      borderRadius: vars.radius.pill,
      background: vars.color.warning,
    },
  },
});
