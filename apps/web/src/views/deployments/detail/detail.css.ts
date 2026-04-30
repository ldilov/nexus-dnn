import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.gapCard,
  paddingBlock: vars.density.padSection,
  height: "100%",
  minHeight: 0,
  maxWidth: "1400px",
  marginInline: "auto",
  width: "100%",
});

export const backLink = style({
  alignSelf: "flex-start",
  background: "transparent",
  border: "none",
  color: vars.color.text.muted,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  cursor: "pointer",
  padding: 0,
  selectors: {
    "&:hover": { color: vars.color.text.primary },
  },
});

export const slug = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.muted,
});

export const tabs = style({
  display: "inline-flex",
  gap: vars.density.d2,
  padding: vars.density.d1,
  background: vars.color.bg.lowest,
  borderRadius: vars.radius.full,
  alignSelf: "flex-start",
  flexWrap: "wrap",
});

export const tab = style({
  paddingInline: vars.density.d4,
  height: vars.control.heightSm,
  display: "inline-flex",
  alignItems: "center",
  background: "transparent",
  border: "none",
  borderRadius: vars.radius.full,
  color: vars.color.text.muted,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.medium,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&[aria-selected='true']": {
      background: vars.color.bg.elevated,
      color: vars.color.text.primary,
    },
    "&:hover:not([aria-selected='true'])": { color: vars.color.text.primary },
  },
});

export const panel = style({
  padding: vars.density.padCard,
  background: vars.card.bg,
  boxShadow: vars.card.shadow,
  backdropFilter: vars.card.backdrop,
  borderRadius: vars.radius.card,
  minHeight: "260px",
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d4,
});

export const panelHeading = style({
  fontSize: vars.font.size.bodyLg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  margin: 0,
});

export const panelBody = style({
  color: vars.color.text.secondary,
  lineHeight: vars.font.lineHeight.relaxed,
  margin: 0,
  maxWidth: "68ch",
});

export const idBox = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.muted,
  padding: vars.density.d3,
  background: vars.color.bg.lowest,
  borderRadius: vars.radius.control,
  wordBreak: "break-all",
});

export const panelLive = style({
  flex: "1 1 auto",
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

export const chatFrame = style({
  flex: "1 1 auto",
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
  position: "relative",
});

export const fallbackNote = style({
  padding: vars.density.padCard,
  color: vars.color.text.secondary,
  lineHeight: vars.font.lineHeight.relaxed,
  fontSize: vars.font.size.body,
});

export const graphFrame = style({
  padding: vars.density.padCard,
  overflow: "auto",
});

export const realGraphFrame = style({
  flex: "1 1 auto",
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
});
