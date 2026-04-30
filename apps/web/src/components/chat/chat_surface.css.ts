import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const root = style({
  display: "grid",
  gridTemplateColumns: "240px 1fr 320px",
  height: "100%",
  minHeight: 0,
  background: vars.color.bg.canvas,
  color: vars.color.text.primary,
  "@media": {
    "(max-width: 1280px)": {
      gridTemplateColumns: "56px 1fr 320px",
    },
    "(max-width: 960px)": {
      gridTemplateColumns: "56px 1fr",
    },
  },
});

export const center = style({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  minHeight: 0,
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.density.d4,
  paddingBlock: vars.density.d3,
  paddingInline: vars.density.d6,
});

export const title = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d2,
  minWidth: 0,
});

export const titleEyebrow = style({
  fontFamily: vars.font.code,
  fontSize: vars.text.eyebrow,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const titleText = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  margin: 0,
  letterSpacing: "-0.01em",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const titleMeta = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
});

export const headerRight = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d3,
  flex: "0 0 auto",
});

export const messages = style({
  flex: "1 1 auto",
  minHeight: 0,
  overflowY: "auto",
  paddingInline: vars.density.d6,
  paddingBlock: vars.density.d4,
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d4,
});

export const composerSlot = style({
  flex: "0 0 auto",
  paddingInline: vars.density.d6,
  paddingBlockEnd: vars.density.d6,
});

export const inspector = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d4,
  paddingInline: vars.density.d4,
  paddingBlock: vars.density.d4,
  background: vars.color.bg.panel,
  overflowY: "auto",
  "@media": {
    "(max-width: 960px)": {
      display: "none",
    },
  },
});

export const banner = style({
  paddingBlock: vars.density.d3,
  paddingInline: vars.density.d4,
  borderRadius: vars.radius.card,
  background: `color-mix(in oklab, ${vars.color.warning.base} 18%, transparent)`,
  color: vars.color.warning.text,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
});
