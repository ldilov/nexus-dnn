import { useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, m } from "motion/react";
import * as styles from "./ladder.css";

export type LadderRung = "bytes" | "tensors" | "phases" | "story";

export const DEFAULT_LADDER_RUNG: LadderRung = "phases";

const RUNGS: readonly { id: LadderRung; index: string; label: string }[] = [
  { id: "bytes", index: "01", label: "BYTES" },
  { id: "tensors", index: "02", label: "TENSORS" },
  { id: "phases", index: "03", label: "PHASES" },
  { id: "story", index: "04", label: "STORY" },
];

export interface LadderProps {
  active: LadderRung;
  onChange: (rung: LadderRung) => void;
}

export function Ladder({ active, onChange }: LadderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Map<LadderRung, HTMLButtonElement>>(new Map());
  const [indicator, setIndicator] = useState<{ y: number; height: number }>({
    y: 0,
    height: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    const btn = buttonRefs.current.get(active);
    if (!container || !btn) return;
    const cRect = container.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    setIndicator({ y: bRect.top - cRect.top, height: bRect.height });
  }, [active]);

  const setRef =
    (id: LadderRung) =>
    (el: HTMLButtonElement | null): void => {
      if (el) buttonRefs.current.set(id, el);
      else buttonRefs.current.delete(id);
    };

  return (
    <LazyMotion features={domAnimation}>
      <div
        ref={containerRef}
        className={styles.root}
        role="radiogroup"
        aria-label="Lattice projection"
      >
        <m.div
          className={styles.indicator}
          aria-hidden="true"
          animate={{ y: indicator.y, height: indicator.height }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        />
        {RUNGS.map((r) => {
          const isActive = r.id === active;
          const cls = [
            styles.rung,
            styles.rungSize[r.id],
            isActive ? styles.rungActive : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <button
              key={r.id}
              ref={setRef(r.id)}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={cls}
              onClick={() => onChange(r.id)}
            >
              <span className={styles.rungIndex}>{r.index}</span>
              <span className={styles.rungLabel}>{r.label}</span>
            </button>
          );
        })}
      </div>
    </LazyMotion>
  );
}
