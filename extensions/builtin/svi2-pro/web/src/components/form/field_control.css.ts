import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const labelRow = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.sm,
});

export const label = style({
  fontSize: vars.text.caption,
  fontWeight: 600,
  color: vars.color.text,
});

export const valueReadout = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.accent,
});

export const help = style({
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
  lineHeight: 1.4,
});

export const errorText = style({
  fontSize: vars.text.micro,
  color: vars.color.danger,
});

const inputBase = style({
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
  transition: `box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:hover": { boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}` },
    "&:focus-visible": {
      outline: "none",
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, ${vars.shadow.focusRing}`,
    },
  },
});

export const numberInput = style([inputBase]);

const selectChevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23aaabae' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")";

export const selectInput = style([
  inputBase,
  {
    cursor: "pointer",
    appearance: "none",
    paddingRight: vars.space.xl,
    backgroundImage: selectChevron,
    backgroundRepeat: "no-repeat",
    backgroundPosition: `right ${vars.space.md} center`,
  },
]);

export const invalidInput = style({
  boxShadow: `inset 0 0 0 1px ${vars.color.danger}`,
});

const trackBase = {
  height: "6px",
  borderRadius: vars.radius.pill,
  background: vars.color.surfaceHigh,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
};

const thumbBase = {
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  background: vars.color.accent,
  border: "none",
  boxShadow: `0 0 0 4px color-mix(in oklab, ${vars.color.accent} 22%, transparent)`,
  cursor: "pointer",
};

export const slider = style({
  width: "100%",
  appearance: "none",
  background: "transparent",
  cursor: "pointer",
  selectors: {
    "&::-webkit-slider-runnable-track": trackBase,
    "&::-moz-range-track": trackBase,
    "&::-webkit-slider-thumb": {
      ...thumbBase,
      appearance: "none",
      marginTop: "-5px",
      transition: `box-shadow ${vars.motion.fast}`,
    },
    "&::-moz-range-thumb": thumbBase,
    "&:hover::-webkit-slider-thumb": {
      boxShadow: `0 0 0 6px color-mix(in oklab, ${vars.color.accent} 28%, transparent)`,
    },
    "&:focus-visible::-webkit-slider-thumb": {
      boxShadow: vars.shadow.focusRing,
    },
    "&:focus-visible::-moz-range-thumb": {
      boxShadow: vars.shadow.focusRing,
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      selectors: {
        "&::-webkit-slider-thumb": { transition: "none" },
      },
    },
  },
});

export const toggleRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
});

export const toggle = style({
  position: "relative",
  width: "40px",
  height: "22px",
  flexShrink: 0,
  borderRadius: vars.radius.pill,
  background: vars.color.surfaceHigh,
  border: "none",
  cursor: "pointer",
  transition: `background ${vars.motion.fast}`,
  selectors: {
    "&[aria-checked='true']": { background: vars.color.accent },
    "&:focus-visible": { outline: `2px solid ${vars.color.accent}`, outlineOffset: "2px" },
  },
});

export const toggleThumb = style({
  position: "absolute",
  top: "3px",
  left: "3px",
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  background: vars.color.text,
  transition: `transform ${vars.motion.fast}`,
  selectors: {
    "[aria-checked='true'] &": { transform: "translateX(18px)" },
  },
});
