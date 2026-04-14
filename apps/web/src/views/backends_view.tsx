import { Suspense, use, useState } from "react";
import { BackendCard } from "../backends/backend_card";
import type { BackendListResponse, BackendSummary } from "../backends/types";
import * as css from "./backends_view.css";

async function fetchBackends(baseUrl: string): Promise<BackendListResponse> {
  const res = await fetch(`${baseUrl}/api/v1/llm/backends`);
  if (!res.ok) {
    throw new Error(`backends list failed: ${res.status}`);
  }
  const json = (await res.json()) as { data: BackendListResponse };
  return json.data;
}

function noop(_b: BackendSummary) {
  /* handlers wired by parent view in a follow-up slice */
}

interface ListProps {
  resource: Promise<BackendListResponse>;
}

function BackendsList({ resource }: ListProps) {
  const data = use(resource);
  return (
    <>
      <div className={css.chips} data-testid="backends-summary-chips">
        <span data-testid="chip-installed">Installed runtimes: {data.summary.installed}</span>
        <span data-testid="chip-validated">Validated: {data.summary.validated}</span>
        <span data-testid="chip-issues">Issues: {data.summary.issues}</span>
      </div>
      <div className={css.grid}>
        {data.backends.map((b) => (
          <BackendCard
            key={b.id}
            backend={b}
            onInstall={noop}
            onValidate={noop}
            onRepair={noop}
            onOpenSettings={noop}
            onOpenDiagnostics={noop}
            onViewDetails={noop}
          />
        ))}
      </div>
    </>
  );
}

interface Props {
  baseUrl?: string;
}

export function BackendsView({ baseUrl = "" }: Props) {
  const [resource] = useState(() => fetchBackends(baseUrl));
  return (
    <main className={css.page}>
      <header className={css.header}>
        <div className={css.title}>Backends</div>
        <div className={css.subtitle}>Install and configure local inference runtimes</div>
      </header>
      <Suspense fallback={<div>Loading…</div>}>
        <BackendsList resource={resource} />
      </Suspense>
    </main>
  );
}
