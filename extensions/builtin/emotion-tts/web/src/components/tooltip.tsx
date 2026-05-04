import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import * as css from "./tooltip.css";

export interface TooltipProps {
  /** Plain-language explanation. Newlines are preserved. */
  readonly content: ReactNode;
  /** Trigger element. A `?` help-icon is the typical use. */
  readonly children: ReactElement;
  /** Default 350. Match Material's hover-intent recommendation. */
  readonly delayMs?: number;
}

export function Tooltip({ content, children, delayMs = 350 }: TooltipProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const id = useId();
  const timerRef = useRef<number | null>(null);

  const cancelTimer = useCallback(() => {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const show = useCallback(() => {
    cancelTimer();
    timerRef.current = window.setTimeout(() => setOpen(true), delayMs);
  }, [cancelTimer, delayMs]);

  const hide = useCallback(() => {
    cancelTimer();
    setOpen(false);
  }, [cancelTimer]);

  useEffect(() => () => cancelTimer(), [cancelTimer]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!isValidElement(children)) {
    return <>{children}</>;
  }

  const triggerProps: Record<string, unknown> = {
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
    "aria-describedby": open ? id : undefined,
  };

  return (
    <span className={css.wrapper}>
      {cloneElement(children, triggerProps)}
      {open && (
        <span role="tooltip" id={id} className={css.bubble}>
          {content}
        </span>
      )}
    </span>
  );
}

export interface HelpDotProps {
  readonly label: string;
  readonly content: ReactNode;
}

/** A small `?` dot that opens a tooltip on hover/focus — paired with form labels. */
export function HelpDot({ label, content }: HelpDotProps): JSX.Element {
  return (
    <Tooltip content={content}>
      <button type="button" aria-label={`What is ${label}?`} className={css.dot}>
        ?
      </button>
    </Tooltip>
  );
}
