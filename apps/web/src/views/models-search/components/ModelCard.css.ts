import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
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
  gap: "12px",
});

export const headerText = style({
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const owner = style({
  fontFamily: vars.font.code,
  fontSize: "10px",
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
  gap: "2px",
  flexShrink: 0,
});

export const stat = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  fontFamily: vars.font.code,
  fontSize: "11px",
  color: vars.color.text.muted,
});

export const statIcon = style({
  fontSize: "12px",
});

export const chipsRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
});

export const chip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  padding: "2px 8px",
  borderRadius: vars.radius.control,
  background: vars.color.bg.elevated,
  fontFamily: vars.font.code,
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
  fontSize: "12px",
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
  gap: "12px",
  padding: "10px 12px",
  background: vars.color.bg.lowest,
  borderRadius: vars.radius.control,
});

export const precisionLabel = style({
  fontFamily: vars.font.code,
  fontSize: "10px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const precisionValue = style({
  fontFamily: vars.font.code,
  fontSize: "12px",
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
  gap: "8px",
  marginTop: "auto",
  paddingTop: "4px",
});

export const actionPrimary = style({
  appearance: "none",
  border: "none",
  cursor: "pointer",
  flex: 1,
  padding: "10px 14px",
  borderRadius: vars.radius.control,
  background: vars.color.accent.primary,
  color: vars.color.onColor.primary,
  fontFamily: vars.font.ui,
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": { background: vars.color.accent.primaryHover },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent.primary}`,
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
  gap: "10px",
  padding: "12px",
  background: vars.color.bg.lowest,
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: "12px",
  color: vars.color.text.secondary,
});

export const authIcon = style({
  color: vars.color.accent.tertiary,
  fontSize: "18px",
});

export const authButton = style({
  appearance: "none",
  border: "none",
  cursor: "pointer",
  marginLeft: "auto",
  padding: "6px 10px",
  borderRadius: vars.radius.control,
  background: vars.color.accent.tertiary,
  color: vars.color.onColor.tertiary,
  fontFamily: vars.font.ui,
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  selectors: {
    "&:hover": { opacity: 0.9 },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent.tertiary}`,
      outlineOffset: "2px",
    },
  },
});
