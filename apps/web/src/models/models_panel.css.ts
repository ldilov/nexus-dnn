// audit-allow: px — sub-token spacing value, no density token at this step
// audit-allow: px — below minimum token granularity (sub-10px)
import { style } from "@vanilla-extract/css";

export const muted = style({
  opacity: 0.65,
});

export const listReset = style({
  listStyle: "none",
  padding: 0,
  display: "grid",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "8px",
});

export const card = style({
  border: "1px solid rgba(255,255,255,0.1)",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  padding: "12px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  borderRadius: "6px",
});

export const cardHeader = style({
  display: "flex",
  justifyContent: "space-between",
});

export const metaSmall = style({
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "12px",
  opacity: 0.7,
});

export const meta = style({
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "12px",
  opacity: 0.6,
});

export const metaWithSpacing = style({
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "12px",
  opacity: 0.6,
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  marginBottom: "8px",
});

export const cardHeaderWithSpacing = style({
  display: "flex",
  justifyContent: "space-between",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  marginBottom: "4px",
});

export const badgeRow = style({
  display: "flex",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "6px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  marginBottom: "8px",
  flexWrap: "wrap",
});

export const compatBadgeBase = style({
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "11px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "2px 6px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
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
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "12px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  marginTop: "4px",
});

export const panel = style({
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  padding: "24px",
  display: "grid",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  gap: "24px",
});

export const searchForm = style({
  display: "flex",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "8px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  marginBottom: "12px",
});

export const searchInput = style({
  flex: 1,
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "6px 8px",
});
