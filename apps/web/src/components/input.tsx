import type { InputHTMLAttributes } from "react";
import { inputStyle } from "./input.css";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...rest }: InputProps) {
  const combined = [inputStyle, className].filter(Boolean).join(" ");
  return <input className={combined} {...rest} />;
}
