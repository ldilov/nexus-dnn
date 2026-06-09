import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

export const panel = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
  padding: vars.density.padCard,
  borderRadius: vars.radius.card,
  background: vars.color.bg.lowest,
});

export const row = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  alignItems: "baseline",
  columnGap: vars.space.gapSm,
});

export const label = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const value = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.secondary,
  wordBreak: "break-all",
});

export const family = style({
  color: vars.color.accent.primary,
  fontWeight: vars.font.weight.semibold,
});
