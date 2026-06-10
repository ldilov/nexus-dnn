import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const banner = style({
  display: "flex",
  alignItems: "center",
  gap: "13px",
  padding: "13px 16px",
  borderRadius: "11px",
  fontSize: "12.5px",
  color: vars.color.text,
});

export const bannerOk = style({
  background: `color-mix(in oklab, ${vars.color.success} 7%, transparent)`,
  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.success} 22%, transparent)`,
});

export const bannerNeutral = style({
  background: vars.color.surfaceRaised,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
});

export const bannerWarn = style({
  background: `color-mix(in oklab, ${vars.color.warning} 8%, transparent)`,
  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.warning} 28%, transparent)`,
});

export const icon = style({
  display: "inline-flex",
  width: "19px",
  height: "19px",
  flexShrink: 0,
});

export const iconOk = style({ color: vars.color.success });
export const iconNeutral = style({ color: vars.color.textMuted });
export const iconWarn = style({ color: vars.color.warning });

export const text = style({
  flex: 1,
  lineHeight: 1.5,
});

const tagBase = style({
  fontFamily: vars.font.mono,
  fontSize: "9.5px",
  fontWeight: vars.weight.semibold,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "3px 9px",
  borderRadius: "6px",
  whiteSpace: "nowrap",
  flexShrink: 0,
});

export const tagOk = style([
  tagBase,
  {
    color: `color-mix(in oklab, ${vars.color.success} 70%, ${vars.color.text})`,
    background: `color-mix(in oklab, ${vars.color.success} 10%, transparent)`,
  },
]);

export const tagNeutral = style([
  tagBase,
  {
    color: vars.color.textMuted,
    background: vars.color.surfaceHighest,
  },
]);

export const tagWarn = style([
  tagBase,
  {
    color: vars.color.warning,
    background: `color-mix(in oklab, ${vars.color.warning} 12%, transparent)`,
  },
]);
