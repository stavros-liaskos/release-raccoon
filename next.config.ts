import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typedRoutes: true,
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
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_API_URL: process.env.SPOTIFY_API_URL,
    SPOTIFY_AUTH_SCOPES: process.env.SPOTIFY_AUTH_SCOPES,
  },
};

export default nextConfig;
