/**
 * Spec 035 — Overview tab.
 *
 * Manifest summary card. Pure presentational; data flows from the parent view.
 */
import type { ExtensionDto } from "../../../api/generated/ExtensionDto";
import * as s from "./overview.tab.css";

export interface OverviewTabProps {
  extension: ExtensionDto;
}

export function OverviewTab({ extension }: OverviewTabProps) {
  const displayName = extension.name ?? extension.id;
  const initials =
    displayName
      .replace(/[^a-zA-Z]+/g, " ")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("") || "·";

  return (
    <div className={s.root}>
      <article className={s.summaryCard}>
        <div className={s.cardHead}>
          <div className={s.iconTile} aria-hidden="true">
            {initials}
          </div>
          <div className={s.headText}>
            <h2 className={s.title}>{displayName}</h2>
            <span className={s.meta}>
              v{extension.version}
              {extension.publisher ? ` · ${extension.publisher}` : ""}
              {extension.source ? ` · ${extension.source}` : ""}
            </span>
          </div>
        </div>

        {extension.description && (
          <p className={s.description}>{extension.description}</p>
        )}

        <div className={s.statsRow}>
          <div className={s.stat}>
            <span className={s.statLabel}>Status</span>
            <span className={s.statValue}>{extension.status}</span>
          </div>
          <div className={s.stat}>
            <span className={s.statLabel}>Runtime</span>
            <span className={s.statValue}>{extension.runtime_family}</span>
          </div>
          <div className={s.stat}>
            <span className={s.statLabel}>Recipes</span>
            <span className={s.statValue}>{extension.recipe_count ?? 0}</span>
          </div>
          <div className={s.stat}>
            <span className={s.statLabel}>UI contributions</span>
            <span className={s.statValue}>{extension.ui_contribution_count ?? 0}</span>
          </div>
        </div>

        {extension.capabilities.length > 0 && (
          <div>
            // audit-allow: px — px — below minimum token granularity (sub-10px)
            <span className={s.statLabel} style={{ display: "block", marginBottom: "8px" }}>
              Capabilities
            </span>
            <div className={s.capabilities}>
              {extension.capabilities.map((cap) => (
                <span key={cap} className={s.capabilityChip}>
                  {cap}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
