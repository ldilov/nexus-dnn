import { Suspense, lazy } from "react";
import type { BackendSummary, BackendListResponse } from "./types";
import { BackendCard } from "./components/backend_card";
import { BackendDetailDrawer } from "./components/backend_detail_drawer";
import type { InstallStreamEvent } from "./components/install_modal";
import { VariantPickerDrawer } from "./components/variant_picker_drawer";
import { PageHero } from "../../components/base/page_hero";
import * as css from "./backends.css";

const InstallModal = lazy(() =>
  import("./components/install_modal").then((mod) => ({
    default: mod.InstallModal,
  })),
);

interface PickerDescriptor {
  backend: BackendSummary;
  mode: "install" | "repair";
}

interface InstallDescriptor {
  backendId: string;
  runtimeInstallId: string;
}

export interface BackendCardHandlers {
  onInstall: (backend: BackendSummary) => void;
  onRepair: (backend: BackendSummary) => void;
  onValidate: (backend: BackendSummary) => void;
  onOpenSettings: (backend: BackendSummary) => void;
  onOpenDiagnostics: (backend: BackendSummary) => void;
  onViewDetails: (backend: BackendSummary) => void;
}

export interface BackendsUIProps {
  data: BackendListResponse | undefined;
  error: Error | null;
  isLoading: boolean;
  onRetry: () => void;
  cardHandlers: BackendCardHandlers;
  picker: PickerDescriptor | null;
  onClosePicker: () => void;
  onPickerStart: (runtimeInstallId: string) => void;
  detail: BackendSummary | null;
  onCloseDetail: () => void;
  onDetailRepair: (backend: BackendSummary) => void;
  onDetailValidated: () => void;
  installing: InstallDescriptor | null;
  installEvents: AsyncIterable<InstallStreamEvent>;
  onCloseInstall: () => void;
}

export function BackendsUI({
  data,
  error,
  isLoading,
  onRetry,
  cardHandlers,
  picker,
  onClosePicker,
  onPickerStart,
  detail,
  onCloseDetail,
  onDetailRepair,
  onDetailValidated,
  installing,
  installEvents,
  onCloseInstall,
}: BackendsUIProps) {
  return (
    <main className={css.page}>
      <PageHero
        eyebrow="Operator surface · Inference runtimes"
        title="Backends"
        meta={<span>Install, validate, and configure local inference runtimes.</span>}
      />

      {error && (
        <div className={css.errorPanel} role="alert">
          <div className={css.errorTitle}>Couldn't load backends</div>
          <div className={css.errorMessage}>
            {error instanceof Error ? error.message : String(error)}
          </div>
          <button type="button" className={css.errorRetry} onClick={onRetry}>
            Retry
          </button>
        </div>
      )}

      {isLoading && !data && <div>Loading…</div>}

      {data && (
        <>
          <div className={css.chips} data-testid="backends-summary-chips">
            <span data-testid="chip-installed">
              Installed runtimes: {data.summary.installed}
            </span>
            <span data-testid="chip-validated">
              Validated: {data.summary.validated}
            </span>
            <span data-testid="chip-issues">Issues: {data.summary.issues}</span>
          </div>
          <div className={css.grid}>
            {data.backends.map((b) => (
              <BackendCard key={b.id} backend={b} {...cardHandlers} />
            ))}
          </div>
        </>
      )}

      {picker && (
        <VariantPickerDrawer
          backendId={picker.backend.id}
          mode={picker.mode}
          preselectedReleaseId={picker.backend.install?.release_id ?? null}
          preselectedAcceleratorProfile={
            picker.backend.install?.accelerator_profile ?? null
          }
          onClose={onClosePicker}
          onStarted={onPickerStart}
        />
      )}

      {detail && !picker && !installing && (
        <BackendDetailDrawer
          backend={detail}
          onClose={onCloseDetail}
          onRepair={onDetailRepair}
          onValidated={onDetailValidated}
        />
      )}

      {installing && (
        <Suspense fallback={null}>
          <InstallModal
            backendId={installing.backendId}
            eventsSource={installEvents}
            onClose={onCloseInstall}
          />
        </Suspense>
      )}
    </main>
  );
}
