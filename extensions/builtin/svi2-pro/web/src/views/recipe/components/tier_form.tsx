import type { ReactElement } from "react";
import { FieldControl } from "../../../components/form/field_control";
import { TierFieldGroup } from "../../../components/primitives/tier_field_group";
import { Badge } from "../../../components/ui/badge";
import { TIERS, fieldsForTier } from "../../../domain/fields";
import { tierSummary } from "../../../domain/tier_summary";
import { isFlf2vMode, type ValidationIssue } from "../../../domain/validation";
import { useRenderRequest } from "../../../store/render_request_store";
import type { RenderParams } from "../../../services/types";
import { AttentionSelect } from "./attention_select";
import { TorchCompileToggle } from "./torch_compile_toggle";
import * as styles from "./tier_form.css";

interface TierFormProps {
  issues: ValidationIssue[];
}

const FLF2V_LOCKED_FIELDS: Partial<Record<keyof RenderParams, string>> = {
  num_clips: "Locked to 1 in FLF2V morph — the end keyframe pins the clip, no chaining.",
  frames_per_clip: "Driven by the Length control in FLF2V morph (fps × seconds, snapped to 4n+1).",
};

export function TierForm({ issues }: TierFormProps): ReactElement {
  const { presetId, params, updateParam } = useRenderRequest();
  const flf2v = isFlf2vMode(presetId, params);

  const errorFor = (key: keyof RenderParams): string | undefined =>
    issues.find((i) => i.field === key && i.severity === "error")?.message;

  return (
    <div className={styles.stack}>
      {TIERS.map((tier) => {
        const fields = fieldsForTier(tier.id);
        if (fields.length === 0) return null;
        return (
          <TierFieldGroup
            key={tier.id}
            title={tier.title}
            description={tier.description}
            defaultCollapsed={tier.defaultCollapsed}
            summary={tierSummary(tier.id, params)}
            badge={tier.defaultCollapsed ? <Badge tone="neutral">advanced</Badge> : undefined}
          >
            <div className={styles.fieldGrid}>
              {tier.id === "perf" && <AttentionSelect />}
              {tier.id === "perf" && <TorchCompileToggle />}
              {fields.map((spec) => {
                const lockReason = flf2v ? FLF2V_LOCKED_FIELDS[spec.key] : undefined;
                return (
                  <FieldControl
                    key={spec.key}
                    spec={spec}
                    value={params[spec.key]}
                    error={errorFor(spec.key)}
                    disabled={lockReason !== undefined}
                    disabledReason={lockReason}
                    onChange={(value) =>
                      updateParam(spec.key, value as RenderParams[typeof spec.key])
                    }
                  />
                );
              })}
            </div>
          </TierFieldGroup>
        );
      })}
    </div>
  );
}
