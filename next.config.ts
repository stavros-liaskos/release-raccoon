import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // experimental: { // enable when stable PPR is released
  //   ppr: 'incremental',
  // },
  logging: {
    fetches: {
      fullUrl: true, // https://nextjs.org/docs/app/api-reference/config/next-config-js/logging
      hmrRefreshes: true,
    },
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    API_AUDIENCE: process.env.API_AUDIENCE,
    API_SCOPE: process.env.API_SCOPE,
  },
};

export default nextConfig;
