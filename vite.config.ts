import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

export default defineConfig({
  plugins: [react(), crx({ manifest })],

  build: {
    outDir: "dist",
    sourcemap: true,
  },

  server: {
    host: true,
    port: 5173,
    strictPort: true,
    watch: { usePolling: true },

    hmr: {
      protocol: "ws",
      host: "host.docker.internal",
      port: 5173,
      clientPort: 5173,
    },

    origin: "http://localhost:5173",
  },

  resolve: {
    alias: {
      "@": "/src",
    },
  },
});