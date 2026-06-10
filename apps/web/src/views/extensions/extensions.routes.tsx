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
  return (
    <DependencyGate extensionId={id}>
      <ExtensionLayoutView layoutId={id} />
    </DependencyGate>
  );
}
