import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { SWRConfig } from "swr";
import { Toaster } from "sonner";
import "./styles/tokens.css";
import "./theme/global.css";
import "./theme/density.css";
import { darkTheme } from "./theme/dark.css";
import { rehydrateTweaks } from "./layout/tweak_storage";
import { router } from "./routes";
import { ModelPicker } from "./components/layout/model_picker";
import {
  NEXUS_HOST_NAVIGATE,
  type NexusHostNavigateDetail,
} from "./types/host_navigate";

rehydrateTweaks();

window.addEventListener(NEXUS_HOST_NAVIGATE, (event) => {
  const detail = (event as CustomEvent<NexusHostNavigateDetail>).detail;
  if (!detail) return;
  switch (detail.kind) {
    case "deployment-detail":
      void router.navigate(
        `/deployments/${encodeURIComponent(detail.deploymentId)}`,
      );
      return;
    default:
      return;
  }
});

const root = document.getElementById("root")!;
root.classList.add(darkTheme);

createRoot(root).render(
  <StrictMode>
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        dedupingInterval: 2_000,
      }}
    >
      <RouterProvider router={router} />
      <ModelPicker />
      <Toaster
        theme="dark"
        position="bottom-right"
        richColors
        closeButton
        toastOptions={{
          style: { fontFamily: "inherit" },
        }}
      />
    </SWRConfig>
  </StrictMode>,
);
