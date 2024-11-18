import js from "@eslint/js";
import globals from "globals";
import { FlatCompat } from "@eslint/eslintrc";
import babelParser from "@babel/eslint-parser";
import babelPlugin from "@babel/eslint-plugin";
import playwright from "eslint-plugin-playwright";

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
});

export default [
  js.configs.recommended,
  {
    ignores: ["**/dist"]
  },
  {
    languageOptions: {
      sourceType: "module",
      parser: babelParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  ...compat.extends("plugin:react/recommended"),
  ...compat.extends("plugin:react-hooks/recommended"),
  ...compat.extends("plugin:jest/recommended"),

  {
    plugins: {
      "@babel": babelPlugin,
    },
    rules: {
      "@babel/no-invalid-this": "error",
      "@babel/no-unused-expressions": "error",
      "@babel/object-curly-spacing": ["error", "always"],
      "@babel/semi": ["error", "always"],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  {
    files: ["**/tests/jest/*.test.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },

  {
    files: ["**/tests/playwright/*.js"],
    ...playwright.configs["flat/recommended"],
    rules: {
      ...playwright.configs["flat/recommended"].rules,
    },
  },
];
