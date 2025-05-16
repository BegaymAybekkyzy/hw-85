import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
      },
    },
    plugins: {
        security: require('eslint-plugin-security'),
    },
    rules: {
      semi: ["error", "always"],
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
  },
);
