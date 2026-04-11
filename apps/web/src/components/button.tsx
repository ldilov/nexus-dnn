import type { ButtonHTMLAttributes } from "react";
import { buttonRecipe } from "./button.css";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconOnly?: boolean;
};

export function Button({
  variant,
  size,
  iconOnly,
  className,
  ...rest
}: ButtonProps) {
  const cls = [buttonRecipe({ variant, size, iconOnly }), className]
    .filter(Boolean)
    .join(" ");
  return <button className={cls} {...rest} />;
}
