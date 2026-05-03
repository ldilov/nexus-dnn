import type { ModuleSummary } from "../../api/client";
import { InstallExtensionDrawer } from "../../components/install/install_extension_drawer";
import { PageHero } from "../../components/base/page_hero";
import { Pill } from "../../components/base/pill";
import { Section } from "../../components/base/section";
import { EmptyState } from "../../components/layout/empty_state";
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
      <PageHero
        eyebrow="Authoring surface · Module catalog"
        title="Modules"
        meta={
          <span>
            One card per extension or user-authored flow. Open detail, inspect blueprints,
            or deploy a live instance.
          </span>
        }
        actions={
          <button type="button" className={s.secondaryCta} onClick={onOpenInstaller}>
            + Install Extension
          </button>
        }
      />

      <div className={s.controls}>
        <input
          type="search"
          placeholder="Search modules, tags, extensions…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className={s.search}
          aria-label="Search modules"
        />
        <div className={s.facetGroup} role="toolbar" aria-label="Module kind filter">
          {(["all", "extension", "user"] as const).map((k) => (
            <Pill
              key={k}
              active={kind === k}
              onClick={() => onKindChange(k)}
            >
              {k === "all" ? "All" : k === "extension" ? "Extensions" : "User"}
            </Pill>
          ))}
        </div>
      </div>

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
            <Section number="01" title={`Extension modules (${extensionModules.length})`}>
              <div className={s.grid} role="grid" aria-label="Extension modules">
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
            </Section>
          )}

          {(userModules.length > 0 || kind !== "extension") && (
            <Section number="02" title={`User modules (${userModules.length})`}>
              <div className={s.grid} role="grid" aria-label="User modules">
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
            </Section>
          )}

          {extensionModules.length === 0 && userModules.length === 0 && (
            <EmptyState
              count="0"
              line="No modules match your search. Install an extension or start a blank module to begin."
              primaryAction={{ label: "Start blank module", onClick: onBlank }}
            />
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
