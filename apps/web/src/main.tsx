import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";
import { SWRConfig } from "swr";
import { Toaster } from "sonner";
import "./theme/global.css";
import { darkTheme } from "./theme/dark.css";
import { App } from "./App";

const root = document.getElementById("root")!;
root.classList.add(darkTheme);

createRoot(root).render(
  <StrictMode>
    <SWRConfig
      value={{
        // Every SWR hook in the app goes through the envelope-aware fetcher
        // we ship in hooks/use_api.ts — set it globally so ad-hoc useSWR
        // calls in a component don't have to rewire it.
        revalidateOnFocus: false,
        // Dedup window matches the polling cadence of the live metrics hook
        // so opening a detail page while the list is already mounted doesn't
        // trigger a redundant round-trip.
        dedupingInterval: 2_000,
      }}
    >
      <HashRouter>
        <App />
      </HashRouter>
      <Toaster
        theme="dark"
        position="bottom-right"
        richColors
        closeButton
        toastOptions={{
          // Keep it on-brand with the Spectral Graphite look — let Sonner's
          // richColors preset paint success/error and just align the radii.
          style: { fontFamily: "inherit" },
        }}
      />
    </SWRConfig>
  </StrictMode>,
);
