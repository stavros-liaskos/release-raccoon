import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignoreDependencies: ['@testing-library/react-hooks', 'husky', 'react-test-renderer', 'tailwindcss', 'ts-node'],
  ignore: ['public/noflash.js', 'src/types/schema.ts'],
  ignoreUnresolved: ['@next/eslint-plugin-next/recommended', 'babel-jest'],
};

export default config;
