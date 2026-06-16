import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/tokens.css";

const surfaceFloor = "var(--surface-floor, #000000)";
const surfaceBright = "var(--surface-bright, #292c30)";
const onSurfaceMuted = "var(--on-surface-muted, #8c8e92)";
const hairline = "rgba(70,72,74,0.2)";

export const popIn = keyframes({
  from: { opacity: 0, transform: "scale(0.96) translateY(-4px)" },
  to: { opacity: 1, transform: "scale(1) translateY(0)" },
});

export const scan = keyframes({
  from: { transform: "translateX(-120%)" },
  to: { transform: "translateX(380%)" },
});

export const pulse = keyframes({
  "0%, 100%": { opacity: 1, transform: "scale(1)" },
  "50%": { opacity: 0.55, transform: "scale(0.92)" },
});

export const root = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
});

export const caption = style({
  display: "block",
  marginBottom: vars.space.lg,
  fontFamily: vars.font.body,
  // audit-allow: px — micro eyebrow scale fixed to design spec
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textMuted,
});

export const counters = style({
  display: "flex",
  alignItems: "center",
  // audit-allow: px — counter group gap pinned to vision (14px)
  gap: "14px",
  fontFamily: vars.font.mono,
  // audit-allow: px — tabular counter scale fixed to design spec
  fontSize: "12px",
  fontVariantNumeric: "tabular-nums",
  color: onSurfaceMuted,
});

globalStyle(`${counters} strong`, {
  color: vars.color.accent,
  fontWeight: 600,
});

/** Reading box — a recessed, bordered well so the text region's bounds read
 * clearly, with the accent rail down its left edge. */
export const canvas = style({
  position: "relative",
  // audit-allow: px — reading well padding (extra left for the accent rail)
  padding: "16px 18px 16px 22px",
  background: surfaceFloor,
  border: `1px solid ${vars.color.borderGhost}`,
  borderRadius: vars.radius.lg,
  boxShadow: `inset 2px 0 0 ${vars.color.accent}`,
  // Click-to-cast surface — kill native text selection so shift-clicking a
  // word range never paints the browser's selection over our highlight.
  userSelect: "none",
  WebkitUserSelect: "none",
});

export const editBtn = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  // audit-allow: px — compact control metrics
  height: "28px",
  padding: "0 10px",
  background: "transparent",
  border: `1px solid ${vars.color.borderGhost}`,
  borderRadius: "8px",
  color: vars.color.textMuted,
  fontFamily: vars.font.body,
  fontSize: "11.5px",
  fontWeight: 500,
  cursor: "pointer",
  whiteSpace: "nowrap",
  transition: `color ${vars.motion.fast}, border-color ${vars.motion.fast}`,
  selectors: {
    "&:hover": { color: vars.color.text, borderColor: vars.color.accent },
    "&[aria-pressed='true']": { color: vars.color.accent, borderColor: vars.color.accent },
    "&:focus-visible": { outline: `2px solid ${vars.color.accent}`, outlineOffset: "2px" },
  },
});

export const paragraph = style({
  margin: "0 0 20px",
  fontFamily: vars.font.mono,
  // audit-allow: px — narrative body scale + leading fixed to design spec
  fontSize: "15px",
  lineHeight: 2.05,
  letterSpacing: "-0.01em",
  color: vars.color.textMuted,
});

export const seg = style({
  // audit-allow: px — phrase token metrics fixed to design spec
  borderRadius: "4px",
  padding: "1.5px 1px",
  cursor: "pointer",
  WebkitBoxDecorationBreak: "clone",
  boxDecorationBreak: "clone",
  transition: `background ${vars.motion.fast}, box-shadow ${vars.motion.fast}, color ${vars.motion.fast}`,
  selectors: {
    "&:focus-visible": { outline: `2px solid ${vars.color.accent}`, outlineOffset: "2px" },
  },
});

export const marker = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  // audit-allow: px — caster initial chip fixed to design spec
  width: "15px",
  height: "15px",
  borderRadius: "4px",
  fontFamily: vars.font.mono,
  fontSize: "9px",
  fontWeight: 700,
  marginRight: "4px",
  verticalAlign: "middle",
  position: "relative",
  top: "-1px",
  userSelect: "none",
});

export const popover = style({
  position: "absolute",
  // audit-allow: px — overlay width fixed to design spec
  width: "300px",
  zIndex: 50,
  background: "rgba(23,26,28,0.86)",
  backdropFilter: "blur(20px) saturate(1.3)",
  WebkitBackdropFilter: "blur(20px) saturate(1.3)",
  border: "1px solid rgba(70,72,74,0.5)",
  borderRadius: vars.radius.lg,
  boxShadow: "0 18px 50px rgba(0,0,0,0.6)",
  // audit-allow: px — overlay padding pinned to vision (14px)
  padding: "14px",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  transformOrigin: "top left",
  animation: `${popIn} 180ms cubic-bezier(0.34,1.56,0.64,1)`,
});

export const popHead = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const popTitle = style({
  // audit-allow: px — overlay title scale fixed to design spec
  fontSize: "12.5px",
  fontWeight: 600,
  color: vars.color.text,
});

export const iconBtn = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  background: "transparent",
  borderRadius: vars.radius.sm,
  color: vars.color.textMuted,
  cursor: "pointer",
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}`,
  selectors: {
    "&:hover": { background: "rgba(255,255,255,0.04)", color: vars.color.text },
  },
});

export const voiceRow = style({ display: "flex", gap: "7px" });

export const voiceTile = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.xs,
  // audit-allow: px — voice tile padding + radius fixed to design spec (9px)
  padding: "11px 6px",
  borderRadius: "9px",
  cursor: "pointer",
  flex: 1,
  transition: `background ${vars.motion.fast}, border-color ${vars.motion.fast}`,
  selectors: {
    "&:focus-visible": { outline: `2px solid ${vars.color.accent}`, outlineOffset: "2px" },
  },
});

export const castModeRow = style({ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" });

export const castModeBar = style({
  display: "inline-flex",
  padding: "2px",
  background: surfaceFloor,
  border: "1px solid rgba(70,72,74,0.4)",
  borderRadius: "8px",
});

export const castModeBtn = style({
  fontFamily: vars.font.body,
  fontSize: "11px",
  fontWeight: 600,
  padding: "5px 11px",
  borderRadius: "6px",
  cursor: "pointer",
  border: "none",
  background: "transparent",
  color: vars.color.textMuted,
  transition: `all ${vars.motion.fast}`,
});

export const castModeBtnActive = style([
  castModeBtn,
  {
    background: "var(--surface-high, rgba(255,255,255,0.08))",
    color: vars.color.text,
    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
  },
]);

export const castCount = style({
  fontFamily: vars.font.mono,
  fontSize: "9.5px",
  color: vars.color.textMuted,
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "nowrap",
});

export const castSearchWrap = style({ position: "relative" });

export const castSearch = style({
  width: "100%",
  height: "34px",
  background: surfaceFloor,
  border: "1px solid rgba(70,72,74,0.4)",
  borderRadius: "8px",
  color: vars.color.text,
  fontFamily: vars.font.mono,
  fontSize: "11.5px",
  letterSpacing: "0.02em",
  padding: "0 10px 0 28px",
  outline: "none",
  selectors: {
    "&:focus": { borderColor: vars.color.accent },
    "&::placeholder": { color: vars.color.textMuted },
  },
});

export const castList = style({
  display: "flex",
  flexDirection: "column",
  gap: "3px",
  maxHeight: "184px",
  overflowY: "auto",
  margin: "0 -4px",
  padding: "2px 4px",
  selectors: {
    "&::-webkit-scrollbar": { width: "8px" },
    "&::-webkit-scrollbar-thumb": { background: "rgba(70,72,74,0.55)", borderRadius: "4px" },
    "&::-webkit-scrollbar-track": { background: "transparent" },
  },
});

export const castRow = style({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "7px 9px",
  borderRadius: "9px",
  cursor: "pointer",
  width: "100%",
  textAlign: "left",
  border: "1px solid transparent",
  background: "transparent",
  transition: `background ${vars.motion.fast}, border-color ${vars.motion.fast}`,
  selectors: {
    "&:hover": { background: "rgba(255,255,255,0.045)" },
    "&:focus-visible": { outline: `2px solid ${vars.color.accent}`, outlineOffset: "2px" },
  },
});

export const castRowText = style({ display: "flex", flexDirection: "column", gap: "1px", minWidth: 0, flex: 1 });

export const castEmpty = style({
  padding: "14px 8px",
  textAlign: "center",
  fontFamily: vars.font.mono,
  fontSize: "10.5px",
  color: vars.color.textMuted,
});

export const divider = style({
  height: "1px",
  background: "rgba(70,72,74,0.28)",
});

export const emotionGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const emotionRow = style({
  display: "flex",
  gap: "6px",
  flexWrap: "wrap",
});

export const emoBtn = style({
  fontFamily: vars.font.mono,
  // audit-allow: px — emotion pill scale fixed to design spec
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  padding: "6px 11px",
  borderRadius: "7px",
  cursor: "pointer",
  transition: `background ${vars.motion.fast}, border-color ${vars.motion.fast}, color ${vars.motion.fast}`,
  selectors: {
    "&:focus-visible": { outline: `2px solid ${vars.color.accent}`, outlineOffset: "2px" },
  },
});

export const popPreview = style({
  // audit-allow: px — recessed preview well padding fixed to design spec
  padding: "9px 11px",
  background: surfaceFloor,
  // audit-allow: px — preview well radius pinned to vision (8px)
  borderRadius: "8px",
  border: "1px solid rgba(70,72,74,0.3)",
});

export const popPreviewText = style({
  fontFamily: vars.font.mono,
  // audit-allow: px — preview body scale fixed to design spec
  fontSize: "11px",
  lineHeight: 1.5,
  color: vars.color.textMuted,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
});

export const popActions = style({ display: "flex", gap: vars.space.sm });

export const removeBtn = style({
  // audit-allow: px — control height fixed to design spec
  height: "38px",
  padding: "0 14px",
  // audit-allow: px — remove control radius pinned to vision (9px)
  borderRadius: "9px",
  border: "1px solid rgba(255,110,132,0.3)",
  background: "transparent",
  color: vars.color.danger,
  fontFamily: vars.font.body,
  fontSize: "12.5px",
  fontWeight: 500,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  transition: `background ${vars.motion.fast}`,
  selectors: { "&:hover": { background: "rgba(255,110,132,0.08)" } },
});

export const carouselSection = style({
  // audit-allow: px — divider spacing fixed to design spec
  marginTop: "22px",
  paddingTop: "20px",
  borderTop: `1px solid ${hairline}`,
});

export const carouselHead = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  // audit-allow: px — carousel head spacing pinned to vision (14px)
  marginBottom: "14px",
});

export const carouselTitleRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
});

export const countPill = style({
  fontFamily: vars.font.mono,
  // audit-allow: px — count chip scale fixed to design spec
  fontSize: "11px",
  color: vars.color.text,
  background: vars.color.surfaceHighest,
  padding: "3px 9px",
  borderRadius: vars.radius.pill,
  fontVariantNumeric: "tabular-nums",
});

export const summary = style({
  fontFamily: vars.font.mono,
  // audit-allow: px — summary caption scale fixed to design spec
  fontSize: "10.5px",
  color: onSurfaceMuted,
});

export const navBtn = style({
  // audit-allow: px — carousel nav button fixed to design spec
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid rgba(70,72,74,0.4)",
  background: "transparent",
  // audit-allow: px — carousel nav radius pinned to vision (8px)
  borderRadius: "8px",
  color: vars.color.textMuted,
  cursor: "pointer",
  transition: `border-color ${vars.motion.fast}, color ${vars.motion.fast}`,
  selectors: {
    "&:hover:not(:disabled)": { borderColor: vars.color.accent, color: vars.color.text },
    "&:disabled": { opacity: 0.4, cursor: "not-allowed" },
  },
});

export const carousel = style({
  display: "flex",
  gap: vars.space.md,
  overflowX: "auto",
  // audit-allow: px — snap track padding fixed to design spec
  padding: "4px 2px 14px",
  scrollSnapType: "x mandatory",
});

export const card = style({
  position: "relative",
  flexShrink: 0,
  // audit-allow: px — card width fixed to design spec
  width: "244px",
  scrollSnapAlign: "start",
  display: "flex",
  flexDirection: "column",
  gap: "9px",
  padding: "13px 14px 12px",
  // audit-allow: px — card radius pinned to vision (13px, distinct from popover 14px)
  borderRadius: "13px",
  cursor: "pointer",
  overflow: "hidden",
  transition: `transform ${vars.motion.normal}, box-shadow ${vars.motion.normal}, background ${vars.motion.normal}`,
});

export const cardTop = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.sm,
});

export const cardVoice = style({
  display: "flex",
  alignItems: "center",
  gap: "7px",
  minWidth: 0,
});

export const cardVoiceName = style({
  // audit-allow: px — card voice label scale fixed to design spec
  fontSize: "12.5px",
  fontWeight: 700,
  color: vars.color.text,
  whiteSpace: "nowrap",
});

export const cardSegLabel = style({
  fontFamily: vars.font.mono,
  // audit-allow: px — SEG id scale fixed to design spec
  fontSize: "9.5px",
  color: vars.color.textMuted,
  whiteSpace: "nowrap",
});

export const cardText = style({
  fontFamily: vars.font.mono,
  // audit-allow: px — card preview scale + min line box fixed to design spec
  fontSize: "11.5px",
  lineHeight: 1.5,
  color: vars.color.textMuted,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
  overflow: "hidden",
  minHeight: "51px",
});

export const cardMeta = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.sm,
});

export const statusWrap = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "5px",
});

export const cardFoot = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  // audit-allow: px — footer divider spacing fixed to design spec
  paddingTop: "8px",
  borderTop: "1px solid rgba(70,72,74,0.18)",
});

export const playBtn = style({
  flex: 1,
  // audit-allow: px — preview control height fixed to design spec
  height: "28px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
  border: "none",
  background: surfaceFloor,
  borderRadius: "7px",
  color: vars.color.textMuted,
  cursor: "pointer",
  fontFamily: vars.font.body,
  fontSize: "11px",
  fontWeight: 500,
  transition: `color ${vars.motion.fast}, background ${vars.motion.fast}`,
  selectors: { "&:hover": { color: vars.color.text } },
});

export const cardRemove = style({
  // audit-allow: px — icon control fixed to design spec
  width: "28px",
  height: "28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  background: surfaceFloor,
  borderRadius: "7px",
  color: onSurfaceMuted,
  cursor: "pointer",
  transition: `color ${vars.motion.fast}`,
  selectors: { "&:hover": { color: vars.color.danger } },
});

export const scanRail = style({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  // audit-allow: px — scan rail height fixed to design spec
  height: "2px",
  overflow: "hidden",
  background: "rgba(255,255,255,0.04)",
});

export const empty = style({
  flex: 1,
  // audit-allow: px — empty-state min width fixed to design spec
  minWidth: "320px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.sm,
  // audit-allow: px — empty-state padding pinned to vision (26px)
  padding: "26px",
  textAlign: "center",
});

export const emptyZero = style({
  fontFamily: vars.font.mono,
  // audit-allow: px — empty-state numeral fixed to design spec
  fontSize: "40px",
  fontWeight: 700,
  color: surfaceBright,
  lineHeight: 1,
});

export const emptyCopy = style({
  // audit-allow: px — empty-state copy scale fixed to design spec
  fontSize: "12px",
  color: onSurfaceMuted,
});

export const footer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: vars.space.md,
  // audit-allow: px — footer divider spacing fixed to design spec
  marginTop: "22px",
  paddingTop: "16px",
  borderTop: `1px solid ${hairline}`,
});

export const libRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  flexWrap: "wrap",
});

export const libChips = style({ display: "flex", gap: vars.space.sm, flexWrap: "wrap" });

export const libChip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  // audit-allow: px — library chip padding fixed to design spec
  padding: "5px 11px",
  borderRadius: vars.radius.pill,
  background: vars.color.surfaceHigh,
});

export const libName = style({
  fontFamily: vars.font.mono,
  // audit-allow: px — library chip label scale fixed to design spec
  fontSize: "11.5px",
});

export const footerHint = style({
  // audit-allow: px — hint scale fixed to design spec
  fontSize: "11.5px",
  color: onSurfaceMuted,
  fontFamily: vars.font.body,
});

globalStyle(`${footerHint} strong`, {
  color: vars.color.text,
  fontWeight: 600,
});

globalStyle(`${root} .material-symbols-outlined`, {
  fontFamily: '"Material Symbols Outlined"',
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 1,
  letterSpacing: "normal",
  textTransform: "none",
  display: "inline-block",
  whiteSpace: "nowrap",
  wordWrap: "normal",
  direction: "ltr",
  fontFeatureSettings: '"liga"',
  WebkitFontSmoothing: "antialiased",
  userSelect: "none",
});
