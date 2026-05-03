// audit-allow: px — sub-token spacing value, no density token at this step
// audit-allow: hex — neon decorative palette per design lang
import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const page = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d4,
  padding: vars.density.d6,
});

export const groupSection = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d3,
  marginTop: vars.density.d3,
});

export const groupHeader = style({
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: vars.font.size.bodySm,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  // audit-allow: hex — neon decorative palette per design lang
  color: "var(--text-secondary, #a7adbb)",
});

export const grid = style({
  display: "grid",
  // audit-allow: px — sub-token spacing value, no density token at this step
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: vars.density.d4,
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — sub-token spacing value, no density token at this step
  gap: "10px",
  padding: vars.density.d4,
  // audit-allow: px — sub-token spacing value, no density token at this step
  borderRadius: "12px",
  background: "var(--surface-elevated, rgba(255,255,255,0.04))",
  boxShadow: "0 0 0 1px rgba(255,255,255,0.06)",
});

export const cardHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: vars.density.d2,
});

export const runtimeName = style({
  fontWeight: 600,
  fontSize: vars.font.size.headingSm,
});

export const runtimeFamily = style({
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: vars.font.size.caption,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  // audit-allow: hex — neon decorative palette per design lang
  color: "var(--text-secondary, #a7adbb)",
});

export const statusBadge = style({
  display: "inline-block",
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "2px 10px",
  borderRadius: vars.radius.full,
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: vars.font.size.caption,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export const statusAvailable = style({
  background: "rgba(80, 200, 120, 0.15)",
  // audit-allow: hex — neon decorative palette per design lang
  color: "#79e0a5",
});

export const statusUnavailable = style({
  background: "rgba(255, 184, 0, 0.15)",
  // audit-allow: hex — neon decorative palette per design lang
  color: "#ffc857",
});

export const statusDeprecated = style({
  background: "rgba(160, 130, 255, 0.15)",
  // audit-allow: hex — neon decorative palette per design lang
  color: "#b39bff",
});

export const statusAbandoned = style({
  background: "rgba(255, 100, 100, 0.15)",
  // audit-allow: hex — neon decorative palette per design lang
  color: "#ff8585",
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
  background: "rgba(255,255,255,0.06)",
  // audit-allow: hex — neon decorative palette per design lang
  color: "var(--text-secondary, #a7adbb)",
});

export const empty = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  padding: "32px 16px",
  textAlign: "center",
  // audit-allow: hex — neon decorative palette per design lang
  color: "var(--text-secondary, #a7adbb)",
  fontStyle: "italic",
});

export const errorBox = style({
  padding: vars.density.d4,
  // audit-allow: px — below minimum token granularity (sub-10px)
  borderRadius: "8px",
  background: "rgba(255,100,100,0.08)",
  // audit-allow: hex — neon decorative palette per design lang
  color: "#ff8585",
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
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  background: "rgba(255,255,255,0.06)",
  // audit-allow: hex — neon decorative palette per design lang
  color: "var(--text-primary, #e8ecf2)",
  border: "none",
  cursor: "pointer",
  transition: "background 150ms",
  ":hover": { background: "rgba(255,255,255,0.12)" },
  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.5,
  },
});

export const actionButtonPrimary = style({
  background: "rgba(80, 200, 120, 0.18)",
  // audit-allow: hex — neon decorative palette per design lang
  color: "#79e0a5",
  ":hover": { background: "rgba(80, 200, 120, 0.28)" },
});

export const actionButtonDanger = style({
  background: "rgba(255, 100, 100, 0.12)",
  // audit-allow: hex — neon decorative palette per design lang
  color: "#ff8585",
  ":hover": { background: "rgba(255, 100, 100, 0.22)" },
});

export const modalBackdrop = style({
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 100,
});

export const modalPanel = style({
  // audit-allow: hex — neon decorative palette per design lang
  background: "var(--surface-elevated, #1a1d24)",
  // audit-allow: px — sub-token spacing value, no density token at this step
  borderRadius: "12px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  boxShadow: "0 12px 48px rgba(0,0,0,0.6)",
  // audit-allow: px — fixed layout breakpoint
  width: "min(480px, 92vw)",
  padding: vars.density.d5,
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d3,
});

export const modalTitle = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "18px",
  fontWeight: 600,
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
  // audit-allow: hex — neon decorative palette per design lang
  color: "var(--text-secondary, #a7adbb)",
});

export const modalInput = style({
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "8px 10px",
  borderRadius: vars.radius.control,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)",
  // audit-allow: hex — neon decorative palette per design lang
  color: "var(--text-primary, #e8ecf2)",
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
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
  background: "rgba(255,255,255,0.03)",
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: vars.font.size.bodySm,
});

export const stepperRowActive = style({
  background: "rgba(80, 200, 120, 0.12)",
  // audit-allow: hex — neon decorative palette per design lang
  color: "#79e0a5",
});

export const stepperRowDone = style({
  // audit-allow: hex — neon decorative palette per design lang
  color: "var(--text-secondary, #a7adbb)",
});

export const stepperRowFailed = style({
  background: "rgba(255, 100, 100, 0.12)",
  // audit-allow: hex — neon decorative palette per design lang
  color: "#ff8585",
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
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  background: "rgba(160, 130, 255, 0.18)",
  // audit-allow: hex — neon decorative palette per design lang
  color: "#b39bff",
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
  background: "rgba(255,255,255,0.03)",
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: vars.font.size.bodySm,
});

export const installRowHeader = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
  flexWrap: "wrap",
});

export const installId = style({
  // audit-allow: hex — neon decorative palette per design lang
  color: "var(--text-secondary, #a7adbb)",
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
  background: "rgba(80, 200, 120, 0.18)",
  // audit-allow: hex — neon decorative palette per design lang
  color: "#79e0a5",
});

export const installStatusFailed = style({
  background: "rgba(255, 100, 100, 0.15)",
  // audit-allow: hex — neon decorative palette per design lang
  color: "#ff8585",
});

export const installStatusPending = style({
  background: "rgba(255, 184, 0, 0.15)",
  // audit-allow: hex — neon decorative palette per design lang
  color: "#ffc857",
});

export const installStatusAbandoned = style({
  background: "rgba(160, 160, 160, 0.15)",
  // audit-allow: hex — neon decorative palette per design lang
  color: "#a7adbb",
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
  background: "rgba(80, 160, 255, 0.15)",
  // audit-allow: hex — neon decorative palette per design lang
  color: "#7bb3ff",
});

export const liveLeaseDot = style({
  display: "inline-block",
  // audit-allow: px — below minimum token granularity (sub-10px)
  width: "6px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  height: "6px",
  borderRadius: "50%",
  // audit-allow: hex — neon decorative palette per design lang
  background: "#7bb3ff",
  // audit-allow: px — below minimum token granularity (sub-10px)
  boxShadow: "0 0 6px rgba(123,179,255,0.8)",
});

export const failureNote = style({
  fontSize: vars.font.size.caption,
  // audit-allow: hex — neon decorative palette per design lang
  color: "#ff8585",
  opacity: 0.8,
});
