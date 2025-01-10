import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from 'eslint-config-prettier';
import jsdoc from "eslint-plugin-jsdoc";
/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  {
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "error",
      "no-console": "error",
      "no-undef": "error",
      "no-unused-expressions": "error",
      "no-unreachable": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "jsdoc/require-description": "error",
      "jsdoc/check-values": "error"
    },
  },
  {
    ignores: [".node_modules/*"]
  },
  {
    plugins: {
      jsdoc,
    },
   
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig, 
];