import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import {
  iconOnlyStyle,
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
  iconOnly?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  loading = false,
  iconOnly = false,
  disabled,
  children,
  className,
  style,
  ...rest
}: ButtonProps): JSX.Element {
  const classes = [
    variantStyle[variant],
    sizeStyle[size],
    iconOnly ? iconOnlyStyle[size] : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button
      type={type}
      className={classes}
      style={style}
      disabled={loading || disabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <span className={spinner} aria-hidden="true" /> : null}
      {children}
    </button>
  );
}
