import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import checker from "vite-plugin-checker";
import vueI18n from "@intlify/unplugin-vue-i18n/vite";

const HOST = "0.0.0.0";
const PORT = 4200;
const MIN_TEST_COVERAGE_IN_PERCENT = 80;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
    }),
    checker({ vueTsc: true }),
  ],
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: HOST,
    port: PORT,
  },
  preview: {
    host: HOST,
    port: PORT,
  },
  test: {
    globals: true,
    root: "src/",
    environment: "jsdom",
    setupFiles: [
      "src/__tests__/setups/setup-server.ts",
      "src/__tests__/setups/setup-vue.ts",
    ],
    // https://github.com/bcoe/c8#ignoring-uncovered-lines-functions-and-blocks
    coverage: {
      all: true,
      perFile: true,
      skipFull: true,
      lines: MIN_TEST_COVERAGE_IN_PERCENT,
      functions: MIN_TEST_COVERAGE_IN_PERCENT,
      branches: MIN_TEST_COVERAGE_IN_PERCENT,
      statements: MIN_TEST_COVERAGE_IN_PERCENT,
    },
    clearMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
    maxConcurrency: 1,
  },
});
