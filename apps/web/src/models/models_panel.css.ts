import { style } from "@vanilla-extract/css";

export const muted = style({
  opacity: 0.65,
});

export const listReset = style({
  listStyle: "none",
  padding: 0,
  display: "grid",
  gap: "8px",
});

export const card = style({
  border: "1px solid rgba(255,255,255,0.1)",
  padding: "12px",
  borderRadius: "6px",
});

export const cardHeader = style({
  display: "flex",
  justifyContent: "space-between",
});

export const metaSmall = style({
  fontSize: "12px",
  opacity: 0.7,
});

export const meta = style({
  fontSize: "12px",
  opacity: 0.6,
});

export const metaWithSpacing = style({
  fontSize: "12px",
  opacity: 0.6,
  marginBottom: "8px",
});

export const cardHeaderWithSpacing = style({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "4px",
});

export const badgeRow = style({
  display: "flex",
  gap: "6px",
  marginBottom: "8px",
  flexWrap: "wrap",
});

export const compatBadgeBase = style({
  fontSize: "11px",
  padding: "2px 6px",
  borderRadius: "3px",
});

export const compatBadgeYes = style([
  compatBadgeBase,
  { background: "rgba(0,200,100,0.2)" },
]);

export const compatBadgeNo = style([
  compatBadgeBase,
  { background: "rgba(255,255,255,0.06)" },
]);

export const errorLine = style({
  color: "tomato",
  fontSize: "12px",
  marginTop: "4px",
});

export const panel = style({
  padding: "24px",
  display: "grid",
  gap: "24px",
});

export const searchForm = style({
  display: "flex",
  gap: "8px",
  marginBottom: "12px",
});

export const searchInput = style({
  flex: 1,
  padding: "6px 8px",
});
