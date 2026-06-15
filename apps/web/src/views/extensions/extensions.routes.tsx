import { useParams } from "react-router";
import { ExtensionsGallery } from "./gallery/gallery.view";
import { ExtensionLayoutView } from "./layout/layout.view";
import { DependencyGate } from "../../components/extension-gate";
import { useRootOutletContext } from "../../root_layout";

export function ExtensionsGalleryRoute() {
  const ctx = useRootOutletContext();
  return <ExtensionsGallery onExtensionToggled={ctx.refreshLayouts} />;
}

export function ExtensionLayoutRoute() {
  const { layoutId = "" } = useParams();
  const id = decodeURIComponent(layoutId);
  const ctx = useRootOutletContext();
  // The route param is a layout id (e.g. "emotion-tts.layout.main"); the
  // dependency gate is keyed by the OWNING extension id. Resolve it from the
  // layouts list, falling back to the raw id when the layout isn't loaded yet.
  const extensionId =
    ctx.extensionLayouts.find((layout) => layout.id === id)?.extension_id ?? id;
  return (
    <DependencyGate extensionId={extensionId}>
      <ExtensionLayoutView layoutId={id} />
    </DependencyGate>
  );
}
