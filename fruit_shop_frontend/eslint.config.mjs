import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

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
      // Declare common globals to avoid false positives in browser/CRA projects.
      // We keep this explicit rather than relying solely on `env` to work
      // smoothly with flat config format.
      globals: {
        // Browser globals
        window: true,
        document: true,
        localStorage: true,
        fetch: true,
        AbortController: true,
        setTimeout: true,
        clearTimeout: true,

        // Jest/RTL test globals
        test: true,
        expect: true,
        jest: true,

        // Node/Cra build-time env access
        process: true,
      },
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "React|App" }],
    },
  },
  // Base JS recommended rules
  pluginJs.configs.recommended,
  {
    plugins: { react: pluginReact },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
    },
  },
];
