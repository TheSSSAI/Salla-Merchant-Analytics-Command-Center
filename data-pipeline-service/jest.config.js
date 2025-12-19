module.exports = {
  projects: [
    '<rootDir>/apps/data-pipeline-service',
    '<rootDir>/apps/salla-analytics-pwa',
    '<rootDir>/packages/ui-components',
    '<rootDir>/packages/database-schema'
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', {
      isolatedModules: true
    }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts'
  ]
};