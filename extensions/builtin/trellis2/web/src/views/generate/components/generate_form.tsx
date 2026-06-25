import type { ReactElement } from "react";
import { FieldControl, type FieldValue } from "../../../components/form/field_control";
import { FIELD_SPECS, type TunableFieldKey } from "../../../domain/fields";
import { useGenerateRequest } from "../../../store/generate_request_store";
import { ImageUploader } from "./image_uploader";
import * as styles from "./generate_form.css";

export function GenerateForm(): ReactElement {
  const { params, generate, updateParam } = useGenerateRequest();
  const disabled = generate.phase === "running";

  return (
    <div className={styles.form}>
      <span className={styles.sectionLabel}>Input image</span>
      <ImageUploader />

      <span className={styles.sectionLabel}>Generation</span>
      <div className={styles.grid}>
        {FIELD_SPECS.map((spec) => (
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
    </div>
  );

  function applyChange(key: TunableFieldKey, value: FieldValue): void {
    if (key === "residency") {
      updateParam("residency", value === "low_vram" ? "low_vram" : "balanced");
      return;
    }
    if (typeof value === "number") {
      updateParam(key, value);
    }
  }
}
