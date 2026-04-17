import { useParams } from "react-router";
import { ExtensionsGallery } from "./extensions_gallery";
import { ExtensionLayoutView } from "./extension_layout_view";
import { useRootOutletContext } from "../root_layout";

export function ExtensionsGalleryRoute() {
  const ctx = useRootOutletContext();
  return <ExtensionsGallery onExtensionToggled={ctx.refreshLayouts} />;
}

export function ExtensionLayoutRoute() {
  const { layoutId = "" } = useParams();
  return <ExtensionLayoutView layoutId={decodeURIComponent(layoutId)} />;
}
