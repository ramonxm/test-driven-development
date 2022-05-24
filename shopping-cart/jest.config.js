module.exports = {
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.js$': require.resolve('babel-jest'),
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    '<rootDir>/components/**/*.{js,jsx}',
    '<rootDir>/pages/**/*.{js,jsx}',
    '<rootDir>/hooks/**/*.{js,jsx}',
    '<rootDir>/store/**/*.{js,jsx}',
    '!**/node_modules/**',
  ],
};
