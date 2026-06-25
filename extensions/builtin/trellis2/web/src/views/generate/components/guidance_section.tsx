import { type ReactElement, useId, useState } from "react";
import {
  type GuidanceFieldSpec,
  GUIDANCE_STAGES,
  type GuidanceStageSpec,
} from "../../../domain/guidance";
import { useGenerateRequest } from "../../../store/generate_request_store";
import * as styles from "./guidance_section.css";

/**
 * Power-user, per-stage classifier-free-guidance controls. Every input is empty
 * by default and opt-in: a blank field is omitted from the payload so the worker
 * keeps the model's baked default (shown as the placeholder hint). Collapsed by
 * default and nested inside the Advanced / Quality area.
 */
export function GuidanceSection({ disabled = false }: { disabled?: boolean }): ReactElement {
  const [open, setOpen] = useState(false);
  const bodyId = useId();

  return (
    <section className={styles.section}>
      <button
        type="button"
        className={styles.header}
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.title}>Guidance (per-stage CFG)</span>
        <span className={styles.chevron} data-open={open} aria-hidden="true">
          expand_more
        </span>
      </button>
      {open && (
        <div id={bodyId} className={styles.body}>
          <p className={styles.intro}>
            Optional overrides. Leave a field blank to inherit the model's tuned default (shown as
            the hint). Interval start and end only apply when both are set.
          </p>
          {GUIDANCE_STAGES.map((stage) => (
            <StageGroup key={stage.id} stage={stage} disabled={disabled} />
          ))}
        </div>
      )}
    </section>
  );
}

function StageGroup({
  stage,
  disabled,
}: {
  stage: GuidanceStageSpec;
  disabled: boolean;
}): ReactElement {
  return (
    <fieldset className={styles.stage} disabled={disabled}>
      <legend className={styles.legend}>
        <span className={styles.stageTitle}>{stage.title}</span>
        <span className={styles.stageBlurb}>{stage.blurb}</span>
      </legend>
      <div className={styles.grid}>
        {stage.fields.map((field) => (
          <GuidanceField key={field.key} field={field} />
        ))}
      </div>
    </fieldset>
  );
}

function GuidanceField({ field }: { field: GuidanceFieldSpec }): ReactElement {
  const { guidanceDraft, setGuidance } = useGenerateRequest();
  const id = useId();
  const helpId = `${id}-help`;
  const value = guidanceDraft[field.key] ?? "";

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {field.label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        className={styles.input}
        aria-describedby={helpId}
        placeholder={field.placeholder}
        min={field.min}
        max={field.max}
        step={field.step}
        value={value}
        onChange={(event) => setGuidance(field.key, event.target.value)}
      />
      <span id={helpId} className={styles.help}>
        {field.help}
      </span>
    </div>
  );
}
