// eslint.config.mjs
import js from "@eslint/js";
import * as mocha from "eslint-plugin-mocha";
import * as wdio from "eslint-plugin-wdio";

export default [
  {
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "coverage/"
    ]
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
      mocha,
      wdio
    },

    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "wdio/no-pause": "warn",
      "wdio/no-sync": "off"
    }
  }
]