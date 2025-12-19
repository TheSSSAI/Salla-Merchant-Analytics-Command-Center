module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'eqeqeq': 'error',
  },
  ignorePatterns: [
    'node_modules',
    'dist',
    'coverage',
    '.eslintrc.js',
    'jest.config.js',
    'playwright.config.ts'
  ]
};