import { useParams } from "react-router";

import { ExtensionSettingsView } from "./extension_settings.view";

export function ExtensionSettingsRoute() {
  const { id = "" } = useParams();
  return <ExtensionSettingsView extensionId={decodeURIComponent(id)} />;
}
