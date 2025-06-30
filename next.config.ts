import type { NextConfig } from 'next';

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig: NextConfig = withPWA({
  // experimental: { // enable when stable PPR is released
  //   ppr: 'incremental',
  // },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    API_AUDIENCE: process.env.API_AUDIENCE,
    API_SCOPE: process.env.API_SCOPE,
  },
});

export default nextConfig;
