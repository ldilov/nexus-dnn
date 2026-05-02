import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import {
  sizeStyle,
  variantStyle,
  type ButtonSize,
  type ButtonVariant,
} from "./button.css";

export type { ButtonSize, ButtonVariant };

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  children,
  className,
  style,
  ...rest
}: ButtonProps): JSX.Element {
  const cls = [variantStyle[variant], sizeStyle[size], className].filter(Boolean).join(" ");
  return (
    <button type={type} className={cls} style={style} {...rest}>
      {children}
    </button>
  );
}
