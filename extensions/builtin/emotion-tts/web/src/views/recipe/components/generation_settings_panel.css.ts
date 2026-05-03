import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  gap: vars.space.md,
});

export const row = style({
  display: "grid",
  gridTemplateColumns: "minmax(120px, 160px) minmax(0, 1fr)",
  gap: vars.space.lg,
  alignItems: "center",
  "@media": {
    "(max-width: 720px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
      gap: vars.space.xs,
    },
  },
});

export const rowStacked = style({
  display: "grid",
  gridTemplateColumns: "minmax(120px, 160px) minmax(0, 1fr)",
  gap: vars.space.lg,
  alignItems: "start",
  "@media": {
    "(max-width: 720px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
      gap: vars.space.xs,
    },
  },
});

export const label = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  color: vars.color.textMuted,
  fontWeight: 600,
});

export const control = style({
  minWidth: 0,
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
});

export const select = style({
  appearance: "none",
  WebkitAppearance: "none",
  background: vars.color.surface,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  height: "36px",
  paddingInline: `${vars.space.md} 32px`,
  border: "none",
  borderRadius: vars.radius.sm,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  cursor: "pointer",
  outline: "none",
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'><path fill='none' stroke='%23aaabae' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' d='M1 1.5l5 5 5-5'/></svg>\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  backgroundSize: "10px 7px",
  transition: "box-shadow 160ms",
  selectors: {
    "&:focus-visible": {
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, ${vars.shadow.glow}`,
    },
    "&:hover": {
      boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
    },
  },
});

export const numberInput = style({
  appearance: "textfield",
  MozAppearance: "textfield",
  WebkitAppearance: "none",
  background: vars.color.surface,
  color: vars.color.text,
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  height: "36px",
  paddingInline: vars.space.md,
  border: "none",
  borderRadius: vars.radius.sm,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  outline: "none",
  width: "100%",
  maxWidth: "180px",
  transition: "box-shadow 160ms",
  selectors: {
    "&:focus-visible": {
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, ${vars.shadow.glow}`,
    },
    "&:hover": {
      boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
    },
    "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
  },
});

export const speedRow = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: vars.space.md,
  alignItems: "center",
  width: "100%",
});

export const range = style({
  appearance: "none",
  WebkitAppearance: "none",
  width: "100%",
  height: "4px",
  background: `linear-gradient(to right, ${vars.color.accent} var(--range-pct, 50%), ${vars.color.borderSubtle} var(--range-pct, 50%))`,
  borderRadius: "999px",
  outline: "none",
  cursor: "pointer",
  margin: 0,
  selectors: {
    "&::-webkit-slider-thumb": {
      appearance: "none",
      WebkitAppearance: "none",
      width: "16px",
      height: "16px",
      borderRadius: "999px",
      background: vars.color.accent,
      border: `2px solid ${vars.color.surface}`,
      boxShadow: vars.shadow.glow,
      cursor: "pointer",
      transition: "transform 120ms",
    },
    "&::-webkit-slider-thumb:hover": {
      transform: "scale(1.15)",
    },
    "&::-moz-range-thumb": {
      width: "16px",
      height: "16px",
      borderRadius: "999px",
      background: vars.color.accent,
      border: `2px solid ${vars.color.surface}`,
      boxShadow: vars.shadow.glow,
      cursor: "pointer",
    },
    "&:focus-visible::-webkit-slider-thumb": {
      boxShadow: `0 0 0 4px color-mix(in oklab, ${vars.color.accent} 30%, transparent)`,
    },
  },
});

export const speedValue = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  color: vars.color.text,
  minWidth: "56px",
  textAlign: "right",
  fontVariantNumeric: "tabular-nums",
});

export const cacheRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.xs,
  alignItems: "center",
});

export const cacheBtn = style({
  appearance: "none",
  background: "transparent",
  color: vars.color.textMuted,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  fontWeight: 500,
  height: "32px",
  paddingInline: vars.space.md,
  border: "none",
  borderRadius: vars.radius.sm,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  cursor: "pointer",
  transition: "all 160ms",
  selectors: {
    "&:hover": {
      color: vars.color.text,
      boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
    },
    '&[aria-checked="true"]': {
      background: vars.color.accent,
      color: vars.color.accentOn,
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, ${vars.shadow.glow}`,
    },
    '&[aria-checked="true"]:hover': {
      color: vars.color.accentOn,
    },
  },
});

export const helpText = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.textFaint,
  fontStyle: "italic",
  margin: 0,
  marginTop: vars.space.xs,
  gridColumn: "2 / -1",
  "@media": {
    "(max-width: 720px)": {
      gridColumn: "1 / -1",
    },
  },
});

export const divider = style({
  height: "1px",
  background: vars.color.borderSubtle,
  marginBlock: vars.space.sm,
});

export const sectionLabel = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  color: vars.color.textFaint,
  fontWeight: 600,
});
