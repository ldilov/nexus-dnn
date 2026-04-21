import type { HTMLAttributes } from "react";
import { cardRecipe } from "./card.css";

type CardVariant = "default" | "interactive" | "outlined";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  selected?: boolean;
};

export function Card({
  variant,
  selected,
  className,
  ...rest
}: CardProps) {
  const cls = [cardRecipe({ variant, selected }), className]
    .filter(Boolean)
    .join(" ");
  return <div className={cls} {...rest} />;
}
