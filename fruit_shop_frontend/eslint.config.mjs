import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";

export default [
  // Target all JS/JSX-style files
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  {
    // Align ESLint to the actual runtime: browser app built by CRA,
    // with node available during build scripts/tests.
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        window: true,
        document: true,
        localStorage: true,
        fetch: true,
        AbortController: true,
        setTimeout: true,
        clearTimeout: true,
        test: true,
        expect: true,
        jest: true,
        process: true,
      },
    },
    plugins: {
      react: pluginReact,
      "jsx-a11y": jsxA11y,
      prettier,
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "React|App" }],
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
      "prettier/prettier": "warn"
    },
  },
  // Base JS recommended rules
  pluginJs.configs.recommended,
  // jsx-a11y recommended
  jsxA11y.configs.recommended,
];
