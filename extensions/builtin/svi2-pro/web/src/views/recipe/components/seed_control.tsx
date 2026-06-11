import { type ChangeEvent, type ReactElement, useId } from "react";
import { useRenderRequest } from "../../../store/render_request_store";
import * as quick from "./quick_controls.css";
import * as styles from "./seed_control.css";

const PLACEHOLDER = "Random each render";

function parseSeed(raw: string): number | undefined {
  const trimmed = raw.trim();
  if (trimmed.length === 0) return undefined;
  const value = Number(trimmed);
  if (!Number.isFinite(value) || value < 0) return undefined;
  return Math.trunc(value);
}

export function SeedControl(): ReactElement {
  const { params, updateParam } = useRenderRequest();
  const labelId = useId();
  const seed = params.seed;

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    updateParam("seed", parseSeed(event.target.value));
  };

  return (
    <div className={quick.group}>
      <span className={quick.groupLabel} id={labelId}>
        Seed
      </span>
      <div className={quick.controlRow}>
        <input
          type="number"
          inputMode="numeric"
          className={styles.input}
          aria-labelledby={labelId}
          min={0}
          step={1}
          placeholder={PLACEHOLDER}
          value={seed ?? ""}
          onChange={handleChange}
        />
        <span className={quick.hint}>
          Fixes the synthesized seed frame for reproducible takes. Leave blank to randomize.
        </span>
      </div>
    </div>
  );
}
