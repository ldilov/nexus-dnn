import { style } from "@vanilla-extract/css";

export const page = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "24px",
});

export const groupSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  marginTop: "12px",
});

export const groupHeader = style({
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--text-secondary, #a7adbb)",
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "16px",
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "16px",
  borderRadius: "12px",
  background: "var(--surface-elevated, rgba(255,255,255,0.04))",
  boxShadow: "0 0 0 1px rgba(255,255,255,0.06)",
});

export const cardHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: "8px",
});

export const runtimeName = style({
  fontWeight: 600,
  fontSize: "16px",
});

export const runtimeFamily = style({
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "var(--text-secondary, #a7adbb)",
});

export const statusBadge = style({
  display: "inline-block",
  padding: "2px 10px",
  borderRadius: "999px",
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export const statusAvailable = style({
  background: "rgba(80, 200, 120, 0.15)",
  color: "#79e0a5",
});

export const statusUnavailable = style({
  background: "rgba(255, 184, 0, 0.15)",
  color: "#ffc857",
});

export const statusDeprecated = style({
  background: "rgba(160, 130, 255, 0.15)",
  color: "#b39bff",
});

export const statusAbandoned = style({
  background: "rgba(255, 100, 100, 0.15)",
  color: "#ff8585",
});

export const pillRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
});

export const pill = style({
  padding: "2px 8px",
  borderRadius: "999px",
  fontSize: "11px",
  background: "rgba(255,255,255,0.06)",
  color: "var(--text-secondary, #a7adbb)",
});

export const empty = style({
  padding: "32px 16px",
  textAlign: "center",
  color: "var(--text-secondary, #a7adbb)",
  fontStyle: "italic",
});

export const errorBox = style({
  padding: "16px",
  borderRadius: "8px",
  background: "rgba(255,100,100,0.08)",
  color: "#ff8585",
});

export const actionsRow = style({
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  marginTop: "4px",
});

export const actionButton = style({
  padding: "6px 12px",
  borderRadius: "8px",
  fontSize: "12px",
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  background: "rgba(255,255,255,0.06)",
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
  color: "#79e0a5",
  ":hover": { background: "rgba(80, 200, 120, 0.28)" },
});

export const actionButtonDanger = style({
  background: "rgba(255, 100, 100, 0.12)",
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
  background: "var(--surface-elevated, #1a1d24)",
  borderRadius: "12px",
  boxShadow: "0 12px 48px rgba(0,0,0,0.6)",
  width: "min(480px, 92vw)",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const modalTitle = style({
  fontSize: "18px",
  fontWeight: 600,
});

export const modalField = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const modalLabel = style({
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "var(--text-secondary, #a7adbb)",
});

export const modalInput = style({
  padding: "8px 10px",
  borderRadius: "6px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "var(--text-primary, #e8ecf2)",
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: "13px",
});

export const modalFooter = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: "8px",
  marginTop: "8px",
});

export const stepper = style({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  marginTop: "8px",
});

export const stepperRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  padding: "6px 10px",
  borderRadius: "6px",
  background: "rgba(255,255,255,0.03)",
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: "12px",
});

export const stepperRowActive = style({
  background: "rgba(80, 200, 120, 0.12)",
  color: "#79e0a5",
});

export const stepperRowDone = style({
  color: "var(--text-secondary, #a7adbb)",
});

export const stepperRowFailed = style({
  background: "rgba(255, 100, 100, 0.12)",
  color: "#ff8585",
});

export const stepperElapsed = style({
  fontSize: "11px",
  opacity: 0.7,
});

export const cachedChip = style({
  display: "inline-block",
  marginLeft: "8px",
  padding: "1px 7px",
  borderRadius: "999px",
  fontSize: "10px",
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  background: "rgba(160, 130, 255, 0.18)",
  color: "#b39bff",
});

export const installRow = style({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  padding: "10px",
  borderRadius: "8px",
  background: "rgba(255,255,255,0.03)",
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: "12px",
});

export const installRowHeader = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
});

export const installId = style({
  color: "var(--text-secondary, #a7adbb)",
  fontSize: "11px",
});

export const installStatusBadge = style({
  display: "inline-block",
  padding: "1px 8px",
  borderRadius: "999px",
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
});

export const installStatusValidated = style({
  background: "rgba(80, 200, 120, 0.18)",
  color: "#79e0a5",
});

export const installStatusFailed = style({
  background: "rgba(255, 100, 100, 0.15)",
  color: "#ff8585",
});

export const installStatusPending = style({
  background: "rgba(255, 184, 0, 0.15)",
  color: "#ffc857",
});

export const installStatusAbandoned = style({
  background: "rgba(160, 160, 160, 0.15)",
  color: "#a7adbb",
});

export const liveLeaseBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  padding: "1px 8px",
  borderRadius: "999px",
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  background: "rgba(80, 160, 255, 0.15)",
  color: "#7bb3ff",
});

export const liveLeaseDot = style({
  display: "inline-block",
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  background: "#7bb3ff",
  boxShadow: "0 0 6px rgba(123,179,255,0.8)",
});

export const failureNote = style({
  fontSize: "11px",
  color: "#ff8585",
  opacity: 0.8,
});
