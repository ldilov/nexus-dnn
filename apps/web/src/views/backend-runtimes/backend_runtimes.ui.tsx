import {
  groupByExtension,
  type CatalogEntry,
} from "../../services/backend_runtimes_client";
import { RuntimeCard } from "./components/runtime_card";
import { PageHero } from "../../components/base/page_hero";
import * as css from "./backend_runtimes.css";

interface Props {
  runtimes: CatalogEntry[];
  onInstall?: (runtime: CatalogEntry) => void;
}

export function BackendRuntimesUI({ runtimes, onInstall }: Props) {
  if (runtimes.length === 0) {
    return (
      <main className={css.page}>
        <PageHero
          eyebrow="Operator surface · Runtime catalog"
          title="Backend runtimes"
          meta={<span>Inference runtimes contributed by activated extensions.</span>}
        />
        <div className={css.empty}>
          No backend runtimes are currently contributed. Activate an extension
          that declares a <code>backend_runtimes</code> entry.
        </div>
      </main>
    );
  }

  const groups = groupByExtension(runtimes);
  const runtimeWord = runtimes.length === 1 ? "runtime" : "runtimes";
  const extWord = groups.length === 1 ? "extension" : "extensions";

  return (
    <main className={css.page}>
      <PageHero
        eyebrow="Operator surface · Runtime catalog"
        title="Backend runtimes"
        meta={
          <span>
            {runtimes.length} {runtimeWord} from {groups.length} {extWord}.
          </span>
        }
      />

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
