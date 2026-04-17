import { useState } from "react";
import { mutate } from "swr";
import { toast } from "sonner";
import { BackendCard } from "../backends/backend_card";
import { BackendDetailDrawer } from "../backends/backend_detail_drawer";
import { InstallModal } from "../backends/install_modal";
import { VariantPickerDrawer } from "../backends/variant_picker_drawer";
import { useInstallStream } from "../backends/hooks/use_install_stream";
import type { BackendSummary } from "../backends/types";
import { useHostBackends } from "../hooks/use_api";
import * as css from "./backends_view.css";

type PickerState = {
  backend: BackendSummary;
  mode: "install" | "repair";
} | null;

type InstallStreamState = {
  backendId: string;
  runtimeInstallId: string;
} | null;

export function BackendsView() {
  const { data, error, isLoading, mutate: revalidate } = useHostBackends();
  const [picker, setPicker] = useState<PickerState>(null);
  const [detail, setDetail] = useState<BackendSummary | null>(null);
  const [installing, setInstalling] = useState<InstallStreamState>(null);
  const installEvents = useInstallStream(installing?.backendId ?? null);

  const handleInstallStart = (runtimeInstallId: string) => {
    if (!picker) return;
    setInstalling({ backendId: picker.backend.id, runtimeInstallId });
    setPicker(null);
  };

  const handleInstallModalClose = () => {
    setInstalling(null);
    void revalidate();
    void mutate("host-backends");
  };

  const handleValidate = async (b: BackendSummary) => {
    try {
      const res = await fetch(`/api/v1/llm/backends/${encodeURIComponent(b.id)}/validate`, {
        method: "POST",
      });
      if (!res.ok) throw new Error(`validate failed: ${res.status}`);
      toast.success(`Validation complete: ${b.display_name}`);
      void revalidate();
    } catch (e) {
      toast.error(
        `Validate failed: ${e instanceof Error ? e.message : "unknown error"}`,
      );
    }
  };

  const ctaBindings = {
    onInstall: (b: BackendSummary) => {
      if (b.card_state === "installing" || b.card_state === "updating") {
        setPicker(null);
        setInstalling({
          backendId: b.id,
          runtimeInstallId: b.install?.runtime_install_id ?? "",
        });
        return;
      }
      setDetail(null);
      setPicker({ backend: b, mode: "install" });
    },
    onRepair: (b: BackendSummary) => {
      setDetail(null);
      setPicker({ backend: b, mode: "repair" });
    },
    onValidate: handleValidate,
    onOpenSettings: (b: BackendSummary) => {
      setPicker(null);
      setDetail(b);
    },
    onOpenDiagnostics: (b: BackendSummary) => {
      setPicker(null);
      setDetail(b);
    },
    onViewDetails: (b: BackendSummary) => {
      setPicker(null);
      setDetail(b);
    },
  };

  return (
    <main className={css.page}>
      <header className={css.header}>
        <div className={css.title}>Backends</div>
        <div className={css.subtitle}>Install and configure local inference runtimes</div>
      </header>

      {error && (
        <div className={css.errorPanel} role="alert">
          <div className={css.errorTitle}>Couldn't load backends</div>
          <div className={css.errorMessage}>
            {error instanceof Error ? error.message : String(error)}
          </div>
          <button
            type="button"
            className={css.errorRetry}
            onClick={() => void revalidate()}
          >
            Retry
          </button>
        </div>
      )}

      {isLoading && !data && <div>Loading…</div>}

      {data && (
        <>
          <div className={css.chips} data-testid="backends-summary-chips">
            <span data-testid="chip-installed">Installed runtimes: {data.summary.installed}</span>
            <span data-testid="chip-validated">Validated: {data.summary.validated}</span>
            <span data-testid="chip-issues">Issues: {data.summary.issues}</span>
          </div>
          <div className={css.grid}>
            {data.backends.map((b) => (
              <BackendCard key={b.id} backend={b} {...ctaBindings} />
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
          onClose={() => setPicker(null)}
          onStarted={handleInstallStart}
        />
      )}

      {detail && !picker && !installing && (
        <BackendDetailDrawer
          backend={detail}
          onClose={() => setDetail(null)}
          onRepair={(b) => {
            setDetail(null);
            setPicker({ backend: b, mode: "repair" });
          }}
          onValidated={() => void revalidate()}
        />
      )}

      {installing && (
        <InstallModal
          backendId={installing.backendId}
          eventsSource={installEvents}
          onClose={handleInstallModalClose}
        />
      )}
    </main>
  );
}
