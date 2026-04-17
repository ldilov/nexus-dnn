import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import type { DeploymentSummary, ModuleSummary } from "../../api/client";
import { useDeploymentsList, useModules } from "../../hooks/use_api";
import { DeploymentsUI, type DeploymentsFilter } from "./deployments.ui";

export function DeploymentsView() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<DeploymentsFilter>({
    userOnly: false,
    moduleId: null,
  });

  const {
    data: deployments,
    error: deploymentsError,
    isLoading: deploymentsLoading,
  } = useDeploymentsList();

  const { data: modulesEnvelope } = useModules({ limit: 200 });
  const modules = modulesEnvelope?.modules ?? [];

  const moduleByKey = useMemo(() => {
    const map = new Map<string, ModuleSummary>();
    for (const m of modules) {
      map.set(m.module_id, m);
      if (m.extension_id) map.set(`ext:${m.extension_id}`, m);
    }
    return map;
  }, [modules]);

  const resolveModule = useCallback(
    (d: DeploymentSummary): ModuleSummary | null => {
      if (d.source_extension_id) {
        return moduleByKey.get(`ext:${d.source_extension_id}`) ?? null;
      }
      if (d.source_workflow_id) {
        return moduleByKey.get(`user:${d.source_workflow_id}`) ?? null;
      }
      return null;
    },
    [moduleByKey],
  );

  const items = useMemo(() => {
    if (!deployments) return [] as readonly DeploymentSummary[];
    return deployments.filter((d) => {
      const linked = resolveModule(d);
      if (filter.userOnly && (!linked || linked.source_kind !== "user")) {
        return false;
      }
      if (filter.moduleId && linked?.module_id !== filter.moduleId) {
        return false;
      }
      return true;
    });
  }, [deployments, filter, resolveModule]);

  const handleOpenModule = useCallback(
    (moduleId: string) => {
      navigate(`/modules/${encodeURIComponent(moduleId)}`);
    },
    [navigate],
  );

  const errorMessage =
    deploymentsError instanceof Error
      ? deploymentsError.message
      : deploymentsError
        ? "Failed to load deployments"
        : null;

  return (
    <DeploymentsUI
      items={items}
      modules={modules}
      filter={filter}
      onFilterChange={setFilter}
      resolveModule={resolveModule}
      isLoading={deploymentsLoading}
      errorMessage={errorMessage}
      onOpenDeployment={(id) => navigate(`/deployments/${encodeURIComponent(id)}`)}
      onOpenModule={handleOpenModule}
      onGoToModules={() => navigate("/modules")}
    />
  );
}
