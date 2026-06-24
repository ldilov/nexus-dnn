import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../../theme/tokens.css";

export const root = style({
  display: "inline-flex",
  alignItems: "stretch",
  gap: vars.space.lg,
  padding: 0,
  maxWidth: "100%",
  overflowX: "auto",
  overscrollBehaviorX: "contain",
  scrollbarWidth: "none",
  background: "transparent",
  borderRadius: 0,
  borderBottom: `1px solid ${vars.color.borderGhost}`,
  "@media": {
    // audit-allow: px — fixed layout breakpoint
    "(max-width: 768px)": {
      // Underline tabs don't survive wrapping; on mobile lay the four modes
      // out as a 2-col chip grid so all are visible without clipping.
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: vars.space.sm,
      overflowX: "visible",
      borderBottom: "none",
    },
  },
});

/* Hide the horizontal scrollbar (desktop strip scroll path). */
globalStyle(`${root}::-webkit-scrollbar`, {
  display: "none",
});

export const glyph = style({
  display: "inline-block",
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  letterSpacing: vars.tracking.label,
  color: vars.color.textFaint,
  transform: "translateY(0)",
  transition: `color ${vars.motion.fast}, transform ${vars.motion.normal}`,
  "@media": {
    // audit-allow: px — fixed layout breakpoint
    "(max-width: 768px)": {
      display: "none",
    },
  },
});

const segmentBase = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  flexShrink: 0,
  whiteSpace: "nowrap",
  minHeight: "2.25rem",
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: vars.space.xs,
  paddingBottom: vars.space.sm,
  borderRadius: 0,
  border: "none",
  background: "transparent",
  color: vars.color.textMuted,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  fontWeight: 600,
  letterSpacing: "0.04em",
  cursor: "pointer",
  transition: [
    `color ${vars.motion.fast}`,
    `transform ${vars.motion.fast}`,
  ].join(", "),
  selectors: {
    "&[aria-disabled='true']": {
      cursor: "not-allowed",
      opacity: 0.45,
    },
  },
  "@media": {
    // audit-allow: px — fixed layout breakpoint
    "(max-width: 768px)": {
      justifyContent: "center",
      minHeight: "2.75rem",
      paddingTop: vars.space.sm,
      paddingBottom: vars.space.sm,
      paddingLeft: vars.space.md,
      paddingRight: vars.space.md,
      borderRadius: vars.radius.md,
      background: vars.color.surfaceMuted,
      boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
    },
  },
});

export const segment = styleVariants({
  idle: [segmentBase],
  active: [
    segmentBase,
    {
      color: vars.color.text,
      selectors: {
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -1,
          height: "2px",
          background: vars.color.accent,
          boxShadow: vars.shadow.glow,
          borderRadius: vars.radius.pill,
        },
      },
      "@media": {
        "(forced-colors: active)": {
          color: "Highlight",
          forcedColorAdjust: "none",
        },
      },
    },
  ],
});

globalStyle(`${segment.idle}:hover:not([aria-disabled='true'])`, {
  color: vars.color.text,
});

globalStyle(`${segment.idle}:hover:not([aria-disabled='true']) ${glyph}`, {
  color: vars.color.accent,
});

globalStyle(`${segment.active} ${glyph}`, {
  color: vars.color.accent,
  transform: "translateY(-1px)",
});

/* Mobile active chip: accent fill replaces the underline, which can't track
 * a wrapped 2-col grid row. */
globalStyle(segment.active, {
  "@media": {
    "(max-width: 768px)": {
      background: `color-mix(in oklab, ${vars.color.accent} 16%, ${vars.color.surfaceMuted})`,
      color: vars.color.text,
      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 45%, transparent)`,
    },
  },
});

globalStyle(`${segment.active}::after`, {
  "@media": {
    "(max-width: 768px)": {
      display: "none",
    },
  },
});
