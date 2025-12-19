module.exports = {
  projects: [
    '<rootDir>/apps/salla-analytics-pwa-main',
    '<rootDir>/packages/core-library',
    '<rootDir>/services/data-pipeline-service'
  ],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '**/*.{ts,tsx,js,jsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**'
  ]
};