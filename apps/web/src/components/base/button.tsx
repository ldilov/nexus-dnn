import type { ButtonHTMLAttributes, ReactElement } from "react";
import { buttonRecipe } from "./button.css";
import * as styles from "./button_spinner.css";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "tertiary"
  | "success"
  | "accent";
export type ButtonSize = "xs" | "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconOnly?: boolean;
  loading?: boolean;
};

export function Button({
  variant,
  size,
  iconOnly,
  loading = false,
  className,
  disabled,
  children,
  ...rest
}: ButtonProps): ReactElement {
  const cls = [buttonRecipe({ variant, size, iconOnly }), className]
    .filter(Boolean)
    .join(" ");
  return (
    <button
      className={cls}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <span className={styles.spinner} aria-hidden="true" /> : null}
      {children}
    </button>
  );
}
