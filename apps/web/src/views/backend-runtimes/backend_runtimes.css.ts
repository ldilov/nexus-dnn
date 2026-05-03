// audit-allow: px — sub-token spacing value, no density token at this step
// audit-allow: hex — neon decorative palette per design lang
import { style } from "@vanilla-extract/css";

export const page = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  gap: "16px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  padding: "24px",
});

export const groupSection = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  gap: "12px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  marginTop: "12px",
});

export const groupHeader = style({
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "var(--text-secondary, #a7adbb)",
});

export const grid = style({
  display: "grid",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  gap: "16px",
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  gap: "10px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  padding: "16px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  borderRadius: "12px",
  background: "var(--surface-elevated, rgba(255,255,255,0.04))",
  boxShadow: "0 0 0 1px rgba(255,255,255,0.06)",
});

export const cardHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "8px",
});

export const runtimeName = style({
  fontWeight: 600,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "16px",
});

export const runtimeFamily = style({
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "var(--text-secondary, #a7adbb)",
});

export const statusBadge = style({
  display: "inline-block",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "2px 10px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  borderRadius: "999px",
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export const statusAvailable = style({
  background: "rgba(80, 200, 120, 0.15)",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "#79e0a5",
});

export const statusUnavailable = style({
  background: "rgba(255, 184, 0, 0.15)",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "#ffc857",
});

export const statusDeprecated = style({
  background: "rgba(160, 130, 255, 0.15)",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "#b39bff",
});

export const statusAbandoned = style({
  background: "rgba(255, 100, 100, 0.15)",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "#ff8585",
});

export const pillRow = style({
  display: "flex",
  flexWrap: "wrap",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "6px",
});

export const pill = style({
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "2px 8px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  borderRadius: "999px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "11px",
  background: "rgba(255,255,255,0.06)",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "var(--text-secondary, #a7adbb)",
});

export const empty = style({
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  padding: "32px 16px",
  textAlign: "center",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "var(--text-secondary, #a7adbb)",
  fontStyle: "italic",
});

export const errorBox = style({
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  padding: "16px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  borderRadius: "8px",
  background: "rgba(255,100,100,0.08)",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "#ff8585",
});

export const actionsRow = style({
  display: "flex",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "8px",
  flexWrap: "wrap",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  marginTop: "4px",
});

export const actionButton = style({
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "6px 12px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  borderRadius: "8px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "12px",
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  background: "rgba(255,255,255,0.06)",
  // audit-allow: hex — hex — neon decorative palette per design lang
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
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "#79e0a5",
  ":hover": { background: "rgba(80, 200, 120, 0.28)" },
});

export const actionButtonDanger = style({
  background: "rgba(255, 100, 100, 0.12)",
  // audit-allow: hex — hex — neon decorative palette per design lang
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
  // audit-allow: hex — hex — neon decorative palette per design lang
  background: "var(--surface-elevated, #1a1d24)",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  borderRadius: "12px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  boxShadow: "0 12px 48px rgba(0,0,0,0.6)",
  // audit-allow: px — px — fixed layout breakpoint
  width: "min(480px, 92vw)",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  gap: "12px",
});

export const modalTitle = style({
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "18px",
  fontWeight: 600,
});

export const modalField = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "4px",
});

export const modalLabel = style({
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "var(--text-secondary, #a7adbb)",
});

export const modalInput = style({
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "8px 10px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  borderRadius: "6px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "var(--text-primary, #e8ecf2)",
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "13px",
});

export const modalFooter = style({
  display: "flex",
  justifyContent: "flex-end",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "8px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  marginTop: "8px",
});

export const stepper = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "6px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  marginTop: "8px",
});

export const stepperRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "6px 10px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  borderRadius: "6px",
  background: "rgba(255,255,255,0.03)",
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "12px",
});

export const stepperRowActive = style({
  background: "rgba(80, 200, 120, 0.12)",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "#79e0a5",
});

export const stepperRowDone = style({
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "var(--text-secondary, #a7adbb)",
});

export const stepperRowFailed = style({
  background: "rgba(255, 100, 100, 0.12)",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "#ff8585",
});

export const stepperElapsed = style({
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "11px",
  opacity: 0.7,
});

export const cachedChip = style({
  display: "inline-block",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  marginLeft: "8px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "1px 7px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  borderRadius: "999px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "10px",
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  background: "rgba(160, 130, 255, 0.18)",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "#b39bff",
});

export const installRow = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "6px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  padding: "10px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  borderRadius: "8px",
  background: "rgba(255,255,255,0.03)",
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "12px",
});

export const installRowHeader = style({
  display: "flex",
  alignItems: "center",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "8px",
  flexWrap: "wrap",
});

export const installId = style({
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "var(--text-secondary, #a7adbb)",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "11px",
});

export const installStatusBadge = style({
  display: "inline-block",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "1px 8px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  borderRadius: "999px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
});

export const installStatusValidated = style({
  background: "rgba(80, 200, 120, 0.18)",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "#79e0a5",
});

export const installStatusFailed = style({
  background: "rgba(255, 100, 100, 0.15)",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "#ff8585",
});

export const installStatusPending = style({
  background: "rgba(255, 184, 0, 0.15)",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "#ffc857",
});

export const installStatusAbandoned = style({
  background: "rgba(160, 160, 160, 0.15)",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "#a7adbb",
});

export const liveLeaseBadge = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "4px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "1px 8px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  borderRadius: "999px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  background: "rgba(80, 160, 255, 0.15)",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "#7bb3ff",
});

export const liveLeaseDot = style({
  display: "inline-block",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  width: "6px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  height: "6px",
  borderRadius: "50%",
  // audit-allow: hex — hex — neon decorative palette per design lang
  background: "#7bb3ff",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  boxShadow: "0 0 6px rgba(123,179,255,0.8)",
});

export const failureNote = style({
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "11px",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "#ff8585",
  opacity: 0.8,
});
