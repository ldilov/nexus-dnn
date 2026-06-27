import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const wrap = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const previewCard = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceFloor,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
});

export const thumb = style({
  width: "72px",
  height: "72px",
  flexShrink: 0,
  objectFit: "cover",
  borderRadius: vars.radius.sm,
  background: vars.color.canvas,
});

export const previewMeta = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: 0,
  flex: 1,
});

export const fileName = style({
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.text,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const fileRef = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const uploading = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const dropImage = style({
  width: "100%",
  maxHeight: "220px",
  objectFit: "contain",
  borderRadius: vars.radius.sm,
});
