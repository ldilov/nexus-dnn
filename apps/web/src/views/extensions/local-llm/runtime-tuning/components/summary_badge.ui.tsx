import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { formatGpuLayersLabel } from "./label_format";
import * as styles from "./summary_badge.css";

export interface SummaryBadgeProps {
  value: number;
  max: number;
  layerCountKnown: boolean;
}

type BadgeState = "cpu" | "max" | "partial";

function resolveState(value: number, max: number): BadgeState {
  if (value === max) {
    return "max";
  }
  if (value === 0) {
    return "cpu";
  }
  return "partial";
}

function SummaryBadge({ value, max, layerCountKnown }: SummaryBadgeProps) {
  const text = formatGpuLayersLabel(value, max, layerCountKnown);
  const state = resolveState(value, max);
  const prefersReducedMotion = useReducedMotion();

  const motionProps = prefersReducedMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 2 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -2 },
        transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] as const },
      };

  const showDot = state === "cpu" || state === "max";

  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={`GPU offload: ${text}`}
      className={styles.badge}
    >
      {showDot ? (
        <span
          aria-hidden="true"
          className={`${styles.dot} ${state === "max" ? styles.dotVariant.max : styles.dotVariant.cpu}`}
        />
      ) : null}
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={text}
          className={`${styles.labelText} ${styles.label[state]}`}
          {...motionProps}
        >
          {text}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

export default SummaryBadge;
