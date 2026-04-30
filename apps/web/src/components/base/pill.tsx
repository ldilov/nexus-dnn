import type { ButtonHTMLAttributes, ReactNode } from "react";
import { pill, pillActive, pillCount } from "./pill.css";

interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  count?: number | string;
  children: ReactNode;
}

export function Pill({ active = false, count, children, className, ...rest }: PillProps) {
  const cls = [pill, active ? pillActive : "", className ?? ""].filter(Boolean).join(" ");
  return (
    <button type="button" className={cls} aria-pressed={active} {...rest}>
      <span>{children}</span>
      {count !== undefined ? <span className={pillCount}>{count}</span> : null}
    </button>
  );
}
