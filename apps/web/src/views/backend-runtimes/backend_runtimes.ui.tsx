import {
  groupByExtension,
  type CatalogEntry,
} from "../../services/backend_runtimes_client";
import { RuntimeCard } from "./components/runtime_card";
import * as css from "./backend_runtimes.css";

interface Props {
  runtimes: CatalogEntry[];
  onInstall?: (runtime: CatalogEntry) => void;
}

/**
 * Dumb presentational layer. Receives the already-fetched runtimes and
 * groups them by `source_extension_id`. Zero hardcoded extension ids
 * (FR-080) — the extension id surfaces only as a group header label.
 */
export function BackendRuntimesUI({ runtimes, onInstall }: Props) {
  if (runtimes.length === 0) {
    return (
      <main className={css.page}>
        <header className={css.header}>
          <h1 className={css.title}>Backend Runtimes</h1>
          <p className={css.subtitle}>
            Inference runtimes contributed by activated extensions.
          </p>
        </header>
        <div className={css.empty}>
          No backend runtimes are currently contributed. Activate an extension
          that declares a <code>backend_runtimes</code> entry.
        </div>
      </main>
    );
  }

  const groups = groupByExtension(runtimes);

  return (
    <main className={css.page}>
      <header className={css.header}>
        <h1 className={css.title}>Backend Runtimes</h1>
        <p className={css.subtitle}>
          {runtimes.length} runtime{runtimes.length === 1 ? "" : "s"} from{" "}
          {groups.length} extension{groups.length === 1 ? "" : "s"}.
        </p>
      </header>

      {groups.map((group) => (
        <section key={group.extension_id} className={css.groupSection}>
          <div className={css.groupHeader}>{group.extension_id}</div>
          <div className={css.grid}>
            {group.runtimes.map((r) => (
              <RuntimeCard key={r.runtime_id} runtime={r} onInstall={onInstall} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
