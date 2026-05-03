import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../theme/tokens.css";

const root = style({
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  color: vars.color.text,
  fontSize: vars.text.body,
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  margin: 0,
  "::before": {
    content: '""',
    // audit-allow: px — px — below minimum token granularity (sub-10px)
    width: "6px",
    // audit-allow: px — px — below minimum token granularity (sub-10px)
    height: "6px",
    borderRadius: vars.radius.pill,
    flex: "0 0 auto",
  },
});

export const banner = styleVariants({
  warning: [
    root,
    {
      background: `color-mix(in oklab, ${vars.color.warning} 14%, ${vars.color.surfaceRaised})`,
      "::before": { background: vars.color.warning },
    },
  ],
  error: [
    root,
    {
      background: `color-mix(in oklab, ${vars.color.danger} 14%, ${vars.color.surfaceRaised})`,
      "::before": { background: vars.color.danger },
    },
  ],
  success: [
    root,
    {
      background: `color-mix(in oklab, ${vars.color.success} 14%, ${vars.color.surfaceRaised})`,
      "::before": { background: vars.color.success },
    },
  ],
});

export type BannerSeverity = keyof typeof banner;
