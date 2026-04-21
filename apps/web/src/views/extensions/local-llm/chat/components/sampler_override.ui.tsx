import type { SamplerOverride } from '../../../../../services/extension_chat';
import * as css from '../chat.css';

interface Props {
  override: SamplerOverride | null | undefined;
  onChange: (next: SamplerOverride | null) => void;
}

const DEFAULTS = { temperature: 0.7, min_p: 0.05, top_k: 40 } as const;

export function SamplerOverridePanel({ override, onChange }: Props) {
  const temp = override?.temperature ?? DEFAULTS.temperature;
  const minP = override?.min_p ?? DEFAULTS.min_p;
  const topK = override?.top_k ?? DEFAULTS.top_k;
  const hasOverride = override !== null && override !== undefined && Object.keys(override).length > 0;

  const patch = (field: keyof SamplerOverride, value: number) => {
    const next: SamplerOverride = { ...(override ?? {}), [field]: value };
    onChange(next);
  };

  return (
    <div>
      <div className={css.sliderRow}>
        <label className={css.sliderLabel} htmlFor="sampler-temp">Temperature</label>
        <input
          id="sampler-temp"
          type="range"
          min={0}
          max={2}
          step={0.05}
          value={temp}
          onChange={(e) => patch('temperature', Number(e.target.value))}
        />
        <span className={css.sliderValue}>{temp.toFixed(2)}</span>
      </div>
      <div className={css.sliderRow}>
        <label className={css.sliderLabel} htmlFor="sampler-minp">Min-P</label>
        <input
          id="sampler-minp"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={minP}
          onChange={(e) => patch('min_p', Number(e.target.value))}
        />
        <span className={css.sliderValue}>{minP.toFixed(2)}</span>
      </div>
      <div className={css.sliderRow}>
        <label className={css.sliderLabel} htmlFor="sampler-topk">Top-K</label>
        <input
          id="sampler-topk"
          type="range"
          min={0}
          max={200}
          step={1}
          value={topK}
          onChange={(e) => patch('top_k', Number(e.target.value))}
        />
        <span className={css.sliderValue}>{topK}</span>
      </div>
      <button
        type="button"
        className={css.ghostButton}
        disabled={!hasOverride}
        onClick={() => onChange(null)}
      >
        Use model defaults
      </button>
    </div>
  );
}
