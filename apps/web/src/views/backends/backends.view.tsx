import { useState } from "react";
import { mutate } from "swr";
import { toast } from "sonner";
import { useInstallStream } from "./hooks/use_install_stream";
import type { BackendSummary } from "./types";
import { useHostBackends } from "../../hooks/use_api";
import { validateBackend } from "../../services/backends";
import { BackendsUI, type BackendCardHandlers } from "./backends.ui";

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
      const result = await validateBackend(b.id);
      if (!result.ok) throw new Error(`validate failed: ${result.status}`);
      toast.success(`Validation complete: ${b.display_name}`);
      void revalidate();
    } catch (e) {
      toast.error(
        `Validate failed: ${e instanceof Error ? e.message : "unknown error"}`,
      );
    }
  };

  const cardHandlers: BackendCardHandlers = {
    onInstall: (b) => {
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
    onRepair: (b) => {
      setDetail(null);
      setPicker({ backend: b, mode: "repair" });
    },
    onValidate: handleValidate,
    onOpenSettings: (b) => {
      setPicker(null);
      setDetail(b);
    },
    onOpenDiagnostics: (b) => {
      setPicker(null);
      setDetail(b);
    },
    onViewDetails: (b) => {
      setPicker(null);
      setDetail(b);
    },
  };

  return (
    <BackendsUI
      data={data}
      error={error ?? null}
      isLoading={isLoading}
      onRetry={() => void revalidate()}
      cardHandlers={cardHandlers}
      picker={picker}
      onClosePicker={() => setPicker(null)}
      onPickerStart={handleInstallStart}
      detail={detail}
      onCloseDetail={() => setDetail(null)}
      onDetailRepair={(b) => {
        setDetail(null);
        setPicker({ backend: b, mode: "repair" });
      }}
      onDetailValidated={() => void revalidate()}
      installing={installing}
      installEvents={installEvents}
      onCloseInstall={handleInstallModalClose}
    />
  );
}
