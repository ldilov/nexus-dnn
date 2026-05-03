import type { CatalogEntry, ImplementationStatus } from "../../../services/backend_runtimes_client";
import * as css from "../backend_runtimes.css";
import { InstallActions } from "./install_actions";

const STATUS_CLASSES: Record<ImplementationStatus, string> = {
  available: css.statusAvailable,
  unavailable: css.statusUnavailable,
  deprecated: css.statusDeprecated,
  abandoned: css.statusAbandoned,
};

interface Props {
  runtime: CatalogEntry;
  /** Renders only when provided and the runtime is `available`. */
  onInstall?: (runtime: CatalogEntry) => void;
}

export function RuntimeCard({ runtime, onInstall }: Props) {
  return (
    <article className={css.card} data-runtime-id={runtime.runtime_id}>
      <header className={css.cardHeader}>
        <div>
          <div className={css.runtimeName}>{runtime.display_name}</div>
          <div className={css.runtimeFamily}>{runtime.runtime_family}</div>
        </div>
        <span
          className={`${css.statusBadge} ${STATUS_CLASSES[runtime.implementation_status]}`}
        >
          {runtime.implementation_status}
        </span>
      </header>

      {runtime.capability_tags.length > 0 && (
        <div className={css.pillRow} aria-label="capability tags">
          {runtime.capability_tags.map((tag) => (
            <span key={tag} className={css.pill}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {runtime.supported_roles.length > 0 && (
        <div className={css.pillRow} aria-label="supported roles">
          {runtime.supported_roles.map((role) => (
            <span key={role} className={css.pill}>
              role: {role}
            </span>
          ))}
        </div>
      )}

      <InstallActions runtimeId={runtime.runtime_id} />

      {onInstall && runtime.implementation_status === "available" && (
        <div className={css.actionsRow}>
          <button
            type="button"
            className={`${css.actionButton} ${css.actionButtonPrimary}`}
            onClick={() => onInstall(runtime)}
          >
            Install
          </button>
        </div>
      )}
    </article>
  );
}
