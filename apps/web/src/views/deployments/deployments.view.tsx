import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { mutate as globalMutate } from "swr";
import type { DeploymentSummary, ModuleSummary } from "../../api/client";
import { ConfirmDialog } from "../../components/base/confirm_dialog";
import { useDeploymentsList, useModules } from "../../hooks/use_api";
import { deleteDeployment } from "../../services/deployments";
import { importDeployment, isExportEnvelope } from "../../services/deployment_transfer";
import { DeploymentsUI, type DeploymentsFilter } from "./deployments.ui";

export function DeploymentsView() {
  const navigate = useNavigate();
  const importInputRef = useRef<HTMLInputElement | null>(null);
  const [filter, setFilter] = useState<DeploymentsFilter>({
    userOnly: false,
    moduleId: null,
  });
  const [pendingDelete, setPendingDelete] = useState<DeploymentSummary | null>(
    null,
  );
  const [deleteBusy, setDeleteBusy] = useState(false);

  const {
    data: deployments,
    error: deploymentsError,
    isLoading: deploymentsLoading,
    mutate: mutateDeployments,
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

  const handleConfirmDelete = useCallback(async () => {
    if (!pendingDelete) return;
    const target = pendingDelete;
    setDeleteBusy(true);
    // Optimistic update — drop the row from the cached list immediately.
    const previous = deployments ?? [];
    const optimistic = previous.filter((d) => d.id !== target.id);
    void mutateDeployments(optimistic, { revalidate: false });
    try {
      await deleteDeployment(target.id);
      toast.success(`Deleted "${target.display_name}"`);
      // Re-validate the list and the per-id detail cache.
      void mutateDeployments();
      void globalMutate(["deployment", target.id]);
      setPendingDelete(null);
    } catch (err) {
      // Restore the optimistic removal on failure.
      void mutateDeployments(previous, { revalidate: false });
      const message =
        err instanceof Error ? err.message : "Failed to delete deployment";
      toast.error(message);
    } finally {
      setDeleteBusy(false);
    }
  }, [deployments, mutateDeployments, pendingDelete]);

  const importBusyRef = useRef(false);
  const handleImportFile = useCallback(
    async (file: File) => {
      if (importBusyRef.current) return;
      importBusyRef.current = true;
      try {
        let envelope: unknown;
        try {
          envelope = JSON.parse(await file.text());
        } catch {
          toast.error("Not a valid JSON file");
          return;
        }
        if (!isExportEnvelope(envelope)) {
          toast.error("File is not a deployment export");
          return;
        }
        const result = await importDeployment(envelope);
        await mutateDeployments();
        toast.success(
          result.diagnostics_count > 0
            ? `Imported with ${result.diagnostics_count} missing dependency(ies)`
            : "Deployment imported",
        );
        navigate(`/deployments/${encodeURIComponent(result.deployment_id)}`);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to import deployment";
        toast.error(message);
      } finally {
        importBusyRef.current = false;
      }
    },
    [mutateDeployments, navigate],
  );

  return (
    <>
      <input
        ref={importInputRef}
        type="file"
        accept="application/json,.json"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) void handleImportFile(file);
        }}
      />
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
        onRequestDelete={setPendingDelete}
        onRequestImport={() => importInputRef.current?.click()}
      />
      <ConfirmDialog
        open={pendingDelete !== null}
        eyebrow="Destructive action"
        title={
          pendingDelete
            ? `Delete "${pendingDelete.display_name}"?`
            : "Delete deployment?"
        }
        description="The deployment will be removed from the list. Its run history and produced artifacts stay in storage but stop being shown alongside this deployment."
        impactLines={[
          "The deployment row disappears from the operator surface.",
          "Past runs and artifacts are kept (no cascade in this step).",
          "Source recipe / workflow stays untouched.",
        ]}
        confirmLabel="Delete deployment"
        destructive
        busy={deleteBusy}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          if (!deleteBusy) setPendingDelete(null);
        }}
      />
    </>
  );
}
