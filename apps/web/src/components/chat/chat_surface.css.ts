import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";
import { media } from "../../theme/breakpoints";

export const root = style({
  display: "grid",
  // audit-allow: px — modal/dialog/drawer width per UX spec
  gridTemplateColumns: "240px 1fr 320px",
  height: "100%",
  minHeight: 0,
  position: "relative",
  background: vars.color.bg.canvas,
  color: vars.color.text.primary,
  "@media": {
    // audit-allow: px — fixed layout breakpoint
    "(max-width: 1280px)": {
      // audit-allow: px — sub-token spacing value, no density token at this step
      gridTemplateColumns: "56px 1fr 320px",
    },
    // audit-allow: px — fixed layout breakpoint
    "(max-width: 960px)": {
      // audit-allow: px — sub-token spacing value, no density token at this step
      gridTemplateColumns: "56px 1fr",
    },
    // Phones: drop the thread rail so the conversation gets the full width.
    [media.maxMobile]: {
      gridTemplateColumns: "1fr",
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
  "@media": {
    [media.maxMobile]: {
      paddingInline: vars.density.d4,
    },
  },
});

export const headerLeft = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d3,
  minWidth: 0,
  flex: "1 1 auto",
});

export const threadToggle = style({
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: vars.control.heightLg,
  height: vars.control.heightLg,
  background: "transparent",
  border: "none",
  color: vars.color.text.secondary,
  borderRadius: vars.radius.control,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
  "@media": {
    [media.maxMobile]: {
      display: "inline-flex",
    },
  },
});

export const threadScrim = style({
  position: "absolute",
  inset: 0,
  border: "none",
  padding: 0,
  background: vars.color.scrim,
  zIndex: vars.z.dropdown,
  cursor: "pointer",
  "@media": {
    [media.minMobile]: {
      display: "none",
    },
  },
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
  "@media": {
    [media.maxMobile]: {
      paddingInline: vars.density.d4,
    },
  },
});

export const emptyState = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.density.d3,
  flex: "1 1 auto",
  paddingBlock: vars.density.d8,
  textAlign: "center",
  color: vars.color.text.secondary,
});

export const composerSlot = style({
  flex: "0 0 auto",
  paddingInline: vars.density.d6,
  paddingBlockEnd: vars.density.d6,
  "@media": {
    [media.maxMobile]: {
      paddingInline: vars.density.d4,
    },
  },
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
    // audit-allow: px — fixed layout breakpoint
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
