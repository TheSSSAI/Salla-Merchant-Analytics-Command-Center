module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["@typescript-eslint", "react", "unused-imports"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "unused-imports/no-unused-imports": "error",
    "prettier/prettier": ["error", { endOfLine: "auto" }]
  },
  ignorePatterns: [
    "node_modules/",
    ".next/",
    "out/",
    "public/",
    "**/*.js",
    "**/*.json"
  ]
};