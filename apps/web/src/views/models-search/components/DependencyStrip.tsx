import type { Dependency } from "../../../services/model_store";
import * as s from "./DependencyStrip.css";

const ROLE_LABELS: Record<string, string> = {
  vae: "VAE",
  text_encoder: "Text encoder",
  tokenizer: "Tokenizer",
  controlnet: "ControlNet",
  lora: "LoRA",
  scheduler: "Scheduler",
  other: "Other",
  primary: "Primary",
};

interface DependencyStripProps {
  dependencies: Dependency[];
}

/**
 * Renders dependency markers for dependency-bearing model families
 * (SDXL-class: VAE, text encoder, tokenizer, etc.). Required vs
 * optional is conveyed by pill color AND dot shape.
 */
export function DependencyStrip({ dependencies }: DependencyStripProps) {
  if (dependencies.length === 0) return null;

  return (
    <div className={s.strip} aria-label="Required and optional dependencies">
      {dependencies.map((dep, i) => {
        const required = dep.requirement === "required";
        const pillCls = required ? `${s.pill} ${s.pillRequired}` : s.pill;
        const dotCls = required
          ? `${s.dot} ${s.dotRequired}`
          : `${s.dot} ${s.dotOptional}`;
        const label = ROLE_LABELS[dep.role] ?? dep.role;
        const suffix = required ? "required" : "optional";
        return (
          <span
            key={`${dep.role}-${i}`}
            className={pillCls}
            title={`${label} · ${suffix}`}
          >
            <span className={dotCls} aria-hidden="true" />
            {label} · {suffix}
          </span>
        );
      })}
    </div>
  );
}
