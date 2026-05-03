import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const block = style({
  display: "block",
  paddingBlock: vars.density.d3,
  paddingInline: vars.density.d4,
  // audit-allow: px — below minimum token granularity (sub-10px)
  borderInlineStart: `3px solid ${vars.color.accent.secondary}`,
  background: vars.color.bg.lowest,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.primary,
  overflow: "auto",
  whiteSpace: "pre",
  selectors: {
    "&:focus-visible": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.accent.secondary}`,
      // audit-allow: px — below minimum token granularity (sub-10px)
      outlineOffset: "2px",
    },
  },
});
