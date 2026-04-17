import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

// Polished backend log console. Design notes:
// - Monospace everywhere — log viewers that mix fonts feel wrong.
// - Severity pills carry theme semantic colors (success-adjacent info,
//   warn, error). Namespace/source render as neutral chips you can click
//   to filter.
// - Virtualized via `@tanstack/react-virtual` so 10k+ lines stay smooth.
// - Controls row mirrors a terminal: pause / auto-scroll toggle / copy
//   visible / clear / download.

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  height: "100%",
  minHeight: 0,
  background: vars.color.bg.canvas,
  borderRadius: vars.radius.card,
  border: `1px solid ${vars.color.outline.variant}`,
  overflow: "hidden",
});

export const toolbar = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.insetSm,
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  background: vars.color.bg.panel,
  flexWrap: "wrap",
});

export const filterGroup = style({
  display: "inline-flex",
  gap: "2px",
  padding: "2px",
  background: vars.color.bg.elevated,
  borderRadius: vars.radius.control,
  border: `1px solid ${vars.color.outline.variant}`,
});

export const filterChip = style({
  padding: `3px ${vars.space.insetSm}`,
  background: "transparent",
  border: "none",
  borderRadius: vars.radius.control,
  color: vars.color.text.muted,
  fontSize: vars.font.size.caption,
  fontFamily: vars.font.code,
  cursor: "pointer",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  fontWeight: vars.font.weight.semibold,
  selectors: {
    "&[aria-pressed='true']": {
      background: vars.color.bg.panel,
      color: vars.color.text.primary,
    },
    "&:hover:not([aria-pressed='true'])": {
      color: vars.color.text.primary,
    },
  },
});

export const spacer = style({ flex: "1 1 auto" });

export const controlButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.insetXs,
  padding: `${vars.space.insetXs} ${vars.space.insetSm}`,
  background: "transparent",
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: vars.radius.control,
  color: vars.color.text.secondary,
  fontSize: vars.font.size.caption,
  fontFamily: vars.font.code,
  cursor: "pointer",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  selectors: {
    "&:hover": {
      color: vars.color.text.primary,
      borderColor: vars.color.outline.base,
    },
    "&[aria-pressed='true']": {
      background: vars.color.accent.primary,
      color: vars.color.onColor.primary,
      borderColor: "transparent",
    },
  },
});

export const tallyChip = style({
  padding: `2px ${vars.space.insetSm}`,
  background: vars.color.bg.elevated,
  borderRadius: vars.radius.full,
  color: vars.color.text.muted,
  fontSize: vars.font.size.caption,
  fontFamily: vars.font.code,
  letterSpacing: "0.04em",
  border: `1px solid ${vars.color.outline.variant}`,
});

export const scroll = style({
  flex: "1 1 auto",
  minHeight: 0,
  overflow: "auto",
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  lineHeight: 1.5,
});

export const line = style({
  display: "grid",
  gridTemplateColumns: "auto auto auto 1fr",
  gap: vars.space.insetSm,
  alignItems: "baseline",
  padding: `3px ${vars.space.insetMd}`,
  borderBottom: `1px solid ${vars.color.outline.variant}`,
});

export const timestamp = style({
  color: vars.color.text.muted,
  whiteSpace: "nowrap",
  fontVariantNumeric: "tabular-nums",
});

// Severity pill — each level gets a distinct color so the eye can scan
// for errors without reading. Compact by design.
const severityBase = {
  display: "inline-flex" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const,
  minWidth: "44px",
  padding: `1px ${vars.space.insetXs}`,
  borderRadius: vars.radius.control,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  fontFamily: vars.font.code,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  border: "1px solid transparent",
};

export const severity = styleVariants({
  trace: {
    ...severityBase,
    background: "transparent",
    color: vars.color.text.muted,
    borderColor: vars.color.outline.variant,
  },
  debug: {
    ...severityBase,
    background: "transparent",
    color: vars.color.accent.secondary,
    borderColor: vars.color.accent.secondary,
  },
  info: {
    ...severityBase,
    background: "transparent",
    color: vars.color.text.primary,
    borderColor: vars.color.outline.base,
  },
  warn: {
    ...severityBase,
    background: "transparent",
    color: vars.color.warning.base,
    borderColor: vars.color.warning.base,
  },
  error: {
    ...severityBase,
    background: vars.color.error.base,
    color: vars.color.onColor.primary,
    borderColor: "transparent",
  },
});

export const namespace = style({
  color: vars.color.text.secondary,
  whiteSpace: "nowrap",
  cursor: "pointer",
  selectors: {
    "&:hover": { color: vars.color.accent.primary },
  },
});

export const message = style({
  color: vars.color.text.primary,
  wordBreak: "break-word",
  whiteSpace: "pre-wrap",
});

export const messageError = style({
  color: vars.color.error.text,
});

export const messageWarn = style({
  color: vars.color.warning.text,
});

export const empty = style({
  padding: vars.space.insetXl,
  textAlign: "center",
  color: vars.color.text.muted,
  fontStyle: "italic",
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
});
