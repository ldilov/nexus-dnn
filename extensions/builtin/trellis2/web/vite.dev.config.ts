import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  root: resolve(__dirname, "dev"),
  publicDir: resolve(__dirname, "dev/public"),
  plugins: [react(), vanillaExtractPlugin()],
  server: {
    port: 5183,
    strictPort: true,
    open: false,
    fs: {
      allow: [resolve(__dirname, "..")],
    },
  },
});
