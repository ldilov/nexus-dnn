import { mountDevControls } from "./dev_controls";
import { installMockBackend } from "./mock_backend";
import "./harness.css";

installMockBackend();

await import("../src/main.tsx");

const app = document.createElement("trellis2-app");
app.setAttribute("deployment-id", "preview");
app.setAttribute("route", "/preview/generate");
(app as unknown as { hostContext: unknown }).hostContext = {
  apiBase: "/api/v1/extensions/nexus.3d.trellis2",
  themeTokens: {},
};

document.getElementById("root")?.appendChild(app);

mountDevControls();
