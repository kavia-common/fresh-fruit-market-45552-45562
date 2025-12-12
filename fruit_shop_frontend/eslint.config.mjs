import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { 
    languageOptions: { 
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      },
      // Declare common browser and CRA globals to avoid false positives
      globals: {
        document: true,
        window: true,
        test: true,
        expect: true,
        // Browser/Web APIs
        fetch: true,
        AbortController: true,
        setTimeout: true,
        clearTimeout: true,
        localStorage: true,
        // CRA build-time injected
        process: true
      }
    },
    rules: {
      // Keep React/App ignored for examples and CRA scaffolds
      'no-unused-vars': ['error', { varsIgnorePattern: 'React|App' }]
    }
  },
  pluginJs.configs.recommended,
  {
    plugins: { react: pluginReact },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error"
    }
  }
]
