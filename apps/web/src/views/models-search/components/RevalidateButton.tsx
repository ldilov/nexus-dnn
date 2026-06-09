import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../../components/base/button";
import { revalidateHostModels } from "../../../services/model_store";

export interface RevalidateButtonProps {
  onRevalidated: () => void;
}

function pruneSummary(checked: number, pruned: number): string {
  const checkedLabel = checked === 1 ? "1 record" : `${checked} records`;
  if (pruned === 0) return `${checkedLabel} checked · all present`;
  const prunedLabel = pruned === 1 ? "1 stale record" : `${pruned} stale records`;
  return `${checkedLabel} checked · pruned ${prunedLabel}`;
}

/**
 * Foundry control (spec 054 G2.3): sweeps the install-map, prunes rows whose
 * on-disk files vanished, toasts `{ checked, pruned }`, then refreshes the
 * model list via `onRevalidated`.
 */
export function RevalidateButton({ onRevalidated }: RevalidateButtonProps) {
  const [busy, setBusy] = useState(false);

  const onClick = useCallback(async () => {
    setBusy(true);
    try {
      const report = await revalidateHostModels();
      toast.success("Revalidated installed models", {
        description: pruneSummary(report.checked, report.pruned),
      });
      onRevalidated();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Revalidate failed";
      toast.error(message);
    } finally {
      setBusy(false);
    }
  }, [onRevalidated]);

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      loading={busy}
      onClick={onClick}
    >
      <span className="material-symbols-outlined" aria-hidden="true">
        cached
      </span>
      Revalidate
    </Button>
  );
}
