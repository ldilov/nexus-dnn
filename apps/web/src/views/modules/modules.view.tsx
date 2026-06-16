import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { deployFromModule, fetchModules } from "../../api/client";
import { mintDraftUuid } from "./draft/draft_uuid";
import { ModulesUI, type KindFilter, type ModulesViewState } from "./modules.ui";
import { DeployNameDialog } from "./deploy_name_dialog";

interface DeployTarget {
  moduleId: string;
  recipeId?: string;
  suggestedName: string;
}

export function ModulesView() {
  const navigate = useNavigate();
  const [state, setState] = useState<ModulesViewState>({ kind: "loading" });
  const [search, setSearch] = useState("");
  const [kind, setKind] = useState<KindFilter>("all");
  const [deployingId, setDeployingId] = useState<string | null>(null);
  const [deployTarget, setDeployTarget] = useState<DeployTarget | null>(null);
  const [installerOpen, setInstallerOpen] = useState(false);

  const load = useCallback(() => {
    setState({ kind: "loading" });
    fetchModules({ kind, q: search.trim() || undefined, limit: 200 })
      .then((env) =>
        setState({ kind: "ready", modules: env.modules, total: env.total }),
      )
      .catch((err: unknown) =>
        setState({
          kind: "error",
          message: err instanceof Error ? err.message : "Failed to load modules",
        }),
      );
  }, [kind, search]);

  useEffect(() => {
    load();
  }, [load]);

  const handleOpenDetail = useCallback(
    (moduleId: string) => {
      navigate(`/modules/${encodeURIComponent(moduleId)}`);
    },
    [navigate],
  );

  const handleOpenBlueprint = useCallback(
    (moduleId: string, recipeId?: string) => {
      const qs = recipeId ? `?recipe_id=${encodeURIComponent(recipeId)}` : "";
      navigate(`/modules/${encodeURIComponent(moduleId)}/blueprint${qs}`);
    },
    [navigate],
  );

  const handleDeploy = useCallback(
    (moduleId: string, recipeId?: string, suggestedName?: string) => {
      setDeployTarget({ moduleId, recipeId, suggestedName: suggestedName ?? "" });
    },
    [],
  );

  const confirmDeploy = useCallback(
    async (name: string) => {
      if (!deployTarget) return;
      const { moduleId, recipeId } = deployTarget;
      setDeployingId(moduleId);
      try {
        const result = await deployFromModule(moduleId, {
          recipe_id: recipeId,
          display_name: name.trim() || undefined,
        });
        navigate(`/deployments/${encodeURIComponent(result.deployment_id)}`);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Deploy failed";
        setState((prev) =>
          prev.kind === "ready" ? prev : { kind: "error", message },
        );
      } finally {
        setDeployingId(null);
        setDeployTarget(null);
      }
    },
    [deployTarget, navigate],
  );

  const handleBlank = useCallback(() => {
    const uuid = mintDraftUuid();
    navigate(`/modules/user:blank/draft/${uuid}`);
  }, [navigate]);

  const { extensionModules, userModules } = useMemo(() => {
    if (state.kind !== "ready") {
      return { extensionModules: [], userModules: [] };
    }
    const extensionModules = state.modules.filter(
      (m) => m.source_kind === "extension",
    );
    const userModules = state.modules.filter((m) => m.source_kind === "user");
    return { extensionModules, userModules };
  }, [state]);

  return (
    <>
      <ModulesUI
        state={state}
        search={search}
        onSearchChange={setSearch}
        kind={kind}
        onKindChange={setKind}
        extensionModules={extensionModules}
        userModules={userModules}
        deployingId={deployingId}
        onOpenDetail={handleOpenDetail}
        onOpenBlueprint={handleOpenBlueprint}
        onDeploy={handleDeploy}
        onBlank={handleBlank}
        installerOpen={installerOpen}
        onOpenInstaller={() => setInstallerOpen(true)}
        onCloseInstaller={() => setInstallerOpen(false)}
        onInstalled={() => load()}
      />
      <DeployNameDialog
        open={deployTarget !== null}
        defaultName={deployTarget?.suggestedName ?? ""}
        busy={deployingId !== null}
        onConfirm={confirmDeploy}
        onCancel={() => setDeployTarget(null)}
      />
    </>
  );
}
