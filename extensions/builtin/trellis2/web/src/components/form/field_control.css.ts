import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: "9px",
});

export const labelRow = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.sm,
});

export const label = style({
  fontSize: "11px",
  fontWeight: vars.weight.semibold,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: vars.color.textMuted,
});

export const valueReadout = style({
  fontFamily: vars.font.mono,
  fontSize: "13.5px",
  fontWeight: 700,
  color: vars.color.accent,
  fontVariantNumeric: "tabular-nums",
});

export const help = style({
  fontSize: "11px",
  color: vars.color.textMuted,
  lineHeight: 1.45,
});

export const errorText = style({
  fontSize: vars.text.micro,
  color: vars.color.danger,
});

const inputBase = style({
  width: "100%",
  height: "44px",
  padding: "0 14px",
  borderRadius: "9px",
  background: vars.color.surface,
  color: vars.color.text,
  border: "none",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  fontFamily: vars.font.body,
  fontSize: "13.5px",
  transition: `box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:hover": { boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}` },
    "&:focus-visible": {
      outline: "none",
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, 0 0 0 3px ${vars.color.accentGlow}`,
    },
  },
});

export const numberInput = style([
  inputBase,
  {
    fontFamily: vars.font.mono,
    fontSize: "16px",
    fontWeight: vars.weight.semibold,
    fontVariantNumeric: "tabular-nums",
  },
]);

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
  height: "5px",
  borderRadius: vars.radius.pill,
  background: `linear-gradient(to right, ${vars.color.accent} var(--trellis2-slider-fill, 0%), ${vars.color.surface} var(--trellis2-slider-fill, 0%))`,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
};

const thumbBase = {
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  background: vars.color.accent,
  border: "none",
  boxShadow: `0 0 0 5px color-mix(in oklab, ${vars.color.accent} 16%, transparent), 0 2px 7px rgba(0,0,0,0.55)`,
  cursor: "grab",
};

export const slider = style({
  width: "100%",
  height: "44px",
  appearance: "none",
  background: "transparent",
  cursor: "pointer",
  selectors: {
    "&::-webkit-slider-runnable-track": trackBase,
    "&::-moz-range-track": trackBase,
    "&::-webkit-slider-thumb": {
      ...thumbBase,
      appearance: "none",
      marginTop: "-5.5px",
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
  minHeight: "44px",
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
    "&:disabled": { cursor: "not-allowed", opacity: 0.55 },
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
