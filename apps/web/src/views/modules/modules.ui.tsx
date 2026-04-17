import type { ModuleSummary } from "../../api/client";
import { InstallExtensionDrawer } from "../../install/install_extension_drawer";
import { BlankModuleCard, ModuleCard } from "./module_card";
import * as s from "./modules.css";

export type KindFilter = "all" | "extension" | "user";

export type ModulesViewState =
  | { kind: "loading" }
  | { kind: "ready"; modules: readonly ModuleSummary[]; total: number }
  | { kind: "error"; message: string };

export interface ModulesUIProps {
  state: ModulesViewState;
  search: string;
  onSearchChange: (value: string) => void;
  kind: KindFilter;
  onKindChange: (kind: KindFilter) => void;
  extensionModules: ModuleSummary[];
  userModules: ModuleSummary[];
  deployingId: string | null;
  onOpenDetail: (moduleId: string) => void;
  onOpenBlueprint: (moduleId: string, recipeId?: string) => void;
  onDeploy: (moduleId: string, recipeId?: string) => void;
  onBlank: () => void;
  installerOpen: boolean;
  onOpenInstaller: () => void;
  onCloseInstaller: () => void;
  onInstalled: () => void;
}

export function ModulesUI({
  state,
  search,
  onSearchChange,
  kind,
  onKindChange,
  extensionModules,
  userModules,
  deployingId,
  onOpenDetail,
  onOpenBlueprint,
  onDeploy,
  onBlank,
  installerOpen,
  onOpenInstaller,
  onCloseInstaller,
  onInstalled,
}: ModulesUIProps) {
  return (
    <div className={s.root}>
      <header className={s.header}>
        <div className={s.titleBlock}>
          <h1 className={s.title}>Modules</h1>
          <p className={s.subtitle}>
            One card per extension or user-authored flow. Click a card for
            detail, "View Blueprint" to inspect recipes, or "Deploy Instance" to
            create a live Deployment.
          </p>
        </div>
        <div className={s.controls}>
          <input
            type="search"
            placeholder="Search modules, tags, extensions…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
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
                onClick={() => onKindChange(k)}
              >
                {k === "all" ? "All" : k === "extension" ? "Extensions" : "User"}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={s.secondaryCta}
            onClick={onOpenInstaller}
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
              <div className={s.grid} role="grid" aria-label="Modules">
                {extensionModules.map((module) => (
                  <ModuleCard
                    key={module.module_id}
                    module={module}
                    onOpenDetail={onOpenDetail}
                    onOpenBlueprint={onOpenBlueprint}
                    onDeployInstance={onDeploy}
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
              <div className={s.grid} role="grid" aria-label="Modules">
                <BlankModuleCard onStart={onBlank} />
                {userModules.map((module) => (
                  <ModuleCard
                    key={module.module_id}
                    module={module}
                    onOpenDetail={onOpenDetail}
                    onOpenBlueprint={onOpenBlueprint}
                    onDeployInstance={onDeploy}
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
        onClose={onCloseInstaller}
        onInstalled={onInstalled}
      />
    </div>
  );
}
