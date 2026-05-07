import { useCallback, useEffect, useRef, useState } from "react";
import * as styles from "./help_tooltip.css";

type Side = "top" | "right" | "bottom" | "left";

interface HelpTooltipProps {
  id: string;
  title?: string;
  description: string;
  recommended?: string;
  side?: Side;
}

const HOVER_OPEN_DELAY_MS = 100;
const HOVER_CLOSE_DELAY_MS = 200;

export function HelpTooltip({
  id,
  title,
  description,
  recommended,
  side = "top",
}: HelpTooltipProps) {
  const [open, setOpen] = useState(false);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (openTimerRef.current !== null) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  const scheduleOpen = useCallback(() => {
    clearTimers();
    openTimerRef.current = setTimeout(() => {
      setOpen(true);
    }, HOVER_OPEN_DELAY_MS);
  }, [clearTimers]);

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
    }, HOVER_CLOSE_DELAY_MS);
  }, [clearTimers]);

  const handleFocus = useCallback(() => {
    clearTimers();
    setOpen(true);
  }, [clearTimers]);

  const handleBlur = useCallback(() => {
    clearTimers();
    setOpen(false);
  }, [clearTimers]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Escape" && open) {
        event.stopPropagation();
        clearTimers();
        setOpen(false);
      }
    },
    [open, clearTimers],
  );

  const tooltipClass = [
    styles.tooltipSide[side],
    open ? styles.tooltipOpen : styles.tooltipHidden,
  ].join(" ");

  return (
    <span className={styles.root}>
      <button
        type="button"
        aria-describedby={id}
        aria-label="Help"
        className={styles.trigger}
        onMouseEnter={scheduleOpen}
        onMouseLeave={scheduleClose}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      >
        ?
      </button>
      <span
        id={id}
        role="tooltip"
        aria-hidden={open ? "false" : "true"}
        className={tooltipClass}
      >
        {title ? <span className={styles.title}>{title}</span> : null}
        <span className={styles.description}>{description}</span>
        {recommended ? (
          <span className={styles.recommended}>
            {`Recommended: ${recommended}`}
          </span>
        ) : null}
      </span>
    </span>
  );
}
