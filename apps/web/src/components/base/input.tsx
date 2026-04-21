import type { InputHTMLAttributes } from "react";
import { inputRecipe } from "./input.css";

type InputVariant = "default" | "ghost" | "mono";
type InputSize = "sm" | "md" | "lg";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: InputVariant;
  size?: InputSize;
  hasError?: boolean;
};

export function Input({
  variant,
  size,
  hasError,
  className,
  ...rest
}: InputProps) {
  const cls = [inputRecipe({ variant, size, hasError }), className]
    .filter(Boolean)
    .join(" ");
  return <input className={cls} {...rest} />;
}
