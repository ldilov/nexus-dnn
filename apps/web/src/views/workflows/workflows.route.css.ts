import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const surfaceColumn = style({
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
});

export const heroSlot = style({
  paddingBlock: vars.density.padSection,
  // audit-allow: px — fixed layout breakpoint
  maxWidth: "1400px",
  marginInline: "auto",
  width: "100%",
});

export const catalogSlot = style({
  flex: "1 1 auto",
  minHeight: 0,
});

export const catalogSlotPinned = style({
  flex: "0 0 auto",
});

export const editorColumn = style({
  flexDirection: "column",
  flex: "1 1 auto",
  minHeight: 0,
});

export const editorActiveViewRow = style({
  flex: "1 1 auto",
  minHeight: 0,
  display: "flex",
});

export const backIcon = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "16px",
});
