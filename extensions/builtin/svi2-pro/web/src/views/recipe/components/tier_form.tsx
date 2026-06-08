import type { ReactElement } from "react";
import { FieldControl } from "../../../components/form/field_control";
import { TierFieldGroup } from "../../../components/primitives/tier_field_group";
import { Badge } from "../../../components/ui/badge";
import { TIERS, fieldsForTier } from "../../../domain/fields";
import type { ValidationIssue } from "../../../domain/validation";
import { useRenderRequest } from "../../../store/render_request_store";
import type { RenderParams } from "../../../services/types";
import * as styles from "./tier_form.css";

interface TierFormProps {
  issues: ValidationIssue[];
}

export function TierForm({ issues }: TierFormProps): ReactElement {
  const { params, updateParam } = useRenderRequest();

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
            badge={tier.defaultCollapsed ? <Badge tone="neutral">advanced</Badge> : undefined}
          >
            <div className={styles.fieldGrid}>
              {fields.map((spec) => (
                <FieldControl
                  key={spec.key}
                  spec={spec}
                  value={params[spec.key]}
                  error={errorFor(spec.key)}
                  onChange={(value) => updateParam(spec.key, value as RenderParams[typeof spec.key])}
                />
              ))}
            </div>
          </TierFieldGroup>
        );
      })}
    </div>
  );
}
