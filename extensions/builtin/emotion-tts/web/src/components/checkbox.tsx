import { forwardRef, type ChangeEvent, type ReactNode } from "react";
import * as css from "./checkbox.css";

export interface CheckboxProps {
  readonly checked: boolean;
  readonly onChange: (next: boolean) => void;
  readonly label?: ReactNode;
  readonly hint?: ReactNode;
  readonly disabled?: boolean;
  readonly id?: string;
  readonly className?: string;
  /** When true, the rendered tone shifts to accent (used by Quick-mode toolbar). */
  readonly emphasis?: boolean;
}

/**
 * Styled checkbox primitive matching the Spectral Graphite reference:
 * 18px square, ghost border at rest, accent fill + Material check glyph
 * when checked. Native input is visually hidden but keeps keyboard +
 * screen-reader semantics intact.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { checked, onChange, label, hint, disabled, id, className, emphasis = false },
    ref,
  ): JSX.Element {
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      onChange(e.currentTarget.checked);
    };

    return (
      <label
        className={`${css.wrapper} ${
          emphasis && checked ? css.wrapperEmphasised : ""
        } ${className ?? ""}`}
        data-disabled={disabled || undefined}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className={css.input}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
        />
        <span className={css.box} aria-hidden="true">
          <span className={`material-symbols-outlined ${css.glyph}`}>check</span>
        </span>
        {(label || hint) && (
          <span className={css.labelBlock}>
            {label && <span className={css.label}>{label}</span>}
            {hint && <span className={css.hint}>{hint}</span>}
          </span>
        )}
      </label>
    );
  },
);
