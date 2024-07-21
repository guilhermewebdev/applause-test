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
      indent: ['error', 2]
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