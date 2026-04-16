import { useCallback, useState } from "react";
import type { ModuleSummary } from "../api/client";
import { ModuleIcon } from "../components/module_icon";
import { BlueprintQuickPick } from "./blueprint_quick_pick";
import * as s from "./module_card.css";

interface ModuleCardProps {
  module: ModuleSummary;
  onOpenDetail: (moduleId: string) => void;
  onOpenBlueprint: (moduleId: string, recipeId?: string) => void;
  onDeployInstance: (moduleId: string, recipeId?: string) => void;
  deploying?: boolean;
}

export function ModuleCard({
  module,
  onOpenDetail,
  onOpenBlueprint,
  onDeployInstance,
  deploying = false,
}: ModuleCardProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const primary = module.blueprints.find((b) => b.is_primary) ?? module.blueprints[0];
  const multi = module.blueprints.length > 1;

  const handleCardClick = useCallback(() => {
    onOpenDetail(module.module_id);
  }, [onOpenDetail, module.module_id]);

  const handleDeploy = useCallback(
    (recipeId?: string) => {
      setPickerOpen(false);
      onDeployInstance(module.module_id, recipeId ?? primary?.recipe_id);
    },
    [onDeployInstance, module.module_id, primary?.recipe_id],
  );

  const handleBlueprint = useCallback(
    (recipeId?: string) => {
      setPickerOpen(false);
      onOpenBlueprint(module.module_id, recipeId ?? primary?.recipe_id);
    },
    [onOpenBlueprint, module.module_id, primary?.recipe_id],
  );

  return (
    <article
      className={s.card}
      role="gridcell"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`Open module ${module.display_name}`}
    >
      <div className={s.head}>
        <ModuleIcon icon={module.icon} size={48} />
        <div className={s.titleBlock}>
          <h3 className={s.title}>{module.display_name}</h3>
          <p className={s.subtitle}>
            {module.version ?? module.source_kind}
            {module.extension_id ? ` · ${module.extension_id}` : ""}
          </p>
        </div>
      </div>

      {module.tags.length > 0 && (
        <div className={s.tagRow}>
          {module.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={s.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className={s.counts} aria-label="Instance counts">
        <span className={s.countItem}>
          <span className="material-symbols-outlined" style={{ fontSize: "14px" }} aria-hidden="true">
            rocket_launch
          </span>
          {module.deployments.total} {/* scan-terminology: allow */}
        </span>
        {multi && (
          <span className={s.countItem}>
            <span className="material-symbols-outlined" style={{ fontSize: "14px" }} aria-hidden="true">
              menu_book
            </span>
            {module.blueprints.length} blueprints
          </span>
        )}
      </div>

      <div
        className={s.actions}
        onClick={(e) => e.stopPropagation()}
        role="group"
        aria-label="Module actions"
      >
        <button
          type="button"
          className={s.secondaryBtn}
          onClick={() => handleBlueprint()}
        >
          View Blueprint
          {multi ? ` (${module.blueprints.length} ▾)` : ""}
        </button>
        <div style={{ display: "flex", flex: 1, position: "relative" }}>
          <button
            type="button"
            className={s.primaryBtn}
            disabled={deploying || module.blueprints.length === 0}
            onClick={() => handleDeploy()}
            style={{ flex: 1, borderTopRightRadius: multi ? 0 : undefined, borderBottomRightRadius: multi ? 0 : undefined }}
          >
            {deploying ? "Deploying…" : "Deploy Instance"} {/* scan-terminology: allow — CTA per FR-012 */}
          </button>
          {multi && (
            <button
              type="button"
              className={s.primaryBtn}
              style={{ flex: 0, padding: "0.5rem 0.5rem", borderLeft: "1px solid currentColor", borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              aria-label="Pick blueprint"
              aria-haspopup="menu"
              aria-expanded={pickerOpen}
              onClick={() => setPickerOpen((o) => !o)}
              disabled={deploying}
            >
              ▾
            </button>
          )}
          {pickerOpen && multi && (
            <BlueprintQuickPick
              blueprints={module.blueprints}
              onSelect={handleDeploy}
              onClose={() => setPickerOpen(false)}
            />
          )}
        </div>
      </div>
    </article>
  );
}

interface BlankModuleCardProps {
  onStart: () => void;
}

export function BlankModuleCard({ onStart }: BlankModuleCardProps) {
  return (
    <article
      className={`${s.card} ${s.blankCard}`}
      role="gridcell"
      tabIndex={0}
      onClick={onStart}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onStart();
        }
      }}
      aria-label="Start building a blank module"
    >
      <div className={s.head}>
        <ModuleIcon
          icon={{ kind: "symbol", value: "add_box" }}
          size={48}
        />
        <div className={s.titleBlock}>
          <h3 className={s.title}>Blank Module</h3>
          <p className={s.subtitle}>Start from an empty workflow</p>
        </div>
      </div>
      <div className={s.actions}>
        <button type="button" className={s.primaryBtn} onClick={onStart}>
          Start Building
        </button>
      </div>
    </article>
  );
}
