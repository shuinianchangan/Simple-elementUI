// vitest.config.ts
/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [resolve(__dirname, "vitest.setup.ts")],
    silent: true,
    onConsoleLog(log) {
      if (
        log.includes("Could not find one or more icon(s)") ||
        log.includes("Missing required prop") ||
        log.includes('Slot "default" invoked outside of the render function')
      ) {
        return false;
      }
    },
  },
});

// "test": "vitest --coverage"
