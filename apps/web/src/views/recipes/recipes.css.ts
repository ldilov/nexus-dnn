import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const shell = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.padSection,
  paddingBlock: vars.density.padSection,
  // audit-allow: px — px — fixed layout breakpoint
  maxWidth: "1400px",
  marginInline: "auto",
  width: "100%",
});
