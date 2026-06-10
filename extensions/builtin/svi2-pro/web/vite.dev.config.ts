import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig, type Plugin } from "vite";

const MEDIA_ROUTE = "/api/v1/extensions/nexus.video.svi2-pro/media";

function mockMediaPlugin(): Plugin {
  return {
    name: "svi2-pro-mock-media",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith(MEDIA_ROUTE)) {
          res.statusCode = 302;
          res.setHeader("location", "/sample.mp4");
          res.end();
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  root: resolve(__dirname, "dev"),
  publicDir: resolve(__dirname, "dev/public"),
  plugins: [react(), vanillaExtractPlugin(), mockMediaPlugin()],
  server: {
    port: 5181,
    strictPort: true,
    open: false,
    fs: {
      allow: [resolve(__dirname, "..")],
    },
  },
});
