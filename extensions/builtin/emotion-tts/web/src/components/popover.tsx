import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import * as css from "./popover.css";

interface PopoverProps {
  label: string;
  glyph?: string;
  children: ReactNode;
  align?: "end" | "start";
}

/**
 * Lightweight anchor + content popover. The popover closes on outside click
 * (mousedown), Escape, and tab-out. Designed to be self-contained — no portal,
 * because the surrounding section never has its own stacking context-breaking
 * `transform` and the host shell allows overflow.
 */
export function Popover({ label, glyph = "?", children }: PopoverProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const triggerId = useId();
  const contentId = `${triggerId}-content`;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (event: MouseEvent): void => {
      if (!wrapRef.current) return;
      if (event.target instanceof Node && wrapRef.current.contains(event.target)) return;
      close();
    };
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        close();
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <span ref={wrapRef} className={css.anchor}>
      <button
        type="button"
        id={triggerId}
        className={css.trigger}
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={css.triggerGlyph} aria-hidden="true">
          {glyph}
        </span>
        {label}
      </button>
      {open && (
        <div
          id={contentId}
          role="dialog"
          aria-labelledby={triggerId}
          className={css.content}
        >
          {children}
        </div>
      )}
    </span>
  );
}
