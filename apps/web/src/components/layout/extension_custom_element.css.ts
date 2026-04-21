import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const loading = style({
  padding: vars.space.insetMd,
  color: vars.color.text.muted,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontStyle: "italic",
});

export const failure = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
  padding: vars.space.insetMd,
  borderRadius: vars.radius.control,
  background: `${vars.color.error.base}14`,
  color: vars.color.error.text,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
});

export const failureTitle = style({
  fontWeight: 600,
  color: vars.color.error.base,
});

export const failureMeta = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.gapSm,
  color: vars.color.text.muted,
  fontSize: vars.font.size.caption,
});

export const failureDetail = style({
  color: vars.color.text.secondary,
  fontFamily: vars.font.code,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
});
