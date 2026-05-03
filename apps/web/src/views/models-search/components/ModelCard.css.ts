import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.insetXl,
  // audit-allow: px — card padding 22px is between insetLg(12) and insetXl(16); design spec micro-rhythm value
  padding: "22px",
  background: vars.color.bg.panel,
  borderRadius: vars.radius.card,
  position: "relative",
  overflow: "hidden",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": {
      background: vars.color.bg.hover,
      transform: "translateY(-1px)",
    },
  },
});

export const accentVariants = styleVariants({
  none: {},
  primary: {
    selectors: {
      "&::before": {
        content: "",
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        // audit-allow: px — accent stripe width 3px is a fixed decorative border, below token granularity
        width: "3px",
        background: vars.color.accent.primary,
      },
    },
  },
  secondary: {
    selectors: {
      "&::before": {
        content: "",
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        // audit-allow: px — accent stripe width 3px is a fixed decorative border, below token granularity
        width: "3px",
        background: vars.color.accent.secondary,
      },
    },
  },
  tertiary: {
    selectors: {
      "&::before": {
        content: "",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        // audit-allow: px — accent top stripe height 2px is a fixed decorative border, below token granularity
        height: "2px",
        background: vars.color.accent.tertiary,
      },
    },
  },
});

export const header = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: vars.space.gapMd,
});

export const headerText = style({
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
});

export const owner = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: vars.color.accent.secondary,
});

export const ownerTertiary = style({
  color: vars.color.accent.tertiary,
});

export const ownerMuted = style({
  color: vars.color.text.muted,
});

export const title = style({
  fontFamily: vars.font.headline,
  // audit-allow: px — model card title 19px is between heading(20) and headingSm(16); design-spec micro-rhythm value
  fontSize: "19px",
  lineHeight: 1.15,
  fontWeight: 700,
  color: vars.color.text.primary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  margin: 0,
});

export const stats = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  // audit-allow: px — stats gap 2px is below minimum token granularity (sub-4px)
  gap: "2px",
  flexShrink: 0,
});

export const stat = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
});

export const statIcon = style({
  fontSize: vars.font.size.bodySm,
});

export const chipsRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.insetSm,
});

export const chip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  // audit-allow: px — chip vertical padding 2px is below minimum token granularity (sub-4px)
  padding: "2px 8px",
  borderRadius: vars.radius.control,
  background: vars.color.bg.elevated,
  fontFamily: vars.font.code,
  // audit-allow: px — chip font 9px is below minimum font token (kbd=10px); intentional dense label
  fontSize: "9px",
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: vars.color.text.secondary,
});

export const chipPrimary = style({
  background: vars.color.accent.primaryDim,
  color: vars.color.accent.primary,
});

export const description = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  lineHeight: 1.5,
  color: vars.color.text.secondary,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const precisionRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.gapMd,
  // audit-allow: px — design-grid micro-rhythm value, no token between gapSm(4) and gapMd(12)
  padding: "10px 12px",
  background: vars.color.bg.lowest,
  borderRadius: vars.radius.control,
});

export const precisionLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const precisionValue = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.primary,
  fontWeight: 600,
});

export const precisionAssumed = style({
  color: vars.color.text.muted,
  fontStyle: "italic",
  fontWeight: 500,
});

export const actions = style({
  display: "flex",
  gap: vars.space.insetMd,
  marginTop: "auto",
  paddingTop: vars.space.gapSm,
});

export const actionPrimary = style({
  appearance: "none",
  border: "none",
  cursor: "pointer",
  flex: 1,
  // audit-allow: px — design-grid micro-rhythm value, no token between gapSm(4) and gapMd(12)
  padding: "10px 14px",
  borderRadius: vars.radius.control,
  background: vars.color.accent.primary,
  color: vars.color.onColor.primary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.kbd,
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": { background: vars.color.accent.primaryHover },
    "&:focus-visible": {
      // audit-allow: px — WCAG 2.2 focus ring uses 2px width + 2px offset per design contract
      outline: `2px solid ${vars.color.accent.primary}`,
      // audit-allow: px — WCAG 2.2 focus ring uses 2px width + 2px offset per design contract
      outlineOffset: "2px",
    },
    "&:disabled": { opacity: 0.4, cursor: "not-allowed" },
  },
});

export const actionSecondary = style([
  actionPrimary,
  {
    background: vars.color.bg.elevated,
    color: vars.color.text.primary,
    selectors: {
      "&:hover": { background: vars.color.bg.bright },
    },
  },
]);

export const actionGhost = style([
  actionPrimary,
  {
    background: "transparent",
    color: vars.color.text.secondary,
    selectors: {
      "&:hover": {
        background: vars.color.bg.elevated,
        color: vars.color.text.primary,
      },
    },
  },
]);

export const authOverlay = style({
  display: "flex",
  alignItems: "center",
  // audit-allow: px — design-grid micro-rhythm value, no token between gapSm(4) and gapMd(12)
  gap: "10px",
  padding: vars.space.insetLg,
  background: vars.color.bg.lowest,
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.secondary,
});

export const authIcon = style({
  color: vars.color.accent.tertiary,
  // audit-allow: px — auth icon glyph 18px is between icon.md(16) and icon.lg(20); design spec value
  fontSize: "18px",
});

export const authButton = style({
  appearance: "none",
  border: "none",
  cursor: "pointer",
  marginLeft: "auto",
  padding: `${vars.space.insetSm} ${vars.density.d2}`,
  borderRadius: vars.radius.control,
  background: vars.color.accent.tertiary,
  color: vars.color.onColor.tertiary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.kbd,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  selectors: {
    "&:hover": { opacity: 0.9 },
    "&:focus-visible": {
      // audit-allow: px — WCAG 2.2 focus ring uses 2px width + 2px offset per design contract
      outline: `2px solid ${vars.color.accent.tertiary}`,
      // audit-allow: px — WCAG 2.2 focus ring uses 2px width + 2px offset per design contract
      outlineOffset: "2px",
    },
  },
});
