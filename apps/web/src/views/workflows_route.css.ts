import { style } from "@vanilla-extract/css";

export const surfaceColumn = style({
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
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
  fontSize: "16px",
});
