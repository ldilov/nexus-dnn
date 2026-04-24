import type { OutputFormat } from "../../../services/types";
import * as css from "../recipe.css";

interface Props {
  outputFormat: OutputFormat;
  onOutputFormatChange: (next: OutputFormat) => void;
  speedFactor: number;
  onSpeedFactorChange: (next: number) => void;
  generation: Record<string, unknown>;
  onGenerationChange: (next: Record<string, unknown>) => void;
}

export function GenerationSettingsPanel({
  outputFormat,
  onOutputFormatChange,
  speedFactor,
  onSpeedFactorChange,
  generation,
  onGenerationChange,
}: Props): JSX.Element {
  const update = (key: string, value: unknown): void => {
    onGenerationChange({ ...generation, [key]: value });
  };

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
