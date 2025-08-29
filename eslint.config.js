import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        rules: {
            "no-var": "error",
            "semi": "error",
            "indent": "error",
            "no-multi-spaces": "error",
            "space-in-parens": "error",
            "no-multiple-empty-lines": "error",
            "prefer-const": "error",
            "no-use-before-define": "error"
        },
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: { globals: globals.browser } },
]);
