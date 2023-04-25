const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig.base');

module.exports = {
  preset: 'ts-jest',
  transform: {
    '\\.[jt]sx?$': ['ts-jest', { tsconfig: 'tsconfig.dev.json' }],
    '^.+\\.svg$': './test/fileTransformer',
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.ts',
  },
  transformIgnorePatterns: [],
  setupFiles: ['./test/setupEnv.js'],
  testRegex: '\\.ispec\\.tsx?$',
};
