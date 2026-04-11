import { createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
  color: {
    surface: { base: "", raised: "", overlay: "", sunken: "" },
    text: { primary: "", secondary: "", muted: "", inverse: "" },
    accent: { primary: "", hover: "", muted: "" },
    success: { base: "", text: "" },
    warning: { base: "", text: "" },
    error: { base: "", text: "" },
    border: { default: "", subtle: "", strong: "" },
  },
  font: {
    family: { body: "", mono: "" },
    size: { xs: "", sm: "", md: "", lg: "", xl: "", xxl: "" },
    weight: { regular: "", medium: "", semibold: "", bold: "" },
    lineHeight: { tight: "", normal: "", relaxed: "" },
  },
  space: {
    xxs: "",
    xs: "",
    sm: "",
    md: "",
    lg: "",
    xl: "",
    xxl: "",
    xxxl: "",
  },
  radius: { sm: "", md: "", lg: "", xl: "", full: "" },
  shadow: { sm: "", md: "", lg: "" },
  z: { base: "", dropdown: "", modal: "", toast: "" },
});
