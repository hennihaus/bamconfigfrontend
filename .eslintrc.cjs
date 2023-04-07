/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest"
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-typescript",
    "eslint-config-prettier"
  ],
  overrides: [
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/vue"],
      rules: {
        "testing-library/prefer-screen-queries": "off",
        "testing-library/render-result-naming-convention": "off"
      }
    }
  ],
  noInlineConfig: true,
  reportUnusedDisableDirectives: true
};
