import { mountDevControls } from "./dev_controls";
import { installMockBackend } from "./mock_backend";
import "./harness.css";

installMockBackend();

await import("../src/main.tsx");

const app = document.createElement("faceavatar-app");
app.setAttribute("deployment-id", "preview");
app.setAttribute("recipe", "faceavatar_generate");
(app as unknown as { hostContext: unknown }).hostContext = {
  apiBase: "/api/v1/extensions/nexus.3d.faceavatar",
  themeTokens: {},
};

document.getElementById("root")?.appendChild(app);

mountDevControls(app);
