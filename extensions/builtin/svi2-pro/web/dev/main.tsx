import { mountDevControls } from "./dev_controls";
import { installMockBackend } from "./mock_backend";
import "./harness.css";

installMockBackend();

await import("../src/main.tsx");

const app = document.createElement("svi2-pro-app");
app.setAttribute("deployment-id", "preview");
app.setAttribute("route", "/preview/recipe");
(app as unknown as { hostContext: unknown }).hostContext = {
  apiBase: "/api/v1/extensions/nexus.video.svi2-pro",
  themeTokens: {},
};

document.getElementById("root")?.appendChild(app);

mountDevControls();
