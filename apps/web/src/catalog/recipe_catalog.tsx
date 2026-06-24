import { useMemo, useState } from "react";
import useSWR from "swr";
import {
  fetchExtensions,
  fetchRecipes,
  revealExtensionFolder,
  type Extension,
  type Recipe,
} from "../api/client";
import { CatalogShell } from "./catalog_shell";
import { CatalogControls, type StatusKey } from "./catalog_controls";
import {
  filterByExtensionEnablement,
  groupByExtension,
  type Groupable,
  type WithOrphan,
} from "./catalog_grouping";
import { matchesControls, useCatalogState } from "../hooks/use_catalog_state";
import { SkeletonGrid } from "../components/base/skeleton";
import * as sharedStyles from "./catalog.css";
import * as styles from "./recipe_catalog.css";
import * as shellStyles from "./catalog_shell.css";

type RecipeItem = Recipe & Groupable;

const ICON_BY_CATEGORY: Record<string, string> = {
  LLM: "chat",
  RAG: "auto_stories",
  Vision: "visibility",
  Audio: "graphic_eq",
};

function iconFor(recipe: Recipe): string {
  const byCategory = ICON_BY_CATEGORY[recipe.category];
  if (byCategory) return byCategory;
  if (recipe.id.toLowerCase().includes("chat")) return "chat";
  if (recipe.id.toLowerCase().includes("rag")) return "auto_stories";
  return "bolt";
}

const RECIPE_STATUS_FILTERS: StatusKey[] = [];

/// Compat-status chip driven only by `recipe.status` (healthy|outdated|broken).
/// Healthy renders nothing; the grandfathered id-substring heuristic in
/// `iconFor` is never consulted here.
function StatusBadge({ status }: { status: string }) {
  if (status === "outdated") {
    return (
      <span className={`${styles.statusBadge} ${styles.statusBadgeOutdated}`}>
        <span className={`material-symbols-outlined ${styles.iconSm}`} aria-hidden="true">
          update
        </span>
        Outdated
      </span>
    );
  }
  if (status === "broken") {
    return (
      <span className={`${styles.statusBadge} ${styles.statusBadgeBroken}`}>
        <span className={`material-symbols-outlined ${styles.iconSm}`} aria-hidden="true">
          error
        </span>
        Broken
      </span>
    );
  }
  return null;
}

export interface RecipeCatalogProps {
  onOpenRecipe?: (recipe: Recipe) => void;
}

const EMPTY_RECIPES: RecipeItem[] = [];
const EMPTY_EXTENSIONS: Extension[] = [];

export function RecipeCatalog({ onOpenRecipe }: RecipeCatalogProps) {
  const [revealNotice, setRevealNotice] = useState<string | null>(null);
  const { state: controls, setState: setControls } = useCatalogState("recipes");

  const {
    data: recipes = EMPTY_RECIPES,
    error: recipesError,
    isLoading: recipesLoading,
  } = useSWR<RecipeItem[]>("catalog:recipes", () =>
    fetchRecipes().then((r) => r as RecipeItem[]),
  );
  const {
    data: extensions = EMPTY_EXTENSIONS,
    error: extensionsError,
    isLoading: extensionsLoading,
  } = useSWR<Extension[]>("catalog:extensions", () => fetchExtensions());
  const isInitialLoading =
    (recipesLoading || extensionsLoading) && recipes.length === 0;
  const loadError = recipesError ?? extensionsError;
  const error = loadError
    ? loadError instanceof Error
      ? loadError.message
      : "Failed to load recipes"
    : null;

  const extNameById = useMemo(() => {
    const map = new Map<string, string>();
    for (const ext of extensions) {
      map.set(ext.id, ext.name ?? ext.id);
    }
    return map;
  }, [extensions]);

  const enabled = useMemo(
    () =>
      filterByExtensionEnablement(recipes, extensions, {
        keepUserEditedFromDisabled: false,
      }),
    [recipes, extensions],
  );

  const visible = useMemo(
    () =>
      enabled.filter((recipe) =>
        matchesControls(recipe, controls, (extId) => extNameById.get(extId)),
      ),
    [enabled, controls, extNameById],
  );

  const groups = useMemo(
    () => groupByExtension(visible, extensions),
    [visible, extensions],
  );

  const handleReveal = async (extensionId: string) => {
    try {
      const result = await revealExtensionFolder(extensionId);
      if (!result.revealed && result.path) {
        await navigator.clipboard?.writeText(result.path);
        setRevealNotice(`Path copied to clipboard: ${result.path}`);
      } else {
        setRevealNotice(`Revealed ${extensionId} in file manager`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Could not open extension folder";
      setRevealNotice(msg);
    }
    window.setTimeout(() => setRevealNotice(null), 4000);
  };

  if (error) return <p className={sharedStyles.errorState}>{error}</p>;

  const anyControlsActive =
    controls.query.length > 0 ||
    controls.statusFilters.size > 0 ||
    controls.extensionFilter !== null;

  return (
    <div>
      <CatalogControls
        state={controls}
        onChange={setControls}
        availableExtensions={extensions}
        availableStatuses={RECIPE_STATUS_FILTERS}
        placeholder="Search recipes by name, category, or extension…"
        resultCount={visible.length}
        totalCount={enabled.length}
      />
      {revealNotice ? (
        <div className={`${shellStyles.bannerInfo} ${styles.bannerSpaced}`}>
          {revealNotice}
        </div>
      ) : null}
      {isInitialLoading ? (
        <SkeletonGrid count={6} className={styles.grid} />
      ) : (
        <CatalogShell<WithOrphan<RecipeItem>>
        groups={groups}
        gridClassName={styles.grid}
        emptyTitle={
          anyControlsActive
            ? `No recipes match "${controls.query}"`
            : "No recipes available"
        }
        emptyHint={
          anyControlsActive
            ? "Clear your search or filters to see every recipe."
            : "Install an extension that ships a recipe to populate this list."
        }
        renderGroupAction={(group) => {
          if (group.kind !== "extension" || !group.extension) return null;
          const extId = group.extension.id;
          return (
            <button
              type="button"
              className={shellStyles.revealButton}
              onClick={() => handleReveal(extId)}
              title="Open extension folder"
            >
              <span
                className={`material-symbols-outlined ${styles.iconSm}`}
                aria-hidden="true"
              >
                folder_open
              </span>
              Folder
            </button>
          );
        }}
        renderCard={(recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onSelect={() => onOpenRecipe?.(recipe)}
          />
        )}
        />
      )}
    </div>
  );
}

function RecipeCard({
  recipe,
  onSelect,
}: {
  recipe: WithOrphan<RecipeItem>;
  onSelect: () => void;
}) {
  return (
    <button type="button" className={styles.card} onClick={onSelect}>
      <div className={styles.topRow}>
        <div className={styles.iconBox}>
          <span className={`material-symbols-outlined ${styles.iconCard}`}>
            {iconFor(recipe)}
          </span>
        </div>
        <div className={styles.badgeRow}>
          <StatusBadge status={recipe.status} />
          <span className={styles.categoryBadge}>{recipe.category}</span>
        </div>
      </div>

      <div className={styles.title}>{recipe.display_name}</div>
      <div className={styles.summary}>{recipe.summary}</div>

      <div className={styles.footer}>
        <span className={styles.workflowRef} title={recipe.workflow_template_ref}>
          {recipe.category} · v{recipe.version}
        </span>
        <span className={styles.openHint}>
          Open
          <span className={`material-symbols-outlined ${styles.iconSm}`}>
            arrow_forward
          </span>
        </span>
      </div>
    </button>
  );
}
