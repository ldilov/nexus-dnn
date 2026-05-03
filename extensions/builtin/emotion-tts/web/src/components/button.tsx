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
  loading?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  loading = false,
  disabled,
  children,
  className,
  style,
  ...rest
}: ButtonProps): JSX.Element {
  const cls = [variantStyle[variant], sizeStyle[size], className].filter(Boolean).join(" ");
  return (
    <button
      type={type}
      className={cls}
      style={style}
      disabled={loading || disabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {children}
    </button>
  );
}
