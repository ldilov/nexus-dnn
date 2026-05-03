import * as css from "./dep_recipe_banner.css";

export interface DepRecipeBannerProps {
  runtimeId: string;
  device?: string | null;
  sampleRateHz?: number | null;
  lineCount: number;
  charCount: number;
  estimatedDurationS?: number | null;
}

export function DepRecipeBanner({
  runtimeId,
  device,
  sampleRateHz,
  lineCount,
  charCount,
  estimatedDurationS,
}: DepRecipeBannerProps): JSX.Element {
  return (
    <div className={css.root} role="status" aria-label="Recipe deployment context">
      <span className={css.item}>
        <span className={css.label}>Runtime</span>
        <span className={css.value}>{runtimeId}</span>
      </span>
      {device && (
        <>
          <span className={css.divider} aria-hidden="true" />
          <span className={css.item}>
            <span className={css.label}>Device</span>
            <span className={css.value}>{device}</span>
          </span>
        </>
      )}
      {typeof sampleRateHz === "number" && sampleRateHz > 0 && (
        <>
          <span className={css.divider} aria-hidden="true" />
          <span className={css.item}>
            <span className={css.label}>Sample rate</span>
            <span className={css.value}>{sampleRateHz} Hz</span>
          </span>
        </>
      )}
      <span className={css.divider} aria-hidden="true" />
      <span className={css.item}>
        <span className={css.label}>Lines</span>
        <span className={css.accentValue}>{lineCount.toString().padStart(2, "0")}</span>
      </span>
      <span className={css.item}>
        <span className={css.label}>Chars</span>
        <span className={css.accentValue}>{charCount.toString().padStart(3, "0")}</span>
      </span>
      {typeof estimatedDurationS === "number" && estimatedDurationS > 0 && (
        <>
          <span className={css.divider} aria-hidden="true" />
          <span className={css.item}>
            <span className={css.label}>Est duration</span>
            <span className={css.accentValue}>{formatDuration(estimatedDurationS)}</span>
          </span>
        </>
      )}
    </div>
  );
}

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "—";
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
