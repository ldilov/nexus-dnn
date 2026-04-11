import type { HTMLAttributes } from "react";
import { panelRecipe } from "./panel.css";

type PanelVariant = "raised" | "flat" | "outline";

type PanelProps = HTMLAttributes<HTMLDivElement> & {
  variant?: PanelVariant;
};

export function Panel({ variant, className, ...rest }: PanelProps) {
  const combined = [panelRecipe({ variant }), className].filter(Boolean).join(" ");
  return <div className={combined} {...rest} />;
}
