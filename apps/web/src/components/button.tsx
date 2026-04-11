import type { ButtonHTMLAttributes } from "react";
import { buttonRecipe } from "./button.css";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ variant, size, className, ...rest }: ButtonProps) {
  const combined = [buttonRecipe({ variant, size }), className].filter(Boolean).join(" ");
  return <button className={combined} {...rest} />;
}
