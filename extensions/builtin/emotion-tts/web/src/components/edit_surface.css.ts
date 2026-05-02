import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../theme/tokens.css";

const rootBase = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  padding: vars.space.md,
  borderRadius: vars.radius.md,
});

export const rootVariant = styleVariants({
  standalone: [
    rootBase,
    {
      background: vars.color.surfaceRaised,
      gap: vars.space.md,
    },
  ],
  nested: [
    rootBase,
    {
      background: vars.color.surfaceMuted,
      marginTop: vars.space.xs,
      boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
    },
  ],
});

export const header = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.sm,
});

export const titleStyle = styleVariants({
  standalone: {
    fontFamily: vars.font.display,
    fontSize: vars.text.subhead,
    fontWeight: 600,
    margin: 0,
    color: vars.color.text,
  },
  nested: {
    fontFamily: vars.font.display,
    fontSize: vars.text.body,
    fontWeight: 600,
    margin: 0,
    color: vars.color.text,
  },
});

export const meta = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const actions = style({
  display: "flex",
  gap: vars.space.sm,
  alignItems: "center",
  flexWrap: "wrap",
  paddingTop: vars.space.xs,
});

export type EditSurfaceVariant = keyof typeof rootVariant;
