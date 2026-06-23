import { useCallback, useEffect, useMemo, useState } from "react";
import {
  disableExtension,
  enableExtension,
  fetchExtensions,
  type Extension,
} from "../../../api/client";
import { fetchDependencies } from "../../../services/extension_dependencies_client";
import {
  ExtensionsGalleryUI,
  type GalleryActionState,
} from "./gallery.ui";

const IDLE: GalleryActionState = { loading: false, targetId: null };

export interface ExtensionsGalleryProps {
  onExtensionToggled?: () => void;
}

export function ExtensionsGallery({
  onExtensionToggled,
}: ExtensionsGalleryProps = {}) {
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [action, setAction] = useState<GalleryActionState>(IDLE);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [setupRequired, setSetupRequired] = useState<
    Record<string, number | undefined>
  >({});

  const refresh = useCallback(() => {
    fetchExtensions()
      .then((items) => {
        setExtensions(items);
        setError(null);
      })
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Failed to load extensions"),
      )
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Fan out dependency probes per extension; each card resolves on its own
  // (absent entry = probe still in flight). Probe failure degrades to 0.
  useEffect(() => {
    let cancelled = false;
    setSetupRequired({});
    for (const ext of extensions) {
      fetchDependencies(ext.id)
        .then((resp) => {
          if (cancelled) return;
          const missing = resp.all_satisfied
            ? 0
            : Math.max(1, resp.steps.filter((step) => !step.satisfied).length);
          setSetupRequired((prev) => ({ ...prev, [ext.id]: missing }));
        })
        .catch(() => {
          if (cancelled) return;
          setSetupRequired((prev) => ({ ...prev, [ext.id]: 0 }));
        });
    }
    return () => {
      cancelled = true;
    };
  }, [extensions]);

  const setStatus = useCallback(
    (id: string, enable: boolean) => {
      setAction({ loading: true, targetId: id });
      const op = enable ? enableExtension(id) : disableExtension(id);
      op.then(() => {
        refresh();
        onExtensionToggled?.();
      })
        .catch((err: unknown) =>
          setError(err instanceof Error ? err.message : "Failed to update extension"),
        )
        .finally(() => setAction(IDLE));
    },
    [refresh, onExtensionToggled],
  );

  const { builtins, externals } = useMemo(() => {
    const b: Extension[] = [];
    const x: Extension[] = [];
    for (const ext of extensions) {
      if (ext.source === "builtin") b.push(ext);
      else x.push(ext);
    }
    return { builtins: b, externals: x };
  }, [extensions]);

  return (
    <ExtensionsGalleryUI
      builtins={builtins}
      externals={externals}
      totalCount={extensions.length}
      isLoading={!loaded}
      action={action}
      onToggle={setStatus}
      errorMessage={error}
      drawerOpen={drawerOpen}
      onOpenDrawer={() => setDrawerOpen(true)}
      onCloseDrawer={() => setDrawerOpen(false)}
      onInstalled={() => {
        refresh();
        onExtensionToggled?.();
      }}
      setupRequired={setupRequired}
    />
  );
}
