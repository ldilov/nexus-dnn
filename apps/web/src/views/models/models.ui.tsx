import type { HostModelView } from "../../api/client";
import { HfSearchPanel } from "../../models/hf_search_panel";
import { ModelCard } from "./components/model_card";
import * as s from "./models.css";

export interface ModelsSummary {
  byState: Map<string, number>;
  familyCount: number;
}

export interface ModelsUIProps {
  installs: readonly HostModelView[];
  summary: ModelsSummary;
  isLoading: boolean;
  errorMessage: string | null;
}

export function ModelsUI({ installs, summary, isLoading, errorMessage }: ModelsUIProps) {
  return (
    <div className={s.root}>
      <header className={s.header}>
        <h1 className={s.title}>Models</h1>
        <p className={s.subtitle}>
          Host-managed model store. Installs are shared across every extension
          that declares a compatible model dependency — no more per-extension
          duplication.
        </p>
        {installs.length > 0 && (
          <div className={s.summary}>
            <span className={s.chip}>{installs.length} installed</span>
            <span className={s.chip}>{summary.familyCount} families</span>
            {[...summary.byState.entries()].map(([state, n]) => (
              <span key={state} className={s.chip}>
                {state}: {n}
              </span>
            ))}
          </div>
        )}
      </header>

      {isLoading && <p className={s.subtitle}>Loading installed models…</p>}

      {errorMessage && (
        <div className={s.errorBox} role="alert">
          {errorMessage}
        </div>
      )}

      {!isLoading && !errorMessage && installs.length === 0 && (
        <div className={s.empty}>
          <span className={`material-symbols-outlined ${s.emptyIcon}`}>
            model_training
          </span>
          <div>
            No host-managed models installed yet. Search Hugging Face below to
            add one.
          </div>
        </div>
      )}

      {installs.length > 0 && (
        <div className={s.grid}>
          {installs.map((m) => (
            <ModelCard key={m.install_id} model={m} />
          ))}
        </div>
      )}

      <HfSearchPanel />
    </div>
  );
}
