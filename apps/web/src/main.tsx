import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { SWRConfig } from "swr";
import { Toaster } from "sonner";
import "./theme/global.css";
import { darkTheme } from "./theme/dark.css";
import { router } from "./routes";
import { ModelPicker } from "./components/layout/model_picker";

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
