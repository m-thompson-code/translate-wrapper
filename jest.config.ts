import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'mjs', 'json'],

  // 👇 Add the package to the allowlist so it’s NOT ignored
  transformIgnorePatterns: [
    'node_modules/(?!(?:@angular|rxjs|@jsverse|@ngx-translate|ngx-translate-multi-http-loader)/)',
  ],

  testMatch: ['**/?(*.)+(spec).ts'],
};

export default config;
