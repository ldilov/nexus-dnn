import { type ReactElement, useId, useState } from "react";
import { FieldControl, type FieldValue } from "../../../components/form/field_control";
import {
  ADVANCED_FIELDS,
  PRIMARY_FIELDS,
  type TunableFieldKey,
} from "../../../domain/fields";
import { useGenerateRequest } from "../../../store/generate_request_store";
import type { GenerateParams } from "../../../services/types";
import { ImageUploader } from "./image_uploader";
import * as styles from "./generate_form.css";

/** Param keys whose value is a string enum rather than a number. */
const STRING_KEYS = new Set<TunableFieldKey>(["pipeline_type", "residency"]);

export function GenerateForm(): ReactElement {
  const { params, generate, updateParam } = useGenerateRequest();
  const disabled = generate.phase === "running";
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const advancedId = useId();

  return (
    <div className={styles.form}>
      <span className={styles.sectionLabel}>Input image</span>
      <ImageUploader />

      <span className={styles.sectionLabel}>Generation</span>
      <div className={styles.grid}>
        {PRIMARY_FIELDS.map((spec) => (
          <FieldControl
            key={spec.key}
            spec={spec}
            value={params[spec.key] as FieldValue | undefined}
            disabled={disabled}
            onChange={(value) => applyChange(spec.key, value)}
          />
        ))}
      </div>

      <div className={styles.textureRow}>
        <div className={styles.textureCopy}>
          <span className={styles.textureTitle}>Bake texture</span>
          <span className={styles.textureHint}>
            Off exports a MeshOnly GLB. On runs the texture pass (slower, larger file).
          </span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={Boolean(params.texture)}
          aria-label="Bake texture"
          disabled={disabled}
          className={styles.toggle}
          onClick={() => updateParam("texture", !params.texture)}
        >
          <span className={styles.toggleThumb} aria-hidden="true" />
        </button>
      </div>

      <section className={styles.advanced}>
        <button
          type="button"
          className={styles.advancedHeader}
          aria-expanded={advancedOpen}
          aria-controls={advancedId}
          onClick={() => setAdvancedOpen((open) => !open)}
        >
          <span className={styles.advancedTitle}>Advanced / Quality</span>
          <span className={styles.advancedChevron} data-open={advancedOpen} aria-hidden="true">
            expand_more
          </span>
        </button>
        {advancedOpen && (
          <div id={advancedId} className={styles.grid}>
            {ADVANCED_FIELDS.map((spec) => (
              <FieldControl
                key={spec.key}
                spec={spec}
                value={params[spec.key] as FieldValue | undefined}
                disabled={disabled}
                onChange={(value) => applyChange(spec.key, value)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );

  function applyChange(key: TunableFieldKey, value: FieldValue): void {
    if (STRING_KEYS.has(key) && typeof value === "string") {
      updateParam(key, value as GenerateParams[typeof key]);
      return;
    }
    if (typeof value === "number") {
      updateParam(key, value as GenerateParams[typeof key]);
    }
  }
}
