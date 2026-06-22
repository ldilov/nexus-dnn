// audit-allow: px — sub-token spacing value, no density token at this step
import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";
import { media } from "../../theme/breakpoints";

export const page = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d4,
  padding: vars.density.d6,
  "@media": {
    [media.maxMobile]: {
      padding: vars.density.d4,
    },
  },
});

export const groupSection = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d3,
  marginTop: vars.density.d3,
});

export const groupHeader = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: vars.color.text.secondary,
});

export const grid = style({
  display: "grid",
  // audit-allow: px — sub-token spacing value, no density token at this step
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: vars.density.d4,
  "@media": {
    [media.maxMobile]: {
      gridTemplateColumns: "1fr",
      gap: vars.density.d3,
    },
  },
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — sub-token spacing value, no density token at this step
  gap: "10px",
  padding: vars.density.d4,
  borderRadius: vars.radius.card,
  background: vars.color.bg.panel,
});

export const cardHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: vars.density.d2,
});

export const runtimeName = style({
  fontWeight: vars.font.weight.semibold,
  fontSize: vars.font.size.headingSm,
});

export const runtimeFamily = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: vars.color.text.secondary,
});

export const statusBadge = style({
  display: "inline-block",
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "2px 10px",
  borderRadius: vars.radius.full,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export const statusAvailable = style({
  background: `color-mix(in oklab, ${vars.color.success.base} 15%, transparent)`,
  color: vars.color.success.base,
});

export const statusUnavailable = style({
  background: `color-mix(in oklab, ${vars.color.warning.base} 15%, transparent)`,
  color: vars.color.warning.base,
});

export const statusDeprecated = style({
  background: `color-mix(in oklab, ${vars.color.accent.accent} 15%, transparent)`,
  color: vars.color.accent.accent,
});

export const statusAbandoned = style({
  background: `color-mix(in oklab, ${vars.color.error.base} 15%, transparent)`,
  color: vars.color.error.base,
});

export const pillRow = style({
  display: "flex",
  flexWrap: "wrap",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "6px",
});

export const pill = style({
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "2px 8px",
  borderRadius: vars.radius.full,
  fontSize: vars.font.size.caption,
  background: vars.color.bg.elevated,
  color: vars.color.text.secondary,
});

export const empty = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  padding: "32px 16px",
  textAlign: "center",
  color: vars.color.text.secondary,
  fontStyle: "italic",
});

export const errorBox = style({
  padding: vars.density.d4,
  // audit-allow: px — below minimum token granularity (sub-10px)
  borderRadius: "8px",
  background: `color-mix(in oklab, ${vars.color.error.base} 10%, transparent)`,
  color: vars.color.error.base,
});

export const actionsRow = style({
  display: "flex",
  gap: vars.density.d2,
  flexWrap: "wrap",
  marginTop: vars.density.d1,
});

export const actionButton = style({
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "6px 12px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  borderRadius: "8px",
  fontSize: vars.font.size.bodySm,
  fontFamily: vars.font.code,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  background: vars.color.bg.elevated,
  color: vars.color.text.primary,
  border: "none",
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast}`,
  ":hover": { background: vars.color.bg.hover },
  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.5,
  },
});

export const actionButtonPrimary = style({
  background: `color-mix(in oklab, ${vars.color.success.base} 18%, transparent)`,
  color: vars.color.success.base,
  ":hover": {
    background: `color-mix(in oklab, ${vars.color.success.base} 28%, transparent)`,
  },
});

export const actionButtonDanger = style({
  background: `color-mix(in oklab, ${vars.color.error.base} 12%, transparent)`,
  color: vars.color.error.base,
  ":hover": {
    background: `color-mix(in oklab, ${vars.color.error.base} 22%, transparent)`,
  },
});

export const modalBackdrop = style({
  position: "fixed",
  inset: 0,
  background: vars.color.scrim,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: vars.z.modal,
});

export const modalPanel = style({
  background: vars.color.bg.elevated,
  borderRadius: vars.radius.panel,
  boxShadow: vars.shadow.lg,
  // audit-allow: px — fixed layout breakpoint
  width: "min(480px, 92vw)",
  padding: vars.density.d5,
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d3,
});

export const modalTitle = style({
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.semibold,
});

export const modalField = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d1,
});

export const modalLabel = style({
  fontSize: vars.font.size.caption,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: vars.color.text.secondary,
});

export const modalInput = style({
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "8px 10px",
  borderRadius: vars.radius.control,
  background: vars.color.bg.lowest,
  border: `1px solid ${vars.color.outline.variant}`,
  color: vars.color.text.primary,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.body,
});

export const modalFooter = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: vars.density.d2,
  marginTop: vars.density.d2,
});

export const stepper = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "6px",
  marginTop: vars.density.d2,
});

export const stepperRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "6px 10px",
  borderRadius: vars.radius.control,
  background: vars.color.bg.panel,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
});

export const stepperRowActive = style({
  background: `color-mix(in oklab, ${vars.color.success.base} 12%, transparent)`,
  color: vars.color.success.base,
});

export const stepperRowDone = style({
  color: vars.color.text.secondary,
});

export const stepperRowFailed = style({
  background: `color-mix(in oklab, ${vars.color.error.base} 12%, transparent)`,
  color: vars.color.error.base,
});

export const stepperElapsed = style({
  fontSize: vars.font.size.caption,
  opacity: 0.7,
});

export const cachedChip = style({
  display: "inline-block",
  marginLeft: vars.density.d2,
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "1px 7px",
  borderRadius: vars.radius.full,
  fontSize: vars.font.size.kbd,
  fontFamily: vars.font.code,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  background: `color-mix(in oklab, ${vars.color.accent.accent} 18%, transparent)`,
  color: vars.color.accent.accent,
});

export const installRow = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "6px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  padding: "10px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  borderRadius: "8px",
  background: vars.color.bg.panel,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
});

export const installRowHeader = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
  flexWrap: "wrap",
});

export const installId = style({
  color: vars.color.text.secondary,
  fontSize: vars.font.size.caption,
});

export const installStatusBadge = style({
  display: "inline-block",
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "1px 8px",
  borderRadius: vars.radius.full,
  fontSize: vars.font.size.kbd,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
});

export const installStatusValidated = style({
  background: `color-mix(in oklab, ${vars.color.success.base} 18%, transparent)`,
  color: vars.color.success.base,
});

export const installStatusFailed = style({
  background: `color-mix(in oklab, ${vars.color.error.base} 15%, transparent)`,
  color: vars.color.error.base,
});

export const installStatusPending = style({
  background: `color-mix(in oklab, ${vars.color.warning.base} 15%, transparent)`,
  color: vars.color.warning.base,
});

export const installStatusAbandoned = style({
  background: vars.color.bg.elevated,
  color: vars.color.text.muted,
});

export const liveLeaseBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d1,
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "1px 8px",
  borderRadius: vars.radius.full,
  fontSize: vars.font.size.kbd,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  background: vars.color.bg.elevated,
  color: vars.color.text.secondary,
});

export const liveLeaseDot = style({
  display: "inline-block",
  width: vars.chip.dot,
  height: vars.chip.dot,
  borderRadius: "50%",
  background: vars.color.success.base,
  // audit-allow: px — below minimum token granularity (sub-10px)
  boxShadow: `0 0 6px color-mix(in oklab, ${vars.color.success.base} 80%, transparent)`,
});

export const failureNote = style({
  fontSize: vars.font.size.caption,
  color: vars.color.error.base,
  opacity: 0.8,
});
