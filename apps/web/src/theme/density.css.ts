import { globalStyle, assignVars } from "@vanilla-extract/css";
import { vars } from "./contract.css";
import { density, cardStyle, accentMode } from "../tokens/primitives";

const densityAssign = (mode: "compact" | "cozy" | "spacious") =>
  assignVars(vars.density, {
    d1: density[mode].d1,
    d2: density[mode].d2,
    d3: density[mode].d3,
    d4: density[mode].d4,
    d5: density[mode].d5,
    d6: density[mode].d6,
    d7: density[mode].d7,
    d8: density[mode].d8,
    d9: density[mode].d9,
    padCard: density[mode].padCard,
    padSection: density[mode].padSection,
    rowH: density[mode].rowH,
    gapCard: density[mode].gapCard,
  });

globalStyle('body[data-density="compact"]', { vars: densityAssign("compact") });
globalStyle('body[data-density="cozy"]', { vars: densityAssign("cozy") });
globalStyle('body[data-density="spacious"]', { vars: densityAssign("spacious") });

const cardAssign = (mode: "flat" | "glass" | "elevated") =>
  assignVars(vars.card, {
    bg: cardStyle[mode].bg,
    border: cardStyle[mode].border,
    shadow: cardStyle[mode].shadow,
    backdrop: cardStyle[mode].backdrop,
  });

globalStyle('body[data-card="flat"]', { vars: cardAssign("flat") });
globalStyle('body[data-card="glass"]', { vars: cardAssign("glass") });
globalStyle('body[data-card="elevated"]', { vars: cardAssign("elevated") });

const accentAssign = (mode: "primary" | "secondary" | "tertiary") =>
  assignVars(
    {
      accent: vars.color.accent.accent,
      accentDim: vars.color.accent.accentDim,
      accentGlow: vars.color.accent.accentGlow,
    },
    {
      accent: accentMode[mode].accent,
      accentDim: accentMode[mode].accentDim,
      accentGlow: accentMode[mode].accentGlow,
    },
  );

globalStyle('body[data-accent="primary"]', { vars: accentAssign("primary") });
globalStyle('body[data-accent="secondary"]', { vars: accentAssign("secondary") });
globalStyle('body[data-accent="tertiary"]', { vars: accentAssign("tertiary") });
