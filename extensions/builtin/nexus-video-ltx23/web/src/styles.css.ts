import { style, globalStyle } from "@vanilla-extract/css";

const surfaceBg = "oklch(18% 0.005 250)";
const panelBg = "oklch(22% 0.006 250)";
const elevated = "oklch(26% 0.008 250)";
const textPrimary = "oklch(96% 0 0)";
const textMuted = "oklch(70% 0.01 250)";
const accent = "oklch(72% 0.18 240)";
const accentDim = "oklch(55% 0.14 240)";
const danger = "oklch(70% 0.22 25)";
const success = "oklch(72% 0.16 145)";
const warning = "oklch(80% 0.18 80)";

// The stylesheet is injected into the custom element's shadow root
// (see main.tsx). `:host` matches the shadow root's host element from
// inside the shadow tree — replaces the prior light-DOM globalStyle on
// the tag name which would no longer match anything.
globalStyle(":host", {
  display: "block",
  minHeight: "100%",
  color: textPrimary,
  background: surfaceBg,
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  // Reset inherited font properties from the host so the host's
  // text-rendering defaults don't leak in via CSS inheritance.
  lineHeight: 1.5,
  fontSize: "14px",
});

export const shell = style({
  display: "grid",
  gridTemplateColumns: "minmax(360px, 480px) 1fr",
  gap: "24px",
  padding: "32px",
  minHeight: "100vh",
  boxSizing: "border-box",
  "@media": {
    "(max-width: 960px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const panel = style({
  background: panelBg,
  border: "1px solid oklch(30% 0.005 250)",
  borderRadius: "12px",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const header = style({
  fontSize: "20px",
  fontWeight: 600,
  margin: 0,
});

export const subhead = style({
  fontSize: "13px",
  color: textMuted,
  margin: 0,
  marginTop: "-8px",
});

export const fieldRow = style({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});

export const label = style({
  fontSize: "12px",
  fontWeight: 500,
  color: textMuted,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export const input = style({
  background: elevated,
  border: "1px solid oklch(32% 0.005 250)",
  borderRadius: "8px",
  color: textPrimary,
  padding: "10px 12px",
  fontSize: "14px",
  fontFamily: "inherit",
  outline: "none",
  selectors: {
    "&:focus-visible": {
      borderColor: accent,
      boxShadow: `0 0 0 2px ${accent}`,
    },
  },
});

export const textarea = style([
  input,
  { minHeight: "96px", resize: "vertical", fontFamily: "inherit" },
]);

export const select = style([input]);

export const inputRow = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
});

export const button = style({
  background: accent,
  color: "oklch(20% 0 0)",
  border: "none",
  borderRadius: "8px",
  padding: "12px 20px",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "filter 120ms ease, opacity 120ms ease",
  selectors: {
    "&:hover": { filter: "brightness(1.08)" },
    "&:disabled": { opacity: 0.55, cursor: "not-allowed" },
    "&:focus-visible": { boxShadow: `0 0 0 2px ${accent}` },
  },
});

export const buttonSecondary = style([
  button,
  {
    background: "transparent",
    color: textPrimary,
    border: "1px solid oklch(35% 0.005 250)",
  },
]);

export const buttonDanger = style([
  button,
  { background: danger, color: "oklch(15% 0 0)" },
]);

// Smaller inline button — used for the per-segment retry affordance
// in the failed-segment timeline. Keeps the row scannable while still
// looking interactive (the full `button` size would dominate the row).
export const buttonSubtle = style([
  button,
  {
    background: "transparent",
    color: textPrimary,
    border: "1px solid oklch(35% 0.005 250)",
    padding: "4px 10px",
    fontSize: "12px",
    marginInlineStart: "auto",
  },
]);

export const buttonRow = style({
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
});

export const planRow = style({
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  padding: "8px 0",
  borderBottom: "1px dashed oklch(30% 0.005 250)",
  fontSize: "13px",
});

export const planKey = style({ color: textMuted });
export const planVal = style({ fontWeight: 500, fontFamily: "JetBrains Mono, monospace" });

export const riskPill = style({
  display: "inline-block",
  padding: "2px 10px",
  borderRadius: "999px",
  fontSize: "11px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export const riskSafe = style([riskPill, { background: success, color: "oklch(15% 0 0)" }]);
export const riskModerate = style([riskPill, { background: warning, color: "oklch(15% 0 0)" }]);
export const riskRisky = style([riskPill, { background: danger, color: "oklch(15% 0 0)" }]);
export const riskFail = style([riskPill, { background: danger, color: textPrimary }]);

export const warningBox = style({
  background: "oklch(28% 0.05 80)",
  color: warning,
  border: `1px solid ${warning}`,
  borderRadius: "8px",
  padding: "10px 12px",
  fontSize: "13px",
});

export const errorBox = style({
  background: "oklch(28% 0.08 25)",
  color: danger,
  border: `1px solid ${danger}`,
  borderRadius: "8px",
  padding: "10px 12px",
  fontSize: "13px",
});

export const segmentList = style({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});

export const segmentRow = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  gap: "12px",
  alignItems: "center",
  padding: "8px 12px",
  background: elevated,
  border: "1px solid oklch(30% 0.005 250)",
  borderRadius: "8px",
  fontSize: "13px",
});

export const segmentDot = style({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
});

export const dotQueued = style([segmentDot, { background: textMuted }]);
export const dotRendering = style([segmentDot, { background: accent }]);
export const dotCompleted = style([segmentDot, { background: success }]);
export const dotFailed = style([segmentDot, { background: danger }]);

export const progressOuter = style({
  height: "8px",
  background: elevated,
  borderRadius: "4px",
  overflow: "hidden",
});

export const progressInner = style({
  height: "100%",
  background: accent,
  transition: "width 200ms ease",
});

export const videoBox = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const video = style({
  width: "100%",
  maxHeight: "480px",
  background: "#000",
  borderRadius: "8px",
});

export const downloadLink = style([
  button,
  {
    textDecoration: "none",
    textAlign: "center",
    display: "inline-block",
  },
]);

export const meta = style({
  fontSize: "12px",
  color: textMuted,
  fontFamily: "JetBrains Mono, monospace",
});

export const emptyHint = style({
  color: textMuted,
  fontSize: "13px",
  fontStyle: "italic",
});

export const formColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const progressDetails = style({
  marginTop: "10px",
  borderTop: "1px solid oklch(30% 0.005 250)",
  paddingTop: "8px",
});

export const progressSummary = style({
  cursor: "pointer",
  fontSize: "12px",
  color: textMuted,
  fontFamily: "JetBrains Mono, monospace",
  userSelect: "none",
  selectors: {
    "&::-webkit-details-marker": {
      display: "none",
    },
    "&::marker": {
      content: '""',
    },
    "&::before": {
      content: '"▸ "',
      display: "inline-block",
      transition: "transform 120ms ease",
    },
  },
});

export const dropzone = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  border: "1px dashed oklch(38% 0.005 250)",
  borderRadius: "10px",
  background: elevated,
  padding: "18px 14px",
  textAlign: "center",
  color: textMuted,
  fontSize: "13px",
  cursor: "pointer",
  transition:
    "border-color 120ms ease, background 120ms ease, filter 120ms ease",
  selectors: {
    "&:hover, &:focus-within": {
      borderColor: accentDim,
      background: "oklch(28% 0.01 250)",
    },
  },
});

export const dropzoneActive = style({
  borderColor: accent,
  background: "oklch(30% 0.04 240)",
  color: textPrimary,
});

export const dropzonePreview = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: "12px",
  padding: "10px 12px",
  border: "1px solid oklch(32% 0.005 250)",
  borderRadius: "10px",
  background: elevated,
});

export const dropzoneThumb = style({
  width: "72px",
  height: "72px",
  borderRadius: "8px",
  background: "#000",
  objectFit: "cover",
  display: "block",
});

export const dropzoneClearButton = style([
  buttonSubtle,
  {
    marginInlineStart: 0,
    padding: "4px 8px",
  },
]);

export const progressBlock = style({
  marginTop: "8px",
  padding: "8px",
  background: "rgba(0, 0, 0, 0.25)",
  border: "1px solid oklch(30% 0.005 250)",
  borderRadius: "4px",
  fontFamily: "JetBrains Mono, monospace",
  fontSize: "11px",
  lineHeight: 1.5,
  maxHeight: "240px",
  overflowY: "auto",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  color: textMuted,
});
