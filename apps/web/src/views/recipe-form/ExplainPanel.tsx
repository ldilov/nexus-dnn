import type { ReactElement } from "react";
import type { PresetExplanationDto } from "../../api/generated/PresetExplanationDto";
import * as styles from "./explain_panel.css";

export interface ExplainPanelProps {
  explanation: PresetExplanationDto;
}

function stringifyValue(value: unknown): string {
  return typeof value === "string" ? value : JSON.stringify(value);
}

/**
 * Read-only "what this preset changes" panel. Lists each control the preset
 * supplies — its label, resolved final value, and fan-out target paths.
 * Generic: target strings are server-provided data, echoed verbatim.
 */
export function ExplainPanel({ explanation }: ExplainPanelProps): ReactElement {
  const { entries } = explanation;

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>What this preset changes</h3>
      {entries.length === 0 ? (
        <div data-testid="explain-empty" className={styles.emptyState}>
          This preset changes no controls.
        </div>
      ) : (
        <ul className={styles.entryList}>
          {entries.map((entry) => (
            <li
              key={entry.control_id}
              data-testid="explain-entry"
              className={styles.entryItem}
            >
              <div className={styles.entryHeader}>
                <span className={styles.entryLabel}>{entry.label}</span>
                <span className={styles.entryValue}>
                  {stringifyValue(entry.final_value)}
                </span>
              </div>
              {entry.targets.length > 0 && (
                <div data-testid="explain-targets" className={styles.targetList}>
                  {entry.targets.map((target) => (
                    <span key={target} className={styles.targetTag}>
                      {target}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
