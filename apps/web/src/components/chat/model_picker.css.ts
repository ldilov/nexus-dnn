import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const wrap = style({ position: "relative" });

export const trigger = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d2,
  height: vars.control.heightSm,
  paddingInline: vars.density.d3,
  borderRadius: vars.radius.full,
  background: vars.color.bg.lowest,
  color: vars.color.text.primary,
  border: "none",
  cursor: "pointer",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  ":hover": { background: vars.color.bg.hover },
  ":disabled": { opacity: 0.5, cursor: "not-allowed" },
});

export const triggerLabel = style({
  fontFamily: vars.font.code,
  letterSpacing: "0.04em",
});

export const dropdown = style({
  position: "absolute",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  top: "calc(100% + 4px)",
  insetInlineEnd: 0,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  minWidth: "260px",
  background: vars.card.bg,
  boxShadow: vars.card.shadow,
  backdropFilter: vars.card.backdrop,
  borderRadius: vars.radius.card,
  padding: vars.density.d3,
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "2px",
  zIndex: vars.z.dropdown,
});

export const item = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.density.d3,
  paddingInline: vars.density.d3,
  paddingBlock: vars.density.d2,
  borderRadius: vars.radius.control,
  background: "transparent",
  border: "none",
  textAlign: "left",
  cursor: "pointer",
  color: vars.color.text.secondary,
  ":hover": { background: vars.color.bg.hover, color: vars.color.text.primary },
  selectors: {
    "&[aria-selected='true']": {
      color: vars.color.text.primary,
      backgroundImage: `linear-gradient(135deg, color-mix(in oklab, ${vars.color.accent.primaryDim} 38%, transparent), color-mix(in oklab, ${vars.color.accent.secondaryDim} 22%, transparent))`,
    },
  },
});

export const itemLeft = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "2px",
  minWidth: 0,
});

export const itemBadge = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.06em",
  color: vars.color.text.muted,
  paddingInline: vars.density.d2,
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  paddingBlock: "2px",
  background: vars.color.bg.hover,
  borderRadius: vars.radius.full,
});

export const itemContext = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
});

export const recoveryLink = style({
  marginInlineStart: vars.density.d2,
  paddingInline: vars.density.d2,
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  paddingBlock: "2px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.accent.secondary,
  textDecoration: "underline",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  textUnderlineOffset: "2px",
  ":hover": { color: vars.color.text.primary },
  selectors: {
    "&:focus-visible": {
      // audit-allow: px — px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.accent.secondary}`,
      // audit-allow: px — px — below minimum token granularity (sub-10px)
      outlineOffset: "2px",
      borderRadius: vars.radius.control,
    },
  },
});
