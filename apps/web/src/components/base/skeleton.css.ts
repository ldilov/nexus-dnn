import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

const shimmer = keyframes({
  "0%": { transform: "translateX(-100%)" },
  "100%": { transform: "translateX(100%)" },
});

export const skeleton = style({
  position: "relative",
  overflow: "hidden",
  backgroundColor: vars.color.bg.hover,
  borderRadius: vars.radius.control,
  // Block paints under the moving highlight; keep it inert for AT.
  selectors: {
    "&::after": {
      content: "",
      position: "absolute",
      inset: 0,
      transform: "translateX(-100%)",
      backgroundImage: `linear-gradient(90deg, transparent, color-mix(in oklab, ${vars.color.text.primary} 7%, transparent), transparent)`,
      animation: `${shimmer} 1.5s ${vars.motion.easingDefault} infinite`,
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      selectors: {
        "&::after": { animation: "none" },
      },
    },
  },
});

export const radii = styleVariants({
  control: { borderRadius: vars.radius.control },
  card: { borderRadius: vars.radius.card },
  full: { borderRadius: vars.radius.full },
  // audit-allow: px — text-line skeletons read best with a tight pill radius.
  text: { borderRadius: "4px" },
});

export const textBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
});

export const card = style({
  backgroundColor: vars.card.bg,
  borderRadius: vars.radius.card,
  padding: vars.density.padCard,
  boxShadow: vars.card.shadow,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapMd,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: vars.density.gapCard,
});
