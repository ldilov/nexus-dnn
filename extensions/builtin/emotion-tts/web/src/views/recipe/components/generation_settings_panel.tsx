import type { CachePolicy, OutputFormat } from "../../../services/types";
import { Button } from "../../../components/button";
import * as css from "../recipe.css";

interface Props {
  outputFormat: OutputFormat;
  onOutputFormatChange: (next: OutputFormat) => void;
  speedFactor: number;
  onSpeedFactorChange: (next: number) => void;
  cachePolicy: CachePolicy;
  onCachePolicyChange: (next: CachePolicy) => void;
  generation: Record<string, unknown>;
  onGenerationChange: (next: Record<string, unknown>) => void;
}

const CACHE_POLICIES: readonly { id: CachePolicy; label: string; help: string }[] = [
  {
    id: "use_cache",
    label: "Use cache",
    help: "Read hits, write misses. Fastest on re-runs.",
  },
  {
    id: "force_regenerate",
    label: "Force regenerate",
    help: "Always synthesize; still writes to cache.",
  },
  {
    id: "read_only_cache",
    label: "Read-only cache",
    help: "Read hits, synthesize misses without writing back.",
  },
];

const DEFAULT_POLICY: { id: CachePolicy; label: string; help: string } = {
  id: "use_cache",
  label: "Use cache",
  help: "Read hits, write misses. Fastest on re-runs.",
};

export function GenerationSettingsPanel({
  outputFormat,
  onOutputFormatChange,
  speedFactor,
  onSpeedFactorChange,
  cachePolicy,
  onCachePolicyChange,
  generation,
  onGenerationChange,
}: Props): JSX.Element {
  const update = (key: string, value: unknown): void => {
    onGenerationChange({ ...generation, [key]: value });
  };

  const activePolicy = CACHE_POLICIES.find((p) => p.id === cachePolicy) ?? DEFAULT_POLICY;

  return (
    <div>
      <label className={css.controlRow}>
        <span className={css.label}>Format</span>
        <select value={outputFormat} onChange={(e) => onOutputFormatChange(e.currentTarget.value as OutputFormat)}>
          <option value="mp3">mp3</option>
          <option value="wav">wav</option>
          <option value="flac">flac</option>
        </select>
      </label>
      <label className={css.controlRow}>
        <span className={css.label}>Speed</span>
        <input
          type="range"
          min={0.5}
          max={2.0}
          step={0.05}
          value={speedFactor}
          onChange={(e) => onSpeedFactorChange(Number(e.currentTarget.value))}
        />
        <output>{speedFactor.toFixed(2)}×</output>
      </label>
      <div
        className={css.controlRow}
        role="radiogroup"
        aria-label="Cache policy"
      >
        <span className={css.label}>Cache</span>
        {CACHE_POLICIES.map((p) => (
          <Button
            key={p.id}
            variant={cachePolicy === p.id ? "primary" : "secondary"}
            size="sm"
            // biome-ignore lint/a11y/useSemanticElements: button-based radio preserves focus styles + click semantics across browsers — native radio doesn't fit the pill-row visual
            role="radio"
            aria-checked={cachePolicy === p.id}
            onClick={() => onCachePolicyChange(p.id)}
            title={p.help}
          >
            {p.label}
          </Button>
        ))}
      </div>
      <p className={css.label} aria-live="polite">
        {activePolicy.help}
      </p>
      <label className={css.controlRow}>
        <span className={css.label}>Temperature</span>
        <input
          type="number"
          min={0}
          max={2}
          step={0.05}
          defaultValue={0.8}
          onChange={(e) => update("temperature", Number(e.currentTarget.value))}
        />
      </label>
      <label className={css.controlRow}>
        <span className={css.label}>Top-p</span>
        <input
          type="number"
          min={0}
          max={1}
          step={0.05}
          defaultValue={0.8}
          onChange={(e) => update("top_p", Number(e.currentTarget.value))}
        />
      </label>
      <label className={css.controlRow}>
        <span className={css.label}>Seed</span>
        <input
          type="number"
          defaultValue={42}
          onChange={(e) => update("seed", Number(e.currentTarget.value))}
        />
      </label>
    </div>
  );
}
