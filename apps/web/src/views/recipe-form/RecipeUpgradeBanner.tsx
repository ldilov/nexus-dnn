import { useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import {
  exportRecipeBundle,
  fetchRecipeUpgradePreview,
  importRecipeBundle,
  upgradeRecipe,
} from "../../api/client";
import type { RecipePinDiffDto } from "../../api/generated/RecipePinDiffDto";
import type { RecipeUpgradeResultDto } from "../../api/generated/RecipeUpgradeResultDto";
import * as s from "./recipe_upgrade_banner.css";

interface RecipeUpgradeBannerProps {
  recipeId: string;
}

/**
 * Surfaces the recipe's pinned-vs-current upgrade preview (FR-7). Leads with the
 * risk summary, lists the bindings that would break, and offers a migration copy
 * plus bundle export/import. Renders nothing when the recipe is already current.
 * The pinned-snapshot graph (OR-4) is shown by `RecipePinnedGraph` inside the
 * recipe form, so this banner does not duplicate it.
 */
export function RecipeUpgradeBanner({ recipeId }: RecipeUpgradeBannerProps) {
  const { data } = useSWR<RecipePinDiffDto>(`recipe-upgrade:${recipeId}`, () =>
    fetchRecipeUpgradePreview(recipeId),
  );
  const [result, setResult] = useState<RecipeUpgradeResultDto | null>(null);
  const [busy, setBusy] = useState(false);

  if (!data || data.risk === "safe") return null;

  const breaking = data.risk === "breaking";
  const riskLabel = breaking ? "Breaking" : "Outdated";

  const handleUpgrade = async () => {
    setBusy(true);
    try {
      const res = await upgradeRecipe(recipeId);
      setResult(res);
      if (res.new_recipe_id) {
        toast.success("Upgraded copy created", { description: res.new_recipe_id });
      } else {
        toast.error("Upgrade would break bindings — no copy created");
      }
    } catch (err: unknown) {
      toast.error("Upgrade failed", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setBusy(false);
    }
  };

  const handleExport = async () => {
    try {
      const bundle = await exportRecipeBundle(recipeId);
      downloadJson(bundle, `${recipeId}.recipe-bundle.json`);
    } catch (err: unknown) {
      toast.error("Export failed", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    }
  };

  const handleImport = async (file: File) => {
    try {
      const bundle = JSON.parse(await file.text());
      const res = await importRecipeBundle(bundle);
      toast.success("Recipe imported", { description: res.recipe_id });
    } catch (err: unknown) {
      toast.error("Import failed", {
        description: err instanceof Error ? err.message : "Invalid bundle file",
      });
    }
  };

  return (
    <div className={s.banner} role="status">
      <div className={s.head}>
        <span className={breaking ? s.riskBreaking : s.riskOutdated}>{riskLabel}</span>
        <span className={s.lead}>
          {breaking
            ? "Re-pinning to the current workflow version would break this recipe."
            : `A newer workflow version (${data.current_version}) is available. Pinned to ${data.pinned_version}.`}
        </span>
      </div>

      {data.broken_bindings.length > 0 && (
        <ul className={s.list}>
          {data.broken_bindings.map((b) => (
            <li key={`${b.control_id}:${b.target}`}>
              {b.control_id} → {b.target}: {b.reason}
            </li>
          ))}
        </ul>
      )}

      <div className={s.actions}>
        <button
          type="button"
          className={s.primary}
          onClick={handleUpgrade}
          disabled={busy}
        >
          {busy ? "Upgrading…" : "Upgrade (create a copy)"}
        </button>
        <button type="button" className={s.secondary} onClick={handleExport}>
          Export bundle
        </button>
        <label className={s.importLabel}>
          Import bundle
          <input
            type="file"
            accept="application/json"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleImport(file);
            }}
          />
        </label>
      </div>

      {result?.new_recipe_id && (
        <p className={s.note}>Created upgraded copy: {result.new_recipe_id}</p>
      )}
      {result && !result.new_recipe_id && result.broken_bindings.length > 0 && (
        <p className={s.note}>
          Cannot auto-upgrade — {result.broken_bindings.length} binding(s) still break.
        </p>
      )}
    </div>
  );
}

function downloadJson(value: unknown, filename: string): void {
  if (typeof URL?.createObjectURL !== "function") return;
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
