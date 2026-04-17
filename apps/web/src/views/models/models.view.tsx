import { useMemo } from "react";
import type { HostModelView } from "../../api/client";
import { useHostModels } from "../../hooks/use_api";
import { ModelsUI, type ModelsSummary } from "./models.ui";

export function ModelsView() {
  const { data, error, isLoading } = useHostModels();

  const installs: readonly HostModelView[] = useMemo(
    () => data?.installs ?? [],
    [data],
  );

  const summary = useMemo<ModelsSummary>(() => {
    const byState = new Map<string, number>();
    const families = new Set<string>();
    for (const m of installs) {
      byState.set(m.state, (byState.get(m.state) ?? 0) + 1);
      families.add(m.family);
    }
    return { byState, familyCount: families.size };
  }, [installs]);

  const errorMessage =
    error instanceof Error
      ? error.message
      : error
        ? "Failed to load host models"
        : null;

  return (
    <ModelsUI
      installs={installs}
      summary={summary}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
}
