import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignoreDependencies: [
    '@testing-library/react-hooks',
    'husky',
    'react-test-renderer',
    'tailwindcss',
    'ts-node',
    'eslint-config-next',
    'eslint-config-prettier',
    '@typescript-eslint/eslint-plugin',
  ],
  ignore: ['public/noflash.js', 'src/types/schema.ts'],
  ignoreUnresolved: ['babel-jest'],
};

export default config;
