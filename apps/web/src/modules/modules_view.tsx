import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  deployFromModule,
  fetchModules,
  type ModuleSummary,
} from "../api/client";
import { InstallExtensionDrawer } from "../install/install_extension_drawer";
import { BlankModuleCard, ModuleCard } from "./module_card";
import { mintDraftUuid } from "./draft/draft_uuid";
import * as s from "./modules_view.css";

type KindFilter = "all" | "extension" | "user";

type ViewState =
  | { kind: "loading" }
  | { kind: "ready"; modules: readonly ModuleSummary[]; total: number }
  | { kind: "error"; message: string };

export function ModulesView() {
  const navigate = useNavigate();
  const [state, setState] = useState<ViewState>({ kind: "loading" });
  const [search, setSearch] = useState("");
  const [kind, setKind] = useState<KindFilter>("all");
  const [deployingId, setDeployingId] = useState<string | null>(null);
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
    async (moduleId: string, recipeId?: string) => {
      setDeployingId(moduleId);
      try {
        const result = await deployFromModule(moduleId, {
          recipe_id: recipeId,
        });
        navigate(`/deployments/${encodeURIComponent(result.deployment_id)}`);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Deploy failed";
        setState((prev) =>
          prev.kind === "ready" ? prev : { kind: "error", message },
        );
        console.error("[modules] deploy failed", err);
      } finally {
        setDeployingId(null);
      }
    },
    [navigate],
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
    <div className={s.root}>
      <header className={s.header}>
        <div className={s.titleBlock}>
          <h1 className={s.title}>Modules</h1>
          <p className={s.subtitle}>
            One card per extension or user-authored flow. Click a card for
            detail, "View Blueprint" to inspect recipes, or "Deploy Instance" to
            create a live {/* scan-terminology: allow */} Deployment.
          </p>
        </div>
        <div className={s.controls}>
          <input
            type="search"
            placeholder="Search modules, tags, extensions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={s.search}
            aria-label="Search modules"
          />
          <div
            className={s.facetGroup}
            role="group"
            aria-label="Module kind filter"
          >
            {(["all", "extension", "user"] as const).map((k) => (
              <button
                key={k}
                type="button"
                className={s.facetBtn}
                aria-pressed={kind === k}
                onClick={() => setKind(k)}
              >
                {k === "all" ? "All" : k === "extension" ? "Extensions" : "User"}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={s.secondaryCta}
            onClick={() => setInstallerOpen(true)}
          >
            + Install Extension
          </button>
        </div>
      </header>

      {state.kind === "loading" && (
        <div className={s.empty}>Loading modules…</div>
      )}

      {state.kind === "error" && (
        <div className={s.errorBox} role="alert">
          {state.message}
        </div>
      )}

      {state.kind === "ready" && (
        <>
          {extensionModules.length > 0 && (
            <>
              <h2 className={s.sectionHeader}>
                Extension modules ({extensionModules.length})
              </h2>
              <div
                className={s.grid}
                role="grid"
                aria-label="Modules"
              >
                {extensionModules.map((module) => (
                  <ModuleCard
                    key={module.module_id}
                    module={module}
                    onOpenDetail={handleOpenDetail}
                    onOpenBlueprint={handleOpenBlueprint}
                    onDeployInstance={handleDeploy}
                    deploying={deployingId === module.module_id}
                  />
                ))}
              </div>
            </>
          )}

          {(userModules.length > 0 || kind !== "extension") && (
            <>
              <h2 className={s.sectionHeader}>
                User modules ({userModules.length})
              </h2>
              <div
                className={s.grid}
                role="grid"
                aria-label="Modules"
              >
                <BlankModuleCard onStart={handleBlank} />
                {userModules.map((module) => (
                  <ModuleCard
                    key={module.module_id}
                    module={module}
                    onOpenDetail={handleOpenDetail}
                    onOpenBlueprint={handleOpenBlueprint}
                    onDeployInstance={handleDeploy}
                    deploying={deployingId === module.module_id}
                  />
                ))}
              </div>
            </>
          )}

          {extensionModules.length === 0 && userModules.length === 0 && (
            <div className={s.empty}>
              No modules match your search. Install an extension or start a
              blank module to begin.
            </div>
          )}
        </>
      )}

      <InstallExtensionDrawer
        open={installerOpen}
        onClose={() => setInstallerOpen(false)}
        onInstalled={() => load()}
      />
    </div>
  );
}
