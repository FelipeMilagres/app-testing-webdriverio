// eslint.config.js
import js from "@eslint/js";
import mochaPlugin from "eslint-plugin-mocha";
import wdio from "eslint-plugin-wdio";

export default [
  {
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "coverage/",
      "*.min.js"
    ],
  },

  js.configs.recommended,

  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        browser: "readonly",
        driver: "readonly",
        $: "readonly",
        $$: "readonly",
        expect: "readonly",
        process: "readonly"
      }
    },

    plugins: {
      mocha: mochaPlugin,
      wdio
    },

    rules: {
      // Gerais
      "no-unused-vars": "warn",
      "no-undef": "error",

      // Mocha
      "mocha/no-exclusive-tests": "error",

      // WDIO
      "wdio/no-pause": "warn",
      "wdio/no-sync": "off"
    }
  }
];