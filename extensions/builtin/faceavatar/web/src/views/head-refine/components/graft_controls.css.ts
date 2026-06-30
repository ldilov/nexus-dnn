import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: vars.space.lg,
});

export const ctl = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  minWidth: 0,
});

export const ctlWide = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  gridColumn: "1 / -1",
});

export const ctlLabel = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textFaint,
});

export const ctlLabelRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.sm,
});

export const readout = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const input = style({
  appearance: "none",
  width: "100%",
  height: "40px",
  padding: `0 ${vars.space.md}`,
  borderRadius: vars.radius.md,
  background: vars.color.canvas,
  border: "none",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  color: vars.color.text,
  cursor: "pointer",
  selectors: {
    "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focusRing },
    "&:disabled": { cursor: "not-allowed", opacity: 0.55 },
  },
});

const trackBase = {
  height: "5px",
  borderRadius: vars.radius.pill,
  background: vars.color.surfaceFloor,
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
    },
    "&::-moz-range-thumb": thumbBase,
    "&:focus-visible::-webkit-slider-thumb": { boxShadow: vars.shadow.focusRing },
    "&:focus-visible::-moz-range-thumb": { boxShadow: vars.shadow.focusRing },
    "&:disabled": { cursor: "not-allowed", opacity: 0.55 },
  },
});

export const toggleRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.lg,
  padding: `${vars.space.lg} ${vars.space.lg}`,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceFloor,
  gridColumn: "1 / -1",
});

export const toggleCopy = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: 0,
});

export const toggleTitle = style({
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.text,
});

export const toggleHint = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const toggle = style({
  position: "relative",
  width: "44px",
  height: "24px",
  flexShrink: 0,
  borderRadius: vars.radius.pill,
  background: vars.color.surfaceHigh,
  border: "none",
  cursor: "pointer",
  transition: `background ${vars.motion.fast}`,
  selectors: {
    "&[aria-checked='true']": { background: vars.color.accent },
    "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focusRing },
    "&:disabled": { cursor: "not-allowed", opacity: 0.55 },
  },
});

export const toggleThumb = style({
  position: "absolute",
  top: "3px",
  left: "3px",
  width: "18px",
  height: "18px",
  borderRadius: "50%",
  background: vars.color.text,
  transition: `transform ${vars.motion.fast}`,
  selectors: {
    "[aria-checked='true'] &": { transform: "translateX(20px)" },
  },
});
