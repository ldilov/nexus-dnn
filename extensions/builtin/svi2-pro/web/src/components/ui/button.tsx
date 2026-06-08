import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import {
  sizeStyle,
  spinner,
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
}

export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  loading = false,
  disabled,
  children,
  className,
  ...rest
}: ButtonProps): ReactElement {
  const classes = [variantStyle[variant], sizeStyle[size], className].filter(Boolean).join(" ");
  return (
    <button
      type={type}
      className={classes}
      disabled={loading || disabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <span className={spinner} aria-hidden="true" /> : null}
      {children}
    </button>
  );
}
