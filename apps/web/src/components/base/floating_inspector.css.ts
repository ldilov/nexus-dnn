import { style } from "@vanilla-extract/css";

export const floatingInspector = style({
  position: "relative",
  background: "var(--card-bg)",
  border: "var(--card-border)",
  boxShadow: "var(--card-shadow)",
  backdropFilter: "var(--card-backdrop)",
  WebkitBackdropFilter: "var(--card-backdrop)",
  borderRadius: "var(--r-xl)",
  padding: "var(--pad-card)",
  display: "flex",
  flexDirection: "column",
  gap: "var(--d-3)",
});

export const floatingInspectorOverlap = style({
  marginLeft: "calc(var(--d-9) * -1)",
  zIndex: 2,
});
