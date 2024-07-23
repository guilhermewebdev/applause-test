import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      indent: ['error', 2],
      "@typescript-eslint/ban-ts-comment": ["error", {
        "ts-expect-error": false
      }]
    }
  },
  {
    ignores: [
      "node_modules/",
      "dist/",
      "dist/**/*",
      "jest-mongodb-config.js"
    ]
  }
];