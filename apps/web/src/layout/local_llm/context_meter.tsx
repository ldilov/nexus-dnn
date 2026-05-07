import * as styles from "./context_meter.css";

export type ContextTone = "ok" | "warn" | "danger";

export function toneFor(pct: number): ContextTone {
  if (pct >= 0.85) return "danger";
  if (pct >= 0.6) return "warn";
  return "ok";
}

const numberFormatter = new Intl.NumberFormat("en-US");

interface ContextMeterProps {
  used: number;
  max: number;
  label?: string;
}

export function ContextMeter({ used, max, label = "Context used" }: Readonly<ContextMeterProps>) {
  const ratio = max > 0 ? Math.min(1, used / max) : 0;
  const pctRounded = Math.round(ratio * 100);
  const tone = toneFor(ratio);
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>
          {numberFormatter.format(used)} / {numberFormatter.format(max)}
          <span className={styles.pct}>({pctRounded}%)</span>
        </span>
      </div>
      <div
        className={styles.track}
        role="progressbar"
        aria-label={label}
        aria-valuenow={pctRounded}
        aria-valuemin={0}
        aria-valuemax={100}
        data-tone={tone}
      >
        <div className={styles.fill} data-tone={tone} style={{ width: `${pctRounded}%` }} />
      </div>
    </div>
  );
}
