import type { ValidationError } from "../../../../hooks/use_workflow_editor";
import * as styles from "./graph_toolbar.css";

export type GraphToolbarProps = {
  dirty: boolean;
  saving: boolean;
  errors: ValidationError[];
  userEditedAt: string | null;
  editable: boolean;
  onSave: () => void;
  onRevert: () => void;
  onToggleEdit: () => void;
  onAddOperator?: () => void;
};

export function GraphToolbar({
  dirty,
  saving,
  errors,
  userEditedAt,
  editable,
  onSave,
  onRevert,
  onToggleEdit,
  onAddOperator,
}: GraphToolbarProps) {
  const valid = errors.length === 0;
  const canSave = editable && dirty && valid && !saving;
  return (
    <>
      <div className={styles.container}>
        <button type="button" className={styles.button} onClick={onToggleEdit}>
          {editable ? "View" : "Edit"}
        </button>
        {editable && onAddOperator && (
          <button type="button" className={styles.button} onClick={onAddOperator}>
            + Node
          </button>
        )}
        {editable && dirty && <span className={styles.chipDirty}>● Dirty</span>}
        {userEditedAt && <span className={styles.chipEdited}>✎ Edited</span>}
        {editable &&
          (valid ? (
            <span className={styles.chipValid}>✓ Valid</span>
          ) : (
            <span className={styles.chipInvalid}>✕ {errors.length}</span>
          ))}
        {editable && (
          <button
            type="button"
            className={styles.button}
            onClick={onRevert}
            disabled={!userEditedAt && !dirty}
          >
            Revert
          </button>
        )}
        {editable && (
          <button
            type="button"
            className={styles.saveButton}
            onClick={onSave}
            disabled={!canSave}
          >
            {saving ? "Saving…" : "Save"}
          </button>
        )}
      </div>
      {editable && errors.length > 0 && (
        <div className={styles.errorPanel}>
          {errors.map((e, i) => (
            <div key={i}>
              {e.nodeId ? `· ${e.nodeId}: ` : "· "}
              {e.message}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
