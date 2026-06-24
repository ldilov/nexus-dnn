import { recipe } from "@vanilla-extract/recipes";
import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const tabList = style({
  display: "flex",
  gap: vars.space.gapXs,
  maxWidth: "100%",
  overflowX: "auto",
  overscrollBehaviorX: "contain",
  scrollbarWidth: "none",
});

/* Tab strips scroll horizontally on narrow viewports rather than clipping
 * the trailing tabs; the scrollbar chrome stays hidden. */
globalStyle(`${tabList}::-webkit-scrollbar`, {
  display: "none",
});

export const tabRecipe = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: vars.space.gapXs,
    border: "none",
    backgroundColor: "transparent",
    fontFamily: vars.font.ui,
    fontWeight: vars.font.weight.medium,
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
    transition: `color ${vars.motion.durationFast} ${vars.motion.easingDefault}, background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  },
  variants: {
    variant: {
      underline: {
        padding: `${vars.space.insetMd} ${vars.space.insetSm}`,
        fontSize: vars.font.size.bodySm,
        color: vars.color.text.muted,
        borderRadius: 0,
        ":hover": { color: vars.color.text.primary },
      },
      segmented: {
        padding: `${vars.space.insetXs} ${vars.space.insetMd}`,
        fontSize: vars.font.size.bodySm,
        color: vars.color.text.secondary,
        borderRadius: vars.radius.control,
        ":hover": {
          backgroundColor: vars.color.bg.hover,
          color: vars.color.text.primary,
        },
      },
    },
    active: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: { variant: "underline", active: true },
      style: {
        color: vars.color.accent.primary,
        // audit-allow: px — below minimum token granularity (sub-10px)
        boxShadow: `inset 0 -2px 0 0 ${vars.color.accent.primary}`,
      },
    },
    {
      variants: { variant: "segmented", active: true },
      style: {
        backgroundColor: vars.color.bg.elevated,
        color: vars.color.text.primary,
      },
    },
  ],
  defaultVariants: {
    variant: "underline",
    active: false,
  },
});

export const segmentedContainer = style({
  display: "inline-flex",
  gap: vars.space.gapXs,
  padding: vars.space.insetXs,
  maxWidth: "100%",
  overflowX: "auto",
  overscrollBehaviorX: "contain",
  scrollbarWidth: "none",
  backgroundColor: vars.color.bg.panel,
  borderRadius: vars.radius.control,
});

globalStyle(`${segmentedContainer}::-webkit-scrollbar`, {
  display: "none",
});

export const tabBadge = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  // audit-allow: px — sub-token spacing value, no density token at this step
  minWidth: "18px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  height: "18px",
  padding: `0 ${vars.space.insetXs}`,
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.bg.hover,
  color: vars.color.text.muted,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
});
