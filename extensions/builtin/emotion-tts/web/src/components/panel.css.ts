import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../theme/tokens.css";

const base = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  borderRadius: vars.radius.lg,
});

export const toneStyle = styleVariants({
  raised: [base, { background: vars.color.surfaceRaised }],
  muted: [
    base,
    {
      background: vars.color.surfaceMuted,
      borderRadius: vars.radius.md,
      boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
    },
  ],
});

export const elevationStyle = styleVariants({
  none: {},
  subtle: { boxShadow: vars.shadow.subtle },
  raised: { boxShadow: vars.shadow.raised },
});

export const densityStyle = styleVariants({
  compact: { padding: vars.space.sm },
  comfortable: { padding: `${vars.space.md} ${vars.space.lg}` },
  airy: { padding: `${vars.space.lg} ${vars.space.xl}` },
});

globalStyle(`emotion-tts-app[data-card="glass"] [data-elevation="raised"]`, {
  boxShadow: vars.shadow.subtle,
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,
  flexWrap: "wrap",
});

export type PanelTone = keyof typeof toneStyle;
export type PanelDensity = keyof typeof densityStyle;
export type PanelElevation = keyof typeof elevationStyle;
