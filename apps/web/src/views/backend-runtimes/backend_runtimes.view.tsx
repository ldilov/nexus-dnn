import { useState } from "react";
import useSWR from "swr";
import {
  backendRuntimesFetcher,
  type CatalogEntry,
  type ListParams,
} from "../../services/backend_runtimes_client";
import { BackendRuntimesUI } from "./backend_runtimes.ui";
import { InstallModal } from "./components/install_modal";
import { PipelineProgress } from "./components/pipeline_progress";
import * as css from "./backend_runtimes.css";

const REFRESH_INTERVAL_MS = 10_000;

type InstallFlow =
  | { phase: "idle" }
  | { phase: "picking"; runtime: CatalogEntry }
  | { phase: "running"; runtime: CatalogEntry; installId: string };

/**
 * Smart loader for the spec-032 backend-runtimes catalog page.
 * Orchestrates the install modal + SSE progress stepper when the
 * user clicks Install on a runtime card.
 */
export function BackendRuntimesView() {
  const params: ListParams = {};
  const { data, error, isLoading, mutate } = useSWR<CatalogEntry[]>(
    ["backend-runtimes", params] as const,
    backendRuntimesFetcher,
    { refreshInterval: REFRESH_INTERVAL_MS, revalidateOnFocus: true },
  );
  const [flow, setFlow] = useState<InstallFlow>({ phase: "idle" });

  if (error) {
    return (
      <main className={css.page}>
        <header className={css.header}>
          <h1 className={css.title}>Backend Runtimes</h1>
        </header>
        <div className={css.errorBox}>
          Failed to load backend runtimes:{" "}
          {error instanceof Error ? error.message : "unknown error"}
        </div>
      </main>
    );
  }

  if (isLoading || !data) {
    return (
      <main className={css.page}>
        <header className={css.header}>
          <h1 className={css.title}>Backend Runtimes</h1>
          <p className={css.subtitle}>Loading…</p>
        </header>
      </main>
    );
  }

  return (
    <>
      <BackendRuntimesUI
        runtimes={data}
        onInstall={(runtime) => setFlow({ phase: "picking", runtime })}
      />
      {flow.phase === "picking" && (
        <InstallModal
          runtime={flow.runtime}
          onInstalled={(resp) =>
            setFlow({
              phase: "running",
              runtime: flow.runtime,
              installId: resp.runtime_install_id,
            })
          }
          onClose={() => setFlow({ phase: "idle" })}
        />
      )}
      {flow.phase === "running" && (
        <PipelineProgress
          installId={flow.installId}
          onTerminal={() => {
            // SWR refetch so status chips update if any.
            void mutate();
          }}
          onClose={() => setFlow({ phase: "idle" })}
        />
      )}
    </>
  );
}

export default BackendRuntimesView;
