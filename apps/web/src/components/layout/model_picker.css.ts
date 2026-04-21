import { keyframes, style } from "@vanilla-extract/css";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const slideIn = keyframes({
  from: { opacity: 0, transform: "translateY(10px) scale(0.975)" },
  to: { opacity: 1, transform: "translateY(0) scale(1)" },
});

const spin = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

const reducedMotion = "(prefers-reduced-motion: reduce)";

export const backdrop = style({
  position: "fixed",
  inset: 0,
  background:
    "radial-gradient(ellipse at top, rgba(10,12,18,0.55) 0%, rgba(2,3,6,0.82) 60%, rgba(2,3,6,0.92) 100%)",
  backdropFilter: "blur(16px) saturate(140%)",
  WebkitBackdropFilter: "blur(16px) saturate(140%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 120,
  animation: `${fadeIn} 200ms ease-out`,
  padding: "32px 24px",
  "@media": {
    [reducedMotion]: { animation: "none" },
  },
});

export const dialog = style({
  width: "min(620px, 100%)",
  maxHeight: "82vh",
  background:
    "linear-gradient(180deg, rgba(30,33,38,0.98) 0%, rgba(15,17,20,0.98) 100%)",
  borderRadius: "22px",
  boxShadow: [
    "0 40px 120px rgba(0,0,0,0.6)",
    "0 0 0 1px rgba(186,158,255,0.10)",
    "inset 0 1px 0 rgba(255,255,255,0.04)",
  ].join(", "),
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  padding: "22px 22px 18px",
  animation: `${slideIn} 240ms cubic-bezier(0.16, 1, 0.3, 1)`,
  fontFamily: "var(--font-ui)",
  color: "var(--color-on-surface)",
  overflow: "hidden",
  "@media": {
    [reducedMotion]: { animation: "none" },
  },
});

export const header = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "16px",
});

export const title = style({
  fontSize: "18px",
  fontWeight: 600,
  margin: 0,
  letterSpacing: "-0.01em",
});

export const subtitle = style({
  fontSize: "12.5px",
  color: "var(--color-on-surface-variant)",
  marginTop: "3px",
});

export const closeButton = style({
  appearance: "none",
  background: "transparent",
  color: "var(--color-on-surface-variant)",
  border: "none",
  fontSize: "24px",
  lineHeight: 1,
  cursor: "pointer",
  padding: "4px 10px",
  borderRadius: "8px",
  transition: "background 150ms ease, color 150ms ease",
  ":hover": {
    background: "rgba(255,255,255,0.06)",
    color: "var(--color-on-surface)",
  },
  ":disabled": {
    opacity: 0.35,
    cursor: "not-allowed",
  },
});

export const searchWrap = style({
  position: "relative",
});

export const search = style({
  width: "100%",
  padding: "10px 14px",
  fontSize: "13.5px",
  fontFamily: "var(--font-ui)",
  color: "var(--color-on-surface)",
  background: "rgba(255,255,255,0.035)",
  border: "none",
  borderRadius: "10px",
  outline: "none",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
  transition: "box-shadow 150ms ease, background 150ms ease",
  ":focus": {
    background: "rgba(186,158,255,0.06)",
    boxShadow: "inset 0 0 0 1.5px rgba(186,158,255,0.45)",
  },
  "::placeholder": {
    color: "var(--color-on-surface-variant)",
  },
});

export const list = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  flex: 1,
});

export const option = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  padding: "12px 14px",
  borderRadius: "12px",
  cursor: "pointer",
  outline: "none",
  background: "rgba(255,255,255,0.025)",
  transition:
    "background 150ms ease, box-shadow 200ms ease, transform 200ms ease",
  ":hover": {
    background: "rgba(186,158,255,0.08)",
    boxShadow: "0 0 0 1px rgba(186,158,255,0.22)",
  },
  ":focus-visible": {
    background: "rgba(186,158,255,0.10)",
    boxShadow: "0 0 0 1.5px var(--color-primary)",
  },
});

export const optionSelected = style({
  background: "rgba(186,158,255,0.12)",
  boxShadow: "0 0 0 1px rgba(186,158,255,0.38)",
});

export const optionBusy = style({
  cursor: "progress",
  pointerEvents: "none",
});

export const optionRow1 = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "12px",
});

export const optionRow2 = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
  fontSize: "11.5px",
  color: "var(--color-on-surface-variant)",
});

export const familyLabel = style({
  fontSize: "14.5px",
  fontWeight: 600,
  letterSpacing: "-0.005em",
  color: "var(--color-on-surface)",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  minWidth: 0,
  flex: 1,
});

export const sizeLabel = style({
  fontFamily:
    "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
  fontSize: "12px",
  color: "var(--color-on-surface-variant)",
  flexShrink: 0,
});

export const quantChip = style({
  display: "inline-flex",
  alignItems: "center",
  fontFamily:
    "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
  fontSize: "11px",
  fontWeight: 600,
  padding: "2px 8px",
  borderRadius: "6px",
  color: "var(--color-primary, #ba9eff)",
  background: "rgba(186,158,255,0.12)",
  letterSpacing: "0.02em",
});

export const metaSep = style({
  opacity: 0.4,
});

export const metaText = style({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "220px",
});

export const inlineStatus = style({
  marginLeft: "auto",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  color: "var(--color-primary, #ba9eff)",
  fontWeight: 500,
  fontSize: "11.5px",
});

export const inlineSpinner = style({
  width: "10px",
  height: "10px",
  borderRadius: "999px",
  border: "1.5px solid rgba(186,158,255,0.3)",
  borderTopColor: "var(--color-primary, #ba9eff)",
  animation: `${spin} 900ms linear infinite`,
  "@media": {
    [reducedMotion]: { animation: "none" },
  },
});

export const empty = style({
  padding: "28px 8px",
  textAlign: "center",
  color: "var(--color-on-surface-variant)",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "center",
});

export const emptyLink = style({
  color: "var(--color-primary)",
  textDecoration: "none",
  fontWeight: 500,
  ":hover": { textDecoration: "underline" },
});

export const statusRow = style({
  fontSize: "12.5px",
  color: "var(--color-on-surface-variant)",
  padding: "12px 4px",
  textAlign: "center",
});

export const runtimePanel = style({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "10px 12px 12px",
  borderRadius: "10px",
  background: "rgba(255,255,255,0.025)",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
});

export const runtimeHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  listStyle: "none",
  userSelect: "none",
  fontSize: "11px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "var(--color-on-surface-variant, rgba(255,255,255,0.55))",
  transition: "color 150ms ease",
  selectors: {
    "&::-webkit-details-marker": { display: "none" },
    "&:hover": { color: "var(--color-on-surface, rgba(255,255,255,0.95))" },
  },
});

export const runtimeHeaderBadge = style({
  fontSize: "10.5px",
  fontWeight: 500,
  letterSpacing: "0.02em",
  textTransform: "none",
  color: "var(--color-primary, #ba9eff)",
  opacity: 0.8,
});

export const runtimeRow = style({
  display: "grid",
  gridTemplateColumns: "86px 1fr 56px",
  alignItems: "center",
  gap: "10px",
});

export const runtimeRowFull = style({
  display: "grid",
  gridTemplateColumns: "86px 1fr",
  alignItems: "center",
  gap: "10px",
});

export const runtimeLabel = style({
  fontSize: "11.5px",
  fontWeight: 500,
  color: "var(--color-on-surface, rgba(255,255,255,0.9))",
});

export const runtimeValue = style({
  fontFamily:
    "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
  fontSize: "11px",
  color: "var(--color-primary, #ba9eff)",
  textAlign: "right",
});

export const runtimeSlider = style({
  width: "100%",
  accentColor: "var(--color-primary, #ba9eff)",
  height: "18px",
  background: "transparent",
});

export const runtimeSelect = style({
  width: "100%",
  padding: "5px 8px",
  fontSize: "12px",
  fontFamily: "var(--font-ui)",
  background: "rgba(255,255,255,0.04)",
  color: "var(--color-on-surface, rgba(255,255,255,0.95))",
  border: "none",
  borderRadius: "6px",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
  outline: "none",
  cursor: "pointer",
  ":focus": {
    boxShadow: "inset 0 0 0 1.5px rgba(186,158,255,0.5)",
  },
  selectors: {
    "&:disabled": {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
});

export const runtimeCheckboxRow = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  userSelect: "none",
});

export const runtimeCheckboxRowDisabled = style({
  opacity: 0.45,
  cursor: "not-allowed",
});

export const runtimeCheckbox = style({
  accentColor: "var(--color-primary, #ba9eff)",
  width: "14px",
  height: "14px",
  margin: 0,
});

export const runtimeHint = style({
  fontSize: "10.5px",
  color: "var(--color-on-surface-variant, rgba(255,255,255,0.4))",
  marginTop: "-4px",
  lineHeight: 1.4,
});

export const runtimeReset = style({
  appearance: "none",
  background: "transparent",
  color: "var(--color-on-surface-variant, rgba(255,255,255,0.5))",
  border: "none",
  cursor: "pointer",
  fontSize: "10.5px",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  padding: "3px 6px",
  borderRadius: "5px",
  transition: "color 150ms ease, background 150ms ease",
  ":hover": {
    color: "var(--color-primary, #ba9eff)",
    background: "rgba(186,158,255,0.08)",
  },
});

