import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { squadWatcherPlugin } from "./src/plugin/squadWatcher";
import { performancePlugin } from "./src/plugin/performancePlugin";

export default defineConfig({
  plugins: [react(), squadWatcherPlugin(), performancePlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
