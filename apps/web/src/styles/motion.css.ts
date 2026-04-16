import { createGlobalTheme } from "@vanilla-extract/css";

export const motion = createGlobalTheme(":root", {
  duration: {
    cardHoverLift: "160ms",
    cardGlow: "200ms",
    focusRing: "120ms",
    tabCrossfade: "200ms",
    sidebarSettle: "200ms",
    drawerSlide: "240ms",
    optimisticInsert: "200ms",
    statusDotPulseCycle: "1500ms",
    viewingBannerEntrance: "160ms",
  },
  ease: {
    out: "cubic-bezier(0.16, 1, 0.3, 1)",
    outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
    standard: "cubic-bezier(0.2, 0, 0, 1)",
  },
});
